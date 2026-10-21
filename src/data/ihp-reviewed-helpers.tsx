import { IhpRichText } from "../components/human-practices/IhpRichText";
import type {
  IhpContentPart,
  IhpFigurePart,
  IhpGalleryPart,
  IhpLabelPart,
  IhpPart,
} from "../components/human-practices/ihp-types";

export function rich(text: string, inline = false): IhpContentPart {
  return {
    kind: "content",
    inline,
    content: <IhpRichText inline={inline}>{text}</IhpRichText>,
  };
}

export function anchor(id: string, label?: string): IhpPart {
  return { kind: "anchor", id, label };
}

export function label(text: string, id?: string): IhpLabelPart {
  return { kind: "label", text, id };
}

export function figure(
  figureNumber: number,
  src: string,
  alt: string,
  caption: string,
  ratio: string,
): IhpFigurePart {
  return {
    kind: "figure",
    src,
    alt,
    ratio,
    caption,
    figureNumber,
  };
}

export function gallery(
  figureNumber: number,
  images: IhpGalleryPart["images"],
  caption: string,
  columns: IhpGalleryPart["columns"] = 2,
  ratio = "345 / 260",
): IhpGalleryPart {
  return {
    kind: "gallery",
    images,
    columns,
    ratio,
    caption,
    figureNumber,
  };
}
