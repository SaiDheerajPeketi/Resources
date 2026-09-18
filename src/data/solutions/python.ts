import { dsaProblems } from "@/data/dsa";
import { solutionVariant } from "@/data/solution-templates";
export const solutions = Object.fromEntries(dsaProblems.map((problem) => [problem.id, solutionVariant(problem, "python")]));
