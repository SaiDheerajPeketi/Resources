import { describe, expect, it } from "vitest";
import { devopsLessons } from "@/data/devops-lessons";
import { securityLessons } from "@/data/security-lessons";

describe("DevOps, cloud, SRE, and security corpus", () => {
  it("contains every new structured specialist lesson", () => {
    expect(Object.keys(devopsLessons)).toHaveLength(23);
    expect(Object.keys(securityLessons)).toHaveLength(21);
  });

  it("meets the complete lesson contract", () => {
    for (const lesson of [...Object.values(devopsLessons), ...Object.values(securityLessons)]) {
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
