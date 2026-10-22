import { ArticlePage } from "../../components/article/ArticlePage";
import { TraceCycleProvider } from "../../components/human-practices/TraceCycle";
import { sections } from "./HumanPracticesContent";
import styles from "./human-practices.module.css";

export function HumanPracticesPage() {
  return (
    <div className={styles.page}>
      <TraceCycleProvider>
        <ArticlePage
          title="Integrated Human Practices"
          heroImage={{
            src: "https://static.igem.wiki/teams/6147/wiki/igem-collage-1.webp",
            alt: "Collage of OUC-Haide team members during stakeholder meetings, laboratory work, and iGEM presentations.",
            intrinsicWidth: 1706,
            intrinsicHeight: 1279,
          }}
          sections={sections}
          references
          referencesAnchorId="section-6"
          stickyMobileOutline
        />
      </TraceCycleProvider>
    </div>
  );
}
