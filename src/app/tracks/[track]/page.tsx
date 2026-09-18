import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, CircleDashed, Clock3 } from "lucide-react";
import { topicById, topicsForTrack, tracks, trackById } from "@/data/catalog";
import { TrackIdSchema } from "@/lib/schema";
import { TrackIcon } from "@/components/track-icon";
import { aiRoleMaps } from "@/data/ai-role-maps";

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
  return <main id="main-content" className="index-page">
    <header className="index-title">
      <div className="track-title-icon"><TrackIcon trackId={track.id} size={31} /></div>
      <div><h1>{track.title}</h1><p>{track.description}</p></div>
      <Link href={`/atlas/`} className="text-action">Open map <ArrowRight size={17} /></Link>
    </header>
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
