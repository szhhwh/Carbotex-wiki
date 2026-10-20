import { useEffect, useState } from "react";
import styles from "./back-to-top.module.css";

const REVEAL_DISTANCE = 0.85;
const REQUEST_TOP_EVENT = "wiki:request-scroll-top";

function scrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 120) return 0;
  return Math.min(Math.max(window.scrollY / scrollable, 0), 1);
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hiddenBelowFold, setHiddenBelowFold] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = scrollProgress();
      setVisible(
        window.scrollY >= window.innerHeight * REVEAL_DISTANCE ||
          progress >= REVEAL_DISTANCE,
      );

      const active = document.activeElement;
      if (active instanceof HTMLElement && active.closest("dialog[open]")) {
        setHiddenBelowFold(true);
        return;
      }
      setHiddenBelowFold(false);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("focusin", schedule);
    document.addEventListener("focusout", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("focusin", schedule);
      document.removeEventListener("focusout", schedule);
    };
  }, []);

  const goToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const request = new CustomEvent(REQUEST_TOP_EVENT, {
      cancelable: true,
      detail: { behavior: reduceMotion ? "auto" : "smooth" },
    });
    document.dispatchEvent(request);

    // Fullscreen Home cancels the request and owns scrolling through Lenis.
    if (!request.defaultPrevented) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }

    const heading = document.querySelector<HTMLElement>("main h1, main h2, h1");
    if (!heading) return;
    if (!heading.hasAttribute("tabindex")) {
      heading.setAttribute("tabindex", "-1");
      heading.addEventListener(
        "blur",
        () => heading.removeAttribute("tabindex"),
        { once: true },
      );
    }
    // Focus now without cancelling or waiting for the smooth document scroll.
    heading.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      className={styles.button}
      data-back-to-top="true"
      data-visible={visible && !hiddenBelowFold}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible && !hiddenBelowFold ? 0 : -1}
      onClick={goToTop}
    >
      <svg
        className={styles.art}
        viewBox="0 0 482.51 347.96"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath
            id="back-to-top-clip-1"
            transform="translate(-348.1 -214.5)"
          >
            <path
              className={styles.cls1}
              d="M691.5,350.5s-.63-39,31.69-35.94a21,21,0,0,1,14.95,8c4.4,5.88,7.11,16.2.36,33.95l-6.6,18.37a325.08,325.08,0,0,0-9.52,31.78c-7.23,29.17-30.76,83.74-105.88,88.85,0,0-44.56,1.38-85.91-16.77a94.69,94.69,0,0,1-53.72-62.47c-4.91-18.51-7.61-43.35-1.37-72.76,0,0,14.17-85,121.6-86.12a138.15,138.15,0,0,1,88.95,31.29c9,7.35,16.63,15.06,24,27.33"
            />
          </clipPath>
          <clipPath
            id="back-to-top-clip-2"
            transform="translate(-348.1 -214.5)"
          >
            <path
              className={styles.cls2}
              d="M496.5,322.5s-14.95-19.22-1-37.84a38.16,38.16,0,0,1,23.87-14.61c10.52-1.87,25.21-.23,35.13,18.45"
            />
          </clipPath>
          <clipPath
            id="back-to-top-clip-3"
            transform="translate(-348.1 -214.5)"
          >
            <path
              className={styles.cls3}
              d="M453.19,480.21S420.79,453,428.4,421.8a40.83,40.83,0,0,1,14.49-22.1,67,67,0,0,1,39.94-14.48,39.44,39.44,0,0,1,33.59,17.12c6.87,10.26,12.2,26.82,9.08,53.16C518.13,517.58,468.87,492.93,453.19,480.21Z"
            />
          </clipPath>
          <clipPath
            id="back-to-top-clip-4"
            transform="translate(-348.1 -214.5)"
          >
            <path
              className={styles.cls4}
              d="M545,409.41h0c-6.86-28.47-20.12-47.32-39.39-56-32-14.49-68.52,4.37-70.13,5.21-31.13,17.31-38.66,42.33-39.49,60.27a86.21,86.21,0,0,0,5.7,34.87c.47,1.15,11.77,28.19,31.69,34.52a73,73,0,0,1,10.1,4.07c2.31,1.13,8.1,3.36,18,3.36,8.81,0,20.88-1.78,36.63-7.68,2.39-.78,37-12.48,43.51-36.26a68.8,68.8,0,0,1,3.55-9.53C547.43,437.05,549.25,427.19,545,409.41Zm-6.27,29.95a76.07,76.07,0,0,0-3.9,10.51c-5.63,20.45-38.66,31.37-39,31.48l-.15,0c-31.58,11.85-46.46,5.92-49.13,4.62a80.42,80.42,0,0,0-11.06-4.46c-16.8-5.34-27.23-30.26-27.35-30.56A80.5,80.5,0,0,1,403,418.91c1.17-23.39,13.25-41.63,35.82-54.18.25-.13,18.95-9.77,40.29-9.77a57.05,57.05,0,0,1,23.66,4.79C520,367.54,531.88,384.8,538.21,411,542.19,427.75,540.26,436,538.75,439.36Z"
            />
          </clipPath>
          <clipPath
            id="back-to-top-clip-5"
            transform="translate(-348.1 -214.5)"
          >
            <path
              className={styles.cls5}
              d="M538.75,439.36a76.07,76.07,0,0,0-3.9,10.51c-5.63,20.45-38.66,31.37-39,31.48l-.15,0c-31.58,11.85-46.46,5.92-49.13,4.62a80.42,80.42,0,0,0-11.06-4.46c-16.8-5.34-27.23-30.26-27.35-30.56A80.5,80.5,0,0,1,403,418.91c1.17-23.39,13.25-41.63,35.82-54.18.25-.13,18.95-9.77,40.29-9.77a57.05,57.05,0,0,1,23.66,4.79C520,367.54,531.88,384.8,538.21,411,542.19,427.75,540.26,436,538.75,439.36Z"
            />
          </clipPath>
        </defs>
        <g>
          <path
            className={styles.cls6}
            d="M458.56,324.79a18.83,18.83,0,0,1-12.5,10.28c-15.84,4-49.63,17.48-63.13,61.93C365,456,409,490.51,409,490.51s20.7,18.71,49,18.18a44.28,44.28,0,0,1,18.26,3.43c9.66,4.15,26.78,7.91,44.64-5.23a16.86,16.86,0,0,1,16.06-2c18.47,7.17,62.95,20.27,114.54,5.76,0,0,67-15.13,91.06-95.9l16.3-54.47c.57-1.91,1.53-5,2.15-6.94a70.17,70.17,0,0,0,3.38-17.84,13.64,13.64,0,0,1,14.06-13.22c10.32.4,37.89-2.09,37.06-29.55a88.2,88.2,0,0,1,4.9-31l9.39-27.55a14.87,14.87,0,0,0-14.08-19.67H666.24a23.6,23.6,0,0,0-22.36,16h0a12.84,12.84,0,0,1-13.47,8.67c-18.34-1.9-58.36-3.91-92.24,9.2a96,96,0,0,1-23.12,5.68c-13.18,1.6-34,8.17-41.28,33.07a165.75,165.75,0,0,1-8.71,23.71Z"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls7}
            d="M532.08,480.21s4.73,18.66,26.07,8.47"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls8}
            d="M614.5,495.5s13.18,15,29.09-5"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls9}
            d="M691.5,350.5s-.63-39,31.69-35.94a21,21,0,0,1,14.95,8c4.4,5.88,7.11,16.2.36,33.95l-6.6,18.37a325.08,325.08,0,0,0-9.52,31.78c-7.23,29.17-30.76,83.74-105.88,88.85,0,0-44.56,1.38-85.91-16.77a94.69,94.69,0,0,1-53.72-62.47c-4.91-18.51-7.61-43.35-1.37-72.76,0,0,14.17-85,121.6-86.12a138.15,138.15,0,0,1,88.95,31.29c9,7.35,16.63,15.06,24,27.33"
            transform="translate(-348.1 -214.5)"
          />
          <g className={styles.cls10}>
            <path
              className={styles.cls11}
              d="M707,311s-52-50-125.89-38.72C542.31,278.21,487,310,475,382c-34.34,206-35.92-153.7-35.92-153.7l171.14-10.67Z"
              transform="translate(-348.1 -214.5)"
            />
            <path
              className={styles.cls11}
              d="M758.5,340.5s-24.11,19.81-46.06,7.4c0,0-19.86-11-8.9-28.21s78,5.81,78,5.81Z"
              transform="translate(-348.1 -214.5)"
            />
            <path
              className={styles.cls12}
              d="M457,339.51s2.28,76.74,73.69,107.71c24.13,10.47,50.62,12.58,76.88,10.89,68-4.38,126.34-46.37,148-122.2C785.15,232,794.33,491.49,794.33,491.49l-167.11,71-142.84-25L425.07,406.94Z"
              transform="translate(-348.1 -214.5)"
            />
            <path
              className={styles.cls12}
              d="M729.5,297.5s-69.33,1.13-39.17,66.57C690.33,364.07,688.5,316.5,729.5,297.5Z"
              transform="translate(-348.1 -214.5)"
            />
          </g>
          <path
            className={styles.cls13}
            d="M691.5,350.5s-.63-39,31.69-35.94a21,21,0,0,1,14.95,8c4.4,5.88,7.11,16.2.36,33.95l-6.6,18.37a325.08,325.08,0,0,0-9.52,31.78c-7.23,29.17-30.76,83.74-105.88,88.85,0,0-44.56,1.38-85.91-16.77a94.69,94.69,0,0,1-53.72-62.47c-4.91-18.51-7.61-43.35-1.37-72.76,0,0,14.17-85,121.6-86.12a138.15,138.15,0,0,1,88.95,31.29c9,7.35,16.63,15.06,24,27.33"
            transform="translate(-348.1 -214.5)"
          />
          <circle className={styles.cls14} cx="220.9" cy="188.5" r="6.5" />
          <circle className={styles.cls14} cx="303.4" cy="189" r="6.5" />
          <path
            className={styles.cls15}
            d="M572,382.5s8.44,15.5,32.22,11c0,0,9.62-1.76,7.67-9.39a4.45,4.45,0,0,0-2.6-3.11,4.11,4.11,0,0,0-1.9-.26,4.4,4.4,0,0,0-3.72,5c.34,3.07,2.66,7,12.83,5.78,0,0,9.81-1,12.91-9"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls15}
            d="M594.42,411.58l33,1.3a2.71,2.71,0,0,1,2.61,3,8.33,8.33,0,0,1-1.94,4,14.43,14.43,0,0,1-5.83,4.29c-4.61,1.91-13.73,4.09-24.76-1.56a11.52,11.52,0,0,1-4.63-4.23,7.41,7.41,0,0,1-1.19-4.43A2.63,2.63,0,0,1,594.42,411.58Z"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls9}
            d="M496.5,322.5s-14.95-19.22-1-37.84a38.16,38.16,0,0,1,23.87-14.61c10.52-1.87,25.21-.23,35.13,18.45"
            transform="translate(-348.1 -214.5)"
          />
          <g className={styles.cls16}>
            <path
              className={styles.cls17}
              d="M475,283.56"
              transform="translate(-348.1 -214.5)"
            />
            <path
              className={styles.cls11}
              d="M468.17,292.45s22.09,27.39,55.71,14.22c0,0,47.26-26.06-5.06-55.11S468.17,292.45,468.17,292.45Z"
              transform="translate(-348.1 -214.5)"
            />
          </g>
          <path
            className={styles.cls18}
            d="M496.5,322.5s-14.95-19.22-1-37.84a38.16,38.16,0,0,1,23.87-14.61c10.52-1.87,25.21-.23,35.13,18.45"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls19}
            d="M446.57,486s26.13-39.28,88.28-36.15"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls20}
            d="M453.19,480.21S420.79,453,428.4,421.8a40.83,40.83,0,0,1,14.49-22.1,67,67,0,0,1,39.94-14.48,39.44,39.44,0,0,1,33.59,17.12c6.87,10.26,12.2,26.82,9.08,53.16C518.13,517.58,468.87,492.93,453.19,480.21Z"
            transform="translate(-348.1 -214.5)"
          />
          <g className={styles.cls21}>
            <path
              className={styles.cls22}
              d="M391.56,421.81,425.14,448s20.86,30,56,24.59c0,0,38.32-5.41,41.61-36.5s-3.28-52.1-3.28-52.1l-66.91-20.9-45.85,4.81Z"
              transform="translate(-348.1 -214.5)"
            />
          </g>
          <path
            className={styles.cls23}
            d="M453.19,480.21S420.79,453,428.4,421.8a40.83,40.83,0,0,1,14.49-22.1,67,67,0,0,1,39.94-14.48,39.44,39.44,0,0,1,33.59,17.12c6.87,10.26,12.2,26.82,9.08,53.16C518.13,517.58,468.87,492.93,453.19,480.21Z"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls24}
            d="M477.74,390.08a3.66,3.66,0,0,1-1.66-4.42c1.16-3.33,4.71-8.23,15.47-7,10.32,1.18,12.41,7.22,12.59,11.32a3.85,3.85,0,0,1-3.77,4.05C494.93,394.14,484.24,393.81,477.74,390.08Z"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls24}
            d="M497.52,496.52s5.17,4,7.07-2"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls24}
            d="M481.1,495.37s5.77,7.94,12.09,1.53"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls24}
            d="M508.19,492.19s8.83,1.07,8.57-7.81"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls24}
            d="M432.52,445.79a3.36,3.36,0,0,1-5.36,1.76c-4-3.15-9.3-9.12-8.66-18.05.67-9.39,6.16-13.12,9.69-14.55a2.89,2.89,0,0,1,3.89,1.87A57.47,57.47,0,0,1,432.52,445.79Z"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls24}
            d="M475.83,494.11s-12.3,4.33-15.31-7.14"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls24}
            d="M519.43,480.21s10.62-3.45,4.84-12.58"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls24}
            d="M452.39,478.05a1.83,1.83,0,0,1-1.64,2.52c-2.48.05-6.5-.69-10.25-5.07a18.62,18.62,0,0,1-4.42-12.23,1.76,1.76,0,0,1,2.76-1.47C442.41,464.28,449,469.71,452.39,478.05Z"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls24}
            d="M524.44,455.71a1.47,1.47,0,0,0,2.63.62c1.54-2.11,3.43-5.9,3.43-11.83,0-4.9-1-7.62-2-9.11a1.53,1.53,0,0,0-2.76.43C524.73,439.7,523,448,524.44,455.71Z"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls24}
            d="M459.54,385.46c-2.81-1.7-7.27-2.47-14.12.64C434.57,391,434.31,400,434.88,404.31a2.6,2.6,0,0,0,2.79,2.27c12.32-1.14,20.93-9.79,24.39-13.93a3.9,3.9,0,0,0,0-5A10.12,10.12,0,0,0,459.54,385.46Z"
            transform="translate(-348.1 -214.5)"
          />
          <path
            className={styles.cls24}
            d="M509.81,398.2a2.63,2.63,0,0,1,3.23-2.8c3.7.87,9.65,3.19,12.46,9.34,4,8.76,2.2,14.69-.4,20.22C522.76,429.94,511,409.26,509.81,398.2Z"
            transform="translate(-348.1 -214.5)"
          />
          <rect
            className={styles.cls24}
            x="488"
            y="432"
            width="6"
            height="9"
            rx="3"
            transform="translate(-443.2 -74.81) rotate(-14.78)"
          />
          <rect
            className={styles.cls24}
            x="471"
            y="438"
            width="6"
            height="9"
            rx="3"
            transform="translate(-492.76 33.73) rotate(-25.6)"
          />
          <path
            className={styles.cls4}
            d="M545,409.41h0c-6.86-28.47-20.12-47.32-39.39-56-32-14.49-68.52,4.37-70.13,5.21-31.13,17.31-38.66,42.33-39.49,60.27a86.21,86.21,0,0,0,5.7,34.87c.47,1.15,11.77,28.19,31.69,34.52a73,73,0,0,1,10.1,4.07c2.31,1.13,8.1,3.36,18,3.36,8.81,0,20.88-1.78,36.63-7.68,2.39-.78,37-12.48,43.51-36.26a68.8,68.8,0,0,1,3.55-9.53C547.43,437.05,549.25,427.19,545,409.41Zm-6.27,29.95a76.07,76.07,0,0,0-3.9,10.51c-5.63,20.45-38.66,31.37-39,31.48l-.15,0c-31.58,11.85-46.46,5.92-49.13,4.62a80.42,80.42,0,0,0-11.06-4.46c-16.8-5.34-27.23-30.26-27.35-30.56A80.5,80.5,0,0,1,403,418.91c1.17-23.39,13.25-41.63,35.82-54.18.25-.13,18.95-9.77,40.29-9.77a57.05,57.05,0,0,1,23.66,4.79C520,367.54,531.88,384.8,538.21,411,542.19,427.75,540.26,436,538.75,439.36Z"
            transform="translate(-348.1 -214.5)"
          />
          <g className={styles.cls25}>
            <path
              className={styles.cls26}
              d="M382.67,457.91l43.64-19.4,26.21-62.25,45-8.35s11.51-49.47-37-56.69S348.1,390,348.1,390Z"
              transform="translate(-348.1 -214.5)"
            />
          </g>
          <path
            className={styles.cls5}
            d="M538.75,439.36a76.07,76.07,0,0,0-3.9,10.51c-5.63,20.45-38.66,31.37-39,31.48l-.15,0c-31.58,11.85-46.46,5.92-49.13,4.62a80.42,80.42,0,0,0-11.06-4.46c-16.8-5.34-27.23-30.26-27.35-30.56A80.5,80.5,0,0,1,403,418.91c1.17-23.39,13.25-41.63,35.82-54.18.25-.13,18.95-9.77,40.29-9.77a57.05,57.05,0,0,1,23.66,4.79C520,367.54,531.88,384.8,538.21,411,542.19,427.75,540.26,436,538.75,439.36Z"
            transform="translate(-348.1 -214.5)"
          />
          <g className={styles.cls27}>
            <path
              className={styles.cls28}
              d="M384,414.94s8.59-6.29,13.44,10.72c19.29,67.7,106.67,4.66,101.33-41.4C496,360,471,351,444.71,351.3c-59.55.74-61.81,11.36-61.81,11.36Z"
              transform="translate(-348.1 -214.5)"
            />
            <path
              className={styles.cls29}
              d="M448.84,504.52S384.16,428,436.08,385s87.8.74,87.8.74,15.12,14.54,30.62,56.4-13.93-126.47-13.93-126.47L348.1,296l24.66,137.75,63.32,87.73Z"
              transform="translate(-348.1 -214.5)"
            />
          </g>
          <text
            className={styles.up}
            x="295.9"
            y="86.98"
            transform="translate(0 0)"
          >
            UP!
          </text>
        </g>
      </svg>
    </button>
  );
}
