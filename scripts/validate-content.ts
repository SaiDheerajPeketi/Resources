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
import { commands, technologies, technologySources } from "../src/data/technologies";
import { dsaPatterns, dsaProblems, dsaSheets } from "../src/data/dsa";
import { coverageCrosswalks } from "../src/data/crosswalks";
import { companyGuides, companySources } from "../src/data/companies";
import { diagnostics, diagnosticQuestions, rolePathRecords } from "../src/data/learning";

const errors: string[] = [];
const technologyIds = new Set(technologies.map((item) => item.id));
const commandIds = new Set(commands.map((item) => item.id));
const sourceIds = new Set(technologySources.map((item) => item.id));
for (const technology of technologies) {
  if (technology.commandIds.length < 12 || technology.workedExamples.length < 3 || technology.questions.length < 8 || technology.sourceIds.length < 3) errors.push(`Technology ${technology.id} is missing its reference contract.`);
  if (technology.learningPath.length < 4 || technology.theorySections.length < 4 || technology.misconceptions.length < 4 || technology.revisionChecklist.length < 8) errors.push(`Technology ${technology.id} is missing its depth and revision contract.`);
  if (technology.questions.some((question) => !question.whyTricky || question.rubric.length < 2)) errors.push(`Technology ${technology.id} has an incomplete tricky-question rubric.`);
  if (technology.flashcards.length < 8 || technology.cheatsheet.length < 3) errors.push(`Technology ${technology.id} has an incomplete recall contract.`);
  for (const id of technology.commandIds) if (!commandIds.has(id)) errors.push(`Technology ${technology.id} references unknown command ${id}.`);
  for (const id of technology.sourceIds) if (!sourceIds.has(id)) errors.push(`Technology ${technology.id} references unknown source ${id}.`);
  for (const id of technology.prerequisites) if (!technologyIds.has(id)) errors.push(`Technology ${technology.id} references unknown prerequisite ${id}.`);
}
const completeTechnologyIds = new Set(technologies.filter((technology) => technology.depthStatus === "complete").map((technology) => technology.id));
for (const id of ["java", "oop-and-lld", "dbms", "operating-systems", "computer-networks"]) if (!completeTechnologyIds.has(id)) errors.push(`Core depth manual ${id} is not marked complete.`);
const patternIds = new Set(dsaPatterns.map((item) => item.id));
const problemIds = new Set(dsaProblems.map((item) => item.id));
for (const problem of dsaProblems) {
  if (!patternIds.has(problem.patternId)) errors.push(`Problem ${problem.id} references unknown pattern ${problem.patternId}.`);
  if (problem.variantLanguages.length !== new Set(problem.variantLanguages).size) errors.push(`Problem ${problem.id} repeats a code variant.`);
}
for (const sheet of dsaSheets) for (const id of sheet.problemIds) if (!problemIds.has(id)) errors.push(`Sheet ${sheet.id} references unknown problem ${id}.`);
for (const crosswalk of coverageCrosswalks) if (!problemIds.has(crosswalk.atlasProblemId)) errors.push(`Crosswalk ${crosswalk.id} references unknown problem ${crosswalk.atlasProblemId}.`);
const companySourceIds = new Set(companySources.map((source) => source.id));
for (const guide of companyGuides) for (const id of guide.sourceIds) if (!companySourceIds.has(id)) errors.push(`Company guide ${guide.id} references unknown source ${id}.`);
const diagnosticQuestionIds = new Set(diagnosticQuestions.map((question) => question.id));
for (const diagnostic of diagnostics) for (const id of diagnostic.questionIds) if (!diagnosticQuestionIds.has(id)) errors.push(`Diagnostic ${diagnostic.id} references unknown question ${id}.`);
for (const role of rolePathRecords) for (const id of role.technologyIds) if (!technologyIds.has(id)) errors.push(`Role path ${role.id} references unknown technology ${id}.`);
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
const staticRoutes = new Set(["/", "/atlas/", "/library/", "/sheets/", "/practice/", "/revision/", "/review/", "/diagnostic/", "/plan/", "/interview/", "/companies/", "/settings/", "/~offline/"]);
const trackIds = new Set(topics.map((topic) => topic.trackId));
const topicSlugs = new Set(topics.map((topic) => topic.slug));
const isKnownInternalRoute = (route: string) => staticRoutes.has(route)
  || /^\/generated\/(content-manifest|graph-manifest|search-index|pack-manifest|technology-manifest|command-manifest|problem-manifest|sheet-manifest|crosswalk-manifest|company-manifest|learning-manifest|coverage-manifest|completeness-report|content-freshness-report)\.json$/.test(route)
  || (/^\/tracks\/[^/]+\/$/.test(route) && trackIds.has(route.split("/")[2] as never))
  || (/^\/topics\/[^/]+\/[^/]+\/$/.test(route) && topicSlugs.has(route.slice(8, -1)))
  || (/^\/technologies\/[^/]+\/$/.test(route) && technologyIds.has(route.split("/")[2]))
  || (/^\/sheets\/[^/]+\/$/.test(route) && dsaSheets.some((sheet) => sheet.id === route.split("/")[2]))
  || (/^\/problems\/[^/]+\/$/.test(route) && problemIds.has(route.split("/")[2]))
  || (/^\/companies\/[^/]+\/$/.test(route) && companyGuides.some((guide) => guide.id === route.split("/")[2]));
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
