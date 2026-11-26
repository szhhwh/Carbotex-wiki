import { expect, test, type Locator, type Page } from "@playwright/test";
import { RIBBON_SWEEPS } from "../src/components/home/process/ribbon-sweeps";
import { sweepPath } from "../src/components/home/process/sweep";

const HOME = "/ouc-haide/";
const CANVAS = "[data-home-canvas]";
const SPLASH = "[data-home-splash]";
const BUBBLE = "[data-bubble]";

async function openHome(page: Page) {
  await page.goto(HOME, { waitUntil: "domcontentloaded" });
  await expect(page.locator(CANVAS)).toBeVisible();
  await expect(page.locator("#opening-screen")).toHaveCount(0);
}

async function scrollToProcessTime(page: Page, time: number) {
  await page.locator("[data-stage]").evaluate((stage, time) => {
    const track = stage.parentElement!;
    const top = track.getBoundingClientRect().top + scrollY;
    window.scrollTo({
      top: top - innerHeight + time * stage.clientHeight,
      behavior: "instant",
    });
  }, time);
}

async function scrollToCanvasEnd(canvas: Locator) {
  await canvas.evaluate((section) =>
    window.scrollTo({
      top: section.getBoundingClientRect().bottom + scrollY - innerHeight,
      behavior: "instant",
    }),
  );
}

function styleChanges(locator: Locator, selector: string) {
  return locator.evaluate(
    (root, selector) =>
      new Promise<number>((resolve) => {
        let changes = 0;
        let frames = 0;
        const observer = new MutationObserver((records) => {
          changes += records.filter(
            ({ target }) =>
              target instanceof Element && target.matches(selector),
          ).length;
        });
        const countFrame = () => {
          if (++frames < 12) {
            requestAnimationFrame(countFrame);
            return;
          }
          observer.disconnect();
          resolve(changes);
        };
        observer.observe(root, {
          subtree: true,
          attributes: true,
          attributeFilter: ["style"],
        });
        requestAnimationFrame(countFrame);
      }),
    selector,
  );
}

function titleFloatPhase(page: Page) {
  return page.locator("[data-title-reveal]").evaluate((title) => {
    const animation = title.parentElement!.getAnimations()[0];
    return {
      time: Number(animation.currentTime),
      clock: Number(document.timeline.currentTime),
      playing: animation.playState === "running",
    };
  });
}

test("pauses offscreen art and starts product bubbles only after the reveal", async ({
  page,
}) => {
  await openHome(page);
  const canvas = page.locator(CANVAS);
  const splash = canvas.locator(SPLASH);
  const runningCanvasAnimations = () =>
    canvas.evaluate(
      (section) =>
        section
          .getAnimations({ subtree: true })
          .filter(
            (animation) =>
              animation instanceof CSSAnimation &&
              animation.playState === "running",
          ).length,
    );
  await expect.poll(() => styleChanges(splash, "span")).toBeGreaterThan(0);
  const before = await titleFloatPhase(page);

  const thermo = page.locator("[data-thermo-bob]");
  await scrollToProcessTime(page, 0.75);
  await expect(thermo.locator("..")).not.toHaveCSS("opacity", "0");
  expect(
    await page.locator("[data-world]").evaluate((world) => {
      const transform = getComputedStyle(world).transform;
      return transform === "none" ? 0 : new DOMMatrix(transform).m42;
    }),
  ).toBe(0);

  await scrollToProcessTime(page, 1.8);
  await expect.poll(runningCanvasAnimations).toBe(0);
  await expect(thermo).toHaveAttribute("style", /transform/);
  expect(await styleChanges(splash, "span")).toBe(0);
  expect(await styleChanges(page.locator("[data-bubbles]"), BUBBLE)).toBe(0);

  await scrollToProcessTime(page, 10.7);
  await expect
    .poll(() => styleChanges(page.locator("[data-bubbles]"), BUBBLE))
    .toBeGreaterThan(0);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(runningCanvasAnimations).toBeGreaterThan(0);
  await expect.poll(() => styleChanges(splash, "span")).toBeGreaterThan(0);
  const after = await titleFloatPhase(page);
  expect(after.playing).toBe(true);
  expect(
    Math.abs(after.time - before.time - (after.clock - before.clock)),
  ).toBeLessThan(150);
});

