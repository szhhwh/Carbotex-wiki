import { expect, test } from "@playwright/test";
import {
  activeLabelNames,
  clickProvince,
  collectPageErrors,
  mapSnapshot,
  moveToProvince,
  openStandalone,
  openWiki,
  provinceFeatureState,
  renderedNames,
  stateOf,
  waitForMapIdle,
} from "./helpers";

test.describe("fermentation atlas", () => {
  test("renders every region and the maritime boundary", async ({ page }) => {
    const errors = collectPageErrors(page);
    const map = await openStandalone(page);
    const state = await stateOf(map);
    const snapshot = await mapSnapshot(map);

    expect(state.ready).toBe(true);
    expect(state.provinceCount).toBe(34);
    expect(state.maritimeCount).toBe(1);
    expect(state.bearing).toBe(0);
    expect(state.pitch).toBe(0);
    expect(snapshot.sourceCount).toBe(34);
    expect(snapshot.names).toContain("台湾省");
    expect(snapshot.names).toContain("香港特别行政区");
    expect(snapshot.names).toContain("澳门特别行政区");
    expect(snapshot.layerIds).toEqual(
      expect.arrayContaining([
        "province-fill",
        "province-stroke",
        "maritime-fill",
        "province-labels",
        "visited-markers",
      ]),
    );
    expect(snapshot.canvasSize.cssWidth).toBeGreaterThan(300);
    expect(snapshot.canvasSize.cssHeight).toBeGreaterThan(300);
    expect(snapshot.canvasSize.width).toBe(snapshot.canvasSize.cssWidth * 2);
    expect(snapshot.canvasSize.height).toBe(snapshot.canvasSize.cssHeight * 2);

    expect(await page.locator(".atlas-map-help").count()).toBe(0);
    expect(await page.locator(".atlas-legend").count()).toBe(0);
    expect(await page.getByText("Foods per region").count()).toBe(0);
    expect(
      await page.locator(".atlas-instructions").evaluate((element) => ({
        width: element.getBoundingClientRect().width,
        height: element.getBoundingClientRect().height,
        clipPath: getComputedStyle(element).clipPath,
      })),
    ).toEqual({ width: 1, height: 1, clipPath: "inset(50%)" });
    expect(errors).toEqual([]);
  });

  test("direct wheel zoom, drag pan, buttons and double click", async ({
    page,
  }) => {
    const errors = collectPageErrors(page);
    const map = await openStandalone(page);
    await map.scrollIntoViewIfNeeded();
    const box = await map.boundingBox();
    if (!box) throw new Error("Map has no bounding box");

    const initial = await stateOf(map);
    const scrollBefore = await page.evaluate(() => scrollY);
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await page.mouse.wheel(0, -500);
    await expect
      .poll(async () => (await stateOf(map)).zoom || 0)
      .toBeGreaterThan(initial.zoom || 0);
    await waitForMapIdle(map);
    const wheeled = await stateOf(map);
    expect(await page.evaluate(() => scrollY)).toBe(scrollBefore);

    const centerBefore = wheeled.center;
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(
      box.x + box.width * 0.5 + 100,
      box.y + box.height * 0.5 + 45,
      { steps: 12 },
    );
    await page.mouse.up();
    await waitForMapIdle(map);
    const panned = await stateOf(map);
    expect(panned.center).not.toEqual(centerBefore);

    await page.locator('[data-map-action="in"]').click();
    await waitForMapIdle(map);
    const zoomedIn = await stateOf(map);
    expect(zoomedIn.zoom).toBeGreaterThan(panned.zoom || 0);

    await page.locator('[data-map-action="out"]').click();
    await waitForMapIdle(map);
    const zoomedOut = await stateOf(map);
    expect(zoomedOut.zoom).toBeLessThan(zoomedIn.zoom || 0);

    await page.locator('[data-map-action="reset"]').click();
    await waitForMapIdle(map);
    const reset = await stateOf(map);
    expect(reset.zoom).toBeCloseTo(reset.baseZoom || 0, 2);

    const seaPoint = await map.evaluate((element) => {
      const atlas = element.atlasMap.getMap();
      const point = atlas.project([126, 31]);
      return { x: point.x, y: point.y };
    });
    await page.mouse.dblclick(box.x + seaPoint.x, box.y + seaPoint.y);
    await expect
      .poll(async () => (await stateOf(map)).zoom || 0)
      .toBeGreaterThan(reset.zoom || 0);
    await waitForMapIdle(map);

    const labelsButton = page.locator('[data-map-action="labels"]');
    await labelsButton.click();
    expect((await stateOf(map)).labelsVisible).toBe(false);
    await expect(labelsButton).toHaveAttribute("aria-pressed", "false");
    await labelsButton.click();
    expect((await stateOf(map)).labelsVisible).toBe(true);
    expect(errors).toEqual([]);
  });

  test("hover, province selection, search reveal and keyboard access", async ({
    page,
  }, testInfo) => {
    const errors = collectPageErrors(page);
    const map = await openStandalone(page);

    await moveToProvince(page, map, "四川省");
    await expect.poll(async () => (await stateOf(map)).hovered).toBe("四川省");
    await expect(page.locator(".atlas-tooltip")).toBeVisible();
    await expect(page.locator(".atlas-tooltip")).toContainText(
      "Sichuan Pickles",
    );

    await clickProvince(page, map, "四川省");
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await expect(page.locator("html")).toHaveClass(/atlas-dialog-open/);
    await expect(page.locator("#closeDetail")).toHaveCount(0);
    await expect(page.locator("#collapseDetail")).toHaveCount(0);
    await expect(page.locator("#backPanel")).toBeVisible();
    if (testInfo.project.name === "desktop") {
      await expect(page.locator("#detailPanel")).toHaveCSS("left", "12px");
    }
    expect(
      await page.locator("#detailPanel").evaluate((panel) => {
        const style = getComputedStyle(panel, "::backdrop");
        return {
          backgroundColor: style.backgroundColor,
          backdropFilter: style.backdropFilter,
        };
      }),
    ).toEqual({
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "none",
    });
    const selected = await stateOf(map);
    expect(selected.selected).toBe("四川省");
    expect(selected.visitedCount).toBe(1);
    expect(
      await page.evaluate(() => localStorage.getItem("ferment_visited")),
    ).toContain("四川省");

    await page.locator("#backPanel").click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", false);
    await expect(page.locator("html")).not.toHaveClass(/atlas-dialog-open/);
    await expect(page.locator("#expandDetail")).toBeVisible();
    await expect(page.locator("#expandDetail")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect((await stateOf(map)).selected).toBeNull();

    await page.locator("#expandDetail").click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await expect(page.locator("#expandDetail")).toBeHidden();
    await page.locator("#backPanel").click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", false);

    if (testInfo.project.name === "mobile") {
      await page.locator("#atlasPanelToggle").click();
    }
    await page.locator("#provinceSearch").fill("Sichuan");
    await page.locator(".atlas-region").first().click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await waitForMapIdle(map);
    const revealed = await stateOf(map);
    expect(revealed.selected).toBe("四川省");
    expect(revealed.zoom).toBeGreaterThan(revealed.baseZoom || 0);
    await page.locator("#backPanel").click();
    await waitForMapIdle(map);

    const canvas = map.locator("canvas");
    await canvas.focus();
    await page.keyboard.press("ArrowDown");
    await expect.poll(async () => (await stateOf(map)).hovered).not.toBeNull();
    await page.keyboard.press("Enter");
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    expect(errors).toEqual([]);
  });

  test("keeps the current camera when returning from same-craft results", async ({
    page,
  }) => {
    const errors = collectPageErrors(page);
    const map = await openStandalone(page);

    const beforeDetail = await stateOf(map);
    await clickProvince(page, map, "四川省");
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);

    await page.locator(".craft-search-btn").first().click();
    await expect(page.locator("#detailPanel")).toHaveAttribute(
      "data-view",
      "craft",
    );
    await page.locator("#backPanel").click();
    await expect(page.locator("#detailPanel")).toHaveAttribute(
      "data-view",
      "detail",
    );
    await waitForMapIdle(map);

    const afterBack = await stateOf(map);
    expect(afterBack.selected).toBe("四川省");
    expect(afterBack.zoom).toBeCloseTo(beforeDetail.zoom || 0, 3);
    expect(afterBack.center?.[0]).toBeCloseTo(beforeDetail.center?.[0] || 0, 3);
    expect(afterBack.center?.[1]).toBeCloseTo(beforeDetail.center?.[1] || 0, 3);
    expect(errors).toEqual([]);
  });

  test("keeps same-craft results open while dragging the map", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "The mobile detail sheet covers the map.",
    );
    const errors = collectPageErrors(page);
    const map = await openStandalone(page);

    await clickProvince(page, map, "四川省");
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await page.locator(".craft-search-btn").first().click();
    await expect(page.locator("#detailPanel")).toHaveAttribute(
      "data-view",
      "craft",
    );

    await map.scrollIntoViewIfNeeded();
    const box = await map.locator("canvas").boundingBox();
    if (!box) throw new Error("Map has no bounding box");
    const start = {
      x: box.x + box.width * 0.5,
      y: box.y + box.height * 0.5,
    };
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(start.x + 140, start.y + 45, { steps: 12 });
    await page.mouse.up();
    await waitForMapIdle(map);

    await expect(page.locator("#detailPanel")).toHaveAttribute(
      "data-view",
      "craft",
    );
    await expect(page.locator("#panelContext")).toContainText("From Sichuan");
    expect(errors).toEqual([]);
  });

  test("clicking an empty map area closes detail", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "The mobile detail sheet covers every province point.",
    );
    const errors = collectPageErrors(page);
    const map = await openStandalone(page);

    expect(await renderedNames(map, "province-labels")).toContain("四川省");

    await moveToProvince(page, map, "四川省");
    await expect.poll(async () => (await stateOf(map)).hovered).toBe("四川省");

    await clickProvince(page, map, "四川省");
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await expect
      .poll(
        async () =>
          (await provinceFeatureState(map, "provinces", "四川省")).selected,
      )
      .toBe(true);

    const selectedState = await provinceFeatureState(
      map,
      "provinces",
      "四川省",
    );
    expect(selectedState.hovered).not.toBe(true);
    expect(
      await provinceFeatureState(map, "province-points", "四川省"),
    ).toEqual(expect.objectContaining({ pinned: true }));
    expect(await activeLabelNames(map)).toContain("四川省");

    const panel = page.locator("#detailPanel");
    const mapBox = await map.boundingBox();
    if (!mapBox) throw new Error("Map has no bounding box");
    const emptyPoint = await map.evaluate((element) => {
      const atlas = element.atlasMap.getMap();
      const canvas = atlas.getCanvas();
      const rect = canvas.getBoundingClientRect();
      for (let y = 12; y < canvas.clientHeight - 12; y += 24) {
        for (let x = 12; x < canvas.clientWidth - 12; x += 24) {
          if (
            document.elementFromPoint(rect.left + x, rect.top + y) === canvas &&
            !atlas
              .queryRenderedFeatures([x, y], { layers: ["province-fill"] })
              .some((feature) => feature.properties.level === "province")
          ) {
            return { x: rect.left + x, y: rect.top + y };
          }
        }
      }
      throw new Error("Could not find an empty map point");
    });
    await page.mouse.click(emptyPoint.x, emptyPoint.y);
    await expect(panel).toHaveJSProperty("open", false);
    await expect(page.locator("#expandDetail")).toBeVisible();
    await expect.poll(async () => (await stateOf(map)).selected).toBeNull();

    const clearedState = await provinceFeatureState(map, "provinces", "四川省");
    expect(clearedState).toEqual(
      expect.objectContaining({ selected: false, visited: true }),
    );
    expect(clearedState.hovered).not.toBe(true);
    expect(
      await provinceFeatureState(map, "province-points", "四川省"),
    ).toEqual(expect.objectContaining({ pinned: true }));
    expect(await activeLabelNames(map)).toContain("四川省");
    expect((await stateOf(map)).pinned).toBe("四川省");
    expect((await stateOf(map)).hovered).toBeNull();
    expect(errors).toEqual([]);
  });

  test("locale switching updates labels", async ({ page }) => {
    const errors = collectPageErrors(page);
    const map = await openStandalone(page);

    await page.locator('[data-locale="zh"]').click();
    await expect(map).toHaveAttribute("data-locale", "zh");
    expect(
      await map.evaluate((element) =>
        element.atlasMap
          .getMap()
          .getLayoutProperty("province-labels", "text-field"),
      ),
    ).toEqual(["get", "label_zh"]);

    await page.locator('[data-locale="ja"]').click();
    await expect(map).toHaveAttribute("data-locale", "ja");
    expect(
      await map.evaluate((element) =>
        element.atlasMap
          .getMap()
          .getLayoutProperty("province-labels", "text-field"),
      ),
    ).toEqual(["get", "label_ja"]);

    await page.locator('[data-locale="en"]').click();
    await expect(map).toHaveAttribute("data-locale", "en");
    expect(
      await map.evaluate((element) =>
        element.atlasMap
          .getMap()
          .getLayoutProperty("province-labels", "text-field"),
      ),
    ).toEqual(["get", "label_en"]);
    expect(errors).toEqual([]);
  });
});

