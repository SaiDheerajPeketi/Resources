import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { reviewedJavaSolutions } from "../src/data/solutions/reviewed-solutions";

const prelude = `import java.util.*;

class ListNode {
  int val;
  ListNode next;
  ListNode(int val) { this.val = val; }
  ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}
class TreeNode {
  int val;
  TreeNode left, right;
  TreeNode(int val) { this.val = val; }
}
class RandomNode {
  int val;
  RandomNode next, random;
  RandomNode(int val, RandomNode next, RandomNode random) {
    this.val = val; this.next = next; this.random = random;
  }
}
class PerfectNode {
  int val;
  PerfectNode left, right, next;
  PerfectNode(int val) { this.val = val; }
}
class GraphNode {
  int val;
  List<GraphNode> neighbors = new ArrayList<>();
  GraphNode(int val) { this.val = val; }
}
`;

const work = mkdtempSync(join(tmpdir(), "interview-atlas-java-"));
const failures: string[] = [];
try {
  for (const [id, source] of Object.entries(reviewedJavaSolutions)) {
    const sourceDirectory = join(work, id);
    mkdirSync(sourceDirectory);
    const file = join(sourceDirectory, "Solution.java");
    writeFileSync(file, `${prelude}\nclass Solution {\n${source}\n}\n`);
    const result = spawnSync(process.env.JAVAC ?? "javac", ["--release", "17", "-d", sourceDirectory, file], {
      encoding: "utf8"
    });
    if (result.status !== 0) failures.push(`${id}: ${(result.stderr || result.stdout).trim()}`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

if (failures.length) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}
console.log(`Compiled ${Object.keys(reviewedJavaSolutions).length} reviewed Java 17 references.`);
