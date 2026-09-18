import createMDX from "@next/mdx";
import withSerwistInit from "@serwist/next";
import remarkGfm from "remark-gfm";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const withMDX = createMDX({ extension: /\.mdx?$/, options: { remarkPlugins: [remarkGfm] } });
const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  register: true,
  reloadOnOnline: false,
  additionalPrecacheEntries: [
    { url: `${basePath}/~offline/`, revision: "interview-atlas-0.1.0" },
    { url: `${basePath}/generated/content-manifest.json`, revision: "content-2026.09.18-r13" },
    { url: `${basePath}/generated/pack-manifest.json`, revision: "packs-2026.09.18-r13" },
    { url: `${basePath}/generated/completeness-report.json`, revision: "audit-2026.09.18-r13" },
    { url: `${basePath}/generated/content-freshness-report.json`, revision: "freshness-2026.09.18-r13" }
  ]
});

const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"]
};

export default withSerwist(withMDX(nextConfig));
