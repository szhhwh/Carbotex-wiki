import { expect, test, type Page } from "@playwright/test";

const opening = "#opening-screen";
const root = "#root";
const description = "/ouc-haide/description";

interface OpeningEvent {
  shown?: number;
  reveal?: number;
  complete?: number;
}

async function trackOpeningEvents(page: Page) {
  await page.addInitScript(() => {
    const events: {
      shown?: number;
      reveal?: number;
      complete?: number;
    }[] = [];
    let active: (typeof events)[number] | null = null;
    Object.assign(window, { openingEvents: events });

    const current = () => {
      if (!active) {
        active = {};
        events.push(active);
      }
      return active;
    };

    new MutationObserver(() => {
      if (
        document.getElementById("opening-screen") &&
        current().shown === undefined
      ) {
        current().shown = performance.now();
      }
    }).observe(document, { childList: true, subtree: true });

    document.addEventListener("wiki:opening-reveal", () => {
      current().reveal = performance.now();
    });
    document.addEventListener("wiki:opening-complete", () => {
      current().complete = performance.now();
      active = null;
    });
  });
}

async function openingEvents(page: Page) {
  return page.evaluate(
    () =>
      (
        window as unknown as {
          openingEvents: OpeningEvent[];
        }
      ).openingEvents,
  );
}

async function openEngineeringFromNavbar(page: Page) {
  if ((page.viewportSize()?.width ?? 0) < 800) {
    await page
      .getByRole("button", { name: "Open navigation" })
      .evaluate((element) => (element as HTMLElement).click());
  }
  await page
    .getByRole("button", { name: "Project", exact: true })
    .evaluate((element) => (element as HTMLElement).click());
  await expect(page.locator("#nav-project-menu")).toHaveAttribute(
    "data-open",
    "true",
  );
  await page
    .locator('#nav-project-menu a[href="/ouc-haide/engineering"]')
    .evaluate((element) => (element as HTMLElement).click());
}

test("inline opening paints before the application can download", async ({
  page,
}) => {
  let release!: () => void;
  const application = new Promise<void>((resolve) => (release = resolve));
  await page.route("**/src/bootstrap.tsx*", async (route) => {
    await application;
    await route.continue();
  });
  await page.goto(description, { waitUntil: "domcontentloaded" });
  await expect(page.locator(opening)).toBeVisible();
  await expect(page.locator(`${root} > *`)).toHaveCount(0);
  await expect(page.locator(root)).toHaveAttribute("inert", "");
  expect(
    await page.locator(`${opening} svg`).evaluate((svg) => {
      const bounds = svg.getBoundingClientRect();
      return {
        centeredX: Math.abs(bounds.x + bounds.width / 2 - innerWidth / 2) < 2,
        centeredY: Math.abs(bounds.y + bounds.height / 2 - innerHeight / 2) < 2,
        embedded: !!document.querySelector("symbol#wiki-taiji path"),
        background: getComputedStyle(document.getElementById("opening-screen")!)
          .backgroundColor,
      };
    }),
  ).toEqual({
    centeredX: true,
    centeredY: true,
    embedded: true,
    background: "rgb(251, 240, 221)",
  });
  release();
  await expect(page.locator(opening)).toHaveCount(0);
  await expect(page.locator(root)).not.toHaveAttribute("inert");
});

