import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

  return {
    name: "Interview Atlas",
    short_name: "Atlas",
    description: "A self-contained field atlas for technical interview preparation.",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#f9fbfd",
    theme_color: "#f9fbfd",
    orientation: "any",
    icons: [{ src: `${basePath}/icon.svg`, sizes: "any", type: "image/svg+xml", purpose: "any" }]
  };
}
