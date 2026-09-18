import { algorithmLessons } from "@/data/foundations/algorithms";
import { engineeringLessons } from "@/data/foundations/engineering";
import { mathLessons } from "@/data/foundations/math";
import type { FoundationLessonData } from "@/data/foundations/types";

export type { FoundationLessonData } from "@/data/foundations/types";

export const foundationLessons: Record<string, FoundationLessonData> = {
  ...algorithmLessons,
  ...mathLessons,
  ...engineeringLessons
};
