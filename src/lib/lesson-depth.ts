import type { FoundationLessonData } from "@/data/foundations/types";
import { selectTeachingDefinitions, type TeachingDefinition } from "@/data/interview-vocabulary";

type CoverageGroup = { title: string; purpose: string; items: string[] };
type ChapterGuide = {
  id: string;
  title: string;
  plainEnglish: string;
  explanation: string;
  mechanismSteps: string[];
  whyItMatters: string;
  exampleConnection: string;
  commonWrongTurn: string;
  masteryCheck: string;
  keyTerms: TeachingDefinition[];
};
type PracticeScenario = { title: string; prompt: string; answer: string };
type LadderQuestion = { level: string; prompt: string; answer: string; proof: string };
type MisconceptionGuide = { mistake: string; recovery: string; explanation: string; chapter: string };

const at = <T,>(items: T[], index: number) => items[index % items.length];
const unique = (items: string[]) => [...new Set(items.map((item) => item.trim()).filter(Boolean))];
const ignoredWords = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "is", "of", "on", "or", "the", "to", "with"]);

function stem(word: string) {
  if (word.length > 4 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

function words(value: string) {
  return new Set(value.toLowerCase().match(/[a-z0-9]+/g)?.filter((word) => word.length > 2 && !ignoredWords.has(word)).map(stem) ?? []);
}

function bestMatch<T>(query: string, items: T[], text: (item: T) => string, fallbackIndex: number) {
  const queryWords = words(query);
  let best = items[fallbackIndex % items.length];
  let bestScore = 0;
  for (const item of items) {
    const candidateWords = words(text(item));
    const score = [...queryWords].filter((word) => candidateWords.has(word)).length;
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  return best;
}

function sentences(value: string) {
  return value.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((item) => item.trim()).filter(Boolean) ?? [value];
}

function anchor(value: string, index: number) {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `chapter-${index + 1}-${slug}`;
}

function uniqueDefinitions(items: TeachingDefinition[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.term.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function closestDefinitions(query: string, definitions: TeachingDefinition[], count = 2, minimumScore = 1) {
  const queryWords = words(query);
  return [...definitions]
    .map((definition, index) => ({
      definition,
      index,
      score: [...words(definition.term)].filter((word) => queryWords.has(word)).length * 5
        + [...words(definition.meaning)].filter((word) => queryWords.has(word)).length
    }))
    .filter(({ score }) => score >= minimumScore)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .slice(0, count)
    .map(({ definition }) => definition);
}

export function buildLessonDepth(lesson: FoundationLessonData, topicId = "foundations/field-note") {
  const curatedDefinitions = selectTeachingDefinitions(topicId, lesson);
  const lessonDefinitions: TeachingDefinition[] = lesson.flashcards.map((card, index) => ({
    term: card.front.replace(/[?：:]$/, ""),
    meaning: card.back.length >= 24
      ? card.back
      : `${card.back} In this topic, that idea appears here: ${lesson.theory[index % lesson.theory.length].body}`,
    example: lesson.theory[index % lesson.theory.length].body,
    doNotConfuse: lesson.failureModes[index % lesson.failureModes.length]
  }));
  const chapterDefinitions: TeachingDefinition[] = lesson.theory.map((section, index) => ({
    term: section.heading,
    meaning: section.body,
    example: `In “${lesson.example.title}”, this appears as follows: ${lesson.example.explanation}`,
    doNotConfuse: lesson.failureModes[index % lesson.failureModes.length]
  }));
  const teachingDefinitions = uniqueDefinitions([...curatedDefinitions, ...lessonDefinitions]);
  const vocabulary = uniqueDefinitions([...teachingDefinitions, ...chapterDefinitions]);

  const coverage: CoverageGroup[] = [
    {
      title: "Foundations and vocabulary",
      purpose: "Build the ideas you need before memorizing tools or interview phrases.",
      items: unique([...lesson.conceptMap, ...vocabulary.map((item) => item.term)])
    },
    {
      title: "Mechanisms and rules",
      purpose: "Trace what happens, what state changes, and which assumptions make the result valid.",
      items: lesson.theory.map((section) => section.heading)
    },
    {
      title: "Application and debugging",
      purpose: "Connect the theory to a concrete implementation, then deliberately test where it breaks.",
      items: [lesson.example.title, ...lesson.failureModes]
    },
    {
      title: "Interview proof",
      purpose: "Show that you can explain, apply, compare, and defend the topic without notes.",
      items: [...lesson.outcomes, ...lesson.revision]
    }
  ];

  const chapters: ChapterGuide[] = lesson.theory.map((section, index) => {
    const parsedSteps = sentences(section.body);
    const chapterText = `${section.heading} ${section.body}`;
    const relatedFailure = bestMatch(chapterText, lesson.failureModes, (item) => item, index);
    const relatedRevision = bestMatch(chapterText, lesson.revision, (item) => item, index);
    const relatedOutcome = bestMatch(chapterText, lesson.outcomes, (item) => item, index);
    const curatedTerms = closestDefinitions(chapterText, curatedDefinitions, 2, 5);
    const beginnerTerms = curatedTerms.length > 0 ? curatedTerms : closestDefinitions(chapterText, lessonDefinitions);
    const keyTerms = beginnerTerms.length > 0 ? beginnerTerms : closestDefinitions(chapterText, chapterDefinitions);
    return {
      id: anchor(section.heading, index),
      title: section.heading,
      plainEnglish: beginnerTerms.length > 0
        ? `${beginnerTerms[0].term}: ${beginnerTerms[0].meaning}`
        : `${at(lesson.conceptMap, index)}. ${lesson.analogy.body}`,
      explanation: section.body,
      mechanismSteps: parsedSteps.length >= 2 ? parsedSteps : [parsedSteps[0], `Now test that explanation against this failure: ${relatedFailure}`],
      whyItMatters: `${relatedOutcome}. This chapter supports the larger goal: ${lesson.summary}`,
      exampleConnection: `Use “${lesson.example.title}” to locate this idea in a real flow. ${lesson.example.explanation}`,
      commonWrongTurn: `${relatedFailure}. ${keyTerms[0]?.doNotConfuse ?? "Compare the claim with the exact guarantee in this chapter and identify which assumption no longer holds."}`,
      masteryCheck: `${relatedRevision}. A correct explanation should demonstrate: ${relatedOutcome}`,
      keyTerms
    };
  });

  const misconceptions: MisconceptionGuide[] = lesson.failureModes.map((mistake, index) => {
    const theory = bestMatch(mistake, lesson.theory, (section) => `${section.heading} ${section.body}`, index);
    const recovery = bestMatch(mistake, lesson.revision, (item) => item, index);
    const definition = closestDefinitions(`${mistake} ${theory.heading}`, vocabulary, 1)[0];
    const explanation = definition
      ? `${definition.doNotConfuse} The governing rule is: ${theory.body}`
      : theory.body;
    return { mistake, recovery, explanation, chapter: theory.heading };
  });

  const scenarios: PracticeScenario[] = [
    {
      title: "Trace the normal path",
      prompt: `Before reading the solution, narrate “${lesson.example.title}” from input to output. Name the state, rule, and invariant at every step.`,
      answer: `${lesson.example.explanation} Keep this principle visible while tracing it: ${lesson.keyIdea}`
    },
    {
      title: "Break one assumption",
      prompt: `Suppose this mistake occurs: ${at(lesson.failureModes, 0)}. What observation would reveal it, and where would you inspect first?`,
      answer: `Re-check “${misconceptions[0].chapter}”: ${misconceptions[0].explanation} Then verify this recovery checkpoint: ${misconceptions[0].recovery}`
    },
    {
      title: "Compare two design choices",
      prompt: `Compare “${at(lesson.theory, 0).heading}” with “${at(lesson.theory, 1).heading}”. Which assumption, cost, or failure mode makes the choice change?`,
      answer: `${at(lesson.theory, 0).body} ${at(lesson.theory, 1).body}`
    },
    {
      title: "Teach it without jargon",
      prompt: `Explain the topic using “${lesson.analogy.title}”, then state where that comparison stops being technically reliable.`,
      answer: `${lesson.analogy.body} ${lesson.analogy.limit ?? "The comparison builds intuition only; exact guarantees come from the mechanisms, invariants, constraints, and failure modes in the chapters."}`
    }
  ];

  const questionLadder: LadderQuestion[] = [
    {
      level: "Foundation",
      prompt: `Explain “${at(lesson.conceptMap, 0)}” in ordinary language. Why is it the right place to start?`,
      answer: `${lesson.keyIdea} ${at(lesson.theory, 0).body}`,
      proof: "A strong answer defines the idea, names the important state, and avoids unexplained jargon."
    },
    {
      level: "Mechanism",
      prompt: `Trace ${at(lesson.theory, 0).heading.toLowerCase()} step by step. What must remain true?`,
      answer: at(lesson.theory, 0).body,
      proof: `Connect the explanation to this checkpoint: ${at(lesson.revision, 0)}`
    },
    {
      level: "Comparison",
      prompt: `How do “${at(lesson.theory, 0).heading}” and “${at(lesson.theory, 1).heading}” differ, and why would that difference change a design decision?`,
      answer: `${at(lesson.theory, 0).body} ${at(lesson.theory, 1).body}`,
      proof: "A strong answer compares assumptions, guarantees, costs, and failure behavior—not only names."
    },
    {
      level: "Application",
      prompt: `Use “${lesson.example.title}” as the example. Which concept is doing the real work, and how would you verify the result?`,
      answer: `${lesson.example.explanation} The governing idea is: ${lesson.keyIdea}`,
      proof: `Your answer should demonstrate: ${at(lesson.outcomes, 0)}`
    },
    {
      level: "Debugging",
      prompt: `An implementation suffers from this failure: ${at(lesson.failureModes, 0)}. Give a prioritized investigation and correction.`,
      answer: `Re-check “${misconceptions[0].chapter}” to find the first broken assumption: ${misconceptions[0].explanation} Then verify: ${misconceptions[0].recovery}`,
      proof: "A strong answer reproduces the problem, checks the earliest violated assumption, and verifies the correction with a boundary case."
    },
    {
      level: "Advanced trade-off",
      prompt: `Defend this topic under scale, failure, and changing requirements. Which trade-off would you measure instead of guessing?`,
      answer: `${at(lesson.theory, lesson.theory.length - 1).body} Avoid ${at(lesson.failureModes, lesson.failureModes.length - 1).toLowerCase()}.`,
      proof: `Finish by proving: ${at(lesson.outcomes, lesson.outcomes.length - 1)}`
    }
  ];

  const flashcards = [
    ...lesson.flashcards,
    { front: "What is the one-sentence mental model?", back: lesson.keyIdea },
    ...vocabulary.slice(0, 10).map((definition) => ({
      front: `Define ${definition.term} and name its nearest confusion.`,
      back: `${definition.meaning} Example: ${definition.example} Boundary: ${definition.doNotConfuse}`
    })),
    ...lesson.conceptMap.map((concept, index) => ({
      front: `Explain: ${concept}`,
      back: at(lesson.theory, index).body
    }))
  ];

  const revisionChecklist = unique([
    lesson.keyIdea,
    ...lesson.conceptMap,
    ...lesson.outcomes,
    ...lesson.theory.map((section) => `Trace and explain: ${section.heading}`),
    ...vocabulary.map((definition) => `Define and distinguish ${definition.term}: ${definition.doNotConfuse}`),
    ...lesson.revision,
    ...lesson.failureModes.map((mode) => `Avoid and diagnose: ${mode}`)
  ]);

  const foundation = {
    whatItIs: lesson.summary,
    centralIdea: lesson.keyIdea,
    firstConcreteExample: `${lesson.example.title}: ${lesson.example.explanation}`,
    learningOrder: lesson.conceptMap.map((concept, index) => ({
      concept,
      explanation: lesson.theory[index % lesson.theory.length].body
    }))
  };

  return { foundation, vocabulary, coverage, chapters, scenarios, misconceptions, questionLadder, flashcards, revisionChecklist };
}
