import { describe, expect, it } from "vitest";
import { foundationLessons } from "@/data/foundation-lessons";
import { topicById } from "@/data/catalog";
import { QuestionSchema } from "@/lib/schema";

describe("foundation lesson contract", () => {
  it("authors every foundation topic not already supplied by the hash-table field note", () => {
    expect(Object.keys(foundationLessons)).toHaveLength(23);
    for (const topicId of Object.keys(foundationLessons)) {
      expect(topicById.get(topicId)?.publicationStatus).toBe("published");
    }
  });

  it("provides theory, practice, revision, and source material", () => {
    for (const [topicId, lesson] of Object.entries(foundationLessons)) {
      expect(lesson.conceptMap.length).toBeGreaterThanOrEqual(4);
      expect(lesson.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(lesson.theory.length).toBeGreaterThanOrEqual(3);
      expect(lesson.failureModes.length).toBeGreaterThanOrEqual(4);
      expect(lesson.flashcards.length).toBeGreaterThanOrEqual(3);
      expect(lesson.revision.length).toBeGreaterThanOrEqual(5);
      expect(lesson.sources.length).toBeGreaterThanOrEqual(2);
      expect(() => QuestionSchema.parse({ ...lesson.question, topicId, trackId: "foundations" })).not.toThrow();
    }
  });
});
