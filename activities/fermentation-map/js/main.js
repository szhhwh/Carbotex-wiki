import { initLab, refreshLabLocale } from "./lab.js";
import {
  craftDescription,
  craftLabel,
  localizeFood,
  provinceLabel,
  t,
} from "./i18n.js";
import { initActivityI18n } from "../../shared/js/i18n.js";
import { createAtlasMap, prepareMapGeometry } from "./atlas-map.js";
import chinaGeoJsonUrl from "../data/china.json?url";
import { FOOD_DATA, CRAFT_TYPES } from "../data/foods.js";
import { storage } from "../../shared/js/storage.js";
import "../../shared/js/accessibility.js";
import "../../shared/css/accessibility.css";
import "../../shared/css/language-switcher.css";
import { mountActivityLegalFooter } from "../../shared/js/activity-footer.js";

mountActivityLegalFooter();

// ===== 全局变量 =====
let exploreMap = null;
let mapGeometry = null;
let visitedProvinces = {}; // { provinceName: { date, foods: [] } }
let isRolling = false;
let diceTimer = null;
// 足迹保存在本机浏览器中
const VISITED_KEY = "ferment_visited";
let lastDiceProvince = null;
let panelStack = [];
let lastDetailProvince = null;

const atlasRoot = document.getElementById("atlasRoot");
const atlasPanelToggle = document.getElementById("atlasPanelToggle");
const atlasSidebarBody = document.getElementById("atlasSidebarBody");
const detailExpandButton = document.getElementById("expandDetail");
const atlasMobileQuery = matchMedia("(max-width: 680px)");

// Re-renders every piece of generated text in the active language.
function refreshLocalizedUi() {
  exploreMap?.refreshLocale();
  renderProvinceList();
  updateAtlasStats();
  if (!isRolling) renderDiceResult();
  refreshLabLocale();
  const state = panelStack.at(-1);
  if (state && detailPanelShown()) {
    const detailPanel = document.getElementById("detailPanel");
    const scrollTop = panelScrollElement(detailPanel).scrollTop;
    renderPanelState(state);
    panelScrollElement(detailPanel).scrollTop = scrollTop;
  }
  updatePanelNavigation();
}

function detailPanelShown() {
  return document.getElementById("detailPanel").open;
}

function setDetailReopenVisible(visible) {
  atlasRoot.dataset.detailReopen = String(visible);
  detailExpandButton.setAttribute("aria-hidden", String(!visible));
  detailExpandButton.setAttribute("aria-expanded", String(!visible));
  detailExpandButton.tabIndex = visible ? 0 : -1;
}

function panelScrollElement(panel) {
  return panel.querySelector(".detail-panel-scroll") || panel;
}

initActivityI18n({
  switcher: "[data-lang-switcher-host]",
  onChange: refreshLocalizedUi,
});

// ===== 初始化 =====
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Keep geometry out of the JavaScript bundle and load it as a local asset.
    const response = await fetch(chinaGeoJsonUrl);
    if (!response.ok) throw new Error(`Map data: HTTP ${response.status}`);
    mapGeometry = prepareMapGeometry(await response.json());

    // 先载入本地足迹，让地图初始状态就带访问标记
    loadVisitedProvinces();
    setAtlasPanelOpen(!atlasMobileQuery.matches);

    // 初始化地图
    initExploreMap();
    renderProvinceList();
    updateAtlasStats();

    // 初始化事件
    initEvents();

    // 初始化虚拟实验（内部会载入实验记录）
    initLab();

    // Keep the lab directly linkable for teaching links and screenshots.
    const requestedPage = new URLSearchParams(location.search).get("page");
    if (requestedPage === "lab" || location.hash === "#lab") {
      switchPage("lab");
    }

    // 隐藏加载提示
    document.getElementById("loadingOverlay").classList.add("hidden");
  } catch (error) {
    console.error("加载地图数据失败:", error);
    document.getElementById("loadingOverlay").innerHTML =
      `<p>${t("map.loadError")}</p>`;
  }
});

