"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, CheckCircle2, Search, Settings2, WifiOff } from "lucide-react";
import { topics } from "@/data/catalog";

export function AppHeader() {
  const [query, setQuery] = useState("");
  const [online, setOnline] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return topics.filter((topic) => `${topic.title} ${topic.summary} ${topic.trackId}`.toLowerCase().includes(normalized)).slice(0, 7);
  }, [query]);

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
        {results.length > 0 && (
          <div className="search-results" id="global-search-results" role="region" aria-label="Search results" aria-live="polite">
            {results.map((topic) => (
              topic.publicationStatus === "published" ? (
                <Link key={topic.id} href={`/topics/${topic.slug}/`} onClick={() => setQuery("")}>
                  <span>{topic.title}</span><small>{topic.trackId} · {topic.level}</small>
                </Link>
              ) : (
                <div className="search-result-planned" key={topic.id} aria-disabled="true">
                  <span>{topic.title}</span><small>{topic.trackId} · planned</small>
                </div>
              )
            ))}
          </div>
        )}
      </div>
      <nav className="header-actions" aria-label="Utility navigation">
        <span className={`network-state ${online ? "is-online" : "is-offline"}`}>
          {online ? <CheckCircle2 size={16} /> : <WifiOff size={16} />}
          <span>{online ? "Ready" : "Offline"}</span>
        </span>
        <Link href="/revision/">Revision</Link>
        <Link className="icon-link" href="/settings/" aria-label="Settings"><Settings2 size={18} /></Link>
      </nav>
    </header>
  );
}
