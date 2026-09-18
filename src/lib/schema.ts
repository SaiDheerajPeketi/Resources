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

export const TechnologyKindSchema = z.enum([
  "language", "framework", "database", "runtime", "tool", "platform", "mobile", "data-ai", "web-api"
]);
export const EcosystemSchema = z.enum([
  "java", "javascript", "python", "dotnet", "go", "rust", "mobile", "data-ai", "database", "devops", "web", "systems"
]);
export const CommandSafetySchema = z.enum(["safe", "caution", "destructive"]);
export const VersionSupportSchema = z.object({
  policy: z.string().min(1),
  current: z.string().min(1),
  lts: z.string().optional(),
  minimum: z.string().optional()
});
export const CommandExampleSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  technologyId: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  command: z.string().min(1),
  purpose: z.string().min(1),
  platform: z.enum(["all", "linux", "macos", "windows", "container", "cloud"]),
  expectedResult: z.string().min(1),
  safety: CommandSafetySchema
});
export const CodeVariantSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  language: z.enum(["cpp17", "java", "python", "typescript"]),
  label: z.string().min(1),
  completeness: z.enum(["reference", "porting-blueprint"]),
  source: z.string().min(1),
  complexity: z.string().min(1)
});
export const CheatsheetSectionSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).min(2)
});
export const LearningStageSchema = z.object({
  level: z.enum(["basic", "intermediate", "advanced", "expert"]),
  title: z.string().min(1),
  objective: z.string().min(1),
  topics: z.array(z.string().min(1)).min(3)
});
export const TechnologyTheorySectionSchema = z.object({
  title: z.string().min(1),
  explanation: z.string().min(80),
  plainEnglish: z.string().min(40),
  analogy: z.string().min(40),
  analogyLimit: z.string().min(30),
  concreteExample: z.string().min(40),
  keyPoints: z.array(z.string().min(1)).min(3)
});
export const MisconceptionSchema = z.object({
  claim: z.string().min(1),
  correction: z.string().min(1),
  whyItHappens: z.string().min(1)
});
export const TechnologyMetaSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  kind: TechnologyKindSchema,
  ecosystem: EcosystemSchema,
  summary: z.string().min(1),
  publicationStatus: PublicationStatusSchema,
  level: TopicLevelSchema,
  prerequisites: z.array(z.string()),
  roleIds: z.array(z.string()).min(1),
  version: VersionSupportSchema,
  depthStatus: z.enum(["overview", "complete"]),
  mentalModel: z.string().min(1),
  learningPath: z.array(LearningStageSchema).min(4),
  theorySections: z.array(TechnologyTheorySectionSchema).min(4),
  misconceptions: z.array(MisconceptionSchema).min(4),
  revisionChecklist: z.array(z.string().min(1)).min(8),
  setup: z.array(z.string().min(1)).min(3),
  runtime: z.array(z.string().min(1)).min(3),
  testing: z.array(z.string().min(1)).min(2),
  debugging: z.array(z.string().min(1)).min(2),
  performance: z.array(z.string().min(1)).min(2),
  security: z.array(z.string().min(1)).min(2),
  failureModes: z.array(z.string().min(1)).min(3),
  commandIds: z.array(z.string()).min(12),
  workedExamples: z.array(z.object({ title: z.string().min(1), language: z.string().min(1), code: z.string().min(1), explanation: z.string().min(1) })).min(3),
  questions: z.array(z.object({
    prompt: z.string().min(1),
    difficulty: z.enum(["easy", "medium", "hard"]),
    answer: z.string().min(1),
    whyTricky: z.string().min(1),
    rubric: z.array(z.string().min(1)).min(2)
  })).min(8),
  flashcards: z.array(z.object({ front: z.string().min(1), back: z.string().min(1) })).min(8),
  cheatsheet: z.array(CheatsheetSectionSchema).min(3),
  sourceIds: z.array(z.string()).min(3),
  lastReviewed: z.string().date(),
  asOf: z.string().date()
});

