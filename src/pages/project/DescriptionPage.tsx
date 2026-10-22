import { ArticlePage } from "../../components/article/ArticlePage";
import { sections, referenceOrder } from "./DescriptionContent";

export function DescriptionPage() {
  return (
    <ArticlePage
      title="Description"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/description.webp",
        alt: "Smoke rising from a burning crop field.",
        intrinsicWidth: 3128,
        intrinsicHeight: 1700,
      }}
      sections={sections}
      references
      referenceOrder={referenceOrder}
      stickyMobileOutline
    />
  );
}
