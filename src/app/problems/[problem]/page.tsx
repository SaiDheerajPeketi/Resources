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
      <div><span>{item.id}</span><span>{item.difficulty}</span><span>{item.estimatedMinutes} minutes</span><span>{item.depthStatus === "complete" ? "Full lesson" : "Guided overview"}</span></div>
      <h1>{item.title}</h1>
      <p>{item.prompt}</p>
      <a className="external-practice-action" href={item.practiceUrl} target="_blank" rel="noreferrer">
        <span><strong>{item.practiceLabel}</strong><small>{item.practiceDirect ? "Direct matching problem" : "Closest implementation search"} · opens externally</small></span>
        <ExternalLink size={18} />
      </a>
    </header>
    <section><h2>What you will learn</h2><ul>{item.learningObjectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></section>
    <section><h2>Pattern map</h2><p>{pattern?.mentalModel}</p><h3>Recognition signals</h3><ul>{pattern?.recognitionSignals.map((signal) => <li key={signal}>{signal}</li>)}</ul></section>
    <section className="analogy-panel"><h2>Mental model</h2><p>{item.analogy.body}</p><p><strong>Where the analogy stops:</strong> {item.analogy.limit}</p></section>
    <section><h2>Worked example</h2>{item.examples.map((example) => <article className="problem-example" key={`${example.input}-${example.output}`}><dl><div><dt>Input</dt><dd><code>{example.input}</code></dd></div><div><dt>Output</dt><dd><code>{example.output}</code></dd></div></dl><p>{example.explanation}</p></article>)}</section>
    <section><h2>Constraints and edge cases</h2><ul>{[...item.constraints, ...item.edgeCases].map((line) => <li key={line}>{line}</li>)}</ul></section>
    <section><h2>From baseline to optimal</h2><h3>Direct baseline</h3><p>{item.naiveApproach}</p><h3>Interview-ready approach</h3><p>{item.approach}</p><h3>Why it is correct</h3><p>{item.proof}</p></section>
    <section><h2>Dry run</h2><ol>{item.walkthrough.map((step) => <li key={step}>{step}</li>)}</ol></section>
    <section><h2>Complexity</h2><dl className="complexity-ledger"><div><dt>Time</dt><dd>{item.complexity.time}</dd></div><div><dt>Space</dt><dd>{item.complexity.space}</dd></div></dl><p>{item.complexity.rationale}</p></section>
    <section><h2>Progressive hints</h2><ol>{item.hints.map((hint) => <li key={hint}>{hint}</li>)}</ol></section>
    <section><h2>Traps and misconceptions</h2>{item.misconceptions.map((entry) => <article className="misconception-card" key={entry.claim}><h3>{entry.claim}</h3><p>{entry.correction}</p></article>)}</section>
    <section><h2>Interviewer follow-ups</h2><ul>{item.followUps.map((followUp) => <li key={followUp}>{followUp}</li>)}</ul></section>
    <ProblemSolution problemId={item.id} languages={item.variantLanguages} />
  </main>;
}
