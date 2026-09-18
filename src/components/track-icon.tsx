import { BrainCircuit, Braces, CloudCog, Landmark, Network, ShieldCheck } from "lucide-react";
import type { TrackId } from "@/lib/schema";

const icons = {
  foundations: Network,
  "ai-data": BrainCircuit,
  "sde-systems": Braces,
  "devops-cloud": CloudCog,
  cybersecurity: ShieldCheck,
  "fintech-quant": Landmark
};

export function TrackIcon({ trackId, size = 20 }: { trackId: TrackId; size?: number }) {
  const Icon = icons[trackId];
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}
