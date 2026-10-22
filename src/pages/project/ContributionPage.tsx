import { ArticlePage } from "../../components/article/ArticlePage";
import { sections, intro } from "./ContributionContent";

export function ContributionPage() {
  return (
    <ArticlePage
      title="Contribution"
      intro={intro}
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/contribution.avif",
        alt: "Contribution illustration with team characters sharing a green gift above a globe.",
        intrinsicWidth: 1672,
        intrinsicHeight: 941,
      }}
      sections={sections}
    />
  );
}
