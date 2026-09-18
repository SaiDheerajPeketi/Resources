"use client";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { diagnostics, diagnosticQuestions } from "@/data/learning";
import { getDB } from "@/lib/db";

export function DiagnosticClient() {
  const diagnostic = diagnostics[0];
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [scores, setScores] = useState<Array<{ competencyId: string; score: number; evidence: string[] }> | null>(null);
  async function finish() {
    const nextScores = diagnostic.competencyIds.map((competencyId) => { const questions = diagnosticQuestions.filter((question) => question.competencyId === competencyId); const correct = questions.filter((question) => answers[question.id] === question.answer); return { competencyId, score: Math.round(correct.length / questions.length * 100), evidence: questions.map((question) => `${question.id}:${answers[question.id] === question.answer ? "correct" : "review"}`) }; });
    const result = { id: crypto.randomUUID(), diagnosticId: diagnostic.id, completedAt: new Date().toISOString(), scores: nextScores, answers: Object.fromEntries(Object.entries(answers).map(([id, value]) => [id, String(value)])) };
    await getDB().diagnosticResults.put(result); setScores(nextScores);
  }
  if (scores) return <section className="diagnostic-results"><h2>Your baseline</h2><p>These scores explain plan suggestions; they never change your manual confidence.</p><div>{scores.map((score) => <article key={score.competencyId}><strong>{score.competencyId.replace("-", " ")}</strong><span>{score.score}%</span><p>{score.score < 70 ? "Prioritize foundations and one worked example before timed practice." : "Keep this warm with interview practice and review."}</p></article>)}</div><Link className="primary-action" href="/plan/">Build an explainable plan</Link></section>;
  return <section className="diagnostic-form"><header><h2>{diagnostic.title}</h2><p>{diagnostic.summary}</p><span>{Object.keys(answers).length} / {diagnosticQuestions.length} answered</span></header>{diagnosticQuestions.map((question, index) => <fieldset key={question.id}><legend><span>{String(index + 1).padStart(2, "0")}</span>{question.prompt}</legend>{question.options.map((option, optionIndex) => <label key={option}><input type="radio" name={question.id} checked={answers[question.id] === optionIndex} onChange={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))} />{option}</label>)}</fieldset>)}<button className="primary-action" disabled={Object.keys(answers).length !== diagnosticQuestions.length} onClick={finish}><CheckCircle2 size={17} /> Score the diagnostic</button></section>;
}
