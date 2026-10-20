interface NavbarMenuCurvesProps {
  variant: string;
}

const wetVariant = "wet";

export function NavbarMenuCurves({ variant }: NavbarMenuCurvesProps) {
  const isWet = variant === wetVariant;

  return (
    <svg
      className="navbar-menu-curves"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 320"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-navbar-curves={variant}
    >
      {[0, 8, 16].map((offset) => (
        <path
          key={offset}
          d={
            isWet
              ? `M80 ${360 - offset}C190 ${342 - offset} 275 ${238 - offset} 420 ${200 - offset}C650 ${140 - offset} 940 ${-10 - offset} 1220 ${-70 - offset}`
              : `M100 ${360 - offset}C250 ${330 - offset} 380 ${250 - offset} 620 ${195 - offset}C840 ${145 - offset} 1050 ${80 - offset} 1220 ${-40 - offset}`
          }
          stroke="var(--nav-menu-ink)"
          strokeWidth="3.5"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
