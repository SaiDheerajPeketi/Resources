import type { Metadata } from "next";
import { PracticeClient } from "@/components/practice-client";

export const metadata: Metadata = { title: "Practice" };
export default function PracticePage() { return <main id="main-content" className="tool-page"><header className="tool-page-title"><h1>Practice field</h1><p>Original interview questions with timed prompts, progressive hints, solutions, and explicit rubrics.</p></header><PracticeClient /></main>; }
