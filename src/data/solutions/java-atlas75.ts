/** Interview-sized Java 17 reference implementations for the original Atlas 75 contracts. */
export const javaAtlas75: Record<string, string> = {
  "atlas-001": `int[] complementPairLedger(int[] values, int target) {
  Map<Integer, Integer> index = new HashMap<>();
  for (int i = 0; i < values.length; i++) {
    Integer match = index.get(target - values[i]);
    if (match != null) return new int[] {match, i};
    index.put(values[i], i);
  }
  return new int[0];
}`,
  "atlas-002": `int longestConsecutiveRun(int[] values) {
  Set<Integer> present = new HashSet<>();
  for (int value : values) present.add(value);
  int best = 0;
  for (int value : present) {
    if (present.contains(value - 1)) continue;
    int length = 1;
    while (present.contains(value + length)) length++;
    best = Math.max(best, length);
  }
  return best;
}`,
  "atlas-003": `List<List<String>> groupedWordSignatures(String[] words) {
  Map<String, List<String>> groups = new LinkedHashMap<>();
  for (String word : words) {
    int[] count = new int[26];
    for (char c : word.toCharArray()) count[c - 'a']++;
    StringBuilder key = new StringBuilder();
    for (int frequency : count) key.append('#').append(frequency);
    groups.computeIfAbsent(key.toString(), ignored -> new ArrayList<>()).add(word);
  }
  return new ArrayList<>(groups.values());
}`,
  "atlas-004": `int longestZeroSumSpan(int[] values) {
  Map<Long, Integer> first = new HashMap<>();
  first.put(0L, -1);
  long prefix = 0;
  int best = 0;
  for (int i = 0; i < values.length; i++) {
    prefix += values[i];
    if (first.containsKey(prefix)) best = Math.max(best, i - first.get(prefix));
    else first.put(prefix, i);
  }
  return best;
}`,
  "atlas-005": `String frequencyOrderedValues(String text) {
  Map<Character, Integer> count = new HashMap<>();
  for (char c : text.toCharArray()) count.merge(c, 1, Integer::sum);
  List<Map.Entry<Character, Integer>> entries = new ArrayList<>(count.entrySet());
  entries.sort((a, b) -> {
    int byFrequency = Integer.compare(b.getValue(), a.getValue());
    return byFrequency != 0 ? byFrequency : Character.compare(a.getKey(), b.getKey());
  });
  StringBuilder answer = new StringBuilder();
  for (var entry : entries) answer.append(String.valueOf(entry.getKey()).repeat(entry.getValue()));
  return answer.toString();
}`,
  "atlas-006": `boolean filteredPalindrome(String text) {
  int left = 0, right = text.length() - 1;
  while (left < right) {
    while (left < right && !Character.isLetterOrDigit(text.charAt(left))) left++;
    while (left < right && !Character.isLetterOrDigit(text.charAt(right))) right--;
    if (Character.toLowerCase(text.charAt(left)) != Character.toLowerCase(text.charAt(right))) return false;
    left++;
    right--;
  }
  return true;
}`,
  "atlas-007": `int[] targetPairInSortedData(int[] values, int target) {
  int left = 0, right = values.length - 1;
  while (left < right) {
    long sum = (long) values[left] + values[right];
    if (sum == target) return new int[] {left + 1, right + 1};
    if (sum < target) left++; else right--;
  }
  return new int[0];
}`,
  "atlas-008": `long maximumContainer(int[] heights) {
  int left = 0, right = heights.length - 1;
  long best = 0;
  while (left < right) {
    best = Math.max(best, (long) (right - left) * Math.min(heights[left], heights[right]));
    if (heights[left] <= heights[right]) left++; else right--;
  }
  return best;
}`,
  "atlas-009": `List<List<Integer>> zeroSumTriples(int[] values) {
  Arrays.sort(values);
  List<List<Integer>> answer = new ArrayList<>();
  for (int i = 0; i + 2 < values.length && values[i] <= 0; i++) {
    if (i > 0 && values[i] == values[i - 1]) continue;
    int left = i + 1, right = values.length - 1;
    while (left < right) {
      long sum = (long) values[i] + values[left] + values[right];
      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        answer.add(List.of(values[i], values[left], values[right]));
        int a = values[left], b = values[right];
        while (left < right && values[left] == a) left++;
        while (left < right && values[right] == b) right--;
      }
    }
  }
  return answer;
}`,
  "atlas-010": `int inPlaceSortedDeduplication(int[] values) {
  if (values.length == 0) return 0;
  int write = 1;
  for (int read = 1; read < values.length; read++)
    if (values[read] != values[write - 1]) values[write++] = values[read];
  return write;
}`,
  "atlas-011": `String smallestCoveringWindow(String source, String required) {
  if (required.isEmpty()) return "";
  Map<Character, Integer> need = new HashMap<>();
  for (char c : required.toCharArray()) need.merge(c, 1, Integer::sum);
  int missing = required.length(), left = 0, bestStart = 0, bestLength = Integer.MAX_VALUE;
  for (int right = 0; right < source.length(); right++) {
    char in = source.charAt(right);
    int remaining = need.getOrDefault(in, 0);
    if (remaining > 0) missing--;
    need.put(in, remaining - 1);
    while (missing == 0) {
      if (right - left + 1 < bestLength) {
        bestStart = left;
        bestLength = right - left + 1;
      }
      char out = source.charAt(left++);
      need.put(out, need.get(out) + 1);
      if (need.get(out) > 0) missing++;
    }
  }
  return bestLength == Integer.MAX_VALUE ? "" : source.substring(bestStart, bestStart + bestLength);
}`,
  "atlas-012": `int longestUniqueSegment(String text) {
  Map<Character, Integer> last = new HashMap<>();
  int left = 0, best = 0;
  for (int right = 0; right < text.length(); right++) {
    char c = text.charAt(right);
    left = Math.max(left, last.getOrDefault(c, -1) + 1);
    last.put(c, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
  "atlas-013": `long bestFixedLengthWindow(int[] values, int k) {
  if (k <= 0 || k > values.length) throw new IllegalArgumentException("k outside input");
  long window = 0;
  for (int i = 0; i < k; i++) window += values[i];
  long best = window;
  for (int right = k; right < values.length; right++) {
    window += values[right] - values[right - k];
    best = Math.max(best, window);
  }
  return best;
}`,
  "atlas-014": `int uniformSegmentAfterReplacements(String text, int k) {
  int[] count = new int[26];
  int left = 0, maxFrequency = 0, best = 0;
  for (int right = 0; right < text.length(); right++) {
    maxFrequency = Math.max(maxFrequency, ++count[text.charAt(right) - 'A']);
    while (right - left + 1 - maxFrequency > k) count[text.charAt(left++) - 'A']--;
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
  "atlas-015": `boolean permutationWindow(String pattern, String text) {
  if (pattern.length() > text.length()) return false;
  int[] delta = new int[26];
  for (char c : pattern.toCharArray()) delta[c - 'a']++;
  for (int i = 0; i < text.length(); i++) {
    delta[text.charAt(i) - 'a']--;
    if (i >= pattern.length()) delta[text.charAt(i - pattern.length()) - 'a']++;
    if (i + 1 >= pattern.length()) {
      boolean equal = true;
      for (int value : delta) if (value != 0) { equal = false; break; }
      if (equal) return true;
    }
  }
  return false;
}`,
  "atlas-016": `static class ImmutableRangeTotals {
  private final long[] prefix;
  ImmutableRangeTotals(int[] values) {
    prefix = new long[values.length + 1];
    for (int i = 0; i < values.length; i++) prefix[i + 1] = prefix[i] + values[i];
  }
  long query(int left, int right) { return prefix[right + 1] - prefix[left]; }
}`,
  "atlas-017": `int equilibriumIndex(int[] values) {
  long total = 0, left = 0;
  for (int value : values) total += value;
  for (int i = 0; i < values.length; i++) {
    if (left == total - left - values[i]) return i;
    left += values[i];
  }
  return -1;
}`,
  "atlas-018": `long countTargetSumSubarrays(int[] values, int target) {
  Map<Long, Integer> frequency = new HashMap<>();
  frequency.put(0L, 1);
  long prefix = 0, answer = 0;
  for (int value : values) {
    prefix += value;
    answer += frequency.getOrDefault(prefix - target, 0);
    frequency.merge(prefix, 1, Integer::sum);
  }
  return answer;
}`,
  "atlas-019": `long[] productExceptCurrent(int[] values) {
  long[] answer = new long[values.length];
  Arrays.fill(answer, 1);
  long prefix = 1, suffix = 1;
  for (int i = 0; i < values.length; i++) {
    answer[i] = prefix;
    prefix *= values[i];
  }
  for (int i = values.length - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= values[i];
  }
  return answer;
}`,
  "atlas-020": `long[] batchedRangeAdditions(int length, int[][] operations) {
  long[] difference = new long[length + 1];
  for (int[] operation : operations) {
    int left = operation[0], right = operation[1], delta = operation[2];
    difference[left] += delta;
    if (right + 1 < length) difference[right + 1] -= delta;
  }
  long[] answer = new long[length];
  long running = 0;
  for (int i = 0; i < length; i++) {
    running += difference[i];
    answer[i] = running;
  }
  return answer;
}`,
  "atlas-021": `boolean balancedDelimiters(String text) {
  Map<Character, Character> opener = Map.of(')', '(', ']', '[', '}', '{');
  Deque<Character> stack = new ArrayDeque<>();
  for (char c : text.toCharArray()) {
    if (!opener.containsKey(c)) stack.push(c);
    else if (stack.isEmpty() || stack.pop() != opener.get(c)) return false;
  }
  return stack.isEmpty();
}`,
  "atlas-022": `static class MinimumAwareStack {
  private final Deque<int[]> data = new ArrayDeque<>();
  void push(int value) { data.push(new int[] {value, data.isEmpty() ? value : Math.min(value, data.peek()[1])}); }
  void pop() { if (data.isEmpty()) throw new NoSuchElementException("empty stack"); data.pop(); }
  int top() { if (data.isEmpty()) throw new NoSuchElementException("empty stack"); return data.peek()[0]; }
  int minimum() { if (data.isEmpty()) throw new NoSuchElementException("empty stack"); return data.peek()[1]; }
}`,
  "atlas-023": `int[] nextWarmerReading(int[] temperatures) {
  int[] answer = new int[temperatures.length];
  Deque<Integer> pending = new ArrayDeque<>();
  for (int day = 0; day < temperatures.length; day++) {
    while (!pending.isEmpty() && temperatures[pending.peek()] < temperatures[day]) {
      int earlier = pending.pop();
      answer[earlier] = day - earlier;
    }
    pending.push(day);
  }
  return answer;
}`,
  "atlas-024": `long largestHistogramRectangle(int[] heights) {
  Deque<int[]> increasing = new ArrayDeque<>();
  long best = 0;
  for (int i = 0; i <= heights.length; i++) {
    int height = i == heights.length ? 0 : heights[i], start = i;
    while (!increasing.isEmpty() && increasing.peek()[1] > height) {
      int[] bar = increasing.pop();
      best = Math.max(best, (long) bar[1] * (i - bar[0]));
      start = bar[0];
    }
    if (increasing.isEmpty() || increasing.peek()[1] < height) increasing.push(new int[] {start, height});
  }
  return best;
}`,
  "atlas-025": `String decodeNestedRepetitions(String encoded) {
  Deque<StringBuilder> prefixes = new ArrayDeque<>();
  Deque<Integer> repeats = new ArrayDeque<>();
  StringBuilder current = new StringBuilder();
  int repeat = 0;
  for (char c : encoded.toCharArray()) {
    if (Character.isDigit(c)) repeat = repeat * 10 + c - '0';
    else if (c == '[') {
      prefixes.push(current);
      repeats.push(repeat);
      current = new StringBuilder();
      repeat = 0;
    } else if (c == ']') {
      String segment = current.toString();
      current = prefixes.pop();
      current.append(segment.repeat(repeats.pop()));
    } else current.append(c);
  }
  return current.toString();
}`,
  "atlas-026": `int stableInsertPosition(int[] values, int target) {
  int left = 0, right = values.length;
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (values[mid] < target) left = mid + 1; else right = mid;
  }
  return left;
}`,
  "atlas-027": `int lookupInRotatedArray(int[] values, int target) {
  int left = 0, right = values.length - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (values[mid] == target) return mid;
    if (values[left] <= values[mid]) {
      if (values[left] <= target && target < values[mid]) right = mid - 1; else left = mid + 1;
    } else {
      if (values[mid] < target && target <= values[right]) left = mid + 1; else right = mid - 1;
    }
  }
  return -1;
}`,
  "atlas-028": `int[] firstAndLastMatch(int[] values, int target) {
  int first = lowerBound(values, target);
  if (first == values.length || values[first] != target) return new int[] {-1, -1};
  return new int[] {first, lowerBound(values, target + 1L) - 1};
}
int lowerBound(int[] values, long target) {
  int left = 0, right = values.length;
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (values[mid] < target) left = mid + 1; else right = mid;
  }
  return left;
}`,
  "atlas-029": `int minimumFeasibleProcessingRate(int[] piles, int hours) {
  int left = 1, right = Arrays.stream(piles).max().orElse(1);
  while (left < right) {
    int rate = left + (right - left) / 2;
    long required = 0;
    for (int pile : piles) required += (pile + (long) rate - 1) / rate;
    if (required <= hours) right = rate; else left = rate + 1;
  }
  return left;
}`,
  "atlas-030": `boolean searchRowMajorMatrix(int[][] matrix, int target) {
  if (matrix.length == 0 || matrix[0].length == 0) return false;
  int rows = matrix.length, cols = matrix[0].length, left = 0, right = rows * cols;
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (matrix[mid / cols][mid % cols] < target) left = mid + 1; else right = mid;
  }
  return left < rows * cols && matrix[left / cols][left % cols] == target;
}`,
  "atlas-031": `int[][] mergeReservations(int[][] intervals) {
  Arrays.sort(intervals, Comparator.comparingInt(interval -> interval[0]));
  List<int[]> merged = new ArrayList<>();
  for (int[] interval : intervals) {
    if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0])
      merged.add(new int[] {interval[0], interval[1]});
    else
      merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
  }
  return merged.toArray(int[][]::new);
}`,
  "atlas-032": `int[][] insertReservation(int[][] intervals, int[] incoming) {
  List<int[]> answer = new ArrayList<>();
  int i = 0;
  while (i < intervals.length && intervals[i][1] < incoming[0]) answer.add(intervals[i++]);
  while (i < intervals.length && intervals[i][0] <= incoming[1]) {
    incoming[0] = Math.min(incoming[0], intervals[i][0]);
    incoming[1] = Math.max(incoming[1], intervals[i++][1]);
  }
  answer.add(incoming);
  while (i < intervals.length) answer.add(intervals[i++]);
  return answer.toArray(int[][]::new);
}`,
  "atlas-033": `int minimumMeetingRooms(int[][] meetings) {
  if (meetings.length == 0) return 0;
  int[] starts = new int[meetings.length], ends = new int[meetings.length];
  for (int i = 0; i < meetings.length; i++) {
    starts[i] = meetings[i][0];
    ends[i] = meetings[i][1];
  }
  Arrays.sort(starts);
  Arrays.sort(ends);
  int i = 0, j = 0, active = 0, best = 0;
  while (i < starts.length) {
    if (starts[i] < ends[j]) { best = Math.max(best, ++active); i++; }
    else { active--; j++; }
  }
  return best;
}`,
  "atlas-034": `int removeMinimumOverlaps(int[][] intervals) {
  Arrays.sort(intervals, Comparator.comparingInt(interval -> interval[1]));
  int kept = 0, lastEnd = Integer.MIN_VALUE;
  for (int[] interval : intervals) {
    if (interval[0] >= lastEnd) {
      kept++;
      lastEnd = interval[1];
    }
  }
  return intervals.length - kept;
}`,
  "atlas-035": `int[][] intersectSchedules(int[][] a, int[][] b) {
  List<int[]> answer = new ArrayList<>();
  int i = 0, j = 0;
  while (i < a.length && j < b.length) {
    int start = Math.max(a[i][0], b[j][0]), end = Math.min(a[i][1], b[j][1]);
    if (start <= end) answer.add(new int[] {start, end});
    if (a[i][1] < b[j][1]) i++; else j++;
  }
  return answer.toArray(int[][]::new);
}`,
  "atlas-036": `ListNode reverseChain(ListNode head) {
  ListNode previous = null;
  while (head != null) {
    ListNode next = head.next;
    head.next = previous;
    previous = head;
    head = next;
  }
  return previous;
}`,
  "atlas-037": `boolean detectCycle(ListNode head) {
  ListNode slow = head, fast = head;
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) return true;
  }
  return false;
}`,
  "atlas-038": `ListNode mergeOrderedChains(ListNode a, ListNode b) {
  ListNode dummy = new ListNode(0), tail = dummy;
  while (a != null && b != null) {
    if (a.val <= b.val) { tail.next = a; a = a.next; }
    else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a != null ? a : b;
  return dummy.next;
}`,
  "atlas-039": `ListNode removeNthFromEnd(ListNode head, int n) {
  ListNode dummy = new ListNode(0, head), slow = dummy, fast = dummy;
  while (n-- > 0) fast = fast.next;
  while (fast.next != null) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}`,
  "atlas-040": `RandomNode copyRandomLinks(RandomNode head) {
  if (head == null) return null;
  for (RandomNode node = head; node != null; node = node.next.next)
    node.next = new RandomNode(node.val, node.next, null);
  for (RandomNode node = head; node != null; node = node.next.next)
    node.next.random = node.random == null ? null : node.random.next;
  RandomNode copyHead = head.next;
  for (RandomNode node = head; node != null; ) {
    RandomNode copy = node.next;
    node.next = copy.next;
    copy.next = node.next == null ? null : node.next.next;
    node = node.next;
  }
  return copyHead;
}`,
  "atlas-041": `int maximumTreeDepth(TreeNode root) {
  return root == null ? 0 : 1 + Math.max(maximumTreeDepth(root.left), maximumTreeDepth(root.right));
}`,
  "atlas-042": `private int diameter;
int treeDiameter(TreeNode root) {
  diameter = 0;
  diameterHeight(root);
  return diameter;
}
int diameterHeight(TreeNode node) {
  if (node == null) return 0;
  int left = diameterHeight(node.left), right = diameterHeight(node.right);
  diameter = Math.max(diameter, left + right);
  return 1 + Math.max(left, right);
}`,
  "atlas-043": `boolean heightBalancedTree(TreeNode root) {
  return balancedHeight(root) >= 0;
}
int balancedHeight(TreeNode node) {
  if (node == null) return 0;
  int left = balancedHeight(node.left);
  if (left < 0) return -1;
  int right = balancedHeight(node.right);
  if (right < 0) return -1;
  return Math.abs(left - right) <= 1 ? 1 + Math.max(left, right) : -1;
}`,
  "atlas-044": `boolean validateSearchTreeOrdering(TreeNode root) {
  return validSearchTree(root, Long.MIN_VALUE, Long.MAX_VALUE);
}
boolean validSearchTree(TreeNode node, long low, long high) {
  if (node == null) return true;
  if (node.val <= low || node.val >= high) return false;
  return validSearchTree(node.left, low, node.val) && validSearchTree(node.right, node.val, high);
}`,
  "atlas-045": `TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
  if (root == null || root == p || root == q) return root;
  TreeNode left = lowestCommonAncestor(root.left, p, q);
  TreeNode right = lowestCommonAncestor(root.right, p, q);
  if (left != null && right != null) return root;
  return left != null ? left : right;
}`,
  "atlas-046": `List<List<Integer>> levelOrderValues(TreeNode root) {
  List<List<Integer>> answer = new ArrayList<>();
  if (root == null) return answer;
  Queue<TreeNode> pending = new ArrayDeque<>();
  pending.add(root);
  while (!pending.isEmpty()) {
    int count = pending.size();
    List<Integer> level = new ArrayList<>(count);
    while (count-- > 0) {
      TreeNode node = pending.remove();
      level.add(node.val);
      if (node.left != null) pending.add(node.left);
      if (node.right != null) pending.add(node.right);
    }
    answer.add(level);
  }
  return answer;
}`,
  "atlas-047": `List<List<Integer>> zigzagLevels(TreeNode root) {
  List<List<Integer>> answer = new ArrayList<>();
  if (root == null) return answer;
  Queue<TreeNode> pending = new ArrayDeque<>();
  pending.add(root);
  boolean forward = true;
  while (!pending.isEmpty()) {
    int count = pending.size();
    Integer[] level = new Integer[count];
    for (int i = 0; i < count; i++) {
      TreeNode node = pending.remove();
      level[forward ? i : count - 1 - i] = node.val;
      if (node.left != null) pending.add(node.left);
      if (node.right != null) pending.add(node.right);
    }
    answer.add(Arrays.asList(level));
    forward = !forward;
  }
  return answer;
}`,
  "atlas-048": `List<Integer> rightSideProjection(TreeNode root) {
  List<Integer> answer = new ArrayList<>();
  if (root == null) return answer;
  Queue<TreeNode> pending = new ArrayDeque<>();
  pending.add(root);
  while (!pending.isEmpty()) {
    int count = pending.size();
    for (int i = 0; i < count; i++) {
      TreeNode node = pending.remove();
      if (i == count - 1) answer.add(node.val);
      if (node.left != null) pending.add(node.left);
      if (node.right != null) pending.add(node.right);
    }
  }
  return answer;
}`,
  "atlas-049": `PerfectNode connectLevelNeighbours(PerfectNode root) {
  for (PerfectNode level = root; level != null && level.left != null; level = level.left) {
    for (PerfectNode node = level; node != null; node = node.next) {
      node.left.next = node.right;
      if (node.next != null) node.right.next = node.next.left;
    }
  }
  return root;
}`,
  "atlas-050": `int minimumLeafDepth(TreeNode root) {
  if (root == null) return 0;
  Queue<TreeNode> pending = new ArrayDeque<>();
  pending.add(root);
  int depth = 1;
  while (!pending.isEmpty()) {
    int count = pending.size();
    while (count-- > 0) {
      TreeNode node = pending.remove();
      if (node.left == null && node.right == null) return depth;
      if (node.left != null) pending.add(node.left);
      if (node.right != null) pending.add(node.right);
    }
    depth++;
  }
  return depth;
}`,
  "atlas-051": `int kthLargestValue(int[] values, int k) {
  PriorityQueue<Integer> largest = new PriorityQueue<>();
  for (int value : values) {
    largest.add(value);
    if (largest.size() > k) largest.remove();
  }
  return largest.element();
}`,
  "atlas-052": `List<Integer> mostFrequentKValues(int[] values, int k) {
  Map<Integer, Integer> frequency = new HashMap<>();
  for (int value : values) frequency.merge(value, 1, Integer::sum);
  List<List<Integer>> buckets = new ArrayList<>(values.length + 1);
  for (int i = 0; i <= values.length; i++) buckets.add(new ArrayList<>());
  for (var entry : frequency.entrySet()) buckets.get(entry.getValue()).add(entry.getKey());
  List<Integer> answer = new ArrayList<>();
  for (int count = values.length; count > 0 && answer.size() < k; count--)
    for (int value : buckets.get(count)) if (answer.size() < k) answer.add(value);
  return answer;
}`,
  "atlas-053": `ListNode mergeKOrderedStreams(ListNode[] lists) {
  PriorityQueue<ListNode> next = new PriorityQueue<>(Comparator.comparingInt(node -> node.val));
  for (ListNode head : lists) if (head != null) next.add(head);
  ListNode dummy = new ListNode(0), tail = dummy;
  while (!next.isEmpty()) {
    ListNode node = next.remove();
    tail.next = node;
    tail = node;
    if (node.next != null) next.add(node.next);
  }
  return dummy.next;
}`,
  "atlas-054": `static class RunningMedian {
  private final PriorityQueue<Integer> lower = new PriorityQueue<>(Comparator.reverseOrder());
  private final PriorityQueue<Integer> upper = new PriorityQueue<>();
  void add(int value) {
    if (lower.isEmpty() || value <= lower.element()) lower.add(value); else upper.add(value);
    if (lower.size() > upper.size() + 1) upper.add(lower.remove());
    if (upper.size() > lower.size() + 1) lower.add(upper.remove());
  }
  double median() {
    if (lower.size() == upper.size()) return ((long) lower.element() + upper.element()) / 2.0;
    return lower.size() > upper.size() ? lower.element() : upper.element();
  }
}`,
  "atlas-055": `int cooldownTaskScheduler(char[] tasks, int cooldown) {
  int[] frequency = new int[26];
  for (char task : tasks) frequency[task - 'A']++;
  int maximum = 0, tied = 0;
  for (int count : frequency) maximum = Math.max(maximum, count);
  for (int count : frequency) if (count == maximum) tied++;
  return Math.max(tasks.length, (maximum - 1) * (cooldown + 1) + tied);
}`,
  "atlas-056": `int countGridIslands(char[][] grid) {
  if (grid.length == 0) return 0;
  int islands = 0;
  for (int row = 0; row < grid.length; row++)
    for (int col = 0; col < grid[0].length; col++)
      if (grid[row][col] == '1') { islands++; floodIsland(grid, row, col); }
  return islands;
}
void floodIsland(char[][] grid, int row, int col) {
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] != '1') return;
  grid[row][col] = '0';
  floodIsland(grid, row + 1, col);
  floodIsland(grid, row - 1, col);
  floodIsland(grid, row, col + 1);
  floodIsland(grid, row, col - 1);
}`,
  "atlas-057": `int shortestGridEscape(int[][] grid) {
  int n = grid.length;
  if (n == 0 || grid[0][0] != 0 || grid[n - 1][n - 1] != 0) return -1;
  Queue<int[]> pending = new ArrayDeque<>();
  pending.add(new int[] {0, 0});
  grid[0][0] = 1;
  for (int distance = 1; !pending.isEmpty(); distance++) {
    int count = pending.size();
    while (count-- > 0) {
      int[] cell = pending.remove();
      if (cell[0] == n - 1 && cell[1] == n - 1) return distance;
      for (int dr = -1; dr <= 1; dr++) for (int dc = -1; dc <= 1; dc++) {
        int row = cell[0] + dr, col = cell[1] + dc;
        if (row >= 0 && row < n && col >= 0 && col < n && grid[row][col] == 0) {
          grid[row][col] = 1;
          pending.add(new int[] {row, col});
        }
      }
    }
  }
  return -1;
}`,
  "atlas-058": `int singleLetterTransformation(String start, String goal, List<String> words) {
  Set<String> unused = new HashSet<>(words);
  if (!unused.contains(goal)) return 0;
  Queue<String> pending = new ArrayDeque<>();
  pending.add(start);
  unused.remove(start);
  for (int length = 1; !pending.isEmpty(); length++) {
    int count = pending.size();
    while (count-- > 0) {
      String word = pending.remove();
      if (word.equals(goal)) return length;
      char[] letters = word.toCharArray();
      for (int i = 0; i < letters.length; i++) {
        char original = letters[i];
        for (char c = 'a'; c <= 'z'; c++) {
          letters[i] = c;
          String next = new String(letters);
          if (unused.remove(next)) pending.add(next);
        }
        letters[i] = original;
      }
    }
  }
  return 0;
}`,
  "atlas-059": `boolean courseReachability(int count, int[][] prerequisites) {
  List<List<Integer>> graph = new ArrayList<>(count);
  for (int i = 0; i < count; i++) graph.add(new ArrayList<>());
  int[] indegree = new int[count];
  for (int[] edge : prerequisites) {
    graph.get(edge[1]).add(edge[0]);
    indegree[edge[0]]++;
  }
  Queue<Integer> ready = new ArrayDeque<>();
  for (int course = 0; course < count; course++) if (indegree[course] == 0) ready.add(course);
  int completed = 0;
  while (!ready.isEmpty()) {
    int prerequisite = ready.remove();
    completed++;
    for (int course : graph.get(prerequisite)) if (--indegree[course] == 0) ready.add(course);
  }
  return completed == count;
}`,
  "atlas-060": `int rotSpreadTime(int[][] grid) {
  if (grid.length == 0) return 0;
  Queue<int[]> rotten = new ArrayDeque<>();
  int fresh = 0, minutes = 0;
  for (int row = 0; row < grid.length; row++) for (int col = 0; col < grid[0].length; col++) {
    if (grid[row][col] == 2) rotten.add(new int[] {row, col});
    else if (grid[row][col] == 1) fresh++;
  }
  int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
  while (fresh > 0 && !rotten.isEmpty()) {
    minutes++;
    int count = rotten.size();
    while (count-- > 0) {
      int[] cell = rotten.remove();
      for (int[] direction : directions) {
        int row = cell[0] + direction[0], col = cell[1] + direction[1];
        if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && grid[row][col] == 1) {
          grid[row][col] = 2;
          fresh--;
          rotten.add(new int[] {row, col});
        }
      }
    }
  }
  return fresh == 0 ? minutes : -1;
}`,
  "atlas-061": `GraphNode cloneNetwork(GraphNode start) {
  if (start == null) return null;
  Map<GraphNode, GraphNode> copy = new IdentityHashMap<>();
  copy.put(start, new GraphNode(start.val));
  Queue<GraphNode> pending = new ArrayDeque<>();
  pending.add(start);
  while (!pending.isEmpty()) {
    GraphNode node = pending.remove();
    for (GraphNode neighbor : node.neighbors) {
      if (!copy.containsKey(neighbor)) {
        copy.put(neighbor, new GraphNode(neighbor.val));
        pending.add(neighbor);
      }
      copy.get(node).neighbors.add(copy.get(neighbor));
    }
  }
  return copy.get(start);
}`,
  "atlas-062": `boolean detectDirectedCycle(List<List<Integer>> graph) {
  int[] state = new int[graph.size()];
  for (int node = 0; node < graph.size(); node++)
    if (state[node] == 0 && directedCycleFrom(node, graph, state)) return true;
  return false;
}
boolean directedCycleFrom(int node, List<List<Integer>> graph, int[] state) {
  state[node] = 1;
  for (int next : graph.get(node)) {
    if (state[next] == 1 || (state[next] == 0 && directedCycleFrom(next, graph, state))) return true;
  }
  state[node] = 2;
  return false;
}`,
  "atlas-063": `int countConnectedComponents(int n, int[][] edges) {
  List<List<Integer>> graph = new ArrayList<>(n);
  for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
  for (int[] edge : edges) {
    graph.get(edge[0]).add(edge[1]);
    graph.get(edge[1]).add(edge[0]);
  }
  boolean[] seen = new boolean[n];
  int components = 0;
  for (int start = 0; start < n; start++) if (!seen[start]) {
    components++;
    Deque<Integer> pending = new ArrayDeque<>();
    pending.push(start);
    seen[start] = true;
    while (!pending.isEmpty()) {
      int node = pending.pop();
      for (int next : graph.get(node)) if (!seen[next]) {
        seen[next] = true;
        pending.push(next);
      }
    }
  }
  return components;
}`,
  "atlas-064": `int[] dependencyOrdering(int count, int[][] prerequisites) {
  List<List<Integer>> graph = new ArrayList<>(count);
  for (int i = 0; i < count; i++) graph.add(new ArrayList<>());
  int[] indegree = new int[count];
  for (int[] edge : prerequisites) {
    graph.get(edge[1]).add(edge[0]);
    indegree[edge[0]]++;
  }
  Queue<Integer> ready = new ArrayDeque<>();
  for (int course = 0; course < count; course++) if (indegree[course] == 0) ready.add(course);
  int[] order = new int[count];
  int used = 0;
  while (!ready.isEmpty()) {
    int node = ready.remove();
    order[used++] = node;
    for (int next : graph.get(node)) if (--indegree[next] == 0) ready.add(next);
  }
  return used == count ? order : new int[0];
}`,
  "atlas-065": `private int bridgeTime;
List<int[]> criticalNetworkBridges(int n, int[][] edges) {
  List<List<int[]>> graph = new ArrayList<>(n);
  for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
  for (int id = 0; id < edges.length; id++) {
    int a = edges[id][0], b = edges[id][1];
    graph.get(a).add(new int[] {b, id});
    graph.get(b).add(new int[] {a, id});
  }
  int[] discovered = new int[n], low = new int[n];
  Arrays.fill(discovered, -1);
  bridgeTime = 0;
  List<int[]> bridges = new ArrayList<>();
  for (int node = 0; node < n; node++)
    if (discovered[node] < 0) bridgeDfs(node, -1, graph, discovered, low, bridges);
  return bridges;
}
void bridgeDfs(int node, int parentEdge, List<List<int[]>> graph, int[] discovered, int[] low, List<int[]> bridges) {
  discovered[node] = low[node] = bridgeTime++;
  for (int[] connection : graph.get(node)) {
    int next = connection[0], edge = connection[1];
    if (edge == parentEdge) continue;
    if (discovered[next] < 0) {
      bridgeDfs(next, edge, graph, discovered, low, bridges);
      low[node] = Math.min(low[node], low[next]);
      if (low[next] > discovered[node]) bridges.add(new int[] {node, next});
    } else low[node] = Math.min(low[node], discovered[next]);
  }
}`,
  "atlas-066": `List<List<Integer>> allSubsets(int[] values) {
  List<List<Integer>> answer = new ArrayList<>();
  collectSubsets(0, values, new ArrayList<>(), answer);
  return answer;
}
void collectSubsets(int index, int[] values, List<Integer> current, List<List<Integer>> answer) {
  if (index == values.length) { answer.add(new ArrayList<>(current)); return; }
  collectSubsets(index + 1, values, current, answer);
  current.add(values[index]);
  collectSubsets(index + 1, values, current, answer);
  current.remove(current.size() - 1);
}`,
  "atlas-067": `List<List<Integer>> allPermutations(int[] values) {
  List<List<Integer>> answer = new ArrayList<>();
  collectPermutations(values, new boolean[values.length], new ArrayList<>(), answer);
  return answer;
}
void collectPermutations(int[] values, boolean[] used, List<Integer> current, List<List<Integer>> answer) {
  if (current.size() == values.length) { answer.add(new ArrayList<>(current)); return; }
  for (int i = 0; i < values.length; i++) if (!used[i]) {
    used[i] = true;
    current.add(values[i]);
    collectPermutations(values, used, current, answer);
    current.remove(current.size() - 1);
    used[i] = false;
  }
}`,
  "atlas-068": `List<List<Integer>> targetCombinationSums(int[] candidates, int target) {
  Arrays.sort(candidates);
  List<List<Integer>> answer = new ArrayList<>();
  collectCombinations(0, target, candidates, new ArrayList<>(), answer);
  return answer;
}
void collectCombinations(int start, int remaining, int[] candidates, List<Integer> current, List<List<Integer>> answer) {
  if (remaining == 0) { answer.add(new ArrayList<>(current)); return; }
  for (int i = start; i < candidates.length && candidates[i] <= remaining; i++) {
    current.add(candidates[i]);
    collectCombinations(i, remaining - candidates[i], candidates, current, answer);
    current.remove(current.size() - 1);
  }
}`,
  "atlas-069": `List<List<String>> placeNQueens(int n) {
  List<List<String>> answer = new ArrayList<>();
  char[][] board = new char[n][n];
  for (char[] row : board) Arrays.fill(row, '.');
  placeQueen(0, board, new boolean[n], new boolean[2 * n - 1], new boolean[2 * n - 1], answer);
  return answer;
}
void placeQueen(int row, char[][] board, boolean[] column, boolean[] down, boolean[] up, List<List<String>> answer) {
  int n = board.length;
  if (row == n) {
    List<String> snapshot = new ArrayList<>(n);
    for (char[] line : board) snapshot.add(new String(line));
    answer.add(snapshot);
    return;
  }
  for (int col = 0; col < n; col++) {
    int d = row - col + n - 1, u = row + col;
    if (column[col] || down[d] || up[u]) continue;
    column[col] = down[d] = up[u] = true;
    board[row][col] = 'Q';
    placeQueen(row + 1, board, column, down, up, answer);
    board[row][col] = '.';
    column[col] = down[d] = up[u] = false;
  }
}`,
  "atlas-070": `boolean traceWordInGrid(char[][] board, String word) {
  for (int row = 0; row < board.length; row++)
    for (int col = 0; col < board[0].length; col++)
      if (traceFrom(board, word, row, col, 0)) return true;
  return false;
}
boolean traceFrom(char[][] board, String word, int row, int col, int index) {
  if (index == word.length()) return true;
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || board[row][col] != word.charAt(index)) return false;
  char saved = board[row][col];
  board[row][col] = '#';
  boolean found = traceFrom(board, word, row + 1, col, index + 1)
    || traceFrom(board, word, row - 1, col, index + 1)
    || traceFrom(board, word, row, col + 1, index + 1)
    || traceFrom(board, word, row, col - 1, index + 1);
  board[row][col] = saved;
  return found;
}`,
  "atlas-071": `long countStairRoutes(int n) {
  long twoBack = 1, oneBack = 1;
  for (int step = 2; step <= n; step++) {
    long current = oneBack + twoBack;
    twoBack = oneBack;
    oneBack = current;
  }
  return oneBack;
}`,
  "atlas-072": `long maximumNonAdjacentSum(int[] values) {
  long twoBack = 0, oneBack = 0;
  for (int value : values) {
    long current = Math.max(oneBack, twoBack + value);
    twoBack = oneBack;
    oneBack = current;
  }
  return oneBack;
}`,
  "atlas-073": `int minimumCoins(int[] coins, int amount) {
  int[] best = new int[amount + 1];
  Arrays.fill(best, amount + 1);
  best[0] = 0;
  for (int value = 1; value <= amount; value++)
    for (int coin : coins) if (coin <= value) best[value] = Math.min(best[value], best[value - coin] + 1);
  return best[amount] > amount ? -1 : best[amount];
}`,
  "atlas-074": `int longestIncreasingSubsequence(int[] values) {
  int[] tails = new int[values.length];
  int size = 0;
  for (int value : values) {
    int left = 0, right = size;
    while (left < right) {
      int mid = left + (right - left) / 2;
      if (tails[mid] < value) left = mid + 1; else right = mid;
    }
    tails[left] = value;
    if (left == size) size++;
  }
  return size;
}`,
  "atlas-075": `int editDistance(String source, String target) {
  int[] previous = new int[target.length() + 1], current = new int[target.length() + 1];
  for (int j = 0; j <= target.length(); j++) previous[j] = j;
  for (int i = 1; i <= source.length(); i++) {
    current[0] = i;
    for (int j = 1; j <= target.length(); j++) {
      if (source.charAt(i - 1) == target.charAt(j - 1)) current[j] = previous[j - 1];
      else current[j] = 1 + Math.min(previous[j], Math.min(current[j - 1], previous[j - 1]));
    }
    int[] swap = previous;
    previous = current;
    current = swap;
  }
  return previous[target.length()];
}`
};
