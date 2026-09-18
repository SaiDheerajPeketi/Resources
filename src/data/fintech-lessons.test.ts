import { describe, expect, it } from "vitest";
import { fintechLessons } from "@/data/fintech-lessons";

describe("fintech and quant lesson corpus", () => {
  it("contains every new structured specialist lesson", () => {
    expect(Object.keys(fintechLessons)).toHaveLength(24);
  });

  it("meets the complete lesson contract", () => {
    for (const lesson of Object.values(fintechLessons)) {
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
