export const events = [
  {
    id: "evt_climate_summit",
    title: "Global Climate Summit",
    type: "positive",
    description:
      "International cooperation succeeds. +2 Pasture Health, all factions gain +1 SP.",
    effects: { healthDelta: 2, spDelta: 1, sheepDelta: 0 },
    immuneFactions: [],
    phaseWeights: { early: 10, mid: 5, late: 2 },
  },
  {
    id: "evt_green_tech",
    title: "Green Tech Breakthrough",
    type: "positive",
    description:
      'New sustainable technologies emerge. Factions choosing "Reduce/Repair" restore an additional +1 Health.',
    effects: {
      healthDelta: 0,
      spDelta: 0,
      sheepDelta: 0,
      condition: "REPAIR_BONUS_HEALTH",
      conditionValue: 1,
    },
    immuneFactions: [],
    phaseWeights: { early: 8, mid: 8, late: 4 },
  },
  {
    id: "evt_climate_aid",
    title: "Climate Aid Program",
    type: "positive",
    description:
      'Global fund injects resources. +2 Health, but "Expand" action is banned next round.',
    effects: {
      healthDelta: 2,
      spDelta: 0,
      sheepDelta: 0,
      globalEffect: "BAN_EXPAND",
    },
    immuneFactions: [],
    phaseWeights: { early: 5, mid: 8, late: 8 },
  },
  {
    id: "evt_eco_awareness",
    title: "Ecological Awareness Campaign",
    type: "positive",
    description:
      'Public demands sustainability. All factions choosing "Maintain" gain +1 SP.',
    effects: {
      healthDelta: 0,
      spDelta: 0,
      sheepDelta: 0,
      condition: "MAINTAIN_BONUS_SP",
      conditionValue: 1,
    },
    immuneFactions: [],
    phaseWeights: { early: 6, mid: 6, late: 4 },
  },
  {
    id: "evt_biodiversity_bloom",
    title: "Biodiversity Bloom",
    type: "positive",
    description: "Nature rebounds unexpectedly. +3 Pasture Health.",
    effects: { healthDelta: 3, spDelta: 0, sheepDelta: 0 },
    immuneFactions: [],
    phaseWeights: { early: 4, mid: 4, late: 2 },
  },
  {
    id: "evt_rainy_season",
    title: "Favorable Rainy Season",
    type: "positive",
    description:
      "Adequate rain improves pasture resilience. +1 Pasture Health and +1 Sheep for all factions.",
    effects: { healthDelta: 1, spDelta: 0, sheepDelta: 1 },
    immuneFactions: [],
    phaseWeights: { early: 7, mid: 5, late: 2 },
  },
  {
    id: "evt_eco_subsidy",
    title: "Ecological Subsidy",
    type: "positive",
    description:
      'Governments reward conservation behavior. Factions choosing "Maintain" gain +1 SP.',
    effects: {
      healthDelta: 0,
      spDelta: 0,
      sheepDelta: 0,
      condition: "MAINTAIN_BONUS_SP",
      conditionValue: 1,
    },
    immuneFactions: [],
    phaseWeights: { early: 6, mid: 7, late: 5 },
  },

  // Negative Events
  {
    id: "evt_climate_disaster",
    title: "Extreme Climate Disaster",
    type: "negative",
    description:
      "Severe weather devastates the commons. -3 Pasture Health, all factions lose -1 Sheep (Island Alliance immune).",
    effects: { healthDelta: -3, spDelta: 0, sheepDelta: -1 },
    immuneFactions: ["island_alliance"],
    phaseWeights: { early: 2, mid: 6, late: 10 },
  },
  {
    id: "evt_price_crash",
    title: "Resource Price Crash",
    type: "negative",
    description:
      'Market collapse punishes overproduction. Factions choosing "Expand" lose -2 Sheep instead of gaining.',
    effects: {
      healthDelta: 0,
      spDelta: 0,
      sheepDelta: 0,
      condition: "EXPAND_PENALTY_SHEEP",
      conditionValue: -2,
    },
    immuneFactions: [],
    phaseWeights: { early: 3, mid: 7, late: 8 },
  },
  {
    id: "evt_overgrazing_crisis",
    title: "Overgrazing Crisis",
    type: "negative",
    description: "The land cannot support the herds. -4 Pasture Health.",
    effects: { healthDelta: -4, spDelta: 0, sheepDelta: 0 },
    immuneFactions: [],
    phaseWeights: { early: 2, mid: 5, late: 12 },
  },
  {
    id: "evt_disease_outbreak",
    title: "Livestock Disease Outbreak",
    type: "negative",
    description:
      "A virus sweeps through large herds. Factions with 5 or more sheep lose 2 sheep.",
    effects: {
      healthDelta: 0,
      spDelta: 0,
      sheepDelta: 0,
      condition: "LARGE_HERD_PENALTY",
      conditionThreshold: 5,
      conditionValue: -2,
    },
    immuneFactions: [],
    phaseWeights: { early: 1, mid: 6, late: 8 },
  },
  {
    id: "evt_drought",
    title: "Prolonged Drought",
    type: "negative",
    description:
      "Water scarcity damages the ecosystem. -2 Pasture Health, -1 SP for all factions.",
    effects: { healthDelta: -2, spDelta: -1, sheepDelta: 0 },
    immuneFactions: ["island_alliance"],
    phaseWeights: { early: 3, mid: 6, late: 8 },
  },
  {
    id: "evt_wildfire",
    title: "Wildfire Shock",
    type: "negative",
    description:
      "Wildfire destroys grazing land. -3 Pasture Health and -1 Sheep for all factions.",
    effects: { healthDelta: -3, spDelta: 0, sheepDelta: -1 },
    immuneFactions: ["island_alliance"],
    phaseWeights: { early: 2, mid: 5, late: 9 },
  },
  {
    id: "evt_pandemic_supply",
    title: "Supply Chain Disruption",
    type: "negative",
    description:
      'Logistics collapse hurts over-expanded factions. Factions choosing "Expand" lose 2 Sheep.',
    effects: {
      healthDelta: 0,
      spDelta: 0,
      sheepDelta: 0,
      condition: "EXPAND_PENALTY_SHEEP",
      conditionValue: -2,
    },
    immuneFactions: [],
    phaseWeights: { early: 2, mid: 6, late: 8 },
  },

  // Neutral/Mixed Events
  {
    id: "evt_tech_transition",
    title: "Technological Transition",
    type: "neutral",
    description:
      'Industry shifts. -1 Sheep for everyone, but +2 SP for "Industrial Syndicate" and "Development community".',
    effects: {
      healthDelta: 0,
      spDelta: 0,
      sheepDelta: -1,
      specificFactionSp: { industrial: 2, development: 2 },
    },
    immuneFactions: [],
    phaseWeights: { early: 5, mid: 5, late: 5 },
  },
  {
    id: "evt_policy_shift",
    title: "Policy Shift",
    type: "neutral",
    description:
      "Temporary regulation tightens production. -1 Sheep for all, +1 SP for all.",
    effects: { healthDelta: 0, spDelta: 1, sheepDelta: -1 },
    immuneFactions: [],
    phaseWeights: { early: 4, mid: 6, late: 6 },
  },
  {
    id: "evt_public_pressure",
    title: "Public Pressure Wave",
    type: "neutral",
    description:
      "Public opinion punishes large herd holders. Factions with 5+ Sheep lose 2 Sheep.",
    effects: {
      healthDelta: 0,
      spDelta: 0,
      sheepDelta: 0,
      condition: "LARGE_HERD_PENALTY",
      conditionThreshold: 5,
      conditionValue: -2,
    },
    immuneFactions: [],
    phaseWeights: { early: 3, mid: 5, late: 7 },
  },
];
