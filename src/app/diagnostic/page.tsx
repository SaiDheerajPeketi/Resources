import type { Metadata } from "next";
import { DiagnosticClient } from "@/components/diagnostic-client";
export const metadata: Metadata = { title: "Optional diagnostic" };
export default function DiagnosticPage() { return <main id="main-content" className="tool-page wide-tool-page"><header className="tool-page-title"><h1>Optional diagnostic</h1><p>Find a sensible starting point without blocking access to any resource. Results stay in this browser.</p></header><DiagnosticClient /></main>; }
