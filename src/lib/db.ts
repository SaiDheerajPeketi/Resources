import Dexie, { type EntityTable } from "dexie";
import {
  ExportBundleSchema,
  type ExportBundle,
  type DiagnosticResult,
  type ProgressStatus,
  type ReviewState,
  type StudyPlan
} from "@/lib/schema";
import { CONTENT_MANIFEST_VERSION, topics } from "@/data/catalog";
import { technologies } from "@/data/technologies";
import { dsaProblems, dsaSheets } from "@/data/dsa";

export interface ProgressRow { topicId: string; status: ProgressStatus; updatedAt: string }
export interface AttemptRow { id: string; questionId: string; correct: boolean | null; response: string; createdAt: string }
export interface BookmarkRow { topicId: string; createdAt: string }
export interface RevisionRow { id: string; name: string; itemType: "topic" | "technology" | "problem" | "sheet" | "command" | "question" | "flashcard"; itemId: string; createdAt: string }
export interface NoteRow { id: string; topicId: string; body: string; updatedAt: string }
export interface InstalledPackRow { packId: string; version: string; integrity: string; installedAt: string }
export interface TechnologyProgressRow { technologyId: string; status: ProgressStatus; updatedAt: string }
export interface ProblemProgressRow { problemId: string; status: ProgressStatus; language?: "cpp17" | "java" | "python" | "typescript"; updatedAt: string }

export class AtlasDB extends Dexie {
  progress!: EntityTable<ProgressRow, "topicId">;
  attempts!: EntityTable<AttemptRow, "id">;
  bookmarks!: EntityTable<BookmarkRow, "topicId">;
  revisionItems!: EntityTable<RevisionRow, "id">;
  notes!: EntityTable<NoteRow, "id">;
  installedPacks!: EntityTable<InstalledPackRow, "packId">;
  technologyProgress!: EntityTable<TechnologyProgressRow, "technologyId">;
  problemProgress!: EntityTable<ProblemProgressRow, "problemId">;
  diagnosticResults!: EntityTable<DiagnosticResult, "id">;
  studyPlans!: EntityTable<StudyPlan, "id">;
  reviewStates!: EntityTable<ReviewState, "id">;

  constructor() {
    super("interview-atlas");
    this.version(1).stores({
      progress: "topicId,status,updatedAt",
      attempts: "id,questionId,createdAt",
      bookmarks: "topicId,createdAt",
      revisionItems: "id,name,itemType,itemId,createdAt",
      notes: "id,topicId,updatedAt",
      installedPacks: "packId,version,installedAt"
    });
    this.version(2).stores({
      progress: "topicId,status,updatedAt",
      attempts: "id,questionId,createdAt",
      bookmarks: "topicId,createdAt",
      revisionItems: "id,name,itemType,itemId,createdAt",
      notes: "id,topicId,updatedAt",
      installedPacks: "packId,version,installedAt",
      technologyProgress: "technologyId,status,updatedAt",
      problemProgress: "problemId,status,language,updatedAt",
      diagnosticResults: "id,diagnosticId,completedAt",
      studyPlans: "id,roleId,createdAt",
      reviewStates: "id,itemType,itemId,dueAt,updatedAt"
    });
  }
}

let dbInstance: AtlasDB | undefined;
export function getDB() {
  if (typeof window === "undefined") throw new Error("The local study database is only available in the browser.");
  dbInstance ??= new AtlasDB();
  return dbInstance;
}

export async function setProgress(topicId: string, status: ProgressStatus) {
  await getDB().progress.put({ topicId, status, updatedAt: new Date().toISOString() });
}

export async function toggleBookmark(topicId: string) {
  const db = getDB();
  const existing = await db.bookmarks.get(topicId);
  if (existing) await db.bookmarks.delete(topicId);
  else await db.bookmarks.put({ topicId, createdAt: new Date().toISOString() });
  return !existing;
}

