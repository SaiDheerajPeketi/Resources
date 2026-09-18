"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
export function CommandCopy({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  return <button className="copy-command" onClick={async () => { await navigator.clipboard.writeText(command); setCopied(true); window.setTimeout(() => setCopied(false), 1400); }} aria-label={`Copy command: ${command}`}>{copied ? <Check size={15} /> : <Copy size={15} />}<span>{copied ? "Copied" : "Copy"}</span></button>;
}
