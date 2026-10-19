import { events } from "./data/events.js";
import { factions } from "./data/factions.js";
import { getLocale, registerMessages, t } from "../../shared/js/i18n.js";

export const ESG_MESSAGES = {
  en: {
    "esg.title": "Tragedy of the Commons · ESG Game",
    "esg.heading.main": "Tragedy of the Commons",
    "esg.heading.suffix": "· ESG Game",
    "esg.round": "Round",
    "esg.roundUnit": "",
    "esg.globalSp": "Global SP",
    "esg.globalSpContext": "All factions combined",
    "esg.console.title": "Round status",
    "esg.roundStatus.initial": "Choose an action for the 5 factions",
    "esg.roundStatus.progress": "{selected}/5 factions have chosen",
    "esg.roundStatus.ready": "Ready to resolve — select “End round”",
    "esg.roundStatus.resolving": "Resolving this round…",
    "esg.roundStatus.ended": "Game over",
    "esg.win.leading": "Leading",
    "esg.win.score": "{score} points",
    "esg.win.scoreSuffix": " points",
    "esg.pasture.title": "Pasture health",
    "esg.pasture.safe": "Stable",
    "esg.pasture.warning": "Fragile",
    "esg.pasture.danger": "Critical",
    "esg.briefing.title": "Round briefing",
    "esg.briefing.lead": "Read this round's event before choosing actions.",
    "esg.event.title": "Current event",
    "esg.event.badge": "Event type",
    "esg.event.waiting": "Waiting for an event…",
    "esg.event.placeholder": "Event title",
    "esg.event.placeholderDesc": "Event description",
    "esg.log.title": "Game log",
    "esg.controls.title": "Control Center",
    "esg.controls.trade": "Secret trade",
    "esg.controls.endRound": "End round",
    "esg.controls.endRoundWaiting": "Still waiting on {count} factions",
    "esg.controls.endRoundReady": "All 5 factions have chosen",
    "esg.controls.endRoundReadyHint":
      "The round is resolved only when you select this button",
    "esg.controls.endRoundCollapse":
      "Vote on the collapse response to continue",
    "esg.controls.endRoundUnavailable":
      "The round cannot be resolved in the current phase",
    "esg.trade.title": "Secret trade",
    "esg.trade.target": "Choose a trade partner",
    "esg.trade.selectPlaceholder": "Choose a faction…",
    "esg.trade.amount": "Amount transferred",
    "esg.trade.amountValue": "1 sheep 🐑",
    "esg.trade.cancel": "Cancel",
    "esg.trade.confirm": "Confirm trade",
    "esg.trade.noTarget": "Please choose a trade partner.",
    "esg.trade.failedPrefix": "Trade failed: ",
    "esg.trade.error.player_not_found": "That faction does not exist.",
    "esg.trade.error.not_industrial":
      "Only the Industrial Syndicate can trade.",
    "esg.trade.error.already_traded":
      "This round's trade has already been made.",
    "esg.trade.error.already_acted":
      "Choose the action for the Industrial Syndicate after trading.",
    "esg.trade.error.insufficient_sheep":
      "The Industrial Syndicate does not have enough sheep to trade.",
    "esg.trade.error.invalid": "The trade parameters are invalid.",
    "esg.trade.error.phase":
      "Trading is only available during the action phase.",
    "esg.trade.error.unknown": "Unknown error.",
    "esg.trade.success":
      "🤝 Trade complete! 1 sheep has been transferred to {faction}",
    "esg.trade.done": "The Industrial Syndicate has already traded this round.",
    "esg.collapse.title": "⚠️ Ecosystem collapse ⚠️",
    "esg.collapse.lead":
      "The global commons can no longer sustain the current level of extraction. Every faction must vote on an emergency resolution.",
    "esg.collapse.exploitTitle": "A) Take what is left",
    "esg.collapse.exploitLead":
      "Extract the remaining value before the system fails",
    "esg.collapse.exploit1": "• Pasture health drops permanently to 0",
    "esg.collapse.exploit2": "• Every faction immediately gains 3 sheep",
    "esg.collapse.exploit3": "• All sustainability points are reset to 0",
    "esg.collapse.repairTitle": "B) Scientific restoration",
    "esg.collapse.repairLead": "Take decisive action to protect and rebuild",
    "esg.collapse.repair1": "• Pasture health is restored to 5",
    "esg.collapse.repair2": "• Every faction's flock is halved",
    "esg.collapse.repair3": "• Every faction gains +3 sustainability points",
    "esg.collapse.voting": "Voting status",
    "esg.end.title": "Game over",
    "esg.end.finalHealth": "Final pasture health:",
    "esg.end.finalSp": "Global sustainability points:",
    "esg.end.restart": "Start again",
    "esg.end.sheepSp": "{sheep} sheep | {sp} sustainability points",
    "esg.end.score": "{score} points",
    "esg.summary.title": "Round summary",
    "esg.summary.rounds": "Round {before} → round {after}",
    "esg.summary.health": "Pasture health",
    "esg.summary.sp": "Global sustainability points",
    "esg.summary.playerLine":
      "Sheep {beforeSheep}→{sheep} ({sheepDiff}), SP {beforeSp}→{sp} ({spDiff})",
    "esg.summary.continue": "Continue",
    "esg.audio.toggle": "Toggle sound",
    "esg.help.toggle": "Beginner guide",
    "esg.faction.sustainability": "Sustainability points",
    "esg.faction.sheep": "Current flock",
    "esg.factions.title": "Faction decisions",
    "esg.faction.expand": "Expand",
    "esg.faction.maintain": "Maintain",
    "esg.faction.reduce": "Restore",
    "esg.faction.chosen": "✓ Action chosen",
    "esg.faction.banExpand":
      "“Expand” is banned by this round's event — choose “Maintain” or “Restore”",
    "esg.faction.chooseAction": "Choose an action",
    "esg.faction.expandBanned":
      "The current rules ban “Expand”. Choose “Maintain” or “Restore”.",
    "esg.action.expand": "Expand",
    "esg.action.maintain": "Maintain",
    "esg.action.reduce": "Restore",
    "esg.tradeButton.missing": "🔒 Industrial Syndicate only",
    "esg.tradeButton.insufficient": "❌ Not enough sheep",
    "esg.tradeButton.used": "✓ Traded this round",
    "esg.tradeButton.actFirst": "⛔ Action already chosen",
    "esg.tradeButton.ready": "🤝 Secret trade",
    "esg.tradeButton.missingHint": "This faction cannot trade.",
    "esg.tradeButton.insufficientHint": "Not enough sheep to trade.",
    "esg.tradeButton.usedHint": "This round's trade is already done.",
    "esg.tradeButton.actFirstHint":
      "The Industrial Syndicate has already acted, so no trade is possible this round.",
    "esg.tradeButton.readyHint":
      "The Industrial Syndicate may trade once this round (transferring 1 sheep).",
    "esg.alert.chooseFor": "Choose an action for: {factions}",
    "esg.alert.roundFailed":
      "The round could not be resolved. Please try again.",
    "esg.log.roundDone": "Round {round} complete",
    "esg.log.event": "📢 Event: {event}",
    "esg.log.trade": "🤝 Trade: {from} → {to}",
    "esg.log.empty": "No rounds resolved yet.",
    "esg.mobile.summary": "R{round} · {health} health · {selected}/5 chosen",
    "esg.eventType.positive": "Positive event",
    "esg.eventType.negative": "Negative event",
    "esg.eventType.neutral": "Neutral event",
    "esg.effect.health": "{value} Pasture Health",
    "esg.effect.sheep": "{value} Sheep",
    "esg.effect.sp": "{value} Sustainability Points",
    "esg.rules.summary": "Game rules",
    "esg.rules.goalTitle": "Goal",
    "esg.rules.goal":
      "Balance economic growth (flock size) against social reputation (sustainability points) while keeping the ecosystem from collapsing. If pasture health reaches 0, a crisis vote is triggered.",
    "esg.rules.flowTitle": "Beginner flow (play it this way)",
    "esg.rules.flow":
      "Each round has three steps: read the random event, choose an action for each of the 5 factions (every card needs one), then select “End round” to resolve the round and move on. Any choice can be switched until you resolve. If the Industrial Syndicate wants to trade, trade first and then choose its action.",
    "esg.rules.actionsTitle": "Available actions",
    "esg.rules.actions":
      '<li><span class="font-medium">Expand:</span> +1 sheep, −2 health (−1 for the first expansion by the Development community)</li><li><span class="font-medium">Maintain:</span> no change to the flock, −1 health</li><li><span class="font-medium">Restore:</span> −1 sheep, +1 sustainability point, +2 health (+3 for the Eco-pioneer)</li>',
    "esg.rules.natureTitle": "Natural dynamics",
    "esg.rules.nature":
      "<li>Baseline natural decline: −1 health per round</li><li>Overload penalty: an extra −1 when total sheep ≥ health × 1.5</li><li>Severe overload: an extra −2 when total sheep ≥ health × 2</li>",
    "esg.rules.collapseTitle": "Collapse and endings",
    "esg.rules.collapse":
      'The game runs 4 normal rounds (up to round 6 if a collapse happens in between). When health reaches 0, a vote is triggered: choosing "Take what is left" immediately grants 3 sheep, resets SP to 0 and scores the flock at half value; choosing "Scientific restoration" restores health and scores normally. Normal and restoration scoring: sheep + SP×2.',
    "esg.tutorial.welcomeTitle": "Welcome to Tragedy of the Commons · ESG Game",
    "esg.tutorial.welcomeBody":
      "In this game you make decisions for all 5 factions at once. Read the event first, then give each faction one action and select “End round” to resolve the round.",
    "esg.tutorial.quickTitle": "Start with this fixed beginner routine",
    "esg.tutorial.quickBody":
      'Step 1: read the "round briefing". Step 2: handle the Industrial Syndicate trade (optional). Step 3: choose an action for all 5 factions (you can switch any of them). Step 4: select "End round" to resolve, then check the round summary and the leader shown in the round console.',
    "esg.tutorial.healthTitle": "Pasture health",
    "esg.tutorial.healthBody":
      "This is the globally shared ecological resource. When it reaches 0, an ecosystem collapse crisis is triggered.",
    "esg.tutorial.factionsTitle": "The 5 faction cards",
    "esg.tutorial.factionsBody":
      "There are 5 faction cards here. You need to choose one action for every card, and your choice stays switchable until you select “End round”.",
    "esg.tutorial.abilitiesTitle": "Meet the 5 factions (core abilities)",
    "esg.tutorial.abilitiesBody":
      "Industrial Syndicate: one secret trade per round; Eco-pioneer: restoration heals +1 extra health; Island Alliance: immune to climate disasters; Resource Group: starts with a larger flock; Development community: the first expansion costs only −1 health.",
    "esg.tutorial.actionsTitle": "Choosing actions",
    "esg.tutorial.actionsBody":
      'Expand = +1 sheep but −2 health; Maintain = −1 health; Restore = −1 sheep but +2 health and +1 SP. Beginner tip: once health drops below 8, favour "Restore".',
    "esg.tutorial.nextTitle": "What to do next",
    "esg.tutorial.nextBody":
      'Watch the round console at the top: it tells you how many factions have chosen ("{selected}/5"). Once all 5 have chosen, select “End round” to resolve the round.',
    "esg.tutorial.tradeTitle": "Secret trade",
    "esg.tutorial.tradeBody":
      "The Industrial Syndicate may trade once per round (transferring 1 sheep). If the button is not shown, it has already acted and cannot trade this round.",
    "esg.tutorial.eventsTitle": "Random events",
    "esg.tutorial.eventsBody":
      "One random event is drawn each round. It appears in the event box and takes part in the resolution.",
    "esg.tutorial.endRoundTitle": "Ending the round",
    "esg.tutorial.endRoundBody":
      'Once all 5 factions have chosen, select "End round" to resolve the round. Any choice can be switched before that, and nothing resolves on its own.',
    "esg.tutorial.winTitle": "How to win",
    "esg.tutorial.winBody":
      'Watch the leader panel in the round console: the highest total score when the game ends wins, and the current leader and total rounds update live. Normal scoring = sheep + SP×2; if "Take what is left" is chosen, scoring = sheep × 0.5 (rounded down).',
    "esg.tutorial.rulesTitle": "Game rules",
    "esg.tutorial.rulesBody": "Select here to read the full rules and scoring.",
    "esg.tutorial.prev": "Previous",
    "esg.tutorial.next": "Next",
    "esg.tutorial.finish": "Finish",
    "esg.tutorial.skip": "Skip",
    "esg.tutorial.doneTitle": "🎉 Ready to play!",
    "esg.tutorial.doneBody":
      "You know the basics now. Good luck balancing sustainability against economic growth!",
    "esg.tutorial.start": "Start the game",
    "esg.tutorial.gotIt": "Got it",
    "esg.hint.lowHealth":
      "⚠️ Warning: pasture health is low — favour the “Restore” action",
    "esg.hint.overload":
      "⚠️ Careful: the total flock is too large and will trigger an overload penalty!",
    "esg.hint.collapse":
      "🚨 Emergency: the ecosystem is about to collapse — vote on a response",
  },
  zh: {
    "esg.title": "公地悲剧 · ESG博弈游戏",
    "esg.heading.main": "公地悲剧",
    "esg.heading.suffix": "· ESG博弈",
    "esg.round": "第",
    "esg.roundUnit": "回合",
    "esg.globalSp": "全局 SP",
    "esg.globalSpContext": "所有阵营合计",
    "esg.console.title": "回合状态",
    "esg.roundStatus.initial": "请为 5 个阵营各选择一个行动",
    "esg.roundStatus.progress": "已选择 {selected}/5",
    "esg.roundStatus.ready": "可以结算——点击“结束回合”",
    "esg.roundStatus.resolving": "正在结算本回合...",
    "esg.roundStatus.ended": "游戏结束",
    "esg.win.leading": "当前领先",
    "esg.win.score": "{score}分",
    "esg.win.scoreSuffix": " 分",
    "esg.pasture.title": "牧场健康值",
    "esg.pasture.safe": "稳定",
    "esg.pasture.warning": "警戒",
    "esg.pasture.danger": "临界",
    "esg.briefing.title": "本回合简报",
    "esg.briefing.lead": "先阅读本回合事件，再为各阵营选择行动。",
    "esg.event.title": "当前事件",
    "esg.event.badge": "事件类型",
    "esg.event.waiting": "等待事件触发...",
    "esg.event.placeholder": "事件标题",
    "esg.event.placeholderDesc": "事件描述",
    "esg.log.title": "游戏日志",
    "esg.controls.title": "控制中心",
    "esg.controls.trade": "秘密交易",
    "esg.controls.endRound": "结束回合",
    "esg.controls.endRoundWaiting": "还差 {count} 个阵营",
    "esg.controls.endRoundReady": "5 个阵营已全部选择",
    "esg.controls.endRoundReadyHint": "本回合只有点击此按钮才会结算",
    "esg.controls.endRoundCollapse": "请先完成生态崩溃投票",
    "esg.controls.endRoundUnavailable": "当前阶段不能结算本回合",
    "esg.trade.title": "秘密交易",
    "esg.trade.target": "选择交易对象",
    "esg.trade.selectPlaceholder": "请选择阵营...",
    "esg.trade.amount": "转让数量",
    "esg.trade.amountValue": "1只羊 🐑",
    "esg.trade.cancel": "取消",
    "esg.trade.confirm": "确认交易",
    "esg.trade.noTarget": "请选择交易对象",
    "esg.trade.failedPrefix": "交易失败：",
    "esg.trade.error.player_not_found": "玩家不存在",
    "esg.trade.error.not_industrial": "只有工业集团可以进行交易",
    "esg.trade.error.already_traded": "本回合已经进行过交易了",
    "esg.trade.error.already_acted": "选择行动后无法交易，请先交易再选择行动",
    "esg.trade.error.insufficient_sheep": "工业集团当前羊群不足，无法交易",
    "esg.trade.error.invalid": "交易参数无效",
    "esg.trade.error.phase": "只有行动阶段可以进行交易",
    "esg.trade.error.unknown": "未知错误",
    "esg.trade.success": "🤝 交易成功！1只羊已转让给{faction}",
    "esg.trade.done": "本回合已进行过交易",
    "esg.collapse.title": "⚠️ 生态系统崩溃 ⚠️",
    "esg.collapse.lead":
      "全球公共资源已无法维持当前的开发水平。各阵营必须进行紧急投票决议。",
    "esg.collapse.exploitTitle": "A) 竭泽而渔",
    "esg.collapse.exploitLead": "在系统完全崩溃前提取剩余价值",
    "esg.collapse.exploit1": "• 健康值永久降至0",
    "esg.collapse.exploit2": "• 所有阵营立即获得3只羊",
    "esg.collapse.exploit3": "• 所有可持续点数清零",
    "esg.collapse.repairTitle": "B) 科学修复",
    "esg.collapse.repairLead": "采取激进措施进行保护重建",
    "esg.collapse.repair1": "• 健康值恢复至5",
    "esg.collapse.repair2": "• 所有阵营羊群减半",
    "esg.collapse.repair3": "• 所有阵营获得+3可持续点数",
    "esg.collapse.voting": "投票状态",
    "esg.end.title": "游戏结束",
    "esg.end.finalHealth": "最终牧场健康值：",
    "esg.end.finalSp": "全球可持续点数：",
    "esg.end.restart": "重新开始",
    "esg.end.sheepSp": "{sheep}只羊 | {sp}可持续点数",
    "esg.end.score": "{score}分",
    "esg.summary.title": "回合结算",
    "esg.summary.rounds": "第 {before} 回合 → 第 {after} 回合",
    "esg.summary.health": "牧场健康值",
    "esg.summary.sp": "全局可持续点数",
    "esg.summary.playerLine":
      "羊群 {beforeSheep}→{sheep} ({sheepDiff})，SP {beforeSp}→{sp} ({spDiff})",
    "esg.summary.continue": "继续",
    "esg.audio.toggle": "切换音效",
    "esg.help.toggle": "新手指引",
    "esg.faction.sustainability": "可持续点数",
    "esg.faction.sheep": "当前羊群",
    "esg.factions.title": "阵营行动",
    "esg.faction.expand": "扩大",
    "esg.faction.maintain": "维持",
    "esg.faction.reduce": "修复",
    "esg.faction.chosen": "✓ 已选择行动",
    "esg.faction.banExpand": "本回合“扩大”被事件禁止，请选“维持/修复”",
    "esg.faction.chooseAction": "请选择行动",
    "esg.faction.expandBanned": "当前规则禁止选择“扩大”，请改选“维持”或“修复”",
    "esg.action.expand": "扩大",
    "esg.action.maintain": "维持",
    "esg.action.reduce": "修复",
    "esg.tradeButton.missing": "🔒 仅工业集团可用",
    "esg.tradeButton.insufficient": "❌ 羊群不足",
    "esg.tradeButton.used": "✓ 本回合已交易",
    "esg.tradeButton.actFirst": "⛔ 已选择行动",
    "esg.tradeButton.ready": "🤝 秘密交易",
    "esg.tradeButton.missingHint": "当前玩家不是工业集团",
    "esg.tradeButton.insufficientHint": "羊群不足，无法交易",
    "esg.tradeButton.usedHint": "本回合已完成交易",
    "esg.tradeButton.actFirstHint": "选择行动后无法交易",
    "esg.tradeButton.readyHint": "工业集团专属：每回合可交易1只羊给其他阵营",
    "esg.alert.chooseFor": "请为以下阵营选择行动：{factions}",
    "esg.alert.roundFailed": "回合结束失败，请重试",
    "esg.log.roundDone": "第 {round} 回合完成",
    "esg.log.event": "📢 事件: {event}",
    "esg.log.trade": "🤝 交易: {from} → {to}",
    "esg.log.empty": "尚无已结算回合。",
    "esg.mobile.summary": "第{round}回合 · 健康 {health} · 已选 {selected}/5",
    "esg.eventType.positive": "积极事件",
    "esg.eventType.negative": "消极事件",
    "esg.eventType.neutral": "中性事件",
    "esg.effect.health": "{value} 健康值",
    "esg.effect.sheep": "{value} 羊群",
    "esg.effect.sp": "{value} 可持续点数",
    "esg.rules.summary": "游戏规则说明",
    "esg.rules.goalTitle": "游戏目标",
    "esg.rules.goal":
      "在经济发展（羊群数量）与社会声誉（可持续点数）之间寻求平衡，同时防止生态系统崩溃。当牧场健康值降至0时，将触发危机投票。",
    "esg.rules.flowTitle": "新手流程（按这个玩）",
    "esg.rules.flow":
      "每回合按这 3 步：先看本回合的随机事件，再为 5 个阵营分别选择行动（每张卡都要选），最后点击“结束回合”结算并进入下一回合。结算前每个阵营的行动都可以更换。若工业集团要交易，请先交易再给工业集团选行动。",
    "esg.rules.actionsTitle": "可选行动",
    "esg.rules.actions":
      '<li><span class="font-medium">扩大羊群：</span>羊群+1，健康值-2（发展中国家首次-1）</li><li><span class="font-medium">维持现状：</span>羊群不变，健康值-1</li><li><span class="font-medium">修复：</span>羊群-1，可持续点数+1，健康值+2（环保先锋+3）</li>',
    "esg.rules.natureTitle": "自然动态",
    "esg.rules.nature":
      "<li>基础自然衰减：每回合健康值-1</li><li>过载惩罚：总羊群≥健康值×1.5时额外-1</li><li>严重过载：总羊群≥健康值×2时额外-2</li>",
    "esg.rules.collapseTitle": "生态崩溃与结局",
    "esg.rules.collapse":
      '游戏进行4个正常回合（若中途发生崩溃则最多进行到第6回合）。当健康值归零时触发投票：选择"竭泽而渔"会立即获得3只羊、SP清零，且最终得分按羊群的一半计算；选择"科学修复"会恢复健康并按正常计分。正常/修复计分：羊群 + SP×2。',
    "esg.tutorial.welcomeTitle": "欢迎来到公地悲剧·ESG博弈游戏",
    "esg.tutorial.welcomeBody":
      "你这局要同时为5个阵营分别做决策。先看当前事件，再给5个阵营各选1次行动，然后点“结束回合”结算。",
    "esg.tutorial.quickTitle": "先按这套“新手固定流程”玩",
    "esg.tutorial.quickBody":
      "第1步看“本回合简报”；第2步先处理工业集团交易（可选）；第3步给5个阵营都选行动（选错可随时更换）；第4步点“结束回合”结算，再回看结算结果和回合控制台中的领先信息。",
    "esg.tutorial.healthTitle": "牧场健康值",
    "esg.tutorial.healthBody":
      "这是全球共享的生态资源。当健康值降至0时，将触发生态崩溃危机。",
    "esg.tutorial.factionsTitle": "5个阵营决策区",
    "esg.tutorial.factionsBody":
      "这里有5张阵营卡。你需要给每一张卡都选一个行动。结算前可以随时更换，点“结束回合”才会真正结算。",
    "esg.tutorial.abilitiesTitle": "先认识5个阵营（核心能力）",
    "esg.tutorial.abilitiesBody":
      "工业集团：每回合可秘密交易1次；环保先锋：修复额外+1健康；岛国联盟：免疫气候灾害；资源集团：初始羊群更多；发展中国家：首次扩大仅-1健康。",
    "esg.tutorial.actionsTitle": "选择行动",
    "esg.tutorial.actionsBody":
      "扩大=羊群+1但健康-2；维持=健康-1；修复=羊群-1但健康+2且SP+1。新手建议：健康值低于8时优先多选“修复”。",
    "esg.tutorial.nextTitle": "你下一步要做什么",
    "esg.tutorial.nextBody":
      "看顶部回合控制台：它会提示你“已选择X/5”。5个阵营都选完后，点“结束回合”结算并进入下一回合。",
    "esg.tutorial.tradeTitle": "秘密交易",
    "esg.tutorial.tradeBody":
      "工业集团每回合可进行1次交易（转让1只羊）。若按钮暂未显示，说明工业集团已行动，本回合不可再交易。",
    "esg.tutorial.eventsTitle": "随机事件",
    "esg.tutorial.eventsBody":
      "每回合都会抽取一个随机事件，直接显示在事件框里并参与结算。",
    "esg.tutorial.endRoundTitle": "结束回合",
    "esg.tutorial.endRoundBody":
      "5个阵营都选好后，点“结束回合”结算本回合。结算前每个阵营的行动都可以更换，系统不会自动结算。",
    "esg.tutorial.winTitle": "怎么赢（胜利标准）",
    "esg.tutorial.winBody":
      "看回合控制台中的领先信息：游戏结束时总分最高者获胜，并会实时显示当前领先者和总回合数。普通计分=羊群+SP×2；若选“竭泽而渔”，计分=羊群×0.5（向下取整）。",
    "esg.tutorial.rulesTitle": "游戏规则",
    "esg.tutorial.rulesBody": "点击此处查看完整的游戏规则和计分方式。",
    "esg.tutorial.prev": "上一步",
    "esg.tutorial.next": "下一步",
    "esg.tutorial.finish": "完成",
    "esg.tutorial.skip": "跳过",
    "esg.tutorial.doneTitle": "🎉 准备开始！",
    "esg.tutorial.doneBody":
      "你已了解游戏基本操作。祝你在可持续发展与经济发展的博弈中取得胜利！",
    "esg.tutorial.start": "开始游戏",
    "esg.tutorial.gotIt": "知道了",
    "esg.hint.lowHealth": '⚠️ 警告：牧场健康值较低，建议多选择"修复"行动',
    "esg.hint.overload": "⚠️ 注意：羊群数量过多，将触发过载惩罚！",
    "esg.hint.collapse": "🚨 紧急情况：生态系统即将崩溃，请投票选择应对策略",
  },
  ja: {
    "esg.title": "コモンズの悲劇・ESGゲーム",
    "esg.heading.main": "コモンズの悲劇",
    "esg.heading.suffix": "・ESGゲーム",
    "esg.round": "第",
    "esg.roundUnit": "ラウンド",
    "esg.globalSp": "グローバル SP",
    "esg.globalSpContext": "全陣営の合計",
    "esg.console.title": "ラウンド状況",
    "esg.roundStatus.initial": "5つの陣営それぞれに行動を選んでください",
    "esg.roundStatus.progress": "{selected}/5 選択済み",
    "esg.roundStatus.ready": "集計できます —「ラウンド終了」を選択",
    "esg.roundStatus.resolving": "このラウンドを集計しています…",
    "esg.roundStatus.ended": "ゲーム終了",
    "esg.win.leading": "現在の首位",
    "esg.win.score": "{score}点",
    "esg.win.scoreSuffix": "点",
    "esg.pasture.title": "牧草地の健康度",
    "esg.pasture.safe": "安定",
    "esg.pasture.warning": "注意",
    "esg.pasture.danger": "危険",
    "esg.briefing.title": "今回のブリーフィング",
    "esg.briefing.lead": "行動を選ぶ前に今回のイベントを確認してください。",
    "esg.event.title": "現在のイベント",
    "esg.event.badge": "イベント種別",
    "esg.event.waiting": "イベントの発生を待っています…",
    "esg.event.placeholder": "イベント名",
    "esg.event.placeholderDesc": "イベントの説明",
    "esg.log.title": "ゲームログ",
    "esg.controls.title": "コントロールセンター",
    "esg.controls.trade": "秘密取引",
    "esg.controls.endRound": "ラウンド終了",
    "esg.controls.endRoundWaiting": "あと {count} 陣営が未選択",
    "esg.controls.endRoundReady": "5陣営すべて選択済み",
    "esg.controls.endRoundReadyHint":
      "このボタンを押したときだけラウンドが集計されます",
    "esg.controls.endRoundCollapse": "先に崩壊への対応を投票してください",
    "esg.controls.endRoundUnavailable": "現在のフェーズでは集計できません",
    "esg.trade.title": "秘密取引",
    "esg.trade.target": "取引相手を選ぶ",
    "esg.trade.selectPlaceholder": "陣営を選んでください…",
    "esg.trade.amount": "譲渡する数",
    "esg.trade.amountValue": "羊1頭 🐑",
    "esg.trade.cancel": "キャンセル",
    "esg.trade.confirm": "取引を確定",
    "esg.trade.noTarget": "取引相手を選んでください",
    "esg.trade.failedPrefix": "取引失敗：",
    "esg.trade.error.player_not_found": "その陣営は存在しません",
    "esg.trade.error.not_industrial": "取引できるのは産業シンジケートだけです",
    "esg.trade.error.already_traded":
      "このラウンドの取引はすでに完了しています",
    "esg.trade.error.already_acted": "行動を選ぶ前に取引してください",
    "esg.trade.error.insufficient_sheep": "産業シンジケートの羊が足りません",
    "esg.trade.error.invalid": "取引のパラメーターが不正です",
    "esg.trade.error.phase": "取引は行動フェーズでのみ可能です",
    "esg.trade.error.unknown": "不明なエラー",
    "esg.trade.success": "🤝 取引成立！羊1頭を{faction}に譲渡しました",
    "esg.trade.done": "このラウンドはすでに取引済みです",
    "esg.collapse.title": "⚠️ 生態系の崩壊 ⚠️",
    "esg.collapse.lead":
      "世界の共有資源は現在の開発水準を支えられなくなりました。各陣営は緊急の決議に投票しなければなりません。",
    "esg.collapse.exploitTitle": "A) 取り尽くす",
    "esg.collapse.exploitLead":
      "システムが完全に壊れる前に残りの価値を取り出す",
    "esg.collapse.exploit1": "• 健康度は永久に0になる",
    "esg.collapse.exploit2": "• 全陣営がただちに羊を3頭獲得",
    "esg.collapse.exploit3": "• すべての持続可能性ポイントが0になる",
    "esg.collapse.repairTitle": "B) 科学的な回復",
    "esg.collapse.repairLead": "大胆な対策で保全と再建を行う",
    "esg.collapse.repair1": "• 健康度が5まで回復する",
    "esg.collapse.repair2": "• 全陣営の羊が半分になる",
    "esg.collapse.repair3": "• 全陣営が持続可能性ポイント+3を獲得",
    "esg.collapse.voting": "投票状況",
    "esg.end.title": "ゲーム終了",
    "esg.end.finalHealth": "最終的な牧草地の健康度：",
    "esg.end.finalSp": "世界の持続可能性ポイント：",
    "esg.end.restart": "もう一度プレイ",
    "esg.end.sheepSp": "羊{sheep}頭 | 持続可能性{sp}",
    "esg.end.score": "{score}点",
    "esg.summary.title": "ラウンド集計",
    "esg.summary.rounds": "第{before}ラウンド → 第{after}ラウンド",
    "esg.summary.health": "牧草地の健康度",
    "esg.summary.sp": "世界の持続可能性ポイント",
    "esg.summary.playerLine":
      "羊 {beforeSheep}→{sheep} ({sheepDiff})、SP {beforeSp}→{sp} ({spDiff})",
    "esg.summary.continue": "続ける",
    "esg.audio.toggle": "サウンドの切り替え",
    "esg.help.toggle": "初心者ガイド",
    "esg.faction.sustainability": "持続可能性ポイント",
    "esg.faction.sheep": "現在の羊",
    "esg.factions.title": "陣営の行動",
    "esg.faction.expand": "拡大",
    "esg.faction.maintain": "維持",
    "esg.faction.reduce": "回復",
    "esg.faction.chosen": "✓ 行動を選択済み",
    "esg.faction.banExpand":
      "このラウンドはイベントにより「拡大」が禁止されています。「維持」か「回復」を選んでください",
    "esg.faction.chooseAction": "行動を選んでください",
    "esg.faction.expandBanned":
      "現在のルールでは「拡大」を選べません。「維持」か「回復」を選んでください。",
    "esg.action.expand": "拡大",
    "esg.action.maintain": "維持",
    "esg.action.reduce": "回復",
    "esg.tradeButton.missing": "🔒 産業シンジケートのみ",
    "esg.tradeButton.insufficient": "❌ 羊が足りません",
    "esg.tradeButton.used": "✓ このラウンドは取引済み",
    "esg.tradeButton.actFirst": "⛔ 行動を選択済み",
    "esg.tradeButton.ready": "🤝 秘密取引",
    "esg.tradeButton.missingHint": "この陣営は取引できません",
    "esg.tradeButton.insufficientHint": "羊が足りないため取引できません",
    "esg.tradeButton.usedHint": "このラウンドの取引は完了しました",
    "esg.tradeButton.actFirstHint": "行動を選ぶと取引できません",
    "esg.tradeButton.readyHint":
      "産業シンジケート限定：1ラウンドに1回、他の陣営へ羊1頭を譲渡できます",
    "esg.alert.chooseFor": "次の陣営の行動を選んでください：{factions}",
    "esg.alert.roundFailed":
      "ラウンドを終了できませんでした。もう一度お試しください。",
    "esg.log.roundDone": "第{round}ラウンド完了",
    "esg.log.event": "📢 イベント: {event}",
    "esg.log.trade": "🤝 取引: {from} → {to}",
    "esg.log.empty": "集計済みのラウンドはまだありません。",
    "esg.mobile.summary":
      "第{round}ラウンド · 健康 {health} · {selected}/5 選択",
    "esg.eventType.positive": "ポジティブなイベント",
    "esg.eventType.negative": "ネガティブなイベント",
    "esg.eventType.neutral": "中立のイベント",
    "esg.effect.health": "健康度 {value}",
    "esg.effect.sheep": "羊 {value}",
    "esg.effect.sp": "持続可能性ポイント {value}",
    "esg.rules.summary": "ゲームルール",
    "esg.rules.goalTitle": "ゲームの目標",
    "esg.rules.goal":
      "経済成長（羊の数）と社会的評価（持続可能性ポイント）のバランスを取りながら、生態系の崩壊を防ぎます。牧草地の健康度が0になると危機投票が発生します。",
    "esg.rules.flowTitle": "初心者向けの手順",
    "esg.rules.flow":
      "各ラウンドは3ステップです。まず今回のランダムイベントを確認し、次に5つの陣営それぞれに行動を選び（すべてのカードで選択が必要）、最後に「ラウンド終了」で集計して次のラウンドへ進みます。集計前なら選択は何度でも変更できます。産業シンジケートが取引する場合は、先に取引してから行動を選んでください。",
    "esg.rules.actionsTitle": "選べる行動",
    "esg.rules.actions":
      '<li><span class="font-medium">拡大：</span>羊+1、健康度-2（開発途上コミュニティの初回は-1）</li><li><span class="font-medium">維持：</span>羊は変わらず、健康度-1</li><li><span class="font-medium">回復：</span>羊-1、持続可能性ポイント+1、健康度+2（エコ先駆者は+3）</li>',
    "esg.rules.natureTitle": "自然のダイナミクス",
    "esg.rules.nature":
      "<li>自然減少：毎ラウンド健康度-1</li><li>過放牧ペナルティ：羊の合計≧健康度×1.5でさらに-1</li><li>深刻な過放牧：羊の合計≧健康度×2でさらに-2</li>",
    "esg.rules.collapseTitle": "崩壊とエンディング",
    "esg.rules.collapse":
      "ゲームは通常4ラウンド（途中で崩壊した場合は最大6ラウンド）行います。健康度が0になると投票が発生します。「取り尽くす」を選ぶとただちに羊3頭を獲得し、SPは0になり、最終得点は羊の半分で計算されます。「科学的な回復」を選ぶと健康度が戻り、通常どおり得点します。通常・回復時の得点：羊 + SP×2。",
    "esg.tutorial.welcomeTitle": "コモンズの悲劇・ESGゲームへようこそ",
    "esg.tutorial.welcomeBody":
      "このゲームでは5つの陣営すべての意思決定を同時に担当します。まず現在のイベントを確認し、各陣営に1つずつ行動を選んでから「ラウンド終了」で集計します。",
    "esg.tutorial.quickTitle": "まずはこの初心者向け手順で",
    "esg.tutorial.quickBody":
      "ステップ1：「今回のブリーフィング」を確認。ステップ2：産業シンジケートの取引を処理（任意）。ステップ3：5陣営すべてに行動を選択（選び直し可）。ステップ4：「ラウンド終了」で集計し、ラウンドコンソールのリード状況を確認。",
    "esg.tutorial.healthTitle": "牧草地の健康度",
    "esg.tutorial.healthBody":
      "これは世界で共有される生態資源です。0になると生態系崩壊の危機が発生します。",
    "esg.tutorial.factionsTitle": "5つの陣営カード",
    "esg.tutorial.factionsBody":
      "ここに5枚の陣営カードがあります。すべてのカードに行動を1つ選ぶ必要があります。集計前なら何度でも選び直せるので、決まったら「ラウンド終了」を押します。",
    "esg.tutorial.abilitiesTitle": "5つの陣営の能力を知る",
    "esg.tutorial.abilitiesBody":
      "産業シンジケート：毎ラウンド秘密取引が1回できる。エコ先駆者：回復で健康度が+1多く回復。島国連盟：気候災害を無効化。資源グループ：初期の羊が多い。開発途上コミュニティ：初回の拡大は健康度-1のみ。",
    "esg.tutorial.actionsTitle": "行動の選択",
    "esg.tutorial.actionsBody":
      "拡大＝羊+1だが健康度-2。維持＝健康度-1。回復＝羊-1だが健康度+2かつSP+1。初心者への助言：健康度が8を下回ったら「回復」を多めに選びましょう。",
    "esg.tutorial.nextTitle": "次にすること",
    "esg.tutorial.nextBody":
      "上部のラウンドコンソールを見てください。「{selected}/5」と表示されるので、5陣営すべて選んだら「ラウンド終了」で集計します。",
    "esg.tutorial.tradeTitle": "秘密取引",
    "esg.tutorial.tradeBody":
      "産業シンジケートは毎ラウンド1回取引できます（羊1頭を譲渡）。ボタンが表示されていない場合はすでに行動済みで、このラウンドは取引できません。",
    "esg.tutorial.eventsTitle": "ランダムイベント",
    "esg.tutorial.eventsBody":
      "毎ラウンド1つランダムイベントが引かれ、現在のイベント欄に表示されて集計に反映されます。",
    "esg.tutorial.endRoundTitle": "ラウンド終了",
    "esg.tutorial.endRoundBody":
      "5陣営すべて選び終えたら「ラウンド終了」で集計します。集計前なら選択は何度でも変更でき、自動では集計されません。",
    "esg.tutorial.winTitle": "勝ち方（勝利条件）",
    "esg.tutorial.winBody":
      "ラウンドコンソールの首位パネルを見てください。ゲーム終了時に合計得点が最も高い陣営が勝ち、現在の首位と総ラウンド数がリアルタイムで表示されます。通常の得点＝羊＋SP×2。「取り尽くす」を選んだ場合は羊×0.5（切り捨て）になります。",
    "esg.tutorial.rulesTitle": "ゲームルール",
    "esg.tutorial.rulesBody":
      "ここを押すと完全なルールと得点方法を確認できます。",
    "esg.tutorial.prev": "戻る",
    "esg.tutorial.next": "次へ",
    "esg.tutorial.finish": "完了",
    "esg.tutorial.skip": "スキップ",
    "esg.tutorial.doneTitle": "🎉 準備完了！",
    "esg.tutorial.doneBody":
      "基本操作は理解できました。持続可能性と経済成長のゲームで良い結果を！",
    "esg.tutorial.start": "ゲームを始める",
    "esg.tutorial.gotIt": "了解",
    "esg.hint.lowHealth":
      "⚠️ 警告：牧草地の健康度が低めです。「回復」を多めに選ぶことをおすすめします",
    "esg.hint.overload":
      "⚠️ 注意：羊が多すぎます。過放牧ペナルティが発生します！",
    "esg.hint.collapse":
      "🚨 緊急：生態系が崩壊寸前です。対応策を投票してください",
  },
};

