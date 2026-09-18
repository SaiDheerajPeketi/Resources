import type { Metadata } from "next";
import { SettingsClient } from "@/components/settings-client";
export const metadata: Metadata = { title: "Settings and offline packs" };
export default function SettingsPage() { return <main id="main-content" className="tool-page"><header className="tool-page-title"><h1>Offline and data controls</h1><p>Install track packs, keep backups, and move your study history without an account.</p></header><SettingsClient /></main>; }
