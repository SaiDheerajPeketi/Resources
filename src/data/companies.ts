import { NamedCompanyGuideSchema, SourceRecordSchema } from "@/lib/schema";

const rows = [
  ["amazon", "Amazon", "global-product", "https://www.amazon.jobs/content/en/how-we-hire/interviewing-at-amazon"],
  ["google", "Google", "global-product", "https://www.google.com/about/careers/applications/interview-tips/"],
  ["microsoft", "Microsoft", "global-product", "https://careers.microsoft.com/v2/global/en/hiring-tips"],
  ["meta", "Meta", "global-product", "https://www.metacareers.com/careerprograms/pathways/software-engineering"],
  ["apple", "Apple", "global-product", "https://www.apple.com/careers/us/"],
  ["netflix", "Netflix", "global-product", "https://jobs.netflix.com/culture"],
  ["uber", "Uber", "global-product", "https://www.uber.com/us/en/careers/"],
  ["atlassian", "Atlassian", "global-product", "https://www.atlassian.com/company/careers/resources/interviewing"],
  ["salesforce", "Salesforce", "global-product", "https://careers.salesforce.com/en/how-we-hire/"],
  ["adobe", "Adobe", "global-product", "https://careers.adobe.com/us/en/interviewing-at-adobe"],
  ["oracle", "Oracle", "infrastructure", "https://www.oracle.com/careers/"],
  ["stripe", "Stripe", "fintech", "https://stripe.com/jobs"],
  ["databricks", "Databricks", "infrastructure", "https://www.databricks.com/company/careers"],
  ["flipkart", "Flipkart", "indian-product", "https://www.flipkartcareers.com/"],
  ["razorpay", "Razorpay", "fintech", "https://razorpay.com/jobs/"],
  ["phonepe", "PhonePe", "fintech", "https://www.phonepe.com/careers/"],
  ["paytm", "Paytm", "fintech", "https://paytm.com/careers/"],
  ["cred", "CRED", "fintech", "https://careers.cred.club/"],
  ["groww", "Groww", "fintech", "https://groww.in/careers"],
  ["swiggy", "Swiggy", "indian-product", "https://careers.swiggy.com/"],
  ["zomato", "Zomato", "indian-product", "https://www.zomato.com/careers"],
  ["meesho", "Meesho", "indian-product", "https://www.meesho.io/jobs"],
  ["tcs", "TCS", "services", "https://www.tcs.com/careers"],
  ["infosys", "Infosys", "services", "https://www.infosys.com/careers/"],
  ["wipro", "Wipro", "services", "https://careers.wipro.com/"],
  ["accenture", "Accenture", "services", "https://www.accenture.com/us-en/careers"],
  ["cognizant", "Cognizant", "services", "https://careers.cognizant.com/global-en/"],
  ["jane-street", "Jane Street", "quant", "https://www.janestreet.com/join-jane-street/interviewing/"],
  ["citadel", "Citadel", "quant", "https://www.citadel.com/careers/"],
  ["tower-research", "Tower Research", "quant", "https://www.tower-research.com/open-positions"],
  ["graviton", "Graviton", "quant", "https://www.gravitontrading.com/careers.html"],
  ["quadeye", "Quadeye", "quant", "https://www.quadeye.com/careers/"],
] as const;

const focusByArchetype: Record<string, string[]> = {
  "global-product": ["DSA and clean implementation", "system and API design", "behavioral evidence and product judgment"],
  "indian-product": ["DSA speed and edge cases", "CS fundamentals and project depth", "scalable product design"],
  fintech: ["correctness, idempotency, and data invariants", "payments or financial-system design", "security, resilience, and operational judgment"],
  services: ["language and core-CS foundations", "SQL, projects, and client communication", "role-specific framework readiness"],
  infrastructure: ["systems, concurrency, and performance", "distributed storage and reliability", "debugging from evidence"],
  quant: ["probability, logic, and mathematical fluency", "low-latency or high-performance coding", "markets, rigor, and clear reasoning"]
};

const roundsFor = (archetype: string) => {
  const focus = focusByArchetype[archetype];
  return [
    { title: "Recruiter or role screen", format: "Role, timing, scope, and process alignment", focus: [focus[0]], preparation: ["Confirm the current loop with the recruiter; public formats change.", "Prepare a concise role-fit narrative with evidence."] },
    { title: "Technical foundations", format: "Live or take-home technical assessment", focus: [focus[0], focus[1]], preparation: ["Practice timed reasoning and test edge cases aloud.", "State complexity, assumptions, and trade-offs."] },
    { title: "Role depth", format: "Architecture, domain, or specialist interview", focus: [focus[1], focus[2]], preparation: ["Use one deep project to show decisions and failure recovery.", "Connect design choices to measurable constraints."] },
    { title: "Behavioral and values", format: "Evidence-based conversation", focus: [focus[2]], preparation: ["Prepare ownership, conflict, failure, ambiguity, and learning stories.", "Separate your contribution from the team's result."] }
  ];
};

export const companyGuides = NamedCompanyGuideSchema.array().parse(rows.map(([id, name, archetype, url]) => ({
  id, name, archetype,
  summary: `A date-stamped preparation map for ${name}, based only on public careers and interview material. Team, level, location, and timing can change the actual loop.`,
  roleFocus: focusByArchetype[archetype],
  rounds: roundsFor(archetype),
  sourceIds: [`${id}-careers`],
  lastReviewed: "2026-09-18",
  asOf: "2026-09-18",
  disclaimer: "Public-process preparation guide only. It contains no proprietary questions, leaks, or guarantee of a current interview format. Confirm the active process with your recruiter."
})));

export const companySources = SourceRecordSchema.array().parse(rows.map(([id, name, , url]) => ({ id: `${id}-careers`, title: `${name} official careers or interviewing page`, url, kind: "official-doc", lastReviewed: "2026-09-18", asOf: "2026-09-18" })));
export const companyById = new Map(companyGuides.map((guide) => [guide.id, guide]));
export const companySourceById = new Map(companySources.map((source) => [source.id, source]));
