import { Children, Fragment, isValidElement, type ReactNode } from "react";
import { ihpImageDimensions } from "../../data/ihp-image-dimensions.data";
import { Caption } from "../media/Caption";
import { Figure } from "../media/Figure";
import { ImageGallery } from "../media/ImageGallery";
import { CapabilityMatrix } from "./CapabilityMatrix";
import { CollaboratorGrid } from "./CollaboratorGrid";
import { CostBreakdown } from "./CostBreakdown";
import { DecisionCards } from "./DecisionCards";
import { FlowChain } from "./FlowChain";
import { MetricBand } from "./MetricBand";
import { ProcessTimeline } from "./ProcessTimeline";
import { RelatedWorkCard } from "./RelatedWorkCard";
import { SdgFlipCards } from "./SdgFlipCards";
import { StakeholderMatrix } from "./StakeholderMatrix";
import { StakeholderNavigator } from "./StakeholderNavigator";
import { TraceCycle } from "./TraceCycle";
import type {
  IhpCollaborator,
  IhpContentPart,
  IhpPart,
  IhpStakeholderGroup,
  IhpTracePart,
} from "./ihp-types";
import styles from "./ihp-content.module.css";

export interface StoryMeta {
  group: string;
  impact: string;
}

function cleanTraceText(value: string) {
  return value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*|__|[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanTraceTitle(value: string) {
  return cleanTraceText(value).replace(/^\d+(?:\.\d+)*[.)]?\s+/, "");
}

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(nodeText).join("");
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return nodeText(node.props.children);
  }
  return "";
}

function contentText(part: IhpContentPart) {
  const content =
    isValidElement<{ children?: ReactNode }>(part.content) &&
    part.content.type === Fragment
      ? part.content.props.children
      : part.content;
  return part.inline
    ? nodeText(content)
    : Children.toArray(content).map(nodeText).join(" ");
}

function triggerSummary(stages: IhpTracePart["stages"]) {
  const trigger = stages.find((stage) => stage.stage === "trigger");
  const text = cleanTraceText(
    (trigger?.parts ?? [])
      .filter((part): part is IhpContentPart => part.kind === "content")
      .map(contentText)
      .join(" "),
  );
  if (!text) return undefined;

  const sentences =
    text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()) ??
    [];
  return (
    [...sentences].reverse().find((sentence) => sentence.endsWith("?")) ??
    sentences[0] ??
    text
  );
}

function impactSummary(
  parts: IhpPart[],
  stories: Map<string, StoryMeta>,
): string | undefined {
  for (const part of parts) {
    if (part.kind === "anchor") {
      const story = stories.get(part.id);
      if (story?.impact) return story.impact;
    }
    if (part.kind === "related") {
      const nested = impactSummary(part.parts, stories);
      if (nested) return nested;
    }
  }
  return undefined;
}

function traceStageSummary(stages: IhpTracePart["stages"]) {
  return (
    stages.find((stage) => stage.stage === "change" && stage.label)?.label ??
    stages.find((stage) => stage.stage === "evaluate" && stage.label)?.label
  );
}

function mediaSizing(src: string, fallbackRatio: string) {
  const dimensions = ihpImageDimensions(src);
  return dimensions
    ? {
        intrinsicWidth: dimensions[0],
        intrinsicHeight: dimensions[1],
      }
    : { ratio: fallbackRatio };
}

interface IhpPartsProps {
  parts: IhpPart[];
  groups: IhpStakeholderGroup[];
  collaborators: IhpCollaborator[];
  stories: Map<string, StoryMeta>;
  labelLevel?: 3 | 4;
  traceFallbackTitle?: string;
}

