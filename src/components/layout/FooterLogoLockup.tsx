import { Link } from "react-router-dom";
import styles from "./footer-logo-lockup.module.css";

interface FooterLogoLockupProps {
  teamName: string;
  teamYear: string;
}

export function FooterLogoLockup({
  teamName,
  teamYear,
}: FooterLogoLockupProps) {
  return (
    <div className={styles.lockup}>
      <Link to="/" className={styles.teamBrand} aria-label={`${teamName} home`}>
        <img
          src="https://static.igem.wiki/teams/6147/wiki/fronted-resource/team-logo.webp"
          width="640"
          height="640"
          alt={`${teamYear} ${teamName}`}
          loading="lazy"
          decoding="async"
        />
      </Link>

      <div
        className={styles.institutions}
        role="group"
        aria-label="Partner institutions"
      >
        <span className={styles.haideFrame}>
          <img
            className={styles.haideMark}
            src="https://static.igem.wiki/teams/6147/wiki/fronted-resource/haide.webp"
            width="879"
            height="879"
            alt="Haide"
            loading="lazy"
            decoding="async"
          />
        </span>
        <img
          className={styles.oucMark}
          src="https://static.igem.wiki/teams/6147/wiki/fronted-resource/ouc-logo.svg"
          width="283"
          height="283"
          alt="Ocean University of China"
          loading="lazy"
          decoding="async"
        />
        <img
          className={styles.adelaideMark}
          src="https://static.igem.wiki/teams/6147/wiki/fronted-resource/adelaide-university-transparent.svg"
          width="318"
          height="216"
          alt="The University of Adelaide"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
