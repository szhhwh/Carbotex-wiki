import { expect, test, type Page } from "@playwright/test";

async function selectReferencesFromOutline(page: Page) {
  const outline = page.locator("#article-outline");
  const outlineToggle = page.getByRole("button", { name: "On this page" });
  if (
    (await outlineToggle.isVisible()) &&
    (await outlineToggle.getAttribute("aria-expanded")) !== "true"
  ) {
    await outlineToggle.click();
  }
  await expect(outline).toBeVisible();

  await outline.evaluate((element) => {
    const link = element.querySelector<HTMLAnchorElement>(
      "a[data-section='references']",
    );
    if (!link) return;
    element.scrollTop = link.offsetTop - element.clientHeight / 2;

    // The mobile drawer can extend below the viewport. Bring its lower edge
    // into view before Playwright resolves the click target.
    const bottomOverflow = link.getBoundingClientRect().bottom - innerHeight;
    if (bottomOverflow > 0) {
      window.scrollBy({ top: bottomOverflow + 16, behavior: "instant" });
    }
  });
  await outline.locator("a[data-section='references']").click();
}

test.describe("article references", () => {
  test("uses the shared plain reference list on every referenced page", async ({
    page,
  }) => {
    const paths = [
      "/description",
      "/design",
      "/hardware",
      "/notebook",
      "/results",
      "/safety-and-security",
      "/human-practices",
    ];

    for (const path of paths) {
      await page.goto(`/ouc-haide${path}`);
      const toggle = page.getByRole("button", { name: /References$/ }).first();
      const panel = page.locator("#references [role='region']");

      await expect(toggle).toBeVisible();
      await expect(toggle).toHaveText("References");
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      const indicatorFace = toggle.locator(":scope > span:last-child > span");
      await expect(indicatorFace).toHaveCSS("border-top-width", "2px");
      await expect(indicatorFace).toHaveCSS(
        "border-top-color",
        "rgb(0, 63, 52)",
      );

      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await expect(panel).toBeVisible();
      await expect(panel.locator("li").first()).toBeVisible();
      const toggleBox = await toggle.boundingBox();
      expect(toggleBox?.height ?? 0).toBeGreaterThanOrEqual(44);

      const style = await panel
        .locator("li")
        .first()
        .evaluate((entry) => {
          const computed = getComputedStyle(entry);
          return {
            backgroundColor: computed.backgroundColor,
            borderRadius: computed.borderRadius,
            boxShadow: computed.boxShadow,
            borderBottomStyle: computed.borderBottomStyle,
            borderBottomWidth: computed.borderBottomWidth,
            borderLeftStyle: computed.borderLeftStyle,
            borderLeftWidth: computed.borderLeftWidth,
            paddingLeft: computed.paddingLeft,
            paddingRight: computed.paddingRight,
          };
        });
      expect(style.backgroundColor).toBe("rgba(0, 0, 0, 0)");
      expect(style.borderRadius).toBe("0px");
      expect(style.boxShadow).toBe("none");
      expect(style.borderBottomStyle).toBe("none");
      expect(style.borderBottomWidth).toBe("0px");
      expect(style.borderLeftStyle).toBe("none");
      expect(style.borderLeftWidth).toBe("0px");
      expect(style.paddingLeft).toBe("0px");
      expect(style.paddingRight).toBe("0px");

      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(panel).toBeHidden();
    }
  });

  test("uses one in-text citation treatment across article pages", async ({
    page,
  }) => {
    const paths = [
      "/ouc-haide/notebook",
      "/ouc-haide/description",
      "/ouc-haide/design",
      "/ouc-haide/hardware",
      "/ouc-haide/safety-and-security",
      "/ouc-haide/human-practices",
    ];
    type CitationTreatment = {
      fontFamily: string;
      fontSize: string;
      fontStyle: string;
      fontWeight: string;
      lineHeight: string;
      verticalAlign: string;
      marginLeft: string;
      whiteSpace: string;
      color: string;
      textDecorationLine: string;
    };
    const treatments: CitationTreatment[] = [];

    for (const path of paths) {
      await page.goto(path);
      const citation = page.locator("sup.cite-ref").first();
      await expect(citation).toBeVisible();
      treatments.push(
        await citation.evaluate((element) => {
          const superscript = getComputedStyle(element);
          const link = getComputedStyle(element.querySelector("a")!);
          return {
            fontFamily: superscript.fontFamily,
            fontSize: superscript.fontSize,
            fontStyle: superscript.fontStyle,
            fontWeight: superscript.fontWeight,
            lineHeight: superscript.lineHeight,
            verticalAlign: superscript.verticalAlign,
            marginLeft: superscript.marginLeft,
            whiteSpace: superscript.whiteSpace,
            color: link.color,
            textDecorationLine: link.textDecorationLine,
          };
        }),
      );
    }

    expect(treatments).toEqual(treatments.map(() => treatments[0]));
  });

  test("starts collapsed and opens a citation target", async ({ page }) => {
    await page.goto("/ouc-haide/description");

    const toggle = page.getByRole("button", {
      name: "References",
      exact: true,
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

  test("uses the shared collapsible reference list on Hardware", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/hardware");

    const toggle = page.getByRole("button", {
      name: "References",
      exact: true,
    });
    const panel = page.locator("#references [role='region']");
    const firstEntry = page.locator("#references li").first();

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toBeVisible();
    await expect(page.locator("#references li")).toHaveCount(4);
    await expect(firstEntry).toHaveCSS("border-radius", "0px");
    await expect(firstEntry).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(firstEntry).toHaveCSS("box-shadow", "none");
    await expect(firstEntry).toHaveCSS("border-bottom-style", "none");
    await expect(firstEntry).toHaveCSS("border-bottom-width", "0px");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();
  });

  test("reveals a directly linked reference", async ({ page }) => {
    await page.goto("/ouc-haide/description#ref-2");

    const toggle = page.getByRole("button", {
      name: "References",
      exact: true,
    });

    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#ref-2")).toBeVisible();
    await expect(page.locator("#ref-2")).toBeFocused();
  });

  test("opens References from the article outline", async ({ page }) => {
    await page.goto("/ouc-haide/design");
    const toggle = page.getByRole("button", {
      name: "References",
      exact: true,
    });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await selectReferencesFromOutline(page);

    await expect(page).toHaveURL(/#references$/);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#ref-1")).toBeVisible();

    // The hash should reveal the list on navigation, not prevent manual closing.
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("animates the reference panel and indicator", async ({ page }) => {
    await page.goto("/ouc-haide/hardware");

    const toggle = page.getByRole("button", {
      name: "References",
      exact: true,
    });
    const panel = page.locator("#references [role='region']");

    await expect(toggle).toBeVisible();
    await expect(panel).toBeHidden();

    const opening = await page.evaluate(async () => {
      const button = document.querySelector<HTMLButtonElement>(
        "#references button[aria-expanded]",
      )!;
      const region = document.querySelector<HTMLElement>(
        "#references [role='region']",
      )!;
      const indicator = button.lastElementChild as HTMLElement;
      const heights: number[] = [];
      const transforms: string[] = [];
      const started = performance.now();

      button.click();
      await new Promise<void>((resolve) => {
        const sample = () => {
          heights.push(region.getBoundingClientRect().height);
          transforms.push(getComputedStyle(indicator).transform);
          if (performance.now() - started < 700) {
            requestAnimationFrame(sample);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(sample);
      });

      return {
        display: getComputedStyle(region).display,
        expanded: button.getAttribute("aria-expanded"),
        finalHeight: region.getBoundingClientRect().height,
        heights,
        transforms,
      };
    });

    expect(opening.expanded).toBe("true");
    expect(opening.display).toBe("block");
    expect(opening.finalHeight).toBeGreaterThan(200);
    expect(
      opening.heights.some(
        (height) => height > 0 && height < opening.finalHeight - 5,
      ),
    ).toBe(true);
    expect(
      opening.transforms.some(
        (transform) =>
          transform !== "none" && transform !== "matrix(1, 0, 0, 1, 0, 0)",
      ),
    ).toBe(true);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();

    await expect
      .poll(() =>
        page
          .locator("#references button[aria-expanded] > span:last-child")
          .evaluate((indicator) => getComputedStyle(indicator).transform),
      )
      .toMatch(/^(none|matrix\(1, 0, 0, 1, 0, 0\))$/);
  });

  test("shows no opening animation with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/ouc-haide/hardware");

    const toggle = page.getByRole("button", {
      name: "References",
      exact: true,
    });
    const panel = page.locator("#references [role='region']");

    await toggle.click();
    await expect(panel).toBeVisible();

    const state = await page.locator("#references").evaluate((section) => {
      const region = section.querySelector<HTMLElement>("[role='region']")!;
      const button = section.querySelector<HTMLButtonElement>("button")!;
      return {
        display: getComputedStyle(region).display,
        height: region.getBoundingClientRect().height,
        expanded: button.getAttribute("aria-expanded"),
      };
    });

    expect(state.expanded).toBe("true");
    expect(state.display).toBe("block");
    expect(state.height).toBeGreaterThan(200);
  });

  test("focuses a directly linked Design reference after the opening", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/design#ref-2");

    await expect(page.locator("#root")).not.toHaveAttribute("inert", "");
    await expect(page.locator("#ref-2")).toBeFocused();
    const focusStyle = await page.locator("#ref-2").evaluate((entry) => {
      const computed = getComputedStyle(entry);
      return {
        outlineStyle: computed.outlineStyle,
        outlineWidth: computed.outlineWidth,
        outlineOffset: computed.outlineOffset,
      };
    });
    expect(focusStyle.outlineStyle).toBe("solid");
    expect(focusStyle.outlineWidth).toBe("3px");
    expect(Number.parseFloat(focusStyle.outlineOffset)).toBeLessThan(0);
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

    await page.goto("/ouc-haide/design#ref-20");
    await expect(page.locator("#ref-20")).toBeFocused();

    const number = await page
      .locator("#ref-20 > span > span[aria-hidden='true']")
      .first()
      .evaluate((element) => {
        const range = document.createRange();
        range.selectNodeContents(element);
        const rects = Array.from(range.getClientRects()).filter(
          (rect) => rect.width > 0 && rect.height > 0,
        );
        const computed = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        const firstTop = rects[0]?.top ?? 0;
        return {
          whiteSpace: computed.whiteSpace,
          textAlign: computed.textAlign,
          height: box.height,
          lineHeight: Number.parseFloat(computed.lineHeight),
          sameLine: rects.every((rect) => Math.abs(rect.top - firstTop) < 1),
        };
      });
    expect(number.whiteSpace).toBe("nowrap");
    expect(number.textAlign).toBe("end");
    expect(number.sameLine).toBe(true);
    expect(number.height).toBeLessThanOrEqual(number.lineHeight + 1);
    await expect(page.locator("#ref-20")).toContainText("Reference 20");
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
