/** Interview-sized C++17 reference implementations for the original Atlas 75 contracts. */
export const cpp17Atlas75: Record<string, string> = {
  "atlas-001": `vector<int> complementPairLedger(const vector<int>& values, int target) {
  unordered_map<int, int> index;
  for (int i = 0; i < (int)values.size(); ++i) {
    auto match = index.find(target - values[i]);
    if (match != index.end()) return {match->second, i};
    index[values[i]] = i;
  }
  return {};
}`,
  "atlas-002": `int longestConsecutiveRun(const vector<int>& values) {
  unordered_set<int> present(values.begin(), values.end());
  int best = 0;
  for (int value : present) {
    if (present.count(value - 1)) continue;
    int length = 1;
    while (present.count(value + length)) ++length;
    best = max(best, length);
  }
  return best;
}`,
  "atlas-003": `vector<vector<string>> groupedWordSignatures(const vector<string>& words) {
  map<array<int, 26>, vector<string>> groups;
  for (const string& word : words) {
    array<int, 26> signature{};
    for (char c : word) ++signature[c - 'a'];
    groups[signature].push_back(word);
  }
  vector<vector<string>> answer;
  for (auto& [_, group] : groups) answer.push_back(move(group));
  return answer;
}`,
  "atlas-004": `int longestZeroSumSpan(const vector<int>& values) {
  unordered_map<long long, int> first{{0, -1}};
  long long prefix = 0;
  int best = 0;
  for (int i = 0; i < (int)values.size(); ++i) {
    prefix += values[i];
    if (first.count(prefix)) best = max(best, i - first[prefix]);
    else first[prefix] = i;
  }
  return best;
}`,
  "atlas-005": `string frequencyOrderedValues(const string& text) {
  unordered_map<char, int> count;
  for (char c : text) ++count[c];
  vector<pair<char, int>> entries(count.begin(), count.end());
  sort(entries.begin(), entries.end(), [](auto a, auto b) {
    return a.second != b.second ? a.second > b.second : a.first < b.first;
  });
  string answer;
  for (auto [c, n] : entries) answer.append(n, c);
  return answer;
}`,
  "atlas-006": `bool filteredPalindrome(const string& text) {
  int left = 0, right = (int)text.size() - 1;
  while (left < right) {
    while (left < right && !isalnum((unsigned char)text[left])) ++left;
    while (left < right && !isalnum((unsigned char)text[right])) --right;
    if (tolower((unsigned char)text[left]) != tolower((unsigned char)text[right])) return false;
    ++left; --right;
  }
  return true;
}`,
  "atlas-007": `vector<int> targetPairInSortedData(const vector<int>& values, int target) {
  int left = 0, right = (int)values.size() - 1;
  while (left < right) {
    long long sum = (long long)values[left] + values[right];
    if (sum == target) return {left + 1, right + 1};
    if (sum < target) ++left; else --right;
  }
  return {};
}`,
  "atlas-008": `long long maximumContainer(const vector<int>& heights) {
  int left = 0, right = (int)heights.size() - 1;
  long long best = 0;
  while (left < right) {
    best = max(best, 1LL * (right - left) * min(heights[left], heights[right]));
    if (heights[left] <= heights[right]) ++left; else --right;
  }
  return best;
}`,
  "atlas-009": `vector<array<int, 3>> zeroSumTriples(vector<int> values) {
  sort(values.begin(), values.end());
  vector<array<int, 3>> answer;
  for (int i = 0; i + 2 < (int)values.size() && values[i] <= 0; ++i) {
    if (i && values[i] == values[i - 1]) continue;
    int left = i + 1, right = (int)values.size() - 1;
    while (left < right) {
      long long sum = (long long)values[i] + values[left] + values[right];
      if (sum < 0) ++left;
      else if (sum > 0) --right;
      else {
        answer.push_back({values[i], values[left], values[right]});
        int a = values[left], b = values[right];
        while (left < right && values[left] == a) ++left;
        while (left < right && values[right] == b) --right;
      }
    }
  }
  return answer;
}`,
  "atlas-010": `int inPlaceSortedDeduplication(vector<int>& values) {
  if (values.empty()) return 0;
  int write = 1;
  for (int read = 1; read < (int)values.size(); ++read)
    if (values[read] != values[write - 1]) values[write++] = values[read];
  return write;
}`,
  "atlas-011": `string smallestCoveringWindow(const string& source, const string& required) {
  if (required.empty()) return "";
  array<int, 256> need{};
  int missing = required.size();
  for (unsigned char c : required) ++need[c];
  int left = 0, bestStart = 0, bestLength = INT_MAX;
  for (int right = 0; right < (int)source.size(); ++right) {
    unsigned char in = source[right];
    if (need[in]-- > 0) --missing;
    while (missing == 0) {
      if (right - left + 1 < bestLength) { bestStart = left; bestLength = right - left + 1; }
      unsigned char out = source[left++];
      if (++need[out] > 0) ++missing;
    }
  }
  return bestLength == INT_MAX ? "" : source.substr(bestStart, bestLength);
}`,
  "atlas-012": `int longestUniqueSegment(const string& text) {
  array<int, 256> last; last.fill(-1);
  int left = 0, best = 0;
  for (int right = 0; right < (int)text.size(); ++right) {
    unsigned char c = text[right];
    left = max(left, last[c] + 1);
    last[c] = right;
    best = max(best, right - left + 1);
  }
  return best;
}`,
  "atlas-013": `long long bestFixedLengthWindow(const vector<int>& values, int k) {
  if (k <= 0 || k > (int)values.size()) throw invalid_argument("k outside input");
  long long window = accumulate(values.begin(), values.begin() + k, 0LL), best = window;
  for (int right = k; right < (int)values.size(); ++right) {
    window += values[right] - values[right - k];
    best = max(best, window);
  }
  return best;
}`,
  "atlas-014": `int uniformSegmentAfterReplacements(const string& text, int k) {
  array<int, 26> count{};
  int left = 0, maxFrequency = 0, best = 0;
  for (int right = 0; right < (int)text.size(); ++right) {
    maxFrequency = max(maxFrequency, ++count[text[right] - 'A']);
    while (right - left + 1 - maxFrequency > k) --count[text[left++] - 'A'];
    best = max(best, right - left + 1);
  }
  return best;
}`,
  "atlas-015": `bool permutationWindow(const string& pattern, const string& text) {
  if (pattern.size() > text.size()) return false;
  array<int, 26> delta{};
  for (char c : pattern) ++delta[c - 'a'];
  for (int i = 0; i < (int)text.size(); ++i) {
    --delta[text[i] - 'a'];
    if (i >= (int)pattern.size()) ++delta[text[i - pattern.size()] - 'a'];
    if (i + 1 >= (int)pattern.size() && all_of(delta.begin(), delta.end(), [](int x) { return x == 0; })) return true;
  }
  return false;
}`,
  "atlas-016": `class ImmutableRangeTotals {
  vector<long long> prefix;
public:
  explicit ImmutableRangeTotals(const vector<int>& values) : prefix(values.size() + 1) {
    partial_sum(values.begin(), values.end(), prefix.begin() + 1);
  }
  long long query(int left, int right) const { return prefix[right + 1] - prefix[left]; }
};`,
  "atlas-017": `int equilibriumIndex(const vector<int>& values) {
  long long total = accumulate(values.begin(), values.end(), 0LL), left = 0;
  for (int i = 0; i < (int)values.size(); ++i) {
    if (left == total - left - values[i]) return i;
    left += values[i];
  }
  return -1;
}`,
  "atlas-018": `long long countTargetSumSubarrays(const vector<int>& values, int target) {
  unordered_map<long long, int> frequency{{0, 1}};
  long long prefix = 0, answer = 0;
  for (int value : values) {
    prefix += value;
    answer += frequency[prefix - target];
    ++frequency[prefix];
  }
  return answer;
}`,
  "atlas-019": `vector<long long> productExceptCurrent(const vector<int>& values) {
  vector<long long> answer(values.size(), 1);
  long long prefix = 1, suffix = 1;
  for (int i = 0; i < (int)values.size(); ++i) { answer[i] = prefix; prefix *= values[i]; }
  for (int i = (int)values.size() - 1; i >= 0; --i) { answer[i] *= suffix; suffix *= values[i]; }
  return answer;
}`,
  "atlas-020": `vector<long long> batchedRangeAdditions(int length, const vector<array<int, 3>>& operations) {
  vector<long long> difference(length + 1);
  for (auto [left, right, delta] : operations) {
    difference[left] += delta;
    if (right + 1 < length) difference[right + 1] -= delta;
  }
  difference.pop_back();
  partial_sum(difference.begin(), difference.end(), difference.begin());
  return difference;
}`,
  "atlas-021": `bool balancedDelimiters(const string& text) {
  unordered_map<char, char> opener{{')','('}, {']','['}, {'}','{'}};
  vector<char> stack;
  for (char c : text) {
    if (!opener.count(c)) stack.push_back(c);
    else {
      if (stack.empty() || stack.back() != opener[c]) return false;
      stack.pop_back();
    }
  }
  return stack.empty();
}`,
  "atlas-022": `class MinimumAwareStack {
  vector<pair<int, int>> data;
public:
  void push(int value) { data.push_back({value, data.empty() ? value : min(value, data.back().second)}); }
  void pop() { if (data.empty()) throw underflow_error("empty stack"); data.pop_back(); }
  int top() const { if (data.empty()) throw underflow_error("empty stack"); return data.back().first; }
  int minimum() const { if (data.empty()) throw underflow_error("empty stack"); return data.back().second; }
};`,
  "atlas-023": `vector<int> nextWarmerReading(const vector<int>& temperatures) {
  vector<int> answer(temperatures.size()), pending;
  for (int day = 0; day < (int)temperatures.size(); ++day) {
    while (!pending.empty() && temperatures[pending.back()] < temperatures[day]) {
      int earlier = pending.back(); pending.pop_back();
      answer[earlier] = day - earlier;
    }
    pending.push_back(day);
  }
  return answer;
}`,
  "atlas-024": `long long largestHistogramRectangle(const vector<int>& heights) {
  vector<pair<int, int>> increasing;
  long long best = 0;
  for (int i = 0; i <= (int)heights.size(); ++i) {
    int height = i == (int)heights.size() ? 0 : heights[i], start = i;
    while (!increasing.empty() && increasing.back().second > height) {
      auto [left, h] = increasing.back(); increasing.pop_back();
      best = max(best, 1LL * h * (i - left)); start = left;
    }
    if (increasing.empty() || increasing.back().second < height) increasing.push_back({start, height});
  }
  return best;
}`,
  "atlas-025": `string decodeNestedRepetitions(const string& encoded) {
  vector<pair<string, int>> frames;
  string current;
  int repeat = 0;
  for (char c : encoded) {
    if (isdigit((unsigned char)c)) repeat = repeat * 10 + (c - '0');
    else if (c == '[') { frames.push_back({move(current), repeat}); current.clear(); repeat = 0; }
    else if (c == ']') {
      auto [prefix, times] = move(frames.back()); frames.pop_back();
      string segment = current; current = move(prefix);
      while (times--) current += segment;
    } else current += c;
  }
  return current;
}`,
  "atlas-026": `int stableInsertPosition(const vector<int>& values, int target) {
  int left = 0, right = values.size();
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (values[mid] < target) left = mid + 1; else right = mid;
  }
  return left;
}`,
  "atlas-027": `int lookupInRotatedArray(const vector<int>& values, int target) {
  int left = 0, right = (int)values.size() - 1;
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
  "atlas-028": `vector<int> firstAndLastMatch(const vector<int>& values, int target) {
  auto first = lower_bound(values.begin(), values.end(), target);
  if (first == values.end() || *first != target) return {-1, -1};
  auto after = upper_bound(first, values.end(), target);
  return {(int)(first - values.begin()), (int)(after - values.begin() - 1)};
}`,
  "atlas-029": `int minimumFeasibleProcessingRate(const vector<int>& piles, int hours) {
  int left = 1, right = *max_element(piles.begin(), piles.end());
  while (left < right) {
    int rate = left + (right - left) / 2;
    long long required = 0;
    for (int pile : piles) required += (pile + rate - 1LL) / rate;
    if (required <= hours) right = rate; else left = rate + 1;
  }
  return left;
}`,
  "atlas-030": `bool searchRowMajorMatrix(const vector<vector<int>>& matrix, int target) {
  if (matrix.empty() || matrix[0].empty()) return false;
  int rows = matrix.size(), cols = matrix[0].size(), left = 0, right = rows * cols;
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (matrix[mid / cols][mid % cols] < target) left = mid + 1; else right = mid;
  }
  return left < rows * cols && matrix[left / cols][left % cols] == target;
}`,
  "atlas-031": `vector<array<int, 2>> mergeReservations(vector<array<int, 2>> intervals) {
  sort(intervals.begin(), intervals.end());
  vector<array<int, 2>> merged;
  for (auto interval : intervals) {
    if (merged.empty() || merged.back()[1] < interval[0]) merged.push_back(interval);
    else merged.back()[1] = max(merged.back()[1], interval[1]);
  }
  return merged;
}`,
  "atlas-032": `vector<array<int, 2>> insertReservation(const vector<array<int, 2>>& intervals, array<int, 2> incoming) {
  vector<array<int, 2>> answer;
  int i = 0, n = intervals.size();
  while (i < n && intervals[i][1] < incoming[0]) answer.push_back(intervals[i++]);
  while (i < n && intervals[i][0] <= incoming[1]) {
    incoming[0] = min(incoming[0], intervals[i][0]);
    incoming[1] = max(incoming[1], intervals[i++][1]);
  }
  answer.push_back(incoming);
  while (i < n) answer.push_back(intervals[i++]);
  return answer;
}`,
  "atlas-033": `int minimumMeetingRooms(const vector<array<int, 2>>& meetings) {
  vector<int> starts, ends;
  for (auto [start, end] : meetings) { starts.push_back(start); ends.push_back(end); }
  sort(starts.begin(), starts.end()); sort(ends.begin(), ends.end());
  int i = 0, j = 0, active = 0, best = 0;
  while (i < (int)starts.size()) {
    if (starts[i] < ends[j]) { best = max(best, ++active); ++i; }
    else { --active; ++j; }
  }
  return best;
}`,
  "atlas-034": `int removeMinimumOverlaps(vector<array<int, 2>> intervals) {
  sort(intervals.begin(), intervals.end(), [](auto a, auto b) { return a[1] < b[1]; });
  int kept = 0, lastEnd = INT_MIN;
  for (auto [start, end] : intervals) if (start >= lastEnd) { ++kept; lastEnd = end; }
  return intervals.size() - kept;
}`,
  "atlas-035": `vector<array<int, 2>> intersectSchedules(const vector<array<int, 2>>& a, const vector<array<int, 2>>& b) {
  vector<array<int, 2>> answer;
  int i = 0, j = 0;
  while (i < (int)a.size() && j < (int)b.size()) {
    int start = max(a[i][0], b[j][0]), end = min(a[i][1], b[j][1]);
    if (start <= end) answer.push_back({start, end});
    if (a[i][1] < b[j][1]) ++i; else ++j;
  }
  return answer;
}`,
  "atlas-036": `// ListNode { int val; ListNode* next; }
