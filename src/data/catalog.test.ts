import { describe, expect, it } from "vitest";
import { edges, publishedTopics, topics, tracks, validateCatalog } from "@/data/catalog";
import { questions } from "@/data/questions";

describe("coverage catalog", () => {
  it("publishes the complete destination map without structural errors", () => {
    expect(tracks).toHaveLength(6);
    expect(topics.length).toBeGreaterThanOrEqual(140);
    expect(validateCatalog()).toEqual({ duplicates: [], dangling: [], missingPrerequisites: [] });
  });

  it("provides one finished vertical slice for every track", () => {
    for (const track of tracks) {
      expect(publishedTopics.some((topic) => topic.trackId === track.id)).toBe(true);
    }
  });

  it("publishes the complete shared-foundations and AI + Data packs", () => {
    expect(publishedTopics).toHaveLength(54);
    expect(publishedTopics.filter((topic) => topic.trackId === "foundations")).toHaveLength(24);
    expect(publishedTopics.filter((topic) => topic.trackId === "ai-data")).toHaveLength(26);
  });

  it("gives every published field note interview practice", () => {
    for (const topic of publishedTopics) {
      expect(questions.some((question) => question.topicId === topic.id)).toBe(true);
    }
  });

  it("keeps prerequisite edges acyclic", () => {
    const adjacency = new Map<string, string[]>();
    for (const edge of edges.filter((edge) => edge.kind === "prerequisite")) adjacency.set(edge.source, [...(adjacency.get(edge.source) ?? []), edge.target]);
    const visited = new Set<string>();
    const active = new Set<string>();
    const cycle = (id: string): boolean => {
      if (active.has(id)) return true;
      if (visited.has(id)) return false;
      active.add(id);
      if ((adjacency.get(id) ?? []).some(cycle)) return true;
      active.delete(id); visited.add(id); return false;
    };
    expect(topics.some((topic) => cycle(topic.id))).toBe(false);
  });
});