test("restores complete and empty ribbon masks when scrubbing in either direction", async ({
  page,
}) => {
  await openHome(page);
  const ribbon = page.locator("[data-ribbon] [data-sweep]");
  const bottle = page.locator("[data-bottle-ribbon] [data-sweep]").first();
  await scrollToProcessTime(page, 10.7);
  const complete = sweepPath(RIBBON_SWEEPS.malic, 1);
  await expect(ribbon).toHaveAttribute("d", complete);
  await expect(bottle).toHaveAttribute(
    "d",
    sweepPath(RIBBON_SWEEPS.bottleBack, 1),
  );
  const { width, height } = page.viewportSize()!;
  await page.setViewportSize({ width: width - 12, height });
  await expect(ribbon).toHaveAttribute("d", complete);

  await scrollToProcessTime(page, 1.8);
  await expect(ribbon).toHaveAttribute("d", "");
  await expect(bottle).toHaveAttribute("d", "");

  await scrollToProcessTime(page, 10.7);
  await expect(ribbon).toHaveAttribute("d", complete);
});

test("reveals comparison artwork when each card comes into view", async ({
  page,
}) => {
  await openHome(page);
  const cards = page.locator("[data-cards]");
  const higher = cards.locator("[data-card='higher']");
  const greener = cards.locator("[data-card='greener']");
  const stacked = await cards.evaluate(
    (element) => getComputedStyle(element).flexDirection === "column",
  );
  const opacities = (card: Locator) =>
    card
      .locator("[data-art]")
      .evaluateAll((art) =>
        art.map((item) => Number(getComputedStyle(item).opacity)),
      );
  const scrollToCard = (card: Locator) =>
    card.evaluate((element) =>
      window.scrollTo({
        top: scrollY + element.getBoundingClientRect().top - innerHeight * 0.55,
        behavior: "instant",
      }),
    );

  expect(await opacities(higher)).toEqual([0, 0, 0]);
  expect(await opacities(greener)).toEqual([0, 0]);

  await scrollToCard(higher);
  await expect.poll(() => opacities(higher)).toEqual([1, 1, 1]);
  await expect
    .poll(() => styleChanges(higher, "[data-art] img"))
    .toBeGreaterThan(0);
  if (stacked) {
    expect(await opacities(greener)).toEqual([0, 0]);
    await scrollToCard(greener);
  }
  await expect.poll(() => opacities(greener)).toEqual([1, 1]);
  await expect
    .poll(() => styleChanges(greener, "[data-art] img"))
    .toBeGreaterThan(0);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(greener.locator("[data-art='cycle'] img")).toHaveCSS(
    "transform",
    "none",
  );
  expect(await opacities(higher)).toEqual([1, 1, 1]);
  expect(await opacities(greener)).toEqual([1, 1]);
});

test("starts both P5 floats from their landed positions", async ({ page }) => {
  await openHome(page);
  const canvas = page.locator(CANVAS);
  await scrollToCanvasEnd(canvas);
  const button = canvas.getByRole("button", { name: /Click to open/ });
  await expect(button).toBeInViewport();
  await button.click();

  const halves = canvas
    .locator("[data-open]")
    .locator('img[src$="/taiji-yeast.svg"], img[src$="/taiji-thermo.svg"]');
  await expect(halves).toHaveCount(2);
  for (const half of await halves.all()) {
    const { startOffset, floatOffset } = await half.evaluate((image) => {
      const animation = image.parentElement!.getAnimations()[0];
      animation.pause();
      animation.currentTime = 0;
      const start = image.getBoundingClientRect();
      animation.currentTime =
        Number(animation.effect!.getTiming().duration) / 4;
      const floating = image.getBoundingClientRect();
      animation.cancel();
      const landed = image.getBoundingClientRect();
      return {
        startOffset: Math.hypot(start.x - landed.x, start.y - landed.y),
        floatOffset: Math.hypot(floating.x - landed.x, floating.y - landed.y),
      };
    });
    expect(startOffset).toBeCloseTo(0, 1);
    expect(floatOffset).toBeGreaterThan(1);
  }
});

test("settles an in-progress P5 reveal when reduced motion is enabled", async ({
  page,
}) => {
  await openHome(page);
  const canvas = page.locator(CANVAS);
  const title = await titleFloatPhase(page);
  await scrollToCanvasEnd(canvas);
  const button = canvas.getByRole("button", { name: /Click to open/ });
  await expect(button).toBeInViewport();
  const taijiStart = await canvas
    .locator('img[src$="/taiji.svg"]')
    .evaluate(async (taiji) => {
      const rotation = await taiji.getAnimations()[0].ready;
      return Number(rotation.startTime);
    });
  expect(Math.abs(taijiStart - (title.clock - title.time))).toBeLessThan(80);
  await button.click();
  await expect(canvas.locator("[data-open]")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(canvas.locator("[data-open]")).toHaveCount(1);
  expect(await styleChanges(canvas.locator(SPLASH), "span")).toBe(0);
});
