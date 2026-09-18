import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProblemSolution } from "@/components/problem-solution";
import { dsaPatternById, dsaProblemById, dsaProblems } from "@/data/dsa";
export const dynamicParams = false;
export function generateStaticParams() { return dsaProblems.map((problem) => ({ problem: problem.id })); }
export async function generateMetadata({ params }: { params: Promise<{ problem: string }> }): Promise<Metadata> { const { problem } = await params; const item = dsaProblemById.get(problem); return { title: item?.title ?? "Problem", description: item?.prompt }; }
export default async function ProblemPage({ params }: { params: Promise<{ problem: string }> }) {
  const { problem } = await params;
  const item = dsaProblemById.get(problem);
  if (!item) notFound();
  const pattern = dsaPatternById.get(item.patternId);

  return <main id="main-content" className="problem-page" data-pagefind-body>
    <Link className="back-link" href="/sheets/atlas-75/"><ArrowLeft size={16} /> Back to sheet</Link>
    <header>
      <div><span>{item.id}</span><span>{item.difficulty}</span><span>{item.estimatedMinutes} minutes</span></div>
      <h1>{item.title}</h1>
      <p>{item.prompt}</p>
      <a className="external-practice-action" href={item.practiceUrl} target="_blank" rel="noreferrer">
        <span><strong>{item.practiceLabel}</strong><small>{item.practiceDirect ? "Direct matching problem" : "Closest implementation search"} · opens externally</small></span>
        <ExternalLink size={18} />
      </a>
    </header>
    <section><h2>Pattern map</h2><p>{pattern?.mentalModel}</p><ul>{pattern?.recognitionSignals.map((signal) => <li key={signal}>{signal}</li>)}</ul></section>
    <section><h2>Constraints and edge cases</h2><ul>{[...item.constraints, ...item.edgeCases].map((line) => <li key={line}>{line}</li>)}</ul></section>
    <section><h2>Hints</h2><ol>{item.hints.map((hint) => <li key={hint}>{hint}</li>)}</ol></section>
    <section><h2>Approach and proof</h2><p>{item.approach}</p><p>{item.proof}</p></section>
    <ProblemSolution problemId={item.id} languages={item.variantLanguages} />
  </main>;
}
