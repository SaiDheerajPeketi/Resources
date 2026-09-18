import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { cpp17Atlas75 } from "../src/data/solutions/cpp17-atlas75";

const prelude = `#include <algorithm>
#include <array>
#include <cctype>
#include <climits>
#include <functional>
#include <map>
#include <numeric>
#include <optional>
#include <queue>
#include <stack>
#include <stdexcept>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
struct ListNode { int val; ListNode* next; ListNode(int v = 0, ListNode* n = nullptr) : val(v), next(n) {} };
struct TreeNode { int val; TreeNode *left, *right; TreeNode(int v = 0) : val(v), left(nullptr), right(nullptr) {} };
struct RandomNode { int val; RandomNode *next, *random; RandomNode(int v = 0, RandomNode* n = nullptr, RandomNode* r = nullptr) : val(v), next(n), random(r) {} };
struct PerfectNode { int val; PerfectNode *left, *right, *next; PerfectNode(int v = 0) : val(v), left(nullptr), right(nullptr), next(nullptr) {} };
struct GraphNode { int val; vector<GraphNode*> neighbors; GraphNode(int v = 0) : val(v) {} };
`;

const work = mkdtempSync(join(tmpdir(), "interview-atlas-cpp-"));
const failures: string[] = [];
try {
  for (const [id, source] of Object.entries(cpp17Atlas75)) {
    const file = join(work, `${id}.cpp`);
    writeFileSync(file, `${prelude}\n${source}\n`);
    const result = spawnSync(process.env.CXX ?? "c++", ["-std=c++17", "-fsyntax-only", file], { encoding: "utf8" });
    if (result.status !== 0) failures.push(`${id}: ${(result.stderr || result.stdout).trim()}`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

if (failures.length) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}
console.log(`Compiled ${Object.keys(cpp17Atlas75).length} Atlas 75 C++17 references.`);
