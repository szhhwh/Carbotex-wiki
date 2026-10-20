export type NavbarIllustrationVariant =
  | "project"
  | "wet"
  | "dry"
  | "human-practices"
  | "team";

interface NavbarIllustrationProps {
  className?: string;
  variant: NavbarIllustrationVariant;
}

const projectClipId = "navbar-project-illustration-clip";

function ProjectIllustration({
  className,
}: Pick<NavbarIllustrationProps, "className">) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 186 233.24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-navbar-art="project"
    >
      <defs>
        <clipPath id={projectClipId} transform="translate(0 92.65)">
          <polygon points="94.53 43.59 138.7 2.82 159.94 25.76 116.62 66.53 94.53 43.59" />
        </clipPath>
      </defs>
      <ellipse cx="93" cy="202.27" rx="93" ry="25.5" fill="#fff" />
      <path
        d="M110.28,29.06c2.16-14.53-7.25-13.5-7.25-13.5s-8.5-2.54-10.19,6.8-12.18,4.56-12.18,4.56-6.51-5.41-12.46,0,0,12.41,0,12.41c8.5,5.93,0,11.06,0,11.06s-9.53,1.9-2.64,14.54L84.23,47.7l6.82,7.36c10.11-1.27,7.43-7.36,7.43-7.36l-4-4.11Z"
        transform="translate(0 92.65)"
        fill="#ffc647"
      />
      <path
        d="M125.93,57.77s11.92,4.51,6,18.1c0,0-3.4,7.64-11.89,6.8s-11,7.64-11,7.64-.8,10-10.17,8.41S91.05,84.2,91.05,84.2l14.42-13.57-3.8-4.1s-2.18-8.4,8.93-5.05l6,5.05Z"
        transform="translate(0 92.65)"
        fill="#ffc647"
      />
      <polygon
        points="40.06 181.12 84.23 140.34 105.47 163.28 62.15 204.05 40.06 181.12"
        fill="#9cd7ca"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <polygon
        points="94.53 136.24 138.7 95.47 159.94 118.41 116.62 159.18 94.53 136.24"
        fill="#9cd7ca"
      />
      <g clipPath={`url(#${projectClipId})`}>
        <polygon
          points="133.57 55.05 120.86 232.83 167.1 8.72 133.57 55.05"
          fill="#fff"
          stroke="#9cd7ca"
          strokeMiterlimit="10"
          strokeWidth="4"
        />
      </g>
      <polygon
        points="94.53 136.24 138.7 95.47 159.94 118.41 116.62 159.18 94.53 136.24"
        fill="none"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <circle cx="125.54" cy="188.48" r="4.67" fill="#f2a530" />
    </svg>
  );
}

function WetIllustration({
  className,
}: Pick<NavbarIllustrationProps, "className">) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 186 141.74"
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-navbar-art="wet"
    >
      <ellipse cx="93" cy="116.24" rx="93" ry="25.5" fill="#fff" />
      <path
        d="M73.76,1.87H112.6s6-.9,6,5.38c0,0-.4,4.63-6,4.56V48.33l30.27,60.34s3.59,9.88-6.28,13.47-86.47,0-86.47,0-10.47-3.59-6-14.36l30.52-61v-35s-6.28.9-6.28-4.49S73.76,1.87,73.76,1.87Z"
        fill="#f7f0eb"
        stroke="#f7f0eb"
        strokeMiterlimit="10"
        strokeWidth="3.65"
      />
      <path
        d="M72,70.08h42.68l19,39.74a3,3,0,0,1-2.66,4.24H54.57a2.76,2.76,0,0,1-2.47-4Z"
        fill="#7bccc1"
        stroke="#7bccc1"
        strokeMiterlimit="10"
        strokeWidth="1.22"
      />
      <circle
        cx="102.93"
        cy="87.58"
        r="6.73"
        fill="#fef5e6"
        stroke="#fef5e6"
        strokeMiterlimit="10"
        strokeWidth="1.22"
      />
      <circle
        cx="89.47"
        cy="35.53"
        r="6.73"
        fill="#f9a343"
        stroke="#f9a343"
        strokeMiterlimit="10"
        strokeWidth="1.22"
      />
      <ellipse
        cx="98.32"
        cy="48.16"
        rx="5.06"
        ry="4.87"
        fill="#7bccc1"
        stroke="#7bccc1"
        strokeMiterlimit="10"
        strokeWidth="1.22"
      />
      <ellipse
        cx="85.69"
        cy="82.3"
        rx="4.23"
        ry="3.94"
        fill="#f9a343"
        stroke="#f9a343"
        strokeMiterlimit="10"
        strokeWidth="1.22"
      />
      <ellipse
        cx="87.42"
        cy="100.28"
        rx="4.23"
        ry="3.94"
        fill="#d0977c"
        stroke="#d0977c"
        strokeMiterlimit="10"
        strokeWidth="1.22"
      />
      <ellipse
        cx="95.5"
        cy="17.71"
        rx="4.23"
        ry="3.94"
        fill="#336699"
        stroke="#336699"
        strokeMiterlimit="10"
        strokeWidth="1.22"
      />
    </svg>
  );
}

