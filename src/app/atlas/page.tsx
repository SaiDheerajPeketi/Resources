import type { Metadata } from "next";
import { AtlasWorkspace } from "@/components/atlas-workspace";

export const metadata: Metadata = { title: "Atlas" };

export default function AtlasPage() {
  return <AtlasWorkspace />;
}
