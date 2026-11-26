import { ArticlePage } from "../../components/article/ArticlePage";
import { protocolSections } from "./ProtocolsContent";

export function ProtocolsPage() {
  return (
    <ArticlePage
      title="Protocols"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/wet-header/header-protocols.avif",
        alt: "Illustration of a laboratory checklist, pipetting, and petri dishes.",
        intrinsicWidth: 4000,
        intrinsicHeight: 1334,
        backgroundColor: "#e7f2f4",
        objectFit: "contain",
      }}
      sections={protocolSections}
      stickyMobileOutline
      theme="hardware"
    />
  );
}
