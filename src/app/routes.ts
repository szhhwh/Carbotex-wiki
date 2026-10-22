import type { ComponentType } from "react";
import { lazyWithRetry } from "../utils/lazyWithRetry";

export type PageLayout = "fullscreen" | "article";

// Keep route metadata immediately available to the Navbar. Each page module is
// fetched only when its route is rendered.
const HomePage = lazyWithRetry(
  () => import("../pages/HomePage.tsx"),
  "HomePage",
);
const DescriptionPage = lazyWithRetry(
  () => import("../pages/project/DescriptionPage.tsx"),
  "DescriptionPage",
);
const EngineeringPage = lazyWithRetry(
  () => import("../pages/project/EngineeringPage.tsx"),
  "EngineeringPage",
);
const PartsPage = lazyWithRetry(
  () => import("../pages/wet-lab/PartsPage.tsx"),
  "PartsPage",
);
const ContributionPage = lazyWithRetry(
  () => import("../pages/project/ContributionPage.tsx"),
  "ContributionPage",
);
const DesignPage = lazyWithRetry(
  () => import("../pages/wet-lab/DesignPage.tsx"),
  "DesignPage",
);
const ExperimentsPage = lazyWithRetry(
  () => import("../pages/wet-lab/ExperimentsPage.tsx"),
  "ExperimentsPage",
);
const ProtocolsPage = lazyWithRetry(
  () => import("../pages/wet-lab/ProtocolsPage.tsx"),
  "ProtocolsPage",
);
const NotebookPage = lazyWithRetry(
  () => import("../pages/wet-lab/NotebookPage.tsx"),
  "NotebookPage",
);
const ResultsPage = lazyWithRetry(
  () => import("../pages/wet-lab/ResultsPage.tsx"),
  "ResultsPage",
);
const SafetyAndSecurityPage = lazyWithRetry(
  () => import("../pages/wet-lab/SafetyAndSecurityPage.tsx"),
  "SafetyAndSecurityPage",
);
const ModelPage = lazyWithRetry(
  () => import("../pages/dry-lab/ModelPage.tsx"),
  "ModelPage",
);
const ModelGemPage = lazyWithRetry(
  () => import("../pages/dry-lab/ModelGemPage.tsx"),
  "ModelGemPage",
);
const ModelSoftwarePage = lazyWithRetry(
  () => import("../pages/dry-lab/ModelSoftwarePage.tsx"),
  "ModelSoftwarePage",
);
const ModelMdPage = lazyWithRetry(
  () => import("../pages/dry-lab/ModelMdPage.tsx"),
  "ModelMdPage",
);
const HardwarePage = lazyWithRetry(
  () => import("../pages/dry-lab/HardwarePage.tsx"),
  "HardwarePage",
);
const HumanPracticesPage = lazyWithRetry(
  () => import("../pages/human-practices/HumanPracticesPage.tsx"),
  "HumanPracticesPage",
);
const EducationPage = lazyWithRetry(
  () => import("../pages/human-practices/EducationPage.tsx"),
  "EducationPage",
);
const MembersPage = lazyWithRetry(
  () => import("../pages/team/MembersPage.tsx"),
  "MembersPage",
);
const AttributionsPage = lazyWithRetry(
  () => import("../pages/team/AttributionsPage.tsx"),
  "AttributionsPage",
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
    component: HomePage,
    layout: "fullscreen",
  },
  {
    name: "Project",
    folder: [
      {
        name: "Description",
        title: "Description",
        path: "/description",
        component: DescriptionPage,
        layout: "article",
      },
      {
        name: "Engineering",
        title: "Engineering Success",
        path: "/engineering",
        component: EngineeringPage,
        layout: "article",
      },
      {
        name: "Contribution",
        title: "Contribution",
        path: "/contribution",
        component: ContributionPage,
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
        component: DesignPage,
        layout: "article",
      },
      {
        name: "Parts",
        title: "Parts",
        path: "/parts",
        component: PartsPage,
        layout: "article",
      },
      {
        name: "Experiments",
        title: "Experiments",
        path: "/experiments",
        component: ExperimentsPage,
        layout: "article",
      },
      {
        name: "Protocols",
        title: "Protocols",
        path: "/protocols",
        component: ProtocolsPage,
        layout: "article",
      },
      {
        name: "Notebook",
        title: "Notebook",
        path: "/notebook",
        component: NotebookPage,
        layout: "article",
      },
      {
        name: "Results",
        title: "Results",
        path: "/results",
        component: ResultsPage,
        layout: "article",
      },
      {
        name: "Safety",
        title: "Safety and Security",
        path: "/safety-and-security",
        component: SafetyAndSecurityPage,
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
        component: ModelPage,
        layout: "article",
      },
      {
        name: "Metabolic Model (GEM)",
        title: "Metabolic Model (GEM)",
        path: "/model/gem",
        component: ModelGemPage,
        layout: "article",
        hideInMenu: true,
      },
      {
        name: "WetFlow Workbench",
        title: "WetFlow Workbench",
        path: "/model/software",
        component: ModelSoftwarePage,
        layout: "article",
        hideInMenu: true,
      },
      {
        name: "Molecular Dynamics (MD)",
        title: "Molecular Dynamics (MD)",
        path: "/model/md",
        component: ModelMdPage,
        layout: "article",
        hideInMenu: true,
      },
      {
        name: "Hardware",
        title: "Hardware",
        path: "/hardware",
        component: HardwarePage,
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
        component: HumanPracticesPage,
        layout: "article",
      },
      {
        name: "Education",
        title: "Education",
        path: "/education",
        component: EducationPage,
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
        component: MembersPage,
        layout: "article",
      },
      {
        name: "Attributions",
        title: "Attributions",
        path: "/attributions",
        component: AttributionsPage,
        layout: "article",
      },
    ],
  },
];

export default Pages;
