import { publishedTopics, tracks } from "@/data/catalog";
import { technologies } from "@/data/technologies";
import { dsaProblems, dsaSheets } from "@/data/dsa";
import { companyGuides } from "@/data/companies";
import { rolePathRecords } from "@/data/learning";
import { withBasePath } from "@/lib/base-path";
import { CONTENT_PACK_CACHE } from "@/lib/offline";
import { OfflinePackSchema } from "@/lib/schema";

export const PACK_VERSION = "2026.09.18-r23";
const shellRoutes = ["/", "/atlas/", "/library/", "/sheets/", "/practice/", "/revision/", "/review/", "/diagnostic/", "/plan/", "/interview/", "/companies/", "/settings/"];
const technologyRoutes = technologies.map((item) => `/technologies/${item.id}/`);
const problemRoutes = dsaProblems.map((item) => `/problems/${item.id}/`);
const companyRoutes = companyGuides.map((item) => `/companies/${item.id}/`);
const topicRoutes = publishedTopics.map((item) => `/topics/${item.slug}/`);
const unique = (routes: string[]) => [...new Set(routes)];

const rawPacks = [
  ...tracks.map((track) => ({ id: `track-${track.id}`, kind: "track" as const, targetId: track.id, title: `${track.title} track`, routes: unique([...shellRoutes, `/tracks/${track.id}/`, ...publishedTopics.filter((topic) => topic.trackId === track.id).map((topic) => `/topics/${topic.slug}/`)]) })),
  ...[...new Set(technologies.map((item) => item.ecosystem))].map((ecosystem) => ({ id: `ecosystem-${ecosystem}`, kind: "ecosystem" as const, targetId: ecosystem, title: `${ecosystem.replace("-", " + ")} ecosystem`, routes: unique([...shellRoutes, ...technologies.filter((item) => item.ecosystem === ecosystem).map((item) => `/technologies/${item.id}/`)]) })),
  ...dsaSheets.map((sheet) => ({ id: `sheet-${sheet.id}`, kind: "sheet" as const, targetId: sheet.id, title: `${sheet.title} sheet`, routes: unique([...shellRoutes, `/sheets/${sheet.id}/`, ...sheet.problemIds.map((id) => `/problems/${id}/`)]) })),
  ...rolePathRecords.map((role) => ({ id: `role-${role.id}`, kind: "role" as const, targetId: role.id, title: `${role.title} role path`, routes: unique([...shellRoutes, ...role.technologyIds.map((id) => `/technologies/${id}/`), `/sheets/${role.sheetId}/`]) })),
  { id: "full-corpus", kind: "full" as const, targetId: "all", title: "Complete Interview Atlas", routes: unique([...shellRoutes, ...tracks.map((track) => `/tracks/${track.id}/`), ...topicRoutes, ...technologyRoutes, ...dsaSheets.map((sheet) => `/sheets/${sheet.id}/`), ...problemRoutes, ...companyRoutes]) }
];

export const packDefinitions = OfflinePackSchema.array().parse(rawPacks.map((pack) => ({ ...pack, version: PACK_VERSION, integrity: "generated-at-build", estimatedKb: 180 + pack.routes.length * 38 })));
export const packById = new Map(packDefinitions.map((pack) => [pack.id, pack]));
export const allPackRoutes = unique(packDefinitions.flatMap((pack) => pack.routes));

async function packIntegrity(routes: string[]) { const bytes = new TextEncoder().encode(JSON.stringify(routes)); const digest = await crypto.subtle.digest("SHA-256", bytes); return `sha256-${[...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`; }

export async function cachePack(packId: string, onProgress?: (done: number, total: number) => void) {
  const pack = packById.get(packId); if (!pack) throw new Error(`Unknown offline pack: ${packId}`); if (!("caches" in window)) throw new Error("This browser does not expose the Cache API.");
  if (navigator.storage?.estimate) { const estimate = await navigator.storage.estimate(); const remaining = (estimate.quota ?? Infinity) - (estimate.usage ?? 0); if (remaining < pack.estimatedKb * 1024 * 1.15) throw new Error(`Not enough browser storage. This pack needs about ${Math.ceil(pack.estimatedKb / 1024)} MB plus safety margin.`); }
  const cache = await caches.open(CONTENT_PACK_CACHE); let done = 0;
  for (const route of pack.routes) { const cacheRoute = withBasePath(route); const response = await fetch(cacheRoute, { cache: "reload" }); if (!response.ok) throw new Error(`Could not download ${route} (${response.status}).`); await cache.put(cacheRoute, response.clone()); done += 1; onProgress?.(done, pack.routes.length); }
  return { ...pack, integrity: await packIntegrity(pack.routes) };
}

export async function removeCachedPack(packId: string) { const pack = packById.get(packId); if (!pack || !("caches" in window)) return false; const cache = await caches.open(CONTENT_PACK_CACHE); const specificRoutes = pack.routes.filter((route) => !shellRoutes.includes(route)); const removed = await Promise.all(specificRoutes.map((route) => cache.delete(withBasePath(route)))); return removed.some(Boolean); }
