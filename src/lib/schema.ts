import { z } from "zod";

export const TrackIdSchema = z.enum([
  "foundations",
  "ai-data",
  "sde-systems",
  "devops-cloud",
  "cybersecurity",
  "fintech-quant"
]);
export const TopicLevelSchema = z.enum(["foundation", "interview", "advanced"]);
export const PublicationStatusSchema = z.enum(["published", "planned"]);
export const ProgressStatusSchema = z.enum(["unseen", "reading", "practicing", "revising", "confident"]);
export const PracticeCategorySchema = z.enum([
  "coding",
  "sql",
  "ai",
  "system-design",
  "fintech-case",
  "security",
  "devops",
  "behavioral",
  "estimation",
  "probability",
  "logic"
]);

export const RoleProfileSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  trackIds: z.array(TrackIdSchema).min(1)
});

export const TrackSchema = z.object({
  id: TrackIdSchema,
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  description: z.string().min(1),
  accent: z.string().regex(/^#[0-9A-F]{6}$/i),
  roleIds: z.array(z.string()).min(1)
});

export const TopicMetaSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+$/),
  localSlug: z.string().regex(/^[a-z0-9-]+$/),
  trackId: TrackIdSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  level: TopicLevelSchema,
  publicationStatus: PublicationStatusSchema,
  durationMinutes: z.number().int().positive(),
  roleIds: z.array(z.string()).min(1),
  prerequisites: z.array(z.string()),
  outcomes: z.array(z.string()),
  lastReviewed: z.string().date(),
  asOf: z.string().date().optional()
});

export const ConceptEdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  kind: z.enum(["prerequisite", "related", "applied-in"])
});

export const QuestionSchema = z.object({
  id: z.string().min(1),
  topicId: z.string().min(1),
  trackId: TrackIdSchema,
  type: z.enum(["mcq", "short", "coding", "system-design", "case", "behavioral", "puzzle"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  timeboxMinutes: z.number().int().positive(),
  prompt: z.string().min(1),
  choices: z.array(z.string()).optional(),
  hints: z.array(z.string()).min(1),
  answer: z.string().min(1),
  rubric: z.array(z.string()).min(1),
  tags: z.array(z.string()).min(1)
});

export const ModuleSchema = z.object({
  id: z.string().min(1),
  trackId: TrackIdSchema,
  title: z.string().min(1),
  topicIds: z.array(z.string().min(1)).min(1)
});
export const WorkedExampleSchema = z.object({
  title: z.string().min(1),
  language: z.string().min(1),
  code: z.string().min(1),
  explanation: z.string().min(1)
});
export const FlashcardSchema = z.object({ front: z.string().min(1), back: z.string().min(1) });
export const RevisionSheetSchema = z.object({
  topicId: z.string().min(1),
  summary: z.string().min(1),
  checkpoints: z.array(z.string().min(1)).min(3)
});
export const HintSchema = z.object({ order: z.number().int().positive(), body: z.string().min(1) });
export const SolutionSchema = z.object({ body: z.string().min(1), complexity: z.string().optional() });
export const RubricSchema = z.object({ criteria: z.array(z.string().min(1)).min(1) });
export const SourceRecordSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  kind: z.enum(["official-doc", "standard", "paper", "textbook", "regulator", "reference"]),
  lastReviewed: z.string().date(),
  asOf: z.string().date().optional()
});
export const LessonSchema = z.object({
  topicId: z.string().min(1),
  outcomes: z.array(z.string().min(1)).min(3),
  conceptMap: z.array(z.string().min(1)).min(4),
  mentalModel: z.string().min(1),
  theorySections: z.array(z.string().min(1)).min(3),
  workedExamples: z.array(WorkedExampleSchema).min(1),
  failureModes: z.array(z.string().min(1)).min(3),
  flashcards: z.array(FlashcardSchema).min(3),
  revisionSheet: RevisionSheetSchema,
  sourceIds: z.array(z.string().min(1)).min(1)
});
export const PracticeSetSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  category: PracticeCategorySchema,
  level: TopicLevelSchema,
  durationMinutes: z.number().int().positive(),
  trackIds: z.array(TrackIdSchema).min(1),
  questionIds: z.array(z.string().min(1)).min(3)
});
export const CompanyArchetypeSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  context: z.string().min(1),
  focus: z.array(z.string().min(1)).min(3),
  practiceSetIds: z.array(z.string().min(1)).min(2),
  rounds: z.array(z.object({ title: z.string().min(1), timeboxMinutes: z.number().int().positive(), signal: z.string().min(1) })).min(3)
});
export const MockLoopSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  durationMinutes: z.number().int().positive(),
  questionIds: z.array(z.string().min(1)).min(3),
  stages: z.array(z.object({ title: z.string().min(1), timeboxMinutes: z.number().int().positive(), evidence: z.string().min(1) })).min(3)
});
export const CloudServiceMappingSchema = z.object({
  capability: z.string().min(1),
  aws: z.string().min(1),
  azure: z.string().min(1),
  gcp: z.string().min(1),
  oci: z.string().min(1),
  caveat: z.string().min(1)
});

