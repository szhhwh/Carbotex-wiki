import { FigureWithText } from "../../components/media/FigureWithText";
import { mediaRoot } from "./EducationAssets";

export function PrincipleIntroContent() {
  return (
    <FigureWithText
      alt="Circular Huandaiwen-inspired emblem of interwoven teal, green and gold ribbons, with a microbe, a wheel-like motif, a flowering sprout and a smiling round character woven into the loops."
      caption="Visual structure of our principle."
      captionPrefix="Figure 1."
      compactMedia
      frame="none"
      intrinsicHeight={1693}
      intrinsicWidth={1667}
      maxWidth="520px"
      src={`${mediaRoot}/visual-weave.avif`}
    >
      <p>
        To ensure that our educational activities are purposeful, adaptable, and
        continuously refined, we organized them around the{" "}
        <strong>WEAVE</strong> framework:{" "}
        <strong>
          Wonder, Explore, Action, Verify, and Echo. Through this framework,
          each activity engages participants in learning while providing our
          team with valuable insights.
        </strong>
      </p>
      <p>
        The visual identity of <strong>WEAVE</strong> is inspired by{" "}
        <strong>Huandaiwen</strong>, a traditional Chinese decorative motif
        featuring flowing, interwoven ribbons. These continuous, intertwining
        forms embody the interconnected nature of WEAVE’s five stages,
        illustrating how insights and reflections flow from one activity into
        the design of the next and into our program.
      </p>
    </FigureWithText>
  );
}
