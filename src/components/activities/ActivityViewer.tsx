import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { ActivityDefinition } from "../../data/activity-catalog.data";
import styles from "./activity-viewer.module.css";

interface ActivityViewerProps {
  activity: ActivityDefinition;
}

export function ActivityViewer({ activity }: ActivityViewerProps) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  // The embedded entry hides the title it would otherwise repeat from this
  // header; the standalone window keeps the full page.
  const embedSource = `${activity.source}${activity.source.includes("?") ? "&" : "?"}embed=1`;

  return (
    <main className={styles.viewer}>
      <header className={styles.header}>
        <div className={styles.heading}>
          <Link to="/education#activities" className={styles.back}>
            All activities
          </Link>
          <div>
            <h1>{activity.title}</h1>
          </div>
        </div>
        <div className={styles.actions}>
          <a href={activity.source} target="_blank" rel="noopener noreferrer">
            Standalone window
          </a>
          <button
            type="button"
            onClick={() => {
              setLoaded(false);
              setFailed(false);
              setAttempt((value) => value + 1);
            }}
          >
            Reload
          </button>
        </div>
      </header>

      <div className={styles.frame} data-ready={loaded}>
        {!loaded && !failed && <p role="status">Loading activity…</p>}
        {failed && (
          <p role="alert">
            The activity did not load. Reload it here or open the standalone
            window.
          </p>
        )}
        <iframe
          key={attempt}
          ref={frame}
          src={embedSource}
          title={activity.title}
          onLoad={() => {
            const document = frame.current?.contentDocument;
            const ready = Boolean(
              document?.querySelector(activity.readySelector),
            );
            setLoaded(ready);
            setFailed(!ready);
          }}
          onError={() => setFailed(true)}
          allow="fullscreen"
        />
      </div>
    </main>
  );
}
