import type { Metadata } from "next";
import { ReviewClient } from "@/components/review-client";
export const metadata: Metadata = { title: "Adaptive review" };
export default function ReviewPage() { return <main id="main-content" className="tool-page wide-tool-page"><header className="tool-page-title"><h1>Adaptive review queue</h1><p>An FSRS-style local scheduler estimates stability and difficulty. Ratings stay on this device and confidence remains manual.</p></header><ReviewClient /></main>; }
