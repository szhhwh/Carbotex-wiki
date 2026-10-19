import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowUp, ChevronDown } from "lucide-react";
import { References } from "./References";
import { Collapse } from "../ui/Collapse";
import styles from "./article-page.module.css";

export interface ArticleSection {
  id: string;
  title: string;
  eyebrow?: string;
  content: ReactNode;
  /** Direct child headings, rendered automatically after the section content. */
  subsections?: ArticleSubsection[];
}

export interface ArticleSubsection {
  id: string;
  title: string;
  content: ReactNode;
}

interface ArticlePageProps {
  title: string;
  lead: string;
  sections: ArticleSection[];
  /** Render the page's cited sources after every article section. */
  references?: boolean;
  /** Keep the compact table of contents available while reading on mobile. */
  stickyMobileOutline?: boolean;
}

function FieldIllustration() {
  return (
    <svg
      className={styles.fieldArt}
      viewBox="0 0 650 500"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="410" cy="154" r="106" fill="#E9D7A0" />
      <circle cx="410" cy="154" r="132" stroke="#C4B474" strokeWidth="1.5" />
      <circle
        cx="410"
        cy="154"
        r="151"
        stroke="#C4B474"
        strokeWidth="1"
        strokeDasharray="3 9"
      />
      <path
        d="M2 345C119 279 212 274 317 323C440 382 538 347 650 255V500H2V345Z"
        fill="#A4C99D"
      />
      <path
        d="M0 393C117 321 233 341 317 380C444 439 565 382 650 316V500H0V393Z"
        fill="#5B9973"
      />
      <path
        d="M0 446C142 371 255 421 355 447C468 475 564 438 650 389V500H0V446Z"
        fill="#2B6F55"
      />
      <path
        d="M0 473C160 406 278 463 359 479C465 501 566 475 650 437"
        stroke="#E2EBCB"
        strokeOpacity=".68"
        strokeWidth="2"
      />
      <path
        d="M67 432C184 374 271 395 358 427C463 465 548 425 624 369M116 463C223 419 294 446 370 463C470 486 559 452 648 401"
        stroke="#D6E5BC"
        strokeOpacity=".55"
        strokeWidth="2"
      />
      <path
        d="M489 273V103M489 190C454 174 444 147 440 125C473 130 485 154 489 190ZM489 228C524 210 540 182 542 157C510 166 494 191 489 228Z"
        stroke="#225C49"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M440 125C467 146 478 162 489 190M542 157C516 183 501 207 489 228"
        stroke="#225C49"
        strokeWidth="1.5"
      />
      <circle cx="489" cy="96" r="7" fill="#225C49" />
    </svg>
  );
}

export function ArticleHero({
  title,
  lead,
  headingId,
}: {
  title: string;
  lead: string;
  headingId?: string;
}) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <h1 id={headingId}>{title}</h1>
          <p>{lead}</p>
        </div>
        <FieldIllustration />
      </div>
    </header>
  );
}

