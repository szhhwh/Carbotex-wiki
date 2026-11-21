import { useState } from "react";
import { Caption } from "../../../components/media/Caption";
import styles from "../education.module.css";
import { mediaRoot } from "./education-assets.data";
import { weaveVisualCaption } from "./PrincipleIntroContent";
import { moveTabFocus } from "./moveTabFocus";

const weaveStages = [
  [
    "wonder",
    "W",
    "Wonder",
    "Why do we design this activity?",
    "Drawing on our project and feedback from previous activities, we consider whom we intend to reach, why we seek to reach them, and why we focus on a particular topic. By identifying participants’ educational needs, questions, and knowledge gaps, we establish the purpose and direction of each activity.",
  ],
  [
    "explore",
    "E",
    "Explore",
    "How can we design for meaningful learning?",
    "We employ an objective-driven design approach to determine how scientific content, communication methods, and interactive formats can be adapted to suit different age groups.",
  ],
  [
    "action",
    "A",
    "Action",
    "How do we bring the design to life?",
    "We translate our objectives into practical actions, both online and offline.",
  ],
  [
    "verify",
    "V",
    "Verify",
    "What did participants gain?",
    "Through participant feedback and other forms of evaluation, we assess whether the activity achieved its intended objectives and what participants gained from it.",
  ],
  [
    "echo",
    "E",
    "Echo",
    "What can we improve next?",
    "Driven by a Feedback–Reflection–Evolution cycle, we gather participant feedback, assess the limitations of our outreach, and translate these insights into actionable adjustments—implementing, evaluating, and refining them across subsequent iterations.",
  ],
] as const;

export function WeaveFramework() {
  const [activeId, setActiveId] = useState("wonder");

  return (
    <div className={styles.weaveLayout}>
      <figure className={styles.weaveFigure}>
        <div className={styles.weaveShape}>
          <img
            alt="Circular Huandaiwen-inspired emblem of interwoven teal, green and gold ribbons, with a microbe, a wheel-like motif, a flowering sprout and a smiling round character woven into the loops."
            className={styles.weaveImage}
            decoding="async"
            height={1693}
            loading="lazy"
            src={`${mediaRoot}/visual-weave.avif`}
            width={1667}
          />
        </div>
        <Caption prefix="Figure 1.">{weaveVisualCaption}</Caption>
      </figure>
      <div className={styles.weaveControls}>
        <div
          className={styles.weaveTabs}
          role="tablist"
          aria-label="WEAVE stages"
        >
          {weaveStages.map(([id, letter, title]) => (
            <button
              aria-controls={`weave-panel-${id}`}
              aria-selected={activeId === id}
              className={styles.weaveTab}
              id={`weave-tab-${id}`}
              key={id}
              onClick={() => setActiveId(id)}
              onKeyDown={(event) =>
                moveTabFocus(event, (index) =>
                  setActiveId(weaveStages[index][0]),
                )
              }
              role="tab"
              tabIndex={activeId === id ? 0 : -1}
              type="button"
            >
              <span>{letter}</span>
              {title}
            </button>
          ))}
        </div>
        {weaveStages.map(([id, , , question, body]) => (
          <div
            className={styles.weavePanel}
            aria-labelledby={`weave-tab-${id}`}
            data-active={activeId === id}
            hidden={activeId !== id}
            id={`weave-panel-${id}`}
            key={id}
            role="tabpanel"
          >
            <div className={styles.weavePanelBody}>
              <h4>{question}</h4>
              <p>{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
