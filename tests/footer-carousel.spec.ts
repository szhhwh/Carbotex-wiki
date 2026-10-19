import { expect, test, type Locator, type Page } from "@playwright/test";

const CAROUSEL_ID = "#footer-project-carousel";
const WHEEL_SENSITIVITY = 0.42;

interface CarouselState {
  position: number;
  scrollY: number;
  status: string;
  step: number;
  transform: number;
}

interface WheelProbeWindow extends Window {
  __footerWheelDelta?: number;
}

async function openFooterCarousel(page: Page): Promise<Locator> {
  await page.goto("/ouc-haide/");
  const viewport = page.locator(CAROUSEL_ID);
  await viewport.scrollIntoViewIfNeeded();
  await expect(viewport).toBeVisible();
  await viewport.hover();
  await page.waitForTimeout(250);
  return viewport;
}

async function readCarousel(viewport: Locator): Promise<CarouselState> {
  return viewport.evaluate((element) => {
    const track = element.firstElementChild as HTMLElement;
    const card = track.firstElementChild as HTMLElement;
    const transform = new DOMMatrixReadOnly(getComputedStyle(track).transform)
      .m41;
    const step =
      card.getBoundingClientRect().width +
      parseFloat(getComputedStyle(track).columnGap);
    const status = element.parentElement?.querySelector("[role='status']");

    return {
      position: -transform / step - 1,
      scrollY: window.scrollY,
      status: status?.textContent ?? "",
      step,
      transform,
    };
  });
}

