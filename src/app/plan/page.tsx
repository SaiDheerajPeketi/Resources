import type { Metadata } from "next";
import { PlanClient } from "@/components/plan-client";
export const metadata: Metadata = { title: "Study plan" };
export default function PlanPage() { return <main id="main-content" className="tool-page wide-tool-page"><header className="tool-page-title"><h1>Prerequisite-aware study plan</h1><p>Every item says why it was selected. Save plans locally and change direction whenever the role changes.</p></header><PlanClient /></main>; }
