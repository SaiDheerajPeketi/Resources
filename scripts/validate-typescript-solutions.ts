import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { reviewedTypescriptSolutions } from "../src/data/solutions/reviewed-solutions";

const prelude = `class ListNode {
  constructor(public val: number, public next: ListNode | null = null) {}
}
class TreeNode {
  constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}
class RandomNode {
  constructor(
    public val: number,
    public next: RandomNode | null = null,
    public random: RandomNode | null = null
  ) {}
}
class PerfectNode {
  left: PerfectNode | null = null;
  right: PerfectNode | null = null;
  next: PerfectNode | null = null;
  constructor(public val: number) {}
}
class GraphNode {
  neighbors: GraphNode[] = [];
  constructor(public val: number) {}
}
`;

const work = mkdtempSync(join(tmpdir(), "interview-atlas-typescript-"));
try {
  const files = Object.entries(reviewedTypescriptSolutions).map(([id, source]) => {
    const file = join(work, `${id}.ts`);
    writeFileSync(file, `${prelude}\n${source}\nexport {};\n`);
    return file;
  });
  const compiler = join(process.cwd(), "node_modules", ".bin", "tsc");
  const result = spawnSync(compiler, [
    "--ignoreConfig",
    "--noEmit",
    "--strict",
    "--target", "ES2022",
    "--module", "ESNext",
    "--lib", "ES2022",
    "--skipLibCheck",
    ...files
  ], { encoding: "utf8" });
  if (result.status !== 0) {
    console.error((result.stderr || result.stdout).trim());
    process.exit(1);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

console.log(`Compiled ${Object.keys(reviewedTypescriptSolutions).length} reviewed TypeScript references in strict mode.`);
