import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { CONTENT_MANIFEST_VERSION, edges, roles, topics, tracks } from "../src/data/catalog";
import { packDefinitions } from "../src/data/packs";

const output = new URL("../public/generated/", import.meta.url);
await mkdir(output, { recursive: true });

const writeJson = async (name: string, value: unknown) => writeFile(new URL(name, output), `${JSON.stringify(value, null, 2)}\n`);

await writeJson("content-manifest.json", { version: CONTENT_MANIFEST_VERSION, generatedAt: new Date().toISOString(), roles, tracks, topics });
await writeJson("graph-manifest.json", { version: CONTENT_MANIFEST_VERSION, edges });
await writeJson("search-index.json", topics.map(({ id, slug, title, summary, trackId, level, publicationStatus, roleIds }) => ({ id, slug, title, summary, trackId, level, publicationStatus, roleIds })));
await writeJson("pack-manifest.json", {
  version: CONTENT_MANIFEST_VERSION,
  packs: packDefinitions.map((pack) => ({
    ...pack,
    integrity: `sha256-${createHash("sha256").update(JSON.stringify(pack.routes)).digest("hex")}`
  }))
});
