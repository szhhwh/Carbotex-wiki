import type { MediaImage } from "../../components/media/MediaImage";
import { mediaRoot } from "./EducationAssets";

export const cellTownStorybook = `${mediaRoot}/2-2-4-2-storybook.pdf`;
export const sdgsWorkshopGuide = `${mediaRoot}/6-4-1-sdgs-based-workshop-guide.pdf`;

function localMedia(
  id: string,
  src: string,
  alt: string,
  width: number,
  height: number,
  caption?: string,
): MediaImage {
  return {
    id,
    src,
    alt,
    ratio: `${width} / ${height}`,
    caption,
  };
}

export const chapter01Figure2Composite = {
  id: "chapter-01-figure-2",
  src: `${mediaRoot}/1-3-figure-2.avif`,
  alt: "Figure 2 composite: A, three pre-outreach speaker-training sessions; B, academic backgrounds of 171 outreach speakers.",
  ratio: "1366 / 768",
};

export const chapter01Figure3Composite = {
  id: "chapter-01-figure-3",
  src: `${mediaRoot}/1-4-1-figure-3.avif`,
  alt: "Figure 3 composite: A, geographic coverage across China; B, age distribution; C, occupational composition; D, gender distribution.",
  ratio: "735 / 735",
};

export const chapter01Figure4Composite = {
  id: "chapter-01-figure-4",
  src: `${mediaRoot}/1-4-2-figure-4.avif`,
  alt: "Figure 4 composite: A, changes in understanding before and after the lecture; B, audience-reported learning outcomes; C, perceived contributions of synthetic biology.",
  ratio: "1366 / 768",
};

export const chapter02ActivityTwo: MediaImage[] = [
  localMedia(
    "chapter-02-activity-two-1",
    `${mediaRoot}/2-3-2-action-01.avif`,
    "A teacher introducing the Sticky Magic activity to kindergarten children",
    1600,
    1200,
    "Introducing the Sticky Magic activity.",
  ),
  localMedia(
    "chapter-02-activity-two-2",
    `${mediaRoot}/2-3-2-action-02.avif`,
    "Children preparing okra to make natural glue",
    1600,
    1200,
    "Preparing okra for the natural glue.",
  ),
  localMedia(
    "chapter-02-activity-two-3",
    `${mediaRoot}/2-3-2-action-03.avif`,
    "Children examining okra mucilage and collage materials",
    810,
    1440,
    "Examining the sticky material.",
  ),
  localMedia(
    "chapter-02-activity-two-4",
    `${mediaRoot}/2-3-2-action-04.avif`,
    "A child drawing a picture for a nature collage",
    1279,
    1427,
    "Creating a picture for the collage.",
  ),
  localMedia(
    "chapter-02-activity-two-5",
    `${mediaRoot}/2-3-2-action-05.avif`,
    "A child using homemade okra glue to attach flowers to a collage",
    1600,
    1259,
    "Applying the homemade glue.",
  ),
];

export const chapter03Figure5: MediaImage[] = [
  localMedia(
    "chapter-03-fig5-a",
    `${mediaRoot}/fig5-answer-questions.avif`,
    "Students identifying DNA as the code of life through progressively revealed clues",
    1600,
    1200,
  ),
  localMedia(
    "chapter-03-fig5-b-01",
    `${mediaRoot}/fig5-assembly-01.avif`,
    "Students assembling a DNA model using complementary base-pairing rules",
    1600,
    1200,
  ),
  localMedia(
    "chapter-03-fig5-b-02",
    `${mediaRoot}/fig5-assembly-02.avif`,
    "A second view of students completing the DNA assembly task",
    1600,
    1200,
  ),
];

export const chapter06Figure6Composite = {
  id: "chapter-06-figure-6",
  src: `${mediaRoot}/6-3-2-figure-6.avif`,
  alt: "Figure 6 composite: A, participants reading the Initial Investigation Dossier; B, examining displayed samples; C, playing the genetic dossier card game; D, using the RNA deduction worksheet; E, conducting a simulated safe experiment; F, making a final decision; G, a previous-round player leading the debriefing.",
  ratio: "1366 / 768",
};

export const chapter08Figure15Composite = {
  id: "chapter-08-figure-15",
  src: `${mediaRoot}/8-figure-15.avif`,
  alt: "Figure 15 composite showing six WeChat posts about the project, synthetic biology, outreach, the escape-room activity, research visits, and team exchanges.",
  ratio: "1366 / 768",
};

export const chapter08Figure16Composite = {
  id: "chapter-08-figure-16",
  src: `${mediaRoot}/figure-16.avif`,
  alt: "Figure 16 composite: A, cartoon fermentation-vessel illustrations; B, team logo; C, original cartoon characters including the mascot; D, acrylic badges and a shaker-shaped keychain.",
  ratio: "1366 / 768",
};
