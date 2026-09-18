import type { Question, TopicLevel } from "@/lib/schema";

export interface FoundationLessonData {
  summary: string;
  durationMinutes: number;
  level: TopicLevel;
  roleIds: string[];
  prerequisites: string[];
  outcomes: string[];
  conceptMap: string[];
  keyIdea: string;
  analogy: { title: string; body: string };
  theory: Array<{ heading: string; body: string }>;
  example: { title: string; language: string; code: string; explanation: string };
  failureModes: string[];
  question: Omit<Question, "topicId" | "trackId">;
  flashcards: Array<{ front: string; back: string }>;
  revision: string[];
  sources: Array<{ label: string; url: string }>;
}

export type FoundationLessonMap = Record<string, FoundationLessonData>;
