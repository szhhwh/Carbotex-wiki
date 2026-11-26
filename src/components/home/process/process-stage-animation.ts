import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MotionClock,
  observeVisibility,
  syncAmbientPlayback,
  type HomeMotion,
} from "../motion";
import {
  BOTTLE_CROSSING,
  BOTTLE_RIBBON_SWEEPS,
  MALIC_SWEEPS,
  RIBBON_SPAN,
  RIBBON_TIP_VIEW,
  TIME,
} from "./process-stage-data";
import { getStageTargets, measureStage } from "./process-stage-layout";
import {
  addFermentation,
  addHydrolysis,
  addProduct,
} from "./process-stage-timeline";
import { createSweepRenderer, sweepY } from "./sweep";

const RIBBON_REACH = Array.from({ length: 201 }, (_, index) =>
  sweepY(MALIC_SWEEPS[0], index / 200),
);
const clampProgress = gsap.utils.clamp(0, 1);
for (let index = 1; index < RIBBON_REACH.length; index++) {
  RIBBON_REACH[index] = Math.max(RIBBON_REACH[index], RIBBON_REACH[index - 1]);
}

function ribbonReach(progress: number) {
  const sample = progress * (RIBBON_REACH.length - 1);
  const index = Math.min(Math.floor(sample), RIBBON_REACH.length - 2);
  return (
    RIBBON_REACH[index] +
    (RIBBON_REACH[index + 1] - RIBBON_REACH[index]) * (sample - index)
  );
}

export function animateProcessStage(track: HTMLElement, motion: HomeMotion) {
  const targets = getStageTargets(track);
  const { stage, world, thermo, thermoBob, bubbles, rising } = targets;
  const stopObservingLayout = motion.observeLayout(
    stage,
    world,
    ...targets.sugars.map(({ element }) => element),
  );
  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    const measure = () => measureStage(targets);
    let layout = measure();
    const refreshLayout = () => {
      layout = measure();
    };
    ScrollTrigger.addEventListener("refreshInit", refreshLayout);

    gsap.set(world, { y: 0 });
    const setWorldY = gsap.quickSetter(world, "y", "px");
    let lastCameraY = 0;
    const drawRibbon = createSweepRenderer(targets.ribbon, MALIC_SWEEPS);
    const drawBottleRibbon = createSweepRenderer(
      targets.bottleRibbon,
      BOTTLE_RIBBON_SWEEPS,
    );
    drawRibbon(0);
    drawBottleRibbon(0);
    gsap.set(targets.firstCopy, { autoAlpha: 0, y: 40 });
    gsap.set(targets.haystacks, { autoAlpha: 0, scaleX: 0.6, scaleY: 0 });
    gsap.set(thermo, { autoAlpha: 0, y: 120 });
    gsap.set(
      targets.sugars.map(({ element }) => element),
      { autoAlpha: 0, scale: 0 },
    );
    gsap.set([targets.secondCopy, targets.finalCopy], { autoAlpha: 0, y: 30 });
    gsap.set(
      [
        targets.painter,
        targets.bottle,
        targets.bag,
        targets.shadow,
        bubbles,
        targets.ribbon,
        targets.bottleRibbon,
      ],
      { autoAlpha: 0 },
    );

    const sequence = gsap.timeline({
      defaults: { ease: "none", immediateRender: false },
      scrollTrigger: {
        trigger: track,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    const camera = { y: 0 };
    sequence
      .fromTo(
        camera,
        { y: 0 },
        { y: () => layout.cameraFirst, duration: 0.3, ease: "sine.inOut" },
        TIME.pin,
      )
      .fromTo(
        camera,
        { y: () => layout.cameraFirst },
        { y: () => layout.cameraYeast, duration: 1.4, ease: "power2.inOut" },
        TIME.fall,
      )
      .fromTo(
        camera,
        { y: () => layout.cameraYeast },
        { y: () => layout.cameraPainter, duration: 0.6, ease: "sine.inOut" },
        TIME.painter - 0.1,
      );
    const getLayout = () => layout;
    addHydrolysis(sequence, targets, getLayout);
    addFermentation(sequence, targets, getLayout);
    addProduct(sequence, targets);
    const updateCamera = (time: number, progress: number) => {
      let y = time < TIME.pin ? 0 : camera.y;
      if (time >= TIME.ribbon) {
        const tip =
          layout.ribbonTop + ribbonReach(progress) * layout.ribbonScale;
        y = gsap.utils.clamp(
          layout.cameraEnd,
          layout.cameraPainter,
          layout.height * RIBBON_TIP_VIEW - tip,
        );
      }
      if (y !== lastCameraY) {
        setWorldY(y);
        lastCameraY = y;
      }
    };

    const bob = gsap.to(thermoBob, {
      y: -14,
      rotation: 2,
      duration: 1.6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      paused: true,
    });
    const bubbleLoop = gsap.timeline({ paused: true });
    rising.forEach((bubble, index) => {
      const duration = 3.6 + ((index * 7) % 5) * 0.55;
      bubbleLoop
        .fromTo(
          bubble,
          { y: 0, opacity: 0 },
          {
            keyframes: {
              "0%": { y: 0, opacity: 0 },
              "18%": { opacity: 1 },
              "70%": { opacity: 1 },
              "100%": { y: () => layout.bubbleRise, opacity: 0 },
              easeEach: "none",
            },
            duration,
            repeat: -1,
            repeatRefresh: true,
            ease: "none",
          },
          (index * 0.83) % duration,
        )
        .to(
          bubble,
          {
            x: index % 2 ? 10 : -10,
            duration: duration / 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          0,
        );
    });

    let thermoVisible = false;
    let bubblesVisible = false;
    let stageActive = false;
    const clock = new MotionClock(12);
    const syncLoops = (time = sequence.time()) => {
      syncAmbientPlayback(
        bob,
        stageActive && thermoVisible && time >= 0.6,
        clock,
      );
      syncAmbientPlayback(
        bubbleLoop,
        stageActive && bubblesVisible && time >= TIME.bottle + 0.32,
        clock,
      );
    };
    const update = () => {
      const time = sequence.time();
      const progress = clampProgress((time - TIME.ribbon) / RIBBON_SPAN);
      const [crossFrom, crossTo] = BOTTLE_CROSSING;
      drawRibbon(progress);
      drawBottleRibbon(
        clampProgress((progress - crossFrom) / (crossTo - crossFrom)),
      );
      updateCamera(time, progress);
      syncLoops(time);
    };
    sequence.eventCallback("onUpdate", update);
    ScrollTrigger.addEventListener("refresh", update);
    const updateStage = (trigger: ScrollTrigger) => {
      stageActive = Boolean(trigger.isActive);
      clock.setActive(stageActive);
      syncLoops();
    };
    ScrollTrigger.create({
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      onToggle: updateStage,
      onRefresh: updateStage,
    });
    update();
    const stopObserving = observeVisibility(
      new Map([
        [
          thermo,
          (visible) => {
            thermoVisible = visible;
            syncLoops();
          },
        ],
        [
          bubbles,
          (visible) => {
            bubblesVisible = visible;
            syncLoops();
          },
        ],
      ]),
    );

    return () => {
      stopObserving();
      ScrollTrigger.removeEventListener("refreshInit", refreshLayout);
      ScrollTrigger.removeEventListener("refresh", update);
      drawRibbon(1);
      drawBottleRibbon(1);
    };
  });

  return () => {
    stopObservingLayout();
    media.revert();
  };
}
