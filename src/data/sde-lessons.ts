import { applicationLessons } from "@/data/sde-lessons/application";
import { coreCsLessons } from "@/data/sde-lessons/core";
import { designLessons } from "@/data/sde-lessons/design";
import { systemDesignLessons } from "@/data/sde-lessons/systems";
import type { FoundationLessonMap } from "@/data/foundations/types";

export const sdeLessons: FoundationLessonMap = {
  ...coreCsLessons,
  ...applicationLessons,
  ...designLessons,
  ...systemDesignLessons
};
