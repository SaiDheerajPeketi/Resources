import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, CircleDashed, Clock3, Route } from "lucide-react";
import { topicById, topicsForTrack, tracks, trackById } from "@/data/catalog";
import { TrackIdSchema } from "@/lib/schema";
import { TrackIcon } from "@/components/track-icon";
import { aiRoleMaps } from "@/data/ai-role-maps";
import { domainRoadmapById } from "@/data/domain-roadmaps";

const levelLabel = { foundation: "beginner", interview: "interview practice", advanced: "advanced" } as const;

export const dynamicParams = false;
export function generateStaticParams() { return tracks.map((track) => ({ track: track.id })); }

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }): Promise<Metadata> {
  const { track: value } = await params;
  const parsed = TrackIdSchema.safeParse(value);
  const track = parsed.success ? trackById.get(parsed.data) : undefined;
  return track ? { title: track.title, description: track.description } : { title: "Track not found" };
}

export default async function TrackPage({ params }: { params: Promise<{ track: string }> }) {
  const { track: value } = await params;
  const parsed = TrackIdSchema.safeParse(value);
  if (!parsed.success) notFound();
  const track = trackById.get(parsed.data)!;
  const topics = topicsForTrack(track.id);
  const roadmap = domainRoadmapById.get(track.id)!;
  return <main id="main-content" className="index-page">
    <header className="index-title">
      <div className="track-title-icon"><TrackIcon trackId={track.id} size={31} /></div>
      <div><h1>{track.title}</h1><p>{track.description}</p></div>
      <Link href={`/atlas/`} className="text-action">Open map <ArrowRight size={17} /></Link>
    </header>
    <section className="domain-roadmap" aria-labelledby="domain-roadmap-title" data-pagefind-body>
      <header>
        <div><Route size={24} /><h2 id="domain-roadmap-title">Your {track.title} roadmap</h2></div>
        <div className="roadmap-intro-copy"><p>{roadmap.beginnerGuide.whatItIs}</p><details><summary>See the complete technical scope</summary><p>{roadmap.summary}</p></details></div>
      </header>
      <div className="roadmap-beginner-guide">
        <section><h3>Why this matters</h3><p>{roadmap.beginnerGuide.whyItMatters}</p></section>
        <section><h3>Think of it like this</h3><p>{roadmap.beginnerGuide.analogy}</p></section>
        <section><h3>Your first small step</h3><p>{roadmap.beginnerGuide.firstStep}</p></section>
        <section className="roadmap-key-terms"><h3>Words to know before you begin</h3><dl>{roadmap.beginnerGuide.keyTerms.map((entry) => <div key={entry.term}><dt>{entry.term}</dt><dd>{entry.meaning}</dd></div>)}</dl></section>
      </div>
      <div className="roadmap-orientation">
        <div><h3>Choose this track if...</h3><p>{roadmap.audience}</p></div>
        <div><h3>By the end, you can...</h3><ul>{roadmap.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div>
      </div>
      <ol className="roadmap-stages">
        {roadmap.stages.map((stage, index) => <li key={stage.id}>
          <header>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><small>{levelLabel[stage.level]} · about {stage.estimatedHours} hours</small><h3>{stage.title}</h3><p className="stage-plain-english">{stage.plainEnglish}</p><details className="technical-goal"><summary>See the exact technical goal</summary><p>{stage.objective}</p></details></div>
          </header>
          <div className="roadmap-prerequisites"><strong>Before you begin</strong><span>{stage.prerequisites.join(" · ")}</span></div>
          <nav aria-label={`${stage.title} field notes`}>{stage.topicIds.map((id) => { const topic = topicById.get(id); return topic ? <Link key={id} href={`/topics/${topic.slug}/`}>{topic.title}<ArrowRight size={14} /></Link> : null; })}</nav>
          <div className="roadmap-stage-grid">
            <section><h4>Learn these ideas</h4><ul>{stage.concepts.map((line) => <li key={line}>{line}</li>)}</ul></section>
            <section><h4>Do this yourself</h4><ul>{stage.practice.map((line) => <li key={line}>{line}</li>)}</ul></section>
            <section><h4>Move on when...</h4><ul>{stage.readinessGate.map((line) => <li key={line}>{line}</li>)}</ul></section>
          </div>
          <div className="roadmap-deliverable"><strong>Make this</strong><p>{stage.deliverable}</p></div>
          <div className="roadmap-prompts"><strong>Questions to answer</strong><ul>{stage.interviewPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul></div>
        </li>)}
      </ol>
      <div className="roadmap-closeout">
        <section><h3>Final project: {roadmap.capstone.title}</h3><p>{roadmap.capstone.brief}</p><h4>What to save and show</h4><ul>{roadmap.capstone.evidence.map((line) => <li key={line}>{line}</li>)}</ul></section>
        <section><h3>Your mock interview rounds</h3><ol>{roadmap.interviewLoop.map((line) => <li key={line}>{line}</li>)}</ol><h3>Common misunderstandings</h3><dl>{roadmap.misconceptions.map((entry) => <div key={entry.claim}><dt>{entry.claim}</dt><dd>{entry.correction}</dd></div>)}</dl></section>
      </div>
      <details className="roadmap-revision"><summary>Ready-for-interview checklist</summary><ul>{roadmap.revisionChecklist.map((line) => <li key={line}>{line}</li>)}</ul></details>
    </section>
    {track.id === "ai-data" ? <section className="role-map-field" aria-labelledby="ai-role-map-title">
      <header>
        <h2 id="ai-role-map-title">Choose the interview emphasis, not a different foundation.</h2>
        <p>Every route shares statistics, data quality, evaluation, and engineering discipline. The emphasis changes with the role.</p>
      </header>
      <div className="topic-table role-map-table" role="table" aria-label="AI and data role maps">
        <div className="topic-table-head" role="row"><span role="columnheader">Role</span><span role="columnheader">Priority route</span><span role="columnheader">Supporting depth</span><span role="columnheader">Typical loop</span><span role="columnheader">Proof to build</span></div>
        {aiRoleMaps.map((role) => <div className="topic-table-row" role="row" key={role.roleId}>
          <span role="cell" className="topic-cell-title"><strong>{role.title}</strong><small>{role.focus}</small></span>
          <span role="cell" className="priority-cell"><strong className="mobile-field-label">Priority route</strong>{role.priorityTopics.map((slug, index) => <span key={slug}>{index ? ", " : ""}<Link href={`/topics/ai-data/${slug}/`}>{topicById.get(`ai-data/${slug}`)?.title ?? slug}</Link></span>)}</span>
          <span role="cell">{role.supportingTopics.join(" · ")}</span>
          <span role="cell">{role.interviewLoop}</span>
          <span role="cell" className="proof-cell"><strong className="mobile-field-label">Proof to build</strong>{role.evidence}</span>
        </div>)}
      </div>
    </section> : null}
    <section className="manifest-field" aria-labelledby="topic-manifest-title">
      <header>
        <h2 id="topic-manifest-title">Complete {track.title} topic manifest</h2>
        <p>{topics.length} field notes ordered from foundations through advanced interview depth.</p>
      </header>
      <div className="topic-table" role="table" aria-label={`${track.title} curriculum`}>
      <div className="topic-table-head" role="row"><span role="columnheader">Topic</span><span role="columnheader">Level</span><span role="columnheader">Time</span><span role="columnheader">Status</span><span role="columnheader">Action</span></div>
      {topics.map((topic) => <div className="topic-table-row" role="row" key={topic.id}>
        <span role="cell" className="topic-cell-title"><strong>{topic.title}</strong><small>{topic.summary}</small></span>
        <span role="cell" className="level-code">{topic.level}</span>
        <span role="cell"><Clock3 size={15} /> {topic.durationMinutes}m</span>
        <span role="cell">{topic.publicationStatus === "published" ? <><CheckCircle2 size={16} className="teal" /> Published</> : <><CircleDashed size={16} /> Planned</>}</span>
        <span role="cell">{topic.publicationStatus === "published" ? <Link href={`/topics/${topic.slug}/`}>Open note <ArrowRight size={15} /></Link> : <span className="muted-action">Mapped for release</span>}</span>
      </div>)}
      </div>
    </section>
  </main>;
}
