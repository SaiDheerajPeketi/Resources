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
  ["dynamic-programming", "Dynamic programming", "Name a state, write its recurrence, and compute each overlapping subproblem once.", ["optimal substructure", "count or optimize choices"]],
  ["matrix", "Matrix traversal", "Treat row, column, direction, and boundary as explicit state.", ["grid transformation", "spiral or diagonal order"]],
  ["bitwise", "Bit manipulation", "Represent boolean facts as bits and use algebraic identities to update many facts at once.", ["parity or masks", "powers of two"]],
  ["tries", "Tries", "Store shared prefixes as paths so prefix queries cost key length rather than corpus size.", ["prefix lookup", "dictionary over characters or bits"]],
  ["union-find", "Disjoint-set union", "Represent each component by a root and compress paths as connectivity queries arrive.", ["incremental connectivity", "merge groups"]],
  ["shortest-paths", "Weighted shortest paths", "Relax edges until every settled distance is the best possible under the weight constraints.", ["weighted graph", "minimum travel cost"]],
  ["minimum-spanning-tree", "Minimum spanning tree", "Grow or select the cheapest safe edge that connects components without a cycle.", ["connect all vertices", "minimum total edge cost"]],
  ["topological-sort", "Topological ordering", "Repeatedly remove dependency-free vertices or order by DFS completion.", ["directed dependencies", "valid build order"]],
  ["segment-tree", "Segment trees", "Store summaries for recursively partitioned ranges and merge only affected nodes.", ["mutable range queries", "associative range operation"]],
  ["fenwick-tree", "Fenwick trees", "Encode prefix aggregates in binary-indexed partial ranges.", ["prefix sums with updates", "compact indexed tree"]],
  ["string-matching", "String matching", "Reuse information about already matched prefixes instead of restarting every comparison.", ["substring search", "prefix and suffix overlap"]],
  ["advanced-window", "Advanced windows", "Maintain a window with a richer ordered or counted state.", ["streaming range statistics", "window median or bounded difference"]],
  ["greedy", "Greedy exchange arguments", "Choose the locally safest action and prove an optimal solution can be transformed to include it.", ["schedule or cover", "local choice with monotonic payoff"]],
  ["dp-grid", "Grid dynamic programming", "Let each cell summarize paths or cost reaching that coordinate.", ["grid paths", "local transitions from neighbours"]],
  ["knapsack", "Knapsack dynamic programming", "Track the best value or reachability for each capacity after processing a prefix of choices.", ["capacity constraint", "choose each item zero, one, or many times"]],
  ["state-machine-dp", "State-machine dynamic programming", "Model each legal phase as a state and transitions as decisions over time.", ["buy, sell, cooldown", "few repeating phases"]],
  ["monotonic-queue", "Monotonic queues", "Discard dominated window candidates while preserving arrival order.", ["window maximum or minimum", "online bounded range"]],
  ["sweep-line", "Sweep line", "Sort events by coordinate and update only active geometry or intervals.", ["overlapping events", "geometric boundaries"]],
  ["number-theory", "Number theory", "Exploit divisibility, modular arithmetic, and prime factor structure.", ["gcd or modular result", "prime factors"]],
  ["combinatorics", "Combinatorics", "Count outcomes by decomposing choices and correcting overlap.", ["count arrangements", "binomial or inclusion-exclusion"]],
  ["divide-conquer", "Divide and conquer", "Split into independent subproblems, solve recursively, and combine their summaries.", ["mergeable halves", "recursive partition"]],
  ["randomized", "Randomized algorithms", "Use a controlled random choice to simplify expected behavior while preserving correctness.", ["uniform sampling", "expected linear selection"]]
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
  "dynamic-programming": ["Count Stair Routes", "Maximum Non-Adjacent Sum", "Minimum Coins", "Longest Increasing Subsequence", "Edit Distance"],
  matrix: ["Rotate a Square Matrix", "Spiral Matrix Walk", "Zero Rows and Columns", "Diagonal Traverse", "Search a Sorted Matrix"],
  bitwise: ["Unique Value by XOR", "Count Set Bits", "Subset Masks", "Range Bitwise AND", "Maximum XOR Pair"],
  tries: ["Prefix Dictionary", "Wildcard Dictionary", "Longest Shared Prefix", "Word Replacement", "Binary XOR Trie"],
  "union-find": ["Redundant Connection", "Dynamic Island Count", "Account Grouping", "Equation Satisfiability", "Network Connection Budget"],
  "shortest-paths": ["Weighted Route Cost", "Delayed Signal", "Cheapest Limited-Hop Flight", "Grid Effort Path", "Negative-Edge Distances"],
  "minimum-spanning-tree": ["Connect All Sites", "Minimum Cable Layout", "Water Distribution Plan", "Cluster by Spacing", "Second-Best Spanning Tree"],
  "topological-sort": ["Course Ordering", "Alien Alphabet", "Build Pipeline Order", "Parallel Semesters", "Safe Terminal Nodes"],
  "segment-tree": ["Mutable Range Sum", "Range Minimum", "Lazy Range Addition", "Maximum Subarray Query", "Interval Coverage Tree"],
  "fenwick-tree": ["Prefix Sum Updates", "Count Smaller Values", "Inversion Count", "Range Add Point Query", "Two-Dimensional Prefix Updates"],
  "string-matching": ["Find a Pattern with KMP", "Repeated Prefix Border", "Rolling-Hash Search", "Longest Palindromic Prefix", "Multiple Pattern Matches"],
  "advanced-window": ["Window Maximum", "Window Median", "Longest Bounded-Difference Segment", "Distinct Count per Window", "Minimum Window with Two Budgets"],
  greedy: ["Maximum Non-Overlapping Jobs", "Minimum Refuelling Stops", "Gas Circuit Start", "Candy Distribution", "Patch Missing Coverage"],
  "dp-grid": ["Unique Grid Paths", "Minimum Path Sum", "Obstacle Paths", "Maximum Falling Path", "Two-Agent Grid Collection"],
  knapsack: ["Subset Sum", "Equal Partition", "Zero-One Knapsack", "Unbounded Knapsack", "Target Sign Assignments"],
  "state-machine-dp": ["Single Stock Trade", "Unlimited Stock Trades", "Stock Trades with Fee", "Stock Cooldown", "At Most K Trades"],
  "monotonic-queue": ["Sliding Window Maximum", "Shortest Sum-at-Least-K Segment", "Constrained Subsequence Sum", "Jump Game Score", "Bounded Difference Stream"],
  "sweep-line": ["Peak Concurrent Meetings", "Skyline Outline", "Rectangle Union Area", "Closest Active Segment", "Calendar Conflict Ledger"],
  "number-theory": ["Greatest Common Divisor", "Prime Sieve", "Fast Modular Power", "Modular Inverse", "Count Prime Factors"],
  combinatorics: ["Binomial Coefficient", "Catalan Structures", "Count Grid Lattice Paths", "Derangement Count", "Inclusion-Exclusion Count"],
  "divide-conquer": ["Merge Sort", "Quickselect", "Count Reverse Pairs", "Closest Point Pair", "Multiply Large Integers"],
  randomized: ["Reservoir Sample", "Randomized Quickselect", "Shuffle Uniformly", "Weighted Random Choice", "Random Set Operations"]
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
      sheetRanks: { ...(index < 75 ? { atlas75: index + 1 } : {}), ...(index < 180 ? { atlas180: index + 1 } : {}), atlas300: index + 1 },
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
  { id: "atlas-75", title: "Atlas 75", summary: "The essential pattern progression for entry-to-mid-level coding interviews.", problemIds: dsaProblems.filter((problem) => problem.sheetRanks.atlas75).map((problem) => problem.id) },
  { id: "atlas-180", title: "Atlas 180", summary: "Atlas 75 plus broader pattern, data-structure, and role coverage with four-language artifacts.", problemIds: dsaProblems.filter((problem) => problem.sheetRanks.atlas180).map((problem) => problem.id), supersetOf: "atlas-75" },
  { id: "atlas-300", title: "Atlas 300", summary: "The complete core and advanced progression. Release 11 expands this set.", problemIds: dsaProblems.map((problem) => problem.id), supersetOf: "atlas-180" }
]);

export const dsaProblemById = new Map(dsaProblems.map((problem) => [problem.id, problem]));
export const dsaPatternById = new Map(dsaPatterns.map((pattern) => [pattern.id, pattern]));
export const dsaSheetById = new Map(dsaSheets.map((sheet) => [sheet.id, sheet]));