ListNode* reverseChain(ListNode* head) {
  ListNode* previous = nullptr;
  while (head) {
    ListNode* next = head->next;
    head->next = previous;
    previous = head;
    head = next;
  }
  return previous;
}`,
  "atlas-037": `bool detectCycle(ListNode* head) {
  ListNode *slow = head, *fast = head;
  while (fast && fast->next) {
    slow = slow->next; fast = fast->next->next;
    if (slow == fast) return true;
  }
  return false;
}`,
  "atlas-038": `ListNode* mergeOrderedChains(ListNode* a, ListNode* b) {
  ListNode dummy(0), *tail = &dummy;
  while (a && b) {
    ListNode*& chosen = a->val <= b->val ? a : b;
    tail = tail->next = chosen; chosen = chosen->next;
  }
  tail->next = a ? a : b;
  return dummy.next;
}`,
  "atlas-039": `ListNode* removeNthFromEnd(ListNode* head, int n) {
  ListNode dummy(0, head), *slow = &dummy, *fast = &dummy;
  while (n--) fast = fast->next;
  while (fast->next) { slow = slow->next; fast = fast->next; }
  ListNode* removed = slow->next;
  slow->next = removed->next;
  delete removed;
  return dummy.next;
}`,
  "atlas-040": `// RandomNode { int val; RandomNode *next, *random; }
