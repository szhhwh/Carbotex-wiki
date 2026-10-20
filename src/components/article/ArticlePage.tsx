import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronDown, Image as ImageIcon, List } from "lucide-react";
import { HardwareWordmark } from "../hardware/HardwareWordmark";
import { ReferenceOrder, References } from "./References";
import { Collapse } from "../ui/Collapse";
import styles from "./article-page.module.css";

export type ArticleTheme = "hardware";
const DEFAULT_ARTICLE_THEME: ArticleTheme = "hardware";

// Keep legacy content labels aligned with the title used by page routing.
const DISPLAY_TITLE_ALIASES: Record<string, string> = {
  Safety: "Safety and Security",
};

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
  lead: ReactNode;
  /** Optional image shown in the header media slot. */
  heroImage?: {
    src: string;
    alt: string;
  };
  sections: ArticleSection[];
  /** Render the page's cited sources after every article section. */
  references?: boolean;
  /** Optional introduction shown above the shared reference list. */
  referencesIntro?: ReactNode;
  /** Canonical numbering order for pages with an explicit source list. */
  referenceOrder?: string[];
  /** Keep the compact table of contents available while reading on mobile. */
  stickyMobileOutline?: boolean;
  /** Shared article theme; Hardware is the canonical visual system. */
  theme?: ArticleTheme;
}

export function ArticleHero({
  title,
  lead,
  heroImage,
  headingId,
}: {
  title: string;
  lead: ReactNode;
  heroImage?: {
    src: string;
    alt: string;
  };
  headingId?: string;
  theme?: ArticleTheme;
}) {
  const displayTitle = DISPLAY_TITLE_ALIASES[title] ?? title;

  return (
    <header className={styles.hero}>
      <div
        className={styles.heroMedia}
        data-hero-media-slot
        data-has-image={heroImage ? "true" : undefined}
        aria-hidden={heroImage ? undefined : "true"}
      >
        {heroImage ? (
          <img
            className={styles.heroImage}
            src={heroImage.src}
            alt={heroImage.alt}
            decoding="async"
            fetchPriority="high"
          />
        ) : (
          <span className={styles.heroPlaceholder}>
            <ImageIcon size={24} aria-hidden="true" />
            <span>Header image placeholder</span>
          </span>
        )}
      </div>
      <div
        className={styles.heroTitleBand}
        data-compact={displayTitle.length > 18 ? "true" : undefined}
      >
        <h1 id={headingId} tabIndex={-1}>
          {displayTitle === "Hardware" ? (
            <>
              <span className={styles.srOnly}>{displayTitle}</span>
              <span className={styles.heroWordmark} aria-hidden="true">
                <HardwareWordmark />
              </span>
            </>
          ) : (
            displayTitle
          )}
        </h1>
        <BubbleCluster />
      </div>
      <div className={styles.heroLead} data-article-lead>
        {lead}
      </div>
    </header>
  );
}

function BubbleCluster() {
  return (
    <svg
      className={styles.heroBubbles}
      viewBox="0 0 380 114"
      preserveAspectRatio="xMaxYMid slice"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="82" cy="20" r="25" />
      <circle cx="42" cy="43" r="13" />
      <circle cx="66" cy="68" r="6.5" />
      <circle cx="103" cy="69" r="18" />
      <circle cx="139" cy="86" r="18" />
      <circle cx="173" cy="73" r="25" />
      <circle cx="133" cy="42" r="6.5" />
      <circle cx="173" cy="21" r="9.5" />
      <circle cx="243" cy="20" r="6.5" />
      <circle cx="221" cy="48" r="9.5" />
      <circle cx="220" cy="72" r="12.5" />
      <circle cx="253" cy="45" r="13" />
      <circle cx="293" cy="57" r="6.5" />
      <circle cx="326" cy="77" r="13" />
      <circle cx="356" cy="67" r="6.5" />
      <circle cx="259" cy="92" r="18" />
      <circle cx="236" cy="104" r="13" />
      <circle cx="200" cy="99" r="6.5" />
      <circle cx="94" cy="103" r="6.5" />
      <circle cx="20" cy="94" r="13" />
      <circle cx="2" cy="79" r="6.5" />
    </svg>
  );
}

