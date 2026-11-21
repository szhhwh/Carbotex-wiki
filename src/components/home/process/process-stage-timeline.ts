import {
  BOTTLE_CROSSING,
  RIBBON_SPAN,
  TIME,
  YEAST_BEATS,
  YEAST_INITIAL_POSE,
  YEAST_POSES,
} from "./process-stage-data";
import type { StageLayout, StageTargets } from "./process-stage-layout";

type Layout = () => StageLayout;

export function addHydrolysis(
  tl: gsap.core.Timeline,
  targets: StageTargets,
  layout: Layout,
) {
  const { firstCopy, firstScene, hills, thermo, haystacks, sugars } = targets;
  // ---- entry (t 0 → 1): the field scrolls in and the straw grows ----
  tl.fromTo(
    firstCopy,
    { autoAlpha: 0, y: 40 },
    { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
    0.05,
  )
    .fromTo(
      hills,
      { y: () => layout().fieldHeight * 0.18 },
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
      { y: () => -layout().fieldHeight * 0.06, duration: 1.6 },
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
    const clusterSugars = sugars
      .filter(({ data }) => data.cluster === cluster)
      .map(({ element }) => element);
    tl.fromTo(
      clusterSugars,
      {
        autoAlpha: 0,
        scale: 0,
        x: (_, el: HTMLElement) => layout().sugarPositions.get(el)!.popX,
        y: (_, el: HTMLElement) => layout().sugarPositions.get(el)!.popY,
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
  const sugarArt = sugars.map(({ art }) => art);
  tl.fromTo(
    sugarArt,
    { y: 0, rotation: (index) => sugars[index].data.rotate },
    {
      y: (index) => -sugars[index].data.drift * layout().fieldHeight,
      rotation: (index) => sugars[index].data.rotate + 25,
      duration: 1.1,
      ease: "sine.inOut",
    },
    TIME.hydrolysis + 0.9,
  );
}

export function addFermentation(
  tl: gsap.core.Timeline,
  targets: StageTargets,
  layout: Layout,
) {
  const { sugars, secondCopy, slots } = targets;
  // ---- fall (t 3 → 4.4): camera dives into P8, yeasts eat the sugars ----
  sugars.forEach(({ element, data: sugar }) => {
    const at = TIME.fall + 0.05 + sugar.fallOrder * 0.65;
    tl.fromTo(
      element,
      { x: 0 },
      {
        x: () => layout().sugarPositions.get(element)!.fallX,
        duration: 0.7,
        ease: "sine.inOut",
      },
      at,
    )
      .fromTo(
        element,
        { y: 0 },
        {
          y: () => layout().sugarPositions.get(element)!.fallY,
          duration: 0.7,
          ease: "power2.in",
        },
        at,
      )
      .fromTo(
        element,
        { rotation: 0 },
        { rotation: sugar.rotate > 0 ? 160 : -160, duration: 0.7 },
        at,
      )
      .fromTo(
        element,
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
    slots.forEach(({ body, poses }, slotIndex) => {
      const at = beat + slotIndex * 0.04;
      tl.fromTo(
        body,
        { y: 0, scaleX: 1, scaleY: 1 },
        {
          y: () => -layout().slotBoxes[slotIndex].height * 0.16,
          scaleX: 0.95,
          scaleY: 1.06,
          duration: 0.09,
          ease: "power1.out",
          repeat: 1,
          yoyo: true,
        },
        at,
      )
        .set(poses[poseOf(slotIndex, beatIndex)], { autoAlpha: 0 }, at + 0.09)
        .set(
          poses[poseOf(slotIndex, beatIndex + 1)],
          { autoAlpha: 1 },
          at + 0.09,
        );
    });
  });
}

export function addProduct(tl: gsap.core.Timeline, targets: StageTargets) {
  const {
    secondCopy,
    slots,
    painter,
    ribbon,
    painterBrush,
    shadow,
    bottle,
    bottleRibbon,
    bubbles,
    finalCopy,
    bag,
  } = targets;
  // ---- painter (t 5.6): the row leaves, the overalls yeast arrives ----
  tl.fromTo(
    secondCopy,
    { autoAlpha: 1, y: 0 },
    { autoAlpha: 0, y: -30, duration: 0.35 },
    TIME.painter - 0.2,
  )
    .fromTo(
      slots.map(({ slot }) => slot),
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

  // ---- ribbon (t 6.1 → 9.5): paint leaves the brush and unfolds along its course ----
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
          { rotation: 1.1, skewX: 1.1, duration: 0.6 },
          { rotation: -0.8, skewX: -0.8, duration: 0.8 },
          { rotation: 0, skewX: 0, duration: 0.8 },
        ],
        ease: "sine.inOut",
      },
      TIME.ribbon + 0.08,
    );
  // ---- bottle (t 8.1): the ribbon reaches the bottle, then its tail crosses in front ----
  const crossing = TIME.ribbon + RIBBON_SPAN * BOTTLE_CROSSING[0];
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
    .set(bottleRibbon, { autoAlpha: 1 }, crossing)
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

  // ---- bag (t 10.3): keep the back ribbon continuous while the package changes ----
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
    .set({}, {}, TIME.end);
}
