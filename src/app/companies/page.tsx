import type { Metadata } from "next";
import Link from "next/link";
import { companyGuides } from "@/data/companies";
export const metadata: Metadata = { title: "Company preparation guides" };
export default function CompaniesPage() { const groups = Map.groupBy(companyGuides, (guide) => guide.archetype); return <main id="main-content" className="tool-page wide-tool-page" data-pagefind-body><header className="tool-page-title"><h1>Company preparation guides</h1><p>Date-stamped maps from public information only. Verify the current loop with your recruiter; no proprietary question dumps are included.</p></header><div className="company-directory">{[...groups].map(([archetype, guides]) => <section key={archetype}><h2>{archetype.replaceAll("-", " ")}</h2><div>{guides.map((guide) => <Link key={guide.id} href={`/companies/${guide.id}/`}><strong>{guide.name}</strong><span>{guide.roleFocus[0]}</span><small>reviewed {guide.lastReviewed}</small></Link>)}</div></section>)}</div></main>; }
