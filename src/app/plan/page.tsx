import type { Metadata } from "next";
import { PlanClient } from "@/components/plan-client";
export const metadata: Metadata = { title: "Study plan" };
export default function PlanPage() { return <main id="main-content" className="tool-page wide-tool-page"><header className="tool-page-title"><h1>Choose a role. Follow one clear path.</h1><p>Start with the basics, build small projects, and move forward only when you can explain and use what you learned. The advanced detail is still here, but it appears after the beginner explanation.</p></header><PlanClient /></main>; }
