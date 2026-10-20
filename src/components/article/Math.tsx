/**
 * LaTeX formula rendering (KaTeX, bundled locally via npm — iGEM compliant).
 *
 * Two flavours:
 * - `MathInline` — inline formula inside a paragraph, inherits baseline.
 * - `MathBlock`  — standalone display equation, optional label + tag (number).
 *
 * KaTeX outputs HTML + hidden MathML by default, so screen readers already
 * announce the math; `ariaLabel` is therefore optional (it *overrides* the
 * MathML for most AT, only set it when you really want that).
 *
 * KaTeX (JS + stylesheet, ~280 kB min) is loaded on demand: the first formula
 * that mounts starts the import, shared by every formula on the page. Until it
 * resolves the raw TeX source is shown, so pages without formulas never
 * download KaTeX and pages with them still paint immediately.
 */
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import type { KatexOptions } from "katex";
import clsx from "clsx";
import styles from "./math.module.css";

/**
 * Options passthrough — `displayMode`/`throwOnError` are owned by the
 * component, and `trust` is deliberately withheld: enabling it would let
 * repo TeX emit `\href{javascript:...}` straight into innerHTML. If a page
 * ever truly needs `\href`, scope it with a protocol-checking trust handler
 * added to this component — not a blanket `trust: true` at call sites.
 */
export type MathRenderOptions = Omit<
  KatexOptions,
  "displayMode" | "throwOnError" | "trust"
>;

type KatexModule = typeof import("katex");

let katexModule: KatexModule | null = null;
let katexPromise: Promise<KatexModule> | null = null;

/**
 * Loads KaTeX once per session; concurrent formulas share the same request.
 * The stylesheet rides along so the first formula never flashes unstyled.
 */
function loadKatex(): Promise<KatexModule> {
  katexPromise ??= Promise.all([
    import("katex"),
    import("katex/dist/katex.min.css"),
  ]).then(([katex]) => {
    katexModule = katex;
    return katex;
  });
  return katexPromise;
}

/** `null` until the dynamic import resolves. */
function useKatex(): KatexModule | null {
  const [katex, setKatex] = useState(katexModule);

  useEffect(() => {
    if (katex) return;
    let active = true;
    void loadKatex().then((mod) => {
      if (active) setKatex(mod);
    });
    return () => {
      active = false;
    };
  }, [katex]);

  return katex;
}