test.describe("footer project carousel", () => {
  test("wheel travel is proportional, responsive and stays inside the carousel", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name === "mobile",
      "wheel input requires a mouse",
    );

    const viewport = await openFooterCarousel(page);
    const before = await readCarousel(viewport);

    await page.evaluate(() => {
      const probe = window as WheelProbeWindow;
      probe.__footerWheelDelta = undefined;
      window.addEventListener(
        "wheel",
        (event) => {
          probe.__footerWheelDelta = event.deltaY;
        },
        { capture: true, once: true, passive: true },
      );
    });
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(80);
    const during = await readCarousel(viewport);
    await page.waitForTimeout(450);
    const after = await readCarousel(viewport);
    const inputDelta = await page.evaluate(
      () => (window as WheelProbeWindow).__footerWheelDelta ?? 0,
    );

    const expectedTravel = inputDelta * WHEEL_SENSITIVITY;
    expect(inputDelta).toBeGreaterThan(0);
    expect(Math.abs(during.transform - before.transform)).toBeGreaterThan(10);
    expect(Math.abs(after.transform - before.transform)).toBeGreaterThan(
      expectedTravel - 3,
    );
    expect(Math.abs(after.transform - before.transform)).toBeLessThan(
      expectedTravel + 3,
    );
    expect(Math.abs(after.scrollY - before.scrollY)).toBeLessThan(2);

    await page.mouse.wheel(0, -100);
    await page.waitForTimeout(450);
    const returned = await readCarousel(viewport);
    expect(Math.abs(returned.transform - before.transform)).toBeLessThan(3);
    expect(Math.abs(returned.scrollY - before.scrollY)).toBeLessThan(2);
  });

  test("high-frequency wheel input follows the pointer instead of moving after it stops", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name === "mobile",
      "wheel input requires a mouse",
    );

    const viewport = await openFooterCarousel(page);

    const result = await viewport.evaluate(async (element) => {
      const track = element.firstElementChild as HTMLElement;
      const samples: { time: number; x: number }[] = [];
      const start = performance.now();
      let running = true;

      const sample = () => {
        const x = new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
        samples.push({ time: performance.now() - start, x });
        if (running) requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);

      const rect = element.getBoundingClientRect();
      for (let index = 0; index < 30; index += 1) {
        await new Promise((resolve) => setTimeout(resolve, 8));
        element.dispatchEvent(
          new WheelEvent("wheel", {
            bubbles: true,
            cancelable: true,
            clientX: rect.left + 10,
            clientY: rect.top + 10,
            deltaY: 3,
          }),
        );
      }

      const inputEnd = performance.now() - start;
      await new Promise((resolve) => setTimeout(resolve, 500));
      running = false;

      return { inputEnd, samples };
    });

    const startX = result.samples[0].x;
    const duringBurst = [...result.samples]
      .reverse()
      .find((sample) => sample.time <= result.inputEnd * 0.8);
    const final = result.samples.at(-1);

    expect(duringBurst).toBeDefined();
    expect(Math.abs(duringBurst!.x - startX)).toBeGreaterThan(8);
    expect(final).toBeDefined();

    const expectedTravel = 30 * 3 * WHEEL_SENSITIVITY;
    expect(Math.abs(final!.x - startX)).toBeGreaterThan(expectedTravel - 3);
    expect(Math.abs(final!.x - startX)).toBeLessThan(expectedTravel + 3);
  });

  test("wheel input keeps looping through card boundaries", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name === "mobile",
      "wheel input requires a mouse",
    );

    const viewport = await openFooterCarousel(page);
    const before = await readCarousel(viewport);

    await viewport.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      for (let index = 0; index < 8; index += 1) {
        element.dispatchEvent(
          new WheelEvent("wheel", {
            bubbles: true,
            cancelable: true,
            clientX: rect.left + 10,
            clientY: rect.top + 10,
            deltaY: 100,
          }),
        );
      }
    });

    await expect
      .poll(async () => (await readCarousel(viewport)).status)
      .toContain("Project card 2 of");
    await page.waitForTimeout(450);

    const after = await readCarousel(viewport);
    const expectedPosition =
      before.position + (8 * 100 * WHEEL_SENSITIVITY) / before.step - 1;

    expect(Math.abs(after.position - expectedPosition)).toBeLessThan(0.02);
    expect(Math.abs(after.scrollY - before.scrollY)).toBeLessThan(2);
  });

  test("a horizontal touch swipe advances the mobile carousel", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "touch input is mobile-only");

    const viewport = await openFooterCarousel(page);
    const before = await readCarousel(viewport);

    const result = await viewport.evaluate((element) => {
      let verticalMovePrevented = false;
      const recordVerticalMove = (event: PointerEvent) => {
        verticalMovePrevented = event.defaultPrevented;
      };
      element.addEventListener("pointermove", recordVerticalMove, {
        capture: true,
        once: true,
        passive: true,
      });

      const dispatch = (type: string, clientX: number, clientY: number) =>
        element.dispatchEvent(
          new PointerEvent(type, {
            bubbles: true,
            cancelable: true,
            clientX,
            clientY,
            pointerId: 7,
            pointerType: "touch",
            isPrimary: true,
          }),
        );

      dispatch("pointerdown", 260, 420);
      dispatch("pointermove", 260, 500);
      dispatch("pointerup", 260, 500);

      element.addEventListener("pointermove", recordVerticalMove, {
        capture: true,
        once: true,
        passive: true,
      });
      dispatch("pointerdown", 260, 420);
      dispatch("pointermove", 120, 425);
      dispatch("pointerup", 120, 425);

      return { verticalMovePrevented };
    });

    expect(result.verticalMovePrevented).toBe(false);
    await expect
      .poll(async () => (await readCarousel(viewport)).status)
      .toContain("Project card 2 of");

    const after = await readCarousel(viewport);
    expect(Math.abs(after.scrollY - before.scrollY)).toBeLessThan(2);
  });

  test("mobile card arrows keep a stable resting state", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "touch input is mobile-only");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/ouc-haide/");
    const viewport = page.locator(CAROUSEL_ID);
    await viewport.scrollIntoViewIfNeeded();
    const arrow = viewport.locator("a").first().locator("svg").first();

    const before = await arrow.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    const box = await arrow.boundingBox();
    if (!box) throw new Error("Mobile footer arrow is not rendered");
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    const after = await arrow.evaluate(
      (element) => getComputedStyle(element).transform,
    );

    expect(after).toBe(before);
  });
});
