import { describe, expect, it } from "vitest";
import { sdeLessons } from "@/data/sde-lessons";

describe("SDE and systems lesson corpus", () => {
  it("contains every new structured specialist lesson", () => {
    expect(Object.keys(sdeLessons)).toHaveLength(24);
  });

  it("meets the complete lesson contract", () => {
    for (const lesson of Object.values(sdeLessons)) {
      expect(lesson.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(lesson.conceptMap.length).toBeGreaterThanOrEqual(4);
      expect(lesson.theory.length).toBeGreaterThanOrEqual(3);
      expect(lesson.failureModes.length).toBeGreaterThanOrEqual(4);
      expect(lesson.flashcards.length).toBeGreaterThanOrEqual(3);
      expect(lesson.revision.length).toBeGreaterThanOrEqual(5);
      expect(lesson.sources.length).toBeGreaterThanOrEqual(2);
      expect(lesson.question.answer.length).toBeGreaterThan(80);
    }
  });
});
