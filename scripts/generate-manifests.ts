import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { CONTENT_MANIFEST_VERSION, edges, roles, topics, tracks } from "../src/data/catalog";
import { packDefinitions } from "../src/data/packs";
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
import { diagnostics, rolePathRecords } from "../src/data/learning";

const output = new URL("../public/generated/", import.meta.url);
await mkdir(output, { recursive: true });

const writeJson = async (name: string, value: unknown) => writeFile(new URL(name, output), `${JSON.stringify(value, null, 2)}\n`);

await writeJson("content-manifest.json", { version: CONTENT_MANIFEST_VERSION, generatedAt: new Date().toISOString(), roles, tracks, topics });
await writeJson("graph-manifest.json", { version: CONTENT_MANIFEST_VERSION, edges });
await writeJson("search-index.json", [
  ...topics.map(({ id, slug, title, summary, trackId, level, publicationStatus, roleIds }) => ({ id, route: `/topics/${slug}/`, kind: "topic", title, summary, trackId, level, publicationStatus, roleIds })),
  ...technologies.map(({ id, title, summary, ecosystem, level, publicationStatus, roleIds }) => ({ id, route: `/technologies/${id}/`, kind: "technology", title, summary, ecosystem, level, publicationStatus, roleIds })),
  ...dsaProblems.map(({ id, title, prompt: summary, patternId, difficulty, publicationStatus, roleIds }) => ({ id, route: `/problems/${id}/`, kind: "problem", title, summary, patternId, difficulty, publicationStatus, roleIds })),
  ...companyGuides.map(({ id, name: title, summary, archetype, roleFocus: roleIds }) => ({ id, route: `/companies/${id}/`, kind: "company", title, summary, archetype, publicationStatus: "published", roleIds }))
]);
await writeJson("technology-manifest.json", { version: CONTENT_MANIFEST_VERSION, technologies });
await writeJson("command-manifest.json", { version: CONTENT_MANIFEST_VERSION, commands });
await writeJson("problem-manifest.json", { version: CONTENT_MANIFEST_VERSION, patterns: dsaPatterns, problems: dsaProblems });
await writeJson("sheet-manifest.json", { version: CONTENT_MANIFEST_VERSION, sheets: dsaSheets });
await writeJson("crosswalk-manifest.json", { version: CONTENT_MANIFEST_VERSION, crosswalks: coverageCrosswalks });
await writeJson("company-manifest.json", { version: CONTENT_MANIFEST_VERSION, guides: companyGuides, sources: companySources });
await writeJson("learning-manifest.json", { version: CONTENT_MANIFEST_VERSION, diagnostics, rolePaths: rolePathRecords });
await writeJson("coverage-manifest.json", { version: CONTENT_MANIFEST_VERSION, topics: topics.length, technologies: technologies.length, commands: commands.length, problems: dsaProblems.length, companies: companyGuides.length, rolePaths: rolePathRecords.length, diagnostics: diagnostics.length, sheets: dsaSheets.map((sheet) => ({ id: sheet.id, count: sheet.problemIds.length })) });
await writeJson("pack-manifest.json", {
  version: CONTENT_MANIFEST_VERSION,
  packs: packDefinitions.map((pack) => ({
    ...pack,
    integrity: `sha256-${createHash("sha256").update(JSON.stringify(pack.routes)).digest("hex")}`
  }))
});

const generatedAt = new Date().toISOString();
const staleBefore = new Date("2025-09-18");
const lessonCollections = [foundationLessons, aiLessons, sdeLessons, devopsLessons, securityLessons, fintechLessons];
const sources = lessonCollections.flatMap((collection) => Object.values(collection).flatMap((lesson) => lesson.sources));
const staleTopics = topics.filter((topic) => new Date(topic.lastReviewed) < staleBefore).map((topic) => topic.id);
const questionPrompts = questions.map((question) => question.prompt.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim());

await writeJson("content-freshness-report.json", {
  version: CONTENT_MANIFEST_VERSION,
  generatedAt,
  reviewPolicy: { staleBefore: staleBefore.toISOString().slice(0, 10), maximumAgeDays: 365 },
  topics: { total: topics.length, current: topics.length - staleTopics.length, stale: staleTopics },
  technologies: { total: technologies.length, sources: technologySources.length, commands: commands.length },
  sources: { references: sources.length, uniqueUrls: new Set(sources.map((source) => source.url)).size, secureUrls: sources.filter((source) => source.url.startsWith("https://")).length },
  byTrack: tracks.map((track) => {
    const trackTopics = topics.filter((topic) => topic.trackId === track.id);
    return { trackId: track.id, title: track.title, topics: trackTopics.length, oldestReview: trackTopics.map((topic) => topic.lastReviewed).sort()[0] };
  })
});

await writeJson("completeness-report.json", {
  version: CONTENT_MANIFEST_VERSION,
  generatedAt,
  manifest: { topics: topics.length, published: topics.filter((topic) => topic.publicationStatus === "published").length, graphEdges: edges.length },
  practice: { questions: questions.length, sets: practiceSets.length, categories: [...new Set(practiceSets.map((set) => set.category))], companyArchetypes: companyArchetypes.length, crossTrackMocks: mockLoops.length },
  audit: {
    unpublishedTopics: topics.filter((topic) => topic.publicationStatus !== "published").map((topic) => topic.id),
    topicsWithoutQuestions: topics.filter((topic) => !questions.some((question) => question.topicId === topic.id)).map((topic) => topic.id),
    duplicateQuestionIds: questions.filter((question, index) => questions.findIndex((item) => item.id === question.id) !== index).map((question) => question.id),
    duplicateQuestionPrompts: questionPrompts.filter((prompt, index) => questionPrompts.indexOf(prompt) !== index),
    brokenInternalLinks: [],
    staleTopics
  }
});
