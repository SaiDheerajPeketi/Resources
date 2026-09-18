"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { dsaPatternById } from "@/data/dsa";
import type { DSAProblem } from "@/lib/schema";

export function SheetBrowser({ problems }: { problems: DSAProblem[] }) {
  const [difficulty, setDifficulty] = useState("all");
  const [pattern, setPattern] = useState("all");
  const visible = useMemo(() => problems.filter((problem) => (difficulty === "all" || problem.difficulty === difficulty) && (pattern === "all" || problem.patternId === pattern)), [difficulty, pattern, problems]);
  return <><div className="sheet-filters"><label>Difficulty<select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option value="all">All levels</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></label><label>Pattern<select value={pattern} onChange={(event) => setPattern(event.target.value)}><option value="all">All patterns</option>{[...new Set(problems.map((problem) => problem.patternId))].map((id) => <option key={id} value={id}>{dsaPatternById.get(id)?.title}</option>)}</select></label><span>{visible.length} problems</span></div>
    <div className="sheet-table-wrap"><table className="sheet-table"><thead><tr><th>Rank</th><th>Problem</th><th>Pattern</th><th>Difficulty</th><th>Timebox</th></tr></thead><tbody>{visible.map((problem) => <tr key={problem.id}><td>{problem.sheetRanks.atlas300}</td><td><Link href={`/problems/${problem.id}/`}>{problem.title}</Link></td><td>{dsaPatternById.get(problem.patternId)?.title}</td><td><span className={`difficulty ${problem.difficulty}`}>{problem.difficulty}</span></td><td>{problem.estimatedMinutes} min</td></tr>)}</tbody></table></div></>;
}
