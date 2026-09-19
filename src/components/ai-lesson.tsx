import { CurriculumLesson } from "@/components/curriculum-lesson";
import { aiLessons } from "@/data/ai-lessons";

export function AiLesson({ topicId }: { topicId: string }) {
  const lesson = aiLessons[topicId];
  if (!lesson) throw new Error(`Unknown AI lesson: ${topicId}`);
  return <CurriculumLesson lesson={lesson} reviewNote="Reviewed 19 September 2026. Re-check current research, model, and provider documentation before production decisions." />;
}
