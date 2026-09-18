import type { Metadata, Viewport } from "next";
import "@fontsource-variable/atkinson-hyperlegible-next";
import "@fontsource-variable/jetbrains-mono";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import { AppHeader } from "@/components/app-header";
import { OwnerGate } from "@/components/owner-gate";

export const metadata: Metadata = {
  applicationName: "Interview Atlas",
  title: { default: "Interview Atlas", template: "%s · Interview Atlas" },
  description: "A self-contained field atlas for technical interview preparation.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Interview Atlas" },
  formatDetection: { telephone: false }
};

export const viewport: Viewport = { themeColor: "#f9fbfd", colorScheme: "light" };

const directionContract = `
<!--
THESIS: Interview knowledge is a traversable atlas, not a course dashboard; the map is the primary instrument and every action preserves context.
OWN-WORLD: Cool paper, deep ink, cobalt route lines, restrained teal and amber, calibrated rules, folded index flags, and compact field-note typography.
STORY: The learner sees the complete territory, traces prerequisites, selects a concept, and moves directly into study, practice, or revision.
FIRST VIEWPORT: A 17/56/27 index-map-inspector split under one command strip; Hash Tables is selected, its route is traced, and its three actions sit at the lower right.
FORM: Technical field atlas, user-pinned and retained over seed 3c6e11b2; map-dominant approved comp.
LIBRARY FORM: Stack Workbench; ecosystem index, layered technology plates, and a command/lesson inspector in the same field-manual world.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <template dangerouslySetInnerHTML={{ __html: directionContract }} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <OwnerGate><AppHeader />{children}</OwnerGate>
      </body>
    </html>
  );
}
