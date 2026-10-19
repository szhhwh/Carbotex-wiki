import {
  BookOpen,
  ChartNoAxesCombined,
  ClipboardCheck,
  Cpu,
  Dna,
  FlaskConical,
  Gift,
  GraduationCap,
  Handshake,
  Lightbulb,
  ListChecks,
  RefreshCw,
  ShieldCheck,
  Sigma,
  Users,
  type LucideIcon,
} from "lucide-react";
import Pages from "../../pages";

export interface FooterCard {
  path: string;
  group: string | undefined;
  page: string | undefined;
  title: string;
  copy: string;
  icon: LucideIcon;
}

interface Invitation {
  title: string;
  copy: string;
  icon: LucideIcon;
}

const invitations: Record<string, Invitation> = {
  "/description": {
    title: "Start with a big question.",
    copy: "Discover the challenge that set Carbotex in motion.",
    icon: Lightbulb,
  },
  "/engineering": {
    title: "A better idea, every cycle.",
    copy: "Follow the decisions behind our design, build, test and learn journey.",
    icon: RefreshCw,
  },
  "/contribution": {
    title: "Take something forward.",
    copy: "Find tools and ideas to bring into your own iGEM journey.",
    icon: Gift,
  },
  "/design": {
    title: "Think like a cell.",
    copy: "Look inside the biological blueprint behind our approach.",
    icon: Dna,
  },
  "/experiments": {
    title: "Meet us at the bench.",
    copy: "Step into the experiments that put our ideas to the test.",
    icon: FlaskConical,
  },
  "/protocols": {
    title: "Try the next step.",
    copy: "Explore the methods that turn a plan into hands-on work.",
    icon: ListChecks,
  },
  "/notebook": {
    title: "Turn back the lab clock.",
    copy: "Browse the day-to-day journey behind the project.",
    icon: BookOpen,
  },
  "/results": {
    title: "Let the evidence speak.",
    copy: "Explore our findings and the questions they open up.",
    icon: ChartNoAxesCombined,
  },
  "/safety-and-security": {
    title: "Care belongs in the lab.",
    copy: "See how responsibility shapes the way we work.",
    icon: ShieldCheck,
  },
  "/model": {
    title: "Give biology a new lens.",
    copy: "Explore the mathematics behind our biological questions.",
    icon: Sigma,
  },
  "/hardware": {
    title: "Build beyond the bench.",
    copy: "Discover the physical systems connecting ideas to applications.",
    icon: Cpu,
  },
  "/human-practices": {
    title: "Listen. Then rethink.",
    copy: "Meet the perspectives that helped reshape Carbotex.",
    icon: Handshake,
  },
  "/education": {
    title: "Spark someone's curiosity.",
    copy: "Explore science through learning, play and participation.",
    icon: GraduationCap,
  },
  "/members": {
    title: "Meet the curious minds.",
    copy: "Get to know the people bringing Carbotex to life.",
    icon: Users,
  },
  "/attributions": {
    title: "Every helping hand counts.",
    copy: "Meet the contributions and support behind our journey.",
    icon: ClipboardCheck,
  },
};

export const footerCards: FooterCard[] = Pages.flatMap((section) =>
  "folder" in section
    ? (section.folder ?? []).flatMap((page) => {
        const invitation = page.path ? invitations[page.path] : undefined;
        return page.path && invitation
          ? [
              {
                path: page.path,
                group: section.name,
                page: page.name,
                ...invitation,
              },
            ]
          : [];
      })
    : [],
);

export const FOOTER_CARD_OFFSETS = [-1, 0, 1, 2, 3, 4] as const;

export const getFooterCardIndex = (index: number) =>
  (index + footerCards.length) % footerCards.length;
