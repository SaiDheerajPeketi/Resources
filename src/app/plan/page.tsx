import type { Metadata } from "next";
import { PlanClient } from "@/components/plan-client";
export const metadata: Metadata = { title: "Study plan" };
export default function PlanPage() { return <main id="main-content" className="tool-page wide-tool-page"><header className="tool-page-title"><h1>Role roadmaps, basic to advanced</h1><p>Choose a target role to see prerequisites, technology order, deliberate practice, portfolio proof, readiness gates, interview rounds, common traps, and final revision checks. Save the full sequence locally whenever it fits your goal.</p></header><PlanClient /></main>; }
