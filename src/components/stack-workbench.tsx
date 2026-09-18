"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Boxes, CheckCircle2, Clock3, Layers3 } from "lucide-react";
import { technologies } from "@/data/technologies";
import type { Ecosystem } from "@/lib/schema";

const ecosystemLabels: Record<Ecosystem, string> = {
  java: "Java", javascript: "JavaScript", python: "Python", dotnet: ".NET", go: "Go", rust: "Rust", mobile: "Mobile", "data-ai": "Data + AI", database: "Databases", devops: "DevOps", web: "Web platform", systems: "Core systems"
};

export function StackWorkbench() {
  const ecosystems = [...new Set(technologies.map((technology) => technology.ecosystem))];
  const [ecosystem, setEcosystem] = useState<Ecosystem>(ecosystems[0] ?? "systems");
  const visible = useMemo(() => technologies.filter((technology) => technology.ecosystem === ecosystem), [ecosystem]);
  const [selectedId, setSelectedId] = useState(technologies[0]?.id ?? "");
  const selected = technologies.find((technology) => technology.id === selectedId && technology.ecosystem === ecosystem) ?? visible[0];

  function selectEcosystem(next: Ecosystem) {
    setEcosystem(next);
    setSelectedId(technologies.find((technology) => technology.ecosystem === next)?.id ?? "");
  }

  return <main id="main-content" className="workbench-shell">
    <aside className="workbench-index" aria-label="Technology ecosystems">
      <h1>Technology library</h1>
      <p>Choose an ecosystem, then inspect each layer as a working interview stack.</p>
      <div className="ecosystem-tabs" role="list">
        {ecosystems.map((item) => <button key={item} className={item === ecosystem ? "is-active" : ""} onClick={() => selectEcosystem(item)}>
          <span>{ecosystemLabels[item]}</span><small>{technologies.filter((technology) => technology.ecosystem === item).length} field notes</small>
        </button>)}
      </div>
      <nav className="workbench-index-links" aria-label="Library shortcuts"><Link href="/sheets/">DSA sheets <ArrowRight size={15} /></Link></nav>
    </aside>
    <section className="workbench-map" aria-labelledby="workbench-map-title">
      <header><div><h2 id="workbench-map-title">{ecosystemLabels[ecosystem]} workbench</h2><p>Runtime and platform at the base; tools and frameworks above. Select a plate to inspect its interview contract.</p></div><span><Layers3 size={16} /> {visible.length} resources</span></header>
      <div className="stack-layers">
        {["framework", "language", "database", "runtime", "platform", "tool", "mobile", "data-ai", "web-api"].map((kind) => {
          const items = visible.filter((technology) => technology.kind === kind);
          if (!items.length) return null;
          return <section className="stack-layer" key={kind}><h3>{kind.replace("-", " ")}</h3><div>{items.map((technology) => <button key={technology.id} className={selected?.id === technology.id ? "is-selected" : ""} onClick={() => setSelectedId(technology.id)}><Boxes size={17} /><span><strong>{technology.title}</strong><small>{technology.level} · {technology.version.current}</small></span></button>)}</div></section>;
        })}
      </div>
      <footer><span>base layer</span><span>application layer</span></footer>
    </section>
    <aside className="workbench-inspector" aria-live="polite">
      {selected ? <>
        <div className="inspector-meta"><span>{selected.kind}</span><span><CheckCircle2 size={14} /> published</span></div>
        <h2>{selected.title}</h2><p className="inspector-summary">{selected.summary}</p>
        <section><h3>Mental model</h3><p>{selected.mentalModel}</p></section>
        <section><h3>Version policy</h3><dl><div><dt>Current guide</dt><dd>{selected.version.current}</dd></div>{selected.version.lts && <div><dt>LTS</dt><dd>{selected.version.lts}</dd></div>}<div><dt>Reviewed</dt><dd>{selected.lastReviewed}</dd></div></dl></section>
        <section><h3>Interview coverage</h3><p>{selected.questions.length} graded questions · {selected.commandIds.length} commands · {selected.workedExamples.length} examples</p></section>
        <Link className="primary-action workbench-open" href={`/technologies/${selected.id}/`}><Clock3 size={17} /> Open field manual</Link>
      </> : <p>No published technology is available in this ecosystem yet.</p>}
    </aside>
  </main>;
}
