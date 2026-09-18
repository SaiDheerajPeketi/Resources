"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookOpen, CheckCircle2, Library, Map as MapIcon, Search, Settings2, WifiOff } from "lucide-react";
import { BASE_PATH, withBasePath } from "@/lib/base-path";

type SearchResult = { url: string; title: string; excerpt: string; meta: Record<string, string> };
type PagefindModule = { init: () => Promise<void>; search: (query: string) => Promise<{ results: Array<{ data: () => Promise<SearchResult> }> }> };

export function AppHeader() {
  const [query, setQuery] = useState("");
  const [online, setOnline] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setOnline(navigator.onLine);
    const update = () => setOnline(navigator.onLine);
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape") setQuery("");
    };
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    window.addEventListener("keydown", shortcut);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
      window.removeEventListener("keydown", shortcut);
    };
  }, []);

  useEffect(() => {
    const normalized = query.trim();
    if (!normalized) { setResults([]); return; }
    const timer = window.setTimeout(async () => {
      setSearching(true);
      try {
        const pagefind = await import(/* webpackIgnore: true */ withBasePath("/pagefind/pagefind.js")) as PagefindModule;
        await pagefind.init();
        const response = await pagefind.search(normalized);
        setResults(await Promise.all(response.results.slice(0, 8).map((result) => result.data())));
      } catch { setResults([]); }
      finally { setSearching(false); }
    }, 160);
    return () => window.clearTimeout(timer);
  }, [query]);

  return (
    <header className="app-header">
      <Link className="wordmark" href="/atlas/" aria-label="Interview Atlas home">
        <span className="wordmark-mark" aria-hidden="true"><BookOpen size={19} /></span>
        <span><strong>Interview Atlas</strong><small>Technical interviews. Mapped.</small></span>
      </Link>
      <div className="command-search">
        <Search size={18} aria-hidden="true" />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topics, roles, or concepts"
          aria-label="Search the interview atlas"
        />
        <kbd>⌘ K</kbd>
        {(results.length > 0 || (query && searching)) && (
          <div className="search-results" id="global-search-results" role="region" aria-label="Search results" aria-live="polite">
            {searching && <div className="search-result-planned"><span>Searching the full library…</span></div>}
            {results.map((result) => <Link key={result.url} href={BASE_PATH && result.url.startsWith(BASE_PATH) ? result.url.slice(BASE_PATH.length) : result.url} onClick={() => setQuery("")}><span>{result.meta.title || result.title}</span><small dangerouslySetInnerHTML={{ __html: result.excerpt }} /></Link>)}
          </div>
        )}
      </div>
      <nav className="header-actions" aria-label="Utility navigation">
        <span className={`network-state ${online ? "is-online" : "is-offline"}`}>
          {online ? <CheckCircle2 size={16} /> : <WifiOff size={16} />}
          <span>{online ? "Ready" : "Offline"}</span>
        </span>
        <Link className="tracks-nav" href="/atlas/" aria-label="Role tracks"><MapIcon size={16} /><span>Tracks</span></Link>
        <Link href="/library/"><Library size={16} /> Library</Link>
        <Link href="/sheets/">DSA</Link>
        <Link href="/review/">Review</Link>
        <Link className="icon-link" href="/settings/" aria-label="Settings"><Settings2 size={18} /></Link>
      </nav>
    </header>
  );
}
