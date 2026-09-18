import { QuestionSchema, type Question } from "@/lib/schema";
import { foundationLessons } from "@/data/foundation-lessons";
import { aiLessons } from "@/data/ai-lessons";
import { sdeLessons } from "@/data/sde-lessons";

const handcraftedQuestions: Question[] = [
  {
    id: "hash-load-factor", topicId: "foundations/hash-tables", trackId: "foundations", type: "short", difficulty: "medium", timeboxMinutes: 5,
    prompt: "Why does a production hash table resize before every bucket is occupied, and what trade-off does the load-factor threshold control?",
    hints: ["Think about collision probability rather than physical capacity.", "Relate expected probe or chain length to the number of stored entries per bucket."],
    answer: "The table resizes to keep expected collision cost bounded. A lower threshold spends more memory and copies more often but preserves shorter chains or probe sequences; a higher threshold improves space use while degrading latency and increasing clustering risk.",
    rubric: ["Connects load factor to collisions", "Explains memory/latency trade-off", "Mentions resize or rehash cost"], tags: ["hashing", "complexity"]
  },
  {
    id: "hash-design", topicId: "foundations/hash-tables", trackId: "foundations", type: "coding", difficulty: "hard", timeboxMinutes: 30,
    prompt: "Design a C++ hash map for string keys using separate chaining. Explain ownership, iterator invalidation, rehashing, and adversarial-input risks.",
    hints: ["Separate the bucket array from entry storage.", "State what references survive a rehash."],
    answer: "Use a vector of bucket lists or nodes, compute an index from a seeded hash, and maintain size/load factor. On insertion update or append; on threshold breach allocate a larger bucket array and relink or move entries. Define whether references and iterators are invalidated. A keyed or randomized hash and collision monitoring reduce adversarial clustering.",
    rubric: ["Correct core operations", "Clear ownership model", "Explicit invalidation contract", "Addresses adversarial collisions"], tags: ["c++", "design"]
  },
  {
    id: "metric-choice", topicId: "ai-data/model-evaluation", trackId: "ai-data", type: "case", difficulty: "medium", timeboxMinutes: 12,
    prompt: "A fraud model sees 0.2% positives. False negatives cost ₹8,000 on average and false positives cost ₹35 in review time. Propose an evaluation and threshold-selection plan.",
    hints: ["Accuracy is not decision-aware.", "Turn the cost asymmetry into an expected-value calculation."],
    answer: "Use time-aware or entity-aware validation, report precision-recall behavior and calibration, then choose a threshold by expected cost or constrained recall/precision. Validate the threshold on an untouched future-like set, segment by channel and customer cohort, and monitor base-rate and calibration drift.",
    rubric: ["Rejects accuracy", "Uses leakage-safe validation", "Connects threshold to cost", "Includes calibration and drift"], tags: ["ml", "fraud", "metrics"]
  },
  {
    id: "ring-movement", topicId: "sde-systems/consistent-hashing", trackId: "sde-systems", type: "system-design", difficulty: "medium", timeboxMinutes: 15,
    prompt: "A cache cluster grows from 20 to 21 equal nodes. Compare expected key movement under modulo partitioning and consistent hashing with virtual nodes.",
    hints: ["Modulo changes the divisor.", "On a ring, only the new node's owned intervals change hands."],
    answer: "Modulo hashing remaps almost every key because hash(key) mod 20 differs from mod 21 for most hashes. Consistent hashing moves roughly 1/21 of keys to the new node when positions are balanced. Virtual nodes reduce variance and support weighted capacity but do not solve hot keys.",
    rubric: ["Contrasts global and local remapping", "Gives approximate movement", "Explains virtual-node purpose", "Names a remaining limitation"], tags: ["distributed", "caching"]
  },
  {
    id: "reconcile-loop", topicId: "devops-cloud/kubernetes-reconciliation", trackId: "devops-cloud", type: "short", difficulty: "medium", timeboxMinutes: 8,
    prompt: "A Deployment requests five replicas but only three remain ready. Walk through the control path and name three reasons the system may not converge.",
    hints: ["Separate desired objects, created objects, and ready workloads.", "Consider scheduling, image startup, and readiness."],
    answer: "The Deployment controller ensures a ReplicaSet with the desired count; the ReplicaSet controller creates Pods; the scheduler binds pending Pods; kubelets start containers and readiness gates availability. Convergence may fail because of insufficient schedulable resources, image pull or startup failures, admission/policy rejection, failing readiness probes, or controller/API connectivity issues.",
    rubric: ["Correct controller chain", "Distinguishes running from ready", "Names three plausible failures"], tags: ["kubernetes", "debugging"]
  },
  {
    id: "stride-boundary", topicId: "cybersecurity/threat-modeling", trackId: "cybersecurity", type: "case", difficulty: "medium", timeboxMinutes: 15,
    prompt: "Threat-model a password-reset flow that sends an emailed token and changes credentials through a public API. Identify the most important trust boundaries and abuse cases.",
    hints: ["Follow data from an unauthenticated client through email and back.", "Consider token lifecycle, enumeration, replay, and session state."],
    answer: "Boundaries include the public client/API, identity store, token store or signer, email provider, and the user's mailbox. Abuse cases include account enumeration, token guessing/leakage/replay, token reuse after password change, CSRF, rate-limit evasion, mailbox compromise, host-header poisoning in links, and leaving prior sessions active. Mitigations require opaque high-entropy single-use expiring tokens, consistent responses, rate controls, trusted link construction, secure storage, session revocation policy, and auditable events.",
    rubric: ["Draws real trust boundaries", "Covers token lifecycle", "Covers enumeration and replay", "Maps mitigations to abuse cases"], tags: ["stride", "identity", "api"]
  },
  {
    id: "ledger-refund", topicId: "fintech-quant/double-entry-ledgers", trackId: "fintech-quant", type: "case", difficulty: "hard", timeboxMinutes: 20,
    prompt: "A ₹1,000 card purchase settles, then receives a ₹300 partial refund. Model the business events and ledger postings without mutating settled history.",
    hints: ["Use separate balanced transactions for purchase, settlement, and refund.", "A correction is a new event, not an UPDATE."],
    answer: "Record each stage as an immutable balanced transaction using accounts appropriate to authorization/clearing/settlement. The partial refund posts a new ₹300 reversal or refund transaction that debits the merchant/refund liability side and credits the customer or settlement receivable side, preserving the original ₹1,000 entries. Link by business identifiers, enforce idempotency, and reconcile the net ₹700 exposure to processor statements.",
    rubric: ["Immutable history", "Balanced refund postings", "Separates business events", "Mentions idempotency and reconciliation"], tags: ["ledger", "payments"]
  }
];

const foundationQuestions = Object.entries(foundationLessons).map(([topicId, lesson]) => ({
  ...lesson.question,
  topicId,
  trackId: "foundations" as const
}));

const aiQuestions = Object.entries(aiLessons).map(([topicId, lesson]) => ({
  ...lesson.question,
  topicId,
  trackId: "ai-data" as const
}));

const sdeQuestions = Object.entries(sdeLessons).map(([topicId, lesson]) => ({
  ...lesson.question,
  topicId,
  trackId: "sde-systems" as const
}));

export const questions: Question[] = QuestionSchema.array().parse([
  ...handcraftedQuestions,
  ...foundationQuestions,
  ...aiQuestions,
  ...sdeQuestions
]);

export const questionById = new Map(questions.map((question) => [question.id, question]));
