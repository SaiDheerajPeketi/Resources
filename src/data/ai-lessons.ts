import { appliedAiLessons } from "@/data/ai-lessons/applied";
import { classicalAiLessons } from "@/data/ai-lessons/classical";
import { deepLearningLessons } from "@/data/ai-lessons/deep-learning";
import { llmSystemLessons } from "@/data/ai-lessons/llm-systems";
import type { FoundationLessonMap } from "@/data/foundations/types";

export const aiLessons: FoundationLessonMap = {
  ...classicalAiLessons,
  ...deepLearningLessons,
  ...appliedAiLessons,
  ...llmSystemLessons
};