export const DSAPatternSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  mentalModel: z.string().min(1),
  recognitionSignals: z.array(z.string().min(1)).min(2),
  invariants: z.array(z.string().min(1)).min(1)
});
export const DSAProblemSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  prompt: z.string().min(1),
  patternId: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  estimatedMinutes: z.number().int().positive(),
  roleIds: z.array(z.string()).min(1),
  companyTags: z.array(z.string()),
  sheetRanks: z.object({ atlas75: z.number().int().positive().optional(), atlas180: z.number().int().positive().optional(), atlas300: z.number().int().positive() }),
  constraints: z.array(z.string().min(1)).min(1),
  examples: z.array(z.object({ input: z.string().min(1), output: z.string().min(1), explanation: z.string().min(1) })).min(1),
  depthStatus: z.enum(["overview", "complete"]),
  learningObjectives: z.array(z.string().min(1)).min(3),
  analogy: z.object({ body: z.string().min(60), limit: z.string().min(30) }),
  hints: z.array(z.string().min(1)).min(2),
  naiveApproach: z.string().min(80),
  approach: z.string().min(1),
  proof: z.string().min(1),
  walkthrough: z.array(z.string().min(1)).min(3),
  complexity: z.object({ time: z.string().min(1), space: z.string().min(1), rationale: z.string().min(40) }),
  misconceptions: z.array(z.object({ claim: z.string().min(1), correction: z.string().min(1) })).min(3),
  followUps: z.array(z.string().min(1)).min(2),
  edgeCases: z.array(z.string().min(1)).min(2),
  variantLanguages: z.array(z.enum(["cpp17", "java", "python", "typescript"])).min(1),
  practiceSource: z.enum(["leetcode", "gfg"]),
  practiceLabel: z.string().min(1),
  practiceUrl: z.string().url(),
  practiceDirect: z.boolean(),
  sourceArtifact: z.string().min(1),
  publicationStatus: PublicationStatusSchema,
  lastReviewed: z.string().date()
});
export const DSASheetSchema = z.object({
  id: z.enum(["atlas-75", "atlas-180", "atlas-300"]),
  title: z.string().min(1),
  summary: z.string().min(1),
  problemIds: z.array(z.string()).min(1),
  supersetOf: z.string().optional()
});
export const CoverageCrosswalkSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  atlasProblemId: z.string().min(1),
  source: z.enum(["striver-a2z", "codehelp-babbar", "neetcode", "gfg"]),
  topicLabel: z.string().min(1),
  url: z.string().url(),
  note: z.string().min(1)
});

export const CompetencyScoreSchema = z.object({ competencyId: z.string(), score: z.number().min(0).max(100), evidence: z.array(z.string()) });
export const DiagnosticResultSchema = z.object({ id: z.string(), diagnosticId: z.string(), completedAt: z.string().datetime(), scores: z.array(CompetencyScoreSchema), answers: z.record(z.string(), z.string()) });
export const DiagnosticSchema = z.object({ id: z.string().regex(/^[a-z0-9-]+$/), title: z.string(), summary: z.string(), questionIds: z.array(z.string()).min(3), competencyIds: z.array(z.string()).min(1) });
export const PlanItemSchema = z.object({ id: z.string(), resourceType: z.enum(["topic", "technology", "problem", "sheet", "review"]), resourceId: z.string(), reason: z.string(), prerequisiteIds: z.array(z.string()), completed: z.boolean() });
export const StudyPlanSchema = z.object({ id: z.string(), title: z.string(), roleId: z.string(), createdAt: z.string().datetime(), items: z.array(PlanItemSchema).min(1) });
export const RoadmapStageSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  level: z.enum(["foundation", "interview", "advanced"]),
  objective: z.string().min(80),
  prerequisites: z.array(z.string().min(1)).min(1),
  topicIds: z.array(z.string()).default([]),
  technologyIds: z.array(z.string()).default([]),
  concepts: z.array(z.string().min(20)).min(3),
  practice: z.array(z.string().min(20)).min(2),
  deliverable: z.string().min(60),
  readinessGate: z.array(z.string().min(20)).min(3),
  interviewPrompts: z.array(z.string().min(20)).min(2),
  estimatedHours: z.number().int().positive()
});
export const DomainRoadmapSchema = z.object({
  id: TrackIdSchema,
  title: z.string().min(1),
  summary: z.string().min(100),
  audience: z.string().min(60),
  outcomes: z.array(z.string().min(20)).min(5),
  stages: z.array(RoadmapStageSchema).min(5),
  capstone: z.object({ title: z.string().min(1), brief: z.string().min(100), evidence: z.array(z.string().min(20)).min(4) }),
  interviewLoop: z.array(z.string().min(30)).min(4),
  misconceptions: z.array(z.object({ claim: z.string().min(1), correction: z.string().min(40) })).min(4),
  revisionChecklist: z.array(z.string().min(20)).min(8),
  lastReviewed: z.string().date(),
  asOf: z.string().date()
});
export const RoleRoadmapSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  summary: z.string().min(100),
  reason: z.string().min(80),
  technologyIds: z.array(z.string()).min(6),
  foundationTopicIds: z.array(z.string()).min(3),
  sheetId: z.enum(["atlas-75", "atlas-180", "atlas-300"]),
  outcomes: z.array(z.string().min(20)).min(5),
  stages: z.array(RoadmapStageSchema).min(5),
  portfolioProject: z.object({ title: z.string().min(1), brief: z.string().min(100), evidence: z.array(z.string().min(20)).min(4) }),
  interviewLoop: z.array(z.string().min(30)).min(4),
  failureModes: z.array(z.string().min(30)).min(4),
  readinessChecklist: z.array(z.string().min(20)).min(8),
  lastReviewed: z.string().date()
});
export const ReviewRatingSchema = z.enum(["again", "hard", "good", "easy"]);
export const ReviewStateSchema = z.object({ id: z.string(), itemType: z.enum(["topic", "technology", "problem", "question", "flashcard"]), itemId: z.string(), dueAt: z.string().datetime(), stability: z.number().positive(), difficulty: z.number().min(1).max(10), repetitions: z.number().int().nonnegative(), lastRating: ReviewRatingSchema.optional(), updatedAt: z.string().datetime() });
export const InterviewRoundSchema = z.object({ title: z.string().min(1), format: z.string().min(1), focus: z.array(z.string()).min(1), preparation: z.array(z.string()).min(1) });
export const NamedCompanyGuideSchema = z.object({ id: z.string().regex(/^[a-z0-9-]+$/), name: z.string().min(1), archetype: z.string().min(1), summary: z.string().min(1), roleFocus: z.array(z.string()).min(1), rounds: z.array(InterviewRoundSchema).min(3), sourceIds: z.array(z.string()).min(1), lastReviewed: z.string().date(), asOf: z.string().date(), disclaimer: z.string().min(1) });

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
  id: z.string().regex(/^[a-z0-9-]+$/),
  kind: z.enum(["track", "ecosystem", "technology", "sheet", "role", "full"]),
  targetId: z.string().min(1),
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
  itemType: z.enum(["topic", "technology", "problem", "sheet", "command", "question", "flashcard"]),
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
  packId: z.string(),
  version: z.string(),
  integrity: z.string(),
  installedAt: z.string().datetime()
});

