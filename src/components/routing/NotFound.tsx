import { Link } from "react-router-dom";
import { ArticleHero } from "../article/ArticlePage";
import styles from "./page-load-state.module.css";

export function NotFound() {
  return (
    <main className={styles.notFoundPage} aria-label="Page not found">
      <ArticleHero title="Not Found" />
      <div className={`${styles.panel} ${styles.notFoundPanel}`}>
        <p className={styles.notFoundCode} aria-hidden="true">
          404
        </p>
        <div className={styles.notFoundBody}>
          <span className={styles.eyebrow}>END OF THE TRACK</span>
          <p className={styles.message}>
            This address may have moved. Continue from the Carbotex home page.
          </p>
          <Link to="/" className={styles.retry}>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
