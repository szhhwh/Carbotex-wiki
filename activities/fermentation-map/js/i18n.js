import { FOOD_TEXT } from "../data/food-translations.js";
import { getLocale, registerMessages, t } from "../../shared/js/i18n.js";

// Short region labels for the map, keyed by the Chinese names used in the
// supplied GeoJSON and food data.
const PROVINCE_TEXT = {
  北京市: { en: "Beijing", ja: "北京" },
  天津市: { en: "Tianjin", ja: "天津" },
  河北省: { en: "Hebei", ja: "河北" },
  山西省: { en: "Shanxi", ja: "山西" },
  内蒙古自治区: { en: "Inner Mongolia", ja: "内モンゴル" },
  辽宁省: { en: "Liaoning", ja: "遼寧" },
  吉林省: { en: "Jilin", ja: "吉林" },
  黑龙江省: { en: "Heilongjiang", ja: "黒竜江" },
  上海市: { en: "Shanghai", ja: "上海" },
  江苏省: { en: "Jiangsu", ja: "江蘇" },
  浙江省: { en: "Zhejiang", ja: "浙江" },
  安徽省: { en: "Anhui", ja: "安徽" },
  福建省: { en: "Fujian", ja: "福建" },
  江西省: { en: "Jiangxi", ja: "江西" },
  山东省: { en: "Shandong", ja: "山東" },
  河南省: { en: "Henan", ja: "河南" },
  湖北省: { en: "Hubei", ja: "湖北" },
  湖南省: { en: "Hunan", ja: "湖南" },
  广东省: { en: "Guangdong", ja: "広東" },
  广西壮族自治区: { en: "Guangxi", ja: "広西チワン族" },
  海南省: { en: "Hainan", ja: "海南" },
  重庆市: { en: "Chongqing", ja: "重慶" },
  四川省: { en: "Sichuan", ja: "四川" },
  贵州省: { en: "Guizhou", ja: "貴州" },
  云南省: { en: "Yunnan", ja: "雲南" },
  西藏自治区: { en: "Xizang", ja: "チベット" },
  陕西省: { en: "Shaanxi", ja: "陝西" },
  甘肃省: { en: "Gansu", ja: "甘粛" },
  青海省: { en: "Qinghai", ja: "青海" },
  宁夏回族自治区: { en: "Ningxia", ja: "寧夏回族" },
  新疆维吾尔自治区: { en: "Xinjiang", ja: "新疆ウイグル" },
  台湾省: { en: "Taiwan", ja: "台湾" },
  香港特别行政区: { en: "Hong Kong", ja: "香港" },
  澳门特别行政区: { en: "Macao", ja: "マカオ" },
};

// Process names stay keyed by the Chinese label used in the food data.
const CRAFT_TEXT = {
  乳酸发酵: {
    en: {
      label: "Lactic acid fermentation",
      desc: "Lactic acid bacteria turn sugars into lactic acid, giving a sour taste and a distinctive flavour.",
    },
    ja: {
      label: "乳酸発酵",
      desc: "乳酸菌が糖を乳酸に変え、酸味と独特の風味を生み出します。",
    },
  },
  醋酸发酵: {
    en: {
      label: "Acetic acid fermentation",
      desc: "Acetic acid bacteria turn alcohol into acetic acid, giving a sour, fragrant flavour.",
    },
    ja: {
      label: "酢酸発酵",
      desc: "酢酸菌がアルコールを酢酸に変え、酸味と香ばしい風味を生み出します。",
    },
  },
  酒精发酵: {
    en: {
      label: "Alcoholic fermentation",
      desc: "Yeast turns sugars into alcohol and carbon dioxide, giving a wine-like aroma.",
    },
    ja: {
      label: "アルコール発酵",
      desc: "酵母が糖をアルコールと二酸化炭素に変え、酒のような香りを生み出します。",
    },
  },
  霉菌发酵: {
    en: {
      label: "Mould fermentation",
      desc: "Moulds break down protein and starch, giving savoury, umami flavours.",
    },
    ja: {
      label: "カビ発酵",
      desc: "カビがタンパク質やデンプンを分解し、うま味と独特の風味を生み出します。",
    },
  },
  酱制发酵: {
    en: {
      label: "Paste fermentation",
      desc: "Micro-organisms and enzymes turn soybeans and other ingredients into paste seasonings.",
    },
    ja: {
      label: "味噌・醤の発酵",
      desc: "微生物と酵素の働きで、大豆などを味噌や醤の調味料に変えます。",
    },
  },
  盐渍发酵: {
    en: {
      label: "Salt-cured fermentation",
      desc: "A high-salt environment suppresses harmful microbes while beneficial ones ferment the food.",
    },
    ja: {
      label: "塩漬け発酵",
      desc: "高い塩分が有害な菌を抑え、有益な微生物の発酵を促します。",
    },
  },
  微生物发酵: {
    en: {
      label: "Microbial fermentation",
      desc: "Several micro-organisms work together to create complex flavours.",
    },
    ja: {
      label: "微生物発酵",
      desc: "複数の微生物が協力して複雑な風味を生み出します。",
    },
  },
  酶解发酵: {
    en: {
      label: "Enzymatic fermentation",
      desc: "Enzymes break down the raw material, creating specific flavours and nutrients.",
    },
    ja: {
      label: "酵素分解発酵",
      desc: "酵素が原料を分解し、特有の風味と栄養を生み出します。",
    },
  },
  碱水发酵: {
    en: {
      label: "Alkaline fermentation",
      desc: "Alkaline water adjusts the acidity of the dough and aids fermentation, giving a distinctive texture.",
    },
    ja: {
      label: "かん水発酵",
      desc: "かん水で生地の酸性度を調整して発酵を促し、独特の食感を生み出します。",
    },
  },
};

