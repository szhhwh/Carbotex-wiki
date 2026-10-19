import { Map as MapLibreMap, setWorkerUrl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import serifLatinUrl from "@fontsource-variable/noto-serif-sc/files/noto-serif-sc-latin-wght-normal.woff2?url";
import { FOOD_DATA } from "../data/foods.js";
import { getLocale } from "../../shared/js/i18n.js";
import { localizeFood, provinceLabel, provinceLabels, t } from "./i18n.js";

const PALETTE = ["#ebe5d2", "#bfcea8", "#73956d", "#2d5a3d"];
const HOVER_FILL = "#b29a50";
const SELECTED_FILL = "#a38a3c";
const CHINA_BOUNDS = [
  [73, 18],
  [135, 54],
];
const MAP_PADDING = { top: 24, right: 24, bottom: 38, left: 24 };
const FONT_FACE = "Atlas Serif";
const FONT_STACK = [FONT_FACE];
const LOCAL_FONT_STACK =
  '"Noto Serif CJK SC", "Songti SC", "STSong", "SimSun", serif';
const LABEL_ANCHORS = [
  "center",
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];
const LABEL_LAYOUT = {
  "text-field": ["get", "label_en"],
  "text-font": FONT_STACK,
  "text-size": 12,
  "text-anchor": "center",
  "text-justify": "center",
  "text-max-width": 7,
  "text-line-height": 1,
  "text-letter-spacing": 0,
  "text-padding": 3,
  "text-allow-overlap": false,
  "text-ignore-placement": false,
  "text-optional": true,
  "text-variable-anchor": LABEL_ANCHORS,
  "text-radial-offset": 0.5,
  "symbol-sort-key": ["-", ["get", "area"], 0],
};

let nextMapId = 0;
setWorkerUrl(maplibreWorkerUrl);

function geometryBounds(geometry) {
  let west = Infinity;
  let south = Infinity;
  let east = -Infinity;
  let north = -Infinity;

  const visit = (coordinates) => {
    if (
      Array.isArray(coordinates) &&
      coordinates.length >= 2 &&
      typeof coordinates[0] === "number" &&
      typeof coordinates[1] === "number"
    ) {
      west = Math.min(west, coordinates[0]);
      south = Math.min(south, coordinates[1]);
      east = Math.max(east, coordinates[0]);
      north = Math.max(north, coordinates[1]);
      return;
    }
    for (const child of coordinates || []) visit(child);
  };

  visit(geometry.coordinates);
  return [west, south, east, north];
}

function foodCount(name) {
  return FOOD_DATA[name]?.foods.length || 0;
}

// DataV publishes RFC 7946 winding. MapLibre consumes that directly; unlike
// D3's spherical polygons, no ring reversal is needed.
export function prepareMapGeometry(geometry) {
  const provinces = geometry.features.filter(
    (feature) => feature.properties.level === "province",
  );
  const codes = new Set(provinces.map((feature) => feature.properties.adcode));
  if (
    provinces.length !== 34 ||
    codes.size !== 34 ||
    ![710000, 810000, 820000].every((code) => codes.has(code)) ||
    !geometry.features.some((feature) => feature.properties.adchar === "JD")
  ) {
    throw new Error(
      "The national map must include 34 province-level regions and maritime boundaries.",
    );
  }

  return {
    ...geometry,
    features: geometry.features.map((feature) => {
      if (feature.properties.level !== "province") return feature;
      const name = feature.properties.name;
      const labels = provinceLabels(name);
      const bounds = geometryBounds(feature.geometry);
      return {
        ...feature,
        properties: {
          ...feature.properties,
          area: (bounds[2] - bounds[0]) * (bounds[3] - bounds[1]),
          foodCount: foodCount(name),
          label_en: labels.en,
          label_zh: labels.zh,
          label_ja: labels.ja,
          bounds,
        },
      };
    }),
  };
}

function provinceFill() {
  return [
    "case",
    ["boolean", ["feature-state", "hovered"], false],
    HOVER_FILL,
    ["boolean", ["feature-state", "selected"], false],
    SELECTED_FILL,
    [
      "step",
      ["get", "foodCount"],
      PALETTE[0],
      1,
      PALETTE[1],
      2,
      PALETTE[2],
      3,
      PALETTE[3],
    ],
  ];
}

function mapStyle(provinceData, maritimeData, labelData) {
  return {
    version: 8,
    "font-faces": {
      [FONT_FACE]: [
        {
          url: serifLatinUrl,
          "unicode-range": ["U+0000-024F", "U+1E00-1EFF", "U+2000-206F"],
        },
      ],
    },
    sources: {
      provinces: {
        type: "geojson",
        data: provinceData,
        promoteId: "adcode",
        // Fill edges sit under the province stroke, so modest simplification
        // removes costly triangles without changing the visible boundary.
        tolerance: 0.75,
      },
      maritime: {
        type: "geojson",
        data: maritimeData,
        tolerance: 0.75,
      },
      "province-points": {
        type: "geojson",
        data: labelData,
        promoteId: "adcode",
      },
      "active-points": {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      },
    },
    layers: [
      // Explicit strokes cover these fill edges, so skip the extra
      // antialiasing geometry in the full-viewport renderer.
      {
        id: "province-depth-fill",
        type: "fill",
        source: "provinces",
        paint: {
          "fill-color": "#78866b",
          "fill-opacity": 0.22,
          "fill-translate": [0, 2],
          "fill-antialias": false,
        },
      },
      {
        id: "province-depth-line",
        type: "line",
        source: "provinces",
        paint: {
          "line-color": "#78866b",
          "line-opacity": 0.22,
          "line-width": 3,
          "line-translate": [0, 2],
        },
      },
      {
        id: "province-fill",
        type: "fill",
        source: "provinces",
        paint: {
          "fill-color": provinceFill(),
          "fill-antialias": false,
          "fill-color-transition": { duration: 120, delay: 0 },
        },
      },
      {
        id: "maritime-fill",
        type: "fill",
        source: "maritime",
        paint: {
          "fill-color": "#49674e",
          "fill-antialias": false,
        },
      },
      {
        id: "maritime-line",
        type: "line",
        source: "maritime",
        paint: {
          "line-color": "#49674e",
          "line-width": 0.5,
        },
      },
      {
        id: "province-stroke",
        type: "line",
        source: "provinces",
        layout: {
          "line-join": "round",
        },
        paint: {
          "line-color": "#426047",
          "line-width": 0.8,
        },
      },
      {
        id: "province-active-line",
        type: "line",
        source: "provinces",
        layout: {
          "line-join": "round",
        },
        paint: {
          "line-color": "#7d672e",
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hovered"], false],
            1.6,
            ["boolean", ["feature-state", "selected"], false],
            2,
            0,
          ],
          "line-opacity": [
            "case",
            ["boolean", ["feature-state", "hovered"], false],
            1,
            ["boolean", ["feature-state", "selected"], false],
            1,
            0,
          ],
        },
      },
      {
        id: "province-labels",
        type: "symbol",
        source: "province-points",
        layout: LABEL_LAYOUT,
        paint: {
          "text-color": "#233e2b",
          "text-halo-color": "rgba(250, 246, 234, 0.85)",
          "text-halo-width": 2,
          "text-halo-blur": 0,
          "text-opacity": [
            "case",
            ["boolean", ["feature-state", "hovered"], false],
            0,
            ["boolean", ["feature-state", "selected"], false],
            0,
            ["boolean", ["feature-state", "pinned"], false],
            0,
            1,
          ],
        },
      },
      {
        id: "visited-markers",
        type: "circle",
        source: "province-points",
        paint: {
          "circle-radius": [
            "case",
            ["boolean", ["feature-state", "visited"], false],
            3,
            0,
          ],
          "circle-color": "#faf6ea",
          "circle-stroke-color": "#9b7f31",
          "circle-stroke-width": [
            "case",
            ["boolean", ["feature-state", "visited"], false],
            1.8,
            0,
          ],
          "circle-translate": [0, 12],
        },
      },
      {
        id: "active-labels",
        type: "symbol",
        source: "active-points",
        layout: {
          ...LABEL_LAYOUT,
          "text-ignore-placement": false,
          "text-allow-overlap": false,
          "text-optional": false,
          "text-padding": 0,
          "text-radial-offset": 1,
        },
        paint: {
          "text-color": "#30260e",
          "text-halo-color": "rgba(250, 246, 234, 0.95)",
          "text-halo-width": 2.2,
          "text-halo-blur": 0,
        },
      },
    ],
  };
}

