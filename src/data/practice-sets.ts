import {
  CompanyArchetypeSchema,
  MockLoopSchema,
  PracticeSetSchema,
  type CompanyArchetype,
  type MockLoop,
  type PracticeSet
} from "@/lib/schema";

export const practiceSets: PracticeSet[] = PracticeSetSchema.array().parse([
  { id: "coding-patterns", title: "Coding patterns", summary: "C++-first data structures, invariants, complexity, and edge-case explanation.", category: "coding", level: "interview", durationMinutes: 115, trackIds: ["foundations", "fintech-quant"], questionIds: ["sim-coding-fraud-window", "array-min-window", "sliding-window-maximum", "graph-course-order", "dp-house-robber"] },
  { id: "sql-analysis", title: "SQL analysis", summary: "Joins, windows, cohort logic, sessionization, and exact financial aggregation.", category: "sql", level: "interview", durationMinutes: 115, trackIds: ["foundations"], questionIds: ["sim-sql-funnel", "sim-sql-sessionize", "sim-sql-ledger-balance", "sql-retention"] },
  { id: "ai-product-case", title: "AI product cases", summary: "Evaluation, drift, retrieval, delayed labels, rollout, and decision-quality trade-offs.", category: "ai", level: "advanced", durationMinutes: 95, trackIds: ["ai-data"], questionIds: ["sim-ai-ranking-drift", "metric-choice", "ai-rag-debug", "ai-ml-system-fraud"] },
  { id: "system-design-loop", title: "System design loop", summary: "Requirements, estimates, APIs, state, failure modes, and operational proof.", category: "system-design", level: "advanced", durationMinutes: 170, trackIds: ["sde-systems", "cybersecurity"], questionIds: ["sim-design-notification-platform", "ring-movement", "sde-method-url-shortener", "sde-case-chat", "security-ai-rag-agent"] },
  { id: "fintech-case-room", title: "Fintech case room", summary: "Payments, ledger invariants, unknown outcomes, reconciliation, and customer-safe operations.", category: "fintech-case", level: "advanced", durationMinutes: 135, trackIds: ["fintech-quant"], questionIds: ["sim-fintech-reconciliation-break", "ledger-refund", "fintech-idempotent-charge", "fintech-recon-engine", "fintech-upi-checkout"] },
  { id: "security-case-room", title: "Security case room", summary: "Threat boundaries, tenant isolation, incident containment, and evidence-led recovery.", category: "security", level: "advanced", durationMinutes: 125, trackIds: ["cybersecurity"], questionIds: ["sim-security-tenant-export", "stride-boundary", "security-api-image-fetch", "security-cloud-key-leak", "security-ir-cloud-admin"] },
  { id: "devops-incident-loop", title: "DevOps incident loop", summary: "Kubernetes, infrastructure drift, safe releases, supply chain, and controlled recovery.", category: "devops", level: "advanced", durationMinutes: 125, trackIds: ["devops-cloud", "cybersecurity"], questionIds: ["sim-devops-regional-rollout", "reconcile-loop", "devops-k8s-pending", "devops-iac-drift", "security-supply-build"] },
  { id: "behavioral-evidence", title: "Behavioral evidence", summary: "Ownership, disagreement, failure, ambiguity, collaboration, and changed judgment.", category: "behavioral", level: "interview", durationMinutes: 38, trackIds: ["foundations"], questionIds: ["sim-behavioral-incident-disagreement", "sim-behavioral-failure", "sim-behavioral-ambiguity", "behavioral-disagreement"] },
  { id: "estimation-drills", title: "Estimation drills", summary: "Back-of-the-envelope arithmetic with explicit assumptions, bottlenecks, and measurement plans.", category: "estimation", level: "interview", durationMinutes: 89, trackIds: ["sde-systems"], questionIds: ["sim-estimation-video", "sim-estimation-cache", "sim-estimation-queue", "sde-capacity-photo"] },
  { id: "probability-drills", title: "Probability drills", summary: "Conditional probability, stopping times, collisions, and experimental inference.", category: "probability", level: "interview", durationMinutes: 66, trackIds: ["foundations", "fintech-quant"], questionIds: ["sim-probability-collision", "probability-two-children", "quant-puzzle-pattern", "statistics-ab-test"] },
  { id: "logic-puzzles", title: "Logic puzzles", summary: "State encoding, combinatorial reasoning, invariants, and assumption checks.", category: "logic", level: "interview", durationMinutes: 65, trackIds: ["foundations", "fintech-quant"], questionIds: ["sim-logic-switches", "discrete-handshakes", "bit-two-unique", "quant-puzzle-pattern"] }
]);

