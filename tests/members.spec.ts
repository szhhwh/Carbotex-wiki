import { expect, test } from "@playwright/test";

test.describe("team members page", () => {
  test("profile dialog opens without exposing scrollbars", async ({
    page,
  }, testInfo) => {
    const isDesktop = testInfo.project.name === "desktop";
    await page.goto("/ouc-haide/members");

    const overflowingFrames = await page.evaluate(async (desktop) => {
      const samples: number[][] = [];
      const startedAt = performance.now();

      const sample = () => {
        const dialog = document.querySelector("dialog");
        const scroller = dialog?.querySelector<HTMLElement>(
          "[data-profile-scroller]",
        );

        if (dialog && scroller) {
          samples.push([
            dialog.scrollWidth - dialog.clientWidth,
            dialog.scrollHeight - dialog.clientHeight,
            scroller.scrollWidth - scroller.clientWidth,
            scroller.scrollHeight - scroller.clientHeight,
          ]);
        }

        if (performance.now() - startedAt < 700) requestAnimationFrame(sample);
      };

      requestAnimationFrame(sample);
      document
        .querySelector<HTMLButtonElement>(
          desktop ? "[data-member-dot]" : '[aria-label^="Read "]',
        )
        ?.click();

      await new Promise((resolve) => setTimeout(resolve, 750));
      return samples.filter((sizes) => sizes.some((size) => size > 0));
    }, isDesktop);

    expect(overflowingFrames).toEqual([]);
  });

  test("switches between the desktop constellation and responsive roster", async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/ouc-haide/members");

    await expect(page.locator("#members-heading")).toHaveText("Meet Our Team");
    await expect(page.locator("[data-hero-media-slot]")).toBeVisible();
    await expect(page.locator("[data-hero-media-slot]")).toContainText(
      "Header image placeholder",
    );
    const heroComesBeforePhoto = await page.evaluate(() => {
      const hero = document
        .querySelector<HTMLElement>("[data-hero-media-slot]")
        ?.getBoundingClientRect();
      const photo = document
        .querySelector<HTMLElement>("figure")
        ?.getBoundingClientRect();
      if (!hero || !photo) return false;
      return hero.bottom <= photo.top;
    });
    expect(heroComesBeforePhoto).toBe(true);
    await expect(page.locator("figure img")).toHaveAttribute(
      "alt",
      /OUC-Haide team/,
    );
    await expect(page.locator("article")).toHaveCount(18);
    await expect(page.locator("article").first()).toContainText("Guanglei Liu");
    await expect(page.locator("article").first()).toContainText("Primary PI");
    await expect(page.locator("article").nth(1)).toContainText("Yajun Liu");
    await expect(page.locator("article").nth(1)).toContainText("Secondary PI");
    await expect(page.locator("article").nth(2)).toContainText("Ya Liu");
    await expect(page.locator("article").nth(2)).toContainText("Secondary PI");
    await expect(page.locator("article").nth(3)).toContainText("Hong Jiang");
    await expect(page.locator("article").nth(3)).toContainText("Secondary PI");
    await expect(page.locator("article").nth(4)).toContainText("Qiaoyue Ren");
    await expect(page.locator("article").nth(4)).toContainText("Instructor");
    await expect(page.locator("article").nth(5)).toContainText("Yueyang Sun");
    await expect(page.locator("article").nth(5)).toContainText("Instructor");
    await expect(page.locator("article").nth(13)).toContainText("Suiyuan Wang");
    await expect(page.locator("article").nth(13)).toContainText("Dry Lab");
    await expect(page.locator("article").last()).toContainText("Advisors");
    await expect(page.locator("article").last()).toContainText(
      "Special Thanks To",
    );

    if (testInfo.project.name === "desktop") {
      await expect(page.locator("[data-member-dot]")).toHaveCount(18);
      await expect(page.locator("[data-member-dot]").first()).toBeVisible();
      await expect(page.locator("article").first()).toBeHidden();

      await page.evaluate(() => {
        document
          .querySelector<HTMLButtonElement>(
            '[data-member-dot][data-member-id="zhibo-yang-model"]',
          )
          ?.click();
      });
    } else {
      await expect(page.locator("[data-member-dot]").first()).toBeHidden();
      await expect(page.locator("article").first()).toBeVisible();
      await page
        .getByRole("button", {
          name: "Read Zhibo Yang's profile (Team Leader)",
        })
        .click();
    }

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { level: 2 })).toHaveText(
      "Zhibo Yang",
    );
    await expect(
      dialog.locator(
        testInfo.project.name === "desktop"
          ? '[data-role="model"]'
          : '[data-role="leader"]',
      ),
    ).toBeVisible();
    await expect(dialog).not.toContainText("Team member ·");

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    expect(errors).toEqual([]);
  });

  test("keeps the shared Hardware shell inside each responsive breakpoint", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 1440, height: 1000 },
      { width: 768, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/ouc-haide/members");
      await expect(page.locator("#members-heading")).toBeVisible();

      const layout = await page.evaluate(() => {
        const media = document
          .querySelector<HTMLElement>("[data-hero-media-slot]")
          ?.getBoundingClientRect();
        const photo = document
          .querySelector<HTMLElement>("figure")
          ?.getBoundingClientRect();

        return {
          overflow:
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
          placeholder: document.querySelector("[data-hero-media-slot]")
            ?.textContent,
          mediaWidth: media?.width ?? 0,
          photoWidth: photo?.width ?? 0,
          photoTop: photo?.top ?? 0,
          mediaBottom: media?.bottom ?? 0,
        };
      });

      expect(layout.overflow).toBeLessThanOrEqual(1);
      expect(layout.placeholder).toContain("Header image placeholder");
      expect(layout.mediaWidth).toBeGreaterThan(0);
      expect(layout.photoWidth).toBeGreaterThan(0);
      expect(layout.photoTop).toBeGreaterThanOrEqual(layout.mediaBottom);
      await expect(page.locator("article")).toHaveCount(18);
    }
  });

  test("removes the member index and keeps the responsive network layout", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 1440, height: 1000 },
      { width: 768, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/ouc-haide/members");
      await expect(page.locator("#members-heading")).toBeVisible();
      await expect(page.locator("[data-member-index]")).toHaveCount(0);
      await expect(page.getByText("Member index", { exact: true })).toHaveCount(
        0,
      );
      await expect(page.getByText("Full roster", { exact: true })).toHaveCount(
        0,
      );

      if (viewport.width >= 1200) {
        await expect(page.locator("[data-member-dot]")).toHaveCount(18);
        await expect(page.locator("#team-network")).toBeVisible();
        await expect(page.locator("#roster-heading")).toBeHidden();
      } else {
        await expect(page.locator("#roster-heading")).toBeVisible();
      }

      await expect(
        page.getByText("The people behind Carbotex", { exact: true }),
      ).toHaveCount(0);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        ),
      ).toBeLessThanOrEqual(1);
    }
  });
});

test.describe("team members reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("uses the static roster instead of the scroll constellation", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/members");

    await expect(page.locator("[data-member-dot]").first()).toBeHidden();
    await expect(page.locator("article").first()).toBeVisible();
    await expect(page.locator("article")).toHaveCount(18);
  });
});