RandomNode* copyRandomLinks(RandomNode* head) {
  if (!head) return nullptr;
  for (auto* node = head; node; node = node->next->next)
    node->next = new RandomNode(node->val, node->next, nullptr);
  for (auto* node = head; node; node = node->next->next)
    node->next->random = node->random ? node->random->next : nullptr;
  RandomNode* copyHead = head->next;
  for (auto* node = head; node;) {
    RandomNode* copy = node->next;
    node->next = copy->next;
    copy->next = node->next ? node->next->next : nullptr;
    node = node->next;
  }
  return copyHead;
}`,
  "atlas-041": `int maximumTreeDepth(TreeNode* root) {
  return root ? 1 + max(maximumTreeDepth(root->left), maximumTreeDepth(root->right)) : 0;
}`,
  "atlas-042": `int treeDiameter(TreeNode* root) {
  int answer = 0;
  function<int(TreeNode*)> height = [&](TreeNode* node) {
    if (!node) return 0;
    int left = height(node->left), right = height(node->right);
    answer = max(answer, left + right);
    return 1 + max(left, right);
  };
  height(root);
  return answer;
}`,
  "atlas-043": `bool heightBalancedTree(TreeNode* root) {
  function<int(TreeNode*)> height = [&](TreeNode* node) {
    if (!node) return 0;
    int left = height(node->left); if (left < 0) return -1;
    int right = height(node->right); if (right < 0) return -1;
    return abs(left - right) <= 1 ? 1 + max(left, right) : -1;
  };
  return height(root) >= 0;
}`,
  "atlas-044": `bool validateSearchTreeOrdering(TreeNode* root) {
  function<bool(TreeNode*, optional<long long>, optional<long long>)> valid =
    [&](TreeNode* node, optional<long long> low, optional<long long> high) {
      if (!node) return true;
      if ((low && node->val <= *low) || (high && node->val >= *high)) return false;
      return valid(node->left, low, node->val) && valid(node->right, node->val, high);
    };
  return valid(root, nullopt, nullopt);
}`,
  "atlas-045": `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
  if (!root || root == p || root == q) return root;
  TreeNode* left = lowestCommonAncestor(root->left, p, q);
  TreeNode* right = lowestCommonAncestor(root->right, p, q);
  if (left && right) return root;
  return left ? left : right;
}`,
  "atlas-046": `vector<vector<int>> levelOrderValues(TreeNode* root) {
  if (!root) return {};
  queue<TreeNode*> pending; pending.push(root);
  vector<vector<int>> answer;
  while (!pending.empty()) {
    int count = pending.size(); answer.push_back({});
    while (count--) {
      TreeNode* node = pending.front(); pending.pop();
      answer.back().push_back(node->val);
      if (node->left) pending.push(node->left);
      if (node->right) pending.push(node->right);
    }
  }
  return answer;
}`,
  "atlas-047": `vector<vector<int>> zigzagLevels(TreeNode* root) {
  if (!root) return {};
  queue<TreeNode*> pending; pending.push(root);
  vector<vector<int>> answer; bool forward = true;
  while (!pending.empty()) {
    int count = pending.size(); vector<int> level(count);
    for (int i = 0; i < count; ++i) {
      TreeNode* node = pending.front(); pending.pop();
      level[forward ? i : count - 1 - i] = node->val;
      if (node->left) pending.push(node->left);
      if (node->right) pending.push(node->right);
    }
    answer.push_back(move(level)); forward = !forward;
  }
  return answer;
}`,
  "atlas-048": `vector<int> rightSideProjection(TreeNode* root) {
  if (!root) return {};
  queue<TreeNode*> pending; pending.push(root);
  vector<int> answer;
  while (!pending.empty()) {
    int count = pending.size();
    for (int i = 0; i < count; ++i) {
      TreeNode* node = pending.front(); pending.pop();
      if (i == count - 1) answer.push_back(node->val);
      if (node->left) pending.push(node->left);
      if (node->right) pending.push(node->right);
    }
  }
  return answer;
}`,
  "atlas-049": `// PerfectNode { int val; PerfectNode *left, *right, *next; }
