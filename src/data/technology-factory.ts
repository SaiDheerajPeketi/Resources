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
import { completeTechnologyDepth } from "@/data/technology-depth";
import { languageTechnologyDepth } from "@/data/technology-depth-languages";
import { technologyTeachingAids } from "@/data/technology-teaching-aids";

const fullDepthTechnology = { ...completeTechnologyDepth, ...languageTechnologyDepth };

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

function overviewDepth(spec: TechnologySpec) {
  return {
    workedExamples: examples(spec),
    setup: ["Install from the official distribution or package manager.", "Pin runtime and dependency versions in project metadata.", "Run version, build, and test checks before changing code."],
    runtime: ["Name the execution unit and its lifecycle.", "Trace allocation, scheduling, I/O, and cleanup.", "Separate language or framework guarantees from implementation behavior."],
    testing: ["Test one behavior at the smallest stable boundary.", "Keep deterministic unit tests separate from integration and end-to-end checks."],
    debugging: ["Reproduce with the smallest input and capture the first bad state.", "Use structured logs, breakpoints, traces, or query plans before guessing."],
    performance: ["Measure latency, throughput, allocation, and contention before optimizing.", "State the trade-off introduced by every cache, batch, pool, or parallel path."],
    security: ["Validate untrusted input at the boundary and use least privilege.", "Keep secrets out of source, logs, command history, and generated artifacts."],
    failureModes: ["Using an unsupported or mismatched version.", "Hiding an expensive operation behind a convenient abstraction.", "Handling only the happy path while losing context from failures."],
    learningPath: [
      { level: "basic" as const, title: "Foundations", objective: `Build a correct vocabulary and smallest working ${spec.title} program.`, topics: ["installation and project shape", "core syntax and data model", "control flow and error handling", "standard-library or platform primitives"] },
      { level: "intermediate" as const, title: "Working fluency", objective: `Use ${spec.title} idiomatically in tested application code.`, topics: ["module and dependency boundaries", "testing and debugging workflow", "I/O, persistence, and external integration", "common idioms and maintainable structure"] },
      { level: "advanced" as const, title: "Runtime and trade-offs", objective: `Explain how ${spec.title} behaves under memory, concurrency, and performance pressure.`, topics: ["execution and memory model", "concurrency and scheduling", "profiling and performance limits", "failure recovery and observability"] },
      { level: "expert" as const, title: "Production judgment", objective: `Defend ${spec.title} design choices and diagnose realistic failures.`, topics: ["security boundaries and threat model", "compatibility and version upgrades", "scaling and operational constraints", "architecture trade-offs and interview cases"] }
    ],
    theorySections: [
      { title: "Core abstraction", explanation: `${spec.mentalModel} This overview establishes the nouns, lifecycle, and invariants that later examples must make concrete. It is not yet the complete editorial treatment for every subtopic in this technology.`, plainEnglish: `Start by naming what ${spec.title} executes, what state it owns, and when that state begins and ends.`, analogy: `Treat the runtime like a workshop: inputs arrive, named tools transform them, and an owner must clean up each resource.`, analogyLimit: "Software can copy, share, or schedule state in ways a physical workshop cannot, so derive the actual guarantees from the runtime.", concreteExample: `Trace one ${spec.title} request from input validation through execution, output, failure, and cleanup.`, keyPoints: ["Name the execution unit and its lifecycle.", "Identify the state and invariant owned by each abstraction.", "Separate specification guarantees from common implementation behavior."] },
      { title: "Data, memory, and lifetime", explanation: `${spec.title} programs move data through values, references, resources, or persisted representations. A strong explanation follows ownership and lifetime from creation through sharing, mutation, cleanup, and failure instead of relying on syntax alone.`, plainEnglish: "Know who owns each value, who may change it, who can still see it, and who must release associated resources.", analogy: "Think of a library book: several people may know its catalogue number, but one policy controls loans, returns, and replacement.", analogyLimit: "Memory aliases can be copied instantly and may outlive lexical scopes, unlike a single physical book.", concreteExample: "Follow a database connection from pool checkout through query, exception, rollback, and guaranteed return to the pool.", keyPoints: ["Trace allocation and cleanup.", "Make aliasing and mutation explicit.", "Treat resource lifetime separately from garbage-collected memory where applicable."] },
      { title: "Concurrency and I/O", explanation: `Concurrency in ${spec.title} must be derived from its runtime and host platform. Explain what can execute independently, how work waits, how cancellation and backpressure propagate, and which synchronization rule protects shared invariants.`, plainEnglish: "Multiple tasks may make progress together, but shared state and limited downstream capacity still need explicit coordination.", analogy: "A restaurant can prepare several orders at once, yet it needs ticket ordering, limited ovens, and a rule for cancelled orders.", analogyLimit: "Computer scheduling and memory visibility have formal rules that human coordination analogies do not capture.", concreteExample: "Bound a worker queue, cancel work after the caller deadline, and protect the one invariant updated by competing tasks.", keyPoints: ["Distinguish concurrency from parallelism.", "State the ordering or synchronization guarantee.", "Bound queues, retries, and resource use."] },
      { title: "Production behavior", explanation: `A production ${spec.title} system is evaluated through tests, diagnostics, performance evidence, security boundaries, compatible changes, and recovery. Convenient abstractions are useful only when their hidden cost and failure signals remain observable.`, plainEnglish: "A feature is not finished when it works once; it must remain explainable, safe, measurable, and recoverable under failure.", analogy: "A bridge needs load limits, inspections, warning signs, and repair plans in addition to a successful first crossing.", analogyLimit: "Software can be rolled back or replicated quickly, but data compatibility and external effects may make recovery irreversible.", concreteExample: "Release to a small cohort, watch latency and error budgets, verify data compatibility, and keep a tested rollback trigger.", keyPoints: ["Measure before optimizing.", "Validate untrusted boundaries and use least privilege.", "Design rollback, migration, and failure diagnosis with the feature."] }
    ],
    misconceptions: [
      { claim: `${spec.title} best practices are universal rules.`, correction: "Practices are responses to constraints; state the workload, invariant, and trade-off before applying one.", whyItHappens: "Interview summaries often omit the forces that justify a recommendation." },
      { claim: `A successful ${spec.title} build proves runtime correctness.`, correction: "Build-time checks cover only declared contracts; runtime inputs, integration, resource limits, and concurrency still need evidence.", whyItHappens: "Fast local feedback is confused with end-to-end behavior." },
      { claim: `The most concise ${spec.title} API is automatically the most efficient.`, correction: "Abstractions can hide allocation, I/O, network calls, queries, synchronization, or retries; inspect and measure the execution path.", whyItHappens: "Source-code size is used as a proxy for work performed." },
      { claim: `Adding parallelism always speeds up ${spec.title} workloads.`, correction: "Useful parallelism is bounded by dependencies and resources; coordination, contention, queueing, and downstream limits can reduce throughput.", whyItHappens: "Available threads or workers are mistaken for additional system capacity." }
    ],
    revisionChecklist: [
      `Explain the ${spec.title} mental model without product slogans.`,
      "Name core types, lifecycle, invariants, and boundary conditions.",
      "Trace one request or program from input through execution to output and cleanup.",
      "State memory ownership, mutation, and resource-lifetime rules.",
      "Explain concurrency, ordering, cancellation, and backpressure behavior.",
      "Choose a test boundary and demonstrate an unhappy-path case.",
      "Use one diagnostic tool and interpret its evidence.",
      "Name a performance bottleneck, security risk, upgrade risk, and rollback path."
    ],
    questions: [
      ["Explain the runtime model without using framework slogans.", "easy" as const, "Start from the execution unit, state lifecycle, inputs, state, scheduling, outputs, and cleanup; then separate specified guarantees from one implementation.", "Fluent API usage can hide a weak execution model."],
      ["Which guarantees belong to the specification and which to the implementation?", "medium" as const, "Name each relied-on behavior, cite whether it is contractual, and explain how version or implementation changes would affect it.", "Familiar behavior is often mistaken for a portable guarantee."],
      ["Design a minimal test pyramid for a production feature.", "medium" as const, "Use deterministic unit tests for policy, integration tests for real boundaries, a few end-to-end journeys, and contract or property tests where interfaces or invariants need them.", "Test labels are less important than stable boundaries and failure coverage."],
      ["Diagnose a latency regression using evidence rather than guesses.", "hard" as const, "Reproduce under comparable load, decompose the latency budget, inspect traces and resource saturation, profile the constrained stage, change one cause, and verify tail as well as median latency.", "Average timing and correlation frequently produce false diagnoses."],
      ["Name three failure modes and the signal that reveals each one.", "medium" as const, "Choose distinct correctness, resource, and integration failures and pair each with an observable log, metric, trace, state inspection, or failed invariant.", "Generic failure lists without discriminating evidence are not actionable."],
      ["How do memory, concurrency, and I/O interact here?", "hard" as const, "Trace allocation and ownership across scheduled work and blocking or asynchronous boundaries, including queues, buffering, cancellation, cleanup, and backpressure.", "These resources are usually taught separately even though production failures couple them."],
      ["What is the safest upgrade path between supported versions?", "medium" as const, "Read compatibility notes, pin inputs, test representative behavior, stage the rollout, observe agreed signals, retain rollback, and migrate data or APIs in compatible phases.", "A green build does not prove behavioral or operational compatibility."],
      ["Sketch a secure deployment and rollback strategy.", "hard" as const, "Define identities, least privilege, secret delivery, trusted artifacts, input boundaries, audit signals, staged rollout, compatibility window, rollback trigger, and recovery verification.", "Deployment safety spans code, identity, data, and operational state." ]
    ].map(([prompt, difficulty, answer, whyTricky]) => ({ prompt: `${spec.title}: ${prompt}`, difficulty, answer, whyTricky, rubric: ["Defines the relevant mechanism and invariant.", "Uses a concrete example and names a trade-off.", "Includes a failure signal or verification method."] })),
    flashcards: [
      { front: `${spec.title}: core mental model`, back: spec.mentalModel },
      { front: `${spec.title}: first debugging move`, back: "Reproduce narrowly and inspect the first incorrect state." },
      { front: `${spec.title}: performance rule`, back: "Measure the constrained resource before changing the design." },
      { front: `${spec.title}: security rule`, back: "Treat input and identity as untrusted until validated at a boundary." },
      { front: `${spec.title}: concurrency rule`, back: "Name the shared invariant, its owner, and the ordering mechanism." },
      { front: `${spec.title}: testing rule`, back: "Test behavior at the smallest stable boundary and include the unhappy path." },
      { front: `${spec.title}: upgrade rule`, back: "Pin, read compatibility notes, stage, observe, and keep a tested rollback." },
      { front: `${spec.title}: interview frame`, back: "Model → invariant → mechanism → example → trade-off → failure signal." }
    ],
    cheatsheet: [
      { title: "Learning path", items: [{ label: "Basic", value: "syntax + data + lifecycle" }, { label: "Intermediate", value: "idioms + tests + integration" }, { label: "Advanced", value: "runtime + concurrency + performance" }, { label: "Expert", value: "security + operations + trade-offs" }] },
      { title: "Interview frame", items: [{ label: "Explain", value: "model → invariant → mechanism" }, { label: "Prove", value: "example → boundary → counterexample" }, { label: "Compare", value: "workload → trade-off → failure" }, { label: "Debug", value: "reproduce → observe → isolate → verify" }] },
      { title: "Production frame", items: [{ label: "Ship", value: "pin → build → test → stage → observe" }, { label: "Secure", value: "identity → least privilege → validate → audit" }, { label: "Scale", value: "measure → bound → backpressure → recover" }, { label: "Upgrade", value: "compatibility → migration → rollback" }] }
    ]
  };
}

