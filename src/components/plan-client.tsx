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
    reason: `${stage.title}: ${stage.objective}`,
    prerequisiteIds: index ? [resources[index - 1].resourceId] : [],
    completed: false
  }));
  items.push({ id: `${path.id}-sheet`, resourceType: "sheet", resourceId: path.sheetId, reason: "Timed pattern practice verifies recognition, implementation, testing, and explanation under interview constraints.", prerequisiteIds: path.technologyIds.slice(0, 2), completed: false });

  async function save() {
    const plan: StudyPlan = { id: crypto.randomUUID(), title: `${path.title} interview plan`, roleId: path.id, createdAt: new Date().toISOString(), items };
    await getDB().studyPlans.put(plan);
    await getDB().reviewStates.put(initialReviewState("technology", path.technologyIds[0]));
    setMessage("Full roadmap saved locally. Its first technology was added to review.");
  }

  return <div className="plan-workbench">
    <aside>
      <label>Target role<select value={roleId} onChange={(event) => setRoleId(event.target.value)}>{rolePathRecords.map((role) => <option value={role.id} key={role.id}>{role.title}</option>)}</select></label>
      <p>{path.summary}</p>
      <strong className="plan-aside-label">Why this sequence</strong><p>{path.reason}</p>
      <button className="primary-action" onClick={save}><CalendarPlus size={17} /> Save full roadmap</button>
      {message && <p className="settings-message"><Check size={15} /> {message}</p>}
      <small>{plans.length} saved plan{plans.length === 1 ? "" : "s"}</small>
    </aside>
    <section className="role-roadmap">
      <header><div><Route size={22} /><h2>{path.title} basic → advanced roadmap</h2></div><p>{path.outcomes.length} target capabilities · {path.stages.reduce((sum, stage) => sum + stage.estimatedHours, 0)} guided hours before independent revision</p></header>
      <div className="role-outcomes"><h3>End-state capabilities</h3><ul>{path.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div>
      <ol className="role-roadmap-stages">
        {path.stages.map((stage, index) => <li key={stage.id}>
          <header><span>{String(index + 1).padStart(2, "0")}</span><div><small>{stage.level} · about {stage.estimatedHours} hours</small><h3>{stage.title}</h3><p>{stage.objective}</p></div></header>
          <div className="role-stage-resources">
            {[...stage.topicIds.map((id) => ({ type: "topic" as const, id })), ...stage.technologyIds.map((id) => ({ type: "technology" as const, id }))].map(({ type, id }) => <Link key={`${type}-${id}`} href={resourceHref(type, id)}>{resourceLabel(type, id)}<ArrowRight size={14} /></Link>)}
            {stage.id.endsWith("-interview") && <Link href={resourceHref("sheet", path.sheetId)}>{resourceLabel("sheet", path.sheetId)}<ArrowRight size={14} /></Link>}
          </div>
          <div className="role-stage-grid">
            <section><h4>Understand</h4><ul>{stage.concepts.map((line) => <li key={line}>{line}</li>)}</ul></section>
            <section><h4>Deliberate practice</h4><ul>{stage.practice.map((line) => <li key={line}>{line}</li>)}</ul></section>
            <section><h4>Readiness gate</h4><ul>{stage.readinessGate.map((line) => <li key={line}>{line}</li>)}</ul></section>
          </div>
          <div className="role-stage-proof"><strong>Proof to build</strong><p>{stage.deliverable}</p></div>
          <details><summary>Interview checks</summary><ul>{stage.interviewPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul></details>
        </li>)}
      </ol>
      <div className="role-roadmap-closeout">
        <section><h3>Portfolio capstone: {path.portfolioProject.title}</h3><p>{path.portfolioProject.brief}</p><h4>Evidence to retain</h4><ul>{path.portfolioProject.evidence.map((line) => <li key={line}>{line}</li>)}</ul></section>
        <section><h3>Mock interview loop</h3><ol>{path.interviewLoop.map((line) => <li key={line}>{line}</li>)}</ol><h3>Failure modes to avoid</h3><ul>{path.failureModes.map((line) => <li key={line}>{line}</li>)}</ul></section>
      </div>
      <details className="role-readiness"><summary>Final readiness checklist</summary><ul>{path.readinessChecklist.map((line) => <li key={line}>{line}</li>)}</ul></details>
    </section>
  </div>;
}
