import { edges, publishedTopics, topicById, topics, validateCatalog } from "../src/data/catalog";
import { questions } from "../src/data/questions";
import { foundationLessons } from "../src/data/foundation-lessons";
import { aiLessons } from "../src/data/ai-lessons";
import { sdeLessons } from "../src/data/sde-lessons";
import { devopsLessons } from "../src/data/devops-lessons";
import { securityLessons } from "../src/data/security-lessons";
import { fintechLessons } from "../src/data/fintech-lessons";

const errors: string[] = [];
const structural = validateCatalog();
if (structural.duplicates.length) errors.push(`Duplicate topics: ${structural.duplicates.join(", ")}`);
if (structural.dangling.length) errors.push(`Dangling edges: ${structural.dangling.join(", ")}`);
if (structural.missingPrerequisites.length) errors.push(`Missing prerequisites: ${structural.missingPrerequisites.join(", ")}`);

const adjacency = new Map<string, string[]>();
for (const edge of edges.filter((edge) => edge.kind === "prerequisite")) {
  adjacency.set(edge.source, [...(adjacency.get(edge.source) ?? []), edge.target]);
}
const visiting = new Set<string>();
const visited = new Set<string>();
const visit = (id: string): boolean => {
  if (visiting.has(id)) return true;
  if (visited.has(id)) return false;
  visiting.add(id);
  for (const next of adjacency.get(id) ?? []) if (visit(next)) return true;
  visiting.delete(id);
  visited.add(id);
  return false;
};
if (topics.some((topic) => visit(topic.id))) errors.push("Prerequisite graph contains a cycle.");

for (const question of questions) {
  if (!topicById.has(question.topicId)) errors.push(`Question ${question.id} references unknown topic ${question.topicId}.`);
  if (!question.answer.trim() || !question.rubric.length) errors.push(`Question ${question.id} has no complete solution rubric.`);
}
const questionIds = new Set<string>();
for (const question of questions) {
  if (questionIds.has(question.id)) errors.push(`Duplicate question id ${question.id}.`);
  questionIds.add(question.id);
}
for (const topic of publishedTopics) {
  if (!questions.some((question) => question.topicId === topic.id)) errors.push(`Published topic ${topic.id} has no interview question.`);
}

for (const [topicId, lesson] of Object.entries(foundationLessons)) {
  const topic = topicById.get(topicId);
  if (!topic) errors.push(`Foundation lesson ${topicId} is absent from the manifest.`);
  if (topic?.publicationStatus !== "published") errors.push(`Foundation lesson ${topicId} is not published.`);
  if (lesson.conceptMap.length < 4 || lesson.outcomes.length < 3 || lesson.theory.length < 3) errors.push(`Foundation lesson ${topicId} has an incomplete theory contract.`);
  if (lesson.failureModes.length < 4 || lesson.flashcards.length < 3 || lesson.revision.length < 5) errors.push(`Foundation lesson ${topicId} has an incomplete revision contract.`);
  if (lesson.sources.length < 2 || lesson.sources.some((source) => !source.url.startsWith("https://"))) errors.push(`Foundation lesson ${topicId} has invalid source metadata.`);
}

for (const [topicId, lesson] of Object.entries(aiLessons)) {
  const topic = topicById.get(topicId);
  if (!topic) errors.push(`AI lesson ${topicId} is absent from the manifest.`);
  if (topic?.publicationStatus !== "published") errors.push(`AI lesson ${topicId} is not published.`);
  if (lesson.conceptMap.length < 4 || lesson.outcomes.length < 3 || lesson.theory.length < 3) errors.push(`AI lesson ${topicId} has an incomplete theory contract.`);
  if (lesson.failureModes.length < 4 || lesson.flashcards.length < 3 || lesson.revision.length < 5) errors.push(`AI lesson ${topicId} has an incomplete revision contract.`);
  if (lesson.sources.length < 2 || lesson.sources.some((source) => !source.url.startsWith("https://"))) errors.push(`AI lesson ${topicId} has invalid source metadata.`);
}

for (const [topicId, lesson] of Object.entries(sdeLessons)) {
  const topic = topicById.get(topicId);
  if (!topic) errors.push(`SDE lesson ${topicId} is absent from the manifest.`);
  if (topic?.publicationStatus !== "published") errors.push(`SDE lesson ${topicId} is not published.`);
  if (lesson.conceptMap.length < 4 || lesson.outcomes.length < 3 || lesson.theory.length < 3) errors.push(`SDE lesson ${topicId} has an incomplete theory contract.`);
  if (lesson.failureModes.length < 4 || lesson.flashcards.length < 3 || lesson.revision.length < 5) errors.push(`SDE lesson ${topicId} has an incomplete revision contract.`);
  if (lesson.sources.length < 2 || lesson.sources.some((source) => !source.url.startsWith("https://"))) errors.push(`SDE lesson ${topicId} has invalid source metadata.`);
}

for (const [collection, lessons] of [["DevOps", devopsLessons], ["Security", securityLessons]] as const) {
  for (const [topicId, lesson] of Object.entries(lessons)) {
    const topic = topicById.get(topicId);
    if (!topic) errors.push(`${collection} lesson ${topicId} is absent from the manifest.`);
    if (topic?.publicationStatus !== "published") errors.push(`${collection} lesson ${topicId} is not published.`);
    if (lesson.conceptMap.length < 4 || lesson.outcomes.length < 3 || lesson.theory.length < 3) errors.push(`${collection} lesson ${topicId} has an incomplete theory contract.`);
    if (lesson.failureModes.length < 4 || lesson.flashcards.length < 3 || lesson.revision.length < 5) errors.push(`${collection} lesson ${topicId} has an incomplete revision contract.`);
    if (lesson.sources.length < 2 || lesson.sources.some((source) => !source.url.startsWith("https://"))) errors.push(`${collection} lesson ${topicId} has invalid source metadata.`);
  }
}

for (const [topicId, lesson] of Object.entries(fintechLessons)) {
  const topic = topicById.get(topicId);
  if (!topic) errors.push(`Fintech lesson ${topicId} is absent from the manifest.`);
  if (topic?.publicationStatus !== "published") errors.push(`Fintech lesson ${topicId} is not published.`);
  if (lesson.conceptMap.length < 4 || lesson.outcomes.length < 3 || lesson.theory.length < 3) errors.push(`Fintech lesson ${topicId} has an incomplete theory contract.`);
  if (lesson.failureModes.length < 4 || lesson.flashcards.length < 3 || lesson.revision.length < 5) errors.push(`Fintech lesson ${topicId} has an incomplete revision contract.`);
  if (lesson.sources.length < 2 || lesson.sources.some((source) => !source.url.startsWith("https://"))) errors.push(`Fintech lesson ${topicId} has invalid source metadata.`);
}

const staleBefore = new Date("2025-09-18");
for (const topic of publishedTopics) {
  if (new Date(topic.lastReviewed) < staleBefore) errors.push(`Published topic ${topic.id} has stale review metadata.`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${topics.length} topics, ${edges.length} graph edges, ${questions.length} questions, and ${publishedTopics.length} published field notes.`);
