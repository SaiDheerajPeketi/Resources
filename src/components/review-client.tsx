"use client";
import { useLiveQuery } from "dexie-react-hooks";
import { getDB } from "@/lib/db";
import { initialReviewState, reviewReason, scheduleReview } from "@/lib/review";
import { technologyById } from "@/data/technologies";
import { dsaProblemById } from "@/data/dsa";
import type { ReviewRating, ReviewState } from "@/lib/schema";

const labels: Record<ReviewRating, string> = { again: "Again", hard: "Hard", good: "Good", easy: "Easy" };
const titleFor = (state: ReviewState) => state.itemType === "technology" ? technologyById.get(state.itemId)?.title : state.itemType === "problem" ? dsaProblemById.get(state.itemId)?.title : state.itemId;

export function ReviewClient() {
  const states = useLiveQuery(() => getDB().reviewStates.orderBy("dueAt").toArray(), [], []);
  const now = new Date(); const due = states.filter((state) => new Date(state.dueAt) <= now);
  async function rate(state: ReviewState, rating: ReviewRating) { await getDB().reviewStates.put(scheduleReview(state, rating, new Date())); }
  async function seed() { await getDB().reviewStates.bulkPut([initialReviewState("technology", "java"), initialReviewState("problem", "atlas-001")]); }
  return <div className="review-ledger">{states.length === 0 ? <section className="review-empty"><h2>No review items yet</h2><p>Plans and manual additions feed this local queue. Start with two representative items if you want to try it now.</p><button className="primary-action" onClick={seed}>Add Java and Atlas 001</button></section> : <><header><h2>{due.length} due now</h2><p>The queue uses local stability and difficulty estimates. It never changes topic confidence.</p></header>{states.map((state) => <article className={new Date(state.dueAt) <= now ? "is-due" : ""} key={state.id}><div><span>{state.itemType}</span><h3>{titleFor(state)}</h3><p>{reviewReason(state, now)}</p><small>Next: {new Date(state.dueAt).toLocaleString()}</small></div><div role="group" aria-label={`Rate recall for ${titleFor(state)}`}>{(Object.keys(labels) as ReviewRating[]).map((rating) => <button key={rating} onClick={() => rate(state, rating)}>{labels[rating]}</button>)}</div></article>)}</>}</div>;
}
