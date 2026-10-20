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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { MemberPortrait } from "./MemberPortrait";
import { MemberProfileDialog } from "./MemberProfileDialog";
import { initials, primaryRole } from "./member-meta";
import { createNetworkGeometry, type MemberPoint } from "./network-geometry";
import { RoleChips } from "./RoleChips";
import type { TeamMember } from "./types";
import styles from "./team-members.module.css";

gsap.registerPlugin(ScrollTrigger);

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
  const role = primaryRole(member);
  const isAdvisorGroup = member.roles[0] === "advisor";

  return (
    <div
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
        aria-label={
          isAdvisorGroup
            ? `Open the ${member.name}' message`
            : `Open ${member.name}'s profile (${role.label})`
        }
        aria-haspopup="dialog"
        onClick={() => onOpen(member)}
      >
        {isAdvisorGroup ? (
          <span
            className={styles.advisorNode}
            style={{ backgroundColor: role.color }}
          >
            Advisors
          </span>
        ) : (
          <svg viewBox="0 0 30 30" aria-hidden="true">
            <circle cx="15" cy="15" r="15" fill={role.color} />
          </svg>
        )}
        <span className={styles.dotImageSlot} aria-hidden="true">
          <span
            className={styles.dotInitials}
            style={{ backgroundColor: role.color }}
          >
            {initials(member.name)}
          </span>
          {!failed && (
            <img
              src={member.image}
              alt=""
              loading="eager"
              decoding="async"
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

  const networkHeight = 50 + (members.length - 1) * 46 + 52;
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
      "(min-width: 1025px) and (prefers-reduced-motion: no-preference)",
      () => {
        const backgroundLines = [
          ...network.querySelectorAll<SVGPathElement>("[data-background-line]"),
        ];
        const mainLines = [
          ...network.querySelectorAll<SVGPathElement>("[data-main-line]"),
        ];

        gsap.set([...backgroundLines, ...mainLines], {
          strokeDashoffset: 1,
        });

        const backgroundTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: network,
            start: "top 68%",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        backgroundLines.forEach((line) => {
          const y = Number(line.dataset.lineY ?? 0);
          backgroundTimeline.to(
            line,
            {
              strokeDashoffset: 0,
              duration: 0.075,
              ease: "none",
            },
            Math.min(0.92, Math.max(0, y * 0.92)),
          );
        });

        mainLines.forEach((line) => {
          gsap.to(line, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 45%",
              end: "bottom 82%",
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
      <header className={styles.intro}>
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
          <figcaption className={styles.heroTitle}>
            <span className={styles.heroKicker}>OUC-HAIDE / TEAM 2026</span>
            <h1 id="members-heading" className={styles.heroWordmark}>
              MEMBER
            </h1>
          </figcaption>
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
            <p>
              <strong>This is OUC-Haide. Come get to know us!</strong>
            </p>
          </div>
        </div>
      </header>

      <section
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
              const fromColor = primaryRole(members[index]).color;
              const toColor = primaryRole(members[index + 1]).color;
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
                data-line-y={line.scrollAnchor}
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
          <p className={styles.eyebrow}>The people behind Carbotex</p>
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
