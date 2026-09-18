"use client";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { CalendarPlus, Check } from "lucide-react";
import { rolePathRecords } from "@/data/learning";
import { technologyById } from "@/data/technologies";
import { topicById } from "@/data/catalog";
import { getDB } from "@/lib/db";
import { initialReviewState } from "@/lib/review";
import type { PlanItem, StudyPlan } from "@/lib/schema";

export function PlanClient() {
  const [roleId, setRoleId] = useState(rolePathRecords[0].id);
  const [message, setMessage] = useState("");
  const plans = useLiveQuery(() => getDB().studyPlans.toArray(), [], []);
  const path = rolePathRecords.find((item) => item.id === roleId)!;
  const items: PlanItem[] = [
    ...path.foundationTopicIds.map((id, index) => ({ id: `${path.id}-topic-${index}`, resourceType: "topic" as const, resourceId: id, reason: `Foundation prerequisite for ${path.title}; study before stack-specific practice.`, prerequisiteIds: [], completed: false })),
    ...path.technologyIds.map((id, index) => ({ id: `${path.id}-tech-${index}`, resourceType: "technology" as const, resourceId: id, reason: `${technologyById.get(id)?.title ?? id} appears in the role's implementation or production boundary.`, prerequisiteIds: index ? [path.technologyIds[index - 1]] : path.foundationTopicIds, completed: false })),
    { id: `${path.id}-sheet`, resourceType: "sheet" as const, resourceId: path.sheetId, reason: "Timed pattern practice follows the foundation and stack pass.", prerequisiteIds: path.technologyIds.slice(0, 2), completed: false }
  ];
  async function save() { const plan: StudyPlan = { id: crypto.randomUUID(), title: `${path.title} interview plan`, roleId: path.id, createdAt: new Date().toISOString(), items }; await getDB().studyPlans.put(plan); const firstTechnology = path.technologyIds[0]; await getDB().reviewStates.put(initialReviewState("technology", firstTechnology)); setMessage("Plan saved locally. Its first technology was added to review."); }
  return <div className="plan-workbench"><aside><label>Target role<select value={roleId} onChange={(event) => setRoleId(event.target.value as typeof roleId)}>{rolePathRecords.map((role) => <option value={role.id} key={role.id}>{role.title}</option>)}</select></label><p>{path.reason}</p><button className="primary-action" onClick={save}><CalendarPlus size={17} /> Save local plan</button>{message && <p className="settings-message"><Check size={15} /> {message}</p>}<small>{plans.length} saved plan{plans.length === 1 ? "" : "s"}</small></aside><section><h2>{path.title} sequence</h2><ol>{items.map((item, index) => { const label = item.resourceType === "technology" ? technologyById.get(item.resourceId)?.title : item.resourceType === "topic" ? topicById.get(item.resourceId)?.title : item.resourceId.replace("-", " "); const href = item.resourceType === "technology" ? `/technologies/${item.resourceId}/` : item.resourceType === "topic" ? `/topics/${item.resourceId}/` : `/sheets/${item.resourceId}/`; return <li key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><div><h3><Link href={href}>{label}</Link></h3><p>{item.reason}</p>{item.prerequisiteIds.length > 0 && <small>After: {item.prerequisiteIds.map((id) => technologyById.get(id)?.title ?? topicById.get(id)?.title ?? id).join(", ")}</small>}</div></li>; })}</ol></section></div>;
}
