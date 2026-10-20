import { lazy, type ComponentType } from "react";

export type PageLayout = "default" | "fullscreen" | "article";

// Keep route metadata immediately available to the Navbar. Each page module is
// fetched only when its route is rendered.
const Home = lazy(() =>
  import("./contents/home.tsx").then(({ Home }) => ({ default: Home })),
);
const Description = lazy(() =>
  import("./contents/description.tsx").then(({ Description }) => ({
    default: Description,
  })),
);
const Engineering = lazy(() =>
  import("./contents/engineering.tsx").then(({ Engineering }) => ({
    default: Engineering,
  })),
);
const Parts = lazy(() =>
  import("./contents/parts.tsx").then(({ Parts }) => ({ default: Parts })),
);
const Contribution = lazy(() =>
  import("./contents/contribution.tsx").then(({ Contribution }) => ({
    default: Contribution,
  })),
);
const Design = lazy(() =>
  import("./contents/design.tsx").then(({ Design }) => ({ default: Design })),
);
const Experiments = lazy(() =>
  import("./contents/experiments.tsx").then(({ Experiments }) => ({
    default: Experiments,
  })),
);
const Protocols = lazy(() =>
  import("./contents/protocols.tsx").then(({ Protocols }) => ({
    default: Protocols,
  })),
);
const Notebook = lazy(() =>
  import("./contents/notebook.tsx").then(({ Notebook }) => ({
    default: Notebook,
  })),
);
const Results = lazy(() =>
  import("./contents/results.tsx").then(({ Results }) => ({
    default: Results,
  })),
);
const SafetyAndSecurity = lazy(() =>
  import("./contents/safety-and-security.tsx").then(
    ({ SafetyAndSecurity }) => ({ default: SafetyAndSecurity }),
  ),
);
const Model = lazy(() =>
  import("./contents/model.tsx").then(({ Model }) => ({ default: Model })),
);
const Hardware = lazy(() =>
  import("./contents/hardware.tsx").then(({ Hardware }) => ({
    default: Hardware,
  })),
);
const HumanPractices = lazy(() =>
  import("./contents/human-practices.tsx").then(({ HumanPractices }) => ({
    default: HumanPractices,
  })),
);
const Education = lazy(() =>
  import("./contents/education.tsx").then(({ Education }) => ({
    default: Education,
  })),
);
const Members = lazy(() =>
  import("./contents/members.tsx").then(({ Members }) => ({
    default: Members,
  })),
);
const Attributions = lazy(() =>
  import("./contents/attributions.tsx").then(({ Attributions }) => ({
    default: Attributions,
  })),
);

interface Base {
  name: string | undefined;
}

class Folder implements Base {
  name: string | undefined;
  folder: Page[] | undefined;
}

class Page implements Base {
  name: string | undefined;
  title: string | undefined;
  path: string | undefined;
  component: ComponentType | undefined;
  lead: string | undefined;
  /** Fullscreen and article pages render without the shared Header and container. */
  layout?: PageLayout;
}

