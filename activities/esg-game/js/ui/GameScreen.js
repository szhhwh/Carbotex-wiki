import { factions } from "../data/factions.js";
import {
  actionLabel,
  eventDescription,
  eventTitle,
  eventTitleById,
  eventTypeLabel,
  factionAbility,
  factionName,
  t,
} from "../i18n.js";
import {
  AudioManager,
  ShakeEffect,
  FlashEffect,
  PulseEffect,
} from "./Effects.js";

const eventTypeColors = {
  positive: {
    bg: "bg-emerald-100",
    text: "text-emerald-600",
    border: "border-emerald-200",
  },
  negative: {
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-200",
  },
  neutral: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
  },
};

export class PastureMeter {
  constructor() {
    this.value = document.getElementById("pasture-health-value");
    this.max = document.getElementById("pasture-health-max");
    this.state = document.getElementById("pasture-health-state");
    this.bar = document.getElementById("pasture-health-bar");
    this.meter = document.getElementById("pasture-health-meter");
  }

  update(health) {
    if (!this.value || !this.bar) return;

    const percentage = Math.min(100, Math.max(0, (health / 15) * 100));

    this.value.textContent = health;
    if (this.max) this.max.hidden = health > 15;
    this.bar.style.width = percentage + "%";
    if (this.meter) {
      this.meter.setAttribute("aria-valuenow", String(health));
      this.meter.setAttribute("aria-valuemax", String(Math.max(15, health)));
    }

    this.bar.classList.remove("safe", "warning", "danger");
    let stateKey;
    if (health >= 10) {
      this.bar.classList.add("safe");
      this.value.dataset.health = "safe";
      stateKey = "safe";
    } else if (health >= 5) {
      this.bar.classList.add("warning");
      this.value.dataset.health = "warning";
      stateKey = "warning";
    } else {
      this.bar.classList.add("danger");
      this.value.dataset.health = "danger";
      stateKey = "danger";
    }

    if (this.state) {
      this.state.dataset.health = stateKey;
      this.state.textContent = t(`esg.pasture.${stateKey}`);
    }
    if (this.meter) {
      this.meter.setAttribute(
        "aria-valuetext",
        `${health} ${t("esg.pasture.title")}`,
      );
    }
  }
}

export class PlayerCard {
  constructor(containerId, playerState, engine, audio) {
    this.container = document.getElementById(containerId);
    this.faction = factions.find((f) => f.id === playerState.id);
    this.id = playerState.id;
    this.engine = engine;
    this.audio = audio;
    this.element = document.createElement("div");
    this.element.id = `player-card-${this.id}`;
    this.element.className = `faction-card border-l-4 ${this.faction.borderClass}`;
    this.render(playerState);
    this.container.appendChild(this.element);
  }

