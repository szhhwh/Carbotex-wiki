import { ArticlePage } from "../../components/article/ArticlePage";
import { sections } from "./PartsContent";

export function PartsPage() {
  return (
    <ArticlePage
      title="Parts"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/wet-header/header-parts-refined.avif",
        alt: "Illustration connecting genetic constructs, DNA, and a parts library.",
        intrinsicWidth: 4000,
        intrinsicHeight: 1334,
        backgroundColor: "#e7f2f4",
        objectFit: "contain",
      }}
      sections={sections}
      stickyMobileOutline={false}
    />
  );
}
