import { t } from "../i18n.js";

export class GameHints {
  constructor(engine) {
    this.engine = engine;
    this.hints = [
      {
        condition: () => engine.stateManager.state.phase === "collapse_vote",
        message: () => t("esg.hint.collapse"),
        tone: "danger",
      },
      {
        condition: () =>
          engine.stateManager.state.global.pastureHealth < 8 &&
          engine.stateManager.state.global.pastureHealth > 0 &&
          engine.stateManager.state.phase === "action",
        message: () => t("esg.hint.lowHealth"),
        tone: "warning",
      },
      {
        condition: () => {
          const state = engine.stateManager.state;
          const totalSheep = state.players.reduce((sum, p) => sum + p.sheep, 0);
          return (
            state.phase === "action" &&
            state.global.pastureHealth > 0 &&
            totalSheep >= state.global.pastureHealth * 1.5
          );
        },
        message: () => t("esg.hint.overload"),
        tone: "warning",
      },
    ];
    this.lastSignature = "";
    this.container = document.getElementById("round-advisory");
    this.init();
  }

  init() {
    if (!this.container) return;

    this.engine.stateManager.subscribe("global.pastureHealth", () =>
      this.render(),
    );
    this.engine.stateManager.subscribe("players", () => this.render());
    this.engine.stateManager.subscribe("phase", () => this.render());
    this.render();
  }

  render() {
    if (!this.container) return;

    const active = this.hints
      .filter((hint) => hint.condition())
      .map((hint) => ({
        message: hint.message(),
        tone: hint.tone,
      }));
    const signature = active
      .map((hint) => `${hint.tone}:${hint.message}`)
      .join("|");

    if (signature === this.lastSignature) return;
    this.lastSignature = signature;
    this.container.innerHTML = active
      .map(
        (hint) =>
          `<span class="round-alert" data-tone="${hint.tone}">${hint.message}</span>`,
      )
      .join("");
  }

  // Re-evaluates hints so the visible one switches language immediately.
  refreshLocale() {
    this.lastSignature = "";
    this.render();
  }
}
