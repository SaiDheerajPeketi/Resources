import Link from "next/link";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return <main id="main-content" className="message-page"><WifiOff size={34} /><h1>This field note is not downloaded.</h1><p>The atlas shell is available, but this route is not in an installed offline pack.</p><Link className="primary-action inline-action" href="/settings/">Manage offline packs</Link></main>;
}
