import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ACT_CROSSFADE,
  MOBILE_BREAKPOINT,
  ensureScrubDuration,
  resolveLength,
  type HomeActDef,
  type HomeStageApi,
} from "./stage-math";
import styles from "./home-stage.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Central scroll stage for the home page. One long track drives a single
 * sticky viewport in which every act is stacked; the master timeline below
 * cross-fades neighbouring acts as the track scrolls. Each act receives a
 * stage API to schedule its own scrub animations on the same time axis
 * (1 unit = 100svh of scroll — see stage-math.ts).
 */
export function HomeStage({ acts }: { acts: HomeActDef[] }) {
  const stageRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const wrapperRefs = useRef<(HTMLElement | null)[]>([]);

  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [mobile, setMobile] = useState(
    () => window.matchMedia(MOBILE_BREAKPOINT).matches,
  );

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const syncReduced = (event: MediaQueryListEvent) =>
      setReduced(event.matches);
    const syncMobile = (event: MediaQueryListEvent) => setMobile(event.matches);

    reducedQuery.addEventListener("change", syncReduced);
    mobileQuery.addEventListener("change", syncMobile);

    return () => {
      reducedQuery.removeEventListener("change", syncReduced);
      mobileQuery.removeEventListener("change", syncMobile);
    };
  }, []);

  const lengths = useMemo(
    () => acts.map((act) => resolveLength(act.scrollLength, mobile)),
    [acts, mobile],
  );
  const total = useMemo(
    () => lengths.reduce((sum, length) => sum + length, 0),
    [lengths],
  );
  const cumulative = useMemo(() => {
    const starts: number[] = [];
    let acc = 0;

    for (const length of lengths) {
      starts.push(acc);
      acc += length;
    }

    return starts;
  }, [lengths]);

  // Changing the geometry (mobile breakpoint / reduced motion) remounts the
  // whole tree via the `key` below, so the timelines rebuild on fresh values.
  useLayoutEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;

    if (!stage) return;

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;
    const onTick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onTick);

    const lastIndex = acts.length - 1;
    const context = gsap.context(() => {
      const master = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      wrapperRefs.current.forEach((wrapper, i) => {
        if (!wrapper) return;

        if (i > 0) {
          // Enter: fade in from slightly below, overlapping the previous
          // act's exit window (both start at cumulative[i]) — the cross-fade.
          master.fromTo(
            wrapper,
            { autoAlpha: 0, y: () => window.innerHeight * 0.025 },
            {
              autoAlpha: 1,
              y: 0,
              duration: ACT_CROSSFADE,
              immediateRender: true,
            },
            cumulative[i],
          );
        }

        if (i < lastIndex) {
          master.to(
            wrapper,
            {
              autoAlpha: 0,
              y: () => -window.innerHeight * 0.025,
              duration: ACT_CROSSFADE,
            },
            cumulative[i] + lengths[i],
          );
        }
      });

      ensureScrubDuration(master, total);
    }, stage);

    // The parent effect runs after the acts' effects; one refresh here
    // re-lays-out every act trigger once the geometry is final.
    ScrollTrigger.refresh();

    // App adds the fullscreen-page body class in a passive effect — after
    // this layout effect — which drops the navbar-height body padding. One
    // more refresh on the next frame recomputes the trigger starts on the
    // final layout (refresh is idempotent when nothing has changed).
    let followUpRaf = 0;
    const initialRaf = requestAnimationFrame(() => {
      followUpRaf = requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelAnimationFrame(initialRaf);
      cancelAnimationFrame(followUpRaf);
      context.revert();
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced, acts, cumulative, lengths, total]);

  const api = useMemo<HomeStageApi>(() => {
    const lastIndex = acts.length - 1;
    const scrollRange = () =>
      Math.max((stageRef.current?.offsetHeight ?? 0) - window.innerHeight, 0);
    const absoluteScroll = (t: number) =>
      (stageRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY +
      (t / total) * scrollRange();

    const getActWindow = (i: number) => {
      const enterStart = cumulative[i] ?? 0;
      const perfStart = enterStart + (i === 0 ? 0 : ACT_CROSSFADE);
      const perfEnd = (cumulative[i] ?? 0) + (lengths[i] ?? 0);

      return {
        enterStart,
        perfStart,
        perfEnd,
        perfPixels: () => ((perfEnd - perfStart) / total) * scrollRange(),
        settledScroll: () => absoluteScroll(i === 0 ? 0 : perfStart),
      };
    };

    const scrollToAct = (i: number) => {
      const clamped = Math.max(0, Math.min(i, lastIndex));
      const lenis = lenisRef.current;

      if (reduced || !lenis) {
        wrapperRefs.current[clamped]?.scrollIntoView({ behavior: "auto" });
        return;
      }

      // No duration: glide with the instance lerp, matching the wheel feel.
      lenis.scrollTo(getActWindow(clamped).settledScroll());
    };

    return {
      stageRef,
      lenisRef,
      reducedMotion: reduced,
      totalScrollLength: total,
      getActWindow,
      scrollToAct,
    };
  }, [acts.length, cumulative, lengths, reduced, total]);

  return (
    <main
      ref={stageRef}
      key={`${mobile}-${reduced}`}
      className={styles.stage}
      data-home-stage=""
      style={reduced ? undefined : { height: `${(1 + total) * 100}svh` }}
    >
      <div className={styles.viewport}>
        {acts.map((act, i) => (
          <section
            key={act.id}
            ref={(el) => {
              wrapperRefs.current[i] = el;
            }}
            className={styles.act}
            data-act={act.id}
          >
            <act.Component
              actIndex={i}
              isFirst={i === 0}
              isLast={i === acts.length - 1}
              stage={api}
            />
          </section>
        ))}
      </div>
    </main>
  );
}
