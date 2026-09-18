import {
  ConceptEdgeSchema,
  RoleProfileSchema,
  TopicMetaSchema,
  TrackSchema,
  type ConceptEdge,
  type RoleProfile,
  type TopicMeta,
  type Track,
  type TrackId
} from "@/lib/schema";
import { foundationLessons } from "@/data/foundation-lessons";
import { aiLessons } from "@/data/ai-lessons";
import { sdeLessons } from "@/data/sde-lessons";
import { devopsLessons } from "@/data/devops-lessons";
import { securityLessons } from "@/data/security-lessons";
import { fintechLessons } from "@/data/fintech-lessons";

export const CONTENT_MANIFEST_VERSION = "2026.09.18-r8";

export const roles: RoleProfile[] = RoleProfileSchema.array().parse([
  { id: "sde", title: "Software Engineer", description: "Generalist, backend, full-stack, and systems interviews.", trackIds: ["foundations", "sde-systems"] },
  { id: "ai-engineer", title: "AI Engineer", description: "Production LLM, RAG, agent, evaluation, and AI platform work.", trackIds: ["foundations", "ai-data", "sde-systems"] },
  { id: "ml-engineer", title: "ML Engineer", description: "Modeling, ML systems, serving, data, and MLOps.", trackIds: ["foundations", "ai-data", "sde-systems"] },
  { id: "data-scientist", title: "Data Scientist", description: "Statistics, experimentation, SQL, modeling, and product cases.", trackIds: ["foundations", "ai-data"] },
  { id: "data-engineer", title: "Data Engineer", description: "Pipelines, storage, data modeling, distributed systems, and reliability.", trackIds: ["foundations", "ai-data", "sde-systems", "devops-cloud"] },
  { id: "mlops-engineer", title: "MLOps Engineer", description: "Training platforms, model delivery, feature systems, observability, and ML reliability.", trackIds: ["foundations", "ai-data", "sde-systems", "devops-cloud"] },
  { id: "devops", title: "DevOps / Platform Engineer", description: "Delivery systems, cloud platforms, infrastructure, and operations.", trackIds: ["foundations", "devops-cloud", "cybersecurity"] },
  { id: "sre", title: "Site Reliability Engineer", description: "Reliability, observability, incidents, performance, and capacity.", trackIds: ["foundations", "sde-systems", "devops-cloud"] },
  { id: "security", title: "Security Engineer", description: "Application, cloud, platform, and incident security.", trackIds: ["foundations", "cybersecurity", "devops-cloud"] },
  { id: "fintech", title: "Fintech Engineer", description: "Payments, ledgers, risk, fraud, reconciliation, and resilient financial systems.", trackIds: ["foundations", "sde-systems", "fintech-quant", "cybersecurity"] },
  { id: "quant-dev", title: "Quant Developer", description: "Markets, probability, pricing, backtesting, and low-latency C++.", trackIds: ["foundations", "sde-systems", "fintech-quant"] },
  { id: "quant-research", title: "Quant Researcher", description: "Statistics, time series, stochastic models, and strategy research.", trackIds: ["foundations", "ai-data", "fintech-quant"] }
]);

export const tracks: Track[] = TrackSchema.array().parse([
  { id: "foundations", title: "Foundations", shortTitle: "Foundations", description: "C++, DSA, mathematics, SQL, Linux, networking, and interview fundamentals.", accent: "#1E76F3", roleIds: ["sde", "ai-engineer", "ml-engineer", "data-scientist", "data-engineer", "mlops-engineer", "devops", "sre", "security", "fintech", "quant-dev", "quant-research"] },
  { id: "ai-data", title: "AI + Data", shortTitle: "AI + Data", description: "Statistics, machine learning, deep learning, LLM systems, data science, and MLOps.", accent: "#6A55C7", roleIds: ["ai-engineer", "ml-engineer", "data-scientist", "data-engineer", "mlops-engineer", "quant-research"] },
  { id: "sde-systems", title: "SDE + Systems", shortTitle: "SDE + Systems", description: "Core CS, software design, backend systems, concurrency, and distributed architecture.", accent: "#245B8C", roleIds: ["sde", "ai-engineer", "ml-engineer", "data-engineer", "mlops-engineer", "sre", "fintech", "quant-dev"] },
  { id: "devops-cloud", title: "DevOps + Cloud", shortTitle: "DevOps + Cloud", description: "Delivery, containers, Kubernetes, IaC, observability, SRE, and four-cloud mappings.", accent: "#23766F", roleIds: ["devops", "sre", "data-engineer", "mlops-engineer", "security"] },
  { id: "cybersecurity", title: "Cybersecurity", shortTitle: "Cybersecurity", description: "Threat modeling, IAM, crypto, AppSec, cloud security, and incident response.", accent: "#9A5A13", roleIds: ["security", "devops", "sre", "fintech"] },
  { id: "fintech-quant", title: "Fintech + Quant", shortTitle: "Fintech + Quant", description: "Payments, ledgers, compliance, markets, pricing, risk, and low-latency systems.", accent: "#197B6F", roleIds: ["fintech", "quant-dev", "quant-research", "sde"] }
]);

