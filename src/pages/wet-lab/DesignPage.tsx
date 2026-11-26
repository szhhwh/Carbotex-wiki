import { ArticlePage } from "../../components/article/ArticlePage";
import { sections } from "./DesignContent";

export function DesignPage() {
  return (
    <ArticlePage
      title="Design"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/wet-header/header-design.avif",
        alt: "Illustration of genetic design, cell engineering, and molecular building blocks.",
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