export const MAP_MESSAGES = {
  en: {
    "map.atlas.eyebrow": "A taste of place",
    "map.atlas.title": "Follow the flavours of fermentation",
    "map.atlas.search": "Find a region or food",
    "map.atlas.searchPlaceholder": "Try Sichuan or rice wine",
    "map.atlas.progress": "Your discoveries",
    "map.atlas.regionUnit": "regions",
    "map.atlas.regionUnitOne": "region",
    "map.atlas.regions": "Choose a region",
    "map.atlas.toggle": "Toggle region panel",
    "map.atlas.items": "{count} foods",
    "map.atlas.noResults": "No matching region or food. Try another name.",
    "map.atlas.help":
      "Drag to explore. Scroll or pinch to zoom. Use the arrow keys to move between regions and Enter to open one.",
    "map.atlas.controls": "Map controls",
    "map.atlas.close": "Close panel",
    "map.atlas.zoomIn": "Zoom in (+)",
    "map.atlas.zoomOut": "Zoom out (-)",
    "map.atlas.reset": "Show the whole map (0)",
    "map.atlas.labels": "Show region names",
    "map.atlas.province":
      "{province}: {count} fermented foods. Enter to explore.",
    "map.title": "Atlas of Chinese Fermented Foods",
    "map.brand": "Atlas of Chinese Fermented Foods",
    "map.nav.map": "Explore the map",
    "map.nav.lab": "Virtual lab",
    "map.dice.kicker": "Leave it to chance",
    "map.dice.roll": "Roll for a fermented food",
    "map.dice.rolling": "Consulting the dice…",
    "map.dice.result": "The dice choose",
    "map.craft.title": "Same craft, other regions",
    "map.craft.none": "No food from another region uses {craft}.",
    "map.craft.count": "{count} regions",
    "map.craft.from": "From {province}",
    "map.panel.back": "Back",
    "map.panel.expand": "Expand detail panel",
    "map.detail.process": "Traditional process",
    "map.detail.findCraft": "Find the same craft",
    "map.detail.none": "No fermented food is recorded for {province} yet.",
    "map.tooltip.visited": "Visited",
    "map.tooltip.notVisited": "Not visited yet",
    "map.tooltip.noRecord": "No records yet",
    "map.series.foods": "Fermented foods",
    "map.listSeparator": ", ",
    "map.lab.title": "Virtual science lab",
    "map.lab.subtitle":
      "A two-bottle controlled experiment on yeast fermentation.",
    "map.lab.question": "Does sugar make yeast produce gas?",
    "map.lab.intro":
      "Yeast respires anaerobically, converting sugar into alcohol and CO₂. <strong>Bottle A</strong> starts with sugar; <strong>Bottle B</strong> is the sugar-free control. A balloon over each bottle captures the gas.",
    "map.lab.setupAlt":
      "Bottle A has a full balloon and bubbles; bottle B is the sugar-free control with a deflated balloon.",
    "map.lab.designTest": "Test bottle",
    "map.lab.designControl": "Control bottle",
    "map.lab.designReadout": "Readout",
    "map.lab.designTestValue": "Bottle A · sugar, yeast and warm water",
    "map.lab.designControlValue": "Bottle B · yeast and warm water",
    "map.lab.designReadoutValue": "Balloon inflation and relative gas score",
    "map.lab.testGroup": "Test group",
    "map.lab.controlGroup": "Control group",
    "map.lab.benchTitle": "Experiment bench",
    "map.lab.tableCaption": "Conditions for bottle A and bottle B",
    "map.lab.condition": "Condition",
    "map.lab.conditions": "Experiment conditions",
    "map.lab.bottleA": "Bottle A",
    "map.lab.bottleB": "Bottle B",
    "map.lab.groupA": "Test group · sugar + yeast + warm water",
    "map.lab.groupB": "Control group · adjust freely",
    "map.lab.sugar": "Sugar",
    "map.lab.yeast": "Yeast added",
    "map.lab.temp": "Water temperature",
    "map.lab.time": "Reaction time",
    "map.lab.oxygen": "Oxygen",
    "map.lab.ph": "pH",
    "map.lab.sugarHint": "Substrate for gas production",
    "map.lab.yeastHint": "The microbe that ferments the sugar",
    "map.lab.tempHint": "Best between 25 and 38 °C",
    "map.lab.timeHint": "How long fermentation runs",
    "map.lab.oxygenHint": "Sealed conditions favour fermentation",
    "map.lab.phHint": "Best between pH 4 and 6",
    "map.lab.noSugar": "No sugar",
    "map.lab.anaerobic": "Sealed",
    "map.lab.aerobic": "Open",
    "map.lab.zoneCold": "Too cold",
    "map.lab.zoneOptimal": "Optimal",
    "map.lab.zoneHot": "Too hot",
    "map.lab.acid": "Acidic",
    "map.lab.neutral": "Neutral",
    "map.lab.alkaline": "Alkaline",
    "map.lab.minutes": "{value} min",
    "map.lab.run": "Run experiment",
    "map.lab.restore": "Restore defaults",
    "map.lab.placeholder":
      "Adjust the conditions, then select Run experiment to see the prediction.",
    "map.lab.results": "Predicted result",
    "map.lab.resultsNote":
      "The bigger the balloon and the livelier the bubbles, the higher the gas score.",
    "map.lab.compareTitle": "A vs B",
    "map.lab.compareBody":
      "Compare balloon size first, then bubble activity and the relative score.",
    "map.lab.gasScore": "Relative gas score",
    "map.lab.why": "Why this result",
    "map.lab.idleTitle": "Ready to run",
    "map.lab.idleBody":
      "Set the conditions above, then select Run experiment. Each bottle's predicted gas score will appear below its column.",
    "map.lab.watchGas": "Balloon size is the gas readout.",
    "map.lab.watchBubbles": "Bubbles show that fermentation is active.",
    "map.lab.watchControl": "The gap between A and B shows what sugar changed.",
    "map.lab.logTitle": "Experiment log",
    "map.lab.logNote": "The latest eight runs are stored in this browser.",
    "map.lab.logEmpty": "No experiments recorded yet.",
    "map.lab.historyLine": "Bottle A: {a} | Bottle B: {b}",
    "map.lab.conditions.line":
      "A: sugar {sugar} g | yeast {yeast} g | {temp} °C | {time} min | {oxygen} | pH {ph}",
    "map.lab.conditions.lineB":
      "B: sugar {sugar} g | yeast {yeast} g | {temp} °C | {time} min | {oxygen} | pH {ph}",
    "map.lab.oxygenShort": "sealed",
    "map.lab.oxygenShortAerobic": "open",
    "map.lab.status.normal": "Active",
    "map.lab.status.fail": "No gas",
    "map.lab.status.weak": "Weak",
    "map.lab.fail.noYeast":
      "<strong>No yeast added</strong>: {bottle} contains no yeast, so anaerobic respiration cannot take place and no carbon dioxide is produced. Yeast is the micro-organism that fermentation requires.",
    "map.lab.fail.tooHot":
      "<strong>Water too hot ({temp} °C)</strong>: at {temp} °C the yeast proteins denature and the cells die, so respiration stops. Yeast works best between 25 and 38 °C and dies above 60 °C.",
    "map.lab.fail.tooCold":
      "<strong>Water too cold ({temp} °C)</strong>: at {temp} °C yeast metabolism almost stops and enzyme activity is strongly inhibited, so no gas is produced.",
    "map.lab.fail.ph":
      "<strong>Extreme pH ({ph})</strong>: yeast cannot survive at pH {ph}. It prefers pH 4–6, and conditions that are too acidic or too alkaline stop fermentation.",
    "map.lab.explain.noSugar":
      "{bottle} contains <strong>no sugar</strong>, so the yeast has no substrate for anaerobic respiration and cannot release CO₂.",
    "map.lab.explain.sugar":
      "{bottle} contains <strong>{sugar} g of sugar</strong>, giving the yeast substrate for fermentation.",
    "map.lab.explain.yeast": "<strong>{yeast} g of yeast</strong> was added.",
    "map.lab.explain.tempOptimal":
      "The water is <strong>{temp} °C</strong>, inside the yeast's optimal range (25–38 °C), so enzyme activity is at its highest.",
    "map.lab.explain.tempHigh":
      "The water is <strong>{temp} °C</strong>, which is too high, so enzyme activity and gas production fall as the temperature rises.",
    "map.lab.explain.tempLow":
      "The water is <strong>{temp} °C</strong>, which is too low, so yeast metabolism is inhibited and gas production is slow.",
    "map.lab.explain.time":
      "The reaction runs for <strong>{time} minutes</strong>.",
    "map.lab.explain.timeZero":
      "The reaction time is <strong>0</strong>, so fermentation has not started.",
    "map.lab.explain.anaerobic":
      "Under <strong>sealed, oxygen-free</strong> conditions the yeast carries out anaerobic respiration (alcoholic fermentation), producing CO₂ and alcohol.",
    "map.lab.explain.aerobic":
      "With the bottle <strong>open to the air</strong> the yeast respires aerobically first: it still produces CO₂, but less efficiently, and no alcohol accumulates.",
    "map.lab.explain.phOptimal":
      "The pH of <strong>{ph}</strong> is inside the yeast's optimal range (4–6, slightly acidic).",
    "map.lab.explain.phAlkaline":
      "The pH of <strong>{ph}</strong> is on the alkaline side, which partly inhibits yeast activity.",
    "map.lab.explain.phAcid":
      "The pH of <strong>{ph}</strong> is on the acidic side, which partly inhibits yeast activity.",
    "map.lab.summary.none":
      "Overall: <strong>no gas is produced</strong> and the balloon does not change.",
    "map.lab.summary.veryLow":
      "Overall: <strong>very little gas is produced</strong>, so the balloon barely changes.",
    "map.lab.summary.low":
      "Overall: <strong>a little gas is produced</strong>, so the balloon inflates slightly.",
    "map.lab.summary.medium":
      "Overall: <strong>a fair amount of gas is produced</strong>, so the balloon inflates clearly.",
    "map.lab.summary.high":
      "Overall: <strong>gas production is vigorous</strong> and the balloon inflates enormously.",
    "map.lab.cardA": "Sugar + yeast + warm water",
    "map.lab.cardANo": "Yeast + warm water (no sugar)",
    "map.lab.cardB": "Sugar + yeast + warm water",
    "map.lab.cardBNo": "Yeast + warm water (sugar-free control)",
    "map.lab.bubblesLabel": "Bubbles:",
    "map.lab.conclusion": "Conclusion",
    "map.lab.conclusionA":
      "Bottle A produced more gas, so <strong>its conditions favour gas production</strong>. Yeast breaks down sugar in anaerobic respiration and releases CO₂, which inflates the balloon.",
    "map.lab.conclusionB":
      "Bottle B produced more gas, so <strong>its conditions favour gas production</strong>. Yeast breaks down sugar in anaerobic respiration and releases CO₂, which inflates the balloon.",
    "map.lab.conclusionNone":
      "Neither bottle produced gas, so <strong>fermentation did not proceed under these conditions</strong>. Check the sugar, yeast, temperature and pH.",
    "map.lab.conclusionSame":
      "Both bottles produced a similar amount of gas, so <strong>their conditions work about equally well</strong>.",
    "map.lab.defaultTitle": "Starting conditions",
    "map.lab.paramSugar": "Sugar",
    "map.lab.paramYeast": "Yeast",
    "map.lab.paramTemp": "Water",
    "map.lab.paramTime": "Time",
    "map.lab.paramOxygen": "Oxygen",
    "map.lab.descA":
      "Sugar + yeast + warm water → yeast respires anaerobically, breaking down sugar and releasing CO₂",
    "map.lab.descB":
      "The default sugar-free control; adjust any condition freely to compare with bottle A",
    "map.lab.tipOperation":
      "<strong>How to use it:</strong> adjust the conditions above, then select Run experiment to see the prediction.",
    "map.lab.tipTheory":
      "<strong>How it works:</strong> without oxygen, yeast carries out alcoholic fermentation, breaking sugar down into alcohol and CO₂ gas, which inflates the balloon.",
    "map.lab.tipFailure":
      "<strong>Conditions worth trying:</strong> boiling water (above 60 °C), icy water (below 5 °C), no yeast, no sugar or an extreme pH — and observe what goes wrong.",
    "map.loading": "Unrolling the fermented food scroll…",
    "map.loadError": "Loading failed. Check your network connection.",
  },
  zh: {
    "map.atlas.eyebrow": "一方水土，一味发酵",
    "map.atlas.title": "循着风味，走进山海",
    "map.atlas.search": "查找省份或美食",
    "map.atlas.searchPlaceholder": "试试四川、泡菜或米酒",
    "map.atlas.progress": "你的风味足迹",
    "map.atlas.regionUnit": "个地区",
    "map.atlas.regionUnitOne": "个地区",
    "map.atlas.regions": "选择一站，品味风土",
    "map.atlas.toggle": "展开或收起地区面板",
    "map.atlas.items": "{count} 种美食",
    "map.atlas.noResults": "没有找到相应省份或美食，换个关键词试试。",
    "map.atlas.help":
      "拖拽探索，滚动滚轮或双指捏合缩放。使用方向键切换地区，按回车打开。",
    "map.atlas.controls": "地图操作",
    "map.atlas.close": "关闭面板",
    "map.atlas.zoomIn": "放大（+）",
    "map.atlas.zoomOut": "缩小（-）",
    "map.atlas.reset": "恢复全图（0）",
    "map.atlas.labels": "显示省份名称",
    "map.atlas.province": "{province}，{count} 种发酵美食。按回车探索。",
    "map.title": "华夏发酵美食图鉴",
    "map.brand": "华夏发酵美食图鉴",
    "map.nav.map": "探索地图",
    "map.nav.lab": "虚拟实验",
    "map.dice.kicker": "交给运气",
    "map.dice.roll": "掷骰占卜美食",
    "map.dice.rolling": "正在占卜美食…",
    "map.dice.result": "天意所指",
    "map.craft.title": "同艺寻访 · 他省美食",
    "map.craft.none": "未寻得使用「{craft}」工艺的他省美食",
    "map.craft.count": "共 {count} 个省份",
    "map.craft.from": "来自{province}",
    "map.panel.back": "返回",
    "map.panel.expand": "展开详情面板",
    "map.detail.process": "古法工艺",
    "map.detail.findCraft": "寻访同艺",
    "map.detail.none": "「{province}」暂无发酵美食记载",
    "map.tooltip.visited": "已踏足",
    "map.tooltip.notVisited": "未踏足",
    "map.tooltip.noRecord": "暂无记载",
    "map.series.foods": "发酵美食",
    "map.listSeparator": "、",
    "map.lab.title": "虚拟科学实验",
    "map.lab.subtitle": "酵母发酵产气的双瓶对照实验",
    "map.lab.question": "糖会让酵母产气吗？",
    "map.lab.intro":
      "酵母在无氧条件下进行酒精发酵，将糖转化为酒精和二氧化碳。<strong>A瓶</strong>初始加糖，<strong>B瓶</strong>不加糖，作为对照。瓶口的气球用于收集气体。",
    "map.lab.setupAlt": "A瓶的气球鼓起并出现气泡；B瓶是无糖对照，气球瘪着。",
    "map.lab.designTest": "实验瓶",
    "map.lab.designControl": "对照瓶",
    "map.lab.designReadout": "观察指标",
    "map.lab.designTestValue": "A瓶 · 糖、酵母与温水",
    "map.lab.designControlValue": "B瓶 · 酵母与温水",
    "map.lab.designReadoutValue": "气球膨胀程度与相对产气评分",
    "map.lab.testGroup": "实验组",
    "map.lab.controlGroup": "对照组",
    "map.lab.benchTitle": "实验台",
    "map.lab.tableCaption": "A瓶与B瓶的实验条件",
    "map.lab.condition": "条件",
    "map.lab.conditions": "实验条件",
    "map.lab.bottleA": "A瓶",
    "map.lab.bottleB": "B瓶",
    "map.lab.groupA": "实验组 · 糖 + 酵母 + 温水",
    "map.lab.groupB": "对照组 · 可自由调节",
    "map.lab.sugar": "糖",
    "map.lab.yeast": "酵母添加量",
    "map.lab.temp": "水温",
    "map.lab.time": "反应时间",
    "map.lab.oxygen": "氧气条件",
    "map.lab.ph": "pH",
    "map.lab.sugarHint": "产气所需的底物",
    "map.lab.yeastHint": "负责发酵的微生物",
    "map.lab.tempHint": "最适温度 25–38 °C",
    "map.lab.timeHint": "发酵持续时间",
    "map.lab.oxygenHint": "密闭条件更利于发酵",
    "map.lab.phHint": "最适 pH 4–6",
    "map.lab.noSugar": "无糖",
    "map.lab.anaerobic": "密闭",
    "map.lab.aerobic": "敞口",
    "map.lab.zoneCold": "低温",
    "map.lab.zoneOptimal": "适宜",
    "map.lab.zoneHot": "高温",
    "map.lab.acid": "酸性",
    "map.lab.neutral": "中性",
    "map.lab.alkaline": "碱性",
    "map.lab.minutes": "{value} 分钟",
    "map.lab.run": "开始实验",
    "map.lab.restore": "恢复默认",
    "map.lab.placeholder": "调整实验条件，点击“开始实验”查看预测结果。",
    "map.lab.results": "预测结果",
    "map.lab.resultsNote": "气球越大、气泡越活跃，产气评分就越高。",
    "map.lab.compareTitle": "A 与 B",
    "map.lab.compareBody": "先比较气球大小，再看气泡活动与相对评分。",
    "map.lab.gasScore": "相对产气评分",
    "map.lab.why": "结果解读",
    "map.lab.idleTitle": "可以开始实验",
    "map.lab.idleBody":
      "先设置上方条件，再点击“开始实验”。两瓶的预测产气评分会显示在各自列下方。",
    "map.lab.watchGas": "气球大小就是产气量的读数。",
    "map.lab.watchBubbles": "气泡说明发酵正在进行。",
    "map.lab.watchControl": "A、B两瓶的差异反映糖带来的变化。",
    "map.lab.logTitle": "实验记录",
    "map.lab.logNote": "最近八次实验保存在本机浏览器中。",
    "map.lab.logEmpty": "暂无实验记录。",
    "map.lab.historyLine": "A瓶：{a} | B瓶：{b}",
    "map.lab.conditions.line":
      "A：糖 {sugar} g | 酵母 {yeast} g | {temp} °C | {time} 分钟 | {oxygen} | pH {ph}",
    "map.lab.conditions.lineB":
      "B：糖 {sugar} g | 酵母 {yeast} g | {temp} °C | {time} 分钟 | {oxygen} | pH {ph}",
    "map.lab.oxygenShort": "密闭",
    "map.lab.oxygenShortAerobic": "敞口",
    "map.lab.status.normal": "活跃",
    "map.lab.status.fail": "无产气",
    "map.lab.status.weak": "微弱",
    "map.lab.fail.noYeast":
      "<strong>未添加酵母菌</strong>：{bottle}中没有酵母菌，无法进行无氧呼吸，因此不会产生二氧化碳气体。酵母菌是发酵的必需微生物。",
    "map.lab.fail.tooHot":
      "<strong>水温过高（{temp} °C）</strong>：酵母菌在{temp} °C的高温下蛋白质变性失活，无法进行呼吸作用。酵母菌适宜温度范围为25–38 °C，超过60 °C即死亡。",
    "map.lab.fail.tooCold":
      "<strong>水温过低（{temp} °C）</strong>：酵母菌在{temp} °C的低温下代谢活动几乎停止，酶活性被严重抑制，无法进行发酵产气。",
    "map.lab.fail.ph":
      "<strong>pH值极端（{ph}）</strong>：酵母菌在pH {ph}的环境中无法存活。酵母菌适宜pH范围为4–6（微酸性），过酸或过碱都会停止发酵。",
    "map.lab.explain.noSugar":
      "{bottle}<strong>未添加糖</strong>，酵母菌缺乏发酵底物，无法进行无氧呼吸产生CO₂。",
    "map.lab.explain.sugar":
      "{bottle}含有<strong>{sugar} g糖</strong>，为酵母菌提供了发酵底物。",
    "map.lab.explain.yeast": "添加了<strong>{yeast} g酵母菌</strong>。",
    "map.lab.explain.tempOptimal":
      "水温<strong>{temp} °C</strong>处于酵母菌最适宜温度范围（25–38 °C），酶活性最高。",
    "map.lab.explain.tempHigh":
      "水温<strong>{temp} °C</strong>偏高，酵母菌酶活性随温度升高而降低，产气效率下降。",
    "map.lab.explain.tempLow":
      "水温<strong>{temp} °C</strong>偏低，酵母菌代谢活动受到抑制，产气缓慢。",
    "map.lab.explain.time": "反应<strong>{time}分钟</strong>。",
    "map.lab.explain.timeZero": "反应时间<strong>为0</strong>，尚未开始发酵。",
    "map.lab.explain.anaerobic":
      "<strong>密闭无氧</strong>条件下，酵母菌进行无氧呼吸（酒精发酵），产生CO₂和酒精。",
    "map.lab.explain.aerobic":
      "<strong>敞口有氧</strong>条件下，酵母菌优先进行有氧呼吸，虽然也产生CO₂，但产气效率较低且不积累酒精。",
    "map.lab.explain.phOptimal":
      "pH<strong>{ph}</strong>处于酵母菌适宜范围（4–6，微酸性）。",
    "map.lab.explain.phAlkaline":
      "pH<strong>{ph}</strong>偏碱性，酵母菌活性受到一定抑制。",
    "map.lab.explain.phAcid":
      "pH<strong>{ph}</strong>偏酸性，酵母菌活性受到一定抑制。",
    "map.lab.summary.none": "综合判断：<strong>无产气</strong>，气球无变化。",
    "map.lab.summary.veryLow":
      "综合判断：<strong>产气极少</strong>，气球几乎无变化。",
    "map.lab.summary.low":
      "综合判断：<strong>产气较少</strong>，气球轻微鼓起。",
    "map.lab.summary.medium":
      "综合判断：<strong>产气较多</strong>，气球明显膨大。",
    "map.lab.summary.high":
      "综合判断：<strong>产气旺盛</strong>，气球巨大膨胀。",
    "map.lab.cardA": "糖 + 酵母 + 温水",
    "map.lab.cardANo": "酵母 + 温水（无糖）",
    "map.lab.cardB": "糖 + 酵母 + 温水",
    "map.lab.cardBNo": "酵母 + 温水（无糖对照）",
    "map.lab.bubblesLabel": "气泡：",
    "map.lab.conclusion": "实验结论",
    "map.lab.conclusionA":
      "A瓶产气量高于B瓶，说明<strong>A瓶的发酵条件更有利于产气</strong>。酵母菌无氧呼吸分解糖类产生CO₂，使气球膨胀。",
    "map.lab.conclusionB":
      "B瓶产气量高于A瓶，说明<strong>B瓶的发酵条件更有利于产气</strong>。酵母菌无氧呼吸分解糖类产生CO₂，使气球膨胀。",
    "map.lab.conclusionNone":
      "两瓶均无产气，说明<strong>当前条件下发酵未正常进行</strong>，请检查糖、酵母、温度与pH等条件。",
    "map.lab.conclusionSame":
      "两瓶产气量相近，说明<strong>两瓶的发酵条件产气效果相当</strong>。",
    "map.lab.defaultTitle": "初始条件",
    "map.lab.paramSugar": "糖",
    "map.lab.paramYeast": "酵母",
    "map.lab.paramTemp": "水温",
    "map.lab.paramTime": "时间",
    "map.lab.paramOxygen": "氧气",
    "map.lab.descA": "糖 + 酵母 + 温水 → 酵母菌无氧呼吸分解糖类产生CO₂",
    "map.lab.descB": "默认无糖对照组，可自由调节各项条件进行对比实验",
    "map.lab.tipOperation":
      "<strong>操作提示：</strong>调整上方实验条件，然后点击“开始实验”查看预测结果。",
    "map.lab.tipTheory":
      "<strong>实验原理：</strong>酵母菌在无氧条件下进行酒精发酵，将糖分解为酒精和CO₂气体，CO₂使气球膨胀。",
    "map.lab.tipFailure":
      "<strong>可尝试的条件：</strong>沸水（高于60 °C）、冰水（低于5 °C）、不加酵母、不加糖或极端pH，观察发酵如何停止。",
    "map.loading": "正在展开华夏美食画卷...",
    "map.loadError": "加载失败，请检查网络连接",
  },
  ja: {
    "map.atlas.eyebrow": "土地が育む発酵の味",
    "map.atlas.title": "発酵の味をたどる旅",
    "map.atlas.search": "地域や料理を探す",
    "map.atlas.searchPlaceholder": "四川や米酒など",
    "map.atlas.progress": "あなたの発見",
    "map.atlas.regionUnit": "地域",
    "map.atlas.regionUnitOne": "地域",
    "map.atlas.regions": "次の地域を選ぶ",
    "map.atlas.toggle": "地域パネルを開閉",
    "map.atlas.items": "{count}品",
    "map.atlas.noResults":
      "該当する地域や料理がありません。別の名前で検索してください。",
    "map.atlas.help":
      "ドラッグで移動。スクロールまたはピンチで拡大。方向キーで地域を移動し、Enterで開きます。",
    "map.atlas.controls": "地図の操作",
    "map.atlas.close": "パネルを閉じる",
    "map.atlas.zoomIn": "拡大（+）",
    "map.atlas.zoomOut": "縮小（-）",
    "map.atlas.reset": "全体表示（0）",
    "map.atlas.labels": "地域名を表示",
    "map.atlas.province": "{province}：発酵料理{count}品。Enterで探索。",
    "map.title": "中国発酵美食図鑑",
    "map.brand": "中国発酵美食図鑑",
    "map.nav.map": "マップで探す",
    "map.nav.lab": "バーチャル実験",
    "map.dice.kicker": "運に任せる",
    "map.dice.roll": "サイコロで美食占い",
    "map.dice.rolling": "美食を占っています…",
    "map.dice.result": "占いの結果",
    "map.craft.title": "同じ製法の他地域の美食",
    "map.craft.none":
      "「{craft}」の製法を使う他地域の美食は見つかりませんでした",
    "map.craft.count": "全{count}地域",
    "map.craft.from": "{province}から",
    "map.panel.back": "戻る",
    "map.panel.expand": "詳細パネルを開く",
    "map.detail.process": "伝統の製法",
    "map.detail.findCraft": "同じ製法を探す",
    "map.detail.none": "「{province}」には発酵美食の記録がありません",
    "map.tooltip.visited": "訪問済み",
    "map.tooltip.notVisited": "未訪問",
    "map.tooltip.noRecord": "記録はまだありません",
    "map.series.foods": "発酵美食",
    "map.listSeparator": "・",
    "map.lab.title": "バーチャル科学実験",
    "map.lab.subtitle": "酵母の発酵によるガス発生を比べる2瓶の対照実験",
    "map.lab.question": "糖は酵母のガス発生を促すのか？",
    "map.lab.intro":
      "酵母は嫌気条件でアルコール発酵を行い、糖をアルコールとCO₂に変えます。<strong>A瓶</strong>には糖を入れ、<strong>B瓶</strong>は糖なしの対照区とします。瓶口の風船でガスを集めます。",
    "map.lab.setupAlt":
      "A瓶は風船が膨らみ気泡が見えます。B瓶は糖なしの対照区で、風船はしぼんでいます。",
    "map.lab.designTest": "実験瓶",
    "map.lab.designControl": "対照瓶",
    "map.lab.designReadout": "読み取り指標",
    "map.lab.designTestValue": "A瓶・糖・酵母・ぬるま湯",
    "map.lab.designControlValue": "B瓶・酵母・ぬるま湯",
    "map.lab.designReadoutValue": "風船の膨らみと相対ガススコア",
    "map.lab.testGroup": "実験区",
    "map.lab.controlGroup": "対照区",
    "map.lab.benchTitle": "実験ベンチ",
    "map.lab.tableCaption": "A瓶とB瓶の実験条件",
    "map.lab.condition": "条件",
    "map.lab.conditions": "実験条件",
    "map.lab.bottleA": "A瓶",
    "map.lab.bottleB": "B瓶",
    "map.lab.groupA": "実験区・糖＋酵母＋ぬるま湯",
    "map.lab.groupB": "対照区・自由に調整できます",
    "map.lab.sugar": "糖",
    "map.lab.yeast": "酵母の添加量",
    "map.lab.temp": "水温",
    "map.lab.time": "反応時間",
    "map.lab.oxygen": "酸素条件",
    "map.lab.ph": "pH",
    "map.lab.sugarHint": "ガス発生の基質",
    "map.lab.yeastHint": "糖を発酵させる微生物",
    "map.lab.tempHint": "最適温度 25–38 °C",
    "map.lab.timeHint": "発酵させる時間",
    "map.lab.oxygenHint": "密閉条件は発酵に有利",
    "map.lab.phHint": "最適 pH 4–6",
    "map.lab.noSugar": "糖なし",
    "map.lab.anaerobic": "密閉",
    "map.lab.aerobic": "開放",
    "map.lab.zoneCold": "低温",
    "map.lab.zoneOptimal": "適温",
    "map.lab.zoneHot": "高温",
    "map.lab.acid": "酸性",
    "map.lab.neutral": "中性",
    "map.lab.alkaline": "アルカリ性",
    "map.lab.minutes": "{value} 分",
    "map.lab.run": "実験を開始",
    "map.lab.restore": "既定値に戻す",
    "map.lab.placeholder":
      "条件を調整し、「実験を開始」を押すと予測結果が表示されます。",
    "map.lab.results": "予測結果",
    "map.lab.resultsNote":
      "風船が大きいほど、気泡が活発なほど、ガススコアが高くなります。",
    "map.lab.compareTitle": "A と B",
    "map.lab.compareBody": "まず風船の大きさ、次に気泡と相対スコアを比べます。",
    "map.lab.gasScore": "相対ガススコア",
    "map.lab.why": "この結果の理由",
    "map.lab.idleTitle": "実験の準備完了",
    "map.lab.idleBody":
      "上の条件を設定し、「実験を開始」を押してください。各瓶の予測ガススコアが列の下に表示されます。",
    "map.lab.watchGas": "風船の大きさがガス量の指標です。",
    "map.lab.watchBubbles": "気泡は発酵が進んでいる合図です。",
    "map.lab.watchControl": "AとBの差が、糖によって変わった点です。",
    "map.lab.logTitle": "実験の記録",
    "map.lab.logNote": "最新8回の実験はこのブラウザに保存されます。",
    "map.lab.logEmpty": "実験の記録はまだありません。",
    "map.lab.historyLine": "A瓶：{a} | B瓶：{b}",
    "map.lab.conditions.line":
      "A：糖 {sugar} g | 酵母 {yeast} g | {temp} °C | {time} 分 | {oxygen} | pH {ph}",
    "map.lab.conditions.lineB":
      "B：糖 {sugar} g | 酵母 {yeast} g | {temp} °C | {time} 分 | {oxygen} | pH {ph}",
    "map.lab.oxygenShort": "嫌気",
    "map.lab.oxygenShortAerobic": "好気",
    "map.lab.status.normal": "活発",
    "map.lab.status.fail": "ガスなし",
    "map.lab.status.weak": "微弱",
    "map.lab.fail.noYeast":
      "<strong>酵母を添加していない</strong>：{bottle}には酵母がいないため、嫌気呼吸ができず二酸化炭素は発生しません。酵母は発酵に欠かせない微生物です。",
    "map.lab.fail.tooHot":
      "<strong>水温が高すぎる（{temp} °C）</strong>：{temp} °Cでは酵母のタンパク質が変性して死滅し、呼吸が止まります。酵母の適温は25〜38 °Cで、60 °Cを超えると死滅します。",
    "map.lab.fail.tooCold":
      "<strong>水温が低すぎる（{temp} °C）</strong>：{temp} °Cでは酵母の代謝がほぼ止まり、酵素活性も強く阻害されるため、ガスは発生しません。",
    "map.lab.fail.ph":
      "<strong>pHが極端（{ph}）</strong>：酵母はpH {ph}では生存できません。酵母の適pHは4〜6（弱酸性）で、強すぎる酸やアルカリは発酵を止めます。",
    "map.lab.explain.noSugar":
      "{bottle}には<strong>糖が入っていない</strong>ため、酵母に発酵の基質がなく、嫌気呼吸でCO₂を発生できません。",
    "map.lab.explain.sugar":
      "{bottle}には<strong>糖が{sugar} g</strong>あり、酵母に発酵の基質が供給されています。",
    "map.lab.explain.yeast": "<strong>酵母を{yeast} g</strong>添加しました。",
    "map.lab.explain.tempOptimal":
      "水温<strong>{temp} °C</strong>は酵母の最適温度域（25〜38 °C）にあり、酵素活性が最も高くなります。",
    "map.lab.explain.tempHigh":
      "水温<strong>{temp} °C</strong>は高めで、温度が上がるほど酵素活性が低下し、ガス発生効率も下がります。",
    "map.lab.explain.tempLow":
      "水温<strong>{temp} °C</strong>は低めで、酵母の代謝が抑えられ、ガスの発生はゆっくりになります。",
    "map.lab.explain.time": "反応時間は<strong>{time}分</strong>です。",
    "map.lab.explain.timeZero":
      "反応時間が<strong>0</strong>なので、まだ発酵は始まっていません。",
    "map.lab.explain.anaerobic":
      "<strong>密閉・無酸素</strong>の条件では、酵母は嫌気呼吸（アルコール発酵）を行い、CO₂とアルコールを生成します。",
    "map.lab.explain.aerobic":
      "<strong>開放・有酸素</strong>の条件では、酵母はまず好気呼吸を行います。CO₂は発生しますが効率は低く、アルコールも蓄積しません。",
    "map.lab.explain.phOptimal":
      "pH<strong>{ph}</strong>は酵母の適正域（4〜6の弱酸性）にあります。",
    "map.lab.explain.phAlkaline":
      "pH<strong>{ph}</strong>はアルカリ性側で、酵母の活性がやや抑えられます。",
    "map.lab.explain.phAcid":
      "pH<strong>{ph}</strong>は酸性側で、酵母の活性がやや抑えられます。",
    "map.lab.summary.none":
      "総合判断：<strong>ガスは発生せず</strong>、風船は変化しません。",
    "map.lab.summary.veryLow":
      "総合判断：<strong>ガス発生はごくわずか</strong>で、風船はほとんど変化しません。",
    "map.lab.summary.low":
      "総合判断：<strong>ガス発生は少なめ</strong>で、風船は少し膨らみます。",
    "map.lab.summary.medium":
      "総合判断：<strong>ガス発生はやや多め</strong>で、風船ははっきり膨らみます。",
    "map.lab.summary.high":
      "総合判断：<strong>ガス発生が旺盛</strong>で、風船は大きく膨張します。",
    "map.lab.cardA": "糖＋酵母＋ぬるま湯",
    "map.lab.cardANo": "酵母＋ぬるま湯（糖なし）",
    "map.lab.cardB": "糖＋酵母＋ぬるま湯",
    "map.lab.cardBNo": "酵母＋ぬるま湯（糖なし対照区）",
    "map.lab.bubblesLabel": "気泡：",
    "map.lab.conclusion": "実験の結論",
    "map.lab.conclusionA":
      "A瓶のほうがガス発生量が多いため、<strong>A瓶の条件のほうがガス発生に有利</strong>です。酵母は嫌気呼吸で糖を分解しCO₂を発生させ、風船が膨らみます。",
    "map.lab.conclusionB":
      "B瓶のほうがガス発生量が多いため、<strong>B瓶の条件のほうがガス発生に有利</strong>です。酵母は嫌気呼吸で糖を分解しCO₂を発生させ、風船が膨らみます。",
    "map.lab.conclusionNone":
      "どちらの瓶もガスが発生していません。<strong>現在の条件では発酵が正常に進んでいません</strong>。糖・酵母・温度・pHなどを確認してください。",
    "map.lab.conclusionSame":
      "両方の瓶のガス発生量がほぼ同じで、<strong>どちらの条件も同程度の効果</strong>です。",
    "map.lab.defaultTitle": "初期条件",
    "map.lab.paramSugar": "糖",
    "map.lab.paramYeast": "酵母",
    "map.lab.paramTemp": "水温",
    "map.lab.paramTime": "時間",
    "map.lab.paramOxygen": "酸素",
    "map.lab.descA": "糖＋酵母＋ぬるま湯 → 酵母が嫌気呼吸で糖を分解しCO₂を発生",
    "map.lab.descB":
      "既定の糖なし対照区。各条件を自由に調整して比較実験ができます",
    "map.lab.tipOperation":
      "<strong>操作のヒント：</strong>上の条件を調整し、「実験を開始」を押すと予測結果が表示されます。",
    "map.lab.tipTheory":
      "<strong>実験の原理：</strong>酵母は無酸素条件下でアルコール発酵を行い、糖をアルコールとCO₂に分解します。CO₂によって風船が膨らみます。",
    "map.lab.tipFailure":
      "<strong>試してみたい条件：</strong>沸騰した湯（60 °C超）、氷水（5 °C未満）、酵母なし、糖なし、極端なpHなどで、発酵が止まるようすを観察します。",
    "map.loading": "発酵美食の絵巻を広げています…",
    "map.loadError":
      "読み込みに失敗しました。ネットワーク接続を確認してください。",
  },
};

