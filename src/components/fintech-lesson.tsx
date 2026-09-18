import { Analogy, FiveMinuteMap, Flashcards, Hint, InterviewPrompt, KeyIdea, LearningOutcomes, Pitfalls, RevisionSheet, Solution, Sources } from "@/components/lesson-components";
import { fintechLessons } from "@/data/fintech-lessons";

export function FintechLesson({ topicId }: { topicId: string }) {
  const lesson = fintechLessons[topicId];
  if (!lesson) throw new Error(`Unknown fintech lesson: ${topicId}`);
  return <>
    <FiveMinuteMap items={lesson.conceptMap} />
    <LearningOutcomes><ul>{lesson.outcomes.map((item) => <li key={item}>{item}</li>)}</ul></LearningOutcomes>
    <Analogy title={lesson.analogy.title}><p>{lesson.analogy.body}</p></Analogy>
    <KeyIdea><p>{lesson.keyIdea}</p></KeyIdea>
    {lesson.theory.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
    <section><h2>{lesson.example.title}</h2><pre tabIndex={0}><code className={`language-${lesson.example.language}`}>{lesson.example.code}</code></pre><p>{lesson.example.explanation}</p></section>
    <Pitfalls><ul>{lesson.failureModes.map((item) => <li key={item}>{item}</li>)}</ul></Pitfalls>
    <section><h2>Interview practice</h2><InterviewPrompt title={lesson.question.prompt} timebox={`${lesson.question.timeboxMinutes} min`} difficulty={lesson.question.difficulty}>
      <p>Answer aloud or in the practice workspace before revealing guidance.</p>
      <Hint><ul>{lesson.question.hints.map((item) => <li key={item}>{item}</li>)}</ul></Hint>
      <Solution><p>{lesson.question.answer}</p><h4>Scoring rubric</h4><ul>{lesson.question.rubric.map((item) => <li key={item}>{item}</li>)}</ul></Solution>
    </InterviewPrompt></section>
    <Flashcards cards={lesson.flashcards} />
    <RevisionSheet><ul>{lesson.revision.map((item) => <li key={item}>{item}</li>)}</ul></RevisionSheet>
    <Sources><ul>{lesson.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer">{source.label}</a></li>)}</ul><p><small>Reviewed 18 September 2026. Educational material only—not legal, investment, trading, or financial advice. Verify current rules and product requirements.</small></p></Sources>
  </>;
}
