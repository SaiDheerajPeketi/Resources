import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, BookOpen, Printer, ShieldAlert, TerminalSquare } from "lucide-react";
import { CommandCopy } from "@/components/command-copy";
import { commandById, sourceById, technologies, technologyById } from "@/data/technologies";

export const dynamicParams = false;

export function generateStaticParams() {
  return technologies.map((technology) => ({ slug: technology.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = technologyById.get(slug);
  return item ? { title: item.title, description: item.summary } : { title: "Technology not found" };
}

export default async function TechnologyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = technologyById.get(slug);
  if (!item) notFound();
  const commands = item.commandIds.map((id) => commandById.get(id)).filter(Boolean);

  return (
    <main id="main-content" className="manual-shell">
      <aside className="manual-index">
        <Link className="back-link" href="/library/"><ArrowLeft size={16} /> Technology library</Link>
        <h2>{item.title}</h2>
        <nav aria-label="Field manual sections">
          <a href="#start-here">Start here</a>
          <a href="#mental-model">How it works</a>
          <a href="#learning-path">Learning path</a>
          <a href="#deep-theory">Learn in depth</a>
          <a href="#commands">Useful commands</a>
          <a href="#examples">Worked examples</a>
          <a href="#misconceptions">Misconceptions</a>
          <a href="#interview-questions">Tricky questions</a>
          <a href="#flashcards">Flashcards</a>
          <a href="#cheatsheet">Revision sheet</a>
          <a href="#sources">Sources</a>
        </nav>
        <p><Printer size={16} /> Print this page for a compact revision manual.</p>
      </aside>

      <article className="manual-article" data-pagefind-body>
        <header>
          <div>
            <span>{item.kind}</span>
            <span>{item.ecosystem}</span>
            <span>{item.level}</span>
            <span className={`depth-state ${item.depthStatus}`}>{item.depthStatus === "complete" ? "full-depth manual" : "overview"}</span>
          </div>
          <h1>{item.title}</h1>
          <p>{item.beginnerGuide.whatItIs}</p>
          <details className="manual-scope"><summary>See everything covered in this manual</summary><p>{item.summary}</p></details>
        </header>

        {item.depthStatus === "overview" && (
          <aside className="depth-notice">
            <AlertTriangle size={19} />
            <div><strong>Editorial expansion in progress</strong><p>This is a structured interview overview, not yet the complete A–Z manual. It remains clearly labelled until its theory, examples, traps, and revision material receive subject-specific review.</p></div>
          </aside>
        )}

        <section id="start-here" className="beginner-guide">
          <h2>Start here</h2>
          <p className="section-intro">New to {item.title}? Read this short section first. The exact terminology and advanced details come afterward.</p>
          <div className="beginner-guide-grid">
            <article><h3>Why you would learn it</h3><p>{item.beginnerGuide.whyItMatters}</p></article>
            <article><h3>Think of it like this</h3><p>{item.beginnerGuide.analogy}</p></article>
            <article className="beginner-first-step"><h3>Your first small exercise</h3><p>{item.beginnerGuide.firstStep}</p></article>
          </div>
          <div className="beginner-terms"><h3>Three words to know now</h3><dl>{item.beginnerGuide.keyTerms.map((entry) => <div key={entry.term}><dt>{entry.term}</dt><dd>{entry.meaning}</dd></div>)}</dl></div>
        </section>

        <section id="mental-model">
          <h2>How it works: the precise version</h2>
          <p className="section-intro">The beginner explanation gives you the shape. This section gives you the language used by engineers and interviewers.</p>
          <p className="lead-copy">{item.mentalModel}</p>
          <div className="manual-columns">
            <div><h3>Runtime</h3><ul>{item.runtime.map((line) => <li key={line}>{line}</li>)}</ul></div>
            <div><h3>Setup</h3><ol>{item.setup.map((line) => <li key={line}>{line}</li>)}</ol></div>
          </div>
        </section>

        <section id="learning-path">
          <h2>Your path from beginner to interview-ready</h2>
          <p className="section-intro">Follow these stages in order. Do the small exercise and pass the self-check before moving to the next stage.</p>
          <ol className="learning-ladder">
            {item.learningPath.map((stage, index) => (
              <li key={stage.level}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{stage.level}</small><h3>{stage.title}</h3><p><strong>Goal:</strong> {stage.objective}</p><h4>What you will learn</h4><ul>{stage.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                  <div className="technology-stage-gate">
                    <div><h4>Try it yourself</h4><p>Rebuild <strong>{item.workedExamples[index % item.workedExamples.length].title}</strong> without copying. Change one requirement and explain what else must change.</p></div>
                    <div><h4>Move on when</h4><ul>{item.revisionChecklist.slice(index * 2, index * 2 + 2).map((checkpoint) => <li key={checkpoint}>{checkpoint}</li>)}</ul></div>
                    <div><h4>Practise saying this aloud</h4><p>{item.questions[index % item.questions.length].prompt}</p><small>{item.questions[index % item.questions.length].difficulty} · answer in your own words, then use the rubric below</small></div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="deep-theory">
          <h2>Learn the ideas in depth</h2>
          <p className="section-intro">Each topic starts in plain English, uses an analogy, then shows the exact mechanism and where the analogy stops being accurate.</p>
          <div className="theory-ledger">
            {item.theorySections.map((section, index) => (
              <article key={section.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{section.title}</h3>
                  <p className="plain-english"><strong>In plain English:</strong> {section.plainEnglish}</p>
                  <p>{section.explanation}</p>
                  <div className="teaching-aids">
                    <div><h4>Analogy</h4><p>{section.analogy}</p><small><strong>Where it stops matching:</strong> {section.analogyLimit}</small></div>
                    <div><h4>Concrete example</h4><p>{section.concreteExample}</p></div>
                  </div>
                  <ul>{section.keyPoints.map((point) => <li key={point}>{point}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="commands">
          <h2><TerminalSquare size={22} /> Useful commands and what they do</h2>
          <div className="command-book">
            {commands.map((command) => command && (
              <article key={command.id}>
                <header><h3>{command.title}</h3><span className={`safety ${command.safety}`}><ShieldAlert size={13} /> {command.safety}</span></header>
                <div><code>{command.command}</code><CommandCopy command={command.command} /></div>
                <p>{command.purpose}</p><small>{command.platform} · expected: {command.expectedResult}</small>
              </article>
            ))}
          </div>
        </section>

        <section id="examples">
          <h2>Worked examples</h2>
          {item.workedExamples.map((example) => <article className="worked-example" key={example.title}><h3>{example.title}</h3><pre tabIndex={0} aria-label={`${example.title} code example`}><code>{example.code}</code></pre><p>{example.explanation}</p></article>)}
        </section>

        <section>
          <h2>Testing, debugging, performance, and security</h2>
          <div className="manual-columns">
            <div><h3>Testing</h3><ul>{item.testing.map((line) => <li key={line}>{line}</li>)}</ul><h3>Debugging</h3><ul>{item.debugging.map((line) => <li key={line}>{line}</li>)}</ul><h3>Failure modes</h3><ul>{item.failureModes.map((line) => <li key={line}>{line}</li>)}</ul></div>
            <div><h3>Performance</h3><ul>{item.performance.map((line) => <li key={line}>{line}</li>)}</ul><h3>Security</h3><ul>{item.security.map((line) => <li key={line}>{line}</li>)}</ul></div>
          </div>
        </section>

        <section id="misconceptions">
          <h2>Common mix-ups</h2>
          <div className="misconception-ledger">
            {item.misconceptions.map((entry) => (
              <article key={entry.claim}>
                <h3>“{entry.claim}”</h3>
                <p><strong>Correction:</strong> {entry.correction}</p>
                <p><strong>Why people confuse it:</strong> {entry.whyItHappens}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="interview-questions">
          <h2>Interview questions that reveal confusion</h2>
          <ol className="question-ledger">
            {item.questions.map((question, index) => (
              <li key={question.prompt}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{question.prompt}</h3>
                  <p>{question.answer}</p>
                  <p className="why-tricky"><strong>Why it is tricky:</strong> {question.whyTricky}</p>
                  <h4>Strong-answer rubric</h4>
                  <ul>{question.rubric.map((criterion) => <li key={criterion}>{criterion}</li>)}</ul>
                </div>
                <small>{question.difficulty}</small>
              </li>
            ))}
          </ol>
        </section>

        <section id="flashcards">
          <h2>Rapid-recall flashcards</h2>
          <div className="flashcard-ledger">
            {item.flashcards.map((card, index) => <article key={card.front}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{card.front}</h3><p>{card.back}</p></div></article>)}
          </div>
        </section>

        <section id="cheatsheet" className="print-sheet">
          <h2>One-page revision sheet</h2>
          <div className="revision-checklist"><h3>Can you explain these without notes?</h3><ul>{item.revisionChecklist.map((checkpoint) => <li key={checkpoint}>{checkpoint}</li>)}</ul></div>
          {item.cheatsheet.map((group) => <div key={group.title}><h3>{group.title}</h3><dl>{group.items.map((entry) => <div key={entry.label}><dt>{entry.label}</dt><dd>{entry.value}</dd></div>)}</dl></div>)}
        </section>

        <section id="sources">
          <h2><BookOpen size={21} /> Authoritative sources</h2>
          <ul>{item.sourceIds.map((id) => { const source = sourceById.get(id); return source ? <li key={id}><a href={source.url}>{source.title}</a> <small>reviewed {source.lastReviewed}</small></li> : null; })}</ul>
        </section>
      </article>
    </main>
  );
}
