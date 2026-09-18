import type { Metadata } from "next";
import { StackWorkbench } from "@/components/stack-workbench";
export const metadata: Metadata = { title: "Technology library", description: "Languages, frameworks, databases, tools, and interview command cookbooks." };
export default function LibraryPage() { return <StackWorkbench />; }
