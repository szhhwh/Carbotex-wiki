// Structured IHP content rendered as native JSX from the supplied source copy.
import { Link } from "react-router-dom";
import { Cite } from "../components/article/References";
import type {
  IhpCollaborator,
  IhpSectionContent,
  IhpStakeholderGroup,
} from "../components/human-practices/ihp-types";

export const stakeholderGroups: IhpStakeholderGroup[] = [
  {
    title: "Feedstock & Agricultural Reality",
    description:
      "Where straw comes from, how it is used, and what feedstock supply actually requires",
    stakeholders: [
      {
        name: "Local Agriculture & Rural Affairs Authority",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/01-feedstock-local-authority.webp",
        identity:
          "Government Agency · Regional Straw Utilization · Resource Management",
        question: "How is straw actually utilized locally?",
        impact: "Macro Data → Local Reality",
        why: "Global and national statistics could not fully represent how straw is actually used within our local agricultural system.",
        heard:
          "Straw already enters several established utilization pathways locally, while only a limited proportion is used as an industrial raw material.",
        changed:
          "We stopped treating regional resource abundance as direct evidence that straw would be readily available for Carbotex.",
        led: "Regional Utilization → Practical Supply",
        storyHref: "#ihp-local-authority",
      },
      {
        name: "Farmers & Cooperative",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/02-feedstock-farmers-cooperative.webp",
        identity: "Farmers & Cooperative · Straw Supply · Field Practice",
        question: "Can straw be collected and supplied reliably?",
        impact: "Abundance → Practical Availability",
        why: "Knowing how much straw exists was not enough. We needed to understand what happens to it after harvest.",
        heard:
          "Collection methods, storage conditions, transportation, and seasonality can affect when straw is available and in what condition it reaches users.",
        changed:
          "We began to distinguish statistical abundance from practical availability.",
        led: "Resource Potential → Real Supply Conditions",
        storyHref: "#ihp-farmers-cooperative",
      },
      {
        name: "Agricultural Expert & Planting Base",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/03-feedstock-agricultural-expert.webp",
        identity:
          "Agricultural Expert · Planting Base · Feedstock Characteristics",
        question: "Are different straw sources equally suitable as feedstock?",
        impact: "Straw → Feedstock Characteristics",
        why: "Even if straw could be collected, we still needed to understand whether different sources would behave similarly as biomanufacturing feedstocks.",
        heard:
          "Moisture content, impurities, storage stability, and supply characteristics can vary among straw sources and may affect subsequent processing.",
        changed:
          "We stopped treating straw as a uniform resource and began to see it as a feedstock embedded in a real agricultural system.",
        led: "Availability → Feedstock Suitability",
        storyHref: "#ihp-agricultural-expert",
      },
    ],
  },
  {
    title: "Biomanufacturing Pathway",
    description:
      "From choosing a PMA-producing route to understanding the mixed-sugar challenge",
    stakeholders: [
      {
        name: "Prof. Guanglei Liu",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/04-bio-guanglei-liu.webp",
        identity: "Professor · Microbial Biomanufacturing · Metabolic Pathways",
        question: "What should straw-derived carbon ultimately become?",
        impact: "Chassis First → Carbon Destination First",
        why: "Before selecting a chassis, we needed to determine what the carbon released from straw should ultimately become.",
        heard:
          "Feedstock characteristics, target product properties, existing biological production foundations, and future applications should be considered together before choosing a chassis.",
        changed:
          "We defined PMA as the target product and A08 as the candidate chassis instead of choosing an organism first.",
        led: "Straw-Derived Carbon → A08 → PMA",
        storyHref: "#ihp-guanglei-liu",
      },
      {
        name: "Prof. Yajun Liu",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/05-bio-yajun-liu.webp",
        identity: "Professor · Straw Hydrolysate · Biomanufacturing",
        question:
          "Can A08 use carbon under realistic straw hydrolysate conditions?",
        impact: "Ideal Medium → Real Mixed Sugars",
        why: "Our early understanding of A08 was based largely on simplified carbon-source conditions. We needed a system that better reflected real agricultural feedstock.",
        heard:
          "Straw hydrolysate mainly contained glucose and xylose; our experiments showed efficient glucose utilization but limited xylose utilization.",
        changed:
          "We moved from idealized single-sugar conditions toward a real straw-derived mixed-sugar system.",
        led: "Real Hydrolysate → Mixed Sugar Challenge",
        storyHref: "#ihp-yajun-liu",
      },
      {
        name: "Dr. Le Yu",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/06-bio-le-yu.webp",
        identity: "Researcher · Carbon Utilization · Resource Efficiency",
        question: "Could we simply leave xylose unused?",
        impact: "Unused Xylose → Available Carbon",
        why: "Because A08 utilized glucose more efficiently than xylose, we initially questioned whether the remaining xylose needed to be addressed.",
        heard:
          "Xylose had already been released from straw and represented an available fraction of feedstock carbon.",
        changed:
          "We defined improving xylose utilization as an engineering objective for Carbotex.",
        led: "Mixed Sugars → Xylose Utilization",
        storyHref: "#ihp-le-yu",
      },
    ],
  },
  {
    title: "Carbon Utilization & Engineering",
    description:
      "Regulatory design, experimental validation, and carbon-flow engineering toward PMA",
    stakeholders: [
      {
        name: "Dr. Nan Hao",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/07-bio-nan-hao.webp",
        identity: "Researcher · Carbon-Source Regulation · Synthetic Biology",
        question: "What limits xylose utilization in A08?",
        impact: "Metabolism → Regulation",
        why: "We initially approached limited xylose utilization mainly as a metabolic problem and looked for individual reactions that might constrain xylose conversion.",
        heard:
          "Carbon utilization depends not only on individual metabolic enzymes, but also on how cells sense carbon sources and coordinate gene expression.",
        changed:
          "We expanded our analysis from individual metabolic reactions toward the regulatory response of A08 to xylose.",
        led: "Metabolic Limitation → Regulatory Engineering",
        storyHref: "#ihp-nan-hao",
      },
      {
        name: "Dr. Tao Ma",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/08-bio-tao-ma.webp",
        identity: "Researcher · Regulatory Engineering · Synthetic Biology",
        question: "Which level of regulation should we engineer?",
        impact: "Downstream Genes → Upstream Regulators",
        why: "Once regulation became part of the problem, we needed to translate that insight into a practical engineering strategy.",
        heard:
          "Modifying many downstream genes individually could make the engineering design increasingly complex.",
        changed:
          "We shifted our attention toward upstream regulatory nodes that could influence a broader cellular response.",
        led: "Literature + Modeling → AraR / XlnR",
        storyHref: "#ihp-tao-ma",
      },
      {
        name: "Prof. Qilin Yu",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/09-bio-qilin-yu.webp",
        identity: "Professor · Functional Validation · Microbial Engineering",
        question: "How do we know our regulatory engineering actually works?",
        impact: "Genetic Success → Functional Improvement",
        why: "Introducing AraR/XlnR successfully would not by itself demonstrate that the engineering strategy improved Carbotex.",
        heard:
          "Genetic modification should be distinguished from functional improvement in carbon utilization and product formation.",
        changed:
          "We built a validation framework linking genetic modification, carbon utilization, and product formation.",
        led: "Construct Verification → Carbon Source Utilization → Mixed Sugar Fermentation → PMA Evaluation",
        storyHref: "#ihp-qilin-yu",
      },
      {
        name: "Prof. Weihui Wu",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/10-bio-weihui-wu.webp",
        identity: "Professor · Microbial Metabolism & Carbon Allocation",
        question: "Does more carbon uptake necessarily mean more PMA?",
        impact: "Carbon Uptake → Carbon Allocation",
        why: "Improving xylose utilization could allow more carbon to enter A08, but that did not necessarily mean more carbon would reach PMA.",
        heard:
          "Assimilated carbon can be distributed among biomass formation, cellular maintenance, competing pathways, and product formation.",
        changed:
          "We began asking where carbon goes, not only how much carbon is consumed.",
        led: "Carbon Utilization → Precursor Supply → pyruvate carboxylase (PYC)",
        storyHref: "#ihp-weihui-wu",
      },
    ],
  },
  {
    title: "Material & Application Design",
    description:
      "From PMA as a polymer to functionalization and evidence for adhesive performance",
    stakeholders: [
      {
        name: "Liu Ya",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/11-material-liu-ya.webp",
        identity: "Researcher · Polymer Structure · Material Development",
        question: "What makes PMA more than a fermentation product?",
        impact: "Product → Material Platform",
        why: "Producing PMA established a biological route, but production alone did not demonstrate its downstream value as a material.",
        heard:
          "We needed to consider the polymer itself, including molecular characteristics, chemical structure, and structure–property relationships.",
        changed:
          "We returned to PMA structure and recognized its pendant carboxyl groups as potential sites for further functionalization.",
        led: "PMA → Functionalizable Material Platform",
        storyHref: "#ihp-liu-ya",
      },
      {
        name: "Dr. Haotian Guo",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/12-material-haotian-guo.webp",
        identity:
          "Founder & CEO · Ailurus Bio · Synthetic Biology Entrepreneurship",
        question:
          "Were we designing a material, or simply naming an application?",
        impact: "Application Label → Material Design",
        why: "At this stage, “adhesive” was still mainly an application idea rather than a fully developed material module.",
        heard:
          "An application should not simply be named; a material requires a clear design rationale, preparation strategy, and validation pathway.",
        changed:
          "We began developing an independent material module around PMA instead of treating “adhesive” as the endpoint.",
        led: "Application Idea → Molecular Design",
        storyHref: "#ihp-haotian-guo",
      },
      {
        name: "Bright Moon Seaweed",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/13-material-bright-moon-seaweed.svg",
        identity: "Marine Biomaterials Company · Natural Polymer Development",
        question: "How can a natural polymer become a functional material?",
        impact: "PMA → Modifiable Polymer",
        why: "We wanted to understand how naturally derived polymers could be developed beyond their original structures.",
        heard:
          "Their experience introduced modification strategies for tuning natural-polymer properties.",
        changed:
          "We began to view PMA as a modifiable polymer backbone rather than a fixed fermentation product.",
        led: "Polymer Modification + Literature → Dopamine Functionalization",
        storyHref: "#ihp-bright-moon",
      },
      {
        name: "Ms. Yanni Yang",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/14-material-yanni-yang.webp",
        identity: "Deputy General Manager · Marine Attachment · Wet Interfaces",
        question:
          "What can biological attachment teach us about wet interfaces?",
        impact: "Molecular Design → Performance Context",
        why: "After establishing a functionalization strategy, we wanted a broader biological perspective on adhesion in real wet environments.",
        heard:
          "Oyster cultivation provided a real context for biological attachment at wet interfaces, while oyster and mussel adhesion involve different mechanisms.",
        changed:
          "We treated oyster attachment as a biological reference rather than direct mechanistic evidence for PMA-DA.",
        led: "Functionalization → Independent Adhesion Evaluation",
        storyHref: "#ihp-yanni-yang",
      },
    ],
  },
  {
    title: "Sustainable Manufacturing & Scale-up",
    description:
      "Environmental trade-offs, process reliability, evidence systems, and renewable-carbon context",
    stakeholders: [
      {
        name: "Eva",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/15-beyond-eva.webp",
        identity: "Sustainability Expert · Whole-System Sustainability",
        question: "Does renewable automatically mean sustainable?",
        impact: "Renewable → System Sustainability",
        why: "Because Carbotex begins with agricultural carbon, we initially associated renewable feedstock naturally with sustainability.",
        heard:
          "Feedstock origin is only one part of sustainability; resource use, energy, processing, downstream treatment, and trade-offs also matter.",
        changed:
          "We stopped treating sustainability as an assumed advantage and began using it as a whole-system evaluation criterion.",
        led: "Renewable Carbon → System Thinking → Sustainability Reflection",
        storyHref: "#ihp-eva",
      },
      {
        name: "Tsingtao Brewery",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/16-tsingtao-brewery.svg",
        identity:
          "Industrial Fermentation Company · Scale-Up · Quality Control",
        question: "What does scale-up require beyond larger volume?",
        impact: "Scale → Reproducibility & Control",
        why: "We wanted to understand what laboratory fermentation would need in order to become a reliable manufacturing process.",
        heard:
          "Manufacturing depends on batch consistency, process monitoring, and control, not simply larger fermenters.",
        changed:
          "Scale-up came to mean reproducible performance under controlled conditions, not only increasing volume.",
        led: "Laboratory Fermentation → Reliable Production",
        storyHref: "#ihp-tsingtao",
      },
      {
        name: "Kinger Robot",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/17-kinger-robot.svg",
        identity: "Automation Company · Process Integration · Traceability",
        question:
          "How do individual operations become one manufacturing process?",
        impact: "Separate Steps → Process Integration",
        why: "Carbotex contained several technical stages, but a manufacturing system would eventually need to connect them.",
        heard:
          "Automation, process integration, data recording, and traceability are important components of manufacturing.",
        changed:
          "Monitoring, standardization, integration, and traceability became criteria for future scale-up.",
        led: "Individual Operations → Integrated Manufacturing",
        storyHref: "#ihp-kinger",
      },
      {
        name: "BGI Group (BGI)",
        portrait: "https://static.igem.wiki/teams/6147/wiki/card/18-bgi.svg",
        identity: "Biotechnology Organization · Data Infrastructure · Analysis",
        question:
          "What supports engineering decisions as a biological system becomes more complex?",
        impact: "Experimental Results → Evidence Infrastructure",
        why: "As Carbotex became more complex, we wanted to understand what supports biotechnology development beyond individual experimental results.",
        heard:
          "Stronger data generation and analytical infrastructure can support more complete evidence chains for engineering decisions.",
        changed:
          "We recognized stronger data generation and interpretation as a future direction; these capabilities were not incorporated into current experiments.",
        led: "Future Direction → Stronger Engineering Evidence Chains",
        storyHref: "#ihp-bgi",
      },
      {
        name: "Shenzhen Synthetic Biology Infrastructure",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/19-shenzhen-synthetic-biology-infrastructure.svg",
        identity: "Synthetic Biology Infrastructure · Automated DBTL Systems",
        question: "What changes when engineering becomes systematic?",
        impact: "Single Experiment → Reproducible Workflow",
        why: "We wanted to understand synthetic biology engineering at a scale beyond a student laboratory.",
        heard:
          "Automation and systematic DBTL can support more standardized and reproducible workflows.",
        changed:
          "We began distinguishing one successful result from a workflow that can support repeated engineering iterations.",
        led: "Future Reference → Systematic & Reproducible Engineering",
        storyHref: "#ihp-shenzhen-infrastructure",
      },
      {
        name: "Qingdao Institute of Bioenergy and Bioprocess Technology (QIBEBT)",
        portrait: "https://static.igem.wiki/teams/6147/wiki/card/20-qibebt.svg",
        identity: "Research Institute · Renewable Carbon · Biomanufacturing",
        question: "What does a complete biomanufacturing system depend on?",
        impact: "Single Route → Manufacturing Ecosystem",
        why: "We wanted to understand how Carbotex's feedstock, fermentation, downstream processing, and material-development stages relate in real manufacturing.",
        heard:
          "Different stages may depend on different technologies and specialized partners rather than one organization reproducing the entire pathway.",
        changed:
          "We began to see Carbotex as part of a broader renewable-carbon biomanufacturing ecosystem.",
        led: "Technical Route → Manufacturing Ecosystem",
        storyHref: "#ihp-qibebt",
      },
    ],
  },
  {
    title: "Evaluation & Community Engagement",
    description:
      "External evaluation, responsible research, peer learning, and public participation",
    stakeholders: [
      {
        name: "Conference of China iGEMer Community (CCiC) Judges",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/21-ccic-judges.webp",
        identity: "iGEM Judges · Project Integration · DBTL",
        question: "Were our project modules actually connected?",
        impact: "Separate Modules → DBTL Iteration",
        why: "CCiC allowed us to present Carbotex as a complete project rather than as a collection of individual experiments.",
        heard:
          "Biological engineering, modeling, fermentation, and material development still appeared relatively separate.",
        changed:
          "We began organizing our engineering through Design → Build → Test → Learn so results from one stage could inform the next.",
        led: "Project Modules → Iterative Engineering",
        storyHref: "#ihp-ccic",
      },
      {
        name: "Grand APiC Judges",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/card/22-grand-apic-judges.webp",
        identity: "iGEM Judges · Biosafety · Responsible Implementation",
        question: "Which biosafety risks actually matter?",
        impact: "Cell Escape → Risk & Consequence",
        why: "As Carbotex moved toward real-world implementation, we needed to consider biosafety beyond routine laboratory procedures.",
        heard:
          "Limited environmental proliferation does not eliminate other questions, particularly the possibility and consequences of horizontal gene transfer (HGT).",
        changed:
          "We shifted from focusing mainly on viable cell escape toward risk, consequence, and remaining uncertainty.",
        led: "Containment → HGT → Risk-Based Assessment",
        storyHref: "#ihp-grand-apic",
      },
    ],
    additionalCollaborators: {
      title: "Additional iGEM Teams & Collaborators",
      items: [
        {
          name: "Other teams",
          href: "#ihp-community",
        },
        {
          name: "Prof. Ning Yan",
          identity: "Artistic Guidance & Science Communication",
          href: "#ihp-collab-ning-yan",
        },
      ],
    },
  },
];

export const collaborators: IhpCollaborator[] = [
  {
    name: "OUC-China",
    description:
      "Peer learning from early team meetings to continued cross-university exchange.",
    href: "#ihp-collab-ouc-china",
  },
  {
    name: "Nankai University & Tianjin University",
    description:
      "Project discussions and laboratory visits during the Tianjin exchange.",
    href: "#ihp-collab-tianjin-exchange",
  },
  {
    name: "DUT-China",
    description:
      "CCiC commercialization discussions that informed Carbotex's PMA-DA feasibility and cost analysis.",
    href: "#ihp-collab-dut-china",
  },
  {
    name: "JLU-FBH",
    description:
      'The "From Teams, For Teams" roundtable on project development, organization, and Human Practices.',
    href: "#ihp-collab-jlu-fbh",
  },
  {
    name: "QingdaoAcademy",
    description:
      'Joint creation and delivery of the participatory science activity "17 C: The Fatal Experiment."',
    href: "#ihp-collab-qingdaoacademy",
  },
  {
    name: "Peking University × Rice University",
    description:
      "Organizers of the international Human Practices summit that broadened our approaches to engagement.",
    href: "#ihp-collab-peking-rice",
  },
  {
    name: "Princeton University iGEM Team",
    description:
      "A summit case study illustrating how expert input can help revisit design assumptions.",
    href: "#ihp-collab-princeton",
  },
  {
    name: "Prof. Ning Yan",
    description:
      "Professional artistic feedback for Carbotex's original science-communication song.",
    href: "#ihp-collab-ning-yan",
  },
];

