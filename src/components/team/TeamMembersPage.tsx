import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { ArticleHero } from "../article/ArticlePage";
import { Caption } from "../media/Caption";
import { MemberPortrait } from "./MemberPortrait";
import { MemberProfileDialog } from "./MemberProfileDialog";
import {
  initials,
  memberRoleLabel,
  portraitStyle,
  primaryRole,
} from "./member-meta";
import {
  createNetworkGeometry,
  getNetworkHeight,
  type MemberPoint,
} from "./network-geometry";
import { RoleChips } from "./RoleChips";
import type { TeamMember } from "./types";
import styles from "./team-members.module.css";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, CustomEase);

interface TeamMembersPageProps {
  members: TeamMember[];
  groupPhoto: string;
}

function MemberNode({
  member,
  point,
  onOpen,
}: {
  member: TeamMember;
  point: MemberPoint;
  onOpen: (member: TeamMember) => void;
}) {
  const [failed, setFailed] = useState(false);
  const isAdvisorGroup = member.roles[0] === "advisor";
  const roleLabel = memberRoleLabel(member);

  return (
    <div
      id={`member-${member.id}`}
      className={styles.nodeAnchor}
      style={{
        left: `${point.x * 100}%`,
        top: `${point.y * 100}%`,
      }}
    >
      <button
        type="button"
        className={`${styles.memberDot} ${
          isAdvisorGroup ? styles.advisorDot : ""
        }`}
        data-member-dot
        data-member-id={member.id}
        aria-label={
          isAdvisorGroup
            ? `Open the ${member.name}' message`
            : `Open ${member.name}'s profile (${roleLabel})`
        }
        aria-haspopup="dialog"
        onClick={() => onOpen(member)}
      >
        {isAdvisorGroup ? (
          <span
            className={styles.advisorPill}
            style={{ backgroundColor: point.color }}
          >
            Advisors
          </span>
        ) : (
          <svg viewBox="0 0 30 30" aria-hidden="true">
            <circle cx="15" cy="15" r="15" fill={point.color} />
          </svg>
        )}
        <span
          className={styles.dotImageSlot}
          style={{ "--member-ring-color": point.color } as CSSProperties}
          aria-hidden="true"
        >
          <span className={styles.dotInitials}>{initials(member.name)}</span>
          {!failed && (
            <img
              src={member.image}
              alt=""
              loading="eager"
              decoding="async"
              style={portraitStyle(member)}
              onError={() => setFailed(true)}
            />
          )}
        </span>
      </button>
    </div>
  );
}