const titlesByTrack: Record<TrackId, string[]> = {
  foundations: [
    "C++ Interview Setup", "Complexity Analysis", "STL and Iterators", "Arrays and Strings", "Hash Tables", "Stacks and Queues", "Linked Lists", "Trees and BSTs", "Heaps and Priority Queues", "Graphs", "Recursion and Backtracking", "Sorting and Binary Search", "Greedy Algorithms", "Dynamic Programming", "Bit Manipulation", "Discrete Mathematics", "Linear Algebra", "Probability", "Statistics", "SQL Fundamentals", "Linux and the CLI", "Networking Fundamentals", "Git, Testing, and Debugging", "Behavioral Interview Basics"
  ],
  "ai-data": [
    "Data Cleaning", "Exploratory Data Analysis", "Experiment Design", "Feature Engineering", "Linear Models", "Logistic Regression", "Tree Ensembles", "Unsupervised Learning", "Model Evaluation", "Optimization for ML", "Neural Network Foundations", "CNNs", "Sequence Models", "Transformers", "Natural Language Processing", "Computer Vision", "Recommender Systems", "Forecasting", "Embeddings", "Vector Search", "Retrieval-Augmented Generation", "Fine-Tuning", "Agents and Tool Use", "LLM Evaluation", "Responsible AI", "MLOps and ML System Design"
  ],
  "sde-systems": [
    "Object-Oriented Design", "Modern C++ Internals", "Memory Management", "Concurrency", "Operating Systems", "Database Systems", "API Design", "Backend Architecture", "Browser and Web Foundations", "Mobile Foundations", "Testing Strategy", "Performance Engineering", "SOLID and Design Patterns", "Low-Level Design", "Distributed Systems Foundations", "Consistent Hashing", "Consistency Models", "Caching", "Queues and Event Streams", "Storage Systems", "Capacity Planning", "Reliability Engineering", "Observability", "System Design Interview Method", "System Design Case Studies"
  ],
  "devops-cloud": [
    "Shell Scripting", "Linux Internals", "DNS and TLS", "Production Networking", "GitOps", "CI/CD", "Containers", "Kubernetes Reconciliation", "Kubernetes Operations", "Infrastructure as Code", "Terraform", "Configuration and Secrets", "Release Strategies", "Observability Stack", "SLIs, SLOs, and Error Budgets", "Incident Response", "Disaster Recovery", "Platform Engineering", "FinOps", "Service Mesh", "AWS Service Map", "Azure Service Map", "GCP Service Map", "OCI Translation Matrix"
  ],
  cybersecurity: [
    "Security Foundations", "Threat Modeling", "Applied Cryptography", "PKI and TLS", "Identity and Access Management", "Web Security", "API Security", "Network Security", "Secure Coding", "Application Security", "Cloud Security", "Container Security", "Kubernetes Security", "Software Supply Chain", "DevSecOps", "Vulnerability Management", "Detection Engineering", "Incident Response", "Forensics Basics", "AI Security", "Fintech Security", "OWASP and NIST Mappings"
  ],
  "fintech-quant": [
    "Money Representation", "Double-Entry Ledgers", "Idempotency", "Payment Lifecycles", "Card Networks", "UPI", "Open Banking", "Lending Systems", "Reconciliation", "Clearing and Settlement", "Fraud Systems", "KYC and AML", "PCI Concepts", "Auditability", "Financial Resilience", "Market Microstructure", "Order Books", "Stochastic Processes", "Time Series", "Derivatives Pricing", "Portfolio and Risk", "Backtesting", "Low-Latency C++", "Quant Puzzles", "India, US, and EU Regulation"
  ]
};

