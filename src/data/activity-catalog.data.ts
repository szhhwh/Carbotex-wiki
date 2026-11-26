export type ActivityId = "dna" | "fermentation" | "esg";

export interface ActivityDefinition {
  id: ActivityId;
  title: string;
  summary: string;
  detail: string;
  source: string;
  readySelector: string;
}

export const ACTIVITIES: ActivityDefinition[] = [
  {
    id: "dna",
    title: "DNA builder",
    summary:
      "Assemble nucleotides into a DNA strand, inspect the base pairs, and explore the double helix in two and three dimensions.",
    detail: "2D bench · 3D helix · base pairing",
    source: `${import.meta.env.BASE_URL}activities/dna/index.html`,
    readySelector: "#assembly-board",
  },
  {
    id: "fermentation",
    title: "Fermentation map",
    summary:
      "Explore fermented foods across 34 province-level regions and compare the microbial conditions that shape familiar fermentation traditions.",
    detail: "34 regions · virtual lab",
    source: `${import.meta.env.BASE_URL}activities/fermentation-map/index.html`,
    readySelector: "#china-map",
  },
  {
    id: "esg",
    title: "ESG game",
    summary:
      "Play five factions sharing one pasture, negotiate trade-offs, and see how collective decisions change ecosystem health and sustainability scores.",
    detail: "5 factions · shared pasture · round-based play",
    source: `${import.meta.env.BASE_URL}activities/esg-game/index.html`,
    readySelector: "#round-display",
  },
];
