import { CurriculumLesson } from "@/components/curriculum-lesson";
import { sdeLessons } from "@/data/sde-lessons";

export function SdeLesson({ topicId }: { topicId: string }) {
  const lesson = sdeLessons[topicId];
  if (!lesson) throw new Error(`Unknown SDE lesson: ${topicId}`);
  return <CurriculumLesson lesson={lesson} reviewNote="Reviewed 18 September 2026. Verify implementation-specific behavior against the current standard and official documentation." />;
}
