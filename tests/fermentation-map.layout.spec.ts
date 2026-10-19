import { expect, test, type Page } from "@playwright/test";
import {
  collectPageErrors,
  openStandalone,
  openWiki,
  stateOf,
  waitForMapIdle,
} from "./helpers";

type Rect = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
  position: string;
};

type LayoutMetrics = {
  client: { width: number; height: number };
  scroll: { x: number; y: number; width: number; height: number };
  nav: Rect;
  map: Rect;
  canvas: { width: number; height: number };
  overlays: Record<string, Rect>;
};

function readLayout(): LayoutMetrics {
  const overlaysSelectors = [".atlas-sidebar", ".atlas-controls"];
  const rect = (element: Element): Rect => {
    const box = element.getBoundingClientRect();
    return {
      top: box.top,
      right: box.right,
      bottom: box.bottom,
      left: box.left,
      width: box.width,
      height: box.height,
      position: getComputedStyle(element).position,
    };
  };
  const mapElement = document.querySelector("#china-map");
  const nav = document.querySelector(".navbar");
  const canvas = mapElement?.querySelector("canvas");
  if (!(mapElement instanceof HTMLElement) || !(nav instanceof HTMLElement)) {
    throw new Error("Atlas layout elements are missing");
  }
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Atlas canvas is missing");
  }
  const overlays: Record<string, Rect> = {};
  for (const selector of overlaysSelectors) {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Missing overlay: ${selector}`);
    overlays[selector] = rect(element);
  }
  return {
    client: {
      // body.clientWidth excludes the vertical scrollbar that the legal
      // notice introduces, matching the width available to the map.
      width: document.body.clientWidth,
      height: document.documentElement.clientHeight,
    },
    scroll: {
      x: window.scrollX,
      y: window.scrollY,
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    },
    nav: rect(nav),
    map: rect(mapElement),
    canvas: { width: canvas.clientWidth, height: canvas.clientHeight },
    overlays,
  };
}

async function layoutOf(page: Page) {
  return page.evaluate(readLayout);
}

async function hitTest(page: Page, selector: string) {
  return page.evaluate((target) => {
    const element = document.querySelector(target);
    if (!element) return { within: false, tag: null };
    const box = element.getBoundingClientRect();
    const hit = document.elementFromPoint(
      box.left + box.width / 2,
      box.top + box.height / 2,
    );
    return {
      within: Boolean(hit?.closest(target)),
      tag: hit?.tagName ?? null,
    };
  }, selector);
}

function expectFullBleed(metrics: LayoutMetrics) {
  expect(Math.abs(metrics.map.top - metrics.nav.bottom)).toBeLessThanOrEqual(1);
  expect(Math.abs(metrics.map.left)).toBeLessThanOrEqual(1);
  expect(
    Math.abs(metrics.map.width - metrics.client.width),
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(metrics.map.height - (metrics.client.height - metrics.nav.height)),
  ).toBeLessThanOrEqual(1);
  expect(metrics.canvas.width).toBeCloseTo(metrics.map.width, 0);
  expect(metrics.canvas.height).toBeCloseTo(metrics.map.height, 0);
  expect(metrics.scroll.width).toBeLessThanOrEqual(metrics.client.width + 1);
  expect(metrics.map.width).toBeGreaterThan(240);
  expect(metrics.map.height).toBeGreaterThan(200);
}

function expectFloating(metrics: LayoutMetrics) {
  for (const [selector, box] of Object.entries(metrics.overlays)) {
    expect(box.position, `${selector} should float`).toMatch(/absolute|fixed/);
    expect(box.width, `${selector} width`).toBeGreaterThan(0);
    expect(box.height, `${selector} height`).toBeGreaterThan(0);
    expect(box.left, `${selector} left`).toBeGreaterThanOrEqual(
      metrics.map.left - 1,
    );
    expect(box.right, `${selector} right`).toBeLessThanOrEqual(
      metrics.map.right + 1,
    );
    expect(box.top, `${selector} top`).toBeGreaterThanOrEqual(
      metrics.map.top - 1,
    );
    expect(box.top, `${selector} should intersect the map`).toBeLessThan(
      metrics.map.bottom,
    );
  }
}

test.describe("fermentation atlas layout", () => {
  test("map fills the activity viewport and the controls float above it", async ({
    page,
  }, testInfo) => {
    const errors = collectPageErrors(page);
    await openStandalone(page);
    const metrics = await layoutOf(page);

    expectFullBleed(metrics);
    expectFloating(metrics);

    const mapHit = await page.evaluate(() => {
      const map = document.querySelector("#china-map");
      if (!map) return null;
      const box = map.getBoundingClientRect();
      return (
        document.elementFromPoint(
          box.left + box.width / 2,
          box.top + box.height / 2,
        )?.tagName ?? null
      );
    });
    expect(mapHit).toBe("CANVAS");

    await expect(page.locator(".atlas-heading")).toHaveCount(0);
    await expect(
      page.locator(".atlas-region-heading + .atlas-search"),
    ).toHaveCount(1);
    await expect(page.locator(".atlas-region-heading")).toHaveCSS(
      "align-items",
      "center",
    );
    await expect(page.locator("#atlasSummary")).toHaveCount(0);
    await expect(page.locator(".atlas-progress-count")).toContainText(
      "regions",
    );
    await expect(page.locator(".atlas-progress-count")).toContainText("/ 34");
    await expect(page.locator(".atlas-progress-count")).toHaveText(
      /0\s*\/\s*34\s*regions/i,
    );
    expect((await hitTest(page, ".atlas-controls")).within).toBe(true);

    if (testInfo.project.name === "mobile") {
      await expect(page.locator("#atlasPanelToggle")).toBeVisible();
      await expect(page.locator("#atlasPanelToggle")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      await expect(page.locator("#atlasSidebarBody")).toHaveJSProperty(
        "inert",
        true,
      );
      expect((await hitTest(page, "#atlasPanelToggle")).within).toBe(true);
    } else {
      await expect(page.locator("#atlasPanelToggle")).toBeVisible();
      await expect(page.locator("#atlasPanelToggle")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
      await expect(page.locator("#atlasSidebarBody")).toHaveJSProperty(
        "inert",
        false,
      );
      for (const box of Object.values(metrics.overlays)) {
        expect(box.bottom).toBeLessThanOrEqual(metrics.map.bottom + 1);
      }
    }
    expect(errors).toEqual([]);
  });

  test("reveals provinces inside the unobscured map window", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "The mobile detail sheet covers the map.",
    );
    const errors = collectPageErrors(page);
    const map = await openStandalone(page);
    const initial = await stateOf(map);

    const revealMetrics = async () =>
      page.evaluate(() => {
        const mapElement = document.querySelector("#china-map");
        const detailPanel = document.querySelector("#detailPanel");
        const sidebar = document.querySelector(".atlas-sidebar");
        if (
          !(mapElement instanceof HTMLElement) ||
          !(detailPanel instanceof HTMLDialogElement) ||
          !(sidebar instanceof HTMLElement)
        ) {
          throw new Error("Reveal layout elements are missing");
        }

        const atlas = mapElement.atlasMap.getMap();
        const mapRect = atlas.getCanvas().getBoundingClientRect();
        const detailRect = detailPanel.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();
        const visible = {
          left: mapRect.left,
          right: mapRect.right,
          top: mapRect.top,
          bottom: mapRect.bottom,
        };
        if (detailPanel.open)
          visible.left = Math.max(visible.left, detailRect.right);
        if (sidebarRect.left > mapRect.left + mapRect.width / 2) {
          visible.right = Math.min(visible.right, sidebarRect.left);
        }

        const selected = mapElement.atlasMap.getState().selected;
        if (!selected) throw new Error("No province is selected");
        const feature = atlas
          .getSource("provinces")
          ._data.geojson.features.find(
            (candidate) => candidate.properties.name === selected,
          );
        if (!feature) throw new Error(`Province not found: ${selected}`);
        const bounds = feature.properties.bounds;
        const points = [
          atlas.project([bounds[0], bounds[1]]),
          atlas.project([bounds[0], bounds[3]]),
          atlas.project([bounds[2], bounds[1]]),
          atlas.project([bounds[2], bounds[3]]),
        ];
        const projected = {
          left: mapRect.left + Math.min(...points.map((point) => point.x)),
          right: mapRect.left + Math.max(...points.map((point) => point.x)),
          top: mapRect.top + Math.min(...points.map((point) => point.y)),
          bottom: mapRect.top + Math.max(...points.map((point) => point.y)),
        };
        return {
          selected,
          zoom: mapElement.atlasMap.getState().zoom,
          visible,
          projected,
        };
      });

    const revealFromSearch = async (query: string) => {
      await page.locator("#provinceSearch").fill(query);
      await page.locator(".atlas-region").first().click();
      await expect.poll(async () => (await stateOf(map)).selected).toBeTruthy();
      await waitForMapIdle(map);
      return revealMetrics();
    };

    const expanded = await revealFromSearch("Sichuan");
    expect(expanded.selected).toBe("四川省");
    expect(expanded.zoom).toBeGreaterThan(initial.baseZoom || 0);
    expect(expanded.projected.left).toBeGreaterThanOrEqual(
      expanded.visible.left,
    );
    expect(expanded.projected.right).toBeLessThanOrEqual(
      expanded.visible.right,
    );
    expect(expanded.projected.top).toBeGreaterThanOrEqual(expanded.visible.top);
    expect(expanded.projected.bottom).toBeLessThanOrEqual(
      expanded.visible.bottom,
    );
    expect(
      Math.abs(
        (expanded.projected.left + expanded.projected.right) / 2 -
          (expanded.visible.left + expanded.visible.right) / 2,
      ),
    ).toBeLessThanOrEqual(3);

    await page.locator("#backPanel").click();
    await page.waitForTimeout(300);
    const second = await revealFromSearch("Guangdong");
    expect(second.selected).toBe("广东省");
    expect(Math.abs((second.zoom || 0) - (expanded.zoom || 0))).toBeGreaterThan(
      0.05,
    );

    await page.locator("#backPanel").click();
    await page.waitForTimeout(300);
    await page.locator("#atlasPanelToggle").click();
    await expect(page.locator("#atlasPanelToggle")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    const cameraBeforeDetailReopen = await stateOf(map);
    await page.locator("#expandDetail").click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await waitForMapIdle(map);
    const cameraAfterDetailReopen = await stateOf(map);
    expect(cameraAfterDetailReopen.zoom).toBeCloseTo(
      cameraBeforeDetailReopen.zoom || 0,
      3,
    );
    expect(cameraAfterDetailReopen.center?.[0]).toBeCloseTo(
      cameraBeforeDetailReopen.center?.[0] || 0,
      3,
    );
    expect(cameraAfterDetailReopen.center?.[1]).toBeCloseTo(
      cameraBeforeDetailReopen.center?.[1] || 0,
      3,
    );

    const reopened = await revealMetrics();
    expect(reopened.selected).toBe("广东省");
    expect(reopened.projected.left).toBeGreaterThanOrEqual(
      reopened.visible.left,
    );
    expect(reopened.projected.right).toBeLessThanOrEqual(
      reopened.visible.right,
    );
    expect(errors).toEqual([]);
  });

  test("desktop sidebar collapses into an explored count rail", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop sidebar behavior");
    const errors = collectPageErrors(page);
    await openStandalone(page);

    const panel = page.locator(".atlas-sidebar");
    const toggle = page.locator("#atlasPanelToggle");
    const body = page.locator("#atlasSidebarBody");
    const expandedBox = await panel.boundingBox();
    if (!expandedBox) throw new Error("Sidebar has no bounding box");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(body).toHaveJSProperty("inert", true);
    await expect(body).toBeHidden();
    await page.waitForTimeout(450);
    await expect(page.locator("#atlasVisitedCompact")).toHaveText("0");
    await expect(page.locator(".atlas-panel-toggle-meta")).toContainText(
      "/ 34",
    );

    const collapsedBox = await panel.boundingBox();
    if (!collapsedBox) throw new Error("Collapsed sidebar has no bounding box");
    expect(collapsedBox.width).toBeLessThan(expandedBox.width);
    const collapsedToggleBox = await toggle.boundingBox();
    const mapBox = await page.locator("#china-map").boundingBox();
    if (!collapsedToggleBox || !mapBox) {
      throw new Error("Collapsed toggle or map is missing");
    }
    expect(collapsedBox.y).toBeCloseTo(expandedBox.y, 0);
    expect(
      Math.abs(collapsedBox.height - collapsedToggleBox.height),
    ).toBeLessThanOrEqual(2);
    expect(collapsedBox.x + collapsedBox.width).toBeCloseTo(
      mapBox.x + mapBox.width,
      0,
    );

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(body).toHaveJSProperty("inert", false);
    await expect(body).toBeVisible();

    await page.locator("#provinceSearch").fill("Sichuan");
    await page.locator(".atlas-region").first().click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await expect(page.locator("#collapseDetail")).toHaveCount(0);
    await expect(page.locator("#backPanel")).toBeVisible();
    await page.locator("#backPanel").click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", false);
    await expect(page.locator("#expandDetail")).toBeVisible();
    await page.waitForTimeout(300);
    const desktopExpandBox = await page.locator("#expandDetail").boundingBox();
    if (!desktopExpandBox) throw new Error("Detail expand button is missing");
    expect(desktopExpandBox.x).toBeCloseTo(0, 0);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#atlasVisitedCompact")).toHaveText("1");
    expect(errors).toEqual([]);
  });

  test("mobile drawer opens from search and the detail view stays on screen", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile drawer behavior");
    const errors = collectPageErrors(page);
    await openStandalone(page);

    const toggle = page.locator("#atlasPanelToggle");
    const body = page.locator("#atlasSidebarBody");
    const mapBoxBefore = await page.locator("#china-map").boundingBox();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(body).toHaveJSProperty("inert", true);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(body).toHaveJSProperty("inert", false);
    await expect(page.locator(".atlas-region").first()).toBeInViewport();
    expect(await page.locator("#china-map").boundingBox()).toEqual(
      mapBoxBefore,
    );

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.locator("#provinceSearch").fill("Sichuan");
    const sichuan = page.locator(".atlas-region").first();
    await expect(sichuan).toContainText("Sichuan");
    await expect(sichuan).toBeInViewport();
    await sichuan.click();

    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await expect
      .poll(() =>
        page
          .locator("#china-map canvas")
          .evaluate((canvas) => canvas.width / canvas.clientWidth),
      )
      .toBeCloseTo(await page.evaluate(() => devicePixelRatio), 2);
    await page.waitForTimeout(300);
    await expect(page.locator("#collapseDetail")).toHaveCount(0);
    await expect(page.locator("#backPanel")).toBeVisible();
    const dialog = await page.locator("#detailPanel").boundingBox();
    const viewport = page.viewportSize();
    if (!dialog || !viewport) throw new Error("Dialog or viewport missing");
    expect(dialog.x).toBeGreaterThanOrEqual(0);
    expect(dialog.y).toBeGreaterThanOrEqual(0);
    expect(dialog.x + dialog.width).toBeLessThanOrEqual(viewport.width + 1);
    expect(dialog.y + dialog.height).toBeLessThanOrEqual(viewport.height + 1);
    const detailOverflow = await page
      .locator("#detailPanel .detail-panel-scroll")
      .evaluate((panel) => ({
        overflowX: getComputedStyle(panel).overflowX,
        scrollWidth: panel.scrollWidth,
        clientWidth: panel.clientWidth,
      }));
    expect(detailOverflow.overflowX).toBe("hidden");
    expect(detailOverflow.scrollWidth).toBeLessThanOrEqual(
      detailOverflow.clientWidth + 1,
    );
    expect(await page.locator("#china-map").boundingBox()).toEqual(
      mapBoxBefore,
    );

    await page.locator("#backPanel").click();
    const closingState = await page
      .locator("#detailPanel")
      .evaluate((panel) => ({
        open: panel.open,
        closing: panel.classList.contains("is-closing"),
        animation: getComputedStyle(panel).animationName,
      }));
    expect(closingState).toEqual({
      open: true,
      closing: true,
      animation: "atlasDrawerOut",
    });
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", false);
    await expect(page.locator("#expandDetail")).toBeVisible();
    await page.waitForTimeout(300);
    const expandBox = await page.locator("#expandDetail").boundingBox();
    if (!expandBox) throw new Error("Detail expand button is missing");
    expect(expandBox.x).toBeCloseTo(0, 0);
    const cardStyles = await page.evaluate(() => {
      const detailButton = getComputedStyle(
        document.querySelector("#expandDetail"),
      );
      const regionPanel = getComputedStyle(
        document.querySelector(".atlas-sidebar"),
      );
      return {
        detailBackground: detailButton.backgroundColor,
        regionBackground: regionPanel.backgroundColor,
        detailShadow: detailButton.boxShadow,
        regionShadow: regionPanel.boxShadow,
      };
    });
    expect(cardStyles.detailBackground).toBe(cardStyles.regionBackground);
    expect(cardStyles.detailShadow).toBe(cardStyles.regionShadow);
    expect(errors).toEqual([]);
  });

  test("uses sans-serif interface text with readable body sizes", async ({
    page,
  }) => {
    const errors = collectPageErrors(page);
    await openStandalone(page);
    const typography = await page.evaluate(() => {
      const read = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const style = getComputedStyle(element);
        return {
          family: style.fontFamily,
          size: Number.parseFloat(style.fontSize),
          weight: style.fontWeight,
        };
      };
      return {
        body: read("body"),
        brand: read(".brand-title"),
        pageTitle: read(".lab-title"),
        discoveriesTitle: read(".atlas-progress > p:first-child"),
        regionTitle: read(".atlas-region-heading h2"),
        progressNumber: read(".atlas-progress strong"),
        region: read(".atlas-region"),
        search: read("#provinceSearch"),
        result: read(".atlas-draw-result"),
      };
    });

    expect(typography.body?.family).toContain("sans-serif");
    expect(typography.brand?.family).toContain("serif");
    expect(typography.pageTitle?.family).toContain("serif");
    expect(typography.discoveriesTitle?.size).toBe(
      typography.regionTitle?.size,
    );
    expect(typography.discoveriesTitle?.weight).toBe(
      typography.regionTitle?.weight,
    );
    expect(typography.regionTitle?.size).toBeGreaterThan(
      typography.search?.size ?? 0,
    );
    expect(typography.progressNumber?.size).toBeGreaterThanOrEqual(30);
    expect(typography.region?.family).toContain("sans-serif");
    expect(typography.search?.family).toContain("sans-serif");
    expect(typography.region?.size).toBe(typography.search?.size);
    expect(typography.region?.size).toBeGreaterThanOrEqual(15);
    expect(typography.search?.size).toBeGreaterThanOrEqual(15);
    expect(typography.result?.size).toBeGreaterThanOrEqual(13);
    expect(errors).toEqual([]);
  });

  test("same-craft results work as a drawer drill-down", async ({
    page,
  }, testInfo) => {
    const errors = collectPageErrors(page);
    const map = await openStandalone(page);
    const initialCamera = await stateOf(map);
    if (testInfo.project.name === "mobile") {
      await page.locator("#atlasPanelToggle").click();
    }
    await page.locator("#provinceSearch").fill("Sichuan");
    await page.locator(".atlas-region").first().click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await expect(page.locator("#provinceName")).toHaveText("Sichuan");
    await expect(page.locator("#backPanel")).toBeVisible();

    await page.locator(".craft-search-btn").first().click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await expect(page.locator("#detailPanel")).toHaveAttribute(
      "data-view",
      "craft",
    );
    await expect(page.locator("#craftPanel")).toHaveCount(0);
    await expect(page.locator("#panelContext")).toContainText("From Sichuan");
    await expect(page.locator(".craft-item").first()).toBeVisible();
    await expect(page.locator(".close-btn")).toHaveCount(0);

    await page.mouse.click(10, 10);
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await expect(page.locator("#detailPanel")).toHaveAttribute(
      "data-view",
      "detail",
    );
    await expect(page.locator("#provinceName")).toHaveText("Sichuan");
    await waitForMapIdle(map);

    await page.locator(".craft-search-btn").first().click();
    const target = page.locator(".craft-item").first();
    const targetProvince = await target.locator(".item-province").textContent();
    const targetProvinceCode = await target.getAttribute("data-province");
    const craftCamera = await stateOf(map);
    await target.click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await expect(page.locator("#provinceName")).toHaveText(
      targetProvince || "",
    );
    await expect(page.locator("#backPanel")).toBeVisible();
    await expect
      .poll(async () => (await stateOf(map)).selected)
      .toBe(targetProvinceCode);
    await waitForMapIdle(map);

    await page.locator("#backPanel").click();
    await expect(page.locator("#detailPanel")).toHaveAttribute(
      "data-view",
      "craft",
    );
    await expect(page.locator("#panelContext")).toContainText("From Sichuan");
    await expect(page.locator(".craft-item").first()).toBeVisible();
    await expect.poll(async () => (await stateOf(map)).selected).toBe("四川省");
    await waitForMapIdle(map);
    const restoredCamera = await stateOf(map);
    expect(restoredCamera.zoom).toBeCloseTo(craftCamera.zoom || 0, 3);
    expect(restoredCamera.center?.[0]).toBeCloseTo(
      craftCamera.center?.[0] || 0,
      3,
    );
    expect(restoredCamera.center?.[1]).toBeCloseTo(
      craftCamera.center?.[1] || 0,
      3,
    );
    await page.locator("#backPanel").click();
    await expect(page.locator("#detailPanel")).toHaveAttribute(
      "data-view",
      "detail",
    );
    await expect(page.locator("#provinceName")).toHaveText("Sichuan");
    await waitForMapIdle(map);
    const finalCamera = await stateOf(map);
    expect(finalCamera.zoom).toBeCloseTo(initialCamera.zoom || 0, 3);
    expect(finalCamera.center?.[0]).toBeCloseTo(
      initialCamera.center?.[0] || 0,
      3,
    );
    expect(finalCamera.center?.[1]).toBeCloseTo(
      initialCamera.center?.[1] || 0,
      3,
    );

    await page.mouse.click(10, 10);
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", false);
    expect(errors).toEqual([]);
  });

  test("keeps the shared navigation and atlas visual language on both pages", async ({
    page,
  }) => {
    const errors = collectPageErrors(page);
    await openStandalone(page);

    const readSharedChrome = () =>
      page.evaluate(() => {
        const read = (selector: string) => {
          const element = document.querySelector(selector);
          if (!element) throw new Error(`Missing element: ${selector}`);
          const style = getComputedStyle(element);
          return {
            background: style.backgroundImage,
            backgroundColor: style.backgroundColor,
            borderColor: style.borderBottomColor || style.borderTopColor,
            borderWidth: style.borderBottomWidth,
            boxShadow: style.boxShadow,
            color: style.color,
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            letterSpacing: style.letterSpacing,
            radius: style.borderRadius,
            textShadow: style.textShadow,
          };
        };
        return {
          body: read("body"),
          navbar: read(".navbar"),
          brand: read(".brand-title"),
          active: read(".nav-btn.active"),
          inactive: read(".nav-btn:not(.active)"),
          language: read(".activity-lang"),
        };
      });

    const mapChrome = await readSharedChrome();
    await page.locator('[data-page="lab"]').click();
    await expect(page.locator("#page-lab")).toHaveClass(/active/);
    await page.waitForTimeout(400);
    const labChrome = await readSharedChrome();
    expect(labChrome).toEqual(mapChrome);

    const labSystem = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const labElement = document.querySelector("#page-lab");
      const benchElement = document.querySelector(".lab-bench");
      if (!(labElement instanceof HTMLElement) || !benchElement) {
        throw new Error("Virtual lab surface is missing");
      }
      const lab = getComputedStyle(labElement);
      const bench = getComputedStyle(benchElement);
      return {
        green: [
          lab.getPropertyValue("--lab-green").trim(),
          root.getPropertyValue("--primary").trim(),
        ],
        ink: [
          lab.getPropertyValue("--lab-ink").trim(),
          root.getPropertyValue("--ink").trim(),
        ],
        paper: [
          lab.getPropertyValue("--lab-paper").trim(),
          root.getPropertyValue("--paper").trim(),
        ],
        cardBorder: bench.borderTopColor,
        cardRadius: bench.borderRadius,
      };
    });

    expect(labSystem.green[0]).toBe(labSystem.green[1]);
    expect(labSystem.ink[0]).toBe(labSystem.ink[1]);
    expect(labSystem.paper[0]).toBe(labSystem.paper[1]);
    expect(labSystem.cardBorder).not.toBe("rgba(0, 0, 0, 0)");
    expect(labSystem.cardRadius).toBe("12px");
    expect(errors).toEqual([]);
  });

  test("the virtual lab keeps A/B controls readable and localizes results", async ({
    page,
  }, testInfo) => {
    const errors = collectPageErrors(page);
    await openStandalone(page);
    await page.locator('[data-page="lab"]').click();
    await expect(page.locator("#page-lab")).toHaveClass(/active/);
    await expect(page.locator("#labColA")).toContainText("Bottle A");
    await expect(page.locator("#labColB")).toContainText("Bottle B");

    await page.locator("#runExperimentBtn").click();
    await expect(page.locator("#labResultsBody")).toContainText("Bottle A");
    await expect(page.locator("#labResultsBody")).toContainText(
      "Why this result",
    );

    await page.locator('[data-locale="zh"]').click();
    await expect(page.locator("#labResultsBody")).toContainText("结果解读");
    await expect(page.locator("#labResultsBody")).not.toContainText(
      "Why this result",
    );

    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      controlWidths: Array.from(
        document.querySelectorAll(".lab-compare tbody td"),
      ).map((cell) => cell.getBoundingClientRect().width),
    }));
    expect(layout.overflow).toBeLessThanOrEqual(1);
    if (testInfo.project.name === "mobile") {
      expect(Math.min(...layout.controlWidths)).toBeGreaterThan(100);
    }

    expect(new URL(page.url()).searchParams.get("page")).toBe("lab");
    expect(errors).toEqual([]);
  });

  test("the floating dice box opens a province on desktop and mobile", async ({
    page,
  }, testInfo) => {
    const errors = collectPageErrors(page);
    await openStandalone(page);
    if (testInfo.project.name === "mobile") {
      await page.locator("#atlasPanelToggle").click();
    }

    const dice = page.locator("#rollDiceBtn");
    await expect(dice).toBeVisible();
    await expect(page.locator(".dice-container")).toHaveCount(0);
    await expect(page.locator(".atlas-draw")).toBeVisible();
    await expect(page.locator("#diceResult")).toBeEmpty();
    await dice.click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true, {
      timeout: 6_000,
    });
    await expect(page.locator("#diceResult")).toContainText("The dice choose");
    await page.locator("#backPanel").click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", false);
    expect(errors).toEqual([]);
  });

  test("restores the full-resolution canvas after interactions and dialogs", async ({
    page,
  }, testInfo) => {
    await openStandalone(page);
    if (testInfo.project.name === "mobile") {
      await page.locator("#atlasPanelToggle").click();
    }
    const map = page.locator("#china-map");
    const deviceRatio = await page.evaluate(() => devicePixelRatio);
    const expectFullResolution = async () => {
      await expect
        .poll(() =>
          page
            .locator("#china-map canvas")
            .evaluate((canvas) => canvas.width / canvas.clientWidth),
        )
        .toBeCloseTo(deviceRatio, 2);
    };

    const box = await map.boundingBox();
    if (!box) throw new Error("Map has no bounding box");
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.wheel(0, -300);
    await waitForMapIdle(map);
    await expectFullResolution();

    await page.locator("#provinceSearch").fill("Sichuan");
    await page.locator(".atlas-region").first().click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await expectFullResolution();
    await page.locator("#backPanel").click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", false);
    await expectFullResolution();
    expect((await stateOf(map)).ready).toBe(true);
  });

  test("keeps the full-bleed layout across desktop, tablet, small and landscape viewports", async ({
    page,
  }, testInfo) => {
    const errors = collectPageErrors(page);
    const sizes: Array<[number, number]> =
      testInfo.project.name === "mobile"
        ? [
            [390, 844],
            [320, 640],
            [667, 375],
          ]
        : [
            [1440, 1000],
            [1024, 600],
            [820, 560],
            [667, 375],
          ];

    for (const [width, height] of sizes) {
      await page.setViewportSize({ width, height });
      await openStandalone(page);
      const metrics = await layoutOf(page);
      expectFullBleed(metrics);
      expectFloating(metrics);
      expect((await hitTest(page, ".atlas-controls")).within).toBe(true);
      if (width > 680) {
        expect(metrics.overlays[".atlas-sidebar"].bottom).toBeLessThanOrEqual(
          metrics.map.bottom,
        );
      }
      if (width <= 680) {
        await expect(page.locator("#atlasPanelToggle")).toBeVisible();
        await expect(page.locator("#atlasPanelToggle")).toHaveAttribute(
          "aria-expanded",
          "false",
        );
      } else {
        await expect(page.locator("#atlasPanelToggle")).toBeVisible();
        await expect(page.locator("#atlasPanelToggle")).toHaveAttribute(
          "aria-expanded",
          "true",
        );
        await expect(page.locator(".atlas-region").first()).toBeVisible();
      }
    }
    expect(errors).toEqual([]);
  });

  test("the embedded wiki activity keeps the same full-bleed layering", async ({
    page,
  }, testInfo) => {
    const errors = collectPageErrors(page);
    const { frame } = await openWiki(page);
    const metrics = await frame.locator("html").evaluate(readLayout);

    expectFullBleed(metrics);
    expectFloating(metrics);
    if (testInfo.project.name !== "mobile") {
      expect(metrics.overlays[".atlas-sidebar"].bottom).toBeLessThanOrEqual(
        metrics.map.bottom,
      );
    }
    expect(errors).toEqual([]);
  });
});
