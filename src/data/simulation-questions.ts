import { QuestionSchema, type Question } from "@/lib/schema";

export const simulationQuestions: Question[] = QuestionSchema.array().parse([
  {
    id: "sim-coding-fraud-window", topicId: "foundations/arrays-and-strings", trackId: "foundations", type: "coding", difficulty: "hard", timeboxMinutes: 35,
    prompt: "Given a time-ordered stream of card attempts, return every account whose approved amount exceeds a threshold inside any rolling 10-minute window. Events may share timestamps; explain the online and batch variants.",
    hints: ["Maintain one monotone time window per account.", "Decide how late or out-of-order events change the contract."],
    answer: "For ordered input, keep a deque of approved events and a running sum per account. Before adding an event, evict entries older than the inclusive/exclusive window boundary, then add approved value and test the threshold; each event enters and leaves once, so total work is O(n) with space proportional to live-window events. For batch input, sort by account and event time or partition then use two pointers. In production, define currency, duplicates, equal timestamps, late-event watermark, correction, and alert-deduplication semantics explicitly.",
    rubric: ["Correct per-key sliding-window invariant", "Linear ordered-stream analysis", "Batch or out-of-order treatment", "Boundary, duplicate, and money semantics"], tags: ["coding", "sliding-window", "fintech"]
  },
  {
    id: "sim-sql-funnel", topicId: "foundations/sql-fundamentals", trackId: "foundations", type: "coding", difficulty: "hard", timeboxMinutes: 30,
    prompt: "Write SQL to report, by signup week, users who signed up, completed KYC within seven days, and made a first successful payment within fourteen days without inflating counts from repeated events.",
    hints: ["Reduce each event stream to one qualifying row per user before joining.", "Preserve signup cohorts with no downstream event."],
    answer: "Build a signup cohort CTE, a KYC CTE grouped to the first qualifying completion per user, and a payments CTE grouped to the first successful payment. LEFT JOIN both one-row-per-user relations to signups with timestamp predicates relative to signup, then aggregate distinct cohort users and conditional matched indicators by signup week. State the SQL dialect's date arithmetic, UTC/business-time policy, duplicate event handling, and whether payment qualification requires KYC first. Validate denominator counts before calculating rates.",
    rubric: ["One row per user before joins", "Correct relative time windows", "Preserves zero-conversion cohorts", "Explicit event and time semantics"], tags: ["sql", "funnels", "aggregation"]
  },
  {
    id: "sim-sql-sessionize", topicId: "foundations/sql-fundamentals", trackId: "foundations", type: "coding", difficulty: "hard", timeboxMinutes: 30,
    prompt: "Sessionize clickstream events by user with a new session after more than 30 minutes of inactivity, then return each session's start, end, and event count.",
    hints: ["Use LAG within each user before assigning a cumulative group.", "Define what happens at exactly 30 minutes."],
    answer: "Order events by user and timestamp with a deterministic tie-breaker. Use LAG to compare each event to the prior timestamp and flag the first event or a gap greater than 30 minutes. A cumulative SUM of the flag over each user creates a session number; group by user and that number for MIN timestamp, MAX timestamp, and COUNT. State the exact-boundary rule, timestamp zone, duplicate-event policy, late-arrival behavior, and whether a session containing one event has zero or unknown duration.",
    rubric: ["Correct partition and ordering", "Gap flag with explicit boundary", "Cumulative session identifier", "Handles duplicates, ties, and late data"], tags: ["sql", "windows", "sessionization"]
  },
  {
    id: "sim-sql-ledger-balance", topicId: "foundations/sql-fundamentals", trackId: "foundations", type: "coding", difficulty: "hard", timeboxMinutes: 30,
    prompt: "Given ledger_entries(transaction_id, account_id, currency, direction, amount_minor, posted_at), find unbalanced transactions and produce daily account balances without using floating point.",
    hints: ["Convert direction into a signed integer amount.", "Balance transactions per currency before building the account projection."],
    answer: "Normalize each entry to signed minor units with a CASE expression, rejecting unknown direction and preserving currency. Group by transaction_id and currency; any nonzero signed sum is unbalanced. For account balances, aggregate signed minor units by account, currency, and business date, then use a cumulative window SUM ordered by date. Keep opening balance and posting-status semantics explicit, never combine currencies, use a sufficiently wide integer/decimal type, and separately reconcile entry counts and totals to the source population.",
    rubric: ["Exact signed minor-unit arithmetic", "Transaction balance per currency", "Correct cumulative account projection", "Posting, opening balance, and completeness semantics"], tags: ["sql", "ledger", "window-functions"]
  },
  {
    id: "sim-ai-ranking-drift", topicId: "ai-data/model-evaluation", trackId: "ai-data", type: "case", difficulty: "hard", timeboxMinutes: 25,
    prompt: "A recommendation ranker improves offline NDCG but lowers long-session retention after launch. Diagnose the disagreement and propose a safe next experiment.",
    hints: ["Offline relevance labels may encode the old policy.", "Check short-term engagement, diversity, latency, and marketplace feedback loops."],
    answer: "First verify assignment, exposure, guardrails, data quality, and slice effects. Offline NDCG may use position-biased logs from the old ranker and miss novelty, diversity, latency, creator supply, or repeated-session fatigue. Trace candidate recall through ranking and serving, compare calibration and outcome distributions, and inspect treatment-induced feedback. Roll back if guardrails breach. Build debiased or randomized evaluation data, add long-horizon and ecosystem metrics, then run a smaller predeclared experiment with explicit decision rules and monitoring.",
    rubric: ["Challenges offline-label validity", "Checks experiment and serving integrity", "Explains feedback and long-horizon effects", "Proposes a controlled next decision"], tags: ["ai", "ranking", "experimentation"]
  },
  {
    id: "sim-design-notification-platform", topicId: "sde-systems/system-design-case-studies", trackId: "sde-systems", type: "system-design", difficulty: "hard", timeboxMinutes: 45,
    prompt: "Design a multi-tenant notification platform for transactional email, SMS, and push with preferences, provider failover, scheduled sends, and auditable delivery status.",
    hints: ["Separate accepted intent from provider attempts and user-visible delivery.", "Ordering, retries, and failover can create duplicate messages."],
    answer: "Define tenant/auth/quota boundaries and an idempotent send API. Persist notification intent, rendered template version, recipient policy snapshot, schedule, and status; publish through an outbox into partitioned channel workers. Workers enforce preferences and quiet hours, rate limits, provider routing, stable attempt IDs, bounded retry, and policy-controlled failover. Provider callbacks deduplicate and conditionally advance state. Protect secrets and PII, offer cancellation where semantics permit, archive audit evidence, and expose lag, acceptance-to-provider latency, delivery outcomes, duplicate rate, and reconciliation for stuck or unknown attempts.",
    rubric: ["Clear APIs, state, and tenancy", "Idempotent delivery and callback flow", "Preference, retry, and failover semantics", "Scale, security, audit, and observability"], tags: ["system-design", "notifications", "messaging"]
  },
  {
    id: "sim-fintech-reconciliation-break", topicId: "fintech-quant/reconciliation", trackId: "fintech-quant", type: "case", difficulty: "hard", timeboxMinutes: 30,
    prompt: "A payment processor says yesterday settled, the bank statement is short by ₹18 lakh, and the internal ledger balances. Lead the investigation and close process.",
    hints: ["A balanced internal ledger does not prove an external cash movement.", "Prove input completeness before matching individual transactions."],
    answer: "Freeze the close and preserve raw processor, bank, and ledger inputs with checksums, periods, sequence, row counts, and amount totals. Confirm business date, currency, fees, reserves, netting, cutoffs, and late files. Reconcile processor obligations to settlement instructions, bank credits, and ledger clearing/cash accounts using stable references, then classify timing, fee, reserve, duplicate, reversal, or missing-cash exceptions. Escalate material exposure and liquidity impact, use approved immutable corrections only after evidence, rerun deterministically, and document unresolved ownership and the final three-way proof.",
    rubric: ["Completeness and control totals first", "Three-way evidence-led matching", "Materiality, liquidity, and escalation", "Governed correction and close proof"], tags: ["fintech", "reconciliation", "settlement"]
  },
  {
    id: "sim-security-tenant-export", topicId: "cybersecurity/api-security", trackId: "cybersecurity", type: "case", difficulty: "hard", timeboxMinutes: 30,
    prompt: "Threat-model and secure an asynchronous API that exports a tenant's customer data to a downloadable archive.",
    hints: ["Authorization must survive from request through worker and download.", "Consider confused deputy, archive content, retention, and audit."],
    answer: "Authorize the export action against tenant, dataset, purpose, and role; create an immutable scoped job carrying server-resolved tenant identity rather than client filters. Workers use narrow workload identity and tenant-scoped queries, cap resources, sanitize spreadsheet/archive outputs, encrypt storage, and never log exported data. The download uses short-lived audience-bound access after reauthorization, with one tenant-safe object key and strict content disposition. Add approval for high-risk scope, rate/volume controls, expiry/deletion, audit of request/generation/download, anomaly detection, cancellation, and tests for cross-tenant object reference, queue tampering, stale permission, and partial failure.",
    rubric: ["End-to-end tenant authorization", "Safe worker and archive boundary", "Short-lived download and lifecycle", "Abuse tests, audit, and operational controls"], tags: ["security", "api", "multi-tenant"]
  },
  {
    id: "sim-devops-regional-rollout", topicId: "devops-cloud/release-strategies", trackId: "devops-cloud", type: "case", difficulty: "hard", timeboxMinutes: 30,
    prompt: "Plan a zero-downtime regional rollout of a payment API with a backward-incompatible database change and a strict rollback requirement.",
    hints: ["Database compatibility must span old and new application versions.", "Traffic rollout and schema contraction should be separate decisions."],
    answer: "Use expand-migrate-contract: add backward-compatible schema first, verify old application behavior, deploy code that can read/write the expanded model with idempotent migration paths, then backfill in bounded resumable batches with checksums and lag controls. Canary one cell/region, compare SLIs and financial invariants, and progressively shift traffic with automated halt gates. Rollback code while expanded schema remains safe; do not contract until every old version is gone, backfill is proven, and a separate reviewed release approves it. Reconcile payment effects and test regional failover before completion.",
    rubric: ["Compatibility matrix and phased schema", "Bounded migration with proof", "Progressive traffic and rollback gates", "Financial reconciliation and failover"], tags: ["devops", "deployment", "database"]
  },
  {
    id: "sim-behavioral-incident-disagreement", topicId: "foundations/behavioral-interview-basics", trackId: "foundations", type: "behavioral", difficulty: "medium", timeboxMinutes: 10,
    prompt: "Tell me about a production incident where you disagreed with the proposed mitigation. Show urgency, collaboration, and how evidence changed the decision.",
    hints: ["Name the shared incident objective before the disagreement.", "Separate immediate containment from the later root-cause decision."],
    answer: "A strong response gives the incident impact and shared objective, the competing mitigations and their risks, your specific evidence and communication, and the decision mechanism under time pressure. It makes your contribution distinct without diminishing others, explains containment and verification, reports customer or reliability outcome honestly, and closes with a change to runbooks, tests, alerts, or future judgment. Winning the disagreement is not the signal; disciplined collaboration and learning are.",
    rubric: ["Concrete incident and personal actions", "Competing constraints and evidence", "Respectful urgent decision process", "Verified outcome and changed behavior"], tags: ["behavioral", "incident", "collaboration"]
  },
  {
    id: "sim-behavioral-failure", topicId: "foundations/behavioral-interview-basics", trackId: "foundations", type: "behavioral", difficulty: "medium", timeboxMinutes: 10,
    prompt: "Tell me about a technical decision you owned that failed. Explain when you recognized it, how you recovered, and what changed afterward.",
    hints: ["Choose a real decision with consequences, not a disguised success.", "Show both immediate repair and a lasting system or judgment change."],
    answer: "A strong answer names the decision, evidence available at the time, your ownership boundary, the failure signal, and the impact without blame-shifting. It explains containment, stakeholder communication, recovery, and how you verified the repair. The reflection should distinguish a reasonable risk from a preventable miss, identify the changed review/test/rollout practice, and show later evidence that the learning affected behavior. Honest scale and uncertainty are stronger than invented metrics.",
    rubric: ["Real ownership and consequence", "Early evidence and transparent response", "Recovery with verification", "Specific durable learning"], tags: ["behavioral", "failure", "ownership"]
  },
  {
    id: "sim-behavioral-ambiguity", topicId: "foundations/behavioral-interview-basics", trackId: "foundations", type: "behavioral", difficulty: "hard", timeboxMinutes: 10,
    prompt: "Tell me about an ambiguous project where you influenced people you did not manage and converted uncertainty into a decision.",
    hints: ["Define the ambiguity and the people whose incentives differed.", "Show the artifact or experiment that made progress possible."],
    answer: "A strong response describes the uncertain objective, missing information, stakeholders, and competing incentives. It shows how you framed a reversible next decision, gathered user or technical evidence, built alignment through a proposal, prototype, decision record, or experiment, and adapted when new information arrived. Make your influence concrete without claiming others' work, report the result and unresolved trade-off, and close with how you now distinguish uncertainty that needs discovery from a decision that simply needs an owner.",
    rubric: ["Specific ambiguity and stakeholders", "Concrete influence mechanism", "Evidence-led decision and adaptation", "Honest outcome and judgment"], tags: ["behavioral", "ambiguity", "influence"]
  },
  {
    id: "sim-estimation-video", topicId: "sde-systems/capacity-planning", trackId: "sde-systems", type: "case", difficulty: "medium", timeboxMinutes: 25,
    prompt: "Estimate storage, ingest bandwidth, and thumbnail work for a product receiving 12 million two-minute videos per month. State assumptions and identify the first measurements you would replace.",
    hints: ["Choose a bitrate and derive bytes per video before monthly totals.", "Include replicas, renditions, peak factor, and failed/retried work."],
    answer: "Start with explicit average duration, source bitrate, upload distribution, retention, replica count, and rendition policy. For example, 2 minutes at 8 Mb/s is about 120 MB, so 12 million originals are roughly 1.44 PB/month before replicas and derived outputs. Add measured transcoded-rendition and metadata factors, durability copies, deletion, retry, and headroom. Divide monthly bytes by seconds for average ingress, then apply an observed peak factor. Estimate frame extraction/transcode seconds separately. Replace bitrate, peak concurrency, rendition mix, retention, and retry assumptions from production histograms first.",
    rubric: ["Transparent units and assumptions", "Correct order-of-magnitude arithmetic", "Copies, renditions, peaks, and headroom", "Names adjacent bottlenecks and measurements"], tags: ["estimation", "capacity", "video"]
  },
  {
    id: "sim-estimation-cache", topicId: "sde-systems/capacity-planning", trackId: "sde-systems", type: "case", difficulty: "medium", timeboxMinutes: 22,
    prompt: "Estimate memory and network requirements for a regional cache serving 800,000 reads per second with 2 KB average values and a target 95% hit rate.",
    hints: ["Separate hot-object working set from throughput.", "Include metadata, replication, misses, and peak headroom."],
    answer: "Start with the measured object popularity curve and required hot-set size; QPS alone cannot determine memory. For throughput, 800k × 2 KB is roughly 1.6 GB/s of value egress before protocol overhead, with only 40k misses/s at 95% hit rate. Add key/allocator/index overhead, replicas, expiration, fragmentation, and 2–3× peak/failure headroom. Shard by stable key, budget NIC and per-request CPU, and size origin protection for cache loss. Replace value distribution, hot-set bytes, connection cost, peak factor, and zone-failure behavior with measurements before procurement.",
    rubric: ["Separates working set and QPS", "Correct bandwidth and miss arithmetic", "Replication/overhead/failure headroom", "Names measurements and origin risk"], tags: ["estimation", "cache", "network"]
  },
  {
    id: "sim-estimation-queue", topicId: "sde-systems/capacity-planning", trackId: "sde-systems", type: "case", difficulty: "hard", timeboxMinutes: 22,
    prompt: "A job system receives 50,000 tasks per second and each worker sustains 200 tasks per second. Estimate steady-state workers, burst buffer, and recovery capacity for a ten-minute 3× spike.",
    hints: ["Baseline capacity leaves no room to drain a burst.", "Calculate backlog growth during the spike and drain rate afterward."],
    answer: "Baseline requires 50,000/200 = 250 fully utilized workers, which is not a safe operating point. A 150k/s ten-minute spike adds 100k excess tasks/s if baseline capacity stays fixed, or 60 million tasks of backlog. Size the durable queue in bytes from measured task size plus replication and headroom. To drain 60 million in one hour while serving baseline, add about 16,667 tasks/s or 84 workers, before safety margin. A better plan may autoscale during the spike; include startup time, downstream limits, retry amplification, age SLO, and load shedding.",
    rubric: ["Correct baseline worker count", "Backlog and buffer arithmetic", "Explicit recovery drain capacity", "Downstream, retry, and SLO constraints"], tags: ["estimation", "queues", "capacity"]
  },
  {
    id: "sim-probability-collision", topicId: "foundations/probability", trackId: "foundations", type: "puzzle", difficulty: "hard", timeboxMinutes: 18,
    prompt: "A service chooses a uniformly random 8-character identifier from 36 symbols. Approximate the probability of at least one collision after 10 million identifiers and explain whether that is operationally acceptable.",
    hints: ["Use the birthday approximation with N = 36^8.", "Probability alone is not the product decision."],
    answer: "The space is N=36^8, about 2.82 trillion. With n=10 million draws, the birthday exponent is n(n-1)/(2N), about 17.7, so collision probability 1-exp(-17.7) is effectively one. Even when probability were smaller, silent collision is unacceptable for a unique key: enforce a uniqueness constraint and retry, use a larger space, or allocate identifiers deterministically. Also analyze retry load, adversarial guessing, tenant scope, and whether predictability or secrecy matters.",
    rubric: ["Correct identifier space", "Uses birthday approximation", "Recognizes near-certain collision", "Turns math into a safe design"], tags: ["probability", "birthday-paradox", "identifiers"]
  },
  {
    id: "sim-logic-switches", topicId: "fintech-quant/quant-puzzles", trackId: "fintech-quant", type: "puzzle", difficulty: "medium", timeboxMinutes: 15,
    prompt: "Three switches outside a closed room control three incandescent bulbs inside. You may manipulate switches freely but enter the room only once. Match every switch to its bulb.",
    hints: ["The bulbs expose more than one observable state.", "Use heat as stored information."],
    answer: "Turn switch A on long enough to heat its bulb, then turn A off. Turn switch B on and immediately enter the room, leaving C off throughout. The lit bulb belongs to B. Of the two unlit bulbs, the warm bulb belongs to A and the cool bulb belongs to C. The solution encodes three distinguishable states—on, off-but-warm, and off-and-cool—while respecting the one-entry constraint. In a real setting, confirm incandescent bulbs and safe temperature handling because LEDs may not preserve the assumed signal.",
    rubric: ["Creates three observable states", "Correct switch-to-bulb mapping", "Explains stored heat information", "States the physical assumption"], tags: ["logic", "puzzle", "state"]
  }
]);
