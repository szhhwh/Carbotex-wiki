import { expect, test, type Page } from "@playwright/test";

const templatePages = [
  {
    path: "/contribution",
    title: "Contribution",
    lead: "Make a useful contribution for future iGEM teams",
  },
  {
    path: "/experiments",
    title: "Experiments",
    lead: "Describe the research and experiments that drove your project",
  },
  {
    path: "/attributions",
    title: "Attributions",
    lead: "Accurate attribution is essential in the iGEM Competition",
  },
] as const;

async function expectVisibleArticleLead(
  page: Page,
  path: string,
  copy: string,
) {
  await page.goto(`/ouc-haide${path}`);

  const lead = page.locator("[data-article-lead]");
  await expect(lead).toBeVisible();
  await expect(lead).toContainText(copy);

  const layout = await lead.evaluate((element) => {
    const computed = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      fontPx: Number.parseFloat(computed.fontSize),
      lineHeightPx: Number.parseFloat(computed.lineHeight),
      clipPath: computed.clipPath,
      opacity: computed.opacity,
      visibility: computed.visibility,
      overflowX: element.scrollWidth - element.clientWidth,
    };
  });

  expect(layout.width).toBeGreaterThan(0);
  expect(layout.height).toBeGreaterThan(0);
  expect(layout.fontPx).toBeGreaterThanOrEqual(16);
  expect(layout.lineHeightPx).toBeGreaterThan(layout.fontPx);
  expect(layout.clipPath).toBe("none");
  expect(layout.opacity).toBe("1");
  expect(layout.visibility).toBe("visible");
  expect(layout.overflowX).toBeLessThanOrEqual(1);
}

