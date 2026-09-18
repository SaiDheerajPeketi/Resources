import { DiagnosticSchema, type Diagnostic } from "@/lib/schema";

export type DiagnosticQuestion = { id: string; prompt: string; options: string[]; answer: number; competencyId: string; explanation: string };
export const diagnosticQuestions: DiagnosticQuestion[] = [
  { id: "diag-complexity", prompt: "A loop halves n on each iteration. What is its time complexity?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answer: 1, competencyId: "dsa", explanation: "The number of halvings before reaching one is logarithmic." },
  { id: "diag-hash", prompt: "What makes expected hash-table lookup constant time?", options: ["Sorted keys", "Bounded load and well-distributed hashes", "A balanced tree", "Contiguous values"], answer: 1, competencyId: "dsa", explanation: "Expected chain or probe length stays bounded when distribution and load are controlled." },
  { id: "diag-isolation", prompt: "Which anomaly can snapshot isolation still permit?", options: ["Dirty read", "Write skew", "Reading uncommitted WAL", "Torn pages"], answer: 1, competencyId: "core-cs", explanation: "Concurrent transactions can each observe a valid snapshot and jointly violate a cross-row invariant." },
  { id: "diag-vm", prompt: "A page fault means…", options: ["the CPU divided by zero", "a virtual page needs mapping or loading", "the process exceeded a socket limit", "the filesystem is corrupt"], answer: 1, competencyId: "core-cs", explanation: "The memory access could not be resolved by the current page-table mapping." },
  { id: "diag-tcp", prompt: "TCP flow control protects which party?", options: ["the receiver", "the router", "the DNS resolver", "the certificate authority"], answer: 0, competencyId: "networking", explanation: "The advertised receive window limits outstanding data to receiver capacity." },
  { id: "diag-tls", prompt: "What does a server certificate primarily bind?", options: ["a password to a user", "an identity to a public key", "a port to a process", "a packet to a route"], answer: 1, competencyId: "security", explanation: "A CA-signed certificate binds subject identity claims to a public key." },
  { id: "diag-cache", prompt: "Which cache risk remains after adding a TTL?", options: ["stale reads", "syntax errors", "missing TLS keys", "unbounded CPU registers"], answer: 0, competencyId: "system-design", explanation: "TTL bounds but does not eliminate stale data or coordinated expiry spikes." },
  { id: "diag-queue", prompt: "At-least-once delivery requires consumers to be…", options: ["single-threaded", "idempotent", "stateless only", "written in Java"], answer: 1, competencyId: "system-design", explanation: "Retries can duplicate delivery, so processing must tolerate repeats." },
  { id: "diag-java", prompt: "Which Java construct best represents immutable named data?", options: ["record", "finalizer", "raw type", "volatile loop"], answer: 0, competencyId: "languages", explanation: "Records provide final components, generated accessors, equality, and concise invariant checks." },
  { id: "diag-python", prompt: "What does an async Python task yield during awaited I/O?", options: ["its whole process", "control to the event loop", "its type annotations", "the GIL permanently"], answer: 1, competencyId: "languages", explanation: "Await suspends the coroutine so the event loop can advance other ready tasks." },
  { id: "diag-ml", prompt: "Why must preprocessing be fit inside each validation fold?", options: ["to speed up training", "to prevent leakage", "to increase parameters", "to remove labels"], answer: 1, competencyId: "ai-data", explanation: "Fitting on all data lets validation information influence training transformations." },
  { id: "diag-sre", prompt: "An error budget primarily connects reliability to…", options: ["a cryptographic key", "delivery and risk decisions", "a programming language", "a DNS record"], answer: 1, competencyId: "devops", explanation: "Budget consumption gives teams a common basis for balancing change velocity and reliability work." }
];

export const diagnostics: Diagnostic[] = DiagnosticSchema.array().parse([
  { id: "universal-baseline", title: "Universal baseline", summary: "A short optional scan across DSA, core CS, systems, security, languages, AI/data, and operations.", questionIds: diagnosticQuestions.map((question) => question.id), competencyIds: [...new Set(diagnosticQuestions.map((question) => question.competencyId))] }
]);

export const rolePaths = [
  ["frontend", "Frontend Engineer", ["web-platform", "javascript", "typescript", "react", "nextjs", "playwright"]],
  ["backend", "Backend Engineer", ["java", "spring-boot", "postgresql", "redis", "kafka", "docker"]],
  ["full-stack", "Full-Stack Engineer", ["typescript", "react", "nextjs", "nodejs", "postgresql", "playwright"]],
  ["java", "Java Engineer", ["java", "spring", "spring-boot", "hibernate", "junit-mockito", "maven"]],
  ["python", "Python Engineer", ["python", "fastapi", "django", "pytest", "postgresql", "docker"]],
  ["go", "Go Engineer", ["go", "go-http", "gin", "postgresql", "kubernetes", "observability"]],
  ["android", "Android Engineer", ["java", "kotlin", "android", "jetpack-compose", "gradle", "sqlite"]],
  ["ios", "iOS Engineer", ["swift", "ios", "swiftui", "sqlite", "git", "cicd"]],
  ["mobile", "Cross-Platform Mobile Engineer", ["typescript", "react-native", "dart", "flutter", "cicd", "observability"]],
  ["qa-sdet", "QA / SDET", ["java", "typescript", "selenium", "playwright", "cypress", "cicd"]],
  ["data-analyst", "Data Analyst", ["sql", "python", "pandas", "jupyter", "postgresql", "dbt"]],
  ["dba", "Database Administrator", ["dbms", "sql", "postgresql", "mysql", "redis", "linux"]],
  ["cloud-architect", "Cloud Architect", ["aws", "azure", "gcp", "terraform", "kubernetes", "cloud-security"]],
  ["solutions-architect", "Solutions Architect", ["computer-networks", "dbms", "aws", "kubernetes", "observability", "cloud-security"]],
  ["ai-engineer", "AI Engineer", ["python", "pytorch", "hugging-face", "langchain", "llamaindex", "kubernetes"]]
] as const;

export const rolePathRecords = rolePaths.map(([id, title, technologyIds]) => ({ id, title, technologyIds: [...technologyIds], sheetId: id === "data-analyst" ? "atlas-75" : "atlas-180", foundationTopicIds: ["foundations/complexity-analysis", "foundations/sql-fundamentals", "foundations/networking-fundamentals"], reason: `Selected because ${title} interviews combine foundations, implementation fluency, debugging, and production trade-offs.` }));
