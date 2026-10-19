export const GameRules = {
  applyAction: (state, playerId, action) => {
    state.currentRound.actions[playerId] = action;
  },

  applyTrade: (state, fromId, toId, amount) => {
    const fromPlayer = state.players.find((p) => p.id === fromId);
    const toPlayer = state.players.find((p) => p.id === toId);

    if (
      !fromPlayer ||
      !toPlayer ||
      fromId === toId ||
      !Number.isInteger(amount) ||
      amount <= 0
    ) {
      return { success: false, reason: "invalid" };
    }

    if (fromPlayer.sheep < amount) {
      return { success: false, reason: "insufficient_sheep" };
    }

    // The supplied source applies the transfer right away instead of deferring
    // it to the end of the round.
    fromPlayer.sheep -= amount;
    toPlayer.sheep += amount;
    state.currentRound.trades.push({ from: fromId, to: toId, amount });
    if (fromId === "industrial") fromPlayer.hasTraded = true;

    state.global.totalSheep = state.players.reduce(
      (sum, p) => sum + p.sheep,
      0,
    );

    return { success: true, fromPlayer, toPlayer, amount };
  },

  applyCollapseVote: (state, playerId, choice) => {
    state.currentRound.votes[playerId] = choice;
  },

  resolveRound: (state) => {
    if (state.global.banExpandRounds > 0) {
      state.global.banExpandRounds -= 1;
    }
    let healthDelta = 0;

    Object.entries(state.currentRound.actions).forEach(([playerId, action]) => {
      const player = state.players.find((p) => p.id === playerId);

      if (action === "expand") {
        player.sheep += 1;
        if (playerId === "development" && !player.firstExpandUsed) {
          healthDelta -= 1;
          player.firstExpandUsed = true;
        } else {
          healthDelta -= 2;
        }
      } else if (action === "maintain") {
        healthDelta -= 1;
      } else if (action === "reduce") {
        player.sheep = Math.max(0, player.sheep - 1);
        healthDelta += 2;
        player.sp += 1;

        if (playerId === "eco_pioneer") {
          healthDelta += 1;
        }

        if (
          state.currentRound.event?.effects?.condition === "REPAIR_BONUS_HEALTH"
        ) {
          healthDelta += state.currentRound.event.effects.conditionValue;
        }
      }
    });

    // Trades are already applied in applyTrade; the round only keeps them in
    // the log.

    if (state.currentRound.event) {
      const effect = state.currentRound.event.effects;
      healthDelta += effect.healthDelta || 0;

      if (effect.globalEffect === "BAN_EXPAND") {
        state.global.banExpandRounds = 1;
      }

      const actions = state.currentRound.actions || {};

      state.players.forEach((p) => {
        if (!state.currentRound.event.immuneFactions.includes(p.id)) {
          p.sp += effect.spDelta || 0;
          p.sheep += effect.sheepDelta || 0;
        }

        if (
          effect.condition === "MAINTAIN_BONUS_SP" &&
          actions[p.id] === "maintain"
        ) {
          p.sp += effect.conditionValue || 0;
        }

        if (
          effect.condition === "EXPAND_PENALTY_SHEEP" &&
          actions[p.id] === "expand"
        ) {
          p.sheep += effect.conditionValue || 0;
        }

        if (
          effect.condition === "LARGE_HERD_PENALTY" &&
          p.sheep >= (effect.conditionThreshold || 0)
        ) {
          p.sheep += effect.conditionValue || 0;
        }

        if (effect.specificFactionSp && effect.specificFactionSp[p.id]) {
          p.sp += effect.specificFactionSp[p.id];
        }

        if (p.sheep < 0) p.sheep = 0;
      });
    }

    // 每回合结束时的自然衰减
    healthDelta -= 1; // 自然衰减-1

    // 生态过载惩罚
    const totalSheep = state.players.reduce((sum, p) => sum + p.sheep, 0);
    if (totalSheep >= state.global.pastureHealth * 1.5) {
      healthDelta -= 1; // 过载惩罚-1
    }
    if (totalSheep >= state.global.pastureHealth * 2) {
      healthDelta -= 2; // 严重过载惩罚-2
    }

    state.global.pastureHealth = Math.max(
      0,
      state.global.pastureHealth + healthDelta,
    );
    state.global.totalSheep = state.players.reduce(
      (sum, p) => sum + p.sheep,
      0,
    );

    state.history.rounds.push({
      round: state.round,
      actions: { ...state.currentRound.actions },
      trades: [...state.currentRound.trades],
      event: state.currentRound.event?.id,
    });

    if (state.global.pastureHealth <= 0 && !state.isCollapsed) {
      state.phase = "collapse_vote";
    } else {
      GameRules.nextRound(state);
    }
  },

  resolveCollapse: (state) => {
    const votes = Object.values(state.currentRound.votes);
    const exploitVotes = votes.filter((v) => v === "exploit").length;
    const repairVotes = votes.filter((v) => v === "repair").length;

    state.isCollapsed = true;
    state.collapseChoice = exploitVotes > repairVotes ? "exploit" : "repair";

    if (state.collapseChoice === "repair") {
      state.global.pastureHealth = 5;
      state.players.forEach((p) => {
        p.sheep = Math.floor(p.sheep / 2);
        p.sp += 3;
      });
    } else {
      state.global.pastureHealth = 0;
      state.players.forEach((p) => {
        p.sheep += 3;
        p.sp = 0;
      });
    }
    GameRules.nextRound(state);
  },

  nextRound: (state) => {
    const finalRound = state.isCollapsed ? 6 : 4;
    if (state.round >= finalRound) {
      state.phase = "ended";
      return;
    }
    state.round += 1;

    state.phase = "action";
    // 逐个属性重置，避免替换整个对象导致订阅失效
    state.currentRound.actions = {};
    state.currentRound.trades = [];
    state.currentRound.event = null;
    state.currentRound.votes = {};
    state.players.forEach((p) => {
      if (p.id === "industrial") p.hasTraded = false;
    });
  },
};
