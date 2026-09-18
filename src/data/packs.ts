import { publishedTopics, tracks } from "@/data/catalog";
import { CONTENT_PACK_CACHE } from "@/lib/offline";
import type { TrackId } from "@/lib/schema";

export const PACK_VERSION = "2026.09.18-r1";

export const packDefinitions = tracks.map((track) => ({
  id: track.id,
  title: `${track.title} offline pack`,
  version: PACK_VERSION,
  routes: [
    "/",
    "/atlas/",
    `/tracks/${track.id}/`,
    "/practice/",
    "/revision/",
    "/interview/",
    "/settings/",
    ...publishedTopics.filter((topic) => topic.trackId === track.id).map((topic) => `/topics/${topic.slug}/`)
  ],
  estimatedKb: 180 + publishedTopics.filter((topic) => topic.trackId === track.id).length * 72
}));

export const packById = new Map(packDefinitions.map((pack) => [pack.id, pack]));

export const allPackRoutes = [...new Set(packDefinitions.flatMap((pack) => pack.routes))];

async function packIntegrity(routes: string[]) {
  const bytes = new TextEncoder().encode(JSON.stringify(routes));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return `sha256-${[...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

export async function cachePack(trackId: TrackId, onProgress?: (done: number, total: number) => void) {
  const pack = packById.get(trackId);
  if (!pack) throw new Error(`Unknown offline pack: ${trackId}`);
  if (!("caches" in window)) throw new Error("This browser does not expose the Cache API.");

  const cache = await caches.open(CONTENT_PACK_CACHE);
  let done = 0;
  for (const route of pack.routes) {
    const response = await fetch(route, { cache: "reload" });
    if (!response.ok) throw new Error(`Could not download ${route} (${response.status}).`);
    await cache.put(route, response.clone());
    done += 1;
    onProgress?.(done, pack.routes.length);
  }
  return { ...pack, integrity: await packIntegrity(pack.routes) };
}

export async function removeCachedPack(trackId: TrackId) {
  const pack = packById.get(trackId);
  if (!pack || !("caches" in window)) return false;
  const cache = await caches.open(CONTENT_PACK_CACHE);
  const trackRoutes = pack.routes.filter((route) => route === `/tracks/${trackId}/` || route.startsWith(`/topics/${trackId}/`));
  const removed = await Promise.all(trackRoutes.map((route) => cache.delete(route)));
  return removed.some(Boolean);
}
