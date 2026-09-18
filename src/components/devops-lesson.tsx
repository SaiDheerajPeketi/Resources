import { CurriculumLesson } from "@/components/curriculum-lesson";
import { devopsLessons } from "@/data/devops-lessons";

export function DevopsLesson({ topicId }: { topicId: string }) {
  const lesson = devopsLessons[topicId];
  if (!lesson) throw new Error(`Unknown DevOps lesson: ${topicId}`);
  return <CurriculumLesson lesson={lesson} reviewNote="Reviewed 18 September 2026. Cloud and platform behavior changes; verify current provider documentation." />;
}
