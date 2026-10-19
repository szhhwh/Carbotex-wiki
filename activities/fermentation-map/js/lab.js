import { storage } from "../../shared/js/storage.js";
import { balloonLabel, bubbleLabel, t } from "./i18n.js";

// 实验记录保存在本机浏览器中
const LAB_HISTORY_KEY = "ferment_lab";
let labHistory = [];
// Keeps the last prediction so switching language can redraw it.
let lastResults = null;

function bottleLabel(bottle) {
  return t(bottle === "A" ? "map.lab.bottleA" : "map.lab.bottleB");
}

function minutes(value) {
  return t("map.lab.minutes", { value });
}

// Value badges next to the sliders follow the active language.
function syncLabValues() {
  for (const bottle of ["A", "B"]) {
    const read = (name) => document.getElementById(`${name}${bottle}`).value;
    document.getElementById(`yeastValue${bottle}`).textContent =
      `${read("yeastRange")} g`;
    document.getElementById(`tempValue${bottle}`).textContent =
      `${read("tempRange")} °C`;
    document.getElementById(`timeValue${bottle}`).textContent = minutes(
      read("timeRange"),
    );
    document.getElementById(`phValue${bottle}`).textContent = Number.parseFloat(
      read("phRange"),
    ).toFixed(1);
  }
}

// ===== 虚拟实验平台 =====

// 默认实验条件
const DEFAULT_LAB_SETTINGS = {
  sugar: 30, // 糖浓度 (g)
  yeast: 5, // 酵母量 (g)
  temp: 30, // 水温 (℃)
  time: 15, // 反应时间 (分钟)
  oxygen: "anaerobic", // 氧气条件: anaerobic=密闭无氧, aerobic=敞口有氧
  ph: 7.0, // pH值
};

// B瓶默认实验条件（无糖对照组）
const DEFAULT_LAB_SETTINGS_B = {
  sugar: 0, // 糖浓度 (g) - 默认无糖
  yeast: 5, // 酵母量 (g)
  temp: 30, // 水温 (℃)
  time: 15, // 反应时间 (分钟)
  oxygen: "anaerobic", // 氧气条件: anaerobic=密闭无氧, aerobic=敞口有氧
  ph: 7.0, // pH值
};

// 当前实验条件
let currentLabSettings = { ...DEFAULT_LAB_SETTINGS };
let currentLabSettingsB = { ...DEFAULT_LAB_SETTINGS_B };

// 初始化虚拟实验
function initLab() {
  // 绑定A瓶滑块事件
  document.getElementById("yeastRangeA").addEventListener("input", function () {
    document.getElementById("yeastValueA").textContent = this.value + " g";
  });

  document.getElementById("tempRangeA").addEventListener("input", function () {
    document.getElementById("tempValueA").textContent = this.value + " °C";
  });

  document.getElementById("timeRangeA").addEventListener("input", function () {
    document.getElementById("timeValueA").textContent = minutes(this.value);
  });

  document.getElementById("phRangeA").addEventListener("input", function () {
    document.getElementById("phValueA").textContent = parseFloat(
      this.value,
    ).toFixed(1);
  });

  // 绑定B瓶滑块事件
  document.getElementById("yeastRangeB").addEventListener("input", function () {
    document.getElementById("yeastValueB").textContent = this.value + " g";
  });

  document.getElementById("tempRangeB").addEventListener("input", function () {
    document.getElementById("tempValueB").textContent = this.value + " °C";
  });

  document.getElementById("timeRangeB").addEventListener("input", function () {
    document.getElementById("timeValueB").textContent = minutes(this.value);
  });

  document.getElementById("phRangeB").addEventListener("input", function () {
    document.getElementById("phValueB").textContent = parseFloat(
      this.value,
    ).toFixed(1);
  });

  // 绑定开始实验按钮
  document
    .getElementById("runExperimentBtn")
    .addEventListener("click", runExperiment);

  // 绑定重置按钮
  document
    .getElementById("resetExperimentBtn")
    .addEventListener("click", resetLabSettings);

  // 加载实验历史
  loadLabHistory();

  // 显示默认实验设置说明
  syncLabValues();
  showDefaultLabIntro();
  setupLabMotion();
}

