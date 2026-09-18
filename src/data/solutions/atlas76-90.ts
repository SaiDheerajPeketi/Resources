/** Reviewed solution extensions that promote Atlas 76–90 to the full contract. */
export const cpp17Atlas76To90: Record<string, string> = {
  "atlas-076": `void rotateSquareMatrix(vector<vector<int>>& matrix) {
  int n = matrix.size();
  for (int row = 0; row < n; ++row)
    for (int col = row + 1; col < n; ++col)
      swap(matrix[row][col], matrix[col][row]);
  for (auto& row : matrix) reverse(row.begin(), row.end());
}`,
  "atlas-077": `vector<int> spiralMatrixWalk(const vector<vector<int>>& matrix) {
  if (matrix.empty() || matrix[0].empty()) return {};
  int top = 0, bottom = matrix.size() - 1, left = 0, right = matrix[0].size() - 1;
  vector<int> answer;
  while (top <= bottom && left <= right) {
    for (int col = left; col <= right; ++col) answer.push_back(matrix[top][col]);
    ++top;
    for (int row = top; row <= bottom; ++row) answer.push_back(matrix[row][right]);
    --right;
    if (top <= bottom) {
      for (int col = right; col >= left; --col) answer.push_back(matrix[bottom][col]);
      --bottom;
    }
    if (left <= right) {
      for (int row = bottom; row >= top; --row) answer.push_back(matrix[row][left]);
      ++left;
    }
  }
  return answer;
}`,
  "atlas-078": `void zeroRowsAndColumns(vector<vector<int>>& matrix) {
  if (matrix.empty() || matrix[0].empty()) return;
  int rows = matrix.size(), cols = matrix[0].size();
  bool firstRow = false, firstCol = false;
  for (int col = 0; col < cols; ++col) firstRow |= matrix[0][col] == 0;
  for (int row = 0; row < rows; ++row) firstCol |= matrix[row][0] == 0;
  for (int row = 1; row < rows; ++row) for (int col = 1; col < cols; ++col)
    if (matrix[row][col] == 0) matrix[row][0] = matrix[0][col] = 0;
  for (int row = 1; row < rows; ++row) for (int col = 1; col < cols; ++col)
    if (matrix[row][0] == 0 || matrix[0][col] == 0) matrix[row][col] = 0;
  if (firstRow) fill(matrix[0].begin(), matrix[0].end(), 0);
  if (firstCol) for (auto& row : matrix) row[0] = 0;
}`,
  "atlas-079": `vector<int> diagonalTraverse(const vector<vector<int>>& matrix) {
  if (matrix.empty() || matrix[0].empty()) return {};
  int rows = matrix.size(), cols = matrix[0].size();
  vector<int> answer; answer.reserve(rows * cols);
  for (int diagonal = 0; diagonal < rows + cols - 1; ++diagonal) {
    if (diagonal % 2 == 0) {
      int row = min(diagonal, rows - 1), col = diagonal - row;
      while (row >= 0 && col < cols) answer.push_back(matrix[row--][col++]);
    } else {
      int col = min(diagonal, cols - 1), row = diagonal - col;
      while (col >= 0 && row < rows) answer.push_back(matrix[row++][col--]);
    }
  }
  return answer;
}`,
  "atlas-080": `bool searchSortedMatrix(const vector<vector<int>>& matrix, int target) {
  if (matrix.empty() || matrix[0].empty()) return false;
  int row = 0, col = matrix[0].size() - 1;
  while (row < (int)matrix.size() && col >= 0) {
    if (matrix[row][col] == target) return true;
    if (matrix[row][col] > target) --col; else ++row;
  }
  return false;
}`,
  "atlas-081": `int uniqueValueByXor(const vector<int>& values) {
  int answer = 0;
  for (int value : values) answer ^= value;
  return answer;
}`,
  "atlas-082": `vector<int> countSetBitsThrough(int n) {
  vector<int> count(n + 1);
  for (int value = 1; value <= n; ++value) count[value] = count[value >> 1] + (value & 1);
  return count;
}`,
  "atlas-083": `vector<vector<int>> subsetsFromMasks(const vector<int>& values) {
  if (values.size() >= 63) throw invalid_argument("mask width exceeded");
  vector<vector<int>> answer;
  for (unsigned long long mask = 0; mask < (1ULL << values.size()); ++mask) {
    vector<int> subset;
    for (int bit = 0; bit < (int)values.size(); ++bit)
      if (mask & (1ULL << bit)) subset.push_back(values[bit]);
    answer.push_back(move(subset));
  }
  return answer;
}`,
  "atlas-084": `int rangeBitwiseAnd(int left, int right) {
  int shifts = 0;
  while (left != right) { left >>= 1; right >>= 1; ++shifts; }
  return left << shifts;
}`,
  "atlas-085": `class MaximumXorTrie {
  struct Node { unique_ptr<Node> child[2]; };
  Node root;
public:
  void insert(unsigned value) {
    Node* node = &root;
    for (int bit = 31; bit >= 0; --bit) {
      int current = (value >> bit) & 1U;
      if (!node->child[current]) node->child[current] = make_unique<Node>();
      node = node->child[current].get();
    }
  }
  unsigned best(unsigned value) const {
    const Node* node = &root; unsigned answer = 0;
    for (int bit = 31; bit >= 0; --bit) {
      int current = (value >> bit) & 1U, wanted = current ^ 1;
      if (node->child[wanted]) { answer |= 1U << bit; node = node->child[wanted].get(); }
      else node = node->child[current].get();
    }
    return answer;
  }
};
unsigned maximumXorPair(const vector<unsigned>& values) {
  if (values.size() < 2) return 0;
  MaximumXorTrie trie; for (unsigned value : values) trie.insert(value);
  unsigned answer = 0; for (unsigned value : values) answer = max(answer, trie.best(value));
  return answer;
}`,
  "atlas-086": `class PrefixDictionary {
  struct Node { array<unique_ptr<Node>, 26> child{}; bool terminal = false; };
  Node root;
  const Node* walk(const string& text) const {
    const Node* node = &root;
    for (char c : text) {
      int index = c - 'a';
      if (!node->child[index]) return nullptr;
      node = node->child[index].get();
    }
    return node;
  }
public:
  void insert(const string& word) {
    Node* node = &root;
    for (char c : word) {
      int index = c - 'a';
      if (!node->child[index]) node->child[index] = make_unique<Node>();
      node = node->child[index].get();
    }
    node->terminal = true;
  }
  bool search(const string& word) const { const Node* node = walk(word); return node && node->terminal; }
  bool startsWith(const string& prefix) const { return walk(prefix) != nullptr; }
};`,
  "atlas-087": `class WildcardDictionary {
  struct Node { array<unique_ptr<Node>, 26> child{}; bool terminal = false; };
  Node root;
  bool match(const Node* node, const string& pattern, int index) const {
    if (index == (int)pattern.size()) return node->terminal;
    char c = pattern[index];
    if (c != '.') {
      const auto& next = node->child[c - 'a'];
      return next && match(next.get(), pattern, index + 1);
    }
    for (const auto& next : node->child)
      if (next && match(next.get(), pattern, index + 1)) return true;
    return false;
  }
public:
  void addWord(const string& word) {
    Node* node = &root;
    for (char c : word) {
      auto& next = node->child[c - 'a'];
      if (!next) next = make_unique<Node>();
      node = next.get();
    }
    node->terminal = true;
  }
  bool search(const string& pattern) const { return match(&root, pattern, 0); }
};`,
  "atlas-088": `string longestSharedPrefix(const vector<string>& words) {
  if (words.empty()) return "";
  int length = 0;
  while (length < (int)words[0].size()) {
    char expected = words[0][length];
    for (int i = 1; i < (int)words.size(); ++i)
      if (length >= (int)words[i].size() || words[i][length] != expected)
        return words[0].substr(0, length);
    ++length;
  }
  return words[0];
}`,
  "atlas-089": `string replaceWordsWithRoots(const vector<string>& roots, const string& sentence) {
  struct Node { array<int, 26> child; bool terminal = false; Node() { child.fill(-1); } };
  vector<Node> trie(1);
  for (const string& root : roots) {
    int node = 0;
    for (char c : root) {
      int index = c - 'a';
      if (trie[node].child[index] < 0) { trie[node].child[index] = trie.size(); trie.emplace_back(); }
      node = trie[node].child[index];
    }
    trie[node].terminal = true;
  }
  istringstream input(sentence); string word, answer;
  while (input >> word) {
    int node = 0, length = 0; bool found = false;
    for (char c : word) {
      int next = trie[node].child[c - 'a'];
      if (next < 0) break;
      node = next; ++length;
      if (trie[node].terminal) { found = true; break; }
    }
    if (!answer.empty()) answer += ' ';
    answer += found ? word.substr(0, length) : word;
  }
  return answer;
}`,
  "atlas-090": `class StreamingXorTrie {
  struct Node { unique_ptr<Node> child[2]; };
  Node root;
public:
  void insert(unsigned value) {
    Node* node = &root;
    for (int bit = 31; bit >= 0; --bit) {
      int current = (value >> bit) & 1U;
      if (!node->child[current]) node->child[current] = make_unique<Node>();
      node = node->child[current].get();
    }
  }
  unsigned query(unsigned value) const {
    const Node* node = &root; unsigned score = 0;
    for (int bit = 31; bit >= 0; --bit) {
      int current = (value >> bit) & 1U, wanted = current ^ 1;
      if (node->child[wanted]) { score |= 1U << bit; node = node->child[wanted].get(); }
      else node = node->child[current].get();
    }
    return score;
  }
};
unsigned streamingMaximumXor(const vector<unsigned>& values) {
  if (values.size() < 2) return 0;
  StreamingXorTrie trie; trie.insert(values[0]); unsigned answer = 0;
  for (int i = 1; i < (int)values.size(); ++i) {
    answer = max(answer, trie.query(values[i])); trie.insert(values[i]);
  }
  return answer;
}`
};

