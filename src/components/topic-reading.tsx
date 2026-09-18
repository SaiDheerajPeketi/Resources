import Link from "next/link";
import { ArrowLeft, Clock3, Map, Printer, Route } from "lucide-react";
import { topicById, trackById } from "@/data/catalog";
import type { TopicMeta } from "@/lib/schema";
import { TopicToolbar } from "@/components/topic-toolbar";

export function TopicReading({ topic, children }: { topic: TopicMeta; children: React.ReactNode }) {
  const track = trackById.get(topic.trackId)!;
  const prerequisites = topic.prerequisites.map((id) => topicById.get(id)).filter(Boolean) as TopicMeta[];
  return <main id="main-content" className="lesson-shell">
    <nav className="lesson-sidebar" aria-label="Topic context">
      <Link className="back-link" href={`/tracks/${topic.trackId}/`}><ArrowLeft size={17} /> {track.shortTitle}</Link>
      <div className="lesson-index-label">Field note</div>
      <h2>{topic.title}</h2>
      <dl>
        <div><dt>Level</dt><dd>{topic.level}</dd></div>
        <div><dt>Study time</dt><dd>{topic.durationMinutes} min</dd></div>
        <div><dt>Reviewed</dt><dd>{topic.lastReviewed}</dd></div>
      </dl>
      <section><h3><Route size={17} /> Prerequisites</h3>{prerequisites.length ? prerequisites.map((item) => item.publicationStatus === "published" ? <Link key={item.id} href={`/topics/${item.slug}/`}>{item.title}</Link> : <span key={item.id}>{item.title}<small>planned</small></span>) : <p>Start here.</p>}</section>
      <section><h3><Map size={17} /> Role relevance</h3>{topic.roleIds.map((role) => <span className="role-token" key={role}>{role}</span>)}</section>
      <div className="print-button"><Printer size={17} /> Use browser print for the revision sheet</div>
    </nav>
    <article className="lesson-article" data-pagefind-body>
      <header className="lesson-title">
        <div className="lesson-meta"><span>{track.title}</span><span><Clock3 size={14} /> {topic.durationMinutes} minutes</span></div>
        <h1>{topic.title}</h1>
        <p>{topic.summary}</p>
      </header>
      <div className="lesson-content">{children}</div>
    </article>
    <TopicToolbar topicId={topic.id} />
  </main>;
}