  render(state) {
    const f = this.faction;
    const currentActions = this.engine.stateManager.state.currentRound.actions;
    const currentAction = currentActions[this.id];
    const hasChosen = !!currentAction;
    const banExpandActive =
      this.engine.stateManager.state.global.banExpandRounds > 0;

    this.element.innerHTML = `
      <div class="faction-heading">
        <h3 class="text-lg font-heading ${f.colorClass} font-bold">${factionName(f.id)}</h3>
        <div class="text-right">
          <span class="text-xs text-gray-400 block">${t("esg.faction.sustainability")}</span>
          <span class="font-bold text-emerald-600 text-lg player-sp">${state.sp}</span>
        </div>
      </div>
      <span class="faction-ability">${factionAbility(f)}</span>
      
      <div class="faction-flock flex items-center justify-between">
        <div class="text-sm text-gray-500">${t("esg.faction.sheep")}</div>
        <div class="text-2xl font-heading text-gray-800 font-bold flex items-center gap-2">
          <span class="player-sheep">${state.sheep}</span> <span class="text-gray-400 text-sm">🐑</span>
        </div>
      </div>
      
      <div class="grid grid-cols-3 gap-2">
        <button class="action-btn btn-action btn-expand ${currentAction === "expand" ? "active" : ""}"
                aria-pressed="${currentAction === "expand"}"
                data-action="expand" ${banExpandActive ? "disabled" : ""}>${t("esg.action.expand")}</button>
        <button class="action-btn btn-action btn-maintain ${currentAction === "maintain" ? "active" : ""}" 
                aria-pressed="${currentAction === "maintain"}"
                data-action="maintain">${t("esg.action.maintain")}</button>
        <button class="action-btn btn-action btn-reduce ${currentAction === "reduce" ? "active" : ""}" 
                aria-pressed="${currentAction === "reduce"}"
                data-action="reduce">${t("esg.action.reduce")}</button>
      </div>
      ${
        hasChosen
          ? `<div class="mt-2 text-xs text-emerald-600 text-center font-bold">${t("esg.faction.chosen")}</div>`
          : banExpandActive
            ? `<div class="mt-2 text-xs text-amber-600 text-center font-medium">${t("esg.faction.banExpand")}</div>`
            : `<div class="mt-2 text-xs text-gray-400 text-center">${t("esg.faction.chooseAction")}</div>`
      }
    `;

    this.element.querySelectorAll(".action-btn").forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const action = e.target.getAttribute("data-action");
        const previous =
          this.engine.stateManager.state.currentRound.actions[this.id];

        // Re-selecting the current choice is a no-op; a different one switches
        // it, because the round is only committed by "End round".
        if (previous === action) {
          return;
        }

        const accepted = this.engine.submitAction(this.id, action);
        if (!accepted) {
          alert(t("esg.faction.expandBanned"));
          return;
        }

        this.audio.playAction(action);
        this.audio.playClick();

        PulseEffect.apply(this.element, 1.02);
      };
    });
  }

  update(state) {
    const sheepEl = this.element.querySelector(".player-sheep");
    const spEl = this.element.querySelector(".player-sp");

    if (sheepEl) {
      const oldSheep = parseInt(sheepEl.textContent);
      if (oldSheep !== state.sheep) {
        sheepEl.textContent = state.sheep;
        sheepEl.style.color = state.sheep > oldSheep ? "#10B981" : "#EF4444";
        setTimeout(() => {
          sheepEl.style.color = "#1F2937";
        }, 500);
      }
    }

    if (spEl) {
      const oldSp = parseInt(spEl.textContent);
      if (oldSp !== state.sp) {
        spEl.textContent = state.sp;
        spEl.style.transform = "scale(1.2)";
        setTimeout(() => {
          spEl.style.transform = "scale(1)";
        }, 300);
      }
    }

    this.render(state);
  }
}

export class EventDisplay {
  constructor() {
    this.display = document.getElementById("event-display");
    this.placeholder = document.getElementById("event-placeholder");
    this.content = document.getElementById("event-content");
    this.typeBadge = document.getElementById("event-type-badge");
    this.title = document.getElementById("event-title");
    this.description = document.getElementById("event-description");
    this.effects = document.getElementById("event-effects");
    this.currentEventId = null;
    this.event = null;
  }

  show(event) {
    if (!event || event.id === this.currentEventId) return;

    this.currentEventId = event.id;
    this.event = event;
    this.render();

    ShakeEffect.apply(this.display, 3, 0.3);
    FlashEffect.apply(
      this.display,
      event.type === "positive"
        ? "rgba(16, 185, 129, 0.3)"
        : "rgba(239, 68, 68, 0.3)",
    );
  }

  render() {
    const event = this.event;
    if (!event) return;

    const colors = eventTypeColors[event.type] || eventTypeColors.neutral;

    this.typeBadge.textContent = eventTypeLabel(event.type);
    this.typeBadge.className = `text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${colors.bg} ${colors.text}`;

    this.title.textContent = eventTitle(event);
    this.description.textContent = eventDescription(event);

    this.display.className = `event-display event-${event.type}`;

    let effectsHtml = "";
    const renderEffect = (delta, key) => {
      if (!delta) return "";
      const color = delta > 0 ? "text-emerald-600" : "text-red-600";
      const sign = delta > 0 ? "+" : "";
      return `<span class="${color} font-bold">${t(key, { value: `${sign}${delta}` })}</span>`;
    };
    effectsHtml += renderEffect(event.effects.healthDelta, "esg.effect.health");
    effectsHtml += renderEffect(event.effects.sheepDelta, "esg.effect.sheep");
    effectsHtml += renderEffect(event.effects.spDelta, "esg.effect.sp");
    this.effects.innerHTML = effectsHtml;

    this.placeholder.classList.add("hidden");
    this.content.classList.remove("hidden");
  }

