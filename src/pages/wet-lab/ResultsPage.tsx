import { ArticlePage } from "../../components/article/ArticlePage";
import { sections } from "./ResultsContent";

export function ResultsPage() {
  return (
    <ArticlePage
      title="Results — PMA production and PMA–DA bioadhesive"
      titleId="results-page-title"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/wet-header/header-results.avif",
        alt: "Illustration of chromatograms, bar charts, and gel electrophoresis results.",
        intrinsicWidth: 4000,
        intrinsicHeight: 1334,
        backgroundColor: "#e7f2f4",
        objectFit: "contain",
      }}
      sections={sections}
      references
      referencesIntro={
        <>
          Reference entries cited on this page are stored in the accompanying{" "}
          <code>references.bib</code>; the website generates the reference list
          automatically from the citation keys.
        </>
      }
      stickyMobileOutline
    />
  );
}