export const ExportBundleV1Schema = z.object({
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

export const TechnologyProgressSchema = z.object({ technologyId: z.string(), status: ProgressStatusSchema, updatedAt: z.string().datetime() });
export const ProblemProgressSchema = z.object({ problemId: z.string(), status: ProgressStatusSchema, language: z.enum(["cpp17", "java", "python", "typescript"]).optional(), updatedAt: z.string().datetime() });
export const ExportBundleV2Schema = z.object({
  schemaVersion: z.literal(2),
  contentManifestVersion: z.string(),
  exportedAt: z.string().datetime(),
  progress: z.array(TopicProgressSchema),
  technologyProgress: z.array(TechnologyProgressSchema),
  problemProgress: z.array(ProblemProgressSchema),
  attempts: z.array(AttemptSchema),
  bookmarks: z.array(BookmarkSchema),
  revisionItems: z.array(RevisionListSchema),
  notes: z.array(NoteSchema),
  installedPacks: z.array(InstalledPackSchema),
  diagnosticResults: z.array(DiagnosticResultSchema),
  studyPlans: z.array(StudyPlanSchema),
  reviewStates: z.array(ReviewStateSchema)
});
export const ExportBundleSchema = z.discriminatedUnion("schemaVersion", [ExportBundleV1Schema, ExportBundleV2Schema]);

export type TrackId = z.infer<typeof TrackIdSchema>;
export type TopicLevel = z.infer<typeof TopicLevelSchema>;
export type ProgressStatus = z.infer<typeof ProgressStatusSchema>;
export type RoleProfile = z.infer<typeof RoleProfileSchema>;
export type Track = z.infer<typeof TrackSchema>;
export type TopicMeta = z.infer<typeof TopicMetaSchema>;
export type ConceptEdge = z.infer<typeof ConceptEdgeSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type TechnologyKind = z.infer<typeof TechnologyKindSchema>;
export type Ecosystem = z.infer<typeof EcosystemSchema>;
export type VersionSupport = z.infer<typeof VersionSupportSchema>;
export type CommandExample = z.infer<typeof CommandExampleSchema>;
export type CodeVariant = z.infer<typeof CodeVariantSchema>;
export type CheatsheetSection = z.infer<typeof CheatsheetSectionSchema>;
export type TechnologyMeta = z.infer<typeof TechnologyMetaSchema>;
export type DSAPattern = z.infer<typeof DSAPatternSchema>;
export type DSAProblem = z.infer<typeof DSAProblemSchema>;
export type DSASheet = z.infer<typeof DSASheetSchema>;
export type CoverageCrosswalk = z.infer<typeof CoverageCrosswalkSchema>;
export type Diagnostic = z.infer<typeof DiagnosticSchema>;
export type DiagnosticResult = z.infer<typeof DiagnosticResultSchema>;
export type CompetencyScore = z.infer<typeof CompetencyScoreSchema>;
export type StudyPlan = z.infer<typeof StudyPlanSchema>;
export type PlanItem = z.infer<typeof PlanItemSchema>;
export type RoadmapStage = z.infer<typeof RoadmapStageSchema>;
export type DomainRoadmap = z.infer<typeof DomainRoadmapSchema>;
export type RoleRoadmap = z.infer<typeof RoleRoadmapSchema>;
export type ReviewState = z.infer<typeof ReviewStateSchema>;
export type ReviewRating = z.infer<typeof ReviewRatingSchema>;
export type NamedCompanyGuide = z.infer<typeof NamedCompanyGuideSchema>;
export type InterviewRound = z.infer<typeof InterviewRoundSchema>;
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