PerfectNode* connectLevelNeighbours(PerfectNode* root) {
  for (PerfectNode* level = root; level && level->left; level = level->left) {
    for (PerfectNode* node = level; node; node = node->next) {
      node->left->next = node->right;
      if (node->next) node->right->next = node->next->left;
    }
  }
  return root;
}`,
  "atlas-050": `int minimumLeafDepth(TreeNode* root) {
  if (!root) return 0;
  queue<TreeNode*> pending; pending.push(root);
  int depth = 1;
  while (!pending.empty()) {
    for (int count = pending.size(); count--; ) {
      TreeNode* node = pending.front(); pending.pop();
      if (!node->left && !node->right) return depth;
      if (node->left) pending.push(node->left);
      if (node->right) pending.push(node->right);
    }
    ++depth;
  }
  return depth;
}`,
  "atlas-051": `int kthLargestValue(const vector<int>& values, int k) {
  priority_queue<int, vector<int>, greater<int>> largest;
  for (int value : values) {
    largest.push(value);
    if ((int)largest.size() > k) largest.pop();
  }
  return largest.top();
}`,
  "atlas-052": `vector<int> mostFrequentKValues(const vector<int>& values, int k) {
  unordered_map<int, int> frequency;
  for (int value : values) ++frequency[value];
  vector<vector<int>> bucket(values.size() + 1);
  for (auto [value, count] : frequency) bucket[count].push_back(value);
  vector<int> answer;
  for (int count = values.size(); count && (int)answer.size() < k; --count)
    for (int value : bucket[count]) if ((int)answer.size() < k) answer.push_back(value);
  return answer;
}`,
  "atlas-053": `ListNode* mergeKOrderedStreams(const vector<ListNode*>& lists) {
  auto later = [](ListNode* a, ListNode* b) { return a->val > b->val; };
  priority_queue<ListNode*, vector<ListNode*>, decltype(later)> next(later);
  for (ListNode* head : lists) if (head) next.push(head);
  ListNode dummy(0), *tail = &dummy;
  while (!next.empty()) {
    ListNode* node = next.top(); next.pop();
    tail = tail->next = node;
    if (node->next) next.push(node->next);
  }
  return dummy.next;
}`,
  "atlas-054": `class RunningMedian {
  priority_queue<int> lower;
  priority_queue<int, vector<int>, greater<int>> upper;
public:
  void add(int value) {
    if (lower.empty() || value <= lower.top()) lower.push(value); else upper.push(value);
    if (lower.size() > upper.size() + 1) { upper.push(lower.top()); lower.pop(); }
    if (upper.size() > lower.size() + 1) { lower.push(upper.top()); upper.pop(); }
  }
  double median() const {
    if (lower.size() == upper.size()) return ((long long)lower.top() + upper.top()) / 2.0;
    return lower.size() > upper.size() ? lower.top() : upper.top();
  }
};`,
  "atlas-055": `int cooldownTaskScheduler(const vector<char>& tasks, int cooldown) {
  array<int, 26> frequency{};
  for (char task : tasks) ++frequency[task - 'A'];
  int maximum = *max_element(frequency.begin(), frequency.end());
  int tied = count(frequency.begin(), frequency.end(), maximum);
  return max((int)tasks.size(), (maximum - 1) * (cooldown + 1) + tied);
}`,
  "atlas-056": `int countGridIslands(vector<vector<char>> grid) {
  if (grid.empty()) return 0;
  int rows = grid.size(), cols = grid[0].size(), islands = 0;
  const int direction[5] = {1, 0, -1, 0, 1};
  function<void(int,int)> flood = [&](int row, int col) {
    grid[row][col] = '0';
    for (int d = 0; d < 4; ++d) {
      int r = row + direction[d], c = col + direction[d + 1];
      if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] == '1') flood(r, c);
    }
  };
  for (int r = 0; r < rows; ++r) for (int c = 0; c < cols; ++c)
    if (grid[r][c] == '1') { ++islands; flood(r, c); }
  return islands;
}`,
  "atlas-057": `int shortestGridEscape(vector<vector<int>> grid) {
  int n = grid.size();
  if (!n || grid[0][0] || grid[n - 1][n - 1]) return -1;
  queue<pair<int, int>> pending; pending.push({0, 0}); grid[0][0] = 1;
  for (int distance = 1; !pending.empty(); ++distance) {
    for (int count = pending.size(); count--; ) {
      auto [row, col] = pending.front(); pending.pop();
      if (row == n - 1 && col == n - 1) return distance;
      for (int dr = -1; dr <= 1; ++dr) for (int dc = -1; dc <= 1; ++dc) {
        int r = row + dr, c = col + dc;
        if (r >= 0 && r < n && c >= 0 && c < n && !grid[r][c]) {
          grid[r][c] = 1; pending.push({r, c});
        }
      }
    }
  }
  return -1;
}`,
  "atlas-058": `int singleLetterTransformation(string start, const string& goal, const vector<string>& words) {
  unordered_set<string> unused(words.begin(), words.end());
  if (!unused.count(goal)) return 0;
  queue<string> pending; pending.push(start); unused.erase(start);
  for (int length = 1; !pending.empty(); ++length) {
    for (int count = pending.size(); count--; ) {
      string word = pending.front(); pending.pop();
      if (word == goal) return length;
      for (char& c : word) {
        char original = c;
        for (c = 'a'; c <= 'z'; ++c) if (unused.erase(word)) pending.push(word);
        c = original;
      }
    }
  }
  return 0;
}`,
  "atlas-059": `bool courseReachability(int count, const vector<array<int, 2>>& prerequisites) {
  vector<vector<int>> graph(count); vector<int> indegree(count);
  for (auto [course, prerequisite] : prerequisites) { graph[prerequisite].push_back(course); ++indegree[course]; }
  queue<int> ready;
  for (int course = 0; course < count; ++course) if (!indegree[course]) ready.push(course);
  int completed = 0;
  while (!ready.empty()) {
    int prerequisite = ready.front(); ready.pop(); ++completed;
    for (int course : graph[prerequisite]) if (!--indegree[course]) ready.push(course);
  }
  return completed == count;
}`,
  "atlas-060": `int rotSpreadTime(vector<vector<int>> grid) {
  if (grid.empty()) return 0;
  int rows = grid.size(), cols = grid[0].size(), fresh = 0, minutes = 0;
  queue<pair<int, int>> rotten;
  for (int r = 0; r < rows; ++r) for (int c = 0; c < cols; ++c)
    if (grid[r][c] == 2) rotten.push({r, c}); else if (grid[r][c] == 1) ++fresh;
  const int direction[5] = {1, 0, -1, 0, 1};
  while (fresh && !rotten.empty()) {
    ++minutes;
    for (int count = rotten.size(); count--; ) {
      auto [row, col] = rotten.front(); rotten.pop();
      for (int d = 0; d < 4; ++d) {
        int r = row + direction[d], c = col + direction[d + 1];
        if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] == 1) {
          grid[r][c] = 2; --fresh; rotten.push({r, c});
        }
      }
    }
  }
  return fresh ? -1 : minutes;
}`,
  "atlas-061": `// GraphNode { int val; vector<GraphNode*> neighbors; }