function DryIllustration({
  className,
}: Pick<NavbarIllustrationProps, "className">) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 186 146.01"
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-navbar-art="dry"
    >
      <ellipse cx="93" cy="120.51" rx="93" ry="25.5" fill="#fff" />
      <polygon
        points="46.9 37.89 41.14 50.49 28.54 52.43 28.54 74.29 40.17 76.67 45.02 90.24 37.72 99.93 53.74 116.41 65.37 109.62 78.72 114.5 80.88 129.01 103.05 129.01 106.09 114.47 118.2 109.52 129.35 117.18 145.83 101.87 139.36 90.38 142.92 78.61 157.46 74.29 157.46 53.23 143.89 48.56 138.98 37.89 145.87 26.26 129.35 9.96 118.2 16.85 107.06 12.69 103.05 0 81.15 0 78.72 11.87 66.34 17.54 55.68 9.19 39.2 24.32 46.9 37.89"
        fill="#1f315f"
      />
      <circle cx="92.52" cy="63.1" r="36.83" fill="#fff" />
      <path
        d="M78.17,65.2S90.48,78.53,91.06,88.78"
        fill="#d0977c"
        stroke="#d0977c"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2.94"
      />
      <path
        d="M68.08,53.25S63.44,75.7,78.53,80.33c5.35,1.64,10.9-2.48,11.65-8C91,66.53,88.64,54.37,68.08,53.25Z"
        fill="#ffc647"
      />
      <path
        d="M106.93,59.18S91.35,77.91,90.48,91.34"
        stroke="var(--nav-menu-ink)"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="4.42"
      />
      <path
        d="M88.59,76c-3-8.36,1.29-29.23,26.44-33.2,0,0,11,34.85-16.23,39.8C94.35,83.41,90.11,80.26,88.59,76Z"
        fill="#f2a530"
      />
    </svg>
  );
}

function HumanPracticesIllustration({
  className,
}: Pick<NavbarIllustrationProps, "className">) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 186 134.68"
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-navbar-art="human-practices"
    >
      <ellipse cx="93" cy="109.18" rx="93" ry="25.5" fill="#fff" />
      <path
        d="M84,72s-17-20.09,21.64-25.5C105.59,46.52,107.13,79,84,72Z"
        fill="#ffc647"
      />
      <path
        d="M49.53,103.51,33.72,76.3c-3.47-5.91.81-11.21.81-11.21L43.23,52l-7.68-5.24,26.11-3.19,9.59,25.52-7-3.92L53.66,82.8A21.56,21.56,0,0,0,49.53,103.51Z"
        fill="#2f52a1"
      />
      <path
        d="M83.71,108.56v-25l-30.44.28S42.26,93.9,51,105.92a6.53,6.53,0,0,0,5.27,2.64Z"
        fill="#1f315f"
      />
      <path
        d="M75.66.62,107.13,0c6.85-.17,9.41,6.15,9.41,6.15l7.19,14,8.32-4.17L122.16,40.3l-27-4L102,32.07,91.77,14.27A21.52,21.52,0,0,0,75.66.62Z"
        fill="#2f52a1"
      />
      <path
        d="M54.66,28,76.54,40.19,91.07,13.45S87.59-1.08,72.82.76A6.53,6.53,0,0,0,68,4.09Z"
        fill="#1f315f"
      />
      <path
        d="M151.85,76.16l-15.19,27.56c-3.28,6-10,5.08-10,5.08L111,108.06l-.54,9.29L94.24,96.6l16.94-21.36.25,8H132A21.54,21.54,0,0,0,151.85,76.16Z"
        fill="#2f52a1"
      />
      <path
        d="M138.59,44.26,117.13,57.14l15.9,26s14.33,4.24,20.11-9.47a6.51,6.51,0,0,0-.45-5.87Z"
        fill="#1f315f"
      />
    </svg>
  );
}

