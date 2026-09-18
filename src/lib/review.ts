import type { ReviewRating, ReviewState } from "@/lib/schema";

const ratingWeight: Record<ReviewRating, number> = { again: 1, hard: 2, good: 3, easy: 4 };
const stabilityFactor: Record<ReviewRating, number> = { again: 0.28, hard: 1.2, good: 2.4, easy: 4.2 };
const difficultyDelta: Record<ReviewRating, number> = { again: 1.2, hard: 0.45, good: -0.2, easy: -0.75 };
const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

export function initialReviewState(itemType: ReviewState["itemType"], itemId: string, now = new Date()): ReviewState {
  return { id: `${itemType}:${itemId}`, itemType, itemId, dueAt: now.toISOString(), stability: 1, difficulty: 5, repetitions: 0, updatedAt: now.toISOString() };
}

export function scheduleReview(state: ReviewState, rating: ReviewRating, now = new Date()): ReviewState {
  const elapsedDays = Math.max(0, (now.getTime() - new Date(state.updatedAt).getTime()) / 86_400_000);
  const retrievability = Math.exp(Math.log(0.9) * elapsedDays / Math.max(0.1, state.stability));
  const difficulty = clamp(state.difficulty + difficultyDelta[rating] + (5 - state.difficulty) * 0.05, 1, 10);
  const successGain = 1 + (1 - retrievability) * 0.8 + (10 - difficulty) * 0.035;
  const stability = rating === "again" ? Math.max(0.2, state.stability * stabilityFactor.again) : Math.max(0.3, state.stability * stabilityFactor[rating] * successGain);
  const intervalDays = Math.max(rating === "again" ? 0.04 : 1, stability * ({ again: 0.15, hard: 0.75, good: 1, easy: 1.35 } as const)[rating]);
  return { ...state, dueAt: new Date(now.getTime() + intervalDays * 86_400_000).toISOString(), stability: Number(stability.toFixed(3)), difficulty: Number(difficulty.toFixed(3)), repetitions: state.repetitions + 1, lastRating: rating, updatedAt: now.toISOString() };
}

export function reviewReason(state: ReviewState, now = new Date()) {
  const overdueDays = Math.max(0, Math.floor((now.getTime() - new Date(state.dueAt).getTime()) / 86_400_000));
  if (!state.repetitions) return "New item: establish the first memory-strength estimate.";
  if (overdueDays) return `Due ${overdueDays} day${overdueDays === 1 ? "" : "s"} ago; recall probability is decaying.`;
  return `Scheduled from stability ${state.stability.toFixed(1)} days and difficulty ${state.difficulty.toFixed(1)}.`;
}
