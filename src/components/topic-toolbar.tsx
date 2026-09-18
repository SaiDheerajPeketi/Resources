"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, Check, ListPlus, Save } from "lucide-react";
import { addRevisionItem, getDB, setProgress, toggleBookmark } from "@/lib/db";
import type { ProgressStatus } from "@/lib/schema";

export function TopicToolbar({ topicId }: { topicId: string }) {
  const [status, setStatus] = useState<ProgressStatus>("unseen");
  const [bookmarked, setBookmarked] = useState(false);
  const [note, setNote] = useState("");
  const [revisionList, setRevisionList] = useState("Current revision");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const db = getDB();
    void Promise.all([db.progress.get(topicId), db.bookmarks.get(topicId), db.notes.where("topicId").equals(topicId).first()]).then(([progress, bookmark, savedNote]) => {
      if (progress) setStatus(progress.status);
      setBookmarked(Boolean(bookmark));
      if (savedNote) setNote(savedNote.body);
    });
  }, [topicId]);

  const saveNote = async () => {
    const db = getDB();
    const existing = await db.notes.where("topicId").equals(topicId).first();
    await db.notes.put({ id: existing?.id ?? crypto.randomUUID(), topicId, body: note, updatedAt: new Date().toISOString() });
    setMessage("Note saved locally.");
  };

  return <aside className="lesson-tools" aria-label="Topic study controls">
    <label>Study status
      <select value={status} onChange={async (event) => { const next = event.target.value as ProgressStatus; setStatus(next); await setProgress(topicId, next); setMessage(`Marked ${next}.`); }}>
        <option value="unseen">Unseen</option><option value="reading">Reading</option><option value="practicing">Practicing</option><option value="revising">Revising</option><option value="confident">Confident</option>
      </select>
    </label>
    <button onClick={async () => { const next = await toggleBookmark(topicId); setBookmarked(next); setMessage(next ? "Bookmarked." : "Bookmark removed."); }}>{bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}{bookmarked ? "Bookmarked" : "Bookmark"}</button>
    <label>Revision list<input value={revisionList} onChange={(event) => setRevisionList(event.target.value)} placeholder="Current revision" /></label>
    <button onClick={async () => { const name = revisionList.trim() || "Current revision"; await addRevisionItem(topicId, "topic", name); setMessage(`Added to ${name}.`); }}><ListPlus size={18} /> Add to revision</button>
    <label className="note-field">Private note<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="What do you want to recall later?" /></label>
    <button onClick={saveNote}><Save size={18} /> Save note</button>
    {message && <p className="tool-message" role="status"><Check size={15} /> {message}</p>}
  </aside>;
}