function initExploreMap() {
  exploreMap = createAtlasMap(document.getElementById("china-map"), {
    geometry: mapGeometry,
    getVisits: () => visitedProvinces,
    onSelect: (name) => showProvinceDetail(name),
    onMapClick: () => {
      dismissOpenPanels();
    },
  });
}

function updateAtlasStats() {
  const count = Object.keys(visitedProvinces).length;
  document.getElementById("atlasVisited").textContent = count;
  document.getElementById("atlasVisitedUnit").textContent = t(
    count === 1 ? "map.atlas.regionUnitOne" : "map.atlas.regionUnit",
  );
  document.getElementById("atlasVisitedCompact").textContent = count;
  document.getElementById("atlasProgress").style.width =
    `${(count / 34) * 100}%`;
}

function renderProvinceList() {
  if (!mapGeometry) return;
  const query = document
    .getElementById("provinceSearch")
    .value.trim()
    .toLocaleLowerCase();
  const provinces = mapGeometry.features.filter((feature) => {
    const name = feature.properties.name;
    return (
      feature.properties.level === "province" &&
      (!query ||
        `${name} ${provinceLabel(name)} ${FOOD_DATA[name]?.foods.map((food) => `${food.name} ${localizeFood(food).name}`).join(" ") || ""}`
          .toLocaleLowerCase()
          .includes(query))
    );
  });
  const list = document.getElementById("provinceResults");
  list.replaceChildren();
  for (const feature of provinces) {
    const name = feature.properties.name;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `atlas-region ${visitedProvinces[name] ? "is-visited" : ""}`;
    button.dataset.province = name;
    const title = document.createElement("span");
    title.textContent = provinceLabel(name);
    const count = document.createElement("small");
    count.textContent = t("map.atlas.items", {
      count: FOOD_DATA[name]?.foods.length || 0,
    });
    button.append(title, count);
    button.addEventListener("click", () =>
      showProvinceDetail(name, { reveal: true }),
    );
    list.append(button);
  }
  if (!provinces.length) {
    const empty = document.createElement("p");
    empty.className = "atlas-region-empty";
    empty.textContent = t("map.atlas.noResults");
    list.append(empty);
  }
}

function openPanel(panel, { keepOthers = false } = {}) {
  if (!keepOthers) {
    for (const other of document.querySelectorAll("dialog[open]")) {
      if (other !== panel) closePanel(other, { immediate: true });
    }
  }
  if (!panel.open) {
    panel.classList.remove("is-closing");
    document.documentElement.classList.add("atlas-dialog-open");
    // Keep the map interactive so a click on its open area can collapse the
    // detail panel without a modal backdrop.
    panel.show();
    window.scrollTo(0, 0);
  }
  syncDialogScrollLock();
}

function closePanel(panel, { immediate = false } = {}) {
  if (!panel.open || panel.classList.contains("is-closing")) return;
  if (immediate || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    panel.close();
    return;
  }

  panel.classList.add("is-closing");
  let timer = null;
  const finish = () => {
    if (timer !== null) clearTimeout(timer);
    panel.removeEventListener("animationend", onAnimationEnd);
    panel.classList.remove("is-closing");
    if (panel.open) panel.close();
  };
  const onAnimationEnd = (event) => {
    if (event.target !== panel || event.animationName !== "atlasDrawerOut") {
      return;
    }
    finish();
  };
  panel.addEventListener("animationend", onAnimationEnd);
  timer = setTimeout(finish, 220);
}

function dismissOpenPanels() {
  if (!document.querySelector("dialog[open]")) return;
  if (panelStack.length > 1) goBack();
  else closeAllPanels();
}

function setAtlasPanelOpen(open) {
  const expanded = Boolean(open);
  atlasRoot.dataset.panelOpen = String(expanded);
  atlasPanelToggle.setAttribute("aria-expanded", String(expanded));
  atlasSidebarBody.inert = !expanded;
  if (!expanded) {
    atlasSidebarBody.setAttribute("aria-hidden", "true");
  } else {
    atlasSidebarBody.removeAttribute("aria-hidden");
  }
}

