import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { stringToSlug } from "../../utils";
import { SocialIcon } from "./SocialIcon";
import { FooterProjectCarousel } from "./FooterProjectCarousel";
import styles from "./footer.module.css";

export function Footer() {
  const teamYear = import.meta.env.VITE_TEAM_YEAR;
  const teamName = import.meta.env.VITE_TEAM_NAME;
  const teamSlug = stringToSlug(teamName);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.upper}>
          <Link to="/" className={styles.brand} aria-label={`${teamName} home`}>
            <img
              src="https://static.igem.wiki/teams/6147/wiki/fronted-resource/team-logo.webp"
              width="640"
              height="640"
              alt={`${teamYear} ${teamName}`}
              loading="lazy"
              decoding="async"
            />
          </Link>
          <FooterProjectCarousel />
        </div>

        <div className={styles.lower}>
          {/* The following MUST be on every page: license information and link to the repository on gitlab.igem.org */}
          <div className={styles.legal}>
            <p className="mb-0">
              <small>
                © {teamYear} - Content on this site is licensed under a{" "}
                <a
                  className="subfoot"
                  href="https://creativecommons.org/licenses/by/4.0/"
                  rel="license"
                >
                  Creative Commons Attribution 4.0 International license
                </a>
                .
              </small>
            </p>
            <p>
              <small>
                The repository used to create this website is available at{" "}
                <a href={`https://gitlab.igem.org/${teamYear}/${teamSlug}`}>
                  gitlab.igem.org/{teamYear}/{teamSlug}
                </a>
                .
              </small>
            </p>
          </div>
          <div className={styles.social}>
            <h2>Stay connected</h2>
            <div className={styles.socialLinks}>
              <a
                href="https://space.bilibili.com/3546837736753215"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OUC-Haide on Bilibili"
                title="Bilibili"
              >
                <SocialIcon brand="bilibili" />
              </a>
              <a
                href="https://www.xiaohongshu.com/user/profile/6558285c000000000802c0d3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OUC-Haide on Xiaohongshu"
                title="Xiaohongshu"
              >
                <SocialIcon brand="xiaohongshu" />
              </a>
              <a
                href="https://www.douyin.com/user/MS4wLjABAAAAb11yG9p34437edyRbL5zEwlhf_9Wchd7iLAvIAt4w_c4-ixsVcHCcSb1gPqDDMgi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OUC-Haide on Douyin, account 76148610559"
                title="Douyin: 76148610559"
              >
                <SocialIcon brand="douyin" />
              </a>
              <a
                href="https://m.weibo.cn/u/8224602651?from=10GA095060&wm=9006_2001&sourceType=weixin&s_channel=4&s_trans=KnMtd%2B9zzwV%2FTMODxs1vWg%3D%3D_s"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OUC-Haide on Weibo"
                title="Weibo"
              >
                <SocialIcon brand="weibo" />
              </a>
            </div>
          </div>
          <div className={styles.contact}>
            <h2>Say hello</h2>
            <address>
              <div>
                <MapPin aria-hidden="true" />
                <span>
                  No.238 Songling Road, Laoshan Campus,
                  <br />
                  Ocean University of China,
                  <br />
                  Qingdao 266100, China
                </span>
              </div>
              <a href="tel:+8617806237376">
                <Phone aria-hidden="true" />
                <span>+86 17806237376</span>
              </a>
              <a href="mailto:1820795600@qq.com">
                <Mail aria-hidden="true" />
                <span>1820795600@qq.com</span>
              </a>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