const slugify = (value: string) => value.toLowerCase().replace(/\+/g, " plus ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const published: Record<string, Partial<TopicMeta>> = {
  "foundations/hash-tables": {
    summary: "Key-value storage, collision handling, load factor, resizing, and interview-grade implementations.", level: "foundation", durationMinutes: 35,
    roleIds: ["sde", "ai-engineer", "ml-engineer", "data-engineer", "security", "fintech", "quant-dev"],
    prerequisites: ["foundations/complexity-analysis", "foundations/arrays-and-strings"],
    outcomes: ["Explain expected O(1) operations", "Compare collision strategies", "Implement a robust C++ hash map sketch"]
  },
  "ai-data/model-evaluation": {
    summary: "Select metrics, design validation, diagnose leakage, and make model choices that survive production.", level: "interview", durationMinutes: 55,
    roleIds: ["ai-engineer", "ml-engineer", "data-scientist", "quant-research"],
    prerequisites: ["foundations/probability", "foundations/statistics"],
    outcomes: ["Match metrics to business costs", "Design leakage-safe validation", "Explain threshold and calibration trade-offs"]
  },
  "sde-systems/consistent-hashing": {
    summary: "Partition data across changing node sets while minimizing movement and balancing load.", level: "interview", durationMinutes: 45,
    roleIds: ["sde", "data-engineer", "sre", "fintech", "quant-dev"],
    prerequisites: ["foundations/hash-tables", "sde-systems/distributed-systems-foundations"],
    outcomes: ["Derive movement under modulo hashing", "Explain virtual nodes", "Recognize hot-key and heterogeneity limits"]
  },
  "devops-cloud/kubernetes-reconciliation": {
    summary: "Understand desired state, controllers, work queues, idempotency, and failure recovery in Kubernetes.", level: "interview", durationMinutes: 50,
    roleIds: ["devops", "sre", "data-engineer", "security"],
    prerequisites: ["devops-cloud/containers", "foundations/networking-fundamentals"],
    outcomes: ["Trace a reconciliation loop", "Separate spec from observed state", "Debug stuck resources systematically"]
  },
  "cybersecurity/threat-modeling": {
    summary: "Convert architecture into assets, trust boundaries, abuse cases, mitigations, and testable security requirements.", level: "foundation", durationMinutes: 45,
    roleIds: ["security", "devops", "sre", "fintech", "sde"],
    prerequisites: ["cybersecurity/security-foundations", "foundations/networking-fundamentals"],
    outcomes: ["Draw trust boundaries", "Apply STRIDE without checklist theater", "Prioritize mitigations by risk and evidence"]
  },
  "fintech-quant/double-entry-ledgers": {
    summary: "Model immutable balanced postings, account invariants, reversals, reconciliation, and audit trails.", level: "interview", durationMinutes: 60,
    roleIds: ["fintech", "sde", "data-engineer", "security"],
    prerequisites: ["fintech-quant/money-representation", "foundations/sql-fundamentals"],
    outcomes: ["Preserve balanced postings", "Separate business events from ledger entries", "Design safe corrections and reconciliation"]
  }
};

const defaultRoles: Record<TrackId, string[]> = {
  foundations: ["sde", "ai-engineer", "ml-engineer", "data-scientist"],
  "ai-data": ["ai-engineer", "ml-engineer", "data-scientist", "data-engineer"],
  "sde-systems": ["sde", "data-engineer", "sre"],
  "devops-cloud": ["devops", "sre", "security"],
  cybersecurity: ["security", "devops", "fintech"],
  "fintech-quant": ["fintech", "quant-dev", "quant-research"]
};

