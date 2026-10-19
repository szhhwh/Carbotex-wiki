import { events } from "../data/events.js";

export class EventEngine {
  constructor() {
    this.events = events;
  }

  drawEvent(round, pastureHealth) {
    let phase = "early";
    if (round > 2 && round <= 4) phase = "mid";
    if (round > 4) phase = "late";

    if (pastureHealth < 5 && phase !== "late") {
      phase = "late";
    }

    const availableEvents = this.events.filter((e) => {
      return e.phaseWeights && e.phaseWeights[phase] > 0;
    });

    if (availableEvents.length === 0) return null;

    const totalWeight = availableEvents.reduce(
      (sum, e) => sum + e.phaseWeights[phase],
      0,
    );
    let random = Math.random() * totalWeight;

    for (const event of availableEvents) {
      random -= event.phaseWeights[phase];
      if (random <= 0) {
        return event;
      }
    }

    return availableEvents[0];
  }
}