export const javaAtlas76To90: Record<string, string> = {
  "atlas-076": `void rotateSquareMatrix(int[][] matrix) {
  int n = matrix.length;
  for (int row = 0; row < n; row++) for (int col = row + 1; col < n; col++) {
    int saved = matrix[row][col]; matrix[row][col] = matrix[col][row]; matrix[col][row] = saved;
  }
  for (int[] row : matrix) for (int left = 0, right = n - 1; left < right; left++, right--) {
    int saved = row[left]; row[left] = row[right]; row[right] = saved;
  }
}`,
  "atlas-077": `List<Integer> spiralMatrixWalk(int[][] matrix) {
  List<Integer> answer = new ArrayList<>();
  if (matrix.length == 0 || matrix[0].length == 0) return answer;
  int top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (int col = left; col <= right; col++) answer.add(matrix[top][col]);
    top++;
    for (int row = top; row <= bottom; row++) answer.add(matrix[row][right]);
    right--;
    if (top <= bottom) { for (int col = right; col >= left; col--) answer.add(matrix[bottom][col]); bottom--; }
    if (left <= right) { for (int row = bottom; row >= top; row--) answer.add(matrix[row][left]); left++; }
  }
  return answer;
}`,
  "atlas-078": `void zeroRowsAndColumns(int[][] matrix) {
  if (matrix.length == 0 || matrix[0].length == 0) return;
  boolean firstRow = false, firstCol = false;
  for (int value : matrix[0]) firstRow |= value == 0;
  for (int[] row : matrix) firstCol |= row[0] == 0;
  for (int row = 1; row < matrix.length; row++) for (int col = 1; col < matrix[0].length; col++)
    if (matrix[row][col] == 0) { matrix[row][0] = 0; matrix[0][col] = 0; }
  for (int row = 1; row < matrix.length; row++) for (int col = 1; col < matrix[0].length; col++)
    if (matrix[row][0] == 0 || matrix[0][col] == 0) matrix[row][col] = 0;
  if (firstRow) Arrays.fill(matrix[0], 0);
  if (firstCol) for (int[] row : matrix) row[0] = 0;
}`,
  "atlas-079": `int[] diagonalTraverse(int[][] matrix) {
  if (matrix.length == 0 || matrix[0].length == 0) return new int[0];
  int rows = matrix.length, cols = matrix[0].length, used = 0;
  int[] answer = new int[rows * cols];
  for (int diagonal = 0; diagonal < rows + cols - 1; diagonal++) {
    if (diagonal % 2 == 0) {
      int row = Math.min(diagonal, rows - 1), col = diagonal - row;
      while (row >= 0 && col < cols) answer[used++] = matrix[row--][col++];
    } else {
      int col = Math.min(diagonal, cols - 1), row = diagonal - col;
      while (col >= 0 && row < rows) answer[used++] = matrix[row++][col--];
    }
  }
  return answer;
}`,
  "atlas-080": `boolean searchSortedMatrix(int[][] matrix, int target) {
  if (matrix.length == 0 || matrix[0].length == 0) return false;
  int row = 0, col = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] == target) return true;
    if (matrix[row][col] > target) col--; else row++;
  }
  return false;
}`,
  "atlas-081": `int uniqueValueByXor(int[] values) {
  int answer = 0;
  for (int value : values) answer ^= value;
  return answer;
}`,
  "atlas-082": `int[] countSetBitsThrough(int n) {
  int[] count = new int[n + 1];
  for (int value = 1; value <= n; value++) count[value] = count[value >> 1] + (value & 1);
  return count;
}`,
  "atlas-083": `List<List<Integer>> subsetsFromMasks(int[] values) {
  if (values.length >= 31) throw new IllegalArgumentException("mask width exceeded");
  List<List<Integer>> answer = new ArrayList<>();
  for (int mask = 0; mask < (1 << values.length); mask++) {
    List<Integer> subset = new ArrayList<>();
    for (int bit = 0; bit < values.length; bit++) if ((mask & (1 << bit)) != 0) subset.add(values[bit]);
    answer.add(subset);
  }
  return answer;
}`,
  "atlas-084": `int rangeBitwiseAnd(int left, int right) {
  int shifts = 0;
  while (left != right) { left >>= 1; right >>= 1; shifts++; }
  return left << shifts;
}`,
  "atlas-085": `static class MaximumXorTrie {
  static class Node { Node[] child = new Node[2]; }
  private final Node root = new Node();
  void insert(int value) {
    Node node = root;
    for (int bit = 30; bit >= 0; bit--) {
      int current = value >>> bit & 1;
      if (node.child[current] == null) node.child[current] = new Node();
      node = node.child[current];
    }
  }
  int best(int value) {
    Node node = root; int answer = 0;
    for (int bit = 30; bit >= 0; bit--) {
      int current = value >>> bit & 1, wanted = current ^ 1;
      if (node.child[wanted] != null) { answer |= 1 << bit; node = node.child[wanted]; }
      else node = node.child[current];
    }
    return answer;
  }
}
int maximumXorPair(int[] values) {
  if (values.length < 2) return 0;
  MaximumXorTrie trie = new MaximumXorTrie();
  for (int value : values) trie.insert(value);
  int answer = 0;
  for (int value : values) answer = Math.max(answer, trie.best(value));
  return answer;
}`,
  "atlas-086": `static class PrefixDictionary {
  static class Node { Node[] child = new Node[26]; boolean terminal; }
  private final Node root = new Node();
  void insert(String word) {
    Node node = root;
    for (char c : word.toCharArray()) {
      int index = c - 'a';
      if (node.child[index] == null) node.child[index] = new Node();
      node = node.child[index];
    }
    node.terminal = true;
  }
  private Node walk(String text) {
    Node node = root;
    for (char c : text.toCharArray()) {
      node = node.child[c - 'a'];
      if (node == null) return null;
    }
    return node;
  }
  boolean search(String word) { Node node = walk(word); return node != null && node.terminal; }
  boolean startsWith(String prefix) { return walk(prefix) != null; }
}`,
  "atlas-087": `static class WildcardDictionary {
  static class Node { Node[] child = new Node[26]; boolean terminal; }
  private final Node root = new Node();
  void addWord(String word) {
    Node node = root;
    for (char c : word.toCharArray()) {
      int index = c - 'a';
      if (node.child[index] == null) node.child[index] = new Node();
      node = node.child[index];
    }
    node.terminal = true;
  }
  boolean search(String pattern) { return match(root, pattern, 0); }
  private boolean match(Node node, String pattern, int index) {
    if (index == pattern.length()) return node.terminal;
    char c = pattern.charAt(index);
    if (c != '.') return node.child[c - 'a'] != null && match(node.child[c - 'a'], pattern, index + 1);
    for (Node next : node.child) if (next != null && match(next, pattern, index + 1)) return true;
    return false;
  }
}`,
  "atlas-088": `String longestSharedPrefix(String[] words) {
  if (words.length == 0) return "";
  int length = 0;
  while (length < words[0].length()) {
    char expected = words[0].charAt(length);
    for (int i = 1; i < words.length; i++)
      if (length >= words[i].length() || words[i].charAt(length) != expected)
        return words[0].substring(0, length);
    length++;
  }
  return words[0];
}`,
  "atlas-089": `String replaceWordsWithRoots(List<String> roots, String sentence) {
  class Node { Node[] child = new Node[26]; boolean terminal; }
  Node root = new Node();
  for (String dictionaryRoot : roots) {
    Node node = root;
    for (char c : dictionaryRoot.toCharArray()) {
      int index = c - 'a';
      if (node.child[index] == null) node.child[index] = new Node();
      node = node.child[index];
    }
    node.terminal = true;
  }
  String[] words = sentence.split(" ");
  for (int i = 0; i < words.length; i++) {
    Node node = root; int length = 0;
    for (char c : words[i].toCharArray()) {
      node = node.child[c - 'a'];
      if (node == null) break;
      length++;
      if (node.terminal) { words[i] = words[i].substring(0, length); break; }
    }
  }
  return String.join(" ", words);
}`,
  "atlas-090": `static class StreamingXorTrie {
  static class Node { Node[] child = new Node[2]; }
  private final Node root = new Node();
  void insert(int value) {
    Node node = root;
    for (int bit = 30; bit >= 0; bit--) {
      int current = value >>> bit & 1;
      if (node.child[current] == null) node.child[current] = new Node();
      node = node.child[current];
    }
  }
  int query(int value) {
    Node node = root; int score = 0;
    for (int bit = 30; bit >= 0; bit--) {
      int current = value >>> bit & 1, wanted = current ^ 1;
      if (node.child[wanted] != null) { score |= 1 << bit; node = node.child[wanted]; }
      else node = node.child[current];
    }
    return score;
  }
}
int streamingMaximumXor(int[] values) {
  if (values.length < 2) return 0;
  StreamingXorTrie trie = new StreamingXorTrie(); trie.insert(values[0]);
  int answer = 0;
  for (int i = 1; i < values.length; i++) { answer = Math.max(answer, trie.query(values[i])); trie.insert(values[i]); }
  return answer;
}`
};