  // Re-renders the current event so a locale switch keeps the round state.
  refresh() {
    this.render();
  }

  reset() {
    this.currentEventId = null;
    this.event = null;
    this.placeholder.classList.remove("hidden");
    this.content.classList.add("hidden");
    this.display.className = "event-display";
  }
}

export class TradeModal {
  constructor(engine, audio) {
    this.engine = engine;
    this.audio = audio;
    this.modal = document.getElementById("trade-modal");
    this.select = document.getElementById("trade-target");
    this.cancelBtn = document.getElementById("trade-cancel");
    this.confirmBtn = document.getElementById("trade-confirm");

    if (this.cancelBtn) {
      this.cancelBtn.onclick = () => this.hide();
    }
    if (this.confirmBtn) {
      this.confirmBtn.onclick = () => this.confirm();
    }
  }

  show(fromPlayerId) {
    this.fromPlayerId = fromPlayerId;
    if (this.select) {
      this.select.innerHTML = `<option value="">${t("esg.trade.selectPlaceholder")}</option>`;

      this.engine.stateManager.state.players.forEach((p) => {
        if (p.id !== fromPlayerId) {
          const option = document.createElement("option");
          option.value = p.id;
          option.textContent = factionName(p.id);
          this.select.appendChild(option);
        }
      });
    }

    if (this.modal) {
      this.modal.classList.add("active");
    }
  }

  hide() {
    if (this.modal) {
      this.modal.classList.remove("active");
    }
  }

  confirm() {
    if (!this.select) return;
    const targetId = this.select.value;
    if (!targetId) {
      alert(t("esg.trade.noTarget"));
      return;
    }

    const result = this.engine.submitTrade(this.fromPlayerId, targetId, 1);
    if (!result || !result.success) {
      const reason = result?.reason || "unknown";
      alert(t("esg.trade.failedPrefix") + t(`esg.trade.error.${reason}`));
      return;
    }

    if (this.audio) this.audio.playTrade();
    this.showTradeSuccessMessage(result.toPlayer);
    this.hide();
  }

  // Floating confirmation kept from the supplied source; the player cards
  // themselves refresh through the state subscription.
  showTradeSuccessMessage(toPlayer) {
    const toast = document.createElement("div");
    toast.className = "trade-toast";
    toast.setAttribute("role", "status");
    toast.textContent = t("esg.trade.success", {
      faction: factionName(toPlayer.id),
    });
    document.body.appendChild(toast);

    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.5s";
      window.setTimeout(() => toast.remove(), 500);
    }, 2000);
  }
}

export class CollapseVoteModal {
  constructor(engine) {
    this.engine = engine;
    this.modal = document.getElementById("collapse-modal");
    this.votes = {};
    this.votingStatus = document.getElementById("voting-status");

    document.querySelectorAll(".vote-option").forEach((option) => {
      option.onclick = () => {
        const vote = option.getAttribute("data-vote");
        this.handleVote(vote);
      };
    });
  }

  show() {
    this.votes = {};
    this.updateStatusUI();

    document.querySelectorAll(".vote-option").forEach((opt) => {
      opt.classList.remove("selected");
    });

    if (this.modal) {
      this.modal.classList.add("active");
    }
  }

  handleVote(choice) {
    const players = this.engine.stateManager.state.players;
    const unvoted = players.find((p) => !this.votes[p.id]);

    if (unvoted) {
      this.submitVote(unvoted.id, choice);

      document.querySelectorAll(".vote-option").forEach((opt) => {
        opt.classList.remove("selected");
      });
      const selected = document.querySelector(`[data-vote="${choice}"]`);
      if (selected) selected.classList.add("selected");
    }
  }

  submitVote(playerId, choice) {
    this.votes[playerId] = choice;
    this.engine.submitCollapseVote(playerId, choice);
    this.updateStatusUI();

    const players = this.engine.stateManager.state.players;
    if (Object.keys(this.votes).length >= players.length) {
      setTimeout(() => this.onAllVotesSubmitted(), 1500);
    }
  }

