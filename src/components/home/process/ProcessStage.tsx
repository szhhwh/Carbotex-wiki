import { useLayoutEffect, useRef, type CSSProperties } from "react";
import clsx from "clsx";
import { staticHomeAsset } from "../../../utils/staticAsset";
import { useHomeMotion } from "../motion";
import {
  FIELD_HEIGHT,
  FIELD_SUGARS,
  FIELD_WIDTH,
  HAYSTACK_CLUSTERS,
  YEAST_COUNT,
} from "./process-field";
import {
  BOTTLE_RIBBON_SWEEPS,
  MALIC_SWEEPS,
  RIBBON_HEIGHT,
  TIME,
  YEAST_INITIAL_POSE,
  YEAST_POSES,
} from "./process-stage-data";
import { animateProcessStage } from "./process-stage-animation";
import { SweepRevealImage } from "./SweepRevealImage";
import styles from "./process-stage.module.css";

/** Uploaded artwork: flat files in the wiki's home/ upload folder. */
const haystacksUrl = staticHomeAsset("haystacks.svg");
const hillsUrl = staticHomeAsset("hills.svg");
/** Two source folders used this name; the upload prefixed the folder. */
const thermocellumUrl = staticHomeAsset("home-p7-thermocellum.svg");
const bubbles1Url = staticHomeAsset("bubbles-1.svg");
const bubbles2Url = staticHomeAsset("bubbles-2.svg");
const bubbles3Url = staticHomeAsset("bubbles-3.svg");
const bubbles4Url = staticHomeAsset("bubbles-4.svg");
const bubbles5Url = staticHomeAsset("bubbles-5.svg");
const glueBagUrl = staticHomeAsset("glue-bag.svg");
const glueBottleRibbonUrl = staticHomeAsset("glue-bottle-ribbon.svg");
const glueBottleUrl = staticHomeAsset("glue-bottle.svg");
const malicRibbonUrl = staticHomeAsset("malic-ribbon.svg");
const shadowUrl = staticHomeAsset("shadow.svg");
const waveUrl = staticHomeAsset("wave.svg");
const yeastPainterUrl = staticHomeAsset("yeast-painter.svg");
const BUBBLE_GROUPS = [
  { src: bubbles1Url, width: 73.61, height: 231.75, left: 4, top: 30 },
  { src: bubbles2Url, width: 204.47, height: 355.11, left: 14, top: 8 },
  { src: bubbles3Url, width: 158.21, height: 247.49, left: 76, top: 22 },
  { src: bubbles4Url, width: 106.03, height: 260.13, left: 88, top: 4 },
  { src: bubbles5Url, width: 164.05, height: 141.02, left: 56, top: 0 },
] as const;
/** Loose single bubbles (percent of the bubble area; size in group units). */
const LOOSE_BUBBLES = [
  [2, 70, 18],
  [9, 52, 11],
  [21, 78, 15],
  [27, 40, 9],
  [33, 64, 13],
  [62, 70, 10],
  [68, 44, 16],
  [73, 82, 12],
  [81, 60, 9],
  [92, 74, 14],
  [96, 38, 10],
  [44, 18, 8],
] as const;

export function ProcessStage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const motion = useHomeMotion();

  useLayoutEffect(
    () => animateProcessStage(trackRef.current!, motion),
    [motion],
  );

  return (
    <div
      ref={trackRef}
      className={styles.track}
      style={{ "--process-track-units": TIME.end } as CSSProperties}
    >
      <div className={styles.stage} data-stage="">
        <div className={styles.world} data-world="">
          <FirstStage />
          <SecondStage />
        </div>
      </div>
    </div>
  );
}

