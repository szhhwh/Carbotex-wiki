import { expect, test } from "@playwright/test";

test.describe("article references", () => {
  test("starts collapsed and opens a citation target", async ({ page }) => {
    await page.goto("/ouc-haide/description");

    const toggle = page.getByRole("button", {
      name: /^References \d+ sources? cited$/,
    });
    const panel = page.locator("#references [role='region']");

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();

    await page.locator("sup.cite-ref a").first().click();

    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toBeVisible();
    await expect(page).toHaveURL(/#ref-1$/);
    await expect(page.locator("#ref-1")).toBeFocused();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();
  });

  test("reveals a directly linked reference", async ({ page }) => {
    await page.goto("/ouc-haide/description#ref-2");

    const toggle = page.getByRole("button", {
      name: /^References \d+ sources? cited$/,
    });

    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#ref-2")).toBeVisible();
    await expect(page.locator("#ref-2")).toBeFocused();
  });

  test("opens References from the article outline", async ({ page }) => {
    await page.goto("/ouc-haide/design");
    const toggle = page.getByRole("button", {
      name: /^References \d+ sources? cited$/,
    });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    const outlineToggle = page.getByRole("button", { name: "On this page" });
    if (await outlineToggle.isVisible()) await outlineToggle.click();
    await page
      .getByRole("navigation", { name: "On this page" })
      .getByRole("link", { name: "09 References" })
      .click();

    await expect(page).toHaveURL(/#references$/);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#ref-1")).toBeVisible();

    // The hash should reveal the list on navigation, not prevent manual closing.
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    if (await outlineToggle.isVisible()) await outlineToggle.click();
    await page
      .getByRole("navigation", { name: "On this page" })
      .getByRole("link", { name: "09 References" })
      .click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  test("focuses a directly linked Design reference after the opening", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/design#ref-2");

    await expect(page.locator("#root")).not.toHaveAttribute("inert", "");
    await expect(page.locator("#ref-2")).toBeFocused();
  });

  test("keeps long reference text and numbers inside the panel", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/design#ref-2");
    await expect(page.locator("#ref-2")).toBeFocused();

    const layout = await page.locator("#references").evaluate((section) => {
      const panel = section.querySelector<HTMLElement>("[role='region']")!;
      const list = panel.querySelector<HTMLOListElement>("ol")!;
      const bounds = panel.getBoundingClientRect();
      return {
        overflow: panel.scrollWidth - panel.clientWidth,
        listInside: list.getBoundingClientRect().left >= bounds.left - 1,
        entriesInside: Array.from(list.children).every((entry) => {
          const box = entry.getBoundingClientRect();
          return (
            box.left >= bounds.left &&
            box.right <= bounds.right + 1 &&
            entry.scrollWidth <= entry.clientWidth + 1
          );
        }),
      };
    });
    expect(layout.overflow).toBeLessThanOrEqual(1);
    expect(layout.listInside).toBe(true);
    expect(layout.entriesInside).toBe(true);
  });

  test("links source URLs as well as DOI URLs", async ({ page }) => {
    const href =
      "https://mlsec.ouc.edu.cn/_upload/article/files/0a/d3/1cba9be242ec8bb03064d1a9e049/8fcdcd87-c2ed-4d84-9081-3966b882c3d0.pdf";

    await page.goto("/ouc-haide/safety-and-security");
    const link = page.locator(`#references a[href="${href}"]`);

    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link).toHaveCSS("text-decoration-line", "underline");
  });

  test("formats institutional reports with their original title", async ({
    page,
  }) => {
    const href =
      "https://mlsec.ouc.edu.cn/_upload/article/files/0a/d3/1cba9be242ec8bb03064d1a9e049/8fcdcd87-c2ed-4d84-9081-3966b882c3d0.pdf";

    await page.goto("/ouc-haide/safety-and-security");
    const link = page.locator(`#references a[href="${href}"]`);
    const entry = link.locator("xpath=ancestor::li");
    const text = await entry.innerText();

    await expect(entry).toContainText(
      "中国海洋大学实验室安全分类分级管理办法（2024年6月修订）",
    );
    await expect(entry).toContainText(
      "[Laboratory safety classification and grading management measures]",
    );
    expect(text.match(/Ocean University of China/g)).toHaveLength(1);
  });
});