  updateStatusUI() {
    if (!this.votingStatus) return;
    const players = this.engine.stateManager.state.players;

    this.votingStatus.innerHTML = players
      .map((p) => {
        const hasVoted = !!this.votes[p.id];
        const voteChoice = this.votes[p.id];
        let styleClass = "bg-gray-100 border-gray-300 text-gray-400";
        if (hasVoted) {
          styleClass =
            voteChoice === "exploit"
              ? "bg-red-100 border-red-400 text-red-600"
              : "bg-emerald-100 border-emerald-400 text-emerald-600";
        }
        return `<span class="px-3 py-1 rounded-full border-2 text-xs font-bold transition-colors ${styleClass}">${factionName(p.id)}</span>`;
      })
      .join("");
  }

  onAllVotesSubmitted() {
    if (this.modal) this.modal.classList.remove("active");
    this.engine.endPhase();
  }
}

export class GameLog {
  constructor(containerId, engine) {
    this.container = document.getElementById(containerId);
    this.engine = engine;
    this.rounds = [];

    this.engine.stateManager.subscribe("history.rounds", (rounds) => {
      this.rounds = rounds || [];
      this.renderLog();
    });

    this.renderLog();
  }

  // Rebuilds the whole log so a locale switch updates every past round.
  renderLog() {
    if (!this.container) return;
    const rounds = this.rounds || [];

    this.container.innerHTML = "";
    this.container.classList.toggle("is-empty", rounds.length === 0);

    if (rounds.length === 0) {
      const empty = document.createElement("div");
      empty.className = "log-empty";
      empty.innerHTML = `
        <svg class="log-empty-icon" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
             stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M7 3.5h7.5L18.5 7.5v13H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" />
          <path d="M14.5 3.5v4h4" />
          <path d="M8.5 11h6M8.5 14.5h6M8.5 18h3.5" />
        </svg>
        <p class="log-empty-text"></p>
      `;
      empty.querySelector(".log-empty-text").textContent = t("esg.log.empty");
      this.container.appendChild(empty);
      return;
    }

    [...rounds].reverse().forEach((round) => {
      const entry = document.createElement("div");
      entry.className = "log-entry";

      let html = `<div class="font-bold text-emerald-600 mb-1">${t("esg.log.roundDone", { round: round.round })}</div>`;

      if (round.event) {
        html += `<div class="text-amber-600 text-xs mb-1">${t("esg.log.event", { event: eventTitleById(round.event) })}</div>`;
      }

      if (round.trades && round.trades.length > 0) {
        round.trades.forEach((trade) => {
          html += `<div class="text-indigo-600 text-xs mb-1">${t("esg.log.trade", { from: factionName(trade.from), to: factionName(trade.to) })}</div>`;
        });
      }

      html += `<div class="log-actions">`;
      Object.entries(round.actions).forEach(([id, action]) => {
        const color =
          action === "expand"
            ? "text-blue-600"
            : action === "maintain"
              ? "text-amber-600"
              : "text-emerald-600";
        html += `<div class="log-action"><span class="log-faction">${factionName(id)}</span><span class="${color}">${actionLabel(action)}</span></div>`;
      });
      html += `</div>`;

      entry.innerHTML = html;
      this.container.appendChild(entry);
    });
  }
}

export class GameScreen {
  constructor(engine) {
    this.engine = engine;
    this.players = [];
    this.pastureMeter = new PastureMeter();
    this.eventDisplay = new EventDisplay();
    this.collapseModal = new CollapseVoteModal(this.engine);
    this.audio = new AudioManager();
    this.tradeModal = new TradeModal(this.engine, this.audio);
    this.gameLog = new GameLog("game-log-container", this.engine);

    this.pendingSummary = null;
    this.isResolvingRound = false;
    this.endRoundReady = false;

    this.init();
  }

