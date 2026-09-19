"use client";

import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { ArrowRight, CalendarPlus, Check, Route } from "lucide-react";
import { rolePathRecords } from "@/data/learning";
import { technologyById } from "@/data/technologies";
import { topicById } from "@/data/catalog";
import { getDB } from "@/lib/db";
import { initialReviewState } from "@/lib/review";
import type { PlanItem, StudyPlan } from "@/lib/schema";

const resourceLabel = (type: "topic" | "technology" | "sheet", id: string) => type === "technology" ? technologyById.get(id)?.title ?? id : type === "topic" ? topicById.get(id)?.title ?? id : id.replace("-", " ");
const resourceHref = (type: "topic" | "technology" | "sheet", id: string) => type === "technology" ? `/technologies/${id}/` : type === "topic" ? `/topics/${id}/` : `/sheets/${id}/`;
const levelLabel = { foundation: "beginner", interview: "interview practice", advanced: "advanced" } as const;

export function PlanClient() {
  const [roleId, setRoleId] = useState(rolePathRecords[0].id);
  const [message, setMessage] = useState("");
  const plans = useLiveQuery(() => getDB().studyPlans.toArray(), [], []);
  const path = rolePathRecords.find((item) => item.id === roleId)!;

  const stagedResources = path.stages.flatMap((stage) => [
    ...stage.topicIds.map((resourceId) => ({ stage, resourceType: "topic" as const, resourceId })),
    ...stage.technologyIds.map((resourceId) => ({ stage, resourceType: "technology" as const, resourceId }))
  ]);
  const seen = new Set<string>();
  const items: PlanItem[] = stagedResources.filter(({ resourceType, resourceId }) => {
    const key = `${resourceType}:${resourceId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map(({ stage, resourceType, resourceId }, index, resources) => ({
    id: `${path.id}-${resourceType}-${resourceId}`,
    resourceType,
    resourceId,
    reason: `${stage.title}: ${stage.plainEnglish}`,
    prerequisiteIds: index ? [resources[index - 1].resourceId] : [],
    completed: false
  }));
  items.push({ id: `${path.id}-sheet`, resourceType: "sheet", resourceId: path.sheetId, reason: "Use timed problems to practise recognizing a pattern, coding it, testing edge cases, and explaining your answer clearly.", prerequisiteIds: path.technologyIds.slice(0, 2), completed: false });

  async function save() {
    const plan: StudyPlan = { id: crypto.randomUUID(), title: `${path.title} interview plan`, roleId: path.id, createdAt: new Date().toISOString(), items };
    await getDB().studyPlans.put(plan);
    await getDB().reviewStates.put(initialReviewState("technology", path.technologyIds[0]));
    setMessage("Full roadmap saved locally. Its first technology was added to review.");
  }

  return <div className="plan-workbench">
    <aside>
      <label>Target role<select value={roleId} onChange={(event) => setRoleId(event.target.value)}>{rolePathRecords.map((role) => <option value={role.id} key={role.id}>{role.title}</option>)}</select></label>
      <p>{path.beginnerGuide.whatItIs}</p>
      <strong className="plan-aside-label">Why the order matters</strong><p>{path.beginnerGuide.whyItMatters}</p>
      <details className="plan-role-scope"><summary>See the complete role description</summary><p>{path.summary}</p><p>{path.reason}</p></details>
      <button className="primary-action" onClick={save}><CalendarPlus size={17} /> Save this roadmap</button>
      {message && <p className="settings-message"><Check size={15} /> {message}</p>}
      <small>{plans.length} saved plan{plans.length === 1 ? "" : "s"}</small>
    </aside>
    <section className="role-roadmap">
      <header><div><Route size={22} /><h2>{path.title}: beginner to interview-ready</h2></div><p>Five ordered steps · about {path.stages.reduce((sum, stage) => sum + stage.estimatedHours, 0)} guided hours before revision</p></header>
      <div className="role-beginner-guide">
        <section><h3>Think of the role like this</h3><p>{path.beginnerGuide.analogy}</p></section>
        <section><h3>Your first small project</h3><p>{path.beginnerGuide.firstStep}</p></section>
        <section className="role-key-terms"><h3>Three words to know</h3><dl>{path.beginnerGuide.keyTerms.map((entry) => <div key={entry.term}><dt>{entry.term}</dt><dd>{entry.meaning}</dd></div>)}</dl></section>
      </div>
      <div className="role-outcomes"><h3>By the end, you can...</h3><ul>{path.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div>
      <ol className="role-roadmap-stages">
        {path.stages.map((stage, index) => <li key={stage.id}>
          <header><span>{String(index + 1).padStart(2, "0")}</span><div><small>{levelLabel[stage.level]} · about {stage.estimatedHours} hours</small><h3>{stage.title}</h3><p>{stage.plainEnglish}</p><details className="technical-goal"><summary>See the exact technical goal</summary><p>{stage.objective}</p></details></div></header>
          <div className="role-stage-resources">
            {[...stage.topicIds.map((id) => ({ type: "topic" as const, id })), ...stage.technologyIds.map((id) => ({ type: "technology" as const, id }))].map(({ type, id }) => <Link key={`${type}-${id}`} href={resourceHref(type, id)}>{resourceLabel(type, id)}<ArrowRight size={14} /></Link>)}
            {stage.id.endsWith("-interview") && <Link href={resourceHref("sheet", path.sheetId)}>{resourceLabel("sheet", path.sheetId)}<ArrowRight size={14} /></Link>}
          </div>
          <div className="role-stage-grid">
            <section><h4>Learn these ideas</h4><ul>{stage.concepts.map((line) => <li key={line}>{line}</li>)}</ul></section>
            <section><h4>Do this yourself</h4><ul>{stage.practice.map((line) => <li key={line}>{line}</li>)}</ul></section>
            <section><h4>Move on when...</h4><ul>{stage.readinessGate.map((line) => <li key={line}>{line}</li>)}</ul></section>
          </div>
          <div className="role-stage-proof"><strong>Make this</strong><p>{stage.deliverable}</p></div>
          <details><summary>Questions you should be able to answer</summary><ul>{stage.interviewPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul></details>
        </li>)}
      </ol>
      <div className="role-roadmap-closeout">
        <section><h3>Final project: {path.portfolioProject.title}</h3><p>{path.portfolioProject.brief}</p><h4>What to save and show</h4><ul>{path.portfolioProject.evidence.map((line) => <li key={line}>{line}</li>)}</ul></section>
        <section><h3>Your mock interview rounds</h3><ol>{path.interviewLoop.map((line) => <li key={line}>{line}</li>)}</ol><h3>Common mistakes to avoid</h3><ul>{path.failureModes.map((line) => <li key={line}>{line}</li>)}</ul></section>
      </div>
      <details className="role-readiness"><summary>Ready-for-interview checklist</summary><ul>{path.readinessChecklist.map((line) => <li key={line}>{line}</li>)}</ul></details>
    </section>
  </div>;
}