export function IhpParts({
  parts,
  groups,
  collaborators,
  stories,
  labelLevel = 4,
  traceFallbackTitle,
}: IhpPartsProps) {
  const renderParts = (nested: IhpPart[]): ReactNode => (
    <IhpParts
      parts={nested}
      groups={groups}
      collaborators={collaborators}
      stories={stories}
      labelLevel={labelLevel}
      traceFallbackTitle={traceFallbackTitle}
    />
  );
  let latestLabel = cleanTraceTitle(traceFallbackTitle ?? "TRACE cycle");

  return (
    <>
      {parts.map((part, index) => {
        switch (part.kind) {
          case "content": {
            const ContentWrapper = part.inline ? "span" : "div";
            return (
              <ContentWrapper
                className={styles.markdown}
                key={`content-${index}`}
              >
                {part.content}
              </ContentWrapper>
            );
          }
          case "figure":
            return (
              <Figure
                key={`figure-${index}`}
                src={part.src}
                alt={part.alt}
                {...mediaSizing(part.src, part.ratio)}
                caption={part.caption}
                frame={part.frame}
                captionClassName={
                  part.captionAlign === "center"
                    ? styles.centeredCaption
                    : undefined
                }
                captionPrefix={
                  part.figureNumber ? (
                    <>Figure {part.figureNumber}.</>
                  ) : undefined
                }
                fallback="Image unavailable."
              />
            );
          case "gallery": {
            const altCounts = new Map<string, number>();
            for (const image of part.images) {
              altCounts.set(image.alt, (altCounts.get(image.alt) ?? 0) + 1);
            }
            return (
              <ImageGallery
                key={`gallery-${index}`}
                images={part.images.map((image, imageIndex) => ({
                  ...image,
                  ...mediaSizing(image.src, part.ratio),
                  alt:
                    (altCounts.get(image.alt) ?? 0) > 1
                      ? `${image.alt.replace(/[.\s]+$/, "")}. Photograph ${
                          imageIndex + 1
                        } of ${part.images.length}.`
                      : image.alt,
                }))}
                label={part.caption || "Project evidence"}
                columns={part.columns}
                captionPrefix={
                  part.figureNumber ? (
                    <>Figure {part.figureNumber}.</>
                  ) : undefined
                }
                caption={part.caption}
              />
            );
          }
          case "anchor": {
            const story = stories.get(part.id);
            if (story) {
              return (
                <div
                  className={styles.storyMarker}
                  id={part.id}
                  key={`anchor-${part.id}`}
                  role="note"
                  aria-label={`${story.group}: ${story.impact}`}
                  tabIndex={-1}
                >
                  <span className={styles.storyImpact}>{story.impact}</span>
                </div>
              );
            }
            const nextPart = parts[index + 1];
            const nextLabel =
              nextPart?.kind === "label"
                ? nextPart.text.replace(/^—\s*/, "")
                : "Related story";
            return (
              <span
                aria-label={part.label ?? nextLabel}
                className={styles.anchorTarget}
                id={part.id}
                key={`anchor-${part.id}`}
                role="group"
                tabIndex={-1}
              />
            );
          }
          case "label": {
            const LabelHeading = labelLevel === 3 ? "h3" : "h4";
            latestLabel = cleanTraceText(part.text);
            if (parts[index + 1]?.kind === "trace") {
              return (
                <LabelHeading
                  aria-hidden="true"
                  hidden
                  id={part.id}
                  key={`label-${index}`}
                >
                  {part.text.replace(/^—\s*/, "")}
                </LabelHeading>
              );
            }
            return (
              <LabelHeading
                className={styles.inlineLabel}
                data-level={labelLevel}
                id={part.id}
                key={`label-${index}`}
              >
                {part.text.replace(/^—\s*/, "")}
              </LabelHeading>
            );
          }
          case "flow":
            return <FlowChain key={`flow-${index}`} steps={part.steps} />;
          case "metrics":
            return <MetricBand key={`metrics-${index}`} {...part} />;
          case "trace":
            return (
              <TraceCycle
                key={`trace-${part.number}`}
                number={part.number}
                title={latestLabel || `TRACE cycle ${part.number}`}
                triggerSummary={triggerSummary(part.stages)}
                impactSummary={
                  impactSummary(
                    part.stages.flatMap((stage) => stage.parts),
                    stories,
                  ) ?? traceStageSummary(part.stages)
                }
                stages={part.stages}
                outro={part.outro}
                renderParts={renderParts}
              />
            );
          case "related":
            return (
              <RelatedWorkCard
                key={`related-${index}`}
                title={part.title}
                href={part.href}
                linkLabel={part.linkLabel}
              >
                {renderParts(part.parts)}
              </RelatedWorkCard>
            );
          case "epigraph":
            return (
              <figure className={styles.epigraph} key="epigraph">
                <img
                  className={styles.epigraphCover}
                  src="https://static.igem.wiki/teams/6147/wiki/book.avif"
                  alt="Book of Rites — opening quotation"
                  loading="lazy"
                  decoding="async"
                />
                <blockquote>
                  <p>
                    <em>
                      “Studying alone without peers for discussion renders one
                      shallow and ill-informed.”
                    </em>
                  </p>
                </blockquote>
                <Caption>
                  — <em>The Book of Rites</em>
                </Caption>
              </figure>
            );
          case "decisions":
            return <DecisionCards key="decisions" />;
          case "stakeholder-matrix":
            return <StakeholderMatrix key="stakeholder-matrix" />;
          case "navigator":
            return <StakeholderNavigator groups={groups} key="navigator" />;
          case "collaborators":
            return (
              <CollaboratorGrid
                collaborators={collaborators}
                stakeholderCount={groups.reduce(
                  (total, group) => total + group.stakeholders.length,
                  0,
                )}
                key="collaborators"
              />
            );
          case "sdg-cards":
            return <SdgFlipCards key="sdg-cards" />;
          case "capability-matrix":
            return <CapabilityMatrix key="capability-matrix" />;
          case "cost-breakdown":
            return <CostBreakdown key="cost-breakdown" />;
          case "process-timeline":
            return <ProcessTimeline key="process-timeline" />;
          default:
            return null;
        }
      })}
    </>
  );
}