export const topics: TopicMeta[] = TopicMetaSchema.array().parse(
  tracks.flatMap((track) => titlesByTrack[track.id].map((title, index) => {
    const localSlug = slugify(title);
    const slug = `${track.id}/${localSlug}`;
    const custom = published[slug] ?? foundationLessons[slug] ?? aiLessons[slug] ?? sdeLessons[slug] ?? devopsLessons[slug] ?? securityLessons[slug] ?? fintechLessons[slug];
    return {
      id: slug,
      slug,
      localSlug,
      trackId: track.id,
      title,
      summary: custom?.summary ?? `Planned field note covering ${title.toLowerCase()} for ${track.shortTitle.toLowerCase()} interviews.`,
      level: custom?.level ?? (index < 8 ? "foundation" : index < 18 ? "interview" : "advanced"),
      publicationStatus: custom ? "published" : "planned",
      durationMinutes: custom?.durationMinutes ?? (index < 8 ? 35 : index < 18 ? 50 : 65),
      roleIds: custom?.roleIds ?? defaultRoles[track.id],
      prerequisites: custom?.prerequisites ?? [],
      outcomes: custom?.outcomes ?? [],
      lastReviewed: "2026-09-18",
      ...(track.id === "fintech-quant" || track.id === "cybersecurity" || track.id === "devops-cloud" ? { asOf: "2026-09-18" } : {})
    };
  }))
);

const edgePairs: Array<[string, string, ConceptEdge["kind"]]> = [
  ["foundations/complexity-analysis", "foundations/arrays-and-strings", "prerequisite"],
  ["foundations/arrays-and-strings", "foundations/hash-tables", "prerequisite"],
  ["foundations/hash-tables", "foundations/graphs", "applied-in"],
  ["foundations/probability", "foundations/statistics", "prerequisite"],
  ["foundations/statistics", "ai-data/model-evaluation", "prerequisite"],
  ["foundations/linear-algebra", "ai-data/neural-network-foundations", "prerequisite"],
  ["ai-data/model-evaluation", "ai-data/llm-evaluation", "applied-in"],
  ["sde-systems/distributed-systems-foundations", "sde-systems/consistent-hashing", "prerequisite"],
  ["foundations/hash-tables", "sde-systems/consistent-hashing", "prerequisite"],
  ["sde-systems/consistent-hashing", "sde-systems/caching", "applied-in"],
  ["devops-cloud/containers", "devops-cloud/kubernetes-reconciliation", "prerequisite"],
  ["devops-cloud/kubernetes-reconciliation", "devops-cloud/kubernetes-operations", "applied-in"],
  ["cybersecurity/security-foundations", "cybersecurity/threat-modeling", "prerequisite"],
  ["cybersecurity/threat-modeling", "cybersecurity/application-security", "applied-in"],
  ["fintech-quant/money-representation", "fintech-quant/double-entry-ledgers", "prerequisite"],
  ["fintech-quant/double-entry-ledgers", "fintech-quant/reconciliation", "applied-in"],
  ["fintech-quant/double-entry-ledgers", "fintech-quant/payment-lifecycles", "applied-in"]
];

const prerequisitePairs: Array<[string, string, ConceptEdge["kind"]]> = topics.flatMap((topic) =>
  topic.prerequisites.map((source) => [source, topic.id, "prerequisite"] as [string, string, ConceptEdge["kind"]])
);
const uniqueEdgePairs = [...new Map([...edgePairs, ...prerequisitePairs].map((edge) => [`${edge[0]}->${edge[1]}:${edge[2]}`, edge])).values()];
export const edges: ConceptEdge[] = ConceptEdgeSchema.array().parse(uniqueEdgePairs.map(([source, target, kind]) => ({ id: `${source}->${target}:${kind}`, source, target, kind })));
export const publishedTopics = topics.filter((topic) => topic.publicationStatus === "published");
export const topicById = new Map(topics.map((topic) => [topic.id, topic]));
export const trackById = new Map(tracks.map((track) => [track.id, track]));

export function topicsForTrack(trackId: TrackId) {
  return topics.filter((topic) => topic.trackId === trackId);
}

export function validateCatalog() {
  const ids = new Set<string>();
  const duplicates: string[] = [];
  for (const topic of topics) {
    if (ids.has(topic.id)) duplicates.push(topic.id);
    ids.add(topic.id);
  }
  const dangling = edges.filter((edge) => !ids.has(edge.source) || !ids.has(edge.target)).map((edge) => edge.id);
  const missingPrerequisites = topics.flatMap((topic) => topic.prerequisites.filter((id) => !ids.has(id)).map((id) => `${topic.id}:${id}`));
  return { duplicates, dangling, missingPrerequisites };
}
