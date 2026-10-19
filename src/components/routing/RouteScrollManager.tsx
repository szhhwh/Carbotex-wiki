import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

/** Mounted inside Suspense, so a loading placeholder cannot count as ready. */
export function RouteContentReady() {
  const { key } = useLocation();
  return <span hidden data-route-ready={key} />;
}

interface ScrollPosition {
  x: number;
  y: number;
}

function hashTarget(hash: string) {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    // Malformed percent escapes are valid URL input, not application errors.
    return null;
  }
}

const scrollKeys = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

/**
 * BrowserRouter does not restore targets that only appear after a lazy route
 * commits. Keep one short-lived positioning transaction per navigation, while
 * preserving the reader's position for back/forward within this session.
 * Fullscreen Home keeps its own Lenis/ScrollTrigger scroll ownership.
 */
export function RouteScrollManager({ enabled }: { enabled: boolean }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const positions = useRef(new Map<string, ScrollPosition>());
  const focusHash = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (!enabled) return;

    const { key, pathname, search, hash } = location;
    // Native fragment navigations can have no Router key; include the URL so
    // those entries do not all share the initial "default" position.
    const identity = `${key}:${pathname}${search}${hash}`;
    let persisted = window.history.state?.wikiScroll;
    if (!persisted) {
      const entry = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (entry?.type === "reload" || entry?.type === "back_forward") {
        try {
          persisted = JSON.parse(
            sessionStorage.getItem("wiki-scroll-return") ?? "null",
          );
        } catch {
          // Browsers with storage disabled still support in-session history.
        }
      }
    }
    const saved =
      positions.current.get(identity) ??
      (!hash &&
      persisted?.url === window.location.href &&
      persisted?.key === key &&
      Number.isFinite(persisted?.position?.x) &&
      Number.isFinite(persisted?.position?.y)
        ? (persisted.position as ScrollPosition)
        : undefined);
    const oldRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    let cancelPositioning = () => {};
    const remember = () => {
      positions.current.set(identity, { x: window.scrollX, y: window.scrollY });
      if (positions.current.size > 100) {
        const oldest = positions.current.keys().next().value;
        if (oldest !== undefined) positions.current.delete(oldest);
      }
    };
    const persist = () => {
      remember();
      // Keep native refresh/return behavior for URLs without a fragment. The
      // Router's key/index/user state remain untouched, and no new entry is
      // created. A refreshed URL with a hash deliberately resolves its target.
      const snapshot = {
        url: window.location.href,
        key,
        position: { x: window.scrollX, y: window.scrollY },
      };
      try {
        // One departure snapshot; never a growing storage history.
        sessionStorage.setItem("wiki-scroll-return", JSON.stringify(snapshot));
      } catch {
        // Persistence is optional when browser privacy settings block storage.
      }
      window.history.replaceState(
        {
          ...window.history.state,
          wikiScroll: snapshot,
        },
        "",
      );
    };

    const position = (nextHash: string, restore?: ScrollPosition) => {
      cancelPositioning();
      let cancelled = false;
      let frame = 0;
      let scheduled = false;
      let timeout = 0;

      const finish = () => {
        cancelled = true;
        cancelAnimationFrame(frame);
        observer.disconnect();
        clearTimeout(timeout);
      };
      cancelPositioning = finish;

      const apply = () => {
        if (cancelled) return;
        if (restore) {
          window.scrollTo({
            left: restore.x,
            top: restore.y,
            behavior: "instant",
          });
        } else if (nextHash) {
          // scrollIntoView honors each target's CSS scroll-margin-top.
          const target = hashTarget(nextHash);
          target?.scrollIntoView({
            block: "start",
            behavior:
              focusHash.current === nextHash &&
              !window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "smooth"
                : "instant",
          });
          if (target && focusHash.current === nextHash) {
            focusHash.current = null;
            // Keep native fragment navigation's keyboard starting point,
            // especially when the clicked mobile outline is now hidden.
            if (!target.hasAttribute("tabindex")) {
              target.setAttribute("tabindex", "-1");
              target.addEventListener(
                "blur",
                () => target.removeAttribute("tabindex"),
                { once: true },
              );
            }
            target.focus({ preventScroll: true });
          }
        } else if (navigationType !== "POP") {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
        remember();
      };

      const attempt = () => {
        if (cancelled || scheduled) return;
        const ready = document.querySelector(
          `[data-route-ready="${CSS.escape(key)}"]`,
        );
        if (!ready) {
          if (document.querySelector("main[role=alert]")) finish();
          return;
        }
        // The missing-ID budget begins after the chunk commits. Slow route
        // downloads can take arbitrarily long without losing their hash.
        if (!timeout) timeout = window.setTimeout(finish, 8000);
        if (nextHash && !restore && !hashTarget(nextHash)) return;
        scheduled = true;
        observer.disconnect();
        // React's outline-close update and reference registration must commit
        // before measuring. This is a one-off callback, not an animation loop.
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            apply();
            if (document.fonts.status === "loading") {
              void document.fonts.ready.then(() => {
                if (!cancelled) {
                  apply();
                  finish();
                }
              });
            } else {
              finish();
            }
          });
        });
      };

      // Missing IDs / failed imports have a finite wait. No delayed scroll is
      // scheduled by this timeout, and readers can cancel it immediately.
      const observer = new MutationObserver(attempt);
      observer.observe(document.getElementById("root") ?? document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-route-ready"],
      });
      attempt();
    };

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
      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self")
      )
        return;
      const url = new URL(anchor.href, window.location.href);
      if (
        !url.hash ||
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search
      )
        return;

      event.preventDefault();
      remember();
      focusHash.current = url.hash;
      // Router navigation gives each new fragment its own history key. A
      // repeated click still repositions without adding duplicate entries.
      if (url.hash === window.location.hash) {
        position(url.hash);
      } else {
        void navigate({ pathname, search, hash: url.hash });
      }
    };

    const onHashChange = () => {
      // Router POP handles back/forward (including its saved position). This
      // fallback covers fragment edits that did not update Router's location.
      if (window.location.hash !== hash && window.history.state?.key === key) {
        position(window.location.hash);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (scrollKeys.has(event.key)) cancelPositioning();
    };
    const onUserScroll = () => cancelPositioning();

    window.addEventListener("scroll", remember, { passive: true });
    window.addEventListener("pagehide", persist);
    window.addEventListener("beforeunload", persist);
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchstart", onUserScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    position(hash, navigationType === "POP" ? saved : undefined);

    return () => {
      cancelPositioning();
      window.removeEventListener("scroll", remember);
      window.removeEventListener("pagehide", persist);
      window.removeEventListener("beforeunload", persist);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
      window.history.scrollRestoration = oldRestoration;
    };
  }, [enabled, location, navigate, navigationType]);

  return null;
}
