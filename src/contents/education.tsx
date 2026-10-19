import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { ActivityViewer } from "../components/activities/ActivityViewer";
import { ACTIVITIES } from "./activityCatalog";
import styles from "./education.module.css";

function ActivityIndex() {
  return (
    <main className={styles.page}>
      <h1 className={styles.srOnly}>Education activities</h1>
      <section className={styles.deck} aria-label="Interactive activities">
        <ul className={styles.deckList}>
          {ACTIVITIES.map((activity, index) => (
            <li
              className={styles.deckItem}
              key={activity.id}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <Link
                aria-label={`Open ${activity.title}. ${activity.summary}`}
                className={styles.card}
                data-activity={activity.id}
                to={`/education?activity=${activity.id}`}
              >
                <div className={styles.cardBody}>
                  <h2>{activity.title}</h2>
                  <div className={styles.cardDetails}>
                    <p className={styles.cardSummary}>{activity.summary}</p>
                    <span className={styles.cardMeta}>{activity.detail}</span>
                    <span className={styles.cardAction}>
                      Open activity
                      <ArrowUpRight aria-hidden="true" strokeWidth={1.8} />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export function Education() {
  const [searchParams] = useSearchParams();
  const selected = ACTIVITIES.find(
    (activity) => activity.id === searchParams.get("activity"),
  );

  useEffect(() => {
    if (selected) window.scrollTo(0, 0);
  }, [selected]);

  if (selected) {
    return <ActivityViewer activity={selected} key={selected.id} />;
  }

  return <ActivityIndex />;
}