test.describe("template article pages", () => {
  test("keeps every article lead visible and readable at three widths", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 1440, height: 1000 },
      { width: 768, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);

      for (const templatePage of templatePages) {
        await expectVisibleArticleLead(
          page,
          templatePage.path,
          templatePage.lead,
        );

        await expect(
          page.getByRole("heading", {
            level: 1,
            name: templatePage.title,
          }),
        ).toBeVisible();

        const heroRatio = await page
          .locator("[data-hero-media-slot]")
          .evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width / rect.height;
          });
        expect(heroRatio).toBeCloseTo(1069 / 400, 2);
        await expect(page.locator("[data-hero-media-slot] > span")).toHaveCSS(
          "background-color",
          "rgba(0, 0, 0, 0)",
        );

        expect(
          await page.evaluate(
            () =>
              document.documentElement.scrollWidth -
              document.documentElement.clientWidth,
          ),
        ).toBeLessThanOrEqual(1);
      }
    }
  });

  test("lists all three Inspirations entries without inset shadows", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/experiments");

    const inspirations = page.locator("#experiments-inspirations");
    const expected = [
      { year: "2025", team: "Heidelberg", slug: "heidelberg" },
      { year: "2025", team: "McGill", slug: "mcgill" },
      { year: "2025", team: "EPFL", slug: "epfl" },
    ];

    await expect(inspirations.getByRole("link")).toHaveCount(3);
    for (const item of expected) {
      const link = inspirations.getByRole("link", {
        name: `${item.year} ${item.team}`,
      });
      await expect(link).toBeVisible();
      await expect(link).toContainText(item.year);
      await expect(link).toContainText(item.team);
      await expect(link).toContainText("Open");
      await expect(link).toHaveAttribute(
        "href",
        `https://${item.year}.igem.wiki/${item.slug}/experiments`,
      );
    }

    for (const path of ["/contribution", "/experiments", "/attributions"]) {
      await page.goto(`/ouc-haide${path}`);
      const insetShadows = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("main *")]
          .filter((element) => element.checkVisibility())
          .map((element) => getComputedStyle(element).boxShadow)
          .filter((shadow) => shadow.includes("inset")),
      );
      expect(insetShadows).toEqual([]);
    }

    await page.goto("/ouc-haide/contribution");
    await expect(page.locator("#page-contents ul li")).toHaveCount(4);
  });

  test("keeps a trusted height that arrives before the iframe load event", async ({
    page,
  }) => {
    let releaseLoadGate = () => {};
    const loadGate = new Promise<void>((resolve) => {
      releaseLoadGate = resolve;
    });

    await page.route("https://teams.igem.org/**", async (route) => {
      const url = new URL(route.request().url());

      if (url.pathname.endsWith("/attributions")) {
        await route.fulfill({
          contentType: "text/html",
          body: `<!doctype html>
            <html lang="en">
              <body>
                <p>Attribution form preview</p>
                <img
                  id="load-gate"
                  alt=""
                  src="https://teams.igem.org/__attribution-load-gate.gif"
                />
                <script>
                  const postHeight = () => {
                    parent.postMessage(
                      { type: "igem-attribution-form", data: 216 },
                      "*"
                    );
                  };
                  const heightTimer = setInterval(postHeight, 100);
                  document
                    .getElementById("load-gate")
                    .addEventListener("load", () => clearInterval(heightTimer));
                  postHeight();
                </script>
              </body>
            </html>`,
        });
        return;
      }

      if (url.pathname.endsWith("/__attribution-load-gate.gif")) {
        await loadGate;
        await route.fulfill({
          status: 200,
          contentType: "image/gif",
          body: Buffer.from(
            "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
            "base64",
          ),
        });
        return;
      }

      await route.abort();
    });

    await page.goto("/ouc-haide/attributions", {
      waitUntil: "domcontentloaded",
    });
    const viewport = page.locator("[data-state]").filter({
      has: page.locator("#igem-attribution-form"),
    });
    const frame = page.locator("#igem-attribution-form");
    await viewport.scrollIntoViewIfNeeded();

    await expect(viewport).toHaveAttribute("data-state", "ready");
    await expect(viewport).toHaveAttribute("data-load-events", "0");
    await expect(viewport).toHaveAttribute("data-load-event", "pending");
    await expect(frame).toHaveAttribute("tabindex", "0");
    await expect(frame).not.toHaveAttribute("aria-hidden");
    expect(
      await frame.evaluate(
        (element: HTMLIFrameElement) => element.style.height,
      ),
    ).toBe("220px");

    releaseLoadGate();
    await expect(viewport).toHaveAttribute("data-load-events", "1");
    await expect(viewport).toHaveAttribute("data-load-event", "observed");
    await expect(viewport).toHaveAttribute("data-state", "ready");
    await expect(frame).toHaveAttribute("tabindex", "0");
    await expect(frame).not.toHaveAttribute("aria-hidden");
  });

  test("does not downgrade ready when another iframe load event fires", async ({
    page,
  }) => {
    await page.route("https://teams.igem.org/**", async (route) => {
      const url = new URL(route.request().url());
      if (!url.pathname.endsWith("/attributions")) {
        await route.abort();
        return;
      }

      if (url.searchParams.has("second-load")) {
        await route.fulfill({
          contentType: "text/html",
          body: "<!doctype html><html><body>Second document without a height</body></html>",
        });
        return;
      }

      await route.fulfill({
        contentType: "text/html",
        body: `<!doctype html>
          <html lang="en">
            <body>
              <p>First document</p>
              <script>
                setTimeout(() => {
                  parent.postMessage(
                    { type: "igem-attribution-form", data: 216 },
                    "*"
                  );
                }, 300);
                setTimeout(() => {
                  const next = new URL(location.href);
                  next.searchParams.set("second-load", "1");
                  location.replace(next.href);
                }, 900);
              </script>
            </body>
          </html>`,
      });
    });

    await page.goto("/ouc-haide/attributions");
    const viewport = page.locator("[data-state]").filter({
      has: page.locator("#igem-attribution-form"),
    });
    const frame = page.locator("#igem-attribution-form");
    await viewport.scrollIntoViewIfNeeded();

    await expect(viewport).toHaveAttribute("data-state", "ready");
    await expect(viewport).toHaveAttribute("data-load-events", "1");
    await expect(viewport).toHaveAttribute("data-load-events", "2");
    await expect(viewport).toHaveAttribute("data-state", "ready");
    await expect(frame).toHaveAttribute("tabindex", "0");
    await expect(frame).not.toHaveAttribute("aria-hidden");
    expect(
      await frame.evaluate(
        (element: HTMLIFrameElement) => element.style.height,
      ),
    ).toBe("220px");
  });

  test("does not treat a same-page message as form readiness", async ({
    page,
  }) => {
    await page.route(
      "https://teams.igem.org/wiki/*/attributions",
      async (route) => {
        await route.fulfill({
          contentType: "text/html",
          body: "<!doctype html><html><body>Signed-out draft</body></html>",
        });
      },
    );

    await page.goto("/ouc-haide/attributions");
    const viewport = page.locator("[data-state]").filter({
      has: page.locator("#igem-attribution-form"),
    });
    const frame = page.locator("#igem-attribution-form");
    await viewport.scrollIntoViewIfNeeded();
    await expect(viewport).toHaveAttribute("data-load-event", "observed");
    await expect(viewport).toHaveAttribute("data-near-viewport", "true");

    await page.evaluate(() => {
      window.postMessage(
        { type: "igem-attribution-form", data: 216 },
        window.location.origin,
      );
    });

    await page.waitForTimeout(300);
    await expect(viewport).toHaveAttribute("data-state", "loading");
    await expect(frame).toHaveAttribute("tabindex", "-1");
    await expect(frame).toHaveAttribute("aria-hidden", "true");
  });

  test("reports a navigation timeout separately from a missing height", async ({
    page,
  }) => {
    let releaseNavigation = () => {};
    const navigationGate = new Promise<void>((resolve) => {
      releaseNavigation = resolve;
    });

    await page.route(
      "https://teams.igem.org/wiki/*/attributions",
      async (route) => {
        await navigationGate;
        await route.fulfill({
          contentType: "text/html",
          body: "<!doctype html><html><body>Late document without a height</body></html>",
        });
      },
    );

    await page.goto("/ouc-haide/attributions", {
      waitUntil: "domcontentloaded",
    });
    const viewport = page.locator("[data-state]").filter({
      has: page.locator("#igem-attribution-form"),
    });
    const frame = page.locator("#igem-attribution-form");
    await viewport.scrollIntoViewIfNeeded();
    await expect(viewport).toHaveAttribute("data-near-viewport", "true");
    await expect(viewport).toHaveAttribute("data-load-event", "pending");
    await expect(viewport).toHaveAttribute("data-state", "error", {
      timeout: 15_000,
    });
    await expect(viewport).toHaveAttribute("data-error-reason", "load-timeout");
    await expect(page.getByRole("alert")).toContainText("did not load in time");
    await expect(frame).toHaveAttribute("tabindex", "-1");
    await expect(frame).toHaveAttribute("aria-hidden", "true");

    releaseNavigation();
    await expect(viewport).toHaveAttribute("data-load-event", "observed");
    await expect(viewport).toHaveAttribute("data-state", "error");
    await expect(viewport).toHaveAttribute("data-error-reason", "load-timeout");
  });

  test("classifies an aborted iframe navigation as unconfirmed, not sizing", async ({
    page,
  }) => {
    await page.route("https://teams.igem.org/wiki/*/attributions", (route) =>
      route.abort("failed"),
    );

    await page.goto("/ouc-haide/attributions");
    const viewport = page.locator("[data-state]").filter({
      has: page.locator("#igem-attribution-form"),
    });
    const frame = page.locator("#igem-attribution-form");
    await viewport.scrollIntoViewIfNeeded();
    await expect(viewport).toHaveAttribute("data-load-event", "observed");
    await expect(viewport).toHaveAttribute("data-near-viewport", "true");
    await expect(viewport).toHaveAttribute("data-state", "error", {
      timeout: 15_000,
    });
    await expect(viewport).toHaveAttribute(
      "data-error-reason",
      "load-unconfirmed",
    );

    await expect(frame).toHaveAttribute("tabindex", "-1");
    await expect(frame).toHaveAttribute("aria-hidden", "true");
    await expect(frame).toHaveAttribute("aria-busy", "false");
    await expect(page.getByRole("alert")).toContainText(
      "could not be confirmed as ready",
    );
    await expect(page.getByRole("alert")).toContainText(
      "may have failed to load",
    );
    await expect(page.getByRole("alert")).not.toContainText(
      "has not finished sizing",
    );
    const fallback = page.getByRole("link", {
      name: "Open the attributions form in a new tab",
    });
    await expect(fallback).toBeVisible();
    await fallback.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(frame).not.toBeFocused();
  });

  test("keeps the ready state accessible and keyboard focus visible", async ({
    page,
  }) => {
    await page.route(
      "https://teams.igem.org/wiki/*/attributions",
      async (route) => {
        await route.fulfill({
          contentType: "text/html",
          body: `<!doctype html>
            <html lang="en">
              <body>
                <p>Attribution form preview</p>
                <script>
                  setTimeout(() => {
                    parent.postMessage(
                      { type: "igem-attribution-form", data: 216 },
                      "*"
                    );
                  }, 500);
                </script>
              </body>
            </html>`,
        });
      },
    );

    await page.goto("/ouc-haide/attributions");
    const viewport = page.locator("[data-state]").filter({
      has: page.locator("#igem-attribution-form"),
    });
    const frame = page.locator("#igem-attribution-form");
    await viewport.scrollIntoViewIfNeeded();

    await expect(viewport).toHaveAttribute("data-load-event", "observed");
    await expect(viewport).toHaveAttribute("data-state", "loading");
    await expect(frame).toHaveAttribute("aria-busy", "true");
    await expect(frame).toHaveAttribute("tabindex", "-1");
    await expect(frame).toHaveAttribute("aria-hidden", "true");
    await expect(viewport.getByRole("status")).toContainText(
      "Loading the attributions form",
    );

    await expect(viewport).toHaveAttribute("data-state", "ready");
    await expect(frame).toHaveAttribute("aria-busy", "false");
    await expect(frame).toHaveAttribute("tabindex", "0");
    await expect(frame).not.toHaveAttribute("aria-hidden");
    await expect(page.locator("#opening-screen")).toHaveCount(0);

    const fallback = page.getByRole("link", {
      name: "Open the attributions form in a new tab",
    });
    await fallback.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(frame).toBeFocused();
    await expect(viewport).toHaveAttribute("data-frame-focused", "true");
    await expect(viewport).toHaveCSS("outline-style", "solid");
    await expect(viewport).toHaveCSS("outline-width", "3px");
  });
});
