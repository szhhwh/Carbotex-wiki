import { useLayoutEffect, useRef, type CSSProperties } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { staticHomeAsset } from "../../../utils/staticAsset";
import {
  FIELD_HEIGHT,
  FIELD_SUGARS,
  FIELD_WIDTH,
  HAYSTACK_BASE,
  HAYSTACK_CLUSTERS,
  YEAST_COUNT,
} from "./process-field";
import { StrokeRevealImage, type RevealStroke } from "./StrokeRevealImage";
import styles from "./process-stage.module.css";

/** Uploaded artwork: flat files in the wiki's home/ upload folder. */
const haystacksUrl = staticHomeAsset("haystacks.svg");
const hillsUrl = staticHomeAsset("hills.svg");
/** Two source folders used this name; the upload prefixed the folder. */
const thermocellumUrl = staticHomeAsset("home__p7__thermocellum.svg");
const bubbles1Url = staticHomeAsset("bubbles-1.svg");
const bubbles2Url = staticHomeAsset("bubbles-2.svg");
const bubbles3Url = staticHomeAsset("bubbles-3.svg");
const bubbles4Url = staticHomeAsset("bubbles-4.svg");
const bubbles5Url = staticHomeAsset("bubbles-5.svg");
const glueBagRibbonUrl = staticHomeAsset("glue-bag-ribbon.svg");
const glueBagUrl = staticHomeAsset("glue-bag.svg");
const glueBottleRibbonUrl = staticHomeAsset("glue-bottle-ribbon.svg");
const glueBottleUrl = staticHomeAsset("glue-bottle.svg");
const malicRibbonUrl = staticHomeAsset("malic-ribbon.svg");
const shadowUrl = staticHomeAsset("shadow.svg");
const waveUrl = staticHomeAsset("wave.svg");
const yeastLeftUrl = staticHomeAsset("yeast-left.svg");
const yeastPainterUrl = staticHomeAsset("yeast-painter.svg");
const yeastProneUrl = staticHomeAsset("yeast-prone.svg");
const yeastRestUrl = staticHomeAsset("yeast-rest.svg");
const yeastRightUrl = staticHomeAsset("yeast-right.svg");

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll choreography in time units (1 unit = 100svh of scroll). The master
 * timeline runs from the track entering the viewport ("top bottom", t = 0)
 * to the end of the sticky stage; the stage pins at t = 1.
 */
const TIME = {
  pin: 1,
  hydrolysis: 1.25,
  fall: 3,
  yeastHold: 4.35,
  painter: 5.6,
  ribbon: 6.05,
  bottle: 7.5,
  bag: 9.1,
  end: 10.5,
} as const;

/** Keeps framed content clear of the fixed site navbar (4.5rem + margin). */
const NAV_SAFE_TOP = 88;

/** Yeast poses in the order each cell cycles through while eating. */
const YEAST_POSES = [
  { src: yeastLeftUrl, width: 266.53, height: 238.65 },
  { src: yeastRestUrl, width: 229.07, height: 238.63 },
  { src: yeastRightUrl, width: 266.45, height: 238.67 },
  { src: yeastProneUrl, width: 260.96, height: 182.93 },
] as const;
/** Starting pose per slot, matching the design row (left, rest, right, prone, left). */
const YEAST_INITIAL_POSE = [0, 1, 2, 3, 0] as const;
const YEAST_BEATS = [3.55, 3.95, 4.5, 4.85, 5.2] as const;

/** Mask centre lines of malic-ribbon.svg: brush tip, fan, body, tail. */
const RIBBON_STROKES: readonly RevealStroke[] = [
  {
    d: "M1280,512 C1370,500 1450,470 1510,420",
    width: 110,
  },
  {
    d: "M1510,420 C1600,340 1600,260 1560,250 C1520,140 1400,85 1250,70",
    width: 390,
  },
  {
    d: "M1250,70 C1060,60 900,90 780,190 C640,310 560,380 380,450 C220,510 60,560 70,720 C80,840 230,860 360,880 C480,900 600,940 640,1060 C680,1170 690,1250 760,1360",
    width: 250,
  },
  {
    d: "M760,1360 C830,1480 1000,1570 1150,1660 C1290,1745 1200,1790 1050,1850 C900,1910 720,1930 740,1975 C770,2030 950,2080 1040,2105",
    width: 140,
  },
];
/** Share of the timeline each ribbon stroke takes (tip, fan, body, tail). */
const RIBBON_DURATIONS = [0.18, 0.38, 0.98, 0.66] as const;

