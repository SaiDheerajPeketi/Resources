import type { Metadata } from "next";
import Link from "next/link";
import { dsaSheets } from "@/data/dsa";
import { crosswalkSources } from "@/data/crosswalks";
export const metadata: Metadata = { title: "DSA sheets" };
export default function SheetsPage() { return <main id="main-content" className="tool-page"><header className="tool-page-title"><h1>DSA sheets</h1><p>One nested progression. Progress on Atlas 75 carries into 180 and 300.</p></header><div className="sheet-ledger">{dsaSheets.map((sheet) => <Link key={sheet.id} href={`/sheets/${sheet.id}/`}><span>{sheet.problemIds.length} problems</span><h2>{sheet.title}</h2><p>{sheet.summary}</p><strong>Open sheet →</strong></Link>)}</div><section className="crosswalk-field"><h2>Coverage crosswalks</h2><p>Use these only to compare topic coverage. Atlas prompts and artifacts are original; external statements are not reproduced.</p><div>{crosswalkSources.map((source) => <a key={source.id} href={source.url}>{source.label}<span>External topic map ↗</span></a>)}</div></section></main>; }
