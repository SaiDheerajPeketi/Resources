import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Printer, ShieldAlert, TerminalSquare } from "lucide-react";
import { CommandCopy } from "@/components/command-copy";
import { commandById, sourceById, technologies, technologyById } from "@/data/technologies";
export const dynamicParams = false;
export function generateStaticParams() { return technologies.map((technology) => ({ slug: technology.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = technologyById.get(slug); return item ? { title: item.title, description: item.summary } : { title: "Technology not found" }; }
export default async function TechnologyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = technologyById.get(slug); if (!item) notFound(); const commands = item.commandIds.map((id) => commandById.get(id)).filter(Boolean);
  return <main id="main-content" className="manual-shell"><aside className="manual-index"><Link className="back-link" href="/library/"><ArrowLeft size={16} /> Technology library</Link><h2>{item.title}</h2><nav aria-label="Field manual sections"><a href="#mental-model">Mental model</a><a href="#commands">Command cookbook</a><a href="#examples">Worked examples</a><a href="#interview-questions">Interview questions</a><a href="#cheatsheet">Cheatsheet</a><a href="#sources">Sources</a></nav><p><Printer size={16} /> Print this page for a compact revision manual.</p></aside>
    <article className="manual-article" data-pagefind-body><header><div><span>{item.kind}</span><span>{item.ecosystem}</span><span>{item.level}</span></div><h1>{item.title}</h1><p>{item.summary}</p></header>
      <section id="mental-model"><h2>Mental model</h2><p className="lead-copy">{item.mentalModel}</p><div className="manual-columns"><div><h3>Runtime</h3><ul>{item.runtime.map((line) => <li key={line}>{line}</li>)}</ul></div><div><h3>Setup</h3><ol>{item.setup.map((line) => <li key={line}>{line}</li>)}</ol></div></div></section>
      <section id="commands"><h2><TerminalSquare size={22} /> Command cookbook</h2><div className="command-book">{commands.map((command) => command && <article key={command.id}><header><h3>{command.title}</h3><span className={`safety ${command.safety}`}><ShieldAlert size={13} /> {command.safety}</span></header><div><code>{command.command}</code><CommandCopy command={command.command} /></div><p>{command.purpose}</p><small>{command.platform} · expected: {command.expectedResult}</small></article>)}</div></section>
      <section id="examples"><h2>Worked examples</h2>{item.workedExamples.map((example) => <article className="worked-example" key={example.title}><h3>{example.title}</h3><pre><code>{example.code}</code></pre><p>{example.explanation}</p></article>)}</section>
      <section><h2>Debug, performance, security</h2><div className="manual-columns"><div><h3>Debugging</h3><ul>{item.debugging.map((line) => <li key={line}>{line}</li>)}</ul><h3>Failure modes</h3><ul>{item.failureModes.map((line) => <li key={line}>{line}</li>)}</ul></div><div><h3>Performance</h3><ul>{item.performance.map((line) => <li key={line}>{line}</li>)}</ul><h3>Security</h3><ul>{item.security.map((line) => <li key={line}>{line}</li>)}</ul></div></div></section>
      <section id="interview-questions"><h2>Interview questions</h2><ol className="question-ledger">{item.questions.map((question, index) => <li key={question.prompt}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{question.prompt}</h3><p>{question.answer}</p></div><small>{question.difficulty}</small></li>)}</ol></section>
      <section id="cheatsheet" className="print-sheet"><h2>One-page revision sheet</h2>{item.cheatsheet.map((group) => <div key={group.title}><h3>{group.title}</h3><dl>{group.items.map((entry) => <div key={entry.label}><dt>{entry.label}</dt><dd>{entry.value}</dd></div>)}</dl></div>)}</section>
      <section id="sources"><h2><BookOpen size={21} /> Authoritative sources</h2><ul>{item.sourceIds.map((id) => { const source = sourceById.get(id); return source ? <li key={id}><a href={source.url}>{source.title}</a> <small>reviewed {source.lastReviewed}</small></li> : null; })}</ul></section>
    </article></main>;
}
