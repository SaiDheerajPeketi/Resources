import { describe, expect, it } from "vitest";
import { CompanyArchetypeSchema, ExportBundleSchema, ExportBundleV1Schema, MockLoopSchema, PracticeSetSchema, ProgressStatusSchema, TopicMetaSchema } from "@/lib/schema";
import { topics } from "@/data/catalog";
import { companyArchetypes, mockLoops, practiceSets } from "@/data/practice-sets";

describe("public data contracts", () => {
  it("validates every topic against the public schema", () => {
    expect(() => TopicMetaSchema.array().parse(topics)).not.toThrow();
  });

  it("accepts only declared progress states", () => {
    expect(ProgressStatusSchema.safeParse("confident").success).toBe(true);
    expect(ProgressStatusSchema.safeParse("mastered").success).toBe(false);
  });

  it("rejects malformed backup bundles", () => {
    expect(ExportBundleSchema.safeParse({ schemaVersion: 1 }).success).toBe(false);
  });

  it("continues to recognize schema-v1 backup structure", () => {
    const bundle = { schemaVersion: 1, contentManifestVersion: "old", exportedAt: "2026-09-18T00:00:00.000Z", progress: [], attempts: [], bookmarks: [], revisionItems: [], notes: [], installedPacks: [] };
    expect(ExportBundleV1Schema.safeParse(bundle).success).toBe(true);
    expect(ExportBundleSchema.safeParse(bundle).success).toBe(true);
  });

  it("validates practice sets, company archetypes, and cross-track mocks", () => {
    expect(() => PracticeSetSchema.array().parse(practiceSets)).not.toThrow();
    expect(() => CompanyArchetypeSchema.array().parse(companyArchetypes)).not.toThrow();
    expect(() => MockLoopSchema.array().parse(mockLoops)).not.toThrow();
  });
});
