"use client";

import { useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Check, Download, HardDriveDownload, RotateCcw, Trash2, Upload } from "lucide-react";
import { cachePack, packDefinitions, removeCachedPack } from "@/data/packs";
import { exportStudyData, getDB, importStudyData } from "@/lib/db";

function saveFile(name: string, content: string) { const url = URL.createObjectURL(new Blob([content], { type: "application/json" })); const anchor = document.createElement("a"); anchor.href = url; anchor.download = name; anchor.click(); URL.revokeObjectURL(url); }

export function SettingsClient() {
  const packs = useLiveQuery(() => getDB().installedPacks.toArray(), [], []);
  const [working, setWorking] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const install = async (packId: string) => {
    setWorking(packId); setProgress(0); setMessage("");
    try {
      const pack = await cachePack(packId, (done, total) => setProgress(Math.round(done / total * 100)));
      await getDB().installedPacks.put({ packId, version: pack.version, integrity: pack.integrity, installedAt: new Date().toISOString() });
      setMessage(`${pack.title} is available offline.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Offline download failed."); }
    finally { setWorking(""); }
  };
  const installAll = async () => {
    setWorking("all"); setProgress(0); setMessage("");
    try {
      const pack = await cachePack("full-corpus", (done, total) => setProgress(Math.round(done / total * 100)));
      await getDB().installedPacks.put({ packId: pack.id, version: pack.version, integrity: pack.integrity, installedAt: new Date().toISOString() });
      setMessage("The complete published corpus is available offline.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Offline download failed."); }
    finally { setWorking(""); }
  };
  const remove = async (packId: string) => { await removeCachedPack(packId); await getDB().installedPacks.delete(packId); setMessage("Offline pack removed; study progress was preserved."); };
  const backup = async () => saveFile(`interview-atlas-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(await exportStudyData(), null, 2));
  const restore = async (file?: File) => {
    if (!file) return;
    try { const result = await importStudyData(JSON.parse(await file.text())); const orphanCount = result.orphanedTopicIds.length + result.orphanedContentIds.length; setMessage(orphanCount ? `Imported with ${orphanCount} orphaned content IDs preserved.` : "Backup imported successfully."); }
    catch (error) { setMessage(error instanceof Error ? `Import rejected: ${error.message}` : "Import rejected."); }
    if (inputRef.current) inputRef.current.value = "";
  };

  return <div className="settings-grid">
    <section><div className="section-bar"><h2>Offline content packs</h2><button onClick={installAll} disabled={Boolean(working) || packs.some((pack) => pack.packId === "full-corpus")}><HardDriveDownload size={16} /> {working === "all" ? `${progress}%` : "Download everything"}</button></div><p>Choose track, ecosystem, DSA-sheet, role, or full-library packs. Storage is checked before download; removing a pack preserves study data.</p>{["track", "ecosystem", "sheet", "role", "full"].map((kind) => <div key={kind} className="pack-group"><h3>{kind} packs</h3><div className="pack-list">{packDefinitions.filter((pack) => pack.kind === kind).map((pack) => { const installed = packs.some((item) => item.packId === pack.id); return <div key={pack.id}><span><strong>{pack.title}</strong><small>~{Math.ceil(pack.estimatedKb / 1024)} MB · {pack.routes.length} routes · {pack.version}</small></span>{installed ? <button onClick={() => remove(pack.id)}><Trash2 size={16} /> Remove</button> : <button onClick={() => install(pack.id)} disabled={Boolean(working)}><HardDriveDownload size={16} /> {working === pack.id ? `${progress}%` : "Download"}</button>}</div>; })}</div></div>)}</section>
    <section className="settings-actions"><h2>Your study data</h2><p>Schema-v2 backups include topic, technology and problem progress; attempts, bookmarks, lists, notes, diagnostics, plans, review state, and pack records. Schema-v1 imports remain supported.</p><button onClick={backup}><Download size={17} /> Export JSON backup</button><button onClick={() => inputRef.current?.click()}><Upload size={17} /> Import JSON backup</button><input ref={inputRef} type="file" accept="application/json" hidden onChange={(event) => restore(event.target.files?.[0])} /><button className="danger-action" onClick={async () => { if (window.confirm("Delete all local Interview Atlas study data?")) { await getDB().delete(); window.location.reload(); } }}><RotateCcw size={17} /> Reset local data</button><p><strong>Owner gate:</strong> configure the Pages build salt and PBKDF2 digest to enable the optional session gate. It is a convenience barrier, not protection for public repository files.</p></section>
    {message && <p className="settings-message" role="status"><Check size={16} /> {message}</p>}
  </div>;
}
