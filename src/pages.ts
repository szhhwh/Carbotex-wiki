import type { ComponentType } from "react";
import { lazyWithRetry } from "./utils/lazyWithRetry";

export type PageLayout = "fullscreen" | "article";

// Keep route metadata immediately available to the Navbar. Each page module is
// fetched only when its route is rendered.
const Home = lazyWithRetry(() => import("./contents/home.tsx"), "Home");
const Description = lazyWithRetry(
  () => import("./contents/description.tsx"),
  "Description",
);
const Engineering = lazyWithRetry(
  () => import("./contents/engineering.tsx"),
  "Engineering",
);
const Parts = lazyWithRetry(() => import("./contents/parts.tsx"), "Parts");
const Contribution = lazyWithRetry(
  () => import("./contents/contribution.tsx"),
  "Contribution",
);
const Design = lazyWithRetry(() => import("./contents/design.tsx"), "Design");
const Experiments = lazyWithRetry(
  () => import("./contents/experiments.tsx"),
  "Experiments",
);
const Protocols = lazyWithRetry(
  () => import("./contents/protocols.tsx"),
  "Protocols",
);
const Notebook = lazyWithRetry(
  () => import("./contents/notebook.tsx"),
  "Notebook",
);
const Results = lazyWithRetry(
  () => import("./contents/results.tsx"),
  "Results",
);
const SafetyAndSecurity = lazyWithRetry(
  () => import("./contents/safety-and-security.tsx"),
  "SafetyAndSecurity",
);
const Model = lazyWithRetry(() => import("./contents/model.tsx"), "Model");
const ModelGem = lazyWithRetry(
  () => import("./contents/model-gem.tsx"),
  "ModelGem",
);
const ModelSoftware = lazyWithRetry(
  () => import("./contents/model-software.tsx"),
  "ModelSoftware",
);
const ModelMd = lazyWithRetry(
  () => import("./contents/model-md.tsx"),
  "ModelMd",
);
const Hardware = lazyWithRetry(
  () => import("./contents/hardware.tsx"),
  "Hardware",
);
const HumanPractices = lazyWithRetry(
  () => import("./contents/human-practices.tsx"),
  "HumanPractices",
);
const Education = lazyWithRetry(
  () => import("./contents/education.tsx"),
  "Education",
);
const Members = lazyWithRetry(
  () => import("./contents/members.tsx"),
  "Members",
);
const Attributions = lazyWithRetry(
  () => import("./contents/attributions.tsx"),
  "Attributions",
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
  hideInMenu?: boolean;
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
        name: "Metabolic Model (GEM)",
        title: "Metabolic Model (GEM)",
        path: "/model/gem",
        component: ModelGem,
        layout: "article",
        hideInMenu: true,
      },
      {
        name: "WetFlow Workbench",
        title: "WetFlow Workbench",
        path: "/model/software",
        component: ModelSoftware,
        layout: "article",
        hideInMenu: true,
      },
      {
        name: "Molecular Dynamics (MD)",
        title: "Molecular Dynamics (MD)",
        path: "/model/md",
        component: ModelMd,
        layout: "article",
        hideInMenu: true,
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
