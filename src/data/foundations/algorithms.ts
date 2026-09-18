import type { FoundationLessonMap } from "@/data/foundations/types";

const cppSources = [
  { label: "cppreference", url: "https://en.cppreference.com/w/" },
  { label: "C++ Core Guidelines", url: "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines" }
];

export const algorithmLessons: FoundationLessonMap = {
  "foundations/c-plus-plus-interview-setup": {
    summary: "Build, run, and reason about C++17 interview code with a small, reliable template and explicit ownership.",
    durationMinutes: 35, level: "foundation", roleIds: ["sde", "ai-engineer", "ml-engineer", "fintech", "quant-dev"], prerequisites: [],
    outcomes: ["Explain the compile-link-run pipeline", "Use references, const, and RAII deliberately", "Write a portable C++17 interview harness"],
    conceptMap: ["Source becomes object code, then a linked executable", "Values own state; references and pointers name state", "RAII binds resource lifetime to object lifetime", "A small harness makes edge cases easy to run"],
    keyIdea: "Interview C++ should optimize for visible invariants and defined behavior, not the shortest possible syntax.",
    analogy: { title: "A workshop with labeled tools", body: "The compiler checks how each tool is used, the linker finds tools stored elsewhere, and RAII returns anything checked out when its owner leaves the room." },
    theory: [
      { heading: "Translation pipeline", body: "Preprocessing expands includes and macros, compilation checks and translates each translation unit, and linking resolves external symbols. A compile error is local syntax or type trouble; an undefined-reference error usually means a missing definition or link input; a runtime fault occurs after the executable starts." },
      { heading: "Values and ownership", body: "Prefer values for independent data, const references for read-only borrowing, and references or pointers only when mutation, optionality, or identity matters. Standard containers own their elements. RAII types release resources through destructors even across exceptions and early returns." },
      { heading: "Reliable baseline", body: "State C++17, give time and space complexity, and test empty, singleton, duplicate, and boundary inputs. Avoid non-standard headers when portability matters. Practice with warnings and sanitizers because undefined behavior may appear to work." }
    ],
    example: { title: "A testable function", language: "cpp", code: `long long sum(const std::vector<int>& values) {
    long long total = 0;
    for (int value : values) total += value;
    return total;
}`, explanation: "The function borrows its input through a const reference, uses a wider accumulator, and keeps I/O outside the algorithm." },
    failureModes: ["Returning a reference to a local variable", "Using an invalidated iterator", "Overflowing int before assigning to long long", "Out-of-bounds or uninitialized reads", "Putting all logic inside main"],
    question: { id: "cpp-dangling-reference", type: "short", difficulty: "medium", timeboxMinutes: 7, prompt: "A function returns const int& to an element of a local vector. Explain the bug and give two safe API designs.", hints: ["Who owns the vector after return?", "Transfer a value or let the caller retain ownership."], answer: "The vector is destroyed on return, so the reference dangles and every later read is undefined behavior. Return the int by value, or let the caller own the vector and return an index/iterator under a documented validity contract.", rubric: ["Identifies lifetime and undefined behavior", "Offers value return", "Offers a caller-owned alternative"], tags: ["c++", "lifetime", "debugging"] },
    flashcards: [{ front: "Compile error vs link error?", back: "Compilation rejects a translation unit; linking cannot resolve symbols across units." }, { front: "Why const& for a vector?", back: "Avoid a copy while preventing mutation through that parameter." }, { front: "RAII?", back: "Resource lifetime follows object lifetime." }],
    revision: ["Target C++17 unless told otherwise", "Prefer values and standard containers", "Use const references for large read-only inputs", "Check overflow, lifetime, bounds, and invalidation", "Separate algorithm from I/O"], sources: cppSources
  },
  "foundations/complexity-analysis": {
    summary: "Derive time and space bounds, amortized costs, and input-sensitive trade-offs instead of memorizing labels.",
    durationMinutes: 45, level: "foundation", roleIds: ["sde", "ai-engineer", "ml-engineer", "data-scientist", "data-engineer", "fintech", "quant-dev"], prerequisites: ["foundations/c-plus-plus-interview-setup"],
    outcomes: ["Derive bounds from operation counts", "Distinguish worst, expected, and amortized cost", "Expose hidden input dimensions and space costs"],
    conceptMap: ["Choose input dimensions before counting work", "Sequential blocks add; dependent nested work must be summed", "Bounds discard constants, not relevant variables", "Amortization spreads rare expensive work across a sequence"],
    keyIdea: "Complexity is a model of scaling; its assumptions and input variables are part of the answer.",
    analogy: { title: "A zoomed-out map", body: "A map omits chair placement but must show every city that changes the journey. Big-O removes machine constants while retaining every dimension that changes growth." },
    theory: [
      { heading: "Bounds and cases", body: "O is an asymptotic upper bound, Ω a lower bound, and Θ a tight bound. State worst-case, expected, or amortized. Hash lookup is expected O(1) under hashing assumptions but worst-case O(n)." },
      { heading: "Counting", body: "Consecutive loops add; independent nested loops multiply. A triangular loop sums 1 through n and is Θ(n²). Halving an interval yields Θ(log n). For recursion, write a recurrence and count work at every level." },
      { heading: "Amortization and space", body: "A dynamic-array append is amortized O(1): occasional Θ(n) copies are spread across cheap appends. Count recursion depth as auxiliary space and keep variables such as V and E or n and m separate." }
    ],
    example: { title: "Count before simplifying", language: "cpp", code: `for (int i = 0; i < n; ++i)
    for (int j = i; j < n; ++j)
        use(a[i], a[j]);`, explanation: "The total iterations are n+(n-1)+...+1=n(n+1)/2, so time is Θ(n²) and auxiliary space is Θ(1) if use does not allocate." },
    failureModes: ["Dropping a second input variable", "Calling hash lookup worst-case O(1)", "Multiplying consecutive loops", "Ignoring stack or output space", "Omitting case and assumptions"],
    question: { id: "complexity-dynamic-array", type: "short", difficulty: "medium", timeboxMinutes: 8, prompt: "A vector doubles when full. Prove n appends take O(n) total copy work and state the amortized cost.", hints: ["Copies occur at 1,2,4,...", "Bound the geometric sum."], answer: "Resize copies total less than 1+2+...+2^k<2n. Adding n writes remains O(n), so append is amortized O(1), though a single resizing append is O(n).", rubric: ["Identifies geometric sizes", "Bounds total by O(n)", "Separates individual and amortized cost"], tags: ["big-o", "amortized", "arrays"] },
    flashcards: [{ front: "O vs Θ?", back: "Upper bound versus tight bound." }, { front: "Expected vs amortized?", back: "Randomness/input distribution versus averaging over an operation sequence." }, { front: "BFS complexity?", back: "O(V+E) time with adjacency lists." }],
    revision: ["Name every input dimension", "State worst, expected, or amortized", "Add sequential work", "Write recurrences", "Report auxiliary and output space"], sources: [{ label: "MIT 6.006", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/" }, { label: "Open Data Structures", url: "https://opendatastructures.org/ods-cpp/2_Analysis_Algorithms.html" }]
  },
  "foundations/stl-and-iterators": {
    summary: "Choose C++ containers and algorithms by guarantees, then reason safely about iterators, comparators, and invalidation.",
    durationMinutes: 50, level: "foundation", roleIds: ["sde", "ai-engineer", "ml-engineer", "data-engineer", "fintech", "quant-dev"], prerequisites: ["foundations/c-plus-plus-interview-setup", "foundations/complexity-analysis"],
    outcomes: ["Select containers from operation requirements", "Apply algorithms over valid ranges", "Explain iterator invalidation"],
    conceptMap: ["Containers define storage and complexity", "Iterators describe positions and traversal", "Algorithms use half-open ranges", "Mutation may invalidate observers"],
    keyIdea: "Use the weakest abstraction that expresses the operation; algorithms over ranges usually beat handwritten index loops.",
    analogy: { title: "Library cards and moving shelves", body: "An iterator points to a shelf position. If shelving moves, the container rules tell you which cards still point somewhere valid." },
    theory: [
      { heading: "Container choices", body: "vector is the default sequence: contiguous, cache-friendly, O(1) indexing, amortized append. deque supports both ends; map/set are ordered O(log n); unordered variants offer expected O(1); priority_queue exposes one extreme." },
      { heading: "Ranges and algorithms", body: "Half-open [first,last) ranges represent emptiness and partitions cleanly. sort needs random-access iterators. lower_bound requires a partitioned range. Prefer named algorithms when they communicate intent." },
      { heading: "Invalidation and ordering", body: "vector reallocation invalidates all iterators, references, and pointers; erase invalidates positions at and after it. Ordered containers need strict weak ordering, so comparators use < semantics rather than <=." }
    ],
    example: { title: "Sort and deduplicate", language: "cpp", code: `std::sort(values.begin(), values.end());
values.erase(std::unique(values.begin(), values.end()), values.end());`, explanation: "unique compacts adjacent duplicates and returns the logical end; erase removes the suffix. Time is O(n log n)." },
    failureModes: ["Dereferencing end()", "Keeping a vector iterator across reallocation", "Calling lower_bound on unpartitioned data", "Using <= in a comparator", "Choosing list without measuring locality cost"],
    question: { id: "stl-erase-loop", type: "coding", difficulty: "medium", timeboxMinutes: 12, prompt: "Remove every odd number from a vector in place. Give complexity and invalidation behavior.", hints: ["Use a standard compaction algorithm.", "One range erase avoids repeated shifting."], answer: "Use values.erase(std::remove_if(begin,end,isOdd),end). remove_if compacts kept elements and erase destroys the suffix. Time O(n), auxiliary space O(1); iterators and references at or after the erase point are invalidated.", rubric: ["Uses safe linear compaction", "States O(n)", "Explains invalidation", "Handles negative odds"], tags: ["c++", "stl", "iterators"] },
    flashcards: [{ front: "Why vector by default?", back: "Locality, O(1) indexing, amortized append." }, { front: "begin/end range?", back: "[begin,end); end is not dereferenceable." }, { front: "Comparator rule?", back: "Strict weak ordering." }],
    revision: ["Default to vector", "Match iterator category", "Remember half-open ranges", "Reacquire after invalidation", "Use strict comparators"], sources: cppSources
  },
  "foundations/arrays-and-strings": {
    summary: "Solve sequence problems with explicit invariants: two pointers, windows, prefix summaries, and in-place transforms.",
    durationMinutes: 55, level: "foundation", roleIds: ["sde", "ai-engineer", "ml-engineer", "data-scientist", "data-engineer", "fintech", "quant-dev"], prerequisites: ["foundations/complexity-analysis", "foundations/stl-and-iterators"],
    outcomes: ["Choose pointer, window, or prefix patterns", "State a loop invariant", "Handle encoding and boundaries deliberately"],
    conceptMap: ["Contiguous sequences make indexed scans cheap", "Two pointers exploit order", "Windows maintain a contiguous property", "Prefixes turn range queries into differences"],
    keyIdea: "The invariant—not the pattern name—explains why adding, removing, or discarding an element is safe.",
    analogy: { title: "A movable camera frame", body: "Update only what enters and leaves the frame while preserving the rule that makes the view valid." },
    theory: [
      { heading: "Pointers", body: "Opposing pointers work when order or symmetry makes discarded positions irrelevant. Read/write pointers compact in place. State what region is already final before each iteration." },
      { heading: "Windows and prefixes", body: "A variable window needs a monotone validity property; negative numbers break many sum-window arguments. Prefix sums answer [l,r) as prefix[r]-prefix[l] and convert subarray conditions into earlier-prefix lookup." },
      { heading: "Strings", body: "std::string is bytes, not user-perceived characters. State ASCII assumptions; Unicode requires decoding and normalization choices. Clarify whether in-place edits may change length." }
    ],
    example: { title: "Longest unique byte substring", language: "cpp", code: `std::array<int, 256> last; last.fill(-1);
int best = 0, left = 0;
for (int right = 0; right < (int)s.size(); ++right) {
    unsigned char c = s[right];
    left = std::max(left, last[c] + 1);
    last[c] = right;
    best = std::max(best, right - left + 1);
}`, explanation: "[left,right] has unique bytes. left never moves backward, so time is O(n)." },
    failureModes: ["Moving a window boundary backward", "Using a sum window with negative values", "Mixing inclusive and half-open ranges", "Indexing by signed char", "Assuming bytes equal Unicode characters"],
    question: { id: "array-min-window", type: "coding", difficulty: "medium", timeboxMinutes: 25, prompt: "For positive integers and target S, return the minimum contiguous length with sum at least S, or zero.", hints: ["Positivity makes sum monotone.", "Shrink repeatedly while valid."], answer: "Expand right and add each value. While sum≥S, record the length, subtract a[left], and advance left. Each index enters and leaves once: O(n), O(1). Positivity is essential.", rubric: ["Correct window invariant", "Repeated shrinking", "O(n) proof", "Names positivity assumption"], tags: ["arrays", "sliding-window", "two-pointers"] },
    flashcards: [{ front: "When does a sliding window fit?", back: "When validity changes monotonically enough to discard boundaries." }, { front: "Range sum [l,r)?", back: "prefix[r]-prefix[l]." }, { front: "Read/write invariant?", back: "The prefix before write is final." }],
    revision: ["Define boundary convention", "Say the invariant", "Use prefix differences", "Test empty and overflow", "State encoding assumptions"], sources: [{ label: "Open Data Structures: Arrays", url: "https://opendatastructures.org/ods-cpp/2_Array_Based_Lists.html" }, { label: "Unicode principles", url: "https://www.unicode.org/standard/principles.html" }]
  },
  "foundations/stacks-and-queues": {
    summary: "Recognize LIFO, FIFO, monotonic, and deque invariants in parsing, traversal, and next-element problems.",
    durationMinutes: 45, level: "foundation", roleIds: ["sde", "ai-engineer", "data-engineer", "devops", "fintech"], prerequisites: ["foundations/arrays-and-strings"],
    outcomes: ["Model work with LIFO or FIFO", "Build monotonic structures", "Explain amortized deque operations"],
    conceptMap: ["Stacks expose recent unresolved work", "Queues process arrival order", "Monotonic structures discard dominated candidates", "Each candidate enters and leaves once"],
    keyIdea: "Choose from the order unresolved work becomes available, then name what every stored item represents.",
    analogy: { title: "Plates and a service line", body: "A plate stack returns the latest plate; a service line handles the earliest arrival. A monotonic line also removes candidates that can never win." },
    theory: [
      { heading: "Order", body: "Stacks model nesting, undo, DFS, and evaluation. Queues model BFS, scheduling, and buffered work. Their core operations are O(1) with suitable backing containers." },
      { heading: "Monotonic structures", body: "A monotonic stack keeps unresolved indices ordered by value. A monotonic deque maintains moving-window extrema by expiring old indices at the front and removing dominated values at the back." },
      { heading: "Amortized proof", body: "A step may pop many entries, but each index is pushed and popped at most once, so total work is O(n). Store indices when distance, expiry, or duplicate position matters." }
    ],
    example: { title: "Next warmer position", language: "cpp", code: `for (int i = 0; i < (int)t.size(); ++i) {
    while (!pending.empty() && t[pending.back()] < t[i]) {
        int j = pending.back(); pending.pop_back();
        wait[j] = i - j;
    }
    pending.push_back(i);
}`, explanation: "pending holds unresolved indices with non-increasing values. Push-once/pop-once gives O(n)." },
    failureModes: ["Reading an empty top/front", "Storing values when indices are needed", "Wrong < versus <= for duplicates", "Using vector.erase(begin()) as a queue", "Calling a nested pop loop O(n²)"],
    question: { id: "sliding-window-maximum", type: "coding", difficulty: "hard", timeboxMinutes: 25, prompt: "Return every length-k window maximum in O(n) time.", hints: ["Keep candidate indices.", "Expire front; remove dominated back."], answer: "Maintain decreasing values in an index deque. Pop front while index≤i-k, pop back while a[back]≤a[i], push i, and output a[front] after the first full window. O(n) time, O(k) space.", rubric: ["Index deque", "Expiry and domination", "Correct output boundary", "Amortized O(n) proof"], tags: ["deque", "monotonic", "arrays"] },
    flashcards: [{ front: "Why indices in deque?", back: "For expiry and distances." }, { front: "Why O(n)?", back: "Each index is pushed and popped at most once." }, { front: "BFS order?", back: "FIFO." }],
    revision: ["LIFO for nesting", "FIFO for layers", "State monotonic invariant", "Store indices for expiry", "Use push-once/pop-once proof"], sources: cppSources
  },
  "foundations/linked-lists": {
    summary: "Manipulate node chains safely using pointer invariants, sentinels, and fast/slow reasoning.",
    durationMinutes: 45, level: "foundation", roleIds: ["sde", "fintech", "quant-dev"], prerequisites: ["foundations/c-plus-plus-interview-setup", "foundations/complexity-analysis"],
    outcomes: ["Reverse and splice without losing nodes", "Use sentinels at boundaries", "Derive fast/slow algorithms"],
    conceptMap: ["Nodes store values and links", "A pointer update changes reachability", "Sentinels normalize head cases", "Different speeds expose cycles and midpoints"],
    keyIdea: "Before changing a link, save every node that must remain reachable and name the prefix already correct.",
    analogy: { title: "Reclipping a chain", body: "Hold the remaining chain before reversing the current clip; otherwise the rest becomes unreachable." },
    theory: [
      { heading: "Trade-offs", body: "Insertion is O(1) once a node is known, but locating it is O(n). Lists preserve node addresses yet pay pointer, allocation, and cache-locality costs; they are not automatically faster than vector." },
      { heading: "Invariants", body: "During reversal, prev heads the reversed prefix and cur the untouched suffix. Save next before redirecting. A dummy head makes every real node have a predecessor." },
      { heading: "Fast and slow", body: "Two speeds find midpoints and cycles. After a meeting in a cycle, resetting one pointer to head and advancing both one step locates the entry by cycle-distance arithmetic." }
    ],
    example: { title: "Iterative reversal", language: "cpp", code: `ListNode* prev = nullptr;
while (head) {
    ListNode* next = head->next;
    head->next = prev;
    prev = head;
    head = next;
}
return prev;`, explanation: "prev is the reversed prefix and head the untouched suffix. Time O(n), space O(1)." },
    failureModes: ["Overwriting next too early", "Unsafe fast->next access", "Ignoring observer invalidation", "Leaking owned nodes", "Unbounded recursive depth"],
    question: { id: "linked-list-cycle-entry", type: "coding", difficulty: "medium", timeboxMinutes: 20, prompt: "Return the first node in a list cycle using O(1) extra space.", hints: ["Make fast and slow meet.", "Reset one to head, then advance both by one."], answer: "Run slow by one and fast by two. If they meet, reset slow to head; move both one step until equal and return that node. If fast reaches null, return null. O(n) time, O(1) space.", rubric: ["Safe null checks", "Correct two phases", "Returns entry", "States complexity"], tags: ["linked-list", "two-pointers", "cycle"] },
    flashcards: [{ front: "Reversal invariant?", back: "prev is reversed; current is untouched." }, { front: "Why dummy node?", back: "Removes head special cases." }, { front: "Insertion cost?", back: "O(1) once position is known." }],
    revision: ["Draw links", "Save next", "Use a sentinel", "Guard pointer access", "State ownership"], sources: [{ label: "Open Data Structures: Lists", url: "https://opendatastructures.org/ods-cpp/3_Linked_Lists.html" }, cppSources[1]]
  },
  "foundations/trees-and-bsts": {
    summary: "Reason about hierarchical data with recursive contracts, traversal order, and BST invariants.",
    durationMinutes: 60, level: "foundation", roleIds: ["sde", "ai-engineer", "data-engineer", "fintech", "quant-dev"], prerequisites: ["foundations/stacks-and-queues", "foundations/linked-lists"],
    outcomes: ["Select DFS or BFS", "Write subtree contracts", "Validate BSTs with global bounds"],
    conceptMap: ["A tree is a root plus subtrees", "DFS order depends on when node work occurs", "BFS exposes layers", "BST ordering is a global range constraint"],
    keyIdea: "Define what one subtree returns; the whole-tree solution should be a small composition of child results.",
    analogy: { title: "A management hierarchy", body: "Each report returns a complete department summary; the manager combines child summaries into one for the larger subtree." },
    theory: [
      { heading: "Traversal", body: "Preorder suits serialization, inorder yields sorted BST order, postorder computes from children, and BFS handles layers. Recursive DFS uses O(h) stack space." },
      { heading: "Contracts", body: "A helper may return height, validity, an answer, or a tuple. Define the empty identity. Avoid recomputing the same subtree property at every ancestor." },
      { heading: "BST correctness", body: "Every node must satisfy bounds inherited from all ancestors, not only its parent. State duplicate policy. Without balancing, height and operations may degrade to O(n)." }
    ],
    example: { title: "BST validation", language: "cpp", code: `bool valid(Node* n, long long lo, long long hi) {
    if (!n) return true;
    if (n->value <= lo || n->value >= hi) return false;
    return valid(n->left, lo, n->value) &&
           valid(n->right, n->value, hi);
}`, explanation: "Inherited bounds carry every ancestor constraint and this contract forbids duplicates." },
    failureModes: ["Checking only children", "Assuming height is log n", "Overflowing integer bounds", "Repeated subtree work", "Ambiguous duplicate policy"],
    question: { id: "tree-balanced", type: "coding", difficulty: "medium", timeboxMinutes: 20, prompt: "Check height balance in O(n) time.", hints: ["Do not recompute height.", "Use one value for both height and failure."], answer: "Postorder returns height or -1 for imbalance. If either child is -1 or heights differ by more than one, return -1; otherwise return 1+max. O(n) time, O(h) stack.", rubric: ["One postorder pass", "Early failure propagation", "Correct empty base", "O(n)/O(h)"], tags: ["trees", "dfs", "recursion"] },
    flashcards: [{ front: "BST inorder?", back: "Sorted keys under its duplicate policy." }, { front: "DFS stack space?", back: "O(h)." }, { front: "Why postorder for height?", back: "Parent needs child results first." }],
    revision: ["Write subtree contract", "Choose traversal timing", "Define empty tree", "Carry global bounds", "Use n and h in complexity"], sources: [{ label: "Open Data Structures: Trees", url: "https://opendatastructures.org/ods-cpp/6_Binary_Trees.html" }, { label: "MIT 6.006 BST", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/lecture-4-binary-search-trees/" }]
  },
  "foundations/heaps-and-priority-queues": {
    summary: "Use partial ordering to retrieve extrema, maintain top-k sets, and schedule work efficiently.",
    durationMinutes: 45, level: "foundation", roleIds: ["sde", "ai-engineer", "data-engineer", "devops", "fintech", "quant-dev"], prerequisites: ["foundations/trees-and-bsts", "foundations/stl-and-iterators"],
    outcomes: ["Explain heap invariants", "Choose heap direction for top-k", "State build, push, and pop costs"],
    conceptMap: ["A binary heap is a complete tree in an array", "Only parent-child priority is guaranteed", "Push repairs up; pop repairs down", "A bounded opposite heap retains the best k"],
    keyIdea: "A heap is for repeated access to one extreme, not sorted iteration or arbitrary fast search.",
    analogy: { title: "A triage board", body: "The most urgent case is visible, but the rest is ordered only enough to reveal the next case after removal." },
    theory: [
      { heading: "Operations", body: "For zero-based i, children are 2i+1 and 2i+2. top is O(1); push/pop O(log n). Bottom-up heap construction is O(n), tighter than n separate insertions." },
      { heading: "Top-k", body: "For k largest, keep a min-heap of size k. Its root is the weakest retained candidate. Streaming cost is O(n log k) and space O(k)." },
      { heading: "Priorities", body: "C++ priority_queue is a max-heap under its comparator. For a min-heap reverse comparison. Mutable priorities need reinsertion/lazy deletion or a structure with decrease-key." }
    ],
    example: { title: "Keep k largest", language: "cpp", code: `std::priority_queue<int, std::vector<int>, std::greater<int>> kept;
for (int x : values) {
    kept.push(x);
    if ((int)kept.size() > k) kept.pop();
}`, explanation: "The min-heap contains the k largest seen; top is the kth largest when k is valid." },
    failureModes: ["Expecting heap iteration sorted", "Wrong heap direction", "Calling build-heap O(n log n)", "Ignoring invalid k", "Mutating an in-heap key"],
    question: { id: "heap-merge-streams", type: "coding", difficulty: "medium", timeboxMinutes: 22, prompt: "Merge k sorted arrays containing n total values.", hints: ["Only one candidate per array can be next.", "Store source and position."], answer: "Push each nonempty array's first element into a min-heap. Pop the smallest, output it, and push the next from that source. O(n log k) time, O(k) auxiliary space.", rubric: ["One frontier per array", "Advances popped source", "Handles empties", "Correct complexity"], tags: ["heap", "merge", "top-k"] },
    flashcards: [{ front: "Build heap?", back: "O(n)." }, { front: "k largest heap?", back: "Min-heap of size k." }, { front: "top/push/pop?", back: "O(1)/O(log n)/O(log n)." }],
    revision: ["One extreme, not total order", "Opposite heap for top-k", "Build is O(n)", "Test comparator with tiny data", "Do not mutate stored priorities"], sources: cppSources
  },
  "foundations/graphs": {
    summary: "Model relationships and apply traversal, ordering, connectivity, and shortest-path invariants.",
    durationMinutes: 70, level: "interview", roleIds: ["sde", "ai-engineer", "data-engineer", "devops", "security", "fintech", "quant-dev"], prerequisites: ["foundations/stacks-and-queues", "foundations/heaps-and-priority-queues"],
    outcomes: ["Choose graph representations", "Select BFS, DFS, topological sort, or Dijkstra", "Prove visitation and relaxation invariants"],
    conceptMap: ["Vertices are entities and edges relationships", "BFS explores unweighted layers", "DFS exposes reachability and finish structure", "Shortest paths depend on weight assumptions"],
    keyIdea: "Classify direction, weights, cycles, and density before choosing an algorithm.",
    analogy: { title: "A transport network", body: "BFS counts equal-cost stops, Dijkstra plans nonnegative travel time, and topological sort schedules dependencies that cannot loop." },
    theory: [
      { heading: "Representation", body: "Adjacency lists use O(V+E) and fit sparse graphs; matrices use O(V²) and give O(1) edge lookup. Store both directions for undirected edges." },
      { heading: "Traversal", body: "BFS finds minimum edge count in unweighted graphs. DFS supports components and cycles. Kahn's algorithm removes zero-indegree vertices; incomplete output proves a directed cycle." },
      { heading: "Weighted paths", body: "Dijkstra greedily finalizes distances only with nonnegative weights. Negative edges need algorithms such as Bellman-Ford. Relaxation replaces a distance when a path through the current vertex is shorter." }
    ],
    example: { title: "Unweighted distances", language: "cpp", code: `std::vector<int> dist(g.size(), -1);
std::queue<int> q; dist[s] = 0; q.push(s);
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : g[u]) if (dist[v] == -1) {
        dist[v] = dist[u] + 1; q.push(v);
    }
}`, explanation: "Marking on enqueue prevents duplicates; FIFO discovers the fewest-edge path first. O(V+E)." },
    failureModes: ["Marking visited too late", "Dijkstra with negative edges", "Ignoring disconnected components", "Wrong directed cycle logic", "Wrong complexity for representation"],
    question: { id: "graph-course-order", type: "coding", difficulty: "medium", timeboxMinutes: 25, prompt: "Return a valid course order from prerequisite pairs, or empty if impossible.", hints: ["Point prerequisite toward dependent.", "Count unresolved incoming edges."], answer: "Build prereq→course edges and indegrees. Queue zero-indegree courses, pop and decrement neighbors, and enqueue new zeros. Output all V for success; fewer means a cycle. O(V+E).", rubric: ["Correct edge direction", "Indegree queue", "Cycle detection", "Linear complexity"], tags: ["graphs", "topological-sort", "bfs"] },
    flashcards: [{ front: "BFS shortest-path assumption?", back: "Equal-cost/unweighted edges." }, { front: "Dijkstra requirement?", back: "Nonnegative weights." }, { front: "List traversal cost?", back: "O(V+E)." }],
    revision: ["Classify graph", "Use lists for sparse data", "Mark BFS on enqueue", "Topo order only for DAGs", "Reject Dijkstra with negative edges"], sources: [{ label: "MIT 6.006 Graph Search", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/" }, { label: "Open Data Structures: Graphs", url: "https://opendatastructures.org/ods-cpp/12_Graphs.html" }]
  },
  "foundations/recursion-and-backtracking": {
    summary: "Design recursive contracts and prune state-space searches without corrupting shared state.",
    durationMinutes: 55, level: "foundation", roleIds: ["sde", "ai-engineer", "quant-dev"], prerequisites: ["foundations/stacks-and-queues", "foundations/trees-and-bsts"],
    outcomes: ["Define base cases and decreasing measures", "Trace call-stack state", "Build choose-explore-unchoose searches"],
    conceptMap: ["A call solves a smaller instance", "A base case ends descent", "Backtracking explores a decision tree", "Pruning removes provably useless branches"],
    keyIdea: "Every recursive function needs a contract and decreasing measure; every mutation needs a matching undo.",
    analogy: { title: "Maze exploration", body: "Choose a corridor, mark it, explore, then erase the mark so the next branch starts from the same state." },
    theory: [
      { heading: "Design", body: "Specify parameter and return meaning plus base cases. Identify a strictly decreasing measure. Call depth is space and can overflow for linear recursion." },
      { heading: "Backtracking", body: "Enumerate legal choices, apply, recurse, undo. Copying is simpler but costlier; in-place mutation requires disciplined rollback. Include output size in complexity." },
      { heading: "Pruning", body: "Prune only with proof. Sorting can group duplicate choices; skip equal choices at the same depth without erasing valid deeper reuse." }
    ],
    example: { title: "Generate subsets", language: "cpp", code: `void dfs(int i) {
    if (i == (int)a.size()) { out.push_back(path); return; }
    dfs(i + 1);
    path.push_back(a[i]); dfs(i + 1); path.pop_back();
}`, explanation: "Each element creates include/exclude branches. Output copying is Θ(n·2^n) in the worst case." },
    failureModes: ["No shrinking measure", "Missing undo", "Ignoring exponential output", "Unsound pruning assumptions", "Wrong duplicate depth"],
    question: { id: "backtracking-combination-sum", type: "coding", difficulty: "medium", timeboxMinutes: 25, prompt: "Distinct positive candidates may be reused. Return combinations summing to a target.", hints: ["Sort for pruning.", "Pass the same index for reuse."], answer: "Sort. DFS(start,remaining) loops i≥start while candidate≤remaining, pushes it, recurses with i and reduced remaining, then pops. Emit at zero. Nondecreasing indices avoid permutation duplicates.", rubric: ["Choose/explore/unchoose", "Reuse without permutation duplicates", "Sound positive pruning", "Output-dependent complexity"], tags: ["recursion", "backtracking", "search"] },
    flashcards: [{ front: "Recursive contract parts?", back: "Parameter meaning, result meaning, base case." }, { front: "Backtracking skeleton?", back: "Choose, explore, undo." }, { front: "Why output complexity?", back: "Every emitted result must be written." }],
    revision: ["Define contract", "Name decreasing measure", "Count stack depth", "Undo every mutation", "Prove pruning"], sources: [{ label: "MIT 6.006", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/" }, cppSources[1]]
  },
  "foundations/sorting-and-binary-search": {
    summary: "Choose sorting guarantees and use boundary-based binary search over values or monotone predicates.",
    durationMinutes: 60, level: "foundation", roleIds: ["sde", "ai-engineer", "data-scientist", "data-engineer", "fintech", "quant-dev"], prerequisites: ["foundations/arrays-and-strings", "foundations/complexity-analysis"],
    outcomes: ["Compare sorting guarantees", "Implement lower bound safely", "Search a monotone answer space"],
    conceptMap: ["Sorting enables simpler downstream work", "Comparison sorting has Ω(n log n) general lower bound", "Binary search finds a truth boundary", "Answer search uses feasibility instead of equality"],
    keyIdea: "Binary search finds the boundary where a monotone statement changes truth value.",
    analogy: { title: "First page of a chapter", body: "Ask whether each page is before the chapter; that predicate changes once, and the boundary is the answer." },
    theory: [
      { heading: "Sorting", body: "std::sort is O(n log n) worst-case and unstable; stable_sort preserves equivalent order. Merge sort uses extra array space; heap sort is in-place but less cache-friendly. Strong key assumptions enable counting/radix approaches." },
      { heading: "Boundary search", body: "For lower_bound, [lo,hi) contains the first value at least target. If a[mid]<target, lo=mid+1; otherwise hi=mid. Empty interval termination returns the insertion point." },
      { heading: "Answer search", body: "Prove feasible(x) monotone, bracket the boundary, and search first feasible or last feasible. Use safe midpoint arithmetic and boundary movement." }
    ],
    example: { title: "Lower bound", language: "cpp", code: `int lo = 0, hi = a.size();
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid;
}
return lo;`, explanation: "All indices before lo are too small and every possible answer remains in [lo,hi)." },
    failureModes: ["Non-monotone domain", "Mixing interval conventions", "Overflowing midpoint", "Not moving past mid", "Assuming sort stability"],
    question: { id: "binary-search-capacity", type: "coding", difficulty: "hard", timeboxMinutes: 30, prompt: "Positive package weights ship in order within D days. Find minimum capacity.", hints: ["Simulate days for a capacity.", "Feasibility grows monotonically."], answer: "Search [maxWeight,sum]. A feasibility scan starts a new day when the next item would exceed capacity. Use first-feasible lower-bound search. O(n log(sum-max)), O(1).", rubric: ["Correct bounds", "Linear simulation", "Monotonicity proof", "First-feasible search"], tags: ["binary-search", "sorting", "greedy"] },
    flashcards: [{ front: "lower_bound?", back: "First element not less than target." }, { front: "Stable sort?", back: "Equivalent elements retain order." }, { front: "Answer-search requirement?", back: "Monotone predicate and bracketing bounds." }],
    revision: ["Choose stability deliberately", "Use one interval convention", "Prove monotonicity", "Test edge insertion points", "Prevent overflow"], sources: cppSources
  },
  "foundations/greedy-algorithms": {
    summary: "Make local choices only when an exchange argument or invariant proves they compose globally.",
    durationMinutes: 50, level: "interview", roleIds: ["sde", "data-scientist", "fintech", "quant-dev"], prerequisites: ["foundations/sorting-and-binary-search"],
    outcomes: ["Recognize greedy structure", "Prove rules by exchange or staying ahead", "Find counterexamples and switch to DP"],
    conceptMap: ["Greedy commits without revisiting", "The choice leaves an optimal subproblem", "Exchange aligns an optimum with greedy", "Counterexamples reject plausible rules"],
    keyIdea: "The correctness proof—not the local rule—is the greedy algorithm.",
    analogy: { title: "Packing a calendar", body: "The earliest-finishing meeting leaves the most day. Any optimum's first meeting can be exchanged for it without losing room." },
    theory: [
      { heading: "Proofs", body: "Exchange transforms an optimum to agree with greedy without worsening it. Staying-ahead compares every partial result. Cut properties justify safe connections across partitions." },
      { heading: "Recognition", body: "Greedy often pairs with sorting, intervals, or a dominance rule. It fails when a temporarily worse choice enables a stronger combination." },
      { heading: "Method", body: "State the rule, search for small counterexamples, name the invariant, prove safety, then include sorting in complexity. If proof fails, formulate DP state." }
    ],
    example: { title: "Interval scheduling", language: "cpp", code: `std::sort(v.begin(), v.end(), byEnd);
for (auto x : v) if (x.start >= finish) {
    ++count; finish = x.end;
}`, explanation: "Replacing an optimum's first interval with the earlier-finishing greedy interval preserves every later compatible choice." },
    failureModes: ["Rule without proof", "Shortest duration instead of earliest finish", "Ignoring sort cost", "Arbitrary coin-change greedy", "Undefined overlap boundary"],
    question: { id: "greedy-jump-reachability", type: "coding", difficulty: "medium", timeboxMinutes: 18, prompt: "Array values are maximum jump lengths. Can the final index be reached?", hints: ["Track the farthest frontier.", "If i is beyond it, no earlier choice reaches i."], answer: "Scan while i≤farthest and update farthest=max(farthest,i+a[i]). Succeed when it reaches n-1; fail when i exceeds it. O(n), O(1).", rubric: ["Reachable frontier", "Correct failure condition", "Invariant", "Linear complexity"], tags: ["greedy", "invariant", "arrays"] },
    flashcards: [{ front: "Greedy proof?", back: "Exchange, staying ahead, or a cut property." }, { front: "Interval rule?", back: "Earliest finish." }, { front: "Warning sign?", back: "Local commitment blocks useful combinations." }],
    revision: ["State rule", "Try counterexamples", "Prove safety", "Include sorting", "Use DP if history needs state"], sources: [{ label: "MIT 6.006", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/" }, { label: "CLRS", url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/" }]
  },
  "foundations/dynamic-programming": {
    summary: "Turn repeated subproblems into explicit state, transitions, base cases, and evaluation order.",
    durationMinutes: 75, level: "interview", roleIds: ["sde", "ai-engineer", "data-scientist", "fintech", "quant-dev"], prerequisites: ["foundations/recursion-and-backtracking", "foundations/greedy-algorithms"],
    outcomes: ["Define minimal sufficient state", "Derive transitions and order", "Optimize space safely"],
    conceptMap: ["Optimal structure composes smaller answers", "Repeated subproblems make caching useful", "State carries all future-relevant history", "Memoization and tabulation evaluate one DAG"],
    keyIdea: "DP is a dependency graph of precisely defined subproblems, not a table-filling trick.",
    analogy: { title: "A minimal form", body: "The state is a form handed to the future: omit a needed field and histories merge incorrectly; include irrelevant fields and work explodes." },
    theory: [
      { heading: "State", body: "Write one sentence defining dp state. The transition enumerates a final choice or predecessor. Base cases cover smallest states; impossible states need safe sentinels." },
      { heading: "Evaluation", body: "Top-down memoization visits reachable states; bottom-up exposes order and memory reuse. Dependencies must be evaluated before consumers." },
      { heading: "Reconstruction", body: "Store choices when the path is needed. Roll rows only after proving overwritten values are unnecessary. Complexity is states times transitions, plus output." }
    ],
    example: { title: "Minimum coins", language: "cpp", code: `std::vector<int> dp(amount + 1, amount + 1); dp[0] = 0;
for (int x = 1; x <= amount; ++x)
    for (int c : coins) if (c <= x)
        dp[x] = std::min(dp[x], dp[x-c] + 1);`, explanation: "dp[x] is the fewest coins for exactly x; the last coin defines the transition." },
    failureModes: ["Insufficient state", "Transition before state meaning", "Overflowing sentinel", "Wrong compression direction", "Missing transition factor"],
    question: { id: "dp-house-robber", type: "coding", difficulty: "medium", timeboxMinutes: 20, prompt: "Maximum sum of non-adjacent nonnegative values using O(1) extra space.", hints: ["Last value is taken or skipped.", "Only two prior prefixes matter."], answer: "For each x compute cur=max(prev1,prev2+x), then shift prev2=prev1 and prev1=cur. This is dp[i]=max(dp[i-1],dp[i-2]+a[i]); O(n), O(1).", rubric: ["Prefix state", "Take/skip transition", "Empty input", "Safe compression"], tags: ["dynamic-programming", "arrays", "optimization"] },
    flashcards: [{ front: "DP complexity?", back: "States × transitions per state." }, { front: "Memo vs tabulation?", back: "Top-down cached recursion vs bottom-up order." }, { front: "When compress?", back: "When only bounded prior state is needed and update order preserves it." }],
    revision: ["Define state", "List choices", "Set bases and impossible states", "Order dependencies", "Store parents for reconstruction"], sources: [{ label: "MIT 6.006", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/" }, { label: "Open Data Structures", url: "https://opendatastructures.org/" }]
  },
  "foundations/bit-manipulation": {
    summary: "Use binary representations, masks, and XOR identities while avoiding signed-shift and width traps.",
    durationMinutes: 40, level: "interview", roleIds: ["sde", "security", "fintech", "quant-dev"], prerequisites: ["foundations/c-plus-plus-interview-setup", "foundations/discrete-mathematics"],
    outcomes: ["Read and update bit fields", "Apply XOR and power-of-two identities", "Use unsigned operations safely"],
    conceptMap: ["Integers are fixed-width patterns", "Masks select fields", "AND clears/tests, OR sets, XOR toggles", "Two's complement enables low-bit identities"],
    keyIdea: "Bit tricks are small algebraic proofs with explicit integer-width assumptions.",
    analogy: { title: "Labeled switches", body: "A mask is a stencil: AND observes exposed switches, OR turns them on, and XOR flips them." },
    theory: [
      { heading: "Operations", body: "Test bit k with (x>>k)&1, set with OR, clear with AND-not, toggle with XOR. x&(x-1) clears the lowest set bit. XOR is associative, commutative, self-canceling, with zero identity." },
      { heading: "Hazards", body: "Prefer unsigned fixed-width types. Shifting by at least the width is invalid, signed left overflow is problematic, and right shift of negative signed values is implementation-sensitive." },
      { heading: "Uses", body: "Masks model subsets and permissions; prefix XOR answers range XOR. Compact representation does not make enumeration of 2^n subsets polynomial." }
    ],
    example: { title: "Count set bits", language: "cpp", code: `int count = 0;
while (x != 0) {
    x &= x - 1;
    ++count;
}`, explanation: "Each iteration clears one set bit, so work is proportional to the number of ones." },
    failureModes: ["Narrow signed literal", "Shift by width", "Power-of-two test accepts zero", "Logical vs bitwise operator", "Calling subset enumeration polynomial"],
    question: { id: "bit-two-unique", type: "coding", difficulty: "hard", timeboxMinutes: 22, prompt: "Every integer appears twice except two. Find both in O(n) time and O(1) space.", hints: ["Total XOR is a^b.", "A set bit separates them."], answer: "XOR all to diff. Extract one set bit, partition values by it, and XOR within each group. Duplicates cancel and the unique values land separately. Use unsigned arithmetic for low-bit extraction.", rubric: ["Total XOR", "Safe distinguishing bit", "Correct partition cancellation", "Width assumption"], tags: ["bits", "xor", "math"] },
    flashcards: [{ front: "x&(x-1)?", back: "Clears lowest set bit." }, { front: "Power of two?", back: "x>0 and (x&(x-1))==0." }, { front: "Why unsigned?", back: "More precisely defined shift and wrap behavior." }],
    revision: ["Write mask meaning", "Use fixed-width unsigned", "Guard zero", "Check shift range", "Prove XOR cancellation"], sources: cppSources
  }
};
