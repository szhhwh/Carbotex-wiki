import { HomeStage } from "../components/home/HomeStage";
import { ActLanding } from "../components/home/ActLanding";
import { ActPlaceholder } from "../components/home/ActPlaceholder";
import type { HomeActDef } from "../components/home/stage-math";

/**
 * Home = one central scroll stage with stacked acts (1 time unit = 100svh of
 * scroll). The landing act keeps the original 220svh/190svh rhythm via its
 * scrollLength; placeholder acts are swapped for real content in this list.
 */
const acts: HomeActDef[] = [
  {
    id: "landing",
    scrollLength: { base: 1.2, mobile: 0.9 },
    Component: ActLanding,
  },
  { id: "act-2", scrollLength: 1, Component: ActPlaceholder },
  { id: "act-3", scrollLength: 1, Component: ActPlaceholder },
  { id: "act-4", scrollLength: 1, Component: ActPlaceholder },
];

export function Home() {
  return <HomeStage acts={acts} />;
}
