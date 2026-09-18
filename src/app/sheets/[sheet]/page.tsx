import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SheetBrowser } from "@/components/sheet-browser";
import { dsaProblemById, dsaSheets } from "@/data/dsa";
export const dynamicParams = false;
export function generateStaticParams() { return dsaSheets.map((sheet) => ({ sheet: sheet.id })); }
export async function generateMetadata({ params }: { params: Promise<{ sheet: string }> }): Promise<Metadata> { const { sheet } = await params; return { title: dsaSheets.find((item) => item.id === sheet)?.title ?? "DSA sheet" }; }
export default async function SheetPage({ params }: { params: Promise<{ sheet: string }> }) { const { sheet } = await params; const item = dsaSheets.find((entry) => entry.id === sheet); if (!item) notFound(); const problems = item.problemIds.map((id) => dsaProblemById.get(id)).filter((problem) => problem !== undefined); return <main id="main-content" className="tool-page wide-tool-page"><header className="tool-page-title"><h1>{item.title}</h1><p>{item.summary}</p></header><SheetBrowser problems={problems} /></main>; }
