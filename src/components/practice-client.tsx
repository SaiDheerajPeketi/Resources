"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Clock3, Eye, Lightbulb, X } from "lucide-react";
import { questions } from "@/data/questions";
import { topicById, tracks } from "@/data/catalog";
import { getDB, setProgress } from "@/lib/db";
import type { TrackId } from "@/lib/schema";

export function PracticeClient() {
  const [track, setTrack] = useState<TrackId | "all">("all");
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const filtered = useMemo(() => questions.filter((question) => track === "all" || question.trackId === track), [track]);
  const question = filtered[index % Math.max(filtered.length, 1)];

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("topic");
    const matching = questions.find((item) => item.topicId === requested);
    if (matching) {
      setTrack(matching.trackId);
      const inTrack = questions.filter((item) => item.trackId === matching.trackId);
      setIndex(Math.max(0, inTrack.findIndex((item) => item.id === matching.id)));
    }
  }, []);

  const move = (direction: number) => {
    setIndex((current) => (current + direction + filtered.length) % filtered.length);
    setResponse(""); setHintCount(0); setShowAnswer(false);
  };
  const record = async (correct: boolean) => {
    const db = getDB();
    await db.attempts.add({ id: crypto.randomUUID(), questionId: question.id, correct, response, createdAt: new Date().toISOString() });
    await setProgress(question.topicId, correct ? "revising" : "practicing");
    move(1);
  };

  if (!question) return <p>No questions match this filter.</p>;
  const topic = topicById.get(question.topicId)!;
  return <div className="practice-layout">
    <aside className="practice-toolbar">
      <label>Track<select value={track} onChange={(event) => { setTrack(event.target.value as TrackId | "all"); setIndex(0); }}><option value="all">All tracks</option>{tracks.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
      <div className="practice-position"><strong>{index + 1}</strong><span>of {filtered.length}</span></div>
      <button onClick={() => move(-1)}><ChevronLeft size={17} /> Previous</button>
      <button onClick={() => move(1)}>Next <ChevronRight size={17} /></button>
    </aside>
    <section className="question-stage">
      <div className="question-meta"><span>{question.type}</span><span>{question.difficulty}</span><span><Clock3 size={14} /> {question.timeboxMinutes} min</span></div>
      <h1>{topic.title}</h1>
      <p className="question-prompt">{question.prompt}</p>
      <label className="response-box">Your answer<textarea value={response} onChange={(event) => setResponse(event.target.value)} placeholder="Write your reasoning before revealing help." /></label>
      <div className="question-actions">
        <button onClick={() => setHintCount((count) => Math.min(question.hints.length, count + 1))}><Lightbulb size={17} /> Hint {Math.min(hintCount + 1, question.hints.length)}</button>
        <button onClick={() => setShowAnswer(true)}><Eye size={17} /> Reveal solution</button>
      </div>
      {hintCount > 0 && <div className="hint-stack">{question.hints.slice(0, hintCount).map((hint, idx) => <p key={hint}><strong>Hint {idx + 1}</strong>{hint}</p>)}</div>}
      {showAnswer && <div className="answer-panel"><h2>Solution</h2><p>{question.answer}</p><h3>Scoring rubric</h3><ul>{question.rubric.map((item) => <li key={item}>{item}</li>)}</ul><div className="self-grade"><button className="incorrect" onClick={() => record(false)}><X size={17} /> Needs work</button><button className="correct" onClick={() => record(true)}><Check size={17} /> Got it</button></div></div>}
    </section>
  </div>;
}