function StaticMemberCard({
  member,
  onOpen,
}: {
  member: TeamMember;
  onOpen: (member: TeamMember) => void;
}) {
  const role = primaryRole(member);
  const isAdvisorGroup = member.roles[0] === "advisor";

  return (
    <article className={styles.staticCard}>
      <header className={styles.staticCardHeader}>
        <MemberPortrait
          member={member}
          className={styles.cardPortrait}
          fallbackClassName={styles.portraitFallback}
          alt=""
        />
        <div className={styles.staticIdentity}>
          <h3>{member.name}</h3>
          <p>{member.major}</p>
          <RoleChips member={member} />
        </div>
      </header>

      <dl className={styles.cardFacts}>
        {member.facts.slice(0, 2).map((fact) => (
          <div key={fact.question}>
            <dt>{fact.question}</dt>
            <dd>{fact.answer}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        className={styles.profileButton}
        aria-label={
          isAdvisorGroup
            ? `Read the ${member.name}' message`
            : `Read ${member.name}'s profile (${role.label})`
        }
        onClick={() => onOpen(member)}
      >
        Read{" "}
        {isAdvisorGroup
          ? "Advisors' message"
          : `${member.name.split(" ")[0]}'s profile`}
        <ArrowUpRight aria-hidden="true" />
      </button>
    </article>
  );
}

export function TeamMembersPage({ members, groupPhoto }: TeamMembersPageProps) {
  const networkRef = useRef<HTMLElement>(null);
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [photoFailed, setPhotoFailed] = useState(false);
  const gradientPrefix = useId().replace(/:/g, "");

  const networkHeight = getNetworkHeight(members.length);
  const { memberPoints, backgroundPoints, backgroundLines, mainLines } =
    useMemo(
      () => createNetworkGeometry(members, networkHeight),
      [members, networkHeight],
    );

  useEffect(() => {
    members.forEach(({ image }) => {
      const preload = new Image();
      preload.decoding = "async";
      preload.src = image;
    });
  }, [members]);

  useLayoutEffect(() => {
    const network = networkRef.current;
    if (!network) return;

    const media = gsap.matchMedia();
    media.add(
      "(min-width: 1200px) and (prefers-reduced-motion: no-preference)",
      () => {
        const backgroundLines = [
          ...network.querySelectorAll<SVGPathElement>("[data-background-line]"),
        ];
        const mainLines = [
          ...network.querySelectorAll<SVGPathElement>("[data-main-line]"),
        ];

        gsap.set([...backgroundLines, ...mainLines], { drawSVG: "0%" });

        backgroundLines.forEach((line) => {
          gsap.to(line, {
            drawSVG: "100%",
            duration: gsap.utils.clamp(1, 2, line.getTotalLength() / 100),
            ease: "power1.out",
            scrollTrigger: {
              trigger: line,
              start: "top 60%",
              end: "bottom 90%",
              scrub: false,
              toggleActions: "play none reverse none",
            },
          });
        });

        const lineEase = CustomEase.create(
          "member-network-line",
          "M0,0 C0.366,0 0.924,0.522 0.954,0.705 1,0.988 1,1 1,1",
        );

        mainLines.forEach((line) => {
          gsap.to(line, {
            drawSVG: "100%",
            ease: lineEase,
            scrollTrigger: {
              trigger: line,
              // Keep the scroll range positive for short, steep network segments.
              start: "top 80%",
              end: "top 20%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });

        network
          .querySelectorAll<HTMLElement>("[data-member-dot]")
          .forEach((dot) => {
            ScrollTrigger.create({
              trigger: dot,
              start: "center 80%",
              end: "top -25%",
              toggleClass: {
                targets: dot,
                className: styles.memberDotActive,
              },
            });
          });
      },
    );

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      media.revert();
    };
  }, []);

  const openMember = (member: TeamMember) => setActiveMember(member);

  return (
    <main className={`${styles.page} ${styles.theme}`}>
      <ArticleHero
        title="Meet Our Team"
        lead="Meet the students, instructors, and advisors behind OUC-Haide's Carbotex project."
        headingId="members-heading"
      />

      <section className={styles.intro} aria-labelledby="team-intro-heading">
        <h2 id="team-intro-heading" className={styles.srOnly}>
          About OUC-Haide
        </h2>
        <figure className={styles.groupPhotoFrame}>
          {photoFailed ? (
            <div className={styles.photoFallback} role="status">
              The team banner could not be loaded.
            </div>
          ) : (
            <img
              className={styles.groupPhoto}
              src={groupPhoto}
              alt="The OUC-Haide team gathered together on a staircase."
              loading="eager"
              decoding="async"
              onError={() => setPhotoFailed(true)}
            />
          )}
          <Caption className={styles.photoCaption}>
            <span>OUC-HAIDE / TEAM 2026</span>
            <span className={styles.captionBubbles} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </span>
          </Caption>
        </figure>

        <div className={styles.introContent}>
          <div className={styles.introCopy}>
            <p>
              <strong>
                It all started with a question: What else could agricultural
                straw become?
              </strong>
            </p>
            <p>
              For OUC-Haide, that question grew into <strong>Carbotex</strong>,
              our 2026 iGEM project. We are exploring how carbon derived from
              agricultural residues can be used in microbial fermentation to
              produce polymalic acid (PMA), and how this polymer can be further
              developed into a bio-based adhesive material. What began as an
              idea about making better use of an overlooked resource has become
              a journey across biology, materials science, and sustainability.
            </p>
            <p>
              <strong>Different minds, one shared adventure.</strong>
            </p>
            <p>
              Some of us work with microorganisms and experiments; others dive
              into data, models, and material properties. Some connect our
              research with experts and communities, while others bring our
              ideas to life through education, design, and the Wiki. We
              don&apos;t always approach problems in the same way—and
              that&apos;s part of what makes working together exciting.
            </p>
            <p>
              <strong>
                Beyond the experiments, there&apos;s a team with plenty of
                personality.
              </strong>
            </p>
            <p>
              There are unexpected ideas, inside jokes, small victories worth
              celebrating, and those unforgettable sessions when everyone works
              together to finish the Wiki. Behind every part of Carbotex is
              someone with their own story, talents, and sense of humor.
            </p>
            <p className={styles.introClosing}>
              <strong>This is OUC-Haide. Come get to know us!</strong>
            </p>
          </div>
        </div>
      </section>

      <section
        id="team-network"
        ref={networkRef}
        className={styles.network}
        style={{ "--network-height": `${networkHeight}vh` } as CSSProperties}
        aria-labelledby="team-members-heading"
      >
        <h2 id="team-members-heading" className={styles.networkHeading}>
          Team Members
        </h2>

        <svg
          className={styles.networkLines}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {memberPoints.slice(0, -1).map((point, index) => {
              const next = memberPoints[index + 1];
              const fromColor = point.color;
              const toColor = next.color;
              const leftToRight = point.x <= next.x;

              return (
                <linearGradient
                  key={point.id}
                  id={`${gradientPrefix}-line-${index}`}
                  x1={leftToRight ? "0%" : "100%"}
                  x2={leftToRight ? "100%" : "0%"}
                  y1="0%"
                  y2="0%"
                >
                  <stop offset="30%" stopColor={fromColor} />
                  <stop offset="70%" stopColor={toColor} />
                </linearGradient>
              );
            })}
          </defs>

          <g className={styles.backgroundLines}>
            {backgroundLines.map((line) => (
              <path
                key={`${line.from.id}-${line.to.id}`}
                data-background-line
                d={line.path}
                pathLength="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          <g className={styles.mainLines}>
            {mainLines.map((line, index) => (
              <path
                key={`${line.from.id}-${line.to.id}`}
                data-main-line
                d={line.path}
                pathLength="1"
                vectorEffect="non-scaling-stroke"
                stroke={`url(#${gradientPrefix}-line-${index})`}
              />
            ))}
          </g>
        </svg>

        <div className={styles.backgroundDots} aria-hidden="true">
          {backgroundPoints.map((point) => (
            <span
              key={point.id}
              className={styles.backgroundDot}
              style={{
                left: `${point.x * 100}%`,
                top: `${point.y * 100}%`,
              }}
            >
              <svg viewBox="0 0 30 30">
                <circle cx="15" cy="15" r="15" />
              </svg>
            </span>
          ))}
        </div>

        {members.map((member, index) => (
          <MemberNode
            key={member.id}
            member={member}
            point={memberPoints[index]}
            onOpen={openMember}
          />
        ))}
      </section>

      <section className={styles.staticRoster} aria-labelledby="roster-heading">
        <div className={styles.staticRosterHeader}>
          <h2 id="roster-heading">Team Members</h2>
        </div>
        <div className={styles.staticGrid}>
          {members.map((member) => (
            <StaticMemberCard
              key={member.id}
              member={member}
              onOpen={openMember}
            />
          ))}
        </div>
      </section>

      {activeMember && (
        <MemberProfileDialog
          member={activeMember}
          onClose={() => setActiveMember(null)}
        />
      )}
    </main>
  );
}
