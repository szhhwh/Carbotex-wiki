import {
  BookOpenCheck,
  Cpu,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Palette,
  Sigma,
  University,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { MemberRole, TeamMember } from "./types";

export const roleMeta: Record<
  MemberRole,
  { label: string; icon: LucideIcon; color: string }
> = {
  pi: {
    label: "Primary PI",
    icon: University,
    color: "var(--hardware-royal)",
  },
  secondaryPi: {
    label: "Secondary PI",
    icon: University,
    color: "var(--hardware-card-heading)",
  },
  instructor: {
    label: "Instructor",
    icon: BookOpenCheck,
    color: "var(--hardware-brown)",
  },
  leader: {
    label: "Team Leader",
    icon: Users,
    color: "var(--hardware-green)",
  },
  wetlab: {
    label: "Wet Lab",
    icon: FlaskConical,
    color: "var(--hardware-navy)",
  },
  drylab: {
    label: "Dry Lab",
    icon: Cpu,
    color: "var(--hardware-royal)",
  },
  design: {
    label: "Design",
    icon: Palette,
    color: "var(--hardware-green)",
  },
  education: {
    label: "Education",
    icon: GraduationCap,
    color: "var(--hardware-card-heading)",
  },
  model: {
    label: "Model",
    icon: Sigma,
    color: "var(--hardware-brown)",
  },
  advisor: {
    label: "Advisors",
    icon: HeartHandshake,
    color: "var(--hardware-royal)",
  },
};

export function primaryRole(member: TeamMember) {
  return roleMeta[member.roles[0]];
}

export function memberRoleLabel(member: TeamMember) {
  return member.roles[0] === "advisor"
    ? member.major
    : primaryRole(member).label;
}

export function portraitStyle(member: TeamMember) {
  const crop = member.imageCrop;
  if (!crop) return undefined;

  return {
    objectPosition: crop.objectPosition,
    transform: crop.scale ? `scale(${crop.scale})` : undefined,
    transformOrigin: crop.origin,
  } satisfies CSSProperties;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
