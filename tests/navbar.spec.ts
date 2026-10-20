import { expect, test } from "@playwright/test";

const navigationFolders = [
  {
    name: "Project",
    variant: "project",
    minimumLinks: 3,
    currentPath: "/contribution",
  },
  {
    name: "Wet Lab",
    variant: "wet",
    minimumLinks: 6,
    currentPath: "/design",
  },
  {
    name: "Dry Lab",
    variant: "dry",
    minimumLinks: 2,
    currentPath: "/model",
  },
  {
    name: "Human Practices",
    variant: "human-practices",
    minimumLinks: 2,
    currentPath: "/education",
  },
  {
    name: "Team",
    variant: "team",
    minimumLinks: 2,
    currentPath: "/members",
  },
] as const;

test.describe("shared navbar", () => {
  test("renders the same branded navbar across page types", async ({
    page,
  }) => {
    for (const path of ["/", "/contribution", "/hardware", "/education"]) {
      await page.goto(`/ouc-haide${path}`);

      const navbar = page.locator("header").first();
      await expect(navbar).toBeVisible();
      await expect(navbar).toHaveCSS(
        "border-bottom-color",
        "rgb(255, 255, 255)",
      );
      await expect(navbar).toHaveCSS("background-color", "rgb(255, 255, 255)");
      await expect(navbar.locator("a img")).toHaveCount(1);
      await expect(navbar.locator("a img")).toHaveAttribute(
        "src",
        "https://static.igem.wiki/teams/6147/wiki/fronted-resource/team-logo-horizon.svg",
      );
      await expect(page.locator("[data-nav-scroll-marker]")).toBeVisible();
      await expect(page.locator("[data-nav-progress-fill]")).toHaveCSS(
        "background-color",
        "rgb(238, 191, 100)",
      );
    }

    await page.goto("/ouc-haide/education");
    await expect(
      page.locator("header nav button").filter({ hasText: "Human Practices" }),
    ).toHaveAttribute("data-active", "true");
    await expect(
      page.locator("header nav button").filter({ hasText: "Human Practices" }),
    ).toHaveCSS("color", "rgb(80, 173, 136)");
    await expect(
      page.locator("header nav button").filter({ hasText: "Project" }),
    ).toHaveCSS("color", "rgb(199, 151, 127)");

    if ((page.viewportSize()?.width ?? 1440) > 1100) {
      const alignment = await page.evaluate(() => {
        const bar = document.querySelector("header > div");
        const navigation = document.querySelector("header nav");
        if (!bar || !navigation) return null;

        const barRect = bar.getBoundingClientRect();
        const navRect = navigation.getBoundingClientRect();
        const barStyle = getComputedStyle(bar);

        return {
          navRight: navRect.right,
          contentRight:
            barRect.right - Number.parseFloat(barStyle.paddingRight || "0"),
          marginRight: getComputedStyle(navigation).marginRight,
        };
      });

      expect(alignment).not.toBeNull();
      expect(
        Math.abs(alignment!.navRight - alignment!.contentRight),
      ).toBeLessThanOrEqual(1);
      expect(alignment!.marginRight).toBe("0px");
    }

    if ((page.viewportSize()?.width ?? 1440) <= 1100) {
      await page.getByRole("button", { name: "Open navigation" }).click();
    }

    await page
      .locator("header nav button")
      .filter({ hasText: /^Project$/i })
      .hover();
    await expect(
      page.locator("header nav button").filter({ hasText: /^Project$/i }),
    ).toHaveCSS("color", "rgb(80, 173, 136)");
  });

  test("scroll marker tracks progress from left to right", async ({ page }) => {
    await page.goto("/ouc-haide/", { waitUntil: "networkidle" });

    const marker = page.locator("[data-nav-scroll-marker]");
    await expect(marker).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));

    const startX = await marker.evaluate(
      (element) => element.getBoundingClientRect().x,
    );
    const startGeometry = await page.evaluate(() => {
      const markerElement = document.querySelector("[data-nav-scroll-marker]");
      const fillElement = document.querySelector("[data-nav-progress-fill]");
      const navbarElement = document.querySelector("header");
      if (!markerElement || !fillElement || !navbarElement) return null;

      const markerRect = markerElement.getBoundingClientRect();
      const fillRect = fillElement.getBoundingClientRect();
      const navbarRect = navbarElement.getBoundingClientRect();

      return {
        fillLeft: fillRect.left,
        fillRight: fillRect.right,
        markerCenterX: markerRect.left + markerRect.width / 2,
        markerCenterY: markerRect.top + markerRect.height / 2,
        markerLeft: markerRect.left,
        navbarLeft: navbarRect.left,
        navbarLineCenterY: navbarRect.bottom - 3,
      };
    });

    expect(startGeometry).not.toBeNull();
    expect(
      Math.abs(startGeometry!.markerLeft - startGeometry!.navbarLeft),
    ).toBeLessThanOrEqual(1);
    expect(
      Math.abs(startGeometry!.fillLeft - startGeometry!.navbarLeft),
    ).toBeLessThanOrEqual(1);
    expect(
      Math.abs(startGeometry!.fillRight - startGeometry!.markerCenterX),
    ).toBeLessThanOrEqual(1);
    expect(
      Math.abs(startGeometry!.markerCenterY - startGeometry!.navbarLineCenterY),
    ).toBeLessThanOrEqual(1);

    await expect
      .poll(async () => {
        await page.evaluate(() => {
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo(0, maxScroll / 2);
        });
        return marker.evaluate((element) => element.getBoundingClientRect().x);
      })
      .toBeGreaterThan(startX + 20);
    const middleX = await marker.evaluate(
      (element) => element.getBoundingClientRect().x,
    );

    await expect
      .poll(async () => {
        await page.evaluate(() => {
          window.scrollTo(0, document.documentElement.scrollHeight);
        });
        return page.evaluate(() => {
          const markerElement = document.querySelector(
            "[data-nav-scroll-marker]",
          );
          const navbarElement = document.querySelector("header");
          if (!markerElement || !navbarElement) {
            return Number.POSITIVE_INFINITY;
          }

          return Math.abs(
            navbarElement.getBoundingClientRect().right -
              markerElement.getBoundingClientRect().right,
          );
        });
      })
      .toBeLessThanOrEqual(2);

    const finalX = await marker.evaluate(
      (element) => element.getBoundingClientRect().x,
    );
    expect(finalX).toBeGreaterThan(middleX);

    const finalGeometry = await page.evaluate(() => {
      const markerElement = document.querySelector("[data-nav-scroll-marker]");
      const fillElement = document.querySelector("[data-nav-progress-fill]");
      if (!markerElement || !fillElement) return null;

      const markerRect = markerElement.getBoundingClientRect();
      const fillRect = fillElement.getBoundingClientRect();

      return {
        fillRight: fillRect.right,
        markerCenterX: markerRect.left + markerRect.width / 2,
      };
    });

    expect(finalGeometry).not.toBeNull();
    expect(
      Math.abs(finalGeometry!.fillRight - finalGeometry!.markerCenterX),
    ).toBeLessThanOrEqual(1);
  });

  test("stays fixed while scrolling down", async ({ page }) => {
    await page.goto("/ouc-haide/education", { waitUntil: "networkidle" });

    const navbar = page.locator("header").first();
    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThanOrEqual(1200);

    await expect(navbar).toBeVisible();
    await expect(page.locator("[data-nav-scroll-marker]")).toBeVisible();
    const top = await navbar.evaluate(
      (element) => element.getBoundingClientRect().top,
    );
    expect(top).toBeGreaterThanOrEqual(-1);
    expect(top).toBeLessThanOrEqual(1);
  });

  test("uses dedicated inline artwork for every navigation folder", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/");

    if ((page.viewportSize()?.width ?? 1440) <= 1100) {
      await page.getByRole("button", { name: "Open navigation" }).click();
    }

    for (const folder of navigationFolders) {
      await page
        .locator("header nav button")
        .filter({ hasText: new RegExp(`^${folder.name}$`, "i") })
        .click();

      const panel = page.locator(`[data-menu-variant="${folder.variant}"]`);
      const artwork = panel.locator(`[data-navbar-art="${folder.variant}"]`);

      await expect(panel).toBeVisible();
      await expect(panel).toHaveCSS("background-color", "rgb(2, 177, 134)");
      await expect(artwork).toBeVisible();
      await expect(artwork).toHaveJSProperty("tagName", "svg");
      await expect(panel.locator("img")).toHaveCount(0);
      expect(await panel.locator("a").count()).toBeGreaterThanOrEqual(
        folder.minimumLinks,
      );

      if (folder.variant === "dry") {
        const modelStem = artwork.locator('path[stroke="var(--nav-menu-ink)"]');
        await expect(modelStem).toHaveCount(1);
        await expect(modelStem).toHaveCSS("stroke", "rgb(10, 71, 59)");
      }
    }
  });

  test("keeps every active dropdown item on the white card stroke", async ({
    page,
  }) => {
    for (const folder of navigationFolders) {
      await page.goto(`/ouc-haide${folder.currentPath}`);

      if ((page.viewportSize()?.width ?? 1440) <= 1100) {
        await page.getByRole("button", { name: "Open navigation" }).click();
      }

      await page
        .locator("header nav button")
        .filter({ hasText: new RegExp(`^${folder.name}$`, "i") })
        .click();

      const panel = page.locator(`[data-menu-variant="${folder.variant}"]`);
      const currentItem = panel.locator('a[aria-current="page"]');
      const itemBorderColors = await panel
        .locator("a")
        .evaluateAll((items) =>
          items.map((item) => getComputedStyle(item).borderTopColor),
        );

      await expect(panel).toBeVisible();
      expect(new Set(itemBorderColors)).toEqual(
        new Set(["rgb(255, 255, 255)"]),
      );
      await expect(currentItem).toHaveCount(1);
      await expect(currentItem).toHaveCSS(
        "border-top-color",
        "rgb(255, 255, 255)",
      );
    }
  });

  test("clips every dropdown artwork to its panel at responsive widths", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "The responsive matrix covers both desktop and mobile breakpoints.",
    );
    await page.emulateMedia({ reducedMotion: "reduce" });

    for (const width of [1440, 1101, 1024, 768, 640, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/ouc-haide/", { waitUntil: "domcontentloaded" });

      if (width <= 1100) {
        await page.getByRole("button", { name: "Open navigation" }).click();
      }

      for (const folder of navigationFolders) {
        await page
          .locator("header nav button")
          .filter({ hasText: new RegExp(`^${folder.name}$`, "i") })
          .click();

        const panel = page.locator(`[data-menu-variant="${folder.variant}"]`);
        await expect(panel).toBeVisible();

        const geometry = await panel.evaluate((element) => {
          const panelRect = element.getBoundingClientRect();
          const artwork = element.querySelector("[data-navbar-curves]");
          if (!artwork) return null;

          const artworkRect = artwork.getBoundingClientRect();
          const paths = Array.from(artwork.querySelectorAll("path"), (path) => {
            const bounds = path.getBBox();
            return {
              bottom: bounds.y + bounds.height,
              right: bounds.x + bounds.width,
              strokeWidth: getComputedStyle(path).strokeWidth,
            };
          });

          return {
            panelTop: panelRect.top,
            panelRight: panelRect.right,
            panelBottom: panelRect.bottom,
            panelLeft: panelRect.left,
            artworkTop: artworkRect.top,
            artworkRight: artworkRect.right,
            artworkBottom: artworkRect.bottom,
            artworkLeft: artworkRect.left,
            paths,
          };
        });

        expect(geometry).not.toBeNull();
        expect(
          Math.abs(geometry!.artworkTop - geometry!.panelTop),
        ).toBeLessThanOrEqual(0.5);
        expect(
          Math.abs(geometry!.artworkRight - geometry!.panelRight),
        ).toBeLessThanOrEqual(0.5);
        expect(
          Math.abs(geometry!.artworkBottom - geometry!.panelBottom),
        ).toBeLessThanOrEqual(0.5);
        expect(
          Math.abs(geometry!.artworkLeft - geometry!.panelLeft),
        ).toBeLessThanOrEqual(0.5);
        expect(geometry!.paths).toHaveLength(3);

        for (const path of geometry!.paths) {
          expect(path.strokeWidth).toBe("3.5px");
          expect(path.bottom).toBeGreaterThanOrEqual(320);
          expect(path.right).toBeGreaterThanOrEqual(1200);
        }
      }

      const pageWidths = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(pageWidths.scrollWidth).toBeLessThanOrEqual(
        pageWidths.clientWidth,
      );
    }
  });
});
