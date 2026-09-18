"use client";
import { useEffect, useState } from "react";
import { LockKeyhole, ShieldAlert } from "lucide-react";

const salt = process.env.NEXT_PUBLIC_ATLAS_GATE_SALT ?? "";
const expectedDigest = process.env.NEXT_PUBLIC_ATLAS_GATE_DIGEST ?? "";
const iterations = 210_000;
const encoder = new TextEncoder();
const toHex = (bytes: ArrayBuffer) => [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");

export async function deriveGateDigest(passphrase: string, gateSalt: string) {
  const material = await crypto.subtle.importKey("raw", encoder.encode(passphrase), "PBKDF2", false, ["deriveBits"]);
  return toHex(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: encoder.encode(gateSalt), iterations }, material, 256));
}

export function OwnerGate({ children }: { children: React.ReactNode }) {
  const enabled = Boolean(salt && expectedDigest);
  const [unlocked, setUnlocked] = useState(!enabled);
  const [passphrase, setPassphrase] = useState("");
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => { if (enabled && sessionStorage.getItem("atlas-owner-unlocked") === "1") setUnlocked(true); const until = Number(localStorage.getItem("atlas-gate-cooldown") ?? 0); if (until > Date.now()) setCooldown(until); }, [enabled]);
  useEffect(() => { if (!cooldown) return; const timer = window.setInterval(() => { if (cooldown <= Date.now()) { setCooldown(0); localStorage.removeItem("atlas-gate-cooldown"); } }, 500); return () => window.clearInterval(timer); }, [cooldown]);
  if (!enabled) return children;
  if (unlocked) return <>{children}<button className="manual-lock" onClick={() => { sessionStorage.removeItem("atlas-owner-unlocked"); setUnlocked(false); }}><LockKeyhole size={15} /> Lock</button></>;
  const remaining = Math.max(0, Math.ceil((cooldown - Date.now()) / 1000));
  async function unlock(event: React.FormEvent) { event.preventDefault(); if (remaining) return; const digest = await deriveGateDigest(passphrase, salt); if (digest === expectedDigest) { sessionStorage.setItem("atlas-owner-unlocked", "1"); localStorage.removeItem("atlas-gate-failures"); setUnlocked(true); setMessage(""); return; } const failures = Number(localStorage.getItem("atlas-gate-failures") ?? 0) + 1; localStorage.setItem("atlas-gate-failures", String(failures)); if (failures >= 5) { const until = Date.now() + Math.min(300_000, 30_000 * Math.floor(failures / 5)); localStorage.setItem("atlas-gate-cooldown", String(until)); setCooldown(until); } setMessage("That passphrase did not match. Check it and try again."); }
  return <main className="gate-page"><form onSubmit={unlock}><LockKeyhole size={28} /><h1>Interview Atlas is locked</h1><p>This is a casual owner gate. GitHub Pages files remain public and the gate is not secure access control.</p><label>Owner passphrase<input autoFocus type="password" value={passphrase} onChange={(event) => setPassphrase(event.target.value)} disabled={Boolean(remaining)} /></label><button className="primary-action" disabled={Boolean(remaining) || !passphrase}>{remaining ? `Try again in ${remaining}s` : "Unlock this session"}</button>{message && <p className="gate-error"><ShieldAlert size={16} /> {message}</p>}</form></main>;
}
