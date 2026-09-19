import { CurriculumLesson } from "@/components/curriculum-lesson";
import { foundationLessons } from "@/data/foundation-lessons";

export function FoundationLesson({ topicId }: { topicId: string }) {
  const lesson = foundationLessons[topicId];
  if (!lesson) throw new Error(`Unknown foundation lesson: ${topicId}`);
  return <CurriculumLesson topicId={topicId} lesson={lesson} reviewNote="Reviewed 19 September 2026. Prefer the linked canonical material for details that may evolve." />;
}