const BUBBLE_GROUPS = [
  { src: bubbles1Url, width: 73.61, height: 231.75, left: 4, top: 30 },
  { src: bubbles2Url, width: 204.47, height: 355.11, left: 14, top: 8 },
  { src: bubbles3Url, width: 158.21, height: 247.49, left: 76, top: 22 },
  { src: bubbles4Url, width: 106.03, height: 260.13, left: 88, top: 4 },
  { src: bubbles5Url, width: 164.05, height: 141.02, left: 56, top: 0 },
] as const;
/** Loose single bubbles (percent of the bubble area; size in group units). */
const LOOSE_BUBBLES = [
  [2, 70, 18],
  [9, 52, 11],
  [21, 78, 15],
  [27, 40, 9],
  [33, 64, 13],
  [62, 70, 10],
  [68, 44, 16],
  [73, 82, 12],
  [81, 60, 9],
  [92, 74, 14],
  [96, 38, 10],
  [44, 18, 8],
] as const;

function offsetWithin(element: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

function queryAll<T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string,
): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

export function ProcessStage() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const q = (selector: string) =>
        track.querySelector(selector) as HTMLElement;
      const stage = q("[data-stage]");
      const world = q("[data-world]");
      const firstStage = q("[data-first-stage]");
      const secondStage = q("[data-second-stage]");
      const firstCopy = q("[data-first-copy]");
      const firstScene = q("[data-first-scene]");
      const hills = q("[data-hills]");
      const field = q("[data-field]");
      const thermo = q("[data-thermo]");
      const thermoBob = q("[data-thermo-bob]");
      const secondCopy = q("[data-second-copy]");
      const yeastRow = q("[data-yeast-row]");
      const slots = queryAll(track, "[data-yeast-slot]");
      const ribbonGroup = q("[data-ribbon-group]");
      const ribbon = q("[data-ribbon]");
      const ribbonStrokes = queryAll<SVGPathElement>(
        ribbon,
        "[data-reveal-stroke]",
      );
      const painter = q("[data-painter]");
      const painterBrush = q("[data-painter-brush]");
      const shadow = q("[data-shadow]");
      const bottle = q("[data-bottle]");
      const bottleRibbon = q("[data-bottle-ribbon]");
      const bag = q("[data-bag]");
      const bagRibbon = q("[data-bag-ribbon]");
      const bubbles = q("[data-bubbles]");
      const finalCopy = q("[data-final-copy]");
      const haystacks = queryAll(track, "[data-haystack]");
      const sugars = queryAll(track, "[data-sugar]");

      // ---- camera framing (px, measured from layout, never transforms) ----
      const top = (el: HTMLElement) => offsetWithin(el, world).y;
      const bottom = (el: HTMLElement) => top(el) + el.offsetHeight;
      const maxCamera = () =>
        Math.max(0, world.offsetHeight - stage.clientHeight);
      /** World translateY that frames [from, to], kept below the navbar. */
      const frame = (from: number, to: number, within?: HTMLElement) => {
        const height = stage.clientHeight;
        let camera = Math.min((from + to - height) / 2, from - NAV_SAFE_TOP);
        if (within) {
          const start = top(within);
          camera = gsap.utils.clamp(
            start,
            Math.max(start, start + within.offsetHeight - height),
            camera,
          );
        }
        return -gsap.utils.clamp(0, maxCamera(), camera);
      };
      const cameraFirst = () =>
        frame(top(firstCopy), bottom(firstStage), firstStage);
      const cameraYeast = () =>
        frame(
          top(secondCopy),
          bottom(yeastRow) + stage.clientHeight * 0.06,
          secondStage,
        );
      const cameraPainter = () =>
        frame(top(ribbonGroup), bottom(painter), secondStage);
      const cameraEnd = () => -maxCamera();

      // ---- sugar geometry ----
      const sugarData = (el: HTMLElement) =>
        FIELD_SUGARS[Number(el.dataset.sugar)];
      /** Offset from a sugar's resting box to the heart of its haystack. */
      const popOrigin = (el: HTMLElement) => {
        const sugar = sugarData(el);
        const cluster = HAYSTACK_CLUSTERS[sugar.cluster];
        const scale = field.offsetWidth / FIELD_WIDTH;
        return {
          x:
            ((cluster.x0 + cluster.x1) / 2) * scale -
            (el.offsetLeft + el.offsetWidth / 2),
          y:
            HAYSTACK_BASE * 0.78 * scale - (el.offsetTop + el.offsetHeight / 2),
        };
      };
      /** Offset from a sugar's resting box to its yeast's mouth. */
      const fallOffset = (el: HTMLElement) => {
        const sugar = sugarData(el);
        const slot = slots[sugar.yeast];
        const from = offsetWithin(el, world);
        const to = offsetWithin(slot, world);
        const spread = (sugar.fallOrder - 0.5) * slot.offsetWidth * 0.3;
        return {
          x: to.x + slot.offsetWidth / 2 + spread - from.x - el.offsetWidth / 2,
          y: to.y + slot.offsetHeight * 0.45 - from.y - el.offsetHeight / 2,
        };
      };

      // ---- initial states (everything the static design does not show) ----
      gsap.set(firstCopy, { autoAlpha: 0, y: 40 });
      gsap.set(haystacks, { autoAlpha: 0, scaleX: 0.6, scaleY: 0 });
      gsap.set(thermo, { autoAlpha: 0, y: 120 });
      gsap.set(sugars, { autoAlpha: 0, scale: 0 });
      gsap.set([secondCopy, finalCopy], { autoAlpha: 0, y: 30 });
      gsap.set([painter, bottle, bag, shadow, bubbles], { autoAlpha: 0 });
      gsap.set([ribbon, bottleRibbon, bagRibbon], { autoAlpha: 0 });
      gsap.set(ribbonStrokes, { strokeDashoffset: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none", immediateRender: false },
        scrollTrigger: {
          trigger: track,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // ---- entry (t 0 → 1): the field scrolls in and the straw grows ----
      tl.fromTo(
        firstCopy,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
        0.05,
      )
        .fromTo(
          hills,
          { y: () => field.offsetHeight * 0.18 },
          { y: 0, duration: 0.85, ease: "power1.out" },
          0,
        )
        .fromTo(
          thermo,
          { autoAlpha: 0, y: 120 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" },
          0.6,
        );
      haystacks.forEach((haystack, index) => {
        tl.fromTo(
          haystack,
          { autoAlpha: 0, scaleX: 0.6, scaleY: 0 },
          {
            autoAlpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 0.32,
            ease: "back.out(1.8)",
          },
          0.3 + index * 0.1,
        );
      });

      // ---- P7 hydrolysis (pinned): straw dissolves right → left ----
      tl.fromTo(
        firstScene,
        { scale: 1 },
        { scale: 1.06, duration: 0.85, ease: "sine.inOut" },
        TIME.hydrolysis - 0.1,
      )
        .fromTo(
          firstScene,
          { scale: 1.06 },
          { scale: 1, duration: 0.6, ease: "sine.inOut" },
          TIME.fall - 0.7,
        )
        .fromTo(
          thermo,
          { rotation: 0, scale: 1 },
          {
            rotation: -8,
            scale: 1.06,
            duration: 0.25,
            ease: "sine.inOut",
            repeat: 3,
            yoyo: true,
          },
          TIME.hydrolysis,
        )
        .fromTo(
          firstCopy,
          { y: 0 },
          { y: () => -field.offsetHeight * 0.06, duration: 1.6 },
          TIME.pin,
        );
      [...haystacks].reverse().forEach((haystack, order) => {
        const at = TIME.hydrolysis + 0.1 + order * 0.18;
        const cluster = Number(haystack.dataset.haystack);
        tl.fromTo(
          haystack,
          { rotation: 0 },
          { rotation: -3, duration: 0.05, repeat: 1, yoyo: true },
          at,
        ).fromTo(
          haystack,
          { autoAlpha: 1, scaleX: 1, scaleY: 1 },
          {
            autoAlpha: 0,
            scaleX: 1.2,
            scaleY: 0.05,
            duration: 0.34,
            ease: "power2.in",
          },
          at + 0.08,
        );
        const clusterSugars = sugars.filter(
          (el) => sugarData(el).cluster === cluster,
        );
        tl.fromTo(
          clusterSugars,
          {
            autoAlpha: 0,
            scale: 0,
            x: (_, el: HTMLElement) => popOrigin(el).x,
            y: (_, el: HTMLElement) => popOrigin(el).y,
          },
          {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.42,
            ease: "back.out(2.2)",
            stagger: { amount: 0.22, from: "random" },
          },
          at + 0.18,
        );
      });
      const sugarArt = sugars.map((el) => el.firstElementChild as HTMLElement);
      tl.fromTo(
        sugarArt,
        { y: 0, rotation: (index) => FIELD_SUGARS[index].rotate },
        {
          y: (index) => -FIELD_SUGARS[index].drift * field.offsetHeight,
          rotation: (index) => FIELD_SUGARS[index].rotate + 25,
          duration: 1.1,
          ease: "sine.inOut",
        },
        TIME.hydrolysis + 0.9,
      );

      // ---- fall (t 3 → 4.4): camera dives into P8, yeasts eat the sugars ----
      tl.fromTo(
        world,
        { y: 0 },
        { y: cameraFirst, duration: 0.3, ease: "sine.inOut" },
        TIME.pin,
      ).fromTo(
        world,
        { y: cameraFirst },
        { y: cameraYeast, duration: 1.4, ease: "power2.inOut" },
        TIME.fall,
      );
      sugars.forEach((el) => {
        const sugar = sugarData(el);
        const at = TIME.fall + 0.05 + sugar.fallOrder * 0.65;
        tl.fromTo(
          el,
          { x: 0 },
          { x: () => fallOffset(el).x, duration: 0.7, ease: "sine.inOut" },
          at,
        )
          .fromTo(
            el,
            { y: 0 },
            { y: () => fallOffset(el).y, duration: 0.7, ease: "power2.in" },
            at,
          )
          .fromTo(
            el,
            { rotation: 0 },
            { rotation: sugar.rotate > 0 ? 160 : -160, duration: 0.7 },
            at,
          )
          .fromTo(
            el,
            { scale: 1, autoAlpha: 1 },
            { scale: 0.2, autoAlpha: 0, duration: 0.12, ease: "power1.in" },
            at + 0.62,
          );
      });
      tl.fromTo(
        secondCopy,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
        TIME.fall + 1.3,
      );

      // Yeasts hop and swap poses on each beat while they eat.
      const poseOf = (slot: number, beat: number) =>
        (YEAST_INITIAL_POSE[slot] + beat) % YEAST_POSES.length;
      YEAST_BEATS.forEach((beat, beatIndex) => {
        slots.forEach((slot, slotIndex) => {
          const at = beat + slotIndex * 0.04;
          const body = slot.firstElementChild as HTMLElement;
          const poses = queryAll(slot, "[data-pose]");
          tl.fromTo(
            body,
            { y: 0, scaleX: 1, scaleY: 1 },
            {
              y: () => -slot.offsetHeight * 0.16,
              scaleX: 0.95,
              scaleY: 1.06,
              duration: 0.09,
              ease: "power1.out",
              repeat: 1,
              yoyo: true,
            },
            at,
          )
            .set(
              poses[poseOf(slotIndex, beatIndex)],
              { autoAlpha: 0 },
              at + 0.09,
            )
            .set(
              poses[poseOf(slotIndex, beatIndex + 1)],
              { autoAlpha: 1 },
              at + 0.09,
            );
        });
      });

      // ---- painter (t 5.6): the row leaves, the overalls yeast arrives ----
      tl.fromTo(
        secondCopy,
        { autoAlpha: 1, y: 0 },
        { autoAlpha: 0, y: -30, duration: 0.35 },
        TIME.painter - 0.2,
      )
        .fromTo(
          slots,
          { autoAlpha: 1, scale: 1, y: 0 },
          {
            autoAlpha: 0,
            scale: 0.7,
            y: 40,
            duration: 0.35,
            stagger: 0.03,
            ease: "power1.in",
          },
          TIME.painter - 0.2,
        )
        .fromTo(
          world,
          { y: cameraYeast },
          { y: cameraPainter, duration: 0.6, ease: "sine.inOut" },
          TIME.painter - 0.1,
        )
        .fromTo(
          painter,
          { autoAlpha: 0, scale: 0.4, rotation: -25, y: 60 },
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.6)",
          },
          TIME.painter,
        );

      // ---- ribbon (t 6.05 → 8.25): paint starts at the brush and sweeps down ----
      tl.fromTo(
        ribbon,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.01 },
        TIME.ribbon,
      )
        .fromTo(
          painterBrush,
          { rotation: 0 },
          {
            rotation: 5,
            duration: 0.18,
            repeat: 6,
            yoyo: true,
            ease: "sine.inOut",
          },
          TIME.ribbon,
        )
        .to(
          ribbon,
          {
            keyframes: [
              { rotation: 1.1, skewX: 1.1, duration: 0.45 },
              { rotation: -0.8, skewX: -0.8, duration: 0.55 },
              { rotation: 0, skewX: 0, duration: 0.55 },
            ],
            ease: "sine.inOut",
          },
          TIME.ribbon + 0.08,
        );
      let strokeAt = TIME.ribbon;
      ribbonStrokes.forEach((stroke, index) => {
        tl.fromTo(
          stroke,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: RIBBON_DURATIONS[index],
            ease: index < 2 ? "power1.inOut" : "none",
          },
          strokeAt,
        );
        strokeAt += RIBBON_DURATIONS[index];
      });
      tl.fromTo(
        world,
        { y: cameraPainter },
        { y: cameraEnd, duration: 1.85, ease: "power1.inOut" },
        TIME.ribbon + 0.55,
      );

      // ---- bottle (t 7.5): the back ribbon reaches the bottle, then the front crosses it ----
      tl.fromTo(
        shadow,
        { autoAlpha: 0, scaleX: 0.4 },
        { autoAlpha: 1, scaleX: 1, duration: 0.4, ease: "power2.out" },
        TIME.bottle - 0.05,
      )
        .fromTo(
          bottle,
          { autoAlpha: 0, y: 80, scale: 0.85 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.4)",
          },
          TIME.bottle,
        )
        .fromTo(
          bottleRibbon,
          { autoAlpha: 0, clipPath: "inset(0% 0% 0% 100%)" },
          {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.32,
            ease: "power1.inOut",
          },
          TIME.bottle + 0.46,
        )
        .fromTo(
          bubbles,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4 },
          TIME.bottle + 0.32,
        )
        .fromTo(
          finalCopy,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
          TIME.bottle + 0.72,
        );

      // ---- bag (t 9.1): keep the back ribbon continuous while the package changes ----
      tl.fromTo(
        bottle,
        { autoAlpha: 1, scaleX: 1, scaleY: 1 },
        {
          autoAlpha: 0,
          scaleX: 1.1,
          scaleY: 0.8,
          duration: 0.35,
          ease: "power2.in",
        },
        TIME.bag,
      )
        .fromTo(
          bottleRibbon,
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: 0.22 },
          TIME.bag,
        )
        .fromTo(
          shadow,
          { scaleX: 1 },
          { scaleX: 0.86, duration: 0.5, ease: "sine.inOut" },
          TIME.bag + 0.08,
        )
        .fromTo(
          bag,
          { autoAlpha: 0, scale: 0.8, rotation: -4 },
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(1.5)",
          },
          TIME.bag + 0.16,
        )
        .fromTo(
          bagRibbon,
          { autoAlpha: 0, clipPath: "inset(0% 0% 0% 100%)" },
          {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.3,
            ease: "power1.inOut",
          },
          TIME.bag + 0.58,
        )
        .set({}, {}, TIME.end);

      // ---- idle loops: bobbing thermocellum, rising bubbles ----
      const loops = gsap.timeline({ paused: true });
      loops.to(
        thermoBob,
        {
          y: -14,
          rotation: 2,
          duration: 1.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        },
        0,
      );
      const rising = queryAll(bubbles, "[data-bubble]");
      rising.forEach((bubble, index) => {
        const duration = 3.6 + ((index * 7) % 5) * 0.55;
        loops
          .fromTo(
            bubble,
            { y: 0, opacity: 0 },
            {
              keyframes: {
                "0%": { y: 0, opacity: 0 },
                "18%": { opacity: 1 },
                "70%": { opacity: 1 },
                "100%": { y: () => -bubbles.offsetHeight * 0.9, opacity: 0 },
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
      loops.time(12);
      ScrollTrigger.create({
        trigger: track,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? loops.resume() : loops.pause()),
        onRefresh: (self) => (self.isActive ? loops.resume() : loops.pause()),
      });

      return () => loops.kill();
    });

    return () => media.revert();
  }, []);

  return (
    <div
      ref={trackRef}
      className={styles.track}
      style={{ "--process-track-units": TIME.end } as CSSProperties}
    >
      <div className={styles.stage} data-stage="">
        <div className={styles.world} data-world="">
          <FirstStage />
          <SecondStage />
        </div>
      </div>
    </div>
  );
}