function syncDialogScrollLock() {
  const dialogOpen = Boolean(document.querySelector("dialog[open]"));
  document.documentElement.classList.toggle("atlas-dialog-open", dialogOpen);
}

// ===== 初始化事件 =====
function initEvents() {
  // 导航切换
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const page = this.dataset.page;
      switchPage(page);
    });
  });

  // 掷骰子
  document.getElementById("rollDiceBtn").addEventListener("click", rollDice);

  atlasPanelToggle.addEventListener("click", () => {
    setAtlasPanelOpen(atlasRoot.dataset.panelOpen !== "true");
  });
  atlasMobileQuery.addEventListener("change", (event) => {
    setAtlasPanelOpen(!event.matches);
  });

  detailExpandButton.addEventListener("click", () => {
    if (lastDetailProvince) {
      showProvinceDetail(lastDetailProvince);
    }
  });

  document.getElementById("backPanel").addEventListener("click", () => {
    goBack();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.querySelector("dialog[open]")) {
      event.preventDefault();
      goBack();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const openPanels = [...document.querySelectorAll("dialog[open]")];
    if (
      !openPanels.length ||
      openPanels.some((panel) => panel.contains(target)) ||
      target.closest("#china-map")
    ) {
      return;
    }
    dismissOpenPanels();
  });

  const provinceSearch = document.getElementById("provinceSearch");
  provinceSearch.addEventListener("input", () => {
    renderProvinceList();
    if (atlasMobileQuery.matches && provinceSearch.value.trim()) {
      setAtlasPanelOpen(true);
    }
  });
  provinceSearch.addEventListener("keydown", (event) => {
    const first = document.querySelector(".atlas-region");
    if (event.key === "ArrowDown") {
      event.preventDefault();
      first?.focus();
    } else if (event.key === "Enter") {
      event.preventDefault();
      first?.click();
    }
  });
  for (const panel of document.querySelectorAll("dialog")) {
    panel.addEventListener("cancel", (event) => {
      event.preventDefault();
      goBack();
    });
    panel.addEventListener("click", (event) => {
      if (event.target !== panel) return;
      const rect = panel.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        goBack();
    });
    panel.addEventListener("close", () => {
      panel.classList.remove("is-closing");
      if (!document.querySelector("dialog[open]")) {
        panelStack = [];
        exploreMap?.select(null, { restoreHover: true });
        setDetailReopenVisible(Boolean(lastDetailProvince));
      }
      syncDialogScrollLock();
      updatePanelNavigation();
    });
  }
}

// ===== 页面切换 =====
function switchPage(page) {
  if (page !== "map") cancelDice();
  panelStack = [];
  lastDetailProvince = null;
  setDetailReopenVisible(false);
  for (const panel of document.querySelectorAll("dialog[open]")) panel.close();
  syncDialogScrollLock();
  updatePanelNavigation();
  exploreMap?.setVisible(page === "map");
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach((b) => {
    b.classList.remove("active");
    if (b.dataset.page === page) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });

  if (page === "map") {
    document.getElementById("page-map").classList.add("active");
    document.querySelector('[data-page="map"]').classList.add("active");
    exploreMap?.setVisible(true);
  } else if (page === "lab") {
    document.getElementById("page-lab").classList.add("active");
    document.querySelector('[data-page="lab"]').classList.add("active");
  }
  const url = new URL(location.href);
  if (page === "lab") url.searchParams.set("page", "lab");
  else url.searchParams.delete("page");
  history.replaceState(null, "", url);
  window.scrollTo(0, 0);
}

// ===== 3D骰子 =====
function cancelDice() {
  if (!isRolling) return;
  clearTimeout(diceTimer);
  diceTimer = null;
  isRolling = false;
  document.getElementById("dice").classList.remove("rolling");
  document.getElementById("rollDiceBtn").disabled = false;
  document.getElementById("rollDiceBtn").removeAttribute("aria-busy");
  lastDiceProvince = null;
  renderDiceResult();
}

