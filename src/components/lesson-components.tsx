import type { ReactNode } from "react";
import { AlertTriangle, ArrowRight, Brain, CheckCircle2, Compass, Lightbulb, Map, Quote, RotateCcw } from "lucide-react";

export function FiveMinuteMap({ items }: { items: string[] }) {
  return <section className="lesson-map" aria-labelledby="five-minute-map"><div className="lesson-section-icon"><Map size={19} /></div><div><h2 id="five-minute-map">Five-minute map</h2><ol>{items.map((item) => <li key={item}>{item}</li>)}</ol></div></section>;
}

export function LearningOutcomes({ children }: { children: ReactNode }) {
  return <section className="outcome-block"><div className="lesson-section-icon"><Compass size={19} /></div><div><h2>Learning outcomes</h2>{children}</div></section>;
}

export function Analogy({ title, children, limit }: { title: string; children: ReactNode; limit?: string }) {
  return <aside className="analogy"><Lightbulb size={20} aria-hidden="true" /><div><h3>{title}</h3>{children}<p className="analogy-limit"><strong>Where the analogy stops matching:</strong> {limit ?? "Use the comparison to build intuition, not to infer guarantees. The exact behavior comes from the mechanisms, invariants, constraints, and failure modes that follow."}</p></div></aside>;
}

export function KeyIdea({ children }: { children: ReactNode }) {
  return <aside className="key-idea"><Brain size={20} aria-hidden="true" /><div><strong>Key idea</strong>{children}</div></aside>;
}

export function Pitfalls({ children }: { children: ReactNode }) {
  return <section className="pitfalls"><AlertTriangle size={20} aria-hidden="true" /><div><h2>Failure modes and misconceptions</h2>{children}</div></section>;
}

export function InterviewPrompt({ title, timebox, difficulty, children }: { title: string; timebox: string; difficulty: string; children: ReactNode }) {
  return <section className="interview-prompt"><div className="prompt-head"><div><Quote size={18} /><h3>{title}</h3></div><span>{difficulty} · {timebox}</span></div>{children}</section>;
}

export function Hint({ children }: { children: ReactNode }) {
  return <details className="reveal"><summary>Reveal a hint</summary><div>{children}</div></details>;
}

export function Solution({ children }: { children: ReactNode }) {
  return <details className="reveal solution"><summary>Reveal solution and rubric</summary><div>{children}</div></details>;
}

export function Flashcards({ cards }: { cards: Array<{ front: string; back: string }> }) {
  return <section className="flashcards"><h2>Flashcards</h2><p>Use these for manual recall. Open only after answering aloud.</p><div>{cards.map((card) => <details key={card.front}><summary>{card.front}</summary><p>{card.back}</p></details>)}</div></section>;
}

export function RevisionSheet({ children }: { children: ReactNode }) {
  return <section className="revision-sheet"><div className="revision-title"><RotateCcw size={19} /><h2>One-page revision sheet</h2></div>{children}</section>;
}

export function Checklist({ children }: { children: ReactNode }) {
  return <div className="checklist"><CheckCircle2 size={18} aria-hidden="true" />{children}</div>;
}

export function Flow({ steps }: { steps: string[] }) {
  return <div className="inline-flow" aria-label={steps.join(" then ")}>{steps.map((step, index) => <div key={step}><span>{step}</span>{index < steps.length - 1 && <ArrowRight size={17} aria-hidden="true" />}</div>)}</div>;
}

export function Sources({ children }: { children: ReactNode }) {
  return <section className="sources"><h2>Sources and further study</h2>{children}</section>;
}
