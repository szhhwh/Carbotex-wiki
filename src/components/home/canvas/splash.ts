import gsap from "gsap";
import { SPLASH_ANCHORS } from "../geometry";

const fadeIn = gsap.parseEase("back.out(2.4)");
const fadeOut = gsap.parseEase("power1.in");
const drift = gsap.parseEase("sine.out");

function sampleSplash(after: number) {
  const anchor =
    SPLASH_ANCHORS[Math.floor(Math.random() * SPLASH_ANCHORS.length)];
  const size = gsap.utils.random(5, 15);
  const out = gsap.utils.random(6, 26);
  const start = after + gsap.utils.random(0, 2.4);
  return {
    start,
    x: anchor[0] + anchor[2] * out - size / 2,
    y: anchor[1] + anchor[3] * out - size / 2,
    dx: anchor[2] * gsap.utils.random(4, 12),
    dy: anchor[3] * gsap.utils.random(4, 12),
    duration: gsap.utils.random(1.2, 2.2),
    size,
  };
}

export function createSplash(drops: readonly HTMLElement[]) {
  const mountedAt = gsap.ticker.time;
  const sprites = drops.map((element, index) => ({
    element,
    shot: sampleSplash(mountedAt + 1.6 + index * 0.12),
    painted: false,
  }));
  let running = false;

  const tick = (time: number) => {
    for (const sprite of sprites) {
      let { shot } = sprite;
      const { style } = sprite.element;
      if (time > shot.start + 60) shot = sampleSplash(time - 5);
      while (time >= shot.start + shot.duration) {
        shot = sampleSplash(shot.start + shot.duration);
      }
      if (shot !== sprite.shot) {
        sprite.shot = shot;
        sprite.painted = false;
        style.visibility = "";
      }
      if (time < shot.start) continue;

      if (!sprite.painted) {
        style.setProperty("--w", String(shot.size));
        style.setProperty("--h", String(shot.size));
        style.visibility = "visible";
        sprite.painted = true;
      }
      const elapsed = time - shot.start;
      const movement = drift(elapsed / shot.duration);
      const arrive = fadeIn(Math.min(elapsed / 0.45, 1));
      const leave = fadeOut(Math.max(0, (elapsed - shot.duration + 0.6) / 0.6));
      style.setProperty("--dx", String(shot.x + shot.dx * movement));
      style.setProperty("--dy", String(shot.y + shot.dy * movement));
      style.opacity = String(arrive * (1 - leave));
      style.scale = String(0.2 + 0.8 * arrive - 0.6 * leave);
    }
  };

  function setActive(active: boolean) {
    if (active === running) return;
    running = active;
    if (active) gsap.ticker.add(tick);
    else gsap.ticker.remove(tick);
  }

  return {
    setActive,
    dispose() {
      setActive(false);
      drops.forEach((drop) => drop.removeAttribute("style"));
    },
  };
}