test("navbar navigation replays the full-load opening timeline", async ({
  page,
}) => {
  await trackOpeningEvents(page);
  await page.goto(description, { waitUntil: "domcontentloaded" });
  await expect(page.locator(opening)).toHaveCount(0);

  // Warm the chunk so a cached page cannot skip the loading presentation.
  await page.evaluate(
    () => import("/ouc-haide/src/pages/project/EngineeringPage.tsx"),
  );
  await openEngineeringFromNavbar(page);

  await expect(page.locator(opening)).toHaveAttribute("data-state", "playing");
  await expect(page.locator(opening)).toHaveCount(0);
  await expect.poll(async () => (await openingEvents(page)).length).toBe(2);

  const [fullLoad, navigation] = await openingEvents(page);
  expect(fullLoad.reveal! - fullLoad.shown!).toBeGreaterThanOrEqual(950);
  expect(navigation.reveal! - navigation.shown!).toBeGreaterThanOrEqual(950);
  expect(
    Math.abs(
      navigation.reveal! -
        navigation.shown! -
        (fullLoad.reveal! - fullLoad.shown!),
    ),
  ).toBeLessThan(200);
  expect(navigation.complete! - navigation.reveal!).toBeGreaterThanOrEqual(850);
  expect(navigation.complete! - navigation.reveal!).toBeLessThan(1100);
});

test("navbar navigation stays covered while a lazy route is slow", async ({
  page,
}) => {
  await page.route("**/pages/project/EngineeringPage.tsx*", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 3500));
    await route.continue();
  });
  await page.goto(description, { waitUntil: "domcontentloaded" });
  await expect(page.locator(opening)).toHaveCount(0);
  await openEngineeringFromNavbar(page);

  await expect
    .poll(() =>
      page
        .locator(`${opening} .opening-screen__turn`)
        .evaluate((element) => element.getAnimations()[0]?.currentTime ?? 0),
    )
    .toBeGreaterThan(1100);
  await expect(page.locator(opening)).toHaveAttribute("data-state", "playing");
  await expect(page.locator(opening)).toHaveCount(0);
  await expect(page.locator("[data-route-ready]")).toHaveCount(1);
});

test("cached document visits still complete the opening animation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const marks: { ready?: number; removed?: number } = {};
    Object.assign(window, { openingMarks: marks });
    let seen = false;
    new MutationObserver(() => {
      if (document.querySelector("[data-route-ready]"))
        marks.ready ??= performance.now();
      if (document.getElementById("opening-screen")) seen = true;
      else if (seen) marks.removed ??= performance.now();
    }).observe(document, { childList: true, subtree: true });
  });
  for (let visit = 0; visit < 2; visit++) {
    await page.goto(description, { waitUntil: "domcontentloaded" });
    await expect(page.locator(opening)).toBeVisible();
    await expect(page.locator(opening)).toHaveCount(0);
    const marks = await page.evaluate(
      () =>
        (
          window as unknown as {
            openingMarks: { ready: number; removed: number };
          }
        ).openingMarks,
    );
    expect(marks.removed).toBeGreaterThanOrEqual(1800);
    expect(marks.removed).toBeGreaterThan(marks.ready);
    await expect(page.locator(root)).not.toHaveAttribute("aria-busy");
  }
});

test("a slow route stays covered after the first animation cycle", async ({
  page,
}) => {
  await page.route("**/pages/project/DescriptionPage.tsx*", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 3500));
    await route.continue();
  });
  await page.goto(description, { waitUntil: "domcontentloaded" });
  await expect
    .poll(() =>
      page
        .locator(opening)
        .evaluate(
          (element) =>
            element.querySelector(".opening-screen__turn")!.getAnimations()[0]
              ?.currentTime ?? 0,
        ),
    )
    .toBeGreaterThan(1100);
  await expect(page.locator(opening)).toHaveAttribute("data-state", "playing");
  await expect(page.locator(opening)).toHaveCount(0);
  await expect(page.locator("[data-route-ready]")).toHaveCount(1);
});

test("reduced motion keeps the illustration still and releases the page", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/src/bootstrap.tsx*", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    await route.continue();
  });
  await page.goto(description, { waitUntil: "domcontentloaded" });
  await expect(page.locator(opening)).toBeVisible();
  expect(
    await page
      .locator(`${opening} svg`)
      .evaluate((element) => element.getAnimations({ subtree: true }).length),
  ).toBe(0);
  await expect(page.locator(opening)).toHaveCount(0);
  await expect(page.locator(root)).not.toHaveAttribute("inert");
});

