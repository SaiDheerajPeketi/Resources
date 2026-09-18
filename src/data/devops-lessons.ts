import { cloudLessons } from "@/data/devops-lessons/cloud";
import { devopsCoreLessons } from "@/data/devops-lessons/core";
import { platformLessons } from "@/data/devops-lessons/platform";
import { srePlatformLessons } from "@/data/devops-lessons/sre";
import type { FoundationLessonMap } from "@/data/foundations/types";

export const devopsLessons: FoundationLessonMap = {
  ...devopsCoreLessons,
  ...platformLessons,
  ...srePlatformLessons,
  ...cloudLessons
};
