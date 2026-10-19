import "../../css/tutorial.css";
import { storage } from "../../../shared/js/storage.js";
import { t } from "../i18n.js";

// Built from the active locale so a language switch relabels the guide.
function buildSteps() {
  return [
    {
      id: "welcome",
      title: t("esg.tutorial.welcomeTitle"),
      content: t("esg.tutorial.welcomeBody"),
      target: null,
      position: "center",
    },
    {
      id: "quick-start",
      title: t("esg.tutorial.quickTitle"),
      content: t("esg.tutorial.quickBody"),
      target: null,
      position: "center",
    },
    {
      id: "pasture-health",
      title: t("esg.tutorial.healthTitle"),
      content: t("esg.tutorial.healthBody"),
      target: "#pasture-meter",
      position: "bottom",
    },
    {
      id: "factions",
      title: t("esg.tutorial.factionsTitle"),
      content: t("esg.tutorial.factionsBody"),
      target: "#factions-container",
      position: "right",
    },
    {
      id: "faction-abilities",
      title: t("esg.tutorial.abilitiesTitle"),
      content: t("esg.tutorial.abilitiesBody"),
      target: "#factions-container",
      position: "right",
    },
    {
      id: "actions",
      title: t("esg.tutorial.actionsTitle"),
      content: t("esg.tutorial.actionsBody"),
      target: "#factions-container",
      position: "bottom",
    },
    {
      id: "next-step",
      title: t("esg.tutorial.nextTitle"),
      content: t("esg.tutorial.nextBody"),
      target: "#round-status",
      position: "bottom",
    },
    {
      id: "trade",
      title: t("esg.tutorial.tradeTitle"),
      content: t("esg.tutorial.tradeBody"),
      target: "#trade-btn",
      fallbackTarget: "#factions-container",
      position: "left",
    },
    {
      id: "events",
      title: t("esg.tutorial.eventsTitle"),
      content: t("esg.tutorial.eventsBody"),
      target: "#event-display",
      position: "left",
    },
    {
      id: "end-round",
      title: t("esg.tutorial.endRoundTitle"),
      content: t("esg.tutorial.endRoundBody"),
      target: "#end-round-btn",
      position: "left",
    },
    {
      id: "win-criteria",
      title: t("esg.tutorial.winTitle"),
      content: t("esg.tutorial.winBody"),
      target: "#win-criteria",
      position: "bottom",
    },
    {
      id: "rules",
      title: t("esg.tutorial.rulesTitle"),
      content: t("esg.tutorial.rulesBody"),
      target: "details",
      position: "top",
    },
  ];
}

// 新手指引系统
export class Tutorial {
  constructor() {
    this.currentStep = 0;
    this.overlay = null;
    this.tooltip = null;
    this.isActive = false;
    this.isDone = false;
  }

  get steps() {
    return buildSteps();
  }

  start() {
    if (this.isActive || document.querySelector(".tutorial-overlay")) {
      return;
    }

    // 检查是否是首次访问
    if (storage.getItem("esg-game-tutorial-completed")) {
      return;
    }

    this.isActive = true;
    this.createOverlay();
    this.createTooltip();
    this.reposition = () => {
      const step = this.isDone ? null : this.steps[this.currentStep];
      const target = step ? this.resolveTarget(step) : null;
      if (target) {
        this.highlightElement(target);
        this.positionTooltip(target, step.position);
      } else {
        this.overlay.querySelector(".tutorial-spotlight")?.remove();
        this.positionTooltipCenter();
      }
    };
    window.addEventListener("resize", this.reposition);
    window.addEventListener("scroll", this.reposition, { passive: true });
    this.showStep(0);
  }

  createOverlay() {
    this.overlay = document.createElement("div");
    this.overlay.className = "tutorial-overlay";
    this.overlay.innerHTML = `
      <div class="tutorial-backdrop"></div>
    `;
    document.body.appendChild(this.overlay);
  }

  createTooltip() {
    this.tooltip = document.createElement("div");
    this.tooltip.className = "tutorial-tooltip";
    this.overlay.appendChild(this.tooltip);
  }

