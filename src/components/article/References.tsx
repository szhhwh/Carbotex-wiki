import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { referenceByKey } from "../../data/references.generated.ts";
import { Collapse } from "../ui/Collapse";
import styles from "./references.module.css";

interface PageReferencesContextValue {
  /** Citation keys in order of first appearance on the current page. */
  keys: string[];
  register: (key: string) => void;
  referencesOpen: boolean;
  setReferencesOpen: (open: boolean) => void;
  revealReference: (targetId: string) => void;
}

const PageReferencesContext = createContext<PageReferencesContextValue | null>(
  null,
);

function focusReference(targetId: string) {
  let finished = false;
  let frame = 0;
  let stableFrames = 0;
  let lastLayout = "";

  const cleanup = () => {
    finished = true;
    cancelAnimationFrame(frame);
    clearTimeout(timeout);
    document.removeEventListener("wiki:opening-complete", focusWhenVisible);
  };

  const focusWhenVisible = () => {
    if (finished) return;
    cancelAnimationFrame(frame);
    const target = document.getElementById(targetId);

    // The opening screen keeps the route inert until its completion event.
    if (target?.closest("[inert]")) return;

    // The lazy route and Collapse can reveal the target after this request.
    if (!target || target.getClientRects().length === 0) {
      frame = requestAnimationFrame(focusWhenVisible);
      return;
    }

    target.focus({ preventScroll: true });
    if (document.activeElement !== target) {
      frame = requestAnimationFrame(focusWhenVisible);
      return;
    }

    // Opening References changes the document height for several frames.
    // Wait for the target's layout to settle before calculating scroll.
    const panel = target.closest<HTMLElement>('[role="region"]');
    const rect = target.getBoundingClientRect();
    const layout = [
      Math.round(rect.top),
      Math.round(rect.height),
      Math.round(panel?.getBoundingClientRect().height ?? 0),
      document.documentElement.scrollHeight,
    ].join(":");
    if (layout !== lastLayout) {
      lastLayout = layout;
      stableFrames = 0;
      frame = requestAnimationFrame(focusWhenVisible);
      return;
    }
    stableFrames += 1;
    if (stableFrames < 3) {
      frame = requestAnimationFrame(focusWhenVisible);
      return;
    }

    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
    cleanup();
  };

  const timeout = window.setTimeout(cleanup, 8000);
  document.addEventListener("wiki:opening-complete", focusWhenVisible);
  frame = requestAnimationFrame(focusWhenVisible);
  return cleanup;
}

/**
 * Wraps every routed page (done in App.tsx). `<Cite />` registers its keys
 * here as they render; `<References />` turns the collected keys into the
 * page's numbered reference list.
 */
export function ReferencesProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const cancelFocus = useRef<(() => void) | null>(null);
  const [keys, setKeys] = useState<string[]>([]);
  const [referencesOpen, setReferencesOpen] = useState(false);
  const register = useCallback((key: string) => {
    setKeys((previous) =>
      previous.includes(key) ? previous : [...previous, key],
    );
  }, []);
  const revealReference = useCallback((targetId: string, updateHash = true) => {
    setReferencesOpen(true);
    if (updateHash && window.location.hash !== `#${targetId}`) {
      window.history.pushState({ ...window.history.state }, "", `#${targetId}`);
    }
    cancelFocus.current?.();
    cancelFocus.current = focusReference(targetId);
  }, []);

  useEffect(() => () => cancelFocus.current?.(), [location.pathname]);

  const openFromHash = useCallback(
    (hash: string) => {
      if (hash === "#references") {
        setReferencesOpen(true);
        return;
      }
      const match = hash.match(/^#(ref-\d+)$/);
      if (match) revealReference(match[1], false);
    },
    [revealReference],
  );

  // Router fragment navigation does not emit a native hashchange event.
  useEffect(() => {
    openFromHash(location.hash);
  }, [location.hash, openFromHash]);

  // A citation link opened in a new tab, or a browser edit to the fragment,
  // still lands on a visible entry.
  useEffect(() => {
    const onHashChange = () => openFromHash(window.location.hash);
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!anchor || anchor.hasAttribute("download") || anchor.target) return;
      const url = new URL(anchor.href);
      if (
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash === "#references"
      ) {
        // Reopening from the same fragment does not change Router location.
        setReferencesOpen(true);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick, true);
    };
  }, [openFromHash]);

  const value = useMemo(
    () => ({
      keys,
      register,
      referencesOpen,
      setReferencesOpen,
      revealReference,
    }),
    [keys, register, referencesOpen, revealReference],
  );
  return (
    <PageReferencesContext.Provider value={value}>
      {children}
    </PageReferencesContext.Provider>
  );
}

/**
 * Seeds the page's citation numbering without rendering a visible marker.
 * Use this when a page has an explicit source list whose order differs from
 * the order in which the first in-text citations appear.
 */
