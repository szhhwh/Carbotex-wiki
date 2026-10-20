import { useLayoutEffect, useRef, useState } from "react";

const AUTO_PIXELS_PER_SECOND = 18;
const MANUAL_DURATION = 350;
// Keep one wheel notch from consuming a large fraction of a card.
const WHEEL_SENSITIVITY = 0.42;
// Exponential follow is frame-rate independent and never restarts on input.
const WHEEL_FOLLOW_RATE = 18;
const WHEEL_SETTLE_DISTANCE = 0.0005;

interface CarouselController {
  move: (direction: number) => void;
  rebase: () => void;
  toggleAuto: () => void;
  resumeAuto: () => void;
}

export function useProjectCarousel(count: number) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<CarouselController | null>(null);
  const [index, setIndex] = useState(0);
  const [manualMoving, setManualMoving] = useState(false);
  const [autoRunning, setAutoRunning] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const [motionReduced, setMotionReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const autoPausedRef = useRef(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const viewport = track?.parentElement;
    if (!root || !track || !viewport) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | null = null;
    let mode: "auto" | "manual" | "wheel" | null = null;
    let step = 0;
    let position = 0;
    let from = 0;
    let target = 0;
    let duration = 0;
    let pendingRebase = false;
    let inView = false;
    let hovered = viewport.matches(":hover");
    let focused = root.contains(document.activeElement);
    let wheelTarget = 0;
    let wheelFrame = 0;
    let lastWheelFrame = 0;
    let resumeWheel = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartPosition = 0;
    let touchAxis: "horizontal" | "vertical" | null = null;
    let touchPointerId: number | null = null;
    let suppressClick = false;

    const transform = (offset: number) =>
      `translate3d(${-step * (1 + offset)}px, 0, 0)`;

    const samplePosition = () => {
      const time = animation?.currentTime;
      if (typeof time !== "number" || !duration) return position;
      if (mode !== "auto" && step > 0) {
        return (
          -new DOMMatrixReadOnly(getComputedStyle(track).transform).m41 / step -
          1
        );
      }
      return from + (target - from) * Math.min(1, Math.max(0, time / duration));
    };

    const clearAnimation = () => {
      if (animation) {
        animation.onfinish = null;
        animation.cancel();
        animation = null;
      }
    };

    const cancel = () => {
      position = samplePosition();
      clearAnimation();
      mode = null;
      track.style.transform = transform(position);
      track.dataset.animating = "false";
    };

    const finish = (direction: number) => {
      // Hold the final transform until React replaces the cards before paint.
      pendingRebase = true;
      setManualMoving(false);
      setIndex((current) => (current + direction + count) % count);
    };

    const start = (
      next: number,
      milliseconds: number,
      kind: "auto" | "manual",
    ) => {
      from = position;
      target = next;
      duration = milliseconds;
      mode = kind;
      track.dataset.animating = "true";
      // Animate only transform; React updates once at each card boundary.
      animation = track.animate(
        [{ transform: transform(from) }, { transform: transform(target) }],
        {
          duration,
          easing: kind === "auto" ? "linear" : "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        },
      );
      animation.onfinish = () => {
        finish(next);
      };
    };

    const paint = () => {
      track.style.transform = transform(position);
    };

    const stopWheelLoop = () => {
      if (wheelFrame) cancelAnimationFrame(wheelFrame);
      wheelFrame = 0;
    };

    const finishWheel = () => {
      stopWheelLoop();
      position = wheelTarget;
      paint();
      mode = null;
      track.dataset.animating = "false";
      sync();
    };

    const crossWheelBoundary = (direction: number) => {
      stopWheelLoop();
      wheelTarget -= direction;
      resumeWheel = true;
      finish(direction);
    };

    const stepWheel = (time: number) => {
      wheelFrame = 0;
      if (mode !== "wheel" || pendingRebase) return;

      const elapsed = Math.min(
        0.05,
        Math.max(0.001, (time - lastWheelFrame) / 1000),
      );
      lastWheelFrame = time;
      const remaining = wheelTarget - position;
      const follow = preference.matches
        ? 1
        : 1 - Math.exp(-WHEEL_FOLLOW_RATE * elapsed);

      position += remaining * follow;
      if (Math.abs(wheelTarget - position) < WHEEL_SETTLE_DISTANCE) {
        position = wheelTarget;
      }

      if (position >= 1 || position <= -1) {
        const direction = position > 0 ? 1 : -1;
        position = direction;
        paint();
        crossWheelBoundary(direction);
        return;
      }

      paint();
      if (Math.abs(wheelTarget - position) < WHEEL_SETTLE_DISTANCE) {
        finishWheel();
      } else {
        wheelFrame = requestAnimationFrame(stepWheel);
      }
    };

    const startWheelLoop = () => {
      if (mode !== "wheel" || wheelFrame || pendingRebase) return;
      track.dataset.animating = "true";
      lastWheelFrame = performance.now();
      wheelFrame = requestAnimationFrame(stepWheel);
    };

    const scrollWheel = () => {
      if (mode !== "wheel" || !step) return;
      if (Math.abs(wheelTarget - position) < WHEEL_SETTLE_DISTANCE) {
        finishWheel();
      } else {
        startWheelLoop();
      }
    };

    const sync = () => {
      if (pendingRebase) return;
      const visible = inView && !document.hidden;
      if (mode === "wheel") {
        if (visible) startWheelLoop();
        else stopWheelLoop();
        track.dataset.animating = String(visible);
        return;
      }
      if (mode === "manual" && animation) {
        if (visible) animation.play();
        else animation.pause();
        track.dataset.animating = String(visible);
        return;
      }
      const active =
        visible &&
        !hovered &&
        !focused &&
        !preference.matches &&
        !autoPausedRef.current &&
        count > 1;
      setAutoRunning(active);
      if (active && step > 0) {
        if (animation) animation.play();
        else {
          start(
            1,
            Math.max(
              1,
              ((1 - position) * step * 1000) / AUTO_PIXELS_PER_SECOND,
            ),
            "auto",
          );
        }
      } else {
        animation?.pause();
      }
      track.dataset.animating = String(active);
    };

    const move = (direction: number) => {
      if (pendingRebase || count < 2) return;
      cancel();
      resumeWheel = false;
      setAutoRunning(false);
      if (preference.matches) {
        finish(direction);
        return;
      }
      setManualMoving(true);
      start(direction, MANUAL_DURATION, "manual");
      sync();
    };

    const rebase = () => {
      if (!pendingRebase) return;
      stopWheelLoop();
      clearAnimation();
      mode = null;
      position = 0;
      pendingRebase = false;
      measure();
      paint();
      if (resumeWheel) {
        resumeWheel = false;
        clearAnimation();
        mode = "wheel";
        scrollWheel();
        return;
      }
      sync();
    };

    const measure = () => {
      const card = track.firstElementChild as HTMLElement | null;
      if (!card || pendingRebase) return;
      const nextStep =
        card.getBoundingClientRect().width +
        parseFloat(getComputedStyle(track).columnGap);
      if (Math.abs(nextStep - step) < 0.1) return;
      const previousMode = mode;
      const previousTarget = target;
      const previousWheelTarget = wheelTarget;
      cancel();
      step = nextStep;
      paint();
      if (previousMode === "manual") {
        start(previousTarget, MANUAL_DURATION, "manual");
      } else if (previousMode === "wheel") {
        mode = "wheel";
        wheelTarget = previousWheelTarget;
        scrollWheel();
      }
      sync();
    };

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      hovered = true;
      sync();
    };
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      hovered = false;
      sync();
    };
    const onFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      focused =
        root.contains(target) &&
        !target?.closest("[data-auto-rotation-control]");
      sync();
    };
    const onBlur = (event: FocusEvent) => {
      focused = root.contains(event.relatedTarget as Node | null);
      sync();
    };
    const onPreference = () => {
      setMotionReduced(preference.matches);
      if (preference.matches && !pendingRebase) {
        const previousMode = mode;
        const previousTarget = target;
        if (previousMode === "wheel") {
          stopWheelLoop();
          position = Math.max(-1, Math.min(1, wheelTarget));
          paint();
          if (Math.abs(position) === 1) {
            crossWheelBoundary(position);
          } else {
            finishWheel();
          }
          return;
        }
        cancel();
        if (previousMode === "manual") {
          finish(previousTarget);
          return;
        }
      }
      sync();
    };

    const setPaused = (paused: boolean) => {
      autoPausedRef.current = paused;
      setAutoPaused(paused);
      sync();
    };

    const toggleAuto = () => {
      if (preference.matches) return;
      setPaused(!autoPausedRef.current);
    };

    const resumeAuto = () => {
      if (autoPausedRef.current) setPaused(false);
    };
    const onWheel = (event: WheelEvent) => {
      if (!hovered || event.ctrlKey || count < 2) return;
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      if (!delta) return;
      event.preventDefault();
      event.stopPropagation();
      if (!step) return;
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? viewport.clientHeight
            : 1;
      if (mode !== "wheel") {
        const interruptedManual = mode === "manual";
        cancel();
        if (interruptedManual) setManualMoving(false);
        mode = "wheel";
        wheelTarget = position;
      }
      wheelTarget += (delta * unit * WHEEL_SENSITIVITY) / step;
      setAutoRunning(false);
      if (!pendingRebase) scrollWheel();
    };

    const releaseTouch = () => {
      if (
        touchPointerId !== null &&
        viewport.hasPointerCapture(touchPointerId)
      ) {
        viewport.releasePointerCapture(touchPointerId);
      }
      touchPointerId = null;
      touchAxis = null;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (
        event.pointerType !== "touch" ||
        touchPointerId !== null ||
        pendingRebase ||
        count < 2
      ) {
        return;
      }

      stopWheelLoop();
      cancel();
      setAutoRunning(false);
      suppressClick = false;
      touchPointerId = event.pointerId;
      touchStartX = event.clientX;
      touchStartY = event.clientY;
      touchStartPosition = position;
      touchAxis = null;
      try {
        viewport.setPointerCapture(event.pointerId);
      } catch {
        // Synthetic pointer events used by tests cannot always be captured.
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (
        event.pointerType !== "touch" ||
        event.pointerId !== touchPointerId ||
        touchAxis === "vertical"
      ) {
        return;
      }

      const deltaX = event.clientX - touchStartX;
      const deltaY = event.clientY - touchStartY;
      if (!touchAxis && Math.hypot(deltaX, deltaY) > 8) {
        touchAxis =
          Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
        if (touchAxis === "vertical") {
          releaseTouch();
          sync();
          return;
        }
      }

      if (touchAxis !== "horizontal" || !step) return;
      event.preventDefault();
      const maxDrag = step * 0.9;
      const drag = Math.max(-maxDrag, Math.min(maxDrag, deltaX));
      position = touchStartPosition - drag / step;
      paint();
      track.dataset.animating = "true";
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || event.pointerId !== touchPointerId) {
        return;
      }

      const deltaX = event.clientX - touchStartX;
      if (touchAxis === "horizontal") {
        event.preventDefault();
        const threshold = Math.max(40, step * 0.2);
        const direction = deltaX < -threshold ? 1 : deltaX > threshold ? -1 : 0;
        releaseTouch();
        if (direction) {
          suppressClick = true;
          move(direction);
        } else {
          position = touchStartPosition;
          paint();
          sync();
        }
        return;
      }

      releaseTouch();
      sync();
    };

    const onPointerCancel = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || event.pointerId !== touchPointerId) {
        return;
      }
      position = touchStartPosition;
      paint();
      releaseTouch();
      sync();
    };

    const onClick = (event: MouseEvent) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    };

    controllerRef.current = { move, rebase, toggleAuto, resumeAuto };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    intersectionObserver.observe(viewport);
    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocus);
    root.addEventListener("focusout", onBlur);
    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove, { passive: false });
    viewport.addEventListener("pointerup", onPointerUp, { passive: false });
    viewport.addEventListener("pointercancel", onPointerCancel);
    viewport.addEventListener("click", onClick, true);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", onPreference);

    return () => {
      stopWheelLoop();
      cancel();
      controllerRef.current = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocus);
      root.removeEventListener("focusout", onBlur);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerCancel);
      viewport.removeEventListener("click", onClick, true);
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", onPreference);
    };
  }, [count]);

  useLayoutEffect(() => {
    controllerRef.current?.rebase();
  }, [index]);

  return {
    rootRef,
    trackRef,
    index,
    manualMoving,
    autoRunning,
    autoPaused,
    motionReduced,
    move: (direction: number) => controllerRef.current?.move(direction),
    toggleAuto: () => controllerRef.current?.toggleAuto(),
    resumeAuto: () => controllerRef.current?.resumeAuto(),
  };
}
