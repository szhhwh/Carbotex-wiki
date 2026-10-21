import type { MediaImage } from "../../components/media/MediaImage";

export const mediaRoot = "https://static.igem.wiki/teams/6147/wiki/education";

type ImageDimensions = readonly [
  intrinsicWidth: number,
  intrinsicHeight: number,
];

// Source dimensions keep media boxes stable before remote images finish loading.
const EDUCATION_IMAGE_DIMENSIONS: Record<string, ImageDimensions> = {
  "1-3-action-01.avif": [3648, 2736],
  "1-3-action-02.avif": [1706, 1279],
  "1-3-action-03.avif": [4000, 3000],
  "1-3-action-04.avif": [528, 382],
  "1-3-action-05.avif": [586, 367],
  "1-3-action-06.avif": [3000, 4000],
  "2-2-4-art-gallert-05.avif": [1279, 1289],
  "2-2-4-art-gallery-01.avif": [1279, 1419],
  "2-2-4-art-gallery-02.avif": [1279, 1706],
  "2-2-4-art-gallery-03.avif": [1364, 1279],
  "2-2-4-art-gallery-04.avif": [1279, 1484],
  "2-2-4-art-gallery-06.avif": [1279, 1427],
  "2-2-4-art-gallery-07.avif": [1279, 1498],
  "2-2-4-art-gallery-08.avif": [1306, 1279],
  "2-2-action-1.avif": [1279, 1706],
  "2-2-action-2.avif": [1706, 1279],
  "2-2-action-3.avif": [4000, 3000],
  "2-2-action-4.avif": [1792, 1280],
  "2-2-action-5.avif": [1706, 1279],
  "2-3-2-action-01.avif": [4000, 3000],
  "2-3-2-action-02.avif": [1705, 1279],
  "2-3-2-action-03.avif": [810, 1440],
  "2-3-2-action-04.avif": [1279, 1427],
  "2-3-2-action-05.avif": [1625, 1279],
  "2-3-4-art-gallery-01.avif": [1294, 1279],
  "2-3-4-art-gallery-02.avif": [1379, 1279],
  "2-3-4-art-gallery-03.avif": [1279, 1301],
  "2-3-4-art-gallery-04.avif": [1279, 1300],
  "2-3-4-art-gallery-05.avif": [1279, 1706],
  "3-3-activity-1-01.avif": [1707, 1280],
  "3-3-activity-1-02.avif": [3412, 2558],
  "3-3-activity-1-03.avif": [1706, 1279],
  "3-3-activity-1-04.avif": [3412, 2558],
  "3-3-activity-1-05.avif": [1706, 1279],
  "3-3-activity-1-06.avif": [1706, 1279],
  "3-3-activity-2-01.avif": [1706, 1279],
  "3-3-activity-2-02.avif": [1280, 960],
  "3-3-activity-2-03.avif": [1706, 1279],
  "3-3-activity-2-04.avif": [4000, 3000],
  "4-3-action-01.avif": [1736, 1279],
  "4-3-action-02.avif": [4000, 3000],
  "4-3-action-03.avif": [3694, 2764],
  "5-2-1-chassis-selection.avif": [1274, 522],
  "5-2-1-production.avif": [1274, 226],
  "5-2-1-redesign.avif": [1274, 427],
  "5-3-action-01.avif": [4000, 3000],
  "5-3-action-02.avif": [4000, 3000],
  "5-3-action-03.avif": [4000, 3000],
  "5-3-action-04.avif": [1706, 1279],
  "6-2-2-action-01.avif": [1706, 1279],
  "6-2-2-action-02.avif": [1280, 960],
  "6-2-2-action-03.avif": [1706, 1279],
  "6-2-2-action-05.avif": [1279, 1706],
  "6-2-2-action-06.avif": [1706, 1279],
  "6-2-2-actoin-04.avif": [1706, 1279],
  "6-4-2-action-01.avif": [1706, 1279],
  "6-4-2-action-02.avif": [4000, 3000],
  "6-4-2-action-03.avif": [1600, 1067],
  "7-3-action-01.avif": [546, 543],
  "7-3-action-02.avif": [561, 561],
  "7-3-action-03.avif": [2275, 1279],
  "7-3-action-04.avif": [2275, 1279],
  "7-3-action-05.avif": [1706, 1279],
  "7-3-action-06.avif": [794, 531],
  "7-3-action-07.avif": [1080, 720],
  "7-3-action-08.avif": [758, 568],
  "fig5-answer-questions.avif": [1600, 1200],
  "fig5-assembly-01.avif": [1600, 1200],
  "fig5-assembly-02.avif": [1600, 1200],
};

export function educationImageDimensions(
  filename: string,
): ImageDimensions | undefined {
  return EDUCATION_IMAGE_DIMENSIONS[filename];
}

export function media(
  id: string,
  filename: string,
  alt: string,
  caption?: string,
): MediaImage {
  const dimensions = educationImageDimensions(filename);
  if (!dimensions) {
    throw new Error(`Missing Education image dimensions for ${filename}`);
  }

  return {
    id,
    src: `${mediaRoot}/${filename}`,
    alt,
    intrinsicWidth: dimensions[0],
    intrinsicHeight: dimensions[1],
    caption,
  };
}
