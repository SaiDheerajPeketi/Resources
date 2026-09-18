import { cpp17Atlas75 } from "@/data/solutions/cpp17-atlas75";
import { javaAtlas75 } from "@/data/solutions/java-atlas75";
import { pythonAtlas75 } from "@/data/solutions/python-atlas75";
import type { CodeVariant, DSAProblem } from "@/lib/schema";

type Language = CodeVariant["language"];
const labels: Record<Language, string> = { cpp17: "C++17", java: "Java", python: "Python", typescript: "TypeScript" };

function blueprint(problem: DSAProblem, language: Language): string {
  const lines = [
    `${problem.title} — porting blueprint`,
    `Contract: ${problem.prompt}`,
    `Invariant and approach: ${problem.approach}`,
    `Complexity target: ${problem.complexity.time} time; ${problem.complexity.space} space.`,
    "Implementation checklist:",
    "1. Translate the input contract without changing index or endpoint semantics.",
    "2. Represent the maintained state named in the approach.",
    "3. Apply one transition at a time and preserve the invariant.",
    `4. Test ${problem.edgeCases.slice(0, 2).join(" and ").toLowerCase()}.`,
    "This is deliberately marked as a blueprint until a reviewed, executable language port is published."
  ];
  const prefix = language === "python" ? "# " : "// ";
  return lines.map((line) => `${prefix}${line}`).join("\n");
}

export function solutionVariant(problem: DSAProblem, language: Language): CodeVariant {
  const reference = language === "cpp17"
    ? cpp17Atlas75[problem.id]
    : language === "java"
      ? javaAtlas75[problem.id]
      : language === "python"
        ? pythonAtlas75[problem.id]
        : undefined;
  return {
    id: `${problem.id}-${language}`,
    language,
    label: labels[language],
    completeness: reference ? "reference" : "porting-blueprint",
    source: reference ?? blueprint(problem, language),
    complexity: reference
      ? `${problem.complexity.time} time; ${problem.complexity.space} space. ${problem.complexity.rationale}`
      : `Porting target: ${problem.complexity.time} time and ${problem.complexity.space} space. The reviewed reference implementation for this tab is not published yet.`
  };
}
