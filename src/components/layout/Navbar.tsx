import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Pages from "../../pages.ts";
import {
  NavbarIllustration,
  type NavbarIllustrationVariant,
} from "./NavbarIllustration";
import { NavbarMenuCurves } from "./NavbarMenuCurves";
import { NavbarScrollProgress } from "./NavbarScrollProgress";
import styles from "./navbar.module.css";

interface NavigationDetail {
  description: string;
}

const navigationDetails: Record<string, NavigationDetail> = {
  "/description": {
    description: "The challenge and our approach",
  },
  "/engineering": {
    description: "Design, build, test, and learn",
  },
  "/contribution": {
    description: "Resources for future teams",
  },
  "/design": {
    description: "What we built and why",
  },
  "/parts": {
    description: "Reusable genes, constructs, and tools",
  },
  "/experiments": {
    description: "Our experiments and their rationale",
  },
  "/protocols": {
    description: "Reproducible, step-by-step methods",
  },
  "/notebook": {
    description: "Our research journey",
  },
  "/results": {
    description: "Findings from our work",
  },
  "/safety-and-security": {
    description: "Responsible work by design",
  },
  "/model": {
    description: "From biology to prediction",
  },
  "/hardware": {
    description: "Building the physical system",
  },
  "/human-practices": {
    description: "Shaped together with society",
  },
  "/education": {
    description: "Learning through participation",
  },
  "/members": {
    description: "The people behind the project",
  },
  "/attributions": {
    description: "Crediting every contribution",
  },
};

const menuIllustrations: Record<string, NavbarIllustrationVariant> = {
  Project: "project",
  "Wet Lab": "wet",
  "Dry Lab": "dry",
  "Human Practices": "human-practices",
  Team: "team",
};

const makeFolderId = (name: string | undefined, index: number) =>
  `nav-${name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || index}`;

const normalizePath = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

export function Navbar() {
  const { pathname } = useLocation();
  const rootRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = normalizePath(pathname);
  const menuIsOpen = openFolder !== null || mobileOpen;

  useEffect(() => {
    setOpenFolder(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenFolder(null);
        setMobileOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      const activeTrigger = mobileOpen
        ? mobileToggleRef.current
        : openFolder
          ? triggerRefs.current[openFolder]
          : null;
      setOpenFolder(null);
      setMobileOpen(false);
      activeTrigger?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen, openFolder]);

  const closeNavigation = () => {
    setOpenFolder(null);
    setMobileOpen(false);
  };

  return (
    <header
      ref={rootRef}
      className={styles.navbar}
      data-menu-open={menuIsOpen}
      data-mobile-open={mobileOpen}
    >
      <div className={styles.bar}>
        <Link
          className={styles.brand}
          to="/"
          onClick={closeNavigation}
          aria-label={`${import.meta.env.VITE_TEAM_NAME} home`}
        >
          <img
            className={styles.teamLogo}
            src="https://static.igem.wiki/teams/6147/wiki/fronted-resource/team-logo-horizon.svg"
            width="645"
            height="225"
            alt=""
            decoding="async"
          />
        </Link>

        <nav
          id="primary-navigation"
          className={styles.navigation}
          aria-label="Primary navigation"
        >
          <ul className={styles.navList}>
            {Pages.map((item, pageIndex) => {
              if ("folder" in item && item.folder) {
                const folderId = makeFolderId(item.name, pageIndex);
                const isOpen = openFolder === folderId;
                const illustration =
                  (item.name ? menuIllustrations[item.name] : undefined) ??
                  "project";

                return (
                  <li className={styles.navItem} key={folderId}>
                    <button
                      ref={(element) => {
                        triggerRefs.current[folderId] = element;
                      }}
                      type="button"
                      className={styles.navButton}
                      data-active={
                        item.folder.some(
                          (subpage) =>
                            subpage.path &&
                            normalizePath(subpage.path) === currentPath,
                        ) || undefined
                      }
                      aria-expanded={isOpen}
                      aria-controls={`${folderId}-menu`}
                      onClick={() => {
                        setOpenFolder(isOpen ? null : folderId);
                      }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={styles.chevron}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      id={`${folderId}-menu`}
                      className={styles.megaMenu}
                      data-open={isOpen}
                      data-menu-variant={illustration}
                      aria-hidden={!isOpen}
                    >
                      <NavbarMenuCurves variant={illustration} />
                      <div className={styles.menuBody}>
                        <span className={styles.menuArt}>
                          <NavbarIllustration
                            className={styles.illustration}
                            variant={illustration}
                          />
                        </span>
                        <div className={styles.menuGrid}>
                          {item.folder.map((subpage) => {
                            if (!subpage.path || subpage.hideInMenu) return null;
                            const subPath = normalizePath(subpage.path);
                            const isCurrent =
                              subPath === currentPath ||
                              currentPath.startsWith(`${subPath}/`);

                            const detail = navigationDetails[subpage.path] ?? {
                              description: subpage.title || "Explore this page",
                            };

                            return (
                              <Link
                                key={subpage.path}
                                className={styles.menuItem}
                                to={subpage.path}
                                aria-current={
                                  isCurrent ? "page" : undefined
                                }
                                tabIndex={isOpen ? 0 : -1}
                                onClick={closeNavigation}
                              >
                                <strong>{subpage.name}</strong>
                                <span>{detail.description}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              if ("path" in item && item.path) {
                return (
                  <li className={styles.navItem} key={item.path}>
                    <Link
                      className={styles.navLink}
                      to={item.path}
                      aria-current={
                        normalizePath(item.path) === currentPath
                          ? "page"
                          : undefined
                      }
                      onClick={closeNavigation}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </nav>

        <button
          ref={mobileToggleRef}
          type="button"
          className={styles.mobileToggle}
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          onClick={() => {
            setMobileOpen((isOpen) => !isOpen);
            setOpenFolder(null);
          }}
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <NavbarScrollProgress />
    </header>
  );
}
