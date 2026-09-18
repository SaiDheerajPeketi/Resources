export type TechnologyTeachingAid = {
  plainEnglish: string;
  analogy: string;
  analogyLimit: string;
  concreteExample: string;
};

export const technologyTeachingAids: Record<string, Record<string, TechnologyTeachingAid>> = {
  java: {
    "Values, references, identity, and equality": {
      plainEnglish: "A Java variable never contains an object itself: it contains either a primitive value or a reference value that can point to an object.",
      analogy: "A reference is like a house address written on two cards. Copying the card does not copy the house; both cards still lead to the same house.",
      analogyLimit: "Unlike a postal address, a Java reference is opaque, garbage-collected, and cannot be arithmetically changed into another valid reference.",
      concreteExample: "If two variables reference one ArrayList, adding through either variable changes the shared list, but reassigning one variable leaves the other unchanged."
    },
    "Generics, variance, and erasure": {
      plainEnglish: "Generics let the compiler protect relationships between types, while wildcards state whether a container will mainly produce or consume values.",
      analogy: "A sealed crate labelled Apples can be treated as a producer of Fruit, but allowing arbitrary Fruit into it could put an orange in an apple-only crate.",
      analogyLimit: "Real crates retain their labels; most Java generic labels are erased at runtime, so reflection and array creation follow different rules.",
      concreteExample: "A List<? extends Number> can safely yield a Number but cannot accept an Integer because the actual list might be List<Double>."
    },
    "Collections and stream semantics": {
      plainEnglish: "Collections store data under different access guarantees, while a stream is a one-use recipe that performs work only when a terminal operation asks for a result.",
      analogy: "Choose a collection like choosing storage: a numbered shelf suits indexed access, a labelled locker suits key lookup, and a conveyor belt suits a processing pipeline.",
      analogyLimit: "Hardware locality, hashing, resizing, and concurrency make real performance more nuanced than a storage-room comparison.",
      concreteExample: "Filtering and mapping a stream builds a lazy pipeline; collect or count triggers traversal, and trying to reuse the consumed stream fails."
    },
    "Class lifecycle and JVM execution": {
      plainEnglish: "The JVM verifies portable bytecode, begins executing it conservatively, watches real behavior, and optimizes frequently used paths into machine code.",
      analogy: "A theatre rehearses from the script, notices the scenes performed most often, and builds faster stage arrangements for those hot scenes.",
      analogyLimit: "JIT optimization is based on guarded runtime assumptions and can be undone through deoptimization, unlike a permanently rebuilt theatre set.",
      concreteExample: "A call site that repeatedly sees one implementation may be inlined; loading a new implementation can invalidate that assumption and deoptimize it."
    },
    "Memory management and garbage collection": {
      plainEnglish: "The collector reclaims objects only after no path from a live root can reach them; leaving a scope does not by itself guarantee collection.",
      analogy: "A warehouse removes boxes that are no longer listed from any active inventory chain, not boxes that merely have not been opened recently.",
      analogyLimit: "Collectors move, scan, and reclaim objects according to implementation strategies; the analogy does not predict pause time or physical placement.",
      concreteExample: "A cache that keeps every request object reachable from a static map leaks memory even though no business code uses the old entries."
    },
    "Concurrency and the Java Memory Model": {
      plainEnglish: "Threads need specified ordering edges so that one thread's writes become visible to another; elapsed time or debugger observation is not such a guarantee.",
      analogy: "Two offices use a signed handover log: the signature establishes which update must be visible before the next worker begins.",
      analogyLimit: "CPU caches and compiler reorderings follow formal memory-model rules, so everyday notions of 'happened earlier' are not sufficient.",
      concreteExample: "Writing data and then a volatile ready flag lets a reader that observes ready also observe the earlier data writes, but ready++ is still not atomic."
    }
  },
  "oop-and-lld": {
    "Objects preserve invariants": {
      plainEnglish: "Give each business rule one owner and expose operations that keep that owner's state valid instead of exposing raw setters.",
      analogy: "A bank vault does not hand out its combination and ask callers to update balances; a teller performs approved operations while enforcing the rules.",
      analogyLimit: "Software objects may be copied, persisted, or accessed concurrently, so ownership still needs explicit transaction and lifecycle boundaries.",
      concreteExample: "Order.pay(receipt) checks the current state and amount before changing DRAFT to PAID, making an invalid transition impossible through the public API."
    },
    "Composition, inheritance, and polymorphism": {
      plainEnglish: "Inheritance promises substitutability, whereas composition connects smaller collaborators and lets their behavior vary without sharing an implementation hierarchy.",
      analogy: "A car has an engine by composition; an electric car is a kind of car only if every client expecting a car can use it without broken promises.",
      analogyLimit: "Natural-language 'is-a' and 'has-a' labels do not prove behavioral substitutability or appropriate software ownership.",
      concreteExample: "Inject a PaymentPort into CheckoutService so Stripe and a test fake can be substituted without making CheckoutService inherit vendor behavior."
    },
    "SOLID as diagnostic questions": {
      plainEnglish: "SOLID helps locate change pressure, oversized contracts, and reversed dependencies; it is a set of questions rather than five mandatory shapes.",
      analogy: "A toolbox separates tools by jobs that change for different reasons, but it does not put every screw into its own box.",
      analogyLimit: "Module boundaries are driven by actors, volatility, and coupling; the mnemonic alone cannot select the right number of abstractions.",
      concreteExample: "Extract a TaxPolicy when jurisdictions vary, but keep a one-line immutable Money value concrete instead of creating an IMoney interface."
    },
    "Patterns and their forces": {
      plainEnglish: "A design pattern earns its place only when a recurring variation, integration, lifecycle, or communication problem is actually present.",
      analogy: "Patterns are like proven building details: a fire door solves a specific safety force, but installing one in every interior opening adds cost without benefit.",
      analogyLimit: "Software forces change faster than construction constraints, and the same class diagram can hide very different runtime behavior.",
      concreteExample: "Use Strategy when pricing policy varies by tenant; use State when the same order changes allowed behavior as it moves through its lifecycle."
    },
    "From requirements to an LLD": {
      plainEnglish: "Start from actors, use cases, rules, and failure paths; then assign state and behavior to owners and test the design by walking sequences.",
      analogy: "Planning a transit station begins with passenger journeys and safety constraints, not with drawing rooms and naming doors.",
      analogyLimit: "Unlike a physical station, software boundaries can be refactored, but persisted data and public APIs still make some changes expensive.",
      concreteExample: "For a parking lot, define entry, spot assignment, payment, and exit invariants before introducing Vehicle, Ticket, Gate, and PricingPolicy classes."
    },
    "Design for tests and operations": {
      plainEnglish: "Make decisions deterministic and external effects explicit so behavior can be tested, failures can be observed, and recovery ownership is clear.",
      analogy: "An aircraft cockpit exposes instruments and controlled inputs so crews can test systems and diagnose faults without dismantling the plane.",
      analogyLimit: "Instrumentation can itself fail or add cost, and a mock cannot reproduce every property of a real database, clock, or network.",
      concreteExample: "Inject a Clock into expiry policy, test boundary instants without sleeping, and emit a correlated event when the real scheduler performs expiry."
    }
  },
  dbms: {
    "Relational meaning and SQL reality": {
      plainEnglish: "Tables represent facts under constraints, but SQL keeps duplicate rows by default and treats missing information with three-valued logic.",
      analogy: "A table is a ledger whose column and key rules reject impossible entries; a query asks for a view without prescribing the clerk's retrieval route.",
      analogyLimit: "SQL bags, NULL, optimizer rewrites, and concurrent transactions have no exact paper-ledger equivalent.",
      concreteExample: "WHERE middle_name <> 'Lee' excludes NULL middle names because the comparison is UNKNOWN, not TRUE; use an explicit NULL policy."
    },
    "Normalization and denormalization": {
      plainEnglish: "Store each independent fact once so one update cannot leave contradictory copies; duplicate only when a measured read need justifies synchronization work.",
      analogy: "Keep one authoritative address book and reference a contact ID instead of handwriting the same address into every appointment entry.",
      analogyLimit: "Distributed caches and analytics copies may intentionally lag, so software must define source-of-truth and repair behavior beyond the analogy.",
      concreteExample: "Move customer address out of every order row when orders should reference the customer, but snapshot the shipping address when historical truth must not change."
    },
    "Indexes and access paths": {
      plainEnglish: "An index is an additional ordered or hashed structure that can reduce reads for certain predicates while adding storage and write maintenance.",
      analogy: "A book index jumps to pages for selected terms, but adding an index for every possible phrase would make the book enormous and updates expensive.",
      analogyLimit: "Database indexes interact with page layout, caches, statistics, visibility, and join algorithms beyond a printed index.",
      concreteExample: "An index on (tenant_id, created_at DESC) supports one tenant's newest rows, while reversing the columns may scan many tenants."
    },
    "Transactions, isolation, and anomalies": {
      plainEnglish: "A transaction groups changes, while isolation determines which interleavings other transactions may observe; application invariants still need deliberate protection.",
      analogy: "Two ticket agents need a reservation rule, not just separate notebooks, or both can see one remaining seat and sell it.",
      analogyLimit: "MVCC snapshots and serialization graphs are formal mechanisms; a human queue analogy does not describe every allowed anomaly.",
      concreteExample: "Two doctors both observe another doctor on call and independently go off duty; snapshot isolation can allow the write-skew invariant violation."
    },
    "MVCC, locks, and recovery": {
      plainEnglish: "MVCC keeps row versions for consistent snapshots, locks coordinate conflicting work, and WAL records changes before data pages so crashes can be recovered.",
      analogy: "Editors read dated document editions while writers reserve specific sections; a change journal lets the office reconstruct accepted edits after a power loss.",
      analogyLimit: "Version visibility, lock granularity, redo/undo, and durability guarantees vary by database engine and storage stack.",
      concreteExample: "A long-running report holds an old snapshot, forcing the database to retain dead row versions and delaying vacuum cleanup."
    },
    "Replication, partitioning, and distributed trade-offs": {
      plainEnglish: "Copies improve availability and read capacity but may lag; partitions divide ownership, making cross-partition guarantees and movement more expensive.",
      analogy: "Several branch libraries can serve readers locally, but catalogue updates travel, and moving a collection changes where cross-branch requests must go.",
      analogyLimit: "Network partitions, quorum rules, consensus, and machine-speed failover create behaviors unlike ordinary library coordination.",
      concreteExample: "After a write to the primary, an immediate read from a lagging replica may miss it unless the system provides session stickiness or a consistency token."
    }
  },
  "operating-systems": {
    "Protection and the system-call boundary": {
      plainEnglish: "Applications run with limited privilege and must ask the kernel through validated system calls to access protected hardware and shared resources.",
      analogy: "A hotel guest requests the locked maintenance room through reception; the receptionist checks identity and performs or authorizes the operation.",
      analogyLimit: "A syscall can block, resume, or interact with interrupts at machine speed, and entering kernel mode does not necessarily switch processes.",
      concreteExample: "read(fd, buffer, n) crosses into the kernel, validates the descriptor and user buffer, and may sleep until data arrives."
    },
    "Processes, threads, and descriptors": {
      plainEnglish: "A process contains protected resources and an address space; threads are scheduled instruction streams sharing most of that process state.",
      analogy: "A process is an office with shared files and permissions; threads are workers with their own desks and task position inside the same office.",
      analogyLimit: "Threads share memory with formal synchronization requirements, while real workers do not expose CPU registers, stacks, or descriptor tables.",
      concreteExample: "After fork, parent and child see copy-on-write memory and inherited descriptors; exec replaces the child's program while selected descriptors remain open."
    },
    "Scheduling and synchronization": {
      plainEnglish: "The scheduler allocates CPU time, while synchronization establishes safe ordering for operations that jointly protect shared state.",
      analogy: "A kitchen scheduler assigns chefs to stations, and a single claim ticket prevents two chefs from serving the same order.",
      analogyLimit: "Preemption, memory ordering, priority inversion, and spurious wakeups follow OS and hardware rules beyond human work allocation.",
      concreteExample: "A consumer waits on a condition variable inside a while loop because it may wake spuriously or another consumer may take the item first."
    },
    "Virtual memory and page faults": {
      plainEnglish: "Each process uses virtual addresses that the hardware and kernel translate to protected physical frames, creating or loading mappings on demand.",
      analogy: "A hotel room number is a guest-facing address; management maps it to physical space and can move storage without changing the number guests use.",
      analogyLimit: "TLBs, page sizes, copy-on-write, memory mapping, and fault types do not correspond cleanly to hotel operations.",
      concreteExample: "Writing a forked page triggers a copy-on-write fault, allocates a private frame, copies data, and updates that process's page table."
    },
    "Filesystems, caching, and durability": {
      plainEnglish: "Successful writes often reach memory caches before durable storage, so crash-safe replacement requires deliberate ordering and synchronization.",
      analogy: "Writing an order on a whiteboard is fast but not durable; recording it in the bound ledger and updating the index survives the office closing.",
      analogyLimit: "Controllers, drive caches, journaling modes, and filesystem guarantees determine what fsync actually protects.",
      concreteExample: "Write a temporary file, fsync it, rename it atomically, then sync the directory when the name itself must survive a crash."
    },
    "Containers and virtual machines": {
      plainEnglish: "Containers isolate process views while sharing the host kernel; virtual machines emulate hardware and run a separate guest kernel.",
      analogy: "Containers are apartments sharing one building's structure; VMs are separate houses on managed plots with their own internal utilities.",
      analogyLimit: "Namespaces and hypervisors create technical boundaries whose strength depends on configuration and vulnerabilities, not physical walls.",
      concreteExample: "A container may have its own PID namespace and CPU limit but still invokes the host kernel, whereas a VM boots its own kernel."
    }
  },
  "computer-networks": {
    "Layering, forwarding, and MTU": {
      plainEnglish: "Applications wrap data in protocol headers; every router forwards the IP packet while replacing the local link-layer envelope for the next hop.",
      analogy: "A parcel keeps its destination address while each regional courier replaces the local transport label used for the next depot.",
      analogyLimit: "Packets may be dropped, reordered, encrypted, fragmented, or encapsulated, and routers do not provide the end-to-end guarantees of a courier contract.",
      concreteExample: "A remote server's IP stays in the packet, but the first Ethernet frame uses the default gateway's MAC address, not the server's MAC."
    },
    "IP addressing, subnetting, routing, and NAT": {
      plainEnglish: "A prefix describes an address region, routers choose the most specific matching route, and NAT rewrites endpoint identity while keeping translation state.",
      analogy: "A postal sorter chooses the most detailed matching region code, while a company mailroom replaces internal desk numbers with one public return address.",
      analogyLimit: "NAT also rewrites ports and expires state, and Internet routing policy is more complex than hierarchical postal sorting.",
      concreteExample: "For 10.0.4.18, a /24 route beats a /16 route; outbound NAT may map its private source and port to a public tuple."
    },
    "TCP reliability, flow, and congestion": {
      plainEnglish: "TCP numbers a byte stream, retransmits missing data, preserves order, and limits sending according to both receiver capacity and network conditions.",
      analogy: "Numbered pages are mailed in batches; the receiver reports missing pages and available shelf space while the sender slows when the route becomes crowded.",
      analogyLimit: "TCP acknowledgements, windows, timers, and congestion algorithms are cumulative and adaptive rather than literal page-by-page messages.",
      concreteExample: "One send of 1,000 bytes may arrive through several recv calls, so an application must add a length prefix or delimiter for message boundaries."
    },
    "DNS resolution and caching": {
      plainEnglish: "A resolver follows delegated authority from the DNS hierarchy and caches answers—including failures—for their allowed lifetime.",
      analogy: "A directory assistant asks regional offices until reaching the office authoritative for a name, then keeps the answer until its expiry time.",
      analogyLimit: "Split-horizon views, DNSSEC, multiple address families, load balancing, and negative caching make DNS more than one global phone book.",
      concreteExample: "Changing an A record does not update clients that still hold the old answer until its TTL expires or their cache is cleared."
    },
    "TLS identity and key establishment": {
      plainEnglish: "TLS authenticates the intended peer, negotiates keys, and protects later bytes from reading or modification in transit.",
      analogy: "A courier verifies a signed identity chain, agrees on a fresh locked case, and then transports tamper-evident messages inside it.",
      analogyLimit: "A valid certificate authenticates a name and key, not application authorization, honesty, or safety of the transmitted content.",
      concreteExample: "A client checks certificate chain, validity, and hostname; accepting any certificate would encrypt traffic to a possible attacker."
    },
    "HTTP versions, intermediaries, and caching": {
      plainEnglish: "HTTP defines request and response meaning, while versions choose transport mappings and intermediaries may route, retry, transform, or cache traffic.",
      analogy: "The order form defines what a customer asks for; phone, multiplexed desk, or courier describes transport, and a regional warehouse may answer from stock.",
      analogyLimit: "Intermediaries can parse ambiguously, share connection state, and apply cache rules that have no exact retail equivalent.",
      concreteExample: "A POST retried by a proxy after a lost response can duplicate payment unless the application stores and replays results by idempotency key."
    }
  },
  cpp: {
    "Values, objects, references, and lifetimes": {
      plainEnglish: "C++ objects have storage, type, value, and lifetime; pointers and references provide access but do not automatically express or extend ownership.",
      analogy: "An object is a rented workshop bay, while a pointer is a note containing its bay number; destroying the bay does not erase every copied note.",
      analogyLimit: "Compilers may optimize storage away, references are language aliases rather than nullable handles, and object lifetime follows precise abstract-machine rules.",
      concreteExample: "Returning a reference to a local std::string leaves a dangling alias because the string's lifetime ends when the function returns."
    },
    "RAII and deterministic resource management": {
      plainEnglish: "Bind a resource to an object's lifetime so construction establishes ownership and destruction releases it on every normal or exceptional path.",
      analogy: "A hotel key card is issued at check-in and automatically deactivated at checkout, even when the guest leaves earlier than planned.",
      analogyLimit: "Shared ownership, cycles, asynchronous work, and process termination require policies beyond one lexical object's destructor.",
      concreteExample: "std::lock_guard acquires a mutex in its constructor and unlocks in its destructor when the scope exits after success or exception."
    },
    "Templates, concepts, and compile-time polymorphism": {
      plainEnglish: "Templates generate type-specific code from one definition, and concepts state which operations a type must support before instantiation.",
      analogy: "A manufacturing jig produces parts in several materials, while the specification rejects materials that cannot tolerate the required operations.",
      analogyLimit: "Template instantiation can change overload resolution, code size, diagnostics, and compile time in ways a physical jig does not.",
      concreteExample: "A sortable concept can reject a type without an ordering relation at the call site instead of producing a deep substitution error."
    },
    "Containers, iterators, and algorithmic cost": {
      plainEnglish: "Standard containers make different guarantees about layout, lookup, insertion, iterator validity, and ownership; algorithms rely on iterator capabilities.",
      analogy: "A vector is a row of adjacent lockers, a list is a chain of lockers, and an iterator is a route card whose validity depends on renovations.",
      analogyLimit: "Cache lines, allocator behavior, branch prediction, and invalidation rules make actual performance more complex than locker placement.",
      concreteExample: "vector::push_back may reallocate, moving all elements and invalidating every pointer and iterator into the old storage."
    },
    "Undefined behavior and the abstract machine": {
      plainEnglish: "The standard defines a portable abstract machine; once a program performs undefined behavior, the compiler owes no meaningful continuation semantics.",
      analogy: "Traffic rules guarantee outcomes only while drivers stay on the mapped road; leaving it means the map no longer predicts where the vehicle goes.",
      analogyLimit: "Undefined behavior can affect code before the apparent bad line because optimization reasons about impossible executions globally.",
      concreteExample: "Signed integer overflow may let an optimizer remove a bounds check because the standard says the overflowing execution cannot occur."
    },
    "Concurrency and the memory model": {
      plainEnglish: "Concurrent accesses need synchronization that orders memory effects; a data race on ordinary memory makes the program undefined.",
      analogy: "Workers update a shared log through numbered, locked handoff points so everyone agrees which entries are visible before the next step.",
      analogyLimit: "Atomic memory orders and compiler/CPU reordering are formal relationships, not simply wall-clock order or physical locks.",
      concreteExample: "A release store to an atomic ready flag and an acquire load that observes it can publish earlier non-atomic data safely."
    }
  },
  python: {
    "Names, objects, identity, and mutability": {
      plainEnglish: "Python variables are names bound to objects; assignment rebinds a name, while mutation changes an object that several names may share.",
      analogy: "Names are sticky labels placed on boxes. Moving a label does not move the box, and two labels on one box both observe changes inside it.",
      analogyLimit: "Python manages references and object lifetimes automatically, and some immutable objects may be interned, so labels are not memory addresses.",
      concreteExample: "Appending through alias = items changes the shared list, but alias = [] only rebinds alias and leaves items pointing to the old list."
    },
    "Protocols, data model, and duck typing": {
      plainEnglish: "Python code often depends on supported behavior—iteration, context management, hashing, calling—rather than a declared inheritance tree.",
      analogy: "An electrical socket accepts any appliance that follows its plug and voltage protocol, regardless of the appliance's brand or ancestry.",
      analogyLimit: "Python protocols can be discovered only at runtime unless static typing is added, and semantic expectations extend beyond method names.",
      concreteExample: "for x in value relies on the iteration protocol, so a custom object can participate by implementing __iter__ without inheriting list."
    },
    "Iteration, generators, and lazy evaluation": {
      plainEnglish: "An iterator yields one value at a time and remembers its position; a generator packages that suspended execution state behind the iterator protocol.",
      analogy: "A ticket dispenser produces the next numbered ticket only when asked instead of printing and storing every future ticket in advance.",
      analogyLimit: "Generators can receive values, raise exceptions, delegate, and own cleanup, so they are more capable than a one-way dispenser.",
      concreteExample: "sum(line_length(path) for path in paths) can process one file result at a time instead of building an intermediate list."
    },
    "Exceptions, context managers, and resource ownership": {
      plainEnglish: "Exceptions separate failure propagation from local handling, while context managers guarantee paired setup and cleanup around a scope.",
      analogy: "Borrowing a secure room requires signing in and signing out; the attendant records checkout even when the meeting ends unexpectedly.",
      analogyLimit: "__exit__ may suppress or transform exceptions, and abrupt process termination can still bypass ordinary cleanup.",
      concreteExample: "with open(path) as file closes the descriptor after normal processing or an exception, unlike relying on garbage collection timing."
    },
    "Imports, packaging, and environments": {
      plainEnglish: "Imports execute and cache modules by qualified name, while environments and lock metadata decide which distributions provide those modules.",
      analogy: "A recipe requests an ingredient by pantry label; the environment determines which supplier's package occupies that labelled shelf.",
      analogyLimit: "Python modules execute code, can be partially initialized during cycles, and distribution names need not match import names.",
      concreteExample: "Running python -m package.module preserves package context, while executing the file path directly can break relative imports."
    },
    "Concurrency, async I/O, and the GIL": {
      plainEnglish: "Threads, processes, and async tasks solve different scheduling problems; CPython's GIL limits simultaneous Python bytecode but not all useful concurrency.",
      analogy: "One interpreter desk serves Python instructions, while tasks hand off the desk during I/O and separate offices can work in parallel processes.",
      analogyLimit: "Native extensions may release the GIL, alternative interpreters differ, and async tasks still block if code does not yield cooperatively.",
      concreteExample: "asyncio can manage thousands of socket waits efficiently, but a CPU-heavy loop blocks the event loop unless moved or divided."
    }
  },
  javascript: {
    "Values, coercion, equality, and identity": {
      plainEnglish: "JavaScript variables contain primitive values or object references, and its comparison operators follow different, precisely defined rules rather than one universal idea of equality.",
      analogy: "Imagine a form desk that sometimes compares the writing exactly and sometimes converts both answers into a standard form first; an object comparison instead asks whether two tickets point to the same stored file.",
      analogyLimit: "The language's coercion steps, NaN, signed zero, Symbols, and reference identity follow formal algorithms that an everyday form desk cannot predict by intuition.",
      concreteExample: "0 == false is true after coercion, 0 === false is false because the types differ, and Object.is(NaN, NaN) is true even though NaN === NaN is false."
    },
    "Lexical scope, closures, and execution context": {
      plainEnglish: "A function keeps access to the live bindings around the place where it was created, while ordinary-function this depends on how that function is called.",
      analogy: "A closure carries a backstage pass to labelled storage drawers from its original theatre, even after the original scene has ended.",
      analogyLimit: "The pass reaches live bindings rather than frozen photographs, and this, var hoisting, temporal dead zones, and garbage collection have separate language rules.",
      concreteExample: "Callbacks created in a loop with let each see their iteration's binding, while callbacks sharing one var binding all observe its final changed value."
    },
    "Objects, prototypes, classes, and property semantics": {
      plainEnglish: "An object first checks its own properties and then follows a prototype link for missing ones; class syntax organizes this machinery but does not replace it.",
      analogy: "A device checks its local instruction card and, if an instruction is absent, consults a linked reference manual belonging to its model.",
      analogyLimit: "JavaScript lookup can involve accessors, descriptors, private brands, proxies, mutation, and several prototype levels, so it is not simple document inheritance.",
      concreteExample: "An instance can shadow an inherited property with its own value, while deleting that own value reveals the prototype's value again."
    },
    "Event loop, jobs, tasks, and asynchronous control flow": {
      plainEnglish: "One JavaScript job runs until it finishes; promise continuations wait in a high-priority job queue, while the host later selects timers, input, rendering, and I/O work.",
      analogy: "A clerk finishes the current customer, empties a tray of promised follow-up notes, and only then calls the next appointment from the building's schedule.",
      analogyLimit: "Browsers and Node.js have different host phases, workers use separate agents, and exact fairness or timing is not guaranteed by the clerk picture.",
      concreteExample: "A resolved Promise.then callback runs after the current stack but before a zero-delay timer, while a long synchronous loop delays both."
    },
    "Modules, packages, and runtime boundaries": {
      plainEnglish: "Modules connect named live bindings, while package metadata and the actual loader decide which file and environment those names resolve to.",
      analogy: "A switchboard wires a caller to a live extension instead of photocopying every future conversation, and a directory decides which extension a name means.",
      analogyLimit: "Cyclic initialization, top-level await, package conditions, URL identity, bundlers, and CommonJS interoperability make the real module graph more complex.",
      concreteExample: "An imported counter binding reflects later changes made by its exporting module, but assigning to that imported name is forbidden."
    },
    "Memory, performance, and security": {
      plainEnglish: "The collector removes unreachable objects, engines optimize observed hot behavior, and security depends on keeping untrusted data away from dangerous context-specific operations.",
      analogy: "A warehouse keeps every box reachable from an active inventory chain, rearranges frequently used aisles, and requires hazardous deliveries to pass the correct inspection station.",
      analogyLimit: "Reachability roots, JIT speculation, deoptimization, DOM retention, and HTML, URL, SQL, or shell contexts each follow technical rules the warehouse cannot model fully.",
      concreteExample: "A removed DOM node still leaks when a long-lived listener retains it, and placing a validated string into innerHTML can still create XSS because string type is not HTML safety."
    }
  },
  typescript: {
    "Erased structural types and assignability": {
      plainEnglish: "TypeScript mostly accepts a value when it has the required shape, then removes ordinary type information before the JavaScript runs.",
      analogy: "A blueprint inspector checks that a machine exposes the required controls, stamps the plan, and leaves; the running machine does not carry the inspector beside it.",
      analogyLimit: "Assignability includes deliberate unsound rules, private members can affect compatibility, and runtime validators or metadata can exist only when separately implemented.",
      concreteExample: "A plain object with id and name can satisfy a User interface without declaring it, but JSON claiming those fields still needs runtime validation."
    },
    "Narrowing, unions, and exhaustive modeling": {
      plainEnglish: "A union lists the permitted alternatives, and runtime evidence lets the checker reduce that list along each control-flow path.",
      analogy: "Tagged folders enter a sorting desk; reading the folder's state label reveals which documents are valid inside, and an empty remainder proves every label was handled.",
      analogyLimit: "Mutable aliases, callbacks, getters, incorrect predicates, and assertions can invalidate the evidence after a check, unlike a sealed physical folder.",
      concreteExample: "Switching on result.kind narrows a success variant to its data and an error variant to its message; assigning the default branch to never exposes a newly added variant."
    },
    "Generics, inference, variance, and constraints": {
      plainEnglish: "Generics preserve a relationship between several type positions, constraints state the abilities required, and variance explains whether that relationship remains safe through assignment.",
      analogy: "A configurable manufacturing jig accepts any material meeting its strength requirement and remembers that material from the input part to the matching output part.",
      analogyLimit: "Inference has contextual rules, conditional types may distribute, and mutable inputs and outputs create soundness questions that a physical jig does not express.",
      concreteExample: "get<T, K extends keyof T>(object, key): T[K] accepts only real keys and returns the value type associated with the particular selected key."
    },
    "Object types, excess properties, and soundness boundaries": {
      plainEnglish: "An object type usually states the minimum required surface; a fresh literal gets an extra spelling check, but that does not make every object exact or deeply immutable.",
      analogy: "Admission requires a minimum checklist, while a newly submitted form is also scanned for suspicious unexpected boxes that may be typos.",
      analogyLimit: "The scan applies only in selected fresh-literal contexts, readonly is a view, and index signatures, callbacks, arrays, and declarations expose additional compatibility rules.",
      concreteExample: "Passing { name: 'Ada', nmae: 'typo' } directly can trigger an excess-property error, while a variable containing name plus other legitimate data can satisfy { name: string }."
    },
    "Modules, declaration files, and build topology": {
      plainEnglish: "TypeScript builds a static map over JavaScript modules, but the runtime loader, emitted files, declarations, and package exports must all agree for the application to work.",
      analogy: "A transit planning map can describe valid routes, yet trains still fail if the real tracks, station names, and timetables were built differently.",
      analogyLimit: "ESM and CommonJS semantics, conditional exports, file extensions, bundlers, project references, and incremental caches are more dynamic than one printed map.",
      concreteExample: "A paths alias may give perfect editor completion and pass tsc, then fail in Node.js because the emitted import still contains an alias the loader does not recognize."
    },
    "Runtime validation and API evolution": {
      plainEnglish: "Data crossing a network, storage, message, environment, or user boundary is unknown until runtime code validates it, and that validation must evolve with every producer and consumer.",
      analogy: "Passport control verifies a traveler's current documents at the border; a name printed on an internal itinerary cannot replace that check.",
      analogyLimit: "Validation is only a snapshot: authorization, semantic relationships, version skew, migrations, and malicious behavior require continuing policy beyond shape checking.",
      concreteExample: "Parse a payment event's version, currency, integer amount, identifier format, and allowed state transition before constructing the trusted PaymentEvent used by business code."
    }
  }
};