// Re-renders everything this module owns in the active language.
function refreshLabLocale() {
  syncLabValues();
  if (lastResults) {
    renderLabResults(
      simulateBottle("A", currentLabSettings),
      simulateBottle("B", currentLabSettingsB),
    );
  } else {
    showDefaultLabIntro();
  }
  renderLabHistory();
}

// 重置实验设置
function resetLabSettings() {
  currentLabSettings = { ...DEFAULT_LAB_SETTINGS };
  currentLabSettingsB = { ...DEFAULT_LAB_SETTINGS_B };

  // 重置A瓶
  document.getElementById("sugarSelectA").value = "30";
  document.getElementById("yeastRangeA").value = 5;
  document.getElementById("yeastValueA").textContent = "5 g";
  document.getElementById("tempRangeA").value = 30;
  document.getElementById("tempValueA").textContent = "30 °C";
  document.getElementById("timeRangeA").value = 15;
  document.getElementById("oxygenSelectA").value = "anaerobic";
  document.getElementById("phRangeA").value = 7;
  document.getElementById("phValueA").textContent = "7.0";

  // 重置B瓶
  document.getElementById("sugarSelectB").value = "0";
  document.getElementById("yeastRangeB").value = 5;
  document.getElementById("yeastValueB").textContent = "5 g";
  document.getElementById("tempRangeB").value = 30;
  document.getElementById("tempValueB").textContent = "30 °C";
  document.getElementById("timeRangeB").value = 15;
  document.getElementById("oxygenSelectB").value = "anaerobic";
  document.getElementById("phRangeB").value = 7;
  document.getElementById("phValueB").textContent = "7.0";

  // 显示默认实验说明
  lastResults = null;
  refreshLabLocale();
}

// 显示默认实验说明
function showDefaultLabIntro() {
  const results = document.getElementById("labResultsBody");
  results.innerHTML = `
        <div class="lab-idle">
            <div class="lab-idle-copy">
                <h3>${t("map.lab.idleTitle")}</h3>
                <p>${t("map.lab.idleBody")}</p>
            </div>
            <ul class="lab-watch-list">
                <li>${t("map.lab.watchGas")}</li>
                <li>${t("map.lab.watchBubbles")}</li>
                <li>${t("map.lab.watchControl")}</li>
            </ul>
        </div>
    `;
}