export function ArticlePage({
  title,
  lead,
  sections,
  references = false,
  stickyMobileOutline = false,
}: ArticlePageProps) {
  const items = useMemo(
    () => [
      ...sections.map(({ id, title: label, subsections }) => ({
        id,
        label,
        children: subsections?.map(({ id, title }) => ({
          id,
          label: title.replace(/^\d+(?:\.\d+)*[.)]?\s+/, ""),
        })),
      })),
      ...(references ? [{ id: "references", label: "References" }] : []),
    ],
    [sections, references],
  );
  const targets = useMemo(
    () =>
      items.flatMap((item) => [
        item,
        ...("children" in item ? (item.children ?? []) : []),
      ]),
    [items],
  );
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [marker, setMarker] = useState({ top: 0, height: 0 });
  const listRef = useRef<HTMLOListElement>(null);
  const manualSelectionUntil = useRef(0);

  useEffect(() => {
    const elements = targets
      .map(({ id }) => document.getElementById(id))
      .filter((target): target is HTMLElement => Boolean(target));
    if (!elements.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (performance.now() < manualSelectionUntil.current) return;
      const offset =
        parseFloat(getComputedStyle(elements[0]).scrollMarginTop) || 120;
      let current = elements[0];
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= offset + 96)
          current = element;
        else break;
      }
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2
      ) {
        current = elements[elements.length - 1];
      }
      setActiveId(current.id);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    const article = document.getElementById("article-body");
    if (article) observer.observe(article);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [targets]);

  useEffect(() => {
    const refreshAfterScroll = () => {
      manualSelectionUntil.current = 0;
      window.dispatchEvent(new Event("scroll"));
    };
    window.addEventListener("scrollend", refreshAfterScroll);
    return () => window.removeEventListener("scrollend", refreshAfterScroll);
  }, []);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const updateMarker = () => {
      const link = Array.from(
        list.querySelectorAll<HTMLAnchorElement>("a"),
      ).find((element) => element.dataset.section === activeId);
      if (link) {
        const nav = list.parentElement!;
        const top =
          link.getBoundingClientRect().top -
          nav.getBoundingClientRect().top +
          nav.scrollTop;
        setMarker({ top, height: link.offsetHeight });
        if (
          nav.clientHeight &&
          (top < nav.scrollTop ||
            top + link.offsetHeight > nav.scrollTop + nav.clientHeight)
        ) {
          nav.scrollTop = top - nav.clientHeight / 2;
        }
      }
    };
    updateMarker();
    const resizeObserver = new ResizeObserver(updateMarker);
    resizeObserver.observe(list);
    return () => resizeObserver.disconnect();
  }, [activeId, outlineOpen]);

  const selectOutlineTarget = (id: string) => {
    manualSelectionUntil.current = performance.now() + 1000;
    setActiveId(id);
    setOutlineOpen(false);
  };

  return (
    <main
      className={styles.page}
      data-sticky-outline={stickyMobileOutline ? "true" : undefined}
    >
      <ArticleHero title={title} lead={lead} />

      <div className={styles.readingArea} id="article-body">
        <aside className={styles.sidebar}>
          <div className={styles.outline}>
            <button
              className={styles.outlineToggle}
              type="button"
              aria-expanded={outlineOpen}
              aria-controls="article-outline"
              onClick={() => setOutlineOpen((open) => !open)}
            >
              <span>On this page</span>
              <ChevronDown size={18} />
            </button>
            <nav
              id="article-outline"
              className={styles.outlineNav}
              data-open={outlineOpen}
              aria-label="On this page"
            >
              <span
                className={styles.activeMarker}
                style={{
                  transform: `translateY(${marker.top}px)`,
                  height: marker.height,
                }}
                aria-hidden="true"
              />
              <ol ref={listRef}>
                {items.map((item, index) => {
                  const { id, label } = item;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        data-section={id}
                        aria-current={activeId === id ? "location" : undefined}
                        onClick={() => selectOutlineTarget(id)}
                      >
                        <span className={styles.outlineNumber}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{label}</span>
                      </a>
                      {"children" in item && item.children?.length ? (
                        <ol className={styles.subOutline}>
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <a
                                href={`#${child.id}`}
                                data-section={child.id}
                                aria-current={
                                  activeId === child.id ? "location" : undefined
                                }
                                onClick={() => selectOutlineTarget(child.id)}
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ol>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </nav>
            <button
              className={styles.backToTop}
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "auto"
                    : "smooth",
                })
              }
            >
              <span className={styles.backToTopIcon} aria-hidden="true">
                <ArrowUp size={17} strokeWidth={1.8} />
              </span>
              <span>Back to top</span>
            </button>
          </div>
        </aside>

        <article className={styles.articleContent}>
          {sections.map(
            ({ id, title: heading, eyebrow, content, subsections }, index) => (
              <section
                className={styles.section}
                id={id}
                key={id}
                aria-labelledby={`${id}-heading`}
              >
                <div className={styles.sectionHeading}>
                  <span className={styles.sectionIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    {eyebrow && (
                      <span className={styles.sectionEyebrow}>{eyebrow}</span>
                    )}
                    <h2 id={`${id}-heading`}>{heading}</h2>
                  </div>
                </div>
                <div className={styles.prose}>
                  {content}
                  {subsections?.map((child) => (
                    <section
                      className={styles.subsection}
                      id={child.id}
                      key={child.id}
                      aria-labelledby={`${child.id}-heading`}
                    >
                      <h3 id={`${child.id}-heading`}>{child.title}</h3>
                      {child.content}
                    </section>
                  ))}
                </div>
              </section>
            ),
          )}
          {references && (
            <section className={styles.referencesSection} id="references">
              <References mode="article" />
            </section>
          )}
        </article>
      </div>
    </main>
  );
}

export function ArticleNote({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <aside className={styles.note}>
      <span className={styles.noteLabel}>{label}</span>
      <div className={styles.noteBody}>{children}</div>
    </aside>
  );
}

export function ArticleFramework({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <Collapse
      header={title}
      defaultOpen={defaultOpen}
      variant="card"
      className={styles.framework}
      headerClassName={styles.frameworkHeader}
      contentClassName={styles.frameworkContent}
    >
      {children}
    </Collapse>
  );
}