export function ArticlePage({
  title,
  lead,
  heroImage,
  sections,
  references = false,
  referencesIntro,
  referenceOrder,
  stickyMobileOutline = true,
  theme = DEFAULT_ARTICLE_THEME,
}: ArticlePageProps) {
  const pageStyles = styles;
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
  const [outlineHidden, setOutlineHidden] = useState(false);
  const [marker, setMarker] = useState({ top: 0, height: 0 });
  const listRef = useRef<HTMLOListElement>(null);
  const manualSelectionUntil = useRef(0);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    if (!stickyMobileOutline) return;

    let frame = 0;
    let scrollDirection = 0;
    let directionalTravel = 0;
    const mobileQuery = window.matchMedia("(max-width: 900px)");
    const update = () => {
      frame = 0;
      const current = Math.max(window.scrollY, 0);
      const delta = current - lastScrollTop.current;
      const nextDirection = Math.sign(delta);
      lastScrollTop.current = current;

      if (nextDirection !== 0) {
        if (nextDirection !== scrollDirection) directionalTravel = 0;
        scrollDirection = nextDirection;
        directionalTravel += Math.abs(delta);
      }

      if (!mobileQuery.matches || current < 240 || outlineOpen) {
        setOutlineHidden(false);
        directionalTravel = 0;
      } else if (scrollDirection > 0 && directionalTravel > 40) {
        setOutlineHidden(true);
        directionalTravel = 0;
      } else if (scrollDirection < 0 && directionalTravel > 24) {
        setOutlineHidden(false);
        directionalTravel = 0;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    lastScrollTop.current = window.scrollY;
    window.addEventListener("scroll", schedule, { passive: true });
    mobileQuery.addEventListener("change", schedule);
    update();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      mobileQuery.removeEventListener("change", schedule);
    };
  }, [stickyMobileOutline, outlineOpen]);

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
      className={pageStyles.page}
      data-article-theme={theme}
      data-sticky-outline={stickyMobileOutline ? "true" : undefined}
    >
      {referenceOrder && <ReferenceOrder keys={referenceOrder} />}
      <ArticleHero
        title={title}
        lead={lead}
        heroImage={heroImage}
        theme={theme}
      />

      <div className={pageStyles.readingArea} id="article-body">
        <aside className={pageStyles.sidebar}>
          <div
            className={pageStyles.outline}
            data-open={outlineOpen ? "true" : "false"}
            data-outline={outlineOpen ? "open" : "closed"}
            data-hidden={outlineHidden && !outlineOpen ? "true" : undefined}
          >
            <button
              className={pageStyles.outlineToggle}
              type="button"
              aria-label="On this page"
              aria-expanded={outlineOpen}
              aria-controls="article-outline"
              onClick={() => setOutlineOpen((open) => !open)}
            >
              <List
                className={pageStyles.outlineCompactIcon}
                size={18}
                aria-hidden="true"
              />
              <span>On this page</span>
              <ChevronDown
                className={pageStyles.outlineChevron}
                size={18}
                aria-hidden="true"
              />
            </button>
            <nav
              id="article-outline"
              className={pageStyles.outlineNav}
              data-open={outlineOpen}
              aria-label="On this page"
            >
              <span
                className={pageStyles.activeMarker}
                style={{
                  transform: `translateY(${marker.top}px)`,
                  height: marker.height,
                }}
                aria-hidden="true"
              />
              <ol ref={listRef}>
                {items.map((item) => {
                  const { id, label } = item;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        data-section={id}
                        aria-current={activeId === id ? "location" : undefined}
                        onClick={() => selectOutlineTarget(id)}
                      >
                        <span>{label}</span>
                      </a>
                      {"children" in item && item.children?.length ? (
                        <ol className={pageStyles.subOutline}>
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
          </div>
        </aside>

        <article className={pageStyles.articleContent}>
          {sections.map(
            ({ id, title: heading, eyebrow, content, subsections }) => (
              <section
                className={pageStyles.section}
                id={id}
                key={id}
                aria-labelledby={`${id}-heading`}
              >
                <div className={pageStyles.sectionHeading}>
                  <div>
                    {eyebrow ? (
                      <span className={pageStyles.sectionEyebrow}>
                        {eyebrow}
                      </span>
                    ) : null}
                    <h2 id={`${id}-heading`}>{heading}</h2>
                  </div>
                </div>
                <div className={pageStyles.prose}>
                  {content}
                  {subsections?.map((child) => (
                    <section
                      className={pageStyles.subsection}
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
            <section className={pageStyles.referencesSection} id="references">
              <References intro={referencesIntro} />
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
  theme?: ArticleTheme;
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
  theme?: ArticleTheme;
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