interface MathBaseProps {
  /** LaTeX source (KaTeX dialect). */
  tex: string;
  /**
   * Extra KaTeX options (macros, errorColor, strict, …).
   * Tip: memoize the object at the call site, or inline it literally so the
   * JSON identity check inside `useTex` stays cheap and stable.
   */
  options?: MathRenderOptions;
  /**
   * Custom replacement when the TeX fails to parse. When omitted, KaTeX's own
   * red inline error (the raw TeX source) is shown instead — dev friendly.
   */
  fallback?: ReactNode;
  /** Screen-reader label override; defaults to letting KaTeX's MathML speak. */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

export interface MathInlineProps extends MathBaseProps {
  /** Wrapper element, defaults to `span`. Keep it inline-level for correct baseline. */
  as?: ElementType;
}

export interface MathBlockProps extends MathBaseProps {
  /** Equation tag rendered at the right edge, e.g. `"(1)"`. */
  tag?: ReactNode;
  /** Optional heading above the equation, e.g. `"Mass balance"`. */
  label?: ReactNode;
  /** Allow horizontal scrolling on narrow viewports (default true). */
  scrollable?: boolean;
  /** Extra class for the equation row itself (inside the block wrapper). */
  eqClassName?: string;
}

interface TexRenderResult {
  html: string | null;
  failed: boolean;
}

/**
 * Single owner of the katex memoization policy (shared by both flavours).
 *
 * Dependency caveats, documented once:
 * - `options` is keyed via JSON.stringify, so function-valued options (e.g. a
 *   custom `strict` handler) are dropped from the key — memoize the options
 *   object at the call site if you pass any.
 * - `fallback` participates by definedness, not node identity, so inline JSX
 *   fallbacks never invalidate the memo.
 *
 * Returns `null` while the katex module is still loading.
 */
function useTex(
  katex: KatexModule | null,
  tex: string,
  displayMode: boolean,
  options: MathRenderOptions | undefined,
  hasFallback: boolean,
): TexRenderResult | null {
  const optionsKey = JSON.stringify(options) ?? "";
  const result = useMemo(
    () =>
      katex === null
        ? null
        : renderTex(katex, tex, displayMode, options, hasFallback),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options participates via the stable optionsKey above
    [katex, tex, displayMode, optionsKey, hasFallback],
  );
  return result;
}

function renderTex(
  katex: KatexModule,
  tex: string,
  displayMode: boolean,
  options: MathRenderOptions | undefined,
  hasFallback: boolean,
): TexRenderResult {
  try {
    return {
      html: katex.renderToString(tex, {
        ...options,
        displayMode,
        throwOnError: true,
      }),
      failed: false,
    };
  } catch {
    if (hasFallback) return { html: null, failed: true };
    // No custom fallback → let KaTeX draw its own inline error (throwOnError: false).
    return {
      html: katex.renderToString(tex, {
        ...options,
        displayMode,
        throwOnError: false,
      }),
      failed: false,
    };
  }
}

export function MathInline({
  tex,
  options,
  fallback,
  ariaLabel,
  className,
  style,
  as = "span",
}: MathInlineProps) {
  const katex = useKatex();
  const result = useTex(katex, tex, false, options, fallback !== undefined);

  const Tag = as;
  if (result === null) {
    // Loading placeholder: raw TeX keeps the line from collapsing.
    return (
      <Tag className={clsx(styles.inline, className)} style={style}>
        {tex}
      </Tag>
    );
  }
  if (result.failed) {
    return (
      <Tag className={clsx(styles.inline, className)} style={style}>
        {fallback}
      </Tag>
    );
  }
  return (
    <Tag
      className={clsx(styles.inline, className)}
      style={style}
      role="math"
      aria-label={ariaLabel}
      dangerouslySetInnerHTML={{ __html: result.html ?? "" }}
    />
  );
}

export function MathBlock({
  tex,
  options,
  fallback,
  ariaLabel,
  className,
  style,
  tag,
  label,
  scrollable = true,
  eqClassName,
}: MathBlockProps) {
  const katex = useKatex();
  const result = useTex(katex, tex, true, options, fallback !== undefined);
  const eqClass = clsx(styles.eq, scrollable && styles.scrollable, eqClassName);
  // A scrollable equation is a keyboard-scrollable region (WCAG 2.1.1): make
  // the container focusable and give it an accessible name. An explicit
  // `ariaLabel` still wins; otherwise the region describes itself.
  const scrollProps: HTMLAttributes<HTMLDivElement> = {};
  if (scrollable) {
    scrollProps.tabIndex = 0;
    scrollProps["aria-label"] = ariaLabel ?? "Scrollable equation";
  } else if (ariaLabel) {
    scrollProps["aria-label"] = ariaLabel;
  }

  return (
    <div className={clsx(styles.block, className)} style={style}>
      {label != null && <div className={styles.label}>{label}</div>}
      <div className={styles.row}>
        {result === null ? (
          // Loading placeholder: raw TeX keeps the equation area from collapsing.
          <div className={eqClass} {...scrollProps}>
            {tex}
          </div>
        ) : result.failed ? (
          <div className={eqClass} {...scrollProps}>
            {fallback}
          </div>
        ) : (
          <div
            className={eqClass}
            role="math"
            {...scrollProps}
            dangerouslySetInnerHTML={{ __html: result.html ?? "" }}
          />
        )}
        {tag != null && <span className={styles.tag}>{tag}</span>}
      </div>
    </div>
  );
}