  showStep(index) {
    if (index >= this.steps.length) {
      this.complete();
      return;
    }

    this.currentStep = index;
    this.isDone = false;
    const step = this.steps[index];

    // 更新进度点
    const progressDots = this.steps
      .map(
        (_, i) =>
          `<div class="tutorial-progress-dot ${i === index ? "active" : ""}"></div>`,
      )
      .join("");

    // 更新提示内容
    this.tooltip.innerHTML = `
      <div class="tutorial-progress">${progressDots}</div>
      <h3>${step.title}</h3>
      <p>${step.content}</p>
      <div class="tutorial-buttons">
        ${
          index > 0
            ? `<button class="tutorial-btn tutorial-btn-secondary" data-action="prev">${t("esg.tutorial.prev")}</button>`
            : ""
        }
        ${
          index < this.steps.length - 1
            ? `<button class="tutorial-btn tutorial-btn-primary" data-action="next">${t("esg.tutorial.next")}</button>`
            : `<button class="tutorial-btn tutorial-btn-primary" data-action="finish">${t("esg.tutorial.finish")}</button>`
        }
        <button class="tutorial-btn tutorial-btn-secondary" data-action="skip">${t("esg.tutorial.skip")}</button>
      </div>
    `;

    // 绑定按钮事件
    this.tooltip.querySelectorAll(".tutorial-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const action = e.target.getAttribute("data-action");
        if (action === "next") this.showStep(index + 1);
        else if (action === "prev") this.showStep(index - 1);
        else if (action === "skip") this.skip();
        else if (action === "finish") this.complete();
      });
    });

    // 定位提示框
    if (step.target) {
      const target = this.resolveTarget(step);
      if (target) {
        this.ensureTargetInView(target);
        this.highlightElement(target);
        this.positionTooltip(target, step.position);
      } else {
        this.overlay.querySelector(".tutorial-spotlight")?.remove();
        this.positionTooltipCenter();
      }
    } else {
      this.overlay.querySelector(".tutorial-spotlight")?.remove();
      this.positionTooltipCenter();
    }

    // 显示动画
    requestAnimationFrame(() => {
      this.tooltip.classList.add("active");
      this.overlay.querySelector(".tutorial-backdrop").classList.add("active");
    });
  }

  resolveTarget(step) {
    const target = step.target ? document.querySelector(step.target) : null;
    if (target && this.isVisible(target)) {
      // A whole column of cards is taller than a phone's viewport.
      return step.target === "#factions-container" && innerWidth <= 540
        ? target.firstElementChild
        : target;
    }

    if (step.fallbackTarget) {
      const fallback = document.querySelector(step.fallbackTarget);
      if (fallback && this.isVisible(fallback)) return fallback;
    }

    return null;
  }

  isVisible(element) {
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      rect.width > 0 &&
      rect.height > 0
    );
  }

  ensureTargetInView(target) {
    const rect = target.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top - (innerHeight - rect.height) / 2,
      behavior: "instant",
    });
  }

  highlightElement(element) {
    // 移除旧的高亮
    const oldHighlight = this.overlay.querySelector(".tutorial-spotlight");
    if (oldHighlight) oldHighlight.remove();

    const rect = element.getBoundingClientRect();
    const spotlight = document.createElement("div");
    spotlight.className = "tutorial-spotlight";
    spotlight.style.cssText = `
      top: ${rect.top - 8}px;
      left: ${rect.left - 8}px;
      width: ${rect.width + 16}px;
      height: ${rect.height + 16}px;
    `;
    this.overlay.appendChild(spotlight);
  }

  positionTooltip(target, position) {
    const rect = target.getBoundingClientRect();
    const tooltipRect = {
      width: this.tooltip.offsetWidth,
      height: this.tooltip.offsetHeight,
    };
    const margin = 16;

    const centreX = rect.left + (rect.width - tooltipRect.width) / 2;
    const centreY = rect.top + (rect.height - tooltipRect.height) / 2;
    const candidates = {
      bottom: { top: rect.bottom + margin, left: centreX },
      top: { top: rect.top - tooltipRect.height - margin, left: centreX },
      left: { top: centreY, left: rect.left - tooltipRect.width - margin },
      right: { top: centreY, left: rect.right + margin },
    };
    const clamp = (value, size, limit) =>
      Math.max(margin, Math.min(value, limit - size - margin));

    // Try another side before clamping across the highlighted control.
    const positions = [...new Set([position, "bottom", "top", "right", "left"])]
      .map((side) => candidates[side])
      .filter(Boolean)
      .map(({ top, left }) => ({
        top: clamp(top, tooltipRect.height, innerHeight),
        left: clamp(left, tooltipRect.width, innerWidth),
      }));
    const { top, left } =
      positions.find(
        (candidate) =>
          candidate.top >= rect.bottom + margin ||
          candidate.top + tooltipRect.height <= rect.top - margin ||
          candidate.left >= rect.right + margin ||
          candidate.left + tooltipRect.width <= rect.left - margin,
      ) || positions[0];

    this.tooltip.style.top = `${top}px`;
    this.tooltip.style.left = `${left}px`;
  }

  positionTooltipCenter() {
    this.tooltip.style.top = `${Math.max(16, (innerHeight - this.tooltip.offsetHeight) / 2)}px`;
    this.tooltip.style.left = `${Math.max(16, (innerWidth - this.tooltip.offsetWidth) / 2)}px`;
  }

  skip() {
    storage.setItem("esg-game-tutorial-completed", "true");
    this.destroy();
  }

  complete() {
    storage.setItem("esg-game-tutorial-completed", "true");
    this.isDone = true;
    this.renderDone();
  }

  renderDone() {
    this.overlay.querySelector(".tutorial-spotlight")?.remove();
    this.tooltip.innerHTML = `
      <h3>${t("esg.tutorial.doneTitle")}</h3>
      <p>${t("esg.tutorial.doneBody")}</p>
      <div class="tutorial-buttons">
        <button class="tutorial-btn tutorial-btn-primary" data-action="start">${t("esg.tutorial.start")}</button>
      </div>
    `;

    this.tooltip
      .querySelector('[data-action="start"]')
      .addEventListener("click", () => {
        this.destroy();
      });
    this.positionTooltipCenter();
  }

  // Relabels the open guide without restarting it.
  refreshLocale() {
    if (!this.isActive || !this.tooltip) return;
    if (this.isDone) {
      this.renderDone();
    } else {
      this.showStep(this.currentStep);
    }
  }

  destroy() {
    this.isActive = false;
    window.removeEventListener("resize", this.reposition);
    window.removeEventListener("scroll", this.reposition);
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  }
}