function FirstStage() {
  return (
    <section className={styles.firstStage} data-first-stage="">
      <p className={clsx(styles.copy, styles.firstCopy)} data-first-copy="">
        <span>In the first stage,</span>{" "}
        <span>
          engineered <i>Clostridium thermocellum</i> simultaneously hydrolyzes
          the lignocellulose
        </span>{" "}
        <span>in straw into glucose and xylose.</span>
      </p>
      <div className={styles.firstScene} data-first-scene="">
        <img
          className={clsx(styles.art, styles.hills)}
          src={hillsUrl}
          width={1921.76}
          height={225.24}
          alt=""
          draggable={false}
          data-hills=""
        />
        <div className={styles.field} data-field="">
          {HAYSTACK_CLUSTERS.map((cluster, index) => {
            const width = cluster.x1 - cluster.x0;
            return (
              <div
                key={cluster.x0}
                className={styles.haystack}
                style={{
                  left: `${(cluster.x0 / FIELD_WIDTH) * 100}%`,
                  width: `${(width / FIELD_WIDTH) * 100}%`,
                }}
                data-haystack={index}
              >
                <img
                  className={styles.art}
                  src={haystacksUrl}
                  width={FIELD_WIDTH}
                  height={FIELD_HEIGHT}
                  alt=""
                  draggable={false}
                  style={{
                    left: `${(-cluster.x0 / width) * 100}%`,
                    width: `${(FIELD_WIDTH / width) * 100}%`,
                  }}
                />
              </div>
            );
          })}
          {FIELD_SUGARS.map((sugar, index) => (
            <div
              key={sugar.id}
              className={styles.sugar}
              style={{
                left: `${sugar.left}%`,
                top: `${sugar.top}%`,
                width: `${sugar.width}%`,
                opacity: sugar.src.includes("beige") ? 0.85 : undefined,
              }}
              data-sugar={index}
            >
              <img
                className={styles.art}
                src={sugar.src}
                alt=""
                draggable={false}
                style={{ width: "100%" }}
              />
            </div>
          ))}
          <div className={styles.thermo} data-thermo="">
            <div data-thermo-bob="">
              <img
                className={styles.art}
                src={thermocellumUrl}
                width={279.92}
                height={413.75}
                alt=""
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecondStage() {
  return (
    <section className={styles.secondStage} data-second-stage="">
      <img
        className={clsx(styles.art, styles.wave)}
        src={waveUrl}
        width={1924.09}
        height={470.4}
        alt=""
        draggable={false}
      />
      <div className={styles.secondContent}>
        <p className={clsx(styles.copy, styles.secondCopy)} data-second-copy="">
          In the second stage, the engineered marine yeast{" "}
          <i>Aureobasidium pullulans</i> A08 is used. By overexpressing
          AraR/XlnR, xylose utilization is significantly enhanced, while
          overexpression of the best-performing PYC gene increases malic acid
          precursor supply, efficiently converting the mixed sugars into
          high-molecular-weight polymalic acid.
        </p>
        <div className={styles.yeastRow} data-yeast-row="">
          {Array.from({ length: YEAST_COUNT }, (_, slot) => (
            <div
              key={slot}
              className={styles.yeastSlot}
              style={{ "--slot": slot } as CSSProperties}
              data-yeast-slot={slot}
            >
              <div>
                {YEAST_POSES.map((pose, poseIndex) => (
                  <img
                    key={pose.src}
                    className={clsx(styles.art, styles.pose)}
                    src={pose.src}
                    width={pose.width}
                    height={pose.height}
                    alt=""
                    draggable={false}
                    style={
                      {
                        "--pose-width": `${(pose.width / 266.53) * 100}%`,
                      } as CSSProperties
                    }
                    data-pose={poseIndex}
                    data-initial={
                      YEAST_INITIAL_POSE[slot] === poseIndex ? "" : undefined
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.ribbonGroup} data-ribbon-group="">
          <div className={styles.ribbon} data-ribbon="">
            <SweepRevealImage
              className={styles.ribbonArt}
              src={malicRibbonUrl}
              width={1747.1}
              height={RIBBON_HEIGHT}
              sweeps={MALIC_SWEEPS}
            />
          </div>
          <div className={styles.painter} data-painter="">
            <div data-painter-brush="" style={{ transformOrigin: "8% 20%" }}>
              <img
                className={styles.art}
                src={yeastPainterUrl}
                width={432.37}
                height={371.19}
                alt=""
                draggable={false}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <img
            className={clsx(styles.art, styles.shadow)}
            src={shadowUrl}
            width={586.72}
            height={169.6}
            alt=""
            draggable={false}
            data-shadow=""
          />
          <img
            className={clsx(styles.art, styles.bottle)}
            src={glueBottleUrl}
            width={297.7}
            height={792.94}
            alt=""
            draggable={false}
            data-bottle=""
          />
          <img
            className={clsx(styles.art, styles.bag)}
            src={glueBagUrl}
            width={463.58}
            height={594.52}
            alt=""
            draggable={false}
            data-bag=""
          />
          <SweepRevealImage
            className={clsx(styles.art, styles.bottleRibbon)}
            src={glueBottleRibbonUrl}
            width={296.68}
            height={104.6}
            sweeps={BOTTLE_RIBBON_SWEEPS}
            data-bottle-ribbon=""
          />
          <div className={styles.bubbles} data-bubbles="">
            {BUBBLE_GROUPS.map((group) => (
              <img
                key={group.src}
                className={clsx(styles.art, styles.bubbleGroup)}
                src={group.src}
                width={group.width}
                height={group.height}
                alt=""
                draggable={false}
                style={
                  {
                    left: `${group.left}%`,
                    top: `${group.top}%`,
                    "--bubble-width": `${(group.width / 1153) * 100}%`,
                  } as CSSProperties
                }
                data-bubble=""
              />
            ))}
            {LOOSE_BUBBLES.map(([left, top, size]) => (
              <span
                key={`${left}-${top}`}
                className={styles.bubble}
                style={
                  {
                    left: `${left}%`,
                    top: `${top}%`,
                    "--bubble-size": `${(size / 1153) * 100}%`,
                  } as CSSProperties
                }
                data-bubble=""
              />
            ))}
          </div>
        </div>
        <p className={clsx(styles.copy, styles.finalCopy)} data-final-copy="">
          Finally, we crosslink the polymalic acid with dopamine to obtain a
          novel green bioadhesive.
        </p>
      </div>
    </section>
  );
}
