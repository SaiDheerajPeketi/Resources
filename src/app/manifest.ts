import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Interview Atlas",
    short_name: "Atlas",
    description: "A self-contained field atlas for technical interview preparation.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fbfd",
    theme_color: "#f9fbfd",
    orientation: "any",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }]
  };
}
