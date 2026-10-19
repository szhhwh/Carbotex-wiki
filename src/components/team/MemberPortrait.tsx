import { useState } from "react";
import { initials } from "./member-meta";
import type { TeamMember } from "./types";

interface MemberPortraitProps {
  member: TeamMember;
  className: string;
  alt: string;
  fallbackClassName: string;
}

export function MemberPortrait({
  member,
  className,
  alt,
  fallbackClassName,
}: MemberPortraitProps) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={className}>
      <span className={fallbackClassName} aria-hidden="true">
        {initials(member.name)}
      </span>
      {!failed && (
        <img
          src={member.image}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