  init() {
    const state = this.engine.stateManager.state;
    const container = document.getElementById("factions-grid");
    if (container) container.innerHTML = "";

    state.players.forEach((p) => {
      this.players.push(
        new PlayerCard("factions-grid", p, this.engine, this.audio),
      );
    });

    const tradeBtn = document.getElementById("trade-btn");
    if (tradeBtn) {
      tradeBtn.onclick = () => {
        const ind = this.engine.stateManager.state.players.find(
          (p) => p.id === "industrial",
        );
        if (ind && !ind.hasTraded) {
          this.tradeModal.show("industrial");
        } else {
          alert(t("esg.trade.done"));
        }
      };
    }

    const endRoundBtn = document.getElementById("end-round-btn");
    if (endRoundBtn) {
      endRoundBtn.onclick = () => {
        this.resolveRoundFlow();
      };
    }

    const mobileEndRoundBtn = document.getElementById("mobile-end-round-btn");
    if (mobileEndRoundBtn) {
      mobileEndRoundBtn.onclick = () => {
        this.resolveRoundFlow();
      };
    }

    const restartBtn = document.getElementById("restart-btn");
    if (restartBtn) {
      restartBtn.onclick = () => location.reload();
    }

    const summaryContinueBtn = document.getElementById("summary-continue-btn");
    if (summaryContinueBtn) {
      summaryContinueBtn.onclick = () => {
        const modal = document.getElementById("round-summary-modal");
        if (modal) modal.classList.remove("active");
      };
    }

    this.setupSubscriptions();

    this.pastureMeter.update(state.global.pastureHealth);
    this.updateTradeButton();
    this.updateWinStatus();
    this.updateMobileContext();
    this.updateEndRoundButton();
    if (state.currentRound.event) {
      this.eventDisplay.show(state.currentRound.event);
    }

    console.log("GameScreen initialized");
  }

  setupSubscriptions() {
    this.engine.stateManager.subscribe("global.pastureHealth", (val) => {
      this.pastureMeter.update(val);
      this.updateMobileContext();
    });

    this.engine.stateManager.subscribe("currentRound.event", (event) => {
      if (event) {
        this.eventDisplay.show(event);
        this.audio.playEvent(event.type);
        this.updateMobileContext();
      }
    });

    this.engine.stateManager.subscribe("history.rounds", () => {
      const eventDisplay = document.getElementById("event-display");
      if (eventDisplay) {
        eventDisplay.classList.add("ring-2");
        window.setTimeout(() => {
          eventDisplay.classList.remove("ring-2");
        }, 500);
      }
    });

    this.engine.stateManager.subscribe("currentRound.actions", () => {
      this.updatePlayers();
      this.updateTradeButton();
      this.updateWinStatus();
      this.updateRoundStatus();
      // The round is committed by the "End round" button only, so the control
      // has to follow every selection change.
      this.updateEndRoundButton();
    });

    this.engine.stateManager.subscribe("round", (val) => {
      const roundDisplay = document.getElementById("round-display");
      if (roundDisplay) roundDisplay.textContent = val;
      this.updatePlayers();
      this.updateWinStatus();
      this.audio.playRoundEnd();
      this.eventDisplay.reset();
      this.updateRoundStatus();
      this.updateEndRoundButton();
      this.updateMobileContext();

      const header = document.querySelector("header .game-card");
      if (header) FlashEffect.apply(header, "rgba(16, 185, 129, 0.2)");
    });

    this.engine.stateManager.subscribe("players", () => {
      this.updatePlayers();
      this.updateWinStatus();
      // A trade changes sheep right away, so the control button has to follow
      // without waiting for the next action selection.
      this.updateTradeButton();
    });

    this.engine.stateManager.subscribe("phase", (val) => {
      // Collapse votes and endings both take the round out of the player's
      // hands, so the commit button has to reflect the phase it is in.
      this.updateRoundStatus();
      this.updateEndRoundButton();
      if (val === "collapse_vote") {
        this.audio.playCollapseWarning();
        const pastureMeter = document.getElementById("pasture-meter");
        if (pastureMeter) {
          ShakeEffect.apply(pastureMeter, 10, 0.5);
          FlashEffect.apply(pastureMeter, "rgba(239, 68, 68, 0.4)");
        }
        this.showCollapseVote();
      } else if (val === "ended") {
        this.audio.playGameEnd();
        this.showEndScreen();
      }
    });

    this.updateRoundStatus();
    this.updateEndRoundButton();
  }

