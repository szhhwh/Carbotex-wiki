import { StateManager } from "./StateManager.js";
import { EventEngine } from "../logic/EventEngine.js";
import { GameRules } from "../logic/GameRules.js";

export class GameEngine {
  constructor() {
    this.stateManager = new StateManager();
    this.eventEngine = new EventEngine();
    this.rules = GameRules;
  }

  startGame() {
    this.stateManager.state.phase = "action";
    this.drawNewEvent();
  }

  drawNewEvent() {
    const state = this.stateManager.state;
    const newEvent = this.eventEngine.drawEvent(
      state.round,
      state.global.pastureHealth,
    );
    state.currentRound.event = newEvent;
    state.history.events.push(newEvent);
  }

  submitAction(playerId, action) {
    const state = this.stateManager.state;
    if (
      state.phase !== "action" ||
      !state.players.some((player) => player.id === playerId) ||
      !["expand", "maintain", "reduce"].includes(action)
    ) {
      return false;
    }
    if (state.global.banExpandRounds > 0 && action === "expand") {
      return false;
    }
    // A faction keeps its choice editable until the round is committed, so an
    // existing entry is replaced instead of being rejected.
    this.rules.applyAction(state, playerId, action);
    return true;
  }

  submitTrade(fromId, toId, amount) {
    const state = this.stateManager.state;
    const fromPlayer = state.players.find((p) => p.id === fromId);

    // The supplied source returns a reason per rejection so the trade modal
    // can report why the transfer was refused.
    if (state.phase !== "action") {
      return { success: false, reason: "phase" };
    }
    if (!fromPlayer) {
      return { success: false, reason: "player_not_found" };
    }
    if (fromId !== "industrial") {
      return { success: false, reason: "not_industrial" };
    }
    if (fromPlayer.hasTraded) {
      return { success: false, reason: "already_traded" };
    }
    if (state.currentRound.actions[fromId]) {
      return { success: false, reason: "already_acted" };
    }

    return this.rules.applyTrade(state, fromId, toId, amount);
  }

  submitCollapseVote(playerId, choice) {
    const state = this.stateManager.state;
    if (
      state.phase !== "collapse_vote" ||
      !state.players.some((player) => player.id === playerId) ||
      !["repair", "exploit"].includes(choice) ||
      state.currentRound.votes[playerId]
    ) {
      return false;
    }
    this.rules.applyCollapseVote(state, playerId, choice);
    return true;
  }

  endPhase() {
    const state = this.stateManager.state;

    if (state.phase === "action") {
      if (
        Object.keys(state.currentRound.actions).length < state.players.length
      ) {
        return false;
      }
      this.rules.resolveRound(state);
      if (state.phase === "action") {
        this.drawNewEvent();
      }
      return true;
    } else if (state.phase === "collapse_vote") {
      if (Object.keys(state.currentRound.votes).length < state.players.length) {
        return false;
      }
      this.rules.resolveCollapse(state);
      if (state.phase === "action") {
        this.drawNewEvent();
      }
      return true;
    }
    return false;
  }
}
