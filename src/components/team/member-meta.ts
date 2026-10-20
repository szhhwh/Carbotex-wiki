import {
  Cpu,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Palette,
  Sigma,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { MemberRole, TeamMember } from "./types";

export const roleMeta: Record<
  MemberRole,
  { label: string; icon: LucideIcon; color: string }
> = {
  leader: { label: "Team Leader", icon: Users, color: "#16633f" },
  wetlab: { label: "Wet Lab", icon: FlaskConical, color: "#df7a47" },
  drylab: { label: "Dry Lab", icon: Cpu, color: "#c8953f" },
  design: { label: "Design", icon: Palette, color: "#238d87" },
  education: { label: "Education", icon: GraduationCap, color: "#78a842" },
  model: { label: "Model", icon: Sigma, color: "#a9723f" },
  advisor: {
    label: "Advisors",
    icon: HeartHandshake,
    color: "#2f52a1",
  },
};

export function primaryRole(member: TeamMember) {
  return roleMeta[member.roles[0]];
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