  updateRoundStatus() {
    const status = document.getElementById("round-status");
    if (!status) return;

    const state = this.engine.stateManager.state;
    const selected = Object.keys(state.currentRound.actions).length;

    if (this.isResolvingRound) {
      status.textContent = t("esg.roundStatus.resolving");
      status.dataset.state = "resolving";
    } else if (state.phase === "collapse_vote") {
      status.textContent = t("esg.controls.endRoundCollapse");
      status.dataset.state = "warning";
    } else if (state.phase === "ended") {
      status.textContent = t("esg.roundStatus.ended");
      status.dataset.state = "ended";
    } else if (state.phase !== "action") {
      status.textContent = t("esg.controls.endRoundUnavailable");
      status.dataset.state = "warning";
    } else if (selected === 0) {
      status.textContent = t("esg.roundStatus.initial");
      status.dataset.state = "initial";
    } else if (selected < 5) {
      status.textContent = t("esg.roundStatus.progress", { selected });
      status.dataset.state = "progress";
    } else {
      status.textContent = t("esg.roundStatus.ready");
      status.dataset.state = "ready";
    }

    const stepMeter = document.getElementById("round-step-meter");
    stepMeter?.querySelectorAll("span").forEach((step, index) => {
      step.classList.toggle("is-complete", index < selected);
    });

    this.updateMobileContext();
  }

  // The round is committed here and nowhere else, so the control mirrors the
  // selection instead of offering clicks it cannot serve.
  updateEndRoundButton() {
    const btn = document.getElementById("end-round-btn");
    if (!btn) return;

    const state = this.engine.stateManager.state;
    const missing = state.players
      .filter((p) => !state.currentRound.actions[p.id])
      .map((p) => factionName(p.id));
    const ready =
      state.phase === "action" &&
      !this.isResolvingRound &&
      missing.length === 0;

    let hint;
    if (state.phase === "collapse_vote") {
      hint = t("esg.controls.endRoundCollapse");
    } else if (state.phase !== "action") {
      hint = t("esg.controls.endRoundUnavailable");
    } else if (this.isResolvingRound) {
      hint = t("esg.roundStatus.resolving");
    } else if (missing.length > 0) {
      hint = t("esg.controls.endRoundWaiting", {
        count: missing.length,
      });
    } else {
      hint = t("esg.controls.endRoundReady");
    }

    btn.disabled = !ready;
    btn.setAttribute("aria-disabled", String(!ready));
    btn.setAttribute("aria-busy", String(!!this.isResolvingRound));
    btn.title = ready ? t("esg.controls.endRoundReadyHint") : hint;
    btn.classList.toggle("btn-primary", ready);
    btn.classList.toggle("btn-muted", !ready);

    // The fixed phone bar mirrors the same control, so it stays in step.
    const mobileBtn = document.getElementById("mobile-end-round-btn");
    if (mobileBtn) {
      mobileBtn.disabled = !ready;
      mobileBtn.setAttribute("aria-disabled", String(!ready));
      mobileBtn.title = btn.title;
      mobileBtn.classList.toggle("btn-primary", ready);
      mobileBtn.classList.toggle("btn-muted", !ready);
    }

    // Only the final missing faction is worth a pulse; phase transitions also
    // clear the selection and must not fake a "ready" flash.
    if (ready && !this.endRoundReady && this.endRoundPhase === "action") {
      PulseEffect.apply(btn, 1.04);
    }
    this.endRoundReady = ready;
    this.endRoundPhase = state.phase;
  }

  calculateScore(player) {
    const state = this.engine.stateManager.state;
    if (!state.isCollapsed) return Math.floor(player.sheep + player.sp * 2);
    if (state.collapseChoice === "exploit")
      return Math.floor(player.sheep * 0.5);
    return Math.floor(player.sheep + player.sp * 2);
  }

  updateWinStatus() {
    const leaderName = document.getElementById("leader-name");
    const leaderScore = document.getElementById("leader-score");
    const total = document.getElementById("round-total");
    const globalSp = document.getElementById("global-sp");
    const state = this.engine.stateManager.state;

    // Round count lives in one place: "Round 2 / 4" in the round console.
    if (total) {
      total.textContent = String(state.isCollapsed ? 6 : 4);
    }

    if (globalSp) {
      globalSp.textContent = String(
        state.players.reduce((sum, player) => sum + player.sp, 0),
      );
    }

    if (!leaderName || !leaderScore) return;

    const players = state.players || [];
    if (players.length === 0) return;

    let leader = players[0];
    let best = this.calculateScore(leader);
    for (let i = 1; i < players.length; i++) {
      const s = this.calculateScore(players[i]);
      if (s > best) {
        best = s;
        leader = players[i];
      }
    }

    leaderName.textContent = factionName(leader.id) || leader.name;
    leaderScore.textContent = String(best);
  }

