import { describe, expect, it } from "vitest";
import { aiLessons } from "@/data/ai-lessons";
import { aiRoleMaps } from "@/data/ai-role-maps";

describe("AI and data lesson corpus", () => {
  it("contains every structured specialist lesson", () => {
    expect(Object.keys(aiLessons)).toHaveLength(25);
    expect(aiRoleMaps.map((role) => role.roleId)).toEqual([
      "ai-engineer", "ml-engineer", "data-scientist", "data-engineer", "mlops-engineer"
    ]);
  });

  it("meets the complete lesson contract", () => {
    for (const lesson of Object.values(aiLessons)) {
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
