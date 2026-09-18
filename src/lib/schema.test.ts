import { describe, expect, it } from "vitest";
import { ExportBundleSchema, ProgressStatusSchema, TopicMetaSchema } from "@/lib/schema";
import { topics } from "@/data/catalog";

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
});