  // The fixed phone bar uses the same state as the round console, so the two
  // summaries cannot drift apart.
  updateMobileContext() {
    const state = this.engine.stateManager.state;
    const summary = document.getElementById("mobile-summary");
    if (!summary) return;

    const health = state.global.pastureHealth;
    summary.textContent = t("esg.mobile.summary", {
      round: state.round,
      health: health > 15 ? String(health) : `${health}/15`,
      selected: Object.keys(state.currentRound.actions).length,
    });
  }

  resolveRoundFlow() {
    if (this.isResolvingRound) return;

    const currentActions = this.engine.stateManager.state.currentRound.actions;
    if (Object.keys(currentActions).length < 5) {
      const unselected = this.engine.stateManager.state.players
        .filter((p) => !currentActions[p.id])
        .map((p) => factionName(p.id))
        .join(", ");
      alert(t("esg.alert.chooseFor", { factions: unselected }));
      this.updateEndRoundButton();
      return;
    }

    this.isResolvingRound = true;
    this.updateRoundStatus();
    this.updateEndRoundButton();

    const before = {
      round: this.engine.stateManager.state.round,
      health: this.engine.stateManager.state.global.pastureHealth,
      players: this.engine.stateManager.state.players.map((p) => ({
        id: p.id,
        sheep: p.sheep,
        sp: p.sp,
      })),
    };

    const success = this.engine.endPhase();
    if (!success) {
      this.isResolvingRound = false;
      this.updateRoundStatus();
      this.updateEndRoundButton();
      alert(t("esg.alert.roundFailed"));
      return;
    }

    const after = {
      round: this.engine.stateManager.state.round,
      health: this.engine.stateManager.state.global.pastureHealth,
      players: this.engine.stateManager.state.players.map((p) => ({
        id: p.id,
        sheep: p.sheep,
        sp: p.sp,
      })),
    };

    if (this.engine.stateManager.state.phase === "action") {
      this.showRoundSummary(before, after);
    }
    this.isResolvingRound = false;
    this.updateRoundStatus();
    this.updateEndRoundButton();
  }

  showRoundSummary(before, after) {
    this.lastSummary = { before, after };
    this.renderRoundSummary();
    document.getElementById("round-summary-modal")?.classList.add("active");
  }

  renderRoundSummary() {
    const { before, after } = this.lastSummary || {};
    if (!before || !after) return;

    const modal = document.getElementById("round-summary-modal");
    const title = document.getElementById("round-summary-title");
    const health = document.getElementById("summary-health");
    const sp = document.getElementById("summary-sp");
    const players = document.getElementById("summary-players");
    if (!modal || !title || !health || !sp || !players) return;

    const healthDiff = after.health - before.health;
    const totalSpBefore = before.players.reduce((s, p) => s + p.sp, 0);
    const totalSpAfter = after.players.reduce((s, p) => s + p.sp, 0);
    const spDiff = totalSpAfter - totalSpBefore;

    title.textContent = t("esg.summary.rounds", {
      before: before.round,
      after: after.round,
    });
    health.textContent = `${before.health} → ${after.health} (${healthDiff >= 0 ? "+" : ""}${healthDiff})`;
    sp.textContent = `${totalSpBefore} → ${totalSpAfter} (${spDiff >= 0 ? "+" : ""}${spDiff})`;

    players.innerHTML = after.players
      .map((a) => {
        const b = before.players.find((x) => x.id === a.id);
        const sheepDiff = a.sheep - b.sheep;
        const spd = a.sp - b.sp;
        return `
        <div class="game-card p-3 flex items-center justify-between">
          <div class="font-medium text-gray-700">${factionName(a.id)}</div>
          <div class="text-sm text-gray-600">
            ${t("esg.summary.playerLine", {
              beforeSheep: b.sheep,
              sheep: a.sheep,
              sheepDiff: `${sheepDiff >= 0 ? "+" : ""}${sheepDiff}`,
              beforeSp: b.sp,
              sp: a.sp,
              spDiff: `${spd >= 0 ? "+" : ""}${spd}`,
            })}
          </div>
        </div>
      `;
      })
      .join("");
  }

  updatePlayers() {
    const state = this.engine.stateManager.state;
    this.players.forEach((pCard) => {
      const pState = state.players.find((p) => p.id === pCard.id);
      if (pState) pCard.update(pState);
    });
  }