export const practiceSetById = new Map(practiceSets.map((set) => [set.id, set]));

export const companyArchetypes: CompanyArchetype[] = CompanyArchetypeSchema.array().parse([
  {
    id: "indian-product", title: "Indian product companies", context: "Expect strong coding fundamentals, practical design, project depth, and customer-aware judgment.",
    focus: ["Medium-to-hard DSA with clear C++", "Backend or product system design", "Ownership and project evidence"], practiceSetIds: ["coding-patterns", "system-design-loop", "behavioral-evidence"],
    rounds: [{ title: "Coding", timeboxMinutes: 50, signal: "Correct invariants, tests, and complexity." }, { title: "Practical design", timeboxMinutes: 50, signal: "Coherent APIs, data, failure handling, and trade-offs." }, { title: "Projects and behavior", timeboxMinutes: 40, signal: "Specific ownership, impact, and reflection." }]
  },
  {
    id: "indian-services", title: "Indian service companies", context: "Breadth, communication, trainability, implementation fluency, and dependable fundamentals often matter together.",
    focus: ["Core CS and coding foundations", "SQL, debugging, and delivery basics", "Clear communication and adaptable examples"], practiceSetIds: ["coding-patterns", "sql-analysis", "behavioral-evidence"],
    rounds: [{ title: "Aptitude and coding", timeboxMinutes: 60, signal: "Methodical reasoning and correct implementation." }, { title: "Technical breadth", timeboxMinutes: 45, signal: "Defensible fundamentals across CS, SQL, and projects." }, { title: "Manager and HR", timeboxMinutes: 35, signal: "Reliability, learning, mobility constraints, and honest motivation." }]
  },
  {
    id: "global-big-tech", title: "Global big tech", context: "Repeated evidence across coding, scalable design, behavioral principles, and structured communication.",
    focus: ["Consistent DSA performance", "System design with scale and reliability", "Behavioral evidence mapped to decisions"], practiceSetIds: ["coding-patterns", "system-design-loop", "estimation-drills", "behavioral-evidence"],
    rounds: [{ title: "Coding I", timeboxMinutes: 45, signal: "Fast problem framing and robust code." }, { title: "Coding II", timeboxMinutes: 45, signal: "Pattern transfer and edge-case control." }, { title: "Design", timeboxMinutes: 60, signal: "Scale, bottlenecks, failure, and operations." }, { title: "Behavioral", timeboxMinutes: 45, signal: "Evidence, ownership, and calibrated reflection." }]
  },
  {
    id: "startup", title: "Startups", context: "Small teams test whether you can move from ambiguous product need to an operable implementation.",
    focus: ["End-to-end product reasoning", "Pragmatic architecture and delivery", "Debugging, incidents, and prioritization"], practiceSetIds: ["coding-patterns", "system-design-loop", "devops-incident-loop", "behavioral-evidence"],
    rounds: [{ title: "Build or pair", timeboxMinutes: 75, signal: "Useful scope, readable implementation, and feedback loops." }, { title: "Architecture", timeboxMinutes: 50, signal: "Simple-now design with explicit growth seams." }, { title: "Founder or manager", timeboxMinutes: 40, signal: "Motivation, judgment, pace, and customer ownership." }]
  },
  {
    id: "fintech", title: "Fintechs", context: "Financial correctness, failure semantics, reconciliation, security, and auditability outweigh glossy happy paths.",
    focus: ["Money and ledger invariants", "Payment state and reconciliation", "Security, regulation, and operational evidence"], practiceSetIds: ["fintech-case-room", "sql-analysis", "security-case-room", "system-design-loop"],
    rounds: [{ title: "Coding and SQL", timeboxMinutes: 55, signal: "Exact arithmetic, data correctness, and idempotency." }, { title: "Payments case", timeboxMinutes: 60, signal: "Unknown outcomes, state, ledger, and reconciliation." }, { title: "Risk and operations", timeboxMinutes: 45, signal: "Controls, evidence, customer harm, and recovery." }]
  },
  {
    id: "quant", title: "Quant firms", context: "Probability, fast correct coding, market reasoning, and performance depth are evaluated under tight timeboxes.",
    focus: ["Probability and logic fluency", "C++ performance and data structures", "Markets, estimation, and disciplined assumptions"], practiceSetIds: ["coding-patterns", "probability-drills", "logic-puzzles", "estimation-drills"],
    rounds: [{ title: "Probability and puzzles", timeboxMinutes: 45, signal: "Clean conditional reasoning and assumption control." }, { title: "Coding", timeboxMinutes: 60, signal: "Correct, efficient implementation under pressure." }, { title: "Markets or systems", timeboxMinutes: 50, signal: "Microstructure or low-latency trade-offs grounded in measurement." }]
  },
  {
    id: "infrastructure", title: "Infrastructure companies", context: "Systems depth, reliability, debugging, and operational trade-offs define the loop.",
    focus: ["Concurrency and distributed systems", "Capacity, reliability, and observability", "Production debugging and security boundaries"], practiceSetIds: ["coding-patterns", "system-design-loop", "devops-incident-loop", "security-case-room"],
    rounds: [{ title: "Systems coding", timeboxMinutes: 55, signal: "Ownership, concurrency, resource bounds, and tests." }, { title: "Infrastructure design", timeboxMinutes: 60, signal: "Failure domains, capacity, and operability." }, { title: "Incident debugging", timeboxMinutes: 50, signal: "Evidence-led narrowing, containment, and verification." }]
  }
]);

