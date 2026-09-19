import { describe, expect, it } from "vitest";
import { aiLessons } from "@/data/ai-lessons";
import { devopsLessons } from "@/data/devops-lessons";
import { fintechLessons } from "@/data/fintech-lessons";
import { foundationLessons } from "@/data/foundation-lessons";
import { securityLessons } from "@/data/security-lessons";
import { sdeLessons } from "@/data/sde-lessons";
import { buildLessonDepth } from "@/lib/lesson-depth";

const lessons = {
  ...foundationLessons,
  ...aiLessons,
  ...sdeLessons,
  ...devopsLessons,
  ...securityLessons,
  ...fintechLessons
};

describe("full-depth field-note contract", () => {
  it("covers every generated field note", () => {
    expect(Object.keys(lessons)).toHaveLength(140);
  });

  it("turns every authored lesson into a complete study and interview resource", () => {
    for (const [topicId, lesson] of Object.entries(lessons)) {
      const depth = buildLessonDepth(lesson, topicId);
      expect(depth.foundation.whatItIs.length).toBeGreaterThan(50);
      expect(depth.foundation.learningOrder).toHaveLength(lesson.conceptMap.length);
      expect(depth.vocabulary.length).toBeGreaterThanOrEqual(8);
      expect(depth.coverage).toHaveLength(4);
      expect(depth.coverage.flatMap((group) => group.items).length).toBeGreaterThanOrEqual(16);
      expect(depth.chapters).toHaveLength(lesson.theory.length);
      expect(depth.chapters.length).toBeGreaterThanOrEqual(3);
      expect(depth.scenarios).toHaveLength(4);
      expect(depth.misconceptions).toHaveLength(lesson.failureModes.length);
      expect(depth.questionLadder).toHaveLength(6);
      expect(depth.flashcards.length).toBeGreaterThanOrEqual(8);
      expect(depth.revisionChecklist.length).toBeGreaterThanOrEqual(12);

      for (const definition of depth.vocabulary) {
        expect(definition.meaning.length).toBeGreaterThan(10);
        expect(definition.example.length).toBeGreaterThan(10);
        expect(definition.doNotConfuse.length).toBeGreaterThan(5);
      }

      for (const chapter of depth.chapters) {
        expect(chapter.explanation.length).toBeGreaterThanOrEqual(100);
        expect(chapter.mechanismSteps.length).toBeGreaterThanOrEqual(2);
        expect(chapter.whyItMatters.length).toBeGreaterThan(20);
        expect(chapter.exampleConnection.length).toBeGreaterThan(60);
        expect(chapter.commonWrongTurn.length).toBeGreaterThan(20);
        expect(chapter.masteryCheck.length).toBeGreaterThan(15);
        expect(chapter.keyTerms.length).toBeGreaterThan(0);
      }
    }
  });
});