function TeamIllustration({
  className,
}: Pick<NavbarIllustrationProps, "className">) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 186 139.83"
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-navbar-art="team"
    >
      <ellipse cx="93" cy="114.33" rx="93" ry="25.5" fill="#fff" />
      <path
        d="M47.73,26.53S40,16.63,45.13,9.31a10,10,0,0,1,12-3.43,14.85,14.85,0,0,1,5.17,3.84"
        fill="#fef5e6"
        stroke="#d1967c"
        strokeMiterlimit="10"
        strokeWidth="4.13"
      />
      <path
        d="M55,106.16c21.13,27.81,57.9,11.34,57.9,11.34C162.55,95.45,135,38.94,135,38.94S118.45-5.17,78.48,3.1c0,0-40.07,6.68-33.43,50.27a30.31,30.31,0,0,0,.75,3.4c.71,2.63,2,9.35,1,20.76C46.78,77.53,45.37,93.45,55,106.16Z"
        fill="#fef5e6"
        stroke="#d1967c"
        strokeMiterlimit="10"
        strokeWidth="4.13"
      />
      <path
        d="M74.13,62S88.46,67,83,75.42a9.66,9.66,0,0,1-3.63,3.2c-2.91,1.53-8.78,4-14.66,3"
        fill="#fef5e6"
        stroke="#d1967c"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.13"
      />
      <polygon
        points="71.59 23.77 78.48 21.02 77.1 27.91 71.59 23.77"
        fill="#fef5e6"
        stroke="#d1967c"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.76"
      />
      <circle cx="63.32" cy="26.53" r="2.07" fill="#d1967c" />
      <circle cx="86.75" cy="18.26" r="2.07" fill="#d1967c" />
      <polygon
        points="89.92 81.89 97.77 92.69 106.04 77.53 96.75 52.25 89.5 55.48 89.92 81.89"
        fill="#02b186"
        stroke="#9cd7ca"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.76"
      />
      <path
        d="M82.3,47S88.07,40.86,95,41.28v7.89l-7.25,3.08Z"
        fill="#02b186"
        stroke="#9cd7ca"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.76"
      />
      <path
        d="M89.5,55.48s-3.52.44-1.76-3.23L95,49.17s3.5-.15,1.76,3.08Z"
        fill="#0a473b"
      />
      <path
        d="M110.18,106.47s5.51,6.89,13.78-2.75"
        fill="#fef5e6"
        stroke="#d1967c"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.13"
      />
      <path
        d="M58.34,103.72s-2.77,4.63,0,8.59a6.77,6.77,0,0,0,10,1"
        fill="#fef5e6"
        stroke="#d1967c"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.13"
      />
      <path
        d="M112.93,37.56s-15.63-3.35-17.75,7a10.24,10.24,0,0,0,1.57,7.66,13.4,13.4,0,0,0,5.16,4.6"
        fill="#fef5e6"
        stroke="#d1967c"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.13"
      />
    </svg>
  );
}

export function NavbarIllustration({
  className,
  variant,
}: NavbarIllustrationProps) {
  switch (variant) {
    case "wet":
      return <WetIllustration className={className} />;
    case "dry":
      return <DryIllustration className={className} />;
    case "human-practices":
      return <HumanPracticesIllustration className={className} />;
    case "team":
      return <TeamIllustration className={className} />;
    case "project":
      return <ProjectIllustration className={className} />;
  }
}
