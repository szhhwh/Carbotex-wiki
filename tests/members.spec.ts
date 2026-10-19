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

    await expect(page.locator("#members-heading")).toHaveText(
      "THE PEOPLE BEHIND CARBOTEX",
    );
    await expect(page.locator("figure img")).toHaveAttribute(
      "alt",
      /OUC-Haide team/,
    );
    await expect(page.locator("article")).toHaveCount(10);

    if (testInfo.project.name === "desktop") {
      await expect(page.locator("[data-member-dot]")).toHaveCount(10);
      await expect(page.locator("[data-member-dot]").first()).toBeVisible();
      await expect(page.locator("article").first()).toBeHidden();

      await page.evaluate(() => {
        document
          .querySelectorAll<HTMLButtonElement>("[data-member-dot]")[1]
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
});

test.describe("team members reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("uses the static roster instead of the scroll constellation", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/members");

    await expect(page.locator("[data-member-dot]").first()).toBeHidden();
    await expect(page.locator("article").first()).toBeVisible();
    await expect(page.locator("article")).toHaveCount(10);
  });
});