function FirstStage() {
  return (
    <section className={styles.firstStage} data-first-stage="">
      <p className={clsx(styles.copy, styles.firstCopy)} data-first-copy="">
        <span>In the first stage,</span>{" "}
        <span>
          engineered <i>Clostridium thermocellum</i> simultaneously hydrolyzes
          the lignocellulose
        </span>{" "}
        <span>in straw into glucose and xylose.</span>
      </p>
      <div className={styles.firstScene} data-first-scene="">
        <img
          className={clsx(styles.art, styles.hills)}
          src={hillsUrl}
          width={1921.76}
          height={225.24}
          alt=""
          draggable={false}
          data-hills=""
        />
        <div className={styles.field} data-field="">
          {HAYSTACK_CLUSTERS.map((cluster, index) => {
            const width = cluster.x1 - cluster.x0;
            return (
              <div
                key={cluster.x0}
                className={styles.haystack}
                style={{
                  left: `${(cluster.x0 / FIELD_WIDTH) * 100}%`,
                  width: `${(width / FIELD_WIDTH) * 100}%`,
                }}
                data-haystack={index}
              >
                <img
                  className={styles.art}
                  src={haystacksUrl}
                  width={FIELD_WIDTH}
                  height={FIELD_HEIGHT}
                  alt=""
                  draggable={false}
                  style={{
                    left: `${(-cluster.x0 / width) * 100}%`,
                    width: `${(FIELD_WIDTH / width) * 100}%`,
                  }}
                />
              </div>
            );
          })}
          {FIELD_SUGARS.map((sugar, index) => (
            <div
              key={sugar.id}
              className={styles.sugar}
              style={{
                left: `${sugar.left}%`,
                top: `${sugar.top}%`,
                width: `${sugar.width}%`,
                opacity: sugar.src.includes("beige") ? 0.85 : undefined,
              }}
              data-sugar={index}
            >
              <img
                className={styles.art}
                src={sugar.src}
                alt=""
                draggable={false}
                style={{ width: "100%" }}
              />
            </div>
          ))}
          <div className={styles.thermo} data-thermo="">
            <div data-thermo-bob="">
              <img
                className={styles.art}
                src={thermocellumUrl}
                width={279.92}
                height={413.75}
                alt=""
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecondStage() {
  return (
    <section className={styles.secondStage} data-second-stage="">
      <img
        className={clsx(styles.art, styles.wave)}
        src={waveUrl}
        width={1924.09}
        height={470.4}
        alt=""
        draggable={false}
      />
      <div className={styles.secondContent}>
        <p className={clsx(styles.copy, styles.secondCopy)} data-second-copy="">
          In the second stage, the engineered marine yeast{" "}
          <i>Aureobasidium pullulans</i> A08 is used. By overexpressing
          AraR/XlnR, xylose utilization is significantly enhanced, while
          overexpression of the best-performing PYC gene increases malic acid
          precursor supply, efficiently converting the mixed sugars into
          high-molecular-weight polymalic acid.
        </p>
        <div className={styles.yeastRow} data-yeast-row="">
          {Array.from({ length: YEAST_COUNT }, (_, slot) => (
            <div
              key={slot}
              className={styles.yeastSlot}
              style={{ "--slot": slot } as CSSProperties}
              data-yeast-slot={slot}
            >
              <div>
                {YEAST_POSES.map((pose, poseIndex) => (
                  <img
                    key={pose.src}
                    className={clsx(styles.art, styles.pose)}
                    src={pose.src}
                    width={pose.width}
                    height={pose.height}
                    alt=""
                    draggable={false}
                    style={
                      {
                        "--pose-width": `${(pose.width / 266.53) * 100}%`,
                      } as CSSProperties
                    }
                    data-pose={poseIndex}
                    data-initial={
                      YEAST_INITIAL_POSE[slot] === poseIndex ? "" : undefined
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.ribbonGroup} data-ribbon-group="">
          <div className={styles.ribbon} data-ribbon="">
            <StrokeRevealImage
              className={styles.ribbonArt}
              src={malicRibbonUrl}
              width={1747.1}
              height={2102.57}
              strokes={RIBBON_STROKES}
            />
          </div>
          <div className={styles.painter} data-painter="">
            <div data-painter-brush="" style={{ transformOrigin: "8% 20%" }}>
              <img
                className={styles.art}
                src={yeastPainterUrl}
                width={432.37}
                height={371.19}
                alt=""
                draggable={false}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <img
            className={clsx(styles.art, styles.shadow)}
            src={shadowUrl}
            width={586.72}
            height={169.6}
            alt=""
            draggable={false}
            data-shadow=""
          />
          <img
            className={clsx(styles.art, styles.bottle)}
            src={glueBottleUrl}
            width={297.7}
            height={792.94}
            alt=""
            draggable={false}
            data-bottle=""
          />
          <img
            className={clsx(styles.art, styles.bag)}
            src={glueBagUrl}
            width={463.58}
            height={594.52}
            alt=""
            draggable={false}
            data-bag=""
          />
          <img
            className={clsx(styles.art, styles.bottleRibbon)}
            src={glueBottleRibbonUrl}
            width={296.68}
            height={104.6}
            alt=""
            draggable={false}
            data-bottle-ribbon=""
          />
          <img
            className={clsx(styles.art, styles.bagRibbon)}
            src={glueBagRibbonUrl}
            width={249.28}
            height={112.73}
            alt=""
            draggable={false}
            data-bag-ribbon=""
          />
          <div className={styles.bubbles} data-bubbles="">
            {BUBBLE_GROUPS.map((group) => (
              <img
                key={group.src}
                className={clsx(styles.art, styles.bubbleGroup)}
                src={group.src}
                width={group.width}
                height={group.height}
                alt=""
                draggable={false}
                style={
                  {
                    left: `${group.left}%`,
                    top: `${group.top}%`,
                    "--bubble-width": `${(group.width / 1153) * 100}%`,
                  } as CSSProperties
                }
                data-bubble=""
              />
            ))}
            {LOOSE_BUBBLES.map(([left, top, size]) => (
              <span
                key={`${left}-${top}`}
                className={styles.bubble}
                style={
                  {
                    left: `${left}%`,
                    top: `${top}%`,
                    "--bubble-size": `${(size / 1153) * 100}%`,
                  } as CSSProperties
                }
                data-bubble=""
              />
            ))}
          </div>
        </div>
        <p className={clsx(styles.copy, styles.finalCopy)} data-final-copy="">
          Finally, we crosslink the polymalic acid with dopamine to obtain a
          novel green bioadhesive.
        </p>
      </div>
    </section>
  );
}
