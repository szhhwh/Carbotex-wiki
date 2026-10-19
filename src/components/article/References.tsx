import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { referenceByKey } from "../../data/references.generated.ts";

interface PageReferencesContextValue {
  /** Citation keys in order of first appearance on the current page. */
  keys: string[];
  register: (key: string) => void;
}

const PageReferencesContext = createContext<PageReferencesContextValue | null>(
  null,
);

/**
 * Wraps every routed page (done in App.tsx). `<Cite />` registers its keys
 * here as they render; `<References />` turns the collected keys into the
 * page's numbered reference list.
 */
export function ReferencesProvider({ children }: { children: ReactNode }) {
  const [keys, setKeys] = useState<string[]>([]);
  const register = useCallback((key: string) => {
    setKeys((previous) =>
      previous.includes(key) ? previous : [...previous, key],
    );
  }, []);
  const value = useMemo(() => ({ keys, register }), [keys, register]);
  return (
    <PageReferencesContext.Provider value={value}>
      {children}
    </PageReferencesContext.Provider>
  );
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

  return (
    <sup className="cite-ref">
      {"["}
      {groups.length === 0 ? (
        <span>?</span>
      ) : (
        groups.map((group, index) => (
          <span key={group.from}>
            {index > 0 && ","}
            <a href={`#ref-${group.from}`}>
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
}

/**
 * The current page's reference list. Place once at the bottom of a page
 * component in src/contents/. It shows only the sources cited on that page,
 * numbered by order of first citation, and renders nothing until the page
 * cites at least one source.
 */
export function References({
  mode = "default",
}: {
  mode?: "default" | "article";
}) {
  const context = useContext(PageReferencesContext);
  const keys = context?.keys ?? [];

  if (keys.length === 0) return null;

  const content = (
    <>
      <h2>References</h2>
      {mode === "default" && <hr />}
      <ol className="references-list">
        {keys.map((key, index) => {
          const entry = referenceByKey[key];
          return entry ? (
            <li
              key={key}
              id={`ref-${index + 1}`}
              dangerouslySetInnerHTML={{ __html: entry.html }}
            />
          ) : (
            <li key={key} id={`ref-${index + 1}`} className="text-danger">
              Missing entry &ldquo;{key}&rdquo; — add it to
              src/data/references.bib.
            </li>
          );
        })}
      </ol>
    </>
  );

  if (mode === "article") return content;

  return (
    <div className="row mt-4">
      <div className="col">{content}</div>
    </div>
  );
}