GraphNode* cloneNetwork(GraphNode* start) {
  if (!start) return nullptr;
  unordered_map<GraphNode*, GraphNode*> copy{{start, new GraphNode(start->val)}};
  queue<GraphNode*> pending; pending.push(start);
  while (!pending.empty()) {
    GraphNode* node = pending.front(); pending.pop();
    for (GraphNode* neighbor : node->neighbors) {
      if (!copy.count(neighbor)) { copy[neighbor] = new GraphNode(neighbor->val); pending.push(neighbor); }
      copy[node]->neighbors.push_back(copy[neighbor]);
    }
  }
  return copy[start];
}`,
  "atlas-062": `bool detectDirectedCycle(const vector<vector<int>>& graph) {
  vector<int> state(graph.size());
  function<bool(int)> cycle = [&](int node) {
    state[node] = 1;
    for (int next : graph[node]) {
      if (state[next] == 1 || (state[next] == 0 && cycle(next))) return true;
    }
    state[node] = 2; return false;
  };
  for (int node = 0; node < (int)graph.size(); ++node)
    if (!state[node] && cycle(node)) return true;
  return false;
}`,
  "atlas-063": `int countConnectedComponents(int n, const vector<array<int, 2>>& edges) {
  vector<vector<int>> graph(n);
  for (auto [a, b] : edges) { graph[a].push_back(b); graph[b].push_back(a); }
  vector<char> seen(n); int components = 0;
  for (int start = 0; start < n; ++start) if (!seen[start]) {
    ++components; stack<int> pending; pending.push(start); seen[start] = true;
    while (!pending.empty()) {
      int node = pending.top(); pending.pop();
      for (int next : graph[node]) if (!seen[next]) { seen[next] = true; pending.push(next); }
    }
  }
  return components;
}`,
  "atlas-064": `vector<int> dependencyOrdering(int count, const vector<array<int, 2>>& prerequisites) {
  vector<vector<int>> graph(count); vector<int> indegree(count);
  for (auto [course, prerequisite] : prerequisites) { graph[prerequisite].push_back(course); ++indegree[course]; }
  queue<int> ready; vector<int> order;
  for (int course = 0; course < count; ++course) if (!indegree[course]) ready.push(course);
  while (!ready.empty()) {
    int node = ready.front(); ready.pop(); order.push_back(node);
    for (int next : graph[node]) if (!--indegree[next]) ready.push(next);
  }
  return (int)order.size() == count ? order : vector<int>{};
}`,
  "atlas-065": `vector<array<int, 2>> criticalNetworkBridges(int n, const vector<array<int, 2>>& edges) {
  vector<vector<pair<int, int>>> graph(n);
  for (int id = 0; id < (int)edges.size(); ++id) {
    auto [a, b] = edges[id]; graph[a].push_back({b, id}); graph[b].push_back({a, id});
  }
  vector<int> discovered(n, -1), low(n); vector<array<int, 2>> bridges; int time = 0;
  function<void(int,int)> dfs = [&](int node, int parentEdge) {
    discovered[node] = low[node] = time++;
    for (auto [next, edge] : graph[node]) if (edge != parentEdge) {
      if (discovered[next] < 0) {
        dfs(next, edge); low[node] = min(low[node], low[next]);
        if (low[next] > discovered[node]) bridges.push_back({node, next});
      } else low[node] = min(low[node], discovered[next]);
    }
  };
  for (int node = 0; node < n; ++node) if (discovered[node] < 0) dfs(node, -1);
  return bridges;
}`,
  "atlas-066": `vector<vector<int>> allSubsets(const vector<int>& values) {
  vector<vector<int>> answer; vector<int> current;
  function<void(int)> visit = [&](int index) {
    if (index == (int)values.size()) { answer.push_back(current); return; }
    visit(index + 1);
    current.push_back(values[index]); visit(index + 1); current.pop_back();
  };
  visit(0); return answer;
}`,
  "atlas-067": `vector<vector<int>> allPermutations(const vector<int>& values) {
  vector<vector<int>> answer; vector<int> current; vector<char> used(values.size());
  function<void()> visit = [&] {
    if (current.size() == values.size()) { answer.push_back(current); return; }
    for (int i = 0; i < (int)values.size(); ++i) if (!used[i]) {
      used[i] = true; current.push_back(values[i]); visit(); current.pop_back(); used[i] = false;
    }
  };
  visit(); return answer;
}`,
  "atlas-068": `vector<vector<int>> targetCombinationSums(vector<int> candidates, int target) {
  sort(candidates.begin(), candidates.end());
  vector<vector<int>> answer; vector<int> current;
  function<void(int,int)> visit = [&](int start, int remaining) {
    if (!remaining) { answer.push_back(current); return; }
    for (int i = start; i < (int)candidates.size() && candidates[i] <= remaining; ++i) {
      current.push_back(candidates[i]); visit(i, remaining - candidates[i]); current.pop_back();
    }
  };
  visit(0, target); return answer;
}`,
  "atlas-069": `vector<vector<string>> placeNQueens(int n) {
  vector<vector<string>> answer; vector<string> board(n, string(n, '.'));
  vector<char> column(n), down(2 * n - 1), up(2 * n - 1);
  function<void(int)> place = [&](int row) {
    if (row == n) { answer.push_back(board); return; }
    for (int col = 0; col < n; ++col) {
      int d = row - col + n - 1, u = row + col;
      if (column[col] || down[d] || up[u]) continue;
      column[col] = down[d] = up[u] = true; board[row][col] = 'Q'; place(row + 1);
      board[row][col] = '.'; column[col] = down[d] = up[u] = false;
    }
  };
  place(0); return answer;
}`,
  "atlas-070": `bool traceWordInGrid(vector<vector<char>> board, const string& word) {
  int rows = board.size(), cols = rows ? board[0].size() : 0;
  function<bool(int,int,int)> search = [&](int row, int col, int index) {
    if (index == (int)word.size()) return true;
    if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col] != word[index]) return false;
    char saved = board[row][col]; board[row][col] = '#';
    bool found = search(row + 1, col, index + 1) || search(row - 1, col, index + 1) ||
                 search(row, col + 1, index + 1) || search(row, col - 1, index + 1);
    board[row][col] = saved; return found;
  };
  for (int r = 0; r < rows; ++r) for (int c = 0; c < cols; ++c)
    if (search(r, c, 0)) return true;
  return false;
}`,
  "atlas-071": `long long countStairRoutes(int n) {
  long long twoBack = 1, oneBack = 1;
  for (int step = 2; step <= n; ++step) {
    long long current = oneBack + twoBack;
    twoBack = oneBack; oneBack = current;
  }
  return oneBack;
}`,
  "atlas-072": `long long maximumNonAdjacentSum(const vector<int>& values) {
  long long twoBack = 0, oneBack = 0;
  for (int value : values) {
    long long current = max(oneBack, twoBack + value);
    twoBack = oneBack; oneBack = current;
  }
  return oneBack;
}`,
  "atlas-073": `int minimumCoins(const vector<int>& coins, int amount) {
  vector<int> best(amount + 1, amount + 1); best[0] = 0;
  for (int value = 1; value <= amount; ++value)
    for (int coin : coins) if (coin <= value) best[value] = min(best[value], best[value - coin] + 1);
  return best[amount] > amount ? -1 : best[amount];
}`,
  "atlas-074": `int longestIncreasingSubsequence(const vector<int>& values) {
  vector<int> tails;
  for (int value : values) {
    auto position = lower_bound(tails.begin(), tails.end(), value);
    if (position == tails.end()) tails.push_back(value); else *position = value;
  }
  return tails.size();
}`,
  "atlas-075": `int editDistance(const string& source, const string& target) {
  vector<int> previous(target.size() + 1), current(target.size() + 1);
  iota(previous.begin(), previous.end(), 0);
  for (int i = 1; i <= (int)source.size(); ++i) {
    current[0] = i;
    for (int j = 1; j <= (int)target.size(); ++j) {
      if (source[i - 1] == target[j - 1]) current[j] = previous[j - 1];
      else current[j] = 1 + min({previous[j], current[j - 1], previous[j - 1]});
    }
    swap(previous, current);
  }
  return previous[target.size()];
}`
};
