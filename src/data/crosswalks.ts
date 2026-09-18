import { CoverageCrosswalkSchema } from "@/lib/schema";
import { dsaPatternById, dsaProblems } from "@/data/dsa";

const sources = [
  { id: "striver-a2z" as const, label: "Striver A2Z", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
  { id: "codehelp-babbar" as const, label: "CodeHelp / Babbar", url: "https://www.codehelp.in/" },
  { id: "neetcode" as const, label: "NeetCode", url: "https://neetcode.io/roadmap" },
  { id: "gfg" as const, label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/dsa/dsa-sheet-by-love-babbar/" }
];

export const coverageCrosswalks = CoverageCrosswalkSchema.array().parse(dsaProblems.flatMap((problem) => sources.map((source) => ({
  id: `${problem.id}-${source.id}`,
  atlasProblemId: problem.id,
  source: source.id,
  topicLabel: `${dsaPatternById.get(problem.patternId)?.title ?? problem.patternId} — ${problem.title}`,
  url: source.url,
  note: `Topic-level mapping to ${source.label}; Interview Atlas wording and solution artifacts are original.`
}))));

export const crosswalkSources = sources;