export function ReferenceOrder({ keys }: { keys: string[] }) {
  const context = useContext(PageReferencesContext);

  useLayoutEffect(() => {
    keys.forEach((key) => context?.register(key));
  }, [context, keys]);

  return null;
}

/**
 * In-text citation, e.g. `<Cite k="jinek2012" />` for a single source or
 * `<Cite k={["doudna2014", "jinek2012"]} />` for several at once. Renders as
 * a superscript bracketed number — [1] for one source, [1,3,5-7] for several
 * (ascending, consecutive numbers collapsed into a range) — linking to the
 * matching entry of the page's `<References />` list. Keys are BibTeX keys
 * from src/data/references.bib.
 */
export function Cite({ k }: { k: string | string[] }) {
  const context = useContext(PageReferencesContext);
  const keys = Array.isArray(k) ? k : [k];

  // Runs before paint, so the numbering is settled before anything becomes
  // visible. Re-running is free: registration is idempotent.
  useLayoutEffect(() => {
    keys.forEach((key) => context?.register(key));
  });

  if (import.meta.env.DEV) {
    keys.forEach((key) => {
      if (!(key in referenceByKey)) {
        console.error(
          `[Cite] "${key}" is not in src/data/references.bib — add the entry.`,
        );
      }
    });
  }

  const numbers = keys.map((key) =>
    context ? context.keys.indexOf(key) + 1 : 0,
  );

  // Ascending order with consecutive runs collapsed: 1,3,5,6,7 -> [1,3,5-7].
  // Each group links to its first entry; "?" until numbers are assigned.
  const groups: Array<{ from: number; to: number }> = [];
  if (numbers.every((number) => number > 0)) {
    for (const number of [...numbers].sort((a, b) => a - b)) {
      const last = groups[groups.length - 1];
      if (last && number === last.to + 1) {
        last.to = number;
      } else {
        groups.push({ from: number, to: number });
      }
    }
  }

  const citation = (
    <sup className="cite-ref">
      {"["}
      {groups.length === 0 ? (
        <span>?</span>
      ) : (
        groups.map((group, index) => (
          <span key={group.from}>
            {index > 0 && ","}
            <a
              aria-label={`Reference ${
                group.from === group.to
                  ? group.from
                  : `${group.from}-${group.to}`
              }`}
              href={`#ref-${group.from}`}
              onClick={(event) => {
                if (
                  !context ||
                  event.button !== 0 ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                ) {
                  return;
                }

                event.preventDefault();
                const targetId = `ref-${group.from}`;
                context.revealReference(targetId);
              }}
            >
              {group.from === group.to
                ? group.from
                : `${group.from}-${group.to}`}
            </a>
          </span>
        ))
      )}
      {"]"}
    </sup>
  );

  return citation;
}

/**
 * The current page's reference list. ArticlePage places it at the bottom of
 * every page that opts into references. It shows only the sources cited on
 * that page, numbered by order of first citation, and renders nothing until
 * the page cites at least one source. The list is collapsed by default;
 * following an in-text citation opens it and focuses the matching entry.
 * The heading is fixed to "References" on every page; only the optional
 * introduction above the list is page-specific.
 */
export function References({ intro }: { intro?: ReactNode }) {
  const context = useContext(PageReferencesContext);
  const [localOpen, setLocalOpen] = useState(false);
  const keys = context?.keys ?? [];

  if (keys.length === 0) return null;

  const isOpen = context?.referencesOpen ?? localOpen;
  const setOpen = context?.setReferencesOpen ?? setLocalOpen;

  return (
    <Collapse
      header={
        <span className={styles.header}>
          <span className={styles.title}>References</span>
        </span>
      }
      open={isOpen}
      onToggle={setOpen}
      headerAs="h2"
      variant="plain"
      className={clsx(styles.panel, isOpen && styles.open)}
      headerClassName={styles.heading}
      contentClassName={styles.content}
      indicator={
        <span className={styles.indicatorFace}>
          <ChevronDown size={19} strokeWidth={2} />
        </span>
      }
    >
      <div className={styles.contentInner}>
        {intro ? <p className={styles.intro}>{intro}</p> : null}
        <ol className={clsx("references-list", styles.list)}>
          {keys.map((key, index) => {
            const entry = referenceByKey[key];
            return (
              <li
                key={key}
                id={`ref-${index + 1}`}
                tabIndex={-1}
                className={styles.entry}
              >
                <span className={styles.entryIndex}>
                  <span className={styles.srOnly}>Reference {index + 1}</span>
                  <span aria-hidden="true">[{index + 1}]</span>
                </span>
                {entry ? (
                  <div
                    className={styles.entryBody}
                    dangerouslySetInnerHTML={{ __html: entry.html }}
                  />
                ) : (
                  <div className={clsx(styles.entryBody, "text-danger")}>
                    Missing entry &ldquo;{key}&rdquo; — add it to
                    src/data/references.bib.
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </Collapse>
  );
}
