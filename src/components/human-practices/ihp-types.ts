import type { ReactNode } from "react";

export type TraceStageId =
  | "trigger"
  | "reach-out"
  | "analyze"
  | "change"
  | "evaluate";

export interface IhpFigurePart {
  kind: "figure";
  src: string;
  alt: string;
  ratio: string;
  caption?: string;
  figureNumber?: number;
  frame?: "none";
}

export interface IhpGalleryPart {
  kind: "gallery";
  images: Array<{ src: string; alt: string }>;
  columns: 2 | 3 | 4;
  ratio: string;
  caption?: string;
  figureNumber?: number;
}

export interface IhpAnchorPart {
  kind: "anchor";
  id: string;
  label?: string;
}

export interface IhpLabelPart {
  kind: "label";
  text: string;
  id?: string;
}

export interface IhpFlowPart {
  kind: "flow";
  steps: string[];
}

export interface IhpMetricsPart {
  kind: "metrics";
  label: string;
  items: Array<{
    value: string;
    label: string;
    detail?: string;
  }>;
}

export interface IhpTracePart {
  kind: "trace";
  number: number;
  stages: Array<{
    stage: TraceStageId;
    label?: string;
    parts: IhpPart[];
  }>;
  /** Content shown after the TRACE stages, still inside the collapsible panel. */
  outro?: IhpPart[];
}

export interface IhpRelatedPart {
  kind: "related";
  title: string;
  parts: IhpPart[];
  href?: string;
  linkLabel?: string;
}

export interface IhpContentPart {
  kind: "content";
  inline: boolean;
  content: ReactNode;
}

export type IhpSpecialPartKind =
  | "epigraph"
  | "decisions"
  | "navigator"
  | "collaborators"
  | "sdg-cards"
  | "capability-matrix"
  | "cost-breakdown"
  | "process-timeline";

export type IhpPart =
  | IhpContentPart
  | IhpFigurePart
  | IhpGalleryPart
  | IhpAnchorPart
  | IhpLabelPart
  | IhpFlowPart
  | IhpMetricsPart
  | IhpTracePart
  | IhpRelatedPart
  | {
      kind: IhpSpecialPartKind;
    };

export interface IhpSubsectionContent {
  id: string;
  title: string;
  parts: IhpPart[];
}

export interface IhpSectionContent {
  id: string;
  title: string;
  parts: IhpPart[];
  subsections: IhpSubsectionContent[];
}

export interface IhpStakeholder {
  name: string;
  portrait: string;
  identity: string;
  question: string;
  impact: string;
  why: string;
  heard: string;
  changed: string;
  led: string;
  storyHref: string;
}

export interface IhpStakeholderGroup {
  title: string;
  description: string;
  stakeholders: IhpStakeholder[];
}

export interface IhpCollaborator {
  name: string;
  description: string;
  href: string;
}
