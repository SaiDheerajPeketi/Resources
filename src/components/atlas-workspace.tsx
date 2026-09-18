"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ReactFlow, Background, Controls, type Edge, type Node, MarkerType } from "@xyflow/react";
import { BookmarkPlus, BookOpen, Check, Circle, Clock3, Download, ListTree, Play, Route, SearchX } from "lucide-react";
import { edges, publishedTopics, topicById, topicsForTrack, tracks } from "@/data/catalog";
import { addRevisionItem, setProgress } from "@/lib/db";
import type { TopicMeta, TrackId } from "@/lib/schema";
import { TrackIcon } from "@/components/track-icon";

const positionFor = (index: number) => ({
  x: 20 + (index % 3) * 225,
  y: 25 + Math.floor(index / 3) * 118
});

function createGraph(trackId: TrackId, selectedId: string) {
  const trackTopics = topicsForTrack(trackId);
  const ids = new Set(trackTopics.map((topic) => topic.id));
  const graphNodes: Node[] = trackTopics.map((topic, index) => ({
    id: topic.id,
    position: positionFor(index),
    data: { label: topic.title },
    className: `atlas-node ${topic.id === selectedId ? "is-selected" : ""} ${topic.publicationStatus === "planned" ? "is-planned" : "is-published"}`,
    style: { width: 190 }
  }));
  const graphEdges: Edge[] = edges.filter((edge) => ids.has(edge.source) && ids.has(edge.target)).map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: "smoothstep",
    animated: edge.target === selectedId || edge.source === selectedId,
    className: edge.target === selectedId || edge.source === selectedId ? "is-selected-edge" : "",
    markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 }
  }));
  return { trackTopics, graphNodes, graphEdges };
}

