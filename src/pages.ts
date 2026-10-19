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
const Software = lazy(() =>
  import("./contents/software.tsx").then(({ Software }) => ({
    default: Software,
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
const Inclusivity = lazy(() =>
  import("./contents/inclusivity.tsx").then(({ Inclusivity }) => ({
    default: Inclusivity,
  })),
);
const Collaboration = lazy(() =>
  import("./contents/collaboration.tsx").then(({ Collaboration }) => ({
    default: Collaboration,
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
        lead: "Document the rationale of your biological system: which chassis, parts, and architecture you chose, and why each decision serves your project's goals.",
      },
      {
        name: "Experiments",
        title: "Experiments",
        path: "/experiments",
        component: Experiments,
        lead: "Describe the research and experiments that drove your project, providing sufficient information for other teams to understand and evaluate your work.",
      },
      {
        name: "Protocols",
        title: "Protocols",
        path: "/protocols",
        component: Protocols,
        lead: "Thorough documentation of experimental protocols is essential for reproducibility and transparency. Describe your methods in enough detail for other teams to reproduce your work.",
        layout: "article",
      },
      {
        name: "Notebook",
        title: "Notebook",
        path: "/notebook",
        component: Notebook,
        lead: "This serves as a chronological record of your team's progress throughout the season. It documents your daily activities, experiments, discussions, and decisions.",
      },
      {
        name: "Results",
        title: "Results",
        path: "/results",
        component: Results,
        lead: "Present the results of your project, along with a detailed analysis and discussion of their significance. Also outline future plans and reflections on the impact of your project.",
      },
      {
        name: "Safety",
        title: "Safety and Security",
        path: "/safety-and-security",
        component: SafetyAndSecurity,
        lead: "Detail the safety and security considerations of your project, adressing potential risks and outlining the measures taken to mitigate them.",
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
        lead: "A modular platform for automated ammonia-nitrogen removal and real-time fermentation monitoring.",
        layout: "article",
      },
      {
        name: "Software",
        title: "Software",
        path: "/software",
        component: Software,
        lead: "Software in iGEM should make synthetic biology based on standard parts easier, faster, better or more accessible to our community.",
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
        layout: "article",
      },
      {
        name: "Inclusivity",
        title: "Diversity and Inclusion",
        path: "/inclusivity",
        component: Inclusivity,
        lead: "Every individual, regardless of background or experience, should have an equal opportunity to engage with scientific knowledge and technological development.",
      },
      {
        name: "Collaboration & Communication",
        title: "Collaboration & Communication",
        path: "/collaboration",
        component: Collaboration,
        lead: "Describe how you engaged with other iGEM teams and the wider community through collaboration and communication, and how these interactions shaped your project.",
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
        lead: "Accurate attribution is essential in the iGEM Competition. It ensures that the judges can properly assess your team's contributions and recognize the support provided by external collaborators. This page is dedicated to fulfilling the Attributions requirement for judging.",
      },
    ],
  },
];

export default Pages;
