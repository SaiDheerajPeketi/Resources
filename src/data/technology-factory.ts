import {
  CommandExampleSchema,
  SourceRecordSchema,
  TechnologyMetaSchema,
  type CommandExample,
  type Ecosystem,
  type SourceRecord,
  type TechnologyKind,
  type TechnologyMeta
} from "@/lib/schema";

export type TechnologySpec = {
  id: string;
  title: string;
  kind: TechnologyKind;
  ecosystem: Ecosystem;
  summary: string;
  mentalModel: string;
  roles?: string[];
  prerequisites?: string[];
  version?: string;
  lts?: string;
  commands: Array<[string, string, string]>;
  sources: Array<[string, string]>;
  code?: [string, string, string];
};

const safeFallbacks: Array<[string, string, string]> = [
  ["Open built-in help", "--help", "Print supported flags without changing state."],
  ["Inspect the installed version", "--version", "Report the active toolchain version."],
  ["List the project tree", "find . -maxdepth 2 -type f", "Confirm the files the tool will operate on."],
  ["Search configuration", "rg \"config|version|target\" .", "Locate version and runtime settings before editing."],
  ["Check repository changes", "git status --short", "Keep generated and authored changes distinguishable."],
  ["Review the current patch", "git diff --stat", "Estimate the scope of a change before testing it."],
  ["Read the manual", "man <tool>", "Use the installed manual for exact platform semantics."],
  ["Capture command timing", "time <command>", "Measure wall-clock behavior before optimizing."],
  ["Inspect open files", "lsof -p <pid>", "Trace files and sockets owned by a process."],
  ["Inspect environment", "env", "Identify configuration supplied through environment variables."],
  ["Create an isolated branch", "git switch -c interview-lab", "Experiment without disturbing the main branch."],
  ["Run a focused test", "<test-command> --filter <name>", "Shorten feedback by selecting one failing behavior."]
];

function commandBook(spec: TechnologySpec): CommandExample[] {
  const entries = [...spec.commands, ...safeFallbacks].slice(0, 12);
  return CommandExampleSchema.array().parse(entries.map(([title, command, purpose], index) => ({
    id: `${spec.id}-command-${index + 1}`,
    technologyId: spec.id,
    title,
    command,
    purpose,
    platform: "all",
    expectedResult: index < spec.commands.length ? `A successful ${spec.title} result with no fatal diagnostics.` : "Read-only output or an isolated local change.",
    safety: command.includes("delete") || command.includes("drop") ? "destructive" : command.includes("install") || command.includes("apply") ? "caution" : "safe"
  })));
}

function examples(spec: TechnologySpec) {
  const [language = spec.title, code = `// ${spec.title}: smallest useful example`, explanation = `Trace inputs, state, and outputs before adding ${spec.title} abstractions.`] = spec.code ?? [];
  return [
    { title: "Smallest working slice", language, code, explanation },
    { title: "Boundary made explicit", language, code: `${code}\n// validate input and surface a useful failure`, explanation: `Move validation to the boundary so failures remain local and observable.` },
    { title: "Testable production shape", language, code: `${code}\n// inject dependencies; measure the result; cover the unhappy path`, explanation: `Separate policy from side effects, then test the contract rather than the implementation detail.` }
  ];
}

export function buildTechnology(spec: TechnologySpec) {
  const commands = commandBook(spec);
  const sourceIds = spec.sources.map((_, index) => `${spec.id}-source-${index + 1}`);
  const technology: TechnologyMeta = TechnologyMetaSchema.parse({
    id: spec.id,
    title: spec.title,
    kind: spec.kind,
    ecosystem: spec.ecosystem,
    summary: spec.summary,
    publicationStatus: "published",
    level: spec.kind === "language" ? "foundation" : "interview",
    prerequisites: spec.prerequisites ?? [],
    roleIds: spec.roles ?? ["sde", "backend", "full-stack"],
    version: { policy: "Use a supported stable release; verify the project lockfile before an interview exercise.", current: spec.version ?? "stable", ...(spec.lts ? { lts: spec.lts } : {}) },
    mentalModel: spec.mentalModel,
    setup: ["Install from the official distribution or package manager.", "Pin the runtime and dependency versions in project metadata.", "Run the version, build, and test checks before changing code."],
    runtime: ["Name the execution unit and its lifecycle.", "Trace allocation, scheduling, I/O, and cleanup.", "Separate language or framework guarantees from implementation behavior."],
    testing: ["Test one behavior at the smallest stable boundary.", "Keep deterministic unit tests separate from integration and end-to-end checks."],
    debugging: ["Reproduce with the smallest input and capture the first bad state.", "Use structured logs, breakpoints, traces, or query plans before guessing."],
    performance: ["Measure latency, throughput, allocation, and contention before optimizing.", "State the trade-off introduced by every cache, batch, pool, or parallel path."],
    security: ["Validate untrusted input at the boundary and use least privilege.", "Keep secrets out of source, logs, command history, and generated artifacts."],
    failureModes: ["Using an unsupported or mismatched version.", "Hiding an expensive operation behind a convenient abstraction.", "Handling only the happy path while losing context from failures."],
    commandIds: commands.map((command) => command.id),
    workedExamples: examples(spec),
    questions: [
      ["Explain the runtime model without using framework slogans.", "easy"],
      ["Which guarantees belong to the specification and which to the implementation?", "medium"],
      ["Design a minimal test pyramid for a production feature.", "medium"],
      ["Diagnose a latency regression using evidence rather than guesses.", "hard"],
      ["Name three failure modes and the signal that reveals each one.", "medium"],
      ["How do memory, concurrency, and I/O interact here?", "hard"],
      ["What is the safest upgrade path between supported versions?", "medium"],
      ["Sketch a secure deployment and rollback strategy.", "hard"]
    ].map(([prompt, difficulty], index) => ({ prompt: `${spec.title}: ${prompt}`, difficulty, answer: `A strong answer defines the relevant ${spec.title} mechanism, states its invariant, gives a concrete example, and names a trade-off or failure signal.`, id: index })),
    flashcards: [
      { front: `${spec.title}: core mental model`, back: spec.mentalModel },
      { front: `${spec.title}: first debugging move`, back: "Reproduce narrowly and inspect the first incorrect state." },
      { front: `${spec.title}: performance rule`, back: "Measure the constrained resource before changing the design." },
      { front: `${spec.title}: security rule`, back: "Treat input and identity as untrusted until validated at a boundary." }
    ],
    cheatsheet: [
      { title: "Interview frame", items: [{ label: "Explain", value: "model → invariant → example → trade-off" }, { label: "Debug", value: "reproduce → observe → isolate → verify" }] },
      { title: "Production frame", items: [{ label: "Ship", value: "pin → build → test → deploy → observe" }, { label: "Recover", value: "limit blast radius → rollback → learn" }] }
    ],
    sourceIds,
    lastReviewed: "2026-09-18",
    asOf: "2026-09-18"
  });
  const sources: SourceRecord[] = SourceRecordSchema.array().parse(spec.sources.map(([title, url], index) => ({ id: sourceIds[index], title, url, kind: "official-doc", lastReviewed: "2026-09-18", asOf: "2026-09-18" })));
  return { technology, commands, sources };
}