// Balloon and bubble states returned by the simulation use stable keys.
const BALLOON_TEXT = {
  none: { en: "no change", zh: "无变化", ja: "変化なし" },
  slight: { en: "slightly inflated", zh: "轻微鼓起", ja: "少し膨らむ" },
  obvious: { en: "clearly inflated", zh: "明显膨大", ja: "はっきり膨らむ" },
  huge: { en: "huge", zh: "巨大", ja: "大きく膨張" },
};
const BUBBLE_TEXT = {
  none: { en: "None", zh: "无", ja: "なし" },
  low: { en: "Low", zh: "少量", ja: "少ない" },
  medium: { en: "Medium", zh: "较多", ja: "多い" },
  high: { en: "High", zh: "大量", ja: "非常に多い" },
};

registerMessages(MAP_MESSAGES);

export function provinceLabel(chineseName) {
  const entry = PROVINCE_TEXT[chineseName];
  if (!entry) return chineseName;
  return getLocale() === "zh" ? chineseName : entry[getLocale()] || chineseName;
}

export function provinceLabels(chineseName) {
  const entry = PROVINCE_TEXT[chineseName];
  return {
    zh: chineseName.replace(
      /壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区|省|市/g,
      "",
    ),
    en: entry?.en || chineseName,
    ja: entry?.ja || chineseName,
  };
}

export function craftLabel(chineseCraft) {
  if (getLocale() === "zh") return chineseCraft;
  return CRAFT_TEXT[chineseCraft]?.[getLocale()]?.label || chineseCraft;
}

export function craftDescription(chineseCraft) {
  if (getLocale() === "zh") return "";
  return CRAFT_TEXT[chineseCraft]?.[getLocale()]?.desc || "";
}

// Returns a copy of a supplied food entry in the active language.
export function localizeFood(food) {
  const text = FOOD_TEXT[food.name]?.[getLocale()];
  return {
    name: text?.name || food.name,
    craft: craftLabel(food.craft),
    desc: text?.desc || food.desc,
    process: text?.process || food.process,
  };
}

export function balloonLabel(key) {
  return BALLOON_TEXT[key]?.[getLocale()] || key;
}

export function bubbleLabel(key) {
  return BUBBLE_TEXT[key]?.[getLocale()] || key;
}

export { t };
