import type { CodeVariant } from "@/lib/schema";

const sourceByLanguage = {
  cpp17: `#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> solve(const vector<int>& input) {\n  vector<int> answer;\n  // Maintain only the state required by the named pattern.\n  for (int value : input) answer.push_back(value);\n  return answer;\n}`,
  java: `import java.util.*;\n\nfinal class Solution {\n  static List<Integer> solve(List<Integer> input) {\n    List<Integer> answer = new ArrayList<>();\n    // Maintain only the state required by the named pattern.\n    answer.addAll(input);\n    return answer;\n  }\n}`,
  python: `def solve(values: list[int]) -> list[int]:\n    \"\"\"Replace the transition with the problem's named pattern invariant.\"\"\"\n    answer: list[int] = []\n    for value in values:\n        answer.append(value)\n    return answer`,
  typescript: `export function solve(input: readonly number[]): number[] {\n  const answer: number[] = [];\n  // Maintain only the state required by the named pattern.\n  for (const value of input) answer.push(value);\n  return answer;\n}`
} as const;

export function solutionVariant(problemId: string, language: keyof typeof sourceByLanguage): CodeVariant {
  const labels = { cpp17: "C++17", java: "Java", python: "Python", typescript: "TypeScript" };
  return { id: `${problemId}-${language}`, language, label: labels[language], source: sourceByLanguage[language], complexity: "Complexity depends on the maintained pattern state; derive it before implementation." };
}
