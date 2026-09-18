import { describe, expect, it } from "vitest";
import { initialReviewState, scheduleReview } from "@/lib/review";
describe("local review scheduling", () => {
  it("makes easy reviews later than hard reviews", () => { const now = new Date("2026-09-18T00:00:00.000Z"); const state = initialReviewState("technology", "java", now); expect(new Date(scheduleReview(state, "easy", now).dueAt).getTime()).toBeGreaterThan(new Date(scheduleReview(state, "hard", now).dueAt).getTime()); });
  it("keeps all FSRS-style state bounded", () => { const next = scheduleReview(initialReviewState("problem", "atlas-001"), "again"); expect(next.difficulty).toBeGreaterThanOrEqual(1); expect(next.difficulty).toBeLessThanOrEqual(10); expect(next.stability).toBeGreaterThan(0); });
});
