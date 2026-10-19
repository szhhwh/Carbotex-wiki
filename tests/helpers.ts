import { expect, type Locator, type Page } from "@playwright/test";

export const STANDALONE = "/ouc-haide/activities/fermentation-map/index.html";
export const WIKI_ENTRY = "/ouc-haide/education?activity=fermentation";

export type AtlasState = {
  ready: boolean;
  loaded: boolean;
  idle: boolean;
  active: boolean;
  selected: string | null;
  hovered: string | null;
  pinned: string | null;
  labelsVisible: boolean;
  provinceCount: number;
  maritimeCount: number;
  visitedCount: number;
  zoom: number | null;
  baseZoom: number | null;
  moving: boolean;
  center: [number, number] | null;
  bearing: number;
  pitch: number;
};

export function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.stack || error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

export async function openStandalone(page: Page) {
  await page.goto(STANDALONE);
  await expect(page.locator("#china-map")).toHaveAttribute(
    "data-ready",
    "true",
    {
      timeout: 30_000,
    },
  );
  return page.locator("#china-map");
}

export async function openWiki(page: Page) {
  await page.goto(WIKI_ENTRY);
  await expect(page).toHaveURL(/education\?activity=fermentation/);
  const frame = page.frameLocator("iframe");
  await expect(frame.locator("#china-map")).toHaveAttribute(
    "data-ready",
    "true",
    { timeout: 30_000 },
  );
  return {
    frame,
    map: frame.locator("#china-map"),
  };
}

export async function stateOf(map: Locator): Promise<AtlasState> {
  return map.evaluate((element) => element.atlasMap.getState());
}

export async function provinceFeatureState(
  map: Locator,
  source: "provinces" | "province-points",
  provinceName: string,
) {
  return map.evaluate(
    (element, { source, provinceName }) => {
      const atlas = element.atlasMap.getMap();
      const feature = atlas
        .getSource("province-points")
        ._data.geojson.features.find(
          (candidate) => candidate.properties.name === provinceName,
        );
      if (!feature) throw new Error(`Province not found: ${provinceName}`);
      return atlas.getFeatureState({
        source,
        id: feature.properties.adcode,
      });
    },
    { source, provinceName },
  );
}

export async function activeLabelNames(map: Locator): Promise<string[]> {
  return map.evaluate((element) =>
    element.atlasMap
      .getMap()
      .getSource("active-points")
      ._data.geojson.features.map((feature) => feature.properties.name),
  );
}

export async function renderedNames(map: Locator, layer: string) {
  return map.evaluate((element, layer) => {
    const atlas = element.atlasMap.getMap();
    return atlas
      .queryRenderedFeatures({ layers: [layer] })
      .map((feature) => feature.properties.name);
  }, layer);
}

export async function provincePoint(
  map: Locator,
  provinceName: string,
): Promise<{ x: number; y: number }> {
  return map.evaluate((element, name) => {
    const atlas = element.atlasMap.getMap();
    const source = atlas.getSource("province-points") as unknown as {
      _data: {
        geojson: {
          features: Array<{
            properties: { name: string };
            geometry: { coordinates: [number, number] };
          }>;
        };
      };
    };
    const feature = source._data.geojson.features.find(
      (candidate) => candidate.properties.name === name,
    );
    if (!feature) throw new Error(`Province point not found: ${name}`);
    const point = atlas.project(feature.geometry.coordinates);
    return { x: point.x, y: point.y };
  }, provinceName);
}

export async function moveToProvince(
  page: Page,
  map: Locator,
  provinceName: string,
) {
  await map.scrollIntoViewIfNeeded();
  const box = await map.boundingBox();
  if (!box) throw new Error("Map has no bounding box");
  const point = await provincePoint(map, provinceName);
  await page.mouse.move(box.x + point.x, box.y + point.y);
}

export async function clickProvince(
  page: Page,
  map: Locator,
  provinceName: string,
) {
  await moveToProvince(page, map, provinceName);
  await page.mouse.down();
  await page.mouse.up();
}

export async function mapSnapshot(map: Locator) {
  return map.evaluate((element) => {
    const atlas = element.atlasMap.getMap();
    const source = atlas.getSource("provinces") as unknown as {
      _data: {
        geojson: {
          features: Array<{
            properties: { adcode: number; name: string };
          }>;
        };
      };
    };
    const provinces = source._data.geojson.features;
    return {
      names: provinces.map((feature) => feature.properties.name),
      layerIds: atlas.getStyle().layers.map((layer) => layer.id),
      canvasSize: {
        width: atlas.getCanvas().width,
        height: atlas.getCanvas().height,
        cssWidth: atlas.getCanvas().clientWidth,
        cssHeight: atlas.getCanvas().clientHeight,
      },
      sourceCount: provinces.length,
    };
  });
}

export async function waitForMapIdle(map: Locator) {
  await expect
    .poll(async () => (await stateOf(map)).moving, { timeout: 10_000 })
    .toBe(false);
}