function renderDiceResult() {
  const result = document.getElementById("diceResult");
  if (lastDiceProvince) {
    result.innerHTML = `<span class="atlas-draw-verdict">${t("map.dice.result")}</span><span class="province-name">${provinceLabel(lastDiceProvince)}</span>`;
  } else {
    result.replaceChildren();
  }
}

function rollDice() {
  if (isRolling) return;
  isRolling = true;

  const dice = document.getElementById("dice");
  const btn = document.getElementById("rollDiceBtn");
  const result = document.getElementById("diceResult");

  btn.disabled = true;
  btn.setAttribute("aria-busy", "true");
  result.innerHTML = `<span class="atlas-draw-hint">${t("map.dice.rolling")}</span>`;

  // 获取所有有美食数据的省份
  const provinces = Object.keys(FOOD_DATA);

  // 随机选择一个省份
  const randomIndex = Math.floor(Math.random() * provinces.length);
  const selectedProvince = provinces[randomIndex];

  const landingAngles = [-10, -5, 0, 5, 10];
  const landingAngle =
    landingAngles[Math.floor(Math.random() * landingAngles.length)];

  const finish = () => {
    diceTimer = null;
    dice.classList.remove("rolling");
    dice.style.setProperty("--atlas-die-angle", `${landingAngle}deg`);

    // 显示结果
    lastDiceProvince = selectedProvince;
    renderDiceResult();

    // 显示省份详情
    showProvinceDetail(selectedProvince, { reveal: true });

    btn.disabled = false;
    btn.removeAttribute("aria-busy");
    isRolling = false;
  };
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finish();
  } else {
    dice.classList.add("rolling");
    diceTimer = setTimeout(finish, 1600);
  }
}

// ===== 显示省份详情 =====
function renderProvinceDetail(provinceName) {
  const foodInfo = FOOD_DATA[provinceName];
  if (!foodInfo) return;

  document.getElementById("provinceName").textContent =
    provinceLabel(provinceName);
  const panelContext = document.getElementById("panelContext");
  panelContext.hidden = true;
  panelContext.textContent = "";

  const content = document.getElementById("detailContent");
  let html = '<div class="food-list">';

  foodInfo.foods.forEach((food) => {
    const craftInfo = CRAFT_TYPES[food.craft] || {
      icon: "🍽️",
      color: "#666",
      desc: "",
    };
    const localized = localizeFood(food);
    html += `
            <article class="food-entry">
                <div class="food-entry-heading">
                    <h3>${craftInfo.icon} ${localized.name}</h3>
                    <span class="craft-badge" style="--craft-color: ${craftInfo.color}">${localized.craft}</span>
                </div>
                <p class="food-desc">${localized.desc}</p>
                <div class="process-box">
                    <div class="process-label">${t("map.detail.process")}</div>
                    <p>${localized.process}</p>
                </div>
                <button class="craft-search-btn" data-craft="${food.craft}" data-province="${provinceName}">
                    ${t("map.detail.findCraft")}
                    <span class="craft-search-arrow" aria-hidden="true">→</span>
                </button>
            </article>
        `;
  });

  html += "</div>";
  content.innerHTML = html;

  // 绑定工艺搜索按钮
  content.querySelectorAll(".craft-search-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const craft = this.dataset.craft;
      const province = this.dataset.province;
      searchSameCraft(craft, province, { historyMode: "push" });
    });
  });
}

function renderPanelState(state) {
  const detailPanel = document.getElementById("detailPanel");
  detailPanel.dataset.view = state.type;
  if (state.type === "detail") {
    lastDetailProvince = state.province;
    renderProvinceDetail(state.province);
  } else {
    lastDetailProvince = state.province;
    renderCraftResults(state.craft, state.province);
  }
}

