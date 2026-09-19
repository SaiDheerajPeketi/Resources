"use client";

import { Children, useEffect, useState, type ReactNode } from "react";

const sections = [
  { id: "full-notes", label: "Full Notes" },
  { id: "cheat-sheet", label: "Cheat Sheet" },
  { id: "interview-questions", label: "Interview Questions" },
  { id: "revision-material", label: "Revision Material" }
] as const;

type SectionId = typeof sections[number]["id"];

type FieldNoteSectionProps = {
  notes: ReactNode;
  cheatSheet: ReactNode;
  questions: ReactNode;
  revision: ReactNode;
} | {
  children: ReactNode;
};

export function FieldNoteSections(props: FieldNoteSectionProps) {
  const [active, setActive] = useState<SectionId>("full-notes");
  const supplied = "children" in props
    ? Children.toArray(props.children)
    : [props.notes, props.cheatSheet, props.questions, props.revision];
  const content = Object.fromEntries(sections.map((section, index) => [section.id, supplied[index]])) as Record<SectionId, ReactNode>;

  useEffect(() => {
    const hash = window.location.hash.slice(1) as SectionId;
    if (sections.some((section) => section.id === hash)) setActive(hash);
  }, []);

  function openSection(id: SectionId) {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("field-note-sections")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  return <div id="field-note-sections" className="field-note-sections">
    <nav className="field-note-section-nav" aria-label="Field note sections">
      {sections.map((section) => <button
        key={section.id}
        type="button"
        aria-pressed={active === section.id}
        aria-controls={`${section.id}-panel`}
        onClick={() => openSection(section.id)}
      >{section.label}</button>)}
    </nav>

    {sections.map((section) => <div
      key={section.id}
      id={`${section.id}-panel`}
      className="field-note-panel"
      hidden={active !== section.id}
    >{content[section.id]}</div>)}
  </div>;
}