test.describe("wiki iframe", () => {
  test("loads the same map and keeps wheel zoom inside the frame", async ({
    page,
  }) => {
    const errors = collectPageErrors(page);
    const { map } = await openWiki(page);
    await expect(page.locator("iframe")).toHaveCount(1);

    const state = await stateOf(map);
    expect(state.provinceCount).toBe(34);
    expect(state.maritimeCount).toBe(1);

    await map.scrollIntoViewIfNeeded();
    const box = await map.boundingBox();
    if (!box) throw new Error("Map has no bounding box");
    const frameBefore = await map.evaluate(() => scrollY);
    const hostBefore = await page.evaluate(() => scrollY);
    const zoomBefore = state.zoom || 0;
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await page.mouse.wheel(0, -450);
    await expect
      .poll(async () => (await stateOf(map)).zoom || 0)
      .toBeGreaterThan(zoomBefore);
    await waitForMapIdle(map);

    expect(await map.evaluate(() => scrollY)).toBe(frameBefore);
    expect(await page.evaluate(() => scrollY)).toBe(hostBefore);
    expect(errors).toEqual([]);
  });

  test("leaving the activity destroys the iframe", async ({ page }) => {
    const errors = collectPageErrors(page);
    await openWiki(page);
    await page.getByRole("link", { name: "All activities" }).click();
    await expect(page).not.toHaveURL(/activity=fermentation/);
    await expect(page.locator("iframe")).toHaveCount(0);
    expect(errors).toEqual([]);
  });
});
