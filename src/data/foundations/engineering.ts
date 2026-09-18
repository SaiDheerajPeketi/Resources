import type { FoundationLessonMap } from "@/data/foundations/types";

export const engineeringLessons: FoundationLessonMap = {
  "foundations/sql-fundamentals": {
    summary: "Query relational data correctly with joins, aggregation, windows, transactions, and index-aware reasoning.",
    durationMinutes: 75, level: "foundation", roleIds: ["sde", "ai-engineer", "ml-engineer", "data-scientist", "data-engineer", "fintech", "quant-research"], prerequisites: ["foundations/discrete-mathematics"],
    outcomes: ["Write correct joins and grouped queries", "Use windows without collapsing rows", "Explain transactions, constraints, and index trade-offs"],
    conceptMap: ["Tables represent constrained relations", "Joins combine rows by predicates", "Aggregation changes row grain", "Transactions preserve invariants under concurrency"],
    keyIdea: "State the output grain—what one row means—before writing SQL, and preserve it through every join and aggregation.",
    analogy: { title: "Transparent sheets", body: "A join aligns sheets by a rule; aggregation folds aligned rows. A many-to-many alignment multiplies rows." },
    theory: [
      { heading: "Relational correctness", body: "Primary keys identify rows and foreign keys enforce references. INNER JOIN keeps matches; LEFT JOIN preserves left rows and fills missing right values with NULL. SQL has three-valued logic, so use IS NULL. Define grain to catch fan-out." },
      { heading: "Aggregation and windows", body: "WHERE filters before grouping and HAVING after. GROUP BY collapses rows; window functions compute across partitions while retaining detail. ROW_NUMBER is unique; RANK leaves gaps on ties; DENSE_RANK does not." },
      { heading: "Transactions and indexes", body: "Constraints, concurrency control, logging, and recovery implement ACID. Isolation labels alone do not prove an application invariant. Indexes accelerate selective or ordered reads but cost memory and write maintenance; inspect query plans." }
    ],
    example: { title: "Latest successful payment", language: "sql", code: `WITH ranked AS (
  SELECT account_id, payment_id, amount, paid_at,
         ROW_NUMBER() OVER (
           PARTITION BY account_id
           ORDER BY paid_at DESC, payment_id DESC
         ) AS rn
  FROM payments
  WHERE status = 'succeeded'
)
SELECT account_id, payment_id, amount, paid_at
FROM ranked WHERE rn = 1;`, explanation: "The window preserves payment rows while a deterministic tie-breaker picks one latest row per account." },
    failureModes: ["Filtering a LEFT JOIN's right side in WHERE", "Many-to-many double counting", "Using = NULL", "Ambiguous non-grouped columns", "Indexing without considering selectivity and writes"],
    question: { id: "sql-retention", type: "coding", difficulty: "medium", timeboxMinutes: 25, prompt: "Given users(user_id,signup_date) and logins(user_id,login_date), return signups and day-one retention by signup date.", hints: ["Prevent repeated logins from duplicating users.", "Keep cohorts with zero returns."], answer: "LEFT JOIN users to distinct user/date logins on login_date=signup_date+one day, then group by signup_date. Count users and average a matched/not-matched indicator. EXISTS per user is another safe pattern; date arithmetic is dialect-specific.", rubric: ["One row per user before aggregation", "Preserves zero-retention cohorts", "Avoids duplicate inflation", "Notes date dialect"], tags: ["sql", "joins", "aggregation", "windows"] },
    flashcards: [{ front: "WHERE vs HAVING?", back: "Before versus after grouping." }, { front: "Window vs GROUP BY?", back: "Window retains rows; GROUP BY collapses." }, { front: "NULL comparison?", back: "IS NULL/IS NOT NULL." }],
    revision: ["State output grain", "Identify join cardinality", "Handle NULL explicitly", "Use windows for row-preserving analytics", "Use constraints for invariants and plans for performance"],
    sources: [{ label: "PostgreSQL Queries", url: "https://www.postgresql.org/docs/current/queries.html" }, { label: "PostgreSQL Window Functions", url: "https://www.postgresql.org/docs/current/tutorial-window.html" }, { label: "PostgreSQL Isolation", url: "https://www.postgresql.org/docs/current/transaction-iso.html" }]
  },
  "foundations/linux-and-the-cli": {
    summary: "Navigate Linux processes, files, permissions, pipes, signals, and diagnostics from a safe command line.",
    durationMinutes: 65, level: "foundation", roleIds: ["sde", "data-engineer", "devops", "sre", "security", "fintech"], prerequisites: [],
    outcomes: ["Explain processes, descriptors, and permissions", "Compose observable pipelines safely", "Diagnose CPU, memory, disk, and network symptoms"],
    conceptMap: ["Processes execute with identities and descriptors", "Paths name filesystem objects", "Pipes connect output to input", "Signals request asynchronous actions"],
    keyIdea: "The shell connects processes before programs run; distinguish shell parsing from each command's behavior.",
    analogy: { title: "A plumbing workshop", body: "Commands are machines, descriptors are ports, pipes are hoses, and redirection reconnects ports. Signals are separate control messages." },
    theory: [
      { heading: "Processes and descriptors", body: "A process has an ID, parent, credentials, environment, memory, working directory, and file descriptors. 0,1,2 conventionally mean stdin, stdout, stderr. Exit status communicates success; signals request actions." },
      { heading: "Files and permissions", body: "Directories map names to file objects. Hard links name one object; symlinks store another path. Owner/group/other bits interact with identity, directory traversal, umask, and ACLs. Unlinking an open file removes the name but not the open object." },
      { heading: "Pipelines and diagnosis", body: "Single quotes are literal; double quotes allow selected expansion; unquoted expansion splits and globs. Pipelines compose tools but can hide upstream failure. Observe process state, saturation, logs, descriptors, and sockets before remediation." }
    ],
    example: { title: "Count HTTP statuses", language: "bash", code: `awk '{count[$9]++} END {
  for (status in count) print status, count[status]
}' access.log | sort -k2,2nr`, explanation: "awk counts in one pass; sort orders by count. First verify the log format and malformed-line policy." },
    failureModes: ["Unquoted expansions", "Confusing process and program", "SIGKILL before graceful shutdown", "Misreading cache as unavailable memory", "Broad recursive commands with unresolved targets"],
    question: { id: "linux-deleted-log", type: "case", difficulty: "medium", timeboxMinutes: 12, prompt: "Disk usage stays high after deleting a large log. Explain and diagnose safely.", hints: ["A process may still hold the object open.", "Inspect descriptors to deleted names."], answer: "An open descriptor can retain an unlinked file's blocks. Confirm filesystem usage, locate open deleted files, identify the owning service, then rotate/reopen or gracefully restart it under policy. Do not blindly kill processes or delete more files.", rubric: ["Explains unlink/open lifetime", "Read-only diagnosis first", "Finds owning service", "Graceful recovery"], tags: ["linux", "filesystem", "debugging"] },
    flashcards: [{ front: "Standard descriptors?", back: "0 stdin, 1 stdout, 2 stderr." }, { front: "TERM vs KILL?", back: "Catchable graceful request versus immediate unhandleable stop." }, { front: "Deleted file uses space?", back: "Open descriptors keep its object alive." }],
    revision: ["Separate shell and program", "Quote expansions", "Know descriptors/status/signals", "Observe before changing", "Resolve exact destructive targets"],
    sources: [{ label: "GNU Bash Manual", url: "https://www.gnu.org/software/bash/manual/bash.html" }, { label: "Linux man-pages", url: "https://www.kernel.org/doc/man-pages/" }, { label: "POSIX", url: "https://pubs.opengroup.org/onlinepubs/9799919799/" }]
  },
  "foundations/networking-fundamentals": {
    summary: "Trace traffic through DNS, transport, IP routing, TLS, and HTTP while debugging by layer.",
    durationMinutes: 75, level: "foundation", roleIds: ["sde", "ai-engineer", "data-engineer", "devops", "sre", "security", "fintech", "quant-dev"], prerequisites: ["foundations/linux-and-the-cli"],
    outcomes: ["Explain packet and connection paths", "Compare TCP, UDP, HTTP, DNS, and TLS", "Debug failures layer by layer"],
    conceptMap: ["DNS maps names to records", "IP routes packets", "Transport defines endpoint delivery semantics", "TLS authenticates and protects", "HTTP defines messages"],
    keyIdea: "Debug from the lowest uncertain layer upward: resolution, reachability, transport, TLS, then application protocol.",
    analogy: { title: "A registered parcel", body: "DNS finds the address, IP chooses roads, transport manages delivery, TLS seals and verifies, and HTTP is the form inside." },
    theory: [
      { heading: "Addressing and routing", body: "IP is best-effort packet delivery. Subnets identify local versus routed destinations; routers use longest-prefix match. NAT rewrites mappings and affects observability. ICMP carries diagnostics but may be filtered." },
      { heading: "Transport", body: "TCP is an ordered reliable byte stream with acknowledgments, retransmission, flow, and congestion control. UDP is datagrams without those guarantees. Ports identify transport endpoints; TCP does not preserve application message boundaries." },
      { heading: "DNS, TLS, HTTP", body: "DNS caches records by TTL and follows delegation. TLS authenticates peers and negotiates keys; hostname, time, chain, and versions matter. HTTP status is an application response, distinct from DNS, connection, or handshake failure." }
    ],
    example: { title: "Request trace", language: "text", code: `1. Resolve api.example.com to an address
2. Route packets and create transport to port 443
3. Complete TLS and validate hostname/certificate
4. Send HTTP request
5. Receive response and reuse or close connection`, explanation: "A 503 proves an HTTP server answered; a DNS timeout or TLS hostname error occurs earlier." },
    failureModes: ["Ping failure proves outage", "DNS TTL means instant global switch", "TCP writes equal messages", "TLS error called HTTP error", "Ignoring proxies, load balancers, NAT, firewalls"],
    question: { id: "networking-browser-request", type: "short", difficulty: "medium", timeboxMinutes: 15, prompt: "Walk from entering https://example.com to first response bytes, with evidence per layer.", hints: ["DNS, transport, TLS, HTTP.", "Mention routing without hardware trivia."], answer: "Parse URL, resolve from cache or recursive DNS, choose an address/route, establish TCP or QUIC, complete TLS authentication/key agreement, send HTTP, receive bytes. Evidence includes lookup output, route/socket reachability, certificate diagnostics, and HTTP headers. Caches, proxies, CDNs, and reuse may shorten the path.", rubric: ["Correct layer order", "Useful routing explanation", "Cache/proxy variations", "Evidence mapped to layers"], tags: ["networking", "dns", "tcp", "tls", "http"] },
    flashcards: [{ front: "TCP provides?", back: "Ordered reliable byte stream, not message framing." }, { front: "DNS TTL?", back: "Maximum cache reuse period for an answer." }, { front: "TLS for HTTPS?", back: "Authenticates identity and protects channel integrity/confidentiality." }],
    revision: ["Trace DNS→IP→transport→TLS→HTTP", "Separate reachability and health", "TCP is a byte stream", "Check hostname/time/chain", "Include intermediaries"],
    sources: [{ label: "TCP RFC 9293", url: "https://www.rfc-editor.org/rfc/rfc9293" }, { label: "HTTP Semantics RFC 9110", url: "https://www.rfc-editor.org/rfc/rfc9110" }, { label: "TLS 1.3 RFC 8446", url: "https://www.rfc-editor.org/rfc/rfc8446" }]
  },
  "foundations/git-testing-and-debugging": {
    summary: "Manage changes as commits, build layered tests, and debug from reproducible evidence rather than guesses.",
    durationMinutes: 65, level: "foundation", roleIds: ["sde", "ai-engineer", "ml-engineer", "data-engineer", "devops", "sre", "security", "fintech", "quant-dev"], prerequisites: ["foundations/linux-and-the-cli"],
    outcomes: ["Explain Git objects, branches, and merges", "Choose unit, integration, and end-to-end tests", "Run a hypothesis-driven debugging loop"],
    conceptMap: ["Commits form a content-addressed DAG", "Branches name commits", "Tests give evidence at different boundaries", "Debugging narrows causes by experiment"],
    keyIdea: "Preserve evidence: reproduce, reduce, observe, form one falsifiable hypothesis, and change one variable.",
    analogy: { title: "A lab notebook", body: "Commits preserve experimental states, tests repeat measurements, and debugging is controlled experimentation." },
    theory: [
      { heading: "Git model", body: "A commit records a tree, parent links, and metadata. A branch is a movable reference; HEAD identifies the checkout. Merge joins histories; rebase replays changes onto a new base and creates new commit identities." },
      { heading: "Testing", body: "Unit tests isolate logic, integration tests verify boundaries, and end-to-end tests cover critical journeys. Contract, property, fuzz, performance, and fault-injection tests target different risks. Test behavior and failure paths." },
      { heading: "Debugging", body: "Capture exact input, environment, version, expected/actual result, and earliest failure. Reduce the reproducer, observe state, bisect changes, test hypotheses, fix root cause, and add a regression test." }
    ],
    example: { title: "Bisect a regression", language: "bash", code: `git bisect start
git bisect bad
git bisect good v1.4.0
# test midpoint, then mark good or bad
git bisect reset`, explanation: "Reliable classification binary-searches commit history in O(log n) rounds." },
    failureModes: ["Rewriting shared history casually", "Testing implementation details", "Mocking every boundary", "Changing multiple variables", "Fixing symptoms without regression proof"],
    question: { id: "debugging-intermittent", type: "case", difficulty: "medium", timeboxMinutes: 15, prompt: "A test passes locally but fails intermittently in CI. Investigate without adding blind retries.", hints: ["Compare environment, order, time, concurrency, shared state.", "Preserve the failing seed and artifacts."], answer: "Capture logs, version, seed, and frequency. Run isolated and with suite order/concurrency. Compare time zone, locale, resources, config, and dependencies. Check shared state, fixed ports/files, races, unordered iteration, timing waits, and cleanup. Reproduce, fix deterministically, and add a regression test.", rubric: ["Preserves evidence", "Tests isolation/order", "Covers time/concurrency/state", "Retries are not the fix", "Regression proof"], tags: ["git", "testing", "debugging", "ci"] },
    flashcards: [{ front: "Git branch?", back: "Movable reference to a commit." }, { front: "Merge vs rebase?", back: "Join histories vs replay with new identities." }, { front: "Debug loop?", back: "Reproduce, reduce, observe, hypothesize, test, fix, regress." }],
    revision: ["Commit coherent changes", "Do not rewrite shared history", "Layer tests by risk", "Capture failure evidence", "Change one variable and regress"],
    sources: [{ label: "Pro Git", url: "https://git-scm.com/book/en/v2" }, { label: "Git reference", url: "https://git-scm.com/docs" }, { label: "Google Testing Blog", url: "https://testing.googleblog.com/" }]
  },
  "foundations/behavioral-interview-basics": {
    summary: "Turn real experience into concise, evidence-backed stories for recruiter, behavioral, project, and negotiation conversations.",
    durationMinutes: 55, level: "foundation", roleIds: ["sde", "ai-engineer", "ml-engineer", "data-scientist", "data-engineer", "devops", "sre", "security", "fintech", "quant-dev", "quant-research"], prerequisites: [],
    outcomes: ["Build adaptable STAR stories", "Lead project deep dives", "Handle recruiter and negotiation conversations accurately"],
    conceptMap: ["Role requirements determine evidence", "Stories connect context, action, result, reflection", "Deep dives test ownership and trade-offs", "Recruiter conversations align process and constraints"],
    keyIdea: "A behavioral answer is an evidence chain: your decision, why it fit the constraints, what changed, and what you learned.",
    analogy: { title: "A case file", body: "Give enough context to evaluate judgment, but spend the time on decisions, evidence, and reflection—not scene setting." },
    theory: [
      { heading: "Story portfolio", body: "Prepare six to eight truthful stories spanning ownership, conflict, ambiguity, failure, influence, delivery, customer impact, and learning. Record scale, constraints, alternatives, your contribution, result, and retrospective lesson." },
      { heading: "STAR with judgment", body: "Keep Situation and Task brief. In Action, separate your decisions from team work and explain alternatives. Result includes defensible evidence; Reflection states what you would repeat or change. Never invent metrics." },
      { heading: "Screens and negotiation", body: "Align role, level, location, timeline, authorization, and loop format. Project deep dives cover architecture, ownership, failure, testing, operations, rejected options, and redesign. Clarify compensation components and deadlines; never fabricate offers." }
    ],
    example: { title: "Compact STAR outline", language: "text", code: `Situation: Two release failures delayed a payments launch.
Task: I owned reducing deployment risk before the next milestone.
Action: I analyzed failures, added contract checks and staged rollout,
        and documented rollback ownership.
Result: Six releases completed without rollback; verification fell 40→18 min.
Reflection: I would introduce production-like data earlier.`, explanation: "It names personal decisions, measurable evidence, and a candid improvement." },
    failureModes: ["Long context", "Ownership hidden behind we", "Failure without learning", "Blaming or leaking confidential details", "Fabricated metrics or offers"],
    question: { id: "behavioral-disagreement", type: "behavioral", difficulty: "medium", timeboxMinutes: 8, prompt: "Tell me about a technical disagreement showing conviction and openness to evidence.", hints: ["Name the shared goal and competing constraints.", "Show how the decision was tested and what changed."], answer: "A strong answer establishes the shared objective and options, states your view and evidence, shows respectful listening, explains the experiment/review/decision mechanism, and reports result plus reflection. Score evidence and judgment, not whether your proposal won.", rubric: ["Real disagreement and shared goal", "Specific actions", "Evidence-based resolution", "Respect", "Outcome and reflection"], tags: ["behavioral", "star", "communication"] },
    flashcards: [{ front: "STAR time allocation?", back: "Brief context; most time on actions, result, reflection." }, { front: "Project deep-dive spine?", back: "Problem, architecture, ownership, trade-off, failure, evidence, operations, redesign." }, { front: "Negotiation integrity?", back: "Advocate without fabricating offers or constraints." }],
    revision: ["Prepare 6–8 truthful stories", "Use I for ownership and we for team context", "Quantify defensibly", "Include changed behavior", "Prepare role questions and compensation components"],
    sources: [{ label: "Google re:Work: Structured Interviewing", url: "https://rework.withgoogle.com/intl/en/guides/hiring-use-structured-interviewing" }, { label: "OPM Structured Interviews", url: "https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/" }]
  }
};
