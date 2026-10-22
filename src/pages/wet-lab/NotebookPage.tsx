import { ArticlePage } from "../../components/article/ArticlePage";
import { sections } from "./NotebookContent";

export function NotebookPage() {
  return (
    <ArticlePage
      title="Wet Lab Notebook"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/wet-header/header-notebook.avif",
        alt: "Illustration of a calendar, laboratory notebook, and sample storage boxes.",
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