export const OfflinePackSchema = z.object({
  id: TrackIdSchema,
  title: z.string(),
  version: z.string(),
  integrity: z.string(),
  routes: z.array(z.string()).min(1),
  estimatedKb: z.number().int().positive()
});

export const TopicProgressSchema = z.object({
  topicId: z.string(),
  status: ProgressStatusSchema,
  updatedAt: z.string().datetime()
});
export const AttemptSchema = z.object({
  id: z.string(),
  questionId: z.string(),
  correct: z.boolean().nullable(),
  response: z.string(),
  createdAt: z.string().datetime()
});
export const BookmarkSchema = z.object({ topicId: z.string(), createdAt: z.string().datetime() });
export const RevisionListSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  itemType: z.enum(["topic", "question", "flashcard"]),
  itemId: z.string(),
  createdAt: z.string().datetime()
});
export const NoteSchema = z.object({
  id: z.string(),
  topicId: z.string(),
  body: z.string(),
  updatedAt: z.string().datetime()
});
export const InstalledPackSchema = z.object({
  packId: TrackIdSchema,
  version: z.string(),
  integrity: z.string(),
  installedAt: z.string().datetime()
});

export const ExportBundleSchema = z.object({
  schemaVersion: z.literal(1),
  contentManifestVersion: z.string(),
  exportedAt: z.string().datetime(),
  progress: z.array(TopicProgressSchema),
  attempts: z.array(AttemptSchema),
  bookmarks: z.array(BookmarkSchema),
  revisionItems: z.array(RevisionListSchema),
  notes: z.array(NoteSchema),
  installedPacks: z.array(InstalledPackSchema)
});

export type TrackId = z.infer<typeof TrackIdSchema>;
export type TopicLevel = z.infer<typeof TopicLevelSchema>;
export type ProgressStatus = z.infer<typeof ProgressStatusSchema>;
export type RoleProfile = z.infer<typeof RoleProfileSchema>;
export type Track = z.infer<typeof TrackSchema>;
export type TopicMeta = z.infer<typeof TopicMetaSchema>;
export type ConceptEdge = z.infer<typeof ConceptEdgeSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type OfflinePack = z.infer<typeof OfflinePackSchema>;
export type ExportBundle = z.infer<typeof ExportBundleSchema>;
export type PracticeCategory = z.infer<typeof PracticeCategorySchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type WorkedExample = z.infer<typeof WorkedExampleSchema>;
export type RevisionSheet = z.infer<typeof RevisionSheetSchema>;
export type Flashcard = z.infer<typeof FlashcardSchema>;
export type Hint = z.infer<typeof HintSchema>;
export type Solution = z.infer<typeof SolutionSchema>;
export type Rubric = z.infer<typeof RubricSchema>;
export type PracticeSet = z.infer<typeof PracticeSetSchema>;
export type CompanyArchetype = z.infer<typeof CompanyArchetypeSchema>;
export type MockLoop = z.infer<typeof MockLoopSchema>;
export type CloudServiceMapping = z.infer<typeof CloudServiceMappingSchema>;
export type SourceRecord = z.infer<typeof SourceRecordSchema>;
export type TopicProgress = z.infer<typeof TopicProgressSchema>;
export type Attempt = z.infer<typeof AttemptSchema>;
export type Bookmark = z.infer<typeof BookmarkSchema>;
export type RevisionList = z.infer<typeof RevisionListSchema>;
export type Note = z.infer<typeof NoteSchema>;
