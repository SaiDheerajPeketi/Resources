import {
  Analogy,
  FiveMinuteMap,
  Flashcards,
  Hint,
  InterviewPrompt,
  KeyIdea,
  LearningOutcomes,
  Pitfalls,
  RevisionSheet,
  Solution,
  Sources
} from "@/components/lesson-components";
import type { FoundationLessonData } from "@/data/foundations/types";

const levelLabels = ["Foundation", "Working depth", "Advanced trade-offs"];

export function CurriculumLesson({ lesson, reviewNote }: { lesson: FoundationLessonData; reviewNote: string }) {
  return <>
    <FiveMinuteMap items={lesson.conceptMap} />
    <LearningOutcomes><ul>{lesson.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></LearningOutcomes>

    <section className="lesson-depth-path" aria-labelledby="lesson-depth-path-title">
      <header><h2 id="lesson-depth-path-title">Basic → advanced study path</h2><p>Use the lesson in layers. Do not memorize the advanced vocabulary before you can explain the underlying mechanism in ordinary language.</p></header>
      <ol>
        <li><span>01 · Basic</span><div><h3>Build the mental model</h3><p>{lesson.analogy.title}. Explain the key idea without jargon, then name the important objects and state.</p></div></li>
        <li><span>02 · Intermediate</span><div><h3>Trace the mechanism</h3><p>{lesson.theory.slice(0, 2).map((section) => section.heading).join(" · ")}. Follow one input through the rules and invariants.</p></div></li>
        <li><span>03 · Advanced</span><div><h3>Defend the trade-offs</h3><p>{lesson.theory.slice(2).map((section) => section.heading).join(" · ") || lesson.example.title}. Connect design choices to failure, scale, correctness, and operations.</p></div></li>
        <li><span>04 · Interview-ready</span><div><h3>Explain, apply, and challenge</h3><p>Work the example, answer the graded prompt aloud, correct every misconception, then finish from the revision sheet without notes.</p></div></li>
      </ol>
    </section>

    <Analogy title={lesson.analogy.title} limit={lesson.analogy.limit}><p>{lesson.analogy.body}</p></Analogy>
    <KeyIdea><p>{lesson.keyIdea}</p></KeyIdea>

    <section className="lesson-theory-field" aria-labelledby="lesson-theory-title">
      <header><h2 id="lesson-theory-title">Theory, mechanisms, and trade-offs</h2><p>Start with the exact mechanism. Then ask what assumption it depends on, what it costs, and how it fails.</p></header>
      <div>{lesson.theory.map((section, index) => <article key={section.heading}>
        <span>{String(index + 1).padStart(2, "0")} · {levelLabels[Math.min(index, levelLabels.length - 1)]}</span>
        <div><h3>{section.heading}</h3><p>{section.body}</p></div>
      </article>)}</div>
    </section>

    <section className="worked-example-field">
      <header><h2>Worked example: {lesson.example.title}</h2></header>
      <pre tabIndex={0}><code className={`language-${lesson.example.language}`}>{lesson.example.code}</code></pre>
      <p><strong>What this demonstrates:</strong> {lesson.example.explanation}</p>
    </section>

    <Pitfalls><ul>{lesson.failureModes.map((mode) => <li key={mode}>{mode}</li>)}</ul></Pitfalls>

    <section>
      <h2>Interview practice</h2>
      <InterviewPrompt title={lesson.question.prompt} timebox={`${lesson.question.timeboxMinutes} min`} difficulty={lesson.question.difficulty}>
        <p>Answer aloud or in the practice workspace before revealing guidance. State assumptions, trace one example, and name the failure mode that would change your answer.</p>
        <Hint><ul>{lesson.question.hints.map((hint) => <li key={hint}>{hint}</li>)}</ul></Hint>
        <Solution><p>{lesson.question.answer}</p><h4>Strong-answer scoring rubric</h4><ul>{lesson.question.rubric.map((item) => <li key={item}>{item}</li>)}</ul></Solution>
      </InterviewPrompt>
    </section>

    <Flashcards cards={lesson.flashcards} />
    <RevisionSheet><p>Explain each checkpoint, give one example, and name one tempting misconception before marking the topic confident.</p><ul>{lesson.revision.map((item) => <li key={item}>{item}</li>)}</ul></RevisionSheet>
    <Sources><ul>{lesson.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer">{source.label}</a></li>)}</ul><p><small>{reviewNote}</small></p></Sources>
  </>;
}
