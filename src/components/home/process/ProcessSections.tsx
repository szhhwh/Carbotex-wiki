import { ProcessComparison } from "./ProcessComparison";
import { ProcessStage } from "./ProcessStage";

/**
 * Home P7–P10: the two-stage process (straw → sugars → yeast → bioadhesive)
 * as one sticky, scroll-scrubbed stage, followed by the comparison cards.
 * Expects the page's shared Lenis/ScrollTrigger loop; creates none itself.
 */
export function ProcessSections() {
  return (
    <>
      <ProcessStage />
      <ProcessComparison />
    </>
  );
}
