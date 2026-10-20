import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import styles from "./image-viewer.module.css";

interface ImageViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

type View = { scale: number; x: number; y: number };
type Point = { x: number; y: number };
type PointerGesture = {
  startX: number;
  startY: number;
  startedOnStage: boolean;
  moved: boolean;
};
const initialView: View = { scale: 1, x: 0, y: 0 };
const maxScale = 5;
const clickMoveTolerance = 6;

/** A native modal keeps focus inside the viewer and makes the page inert. */
export function ImageViewer({ src, alt, onClose }: ImageViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const viewRef = useRef(initialView);
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef<PointerGesture | null>(null);
  const [view, setView] = useState(initialView);
  const [interacting, setInteracting] = useState(false);
  const [closing, setClosing] = useState(false);
  const [failed, setFailed] = useState(false);

  const updateView = useCallback((next: View) => {
    const stage = stageRef.current;
    const image = imageRef.current;
    const scale = Math.min(maxScale, Math.max(1, next.scale));
    const limitX =
      stage && image
        ? Math.max(0, (image.offsetWidth * scale - stage.clientWidth) / 2)
        : 0;
    const limitY =
      stage && image
        ? Math.max(0, (image.offsetHeight * scale - stage.clientHeight) / 2)
        : 0;
    const bounded = {
      scale,
      x: Math.min(limitX, Math.max(-limitX, next.x)),
      y: Math.min(limitY, Math.max(-limitY, next.y)),
    };
    viewRef.current = bounded;
    setView(bounded);
  }, []);

  const zoom = useCallback(
    (factor: number, anchor?: Point) => {
      const current = viewRef.current;
      const scale = Math.min(maxScale, Math.max(1, current.scale * factor));
      const ratio = scale / current.scale;
      updateView({
        scale,
        x: anchor
          ? anchor.x - (anchor.x - current.x) * ratio
          : current.x * ratio,
        y: anchor
          ? anchor.y - (anchor.y - current.y) * ratio
          : current.y * ratio,
      });
    },
    [updateView],
  );

  const close = useCallback(() => setClosing(true), []);

  useLayoutEffect(() => {
    const dialog = dialogRef.current!;
    dialog.showModal();
    // Native dialog owns focus trapping, inertness, and return focus.
    return () => dialog.close();
  }, []);

  useLayoutEffect(() => {
    if (!closing) return;
    const dialog = dialogRef.current!;
    // Reading the animations flushes the closing styles. Wait for the dialog
    // and ::backdrop transitions instead of relying on a matching timer.
    const transitions = dialog
      .getAnimations({ subtree: true })
      .filter(
        (animation) =>
          animation instanceof CSSTransition &&
          animation.effect instanceof KeyframeEffect &&
          animation.effect.target === dialog,
      );
    let cancelled = false;
    Promise.allSettled(
      transitions.map((transition) => transition.finished),
    ).then(() => {
      if (!cancelled) onClose();
    });
    return () => {
      cancelled = true;
    };
  }, [closing, onClose]);

  useEffect(() => {
    const stage = stageRef.current!;
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = stage.getBoundingClientRect();
      zoom(Math.exp(-Math.max(-100, Math.min(100, event.deltaY)) * 0.003), {
        x: event.clientX - rect.left - rect.width / 2,
        y: event.clientY - rect.top - rect.height / 2,
      });
    };
    stage.addEventListener("wheel", wheel, { passive: false });
    const observer = new ResizeObserver(() => updateView(viewRef.current));
    observer.observe(stage);
    return () => {
      stage.removeEventListener("wheel", wheel);
      observer.disconnect();
    };
  }, [zoom, updateView]);

  const startPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || pointers.current.size >= 2) return;
    if (pointers.current.size === 0) {
      gesture.current = {
        startX: event.clientX,
        startY: event.clientY,
        startedOnStage: event.target === event.currentTarget,
        moved: false,
      };
    } else if (gesture.current) {
      gesture.current.moved = true;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    setInteracting(true);
  };

  const movePointer = (event: PointerEvent<HTMLDivElement>) => {
    const previous = pointers.current.get(event.pointerId);
    if (!previous) return;
    const other = [...pointers.current.entries()].find(
      ([id]) => id !== event.pointerId,
    )?.[1];
    const next = { x: event.clientX, y: event.clientY };
    pointers.current.set(event.pointerId, next);
    if (
      gesture.current &&
      Math.hypot(
        next.x - gesture.current.startX,
        next.y - gesture.current.startY,
      ) > clickMoveTolerance
    ) {
      gesture.current.moved = true;
    }
    if (other) {
      if (gesture.current) gesture.current.moved = true;
      const oldDistance = Math.hypot(
        previous.x - other.x,
        previous.y - other.y,
      );
      const newDistance = Math.hypot(next.x - other.x, next.y - other.y);
      const rect = event.currentTarget.getBoundingClientRect();
      if (oldDistance > 0)
        zoom(newDistance / oldDistance, {
          x: (previous.x + other.x) / 2 - rect.left - rect.width / 2,
          y: (previous.y + other.y) / 2 - rect.top - rect.height / 2,
        });
      updateView({
        ...viewRef.current,
        x: viewRef.current.x + (next.x - previous.x) / 2,
        y: viewRef.current.y + (next.y - previous.y) / 2,
      });
    } else {
      updateView({
        ...viewRef.current,
        x: viewRef.current.x + next.x - previous.x,
        y: viewRef.current.y + next.y - previous.y,
      });
    }
  };

  const endPointer = (event: PointerEvent<HTMLDivElement>) => {
    const wasTracked = pointers.current.has(event.pointerId);
    const isBlankClick =
      wasTracked &&
      event.type === "pointerup" &&
      pointers.current.size === 1 &&
      gesture.current?.startedOnStage &&
      !gesture.current.moved;
    pointers.current.delete(event.pointerId);
    setInteracting(pointers.current.size > 0);
    if (pointers.current.size === 0) gesture.current = null;
    if (isBlankClick) close();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      data-image-viewer
      data-closing={closing || undefined}
      aria-label="Image preview"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onKeyDown={(event) => {
        if (closing || event.ctrlKey || event.metaKey || event.altKey) return;
        if (event.key === "Tab") {
          const focusable = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((element) => element.getClientRects().length > 0);
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (!first || !last) return;
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          } else if (!event.currentTarget.contains(document.activeElement)) {
            event.preventDefault();
            first.focus();
          }
          return;
        }
        if (event.key === "+" || event.key === "=") zoom(1.25);
        else if (event.key === "-") zoom(0.8);
        else if (event.key === "0") updateView(initialView);
        else if (event.key.startsWith("Arrow")) {
          const step = 60;
          updateView({
            ...viewRef.current,
            x:
              viewRef.current.x +
              (event.key === "ArrowLeft"
                ? step
                : event.key === "ArrowRight"
                  ? -step
                  : 0),
            y:
              viewRef.current.y +
              (event.key === "ArrowUp"
                ? step
                : event.key === "ArrowDown"
                  ? -step
                  : 0),
          });
        } else return;
        event.preventDefault();
      }}
    >
      <section className={styles.panel}>
        <div
          ref={stageRef}
          className={styles.stage}
          data-zoomed={view.scale > 1 || undefined}
          data-interacting={interacting || undefined}
          data-lenis-prevent
          onPointerDown={startPointer}
          onPointerMove={movePointer}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onLostPointerCapture={endPointer}
          onDoubleClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            if (viewRef.current.scale > 1) updateView(initialView);
            else
              zoom(2, {
                x: event.clientX - rect.left - rect.width / 2,
                y: event.clientY - rect.top - rect.height / 2,
              });
          }}
        >
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            draggable={false}
            className={styles.image}
            style={{
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
            }}
            onLoad={() => updateView(viewRef.current)}
            onError={() => setFailed(true)}
            hidden={failed}
          />
          {failed && (
            <p role="status" className={styles.error}>
              This image could not be loaded. Please close the viewer and try
              again.
            </p>
          )}
        </div>
        <footer className={styles.footer}>
          <div
            className={styles.toolbar}
            role="group"
            aria-label="Image controls"
          >
            <button
              type="button"
              className={styles.control}
              disabled={failed || view.scale <= 1}
              onClick={() => zoom(0.8)}
              aria-label="Zoom out"
              title="Zoom out (−)"
            >
              <Minus size={20} />
            </button>
            <output className={styles.scale} aria-label="Zoom level">
              {Math.round(view.scale * 100)}%
            </output>
            <button
              type="button"
              className={styles.control}
              disabled={failed || view.scale >= maxScale}
              onClick={() => zoom(1.25)}
              aria-label="Zoom in"
              title="Zoom in (+)"
            >
              <Plus size={20} />
            </button>
            <button
              type="button"
              className={styles.control}
              disabled={
                failed || (view.scale === 1 && view.x === 0 && view.y === 0)
              }
              onClick={() => updateView(initialView)}
              aria-label="Reset zoom and position"
              title="Reset and fit to view (0)"
            >
              <RotateCcw size={19} />
            </button>
            <button
              type="button"
              className={styles.control}
              onClick={close}
              aria-label="Close image viewer"
              title="Close (Esc)"
              autoFocus
            >
              <X size={21} />
            </button>
          </div>
        </footer>
      </section>
    </dialog>,
    document.body,
  );
}
