/** Reviewed Python 3 reference implementations for the original Atlas 75 contracts. */
export const pythonAtlas75: Record<string, string> = {
  "atlas-001": `def complement_pair_ledger(values: list[int], target: int) -> list[int]:
    index: dict[int, int] = {}
    for i, value in enumerate(values):
        complement = target - value
        if complement in index:
            return [index[complement], i]
        index[value] = i
    return []`,
  "atlas-002": `def longest_consecutive_run(values: list[int]) -> int:
    present = set(values)
    best = 0
    for value in present:
        if value - 1 in present:
            continue
        length = 1
        while value + length in present:
            length += 1
        best = max(best, length)
    return best`,
  "atlas-003": `def grouped_word_signatures(words: list[str]) -> list[list[str]]:
    groups: dict[tuple[int, ...], list[str]] = {}
    for word in words:
        counts = [0] * 26
        for char in word:
            counts[ord(char) - ord("a")] += 1
        groups.setdefault(tuple(counts), []).append(word)
    return list(groups.values())`,
  "atlas-004": `def longest_zero_sum_span(values: list[int]) -> int:
    first = {0: -1}
    prefix = best = 0
    for index, value in enumerate(values):
        prefix += value
        if prefix in first:
            best = max(best, index - first[prefix])
        else:
            first[prefix] = index
    return best`,
  "atlas-005": `def frequency_ordered_values(text: str) -> str:
    counts = Counter(text)
    ordered = sorted(counts.items(), key=lambda item: (-item[1], item[0]))
    return "".join(char * count for char, count in ordered)`,
  "atlas-006": `def filtered_palindrome(text: str) -> bool:
    left, right = 0, len(text) - 1
    while left < right:
        while left < right and not text[left].isalnum():
            left += 1
        while left < right and not text[right].isalnum():
            right -= 1
        if text[left].casefold() != text[right].casefold():
            return False
        left += 1
        right -= 1
    return True`,
  "atlas-007": `def target_pair_in_sorted_data(values: list[int], target: int) -> list[int]:
    left, right = 0, len(values) - 1
    while left < right:
        total = values[left] + values[right]
        if total == target:
            return [left + 1, right + 1]
        if total < target:
            left += 1
        else:
            right -= 1
    return []`,
  "atlas-008": `def maximum_container(heights: list[int]) -> int:
    left, right, best = 0, len(heights) - 1, 0
    while left < right:
        best = max(best, (right - left) * min(heights[left], heights[right]))
        if heights[left] <= heights[right]:
            left += 1
        else:
            right -= 1
    return best`,
  "atlas-009": `def zero_sum_triples(values: list[int]) -> list[list[int]]:
    values.sort()
    answer: list[list[int]] = []
    for index, first in enumerate(values):
        if first > 0:
            break
        if index and first == values[index - 1]:
            continue
        left, right = index + 1, len(values) - 1
        while left < right:
            total = first + values[left] + values[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                answer.append([first, values[left], values[right]])
                low, high = values[left], values[right]
                while left < right and values[left] == low: left += 1
                while left < right and values[right] == high: right -= 1
    return answer`,
  "atlas-010": `def in_place_sorted_deduplication(values: list[int]) -> int:
    if not values:
        return 0
    write = 1
    for read in range(1, len(values)):
        if values[read] != values[write - 1]:
            values[write] = values[read]
            write += 1
    return write`,
  "atlas-011": `def smallest_covering_window(source: str, required: str) -> str:
    if not required:
        return ""
    need = Counter(required)
    missing, left = len(required), 0
    best_start, best_length = 0, inf
    for right, char in enumerate(source):
        if need[char] > 0:
            missing -= 1
        need[char] -= 1
        while missing == 0:
            if right - left + 1 < best_length:
                best_start, best_length = left, right - left + 1
            outgoing = source[left]
            need[outgoing] += 1
            if need[outgoing] > 0:
                missing += 1
            left += 1
    return "" if best_length == inf else source[best_start:best_start + best_length]`,
  "atlas-012": `def longest_unique_segment(text: str) -> int:
    latest: dict[str, int] = {}
    left = best = 0
    for right, char in enumerate(text):
        left = max(left, latest.get(char, -1) + 1)
        latest[char] = right
        best = max(best, right - left + 1)
    return best`,
  "atlas-013": `def best_fixed_length_window(values: list[int], k: int) -> int:
    if not 1 <= k <= len(values):
        raise ValueError("k outside input")
    window = sum(values[:k])
    best = window
    for right in range(k, len(values)):
        window += values[right] - values[right - k]
        best = max(best, window)
    return best`,
  "atlas-014": `def uniform_segment_after_replacements(text: str, k: int) -> int:
    counts = [0] * 26
    left = max_frequency = best = 0
    for right, char in enumerate(text):
        index = ord(char) - ord("A")
        counts[index] += 1
        max_frequency = max(max_frequency, counts[index])
        while right - left + 1 - max_frequency > k:
            counts[ord(text[left]) - ord("A")] -= 1
            left += 1
        best = max(best, right - left + 1)
    return best`,
  "atlas-015": `def permutation_window(pattern: str, text: str) -> bool:
    if len(pattern) > len(text):
        return False
    delta = Counter(pattern)
    for index, char in enumerate(text):
        delta[char] -= 1
        if index >= len(pattern):
            delta[text[index - len(pattern)]] += 1
        if index + 1 >= len(pattern) and all(value == 0 for value in delta.values()):
            return True
    return False`,
  "atlas-016": `class ImmutableRangeTotals:
    def __init__(self, values: list[int]) -> None:
        self.prefix = [0]
        for value in values:
            self.prefix.append(self.prefix[-1] + value)

    def query(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]`,
  "atlas-017": `def equilibrium_index(values: list[int]) -> int:
    total, left = sum(values), 0
    for index, value in enumerate(values):
        if left == total - left - value:
            return index
        left += value
    return -1`,
  "atlas-018": `def count_target_sum_subarrays(values: list[int], target: int) -> int:
    frequency = Counter({0: 1})
    prefix = answer = 0
    for value in values:
        prefix += value
        answer += frequency[prefix - target]
        frequency[prefix] += 1
    return answer`,
  "atlas-019": `def product_except_current(values: list[int]) -> list[int]:
    answer = [1] * len(values)
    prefix = 1
    for index, value in enumerate(values):
        answer[index] = prefix
        prefix *= value
    suffix = 1
    for index in range(len(values) - 1, -1, -1):
        answer[index] *= suffix
        suffix *= values[index]
    return answer`,
  "atlas-020": `def batched_range_additions(length: int, operations: list[tuple[int, int, int]]) -> list[int]:
    difference = [0] * length
    for left, right, delta in operations:
        difference[left] += delta
        if right + 1 < length:
            difference[right + 1] -= delta
    for index in range(1, length):
        difference[index] += difference[index - 1]
    return difference`,
  "atlas-021": `def balanced_delimiters(text: str) -> bool:
    opener = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []
    for char in text:
        if char not in opener:
            stack.append(char)
        elif not stack or stack.pop() != opener[char]:
            return False
    return not stack`,
  "atlas-022": `class MinimumAwareStack:
    def __init__(self) -> None:
        self.data: list[tuple[int, int]] = []

    def push(self, value: int) -> None:
        minimum = value if not self.data else min(value, self.data[-1][1])
        self.data.append((value, minimum))

    def pop(self) -> None:
        self.data.pop()

    def top(self) -> int:
        return self.data[-1][0]

    def minimum(self) -> int:
        return self.data[-1][1]`,
  "atlas-023": `def next_warmer_reading(temperatures: list[int]) -> list[int]:
    answer = [0] * len(temperatures)
    pending: list[int] = []
    for day, temperature in enumerate(temperatures):
        while pending and temperatures[pending[-1]] < temperature:
            earlier = pending.pop()
            answer[earlier] = day - earlier
        pending.append(day)
    return answer`,
  "atlas-024": `def largest_histogram_rectangle(heights: list[int]) -> int:
    increasing: list[tuple[int, int]] = []
    best = 0
    for index, height in enumerate(heights + [0]):
        start = index
        while increasing and increasing[-1][1] > height:
            left, previous = increasing.pop()
            best = max(best, previous * (index - left))
            start = left
        if not increasing or increasing[-1][1] < height:
            increasing.append((start, height))
    return best`,
  "atlas-025": `def decode_nested_repetitions(encoded: str) -> str:
    frames: list[tuple[str, int]] = []
    current, repeat = "", 0
    for char in encoded:
        if char.isdigit():
            repeat = repeat * 10 + int(char)
        elif char == "[":
            frames.append((current, repeat))
            current, repeat = "", 0
        elif char == "]":
            prefix, times = frames.pop()
            current = prefix + current * times
        else:
            current += char
    return current`,
  "atlas-026": `def stable_insert_position(values: list[int], target: int) -> int:
    left, right = 0, len(values)
    while left < right:
        middle = left + (right - left) // 2
        if values[middle] < target:
            left = middle + 1
        else:
            right = middle
    return left`,
  "atlas-027": `def lookup_in_rotated_array(values: list[int], target: int) -> int:
    left, right = 0, len(values) - 1
    while left <= right:
        middle = left + (right - left) // 2
        if values[middle] == target:
            return middle
        if values[left] <= values[middle]:
            if values[left] <= target < values[middle]: right = middle - 1
            else: left = middle + 1
        else:
            if values[middle] < target <= values[right]: left = middle + 1
            else: right = middle - 1
    return -1`,
  "atlas-028": `def first_and_last_match(values: list[int], target: int) -> list[int]:
    first = bisect_left(values, target)
    if first == len(values) or values[first] != target:
        return [-1, -1]
    return [first, bisect_right(values, target) - 1]`,
  "atlas-029": `def minimum_feasible_processing_rate(piles: list[int], hours: int) -> int:
    left, right = 1, max(piles)
    while left < right:
        rate = left + (right - left) // 2
        required = sum((pile + rate - 1) // rate for pile in piles)
        if required <= hours:
            right = rate
        else:
            left = rate + 1
    return left`,
  "atlas-030": `def search_row_major_matrix(matrix: list[list[int]], target: int) -> bool:
    if not matrix or not matrix[0]:
        return False
    rows, columns = len(matrix), len(matrix[0])
    left, right = 0, rows * columns
    while left < right:
        middle = left + (right - left) // 2
        if matrix[middle // columns][middle % columns] < target:
            left = middle + 1
        else:
            right = middle
    return left < rows * columns and matrix[left // columns][left % columns] == target`,
  "atlas-031": `def merge_reservations(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort()
    merged: list[list[int]] = []
    for start, end in intervals:
        if not merged or merged[-1][1] < start:
            merged.append([start, end])
        else:
            merged[-1][1] = max(merged[-1][1], end)
    return merged`,
  "atlas-032": `def insert_reservation(intervals: list[list[int]], incoming: list[int]) -> list[list[int]]:
    answer: list[list[int]] = []
    index = 0
    while index < len(intervals) and intervals[index][1] < incoming[0]:
        answer.append(intervals[index]); index += 1
    while index < len(intervals) and intervals[index][0] <= incoming[1]:
        incoming[0] = min(incoming[0], intervals[index][0])
        incoming[1] = max(incoming[1], intervals[index][1])
        index += 1
    return answer + [incoming] + intervals[index:]`,
  "atlas-033": `def minimum_meeting_rooms(meetings: list[tuple[int, int]]) -> int:
    if not meetings:
        return 0
    starts = sorted(start for start, _ in meetings)
    ends = sorted(end for _, end in meetings)
    start_index = end_index = active = best = 0
    while start_index < len(starts):
        if starts[start_index] < ends[end_index]:
            active += 1
            best = max(best, active)
            start_index += 1
        else:
            active -= 1
            end_index += 1
    return best`,
  "atlas-034": `def remove_minimum_overlaps(intervals: list[tuple[int, int]]) -> int:
    intervals.sort(key=lambda interval: interval[1])
    kept, last_end = 0, -inf
    for start, end in intervals:
        if start >= last_end:
            kept += 1
            last_end = end
    return len(intervals) - kept`,
  "atlas-035": `def intersect_schedules(a: list[list[int]], b: list[list[int]]) -> list[list[int]]:
    answer: list[list[int]] = []
    left = right = 0
    while left < len(a) and right < len(b):
        start = max(a[left][0], b[right][0])
        end = min(a[left][1], b[right][1])
        if start <= end:
            answer.append([start, end])
        if a[left][1] < b[right][1]: left += 1
        else: right += 1
    return answer`,
  "atlas-036": `def reverse_chain(head):
    previous = None
    while head:
        following = head.next
        head.next = previous
        previous = head
        head = following
    return previous`,
  "atlas-037": `def detect_cycle(head) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
  "atlas-038": `def merge_ordered_chains(a, b):
    dummy = tail = ListNode()
    while a and b:
        if a.val <= b.val:
            tail.next, a = a, a.next
        else:
            tail.next, b = b, b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next`,
  "atlas-039": `def remove_nth_from_end(head, n: int):
    dummy = ListNode(0, head)
    slow = fast = dummy
    for _ in range(n):
        fast = fast.next
    while fast.next:
        slow = slow.next
        fast = fast.next
    slow.next = slow.next.next
    return dummy.next`,
  "atlas-040": `def copy_random_links(head):
    if not head:
        return None
    node = head
    while node:
        node.next = RandomNode(node.val, node.next)
        node = node.next.next
    node = head
    while node:
        node.next.random = node.random.next if node.random else None
        node = node.next.next
    copy_head = head.next
    node = head
    while node:
        copy = node.next
        node.next = copy.next
        copy.next = node.next.next if node.next else None
        node = node.next
    return copy_head`,
  "atlas-041": `def maximum_tree_depth(root) -> int:
    if not root:
        return 0
    return 1 + max(maximum_tree_depth(root.left), maximum_tree_depth(root.right))`,
  "atlas-042": `def tree_diameter(root) -> int:
    answer = 0
    def height(node) -> int:
        nonlocal answer
        if not node:
            return 0
        left, right = height(node.left), height(node.right)
        answer = max(answer, left + right)
        return 1 + max(left, right)
    height(root)
    return answer`,
  "atlas-043": `def height_balanced_tree(root) -> bool:
    def height(node) -> int:
        if not node:
            return 0
        left = height(node.left)
        if left < 0: return -1
        right = height(node.right)
        if right < 0 or abs(left - right) > 1: return -1
        return 1 + max(left, right)
    return height(root) >= 0`,
  "atlas-044": `def validate_search_tree_ordering(root) -> bool:
    def valid(node, low: float, high: float) -> bool:
        if not node:
            return True
        if not low < node.val < high:
            return False
        return valid(node.left, low, node.val) and valid(node.right, node.val, high)
    return valid(root, -inf, inf)`,
  "atlas-045": `def lowest_common_ancestor(root, first, second):
    if not root or root is first or root is second:
        return root
    left = lowest_common_ancestor(root.left, first, second)
    right = lowest_common_ancestor(root.right, first, second)
    if left and right:
        return root
    return left or right`,
  "atlas-046": `def level_order_values(root) -> list[list[int]]:
    if not root:
        return []
    pending = deque([root])
    answer: list[list[int]] = []
    while pending:
        level: list[int] = []
        for _ in range(len(pending)):
            node = pending.popleft()
            level.append(node.val)
            if node.left: pending.append(node.left)
            if node.right: pending.append(node.right)
        answer.append(level)
    return answer`,
  "atlas-047": `def zigzag_levels(root) -> list[list[int]]:
    if not root:
        return []
    pending, answer, forward = deque([root]), [], True
    while pending:
        level = [0] * len(pending)
        for index in range(len(pending)):
            node = pending.popleft()
            level[index if forward else len(level) - 1 - index] = node.val
            if node.left: pending.append(node.left)
            if node.right: pending.append(node.right)
        answer.append(level)
        forward = not forward
    return answer`,
  "atlas-048": `def right_side_projection(root) -> list[int]:
    if not root:
        return []
    pending, answer = deque([root]), []
    while pending:
        for index in range(len(pending)):
            node = pending.popleft()
            if index == 0:
                answer.append(node.val)
            if node.right: pending.append(node.right)
            if node.left: pending.append(node.left)
    return answer`,
  "atlas-049": `def connect_level_neighbours(root):
    level = root
    while level and level.left:
        node = level
        while node:
            node.left.next = node.right
            if node.next:
                node.right.next = node.next.left
            node = node.next
        level = level.left
    return root`,
  "atlas-050": `def minimum_leaf_depth(root) -> int:
    if not root:
        return 0
    pending = deque([(root, 1)])
    while pending:
        node, depth = pending.popleft()
        if not node.left and not node.right:
            return depth
        if node.left: pending.append((node.left, depth + 1))
        if node.right: pending.append((node.right, depth + 1))
    return 0`,
  "atlas-051": `def kth_largest_value(values: list[int], k: int) -> int:
    largest: list[int] = []
    for value in values:
        heappush(largest, value)
        if len(largest) > k:
            heappop(largest)
    return largest[0]`,
  "atlas-052": `def most_frequent_k_values(values: list[int], k: int) -> list[int]:
    frequency = Counter(values)
    buckets: list[list[int]] = [[] for _ in range(len(values) + 1)]
    for value, count in frequency.items():
        buckets[count].append(value)
    answer: list[int] = []
    for count in range(len(buckets) - 1, 0, -1):
        answer.extend(buckets[count])
        if len(answer) >= k:
            return answer[:k]
    return answer`,
  "atlas-053": `def merge_k_ordered_streams(lists):
    next_nodes: list[tuple[int, int, object]] = []
    serial = count()
    for head in lists:
        if head:
            heappush(next_nodes, (head.val, next(serial), head))
    dummy = tail = ListNode()
    while next_nodes:
        _, _, node = heappop(next_nodes)
        tail.next = node
        tail = node
        if node.next:
            heappush(next_nodes, (node.next.val, next(serial), node.next))
    return dummy.next`,
  "atlas-054": `class RunningMedian:
    def __init__(self) -> None:
        self.lower: list[int] = []
        self.upper: list[int] = []

    def add(self, value: int) -> None:
        if not self.lower or value <= -self.lower[0]:
            heappush(self.lower, -value)
        else:
            heappush(self.upper, value)
        if len(self.lower) > len(self.upper) + 1:
            heappush(self.upper, -heappop(self.lower))
        elif len(self.upper) > len(self.lower) + 1:
            heappush(self.lower, -heappop(self.upper))

    def median(self) -> float:
        if len(self.lower) == len(self.upper):
            return (-self.lower[0] + self.upper[0]) / 2
        return float(-self.lower[0] if len(self.lower) > len(self.upper) else self.upper[0])`,
  "atlas-055": `def cooldown_task_scheduler(tasks: list[str], cooldown: int) -> int:
    frequency = Counter(tasks)
    maximum = max(frequency.values(), default=0)
    tied = sum(count == maximum for count in frequency.values())
    return max(len(tasks), (maximum - 1) * (cooldown + 1) + tied)`,
  "atlas-056": `def count_grid_islands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
    rows, columns, islands = len(grid), len(grid[0]), 0
    def flood(row: int, column: int) -> None:
        grid[row][column] = "0"
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            r, c = row + dr, column + dc
            if 0 <= r < rows and 0 <= c < columns and grid[r][c] == "1":
                flood(r, c)
    for row in range(rows):
        for column in range(columns):
            if grid[row][column] == "1":
                islands += 1
                flood(row, column)
    return islands`,
  "atlas-057": `def shortest_grid_escape(grid: list[list[int]]) -> int:
    size = len(grid)
    if not size or grid[0][0] or grid[-1][-1]:
        return -1
    pending = deque([(0, 0, 1)])
    grid[0][0] = 1
    while pending:
        row, column, distance = pending.popleft()
        if row == size - 1 and column == size - 1:
            return distance
        for dr in (-1, 0, 1):
            for dc in (-1, 0, 1):
                r, c = row + dr, column + dc
                if 0 <= r < size and 0 <= c < size and not grid[r][c]:
                    grid[r][c] = 1
                    pending.append((r, c, distance + 1))
    return -1`,
  "atlas-058": `def single_letter_transformation(start: str, goal: str, words: list[str]) -> int:
    unused = set(words)
    if goal not in unused:
        return 0
    pending = deque([(start, 1)])
    unused.discard(start)
    while pending:
        word, length = pending.popleft()
        if word == goal:
            return length
        for index in range(len(word)):
            for char in ascii_lowercase:
                candidate = word[:index] + char + word[index + 1:]
                if candidate in unused:
                    unused.remove(candidate)
                    pending.append((candidate, length + 1))
    return 0`,
  "atlas-059": `def course_reachability(course_count: int, prerequisites: list[tuple[int, int]]) -> bool:
    graph = [[] for _ in range(course_count)]
    indegree = [0] * course_count
    for course, prerequisite in prerequisites:
        graph[prerequisite].append(course)
        indegree[course] += 1
    ready = deque(index for index, degree in enumerate(indegree) if degree == 0)
    completed = 0
    while ready:
        prerequisite = ready.popleft()
        completed += 1
        for course in graph[prerequisite]:
            indegree[course] -= 1
            if indegree[course] == 0:
                ready.append(course)
    return completed == course_count`,
  "atlas-060": `def rot_spread_time(grid: list[list[int]]) -> int:
    if not grid:
        return 0
    rows, columns = len(grid), len(grid[0])
    rotten, fresh = deque(), 0
    for row in range(rows):
        for column in range(columns):
            if grid[row][column] == 2: rotten.append((row, column))
            elif grid[row][column] == 1: fresh += 1
    minutes = 0
    while fresh and rotten:
        minutes += 1
        for _ in range(len(rotten)):
            row, column = rotten.popleft()
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                r, c = row + dr, column + dc
                if 0 <= r < rows and 0 <= c < columns and grid[r][c] == 1:
                    grid[r][c] = 2
                    fresh -= 1
                    rotten.append((r, c))
    return -1 if fresh else minutes`,
  "atlas-061": `def clone_network(start):
    if not start:
        return None
    copies = {start: GraphNode(start.val)}
    pending = deque([start])
    while pending:
        node = pending.popleft()
        for neighbor in node.neighbors:
            if neighbor not in copies:
                copies[neighbor] = GraphNode(neighbor.val)
                pending.append(neighbor)
            copies[node].neighbors.append(copies[neighbor])
    return copies[start]`,
  "atlas-062": `def detect_directed_cycle(graph: list[list[int]]) -> bool:
    state = [0] * len(graph)
    def has_cycle(node: int) -> bool:
        state[node] = 1
        for neighbor in graph[node]:
            if state[neighbor] == 1 or (state[neighbor] == 0 and has_cycle(neighbor)):
                return True
        state[node] = 2
        return False
    return any(state[node] == 0 and has_cycle(node) for node in range(len(graph)))`,
  "atlas-063": `def count_connected_components(size: int, edges: list[tuple[int, int]]) -> int:
    graph = [[] for _ in range(size)]
    for first, second in edges:
        graph[first].append(second)
        graph[second].append(first)
    seen, components = set(), 0
    for start in range(size):
        if start in seen:
            continue
        components += 1
        pending, seen = [start], seen | {start}
        while pending:
            node = pending.pop()
            for neighbor in graph[node]:
                if neighbor not in seen:
                    seen.add(neighbor)
                    pending.append(neighbor)
    return components`,
  "atlas-064": `def dependency_ordering(course_count: int, prerequisites: list[tuple[int, int]]) -> list[int]:
    graph = [[] for _ in range(course_count)]
    indegree = [0] * course_count
    for course, prerequisite in prerequisites:
        graph[prerequisite].append(course)
        indegree[course] += 1
    ready = deque(index for index, degree in enumerate(indegree) if degree == 0)
    order: list[int] = []
    while ready:
        node = ready.popleft()
        order.append(node)
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                ready.append(neighbor)
    return order if len(order) == course_count else []`,
  "atlas-065": `def critical_network_bridges(size: int, edges: list[tuple[int, int]]) -> list[list[int]]:
    graph = [[] for _ in range(size)]
    for edge_id, (first, second) in enumerate(edges):
        graph[first].append((second, edge_id))
        graph[second].append((first, edge_id))
    discovered, low, bridges = [-1] * size, [0] * size, []
    time = 0
    def visit(node: int, parent_edge: int) -> None:
        nonlocal time
        discovered[node] = low[node] = time
        time += 1
        for neighbor, edge_id in graph[node]:
            if edge_id == parent_edge:
                continue
            if discovered[neighbor] < 0:
                visit(neighbor, edge_id)
                low[node] = min(low[node], low[neighbor])
                if low[neighbor] > discovered[node]: bridges.append([node, neighbor])
            else:
                low[node] = min(low[node], discovered[neighbor])
    for node in range(size):
        if discovered[node] < 0: visit(node, -1)
    return bridges`,
  "atlas-066": `def all_subsets(values: list[int]) -> list[list[int]]:
    answer: list[list[int]] = []
    current: list[int] = []
    def visit(index: int) -> None:
        if index == len(values):
            answer.append(current.copy())
            return
        visit(index + 1)
        current.append(values[index])
        visit(index + 1)
        current.pop()
    visit(0)
    return answer`,
  "atlas-067": `def all_permutations(values: list[int]) -> list[list[int]]:
    answer: list[list[int]] = []
    def visit(index: int) -> None:
        if index == len(values):
            answer.append(values.copy())
            return
        for candidate in range(index, len(values)):
            values[index], values[candidate] = values[candidate], values[index]
            visit(index + 1)
            values[index], values[candidate] = values[candidate], values[index]
    visit(0)
    return answer`,
  "atlas-068": `def target_combination_sums(candidates: list[int], target: int) -> list[list[int]]:
    candidates.sort()
    answer: list[list[int]] = []
    current: list[int] = []
    def visit(start: int, remaining: int) -> None:
        if remaining == 0:
            answer.append(current.copy())
            return
        for index in range(start, len(candidates)):
            value = candidates[index]
            if value > remaining: break
            current.append(value)
            visit(index, remaining - value)
            current.pop()
    visit(0, target)
    return answer`,
  "atlas-069": `def place_n_queens(size: int) -> list[list[str]]:
    answer: list[list[str]] = []
    board = [["."] * size for _ in range(size)]
    columns, down, up = set(), set(), set()
    def place(row: int) -> None:
        if row == size:
            answer.append(["".join(line) for line in board])
            return
        for column in range(size):
            if column in columns or row - column in down or row + column in up: continue
            columns.add(column); down.add(row - column); up.add(row + column); board[row][column] = "Q"
            place(row + 1)
            board[row][column] = "."; columns.remove(column); down.remove(row - column); up.remove(row + column)
    place(0)
    return answer`,
  "atlas-070": `def trace_word_in_grid(board: list[list[str]], word: str) -> bool:
    rows, columns = len(board), len(board[0]) if board else 0
    def search(row: int, column: int, index: int) -> bool:
        if index == len(word): return True
        if not (0 <= row < rows and 0 <= column < columns) or board[row][column] != word[index]: return False
        saved, board[row][column] = board[row][column], "#"
        found = any(search(row + dr, column + dc, index + 1) for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)))
        board[row][column] = saved
        return found
    return any(search(row, column, 0) for row in range(rows) for column in range(columns))`,
  "atlas-071": `def count_stair_routes(steps: int) -> int:
    two_back = one_back = 1
    for _ in range(2, steps + 1):
        two_back, one_back = one_back, one_back + two_back
    return one_back`,
  "atlas-072": `def maximum_non_adjacent_sum(values: list[int]) -> int:
    two_back = one_back = 0
    for value in values:
        two_back, one_back = one_back, max(one_back, two_back + value)
    return one_back`,
  "atlas-073": `def minimum_coins(coins: list[int], amount: int) -> int:
    best = [amount + 1] * (amount + 1)
    best[0] = 0
    for value in range(1, amount + 1):
        for coin in coins:
            if coin <= value:
                best[value] = min(best[value], best[value - coin] + 1)
    return -1 if best[amount] > amount else best[amount]`,
  "atlas-074": `def longest_increasing_subsequence(values: list[int]) -> int:
    tails: list[int] = []
    for value in values:
        position = bisect_left(tails, value)
        if position == len(tails): tails.append(value)
        else: tails[position] = value
    return len(tails)`,
  "atlas-075": `def edit_distance(source: str, target: str) -> int:
    previous = list(range(len(target) + 1))
    for row, source_char in enumerate(source, 1):
        current = [row]
        for column, target_char in enumerate(target, 1):
            if source_char == target_char:
                current.append(previous[column - 1])
            else:
                current.append(1 + min(previous[column], current[column - 1], previous[column - 1]))
        previous = current
    return previous[-1]`
};