export function buildTechnology(spec: TechnologySpec) {
  const commands = commandBook(spec);
  const sourceIds = spec.sources.map((_, index) => `${spec.id}-source-${index + 1}`);
  const depth = fullDepthTechnology[spec.id] ?? overviewDepth(spec);
  const teachingAids = technologyTeachingAids[spec.id] ?? {};
  const isComplete = Boolean(fullDepthTechnology[spec.id]);
  const theorySections = depth.theorySections.map((section) => {
    const aid = teachingAids[section.title];
    if (isComplete && !aid && !(section.plainEnglish && section.analogy && section.analogyLimit && section.concreteExample)) {
      throw new Error(`Full-depth technology ${spec.id} is missing teaching aids for ${section.title}.`);
    }
    return {
      ...section,
      plainEnglish: section.plainEnglish ?? aid?.plainEnglish,
      analogy: section.analogy ?? aid?.analogy,
      analogyLimit: section.analogyLimit ?? aid?.analogyLimit,
      concreteExample: section.concreteExample ?? aid?.concreteExample
    };
  });
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
    depthStatus: isComplete ? "complete" : "overview",
    mentalModel: spec.mentalModel,
    learningPath: depth.learningPath,
    theorySections,
    misconceptions: depth.misconceptions,
    revisionChecklist: depth.revisionChecklist,
    setup: depth.setup,
    runtime: depth.runtime,
    testing: depth.testing,
    debugging: depth.debugging,
    performance: depth.performance,
    security: depth.security,
    failureModes: depth.failureModes,
    commandIds: commands.map((command) => command.id),
    workedExamples: depth.workedExamples,
    questions: depth.questions,
    flashcards: depth.flashcards,
    cheatsheet: depth.cheatsheet,
    sourceIds,
    lastReviewed: "2026-09-18",
    asOf: "2026-09-18"
  });
  const sources: SourceRecord[] = SourceRecordSchema.array().parse(spec.sources.map(([title, url], index) => ({ id: sourceIds[index], title, url, kind: "official-doc", lastReviewed: "2026-09-18", asOf: "2026-09-18" })));
  return { technology, commands, sources };
}