// 运行实验
function runExperiment() {
  // 读取A瓶实验条件
  currentLabSettings = {
    sugar: parseInt(document.getElementById("sugarSelectA").value),
    yeast: parseFloat(document.getElementById("yeastRangeA").value),
    temp: parseInt(document.getElementById("tempRangeA").value),
    time: parseInt(document.getElementById("timeRangeA").value),
    oxygen: document.getElementById("oxygenSelectA").value,
    ph: parseFloat(document.getElementById("phRangeA").value),
  };

  // 读取B瓶实验条件
  currentLabSettingsB = {
    sugar: parseInt(document.getElementById("sugarSelectB").value),
    yeast: parseFloat(document.getElementById("yeastRangeB").value),
    temp: parseInt(document.getElementById("tempRangeB").value),
    time: parseInt(document.getElementById("timeRangeB").value),
    oxygen: document.getElementById("oxygenSelectB").value,
    ph: parseFloat(document.getElementById("phRangeB").value),
  };

  // 计算A瓶和B瓶的实验结果
  const resultA = simulateBottle("A", currentLabSettings);
  const resultB = simulateBottle("B", currentLabSettingsB);

  // 渲染结果
  renderLabResults(resultA, resultB);

  // 记录实验历史
  addLabHistory(currentLabSettings, currentLabSettingsB, resultA, resultB);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  document.getElementById("labResults").scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

// Reveals each control region as it enters the viewport.
function setupLabMotion() {
  const page = document.getElementById("page-lab");
  if (!page || page.dataset.motionReady === "true") return;
  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const targets = [
    ...page.querySelectorAll(
      [
        ".lab-results .lab-section-head > *",
        "#labResultsBody",
        ".lab-log .lab-section-head > *",
        "#labHistory",
      ].join(","),
    ),
  ];

  targets.forEach((target, index) => {
    target.classList.add("lab-reveal");
    target.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 70}ms`);
  });
  page.classList.add("lab-motion-ready");
  page.dataset.motionReady = "true";

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  requestAnimationFrame(() => {
    targets.forEach((target) => observer.observe(target));
  });
}

// 模拟单个瓶子的实验结果
function simulateBottle(bottle, settings) {
  const isA = bottle === "A";

  // 使用各自瓶子的设置
  const sugar = settings.sugar;
  const yeast = settings.yeast;
  const temp = settings.temp;
  const time = settings.time;
  const oxygen = settings.oxygen;
  const ph = settings.ph;

  // 计算产气量（0-100）
  let gasScore = 0;
  let status = "success";
  let statusText = "normal";
  let explanation = "";
  let bubbles = "";
  let balloon = "";
  const label = bottleLabel(bottle);

  // ===== 检查失败条件 =====

  // 1. 不加酵母
  if (yeast === 0) {
    gasScore = 0;
    status = "fail";
    statusText = "fail";
    bubbles = "none";
    balloon = "none";
    explanation = t("map.lab.fail.noYeast", { bottle: label });
    return {
      bottle,
      gasScore,
      bubbles,
      balloon,
      status,
      statusText,
      explanation,
    };
  }

  // 2. 沸水（高温失活）
  if (temp >= 60) {
    gasScore = 0;
    status = "fail";
    statusText = "fail";
    bubbles = "none";
    balloon = "none";
    explanation = t("map.lab.fail.tooHot", { temp });
    return {
      bottle,
      gasScore,
      bubbles,
      balloon,
      status,
      statusText,
      explanation,
    };
  }

  // 3. 冰水（低温抑制）
  if (temp <= 5) {
    gasScore = 0;
    status = "fail";
    statusText = "fail";
    bubbles = "none";
    balloon = "none";
    explanation = t("map.lab.fail.tooCold", { temp });
    return {
      bottle,
      gasScore,
      bubbles,
      balloon,
      status,
      statusText,
      explanation,
    };
  }

  // 4. 极端pH
  if (ph <= 2 || ph >= 12) {
    gasScore = 0;
    status = "fail";
    statusText = "fail";
    bubbles = "none";
    balloon = "none";
    explanation = t("map.lab.fail.ph", { ph });
    return {
      bottle,
      gasScore,
      bubbles,
      balloon,
      status,
      statusText,
      explanation,
    };
  }

  // ===== 计算产气量 =====

  // 温度因子（25-38℃最适宜）
  let tempFactor = 0;
  if (temp >= 25 && temp <= 38) {
    tempFactor = 1.0; // 最适宜
  } else if (temp > 38 && temp < 60) {
    tempFactor = 1.0 - (temp - 38) * 0.05; // 高温逐渐失活
  } else if (temp > 5 && temp < 25) {
    tempFactor = 0.3 + (temp - 5) * 0.035; // 低温活性降低
  }
  tempFactor = Math.max(0, Math.min(1, tempFactor));

  // 糖因子（糖是发酵底物，有糖才有产气）
  let sugarFactor = 0;
  if (sugar === 0) {
    sugarFactor = 0; // 无糖
  } else {
    sugarFactor = Math.min(1, sugar / 30); // 糖越多产气越多，30g为饱和
  }

  // 酵母因子
  let yeastFactor = 0;
  if (yeast > 0) {
    yeastFactor = Math.min(1, yeast / 5); // 5g为适宜量
  }

  // 时间因子（基于酵母菌发酵动力学曲线 - 逻辑斯蒂S型曲线）
  // 依据微生物生长曲线（Monod动力学）：
  //   滞后期(0-2min)：酵母适应环境，产气极少
  //   指数期(2-15min)：酵母快速增殖，产气速率呈指数上升
  //   稳定期(15-30min)：底物消耗、乙醇积累，产气趋于饱和
  // 采用逻辑斯蒂函数 timeFactor = 1/(1+e^(-k*(t-t0))) 拟合S型产气曲线
  let timeFactor = 0;
  if (time > 0) {
    // 逻辑斯蒂S型曲线参数：k=0.35（增长速率），t0=8（拐点，分钟）
    // 该曲线符合文献报道的酵母发酵CO2累积产气量随时间呈S型增长的特征
    timeFactor = 1 / (1 + Math.exp(-0.35 * (time - 8)));
    // 归一化：确保30分钟时接近饱和（约0.999）
    timeFactor = Math.min(1, timeFactor / 0.9995);
  }
  // 时间因子范围 0~1
  timeFactor = Math.max(0, Math.min(1, timeFactor));

  // 氧气因子（无氧条件利于酒精发酵）
  let oxygenFactor = 1.0;
  if (oxygen === "aerobic") {
    oxygenFactor = 0.3; // 有氧条件下酵母进行有氧呼吸，产CO2但效率低且不积累酒精
  }

  // pH因子（4-6最适宜）
  let phFactor = 1.0;
  if (ph >= 4 && ph <= 6) {
    phFactor = 1.0;
  } else if (ph > 6 && ph <= 8) {
    phFactor = 1.0 - (ph - 6) * 0.15;
  } else if (ph > 8 && ph < 12) {
    phFactor = 0.4 - (ph - 8) * 0.08;
  } else if (ph < 4 && ph > 2) {
    phFactor = 0.5 + (ph - 2) * 0.25;
  }
  phFactor = Math.max(0, Math.min(1, phFactor));

  // 综合产气量
  gasScore =
    100 *
    sugarFactor *
    yeastFactor *
    tempFactor *
    timeFactor *
    oxygenFactor *
    phFactor;

  // 判断气泡情况
  if (gasScore <= 0) {
    bubbles = "none";
    balloon = "none";
  } else if (gasScore < 15) {
    bubbles = "low";
    balloon = "none";
  } else if (gasScore < 35) {
    bubbles = "low";
    balloon = "slight";
  } else if (gasScore < 60) {
    bubbles = "medium";
    balloon = "obvious";
  } else {
    bubbles = "high";
    balloon = "huge";
  }

  // 生成原理解释
  explanation = generateExplanation(bottle, isA, settings, gasScore);

  // 判断状态
  if (gasScore < 10) {
    status = "fail";
    statusText = "fail";
  } else if (gasScore < 40) {
    status = "warning";
    statusText = "weak";
  } else {
    status = "success";
    statusText = "normal";
  }

  return {
    bottle,
    gasScore,
    bubbles,
    balloon,
    status,
    statusText,
    explanation,
  };
}

// 生成原理解释
function generateExplanation(bottle, isA, settings, gasScore) {
  const parts = [];
  const label = bottleLabel(bottle);
  const summaryKey =
    gasScore <= 0
      ? "none"
      : gasScore < 15
        ? "veryLow"
        : gasScore < 35
          ? "low"
          : gasScore < 60
            ? "medium"
            : "high";

  parts.push(
    settings.sugar === 0
      ? t("map.lab.explain.noSugar", { bottle: label })
      : t("map.lab.explain.sugar", { bottle: label, sugar: settings.sugar }),
  );

  if (settings.yeast > 0) {
    parts.push(t("map.lab.explain.yeast", { yeast: settings.yeast }));
  }

  if (settings.temp >= 25 && settings.temp <= 38) {
    parts.push(t("map.lab.explain.tempOptimal", { temp: settings.temp }));
  } else if (settings.temp > 38 && settings.temp < 60) {
    parts.push(t("map.lab.explain.tempHigh", { temp: settings.temp }));
  } else if (settings.temp > 5 && settings.temp < 25) {
    parts.push(t("map.lab.explain.tempLow", { temp: settings.temp }));
  }

  parts.push(
    settings.time > 0
      ? t("map.lab.explain.time", { time: settings.time })
      : t("map.lab.explain.timeZero"),
  );

  parts.push(
    settings.oxygen === "anaerobic"
      ? t("map.lab.explain.anaerobic")
      : t("map.lab.explain.aerobic"),
  );

  if (settings.ph >= 4 && settings.ph <= 6) {
    parts.push(t("map.lab.explain.phOptimal", { ph: settings.ph }));
  } else if (settings.ph > 6 && settings.ph < 12) {
    parts.push(t("map.lab.explain.phAlkaline", { ph: settings.ph }));
  } else if (settings.ph > 2 && settings.ph < 4) {
    parts.push(t("map.lab.explain.phAcid", { ph: settings.ph }));
  }

  parts.push(t(`map.lab.summary.${summaryKey}`));

  return parts.join(" ");
}

// 渲染实验结果（含气球膨胀动画）
function renderLabResults(resultA, resultB) {
  const results = document.getElementById("labResultsBody");
  lastResults = { resultA, resultB };

  const card = (bottle, tag, title, result) => {
    const balloonAnim = getBalloonAnimation(result.gasScore);
    const bubbleLevel = getBubbleLevel(result.bubbles);
    const bubbleMeter = [1, 2, 3]
      .map(
        (step) => `<span class="${step <= bubbleLevel ? "is-on" : ""}"></span>`,
      )
      .join("");

    return `
        <article class="lab-result-card ${tag}">
            <header class="result-card-header">
                <div class="result-card-heading">
                    <span class="result-bottle-tag ${tag}">${bottle}</span>
                    <span class="result-card-title">${title}</span>
                </div>
                <span class="result-status ${result.status}">${t(`map.lab.status.${result.statusText}`)}</span>
            </header>

            <div class="balloon-anim-wrap">
                <div class="balloon-anim ${balloonAnim.className}" style="--inflate:${balloonAnim.scale};">
                    <div class="balloon-anim-balloon">
                        <div class="balloon-anim-shine"></div>
                    </div>
                    <div class="balloon-anim-knot"></div>
                    <div class="balloon-anim-string"></div>
                    <div class="balloon-anim-bottle">
                        <div class="balloon-anim-liquid ${balloonAnim.liquidClass}"></div>
                    </div>
                </div>
                <div class="balloon-anim-label">
                    <span class="balloon-metric-label">${t("map.lab.gasScore")}</span>
                    <span class="balloon-score"><strong>${Math.round(result.gasScore)}</strong><small>/100</small></span>
                    <span class="balloon-anim-desc">${balloonLabel(result.balloon)}</span>
                </div>
            </div>

            <div class="result-meta">
                <span class="result-bubble">
                    <span class="bubble-meter" aria-hidden="true">${bubbleMeter}</span>
                    <span>${t("map.lab.bubblesLabel")} <strong>${bubbleLabel(result.bubbles)}</strong></span>
                </span>
            </div>
            <p class="result-explanation"><strong>${t("map.lab.why")}:</strong> ${result.explanation}</p>
        </article>
    `;
  };

  const conclusion =
    resultA.gasScore > resultB.gasScore
      ? t("map.lab.conclusionA")
      : resultB.gasScore > resultA.gasScore
        ? t("map.lab.conclusionB")
        : resultA.gasScore === 0 && resultB.gasScore === 0
          ? t("map.lab.conclusionNone")
          : t("map.lab.conclusionSame");

  results.innerHTML = `
        <div class="lab-result-grid">
            <aside class="lab-result-aside">
                <div>
                    <strong>${t("map.lab.compareTitle")}</strong>
                    <p>${t("map.lab.compareBody")}</p>
                </div>
            </aside>
            ${card(
              t("map.lab.bottleA"),
              "a",
              currentLabSettings.sugar > 0
                ? t("map.lab.cardA")
                : t("map.lab.cardANo"),
              resultA,
            )}
            ${card(
              t("map.lab.bottleB"),
              "b",
              currentLabSettingsB.sugar > 0
                ? t("map.lab.cardB")
                : t("map.lab.cardBNo"),
              resultB,
            )}
        </div>
        <div class="lab-conclusion">
            <p class="lab-conclusion-label">${t("map.lab.conclusion")}</p>
            <p class="lab-conclusion-text">${conclusion}</p>
        </div>
    `;
}

// 获取气球膨胀动画参数（基于产气量 0-100）
function getBalloonAnimation(gasScore) {
  // 产气量映射到气球膨胀比例（0.3 = 瘪气球，1.6 = 巨大膨胀）
  const scale = 0.3 + (gasScore / 100) * 1.3;

  // 根据产气量确定动画状态
  let className = "";
  let liquidClass = "";

  if (gasScore <= 0) {
    className = "state-none";
    liquidClass = "liquid-none";
  } else if (gasScore < 15) {
    className = "state-low";
    liquidClass = "liquid-low";
  } else if (gasScore < 35) {
    className = "state-mid";
    liquidClass = "liquid-mid";
  } else if (gasScore < 60) {
    className = "state-high";
    liquidClass = "liquid-high";
  } else {
    className = "state-full";
    liquidClass = "liquid-full";
  }

  return { scale: scale.toFixed(2), className, liquidClass };
}

// 将气泡等级映射为三格指示器
function getBubbleLevel(bubbles) {
  return { none: 0, low: 1, medium: 2, high: 3 }[bubbles] ?? 0;
}

// Formats one bottle's conditions for the experiment log.
function formatConditions(key, settings) {
  return t(key, {
    sugar: settings.sugar,
    yeast: settings.yeast,
    temp: settings.temp,
    time: settings.time,
    oxygen:
      settings.oxygen === "anaerobic"
        ? t("map.lab.oxygenShort")
        : t("map.lab.oxygenShortAerobic"),
    ph: settings.ph,
  });
}

// 添加实验历史记录
function addLabHistory(settingsA, settingsB, resultA, resultB) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const record = {
    time: timeStr,
    // Structured values keep old records readable while new ones follow the language.
    paramsA: { ...settingsA },
    paramsB: { ...settingsB },
    conditionsA: formatConditions("map.lab.conditions.line", settingsA),
    conditionsB: formatConditions("map.lab.conditions.lineB", settingsB),
    resultA: resultA.balloon,
    resultB: resultB.balloon,
  };

  labHistory.unshift(record);

  // 保存到 localStorage
  storage.setItem(LAB_HISTORY_KEY, JSON.stringify(labHistory));

  // 渲染历史
  renderLabHistory();
}

// 加载实验历史
function loadLabHistory() {
  // 页面载入时先显示默认预测面板
  lastResults = null;
  const saved = storage.getItem(LAB_HISTORY_KEY);
  if (saved) {
    try {
      const records = JSON.parse(saved);
      labHistory = Array.isArray(records)
        ? records.filter(
            (record) =>
              typeof record?.time === "string" &&
              (typeof record?.conditionsA === "string" ||
                typeof record?.paramsA === "object"),
          )
        : [];
    } catch {
      labHistory = [];
    }
  } else {
    labHistory = [];
  }
  renderLabHistory();
}

// 渲染实验历史
function renderLabHistory() {
  const container = document.getElementById("labHistory");

  if (labHistory.length === 0) {
    container.innerHTML = `<p class="lab-history-empty">${t("map.lab.logEmpty")}</p>`;
    return;
  }

  container.replaceChildren();
  labHistory.slice(0, 8).forEach((record, index) => {
    const item = document.createElement("div");
    item.className = "lab-log-row";

    const time = document.createElement("div");
    time.className = "lab-log-time";
    time.append(`#${labHistory.length - index} `);
    const clock = document.createElement("span");
    clock.textContent = record.time;
    time.append(clock);

    const body = document.createElement("div");
    body.className = "lab-log-body";
    const lines = [
      [
        "history-conditions",
        record.paramsA
          ? formatConditions("map.lab.conditions.line", record.paramsA)
          : record.conditionsA,
      ],
      [
        "history-conditions",
        record.paramsB
          ? formatConditions("map.lab.conditions.lineB", record.paramsB)
          : record.conditionsB,
      ],
      [
        "history-result",
        t("map.lab.historyLine", {
          a: balloonLabel(record.resultA),
          b: balloonLabel(record.resultB),
        }),
      ],
    ];
    for (const [className, text] of lines) {
      const line = document.createElement("p");
      line.className = className;
      line.textContent = text;
      body.append(line);
    }
    item.append(time, body);
    container.append(item);
  });
}

export {
  initLab,
  loadLabHistory,
  setupLabMotion,
  showDefaultLabIntro,
  renderLabHistory,
  refreshLabLocale,
};
