import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { pythonAtlas75 } from "../src/data/solutions/python-atlas75";

const prelude = `from bisect import bisect_left, bisect_right
from collections import Counter, deque
from heapq import heappop, heappush
from itertools import count
from math import inf
from string import ascii_lowercase

class ListNode:
    def __init__(self, val=0, next=None): self.val, self.next = val, next
class TreeNode:
    def __init__(self, val=0, left=None, right=None): self.val, self.left, self.right = val, left, right
class RandomNode:
    def __init__(self, val=0, next=None, random=None): self.val, self.next, self.random = val, next, random
class PerfectNode:
    def __init__(self, val=0): self.val, self.left, self.right, self.next = val, None, None, None
class GraphNode:
    def __init__(self, val=0): self.val, self.neighbors = val, []
`;

const work = mkdtempSync(join(tmpdir(), "interview-atlas-python-"));
const failures: string[] = [];
try {
  for (const [id, source] of Object.entries(pythonAtlas75)) {
    const file = join(work, `${id}.py`);
    writeFileSync(file, `${prelude}\n${source}\n`);
    const result = spawnSync(process.env.PYTHON ?? "python3", ["-m", "py_compile", file], {
      encoding: "utf8",
      env: { ...process.env, PYTHONPYCACHEPREFIX: join(work, "cache") }
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
console.log(`Compiled ${Object.keys(pythonAtlas75).length} Atlas 75 Python references.`);
