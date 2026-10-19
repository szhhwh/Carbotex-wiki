import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface RouteLoad {
  key: string;
  phase: "playing" | "leaving";
  ready: boolean;
  turned: boolean;
}

function cssTimeMs(value: string, fallback: number) {
  const match = /^([\d.]+)(ms|s)$/.exec(value.trim());
  if (!match) return fallback;
  return Number(match[1]) * (match[2] === "s" ? 1000 : 1);
}

function transitionMs(element: HTMLElement) {
  const style = getComputedStyle(element);
  return cssTimeMs(style.transitionDuration.split(",")[0], 900);
}

function reducedMotionHoldMs(element: HTMLElement) {
  return cssTimeMs(
    getComputedStyle(element).getPropertyValue(
      "--opening-reduced-hold-duration",
    ),
    450,
  );
}

/**
 * Provides the same opening animation for client-side page changes that the
 * inline document opening provides for full loads. The public DOM contract is
 * `[data-route-ready]` for committed content, `wiki:opening-reveal` when the
 * fade starts, and `wiki:opening-complete` when the route is interactive.
 */
export function RouteLoadingScreen({ title }: { title: string }) {
  const location = useLocation();
  const [renderedPathname, setRenderedPathname] = useState(location.pathname);
  const [load, setLoad] = useState<RouteLoad | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const turnRef = useRef<SVGGElement>(null);

  // A synchronous route change must render the cover in the same commit as
  // the new page, otherwise a cached page can appear for a frame without it.
  if (location.pathname !== renderedPathname) {
    setRenderedPathname(location.pathname);
    setLoad({
      key: location.key,
      phase: "playing",
      ready: false,
      turned: false,
    });
  }

  const loadKey = load?.key;
  const phase = load?.phase;
  const ready = load?.ready;
  const turned = load?.turned;

  useEffect(() => {
    if (!loadKey) return;
    const screen = screenRef.current;
    if (!screen) return;

    const blockScroll = (event: Event) => event.preventDefault();
    const blockKeys = (event: KeyboardEvent) => {
      if (
        [
          " ",
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
        ].includes(event.key)
      ) {
        event.preventDefault();
      }
    };

    const root = document.getElementById("root");
    root?.setAttribute("aria-busy", "true");
    screen.addEventListener("wheel", blockScroll, { passive: false });
    screen.addEventListener("touchmove", blockScroll, { passive: false });
    document.addEventListener("keydown", blockKeys);
    return () => {
      root?.removeAttribute("aria-busy");
      screen.removeEventListener("wheel", blockScroll);
      screen.removeEventListener("touchmove", blockScroll);
      document.removeEventListener("keydown", blockKeys);
    };
  }, [loadKey]);

  useEffect(() => {
    if (!loadKey || phase !== "playing" || ready) return;

    const markReady = () => {
      const committed = document.querySelector(
        `[data-route-ready="${CSS.escape(loadKey)}"]`,
      );
      if (!committed && !document.querySelector("[data-route-error]")) return;
      setLoad((current) =>
        current?.key === loadKey ? { ...current, ready: true } : current,
      );
    };

    const root = document.getElementById("root") ?? document.body;
    const observer = new MutationObserver(markReady);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-route-ready"],
    });
    markReady();
    return () => observer.disconnect();
  }, [loadKey, phase, ready]);

  useLayoutEffect(() => {
    if (!loadKey || phase !== "playing" || turned) return;
    const screen = screenRef.current;
    const turn = turnRef.current;
    if (!screen || !turn) return;

    const markTurned = () => {
      setLoad((current) =>
        current?.key === loadKey ? { ...current, turned: true } : current,
      );
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(markTurned, reducedMotionHoldMs(screen));
      return () => window.clearTimeout(timer);
    }

    turn.addEventListener("animationiteration", markTurned, { once: true });
    // Animation events pause in background tabs; the timer keeps navigation
    // from remaining covered indefinitely without changing normal timing.
    const timer = window.setTimeout(
      markTurned,
      cssTimeMs(getComputedStyle(turn).animationDuration, 1000) + 100,
    );
    return () => {
      turn.removeEventListener("animationiteration", markTurned);
      window.clearTimeout(timer);
    };
  }, [loadKey, phase, turned]);

  useEffect(() => {
    if (phase !== "playing" || !ready || !turned) return;
    setLoad((current) =>
      current?.phase === "playing" ? { ...current, phase: "leaving" } : current,
    );
  }, [phase, ready, turned]);

  useLayoutEffect(() => {
    if (loadKey && phase === "leaving") {
      document.dispatchEvent(new Event("wiki:opening-reveal"));
    }
  }, [loadKey, phase]);

  useEffect(() => {
    if (!loadKey || phase !== "leaving") return;
    const screen = screenRef.current;
    if (!screen) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.dispatchEvent(new Event("wiki:opening-complete"));
      setLoad((current) => (current?.key === loadKey ? null : current));
    };
    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target === screen && event.propertyName === "opacity") finish();
    };

    screen.addEventListener("transitionend", onTransitionEnd);
    const timer = window.setTimeout(finish, transitionMs(screen) + 100);
    return () => {
      screen.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(timer);
    };
  }, [loadKey, phase]);

  if (!load) return null;

  return (
    <div
      key={load.key}
      ref={screenRef}
      id="opening-screen"
      className="opening-screen"
      role="status"
      aria-live="polite"
      data-state={load.phase}
    >
      <div className="opening-screen__center">
        <svg
          className="opening-screen__art"
          viewBox="0 0 566.52 539.73"
          aria-hidden="true"
        >
          <g ref={turnRef} className="opening-screen__turn">
            <use href="#wiki-taiji" />
          </g>
        </svg>
        <span className="opening-screen__status">Opening {title}…</span>
      </div>
    </div>
  );
}