export const pythonAtlas76To90: Record<string, string> = {
  "atlas-076": `def rotate_square_matrix(matrix: list[list[int]]) -> None:
    n = len(matrix)
    for row in range(n):
        for col in range(row + 1, n):
            matrix[row][col], matrix[col][row] = matrix[col][row], matrix[row][col]
    for row in matrix:
        row.reverse()`,
  "atlas-077": `def spiral_matrix_walk(matrix: list[list[int]]) -> list[int]:
    if not matrix or not matrix[0]:
        return []
    top, bottom, left, right = 0, len(matrix) - 1, 0, len(matrix[0]) - 1
    answer = []
    while top <= bottom and left <= right:
        answer.extend(matrix[top][left:right + 1])
        top += 1
        for row in range(top, bottom + 1): answer.append(matrix[row][right])
        right -= 1
        if top <= bottom:
            answer.extend(reversed(matrix[bottom][left:right + 1]))
            bottom -= 1
        if left <= right:
            for row in range(bottom, top - 1, -1): answer.append(matrix[row][left])
            left += 1
    return answer`,
  "atlas-078": `def zero_rows_and_columns(matrix: list[list[int]]) -> None:
    if not matrix or not matrix[0]:
        return
    first_row = any(value == 0 for value in matrix[0])
    first_col = any(row[0] == 0 for row in matrix)
    for row in range(1, len(matrix)):
        for col in range(1, len(matrix[0])):
            if matrix[row][col] == 0:
                matrix[row][0] = matrix[0][col] = 0
    for row in range(1, len(matrix)):
        for col in range(1, len(matrix[0])):
            if matrix[row][0] == 0 or matrix[0][col] == 0: matrix[row][col] = 0
    if first_row: matrix[0] = [0] * len(matrix[0])
    if first_col:
        for row in matrix: row[0] = 0`,
  "atlas-079": `def diagonal_traverse(matrix: list[list[int]]) -> list[int]:
    if not matrix or not matrix[0]:
        return []
    rows, cols, answer = len(matrix), len(matrix[0]), []
    for diagonal in range(rows + cols - 1):
        if diagonal % 2 == 0:
            row = min(diagonal, rows - 1); col = diagonal - row
            while row >= 0 and col < cols:
                answer.append(matrix[row][col]); row -= 1; col += 1
        else:
            col = min(diagonal, cols - 1); row = diagonal - col
            while col >= 0 and row < rows:
                answer.append(matrix[row][col]); row += 1; col -= 1
    return answer`,
  "atlas-080": `def search_sorted_matrix(matrix: list[list[int]], target: int) -> bool:
    if not matrix or not matrix[0]:
        return False
    row, col = 0, len(matrix[0]) - 1
    while row < len(matrix) and col >= 0:
        if matrix[row][col] == target: return True
        if matrix[row][col] > target: col -= 1
        else: row += 1
    return False`,
  "atlas-081": `def unique_value_by_xor(values: list[int]) -> int:
    answer = 0
    for value in values: answer ^= value
    return answer`,
  "atlas-082": `def count_set_bits_through(n: int) -> list[int]:
    counts = [0] * (n + 1)
    for value in range(1, n + 1): counts[value] = counts[value >> 1] + (value & 1)
    return counts`,
  "atlas-083": `def subsets_from_masks(values: list[int]) -> list[list[int]]:
    return [[value for bit, value in enumerate(values) if mask & (1 << bit)]
            for mask in range(1 << len(values))]`,
  "atlas-084": `def range_bitwise_and(left: int, right: int) -> int:
    shifts = 0
    while left != right:
        left >>= 1; right >>= 1; shifts += 1
    return left << shifts`,
  "atlas-085": `class MaximumXorTrie:
    def __init__(self): self.root = {}
    def insert(self, value: int) -> None:
        node = self.root
        for bit in range(30, -1, -1): node = node.setdefault((value >> bit) & 1, {})
    def best(self, value: int) -> int:
        node, answer = self.root, 0
        for bit in range(30, -1, -1):
            current = (value >> bit) & 1
            if current ^ 1 in node: answer |= 1 << bit; node = node[current ^ 1]
            else: node = node[current]
        return answer

def maximum_xor_pair(values: list[int]) -> int:
    if len(values) < 2: return 0
    trie = MaximumXorTrie()
    for value in values: trie.insert(value)
    return max(trie.best(value) for value in values)`,
  "atlas-086": `class PrefixDictionary:
    def __init__(self): self.root = {}
    def insert(self, word: str) -> None:
        node = self.root
        for char in word: node = node.setdefault(char, {})
        node["#"] = True
    def _walk(self, text: str):
        node = self.root
        for char in text:
            if char not in node: return None
            node = node[char]
        return node
    def search(self, word: str) -> bool:
        node = self._walk(word)
        return node is not None and "#" in node
    def starts_with(self, prefix: str) -> bool: return self._walk(prefix) is not None`,
  "atlas-087": `class WildcardDictionary:
    def __init__(self): self.root = {}
    def add_word(self, word: str) -> None:
        node = self.root
        for char in word: node = node.setdefault(char, {})
        node["#"] = True
    def search(self, pattern: str) -> bool:
        def match(node, index):
            if index == len(pattern): return "#" in node
            char = pattern[index]
            if char != ".": return char in node and match(node[char], index + 1)
            return any(key != "#" and match(child, index + 1) for key, child in node.items())
        return match(self.root, 0)`,
  "atlas-088": `def longest_shared_prefix(words: list[str]) -> str:
    if not words: return ""
    for index, expected in enumerate(words[0]):
        if any(index >= len(word) or word[index] != expected for word in words[1:]):
            return words[0][:index]
    return words[0]`,
  "atlas-089": `def replace_words_with_roots(roots: list[str], sentence: str) -> str:
    trie = {}
    for root in roots:
        node = trie
        for char in root: node = node.setdefault(char, {})
        node["#"] = True
    def replace(word):
        node = trie
        for index, char in enumerate(word):
            if char not in node: return word
            node = node[char]
            if "#" in node: return word[:index + 1]
        return word
    return " ".join(replace(word) for word in sentence.split())`,
  "atlas-090": `class StreamingXorTrie:
    def __init__(self): self.root = {}
    def insert(self, value: int) -> None:
        node = self.root
        for bit in range(30, -1, -1): node = node.setdefault((value >> bit) & 1, {})
    def query(self, value: int) -> int:
        node, score = self.root, 0
        for bit in range(30, -1, -1):
            current = (value >> bit) & 1
            if current ^ 1 in node: score |= 1 << bit; node = node[current ^ 1]
            else: node = node[current]
        return score

def streaming_maximum_xor(values: list[int]) -> int:
    if len(values) < 2: return 0
    trie, answer = StreamingXorTrie(), 0
    trie.insert(values[0])
    for value in values[1:]: answer = max(answer, trie.query(value)); trie.insert(value)
    return answer`
};

