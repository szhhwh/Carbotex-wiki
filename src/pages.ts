import { type ComponentType } from "react";
import { lazyWithRetry } from "./utils/lazyWithRetry";

export type PageLayout = "fullscreen" | "article";

// Keep route metadata immediately available to the Navbar. Each page module is
// fetched only when its route is rendered.
const Home = lazyWithRetry(() =>
  import("./contents/home.tsx").then(({ Home }) => ({ default: Home })),
);
const Description = lazyWithRetry(() =>
  import("./contents/description.tsx").then(({ Description }) => ({
    default: Description,
  })),
);
const Engineering = lazyWithRetry(() =>
  import("./contents/engineering.tsx").then(({ Engineering }) => ({
    default: Engineering,
  })),
);
const Parts = lazyWithRetry(() =>
  import("./contents/parts.tsx").then(({ Parts }) => ({ default: Parts })),
);
const Contribution = lazyWithRetry(() =>
  import("./contents/contribution.tsx").then(({ Contribution }) => ({
    default: Contribution,
  })),
);
const Design = lazyWithRetry(() =>
  import("./contents/design.tsx").then(({ Design }) => ({ default: Design })),
);
const Experiments = lazyWithRetry(() =>
  import("./contents/experiments.tsx").then(({ Experiments }) => ({
    default: Experiments,
  })),
);
const Protocols = lazyWithRetry(() =>
  import("./contents/protocols.tsx").then(({ Protocols }) => ({
    default: Protocols,
  })),
);
const Notebook = lazyWithRetry(() =>
  import("./contents/notebook.tsx").then(({ Notebook }) => ({
    default: Notebook,
  })),
);
const Results = lazyWithRetry(() =>
  import("./contents/results.tsx").then(({ Results }) => ({
    default: Results,
  })),
);
const SafetyAndSecurity = lazyWithRetry(() =>
  import("./contents/safety-and-security.tsx").then(
    ({ SafetyAndSecurity }) => ({ default: SafetyAndSecurity }),
  ),
);
const Model = lazyWithRetry(() =>
  import("./contents/model.tsx").then(({ Model }) => ({ default: Model })),
);
const Hardware = lazyWithRetry(() =>
  import("./contents/hardware.tsx").then(({ Hardware }) => ({
    default: Hardware,
  })),
);
const HumanPractices = lazyWithRetry(() =>
  import("./contents/human-practices.tsx").then(({ HumanPractices }) => ({
    default: HumanPractices,
  })),
);
const Education = lazyWithRetry(() =>
  import("./contents/education.tsx").then(({ Education }) => ({
    default: Education,
  })),
);
const Members = lazyWithRetry(() =>
  import("./contents/members.tsx").then(({ Members }) => ({
    default: Members,
  })),
);
const Attributions = lazyWithRetry(() =>
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
  /**
   * Required: `fullscreen` drops the fixed-navbar body offset (Home);
   * `article` pages render their own hero via `ArticlePage`.
   */
  layout!: PageLayout;
}

const Pages: (Page | Folder)[] = [
  {
    name: "Home",
    title: "Home",
    path: "/",
    component: Home,
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
        layout: "article",
      },
      {
        name: "Engineering",
        title: "Engineering Success",
        path: "/engineering",
        component: Engineering,
        layout: "article",
      },
      {
        name: "Contribution",
        title: "Contribution",
        path: "/contribution",
        component: Contribution,
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
        layout: "article",
      },
      {
        name: "Parts",
        title: "Parts",
        path: "/parts",
        component: Parts,
        layout: "article",
      },
      {
        name: "Experiments",
        title: "Experiments",
        path: "/experiments",
        component: Experiments,
        layout: "article",
      },
      {
        name: "Protocols",
        title: "Protocols",
        path: "/protocols",
        component: Protocols,
        layout: "article",
      },
      {
        name: "Notebook",
        title: "Notebook",
        path: "/notebook",
        component: Notebook,
        layout: "article",
      },
      {
        name: "Results",
        title: "Results",
        path: "/results",
        component: Results,
        layout: "article",
      },
      {
        name: "Safety",
        title: "Safety and Security",
        path: "/safety-and-security",
        component: SafetyAndSecurity,
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
        layout: "article",
      },
      {
        name: "Hardware",
        title: "Hardware",
        path: "/hardware",
        component: Hardware,
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
        layout: "article",
      },
      {
        name: "Education",
        title: "Education",
        path: "/education",
        component: Education,
        layout: "article",
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
        layout: "article",
      },
      {
        name: "Attributions",
        title: "Attributions",
        path: "/attributions",
        component: Attributions,
        layout: "article",
      },
    ],
  },
];

export default Pages;