function showProvinceDetail(
  provinceName,
  { reveal = false, historyMode = "root" } = {},
) {
  const foodInfo = FOOD_DATA[provinceName];
  if (!foodInfo) {
    alert(t("map.detail.none", { province: provinceLabel(provinceName) }));
    return;
  }

  const state = {
    type: "detail",
    province: provinceName,
    scrollTop: 0,
    cameraState: exploreMap?.getCameraState() || null,
  };
  if (historyMode === "root") {
    panelStack = [state];
  } else if (historyMode === "push") {
    rememberCurrentPanelScroll();
    panelStack.push(state);
  }

  setDetailReopenVisible(false);
  renderPanelState(state);
  const detailPanel = document.getElementById("detailPanel");
  panelScrollElement(detailPanel).scrollTop = 0;
  openPanel(detailPanel);
  focusPanelTitle(detailPanel);

  // 记录访问
  recordVisit(
    provinceName,
    foodInfo.foods.map((f) => f.name),
  );

  // 高亮地图上的省份
  exploreMap?.select(provinceName, { reveal });
  updatePanelNavigation();
}

// ===== 搜索相同工艺 =====
function renderCraftResults(craft, currentProvince) {
  const results = [];

  // 遍历所有省份，找到使用相同工艺的美食
  for (const [province, data] of Object.entries(FOOD_DATA)) {
    if (province === currentProvince) continue;

    data.foods.forEach((food) => {
      if (food.craft === craft) {
        results.push({
          province: province,
          food: food,
        });
      }
    });
  }

  const craftInfo = CRAFT_TYPES[craft] || {
    icon: "🍽️",
    color: "#666",
    desc: "",
  };

  const resultProvinces = new Set(results.map((item) => item.province));
  const fromLabel = t("map.craft.from", {
    province: provinceLabel(currentProvince),
  });
  const panelContext = document.getElementById("panelContext");
  panelContext.hidden = false;
  panelContext.textContent = resultProvinces.size
    ? `${fromLabel} · ${t("map.craft.count", { count: resultProvinces.size + 1 })}`
    : fromLabel;
  document.getElementById("provinceName").textContent = t("map.craft.title");

  const content = document.getElementById("detailContent");

  if (results.length === 0) {
    content.innerHTML = `<div class="empty-state">${t("map.craft.none", { craft: craftLabel(craft) })}</div>`;
  } else {
    let html = `
            <div class="craft-summary">
                <span class="craft-badge" style="--craft-color: ${craftInfo.color}">${craftInfo.icon} ${craftLabel(craft)}</span>
                <p class="craft-summary-copy">${craftDescription(craft)}</p>
            </div>
            <div class="craft-list">
        `;

    results.forEach((item) => {
      html += `
                <button type="button" class="craft-item" data-province="${item.province}">
                    <span class="craft-item-copy">
                        <span class="item-province">${provinceLabel(item.province)}</span>
                        <span class="item-food">${localizeFood(item.food).name}</span>
                    </span>
                    <span class="item-arrow" aria-hidden="true">→</span>
                </button>
            `;
    });

    html += "</div>";
    content.innerHTML = html;

    // 绑定点击事件 - 跳转到对应省份
    content.querySelectorAll(".craft-item").forEach((item) => {
      item.addEventListener("click", function () {
        const province = this.dataset.province;
        showProvinceDetail(province, {
          reveal: true,
          historyMode: "push",
        });
      });
    });
  }
}

function searchSameCraft(
  craft,
  currentProvince,
  { historyMode = "push" } = {},
) {
  const state = {
    type: "craft",
    craft,
    province: currentProvince,
    scrollTop: 0,
  };
  if (historyMode === "push") {
    rememberCurrentPanelScroll();
    panelStack.push(state);
  } else if (historyMode === "root") {
    panelStack = [state];
  }

  renderPanelState(state);
  const detailPanel = document.getElementById("detailPanel");
  panelScrollElement(detailPanel).scrollTop = 0;
  openPanel(detailPanel);
  focusPanelTitle(detailPanel);
  exploreMap?.select(currentProvince);
  updatePanelNavigation();
}