const Pages: (Page | Folder)[] = [
  {
    name: "Home",
    title: "Home",
    path: "/",
    component: Home,
    lead: "Your iGEM Journey Begins Here! We wish you a successful and rewarding season!",
    layout: "fullscreen",
  },
  {
    name: "Project",
    folder: [
      {
        name: "Description",
        title: "Project Description",
        path: "/description",
        component: Description,
        lead: "Describe how and why you chose your iGEM project.",
        layout: "article",
      },
      {
        name: "Engineering",
        title: "Engineering Success",
        path: "/engineering",
        component: Engineering,
        lead: "Four cycles of DBTL-driven development of an automated ammonia-nitrogen removal system for anaerobic fermentation effluent.",
        layout: "article",
      },
      {
        name: "Contribution",
        title: "Contribution",
        path: "/contribution",
        component: Contribution,
        lead: "Make a useful contribution for future iGEM teams and document it on this page.",
        layout: "article",
      },
    ],
  },
  {
    name: "Wet Lab",
    folder: [
      {
        name: "Design",
        title: "Design",
        path: "/design",
        component: Design,
        lead: "From agricultural residues to poly(malic acid) and bio-based adhesives: the rationale behind our chassis, genetic constructs, and four connected wet-lab modules.",
        layout: "article",
      },
      {
        name: "Parts",
        title: "Parts",
        path: "/parts",
        component: Parts,
        lead: "The Pentose-Regulation Part Collection connects regulator genes, expression constructs, precursor-supply candidates, and reusable genetic-engineering tools.",
        layout: "article",
      },
      {
        name: "Experiments",
        title: "Experiments",
        path: "/experiments",
        component: Experiments,
        lead: "From hydrolysate conditioning and regulator engineering to HPLC quantification and adhesive testing, these experiments explain how each comparison was designed and measured.",
        layout: "article",
      },
      {
        name: "Protocols",
        title: "Protocols",
        path: "/protocols",
        component: Protocols,
        lead: "Our wet-lab protocols cover strain preparation, molecular cloning, A08 transformation, corn-stover hydrolysate processing, fermentation analysis and PMA–dopamine adhesive preparation.",
        layout: "article",
      },
      {
        name: "Notebook",
        title: "Notebook",
        path: "/notebook",
        component: Notebook,
        lead: "This serves as a chronological record of your team's progress throughout the season. It documents your daily activities, experiments, discussions, and decisions.",
        layout: "article",
      },
      {
        name: "Results",
        title: "Results",
        path: "/results",
        component: Results,
        lead: "From strain identification and PMA production to a dopamine-functionalised bioadhesive: the experimental evidence behind Carbotex.",
        layout: "article",
      },
      {
        name: "Safety",
        title: "Safety and Security",
        path: "/safety-and-security",
        component: SafetyAndSecurity,
        lead: "A responsible approach to microbial, project, laboratory, and environmental safety throughout the Carbotex project.",
        layout: "article",
      },
    ],
  },
  {
    name: "Dry Lab",
    folder: [
      {
        name: "Model",
        title: "Model",
        path: "/model",
        component: Model,
        lead: "Explain your model's assumptions, data, parameters, and results in a way that anyone could understand.",
        layout: "article",
      },
      {
        name: "Hardware",
        title: "Hardware",
        path: "/hardware",
        component: Hardware,
        lead: "This page documents the design, component selection, operation, and testing of our modular hardware platform for automated ammonia-nitrogen removal from anaerobic fermentation effluent.",
        layout: "article",
      },
    ],
  },
  {
    name: "Human Practices",
    folder: [
      {
        name: "Integrated Human Practices",
        title: "Integrated Human Practices",
        path: "/human-practices",
        component: HumanPractices,
        lead: "We did not use Human Practices to justify Carbotex. We used it to modify Carbotex.",
        layout: "article",
      },
      {
        name: "Education",
        title: "Education",
        path: "/education",
        component: Education,
        lead: "Innovative educational tools and outreach activities have the ability to establish a two-way dialogue with new communities by discussing public values and the science behind synthetic biology.",
      },
    ],
  },
  {
    name: "Team",
    folder: [
      {
        name: "Members",
        title: "Meet Our Team",
        path: "/members",
        component: Members,
        lead: "This page is dedicated to introducing the individuals who made our iGEM project possible. Here, you'll find information about our team members, instructors, and advisors.",
        layout: "article",
      },
      {
        name: "Attributions",
        title: "Attributions",
        path: "/attributions",
        component: Attributions,
        layout: "article",
        lead: "Accurate attribution is essential in the iGEM Competition. It ensures that the judges can properly assess your team's contributions and recognize the support provided by external collaborators. This page is dedicated to fulfilling the Attributions requirement for judging.",
      },
    ],
  },
];

export default Pages;