export const mockLoops: MockLoop[] = MockLoopSchema.array().parse([
  {
    id: "ai-product-launch", title: "AI product launch", summary: "Cross AI evaluation, architecture, security, and stakeholder judgment in one loop.", durationMinutes: 110,
    questionIds: ["sim-ai-ranking-drift", "sim-design-notification-platform", "security-ai-rag-agent", "sim-behavioral-ambiguity"],
    stages: [{ title: "Model and product case", timeboxMinutes: 25, evidence: "Metrics, experiment validity, slices, and a release decision." }, { title: "AI system design", timeboxMinutes: 45, evidence: "Data, serving, evaluation, safety, fallback, and operations." }, { title: "Security review", timeboxMinutes: 25, evidence: "Authorization, content trust, tool controls, and audit." }, { title: "Debrief", timeboxMinutes: 15, evidence: "One knowledge gap and one communication gap saved for revision." }]
  },
  {
    id: "regulated-payments", title: "Regulated payments launch", summary: "Cross SQL, payment correctness, tenant security, and zero-downtime delivery.", durationMinutes: 120,
    questionIds: ["sim-sql-ledger-balance", "sim-fintech-reconciliation-break", "sim-security-tenant-export", "sim-devops-regional-rollout"],
    stages: [{ title: "Data correctness", timeboxMinutes: 25, evidence: "Exact arithmetic, ledger balance, and completeness checks." }, { title: "Payment case", timeboxMinutes: 35, evidence: "State, external evidence, reconciliation, and close." }, { title: "Security boundary", timeboxMinutes: 30, evidence: "Tenant authorization, export lifecycle, and misuse tests." }, { title: "Release plan", timeboxMinutes: 30, evidence: "Compatibility, rollback, financial verification, and failover." }]
  },
  {
    id: "production-infrastructure", title: "Production infrastructure", summary: "Cross capacity, Kubernetes, security incident, and behavioral leadership.", durationMinutes: 110,
    questionIds: ["sim-estimation-queue", "devops-k8s-pending", "security-cloud-key-leak", "sim-behavioral-incident-disagreement"],
    stages: [{ title: "Capacity", timeboxMinutes: 20, evidence: "Units, queue math, drain plan, and constraints." }, { title: "Debugging", timeboxMinutes: 30, evidence: "Scheduler/autoscaler evidence and minimal correction." }, { title: "Security incident", timeboxMinutes: 30, evidence: "Containment, scope, trusted recovery, and redesign." }, { title: "Leadership debrief", timeboxMinutes: 30, evidence: "Urgency, disagreement, communication, and changed practice." }]
  },
  {
    id: "quant-trading", title: "Quant trading systems", summary: "Cross probability, coding, low-latency architecture, and estimation.", durationMinutes: 105,
    questionIds: ["sim-probability-collision", "sim-coding-fraud-window", "quant-low-latency-feed", "sim-estimation-cache"],
    stages: [{ title: "Probability", timeboxMinutes: 18, evidence: "Correct approximation and operational implication." }, { title: "Coding", timeboxMinutes: 32, evidence: "Invariant, complexity, late-data contract, and tests." }, { title: "Low-latency design", timeboxMinutes: 35, evidence: "Ownership, gaps, recovery, resource bounds, and measurement." }, { title: "Capacity check", timeboxMinutes: 20, evidence: "Throughput, working set, failure headroom, and missing measurements." }]
  }
]);

export const companyArchetypeById = new Map(companyArchetypes.map((archetype) => [archetype.id, archetype]));
export const mockLoopById = new Map(mockLoops.map((loop) => [loop.id, loop]));
