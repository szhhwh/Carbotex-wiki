import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  ChartNoAxesCombined,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  Cog,
  Cpu,
  FileText,
  FlaskConical,
  Gift,
  GraduationCap,
  Handshake,
  ListChecks,
  Menu,
  PencilRuler,
  ShieldCheck,
  Sigma,
  Users,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Pages from "../../pages.ts";
import styles from "./navbar.module.css";

interface NavigationDetail {
  description: string;
  icon: LucideIcon;
}

const navigationDetails: Record<string, NavigationDetail> = {
  "/description": {
    description: "The challenge and our approach",
    icon: FileText,
  },
  "/engineering": {
    description: "Design, build, test, and learn",
    icon: Cog,
  },
  "/contribution": {
    description: "Resources for future teams",
    icon: Gift,
  },
  "/design": {
    description: "What we built and why",
    icon: PencilRuler,
  },
  "/experiments": {
    description: "Our experiments and their rationale",
    icon: FlaskConical,
  },
  "/protocols": {
    description: "Reproducible, step-by-step methods",
    icon: ListChecks,
  },
  "/notebook": {
    description: "Our research journey",
    icon: BookOpenCheck,
  },
  "/results": {
    description: "Findings from our work",
    icon: ChartNoAxesCombined,
  },
  "/safety-and-security": {
    description: "Responsible work by design",
    icon: ShieldCheck,
  },
  "/model": {
    description: "From biology to prediction",
    icon: Sigma,
  },
  "/hardware": {
    description: "Building the physical system",
    icon: Cpu,
  },
  "/human-practices": {
    description: "Shaped together with society",
    icon: Handshake,
  },
  "/education": {
    description: "Learning through participation",
    icon: GraduationCap,
  },
  "/members": {
    description: "The people behind the project",
    icon: Users,
  },
  "/attributions": {
    description: "Crediting every contribution",
    icon: ClipboardCheck,
  },
};

const makeFolderId = (name: string | undefined, index: number) =>
  `nav-${name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || index}`;

export function Navbar() {
  const { pathname } = useLocation();
  const rootRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 16);
  const isHome = pathname === "/";
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

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollDirection = 0;
    let directionalTravel = 0;

    const handleScroll = () => {
      const nextScrollY = Math.max(window.scrollY, 0);
      const delta = nextScrollY - lastScrollY;
      const nextDirection = Math.sign(delta);

      if (nextDirection !== 0) {
        if (nextDirection !== scrollDirection) directionalTravel = 0;
        scrollDirection = nextDirection;
        directionalTravel += Math.abs(delta);
      }

      setIsScrolled(nextScrollY > 16);

      if (nextScrollY <= 24 || menuIsOpen) {
        setIsHidden(false);
        directionalTravel = 0;
      } else if (
        scrollDirection > 0 &&
        nextScrollY > 120 &&
        directionalTravel > 40
      ) {
        setIsHidden(true);
        directionalTravel = 0;
      } else if (scrollDirection < 0 && directionalTravel > 24) {
        setIsHidden(false);
        directionalTravel = 0;
      }

      lastScrollY = nextScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuIsOpen]);

  const closeNavigation = () => {
    setOpenFolder(null);
    setMobileOpen(false);
  };

  return (
    <header
      ref={rootRef}
      className={styles.navbar}
      data-home={isHome}
      data-hidden={isHidden}
      data-menu-open={menuIsOpen}
      data-mobile-open={mobileOpen}
      data-scrolled={isScrolled}
      onFocus={() => setIsHidden(false)}
    >
      <div className={styles.bar}>
        <Link
          className={styles.brand}
          to="/"
          onClick={closeNavigation}
          aria-label={`${import.meta.env.VITE_TEAM_NAME} home`}
        >
          {import.meta.env.VITE_TEAM_NAME}
        </Link>

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

                return (
                  <li className={styles.navItem} key={folderId}>
                    <button
                      ref={(element) => {
                        triggerRefs.current[folderId] = element;
                      }}
                      type="button"
                      className={styles.navButton}
                      aria-expanded={isOpen}
                      aria-controls={`${folderId}-menu`}
                      onClick={() => {
                        setOpenFolder(isOpen ? null : folderId);
                        setIsHidden(false);
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
                      aria-hidden={!isOpen}
                    >
                      <div className={styles.menuHeading}>
                        <span>Explore</span>
                        <strong>{item.name}</strong>
                      </div>
                      <div className={styles.menuGrid}>
                        {item.folder.map((subpage) => {
                          if (!subpage.path) return null;

                          const detail = navigationDetails[subpage.path] ?? {
                            description: subpage.title || "Explore this page",
                            icon: CircleDot,
                          };
                          const Icon = detail.icon;

                          return (
                            <Link
                              key={subpage.path}
                              className={styles.menuItem}
                              to={subpage.path}
                              tabIndex={isOpen ? 0 : -1}
                              onClick={closeNavigation}
                            >
                              <span className={styles.iconFrame}>
                                <Icon aria-hidden="true" strokeWidth={1.7} />
                              </span>
                              <span className={styles.itemCopy}>
                                <strong>{subpage.name}</strong>
                                <span>{detail.description}</span>
                              </span>
                            </Link>
                          );
                        })}
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
      </div>
    </header>
  );
}
