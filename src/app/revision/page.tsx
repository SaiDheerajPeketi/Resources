import type { Metadata } from "next";
import { RevisionClient } from "@/components/revision-client";
export const metadata: Metadata = { title: "Revision" };
export default function RevisionPage() { return <main id="main-content" className="tool-page"><header className="tool-page-title"><h1>Revision index</h1><p>User-controlled lists and notes. No streaks, hidden scoring, or automatic scheduling.</p></header><RevisionClient /></main>; }
