import { buildTechnology, type TechnologySpec } from "@/data/technology-factory";

const release8Specs: TechnologySpec[] = [
  {
    id: "java", title: "Java", kind: "language", ecosystem: "java",
    summary: "Java syntax, OOP, collections, generics, exceptions, streams, I/O, the JVM, GC, concurrency, testing, build tools, Spring Boot, and persistence.",
    mentalModel: "Java source becomes verified bytecode; the JVM profiles hot paths, manages memory, and gives threads a precisely specified shared-memory model.",
    roles: ["java", "backend", "sde", "fintech"], version: "25", lts: "25",
    commands: [
      ["Check the runtime", "java --version", "Confirm the active JDK."], ["Check the compiler", "javac --version", "Confirm source compatibility."],
      ["Compile one class", "javac Main.java", "Turn source into bytecode."], ["Run a class", "java Main", "Start the JVM with Main as the entry point."],
      ["Inspect bytecode", "javap -c Main.class", "Disassemble methods for JVM-level reasoning."], ["Open the REPL", "jshell", "Test APIs and language behavior interactively."],
      ["Run Maven tests", "./mvnw test", "Execute the Maven test lifecycle."], ["Package with Maven", "./mvnw package", "Compile, test, and package the application."],
      ["Run Gradle tests", "./gradlew test", "Execute the Gradle test task."], ["Inspect dependencies", "./mvnw dependency:tree", "Reveal transitive dependency selection."],
      ["Capture a flight recording", "jcmd <pid> JFR.start duration=60s filename=app.jfr", "Record JVM runtime events for analysis."], ["Inspect the heap", "jcmd <pid> GC.heap_info", "Read heap and collector information."]
    ],
    sources: [["Java language documentation", "https://docs.oracle.com/en/java/"], ["OpenJDK documentation", "https://openjdk.org/"], ["Spring Boot reference", "https://docs.spring.io/spring-boot/reference/"]],
    code: ["Java", "record Account(String id, long cents) {\n  Account { if (cents < 0) throw new IllegalArgumentException(); }\n}", "A record expresses immutable data; the compact constructor protects its invariant."]
  },
  {
    id: "oop-and-lld", title: "OOP, SOLID, UML, and LLD", kind: "platform", ecosystem: "systems",
    summary: "Object modeling, composition, SOLID trade-offs, UML notation, design patterns, and interview-sized low-level designs.",
    mentalModel: "An object owns an invariant and offers behavior that preserves it; a good design keeps reasons to change narrow and dependencies explicit.",
    commands: [["Run focused tests", "./gradlew test --tests '*ParkingLot*'", "Exercise one design boundary."], ["Find public APIs", "rg \"public (class|interface|record)\" src", "Review the exposed object model."], ["Render PlantUML", "plantuml design.puml", "Turn a text model into a reviewable diagram."]],
    sources: [["Java object-oriented concepts", "https://docs.oracle.com/javase/tutorial/java/concepts/"], ["PlantUML class diagrams", "https://plantuml.com/class-diagram"], ["SEI software architecture resources", "https://www.sei.cmu.edu/our-work/software-architecture/"]]
  },
  {
    id: "dbms", title: "Database Management Systems", kind: "database", ecosystem: "database",
    summary: "Relational theory, SQL, normalization, indexes, query plans, ACID, isolation, MVCC, locks, WAL, replication, partitioning, and NoSQL trade-offs.",
    mentalModel: "A DBMS turns logical relations into durable pages while coordinating concurrent histories that must still satisfy declared invariants.",
    commands: [["Connect safely", "psql \"$DATABASE_URL\"", "Open an authenticated SQL session."], ["Describe a relation", "\\d+ accounts", "Inspect columns, indexes, and storage."], ["Explain a query", "EXPLAIN (ANALYZE, BUFFERS) SELECT ...", "Compare estimates with measured execution."], ["Inspect transactions", "SELECT * FROM pg_stat_activity;", "Find active and waiting sessions."], ["Inspect locks", "SELECT * FROM pg_locks;", "Trace blocking and lock modes."], ["Open SQLite", "sqlite3 app.db", "Start a local embedded database shell."]],
    sources: [["PostgreSQL documentation", "https://www.postgresql.org/docs/"], ["SQLite documentation", "https://www.sqlite.org/docs.html"], ["CMU database systems course", "https://15445.courses.cs.cmu.edu/"]]
  },
  {
    id: "operating-systems", title: "Operating Systems", kind: "platform", ecosystem: "systems",
    summary: "Processes, threads, scheduling, IPC, synchronization, deadlocks, virtual memory, paging, filesystems, I/O, Linux internals, virtualization, and containers.",
    mentalModel: "The kernel multiplexes processors, memory, and devices while presenting isolated processes with stable abstractions and enforceable protection boundaries.",
    commands: [["Inspect processes", "ps -eo pid,ppid,stat,pcpu,pmem,comm", "Read process hierarchy and scheduler state."], ["Inspect threads", "ps -T -p <pid>", "List a process's schedulable threads."], ["Trace syscalls", "strace -f -o trace.log <command>", "Observe the user/kernel boundary."], ["Inspect memory maps", "cat /proc/<pid>/maps", "See virtual address regions."], ["Inspect descriptors", "ls -l /proc/<pid>/fd", "See a process's open handles."], ["Inspect pressure", "vmstat 1", "Watch runnable tasks, paging, and CPU time."]],
    sources: [["Linux kernel documentation", "https://docs.kernel.org/"], ["OSTEP", "https://pages.cs.wisc.edu/~remzi/OSTEP/"], ["POSIX specification", "https://pubs.opengroup.org/onlinepubs/9799919799/"]]
  },
  {
    id: "computer-networks", title: "Computer Networks", kind: "platform", ecosystem: "systems",
    summary: "TCP/IP, subnetting, routing, ARP, NAT, ICMP, UDP, TCP, DNS, TLS, HTTP/1–3, sockets, proxies, load balancers, CDNs, WebSockets, gRPC, security, and debugging.",
    mentalModel: "Networks move best-effort packets across independently managed hops; reliability, naming, security, and application semantics are layered on top.",
    commands: [["Inspect addresses", "ip address", "List interfaces and assigned prefixes."], ["Inspect routes", "ip route", "Read the forwarding decision table."], ["Inspect sockets", "ss -tulpn", "List listening and connected sockets."], ["Resolve DNS", "dig example.com A +trace", "Trace delegation and records."], ["Inspect TLS", "openssl s_client -connect example.com:443 -servername example.com", "Read the negotiated certificate and cipher."], ["Trace HTTP", "curl -v --http2 https://example.com", "Expose request, connection, and response details."], ["Capture packets", "tcpdump -ni any port 443", "Capture matching traffic for protocol analysis."], ["Trace a path", "traceroute example.com", "Estimate the routed hop sequence."]],
    sources: [["IETF RFC index", "https://www.rfc-editor.org/"], ["MDN HTTP", "https://developer.mozilla.org/en-US/docs/Web/HTTP"], ["Cloudflare learning center", "https://www.cloudflare.com/learning/"]]
  },
  ...[
    ["computer-architecture", "Computer Architecture", "CPU pipelines, caches, memory hierarchy, instruction sets, branch prediction, SIMD, and performance reasoning."],
    ["compilers", "Compilers", "Lexing, parsing, semantic analysis, IR, optimization, code generation, linking, and runtime interfaces."],
    ["theory-of-computation", "Theory of Computation", "Automata, regular languages, grammars, computability, reductions, and complexity classes."],
    ["software-engineering", "Software Engineering", "Requirements, modularity, testing, version control, delivery, observability, maintenance, and engineering trade-offs."]
  ].map(([id, title, summary]) => ({
    id, title, summary, kind: "platform" as const, ecosystem: "systems" as const,
    mentalModel: `${title} turns informal behavior into explicit models whose assumptions, invariants, and costs can be tested.`,
    commands: [["Locate the build entry", "rg \"main|build|test\" .", "Find executable and verification boundaries."], ["Run the test suite", "<project-test-command>", "Verify observable behavior."], ["Inspect generated artifacts", "find . -maxdepth 3 -type f", "Relate source inputs to build outputs."]] as Array<[string, string, string]>,
    sources: [["ACM computing curricula", "https://www.acm.org/education/curricula-recommendations"], ["MIT OpenCourseWare EECS", "https://ocw.mit.edu/search/?d=Electrical%20Engineering%20and%20Computer%20Science"], ["NIST computer security resources", "https://csrc.nist.gov/"]] as Array<[string, string]>
  }))
];

const built = release8Specs.map(buildTechnology);
export const technologies = built.map((item) => item.technology);
export const commands = built.flatMap((item) => item.commands);
export const technologySources = built.flatMap((item) => item.sources);
export const technologyById = new Map(technologies.map((item) => [item.id, item]));
export const commandById = new Map(commands.map((item) => [item.id, item]));
export const sourceById = new Map(technologySources.map((item) => [item.id, item]));
