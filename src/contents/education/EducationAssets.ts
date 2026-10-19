import type { MediaImage } from "../../components/media/MediaImage";

export const mediaRoot = "https://static.igem.wiki/teams/6147/wiki/education";

export function media(
  id: string,
  filename: string,
  alt: string,
  caption?: string,
): MediaImage {
  return {
    id,
    src: `${mediaRoot}/${filename}`,
    alt,
    ratio: "4 / 3",
    caption,
  };
}
