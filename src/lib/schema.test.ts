import { describe, expect, it } from "vitest";
import { CompanyArchetypeSchema, ExportBundleSchema, MockLoopSchema, PracticeSetSchema, ProgressStatusSchema, TopicMetaSchema } from "@/lib/schema";
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

  it("validates practice sets, company archetypes, and cross-track mocks", () => {
    expect(() => PracticeSetSchema.array().parse(practiceSets)).not.toThrow();
    expect(() => CompanyArchetypeSchema.array().parse(companyArchetypes)).not.toThrow();
    expect(() => MockLoopSchema.array().parse(mockLoops)).not.toThrow();
  });
});
