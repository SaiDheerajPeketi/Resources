import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { NetworkFirst, Serwist } from "serwist";
import { withBasePath } from "@/lib/base-path";
import { CONTENT_PACK_CACHE } from "@/lib/offline";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  disableDevLogs: true,
  runtimeCaching: [
    {
      matcher: ({ request }) => request.mode === "navigate",
      handler: new NetworkFirst({ cacheName: CONTENT_PACK_CACHE, networkTimeoutSeconds: 3 })
    },
    ...defaultCache
  ],
  fallbacks: {
    entries: [{ url: withBasePath("/~offline/"), matcher: ({ request }) => request.destination === "document" }]
  }
});

serwist.addEventListeners();
