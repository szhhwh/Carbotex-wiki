import { Component, type ReactNode } from "react";
import type { PageLayout } from "../../pages";
import styles from "./page-load-state.module.css";

interface PageStateProps {
  title: string;
  layout?: PageLayout;
}

interface BoundaryProps extends PageStateProps {
  children: ReactNode;
}

interface BoundaryState {
  hasError: boolean;
}

export function PageLoading({ title, layout = "default" }: PageStateProps) {
  return (
    <main
      className={styles.panel}
      data-layout={layout}
      role="status"
      aria-live="polite"
    >
      <span className={styles.eyebrow}>OUC-HAIDE / WIKI</span>
      <p className={styles.message}>Opening {title}…</p>
      <span className={styles.progress} aria-hidden="true" />
    </main>
  );
}

export class PageLoadBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      const { title, layout = "default" } = this.props;
      const Heading = layout === "default" ? "h2" : "h1";
      return (
        <main className={styles.panel} data-layout={layout} role="alert">
          <span className={styles.eyebrow}>OUC-HAIDE / WIKI</span>
          <Heading className={styles.errorTitle}>Couldn’t open {title}</Heading>
          <p className={styles.message}>
            Please reload this page to try again.
          </p>
          <button
            type="button"
            className={styles.retry}
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