export const typescriptAtlas76To90: Record<string, string> = {
  "atlas-076": `function rotateSquareMatrix(matrix: number[][]): void {
  const n = matrix.length;
  for (let row = 0; row < n; row++) for (let col = row + 1; col < n; col++)
    [matrix[row][col], matrix[col][row]] = [matrix[col][row], matrix[row][col]];
  for (const row of matrix) row.reverse();
}`,
  "atlas-077": `function spiralMatrixWalk(matrix: number[][]): number[] {
  if (matrix.length === 0 || matrix[0].length === 0) return [];
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  const answer: number[] = [];
  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; col++) answer.push(matrix[top][col]);
    top++;
    for (let row = top; row <= bottom; row++) answer.push(matrix[row][right]);
    right--;
    if (top <= bottom) { for (let col = right; col >= left; col--) answer.push(matrix[bottom][col]); bottom--; }
    if (left <= right) { for (let row = bottom; row >= top; row--) answer.push(matrix[row][left]); left++; }
  }
  return answer;
}`,
  "atlas-078": `function zeroRowsAndColumns(matrix: number[][]): void {
  if (matrix.length === 0 || matrix[0].length === 0) return;
  const firstRow = matrix[0].some(value => value === 0), firstCol = matrix.some(row => row[0] === 0);
  for (let row = 1; row < matrix.length; row++) for (let col = 1; col < matrix[0].length; col++)
    if (matrix[row][col] === 0) matrix[row][0] = matrix[0][col] = 0;
  for (let row = 1; row < matrix.length; row++) for (let col = 1; col < matrix[0].length; col++)
    if (matrix[row][0] === 0 || matrix[0][col] === 0) matrix[row][col] = 0;
  if (firstRow) matrix[0].fill(0);
  if (firstCol) for (const row of matrix) row[0] = 0;
}`,
  "atlas-079": `function diagonalTraverse(matrix: number[][]): number[] {
  if (matrix.length === 0 || matrix[0].length === 0) return [];
  const rows = matrix.length, cols = matrix[0].length, answer: number[] = [];
  for (let diagonal = 0; diagonal < rows + cols - 1; diagonal++) {
    if (diagonal % 2 === 0) {
      let row = Math.min(diagonal, rows - 1), col = diagonal - row;
      while (row >= 0 && col < cols) answer.push(matrix[row--][col++]);
    } else {
      let col = Math.min(diagonal, cols - 1), row = diagonal - col;
      while (col >= 0 && row < rows) answer.push(matrix[row++][col--]);
    }
  }
  return answer;
}`,
  "atlas-080": `function searchSortedMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  let row = 0, col = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) return true;
    if (matrix[row][col] > target) col--; else row++;
  }
  return false;
}`,
  "atlas-081": `function uniqueValueByXor(values: number[]): number {
  return values.reduce((answer, value) => answer ^ value, 0);
}`,
  "atlas-082": `function countSetBitsThrough(n: number): number[] {
  const count = Array<number>(n + 1).fill(0);
  for (let value = 1; value <= n; value++) count[value] = count[value >> 1] + (value & 1);
  return count;
}`,
  "atlas-083": `function subsetsFromMasks(values: number[]): number[][] {
  if (values.length >= 31) throw new RangeError("mask width exceeded");
  const answer: number[][] = [];
  for (let mask = 0; mask < 1 << values.length; mask++) {
    const subset: number[] = [];
    for (let bit = 0; bit < values.length; bit++) if (mask & (1 << bit)) subset.push(values[bit]);
    answer.push(subset);
  }
  return answer;
}`,
  "atlas-084": `function rangeBitwiseAnd(left: number, right: number): number {
  let shifts = 0;
  while (left !== right) { left >>= 1; right >>= 1; shifts++; }
  return left << shifts;
}`,
  "atlas-085": `class MaximumXorTrie {
  private root: Array<XorNode | undefined> = [];
  insert(value: number): void {
    let node = this.root;
    for (let bit = 30; bit >= 0; bit--) {
      const current = value >>> bit & 1;
      node[current] ??= [];
      node = node[current]!;
    }
  }
  best(value: number): number {
    let node = this.root, answer = 0;
    for (let bit = 30; bit >= 0; bit--) {
      const current = value >>> bit & 1, wanted = current ^ 1;
      if (node[wanted] !== undefined) { answer |= 1 << bit; node = node[wanted]!; }
      else node = node[current]!;
    }
    return answer;
  }
}
type XorNode = Array<XorNode | undefined>;
function maximumXorPair(values: number[]): number {
  if (values.length < 2) return 0;
  const trie = new MaximumXorTrie();
  for (const value of values) trie.insert(value);
  return Math.max(...values.map(value => trie.best(value)));
}`,
  "atlas-086": `type PrefixNode = { terminal?: boolean; [char: string]: PrefixNode | boolean | undefined };
class PrefixDictionary {
  private root: PrefixNode = {};
  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      const next = node[char];
      node = typeof next === "object" ? next : (node[char] = {} as PrefixNode);
    }
    node.terminal = true;
  }
  private walk(text: string): PrefixNode | undefined {
    let node = this.root;
    for (const char of text) {
      const next = node[char];
      if (typeof next !== "object") return undefined;
      node = next;
    }
    return node;
  }
  search(word: string): boolean { return this.walk(word)?.terminal === true; }
  startsWith(prefix: string): boolean { return this.walk(prefix) !== undefined; }
}`,
  "atlas-087": `type WildcardNode = { terminal?: boolean; [char: string]: WildcardNode | boolean | undefined };
class WildcardDictionary {
  private root: WildcardNode = {};
  addWord(word: string): void {
    let node = this.root;
    for (const char of word) {
      const next = node[char];
      node = typeof next === "object" ? next : (node[char] = {} as WildcardNode);
    }
    node.terminal = true;
  }
  search(pattern: string): boolean {
    const match = (node: WildcardNode, index: number): boolean => {
      if (index === pattern.length) return node.terminal === true;
      const char = pattern[index];
      if (char !== ".") {
        const next = node[char];
        return typeof next === "object" && match(next, index + 1);
      }
      return Object.entries(node).some(([key, next]) => key !== "terminal" && typeof next === "object" && match(next, index + 1));
    };
    return match(this.root, 0);
  }
}`,
  "atlas-088": `function longestSharedPrefix(words: string[]): string {
  if (words.length === 0) return "";
  for (let index = 0; index < words[0].length; index++) {
    const expected = words[0][index];
    if (words.slice(1).some(word => index >= word.length || word[index] !== expected)) return words[0].slice(0, index);
  }
  return words[0];
}`,
  "atlas-089": `function replaceWordsWithRoots(roots: string[], sentence: string): string {
  type Node = { terminal?: boolean; [char: string]: Node | boolean | undefined };
  const trie: Node = {};
  for (const root of roots) {
    let node = trie;
    for (const char of root) {
      const next = node[char];
      node = typeof next === "object" ? next : (node[char] = {} as Node);
    }
    node.terminal = true;
  }
  return sentence.split(" ").map(word => {
    let node = trie;
    for (let index = 0; index < word.length; index++) {
      const next = node[word[index]];
      if (typeof next !== "object") return word;
      node = next;
      if (node.terminal === true) return word.slice(0, index + 1);
    }
    return word;
  }).join(" ");
}`,
  "atlas-090": `type StreamingNode = Array<StreamingNode | undefined>;
class StreamingXorTrie {
  private root: StreamingNode = [];
  insert(value: number): void {
    let node = this.root;
    for (let bit = 30; bit >= 0; bit--) {
      const current = value >>> bit & 1;
      node[current] ??= [];
      node = node[current]!;
    }
  }
  query(value: number): number {
    let node = this.root, score = 0;
    for (let bit = 30; bit >= 0; bit--) {
      const current = value >>> bit & 1, wanted = current ^ 1;
      if (node[wanted] !== undefined) { score |= 1 << bit; node = node[wanted]!; }
      else node = node[current]!;
    }
    return score;
  }
}
function streamingMaximumXor(values: number[]): number {
  if (values.length < 2) return 0;
  const trie = new StreamingXorTrie(); trie.insert(values[0]);
  let answer = 0;
  for (const value of values.slice(1)) { answer = Math.max(answer, trie.query(value)); trie.insert(value); }
  return answer;
}`
};
