import { expect, test } from "@playwright/test";

const BACK_TO_TOP = '[data-back-to-top="true"]';

test.describe("back to top", () => {
  test("is mounted once across fullscreen, article, and not-found routes", async ({
    page,
  }) => {
    for (const path of ["/", "/description", "/members", "/not-a-real-page"]) {
      await page.goto(`/ouc-haide${path}`, { waitUntil: "networkidle" });
      await expect(page.locator(BACK_TO_TOP)).toHaveCount(1);
    }
  });

  test("reveals after the threshold and returns an article to the top", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/ouc-haide/description", { waitUntil: "networkidle" });

    const button = page.locator(BACK_TO_TOP);
    await expect(button).toHaveCount(1);
    await expect(button).toHaveAttribute("data-visible", "false");
    await expect(button).toHaveCSS("visibility", "hidden");
    await expect(button).toHaveAttribute("tabindex", "-1");

    await page.evaluate(() =>
      window.scrollTo({ top: 1400, behavior: "instant" }),
    );
    await expect(button).toHaveAttribute("data-visible", "true");
    await expect(button).toHaveCSS("visibility", "visible");
    await expect(button).toHaveAttribute("tabindex", "0");

    await button.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page.locator("main h1")).toBeFocused();
  });

  test("keeps the reveal state in sync after page navigation", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/ouc-haide/description", { waitUntil: "networkidle" });
    await page.evaluate(() =>
      window.scrollTo({ top: 1400, behavior: "instant" }),
    );

    const button = page.locator(BACK_TO_TOP);
    await expect(button).toHaveAttribute("data-visible", "true");

    await page
      .getByRole("banner")
      .getByRole("link", { name: "OUC-Haide home" })
      .click();
    await expect(page).toHaveURL(/\/ouc-haide\/$/);
    await expect(button).toHaveCount(1);
    await expect(button).toHaveAttribute("data-visible", "false");
  });

  test("works with the Lenis-owned home scroll after a responsive remount", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/", { waitUntil: "networkidle" });
    await expect(page.locator("#opening-screen")).toHaveCount(0);

    await page.evaluate(() => {
      const stage = document.querySelector<HTMLElement>("[data-home-canvas]");
      if (stage) {
        window.scrollTo({
          top: Math.min(stage.offsetHeight - window.innerHeight, 1600),
          behavior: "instant",
        });
      }
    });

    const button = page.locator(BACK_TO_TOP);
    await expect(button).toHaveAttribute("data-visible", "true");
    await page.setViewportSize({ width: 639, height: 1000 });
    await page.evaluate(() =>
      window.scrollTo({ top: 1600, behavior: "instant" }),
    );
    await expect(button).toHaveAttribute("data-visible", "true");
    await button.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("keeps the floating mascot hit target limited to the artwork", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/ouc-haide/description", { waitUntil: "networkidle" });
    await page.evaluate(() =>
      window.scrollTo({ top: 1400, behavior: "instant" }),
    );

    const button = page.locator(BACK_TO_TOP);
    await expect(button).toHaveAttribute("data-visible", "true");
    const hit = await button.evaluate((element) => {
      const artwork = element.querySelector("svg");
      if (!artwork) throw new Error("Back-to-top artwork is missing");
      const artRect = artwork.getBoundingClientRect();
      const buttonRect = element.getBoundingClientRect();
      const artTopLeft = document.elementFromPoint(
        artRect.left + 2,
        artRect.top + 2,
      );
      const center = document.elementFromPoint(
        buttonRect.left + buttonRect.width / 2,
        buttonRect.top + buttonRect.height / 2,
      );
      return {
        artTopLeft: artTopLeft?.tagName,
        center: center?.tagName,
      };
    });

    expect(hit.artTopLeft).not.toBe("BUTTON");
    expect(hit.center).toBe("BUTTON");
  });
});