  updateTradeButton() {
    const tradeBtn = document.getElementById("trade-btn");
    if (!tradeBtn) return;

    const ind = this.engine.stateManager.state.players.find(
      (p) => p.id === "industrial",
    );
    const hasActed =
      !!this.engine.stateManager.state.currentRound.actions["industrial"];

    // The supplied source swaps the whole label set per state instead of
    // keeping one label and changing only its colour.
    tradeBtn.className = "btn w-full";
    tradeBtn.style.display = "flex";
    if (!ind) {
      tradeBtn.disabled = true;
      tradeBtn.title = t("esg.tradeButton.missingHint");
      tradeBtn.textContent = t("esg.tradeButton.missing");
      tradeBtn.classList.add("btn-muted");
      return;
    }

    if (ind.sheep <= 0) {
      tradeBtn.disabled = true;
      tradeBtn.title = t("esg.tradeButton.insufficientHint");
      tradeBtn.textContent = t("esg.tradeButton.insufficient");
      tradeBtn.classList.add("btn-muted");
      return;
    }

    if (ind.hasTraded) {
      tradeBtn.disabled = true;
      tradeBtn.title = t("esg.tradeButton.usedHint");
      tradeBtn.textContent = t("esg.tradeButton.used");
      tradeBtn.classList.add("btn-muted");
      return;
    }

    if (hasActed) {
      tradeBtn.disabled = true;
      tradeBtn.title = t("esg.tradeButton.actFirstHint");
      tradeBtn.textContent = t("esg.tradeButton.actFirst");
      tradeBtn.classList.add("btn-muted");
      return;
    }

    tradeBtn.disabled = false;
    tradeBtn.title = t("esg.tradeButton.readyHint");
    tradeBtn.textContent = t("esg.tradeButton.ready");
    tradeBtn.classList.add("btn-primary");
  }

  showCollapseVote() {
    this.collapseModal.show();
  }

  showEndScreen() {
    this.renderEndScreen();
    const modal = document.getElementById("end-game-modal");
    if (modal) modal.classList.add("active");
  }

  renderEndScreen() {
    const state = this.engine.stateManager.state;

    const finalHealth = document.getElementById("final-health");
    const finalSp = document.getElementById("final-sp");
    const scoresDiv = document.getElementById("final-scores");

    if (finalHealth) finalHealth.textContent = state.global.pastureHealth;
    if (finalSp)
      finalSp.textContent = state.players.reduce((sum, p) => sum + p.sp, 0);

    if (scoresDiv) {
      let scores = state.players.map((p) => {
        let score;
        if (!state.isCollapsed) {
          score = p.sheep + p.sp * 2;
        } else if (state.collapseChoice === "exploit") {
          score = p.sheep * 0.5;
        } else {
          score = p.sheep + p.sp * 2;
        }
        return { ...p, score: Math.floor(score) };
      });

      scores.sort((a, b) => b.score - a.score);

      scoresDiv.innerHTML = scores
        .map(
          (p, i) => `
        <div class="game-card p-4 flex justify-between items-center ${i === 0 ? "border-2 border-emerald-400" : ""}">
          <div class="flex items-center gap-3">
            <span class="text-2xl">${i === 0 ? "🏆" : i === 1 ? "🥈" : i === 2 ? "🥉" : "•"}</span>
            <span class="font-bold text-gray-800">${factionName(p.id)}</span>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-500">${t("esg.end.sheepSp", { sheep: p.sheep, sp: p.sp })}</div>
            <div class="text-xl font-bold ${i === 0 ? "text-emerald-600" : "text-gray-600"}">${t("esg.end.score", { score: p.score })}</div>
          </div>
        </div>
      `,
        )
        .join("");
    }
  }

  // Re-applies every localized text without touching the engine state.
  refreshLocale() {
    this.pastureMeter.update(
      this.engine.stateManager.state.global.pastureHealth,
    );
    this.updatePlayers();
    this.updateWinStatus();
    this.updateTradeButton();
    this.updateRoundStatus();
    this.updateEndRoundButton();
    this.updateMobileContext();
    this.eventDisplay.refresh();
    this.gameLog.renderLog();
    this.collapseModal.updateStatusUI();
    this.renderRoundSummary();
    if (this.engine.stateManager.state.phase === "ended") {
      this.renderEndScreen();
    }
  }
}
