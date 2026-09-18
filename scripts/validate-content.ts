import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { edges, publishedTopics, topicById, topics, validateCatalog } from "../src/data/catalog";
import { questions } from "../src/data/questions";
import { companyArchetypes, mockLoops, practiceSets } from "../src/data/practice-sets";
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
if (publishedTopics.length !== topics.length) errors.push(`${topics.length - publishedTopics.length} manifest topics are not published.`);

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
const questionPrompts = new Map<string, string>();
for (const question of questions) {
  if (questionIds.has(question.id)) errors.push(`Duplicate question id ${question.id}.`);
  questionIds.add(question.id);
  const normalizedPrompt = question.prompt.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const previous = questionPrompts.get(normalizedPrompt);
  if (previous) errors.push(`Duplicate question prompt ${previous} and ${question.id}.`);
  questionPrompts.set(normalizedPrompt, question.id);
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

const practiceSetIds = new Set<string>();
for (const set of practiceSets) {
  if (practiceSetIds.has(set.id)) errors.push(`Duplicate practice set id ${set.id}.`);
  practiceSetIds.add(set.id);
  const uniqueQuestions = new Set(set.questionIds);
  if (uniqueQuestions.size !== set.questionIds.length) errors.push(`Practice set ${set.id} repeats a question.`);
  for (const questionId of set.questionIds) if (!questionIds.has(questionId)) errors.push(`Practice set ${set.id} references unknown question ${questionId}.`);
}

const archetypeIds = new Set<string>();
for (const archetype of companyArchetypes) {
  if (archetypeIds.has(archetype.id)) errors.push(`Duplicate company archetype id ${archetype.id}.`);
  archetypeIds.add(archetype.id);
  for (const setId of archetype.practiceSetIds) if (!practiceSetIds.has(setId)) errors.push(`Company archetype ${archetype.id} references unknown practice set ${setId}.`);
}

const mockIds = new Set<string>();
for (const mock of mockLoops) {
  if (mockIds.has(mock.id)) errors.push(`Duplicate mock loop id ${mock.id}.`);
  mockIds.add(mock.id);
  const tracks = new Set<string>();
  for (const questionId of mock.questionIds) {
    const question = questions.find((item) => item.id === questionId);
    if (!question) errors.push(`Mock loop ${mock.id} references unknown question ${questionId}.`);
    else tracks.add(question.trackId);
  }
  if (tracks.size < 2) errors.push(`Mock loop ${mock.id} is not cross-track.`);
}

const sourceRoot = new URL("../src/", import.meta.url).pathname;
const sourceFiles = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  if (entry.isDirectory()) return sourceFiles(path);
  return [".tsx", ".mdx"].includes(extname(path)) ? [path] : [];
});
const staticRoutes = new Set(["/", "/atlas/", "/practice/", "/revision/", "/interview/", "/settings/", "/~offline/"]);
const trackIds = new Set(topics.map((topic) => topic.trackId));
const topicSlugs = new Set(topics.map((topic) => topic.slug));
const isKnownInternalRoute = (route: string) => staticRoutes.has(route)
  || /^\/generated\/(content-manifest|graph-manifest|search-index|pack-manifest|completeness-report|content-freshness-report)\.json$/.test(route)
  || (/^\/tracks\/[^/]+\/$/.test(route) && trackIds.has(route.split("/")[2] as never))
  || (/^\/topics\/[^/]+\/[^/]+\/$/.test(route) && topicSlugs.has(route.slice(8, -1)));
for (const file of sourceFiles(sourceRoot)) {
  const source = readFileSync(file, "utf8");
  const links = [
    ...source.matchAll(/\bhref=["'](\/[^"'?#]*(?:\/)?)(?:\?[^"']*)?["']/g),
    ...source.matchAll(/\]\((\/[^)?#]*(?:\/)?)(?:\?[^)]*)?\)/g)
  ];
  for (const match of links) if (!isKnownInternalRoute(match[1])) errors.push(`Broken internal link ${match[1]} in ${file.slice(sourceRoot.length)}.`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${topics.length} topics, ${edges.length} graph edges, ${questions.length} questions, ${practiceSets.length} practice sets, ${companyArchetypes.length} company archetypes, ${mockLoops.length} cross-track mocks, and ${publishedTopics.length} published field notes.`);
