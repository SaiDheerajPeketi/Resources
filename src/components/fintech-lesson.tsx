import { CurriculumLesson } from "@/components/curriculum-lesson";
import { fintechLessons } from "@/data/fintech-lessons";

export function FintechLesson({ topicId }: { topicId: string }) {
  const lesson = fintechLessons[topicId];
  if (!lesson) throw new Error(`Unknown fintech lesson: ${topicId}`);
  return <CurriculumLesson lesson={lesson} reviewNote="Reviewed 18 September 2026. Educational material only—not legal, investment, trading, or financial advice. Verify current rules and product requirements." />;
}