// Chinese and Japanese text for the supplied English event data.
const EVENT_TEXT = {
  evt_climate_summit: {
    zh: {
      title: "全球气候峰会",
      desc: "国际合作取得成果。+2 牧场健康，所有阵营获得 +1 SP。",
    },
    ja: {
      title: "世界気候サミット",
      desc: "国際協力が成功しました。健康度+2、全陣営がSP+1を獲得します。",
    },
  },
  evt_green_tech: {
    zh: {
      title: "绿色技术突破",
      desc: "新的可持续技术出现。选择“修复/维持”的阵营额外恢复 +1 健康值。",
    },
    ja: {
      title: "グリーンテックの突破",
      desc: "新しい持続可能な技術が登場しました。「回復」を選んだ陣営は健康度がさらに+1回復します。",
    },
  },
  evt_climate_aid: {
    zh: {
      title: "气候援助计划",
      desc: "全球基金注入资源。+2 健康值，但下一回合禁止“扩大”行动。",
    },
    ja: {
      title: "気候支援プログラム",
      desc: "世界基金から資源が供給されます。健康度+2ですが、次のラウンドは「拡大」が禁止されます。",
    },
  },
  evt_eco_awareness: {
    zh: {
      title: "生态意识运动",
      desc: "公众要求可持续发展。所有选择“维持”的阵营获得 +1 SP。",
    },
    ja: {
      title: "生態意識キャンペーン",
      desc: "市民が持続可能性を求めています。「維持」を選んだ陣営はSP+1を獲得します。",
    },
  },
  evt_biodiversity_bloom: {
    zh: { title: "生物多样性复苏", desc: "自然意外回弹。+3 牧场健康。" },
    ja: {
      title: "生物多様性の回復",
      desc: "自然が予想外に回復しました。健康度+3。",
    },
  },
  evt_rainy_season: {
    zh: {
      title: "风调雨顺的雨季",
      desc: "降雨充足提升了牧场恢复力。+1 牧场健康，所有阵营 +1 只羊。",
    },
    ja: {
      title: "順調な雨季",
      desc: "十分な降雨で牧草地の回復力が高まりました。健康度+1、全陣営が羊+1。",
    },
  },
  evt_eco_subsidy: {
    zh: {
      title: "生态补贴",
      desc: "政府奖励保护行为。选择“维持”的阵营获得 +1 SP。",
    },
    ja: {
      title: "生態補助金",
      desc: "政府が保全行動に報酬を出します。「維持」を選んだ陣営はSP+1を獲得します。",
    },
  },
  evt_climate_disaster: {
    zh: {
      title: "极端气候灾害",
      desc: "恶劣天气重创公共资源。-3 牧场健康，所有阵营 -1 只羊（岛国联盟免疫）。",
    },
    ja: {
      title: "異常気象災害",
      desc: "悪天候が共有資源を直撃しました。健康度-3、全陣営が羊-1（島国連盟は無効化）。",
    },
  },
  evt_price_crash: {
    zh: {
      title: "资源价格暴跌",
      desc: "市场崩溃惩罚过度生产。选择“扩大”的阵营不但没有收益，反而 -2 只羊。",
    },
    ja: {
      title: "資源価格の暴落",
      desc: "市場の崩壊が過剰生産を罰します。「拡大」を選んだ陣営は増えるどころか羊-2となります。",
    },
  },
  evt_overgrazing_crisis: {
    zh: { title: "过牧危机", desc: "土地已无法承载这么多牲畜。-4 牧场健康。" },
    ja: {
      title: "過放牧の危機",
      desc: "土地がこれ以上の家畜を支えられません。健康度-4。",
    },
  },
  evt_disease_outbreak: {
    zh: {
      title: "牲畜疫病暴发",
      desc: "病毒在大型畜群中蔓延。羊数达到 5 只及以上的阵营 -2 只羊。",
    },
    ja: {
      title: "家畜の伝染病発生",
      desc: "ウイルスが大きな群れを襲いました。羊が5頭以上の陣営は羊-2。",
    },
  },
  evt_drought: {
    zh: {
      title: "长期干旱",
      desc: "缺水损害生态系统。-2 牧场健康，所有阵营 -1 SP。",
    },
    ja: {
      title: "長期の干ばつ",
      desc: "水不足が生態系を損ないました。健康度-2、全陣営がSP-1。",
    },
  },
  evt_wildfire: {
    zh: {
      title: "野火冲击",
      desc: "野火摧毁牧场。-3 牧场健康，所有阵营 -1 只羊。",
    },
    ja: {
      title: "山火事の衝撃",
      desc: "山火事が牧草地を焼きました。健康度-3、全陣営が羊-1。",
    },
  },
  evt_pandemic_supply: {
    zh: {
      title: "供应链中断",
      desc: "物流崩溃打击过度扩张的阵营。选择“扩大”的阵营 -2 只羊。",
    },
    ja: {
      title: "サプライチェーンの混乱",
      desc: "物流の崩壊が過剰拡大した陣営を直撃します。「拡大」を選んだ陣営は羊-2。",
    },
  },
  evt_tech_transition: {
    zh: {
      title: "技术转型",
      desc: "产业转向。所有阵营 -1 只羊，但“工业集团”和“发展中国家” +2 SP。",
    },
    ja: {
      title: "技術の転換",
      desc: "産業が転換期を迎えました。全陣営が羊-1ですが、「産業シンジケート」と「開発途上コミュニティ」はSP+2。",
    },
  },
  evt_policy_shift: {
    zh: {
      title: "政策转向",
      desc: "临时管制收紧生产。所有阵营 -1 只羊，+1 SP。",
    },
    ja: {
      title: "政策の転換",
      desc: "一時的な規制で生産が引き締められます。全陣営が羊-1、SP+1。",
    },
  },
  evt_public_pressure: {
    zh: {
      title: "公众舆论压力",
      desc: "舆论惩罚大型畜群持有者。羊数达到 5 只及以上的阵营 -2 只羊。",
    },
    ja: {
      title: "世論の圧力",
      desc: "世論が大きな群れを持つ陣営を批判します。羊が5頭以上の陣営は羊-2。",
    },
  },
};

