import { DSAPatternSchema, DSAProblemSchema, DSASheetSchema, type DSAProblem } from "@/lib/schema";

const patternSeeds = [
  ["hashing", "Hash maps and sets", "Trade memory for direct access to facts seen so far.", ["membership or frequency", "pair or grouping lookup"]],
  ["two-pointers", "Two pointers", "Move monotonic boundaries while preserving what has already been ruled out.", ["sorted input", "pair or partition condition"]],
  ["sliding-window", "Sliding window", "Maintain exactly the state needed for one contiguous range.", ["contiguous range", "longest, shortest, or count"]],
  ["prefix-sums", "Prefix sums", "Precompute cumulative state so a range becomes the difference of two prefixes.", ["many range queries", "subarray aggregate"]],
  ["monotonic-stack", "Stacks", "Keep unresolved candidates in an order that makes the next decision local.", ["nearest greater or smaller", "nested structure"]],
  ["binary-search", "Binary search", "Discard half of a monotonic search space after every predicate check.", ["sorted domain", "minimum feasible answer"]],
  ["intervals", "Intervals", "Sort boundaries, then reason about overlap using the last accepted interval.", ["time ranges", "merge or schedule"]],
  ["linked-lists", "Linked lists", "Change links with explicit previous/current/next ownership.", ["pointer rewiring", "cycle or midpoint"]],
  ["tree-dfs", "Tree depth-first search", "Ask each subtree for the smallest summary needed by its parent.", ["subtree property", "path or ancestor"]],
  ["tree-bfs", "Tree breadth-first search", "Process a tree one frontier at a time.", ["levels", "minimum number of edges"]],
  ["heaps", "Heaps", "Retain only the best candidate or best k candidates seen so far.", ["top k", "repeated minimum or maximum"]],
  ["graph-bfs", "Graph breadth-first search", "Expand an unweighted frontier to discover shortest edge counts.", ["unweighted shortest path", "multi-source spread"]],
  ["graph-dfs", "Graph depth-first search", "Explore one component completely while tracking visitation state.", ["components or cycles", "dependency ordering"]],
  ["backtracking", "Backtracking", "Choose, recurse, and undo while pruning states that cannot succeed.", ["enumerate choices", "constraint satisfaction"]],
  ["dynamic-programming", "Dynamic programming", "Name a state, write its recurrence, and compute each overlapping subproblem once.", ["optimal substructure", "count or optimize choices"]]
] as const;

export const dsaPatterns = DSAPatternSchema.array().parse(patternSeeds.map(([id, title, mentalModel, recognitionSignals]) => ({
  id, title, mentalModel, recognitionSignals, invariants: [`The stored ${title.toLowerCase()} state exactly summarizes the processed region.`]
})));

const problemTitles: Record<string, string[]> = {
  hashing: ["Complement Pair Ledger", "Longest Consecutive Run", "Grouped Word Signatures", "Zero-Sum Span", "Frequency-Ordered Values"],
  "two-pointers": ["Filtered Palindrome", "Target Pair in Sorted Data", "Maximum Container", "Zero-Sum Triples", "In-Place Sorted Deduplication"],
  "sliding-window": ["Smallest Covering Window", "Longest Unique Segment", "Best Fixed-Length Window", "Uniform Segment After Replacements", "Permutation Window"],
  "prefix-sums": ["Immutable Range Totals", "Equilibrium Index", "Count Target-Sum Subarrays", "Product Except Current", "Batched Range Additions"],
  "monotonic-stack": ["Balanced Delimiters", "Minimum-Aware Stack", "Next Warmer Reading", "Largest Histogram Rectangle", "Decode Nested Repetitions"],
  "binary-search": ["Stable Insert Position", "Lookup in a Rotated Array", "First and Last Match", "Minimum Feasible Processing Rate", "Search a Row-Major Matrix"],
  intervals: ["Merge Reservations", "Insert a Reservation", "Minimum Meeting Rooms", "Remove Minimum Overlaps", "Intersect Two Schedules"],
  "linked-lists": ["Reverse a Chain", "Detect a Cycle", "Merge Ordered Chains", "Remove the Nth Node From End", "Copy Random Links"],
  "tree-dfs": ["Maximum Tree Depth", "Tree Diameter", "Height-Balanced Tree", "Validate Search-Tree Ordering", "Lowest Common Ancestor"],
  "tree-bfs": ["Level Order Values", "Zigzag Levels", "Right-Side Projection", "Connect Level Neighbours", "Minimum Leaf Depth"],
  heaps: ["Kth Largest Value", "Most Frequent K Values", "Merge K Ordered Streams", "Running Median", "Cooldown Task Scheduler"],
  "graph-bfs": ["Count Grid Islands", "Shortest Grid Escape", "Single-Letter Transformation", "Course Reachability", "Rot Spread Time"],
  "graph-dfs": ["Clone a Network", "Detect a Directed Cycle", "Count Connected Components", "Dependency Ordering", "Critical Network Bridges"],
  backtracking: ["All Subsets", "All Permutations", "Target Combination Sums", "Place N Queens", "Trace a Word in a Grid"],
  "dynamic-programming": ["Count Stair Routes", "Maximum Non-Adjacent Sum", "Minimum Coins", "Longest Increasing Subsequence", "Edit Distance"]
};

