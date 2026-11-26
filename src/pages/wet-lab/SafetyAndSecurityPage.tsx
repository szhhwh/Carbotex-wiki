import { ArticlePage } from "../../components/article/ArticlePage";
import { sections } from "./SafetyAndSecurityContent";

export function SafetyAndSecurityPage() {
  return (
    <ArticlePage
      title="Safety"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/wet-header/header-safety.avif",
        alt: "Illustration of a safety shield, laboratory workstation, and protective equipment.",
        intrinsicWidth: 4000,
        intrinsicHeight: 1334,
        backgroundColor: "#e7f2f4",
        objectFit: "contain",
      }}
      sections={sections}
      references
      stickyMobileOutline
    />
  );
}
