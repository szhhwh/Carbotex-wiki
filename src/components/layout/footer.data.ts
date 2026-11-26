import {
  BookOpen,
  ChartNoAxesCombined,
  ClipboardCheck,
  Cpu,
  Dna,
  FlaskConical,
  Gift,
  Handshake,
  ListChecks,
  Puzzle,
  RefreshCw,
  ShieldCheck,
  Sigma,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";
import Pages from "../../app/routes";

export interface FooterCard {
  path: string;
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
    title: "From straw to something that sticks.",
    copy: "Follow our journey of turning agricultural waste into bio-based adhesives.",
    icon: Sprout,
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
    title: "Let's solve a sticky mystery.",
    copy: "See how modeling helps us uncover the chemistry behind our bio-based adhesive.",
    icon: Sigma,
  },
  "/hardware": {
    title: "Smart tools, smoother science.",
    copy: "Discover how our hardware brings automation and smarter control to our biomanufacturing process.",
    icon: Cpu,
  },
  "/human-practices": {
    title: "Every voice leaves a mark.",
    copy: "Discover how conversations and feedback helped shape the journey of Carbotex.",
    icon: Handshake,
  },
  "/education": {
    title: "Curiosity knows no age.",
    copy: "Explore how we made synthetic biology fun and accessible for all generations.",
    icon: Puzzle,
  },
  "/members": {
    title: "Meet the minds behind Carbotex.",
    copy: "Get to know the people, passion, and teamwork bringing our ideas to life.",
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