function isProvinceFeature(feature) {
  return feature?.properties?.level === "province";
}

function labelPoint(feature) {
  const properties = feature.properties;
  return (
    properties.centroid ||
    properties.center || [
      (properties.bounds[0] + properties.bounds[2]) / 2,
      (properties.bounds[1] + properties.bounds[3]) / 2,
    ]
  );
}

export function createAtlasMap(
  container,
  { geometry, getVisits, onSelect, onMapClick },
) {
  const id = `atlas-${++nextMapId}`;
  const provinces = geometry.features.filter(isProvinceFeature);
  const maritime = geometry.features.filter(
    (feature) => feature.properties.adchar === "JD",
  );
  const featuresByName = new Map(
    provinces.map((feature) => [feature.properties.name, feature]),
  );
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const events = new AbortController();
  let map = null;
  let width = 0;
  let height = 0;
  let active = true;
  let disposed = false;
  let loaded = false;
  let idle = false;
  let selectedName = null;
  let selectedId = null;
  let hoveredName = null;
  let hoveredId = null;
  let pinnedName = null;
  let pinnedId = null;
  let labelsVisible = true;
  let baseZoom = null;
  let hasUserCamera = false;
  let keyboardIndex = -1;
  let pendingReveal = false;
  let lastPointerPosition = null;
  let tooltipSize = { width: 240, height: 100 };
  let cameraNavigationId = 0;
  let expandedSidebarWidth = null;
  let expandedSidebarRightInset = null;
  const pendingFeatureStates = new Map();

  container.classList.add("atlas-map");
  container.innerHTML = `
    <div class="atlas-viewport"></div>
    <div class="atlas-ui">
      <div class="atlas-controls" role="group">
        <button type="button" data-map-action="in">+</button>
        <button type="button" data-map-action="out">−</button>
        <button type="button" data-map-action="reset">↺</button>
        <button type="button" data-map-action="labels" aria-pressed="true">Aa</button>
      </div>
      <div class="atlas-tooltip" role="tooltip" id="${id}-tooltip" hidden></div>
    </div>
    <p class="atlas-instructions sr-only" id="${id}-instructions"></p>
    <p class="atlas-announcement sr-only" aria-live="polite"></p>`;

  const viewport = container.querySelector(".atlas-viewport");
  const controls = container.querySelector(".atlas-controls");
  const tooltip = container.querySelector(".atlas-tooltip");
  const announcement = container.querySelector(".atlas-announcement");
  const instructions = container.querySelector(".atlas-instructions");
  const provinceData = {
    type: "FeatureCollection",
    features: provinces,
  };
  const maritimeData = {
    type: "FeatureCollection",
    features: maritime,
  };
  const labelData = {
    type: "FeatureCollection",
    features: provinces.map((feature) => ({
      type: "Feature",
      id: feature.properties.adcode,
      properties: feature.properties,
      geometry: {
        type: "Point",
        coordinates: labelPoint(feature),
      },
    })),
  };

  function visitCount() {
    return Object.keys(getVisits()).length;
  }

  function setState(source, featureId, state) {
    if (!map || featureId == null) return;
    if (!loaded) {
      const key = `${source}:${featureId}`;
      const pending = pendingFeatureStates.get(key);
      pendingFeatureStates.set(key, {
        source,
        featureId,
        state: { ...pending?.state, ...state },
      });
      return;
    }
    map.setFeatureState({ source, id: featureId }, state);
  }

  function flushPendingFeatureStates() {
    if (!map) return;
    for (const { source, featureId, state } of pendingFeatureStates.values()) {
      map.setFeatureState({ source, id: featureId }, state);
    }
    pendingFeatureStates.clear();
  }

  function syncDataset() {
    container.dataset.visited = String(visitCount());
    container.dataset.selected = selectedName || "";
    container.dataset.pinned = pinnedName || "";
    container.dataset.zoom = map
      ? map.getZoom().toFixed(3)
      : baseZoom === null
        ? ""
        : baseZoom.toFixed(3);
    container.dataset.visible = String(active);
  }

  function applyVisits() {
    if (!map) return;
    const visits = getVisits();
    for (const feature of provinces) {
      const state = { visited: Boolean(visits[feature.properties.name]) };
      setState("provinces", feature.properties.adcode, state);
      setState("province-points", feature.properties.adcode, state);
    }
    syncDataset();
  }

  function updateActiveLabels() {
    if (!map || !loaded) return;
    const names = new Set();
    if (selectedName) names.add(selectedName);
    if (hoveredName) names.add(hoveredName);
    if (pinnedName) names.add(pinnedName);
    const features = [];
    for (const name of names) {
      const feature = featuresByName.get(name);
      if (!feature) continue;
      features.push({
        type: "Feature",
        id: feature.properties.adcode,
        properties: feature.properties,
        geometry: {
          type: "Point",
          coordinates: labelPoint(feature),
        },
      });
    }
    map.getSource("active-points")?.setData({
      type: "FeatureCollection",
      features,
    });
  }

  function setHovered(name) {
    if (hoveredName === name) return;
    if (hoveredId !== null) {
      setState("provinces", hoveredId, { hovered: false });
      setState("province-points", hoveredId, { hovered: false });
    }
    hoveredName = name;
    hoveredId = name ? featuresByName.get(name)?.properties.adcode : null;
    if (hoveredId != null) {
      setState("provinces", hoveredId, { hovered: true });
      setState("province-points", hoveredId, { hovered: true });
    }
    updateActiveLabels();
    if (map) {
      map.getCanvas().style.cursor = name ? "pointer" : "";
    }
  }

  function showTooltip(name, point) {
    if (!active || !featuresByName.has(name)) return;
    setHovered(name);
    tooltip.replaceChildren();

    const title = document.createElement("strong");
    title.textContent = provinceLabel(name);
    const foods = document.createElement("p");
    foods.textContent = FOOD_DATA[name]
      ? FOOD_DATA[name].foods
          .map((food) => localizeFood(food).name)
          .join(t("map.listSeparator"))
      : t("map.tooltip.noRecord");
    const status = document.createElement("span");
    status.textContent = getVisits()[name]
      ? t("map.tooltip.visited")
      : t("map.tooltip.notVisited");
    tooltip.append(title, foods, status);
    tooltip.hidden = false;
    tooltipSize = { width: tooltip.offsetWidth, height: tooltip.offsetHeight };
    positionTooltip(name, point);
  }

  function positionTooltip(name, point) {
    if (!map || tooltip.hidden) return;
    const anchor =
      point ||
      map.project(labelPoint(featuresByName.get(name) || provinces[0]));
    let x = anchor.x + 16;
    let y = anchor.y + 18;
    if (x + tooltipSize.width > width - 8)
      x = anchor.x - tooltipSize.width - 12;
    if (y + tooltipSize.height > height - 8)
      y = anchor.y - tooltipSize.height - 12;
    tooltip.style.transform = `translate(${Math.max(8, x)}px, ${Math.max(8, y)}px)`;
  }

  function hideTooltip({ keepKeyboard = false } = {}) {
    setHovered(null);
    tooltip.hidden = true;
    if (!keepKeyboard) keyboardIndex = -1;
  }

  function rememberPointerPosition(event) {
    if (event.pointerType === "touch") return;
    lastPointerPosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function restoreHoverAtPointer() {
    if (!active || !map || !loaded || !lastPointerPosition) return;

    const canvas = map.getCanvas();
    const rect = canvas.getBoundingClientRect();
    const point = {
      x: lastPointerPosition.x - rect.left,
      y: lastPointerPosition.y - rect.top,
    };
    if (
      point.x < 0 ||
      point.y < 0 ||
      point.x >= rect.width ||
      point.y >= rect.height
    ) {
      hideTooltip();
      return;
    }

    // The pointer may still be over a dialog, sidebar, or control. Once that
    // overlay closes, only restore map hover when the canvas is underneath it.
    if (
      document.elementFromPoint(
        lastPointerPosition.x,
        lastPointerPosition.y,
      ) !== canvas
    ) {
      hideTooltip();
      return;
    }

    const feature = map.queryRenderedFeatures([point.x, point.y], {
      layers: ["province-fill"],
    })[0];
    if (isProvinceFeature(feature)) {
      showTooltip(feature.properties.name, point);
    } else {
      hideTooltip();
    }
  }

  function applySelected({ reveal = false } = {}) {
    if (!map) return;
    if (selectedId !== null) {
      setState("provinces", selectedId, { selected: false });
      setState("province-points", selectedId, { selected: false });
    }
    selectedId = selectedName
      ? featuresByName.get(selectedName)?.properties.adcode
      : null;
    if (selectedId != null) {
      setState("provinces", selectedId, { selected: true });
      setState("province-points", selectedId, { selected: true });
    }
    updateActiveLabels();
    syncDataset();
    if (reveal && selectedName) revealProvince(selectedName);
  }

  function fitPadding() {
    const mapRect = container.getBoundingClientRect();
    const scope = container.closest(".map-container");
    const compact = mapRect.height < 480;
    const padding = compact
      ? { top: 16, right: 16, bottom: 16, left: 16 }
      : { ...MAP_PADDING };
    if (!scope) return padding;

    const addOverlayPadding = (
      element,
      { compensateTransform = false, layoutRect = null } = {},
    ) => {
      const overlayRect =
        layoutRect ||
        (compensateTransform
          ? rectWithoutTransform(element)
          : element.getBoundingClientRect());
      const overlapsVertically =
        overlayRect.bottom > mapRect.top && overlayRect.top < mapRect.bottom;
      const overlapsHorizontally =
        overlayRect.right > mapRect.left && overlayRect.left < mapRect.right;
      if (!overlapsVertically || !overlapsHorizontally) return;

      const mapCenterX = mapRect.left + mapRect.width / 2;
      const isWideSheet = overlayRect.width >= mapRect.width * 0.75;
      const isBottomSheet =
        isWideSheet && overlayRect.top > mapRect.top + mapRect.height / 2;
      if (isBottomSheet) {
        padding.bottom = Math.max(
          padding.bottom,
          mapRect.bottom - overlayRect.top + 24,
        );
        return;
      }

      if (overlayRect.left < mapCenterX) {
        padding.left = Math.max(
          padding.left,
          overlayRect.right - mapRect.left + 24,
        );
      }
      if (overlayRect.right > mapCenterX) {
        padding.right = Math.max(
          padding.right,
          mapRect.right - overlayRect.left + 24,
        );
      }
    };

    if (scope) {
      const page = scope.closest(".page") || scope.parentElement;
      const desktopLayout = matchMedia("(min-width: 681px)").matches;
      const detailPanel = page?.querySelector("dialog.detail-panel[open]");
      const sidebar = scope.querySelector(".atlas-sidebar");
      if (sidebar && (desktopLayout || !detailPanel)) {
        const sidebarRect = sidebar.getBoundingClientRect();
        const collapsedWidth =
          Number.parseFloat(
            getComputedStyle(scope).getPropertyValue(
              "--atlas-panel-collapsed-width",
            ),
          ) || 64;
        const sidebarMoving = sidebar
          .getAnimations()
          .some((animation) => animation.playState === "running");
        if (
          desktopLayout &&
          scope.dataset.panelOpen !== "false" &&
          !sidebarMoving &&
          sidebarRect.width > collapsedWidth + 4
        ) {
          expandedSidebarWidth = sidebarRect.width;
          expandedSidebarRightInset = Math.max(
            0,
            mapRect.right - sidebarRect.right,
          );
        }
        const openWidth = expandedSidebarWidth || sidebarRect.width;
        const openRightInset =
          expandedSidebarRightInset ??
          Math.max(0, mapRect.right - sidebarRect.right);
        const layoutRect = desktopLayout
          ? {
              top: sidebarRect.top,
              bottom: sidebarRect.bottom,
              left:
                scope.dataset.panelOpen === "false"
                  ? mapRect.right - collapsedWidth
                  : mapRect.right - openRightInset - openWidth,
              right:
                scope.dataset.panelOpen === "false"
                  ? mapRect.right
                  : mapRect.right - openRightInset,
              width:
                scope.dataset.panelOpen === "false"
                  ? collapsedWidth
                  : openWidth,
            }
          : null;
        addOverlayPadding(sidebar, { layoutRect });
      }

      // The detail dialog is fixed outside the map container. On desktop it
      // leaves a real map strip between the two panels; use its final layout
      // box even while its slide-in animation is still running.
      if (detailPanel && desktopLayout) {
        addOverlayPadding(detailPanel, { compensateTransform: true });
      }
    }

    const controls = container.querySelector(".atlas-controls");
    if (
      !compact &&
      controls &&
      getComputedStyle(controls).pointerEvents !== "none" &&
      Number.parseFloat(getComputedStyle(controls).opacity) > 0.01
    ) {
      const rect = controls.getBoundingClientRect();
      padding.bottom = Math.max(padding.bottom, mapRect.bottom - rect.top + 12);
    }
    return padding;
  }

  function rectWithoutTransform(element) {
    const rect = element.getBoundingClientRect();
    const transform = getComputedStyle(element).transform;
    if (!transform || transform === "none") return rect;

    const values = transform
      .replace(/^matrix(3d)?\(/, "")
      .replace(/\)$/, "")
      .split(",")
      .map(Number);
    const translateX = values.length === 16 ? values[12] : values[4];
    const translateY = values.length === 16 ? values[13] : values[5];
    if (!Number.isFinite(translateX) || !Number.isFinite(translateY)) {
      return rect;
    }

    return {
      ...rect,
      left: rect.left - translateX,
      right: rect.right - translateX,
      top: rect.top - translateY,
      bottom: rect.bottom - translateY,
    };
  }

  function fitInitial(animate = false) {
    if (!map || !width || !height) return;
    map.setMinZoom(0);
    map.setMaxZoom(22);
    const camera = map.cameraForBounds(CHINA_BOUNDS, {
      padding: fitPadding(),
    });
    if (camera) {
      baseZoom = camera.zoom;
      if (animate && !reducedMotion.matches) {
        map.easeTo({ ...camera, duration: 280, essential: true });
      } else {
        map.jumpTo(camera);
      }
    } else {
      map.fitBounds(CHINA_BOUNDS, {
        padding: fitPadding(),
        duration: animate && !reducedMotion.matches ? 280 : 0,
        essential: true,
      });
      baseZoom = map.getZoom();
    }
    map.setMinZoom(baseZoom);
    // Province reveals use the camera derived from each province's own
    // bounds. Keep the map's manual zoom ceiling independent from that
    // calculation so small and large provinces do not collapse to one zoom.
    map.setMaxZoom(22);
    syncDataset();
  }

  function revealProvince(name) {
    const feature = featuresByName.get(name);
    if (!feature || baseZoom === null) return;
    hasUserCamera = true;
    const navigationId = ++cameraNavigationId;
    map.stop();
    container.classList.add("is-navigating");
    map.once("moveend", () => {
      if (navigationId === cameraNavigationId) {
        container.classList.remove("is-navigating");
      }
    });
    const bounds = feature.properties.bounds;
    const padding = fitPadding();
    const camera = map.cameraForBounds(
      [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ],
      {
        padding,
        maxZoom: 22,
      },
    );
    if (!camera) return;

    map.flyTo({
      center: camera.center,
      zoom: camera.zoom,
      bearing: camera.bearing,
      pitch: camera.pitch,
      curve: 1.42,
      duration: reducedMotion.matches ? 0 : 620,
      essential: true,
    });
  }

  function getCameraState() {
    if (!map) return null;
    return {
      center: map.getCenter().toArray(),
      zoom: map.getZoom(),
      bearing: map.getBearing(),
      pitch: map.getPitch(),
    };
  }

  function restoreCameraState(cameraState) {
    if (!map || !cameraState) return;
    const navigationId = ++cameraNavigationId;
    map.stop();
    container.classList.add("is-navigating");
    map.once("moveend", () => {
      if (navigationId === cameraNavigationId) {
        container.classList.remove("is-navigating");
      }
    });
    map.easeTo({
      ...cameraState,
      duration: reducedMotion.matches ? 0 : 620,
      easing: (progress) => 1 - Math.pow(1 - progress, 3),
      essential: true,
    });
  }

  function zoomBy(factor) {
    if (!map) return;
    hasUserCamera = true;
    const maxZoom = map.getMaxZoom();
    map.easeTo({
      zoom: Math.max(baseZoom || 0, Math.min(maxZoom, map.getZoom() * factor)),
      duration: reducedMotion.matches ? 0 : 220,
      essential: true,
    });
  }

  function select(name, { reveal = false, restoreHover = false } = {}) {
    if (map && (reveal || !name)) {
      cameraNavigationId += 1;
      map.stop();
      container.classList.remove("is-navigating");
    }
    selectedName = featuresByName.has(name) ? name : null;
    if (selectedName && selectedName !== pinnedName) {
      if (pinnedId !== null) {
        setState("province-points", pinnedId, { pinned: false });
      }
      pinnedName = selectedName;
      pinnedId = featuresByName.get(selectedName).properties.adcode;
      setState("province-points", pinnedId, { pinned: true });
    }
    container.dataset.selected = selectedName || "";
    if (loaded) {
      applySelected({ reveal });
    } else {
      pendingReveal = pendingReveal || reveal;
    }
    hideTooltip();
    if (restoreHover) restoreHoverAtPointer();
  }

  function update() {
    applyVisits();
  }

  function installMap() {
    try {
      map = new MapLibreMap({
        container: viewport,
        style: mapStyle(provinceData, maritimeData, labelData),
        bounds: CHINA_BOUNDS,
        fitBoundsOptions: {
          padding: MAP_PADDING,
          duration: 0,
        },
        minPitch: 0,
        maxPitch: 0,
        minZoom: 0,
        maxZoom: 22,
        renderWorldCopies: false,
        attributionControl: false,
        maplibreLogo: false,
        scrollZoom: true,
        dragRotate: false,
        touchPitch: false,
        pitchWithRotate: false,
        boxZoom: false,
        keyboard: false,
        clickTolerance: 6,
        fadeDuration: 0,
        refreshExpiredTiles: false,
        antialias: true,
        localIdeographFontFamily: LOCAL_FONT_STACK,
      });
      map.touchZoomRotate.disableRotation();
      map.dragRotate.disable();

      const canvas = map.getCanvas();
      canvas.tabIndex = 0;
      canvas.setAttribute("role", "application");
      canvas.setAttribute("aria-describedby", `${id}-instructions`);

      const resize = () => {
        if (!map || !active) return;
        const previousWidth = width;
        const previousHeight = height;
        width = container.clientWidth;
        height = container.clientHeight;
        if (!width || !height) return;
        map.resize();
        if (
          loaded &&
          !hasUserCamera &&
          (Math.abs(width - previousWidth) > 40 ||
            Math.abs(height - previousHeight) > 40)
        ) {
          fitInitial(false);
        }
        syncDataset();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(container);
      events.signal.addEventListener("abort", () => observer.disconnect(), {
        once: true,
      });

      map.on("mousemove", "province-fill", (event) => {
        if (
          container.classList.contains("is-navigating") ||
          event.originalEvent?.pointerType === "touch"
        )
          return;
        const feature = event.features?.[0];
        if (!feature) return;
        rememberPointerPosition(event.originalEvent);
        const name = feature.properties.name;
        if (name !== hoveredName) showTooltip(name, event.point);
        else positionTooltip(name, event.point);
      });

      map.on("mouseleave", "province-fill", () => {
        if (!container.classList.contains("is-navigating")) hideTooltip();
      });

      map.on("click", "province-fill", (event) => {
        const feature = event.features?.[0];
        if (feature) onSelect(feature.properties.name);
      });
      map.on("click", (event) => {
        const feature = map.queryRenderedFeatures(event.point, {
          layers: ["province-fill"],
        })[0];
        if (!feature) onMapClick?.();
      });

      document.addEventListener("pointermove", rememberPointerPosition, {
        signal: events.signal,
        capture: true,
        passive: true,
      });
      document.addEventListener("pointerdown", rememberPointerPosition, {
        signal: events.signal,
        capture: true,
        passive: true,
      });

      map.on("movestart", (event) => {
        if (!event.originalEvent) return;
        hasUserCamera = true;
        hideTooltip();
        container.classList.add("is-navigating");
      });
      map.on("moveend", () => {
        container.classList.remove("is-navigating");
        syncDataset();
      });
      map.on("zoom", syncDataset);
      map.on("error", (event) => {
        if (event.error) {
          console.error("Atlas map error:", event.error);
          container.dataset.error = event.error.message;
        }
      });
      map.on("load", () => {
        loaded = true;
        flushPendingFeatureStates();
        width = container.clientWidth;
        height = container.clientHeight;
        map.resize();
        fitInitial(false);
        applyVisits();
        refreshLocale();
        if (selectedName) applySelected({ reveal: pendingReveal });
        pendingReveal = false;
        map.once("idle", () => {
          idle = true;
          container.dataset.ready = "true";
        });
      });

      canvas.addEventListener(
        "keydown",
        (event) => {
          if (["+", "=", "-", "0"].includes(event.key)) {
            event.preventDefault();
            if (event.key === "0") fitInitial(true);
            else zoomBy(event.key === "-" ? 1 / 1.5 : 1.5);
            return;
          }
          if (event.key === "Escape") {
            hideTooltip();
            return;
          }
          if (
            ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
              event.key,
            )
          ) {
            event.preventDefault();
            const direction = ["ArrowLeft", "ArrowUp"].includes(event.key)
              ? -1
              : 1;
            keyboardIndex =
              (keyboardIndex + direction + provinces.length) % provinces.length;
            const name = provinces[keyboardIndex].properties.name;
            showTooltip(name);
            announcement.textContent = t("map.atlas.province", {
              province: provinceLabel(name),
              count: foodCount(name),
            });
            return;
          }
          if (event.key === "Enter" || event.key === " ") {
            const name =
              hoveredName ||
              provinces[Math.max(0, keyboardIndex)]?.properties.name;
            if (!name) return;
            event.preventDefault();
            event.stopPropagation();
            if (!event.repeat) onSelect(name);
          }
        },
        { signal: events.signal },
      );

      const onWheel = (event) => {
        if (!active || !map) return;
        const target = event.target;
        if (target instanceof Element && target.closest(".atlas-controls"))
          return;
        // The map owns the wheel whenever the pointer is over the atlas, so
        // the surrounding wiki page does not scroll.
        event.preventDefault();
        if (target === canvas || !target) return;
        canvas.dispatchEvent(
          new WheelEvent("wheel", {
            bubbles: true,
            cancelable: true,
            view: window,
            deltaX: event.deltaX,
            deltaY: event.deltaY,
            deltaZ: event.deltaZ,
            deltaMode: event.deltaMode,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
            altKey: event.altKey,
            metaKey: event.metaKey,
            clientX: event.clientX,
            clientY: event.clientY,
          }),
        );
      };
      container.addEventListener("wheel", onWheel, {
        capture: true,
        passive: false,
        signal: events.signal,
      });
    } catch (error) {
      console.error("Unable to create the WebGL atlas map:", error);
      container.dataset.error = error.message;
    }
  }

  controls.addEventListener(
    "click",
    (event) => {
      const action = event.target.closest("button")?.dataset.mapAction;
      if (action === "in") zoomBy(1.5);
      if (action === "out") zoomBy(1 / 1.5);
      if (action === "reset") fitInitial(true);
      if (action === "labels") {
        labelsVisible = !labelsVisible;
        event.target
          .closest("button")
          .setAttribute("aria-pressed", String(labelsVisible));
        if (map) {
          for (const layer of ["province-labels", "active-labels"]) {
            map.setLayoutProperty(
              layer,
              "visibility",
              labelsVisible ? "visible" : "none",
            );
          }
        }
      }
    },
    { signal: events.signal },
  );

  function refreshLocale() {
    container.dataset.locale = getLocale();
    instructions.textContent = t("map.atlas.help");
    controls.setAttribute("aria-label", t("map.atlas.controls"));
    for (const [action, key] of Object.entries({
      in: "zoomIn",
      out: "zoomOut",
      reset: "reset",
      labels: "labels",
    })) {
      const button = controls.querySelector(`[data-map-action="${action}"]`);
      button.setAttribute("aria-label", t(`map.atlas.${key}`));
      button.title = t(`map.atlas.${key}`);
    }
    if (map?.isStyleLoaded()) {
      const labelField = ["get", `label_${getLocale()}`];
      map.setLayoutProperty("province-labels", "text-field", labelField);
      map.setLayoutProperty("active-labels", "text-field", labelField);
      map.getCanvas().setAttribute("aria-label", t("map.series.foods"));
    }
    hideTooltip();
  }

  function setVisible(visible) {
    active = visible;
    container.dataset.visible = String(active);
    if (!map) return;
    if (active) {
      map.resize();
      syncDataset();
    } else {
      cameraNavigationId += 1;
      map.stop();
      hideTooltip();
      container.classList.remove("is-navigating");
    }
  }

  function destroy() {
    if (disposed) return;
    disposed = true;
    events.abort();
    map?.remove();
    map = null;
    delete container.atlasMap;
    container.dataset.ready = "false";
    container.replaceChildren();
  }

  function getState() {
    return {
      ready: container.dataset.ready === "true",
      loaded,
      idle,
      active,
      selected: selectedName,
      hovered: hoveredName,
      pinned: pinnedName,
      labelsVisible,
      provinceCount: provinces.length,
      maritimeCount: maritime.length,
      visitedCount: visitCount(),
      zoom: map?.getZoom() ?? null,
      baseZoom,
      moving: map?.isMoving() ?? false,
      center: map?.getCenter().toArray() ?? null,
      bearing: map?.getBearing() ?? 0,
      pitch: map?.getPitch() ?? 0,
    };
  }

  container.atlasMap = {
    getMap: () => map,
    getCameraState,
    getState,
    restoreCameraState,
  };

  installMap();
  refreshLocale();
  syncDataset();
  if (selectedName) applySelected({ reveal: pendingReveal });

  return {
    refreshLocale,
    update,
    select,
    setVisible,
    destroy,
    getCameraState,
    getState,
    restoreCameraState,
  };
}
