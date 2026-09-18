/** Interview-sized TypeScript references for the original Atlas 75 contracts. */
export const typescriptAtlas75: Record<string, string> = {
  "atlas-001": `function complementPairLedger(values: number[], target: number): number[] {
  const index = new Map<number, number>();
  for (let i = 0; i < values.length; i++) {
    const match = index.get(target - values[i]);
    if (match !== undefined) return [match, i];
    index.set(values[i], i);
  }
  return [];
}`,
  "atlas-002": `function longestConsecutiveRun(values: number[]): number {
  const present = new Set(values);
  let best = 0;
  for (const value of present) {
    if (present.has(value - 1)) continue;
    let length = 1;
    while (present.has(value + length)) length++;
    best = Math.max(best, length);
  }
  return best;
}`,
  "atlas-003": `function groupedWordSignatures(words: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const word of words) {
    const count = Array<number>(26).fill(0);
    for (const char of word) count[char.charCodeAt(0) - 97]++;
    const key = count.join("#");
    const group = groups.get(key) ?? [];
    group.push(word);
    groups.set(key, group);
  }
  return [...groups.values()];
}`,
  "atlas-004": `function longestZeroSumSpan(values: number[]): number {
  const first = new Map<number, number>([[0, -1]]);
  let prefix = 0, best = 0;
  for (let i = 0; i < values.length; i++) {
    prefix += values[i];
    const start = first.get(prefix);
    if (start !== undefined) best = Math.max(best, i - start);
    else first.set(prefix, i);
  }
  return best;
}`,
  "atlas-005": `function frequencyOrderedValues(text: string): string {
  const count = new Map<string, number>();
  for (const char of text) count.set(char, (count.get(char) ?? 0) + 1);
  return [...count.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([char, frequency]) => char.repeat(frequency))
    .join("");
}`,
  "atlas-006": `function filteredPalindrome(text: string): boolean {
  let left = 0, right = text.length - 1;
  const alphanumeric = (char: string) => /[a-z0-9]/i.test(char);
  while (left < right) {
    while (left < right && !alphanumeric(text[left])) left++;
    while (left < right && !alphanumeric(text[right])) right--;
    if (text[left].toLowerCase() !== text[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}`,
  "atlas-007": `function targetPairInSortedData(values: number[], target: number): number[] {
  let left = 0, right = values.length - 1;
  while (left < right) {
    const sum = values[left] + values[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++; else right--;
  }
  return [];
}`,
  "atlas-008": `function maximumContainer(heights: number[]): number {
  let left = 0, right = heights.length - 1, best = 0;
  while (left < right) {
    best = Math.max(best, (right - left) * Math.min(heights[left], heights[right]));
    if (heights[left] <= heights[right]) left++; else right--;
  }
  return best;
}`,
  "atlas-009": `function zeroSumTriples(values: number[]): number[][] {
  values.sort((a, b) => a - b);
  const answer: number[][] = [];
  for (let i = 0; i + 2 < values.length && values[i] <= 0; i++) {
    if (i > 0 && values[i] === values[i - 1]) continue;
    let left = i + 1, right = values.length - 1;
    while (left < right) {
      const sum = values[i] + values[left] + values[right];
      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        answer.push([values[i], values[left], values[right]]);
        const a = values[left], b = values[right];
        while (left < right && values[left] === a) left++;
        while (left < right && values[right] === b) right--;
      }
    }
  }
  return answer;
}`,
  "atlas-010": `function inPlaceSortedDeduplication(values: number[]): number {
  if (values.length === 0) return 0;
  let write = 1;
  for (let read = 1; read < values.length; read++)
    if (values[read] !== values[write - 1]) values[write++] = values[read];
  return write;
}`,
  "atlas-011": `function smallestCoveringWindow(source: string, required: string): string {
  if (required.length === 0) return "";
  const need = new Map<string, number>();
  for (const char of required) need.set(char, (need.get(char) ?? 0) + 1);
  let missing = required.length, left = 0, bestStart = 0, bestLength = Infinity;
  for (let right = 0; right < source.length; right++) {
    const incoming = source[right], remaining = need.get(incoming) ?? 0;
    if (remaining > 0) missing--;
    need.set(incoming, remaining - 1);
    while (missing === 0) {
      if (right - left + 1 < bestLength) {
        bestStart = left;
        bestLength = right - left + 1;
      }
      const outgoing = source[left++];
      need.set(outgoing, (need.get(outgoing) ?? 0) + 1);
      if ((need.get(outgoing) ?? 0) > 0) missing++;
    }
  }
  return bestLength === Infinity ? "" : source.slice(bestStart, bestStart + bestLength);
}`,
  "atlas-012": `function longestUniqueSegment(text: string): number {
  const last = new Map<string, number>();
  let left = 0, best = 0;
  for (let right = 0; right < text.length; right++) {
    left = Math.max(left, (last.get(text[right]) ?? -1) + 1);
    last.set(text[right], right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
  "atlas-013": `function bestFixedLengthWindow(values: number[], k: number): number {
  if (k <= 0 || k > values.length) throw new RangeError("k outside input");
  let window = values.slice(0, k).reduce((sum, value) => sum + value, 0), best = window;
  for (let right = k; right < values.length; right++) {
    window += values[right] - values[right - k];
    best = Math.max(best, window);
  }
  return best;
}`,
  "atlas-014": `function uniformSegmentAfterReplacements(text: string, k: number): number {
  const count = Array<number>(26).fill(0);
  let left = 0, maxFrequency = 0, best = 0;
  for (let right = 0; right < text.length; right++) {
    const incoming = text.charCodeAt(right) - 65;
    maxFrequency = Math.max(maxFrequency, ++count[incoming]);
    while (right - left + 1 - maxFrequency > k) count[text.charCodeAt(left++) - 65]--;
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
  "atlas-015": `function permutationWindow(pattern: string, text: string): boolean {
  if (pattern.length > text.length) return false;
  const delta = Array<number>(26).fill(0);
  for (const char of pattern) delta[char.charCodeAt(0) - 97]++;
  for (let i = 0; i < text.length; i++) {
    delta[text.charCodeAt(i) - 97]--;
    if (i >= pattern.length) delta[text.charCodeAt(i - pattern.length) - 97]++;
    if (i + 1 >= pattern.length && delta.every(value => value === 0)) return true;
  }
  return false;
}`,
  "atlas-016": `class ImmutableRangeTotals {
  private readonly prefix: number[];
  constructor(values: number[]) {
    this.prefix = Array<number>(values.length + 1).fill(0);
    for (let i = 0; i < values.length; i++) this.prefix[i + 1] = this.prefix[i] + values[i];
  }
  query(left: number, right: number): number {
    return this.prefix[right + 1] - this.prefix[left];
  }
}`,
  "atlas-017": `function equilibriumIndex(values: number[]): number {
  const total = values.reduce((sum, value) => sum + value, 0);
  let left = 0;
  for (let i = 0; i < values.length; i++) {
    if (left === total - left - values[i]) return i;
    left += values[i];
  }
  return -1;
}`,
  "atlas-018": `function countTargetSumSubarrays(values: number[], target: number): number {
  const frequency = new Map<number, number>([[0, 1]]);
  let prefix = 0, answer = 0;
  for (const value of values) {
    prefix += value;
    answer += frequency.get(prefix - target) ?? 0;
    frequency.set(prefix, (frequency.get(prefix) ?? 0) + 1);
  }
  return answer;
}`,
  "atlas-019": `function productExceptCurrent(values: number[]): number[] {
  const answer = Array<number>(values.length).fill(1);
  let prefix = 1, suffix = 1;
  for (let i = 0; i < values.length; i++) {
    answer[i] = prefix;
    prefix *= values[i];
  }
  for (let i = values.length - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= values[i];
  }
  return answer;
}`,
  "atlas-020": `function batchedRangeAdditions(length: number, operations: number[][]): number[] {
  const difference = Array<number>(length + 1).fill(0);
  for (const [left, right, delta] of operations) {
    difference[left] += delta;
    if (right + 1 < length) difference[right + 1] -= delta;
  }
  let running = 0;
  return difference.slice(0, length).map(value => running += value);
}`,
  "atlas-021": `function balancedDelimiters(text: string): boolean {
  const opener = new Map<string, string>([[")", "("], ["]", "["], ["}", "{"]]);
  const stack: string[] = [];
  for (const char of text) {
    if (!opener.has(char)) stack.push(char);
    else if (stack.pop() !== opener.get(char)) return false;
  }
  return stack.length === 0;
}`,
  "atlas-022": `class MinimumAwareStack {
  private readonly data: Array<[number, number]> = [];
  push(value: number): void {
    this.data.push([value, this.data.length === 0 ? value : Math.min(value, this.data[this.data.length - 1][1])]);
  }
  pop(): void {
    if (this.data.length === 0) throw new RangeError("empty stack");
    this.data.pop();
  }
  top(): number {
    if (this.data.length === 0) throw new RangeError("empty stack");
    return this.data[this.data.length - 1][0];
  }
  minimum(): number {
    if (this.data.length === 0) throw new RangeError("empty stack");
    return this.data[this.data.length - 1][1];
  }
}`,
  "atlas-023": `function nextWarmerReading(temperatures: number[]): number[] {
  const answer = Array<number>(temperatures.length).fill(0), pending: number[] = [];
  for (let day = 0; day < temperatures.length; day++) {
    while (pending.length > 0 && temperatures[pending[pending.length - 1]] < temperatures[day]) {
      const earlier = pending.pop()!;
      answer[earlier] = day - earlier;
    }
    pending.push(day);
  }
  return answer;
}`,
  "atlas-024": `function largestHistogramRectangle(heights: number[]): number {
  const increasing: Array<[number, number]> = [];
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const height = i === heights.length ? 0 : heights[i];
    let start = i;
    while (increasing.length > 0 && increasing[increasing.length - 1][1] > height) {
      const [left, poppedHeight] = increasing.pop()!;
      best = Math.max(best, poppedHeight * (i - left));
      start = left;
    }
    if (increasing.length === 0 || increasing[increasing.length - 1][1] < height) increasing.push([start, height]);
  }
  return best;
}`,
  "atlas-025": `function decodeNestedRepetitions(encoded: string): string {
  const prefixes: string[] = [], repeats: number[] = [];
  let current = "", repeat = 0;
  for (const char of encoded) {
    if (/\d/.test(char)) repeat = repeat * 10 + Number(char);
    else if (char === "[") {
      prefixes.push(current);
      repeats.push(repeat);
      current = "";
      repeat = 0;
    } else if (char === "]") current = prefixes.pop()! + current.repeat(repeats.pop()!);
    else current += char;
  }
  return current;
}`,
  "atlas-026": `function stableInsertPosition(values: number[], target: number): number {
  let left = 0, right = values.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (values[mid] < target) left = mid + 1; else right = mid;
  }
  return left;
}`,
  "atlas-027": `function lookupInRotatedArray(values: number[], target: number): number {
  let left = 0, right = values.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (values[mid] === target) return mid;
    if (values[left] <= values[mid]) {
      if (values[left] <= target && target < values[mid]) right = mid - 1; else left = mid + 1;
    } else {
      if (values[mid] < target && target <= values[right]) left = mid + 1; else right = mid - 1;
    }
  }
  return -1;
}`,
  "atlas-028": `function firstAndLastMatch(values: number[], target: number): number[] {
  const lowerBound = (wanted: number): number => {
    let left = 0, right = values.length;
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (values[mid] < wanted) left = mid + 1; else right = mid;
    }
    return left;
  };
  const first = lowerBound(target);
  if (first === values.length || values[first] !== target) return [-1, -1];
  let left = first, right = values.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (values[mid] <= target) left = mid + 1; else right = mid;
  }
  return [first, left - 1];
}`,
  "atlas-029": `function minimumFeasibleProcessingRate(piles: number[], hours: number): number {
  let left = 1, right = Math.max(...piles);
  while (left < right) {
    const rate = left + Math.floor((right - left) / 2);
    const required = piles.reduce((sum, pile) => sum + Math.ceil(pile / rate), 0);
    if (required <= hours) right = rate; else left = rate + 1;
  }
  return left;
}`,
  "atlas-030": `function searchRowMajorMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  const rows = matrix.length, cols = matrix[0].length;
  let left = 0, right = rows * cols;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (matrix[Math.floor(mid / cols)][mid % cols] < target) left = mid + 1; else right = mid;
  }
  return left < rows * cols && matrix[Math.floor(left / cols)][left % cols] === target;
}`,
  "atlas-031": `function mergeReservations(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [];
  for (const interval of intervals) {
    const last = merged[merged.length - 1];
    if (last === undefined || last[1] < interval[0]) merged.push([...interval]);
    else last[1] = Math.max(last[1], interval[1]);
  }
  return merged;
}`,
  "atlas-032": `function insertReservation(intervals: number[][], incoming: number[]): number[][] {
  const answer: number[][] = [];
  let i = 0;
  while (i < intervals.length && intervals[i][1] < incoming[0]) answer.push(intervals[i++]);
  while (i < intervals.length && intervals[i][0] <= incoming[1]) {
    incoming[0] = Math.min(incoming[0], intervals[i][0]);
    incoming[1] = Math.max(incoming[1], intervals[i++][1]);
  }
  answer.push(incoming);
  while (i < intervals.length) answer.push(intervals[i++]);
  return answer;
}`,
  "atlas-033": `function minimumMeetingRooms(meetings: number[][]): number {
  if (meetings.length === 0) return 0;
  const starts = meetings.map(meeting => meeting[0]).sort((a, b) => a - b);
  const ends = meetings.map(meeting => meeting[1]).sort((a, b) => a - b);
  let i = 0, j = 0, active = 0, best = 0;
  while (i < starts.length) {
    if (starts[i] < ends[j]) { best = Math.max(best, ++active); i++; }
    else { active--; j++; }
  }
  return best;
}`,
  "atlas-034": `function removeMinimumOverlaps(intervals: number[][]): number {
  intervals.sort((a, b) => a[1] - b[1]);
  let kept = 0, lastEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      kept++;
      lastEnd = end;
    }
  }
  return intervals.length - kept;
}`,
  "atlas-035": `function intersectSchedules(a: number[][], b: number[][]): number[][] {
  const answer: number[][] = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    const start = Math.max(a[i][0], b[j][0]), end = Math.min(a[i][1], b[j][1]);
    if (start <= end) answer.push([start, end]);
    if (a[i][1] < b[j][1]) i++; else j++;
  }
  return answer;
}`,
  "atlas-036": `function reverseChain(head: ListNode | null): ListNode | null {
  let previous: ListNode | null = null;
  while (head !== null) {
    const next = head.next;
    head.next = previous;
    previous = head;
    head = next;
  }
  return previous;
}`,
  "atlas-037": `function detectCycle(head: ListNode | null): boolean {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
  "atlas-038": `function mergeOrderedChains(a: ListNode | null, b: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let tail = dummy;
  while (a !== null && b !== null) {
    if (a.val <= b.val) { tail.next = a; a = a.next; }
    else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a ?? b;
  return dummy.next;
}`,
  "atlas-039": `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let slow: ListNode = dummy, fast: ListNode = dummy;
  while (n-- > 0) fast = fast.next!;
  while (fast.next !== null) {
    slow = slow.next!;
    fast = fast.next;
  }
  slow.next = slow.next!.next;
  return dummy.next;
}`,
  "atlas-040": `function copyRandomLinks(head: RandomNode | null): RandomNode | null {
  if (head === null) return null;
  for (let node: RandomNode | null = head; node !== null; node = node.next!.next)
    node.next = new RandomNode(node.val, node.next, null);
  for (let node: RandomNode | null = head; node !== null; node = node.next!.next)
    node.next!.random = node.random === null ? null : node.random.next;
  const copyHead = head.next;
  for (let node: RandomNode | null = head; node !== null;) {
    const copy: RandomNode = node.next!;
    node.next = copy.next;
    copy.next = node.next === null ? null : node.next.next;
    node = node.next;
  }
  return copyHead;
}`,
  "atlas-041": `function maximumTreeDepth(root: TreeNode | null): number {
  return root === null ? 0 : 1 + Math.max(maximumTreeDepth(root.left), maximumTreeDepth(root.right));
}`,
  "atlas-042": `function treeDiameter(root: TreeNode | null): number {
  let answer = 0;
  const height = (node: TreeNode | null): number => {
    if (node === null) return 0;
    const left = height(node.left), right = height(node.right);
    answer = Math.max(answer, left + right);
    return 1 + Math.max(left, right);
  };
  height(root);
  return answer;
}`,
  "atlas-043": `function heightBalancedTree(root: TreeNode | null): boolean {
  const height = (node: TreeNode | null): number => {
    if (node === null) return 0;
    const left = height(node.left);
    if (left < 0) return -1;
    const right = height(node.right);
    if (right < 0) return -1;
    return Math.abs(left - right) <= 1 ? 1 + Math.max(left, right) : -1;
  };
  return height(root) >= 0;
}`,
  "atlas-044": `function validateSearchTreeOrdering(root: TreeNode | null): boolean {
  const valid = (node: TreeNode | null, low: number, high: number): boolean => {
    if (node === null) return true;
    if (node.val <= low || node.val >= high) return false;
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
  };
  return valid(root, -Infinity, Infinity);
}`,
  "atlas-045": `function lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  if (root === null || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left !== null && right !== null) return root;
  return left ?? right;
}`,
  "atlas-046": `function levelOrderValues(root: TreeNode | null): number[][] {
  if (root === null) return [];
  const pending: TreeNode[] = [root], answer: number[][] = [];
  for (let front = 0; front < pending.length;) {
    const end = pending.length, level: number[] = [];
    while (front < end) {
      const node = pending[front++];
      level.push(node.val);
      if (node.left !== null) pending.push(node.left);
      if (node.right !== null) pending.push(node.right);
    }
    answer.push(level);
  }
  return answer;
}`,
  "atlas-047": `function zigzagLevels(root: TreeNode | null): number[][] {
  if (root === null) return [];
  const pending: TreeNode[] = [root], answer: number[][] = [];
  let front = 0, forward = true;
  while (front < pending.length) {
    const count = pending.length - front, level = Array<number>(count);
    for (let i = 0; i < count; i++) {
      const node = pending[front++];
      level[forward ? i : count - 1 - i] = node.val;
      if (node.left !== null) pending.push(node.left);
      if (node.right !== null) pending.push(node.right);
    }
    answer.push(level);
    forward = !forward;
  }
  return answer;
}`,
  "atlas-048": `function rightSideProjection(root: TreeNode | null): number[] {
  if (root === null) return [];
  const pending: TreeNode[] = [root], answer: number[] = [];
  let front = 0;
  while (front < pending.length) {
    const count = pending.length - front;
    for (let i = 0; i < count; i++) {
      const node = pending[front++];
      if (i === count - 1) answer.push(node.val);
      if (node.left !== null) pending.push(node.left);
      if (node.right !== null) pending.push(node.right);
    }
  }
  return answer;
}`,
  "atlas-049": `function connectLevelNeighbours(root: PerfectNode | null): PerfectNode | null {
  for (let level = root; level !== null && level.left !== null; level = level.left) {
    for (let node: PerfectNode | null = level; node !== null; node = node.next) {
      node.left!.next = node.right;
      if (node.next !== null) node.right!.next = node.next.left;
    }
  }
  return root;
}`,
  "atlas-050": `function minimumLeafDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  const pending: TreeNode[] = [root];
  let front = 0, depth = 1;
  while (front < pending.length) {
    const count = pending.length - front;
    for (let i = 0; i < count; i++) {
      const node = pending[front++];
      if (node.left === null && node.right === null) return depth;
      if (node.left !== null) pending.push(node.left);
      if (node.right !== null) pending.push(node.right);
    }
    depth++;
  }
  return depth;
}`,
  "atlas-051": `function kthLargestValue(values: number[], k: number): number {
  const heap: number[] = [];
  const push = (value: number): void => {
    heap.push(value);
    for (let i = heap.length - 1; i > 0;) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[parent] <= heap[i]) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
  };
  const pop = (): void => {
    const tail = heap.pop()!;
    if (heap.length === 0) return;
    heap[0] = tail;
    for (let i = 0;;) {
      let smallest = i, left = i * 2 + 1, right = left + 1;
      if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
      if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    }
  };
  for (const value of values) {
    push(value);
    if (heap.length > k) pop();
  }
  return heap[0];
}`,
  "atlas-052": `function mostFrequentKValues(values: number[], k: number): number[] {
  const frequency = new Map<number, number>();
  for (const value of values) frequency.set(value, (frequency.get(value) ?? 0) + 1);
  const buckets = Array.from({ length: values.length + 1 }, () => [] as number[]);
  for (const [value, count] of frequency) buckets[count].push(value);
  const answer: number[] = [];
  for (let count = values.length; count > 0 && answer.length < k; count--)
    for (const value of buckets[count]) if (answer.length < k) answer.push(value);
  return answer;
}`,
  "atlas-053": `function mergeKOrderedStreams(lists: Array<ListNode | null>): ListNode | null {
  const heap: ListNode[] = [];
  const push = (node: ListNode): void => {
    heap.push(node);
    for (let i = heap.length - 1; i > 0;) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[parent].val <= heap[i].val) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
  };
  const pop = (): ListNode => {
    const answer = heap[0], tail = heap.pop()!;
    if (heap.length > 0) {
      heap[0] = tail;
      for (let i = 0;;) {
        let smallest = i, left = i * 2 + 1, right = left + 1;
        if (left < heap.length && heap[left].val < heap[smallest].val) smallest = left;
        if (right < heap.length && heap[right].val < heap[smallest].val) smallest = right;
        if (smallest === i) break;
        [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
        i = smallest;
      }
    }
    return answer;
  };
  for (const head of lists) if (head !== null) push(head);
  const dummy = new ListNode(0);
  let tail = dummy;
  while (heap.length > 0) {
    const node = pop();
    tail.next = node;
    tail = node;
    if (node.next !== null) push(node.next);
  }
  return dummy.next;
}`,
  "atlas-054": `class RunningMedian {
  private lower: number[] = [];
  private upper: number[] = [];
  private push(heap: number[], value: number, sign: number): void {
    heap.push(value);
    for (let i = heap.length - 1; i > 0;) {
      const parent = Math.floor((i - 1) / 2);
      if (sign * heap[parent] <= sign * heap[i]) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
  }
  private pop(heap: number[], sign: number): number {
    const answer = heap[0], tail = heap.pop()!;
    if (heap.length > 0) {
      heap[0] = tail;
      for (let i = 0;;) {
        let best = i, left = i * 2 + 1, right = left + 1;
        if (left < heap.length && sign * heap[left] < sign * heap[best]) best = left;
        if (right < heap.length && sign * heap[right] < sign * heap[best]) best = right;
        if (best === i) break;
        [heap[i], heap[best]] = [heap[best], heap[i]];
        i = best;
      }
    }
    return answer;
  }
  add(value: number): void {
    if (this.lower.length === 0 || value <= this.lower[0]) this.push(this.lower, value, -1);
    else this.push(this.upper, value, 1);
    if (this.lower.length > this.upper.length + 1) this.push(this.upper, this.pop(this.lower, -1), 1);
    if (this.upper.length > this.lower.length + 1) this.push(this.lower, this.pop(this.upper, 1), -1);
  }
  median(): number {
    if (this.lower.length === this.upper.length) return (this.lower[0] + this.upper[0]) / 2;
    return this.lower.length > this.upper.length ? this.lower[0] : this.upper[0];
  }
}`,
  "atlas-055": `function cooldownTaskScheduler(tasks: string[], cooldown: number): number {
  const frequency = Array<number>(26).fill(0);
  for (const task of tasks) frequency[task.charCodeAt(0) - 65]++;
  const maximum = Math.max(...frequency), tied = frequency.filter(count => count === maximum).length;
  return Math.max(tasks.length, (maximum - 1) * (cooldown + 1) + tied);
}`,
  "atlas-056": `function countGridIslands(grid: string[][]): number {
  if (grid.length === 0) return 0;
  const flood = (row: number, col: number): void => {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] !== "1") return;
    grid[row][col] = "0";
    flood(row + 1, col); flood(row - 1, col); flood(row, col + 1); flood(row, col - 1);
  };
  let islands = 0;
  for (let row = 0; row < grid.length; row++) for (let col = 0; col < grid[0].length; col++) {
    if (grid[row][col] === "1") { islands++; flood(row, col); }
  }
  return islands;
}`,
  "atlas-057": `function shortestGridEscape(grid: number[][]): number {
  const n = grid.length;
  if (n === 0 || grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) return -1;
  const pending: number[][] = [[0, 0]];
  let front = 0, distance = 1;
  grid[0][0] = 1;
  while (front < pending.length) {
    const count = pending.length - front;
    for (let i = 0; i < count; i++) {
      const [row, col] = pending[front++];
      if (row === n - 1 && col === n - 1) return distance;
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        const nextRow = row + dr, nextCol = col + dc;
        if (nextRow >= 0 && nextRow < n && nextCol >= 0 && nextCol < n && grid[nextRow][nextCol] === 0) {
          grid[nextRow][nextCol] = 1;
          pending.push([nextRow, nextCol]);
        }
      }
    }
    distance++;
  }
  return -1;
}`,
  "atlas-058": `function singleLetterTransformation(start: string, goal: string, words: string[]): number {
  const unused = new Set(words);
  if (!unused.has(goal)) return 0;
  const pending = [start];
  let front = 0, length = 1;
  unused.delete(start);
  while (front < pending.length) {
    const count = pending.length - front;
    for (let item = 0; item < count; item++) {
      const word = pending[front++];
      if (word === goal) return length;
      for (let i = 0; i < word.length; i++) for (let code = 97; code <= 122; code++) {
        const next = word.slice(0, i) + String.fromCharCode(code) + word.slice(i + 1);
        if (unused.delete(next)) pending.push(next);
      }
    }
    length++;
  }
  return 0;
}`,
  "atlas-059": `function courseReachability(count: number, prerequisites: number[][]): boolean {
  const graph = Array.from({ length: count }, () => [] as number[]), indegree = Array<number>(count).fill(0);
  for (const [course, prerequisite] of prerequisites) {
    graph[prerequisite].push(course);
    indegree[course]++;
  }
  const ready: number[] = [];
  for (let course = 0; course < count; course++) if (indegree[course] === 0) ready.push(course);
  let front = 0;
  while (front < ready.length) {
    const prerequisite = ready[front++];
    for (const course of graph[prerequisite]) if (--indegree[course] === 0) ready.push(course);
  }
  return ready.length === count;
}`,
  "atlas-060": `function rotSpreadTime(grid: number[][]): number {
  if (grid.length === 0) return 0;
  const rotten: number[][] = [];
  let front = 0, fresh = 0, minutes = 0;
  for (let row = 0; row < grid.length; row++) for (let col = 0; col < grid[0].length; col++) {
    if (grid[row][col] === 2) rotten.push([row, col]);
    else if (grid[row][col] === 1) fresh++;
  }
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (fresh > 0 && front < rotten.length) {
    minutes++;
    const count = rotten.length - front;
    for (let i = 0; i < count; i++) {
      const [row, col] = rotten[front++];
      for (const [dr, dc] of directions) {
        const nextRow = row + dr, nextCol = col + dc;
        if (nextRow >= 0 && nextRow < grid.length && nextCol >= 0 && nextCol < grid[0].length && grid[nextRow][nextCol] === 1) {
          grid[nextRow][nextCol] = 2;
          fresh--;
          rotten.push([nextRow, nextCol]);
        }
      }
    }
  }
  return fresh === 0 ? minutes : -1;
}`,
  "atlas-061": `function cloneNetwork(start: GraphNode | null): GraphNode | null {
  if (start === null) return null;
  const copy = new Map<GraphNode, GraphNode>([[start, new GraphNode(start.val)]]), pending = [start];
  for (let front = 0; front < pending.length; front++) {
    const node = pending[front];
    for (const neighbor of node.neighbors) {
      if (!copy.has(neighbor)) {
        copy.set(neighbor, new GraphNode(neighbor.val));
        pending.push(neighbor);
      }
      copy.get(node)!.neighbors.push(copy.get(neighbor)!);
    }
  }
  return copy.get(start)!;
}`,
  "atlas-062": `function detectDirectedCycle(graph: number[][]): boolean {
  const state = Array<number>(graph.length).fill(0);
  const cycle = (node: number): boolean => {
    state[node] = 1;
    for (const next of graph[node]) {
      if (state[next] === 1 || (state[next] === 0 && cycle(next))) return true;
    }
    state[node] = 2;
    return false;
  };
  return graph.some((_, node) => state[node] === 0 && cycle(node));
}`,
  "atlas-063": `function countConnectedComponents(n: number, edges: number[][]): number {
  const graph = Array.from({ length: n }, () => [] as number[]);
  for (const [a, b] of edges) { graph[a].push(b); graph[b].push(a); }
  const seen = Array<boolean>(n).fill(false);
  let components = 0;
  for (let start = 0; start < n; start++) if (!seen[start]) {
    components++;
    const pending = [start];
    seen[start] = true;
    while (pending.length > 0) {
      const node = pending.pop()!;
      for (const next of graph[node]) if (!seen[next]) {
        seen[next] = true;
        pending.push(next);
      }
    }
  }
  return components;
}`,
  "atlas-064": `function dependencyOrdering(count: number, prerequisites: number[][]): number[] {
  const graph = Array.from({ length: count }, () => [] as number[]), indegree = Array<number>(count).fill(0);
  for (const [course, prerequisite] of prerequisites) {
    graph[prerequisite].push(course);
    indegree[course]++;
  }
  const order: number[] = [];
  for (let course = 0; course < count; course++) if (indegree[course] === 0) order.push(course);
  for (let front = 0; front < order.length; front++)
    for (const next of graph[order[front]]) if (--indegree[next] === 0) order.push(next);
  return order.length === count ? order : [];
}`,
  "atlas-065": `function criticalNetworkBridges(n: number, edges: number[][]): number[][] {
  const graph = Array.from({ length: n }, () => [] as Array<[number, number]>);
  edges.forEach(([a, b], id) => { graph[a].push([b, id]); graph[b].push([a, id]); });
  const discovered = Array<number>(n).fill(-1), low = Array<number>(n).fill(0), bridges: number[][] = [];
  let time = 0;
  const visit = (node: number, parentEdge: number): void => {
    discovered[node] = low[node] = time++;
    for (const [next, edge] of graph[node]) {
      if (edge === parentEdge) continue;
      if (discovered[next] < 0) {
        visit(next, edge);
        low[node] = Math.min(low[node], low[next]);
        if (low[next] > discovered[node]) bridges.push([node, next]);
      } else low[node] = Math.min(low[node], discovered[next]);
    }
  };
  for (let node = 0; node < n; node++) if (discovered[node] < 0) visit(node, -1);
  return bridges;
}`,
  "atlas-066": `function allSubsets(values: number[]): number[][] {
  const answer: number[][] = [], current: number[] = [];
  const visit = (index: number): void => {
    if (index === values.length) { answer.push([...current]); return; }
    visit(index + 1);
    current.push(values[index]);
    visit(index + 1);
    current.pop();
  };
  visit(0);
  return answer;
}`,
  "atlas-067": `function allPermutations(values: number[]): number[][] {
  const answer: number[][] = [], current: number[] = [], used = Array<boolean>(values.length).fill(false);
  const visit = (): void => {
    if (current.length === values.length) { answer.push([...current]); return; }
    for (let i = 0; i < values.length; i++) if (!used[i]) {
      used[i] = true;
      current.push(values[i]);
      visit();
      current.pop();
      used[i] = false;
    }
  };
  visit();
  return answer;
}`,
  "atlas-068": `function targetCombinationSums(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const answer: number[][] = [], current: number[] = [];
  const visit = (start: number, remaining: number): void => {
    if (remaining === 0) { answer.push([...current]); return; }
    for (let i = start; i < candidates.length && candidates[i] <= remaining; i++) {
      current.push(candidates[i]);
      visit(i, remaining - candidates[i]);
      current.pop();
    }
  };
  visit(0, target);
  return answer;
}`,
  "atlas-069": `function placeNQueens(n: number): string[][] {
  const answer: string[][] = [], board = Array.from({ length: n }, () => Array<string>(n).fill("."));
  const column = Array<boolean>(n).fill(false), down = Array<boolean>(2 * n - 1).fill(false), up = Array<boolean>(2 * n - 1).fill(false);
  const place = (row: number): void => {
    if (row === n) { answer.push(board.map(line => line.join(""))); return; }
    for (let col = 0; col < n; col++) {
      const d = row - col + n - 1, u = row + col;
      if (column[col] || down[d] || up[u]) continue;
      column[col] = down[d] = up[u] = true;
      board[row][col] = "Q";
      place(row + 1);
      board[row][col] = ".";
      column[col] = down[d] = up[u] = false;
    }
  };
  place(0);
  return answer;
}`,
  "atlas-070": `function traceWordInGrid(board: string[][], word: string): boolean {
  const search = (row: number, col: number, index: number): boolean => {
    if (index === word.length) return true;
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || board[row][col] !== word[index]) return false;
    const saved = board[row][col];
    board[row][col] = "#";
    const found = search(row + 1, col, index + 1) || search(row - 1, col, index + 1)
      || search(row, col + 1, index + 1) || search(row, col - 1, index + 1);
    board[row][col] = saved;
    return found;
  };
  for (let row = 0; row < board.length; row++)
    for (let col = 0; col < board[0].length; col++) if (search(row, col, 0)) return true;
  return false;
}`,
  "atlas-071": `function countStairRoutes(n: number): number {
  let twoBack = 1, oneBack = 1;
  for (let step = 2; step <= n; step++) {
    const current = oneBack + twoBack;
    twoBack = oneBack;
    oneBack = current;
  }
  return oneBack;
}`,
  "atlas-072": `function maximumNonAdjacentSum(values: number[]): number {
  let twoBack = 0, oneBack = 0;
  for (const value of values) {
    const current = Math.max(oneBack, twoBack + value);
    twoBack = oneBack;
    oneBack = current;
  }
  return oneBack;
}`,
  "atlas-073": `function minimumCoins(coins: number[], amount: number): number {
  const best = Array<number>(amount + 1).fill(amount + 1);
  best[0] = 0;
  for (let value = 1; value <= amount; value++)
    for (const coin of coins) if (coin <= value) best[value] = Math.min(best[value], best[value - coin] + 1);
  return best[amount] > amount ? -1 : best[amount];
}`,
  "atlas-074": `function longestIncreasingSubsequence(values: number[]): number {
  const tails: number[] = [];
  for (const value of values) {
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (tails[mid] < value) left = mid + 1; else right = mid;
    }
    tails[left] = value;
  }
  return tails.length;
}`,
  "atlas-075": `function editDistance(source: string, target: string): number {
  let previous = Array.from({ length: target.length + 1 }, (_, index) => index);
  let current = Array<number>(target.length + 1).fill(0);
  for (let i = 1; i <= source.length; i++) {
    current[0] = i;
    for (let j = 1; j <= target.length; j++) {
      if (source[i - 1] === target[j - 1]) current[j] = previous[j - 1];
      else current[j] = 1 + Math.min(previous[j], current[j - 1], previous[j - 1]);
    }
    [previous, current] = [current, previous];
  }
  return previous[target.length];
}`
};