test("reduced-motion navigation uses the reduced opening timeline", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await trackOpeningEvents(page);
  await page.goto(description, { waitUntil: "domcontentloaded" });
  await expect(page.locator(opening)).toHaveCount(0);
  await page.evaluate(
    () => import("/ouc-haide/src/pages/project/EngineeringPage.tsx"),
  );
  await openEngineeringFromNavbar(page);
  await expect(page.locator(opening)).toHaveAttribute("data-state", "playing");
  await expect(page.locator(opening)).toHaveCount(0);
  await expect.poll(async () => (await openingEvents(page)).length).toBe(2);

  const [, navigation] = await openingEvents(page);
  expect(navigation.reveal! - navigation.shown!).toBeGreaterThanOrEqual(400);
  expect(navigation.reveal! - navigation.shown!).toBeLessThan(650);
  expect(navigation.complete! - navigation.reveal!).toBeGreaterThanOrEqual(140);
  expect(navigation.complete! - navigation.reveal!).toBeLessThan(350);
});

test("failed application download offers a visible reload action", async ({
  page,
}) => {
  await page.route("**/src/bootstrap.tsx*", (route) => route.abort());
  await page.goto(description, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: "Reload page" })).toBeVisible();
  await expect(page.locator(opening)).toHaveAttribute("data-state", "playing");
});

test("retries a transient lazy route download before showing an error", async ({
  page,
}) => {
  let attempts = 0;
  await page.route(
    "**/src/pages/human-practices/HumanPracticesPage.tsx*",
    async (route) => {
      attempts += 1;
      if (attempts === 1) {
        await route.abort();
        return;
      }
      await route.continue();
    },
  );

  await page.goto("/ouc-haide/human-practices", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator("[data-route-error]")).toHaveCount(0);
  await expect(
    page.getByRole("heading", {
      name: "Integrated Human Practices",
      exact: true,
    }),
  ).toBeVisible();
  expect(attempts).toBeGreaterThanOrEqual(2);
});

test("home remains scrollable after the opening releases interaction", async ({
  page,
}) => {
  await page.goto("/ouc-haide/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(opening)).toHaveCount(0);
  await expect(page.locator("[data-home-canvas]")).toBeVisible();
  await expect(page.locator(root)).not.toHaveAttribute("inert");
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
});

test("home title entrance plays underneath the opening while it fades", async ({
  page,
}, testInfo) => {
  await page.addInitScript(() => {
    document.addEventListener(
      "wiki:opening-reveal",
      () => {
        const before = getComputedStyle(
          document.querySelector("[data-title-reveal]")!,
        ).transform;
        setTimeout(
          () =>
            Object.assign(window, {
              fadeSample: {
                before,
                opacity: Number(
                  getComputedStyle(document.getElementById("opening-screen")!)
                    .opacity,
                ),
                title: getComputedStyle(
                  document.querySelector("[data-title-reveal]")!,
                ).transform,
                inert: document.getElementById("root")!.inert,
              },
            }),
          300,
        );
      },
      { once: true },
    );
  });
  await page.goto("/ouc-haide/", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => "fadeSample" in window);
  const during = await page.evaluate(
    () =>
      (
        window as unknown as {
          fadeSample: {
            before: string;
            opacity: number;
            title: string;
            inert: boolean;
          };
        }
      ).fadeSample,
  );
  expect(during.opacity).toBeGreaterThan(0);
  expect(during.opacity).toBeLessThan(1);
  expect(during.title).not.toBe(during.before);
  expect(during.inert).toBe(true);
  expect(await page.locator("[data-radial-reveal]").count()).toBe(0);
  await page.screenshot({
    path: `/tmp/carbotex-opening-fade-${testInfo.project.name}.png`,
  });
  await expect(page.locator(opening)).toHaveCount(0);
  await expect(page.locator(root)).not.toHaveAttribute("inert");
});
