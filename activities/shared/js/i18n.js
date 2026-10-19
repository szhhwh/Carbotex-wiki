import { storage } from "./storage.js";

// English is the default so a first visit never depends on the browser locale.
export const LOCALES = ["en", "zh", "ja"];
export const DEFAULT_LOCALE = "en";

// Native names keep the switcher readable whatever locale is active.
const LOCALE_LABELS = { en: "EN", zh: "中文", ja: "日本語" };
const LOCALE_NAMES = { en: "English", zh: "中文", ja: "日本語" };
const HTML_LANG = { en: "en", zh: "zh", ja: "ja" };
const FONT_FAMILIES = {
  en: '"Noto Sans", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  zh: '"Noto Serif CJK SC", "Songti SC", "STSong", "SimSun", serif',
  ja: '"Noto Sans CJK JP", "Hiragino Sans", "Yu Gothic", "PingFang SC", sans-serif',
};
// One key is shared by all three activities so the choice carries over.
const STORAGE_KEY = "activity-locale";

const messages = new Map();
const listeners = new Set();
let currentLocale = readStoredLocale();

function readStoredLocale() {
  const stored = storage.getItem(STORAGE_KEY);
  return LOCALES.includes(stored) ? stored : DEFAULT_LOCALE;
}

export function getLocale() {
  return currentLocale;
}

export function fontFamily(locale = currentLocale) {
  return FONT_FAMILIES[locale] || FONT_FAMILIES[DEFAULT_LOCALE];
}

export function registerMessages(byLocale) {
  for (const locale of LOCALES) {
    const dictionary = byLocale[locale];
    if (!dictionary) continue;
    for (const [key, value] of Object.entries(dictionary)) {
      if (typeof value !== "string") continue;
      messages.set(key, { ...messages.get(key), [locale]: value });
    }
  }
}

export function t(key, values) {
  const entry = messages.get(key);
  let text = entry?.[currentLocale] ?? entry?.[DEFAULT_LOCALE] ?? key;
  if (values) {
    for (const [name, value] of Object.entries(values)) {
      text = text.split(`{${name}}`).join(String(value));
    }
  }
  return text;
}

function applyDocumentLanguage(locale) {
  const root = document.documentElement;
  root.lang = HTML_LANG[locale] || locale;
  root.dataset.locale = locale;
}

function applySwitcherState() {
  for (const switcher of document.querySelectorAll("[data-lang-switcher]")) {
    for (const button of switcher.querySelectorAll("[data-locale]")) {
      const active = button.dataset.locale === currentLocale;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("is-active", active);
    }
    switcher.setAttribute("aria-label", t("shared.language"));
  }
}

function readAttributeTranslations() {
  return Array.from(document.querySelectorAll("[data-i18n-attr]")).map(
    (element) => ({
      element,
      source: element.getAttribute("data-i18n-attr"),
    }),
  );
}

// Applies data-i18n (text), data-i18n-html (markup) and
// data-i18n-attr="aria-label:key,title:key" to the given root.
export function applyDom(root = document) {
  for (const element of root.querySelectorAll("[data-i18n]")) {
    element.textContent = t(element.getAttribute("data-i18n"));
  }
  for (const element of root.querySelectorAll("[data-i18n-html]")) {
    element.innerHTML = t(element.getAttribute("data-i18n-html"));
  }
  for (const { element, source } of readAttributeTranslations()) {
    for (const pair of source.split(",")) {
      const [attribute, key] = pair.split(":").map((part) => part.trim());
      if (attribute && key) element.setAttribute(attribute, t(key));
    }
  }
}

export function onLocaleChange(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setLocale(locale, { persist = true } = {}) {
  if (!LOCALES.includes(locale) || locale === currentLocale) {
    applyDocumentLanguage(currentLocale);
    applyDom();
    applySwitcherState();
    return currentLocale;
  }
  currentLocale = locale;
  if (persist) storage.setItem(STORAGE_KEY, locale);
  applyDocumentLanguage(locale);
  applyDom();
  applySwitcherState();
  for (const listener of [...listeners]) listener(locale);
  return locale;
}

export function createLanguageSwitcher() {
  const switcher = document.createElement("div");
  switcher.className = "activity-lang";
  switcher.dataset.langSwitcher = "";
  switcher.setAttribute("role", "group");
  switcher.setAttribute("aria-label", t("shared.language"));
  for (const locale of LOCALES) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.locale = locale;
    button.textContent = LOCALE_LABELS[locale];
    button.setAttribute("aria-pressed", String(locale === currentLocale));
    button.classList.toggle("is-active", locale === currentLocale);
    button.setAttribute(
      "aria-label",
      t("shared.switchTo", { language: LOCALE_NAMES[locale] }),
    );
    button.title = LOCALE_NAMES[locale];
    button.addEventListener("click", () => setLocale(locale));
    switcher.append(button);
  }
  return switcher;
}

export function mountLanguageSwitcher(target) {
  const hosts =
    typeof target === "string"
      ? [...document.querySelectorAll(target)]
      : target
        ? [target]
        : [];
  const mounted = [];
  for (const host of hosts) {
    if (host.querySelector("[data-lang-switcher]")) continue;
    const switcher = createLanguageSwitcher();
    host.append(switcher);
    mounted.push(switcher);
  }
  applySwitcherState();
  return mounted[0] || null;
}

registerMessages({
  en: {
    "shared.language": "Language",
    "shared.switchTo": "Switch to {language}",
    "shared.close": "Close panel",
    "shared.dialog": "Interactive controls",
  },
  zh: {
    "shared.language": "语言",
    "shared.switchTo": "切换到{language}",
    "shared.close": "关闭面板",
    "shared.dialog": "互动操作",
  },
  ja: {
    "shared.language": "言語",
    "shared.switchTo": "{language}に切り替え",
    "shared.close": "パネルを閉じる",
    "shared.dialog": "インタラクティブ操作",
  },
});

export function initActivityI18n({
  messages: dictionary,
  switcher,
  onChange,
} = {}) {
  if (dictionary) registerMessages(dictionary);
  applyDocumentLanguage(currentLocale);
  applyDom();
  if (switcher) mountLanguageSwitcher(switcher);
  applySwitcherState();
  if (onChange) onLocaleChange(onChange);
  return { t, getLocale, setLocale, applyDom, fontFamily, onLocaleChange };
}