// Chinese and Japanese names for the factions, keyed by faction id.
const FACTION_TEXT = {
  industrial: {
    zh: { name: "工业集团", ability: "每回合可进行1次秘密交易（转让1只羊）" },
    ja: {
      name: "産業シンジケート",
      ability: "毎ラウンド秘密取引を1回行える（羊1頭を譲渡）",
    },
  },
  eco_pioneer: {
    zh: { name: "环保先锋", ability: "修复行动额外+1点牧场健康" },
    ja: { name: "エコ先駆者", ability: "回復行動で健康度がさらに+1" },
  },
  island_alliance: {
    zh: { name: "岛国联盟", ability: "免疫所有气候类负面事件" },
    ja: { name: "島国連盟", ability: "すべての気候系の悪影響を無効化" },
  },
  resource_group: {
    zh: { name: "资源集团", ability: "初始羊群更多（开局5只）" },
    ja: { name: "資源グループ", ability: "初期の羊が多い（開始時5頭）" },
  },
  development: {
    zh: { name: "发展中国家", ability: "首次“扩大”仅消耗-1点牧场健康" },
    ja: {
      name: "開発途上コミュニティ",
      ability: "初回の「拡大」は健康度-1のみ",
    },
  },
};

registerMessages(ESG_MESSAGES);

export function factionName(id) {
  if (getLocale() === "en") {
    return factions.find((faction) => faction.id === id)?.name || id;
  }
  return (
    FACTION_TEXT[id]?.[getLocale()]?.name ||
    factions.find((f) => f.id === id)?.name ||
    id
  );
}

export function factionAbility(faction) {
  if (getLocale() === "en") return faction.description;
  return FACTION_TEXT[faction.id]?.[getLocale()]?.ability || faction.abilityCN;
}

export function eventTitle(event) {
  if (!event) return "";
  if (getLocale() === "en") return event.title;
  return EVENT_TEXT[event.id]?.[getLocale()]?.title || event.title;
}

export function eventDescription(event) {
  if (!event) return "";
  if (getLocale() === "en") return event.description;
  return EVENT_TEXT[event.id]?.[getLocale()]?.desc || event.description;
}

// Round history keeps event ids, so the log needs a lookup by id.
export function eventTitleById(id) {
  const event = events.find((item) => item.id === id);
  if (!event) return id;
  return eventTitle(event);
}

export function actionLabel(action) {
  return t(`esg.action.${action}`);
}

export function eventTypeLabel(type) {
  return t(`esg.eventType.${type}`);
}

export { events, factions, t };