export function AtlasWorkspace({ initialTrack = "foundations" }: { initialTrack?: TrackId }) {
  const [trackId, setTrackId] = useState<TrackId>(initialTrack);
  const defaultTopic = publishedTopics.find((topic) => topic.trackId === initialTrack) ?? topicsForTrack(initialTrack)[0];
  const [selectedId, setSelectedId] = useState(defaultTopic.id);
  const [notice, setNotice] = useState("");
  const selected = topicById.get(selectedId) ?? defaultTopic;
  const graph = useMemo(() => createGraph(trackId, selectedId), [trackId, selectedId]);
  const currentTrack = tracks.find((track) => track.id === trackId)!;

  const changeTrack = (next: TrackId) => {
    setTrackId(next);
    const nextTopic = publishedTopics.find((topic) => topic.trackId === next) ?? topicsForTrack(next)[0];
    setSelectedId(nextTopic.id);
    setNotice("");
  };

  const prereqs = selected.prerequisites.map((id) => topicById.get(id)).filter(Boolean) as TopicMeta[];
  const nextTopics = edges.filter((edge) => edge.source === selected.id).map((edge) => topicById.get(edge.target)).filter(Boolean) as TopicMeta[];

  return (
    <main id="main-content" className="atlas-shell">
      <aside className="track-rail" aria-label="Interview tracks">
        <p className="rail-label">Tracks</p>
        <div className="track-tabs">
          {tracks.map((track) => (
            <button key={track.id} className={track.id === trackId ? "is-active" : ""} onClick={() => changeTrack(track.id)}>
              <TrackIcon trackId={track.id} size={23} />
              <span><strong>{track.shortTitle}</strong><small>{topicsForTrack(track.id).length} mapped topics</small></span>
            </button>
          ))}
        </div>
        <nav className="rail-secondary" aria-label="Study tools">
          <Link href="/practice/"><Play size={18} /> Practice sets</Link>
          <Link href="/revision/"><BookmarkPlus size={18} /> Revision lists</Link>
          <Link href="/interview/"><Route size={18} /> Interview loops</Link>
          <Link href="/settings/"><Download size={18} /> Offline packs</Link>
        </nav>
      </aside>

      <section className="map-pane" aria-labelledby="atlas-map-heading">
        <div className="map-heading">
          <div>
            <h1 id="atlas-map-heading">{currentTrack.title}</h1>
            <p>{currentTrack.description}</p>
          </div>
          <div className="map-legend" aria-label="Topic status legend">
            <span><i className="legend selected" /> Selected</span>
            <span><i className="legend published" /> Published</span>
            <span><i className="legend planned" /> Planned</span>
          </div>
        </div>
        <div className="graph-wrap" aria-label={`${currentTrack.title} prerequisite map`}>
          <ReactFlow
            nodes={graph.graphNodes}
            edges={graph.graphEdges}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable
            fitView
            fitViewOptions={{ padding: 0.18 }}
            minZoom={0.55}
            maxZoom={1.4}
            onNodeClick={(_, node) => { setSelectedId(node.id); setNotice(""); }}
          >
            <Background color="#cad5e3" gap={24} size={1} />
            <Controls showInteractive={false} position="bottom-left" />
          </ReactFlow>
        </div>
        <div className="mobile-topic-outline">
          <div className="outline-heading"><ListTree size={18} /><strong>Semantic topic outline</strong></div>
          {graph.trackTopics.map((topic) => (
            <button key={topic.id} className={topic.id === selected.id ? "is-selected" : ""} onClick={() => setSelectedId(topic.id)}>
              {topic.publicationStatus === "published" ? <Check size={16} /> : <Circle size={16} />}
              <span>{topic.title}<small>{topic.level} · {topic.publicationStatus}</small></span>
            </button>
          ))}
        </div>
        <div className="map-footer"><span>{graph.trackTopics.length} mapped topics</span><span>{graph.graphEdges.length} dependency links</span></div>
      </section>

      <aside className="topic-inspector" aria-live="polite">
        <div className="inspector-meta"><span>{currentTrack.shortTitle}</span><span><Clock3 size={14} /> {selected.durationMinutes} min</span></div>
        <h2>{selected.title}</h2>
        <div className="inspector-tags"><span>{selected.level}</span><span className={selected.publicationStatus}>{selected.publicationStatus}</span></div>
        <p className="inspector-summary">{selected.summary}</p>

        <section>
          <h3>Why it matters</h3>
          <p>{selected.outcomes[0] ?? "This topic is part of the published destination manifest and will receive a complete field note in its specialist release."}</p>
        </section>
        <section>
          <h3>Prerequisites</h3>
          {prereqs.length ? prereqs.map((topic) => <button className="dependency-row" key={topic.id} onClick={() => { setTrackId(topic.trackId); setSelectedId(topic.id); }}><i /> <span>{topic.title}<small>{topic.summary}</small></span></button>) : <p className="empty-state">No prerequisites recorded.</p>}
        </section>
        {nextTopics.length > 0 && <section><h3>Used next in</h3>{nextTopics.slice(0, 3).map((topic) => <button className="dependency-row muted" key={topic.id} onClick={() => { setTrackId(topic.trackId); setSelectedId(topic.id); }}><i /> <span>{topic.title}<small>{topic.level}</small></span></button>)}</section>}

        <div className="inspector-actions">
          {selected.publicationStatus === "published" ? (
            <Link className="primary-action" href={`/topics/${selected.slug}/`} onClick={() => void setProgress(selected.id, "reading")}><BookOpen size={18} /> Open field note</Link>
          ) : (
            <button className="primary-action" disabled><SearchX size={18} /> Field note planned</button>
          )}
          <Link href={`/practice/?topic=${encodeURIComponent(selected.id)}`}><Play size={18} /> Practice questions</Link>
          <button onClick={async () => { await addRevisionItem(selected.id); setNotice("Added to Current revision."); }}><BookmarkPlus size={18} /> Add to revision</button>
        </div>
        {notice && <p className="action-notice" role="status">{notice}</p>}
      </aside>
    </main>
  );
}
