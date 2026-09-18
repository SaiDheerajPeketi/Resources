import { describe, expect, it } from "vitest";
import { commands, technologies, technologySources } from "@/data/technologies";
import { dsaProblems, dsaSheets } from "@/data/dsa";
import { coverageCrosswalks } from "@/data/crosswalks";
import { companyGuides } from "@/data/companies";
import { diagnostics, rolePathRecords } from "@/data/learning";
import { packDefinitions } from "@/data/packs";
import { foundationLessons } from "@/data/foundation-lessons";
import { aiLessons } from "@/data/ai-lessons";
import { sdeLessons } from "@/data/sde-lessons";
import { devopsLessons } from "@/data/devops-lessons";
import { securityLessons } from "@/data/security-lessons";
import { fintechLessons } from "@/data/fintech-lessons";

describe("universal interview corpus", () => {
  it("validates every technology depth contract without overstating editorial depth", () => {
    expect(technologies.length).toBeGreaterThanOrEqual(110);
    const commandIds = new Set(commands.map((item) => item.id));
    const sourceIds = new Set(technologySources.map((item) => item.id));
    for (const technology of technologies) {
      expect(technology.commandIds).toHaveLength(12);
      expect(technology.workedExamples.length).toBeGreaterThanOrEqual(3);
      expect(technology.learningPath).toHaveLength(4);
      expect(technology.theorySections.length).toBeGreaterThanOrEqual(4);
      expect(technology.theorySections.every((section) => section.plainEnglish && section.analogy && section.analogyLimit && section.concreteExample)).toBe(true);
      expect(technology.misconceptions.length).toBeGreaterThanOrEqual(4);
      expect(technology.revisionChecklist.length).toBeGreaterThanOrEqual(8);
      expect(technology.questions.length).toBeGreaterThanOrEqual(8);
      expect(technology.questions.every((question) => question.whyTricky && question.rubric.length >= 2)).toBe(true);
      expect(technology.flashcards.length).toBeGreaterThanOrEqual(8);
      expect(technology.cheatsheet.length).toBeGreaterThanOrEqual(3);
      expect(technology.sourceIds.length).toBeGreaterThanOrEqual(3);
      expect(technology.commandIds.every((id) => commandIds.has(id))).toBe(true);
      expect(technology.sourceIds.every((id) => sourceIds.has(id))).toBe(true);
    }
    const fullDepthIds = technologies.filter((technology) => technology.depthStatus === "complete").map((technology) => technology.id);
    expect(fullDepthIds).toEqual(expect.arrayContaining(["java", "cpp", "python", "javascript", "typescript", "oop-and-lld", "dbms", "operating-systems", "computer-networks"]));
    expect(technologies.filter((technology) => technology.depthStatus === "overview").length).toBeGreaterThan(0);
  });

  it("keeps Atlas 75, 180, and 300 strictly nested", () => {
    expect(dsaProblems).toHaveLength(300);
    expect(dsaSheets.map((sheet) => sheet.problemIds.length)).toEqual([75, 180, 300]);
    const [atlas75, atlas180, atlas300] = dsaSheets.map((sheet) => new Set(sheet.problemIds));
    expect([...atlas75].every((id) => atlas180.has(id))).toBe(true);
    expect([...atlas180].every((id) => atlas300.has(id))).toBe(true);
    expect(dsaProblems.slice(0, 180).every((problem) => problem.variantLanguages.length === 4)).toBe(true);
    expect(dsaProblems.slice(180).every((problem) => problem.variantLanguages.join() === "cpp17")).toBe(true);
    expect(dsaProblems.every((problem) => problem.practiceUrl.startsWith("https://"))).toBe(true);
    expect(dsaProblems.every((problem) => problem.practiceSource === "leetcode" || problem.practiceSource === "gfg")).toBe(true);
    expect(dsaProblems.filter((problem) => problem.practiceSource === "leetcode").length).toBeGreaterThanOrEqual(100);
    expect(dsaProblems.every((problem) => problem.practiceSource !== "leetcode" || problem.practiceDirect)).toBe(true);
  });

  it("keeps every role-track lesson on the detailed teaching contract", () => {
    const lessons = { ...foundationLessons, ...aiLessons, ...sdeLessons, ...devopsLessons, ...securityLessons, ...fintechLessons };
    expect(Object.keys(lessons)).toHaveLength(140);
    for (const lesson of Object.values(lessons)) {
      expect(lesson.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(lesson.conceptMap.length).toBeGreaterThanOrEqual(4);
      expect(lesson.analogy.body.length).toBeGreaterThanOrEqual(80);
      expect(lesson.theory.length).toBeGreaterThanOrEqual(3);
      expect(lesson.theory.every((section) => section.body.length >= 120)).toBe(true);
      expect(lesson.example.explanation.length).toBeGreaterThanOrEqual(60);
      expect(lesson.failureModes.length).toBeGreaterThanOrEqual(4);
      expect(lesson.question.answer.length).toBeGreaterThanOrEqual(120);
      expect(lesson.question.rubric.length).toBeGreaterThanOrEqual(3);
      expect(lesson.flashcards.length).toBeGreaterThanOrEqual(3);
      expect(lesson.revision.length).toBeGreaterThanOrEqual(5);
      expect(lesson.sources.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("maps every problem without copying external statements", () => {
    expect(coverageCrosswalks).toHaveLength(1200);
    expect(coverageCrosswalks.every((entry) => entry.note.includes("original"))).toBe(true);
  });

  it("publishes role, company, diagnostic, and offline surfaces", () => {
    expect(companyGuides.length).toBeGreaterThanOrEqual(30);
    expect(rolePathRecords).toHaveLength(15);
    expect(diagnostics.length).toBeGreaterThan(0);
    expect(new Set(packDefinitions.map((pack) => pack.kind))).toEqual(new Set(["track", "ecosystem", "sheet", "role", "full"]));
    expect(packDefinitions.find((pack) => pack.id === "full-corpus")?.routes.length).toBeGreaterThan(500);
  });
});
