"use client";
import { useState } from "react";
import type { CodeVariant } from "@/lib/schema";

type Language = CodeVariant["language"];
const labels: Record<Language, string> = { cpp17: "C++17", java: "Java", python: "Python", typescript: "TypeScript" };

export function ProblemSolution({ problemId, languages }: { problemId: string; languages: Language[] }) {
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [variant, setVariant] = useState<CodeVariant | null>(null);
  const [loading, setLoading] = useState(false);
  async function load(next: Language) {
    setLanguage(next); setLoading(true);
    const module = next === "cpp17" ? await import("@/data/solutions/cpp17") : next === "java" ? await import("@/data/solutions/java") : next === "python" ? await import("@/data/solutions/python") : await import("@/data/solutions/typescript");
    setVariant(module.solutions[problemId]); setLoading(false);
  }
  return <section className="problem-solution"><header><h2>Implementation scaffold</h2><div role="group" aria-label="Solution language">{languages.map((item) => <button key={item} className={language === item ? "is-active" : ""} onClick={() => load(item)}>{labels[item]}</button>)}</div></header>
    {!variant && <button className="primary-action" onClick={() => load(language)}>Load {labels[language]} artifact</button>}
    {loading ? <p>Loading the language-specific artifact…</p> : variant && <><pre><code>{variant.source}</code></pre><p>{variant.complexity}</p></>}
  </section>;
}
