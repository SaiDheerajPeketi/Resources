import type { Metadata } from "next";
import { PracticeClient } from "@/components/practice-client";

export const metadata: Metadata = { title: "Practice" };
export default function PracticePage() { return <main id="main-content" className="tool-page"><header className="tool-page-title"><h1>Practice field</h1><p>Choose one of eleven interview sets or filter the complete original question bank. Every prompt includes a timebox, progressive hints, a solution, and an explicit rubric.</p></header><PracticeClient /></main>; }
