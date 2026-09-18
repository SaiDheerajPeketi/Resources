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
