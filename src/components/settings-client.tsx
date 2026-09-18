"use client";

import { useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Check, Download, HardDriveDownload, RotateCcw, Trash2, Upload } from "lucide-react";
import { tracks } from "@/data/catalog";
import { cachePack, packById, removeCachedPack } from "@/data/packs";
import { exportStudyData, getDB, importStudyData } from "@/lib/db";
import type { TrackId } from "@/lib/schema";

function saveFile(name: string, content: string) { const url = URL.createObjectURL(new Blob([content], { type: "application/json" })); const anchor = document.createElement("a"); anchor.href = url; anchor.download = name; anchor.click(); URL.revokeObjectURL(url); }

export function SettingsClient() {
  const packs = useLiveQuery(() => getDB().installedPacks.toArray(), [], []);
  const [working, setWorking] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const install = async (trackId: TrackId) => {
    setWorking(trackId); setProgress(0); setMessage("");
    try {
      const pack = await cachePack(trackId, (done, total) => setProgress(Math.round(done / total * 100)));
      await getDB().installedPacks.put({ packId: trackId, version: pack.version, integrity: pack.integrity, installedAt: new Date().toISOString() });
      setMessage(`${pack.title} is available offline.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Offline download failed."); }
    finally { setWorking(""); }
  };
  const installAll = async () => {
    setWorking("all"); setProgress(0); setMessage("");
    try {
      for (const [index, track] of tracks.entries()) {
        const pack = await cachePack(track.id);
        await getDB().installedPacks.put({ packId: track.id, version: pack.version, integrity: pack.integrity, installedAt: new Date().toISOString() });
        setProgress(Math.round(((index + 1) / tracks.length) * 100));
      }
      setMessage("Every published track pack is available offline.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Offline download failed."); }
    finally { setWorking(""); }
  };
  const remove = async (trackId: TrackId) => { await removeCachedPack(trackId); await getDB().installedPacks.delete(trackId); setMessage("Offline pack removed; study progress was preserved."); };
  const backup = async () => saveFile(`interview-atlas-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(await exportStudyData(), null, 2));
  const restore = async (file?: File) => {
    if (!file) return;
    try { const result = await importStudyData(JSON.parse(await file.text())); setMessage(result.orphanedTopicIds.length ? `Imported with ${result.orphanedTopicIds.length} orphaned topic IDs preserved.` : "Backup imported successfully."); }
    catch (error) { setMessage(error instanceof Error ? `Import rejected: ${error.message}` : "Import rejected."); }
    if (inputRef.current) inputRef.current.value = "";
  };

  return <div className="settings-grid">
    <section><div className="section-bar"><h2>Offline track packs</h2><button onClick={installAll} disabled={Boolean(working) || packs.length === tracks.length}><HardDriveDownload size={16} /> {working === "all" ? `${progress}%` : "Download everything"}</button></div><p>Download only the tracks you need. Removing a pack never removes progress or notes.</p><div className="pack-list">{tracks.map((track) => { const installed = packs.some((pack) => pack.packId === track.id); const pack = packById.get(track.id)!; return <div key={track.id}><span><strong>{track.title}</strong><small>~{pack.estimatedKb} KB · {pack.routes.length} routes · {pack.version}</small></span>{installed ? <button onClick={() => remove(track.id)}><Trash2 size={16} /> Remove</button> : <button onClick={() => install(track.id)} disabled={Boolean(working)}><HardDriveDownload size={16} /> {working === track.id ? `${progress}%` : "Download"}</button>}</div>; })}</div></section>
    <section className="settings-actions"><h2>Your study data</h2><p>Backups include progress, attempts, bookmarks, revision lists, notes, and installed-pack records.</p><button onClick={backup}><Download size={17} /> Export JSON backup</button><button onClick={() => inputRef.current?.click()}><Upload size={17} /> Import JSON backup</button><input ref={inputRef} type="file" accept="application/json" hidden onChange={(event) => restore(event.target.files?.[0])} /><button className="danger-action" onClick={async () => { if (window.confirm("Delete all local Interview Atlas study data?")) { await getDB().delete(); window.location.reload(); } }}><RotateCcw size={17} /> Reset local data</button></section>
    {message && <p className="settings-message" role="status"><Check size={16} /> {message}</p>}
  </div>;
}
