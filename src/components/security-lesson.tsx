import { CurriculumLesson } from "@/components/curriculum-lesson";
import { securityLessons } from "@/data/security-lessons";

export function SecurityLesson({ topicId }: { topicId: string }) {
  const lesson = securityLessons[topicId];
  if (!lesson) throw new Error(`Unknown security lesson: ${topicId}`);
  return <CurriculumLesson lesson={lesson} reviewNote="Reviewed 18 September 2026. Educational material only; re-check current standards, threats, and jurisdictional requirements." />;
}
