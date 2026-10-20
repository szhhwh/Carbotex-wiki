import { Component, type ReactNode } from "react";
import styles from "./page-load-state.module.css";

interface BoundaryProps {
  title: string;
  children: ReactNode;
}

interface BoundaryState {
  hasError: boolean;
}

const routePanel = `${styles.panel} ${styles.routePanel}`;

export function PageLoading() {
  return <main className={routePanel} aria-busy="true" />;
}

export class PageLoadBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      const { title } = this.props;
      return (
        <main className={routePanel} data-route-error role="alert">
          <span className={styles.eyebrow}>OUC-HAIDE / WIKI</span>
          <h1 className={styles.errorTitle}>Couldn’t open {title}</h1>
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
