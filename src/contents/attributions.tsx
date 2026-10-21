import {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import styles from "./template-pages.module.css";
import { TemplatePageFrame } from "./template-pages";

const ATTRIBUTIONS_HEIGHT_MIN = 216;
const ATTRIBUTIONS_HEIGHT_MAX = 10_000;
const ATTRIBUTIONS_MEASURE_TIMEOUT = 12_000;

type FrameErrorReason = "load-error" | "load-timeout" | "load-unconfirmed";

type FrameState =
  | {
      phase: "loading";
      loadEvents: number;
    }
  | {
      phase: "ready";
      height: number;
      loadEvents: number;
    }
  | {
      phase: "error";
      errorReason: FrameErrorReason;
      loadEvents: number;
    };

type FrameEvent =
  | { type: "height-received"; height: number }
  | { type: "load-observed" }
  | { type: "load-error" }
  | { type: "measurement-deadline" };

const INITIAL_FRAME_STATE: FrameState = {
  phase: "loading",
  loadEvents: 0,
};

const FRAME_ERROR_COPY: Record<
  FrameErrorReason,
  { title: string; detail: string }
> = {
  "load-error": {
    title: "The embedded attributions form could not be loaded.",
    detail: "Use the direct link below to open it separately.",
  },
  "load-timeout": {
    title: "The embedded attributions form did not load in time.",
    detail: "Use the direct link below to open it separately.",
  },
  "load-unconfirmed": {
    title: "The embedded attributions form could not be confirmed as ready.",
    detail:
      "It may have failed to load or may not have reported a usable height. Use the direct link below to continue.",
  },
};

function frameStateReducer(state: FrameState, event: FrameEvent): FrameState {
  switch (event.type) {
    case "height-received":
      // A trusted, valid height is direct evidence that the form is usable.
      return {
        phase: "ready",
        height: event.height,
        loadEvents: state.loadEvents,
      };
    case "load-observed":
      // Chromium can fire load for an error document, so load alone never
      // proves readiness or invalidates a height that already arrived.
      return {
        ...state,
        loadEvents: state.loadEvents + 1,
      };
    case "load-error":
      return state.phase === "ready"
        ? state
        : {
            phase: "error",
            errorReason: "load-error",
            loadEvents: state.loadEvents,
          };
    case "measurement-deadline":
      if (state.phase !== "loading") return state;
      return {
        phase: "error",
        errorReason: state.loadEvents > 0 ? "load-unconfirmed" : "load-timeout",
        loadEvents: state.loadEvents,
      };
  }
}

function normalizeFrameHeight(data: unknown) {
  if (typeof data !== "number" || !Number.isFinite(data) || data <= 0) {
    return undefined;
  }

  return Math.min(
    Math.max(Math.ceil(data) + 4, ATTRIBUTIONS_HEIGHT_MIN),
    ATTRIBUTIONS_HEIGHT_MAX,
  );
}

export function Attributions() {
  const teamID = import.meta.env.VITE_TEAM_ID;
  const frameRef = useRef<HTMLIFrameElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [frameNearViewport, setFrameNearViewport] = useState(false);
  const [frameFocused, setFrameFocused] = useState(false);
  const [frameState, dispatchFrameEvent] = useReducer(
    frameStateReducer,
    INITIAL_FRAME_STATE,
  );
  const attributionsUrl = `https://teams.igem.org/wiki/${teamID}/attributions`;

  useLayoutEffect(() => {
    function listenToIframeHeight(e: MessageEvent) {
      const frame = frameRef.current;
      if (
        e.origin !== "https://teams.igem.org" ||
        !frame ||
        e.source !== frame.contentWindow
      ) {
        return;
      }

      let message: unknown;
      try {
        message = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }

      if (!message || typeof message !== "object") return;
      const { type, data } = message as {
        type?: unknown;
        data?: unknown;
      };
      if (type !== "igem-attribution-form") return;

      const height = normalizeFrameHeight(data);
      if (height === undefined) return;

      dispatchFrameEvent({ type: "height-received", height });
    }
    window.addEventListener("message", listenToIframeHeight);
    return () => {
      window.removeEventListener("message", listenToIframeHeight);
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFrameNearViewport(entry.isIntersecting),
      { rootMargin: "320px 0px" },
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const frameInteractive = frameState.phase === "ready";

  useEffect(() => {
    const syncFrameFocus = () => {
      setFrameFocused(
        frameInteractive && document.activeElement === frameRef.current,
      );
    };
    const scheduleFrameFocusSync = () => {
      requestAnimationFrame(syncFrameFocus);
      window.setTimeout(syncFrameFocus, 0);
    };
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key === "Tab") scheduleFrameFocusSync();
    };

    window.addEventListener("blur", scheduleFrameFocusSync);
    window.addEventListener("focus", scheduleFrameFocusSync);
    document.addEventListener("keydown", handleTabKey, true);
    document.addEventListener("keyup", handleTabKey, true);
    return () => {
      window.removeEventListener("blur", scheduleFrameFocusSync);
      window.removeEventListener("focus", scheduleFrameFocusSync);
      document.removeEventListener("keydown", handleTabKey, true);
      document.removeEventListener("keyup", handleTabKey, true);
    };
  }, [frameInteractive]);

  useEffect(() => {
    if (!frameNearViewport || frameState.phase !== "loading") {
      return;
    }

    const timeout = window.setTimeout(() => {
      dispatchFrameEvent({ type: "measurement-deadline" });
    }, ATTRIBUTIONS_MEASURE_TIMEOUT);
    return () => window.clearTimeout(timeout);
  }, [frameNearViewport, frameState.phase]);

  const frameHeight =
    frameState.phase === "ready" ? frameState.height : undefined;
  const errorCopy =
    frameState.phase === "error"
      ? FRAME_ERROR_COPY[frameState.errorReason]
      : undefined;

  const sections: ArticleSection[] = [
    {
      id: "attribution-form",
      title: "iGEM Attributions Form",
      showHeading: false,
      content: (
        <>
          <div className={styles.attributionForm}>
            {/*
            ====================================================================
            == VERY IMPORTANT                                                 ==
            ====================================================================
            LEAVE THE IFRAME CODE BELOW AS IT IS, THE ATTRIBUTION FORM OF YOUR
            TEAM WILL BE DISPLAYED ON THIS PAGE. DO NOT REMOVE IT, OTHERWISE
            YOU RISK OF NOT MEETING BRONZE MEDAL CRITERION #2
          */}
            <div
              ref={viewportRef}
              className={styles.attributionViewport}
              data-state={frameState.phase}
              data-load-event={
                frameState.loadEvents > 0 ? "observed" : "pending"
              }
              data-load-events={frameState.loadEvents}
              data-near-viewport={frameNearViewport ? "true" : "false"}
              data-frame-focused={frameFocused ? "true" : "false"}
              data-error-reason={
                frameState.phase === "error"
                  ? frameState.errorReason
                  : undefined
              }
            >
              <iframe
                ref={frameRef}
                className={styles.attributionFrame}
                style={{
                  width: "100%",
                  height: frameHeight ? `${frameHeight}px` : undefined,
                }}
                id="igem-attribution-form"
                title="iGEM Attributions Form"
                src={attributionsUrl}
                aria-busy={frameState.phase === "loading"}
                aria-hidden={frameInteractive ? undefined : true}
                tabIndex={frameInteractive ? 0 : -1}
                onLoad={() => dispatchFrameEvent({ type: "load-observed" })}
                onError={() => dispatchFrameEvent({ type: "load-error" })}
                onFocus={() => setFrameFocused(frameInteractive)}
                onBlur={() => setFrameFocused(false)}
              />
              {frameState.phase === "loading" && (
                <div
                  className={styles.attributionLoading}
                  role="status"
                  aria-live="polite"
                >
                  <span
                    className={styles.attributionSpinner}
                    aria-hidden="true"
                  />
                  <span>Loading the attributions form...</span>
                </div>
              )}
              {frameState.phase === "error" && errorCopy && (
                <div className={styles.attributionError} role="alert">
                  <strong>{errorCopy.title}</strong>
                  <span>{errorCopy.detail}</span>
                </div>
              )}
            </div>
            {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
          </div>
          <p className={styles.attributionFallback}>
            <span>Having trouble seeing the form?</span>{" "}
            <a href={attributionsUrl} target="_blank" rel="noreferrer noopener">
              Open the attributions form in a new tab
            </a>
            .
          </p>
        </>
      ),
    },
  ];

  return (
    <TemplatePageFrame>
      <ArticlePage
        title="Attributions"
        showHeroMedia={false}
        showOutline={false}
        fullWidth
        sections={sections}
      />
    </TemplatePageFrame>
  );
}
