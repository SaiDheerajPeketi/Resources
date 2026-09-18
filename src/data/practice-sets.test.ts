import { describe, expect, it } from "vitest";
import { companyArchetypes, mockLoops, practiceSets } from "@/data/practice-sets";
import { questionById, questions } from "@/data/questions";
import { simulationQuestions } from "@/data/simulation-questions";

describe("release seven interview simulations", () => {
  it("covers every requested practice category with original prompts", () => {
    expect(practiceSets).toHaveLength(11);
    expect(new Set(practiceSets.map((set) => set.category))).toEqual(new Set(["coding", "sql", "ai", "system-design", "fintech-case", "security", "devops", "behavioral", "estimation", "probability", "logic"]));
    expect(simulationQuestions).toHaveLength(17);
    expect(questions).toHaveLength(164);
  });

  it("keeps every curated question reference resolvable and unique inside its set", () => {
    for (const set of practiceSets) {
      expect(new Set(set.questionIds).size).toBe(set.questionIds.length);
      for (const questionId of set.questionIds) expect(questionById.has(questionId)).toBe(true);
    }
  });

  it("ships seven company archetypes and genuinely cross-track mocks", () => {
    expect(companyArchetypes).toHaveLength(7);
    expect(mockLoops).toHaveLength(4);
    for (const loop of mockLoops) {
      const trackIds = new Set(loop.questionIds.map((questionId) => questionById.get(questionId)?.trackId));
      expect(trackIds.size).toBeGreaterThanOrEqual(2);
    }
  });
});
