"use client";

import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { Download, FileText, Trash2 } from "lucide-react";
import { getDB, revisionItemsToMarkdown } from "@/lib/db";
import { topicById } from "@/data/catalog";

function download(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = name; anchor.click(); URL.revokeObjectURL(url);
}

export function RevisionClient() {
  const items = useLiveQuery(() => getDB().revisionItems.orderBy("createdAt").reverse().toArray(), [], []);
  const notes = useLiveQuery(() => getDB().notes.orderBy("updatedAt").reverse().toArray(), [], []);
  const titleById = new Map([...topicById].map(([id, topic]) => [id, topic.title]));
  return <div className="revision-layout">
    <section>
      <div className="section-bar"><h2>Manual revision lists</h2><button onClick={() => download("interview-atlas-revision.md", revisionItemsToMarkdown(items, titleById), "text/markdown")} disabled={!items.length}><Download size={17} /> Export Markdown</button></div>
      {!items.length ? <div className="empty-panel"><FileText size={28} /><h3>No saved revision items</h3><p>Add topics or questions from the atlas and practice field.</p><Link href="/atlas/">Browse the atlas</Link></div> : <div className="revision-rows">{items.map((item) => { const topic = topicById.get(item.itemId); return <div key={item.id}><span><strong>{topic?.title ?? item.itemId}</strong><small>{item.name} · {item.itemType}</small></span>{topic && <Link href={`/topics/${topic.slug}/`}>Open</Link>}<button aria-label={`Remove ${topic?.title ?? item.itemId}`} onClick={() => getDB().revisionItems.delete(item.id)}><Trash2 size={16} /></button></div>; })}</div>}
    </section>
    <section>
      <div className="section-bar"><h2>Topic notes</h2></div>
      {!notes.length ? <p className="empty-copy">Notes saved inside field notes appear here.</p> : <div className="note-rows">{notes.map((note) => { const topic = topicById.get(note.topicId); return <article key={note.id}><header><strong>{topic?.title ?? note.topicId}</strong><time>{new Date(note.updatedAt).toLocaleDateString()}</time></header><p>{note.body || "Empty note"}</p></article>; })}</div>}
    </section>
  </div>;
}