export async function addRevisionItem(itemId: string, itemType: RevisionRow["itemType"] = "topic", name = "Current revision") {
  const db = getDB();
  const normalizedName = name.trim() || "Current revision";
  const existing = await db.revisionItems.where("itemId").equals(itemId)
    .filter((row) => row.name === normalizedName && row.itemType === itemType)
    .first();
  if (existing) return existing;
  const row: RevisionRow = { id: crypto.randomUUID(), name: normalizedName, itemType, itemId, createdAt: new Date().toISOString() };
  await db.revisionItems.add(row);
  return row;
}

export async function exportStudyData(): Promise<ExportBundle> {
  const db = getDB();
  return {
    schemaVersion: 2,
    contentManifestVersion: CONTENT_MANIFEST_VERSION,
    exportedAt: new Date().toISOString(),
    progress: await db.progress.toArray(),
    technologyProgress: await db.technologyProgress.toArray(),
    problemProgress: await db.problemProgress.toArray(),
    attempts: await db.attempts.toArray(),
    bookmarks: await db.bookmarks.toArray(),
    revisionItems: await db.revisionItems.toArray(),
    notes: await db.notes.toArray(),
    installedPacks: await db.installedPacks.toArray(),
    diagnosticResults: await db.diagnosticResults.toArray(),
    studyPlans: await db.studyPlans.toArray(),
    reviewStates: await db.reviewStates.toArray()
  };
}

export async function importStudyData(input: unknown) {
  const bundle = ExportBundleSchema.parse(input);
  const knownTopicIds = new Set(topics.map((topic) => topic.id));
  const knownContentIds = new Set([...knownTopicIds, ...technologies.map((item) => item.id), ...dsaProblems.map((item) => item.id), ...dsaSheets.map((item) => item.id)]);
  const orphanedTopicIds = new Set<string>();
  bundle.progress.forEach((row) => { if (!knownTopicIds.has(row.topicId)) orphanedTopicIds.add(row.topicId); });
  bundle.bookmarks.forEach((row) => { if (!knownTopicIds.has(row.topicId)) orphanedTopicIds.add(row.topicId); });
  bundle.notes.forEach((row) => { if (!knownTopicIds.has(row.topicId)) orphanedTopicIds.add(row.topicId); });
  const orphanedContentIds = new Set<string>();
  bundle.revisionItems.forEach((row) => { if (!knownContentIds.has(row.itemId) && !["question", "flashcard", "command"].includes(row.itemType)) orphanedContentIds.add(row.itemId); });

  const v2 = bundle.schemaVersion === 2 ? bundle : { technologyProgress: [], problemProgress: [], diagnosticResults: [], studyPlans: [], reviewStates: [] };

  const db = getDB();
  await db.transaction("rw", [db.progress, db.attempts, db.bookmarks, db.revisionItems, db.notes, db.installedPacks, db.technologyProgress, db.problemProgress, db.diagnosticResults, db.studyPlans, db.reviewStates], async () => {
    await db.progress.bulkPut(bundle.progress);
    await db.attempts.bulkPut(bundle.attempts);
    await db.bookmarks.bulkPut(bundle.bookmarks);
    await db.revisionItems.bulkPut(bundle.revisionItems);
    await db.notes.bulkPut(bundle.notes);
    await db.installedPacks.bulkPut(bundle.installedPacks);
    await db.technologyProgress.bulkPut(v2.technologyProgress);
    await db.problemProgress.bulkPut(v2.problemProgress);
    await db.diagnosticResults.bulkPut(v2.diagnosticResults);
    await db.studyPlans.bulkPut(v2.studyPlans);
    await db.reviewStates.bulkPut(v2.reviewStates);
  });
  return { orphanedTopicIds: [...orphanedTopicIds], orphanedContentIds: [...orphanedContentIds], sourceManifestVersion: bundle.contentManifestVersion };
}

export function revisionItemsToMarkdown(items: RevisionRow[], titleById: Map<string, string>) {
  const groups = new Map<string, RevisionRow[]>();
  for (const item of items) groups.set(item.name, [...(groups.get(item.name) ?? []), item]);
  return ["# Interview Atlas revision lists", "", ...[...groups].flatMap(([name, rows]) => [
    `## ${name}`,
    "",
    ...rows.map((row) => `- [ ] ${titleById.get(row.itemId) ?? row.itemId} (${row.itemType})`),
    ""
  ])].join("\n");
}