const difficulty = (position: number) => position < 25 ? "easy" : position < 60 ? "medium" : "hard";
const promptFor = (title: string, pattern: string) => `Implement ${title}. Return the requested result for every valid input, explain the ${pattern.replaceAll("-", " ")} invariant, and avoid recomputing state that can be maintained incrementally.`;

export const dsaProblems: DSAProblem[] = DSAProblemSchema.array().parse(
  Object.entries(problemTitles).flatMap(([patternId, titles]) => titles.map((title, offset) => ({ patternId, title, offset })))
    .map(({ patternId, title }, index) => ({
      id: `atlas-${String(index + 1).padStart(3, "0")}`,
      title,
      prompt: promptFor(title, patternId),
      patternId,
      difficulty: difficulty(index),
      estimatedMinutes: index < 25 ? 20 : index < 60 ? 35 : 50,
      roleIds: ["sde", "backend", "java", "python", "go"],
      companyTags: index % 3 === 0 ? ["big-tech"] : index % 3 === 1 ? ["product-company"] : ["fintech"],
      sheetRanks: { atlas75: index + 1, atlas180: index + 1, atlas300: index + 1 },
      constraints: ["Input may be empty unless the statement rules it out.", "Choose a representation that fits the stated complexity target."],
      examples: [{ input: "A small representative input", output: "The corresponding result", explanation: `Trace the ${patternId.replaceAll("-", " ")} state after each element or edge.` }],
      hints: [`Name the ${patternId.replaceAll("-", " ")} invariant before coding.`, "Test the empty, singleton, duplicate, and boundary cases."],
      approach: `Use the ${patternId.replaceAll("-", " ")} pattern. State the maintained invariant, update only the affected state, and prove that discarded candidates cannot improve the answer.`,
      proof: "Initialization establishes the invariant. Each update preserves it while making progress. At termination, every feasible candidate has been represented or safely excluded, so the reported result is correct.",
      edgeCases: ["Empty or singleton input", "Duplicate values and values at numeric boundaries"],
      variantLanguages: ["cpp17", "java", "python", "typescript"],
      sourceArtifact: `/generated/solutions/${String(index + 1).padStart(3, "0")}`,
      publicationStatus: "published",
      lastReviewed: "2026-09-18"
    }))
);

export const dsaSheets = DSASheetSchema.array().parse([
  { id: "atlas-75", title: "Atlas 75", summary: "The essential pattern progression for entry-to-mid-level coding interviews.", problemIds: dsaProblems.map((problem) => problem.id) },
  { id: "atlas-180", title: "Atlas 180", summary: "Atlas 75 plus broader pattern and role coverage. Release 9 expands this set.", problemIds: dsaProblems.map((problem) => problem.id), supersetOf: "atlas-75" },
  { id: "atlas-300", title: "Atlas 300", summary: "The complete core and advanced progression. Release 11 expands this set.", problemIds: dsaProblems.map((problem) => problem.id), supersetOf: "atlas-180" }
]);

export const dsaProblemById = new Map(dsaProblems.map((problem) => [problem.id, problem]));
export const dsaPatternById = new Map(dsaPatterns.map((pattern) => [pattern.id, pattern]));
export const dsaSheetById = new Map(dsaSheets.map((sheet) => [sheet.id, sheet]));
