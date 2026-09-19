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
import { buildLessonDepth } from "@/lib/lesson-depth";

const levelLabels = ["Foundation", "Working depth", "Advanced trade-offs"];

export function CurriculumLesson({ lesson, reviewNote, topicId }: { lesson: FoundationLessonData; reviewNote: string; topicId: string }) {
  const depth = buildLessonDepth(lesson, topicId);
  return <>
    <FiveMinuteMap items={lesson.conceptMap} />
    <LearningOutcomes><ul>{lesson.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></LearningOutcomes>

    <nav className="field-note-guide" aria-labelledby="field-note-guide-title">
      <div><h2 id="field-note-guide-title">Use this as a complete interview field note</h2><p>First understand the picture, then trace the mechanism, work the examples, diagnose the traps, and finish with closed-book recall.</p></div>
      <div>
        <a href="#complete-syllabus">Full syllabus</a>
        <a href="#deep-chapters">Deep chapters</a>
        <a href="#worked-example">Worked example</a>
        <a href="#scenario-lab">Scenario lab</a>
        <a href="#question-ladder">Question ladder</a>
        <a href="#revision-sheet">Revision sheet</a>
      </div>
    </nav>

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

    <section className="complete-syllabus" aria-labelledby="start-from-zero-title">
      <header>
        <h2 id="start-from-zero-title">Start from zero: understand the words before the mechanism</h2>
        <p>This section assumes no hidden vocabulary. Read it first if the main explanation feels compressed; experienced readers can use it to check that familiar words still have precise meanings.</p>
      </header>
      <div>
        <section>
          <h3>What this topic is</h3>
          <p>{depth.foundation.whatItIs}</p>
          <h3>The central idea</h3>
          <p>{depth.foundation.centralIdea}</p>
          <h3>First concrete anchor</h3>
          <p>{depth.foundation.firstConcreteExample}</p>
        </section>
        <section>
          <h3>Build the idea in this order</h3>
          <ol>{depth.foundation.learningOrder.map((item) => <li key={item.concept}><strong>{item.concept}.</strong> {item.explanation}</li>)}</ol>
        </section>
      </div>
    </section>

    <section className="lesson-theory-field" aria-labelledby="vocabulary-title">
      <header>
        <h2 id="vocabulary-title">Vocabulary, examples, and boundaries</h2>
        <p>Do not memorize the label alone. For each term, learn what it means, recognize one concrete example, and know the nearby idea it is commonly confused with.</p>
      </header>
      <div>{depth.vocabulary.map((definition, index) => <article key={definition.term}>
        <span>{String(index + 1).padStart(2, "0")} · Definition</span>
        <div>
          <h3>{definition.term}</h3>
          <p>{definition.meaning}</p>
          <p><strong>Example:</strong> {definition.example}</p>
          <p><strong>Common confusion or boundary:</strong> {definition.doNotConfuse}</p>
        </div>
      </article>)}</div>
    </section>

    <section id="complete-syllabus" className="complete-syllabus" aria-labelledby="complete-syllabus-title">
      <header><h2 id="complete-syllabus-title">Complete subtopic syllabus</h2><p>This is the boundary of the note. Use it as a checklist: every item is taught, applied, debugged, or tested below.</p></header>
      <div>{depth.coverage.map((group) => <section key={group.title}><h3>{group.title}</h3><p>{group.purpose}</p><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>
    </section>

    <section id="deep-chapters" className="lesson-theory-field" aria-labelledby="lesson-theory-title">
      <header><h2 id="lesson-theory-title">Theory, mechanisms, and trade-offs</h2><p>Start with the exact mechanism. Then ask what assumption it depends on, what it costs, and how it fails.</p></header>
      <div>{depth.chapters.map((chapter, index) => <article id={chapter.id} key={chapter.title}>
        <span>{String(index + 1).padStart(2, "0")} · {levelLabels[Math.min(index, levelLabels.length - 1)]}</span>
        <div><h3>{chapter.title}</h3><p className="chapter-plain"><strong>In plain English:</strong> {chapter.plainEnglish}</p><p>{chapter.explanation}</p>
          <h4>Follow the mechanism</h4><ol className="mechanism-steps">{chapter.mechanismSteps.map((step, stepIndex) => <li key={`${chapter.id}-${stepIndex}`}>{step}</li>)}</ol>
          <dl className="chapter-lenses">
            <div><dt>Why this matters</dt><dd>{chapter.whyItMatters}</dd></div>
            <div><dt>Connect it to the example</dt><dd>{chapter.exampleConnection}</dd></div>
            <div><dt>Common wrong turn</dt><dd>{chapter.commonWrongTurn}</dd></div>
            <div><dt>Prove you understand it</dt><dd>{chapter.masteryCheck}</dd></div>
          </dl>
        </div>
      </article>)}</div>
    </section>

    <section id="worked-example" className="worked-example-field">
      <header><h2>Worked example: {lesson.example.title}</h2></header>
      <p>Do not begin by copying the code. Predict the input, output, owned state, invariant, and first likely failure. Then compare your explanation with the implementation.</p>
      <pre tabIndex={0}><code className={`language-${lesson.example.language}`}>{lesson.example.code}</code></pre>
      <p><strong>What this demonstrates:</strong> {lesson.example.explanation}</p>
      <ol className="example-walkthrough">
        <li><strong>Frame the contract.</strong> {lesson.outcomes[0]}</li>
        <li><strong>Trace the mechanism.</strong> Start with {lesson.theory[0].heading.toLowerCase()} and account for every state change.</li>
        <li><strong>Protect the key idea.</strong> {lesson.keyIdea}</li>
        <li><strong>Try to break it.</strong> Test for {lesson.failureModes[0].toLowerCase()}.</li>
      </ol>
    </section>

    <section id="scenario-lab" className="scenario-lab" aria-labelledby="scenario-lab-title">
      <header><h2 id="scenario-lab-title">Applied scenario lab</h2><p>These variations turn one worked example into normal-path, boundary, debugging, and explanation practice.</p></header>
      <div>{depth.scenarios.map((scenario) => <details key={scenario.title}><summary>{scenario.title}</summary><div><p>{scenario.prompt}</p><h3>Model reasoning</h3><p>{scenario.answer}</p></div></details>)}</div>
    </section>

    <Pitfalls><dl className="confusion-clinic">{depth.misconceptions.map((item) => <div key={item.mistake}><dt>{item.mistake}</dt><dd><strong>Re-check {item.chapter}:</strong> {item.explanation} <strong>Recovery check:</strong> {item.recovery}</dd></div>)}</dl></Pitfalls>

    <section id="question-ladder" className="question-ladder">
      <header><h2>Interview question ladder</h2><p>Answer each question aloud before opening the model reasoning. The order moves from definition to mechanism, application, debugging, and trade-offs.</p></header>
      <div>{depth.questionLadder.map((item) => <details key={item.level}><summary><span>{item.level}</span>{item.prompt}</summary><div><p>{item.answer}</p><p><strong>What proves depth:</strong> {item.proof}</p></div></details>)}</div>

      <h2>Graded interview case</h2>
      <InterviewPrompt title={lesson.question.prompt} timebox={`${lesson.question.timeboxMinutes} min`} difficulty={lesson.question.difficulty}>
        <p>Answer aloud or in the practice workspace before revealing guidance. State assumptions, trace one example, and name the failure mode that would change your answer.</p>
        <Hint><ul>{lesson.question.hints.map((hint) => <li key={hint}>{hint}</li>)}</ul></Hint>
        <Solution><p>{lesson.question.answer}</p><h4>Strong-answer scoring rubric</h4><ul>{lesson.question.rubric.map((item) => <li key={item}>{item}</li>)}</ul></Solution>
      </InterviewPrompt>
    </section>

    <Flashcards cards={depth.flashcards} />
    <div id="revision-sheet"><RevisionSheet>
      <p><strong>Thirty-second answer:</strong> {lesson.keyIdea}</p>
      <h3>Explain without notes</h3><ul>{lesson.conceptMap.map((item) => <li key={item}>{item}</li>)}</ul>
      <h3>Trace or derive</h3><ul>{lesson.theory.map((section) => <li key={section.heading}>{section.heading}</li>)}</ul>
      <h3>Apply and debug</h3><ul>{lesson.outcomes.map((item) => <li key={item}>{item}</li>)}{lesson.failureModes.map((item) => <li key={item}>Diagnose: {item}</li>)}</ul>
      <h3>Final closed-book checklist</h3><ul>{depth.revisionChecklist.map((item) => <li key={item}>{item}</li>)}</ul>
    </RevisionSheet></div>
    <Sources><ul>{lesson.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer">{source.label}</a></li>)}</ul><p><small>{reviewNote}</small></p></Sources>
  </>;
}