export const ihpSections: IhpSectionContent[] = [
  {
    id: "ihp-overview-section",
    title: "Overview",
    parts: [
      {
        kind: "epigraph",
      },
    ],
    subsections: [
      {
        id: "ihp-overview",
        title: "1.1 Integrated Human Practices (IHP) at Carbotex",
        parts: [
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  <strong>
                    {
                      "We did not use Human Practices to justify Carbotex. We used it to modify Carbotex."
                    }
                  </strong>
                </p>
                <p>
                  <strong>
                    {
                      "Carbotex was shaped not only in the laboratory, but through continuous interaction with the world it is intended to enter."
                    }
                  </strong>
                  {
                    " As Carbotex moved beyond the laboratory toward real-world applications, we encountered new questions that experiments alone could not answer."
                  }
                </p>
                <p>
                  {"For us, "}
                  <strong>
                    {
                      "Integrated Human Practices became part of the project’s iterative design process."
                    }
                  </strong>
                  {
                    " Stakeholder perspectives challenged our assumptions, revealed practical constraints, and translated into decisions that were brought back into our Design–Build–Test–Learn (DBTL) cycle."
                  }
                </p>
                <p>
                  <strong>
                    {
                      "Our focus gradually shifted from proving Carbotex in the laboratory to understanding how it could become a practical, responsible, and meaningful solution in the real world."
                    }
                  </strong>
                </p>
              </>
            ),
          },
        ],
      },
      {
        id: "ihp-approach",
        title: "1.2 Our Approach",
        parts: [
          {
            kind: "content",
            inline: true,
            content: (
              <>
                <em>
                  <strong>{"TRACE Framework:"}</strong>
                </em>
                {" To make this process systematic, we developed "}
                <strong>
                  {"TRACE (Trigger, Reach Out, Analyze, Change, and Evaluate)"}
                </strong>
                {
                  ". TRACE allowed us to connect stakeholder engagement directly with project decisions and to keep Human Practices embedded throughout the DBTL cycle, rather than treating it as a collection of separate interviews."
                }
              </>
            ),
          },
          {
            kind: "figure",
            src: "https://static.igem.wiki/teams/6147/wiki/ihp.svg",
            alt: "TRACE framework showing Trigger, Reach Out, Analyze, Change, and Evaluate in relation to the Carbotex DBTL process.",
            ratio: "740 / 500",
            caption:
              "TRACE framework connecting stakeholder engagement with the Carbotex DBTL cycle.",
            figureNumber: 1,
            frame: "none",
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                <em>
                  <strong>{"Stakeholder Matrix:"}</strong>
                </em>
                {" We identified potential stakeholders through team "}
                <strong>{"brainstorming"}</strong>
                {
                  " and grouped them within the Carbotex ecosystem. Each group was then assessed by "
                }
                <strong>{"Affectedness, Influence, and Expertise,"}</strong>
                {
                  " helping us prioritize meaningful engagement throughout the project."
                }
              </>
            ),
          },
          {
            kind: "figure",
            src: "https://static.igem.wiki/teams/6147/wiki/ihp-2.avif",
            alt: "OUC-Haide team members brainstorming and organizing stakeholders for the Carbotex Stakeholder Matrix.",
            ratio: "540 / 380",
            caption: "Team brainstorming for the Carbotex Stakeholder Matrix.",
            figureNumber: 2,
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                <em>
                  <strong>{"Stakeholder Ecosystem Map:"}</strong>
                </em>
                {" We further visualized our identified stakeholders in a "}
                <strong>{"Stakeholder Ecosystem Map"}</strong>
                {
                  ", providing an at-a-glance view of how they connect to Carbotex and where their perspectives contribute across the project. The map also served as a guide for navigating our subsequent IHP journey."
                }
              </>
            ),
          },
          {
            kind: "ecosystem-map",
          },
        ],
      },
      {
        id: "ihp-journey-roadmap",
        title: "1.3 Our Integrated Human Practices Journey",
        parts: [
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "Our Human Practices developed as a continuous process rather than a series of isolated engagements. The roadmap below summarizes how stakeholder mapping and TRACE-guided engagement moved into project decisions, implementation, reflection, unresolved limitations, and finally a reusable TRACE Handbook."
                }
              </>
            ),
          },
          {
            kind: "figure",
            src: "https://static.igem.wiki/teams/6147/wiki/journey.avif",
            alt: "Integrated Human Practices Journey",
            ratio: "740 / 500",
            caption: "Integrated Human Practices Journey.",
            figureNumber: 4,
          },
        ],
      },
      {
        id: "ihp-decisions",
        title: "1.4 Five Decisions Human Practices Changed",
        parts: [
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "Human Practices did not simply validate Carbotex. Across the project, it changed several of the questions we asked and the decisions we made. The five shifts below summarize the strongest examples; each is developed through the TRACE cases that follow."
                }
              </>
            ),
          },
          {
            kind: "decisions",
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "These pivots are not a ranking of our stakeholders. They are a compact view of where engagement most clearly entered the project as a decision, experiment, evaluation criterion, or limitation."
                }
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    id: "ihp-journey",
    title: "Our IHP Journey",
    parts: [
      {
        kind: "content",
        inline: false,
        content: (
          <>
            <p>
              {
                "Carbotex evolved through continuous dialogue with stakeholders across different stages of the project. Each engagement began with a question or challenge emerging from our work, and the perspectives we received often led us to reconsider assumptions, refine our design, or identify new priorities."
              }
            </p>
            <p>
              {"To make this journey easy to explore, we first present a "}
              <strong>{"Stakeholder Navigator"}</strong>
              {
                ", providing a concise overview of who we engaged with, why we reached out to them, and how they influenced Carbotex. Each card links to the corresponding detailed case below."
              }
            </p>
          </>
        ),
      },
      {
        kind: "label",
        text: "Stakeholder Navigator",
      },
      {
        kind: "content",
        inline: true,
        content: (
          <>
            {
              "The six groups below follow Carbotex's main project questions. Stakeholder feedback remains linked to the relevant detailed TRACE story. Community exchanges are listed separately because not every exchange was a formal consultation."
            }
          </>
        ),
      },
      {
        kind: "navigator",
      },
      {
        kind: "collaborators",
      },
      {
        kind: "content",
        inline: false,
        content: (
          <>
            <p>
              {"In the detailed journey, we use our "}
              <strong>
                {
                  "TRACE framework — Trigger, Reach Out, Analyze, Change, and Evaluate —"
                }
              </strong>
              {
                " to show how each engagement moved from a project question to a concrete decision or next step."
              }
            </p>
            <p>
              {
                "During the early stage of our Human Practices, we also exchanged ideas with "
              }
              <strong>{"Professor Jinshui Yang"}</strong>
              {
                " from China Agricultural University. He encouraged us to approach Human Practices at "
              }
              <strong>
                {
                  "multiple levels rather than relying on a single type of stakeholder"
                }
              </strong>
              {"."}
            </p>
            <p>
              {
                "This prompted us to broaden our engagement beyond scientific experts and consider perspectives from feedstock producers, researchers, materials specialists, industry, governance, and society. His advice therefore helped shape how we approached the IHP journey that followed."
              }
            </p>
          </>
        ),
      },
    ],
    subsections: [
      {
        id: "ihp-beginning",
        title: "2.0 Where It Began",
        parts: [
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "Carbotex began with our observation of straw burning. Since crop straw contains substantial amounts of carbon-rich components, we started with a simple question: why was part of this agricultural resource still being directly burned?"
                  }
                </p>
                <p>
                  {
                    "We then investigated straw management from both global and Chinese perspectives. Gradually, we realized that straw was not simply a form of agricultural waste waiting to be utilized. Instead, it already served multiple purposes, including field retention, livestock feed, and other off-field uses, with the trade-offs among these pathways varying across local contexts. In China, official data for 2024 showed that more than 88% of collectable crop straw was comprehensively utilized, while the industrial raw-material utilization rate was only 0.7% "
                  }
                  <Cite k={["MARA2025Straw"]} />
                  {"."}
                </p>
                <p>
                  <strong>
                    {
                      "This shifted our focus from simply increasing straw utilization to asking how the carbon contained in straw could be effectively converted through biomanufacturing. Research on lignocellulosic biorefineries suggested a possible route by using straw as a renewable carbon feedstock for microbial production"
                    }
                  </strong>{" "}
                  <Cite k={["Francois2020"]} />
                  {"."}
                </p>
                <p>{"This led us to a central question:"}</p>
                <p>
                  <strong>
                    {
                      "Could we establish a biomanufacturing route that directs straw-derived carbon into the production of bio-based materials?"
                    }
                  </strong>
                </p>
                <p>
                  {
                    "Before designing the biological system, however, we needed to understand how straw was actually produced, collected, stored, and handled in practice. These questions took us beyond the literature and into the agricultural system itself."
                  }
                </p>
              </>
            ),
          },
        ],
      },
      {
        id: "ihp-feedstock",
        title: "2.1 Understanding the Problem & Feedstock",
        parts: [
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "Our preliminary research showed that crop straw is already widely used for purposes such as field return and animal feed, while raw-material utilization remains a small share of the national utilization structure "
                }
                <Cite k={["MARA2025Straw"]} />
                {
                  ". Rather than replacing these existing uses, Carbotex aims to connect suitable agricultural carbon streams with biomanufacturing, offering a renewable feedstock perspective for sustainable production."
                }
              </>
            ),
          },
          {
            kind: "trace",
            number: 1,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Abundant resources do not necessarily mean that all straw is readily available or equally suitable for biomanufacturing. Macro-level data helped us understand the overall utilization landscape, but we still needed to understand how straw was handled within the agricultural system:"
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "How is straw currently used? Can it be obtained reliably in practice? What characteristics might affect its potential for biomanufacturing?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "reach-out",
                parts: [
                  {
                    kind: "anchor",
                    id: "ihp-local-authority",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <em>{"Local Agriculture & Rural Affairs Authority"}</em>
                      </>
                    ),
                  },
                  {
                    kind: "gallery",
                    images: [
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-local-authority-01.avif",
                        alt: "Local stakeholder visit during the feedstock Reach Out stage.",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-local-authority-02.avif",
                        alt: "Local stakeholder visit during the feedstock Reach Out stage.",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-local-authority-03.avif",
                        alt: "Local stakeholder visit during the feedstock Reach Out stage.",
                      },
                    ],
                    columns: 3,
                    ratio: "220 / 285",
                    caption:
                      "Visit to the local authority on straw utilization.",
                    figureNumber: 5,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Global and national data could not fully represent local conditions. We therefore reached out to the local Agriculture & Rural Affairs authority to understand how straw is actually utilized locally."
                          }
                        </p>
                        <p>
                          {
                            "Local representatives pointed out that straw already enters several established utilization pathways, while only a relatively limited proportion is directed toward industrial applications."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "This led to a more practical question: Can suitable straw be reliably collected and supplied for biomanufacturing?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "anchor",
                    id: "ihp-farmers-cooperative",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <em>{"Farmers & Cooperative"}</em>
                      </>
                    ),
                  },
                  {
                    kind: "gallery",
                    images: [
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-farmers-cooperative-01.avif",
                        alt: "Field engagement with farmers and cooperative stakeholders concerning straw collection, storage, and supply.",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-farmers-cooperative-02.avif",
                        alt: "Field engagement with farmers and cooperative stakeholders concerning straw collection, storage, and supply.",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-farmers-cooperative-03.avif",
                        alt: "Field engagement with farmers and cooperative stakeholders concerning straw collection, storage, and supply.",
                      },
                    ],
                    columns: 3,
                    ratio: "270 / 220",
                    caption:
                      "Discussion with farmers and a cooperative on straw supply.",
                    figureNumber: 6,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "To understand the practical availability of straw, we spoke with farmers and a cooperative about how straw is collected, stored, and supplied after harvest."
                          }
                        </p>
                        <p>
                          {
                            "Farmers and cooperative representatives emphasized that statistical abundance does not necessarily translate into reliable supply. Collection methods, storage conditions, transportation, and seasonality can all affect when and in what condition straw becomes available."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "This led us to look beyond availability itself and ask whether these real-world conditions could affect straw as a biomanufacturing feedstock."
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "anchor",
                    id: "ihp-agricultural-expert",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <em>{"Agricultural Expert & Planting Base"}</em>
                      </>
                    ),
                  },
                  {
                    kind: "gallery",
                    images: [
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-agricultural-expert-planting-base-01.avif",
                        alt: "Planting-base and feedstock observations relevant to straw suitability.",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-agricultural-expert-planting-base-02.avif",
                        alt: "Planting-base and feedstock observations relevant to straw suitability.",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-agricultural-expert-planting-base-03.avif",
                        alt: "Planting-base and feedstock observations relevant to straw suitability.",
                      },
                    ],
                    columns: 3,
                    ratio: "270 / 220",
                    caption:
                      "Planting-base observations on straw sources and storage.",
                    figureNumber: 7,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "We therefore consulted an agricultural expert and visited a planting base to understand differences among straw sources from both feedstock and production perspectives."
                          }
                        </p>
                        <p>
                          {
                            "The consultation and field observations highlighted factors including moisture content, impurities, storage stability, and supply characteristics. These properties can vary across straw sources and may affect subsequent storage, processing, and reliable entry into a biomanufacturing system."
                          }
                        </p>
                        <p>
                          {
                            "At this point, we had developed a clearer understanding of straw utilization from three complementary perspectives: "
                          }
                          <strong>
                            {
                              "regional utilization, practical supply, and feedstock characteristics."
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Bringing together these perspectives helped us reconsider how agricultural biomass should be understood within Carbotex."
                          }
                        </p>
                        <p>
                          {
                            "The local agricultural authority highlighted the existing utilization structure, farmers and cooperatives emphasized the practical conditions of straw supply, and agricultural experts drew our attention to variations in feedstock characteristics."
                          }
                        </p>
                        <p>
                          {
                            "Together, these insights showed us that straw is not simply an abundant agricultural resource, but an important part of an existing agricultural system. Its potential for biomanufacturing needs to be understood alongside established utilization practices and real-world supply conditions."
                          }
                        </p>
                        <p>
                          {
                            "At the same time, these perspectives reinforced the value of exploring new pathways for converting agricultural biomass into higher-value products, creating further opportunities for biomass valorization."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "These insights reshaped how we understood the significance of Carbotex and clarified our research direction."
                          }
                        </p>
                        <p>
                          {
                            "We began to view Carbotex not simply as a way to utilize abundant straw, but as an opportunity to explore how agricultural carbon could be converted into higher-value products through synthetic biology."
                          }
                        </p>
                        <p>
                          {
                            "This broader agricultural perspective strengthened our commitment to biomass valorization and provided a meaningful foundation for our subsequent research."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Our focus therefore moved from understanding the broader challenges of agricultural resource utilization to exploring how biological engineering could enable more effective carbon conversion."
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Through these engagements, we gained a more grounded understanding of the agricultural context surrounding straw utilization."
                          }
                        </p>
                        <p>
                          {
                            "Looking back at our initial questions, the discussions helped us understand how straw is currently used, what conditions influence its practical availability, and which characteristics may matter for its future utilization in biomanufacturing."
                          }
                        </p>
                        <p>
                          {
                            "More importantly, these perspectives helped us connect the broader challenge of agricultural biomass utilization with a more focused research direction that we could explore through synthetic biology."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "With a clearer understanding of the agricultural context, our next question became: What should straw-derived carbon ultimately become, and how could a biological system make that conversion possible?"
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "This marked our transition from understanding the agricultural system to building the biological system."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ihp-biological-system",
        title: "2.2 Building the Biological System",
        parts: [
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "Our exploration of agricultural resource utilization helped us understand the potential value of further developing straw-derived carbon resources."
                  }
                </p>
                <p>
                  {
                    "We then shifted our attention from agricultural resources to biological conversion, asking how microbial production could transform this renewable carbon into a product with potential for downstream applications."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "label",
            text: "Defining the Carbon Destination",
          },
          {
            kind: "trace",
            number: 2,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Having examined the agricultural context of straw, we needed to identify a biologically feasible conversion route that could connect straw-derived carbon with a value-added product and potential material applications."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Which target product and microbial production system could provide a reliable starting point for valorizing sugars derived from straw?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "reach-out",
                parts: [
                  {
                    kind: "anchor",
                    id: "ihp-guanglei-liu",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <strong>{"Prof. Guanglei Liu"}</strong>
                      </>
                    ),
                  },
                  {
                    kind: "gallery",
                    images: [
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-guanglei-liu-01-project-planning.avif",
                        alt: "Online project-planning consultation with Prof. Guanglei Liu.",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-guanglei-liu-02-online-discussion.avif",
                        alt: "Online discussion with Prof. Guanglei Liu and OUC-Haide team members.",
                      },
                    ],
                    columns: 2,
                    ratio: "345 / 260",
                    caption:
                      "Consultation with Prof. Guanglei Liu on straw-derived carbon conversion.",
                    figureNumber: 8,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "To clarify the direction of biological carbon conversion, we consulted Prof. Guanglei Liu."
                          }
                        </p>
                        <p>
                          {
                            "Prof. Liu advised us to consider the characteristics of the carbon source, the properties and value of the target product, the existing foundation for biological production, and potential applications together, rather than evaluating the production capacity of a microbial strain in isolation."
                          }
                        </p>
                        <p>
                          {
                            "As we explored products that could give agricultural carbon additional value, "
                          }
                          <strong>{"poly(malic acid) (PMA)"}</strong>
                          {" attracted our attention."}
                        </p>
                        <p>
                          {
                            "PMA is a bio-based polymer with pendant carboxyl groups that offer opportunities for further chemical functionalization and material development. Meanwhile, previous research on PMA production by "
                          }
                          <em>{"Aureobasidium"}</em>
                          {
                            " species provided a relevant biological foundation."
                          }
                        </p>
                        <p>
                          {
                            "An established laboratory strain collection offered a concrete starting point for this direction: "
                          }
                          <strong>
                            <em>{"Aureobasidium melanogenum"}</em>
                            {" A08"}
                          </strong>
                          {"."}
                        </p>
                        <p>
                          {
                            "The supplying laboratory had previously isolated and screened this strain and had established its potential for producing high-molecular-weight PMA. This existing strain resource allowed us to investigate how PMA production could be connected with the conversion of agricultural carbon."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Drawing on Prof. Liu's perspective, we considered three connected factors: "
                          }
                          <strong>
                            {
                              "the potential of PMA as a functionalizable polymer, the existing PMA-production background of A08, and the feasibility of using agricultural sugars as fermentation substrates"
                            }
                          </strong>
                          {"."}
                        </p>
                        <p>
                          {
                            "Literature research also supported the biological production of PMA by "
                          }
                          <em>{"Aureobasidium"}</em>
                          {" species "}
                          <Cite k={["Chi2016PMLA"]} />
                          {"."}
                        </p>
                        <p>
                          {
                            "To establish the identity of the supplied strain, we examined its colony and microscopic morphology and analyzed its internal transcribed spacer (ITS) sequence."
                          }
                        </p>
                        <p>
                          {
                            "Phylogenetic analysis placed A08 in a cluster with the reference strain "
                          }
                          <em>{"A. melanogenum"}</em>
                          {" CBS 105.22, supporting its identification as "}
                          <em>{"Aureobasidium melanogenum"}</em>
                          {
                            " and providing a defined chassis for subsequent engineering."
                          }
                        </p>
                        <p>
                          {
                            "Together, the literature, available strain resource, and Prof. Liu's perspective on biological production supported "
                          }
                          <strong>
                            {
                              "A08 as our production chassis and PMA as the target product"
                            }
                          </strong>
                          {"."}
                        </p>
                        <p>
                          <strong>
                            <Link
                              to={"/design#design-chassis-selection-why-a08"}
                            >
                              {
                                "Explore A08 Chassis Background and Identification →"
                              }
                            </Link>
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        {
                          "Based on these considerations, we established an initial biological engineering route for Carbotex:"
                        }
                      </>
                    ),
                  },
                  {
                    kind: "flow",
                    steps: [
                      "Straw-Derived Fermentable Sugars",
                      "Aureobasidium melanogenum A08",
                      "PMA",
                      "Potential Functional Material Development",
                    ],
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "This direction connected agricultural carbon resources, a microbial production chassis, and downstream material development."
                          }
                        </p>
                        <p>
                          {
                            "It also helped us identify the key experimental questions for the next stage: examining A08's responses to different carbon sources, comparing PMA production under different sugar compositions, and further evaluating the feasibility of using sugars derived from actual straw feedstocks for fermentation."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "This stage established an A08–PMA conversion route supported by an existing PMA-production background and our strain-identification results."
                          }
                        </p>
                        <p>
                          {
                            "However, the structural carbohydrates in straw must first undergo upstream saccharification to release soluble sugars before they can be used as carbon sources in our A08 fermentation system."
                          }
                        </p>
                        <p>
                          {
                            "Cellulose primarily contributes glucose, while xylan in hemicellulose can release xylose. Consequently, straw-derived hydrolysates commonly contain both glucose and xylose."
                          }
                        </p>
                        <p>
                          {
                            "For Carbotex, identifying the chassis and target product was only the first step. We also needed to understand A08's production performance in this mixed-sugar environment."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "How would changes in glucose–xylose composition affect PMA production by A08?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "Revealing the Mixed-Sugar Challenge",
          },
          {
            kind: "trace",
            number: 3,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Lignocellulosic hydrolysates commonly contain different sugars, including glucose and xylose "
                          }
                          <Cite k={["Francois2020"]} />
                          {"."}
                        </p>
                        <p>
                          {
                            "Although A08 had an established background in PMA production, this did not mean it would perform equally well across different sugar compositions."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Could A08 maintain favorable PMA production when glucose and xylose were present together, especially as the proportion of xylose increased?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "reach-out",
                parts: [
                  {
                    kind: "anchor",
                    id: "ihp-yajun-liu",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <strong>{"Prof. Yajun Liu"}</strong>
                      </>
                    ),
                  },
                  {
                    kind: "gallery",
                    images: [
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-yajun-liu-01-gallery.avif",
                        alt: "On-site consultation with Prof. Yajun Liu under realistic feedstock conditions.",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-yajun-liu-02.avif",
                        alt: "Discussion and experimental context during consultation with Prof. Yajun Liu.",
                      },
                    ],
                    columns: 2,
                    ratio: "345 / 260",
                    caption:
                      "Consultation with Prof. Yajun Liu on straw hydrolysate conditions.",
                    figureNumber: 9,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "To connect our biological production system with agricultural residues, we received corn-stover hydrolysate provided by Prof. Yajun Liu. The hydrolysate had been prepared by a collaborating laboratory using a consolidated bio-saccharification (CBS) system."
                          }
                        </p>
                        <p>
                          {
                            "This provided an agricultural-residue-derived sugar source for investigating A08 fermentation under conditions relevant to Carbotex."
                          }
                        </p>
                        <p>
                          {"Our analysis of the hydrolysate showed that, "}
                          <strong>
                            {
                              "within the measured sugar fraction, glucose accounted for approximately 80.33% and xylose for 19.67%"
                            }
                          </strong>
                          {"."}
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "metrics",
                    label: "Measured hydrolysate sugar fraction",
                    items: [
                      {
                        value: "80.33%",
                        label: "Glucose",
                        detail: "of measured sugars",
                      },
                      {
                        value: "19.67%",
                        label: "Xylose",
                        detail: "of measured sugars",
                      },
                    ],
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Thus, glucose was the predominant sugar, but xylose represented a substantial component of the fermentation feedstock."
                          }
                        </p>
                        <p>
                          <strong>
                            <Link to={"/design#design-saccharification-module"}>
                              {"Explore the CBS System →"}
                            </Link>
                          </strong>
                        </p>
                        <p>
                          {
                            "We then examined A08 growth under different carbon-source conditions."
                          }
                        </p>
                        <p>
                          {
                            "The experiments showed that A08 could grow in the presence of glucose, xylose, and arabinose. However, subsequent fermentation comparisons revealed differences in PMA production: as the proportion of xylose increased in glucose–xylose mixtures, PMA titers generally decreased."
                          }
                        </p>
                        <p>
                          {
                            "These results drew our attention to the distinction between being able to grow on a carbon source and achieving favorable PMA production under that condition."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "anchor",
                    id: "ihp-le-yu",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <strong>{"Dr. Le Yu"}</strong>
                      </>
                    ),
                  },
                  {
                    kind: "gallery",
                    images: [
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-le-yu-01-discussion.avif",
                        alt: "Discussion with Dr. Le Yu on xylose and substrate utilization.",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-le-yu-02-group-photo.avif",
                        alt: "Group photo following consultation with Dr. Le Yu.",
                      },
                    ],
                    columns: 2,
                    ratio: "345 / 260",
                    caption:
                      "Discussion with Dr. Le Yu on xylose utilization and PMA production.",
                    figureNumber: 10,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "We discussed this experimental observation with Dr. Le Yu."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "If A08 could grow under xylose conditions, why did its PMA production decline as the xylose proportion increased? What did this mean for the utilization of straw-derived hydrolysate?"
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "Dr. Yu encouraged us to consider not only the glucose fraction, which supported more favorable PMA production, but also the carbon represented by xylose."
                          }
                        </p>
                        <p>
                          {
                            "Xylose had already been released from straw during upstream saccharification and formed part of the available fermentation substrate. Evaluating the potential of agricultural biomass valorization therefore required considering whether this carbon could contribute to the formation of the final product."
                          }
                        </p>
                        <p>
                          {
                            "Her perspective helped us clarify an important distinction: "
                          }
                          <strong>
                            {
                              "growth on a particular sugar does not necessarily mean efficient production of the target compound under that condition"
                            }
                          </strong>
                          {"."}
                        </p>
                        <p>
                          {
                            "For Carbotex, the goal was not merely to demonstrate that A08 could grow in a xylose-containing environment. We also wanted to explore how to improve PMA production under such conditions, making better use of the carbon available in straw hydrolysate for downstream biomanufacturing."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Combining the experimental findings with Dr. Yu's perspective, we examined the relationship between microbial growth and PMA production under different carbon-source conditions."
                          }
                        </p>
                        <p>
                          {
                            "A08 grew under glucose, xylose, and arabinose conditions, but its PMA-production performance varied."
                          }
                        </p>
                        <p>
                          {
                            "In our initial glucose–xylose composition comparison, the PMA titer was approximately "
                          }
                          <strong>
                            {"19.00 g/L under glucose-only conditions"}
                          </strong>
                          {", compared with "}
                          <strong>
                            {"11.61 g/L under xylose-only conditions"}
                          </strong>
                          {
                            ". PMA titers generally declined as the xylose proportion increased in the mixed-sugar formulations."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "metrics",
                    label: "PMA titer by single sugar",
                    items: [
                      {
                        value: "19.00 g/L",
                        label: "Glucose-only",
                      },
                      {
                        value: "11.61 g/L",
                        label: "Xylose-only",
                      },
                    ],
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "We also examined PMA production at different initial xylose concentrations. Increasing the supplied xylose concentration did not lead to a continuous increase in PMA titer, indicating that greater substrate loading alone was insufficient to resolve the production challenge."
                          }
                        </p>
                        <p>
                          {
                            "Together with the mixed-sugar composition of the actual corn-stover hydrolysate, these findings identified "
                          }
                          <strong>
                            {
                              "improving PMA production by A08 under xylose-containing conditions"
                            }
                          </strong>
                          {
                            " as an important direction for subsequent engineering."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Based on the experimental results and Dr. Yu's perspective, we focused our subsequent engineering efforts on improving PMA production by A08 under glucose–xylose conditions."
                          }
                        </p>
                        <p>
                          {
                            "We emphasized PMA titers across different glucose–xylose formulations and included treated corn-stover hydrolysate in the fermentation evaluation framework to examine whether engineering could improve product accumulation under conditions relevant to our feedstock."
                          }
                        </p>
                        <p>
                          <strong>
                            <Link to={"/design#design-xylose-module"}>
                              {"Explore the Mixed-Sugar Fermentation Results →"}
                            </Link>
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "This stage established a production challenge for A08 under xylose-containing conditions."
                          }
                        </p>
                        <p>
                          {
                            "Although the strain could grow on xylose, PMA titers were relatively low when xylose made up a greater proportion of the carbon source. Increasing xylose loading also failed to produce a sustained improvement in PMA accumulation."
                          }
                        </p>
                        <p>
                          {
                            "Together with Dr. Yu's emphasis on the value of the available feedstock carbon, these findings shifted our attention beyond substrate composition and cultivation conditions toward biological processes that might influence product formation."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Which biological mechanisms might affect PMA production by A08 under xylose-containing conditions?"
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "This led us to investigate regulatory processes associated with pentose metabolism."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "From Metabolic Limitation to Regulatory Engineering",
          },
          {
            kind: "trace",
            number: 4,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Having identified the PMA-production challenge under xylose-containing conditions, we needed to explore engineering strategies that could be tested in A08."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Should we modify individual metabolic reactions, or focus on upstream regulators capable of coordinating several metabolic processes?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "reach-out",
                parts: [
                  {
                    kind: "anchor",
                    id: "ihp-nan-hao",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <strong>{"Dr. Nan Hao"}</strong>
                      </>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-nan-hao-01-discussion.avif",
                    alt: "Discussion with Dr. Nan Hao on A08 xylose utilization.",
                    ratio: "540 / 380",
                    caption:
                      "Discussion with Dr. Nan Hao on xylose-related regulation.",
                    figureNumber: 11,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "To better understand the biological mechanisms that might contribute to A08's PMA-production performance under xylose-containing conditions, we discussed the problem with Dr. Nan Hao."
                          }
                        </p>
                        <p>
                          {
                            "Dr. Hao drew our attention to the fact that microbial responses to different carbon sources involve not only metabolic enzymes, but also carbon-source sensing and gene-expression regulation."
                          }
                        </p>
                        <p>
                          {
                            "Under pentose conditions in particular, several metabolic processes may be influenced by interconnected regulatory mechanisms rather than by a single metabolic reaction."
                          }
                        </p>
                        <p>
                          {
                            "This perspective broadened our initial focus on individual metabolic steps and encouraged us to consider "
                          }
                          <strong>
                            {
                              "whether transcriptional regulation might also influence carbon-source responses and PMA production in A08"
                            }
                          </strong>
                          {"."}
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "anchor",
                    id: "ihp-tao-ma",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <strong>{"Dr. Tao Ma"}</strong>
                      </>
                    ),
                  },
                  {
                    kind: "gallery",
                    images: [
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-tao-ma-01-lab-discussion.avif",
                        alt: "Laboratory discussion with Dr. Tao Ma on regulatory engineering.",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-tao-ma-02-group-photo.avif",
                        alt: "Group photo following discussion with Dr. Tao Ma.",
                      },
                    ],
                    columns: 2,
                    ratio: "345 / 260",
                    caption:
                      "Discussion with Dr. Tao Ma on regulatory engineering for xylose utilization.",
                    figureNumber: 12,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Building on this regulatory perspective, we further discussed potential engineering strategies with Dr. Tao Ma."
                          }
                        </p>
                        <p>
                          {
                            "Because pentose metabolism involves several interconnected processes, modifying downstream metabolic enzymes one by one could increase engineering complexity without necessarily improving the cell's overall response to a carbon source."
                          }
                        </p>
                        <p>
                          {
                            "In contrast, upstream transcriptional regulators may influence the expression of multiple related genes, making them promising candidates for further investigation."
                          }
                        </p>
                        <p>
                          {
                            "At the same time, the involvement of a regulator in pentose responses does not necessarily mean that increasing its expression will improve PMA production. Its effects on microbial growth and target-product formation must be evaluated experimentally."
                          }
                        </p>
                        <p>
                          {
                            "These discussions encouraged us to examine the biological functions and potential engineering value of pentose-associated transcriptional regulators, providing a useful perspective for subsequent target investigation."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Drawing on these discussions, we used literature research and the gene-annotation records of A08 to identify two candidate transcriptional regulators associated with fungal pentose responses: "
                          }
                          <strong>{"XlnR and AraR"}</strong>
                          {", corresponding to "}
                          <em>{"xlnR"}</em>
                          {" (g3332.t1) and "}
                          <em>{"araR"}</em>
                          {" (g13480.t1), respectively."}
                        </p>
                        <p>
                          {
                            "Previous research has implicated these regulators in fungal responses to pentose carbon sources "
                          }
                          <Cite k={["deSouza2013AraRXlnR"]} />
                          {"."}
                        </p>
                        <p>
                          {
                            "After identifying the candidates, we used published XlnR-recognition motifs to examine promoter sequences of selected PMA-associated and central-carbon-metabolism genes."
                          }
                        </p>
                        <p>
                          {"The analysis included "}
                          <em>{"PMA-1"}</em>
                          {", "}
                          <em>{"PMA-2"}</em>
                          {", and glycolysis-associated targets "}
                          <em>{"HK"}</em>
                          {", "}
                          <em>{"PFK"}</em>
                          {", "}
                          <em>{"GAPDH"}</em>
                          {", and "}
                          <em>{"PGK"}</em>
                          {"."}
                        </p>
                        <p>
                          {
                            "The predicted motif matches suggested possible links among pentose-responsive regulation, central carbon metabolism, and PMA production, providing a rationale for subsequent experimental testing."
                          }
                        </p>
                        <p>
                          {
                            "Together, the literature and sequence analyses supported the selection of XlnR and AraR as engineering targets requiring further functional validation."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "We established two complementary series of engineered strains centered on XlnR and AraR."
                          }
                        </p>
                        <p>
                          {
                            "The first series used single- and double-regulator deletions to investigate how these factors affected A08 growth under xylose and arabinose conditions."
                          }
                        </p>
                        <p>
                          {
                            "The second series used individual and combined overexpression of XlnR and AraR to evaluate whether these modifications could improve PMA production under different glucose–xylose compositions."
                          }
                        </p>
                        <p>
                          {
                            "Together, these experiments allowed us to examine the biological roles of the regulators and their potential engineering value, informing the subsequent selection of strains with favorable production performance."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "The regulator-deletion experiments showed that XlnR and AraR were associated with growth under pentose conditions, although their effects varied with the carbon source."
                          }
                        </p>
                        <p>
                          {
                            "Under xylose conditions, the double-deletion strain showed the strongest growth reduction, with an endpoint OD₆₀₀ of approximately "
                          }
                          <strong>{"1.27"}</strong>
                          {", compared with "}
                          <strong>{"3.90"}</strong>
                          {" for the parental A08 strain."}
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "metrics",
                    label: "Endpoint growth under xylose",
                    items: [
                      {
                        value: "1.27",
                        label: "Double-regulator deletion",
                        detail: "endpoint OD₆₀₀",
                      },
                      {
                        value: "3.90",
                        label: "Parental A08",
                        detail: "endpoint OD₆₀₀",
                      },
                    ],
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Under arabinose conditions, deleting AraR alone had a greater effect on growth than deleting XlnR alone."
                          }
                        </p>
                        <p>
                          {
                            "These findings supported investigating the two regulators individually and in combination, while also highlighting the importance of regulatory responses under pentose conditions."
                          }
                        </p>
                        <p>
                          {
                            "However, changes in deletion-strain growth did not establish whether overexpression could improve PMA production."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "We therefore turned to fermentation evaluation to determine the actual PMA-production performance of the XlnR/AraR-engineered strains."
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "Turning Regulatory Engineering into Fermentation Evidence",
          },
          {
            kind: "trace",
            number: 5,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Identifying XlnR and AraR provided a clear engineering direction, but successful genetic modification alone could not demonstrate an improvement in PMA production."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Could regulatory engineering improve PMA production under glucose–xylose conditions and in corn-stover hydrolysate?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "reach-out",
                parts: [
                  {
                    kind: "anchor",
                    id: "ihp-qilin-yu",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <strong>{"Prof. Qilin Yu"}</strong>
                      </>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-qilin-yu-01-experimental-framework.avif",
                    alt: "Discussion with Prof. Qilin Yu on functional validation of the regulatory strategy.",
                    ratio: "540 / 380",
                    caption:
                      "Discussion with Prof. Qilin Yu on functional validation.",
                    figureNumber: 13,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "To improve the functional evaluation of our engineered strains, we discussed our experimental approach with Prof. Qilin Yu."
                          }
                        </p>
                        <p>
                          {
                            "Prof. Yu emphasized the importance of distinguishing successful genetic modification from genuine functional improvement."
                          }
                        </p>
                        <p>
                          {
                            "For Carbotex, confirming that a genetic construct had been successfully introduced was not enough. We also needed to examine whether the modification affected strain performance under different carbon-source conditions and, ultimately, promoted the formation of the target product."
                          }
                        </p>
                        <p>
                          {
                            "His advice reinforced three connected levels of evaluation:"
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "flow",
                    steps: [
                      "Genetic Modification",
                      "Carbon-Source Response",
                      "PMA Production",
                    ],
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Following this evaluation framework, we examined genetic engineering outcomes alongside strain growth and PMA production."
                          }
                        </p>
                        <p>
                          {
                            "Using our existing strain-comparison system, we focused on the performance of A08, OE-XlnR, OE-AraR, and OE-XlnR+AraR under different glucose–xylose compositions."
                          }
                        </p>
                        <p>
                          {
                            "Because Carbotex uses sugars derived from agricultural residues, it was also important to examine PMA production by these strains in actual corn-stover hydrolysate."
                          }
                        </p>
                        <p>
                          {
                            "By considering both defined mixed-sugar formulations and straw-derived hydrolysate, we could evaluate the regulatory engineering strategy in relation to the project's intended feedstock."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "We extended strain evaluation beyond genetic construct verification to functional production performance."
                          }
                        </p>
                        <p>
                          {
                            "We compared the growth and PMA production of the four strains across different glucose–xylose formulations and conducted further fermentation experiments using treated corn-stover hydrolysate."
                          }
                        </p>
                        <p>
                          {
                            "In addition, to explore molecular responses associated with the observed production phenotype, we compared the relative transcript levels of selected xylose-metabolism-related and PMA-associated genes between A08 and OE-XlnR+AraR."
                          }
                        </p>
                        <p>
                          {
                            "Together, these comparisons connected regulatory engineering, carbon-source conditions, and target-product formation."
                          }
                        </p>
                        <p>
                          <strong>
                            <Link
                              to={
                                "/design#design-xylose-module-experimental-design"
                              }
                            >
                              {
                                "Explore AraR/XlnR Fermentation and PMA Results →"
                              }
                            </Link>
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {"Our fermentation results showed that "}
                          <strong>
                            {
                              "co-overexpression of XlnR and AraR improved PMA production under xylose-containing conditions"
                            }
                          </strong>
                          {"."}
                        </p>
                        <p>
                          {
                            "Under xylose-only conditions, OE-XlnR+AraR achieved a PMA titer of "
                          }
                          <strong>{"13.86 g/L"}</strong>
                          {", compared with "}
                          <strong>{"10.04 g/L"}</strong>
                          {
                            " for the parental A08 strain, an increase of approximately "
                          }
                          <strong>{"38.0%"}</strong>
                          {"."}
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "metrics",
                    label: "OE-XlnR+AraR under xylose-only conditions",
                    items: [
                      {
                        value: "13.86 g/L",
                        label: "OE-XlnR+AraR",
                      },
                      {
                        value: "10.04 g/L",
                        label: "Parental A08",
                      },
                      {
                        value: "+38.0%",
                        label: "PMA titer increase",
                      },
                    ],
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        {
                          "The improvement was also observed in corn-stover hydrolysate: the dual-overexpression strain reached "
                        }
                        <strong>{"18.63 g/L"}</strong>
                        {", compared with "}
                        <strong>{"15.87 g/L"}</strong>
                        {" for A08, an increase of approximately "}
                        <strong>{"17.4%"}</strong>
                        {"."}
                      </>
                    ),
                  },
                  {
                    kind: "metrics",
                    label: "OE-XlnR+AraR in corn-stover hydrolysate",
                    items: [
                      {
                        value: "18.63 g/L",
                        label: "OE-XlnR+AraR",
                      },
                      {
                        value: "15.87 g/L",
                        label: "Parental A08",
                      },
                      {
                        value: "+17.4%",
                        label: "PMA titer increase",
                      },
                    ],
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "These results demonstrated an improved production phenotype under conditions relevant to the project's agricultural feedstock, supporting our regulatory engineering strategy."
                          }
                        </p>
                        <p>
                          {
                            "Furthermore, the relative expression levels of selected xylose-metabolism-related and PMA-associated genes were higher in the dual-overexpression strain than in A08, consistent with its improved PMA production."
                          }
                        </p>
                        <p>
                          {
                            "Together, these findings confirmed that XlnR/AraR co-overexpression promoted PMA accumulation under the conditions tested."
                          }
                        </p>
                        <p>{"They also raised a further question:"}</p>
                        <p>
                          <strong>
                            {
                              "Having improved PMA production under xylose-containing conditions, could we increase production further by strengthening the supply of metabolic precursors required for PMA synthesis?"
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "This extended our investigation from regulatory engineering toward precursor-supply engineering."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "Following Carbon Flow Toward PMA",
          },
          {
            kind: "trace",
            number: 6,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "XlnR/AraR co-overexpression improved PMA production under xylose-containing conditions."
                          }
                        </p>
                        <p>
                          {
                            "However, improved production performance did not necessarily mean that the metabolic precursor supply for PMA synthesis had been fully optimized."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "How could we further support the conversion of carbon entering central metabolism into PMA?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "reach-out",
                parts: [
                  {
                    kind: "anchor",
                    id: "ihp-weihui-wu",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <strong>{"Prof. Weihui Wu"}</strong>
                      </>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-weihui-wu-01-carbon-allocation-discussion.avif",
                    alt: "Discussion with Prof. Weihui Wu on intracellular carbon allocation.",
                    ratio: "540 / 380",
                    caption:
                      "Discussion with Prof. Weihui Wu on intracellular carbon allocation.",
                    figureNumber: 14,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "To explore this question, we discussed intracellular carbon allocation and its relationship with product formation with Prof. Weihui Wu."
                          }
                        </p>
                        <p>
                          {
                            "Prof. Wu encouraged us to distinguish carbon entering cellular metabolism from carbon ultimately contributing to the synthesis of the target product."
                          }
                        </p>
                        <p>
                          {
                            "Carbon entering central metabolism may support biomass formation, cellular maintenance, competing metabolic processes, or target-product synthesis. Therefore, improved production under a particular carbon-source condition does not imply that all available carbon is directed toward PMA biosynthesis."
                          }
                        </p>
                        <p>
                          {
                            "This perspective drew our attention to the metabolic processes supporting PMA synthesis, especially the supply of relevant precursor molecules."
                          }
                        </p>
                        <p>
                          <strong>{"Follow-up with Prof. Guanglei Liu"}</strong>
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-follow-up-prof-guanglei-liu-01-metabolic-route-discussion.avif",
                    alt: "Follow-up discussion with Prof. Guanglei Liu on the metabolic route toward PMA.",
                    ratio: "540 / 380",
                    caption:
                      "Follow-up with Prof. Guanglei Liu on the metabolic route toward PMA.",
                    figureNumber: 15,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "As we considered the metabolic fate of carbon entering the cell, we returned to Prof. Guanglei Liu to discuss the PMA biosynthetic route."
                          }
                        </p>
                        <p>
                          {
                            "Unlike our initial discussion about the carbon source, target product, and microbial chassis, this consultation focused on a more specific question:"
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "How could strengthening metabolic precursor supply support additional PMA synthesis?"
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "This follow-up connected the previously established A08–PMA production route with questions emerging from regulatory engineering and fermentation evaluation, providing direction for further pathway analysis."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        {
                          "We examined the relationship between central carbon metabolism and PMA biosynthesis:"
                        }
                      </>
                    ),
                  },
                  {
                    kind: "flow",
                    steps: ["Pyruvate", "Oxaloacetate", "Malate", "PMA"],
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Pyruvate carboxylase (PYC) catalyzes the conversion of pyruvate to oxaloacetate and is one of the enzymes linking central metabolism to malate precursor supply "
                          }
                          <Cite k={["Jitrapakdee2008PYC"]} />
                          {"."}
                        </p>
                        <p>
                          {
                            "Based on the known metabolic role of PYC and our examination of the PMA biosynthetic pathway, we considered PYC a candidate target for investigating precursor supply."
                          }
                        </p>
                        <p>
                          <strong>
                            {"Related Team Work — A08 Metabolic Modeling."}
                          </strong>
                          {
                            " The Model group also explored a genome-informed research direction for analyzing A08 metabolism, considering proteome prediction, genome-scale metabolic modeling (GEM), and flux variability analysis (FVA) as possible computational steps. This offers a complementary perspective on intracellular carbon allocation. We do not claim that a completed GEM/FVA prediction preceded or directly determined the PYC constructs tested in the wet lab. The engineering work described below is supported by the team's documented strain construction and fermentation measurements."
                          }
                        </p>
                        <p>
                          {
                            "To explore whether PYC genes from different sources might influence PMA production, we considered four candidate sources, including endogenous A08 PYC."
                          }
                        </p>
                        <p>
                          <strong>
                            <Link to={"/model#model-overview"}>
                              {"Explore the Modeling Analysis →"}
                            </Link>
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Building on the existing XlnR/AraR co-overexpression background, we investigated whether PYC expression could further support PMA precursor supply."
                          }
                        </p>
                        <p>
                          {
                            "Four PYC sources were considered during construct development."
                          }
                        </p>
                        <p>
                          {
                            "An overexpression strain carrying the endogenous A08 PYC could not be successfully established. We subsequently obtained strains carrying three heterologous PYC candidates and combined the corresponding constructs with the "
                          }
                          <strong>{"OE-XlnR+AraR"}</strong>
                          {" regulatory-engineering background."}
                        </p>
                        <p>{"The three heterologous PYC sources were:"}</p>
                        <ul>
                          <li>
                            <em>{"Yarrowia lipolytica"}</em>
                          </li>
                          <li>
                            <em>{"Saccharomyces cerevisiae"}</em>
                          </li>
                          <li>
                            <em>{"Aureobasidium thailandense"}</em>
                            {" ZW03-4"}
                          </li>
                        </ul>
                        <p>
                          {
                            "We compared PMA production by these combined-engineering strains in corn-stover hydrolysate to evaluate the performance of the different PYC constructs under the tested conditions."
                          }
                        </p>
                        <p>
                          <strong>
                            <Link
                              to={
                                "/design#design-pyc-module-experimental-design"
                              }
                            >
                              {"Explore PYC Engineering and PMA Results →"}
                            </Link>
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Among the obtained and evaluated combined-engineering strains, the "
                          }
                          <strong>
                            {"SC group achieved the highest PMA titer"}
                          </strong>
                          {"."}
                        </p>
                        <p>
                          {"This strain expressed "}
                          <strong>
                            {"PYC1 from "}
                            <em>{"Saccharomyces cerevisiae"}</em>
                          </strong>
                          {
                            " in the OE-XlnR+AraR background and achieved a PMA titer of approximately "
                          }
                          <strong>{"26 g/L"}</strong>
                          {" in corn-stover hydrolysate."}
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "metrics",
                    label: "Highest PMA titer among evaluated combined strains",
                    items: [
                      {
                        value: "≈26 g/L",
                        label: "SC PYC strain",
                        detail:
                          "Corn-stover hydrolysate; highest among evaluated combined strains",
                      },
                    ],
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "This result demonstrated the improved production performance attainable by combining regulatory engineering with the PYC engineering strategy under the tested fermentation conditions."
                          }
                        </p>
                        <p>
                          {
                            "Although these experiments did not directly quantify intracellular carbon-flux distribution, the fermentation comparisons among PYC constructs provided experimental evidence relevant to investigating the relationship between precursor supply and PMA production."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "Closing the Biological Engineering Loop",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "Through these successive investigations, Carbotex progressed from an existing PMA-producing microbial chassis to an engineered system capable of producing PMA from sugars derived from corn stover."
                  }
                </p>
                <p>
                  {
                    "We first connected the PMA-production background of A08 with the potential of PMA for subsequent material development, establishing the biological conversion route."
                  }
                </p>
                <p>
                  {
                    "Mixed-sugar experiments then revealed a PMA-production challenge under xylose-containing conditions. Stakeholder perspectives and literature research helped direct our attention to transcriptional regulation, and XlnR/AraR engineering improved PMA production under the conditions tested."
                  }
                </p>
                <p>
                  {
                    "Further evaluation led us to investigate precursor supply, where PYC engineering provided another route for improving production."
                  }
                </p>
                <p>
                  <strong>
                    {
                      "Across these iterations, we connected straw-derived carbon resources, microbial regulatory engineering, metabolic precursor supply, and PMA production into a coherent biological manufacturing strategy for Carbotex."
                    }
                  </strong>
                </p>
              </>
            ),
          },
        ],
      },
      {
        id: "ihp-material",
        title: "2.3 Developing the Material & Application",
        parts: [
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "Our biological engineering work established PMA production from straw-derived sugars as a central part of Carbotex. We then considered how the resulting polymer could contribute to a functional material, connecting fermentation with a tangible application."
                  }
                </p>
                <p>
                  {
                    "This required us to move beyond PMA titer alone and examine material selection, chemical functionalization, preparation, and performance."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "label",
            text: "From Fermentation Product to Material Platform",
          },
          {
            kind: "trace",
            number: 7,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Producing PMA gave Carbotex a biological product, but its further value depended on how its chemical structure could be used."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "What material function could build on the properties of PMA and connect our fermentation work with a meaningful downstream application?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "reach-out",
                parts: [
                  {
                    kind: "anchor",
                    id: "ihp-liu-ya",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <strong>{"Prof. Ya Liu"}</strong>
                      </>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-liu-ya-01-materials-perspective.avif",
                    alt: "Discussion with Liu Ya on PMA material properties and downstream potential.",
                    ratio: "540 / 380",
                    caption:
                      "Discussion with Liu Ya on PMA structure–property relationships and downstream potential.",
                    figureNumber: 16,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "To explore the material potential of PMA, we consulted Prof. Ya Liu."
                          }
                        </p>
                        <p>
                          {
                            "Prof. Liu encouraged us to look beyond fermentation titers and consider PMA from a materials-science perspective, including its chemical structure, modifiability, and potential applications."
                          }
                        </p>
                        <p>
                          {"During our discussion, she highlighted "}
                          <strong>
                            {
                              "PMA's favorable biocompatibility and biodegradability, as well as the potential of dopamine in the design of biologically relevant materials"
                            }
                          </strong>
                          {
                            ". PMA offers a polymer backbone that can be chemically modified, while dopamine contains catechol groups that can introduce functionality associated with interfacial adhesion."
                          }
                        </p>
                        <p>
                          {
                            "Her advice encouraged us to explore whether suitable chemical functionalization could develop PMA from a microbial fermentation product into a bio-based adhesive material."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Drawing on Prof. Liu's advice, we reviewed research on the chemical structure and material potential of PMA."
                          }
                        </p>
                        <p>
                          {
                            "PMA contains abundant pendant carboxyl groups that provide sites for further chemical modification, making it a promising basis for functional materials "
                          }
                          <Cite k={["Qiao2023PMLA"]} />
                          {"."}
                        </p>
                        <p>
                          {
                            "Among the potential applications, we became particularly interested in adhesion."
                          }
                        </p>
                        <p>
                          {
                            "On the one hand, suitable molecular modification could introduce groups that interact with material surfaces. On the other, adhesive performance could be evaluated experimentally using different substrates, giving our material work a clear research objective."
                          }
                        </p>
                        <p>
                          {
                            "Bio-based adhesive development also aligned with Carbotex's broader goal of creating functional products from renewable carbon resources."
                          }
                        </p>
                        <p>
                          {"We therefore identified "}
                          <strong>{"PMA-based adhesive development"}</strong>
                          {" as a direction worth pursuing."}
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Based on Prof. Liu's advice and our literature research, we selected "
                          }
                          <strong>{"PMA-based adhesive development"}</strong>
                          {" as Carbotex's downstream material direction."}
                        </p>
                        <p>
                          {
                            "This decision extended our work from biological PMA production to functional material development, with a clear objective for subsequent chemical modification and adhesion evaluation."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Through this discussion and analysis, we established a direction for PMA material development."
                          }
                        </p>
                        <p>
                          {
                            "PMA's chemical structure provided a basis for functionalization, while adhesion gave us a specific way to explore the downstream value of this bio-based polymer."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Our next step was to identify a suitable molecular modification strategy to translate PMA's structural features into adhesive functionality."
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "From an Application Idea to a Molecular Design",
          },
          {
            kind: "trace",
            number: 8,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "After selecting PMA-based adhesive development as our direction, we considered how the material could actually be produced."
                          }
                        </p>
                        <p>
                          {
                            "Although our earlier discussion had drawn our attention to functional molecules such as dopamine, using this concept with PMA required a specific chemical design and preparation strategy."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "How could we use PMA's chemical structure to introduce adhesion-related groups and turn our fermentation product into a practical adhesive material?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "reach-out",
                parts: [
                  {
                    kind: "anchor",
                    id: "ihp-haotian-guo",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <strong>{"Dr. Haotian Guo"}</strong>
                      </>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-haotian-guo-01-ccic-feedback.avif",
                    alt: "Discussion with Dr. Haotian Guo during CCiC about Carbotex project integration.",
                    ratio: "540 / 380",
                    caption:
                      "Discussion with Dr. Haotian Guo on carbon utilization, PMA production, and adhesive development.",
                    figureNumber: 17,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "During CCiC, we presented and discussed Carbotex with Dr. Haotian Guo."
                          }
                        </p>
                        <p>
                          {
                            "Dr. Guo recognized the connection between straw-derived carbon, PMA fermentation, and downstream adhesive development. He also encouraged us to develop the adhesive component further by clarifying its "
                          }
                          <strong>
                            {
                              "design rationale, preparation approach, and experimental evaluation pathway"
                            }
                          </strong>
                          {
                            ", so that material development would become a substantial part of the project."
                          }
                        </p>
                        <p>
                          {
                            "His feedback reinforced the importance of connecting molecular design with actual material performance and prompted us to consider a practical preparation process based on the PMA we produced."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "anchor",
                    id: "ihp-bright-moon",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <strong>{"Bright Moon Seaweed"}</strong>
                      </>
                    ),
                  },
                  {
                    kind: "gallery",
                    images: [
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-bright-moon-seaweed-01-group-photo.avif",
                        alt: "Group photo during the Bright Moon Seaweed visit.",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-bright-moon-seaweed-02-material-discussion.avif",
                        alt: "Material discussion during the Bright Moon Seaweed visit.",
                      },
                    ],
                    columns: 2,
                    ratio: "345 / 260",
                    caption:
                      "Bright Moon Seaweed visit on functional natural polymers and material modification.",
                    figureNumber: 18,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "While exploring chemical functionalization strategies for PMA, we visited Bright Moon Seaweed to learn from its experience in developing natural-polymer materials."
                          }
                        </p>
                        <p>
                          {
                            "The company works with marine-derived natural polymers, including alginate, in material development and applications. Natural polysaccharides such as alginate contain functional groups that can be modified chemically to adjust material structure, properties, and performance."
                          }
                        </p>
                        <p>
                          {
                            "During our visit, company representatives introduced common modification strategies, including "
                          }
                          <strong>
                            {
                              "esterification, oxidation, amidation, and grafting"
                            }
                          </strong>
                          {
                            ", and discussed choosing suitable reactions according to a polymer's structure and intended function."
                          }
                        </p>
                        <p>
                          {
                            "Their experience helped us understand that developing natural-polymer materials depends not only on the properties of the starting polymer, but also on using its reactive functional groups to introduce new functions."
                          }
                        </p>
                        <p>
                          {
                            "Given PMA's abundant pendant carboxyl groups, we became increasingly interested in using these reaction sites to attach molecules with specific functions."
                          }
                        </p>
                        <p>
                          {
                            "This offered a useful perspective for our subsequent investigation of dopamine functionalization."
                          }
                        </p>
                        <p>
                          <strong>
                            <Link
                              to={
                                "/design#design-adhesive-module-why-dopamine-and-pma"
                              }
                            >
                              {"Explore Natural Polymer Modification →"}
                            </Link>
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Combining Prof. Liu's advice with the design perspectives offered by Dr. Guo and Bright Moon Seaweed, we reviewed research on catechol-mediated adhesion and PMA modification."
                          }
                        </p>
                        <p>
                          {
                            "Studies of mussel-inspired adhesives have shown that catechol-containing molecules such as dopamine can introduce functionality associated with interfacial adhesion "
                          }
                          <Cite k={["Lee2007Mussel"]} />
                          {"."}
                        </p>
                        <p>
                          {
                            "More directly, Tang et al. reported coupling dopamine to a PMA backbone and evaluating the adhesive performance of the resulting material, providing a relevant precedent for our design "
                          }
                          <Cite k={["Tang2020PMLADA"]} />
                          {"."}
                        </p>
                        <p>
                          {"From a chemical perspective, "}
                          <strong>
                            {
                              "PMA provides carboxyl groups suitable for coupling reactions, while dopamine contains an amino group and an adhesion-related catechol group"
                            }
                          </strong>
                          {
                            ". This offered a concrete rationale for introducing adhesion-related functionality into PMA."
                          }
                        </p>
                        <p>
                          {
                            "Based on these discussions and literature, we selected "
                          }
                          <strong>{"dopamine functionalization"}</strong>
                          {
                            " as our preparation strategy for the PMA-based adhesive."
                          }
                        </p>
                        <p>
                          {
                            "We also wanted this material preparation to connect with our existing microbial fermentation process. We therefore explored using "
                          }
                          <strong>
                            {"cell-removed, PMA-containing fermentation broth"}
                          </strong>
                          {
                            " directly as the starting material for dopamine functionalization."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Based on this design, we established a preparation workflow for the PMA–dopamine (PMA-DA) material."
                          }
                        </p>
                        <p>
                          {
                            "In the wet lab, we first removed cells from PMA-containing fermentation broth and measured its PMA concentration by HPLC. The documented broth batches used for material preparation contained approximately "
                          }
                          <strong>{"18 g/L PMA"}</strong>
                          {
                            ", which guided the amount of coupling reagents added."
                          }
                        </p>
                        <p>
                          {
                            "We then performed EDC·HCl-assisted dopamine coupling, followed by dialysis, shaping, prefreezing, and freeze-drying. The recovered material could be reconstituted with water for subsequent adhesion tests."
                          }
                        </p>
                        <p>
                          {
                            "The material preparation workflow can be summarized as:"
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "flow",
                    steps: [
                      "PMA-Containing Fermentation Broth",
                      "Cell Removal and PMA Measurement",
                      "Dopamine Coupling",
                      "Material Recovery",
                      "Adhesion Evaluation",
                    ],
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        {
                          "This process directly connected PMA fermentation with material modification, extending Carbotex from microbial polymer production toward functional material development."
                        }
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Through this workflow, we obtained material samples suitable for subsequent mechanical adhesion experiments and established a practical preparation route from PMA-containing fermentation broth to a functionalized formulation."
                          }
                        </p>
                        <p>
                          {
                            "Dopamine functionalization gave our material work a concrete molecular design and enabled further investigation of the material's adhesive behavior."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "We next focused on how PMA-DA performed on different material surfaces and under aqueous conditions."
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "From Molecular Functionalization to Performance Evidence",
          },
          {
            kind: "trace",
            number: 9,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "After preparing PMA-DA, we wanted to understand its adhesive performance under different testing conditions."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "How could we choose suitable substrates and environments to evaluate PMA-DA's adhesive properties more comprehensively?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "reach-out",
                parts: [
                  {
                    kind: "anchor",
                    id: "ihp-yanni-yang",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <strong>
                          {"National Oyster Science & Technology Courtyard"}
                        </strong>
                      </>
                    ),
                  },
                  {
                    kind: "gallery",
                    images: [
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-national-oyster-science-technology-courtyard-01-site-visit.avif",
                        alt: "Site visit to the National Oyster Science & Technology Courtyard.",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-national-oyster-science-technology-courtyard-02-interview.avif",
                        alt: "Interview at the National Oyster Science & Technology Courtyard about biological adhesion.",
                      },
                    ],
                    columns: 2,
                    ratio: "345 / 260",
                    caption:
                      "Oyster Science & Technology Courtyard visit on biological adhesion in marine environments.",
                    figureNumber: 19,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "To learn more about biological adhesion in natural environments, we visited the National Oyster Science & Technology Courtyard and spoke with "
                          }
                          <strong>
                            {"Ms. Yanni Yang, Deputy General Manager"}
                          </strong>
                          {"."}
                        </p>
                        <p>
                          {
                            "Ms. Yang introduced oyster cultivation conditions, growth, and attachment in marine environments. This gave us a more tangible understanding of how organisms attach to surfaces in wet, water-rich settings."
                          }
                        </p>
                        <p>
                          {
                            "The visit also encouraged us to consider adhesive behavior in real environments. Beyond whether a material could adhere to a surface, "
                          }
                          <strong>
                            {
                              "the surface characteristics of different substrates and the influence of water on adhesion"
                            }
                          </strong>
                          {" were also important considerations."}
                        </p>
                        <p>
                          {
                            "These examples of marine biological attachment offered useful inspiration for improving our PMA-DA evaluation and encouraged us to examine the material's behavior at different interfaces and under aqueous conditions."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Following our discussion at the National Oyster Science & Technology Courtyard, we considered the importance of substrate properties and environmental conditions in evaluating adhesive performance."
                          }
                        </p>
                        <p>
                          {
                            "Adhesive materials interact with the surfaces they join, and different substrates have different surface characteristics. Water may also influence interactions at the interface and the resulting adhesive response."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Comparing adhesion across different substrates and in aqueous conditions"
                            }
                          </strong>
                          {
                            " could therefore help us understand PMA-DA's properties from multiple perspectives and guide subsequent material optimization."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {"For our material evaluation, we selected "}
                          <strong>
                            {"glass, stainless steel, and ex vivo porcine skin"}
                          </strong>
                          {
                            " as test substrates and used mechanical testing to examine PMA-DA adhesion on these different surfaces."
                          }
                        </p>
                        <p>
                          {
                            "We also tested different material formulations and conducted adhesion experiments under aqueous conditions to explore how the material behaved in different settings."
                          }
                        </p>
                        <p>
                          {
                            "These experiments extended our work from material preparation to the direct evaluation of adhesive performance."
                          }
                        </p>
                        <p>
                          <strong>
                            <Link
                              to={
                                "/design#design-adhesive-module-experimental-design"
                              }
                            >
                              {
                                "Explore PMA–DA Adhesion and Material Evaluation Results →"
                              }
                            </Link>
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Adhesion tests on glass, stainless steel, and ex vivo porcine skin provided "
                          }
                          <strong>
                            {
                              "load–displacement and other mechanical response data"
                            }
                          </strong>
                          {" for PMA-DA on different substrates."}
                        </p>
                        <p>
                          {
                            "Together with comparisons among material formulations and experiments under aqueous conditions, these results helped us understand the material's adhesive behavior across different testing conditions."
                          }
                        </p>
                        <p>
                          {
                            "The findings provided evidence for subsequent formulation optimization and application development, connecting molecular functionalization with experimental evaluation of material performance."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "related",
            title: "PMA–DA Molecular Modeling",
            parts: [
              {
                kind: "content",
                inline: false,
                content: (
                  <>
                    <p>
                      {
                        "Our Model team also explored a molecular question raised by published PMA–dopamine chemistry. In the reference study, increasing the dopamine-to-carboxyl feed ratio from 1.00 to 1.25 was accompanied by a decrease in the reported dopamine content of the recovered product. The team used molecular-dynamics simulations to examine how dopamine approached activated PMA sites under different feeding conditions. Under the stated model assumptions, the high-feed comparison showed fewer near-contacts within the selected approach-angle window, despite similar overall near-contact counts."
                      }
                    </p>
                    <p>
                      {"This work offered a "}
                      <strong>
                        {
                          "possible molecular interpretation of a published trend"
                        }
                      </strong>
                      {
                        " and suggested questions for later formulation studies. It was a retrospective modeling investigation; it did not measure grafting efficiency in our own PMA-DA samples or determine the team's earlier experimental formulation."
                      }
                    </p>
                    <p>
                      <strong>
                        <Link to={"/model#model-overview"}>
                          {"Explore PMA–DA Molecular Modeling →"}
                        </Link>
                      </strong>
                    </p>
                  </>
                ),
              },
            ],
          },
          {
            kind: "label",
            text: "Closing the Material Development Loop",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "Carbotex's material development progressed through a series of stakeholder engagements, research decisions, and experimental activities."
                  }
                </p>
                <p>
                  {
                    "Prof. Ya Liu's advice on polymer structure, chemical modifiability, and application potential helped us identify "
                  }
                  <strong>{"PMA-based adhesive development"}</strong>
                  {" as our downstream direction."}
                </p>
                <p>
                  {
                    "Dr. Haotian Guo's feedback then reinforced the importance of connecting material design, preparation, and performance evaluation, while Bright Moon Seaweed's experience with natural-polymer modification informed our exploration of PMA functionalization."
                  }
                </p>
                <p>
                  {
                    "Building on these discussions and our literature research, we selected dopamine functionalization and prepared materials from PMA-containing fermentation broth for adhesion evaluation."
                  }
                </p>
                <p>
                  {
                    "Finally, the National Oyster Science & Technology Courtyard drew our attention to biological attachment in natural environments and the importance of considering different substrates and water-rich conditions in material testing."
                  }
                </p>
                <p>
                  <strong>
                    {
                      "Through these engagements, research activities, and experiments, Carbotex connected biological PMA production with chemical functionalization and adhesive-performance evaluation, extending the conversion of straw-derived carbon into the development of a functional adhesive material."
                    }
                  </strong>
                </p>
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    id: "ihp-responsible-implementation",
    title: "Responsible Implementation",
    parts: [],
    subsections: [
      {
        id: "ihp-sustainability",
        title: "3.1 Rethinking Sustainability",
        parts: [
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "Our project began with the possibility of transforming straw-derived carbon into a functional bio-based adhesive. As we moved from PMA fermentation to PMA–dopamine (PMA-DA) material preparation, we began to question whether using a renewable feedstock was, by itself, enough to make the overall process sustainable."
                }
              </>
            ),
          },
          {
            kind: "trace",
            number: 10,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Carbotex explores an additional material-use pathway for agricultural carbon through microbial PMA production and subsequent functionalization. Initially, the renewable origin of the feedstock was an important part of how we understood the project's potential environmental relevance."
                          }
                        </p>
                        <p>
                          {
                            "However, our actual workflow extended beyond feedstock selection to fermentation, chemical coupling, dialysis, and freeze-drying. We therefore asked:"
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Does renewable carbon automatically make an adhesive-production process sustainable, and what else should we consider?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "reach-out",
                parts: [
                  {
                    kind: "anchor",
                    id: "ihp-eva",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <strong>{"Eva — Sustainability Expert"}</strong>
                      </>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-sustainability-eva-sdgs-whole-system-perspective.avif",
                    alt: "Discussion with sustainability expert Eva about the Sustainable Development Goals and whole-system sustainability.",
                    ratio: "310 / 410",
                    caption:
                      "Discussion with Eva on sustainability assessment.",
                    figureNumber: 20,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "To examine this question, we spoke with Eva about sustainability and the United Nations Sustainable Development Goals (SDGs)."
                          }
                        </p>
                        <p>
                          {
                            "Eva encouraged us to look beyond the renewable origin of our feedstock and consider "
                          }
                          <strong>
                            {
                              "resource inputs, energy requirements, processing steps, and downstream treatment"
                            }
                          </strong>
                          {
                            " across the production pathway. Her feedback helped us recognize that an environmentally motivated starting material does not, on its own, establish the environmental performance of a final product."
                          }
                        </p>
                        <p>
                          {
                            "The discussion also gave us a way to think about the SDGs: not as labels confirming success, but as questions that could help us examine the significance and limitations of Carbotex."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          <strong>
                            {"From Renewable Feedstocks to the Whole Process"}
                          </strong>
                        </p>
                        <p>
                          {
                            "We reconsidered the actual steps linking straw-derived sugars to adhesive material preparation. A collaborating laboratory supplied corn-stover hydrolysate; our team used "
                          }
                          <em>{"Aureobasidium melanogenum"}</em>
                          {
                            " A08 to produce PMA, and then explored dopamine functionalization of PMA-containing fermentation broth."
                          }
                        </p>
                        <p>
                          {
                            "In addition to the carbon feedstock, this route includes fermentation-medium inputs, coupling reagents such as dopamine, EDC·HCl and NHS, dialysis water, and energy-intensive steps such as prefreezing and freeze-drying."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "This made us distinguish the renewable origin of a material from the sustainability of its full production process."
                            }
                          </strong>
                          {
                            " It also helped us identify categories of inputs to consider when developing a preliminary material-preparation cost analysis later in the project. Financial cost, however, is not itself a measure of environmental impact."
                          }
                        </p>
                        <p>
                          <strong>
                            {"From SDG Labels to Practical Questions"}
                          </strong>
                        </p>
                        <p>
                          {
                            "The SDGs are 17 interconnected goals established under the United Nations 2030 Agenda in 2015 "
                          }
                          <Cite k={["UN2015SDGs"]} />
                          {
                            ". Rather than claiming alignment with every goal, we use SDGs 9, 12, and 13 to examine three distinct dimensions of the Carbotex pathway."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "sdg-cards",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Taken together, these goals prompted three different reflections: "
                          }
                          <strong>{"SDG 9"}</strong>
                          {
                            " led us to consider the pathway from laboratory innovation to reliable production; "
                          }
                          <strong>{"SDG 12"}</strong>
                          {
                            " directed our attention toward process inputs and resource use; and "
                          }
                          <strong>{"SDG 13"}</strong>
                          {
                            " reminded us that an environmental motivation is not the same as verified environmental benefit."
                          }
                        </p>
                        <p>
                          <em>
                            {"SDG reference: "}
                            <a href={"https://sdgs.un.org/goals"}>
                              {"United Nations — The 17 Goals"}
                            </a>
                            {". If official UN SDG icons are used, follow the "}
                            <a
                              href={
                                "https://www.un.org/sustainabledevelopment/wp-content/uploads/2023/09/E_SDG_Guidelines_Sep20238.pdf"
                              }
                            >
                              {"UN icon guidelines"}
                            </a>
                            {
                              " and include the required attribution statement: “The content of this publication has not been approved by the United Nations and does not reflect the views of the United Nations or its officials or Member States.”"
                            }
                          </em>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {"Eva's feedback changed "}
                          <strong>{"how we considered sustainability"}</strong>
                          {
                            ", rather than immediately changing the wet-lab formulation."
                          }
                        </p>
                        <p>
                          {
                            "We stopped treating the renewable origin of straw-derived carbon as sufficient evidence of a sustainable adhesive. Instead, we began considering the additional inputs and downstream steps involved in producing PMA-DA, including chemical modification, dialysis, and freeze-drying."
                          }
                        </p>
                        <p>
                          {
                            "This reflection also helped us identify the relevant input categories for subsequent preliminary cost calculations and questions for future process optimization. It did not amount to a completed life-cycle assessment."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "This exchange gave us a more grounded understanding of the potential and limitations of Carbotex. We can demonstrate the experimental development of a PMA-derived adhesive formulation, but evaluating its overall environmental performance requires evidence beyond the origin of the feedstock."
                          }
                        </p>
                        <p>
                          {"We have "}
                          <strong>{"not"}</strong>
                          {
                            " completed a full life-cycle assessment or quantified net emissions reductions. Instead, Eva's input helped us identify what would need to be examined as the project develops, including resource consumption, downstream processing, and material recovery. For a future life-cycle assessment, ISO 14040 provides the principles and framework, while ISO 14044 describes the assessment requirements and guidelines "
                          }
                          <Cite k={["ISO14040", "ISO14044"]} />
                          {"."}
                        </p>
                        <p>
                          <strong>
                            {
                              "Sustainability became a question to consider across the Carbotex pathway, not a property we could assume from renewable carbon alone."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "This perspective also leads to our next challenge: "
                          }
                          <strong>
                            {
                              "what would the laboratory pathway require to become a reliable manufacturing process?"
                            }
                          </strong>
                        </p>
                        <p>
                          <strong>
                            {
                              "Next: 3.2 From Laboratory Success to Reliable Manufacturing"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ihp-implementation-ecosystem",
        title: "3.2 From Laboratory Success to Reliable Manufacturing",
        parts: [
          {
            kind: "trace",
            number: 11,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Through our earlier work, Carbotex developed an experimental pathway connecting straw-derived sugars, polymalic acid (PMA) production by engineered "
                          }
                          <em>{"Aureobasidium melanogenum"}</em>
                          {
                            " A08, dopamine functionalization, and preliminary evaluation of adhesive performance."
                          }
                        </p>
                        <p>
                          {
                            "But the ability to carry out fermentation and material preparation in the laboratory does not, by itself, establish a reliable manufacturing process. As our project progressed from individual experiments toward a connected production pathway, we began to ask questions that could not be answered by a single PMA titer or adhesive test. Could fermentation performance remain consistent across batches? How might separate processing steps be connected? And how could data gathered by different research groups support future engineering decisions?"
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Beyond improving PMA production and material properties, what would Carbotex need to consider before moving toward reliable manufacturing?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "reach-out",
                parts: [
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        {
                          "To explore the gap between laboratory feasibility and practical manufacturing, we visited industrial companies, a biotechnology organization, and a synthetic biology research infrastructure. Each exchange offered a different perspective on fermentation reliability, process integration, research evidence, or standardized engineering."
                        }
                      </>
                    ),
                  },
                  {
                    kind: "anchor",
                    id: "ihp-tsingtao",
                  },
                  {
                    kind: "label",
                    text: "Tsingtao Brewery — From Fermentation Yield to Process Reliability",
                  },
                  {
                    kind: "gallery",
                    images: [
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-tsingtao-brewery-production-line-reliable-fermentation.avif",
                        alt: "Industrial fermentation production line observed during the Tsingtao Brewery visit",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-tsingtao-brewery-site-fermentation-scale-up.avif",
                        alt: "Carbotex team visit to Tsingtao Brewery to learn about fermentation scale-up",
                      },
                    ],
                    columns: 2,
                    ratio: "345 / 260",
                    caption:
                      "Tsingtao Brewery visit on fermentation scale-up, monitoring, and batch consistency.",
                    figureNumber: 21,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Our visit to Tsingtao Brewery introduced us to the practical importance of process monitoring, batch consistency, and controlled operating conditions in industrial fermentation."
                          }
                        </p>
                        <p>
                          {
                            "These considerations are directly relevant to our PMA-producing system. In the laboratory, we primarily compare engineered A08 strains using growth observations and measured PMA concentrations. Such comparisons are valuable for evaluating strain engineering, but a high titer in one experiment does not demonstrate that equivalent performance can be maintained across batches or at larger scales."
                          }
                        </p>
                        <p>
                          {
                            "The exchange therefore changed how we understood scale-up: "
                          }
                          <strong>
                            {
                              "it is not simply a matter of increasing culture volume, but of achieving reproducible production under controlled conditions."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "We consequently began to regard fermentation stability, batch-to-batch consistency, and monitoring as important questions for future assessments of PMA manufacturing feasibility."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "anchor",
                    id: "ihp-kinger",
                  },
                  {
                    kind: "label",
                    text: "Kinger Robot — From Individual Operations to Process Integration",
                  },
                  {
                    kind: "gallery",
                    images: [
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-kinger-robot-entrance.avif",
                        alt: "Entrance to Kinger Robot visited by the Carbotex team",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-kinger-robot-factory-tour.avif",
                        alt: "Carbotex team touring the Kinger Robot manufacturing facility",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-kinger-robot-automation-integration.avif",
                        alt: "Automation and process integration discussed during the Kinger Robot visit",
                      },
                    ],
                    columns: 3,
                    ratio: "270 / 220",
                    caption:
                      "Kinger Robot visit on automation, integration, and traceability.",
                    figureNumber: 22,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "At Kinger Robot, we learned that manufacturing involves more than the successful operation of individual machines. The connections between operations, the recording of process information, and the traceability of each step are also essential considerations."
                          }
                        </p>
                        <p>
                          {
                            "This perspective prompted us to look at the Carbotex pathway as a whole. PMA fermentation, cell removal, material coupling, dialysis, and freeze-drying are currently conducted as successive laboratory operations. Although each step can be carried out, further process development would need to consider how these operations could be connected, monitored, and controlled."
                          }
                        </p>
                        <p>
                          {"The visit therefore drew our attention to "}
                          <strong>
                            {
                              "process integration, operational monitoring, and standardization"
                            }
                          </strong>
                          {"."}
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "related",
                    title: "Hardware Design",
                    parts: [
                      {
                        kind: "content",
                        inline: false,
                        content: (
                          <>
                            <p>
                              {
                                "This manufacturing perspective also connects with the engineering design explored by our Hardware team."
                              }
                            </p>
                            <p>
                              {
                                "The team designed a modular liquid-pretreatment concept to investigate how upstream and downstream operations might be linked. For an upstream liquid stream that may require ammonium management, the proposed system uses a cation-exchange resin adsorption column together with peristaltic pumps and multi-way valves. Its fluidic design considers adsorption, washing, and resin-regeneration pathways."
                              }
                            </p>
                            <p>
                              {
                                "The Hardware team also designed an Internet of Things (IoT) monitoring component with pH and temperature sensors for collecting and transmitting process information."
                              }
                            </p>
                            <p>
                              {
                                "These designs provided us with a concrete example through which to consider material transfer and process monitoring between manufacturing steps. They are "
                              }
                              <strong>
                                {"engineering design explorations"}
                              </strong>
                              {
                                ", however, not evidence that an integrated Carbotex manufacturing line has already been validated."
                              }
                            </p>
                          </>
                        ),
                      },
                      {
                        kind: "figure",
                        src: "https://static.igem.wiki/teams/6147/wiki/fig5-2-hardware.avif",
                        alt: "Carbotex Hardware design for modular liquid pretreatment and process integration",
                        ratio: "740 / 500",
                        caption:
                          "Modular liquid-pretreatment and process-integration design.",
                        figureNumber: 23,
                      },
                      {
                        kind: "content",
                        inline: true,
                        content: (
                          <>
                            <strong>
                              <Link to={"/hardware"}>
                                {"Explore Our Hardware Design →"}
                              </Link>
                            </strong>
                          </>
                        ),
                      },
                    ],
                  },
                  {
                    kind: "anchor",
                    id: "ihp-bgi",
                  },
                  {
                    kind: "label",
                    text: "BGI — From Dispersed Results to Traceable Research Evidence",
                  },
                  {
                    kind: "gallery",
                    images: [
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-bgi-data-translation-meeting.avif",
                        alt: "Exchange at BGI about data, analysis, and biotechnology translation",
                      },
                      {
                        src: "https://static.igem.wiki/teams/6147/wiki/ihp-bgi-group-visit.avif",
                        alt: "Carbotex team during the BGI visit",
                      },
                    ],
                    columns: 2,
                    ratio: "345 / 260",
                    caption:
                      "BGI exchange on data and analytical infrastructure for biotechnology development.",
                    figureNumber: 24,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Our exchange with BGI highlighted the importance of data management and analytical infrastructure in complex biotechnology research."
                          }
                        </p>
                        <p>
                          {
                            "As Carbotex progressed, our team accumulated fermentation results from engineered strains, PMA concentration measurements, adhesive performance records, literature references, and modeling reports. These materials originated in different research modules. Answering a specific question could therefore require researchers to revisit experimental protocols, published datasets, and computational outputs to check the conditions and evidence underlying each result."
                          }
                        </p>
                        <p>{"This raised a broader question for us:"}</p>
                        <p>
                          <strong>
                            {
                              "How can experimental records, literature evidence, and modeling results be connected so that existing research can better inform subsequent analysis and decisions?"
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "related",
                    title: "WetFlow Research Agent",
                    parts: [
                      {
                        kind: "content",
                        inline: false,
                        content: (
                          <>
                            <p>
                              {"This challenge also resonates with "}
                              <strong>{"WetFlow"}</strong>
                              {
                                ", a research Agent workspace developed by our Model team."
                              }
                            </p>
                            <p>
                              {
                                "WetFlow brings project context together with local research documents, publicly available literature, and relevant modeling reports. It helps researchers examine the sources behind an answer and discuss different types of evidence within a shared research context."
                              }
                            </p>
                            <p>
                              {
                                "The team demonstrated WetFlow using three questions from the PMA–dopamine (PMA–DA) adhesive work: reconstructing the material-preparation procedure, comparing published dopamine feeding conditions, and identifying molecular questions related to existing adhesion tests. In the feeding comparison, the workspace helped distinguish the initial dopamine-to-carboxyl feed ratio, the dopamine content reported for a recovered product, and the separate concept of actual grafting efficiency."
                              }
                            </p>
                            <p>
                              {
                                "These examples show how evidence from experiments, publications, and modeling can be organized and revisited together. Importantly, "
                              }
                              <strong>
                                {
                                  "the demonstrations re-examined completed experimental work"
                                }
                              </strong>
                              {
                                "; they should not be interpreted as proof that WetFlow determined the team's earlier material formulation choices."
                              }
                            </p>
                            <p>
                              {
                                "The BGI exchange reinforced the relevance of this kind of evidence management, while WetFlow represents a separate, tangible effort by our own team to explore it. We do not claim that BGI developed the tool or directly performed our analyses."
                              }
                            </p>
                            <p>
                              <strong>
                                <Link to={"/model#model-overview"}>
                                  {"Explore Our WetFlow Research Agent →"}
                                </Link>
                              </strong>
                            </p>
                          </>
                        ),
                      },
                    ],
                  },
                  {
                    kind: "anchor",
                    id: "ihp-shenzhen-infrastructure",
                  },
                  {
                    kind: "label",
                    text: "Shenzhen Synthetic Biology Infrastructure — From Isolated Success to Standardized Engineering",
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-shenzhen-synthetic-biology-infrastructure.avif",
                    alt: "Carbotex visit to the Shenzhen synthetic biology research infrastructure",
                    ratio: "540 / 380",
                    caption:
                      "Shenzhen synthetic biology infrastructure visit on automated, standardized Design–Build–Test–Learn workflows.",
                    figureNumber: 25,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Our visit to the Shenzhen synthetic biology research infrastructure helped us appreciate the roles of automation, standardization, and systematic workflows in synthetic biology."
                          }
                        </p>
                        <p>
                          {"In particular, the "}
                          <strong>{"Design–Build–Test–Learn (DBTL)"}</strong>
                          {
                            " cycle encouraged us to think about the connections between successive experiments. Carbotex has already conducted work involving engineered strains, fermentation, and material preparation. Yet success in one experiment does not guarantee that the result can be reproduced."
                          }
                        </p>
                        <p>
                          {
                            "For experiments to support continuous engineering improvement, conditions need to be documented clearly, results need to be comparable across rounds, and the evidence obtained should inform subsequent designs."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Reliable engineering is not only about obtaining results; it is also about creating a process in which those results can be tested, compared, and improved."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "We did not build or use an automation platform equivalent to the infrastructure we visited. The value of this exchange was the perspective it provided on reproducibility and systematic iteration."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "label",
                    text: "From a Laboratory Pathway to a Reliable Manufacturing System",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "The four exchanges addressed different parts of manufacturing, yet they pointed to a common conclusion: "
                          }
                          <strong>
                            {
                              "successfully completing a sequence of laboratory operations is not the same as establishing a reliable manufacturing system."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "Tsingtao Brewery emphasized fermentation stability; Kinger Robot highlighted process integration and monitoring; BGI brought attention to research evidence and data management; and the Shenzhen infrastructure demonstrated the importance of standardized, iterative engineering."
                          }
                        </p>
                        <p>
                          {
                            "Comparing these perspectives with our current research helped us distinguish what Carbotex has already explored from what future manufacturing development would still require."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "capability-matrix",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "This comparison made it clear that manufacturing feasibility cannot be judged solely from one PMA titer or one adhesive performance result. It also needs to consider how individual operations and their supporting evidence fit together."
                          }
                        </p>
                        <p>
                          {
                            "These concerns connect with our earlier sustainability reflection: downstream processing, material recovery, and resource inputs may affect not only the environmental implications of the pathway, but also its practicality as a manufacturing process."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "These exchanges broadened the questions we ask about Carbotex's future development."
                          }
                        </p>
                        <p>
                          {
                            "Previously, our attention centered on improving PMA production in A08 and turning PMA into a functional adhesive material. We now recognize that future implementation must also address fermentation consistency, connections between process steps, reliable research records, and reproducible engineering practices."
                          }
                        </p>
                        <p>
                          {
                            "The Hardware design and WetFlow work, introduced alongside the relevant stakeholder exchanges above, made two of these challenges more tangible: how a processing interface might be designed and monitored, and how experimental, literature, and modeling evidence might be revisited together."
                          }
                        </p>
                        <p>
                          {"We do "}
                          <strong>{"not"}</strong>
                          {
                            " present these independent technical projects as changes directly caused by the industry visits. Rather, the visits helped us place existing work within a broader understanding of what reliable biomanufacturing would require."
                          }
                        </p>
                        <p>
                          {"Our change was therefore one of "}
                          <strong>
                            {
                              "engineering perspective and future evaluation priorities"
                            }
                          </strong>
                          {
                            ": instead of treating isolated laboratory successes as evidence of readiness for manufacturing, we began to examine the stability, integration, documentation, and reproducibility of the pathway as a whole."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "The exchanges gave us a clearer view of both Carbotex's current capabilities and the work still needed for responsible implementation."
                          }
                        </p>
                        <p>
                          {
                            "We have established a laboratory basis for PMA production and PMA–DA material preparation. WetFlow has been demonstrated through research cases that connect documents and evidence, while the Hardware team has developed a modular pretreatment and monitoring design."
                          }
                        </p>
                        <p>
                          {
                            "However, these achievements do not amount to a validated industrial manufacturing process. We have not established industrial-scale batch consistency or an integrated automated production and quality-control system. WetFlow is a research workspace rather than an industrial quality-management platform. Likewise, the Hardware concept still requires verification against the actual feedstock and process conditions used for A08 fermentation, including whether ammonium removal is necessary and suitable."
                          }
                        </p>
                        <p>
                          {
                            "These limitations are important outcomes of our reflection, not reasons to overlook the exchanges. They help us distinguish demonstrated laboratory research from the requirements of future implementation."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "For Carbotex, laboratory success is a starting point for reliable manufacturing—not proof that reliable manufacturing has already been achieved."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "Once we began to consider what stable production would require, another question followed: "
                          }
                          <strong>
                            {
                              "even if PMA–DA could eventually be manufactured consistently, how would we know whether it meets a real application need and is economically feasible?"
                            }
                          </strong>
                        </p>
                        <p>
                          <em>
                            {
                              "Next: 3.3 From Material Prototype to Commercial Feasibility"
                            }
                          </em>
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ihp-commercial",
        title: "3.3 Exploring Application and Commercial Potential",
        parts: [
          {
            kind: "content",
            inline: true,
            content: (
              <>
                <em>
                  {
                    "Beyond the Laboratory: Balancing Material Value and Manufacturing Feasibility"
                  }
                </em>
              </>
            ),
          },
          {
            kind: "trace",
            number: 12,
            stages: [
              {
                stage: "trigger",
                label: "From Material Development to Practical Application",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "As Carbotex progressed, our research extended from microbial production of polymalic acid (PMA) to the preparation of dopamine-functionalized polymalic acid (PMA-DA), a bio-based material with adhesive properties."
                          }
                        </p>
                        <p>
                          {
                            "We explored PMA-DA adhesion on glass, stainless steel, and ex vivo porcine skin. Our underwater-related experiments and preliminary biocompatibility assessments also yielded encouraging observations, suggesting further directions for potential applications."
                          }
                        </p>
                        <p>
                          {
                            "However, our progress raised a more practical question: "
                          }
                          <strong>
                            {
                              "What must a new material offer in order to create real value beyond the laboratory?"
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "Turning agricultural straw into PMA-DA requires lignocellulosic pretreatment and saccharification, microbial fermentation, dopamine functionalization, purification, and freeze-drying. Each stage involves resources, processing time, and equipment. We gradually recognized that "
                          }
                          <strong>
                            {
                              "technical feasibility in the laboratory does not automatically establish readiness for practical application or commercialization"
                            }
                          </strong>
                          {"."}
                        </p>
                        <p>
                          {
                            "We therefore wanted to understand what producing PMA-DA might cost, what makes it worth developing, and how to balance its functional advantages with manufacturing feasibility. These questions became the starting point for our next stage of Human Practices."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "reach-out",
                label: "Exploring Commercialization Challenges at CCiC",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "During the 2026 Conference of China iGEMer Community (CCiC), we participated in an Unconference organized by DUT-China on project commercialization and startup incubation."
                          }
                        </p>
                        <p>
                          {
                            "The discussion extended beyond technical innovation to practical product development, including manufacturing feasibility, production scale-up, market demand, and business models. This perspective was particularly relevant to Carbotex, which connects microbial production with functional-material development."
                          }
                        </p>
                        <p>
                          {
                            "Previously, we had largely evaluated the project from a research perspective: Could PMA be produced successfully? Could we functionalize it with dopamine? Would the resulting material adhere to different substrates?"
                          }
                        </p>
                        <p>
                          {
                            "At CCiC, we began reconsidering these questions from the perspectives of potential users and manufacturers. A promising material must also be produced consistently, meet clearly defined needs, and offer a convincing reason to be selected over existing alternatives."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-peer-community-dut-unconference-01-group-photo.avif",
                    alt: "Carbotex team at the CCiC Unconference on commercialization and startup incubation",
                    ratio: "540 / 380",
                    caption:
                      "Carbotex joined a CCiC discussion on commercialization.",
                    figureNumber: 26,
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        <a
                          href={
                            "https://static.igem.wiki/teams/6147/wiki/igem-discussion-notes.pdf"
                          }
                        >
                          <strong>
                            {"View our CCiC commercialization discussion notes"}
                          </strong>
                        </a>
                      </>
                    ),
                  },
                  {
                    kind: "label",
                    text: "What We Learned from the Discussion Notes",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "The discussion notes did more than record our participation at CCiC. They helped us organize the questions that must be addressed when moving a technology from laboratory research toward actual use."
                          }
                        </p>
                        <p>
                          {"First, we recognized that "}
                          <strong>
                            {
                              "technical feasibility and commercial feasibility are not the same"
                            }
                          </strong>
                          {
                            ". Successfully preparing a material demonstrates a promising technical approach, but practical adoption also requires attention to manufacturing scale, production costs, product consistency, and convenience."
                          }
                        </p>
                        <p>
                          {"Second, the exchange encouraged us to connect "}
                          <strong>
                            {"product value with specific user needs"}
                          </strong>
                          {
                            ". Low cost and mature manufacturing can be significant advantages for general-purpose adhesives. A specialized functional material, however, may create value through its performance under particular conditions or by addressing requirements that conventional products do not prioritize."
                          }
                        </p>
                        <p>
                          {
                            "Finally, we recognized that commercial analysis should not remain speculative. Wherever possible, it should be grounded in actual production steps and available data."
                          }
                        </p>
                        <p>{"This led us to two concrete questions:"}</p>
                        <p>
                          <strong>
                            {
                              "What resources are needed to prepare PMA-DA, and where could its material properties provide meaningful value?"
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "We translated these insights into follow-up actions: reviewing our production pathway, consulting an upstream technical collaborator for a second time, estimating preliminary costs, and reconsidering the application potential of PMA-DA."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "analyze",
                label: "From Production Cost to Material Value",
                parts: [
                  {
                    kind: "label",
                    text: "1. Reassessing the Advantages and Significance of PMA-DA",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "While beginning our cost analysis, we also reconsidered the value of the material we were developing."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "From agricultural residues to higher-value functional materials"
                            }
                          </strong>
                        </p>
                        <p>
                          {"Carbotex is distinctive in its production pathway."}
                        </p>
                        <p>
                          {
                            "Agricultural straw is an abundant non-food biomass resource. Through lignocellulosic saccharification, we aim to convert its carbon content into fermentable substrates, use engineered microorganisms to produce PMA, and subsequently functionalize PMA into an adhesive material."
                          }
                        </p>
                        <p>
                          {
                            "Carbotex is therefore more than an adhesive-development project: it explores a biological manufacturing route that converts agricultural residues into functional materials. Compared with pathways that depend directly on conventional fossil-derived feedstocks, this approach presents another possibility for using renewable carbon and creating higher-value uses for agricultural residues."
                          }
                        </p>
                        <p>
                          {"Our goal is not simply to consume straw. "}
                          <strong>
                            {
                              "We aim to convert an underutilized biomass resource into a functional material through microbial production and chemical functionalization."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "The overall environmental benefits of this pathway will still require quantitative evaluation, including future life-cycle analysis. Nevertheless, its design connects resource utilization with material development in a meaningful way."
                          }
                        </p>
                        <p>
                          <strong>
                            {"From polymer chemistry to functional adhesion"}
                          </strong>
                        </p>
                        <p>
                          {
                            "PMA contains abundant carboxyl groups, providing sites for chemical modification. By introducing dopamine, we aim to incorporate catechol groups capable of participating in interfacial interactions and to explore new adhesive properties."
                          }
                        </p>
                        <p>
                          {
                            "This design draws inspiration from chemical strategies associated with adhesion in wet environments. Instead of remaining only a fermentation-derived polymer, PMA becomes a functionalized material whose adhesive behavior can be studied across different interfaces."
                          }
                        </p>
                        <p>
                          {
                            "Our adhesion tests on glass, stainless steel, and ex vivo porcine skin provided initial observations on substrates with different surface characteristics, helping us explore the interfacial behavior of PMA-DA."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Beyond conventional bonding: opportunities in challenging environments"
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "In addition to tests on different substrates, we conducted underwater-related experiments and preliminary biocompatibility assessments involving L929 cells. Their encouraging results drew our attention to potential applications in wet environments and at biological interfaces."
                          }
                        </p>
                        <p>
                          {
                            "For certain applications, an adhesive must accomplish much more than joining two surfaces. Water can affect contact and interfacial interactions; materials used near biological surfaces must also satisfy relevant compatibility and safety requirements."
                          }
                        </p>
                        <p>
                          {
                            "A bio-based adhesive with a chemically modifiable polymer backbone and encouraging preliminary behavior in aqueous-condition and cell-response experiments is therefore worth exploring further."
                          }
                        </p>
                        <p>
                          {
                            "At present, these results do not establish that PMA-DA outperforms existing commercial adhesives or that it is safe for medical use. They do, however, suggest more focused directions for future research."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Carbotex is intended to offer more than another type of glue: a material option for applications with specific requirements concerning material origin, operating environment, or compatibility with biological interfaces."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "This perspective helped us recognize that the commercial potential of PMA-DA should be evaluated through both production cost and application-specific material value."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "label",
                    text: "2. Consulting Professor Yajun Liu Again: Tracing the Upstream Cost of Hydrolysate Production",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Following the commercialization discussion at CCiC, we began evaluating Carbotex's economic feasibility across the entire production pathway. However, while mapping the costs, we realized that our understanding of the resources required to produce the upstream consolidated bio-saccharification (CBS) hydrolysate was still incomplete."
                          }
                        </p>
                        <p>
                          {
                            "We had previously established a collaboration with Professor Yajun Liu and her team, who provided CBS hydrolysate for our subsequent PMA fermentation. This support enabled us to connect the biological conversion of agricultural residues with the development of a functional adhesive."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Inspired by the discussion at CCiC, we decided to consult Professor Liu for a second time. Unlike our first communication, which focused on technical collaboration, this follow-up focused on the actual inputs and cost considerations of upstream processing."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "We wanted to understand which steps were involved in converting agricultural straw into a fermentable hydrolysate, which reagents and materials were required, what typical input ratios were used, and what additional costs might be overlooked."
                          }
                        </p>
                        <p>
                          {
                            "During this exchange, we focused on the CBS process and the resources required at different stages. We considered the need for biomass pretreatment to improve lignocellulose accessibility, which introduces expenses related to pretreatment reagents, heating, and washing water."
                          }
                        </p>
                        <p>
                          {
                            "The pretreated biomass then enters the CBS system. Beyond the biomass substrate itself, culture-medium components are required to support the saccharifying microorganisms. Depending on the needs of downstream fermentation, the hydrolysate may subsequently undergo purification, impurity removal, or concentration."
                          }
                        </p>
                        <p>
                          {"These steps helped us recognize that "}
                          <strong>
                            {
                              "producing fermentable sugars from straw is not a simple raw-material substitution but a biological manufacturing process requiring multiple resources."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "As related background, research on consolidated bioprocessing describes the integration of lignocellulose breakdown with microbial conversion "
                          }
                          <Cite k={["Akinosho2014Thermocellum"]} />
                          {". That work concerns "}
                          <em>{"Clostridium thermocellum"}</em>
                          {
                            " and should not be treated as a source for the specific CBS process parameters or costs used in our estimates."
                          }
                        </p>
                        <p>
                          {
                            "Following this consultation, we also examined related research from Professor Liu's team to obtain quantitative reference parameters. In one published corn-stover CBS process, the system used approximately "
                          }
                          <strong>{"40 g/L of pretreated substrate"}</strong>
                          {" and obtained approximately "}
                          <strong>{"24.3 g/L of reducing sugars"}</strong>
                          {
                            ". The study also described alkaline pretreatment, culture-medium composition, and downstream hydrolysate treatment, allowing us to estimate selected material requirements "
                          }
                          <Cite k={["liu2023cornbioconversion"]} />
                          {"."}
                        </p>
                        <p>
                          {"These numerical values come from "}
                          <strong>{"published research conditions"}</strong>
                          {
                            ", not from measurements of the exact hydrolysate batch supplied to Carbotex or a direct price quotation from Professor Liu."
                          }
                        </p>
                        <p>
                          {
                            "Together, this second consultation and the published process data helped us build an initial framework for evaluating upstream costs."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "We learned that although agricultural straw is a relatively inexpensive non-food resource, converting it into fermentable carbon still entails expenses."
                            }
                          </strong>
                          {
                            " Pretreatment, saccharification, water, energy, medium components, and equipment all contribute to the overall production pathway and may affect the feasibility of PMA-DA."
                          }
                        </p>
                        <p>
                          {
                            "We do not yet have a complete cost quotation for the hydrolysate supplied by our collaborator. Nevertheless, this second discussion helped us understand the upstream cost structure and identify the additional information needed for a fuller assessment."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Most importantly, it transformed the commercialization insights gained at CCiC into concrete action: rather than examining only the final adhesive, we began tracing resource consumption back through the biological manufacturing process."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "We then combined this upstream perspective with laboratory preparation records and reagent purchase prices to conduct a preliminary quantitative cost analysis of PMA-DA."
                          }
                        </p>
                        <p>
                          <em>
                            {"Reference for the upstream process: "}
                            <a
                              href={
                                "https://doi.org/10.1186/s13068-023-02260-z"
                              }
                            >
                              {
                                "Liu et al. (2023), “Bioconversion of non-food corn biomass to polyol esters of fatty acid and single-cell oils”"
                              }
                            </a>
                            {
                              ". This study provides reference CBS process conditions, not the actual supply cost for Carbotex's hydrolysate."
                            }
                          </em>
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "label",
                    text: "3. Preliminary Material-Cost Analysis of PMA-DA Preparation",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Building on our upstream process analysis, we combined laboratory records, actual reagent purchasing information, and reference supplier quotations to estimate selected material costs associated with PMA-DA preparation."
                          }
                        </p>
                        <p>
                          {
                            "According to our preparation records, the batch used approximately "
                          }
                          <strong>
                            {
                              "200 mL of fermentation broth with a PMA concentration of 18 g/L"
                            }
                          </strong>
                          {", corresponding to approximately "}
                          <strong>
                            {"3.6 g of PMA before dopamine functionalization"}
                          </strong>
                          {
                            ". This is the theoretical PMA input, not the mass of recovered adhesive."
                          }
                        </p>
                        <p>
                          {
                            "For a theoretical reagent-consumption scenario, we assumed a dopamine-to-PMA-carboxyl molar ratio of 1:1, with EDC·HCl and NHS each used at two molar equivalents."
                          }
                        </p>
                        <p>
                          {
                            "Using available purchase prices and reference quotations, we obtained the following preliminary estimate:"
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "cost-breakdown",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          <em>
                            {
                              "Notes: The dopamine range represents two alternative calculation scenarios using dopamine free base or dopamine hydrochloride, rather than observed price fluctuations. EDC·HCl and NHS costs use supplier reference quotations. The CBS contribution is based on published process conditions and an assumed PMA yield of 0.5 g per g of reducing sugar. The displayed figures are rounded; consequently, summing the displayed line items may give a difference of RMB 0.01. This subtotal is not the complete production cost or the unit cost of recovered freeze-dried PMA-DA."
                            }
                          </em>
                        </p>
                        <p>
                          {
                            "This preliminary calculation highlighted an important factor that we had not previously considered in sufficient detail:"
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Dopamine accounted for approximately 83–86% of the material costs currently included in our model."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "Under these laboratory-scale assumptions, functionalizing fermentation-derived PMA into PMA-DA represents a significant part of the reagent expenditure."
                          }
                        </p>
                        <p>
                          {
                            "From a technical perspective, dopamine functionalization adds adhesive functionality worth investigating. From an economic perspective, it also introduces additional reagent requirements. This relationship between functional improvement and cost became an important consideration for future process development."
                          }
                        </p>
                        <p>
                          {
                            "Our attention therefore expanded beyond improving PMA production alone to include functionalization efficiency, appropriate reagent consumption, and recovery of the final usable material."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "label",
                    text: "4. Recognizing the Limitations of Laboratory-Scale Cost Estimation",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Beyond the purchase prices of reagents, we reviewed the main operational steps involved in preparing PMA-DA."
                          }
                        </p>
                        <p>
                          {
                            "According to our laboratory procedure, functionalization and recovery involve approximately 1 hour of activation, 24 hours of dopamine coupling, 48 hours of dialysis, 1 hour of prefreezing, and 48 hours of freeze-drying."
                          }
                        </p>
                        <p>
                          {
                            "Together, these operations represent approximately "
                          }
                          <strong>
                            {"122 hours of elapsed processing time"}
                          </strong>
                          {
                            ", excluding upstream hydrolysate preparation and PMA fermentation."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "process-timeline",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "This review highlighted the potential influence of processing duration, equipment occupation, consumables, and material recovery on practical production."
                          }
                        </p>
                        <p>
                          {"However, "}
                          <strong>
                            {
                              "our preliminary calculation does not yet accurately represent the complete cost of PMA-DA production, and it cannot predict the economics of future industrial-scale manufacturing."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "First, elapsed processing time is not equivalent to continuous labor. Coupling, dialysis, and freeze-drying have different operational requirements, and their durations cannot simply be counted as working hours."
                          }
                        </p>
                        <p>
                          {
                            "Second, complete data on equipment energy consumption, water use, consumables, all upstream input prices, and the actual recovered mass of freeze-dried PMA-DA are not yet available."
                          }
                        </p>
                        <p>
                          {
                            "Third, laboratory-scale preparation and potential larger-scale processes differ substantially in procurement, equipment utilization, and operating methods."
                          }
                        </p>
                        <p>
                          {
                            "Therefore, our current cost estimate should be understood as "
                          }
                          <strong>
                            {
                              "an initial attempt to identify the cost structure and potential process bottlenecks, rather than a complete techno-economic assessment"
                            }
                          </strong>
                          {"."}
                        </p>
                        <p>
                          {
                            "Nevertheless, it gives our subsequent work a clearer direction. We can improve records of actual reagent consumption, material recovery, and resource use across processing steps. We can also explore more efficient coupling conditions, less resource-intensive purification, and better equipment and material utilization."
                          }
                        </p>
                        <p>
                          {
                            "Once more complete data are available, we will calculate unit production cost using the actual recovered mass of the freeze-dried adhesive:"
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Unit production cost (RMB/g) = Complete batch production cost (RMB) / Recovered freeze-dried PMA-DA mass (g)"
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "Such a measure would enable more objective comparisons of preparation conditions and provide a reference for future manufacturing assessment."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "The main contribution of this analysis is not a precise prediction of product price, but a clearer identification of the factors affecting manufacturing feasibility and the opportunities for future improvement."
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "label",
                    text: "5. From Price Comparison to Application-Specific Value",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Following the preliminary cost analysis, we reconsidered the position of PMA-DA relative to existing adhesive products."
                          }
                        </p>
                        <p>
                          {
                            "Conventional industrial adhesives often benefit from established manufacturing systems, optimized formulations, and mature supply chains. Long-term industrial development has enabled cost reductions through economies of scale and more efficient processes."
                          }
                        </p>
                        <p>
                          {
                            "PMA-DA, in contrast, is still at the laboratory research stage. Expecting it to immediately achieve the price level of mature, mass-produced general-purpose adhesives would be unrealistic."
                          }
                        </p>
                        <p>
                          {
                            "However, this discussion also led us to an important realization: "
                          }
                          <strong>
                            {
                              "the value of a new material depends not only on whether it is cheaper than existing products, but also on whether it can address different application needs."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "The bio-based production pathway of Carbotex, the dopamine-functionalization strategy, and the encouraging observations from underwater-related experiments and preliminary biocompatibility assessments all suggest potential directions beyond conventional low-cost bonding."
                          }
                        </p>
                        <p>
                          {
                            "Wet environments and biological interfaces can place additional demands on an adhesive. In these settings, material selection may depend not only on price, but also on adhesion in relevant conditions, stability, and compatibility."
                          }
                        </p>
                        <p>
                          {
                            "This does not establish that PMA-DA already performs better than commercial alternatives. Rather, it gives us a reason to investigate the material under more clearly defined application conditions."
                          }
                        </p>
                        <p>{"We therefore reached a key conclusion:"}</p>
                        <p>
                          <strong>
                            {
                              "Exploring the commercial potential of Carbotex should not simply mean competing with ordinary glue on price. It should mean identifying applications that genuinely benefit from the distinctive properties of PMA-DA."
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                label:
                  "Integrating Commercial Considerations into Technical Development",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "The CCiC commercialization discussion, our second consultation with Professor Liu, and the subsequent material-value and cost analyses gave us a clearer perspective on Carbotex's future development."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "First, we began assessing the entire production pathway rather than focusing solely on final laboratory performance."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "Previously, we mainly evaluated project progress through PMA production, material preparation, and adhesion tests. After these exchanges, we began reviewing feedstock supply, functionalization reagents, and downstream processing to develop a more comprehensive picture of manufacturing requirements."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Second, we identified process stages that deserve attention in future optimization."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "Our preliminary cost analysis indicated that dopamine represented the largest share of the currently priced material inputs, while dialysis, freeze-drying, and product recovery may also affect production efficiency."
                          }
                        </p>
                        <p>
                          {
                            "This helped us define more specific objectives, including improving functionalization efficiency, avoiding unnecessary reagent consumption, shortening processing where feasible, and increasing material recovery."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Third, we placed greater emphasis on matching material properties with actual application needs."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "Our experiments under aqueous conditions and preliminary biocompatibility assessments provided a foundation for exploring PMA-DA in specific usage environments."
                          }
                        </p>
                        <p>
                          {
                            "We increasingly recognized that future development must answer not only "
                          }
                          <em>
                            {"how to produce the material more economically"}
                          </em>
                          {", but also "}
                          <em>
                            {"why a particular group of users would need it"}
                          </em>
                          {"."}
                        </p>
                        <p>
                          {
                            "We therefore identified more systematic application-oriented testing and future engagement with potential users and adhesive manufacturers as important next steps."
                          }
                        </p>
                        <p>
                          {
                            "In this way, Human Practices became more than a discussion alongside the project: it helped us reconsider technical priorities and potential application pathways."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                label:
                  "Balancing Material Innovation with Manufacturing Feasibility",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "These Human Practices activities encouraged us to consider Carbotex's material performance and production-resource requirements within the same framework."
                          }
                        </p>
                        <p>
                          {
                            "The CCiC discussion helped us understand the challenges of moving from technical validation to practical application. Consulting Professor Liu a second time improved our understanding of upstream saccharification inputs. Our preliminary cost analysis highlighted dopamine functionalization as an important cost consideration. Reexamining our material experiments also helped us recognize the potential value of PMA-DA in specialized environments."
                          }
                        </p>
                        <p>
                          {
                            "For a laboratory batch beginning with approximately "
                          }
                          <strong>{"3.6 g of PMA"}</strong>
                          {
                            ", the selected material inputs currently included in our model were estimated at "
                          }
                          <strong>{"approximately RMB 194–232"}</strong>
                          {"."}
                        </p>
                        <p>
                          {
                            "This figure is not the complete production cost, but it captures the material expenditure included in our current model and clarifies which additional data are still needed for future optimization."
                          }
                        </p>
                        <p>
                          {
                            "We also recognized that encouraging laboratory observations do not automatically translate into a mature commercial product. Practical applications will require further evaluation of material performance, production consistency, safety, and genuine user needs."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "The most valuable outcome of this exploration was not proof that Carbotex is already commercially competitive, but the development of a more realistic and purposeful approach to material development."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "By considering technical feasibility, manufacturing cost, and application requirements together, we established a stronger basis for the future development of Carbotex."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "Future Outlook: Creating Value Beyond Price Competition",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  <strong>
                    {
                      "At the current stage, PMA-DA is not as inexpensive as conventional adhesives produced through mature large-scale manufacturing."
                    }
                  </strong>
                </p>
                <p>
                  {
                    "However, different materials serve different application needs, and price should not be the only measure of their value."
                  }
                </p>
                <p>
                  {
                    "One of the most promising aspects of Carbotex is how it connects agricultural-residue utilization, microbial synthesis, and functional-material development."
                  }
                </p>
                <p>
                  {
                    "Starting with non-food lignocellulosic carbon, producing PMA using engineered microorganisms, and then introducing dopamine-derived functionality to explore adhesive behavior, this pathway demonstrates the potential of biological manufacturing in functional-material development."
                  }
                </p>
                <p>
                  {
                    "Our results on different substrates, in underwater-related experiments, and in preliminary biocompatibility assessments support further investigation of application-specific uses."
                  }
                </p>
                <p>
                  {
                    "More systematic evaluation will help identify applications in which wet-environment adhesion and interactions with biological interfaces are especially important."
                  }
                </p>
                <p>
                  {
                    "Looking ahead, we aim to investigate underwater adhesion and long-term stability under wet conditions, expand biocompatibility and material-safety assessments, and optimize our preparation process to reduce production costs."
                  }
                </p>
                <p>
                  {
                    "We also plan to communicate with potential users and relevant manufacturers to clarify expectations regarding adhesive performance, convenience, durability, safety, and acceptable costs, so that further development aligns with real needs."
                  }
                </p>
                <p>
                  <strong>
                    {
                      "Rather than becoming a cheaper version of ordinary glue, Carbotex should develop into a bio-based adhesive whose distinctive material properties address specific application challenges."
                    }
                  </strong>
                </p>
                <p>
                  {
                    "We believe the significance of transforming agricultural residues into functional adhesives lies not only in producing a new material, but also in exploring a biological manufacturing pathway connecting resource value, material innovation, and practical needs."
                  }
                </p>
                <p>
                  {
                    "By continuously improving production, validating material properties, and listening to future users, we can move Carbotex from a laboratory research outcome toward a functional material with clearly defined applications and practical value."
                  }
                </p>
                <p>
                  {
                    "As our future applications approach more complex environments and biological interfaces, the responsible evaluation of material safety will become increasingly important. We discuss these considerations in the following section, "
                  }
                  <strong>
                    {"3.4 From Biosafety to Product Responsibility"}
                  </strong>
                  {"."}
                </p>
              </>
            ),
          },
        ],
      },
      {
        id: "ihp-biosafety",
        title: "3.4 From Biosafety to Product Responsibility",
        parts: [
          {
            kind: "content",
            inline: true,
            content: (
              <>
                <em>
                  {
                    "Embedding Safety Throughout the Journey from Engineered Cells to Functional Materials"
                  }
                </em>
              </>
            ),
          },
          {
            kind: "trace",
            number: 13,
            stages: [
              {
                stage: "trigger",
                label: "When Material Development Raises New Safety Questions",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "As Carbotex progressed, we established a production pathway that connects microbial fermentation of polymalic acid (PMA) with the preparation of dopamine-functionalized PMA (PMA-DA), our bio-based adhesive."
                          }
                        </p>
                        <p>
                          {
                            "Safety had been part of our laboratory work from the beginning. During strain construction and fermentation, we paid attention to the use of engineered microorganisms, genetic manipulation, laboratory procedures, and biological waste management. As the project moved into material preparation and performance testing, our understanding of safety began to broaden."
                          }
                        </p>
                        <p>
                          {
                            "We had investigated adhesion on glass, stainless steel, and ex vivo porcine skin, alongside experiments under underwater conditions, mass-change measurements in phosphate-buffered saline (PBS), and preliminary L929 cell-based assessments. These studies encouraged us to explore possible applications of PMA-DA, including those involving wet environments and biological interfaces."
                          }
                        </p>
                        <p>
                          {
                            "At the same time, the production of PMA-DA involves several distinct stages: cultivation of engineered microorganisms, cell separation, chemical functionalization, purification, and material recovery. Each creates different questions for safe handling and future product development."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "How could we carry the principles of responsible research from the engineered production strain all the way to the final adhesive?"
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "This question guided our next Human Practices activities."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "anchor",
                    id: "ihp-grand-apic",
                  },
                ],
              },
              {
                stage: "reach-out",
                label: "A New Perspective from Grand APiC",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "At Grand APiC, we introduced Carbotex's production strategy, our genetic engineering work, and our plans for developing PMA-DA as an adhesive material."
                          }
                        </p>
                        <p>
                          {
                            "During the discussion, judges raised a question about biosafety, specifically drawing our attention to "
                          }
                          <strong>{"horizontal gene transfer (HGT)"}</strong>
                          {
                            " and the genetic information carried by engineered microorganisms."
                          }
                        </p>
                        <p>
                          {
                            "Until then, our discussions of biosafety had focused mainly on laboratory containment and the possibility of engineered microorganisms entering unintended environments. The feedback encouraged us to think more carefully about genetic elements themselves: which elements were introduced, how they were managed, and what their potential effects might be outside the intended production process."
                          }
                        </p>
                        <p>
                          {
                            "Horizontal gene transfer is a recognized mechanism of genetic exchange in microbial communities "
                          }
                          <Cite k={["Brito2021HGT"]} />
                          {
                            ". This general background highlights a topic for risk assessment; it does not demonstrate that HGT occurs from our engineered A08 strains."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-02-carbotex-poster-exchange.webp",
                    alt: "Carbotex presenting the project at Grand APiC",
                    ratio: "540 / 380",
                    caption: "Carbotex presenting the project at Grand APiC.",
                    figureNumber: 27,
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-03-responsible-research-session.webp",
                    alt: "Discussion on responsible research at Grand APiC",
                    ratio: "540 / 380",
                    caption:
                      "Discussion on biosafety and responsible research at Grand APiC.",
                    figureNumber: 28,
                  },
                  {
                    kind: "label",
                    text: "Responding to the Judges' Question",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "To address the concern, we revisited the roles of the engineered microorganism and the final adhesive in our production pathway."
                          }
                        </p>
                        <p>
                          {"Carbotex uses engineered "}
                          <em>{"Aureobasidium melanogenum"}</em>
                          {
                            " A08 to produce PMA during laboratory fermentation. The intended adhesive is a processed polymer material, not an application of living engineered cells. In our material-preparation procedure, the fermentation broth is centrifuged to separate cells before the PMA-containing liquid enters the dopamine-functionalization process."
                          }
                        </p>
                        <p>
                          {
                            "This distinction helped us organize our response, but it also led us to look more closely at the steps between microbial production and the final material. Biosafety management should address the engineered culture and biological waste, while the downstream process must consider separation, purification, and final material quality."
                          }
                        </p>
                        <p>
                          {
                            "The judges' question also brought our attention back to the strain records. A meaningful assessment of genetic risks requires clarity about the genetic elements present in the strain actually used for production, including the selection systems involved in its construction."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "The exchange changed the scope of our safety review: instead of considering only the behavior of the microorganism, we began examining the links between genetic design, laboratory management, material processing, and product quality."
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "analyze",
                label: "Following Safety Through the Production Pathway",
                parts: [
                  {
                    kind: "label",
                    text: "1. Managing Engineered A08 and Its Genetic Elements",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {"Our team engineered "}
                          <em>{"Aureobasidium melanogenum"}</em>
                          {
                            " A08 to improve PMA production from straw-derived carbon sources, with work addressing xylose-related regulation and metabolic precursor supply."
                          }
                        </p>
                        <p>
                          {
                            "The strain-construction records include the use of genetic-expression and selection systems. For example, NAT selection appears in our records, while HPT is associated with certain knockout-donor designs. These details matter because a selection marker used during an experiment is not necessarily equivalent to a marker retained in the final production strain."
                          }
                        </p>
                        <p>
                          {
                            "After Grand APiC, we gave greater attention to documenting the genetic background and construction history of individual A08 strains. This allows questions about introduced elements, their intended function, and their status in the strain used for fermentation to be addressed using actual construct records."
                          }
                        </p>
                        <p>
                          {
                            "We also connected this genetic perspective with laboratory management, including the handling of cultures and biological waste. Considering HGT in the context of a specific organism, genetic design, and possible exposure pathways is more useful than drawing conclusions from general assumptions about microbial survival."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Our priority became making biosafety assessments traceable to the genetic design and practical handling of the strains we use."
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "label",
                    text: "2. From Fermentation Broth to Adhesive: Why Purification Matters",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "The safety discussion also prompted us to revisit the transition from biological production to material processing."
                          }
                        </p>
                        <p>
                          {
                            "In our wet-lab workflow, cells are separated from the fermentation broth by centrifugation. The PMA-containing liquid is then subjected to dopamine functionalization using an EDC·HCl/NHS coupling system. Dialysis, prefreezing, and freeze-drying are used in subsequent material preparation and recovery."
                          }
                        </p>
                        <p>
                          {
                            "These steps determine not only whether a usable adhesive sample can be obtained, but also which components may remain in the final material."
                          }
                        </p>
                        <p>
                          {
                            "The upstream fermentation process introduces possible microbial components, while the coupling reaction introduces dopamine, activation reagents, and reaction by-products. Understanding the composition of the final material therefore requires attention to both stages."
                          }
                        </p>
                        <p>
                          {
                            "This consideration connects directly with our discussion in Section 3.3. There, we identified purification and freeze-drying as resource-intensive parts of laboratory preparation. Here, we recognized their additional importance for material quality."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Improving production efficiency should go hand in hand with understanding what each separation and purification step contributes to the final product."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "For future optimization, this means examining process efficiency, product recovery, and purification performance together, rather than evaluating a change only by the time or reagents it saves."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "label",
                    text: "3. From Adhesive Performance to Safety in Intended Use",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Our material experiments have provided several perspectives on the potential uses of PMA-DA."
                          }
                        </p>
                        <p>
                          {
                            "Adhesion tests on glass, stainless steel, and ex vivo porcine skin helped us examine interactions with different surfaces. Experiments under underwater conditions and mass-change measurements in PBS extended our investigation to aqueous environments. We also conducted preliminary assessments involving L929 cells to explore the material's cellular response."
                          }
                        </p>
                        <p>
                          {
                            "Together, these investigations helped us think about the requirements of possible applications more concretely."
                          }
                        </p>
                        <p>
                          {
                            "For example, bonding industrial surfaces involves questions about adhesion, stability, handling, and exposure during use. Applications involving biological interfaces introduce further considerations, including material composition, substances released from the material, and responses under relevant contact conditions."
                          }
                        </p>
                        <p>
                          {
                            "Our existing experiments offer a starting point for investigating these questions. They also help us identify which tests would be most useful as we narrow down potential application scenarios."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Understanding where PMA-DA can adhere is one part of developing the material; understanding how it behaves in its intended environment is what will help guide responsible application."
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "label",
                    text: "4. From Safety Awareness to Laboratory Practice",
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Alongside the evaluation of microorganisms and materials, we also paid attention to how team members carry out everyday laboratory work."
                          }
                        </p>
                        <p>
                          {
                            "During an on-site laboratory session, a laboratory instructor introduced us to basic experimental procedures, instrument use, and safety precautions. The explanations gave us a clearer understanding of laboratory routines and the risks associated with improper operation, and reinforced the importance of following established procedures."
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-3-4-lab-safety-training.avif",
                    alt: "Laboratory instruction on experimental procedures and safety precautions",
                    ratio: "540 / 380",
                    caption:
                      "Laboratory guidance on experimental operation and safety.",
                    figureNumber: 29,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "China Ocean University's Virtual Simulation Laboratory Management Platform also offers interactive online resources for laboratory safety education. By simulating operations and equipment use, these resources can help students become familiar with procedures and recognize common risks before working with real experimental materials."
                          }
                        </p>
                        <p>
                          {
                            "We see value in combining direct guidance from laboratory instructors with virtual simulation resources and established laboratory procedures to strengthen routine safety training."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "This experience brought biosafety into the practical details of our work: understanding procedures, recognizing risks, and carrying out experiments responsibly."
                            }
                          </strong>
                        </p>
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "change",
                label: "Bringing Safety into Project Development",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "The feedback at Grand APiC, our review of the wet-lab workflow, and the laboratory safety guidance led us to refine our priorities in three areas."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "First, we placed greater emphasis on the genetic records and management of engineered A08 strains."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "The judges' concern about HGT encouraged us to consider genetic elements alongside laboratory containment and culture handling. When discussing strain safety, we now focus on the construction history and actual genetic status of the strain used, rather than treating all experimental constructs as identical."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Second, we connected purification and material quality with process optimization."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "Revisiting the PMA-DA preparation workflow highlighted the importance of cell separation, functionalization reagents, and dialysis. As we consider future improvements to the process, we intend to evaluate both preparation efficiency and the quality of the recovered material."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "Third, we strengthened the place of safety education in our development process."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "The laboratory instructor's on-site explanations improved our understanding of basic operations and precautions. Virtual simulation resources provide a useful complementary learning approach, and we intend to connect these resources with routine laboratory guidance and operating procedures."
                          }
                        </p>
                        <p>
                          {
                            "Together, these considerations gave us a framework that follows Carbotex's actual workflow:"
                          }
                        </p>
                      </>
                    ),
                  },
                  {
                    kind: "flow",
                    steps: [
                      "Engineered strain management",
                      "Responsible laboratory practice",
                      "Material preparation and purification",
                      "Safety assessment for intended applications",
                    ],
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <>
                        {
                          "This framework helps us connect feedback from Human Practices with the practical choices that shape our experimental work."
                        }
                      </>
                    ),
                  },
                ],
              },
              {
                stage: "evaluate",
                label: "Extending Responsibility Beyond the Laboratory",
                parts: [
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <>
                        <p>
                          {
                            "Our work in this section changed how we think about safety across Carbotex."
                          }
                        </p>
                        <p>
                          {
                            "The discussion at Grand APiC brought genetic elements and HGT into our consideration of engineered-strain management. Revisiting the material-preparation procedure connected safety questions with separation, chemical functionalization, and purification. The laboratory instructor's guidance also made the importance of everyday experimental practice more tangible for our team."
                          }
                        </p>
                        <p>
                          {
                            "These experiences complement our material testing. Adhesion experiments, underwater-condition observations, PBS mass-change measurements, and L929 assessments help us explore the material's potential. More detailed characterization and application-specific evaluation will help us decide how that potential can be developed responsibly."
                          }
                        </p>
                        <p>
                          <strong>
                            {
                              "The central outcome of this Human Practices work was a broader approach to safety: one that follows Carbotex from the production strain to the final adhesive, while keeping laboratory practice and intended use in view."
                            }
                          </strong>
                        </p>
                        <p>
                          {
                            "This approach also connects with the manufacturing discussion in Section 3.3. As we improve production efficiency and explore applications that benefit from the distinctive properties of PMA-DA, material quality and safety will remain part of our design decisions."
                          }
                        </p>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "Future Outlook: Making Safety Part of Practical Application",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "We will continue developing Carbotex as a route from agricultural residues to functional bio-based adhesives. Future progress will depend not only on material performance and production efficiency, but also on how well we understand and manage the associated risks."
                  }
                </p>
                <p>
                  {
                    "For the engineered production strain, our priorities include maintaining clear genetic records and refining biosafety assessment around the strain and laboratory procedures actually used."
                  }
                </p>
                <p>
                  {
                    "For PMA-DA preparation, we will examine the removal of microbial components and functionalization-related residues, alongside improvements in purification efficiency and material recovery."
                  }
                </p>
                <p>
                  {
                    "For future applications, we plan to build on our adhesion, underwater-condition, PBS, and L929 experiments with more systematic assessments of stability, material composition, and biological responses under relevant conditions."
                  }
                </p>
                <p>
                  {
                    "We will also continue to value laboratory safety education, drawing on in-person guidance, virtual simulation resources, and routine operating practices."
                  }
                </p>
                <p>
                  <strong>
                    {
                      "Our goal is to develop not only a promising adhesive, but also a responsible pathway for producing, evaluating, and eventually using it."
                    }
                  </strong>
                </p>
                <p>
                  {
                    "For Carbotex, responsible innovation means taking each stage of the process seriously—from the genetic design of the production strain to the way the final material may interact with its environment."
                  }
                </p>
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    id: "ihp-conversation",
    title: "Carbotex in Conversation",
    parts: [
      {
        kind: "content",
        inline: false,
        content: (
          <>
            <p>
              <em>
                {"Sharing Ideas, Building Connections, Creating Together"}
              </em>
            </p>
            <p>{"Carbotex did not grow within the laboratory alone."}</p>
            <p>
              {
                "From our first project discussions to strain engineering, PMA production, and adhesive development, we kept exchanging ideas with fellow iGEM teams, researchers, and people from different backgrounds. Presenting our work gave us opportunities to hear questions we had not considered, learn how other teams approached their challenges, and build relationships that continued beyond a single event."
              }
            </p>
            <p>
              {
                "These exchanges served different purposes. Some informed our technical decisions; others introduced new approaches to Human Practices, supported peer learning, or developed into collaborative public engagement. Together, they gave Carbotex a place within a wider community of people exploring what synthetic biology can contribute."
              }
            </p>
          </>
        ),
      },
    ],
    subsections: [
      {
        id: "ihp-peers",
        title: "4.1 Growing Alongside Our Peers",
        parts: [
          {
            kind: "anchor",
            id: "ihp-collab-ouc-china",
          },
          {
            kind: "label",
            text: "OUC-China: From Campus Peers to Cross-University Exchange",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "Our connection with OUC-China began when both teams were newly formed."
                  }
                </p>
                <p>
                  {
                    "As two iGEM teams from Ocean University of China, OUC-Haide and OUC-China met early in the season to introduce our projects, exchange initial plans, and discuss the challenges of building an iGEM team. Although we had chosen different research topics, we shared a desire to turn what we had learned into meaningful synthetic biology projects."
                  }
                </p>
                <p>{"We continued that contact as the season progressed."}</p>
              </>
            ),
          },
          {
            kind: "figure",
            src: "https://static.igem.wiki/teams/6147/wiki/ihp.avif",
            alt: "Early exchange between OUC-Haide and OUC-China",
            ratio: "540 / 380",
            caption: "Early project exchange between OUC-Haide and OUC-China.",
            figureNumber: 30,
          },
          {
            kind: "anchor",
            id: "ihp-collab-tianjin-exchange",
            label: "Nankai University and Tianjin University exchange",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "Together with OUC-China, we later traveled to Tianjin to exchange ideas with students and researchers from Nankai University and Tianjin University. Through project discussions and laboratory visits, we learned about different research environments, facilities, and approaches to organizing experimental work."
                  }
                </p>
                <p>
                  {
                    "These meetings extended our conversations beyond our home university. We shared progress and practical experiences while listening to how other teams approached their projects. Communication channels established through the exchange also provided opportunities to stay in touch and continue sharing questions during the season."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "gallery",
            images: [
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-tianjin-exchange-01-meeting.webp",
                alt: "Cross-university project exchange in Tianjin",
              },
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-tianjin-exchange-05-lab-discussion.webp",
                alt: "Discussion during a university laboratory visit",
              },
            ],
            columns: 2,
            ratio: "345 / 260",
            caption:
              "Cross-university discussions and laboratory visits in Tianjin.",
            figureNumber: 31,
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "Our connection continued through OUC-China's subsequent recruitment activities, where we exchanged experiences of participating in iGEM with prospective new members."
                }
              </>
            ),
          },
          {
            kind: "figure",
            src: "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-recruitment-exchange-01.webp",
            alt: "Exchange during OUC-China recruitment activities",
            ratio: "540 / 380",
            caption: "OUC-Haide sharing iGEM experience with OUC-China.",
            figureNumber: 32,
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "From our first conversation to visits and later activities, OUC-China became a valued peer team throughout the season. This experience reminded us that iGEM is not only about completing our own project, but also about supporting one another through a shared scientific journey."
                }
              </>
            ),
          },
        ],
      },
      {
        id: "ihp-community",
        title: "4.2 Seeing Carbotex Through Other Eyes",
        parts: [
          {
            kind: "anchor",
            id: "ihp-ccic",
          },
          {
            kind: "label",
            text: "CCiC: Bringing Our Project into a Wider Community",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "As Carbotex's technical strategy took shape, we wanted to share it beyond our own team and hear how other researchers and iGEMers understood our work."
                  }
                </p>
                <p>
                  {
                    "In 2026, we attended the 13th Conference of China iGEMer Community (CCiC), hosted at Dalian University of Technology, together with the Synbiopunk activities held during the event."
                  }
                </p>
                <p>
                  {
                    "Through poster discussions, project presentations, and informal conversations, we introduced our approach: using straw-derived carbon for microbial PMA production and developing the resulting polymer into a bio-based adhesive."
                  }
                </p>
                <p>
                  {
                    "The conference brought us into contact with teams studying a wide range of applications of synthetic biology. Talking with people who did not share our immediate research background helped us recognize which parts of Carbotex's story were clear and which needed a stronger connection between modules."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "gallery",
            images: [
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-02-peer-exchange.webp",
                alt: "Peer exchange at CCiC",
              },
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-04-poster-discussion.webp",
                alt: "Carbotex poster discussion at CCiC",
              },
            ],
            columns: 2,
            ratio: "345 / 260",
            caption: "Presenting Carbotex and exchanging ideas at CCiC.",
            figureNumber: 33,
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "During project evaluation, judges noted that Carbotex brought together genetic engineering, modeling, fermentation, and material development, but that the relationships among these components could be communicated more clearly. They encouraged us to use the "
                  }
                  <strong>{"Design–Build–Test–Learn (DBTL)"}</strong>
                  {
                    " framework to show how experimental findings and analysis could inform subsequent design."
                  }
                </p>
                <p>
                  {
                    "This feedback helped us rethink how to present the project as an interconnected engineering process rather than a collection of separate results. It also drew our attention to the importance of making feedback between design, testing, and learning visible in the Wiki."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "figure",
            src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-06-carbotex-stage-presentation-dbtl.webp",
            alt: "Carbotex project presentation and DBTL-related feedback at CCiC",
            ratio: "540 / 380",
            caption: "Carbotex presenting the project at CCiC.",
            figureNumber: 34,
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "We also spoke with Dr. Haotian Guo about the development of PMA-based adhesives. This exchange helped us consider PMA as a platform for functional material design, rather than simply a fermentation product. Its contribution to our material-development thinking is discussed in the earlier sections of our Integrated Human Practices."
                }
              </>
            ),
          },
          {
            kind: "label",
            text: "An Encounter That Became a Collaboration: QingdaoAcademy",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {"CCiC was also where we met "}
                  <strong>{"QingdaoAcademy"}</strong>
                  {", a high-school iGEM team from Qingdao."}
                </p>
                <p>
                  {
                    "We introduced our projects to each other and shared our experiences of joining iGEM. That first meeting established a connection between two teams working independently but interested in making synthetic biology accessible to more young people."
                  }
                </p>
                <p>
                  {
                    "As we stayed in touch, we discovered a shared interest in making science communication more engaging and participatory. "
                  }
                  <strong>
                    {
                      "The encounter at CCiC eventually became the starting point for a public-engagement activity that we designed and delivered together."
                    }
                  </strong>
                </p>
                <p>{"We return to that collaboration in Section 4.5."}</p>
              </>
            ),
          },
          {
            kind: "label",
            text: "Learning from Team-Led Discussions",
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "At CCiC, we also joined Unconference activities hosted by other iGEM teams."
                }
              </>
            ),
          },
          {
            kind: "anchor",
            id: "ihp-collab-dut-china",
            label: "DUT-China commercialization discussion",
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "DUT-China organized a discussion on commercialization and startup incubation. Our conversations about manufacturing scale, production costs, and real user needs motivated the preliminary PMA-DA cost analysis described in "
                }
                <strong>
                  {
                    "Section 3.3, Exploring Application and Commercial Potential"
                  }
                </strong>
                {"."}
              </>
            ),
          },
          {
            kind: "anchor",
            id: "ihp-collab-jlu-fbh",
            label: "JLU-FBH From Teams, For Teams roundtable",
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {"We also participated in JLU-FBH's "}
                <strong>{'"From Teams, For Teams"'}</strong>
                {
                  " roundtable, where teams exchanged experiences of project development, team organization, and Human Practices."
                }
              </>
            ),
          },
          {
            kind: "gallery",
            images: [
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-peer-community-dut-unconference-01-group-photo.avif",
                alt: "DUT-China commercialization discussion at CCiC",
              },
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-peer-community-jlu-fbh-from-teams-for-teams-01-multiteam-group-photo.avif",
                alt: "JLU-FBH From Teams, For Teams roundtable",
              },
            ],
            columns: 2,
            ratio: "345 / 260",
            caption: "Participating in peer-led discussions at CCiC.",
            figureNumber: 35,
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  <a
                    href={
                      "https://static.igem.wiki/teams/6147/wiki/igem-discussion-notes.pdf"
                    }
                  >
                    {"View our commercialization discussion notes"}
                  </a>
                </p>
                <p>
                  {"At the Synbiopunk event, our team also received "}
                  <strong>{"second place in the popularity award"}</strong>
                  {
                    ". We appreciated this encouragement from the iGEM community, alongside the conversations and new friendships that made the event memorable."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "figure",
            src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-09-synbiopunk-challenge-second-place.webp",
            alt: "Carbotex at Synbiopunk",
            ratio: "540 / 380",
            caption: "Carbotex receiving recognition at Synbiopunk.",
            figureNumber: 36,
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "Looking back, some of the most valuable outcomes of CCiC continued well beyond the conference. Judges' questions sharpened our project narrative, commercialization discussions led to further analysis, and a chance meeting with another team eventually developed into joint outreach."
                }
              </>
            ),
          },
          {
            kind: "label",
            text: "Grand APiC: Engaging with Broader Perspectives",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "We also presented Carbotex at Grand APiC, where we met iGEM teams, researchers, and participants from different professional backgrounds."
                  }
                </p>
                <p>
                  {
                    "Through poster sessions and conversations, we introduced our project and learned how others approached the scientific and practical questions surrounding synthetic biology."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "gallery",
            images: [
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-01-community-group-photo.webp",
                alt: "Community gathering at Grand APiC",
              },
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-02-carbotex-poster-exchange.webp",
                alt: "Carbotex poster exchange at Grand APiC",
              },
            ],
            columns: 2,
            ratio: "345 / 260",
            caption: "Presenting Carbotex and exchanging ideas at Grand APiC.",
            figureNumber: 37,
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "A discussion with judges raised questions about biosafety and horizontal gene transfer (HGT). This feedback prompted us to revisit the genetic-element management of our engineered A08 strain and the responsibilities involved in preparing a final adhesive material. We examine this response in "
                  }
                  <strong>
                    {"Section 3.4, From Biosafety to Product Responsibility"}
                  </strong>
                  {"."}
                </p>
                <p>
                  {
                    "Other discussions with industry-related participants gave us further opportunities to consider the relationship between synthetic biology research and practical manufacturing."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "figure",
            src: "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-04-biotechnology-industry-exchange.webp",
            alt: "Biotechnology industry exchange at Grand APiC",
            ratio: "540 / 380",
            caption:
              "Exchanges with industry-related participants at Grand APiC.",
            figureNumber: 38,
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "CCiC and Grand APiC gave Carbotex a wider audience and exposed us to questions from people with different priorities. Together, they strengthened our understanding that research must be communicated and evaluated from more than one perspective."
                }
              </>
            ),
          },
        ],
      },
      {
        id: "ihp-across-borders",
        title: "4.3 Human Practices Across Borders",
        parts: [
          {
            kind: "anchor",
            id: "ihp-collab-peking-rice",
          },
          {
            kind: "label",
            text: "2026 US-China iGEM Human Practices Summit: Learning Across Teams",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {"We participated in "}
                  <strong>
                    {
                      '"People in the World of SynBio — 2026 US-China iGEM Human Practices Summit,"'
                    }
                  </strong>
                  {
                    " a virtual event hosted by Peking University and Rice University from July to August 2026."
                  }
                </p>
                <p>
                  {
                    "The summit brought together iGEM teams from China and other countries to introduce their projects, share their Human Practices experiences, and exchange different approaches to connecting synthetic biology with society."
                  }
                </p>
                <p>
                  {
                    "Through online presentations and discussions, we learned how different teams explored the social dimensions of their projects, engaged with stakeholders, and reflected on the challenges they encountered."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "anchor",
            id: "ihp-collab-princeton",
            label: "Princeton University Human Practices case",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "Among the presentations, Princeton University's team shared how expert engagement could help teams reconsider project assumptions and inform design decisions. Nankai University's team introduced its approach to incorporating different stakeholder perspectives into research and communication."
                  }
                </p>
                <p>
                  {
                    "For Carbotex, the summit provided an opportunity to learn from the experiences of other teams and reflect on our own Human Practices approach. It reminded us that meaningful engagement is not defined simply by the number of activities conducted, but by how carefully teams listen, interpret feedback, and connect what they learn to their projects."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "gallery",
            images: [
              {
                src: "https://static.igem.wiki/teams/6147/wiki/meeting.avif",
                alt: "Online presentations and team exchanges during the 2026 US-China iGEM Human Practices Summit",
              },
              {
                src: "https://static.igem.wiki/teams/6147/wiki/certification.avif",
                alt: "Certificate of participation awarded to OUC-Haide at the 2026 US-China iGEM Human Practices Summit",
              },
            ],
            columns: 2,
            ratio: "390 / 290",
            caption:
              "Online exchanges during the 2026 US-China iGEM Human Practices Summit and the certificate of participation awarded to OUC-Haide.",
            figureNumber: 39,
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "We also prepared a presentation to organize and share the outcomes of this international learning experience. It serves as a record of the exchange and a resource for revisiting the Human Practices approaches discussed during the summit."
                  }
                </p>
                <p>
                  <a
                    href={
                      "https://static.igem.wiki/teams/6147/wiki/ouc-haide-1.pdf"
                    }
                  >
                    <strong>
                      {
                        "View Our International Human Practices Summit Presentation (PDF)"
                      }
                    </strong>
                  </a>
                </p>
                <p>
                  {
                    "Although the participating teams explored different scientific questions, the summit highlighted a shared interest in connecting synthetic biology with people and society. Learning from their experiences encouraged us to reflect more carefully on how we document and communicate our own Human Practices activities."
                  }
                </p>
                <p>
                  {
                    "Other examples emphasized public trust, meaningful participation, and communication with audiences of different backgrounds. Seeing these varied approaches reminded us that there is no single template for Human Practices. Teams need to choose methods suited to their projects and the people they hope to engage."
                  }
                </p>
                <p>
                  {
                    "For Carbotex, a particularly useful lesson was the importance of connecting what stakeholders say with the decisions and actions that follow. It encouraged us to revisit how we document expert consultations, project feedback, application analysis, and public engagement within our own Human Practices."
                  }
                </p>
              </>
            ),
          },
        ],
      },
      {
        id: "ihp-collaboration",
        title: "4.4 From Straw to Renewable Carbon",
        parts: [
          {
            kind: "anchor",
            id: "ihp-qibebt",
          },
          {
            kind: "label",
            text: "Green Carbon and QIBEBT: Seeing the Wider Resource Context",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "Carbotex began with agricultural straw. As our project developed, we gradually broadened our perspective from a particular feedstock to the renewable carbon it contains and the different ways that carbon may enter useful products."
                  }
                </p>
                <p>
                  {"Through research visits and exchanges associated with the "}
                  <strong>
                    {
                      "Qingdao Institute of Bioenergy and Bioprocess Technology (QIBEBT)"
                    }
                  </strong>
                  {
                    ", we encountered work related to lignocellulosic conversion, synthetic biology, and green biomanufacturing. Research themes discussed in the journal "
                  }
                  <em>{"Green Carbon"}</em>
                  {
                    ", including renewable carbon resources and their transformation, also provided a broader context for our project "
                  }
                  <Cite k={["KeAiGreenCarbon2026"]} />
                  {"."}
                </p>
                <p>
                  {
                    "These were opportunities to learn about relevant research directions, rather than claims that the journal itself provided direct technical guidance to Carbotex."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "gallery",
            images: [
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-02-project-exchange-meeting.avif",
                alt: "Project exchange related to Green Carbon and QIBEBT",
              },
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-03-lignocellulose-bioconversion-tour.avif",
                alt: "Visit concerning lignocellulosic bioconversion",
              },
            ],
            columns: 2,
            ratio: "345 / 260",
            caption:
              "Exploring renewable-carbon and green-biomanufacturing research.",
            figureNumber: 40,
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "We had originally approached the project with a simple question: how could we make better use of agricultural straw? These exchanges encouraged us to view straw as part of a wider agricultural and carbon-resource system."
                  }
                </p>
                <p>
                  {
                    "Crop residues already serve several established purposes. Our ambition is not to replace those pathways indiscriminately, but to investigate whether suitable biomass resources could support an additional route toward functional materials."
                  }
                </p>
                <p>
                  {
                    "From straw-derived sugars to microbial PMA production and eventually adhesive development, Carbotex explores one possible connection between renewable carbon and biological manufacturing."
                  }
                </p>
                <p>
                  <strong>
                    {
                      "We started with straw, but our conversations helped us understand the project through the broader lens of renewable carbon."
                    }
                  </strong>
                </p>
              </>
            ),
          },
          {
            kind: "figure",
            src: "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-04-synthetic-biology-green-biomanufacturing-exhibit.avif",
            alt: "Exhibition on synthetic biology and green biomanufacturing",
            ratio: "540 / 380",
            caption: "Learning about related work in synthetic biology.",
            figureNumber: 41,
          },
        ],
      },
      {
        id: "ihp-co-creation",
        title: "4.5 From Communication to Co-Creation",
        parts: [
          {
            kind: "anchor",
            id: "ihp-collab-qingdaoacademy",
          },
          {
            kind: "label",
            text: 'OUC-Haide × QingdaoAcademy: "17 C: The Fatal Experiment"',
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "After meeting QingdaoAcademy at CCiC, we stayed in contact and began discussing how the two teams could collaborate on synthetic biology outreach."
                  }
                </p>
                <p>
                  {
                    "Our team members came from different educational backgrounds, but we shared an interest in helping younger audiences participate actively in science rather than simply listening to a presentation."
                  }
                </p>
                <p>{"We began with a question:"}</p>
                <p>
                  <strong>
                    {
                      "What if participants could become investigators in a scientific story, instead of remaining passive listeners?"
                    }
                  </strong>
                </p>
                <p>
                  {
                    "This idea developed into an immersive synthetic biology activity that we jointly designed and delivered: "
                  }
                  <strong>{'"17 C: The Fatal Experiment."'}</strong>
                </p>
                <p>
                  {
                    "The activity integrated scientific concepts into an investigative storyline. Participants followed clues, considered evidence, discussed possibilities, and made decisions as they explored ideas connected with biological technology."
                  }
                </p>
                <p>
                  {
                    "By inviting participants into the story, we turned synthetic biology into something they could actively question and explore."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "gallery",
            images: [
              {
                src: "https://static.igem.wiki/teams/6147/wiki/mishi1.webp",
                alt: "Students participating in interactive science communication activities",
              },
              {
                src: "https://static.igem.wiki/teams/6147/wiki/mishi2.webp",
                alt: "Group photographs of students and iGEM team members during the outreach activity",
              },
            ],
            columns: 2,
            ratio: "420 / 360",
            caption:
              "OUC-Haide and QingdaoAcademy co-created an outreach activity.",
            figureNumber: 42,
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "The collaboration also changed our own experience of science communication. Participants' questions, interpretations of clues, and discussions gave us opportunities to see how people with different backgrounds approached the material."
                  }
                </p>
                <p>
                  {
                    "For the two teams, designing and carrying out the event required continued communication, coordination, and problem-solving. What started as a chance meeting became a shared public-engagement project."
                  }
                </p>
                <p>
                  <strong>
                    {
                      "We met at CCiC as two independent teams, and later came together again as co-creators."
                    }
                  </strong>
                </p>
              </>
            ),
          },
        ],
      },
      {
        id: "ihp-beyond-language",
        title: "4.6 Beyond Technical Language",
        parts: [
          {
            kind: "anchor",
            id: "ihp-collab-ning-yan",
          },
          {
            kind: "label",
            text: "Ning Yan × Original Song: When Science Meets Art",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "As Carbotex's research became more technically detailed, the vocabulary we used to explain it also grew more specialized: lignocellulose, carbon utilization, genetic regulation, fermentation, PMA, and dopamine functionalization."
                  }
                </p>
                <p>
                  {
                    "These terms matter for scientific accuracy, but they are not always the easiest way to introduce a project to people outside the field."
                  }
                </p>
                <p>
                  {
                    "We therefore explored a different form of communication: music."
                  }
                </p>
                <p>
                  {
                    "Inspired by the ideas behind Carbotex, we created an original song to tell the story of starting with agricultural straw and exploring the possibilities of renewable carbon and biomanufacturing through lyrics and melody."
                  }
                </p>
                <p>
                  {
                    "During its development, we sought professional artistic advice from "
                  }
                  <strong>{"Professor Ning Yan"}</strong>
                  {
                    " at Ocean University of China and used this feedback to refine how the piece was expressed and presented."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "gallery",
            images: [
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-art-science-01-carbotex-musical-performance.avif",
                alt: "Carbotex original song performance",
              },
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-art-science-02-flute-duet-performance.avif",
                alt: "Musical performance during science-and-art communication",
              },
              {
                src: "https://static.igem.wiki/teams/6147/wiki/ihp-art-science-03-professional-feedback.avif",
                alt: "Professional feedback on the science-and-art activity",
              },
            ],
            columns: 3,
            ratio: "270 / 220",
            caption:
              "Carbotex explored music and artistic exchange for science communication.",
            figureNumber: 43,
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                <strong>{"Original song lyrics (PDF):"}</strong>{" "}
                <a
                  href={
                    "https://static.igem.wiki/teams/6147/wiki/amber-dreams-in-the-wheat-field.pdf"
                  }
                >
                  <em>{"Amber Dreams in the Wheat Field"}</em>
                  {" — Read the full lyrics"}
                </a>
              </>
            ),
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "Unlike a scientific presentation, music does not need to explain every pathway or experimental result. It can introduce the motivation and human side of research through rhythm, emotion, and storytelling, encouraging audiences to ask questions and learn more."
                  }
                </p>
                <p>
                  {
                    "This experience reminded us to choose communication methods that fit different audiences. Technical discussions depend on accurate evidence, while creative forms of expression can make scientific ideas more approachable."
                  }
                </p>
                <p>
                  <strong>
                    {
                      "Our original song did not change the engineered strain or adhesive material. It gave Carbotex another way to connect with the public."
                    }
                  </strong>
                </p>
              </>
            ),
          },
        ],
      },
      {
        id: "ihp-what-returned",
        title: "What Returned With Us",
        parts: [
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "Looking back over these exchanges, we see that each contributed something different to Carbotex."
                  }
                </p>
                <p>
                  {
                    "OUC-China and other university peers showed us the value of sustained support and cross-university conversation. CCiC and Grand APiC brought our project into contact with questions from different audiences. The international Human Practices summit introduced diverse ways of connecting stakeholder engagement with research and left us with a presentation that we could share and revisit."
                  }
                </p>
                <p>
                  {
                    "Research exchanges concerning renewable carbon expanded how we understood our feedstock. Working with QingdaoAcademy brought us from discussion into genuine co-creation. Our original song opened another route for communicating science through art."
                  }
                </p>
                <p>
                  {
                    "Some exchanges informed project decisions, others built relationships, and still others helped us find ways to reach the public. We value these different outcomes for what they actually contributed."
                  }
                </p>
                <p>
                  <strong>
                    {
                      "Human Practices is not only about bringing outside perspectives back into a project. It is also about joining a wider community, sharing what we have learned, and creating opportunities to learn and build together."
                    }
                  </strong>
                </p>
                <p>
                  {
                    "Carbotex's experimental research is carried out by our team, but its development has been enriched by the people and communities we have met along the way."
                  }
                </p>
              </>
            ),
          },
        ],
      },
    ],
  },
  {
    id: "ihp-reflection",
    title: "Final Reflection",
    parts: [
      {
        kind: "content",
        inline: false,
        content: (
          <>
            <p>
              <em>
                {"What Human Practices Changed — and Where Carbotex Goes Next"}
              </em>
            </p>
            <p>
              {
                "Carbotex began with a question about the carbon stored in agricultural straw. Could this renewable resource become the starting point for a new biological manufacturing pathway?"
              }
            </p>
            <p>
              {
                "As our research developed, the question became more demanding. We needed to understand which straw resources were realistically available, how microorganisms could make better use of the resulting sugars, how that carbon could be directed toward PMA, and what it would take to turn PMA into a material worth using."
              }
            </p>
            <p>
              {
                "The answers did not come from laboratory experiments alone. They developed through conversations with agricultural stakeholders, researchers, industry professionals, other iGEM teams, and people who approached our project from outside our immediate field."
              }
            </p>
            <p>
              <strong>
                {
                  "Human Practices helped us change not only how we explained Carbotex, but also what we asked of the project itself."
                }
              </strong>
            </p>
          </>
        ),
      },
    ],
    subsections: [
      {
        id: "ihp-reflection-1",
        title: "5.1 What Human Practices Changed",
        parts: [
          {
            kind: "anchor",
            id: "ihp-reflection-2",
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "Looking back, we can identify five important shifts in our thinking and development."
                }
              </>
            ),
          },
          {
            kind: "reflection-cards",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {
                    "These were not five isolated decisions. They connected the beginning of our project to its intended outcome: "
                  }
                  <strong>
                    {
                      "which carbon we use, how we engineer its conversion, what we make from it, and how we evaluate the consequences of making it."
                    }
                  </strong>
                </p>
                <p>
                  {
                    "Our wider community activities contributed in different ways. Exchanges with OUC-China and other teams created opportunities for continued peer learning; the international Human Practices summit helped us compare approaches to stakeholder engagement; our collaboration with QingdaoAcademy developed into a jointly created science-communication activity; and our original song gave Carbotex a different way to reach audiences beyond the laboratory."
                  }
                </p>
                <p>
                  {
                    "Not every conversation changed an experiment, nor did it need to. Some helped us make a technical decision; others challenged an assumption, built a relationship, or made our research easier for others to engage with. Being clear about those differences is part of what made our Human Practices more meaningful."
                  }
                </p>
              </>
            ),
          },
        ],
      },
      {
        id: "ihp-reflection-4",
        title: "5.2 What Remains Unresolved",
        parts: [
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "The changes described above have given Carbotex a stronger direction, but moving from a laboratory adhesive to a useful product will require another round of evidence and engagement."
                }
              </>
            ),
          },
          {
            kind: "unresolved-cards",
          },
          {
            kind: "content",
            inline: true,
            content: (
              <>
                {
                  "These priorities are connected. A future user may value wet-environment adhesion, for example, but the appropriate product design will also depend on reliable production, material quality, safety requirements, and acceptable cost. Addressing any one of these factors in isolation would provide only part of the answer."
                }
              </>
            ),
          },
        ],
      },
      {
        id: "ihp-reflection-3",
        title: "Carrying TRACE Forward",
        parts: [
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {"Throughout our work, "}
                  <strong>
                    {
                      "TRACE — Trigger, Reach Out, Analyze, Change, and Evaluate"
                    }
                  </strong>
                  {
                    " — became more than a structure for documenting activities."
                  }
                </p>
                <p>
                  {
                    "It helped us ask whether an interaction had actually entered the project. What question prompted us to seek another perspective? What did we hear? How did we interpret it alongside our experimental evidence? What changed in our thinking or work? And what would we need to evaluate next?"
                  }
                </p>
                <p>
                  {
                    "That process was rarely a straight line. New results led to new questions, some discussions called for follow-up, and not every promising idea was ready to become an engineering decision. The value of TRACE was that it encouraged us to make these connections visible."
                  }
                </p>
                <p>
                  {
                    "To make this approach accessible beyond our own team, we have also made our current "
                  }
                  <a
                    href={
                      "https://static.igem.wiki/teams/6147/wiki/trace-20handbook.pdf"
                    }
                  >
                    {"TRACE Handbook (PDF)"}
                  </a>
                  {
                    " available. We will continue refining the handbook as our Human Practices work develops."
                  }
                </p>
                <p>
                  <strong>
                    {
                      "Carbotex started by asking what else agricultural straw could become. Human Practices taught us to ask a second question: what would make that transformation useful, responsible, and worth pursuing?"
                    }
                  </strong>
                </p>
                <p>
                  {
                    "As we continue to develop the material, that question will remain part of our design process — from the carbon source to the engineered microorganism, from PMA to PMA-DA, and from laboratory performance toward real application."
                  }
                </p>
              </>
            ),
          },
        ],
      },
    ],
  },
];
