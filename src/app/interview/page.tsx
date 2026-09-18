import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  Code2,
  FileText,
  Landmark,
  MessageSquareText,
  Network,
  PhoneCall,
  Scale,
  ShieldCheck,
  Users
} from "lucide-react";

export const metadata: Metadata = { title: "Interview loops" };

const loops = [
  { title: "Global product SDE", icon: Code2, duration: "4 × 45 min", rounds: ["DSA medium/hard", "low-level design", "system design", "behavioral and projects"] },
  { title: "AI / ML engineer", icon: Network, duration: "4 × 50 min", rounds: ["Python/SQL and data", "ML fundamentals", "ML/LLM system design", "product and behavioral"] },
  { title: "DevOps / SRE", icon: BriefcaseBusiness, duration: "4 × 45 min", rounds: ["Linux/network debugging", "cloud and Kubernetes", "reliability design", "incident leadership"] },
  { title: "Security engineer", icon: ShieldCheck, duration: "3 × 60 min", rounds: ["threat-model case", "application/cloud security", "incident and behavioral"] },
  { title: "Fintech / quant", icon: Landmark, duration: "4 × 45 min", rounds: ["probability and coding", "ledger/payment case", "markets or low latency", "risk and behavioral"] }
];

const careerNotes = [
  {
    title: "Resume construction", icon: FileText, purpose: "Make role fit and evidence scannable in under a minute.",
    checklist: ["Lead with the target role and strongest relevant evidence", "Use action + technical scope + measurable outcome", "Name scale honestly: users, latency, data, cost, reliability, or time", "Remove skills you cannot defend in a follow-up"],
    template: "Improved [system or user outcome] by [measured result] by [specific technical action], under [constraint or scale]."
  },
  {
    title: "Project narrative", icon: Network, purpose: "Demonstrate ownership beyond an architecture diagram.",
    checklist: ["Problem and non-functional constraints", "Architecture and your ownership boundary", "Hardest failure and how evidence narrowed it", "Rejected alternative and trade-off", "Test, rollout, operations, and redesign"],
    template: "Problem → constraints → architecture → my decision → failure → evidence → result → what I would change."
  },
  {
    title: "STAR story bank", icon: MessageSquareText, purpose: "Prepare adaptable evidence for judgment and collaboration questions.",
    checklist: ["Ownership", "Conflict", "Ambiguity", "Failure", "Influence without authority", "Delivery or customer impact", "Learning and changed behavior"],
    template: "Context in two sentences. Spend most time on your decisions, alternatives, actions, result, and reflection."
  },
  {
    title: "Recruiter screen", icon: PhoneCall, purpose: "Align the process before spending preparation time.",
    checklist: ["Role family, team, scope, and level", "Round count, format, languages, and evaluation areas", "Location, work arrangement, authorization, and start timing", "Compensation structure and decision deadlines"],
    template: "I am targeting [scope] because [evidence]. Could you clarify [level/loop/team] and what strong performance looks like?"
  },
  {
    title: "Behavioral interview", icon: Users, purpose: "Show reasoning, not a rehearsed morality play.",
    checklist: ["Ask one clarifying question when the prompt is broad", "Separate your work from the team’s work", "Explain constraints and competing options", "Use defensible evidence, not invented precision", "End with a lesson that changed later behavior"],
    template: "Shared objective → tension or constraint → my evidence and action → resolution → measurable result → changed judgment."
  },
  {
    title: "Offer and negotiation", icon: Scale, purpose: "Compare complete offers and advocate without bluffing.",
    checklist: ["Confirm level, base, variable, equity, vesting, joining bonus, and benefits", "Normalize currency, vesting schedule, and one-time components", "State real constraints and priorities", "Request changes specifically and allow written review time", "Never fabricate another offer"],
    template: "I am excited about [specific scope]. Based on [role evidence/market/real alternative], can we improve [component] to [request]?"
  }
];

const mockSteps = [
  ["00–05", "Set the contract", "Choose role, round, timebox, allowed tools, and scoring rubric. Do not coach during the attempt."],
  ["05–50", "Run the round", "Think aloud, clarify assumptions, state trade-offs, and leave five minutes to test or summarize."],
  ["50–65", "Score evidence", "Mark rubric items as demonstrated, partial, or missing. Separate knowledge gaps from communication gaps."],
  ["65–75", "Create the next loop", "Save missed topics or questions to a named revision list and schedule one targeted re-attempt yourself."]
];

export default function InterviewPage() {
  return <main id="main-content" className="tool-page interview-page">
    <header className="tool-page-title">
      <h1>Interview loops</h1>
      <p>Run a realistic sequence, score evidence instead of vibes, then convert every miss into a specific revision item.</p>
    </header>

    <section className="loop-list" aria-label="Role-specific mock interview loops">
      {loops.map(({ title, icon: Icon, duration, rounds }) => <article key={title}>
        <header><Icon size={22} /><h2>{title}</h2><span><Clock3 size={14} /> {duration}</span></header>
        <ol>{rounds.map((round) => <li key={round}>{round}</li>)}</ol>
        <Link href="/practice/">Open the question bank <ArrowRight size={16} /></Link>
      </article>)}
    </section>

    <section className="career-field" aria-labelledby="career-field-title">
      <header className="career-field-heading">
        <div><MessageSquareText size={22} /><h2 id="career-field-title">Career field guide</h2></div>
        <p>Build these six artifacts once, then adapt them to each role rather than improvising during the loop.</p>
      </header>
      <div className="career-field-list">
        {careerNotes.map(({ title, icon: Icon, purpose, checklist, template }) => <article key={title}>
          <header><Icon size={20} aria-hidden="true" /><div><h3>{title}</h3><p>{purpose}</p></div></header>
          <ul>{checklist.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="career-template"><strong>Working template</strong><p>{template}</p></div>
        </article>)}
      </div>
    </section>

    <section className="mock-field" aria-labelledby="mock-field-title">
      <header><h2 id="mock-field-title">Seventy-five-minute mock template</h2><p>Use with a peer or as a recorded solo run. Keep the score sheet visible and the solution hidden.</p></header>
      <ol>{mockSteps.map(([time, title, detail]) => <li key={time}>
        <time>{time}</time><div><h3>{title}</h3><p>{detail}</p></div>
      </li>)}</ol>
      <div className="mock-close">
        <p><strong>Debrief prompt:</strong> What evidence would have moved one rubric item from partial to demonstrated?</p>
        <Link href="/revision/">Open revision lists <ArrowRight size={16} /></Link>
      </div>
    </section>
  </main>;
}
