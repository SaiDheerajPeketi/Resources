import createMDX from "@next/mdx";
import withSerwistInit from "@serwist/next";
import remarkGfm from "remark-gfm";

const withMDX = createMDX({ extension: /\.mdx?$/, options: { remarkPlugins: [remarkGfm] } });
const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  register: true,
  reloadOnOnline: false,
  additionalPrecacheEntries: [
    { url: "/~offline/", revision: "interview-atlas-0.1.0" },
    { url: "/generated/content-manifest.json", revision: "content-2026.09.18-r7" },
    { url: "/generated/pack-manifest.json", revision: "packs-2026.09.18-r7" },
    { url: "/generated/completeness-report.json", revision: "audit-2026.09.18-r7" },
    { url: "/generated/content-freshness-report.json", revision: "freshness-2026.09.18-r7" }
  ]
});

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"]
};

export default withSerwist(withMDX(nextConfig));