function focusPanelTitle(panel) {
  panel.querySelector("#provinceName")?.focus({ preventScroll: true });
}

function updatePanelNavigation() {
  document.getElementById("backPanel").hidden = panelStack.length === 0;
}

function rememberCurrentPanelScroll() {
  const state = panelStack.at(-1);
  if (!state) return;
  const panel = document.getElementById("detailPanel");
  if (panel.open) state.scrollTop = panelScrollElement(panel).scrollTop;
}

function goBack() {
  if (panelStack.length <= 1) {
    closeAllPanels();
    return;
  }

  rememberCurrentPanelScroll();
  const leavingState = panelStack.pop();
  const state = panelStack.at(-1);
  if (!state) {
    closeAllPanels();
    return;
  }

  const detailPanel = document.getElementById("detailPanel");
  renderPanelState(state);
  openPanel(detailPanel);
  panelScrollElement(detailPanel).scrollTop = state.scrollTop || 0;
  const cameraState =
    state.type === "detail"
      ? state.cameraState
      : leavingState?.type === "detail"
        ? leavingState.cameraState
        : null;
  if (cameraState) {
    exploreMap?.restoreCameraState(cameraState);
    if (state.type === "detail" && state.cameraState === cameraState) {
      state.cameraState = null;
    } else if (
      leavingState?.type === "detail" &&
      leavingState.cameraState === cameraState
    ) {
      leavingState.cameraState = null;
    }
  }
  exploreMap?.select(state.province);
  focusPanelTitle(detailPanel);

  updatePanelNavigation();
}

function closeAllPanels() {
  panelStack = [];
  closePanel(document.getElementById("detailPanel"));
  syncDialogScrollLock();
  updatePanelNavigation();
}

// ===== 记录访问 =====
function recordVisit(provinceName, foods) {
  if (!visitedProvinces[provinceName]) {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    visitedProvinces[provinceName] = {
      date: dateStr,
      foods: foods,
    };
    saveVisitedProvinces();
    exploreMap?.update();
    updateAtlasStats();
    for (const button of document.querySelectorAll(".atlas-region")) {
      button.classList.toggle(
        "is-visited",
        Boolean(visitedProvinces[button.dataset.province]),
      );
    }
  }
}

// ===== 保存访问记录到 localStorage =====
function saveVisitedProvinces() {
  storage.setItem(VISITED_KEY, JSON.stringify(visitedProvinces));
}

// ===== 加载访问记录 =====
function loadVisitedProvinces() {
  const saved = storage.getItem(VISITED_KEY);
  if (saved) {
    try {
      const visits = JSON.parse(saved);
      visitedProvinces = {};
      for (const [province, visit] of Object.entries(visits || {})) {
        if (
          !Object.hasOwn(FOOD_DATA, province) ||
          !/^\d{4}-\d{2}-\d{2}$/.test(visit?.date) ||
          !Array.isArray(visit.foods)
        )
          continue;
        const validFoods = FOOD_DATA[province].foods.map((food) => food.name);
        visitedProvinces[province] = {
          date: visit.date,
          foods: visit.foods.filter((food) => validFoods.includes(food)),
        };
      }
    } catch {
      visitedProvinces = {};
    }
  } else {
    visitedProvinces = {};
  }
}

const navigation = document.querySelector(".navbar");
const navigationObserver = new ResizeObserver(() => {
  document.body.style.setProperty(
    "--activity-nav-height",
    `${navigation.getBoundingClientRect().height}px`,
  );
});
navigationObserver.observe(navigation);
function syncMapVisibility() {
  const page = document.querySelector(".nav-btn.active")?.dataset.page;
  exploreMap?.setVisible(!document.hidden && page === "map");
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) cancelDice();
  syncMapVisibility();
});
window.addEventListener("pagehide", (event) => {
  cancelDice();
  if (event.persisted) {
    exploreMap?.setVisible(false);
    return;
  }
  navigationObserver.disconnect();
  exploreMap?.destroy();
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) syncMapVisibility();
});
