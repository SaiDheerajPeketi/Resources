import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, CircleDashed, Clock3 } from "lucide-react";
import { topicsForTrack, tracks, trackById } from "@/data/catalog";
import { TrackIdSchema } from "@/lib/schema";
import { TrackIcon } from "@/components/track-icon";

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
    <div className="topic-table" role="table" aria-label={`${track.title} curriculum`}>
      <div className="topic-table-head" role="row"><span>Topic</span><span>Level</span><span>Time</span><span>Status</span><span>Action</span></div>
      {topics.map((topic) => <div className="topic-table-row" role="row" key={topic.id}>
        <span className="topic-cell-title"><strong>{topic.title}</strong><small>{topic.summary}</small></span>
        <span className="level-code">{topic.level}</span>
        <span><Clock3 size={15} /> {topic.durationMinutes}m</span>
        <span>{topic.publicationStatus === "published" ? <><CheckCircle2 size={16} className="teal" /> Published</> : <><CircleDashed size={16} /> Planned</>}</span>
        <span>{topic.publicationStatus === "published" ? <Link href={`/topics/${topic.slug}/`}>Open note <ArrowRight size={15} /></Link> : <span className="muted-action">Mapped for release</span>}</span>
      </div>)}
    </div>
  </main>;
}
