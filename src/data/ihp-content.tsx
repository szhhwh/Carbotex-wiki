// Structured IHP content rendered as native JSX from the supplied source copy.
import { Link } from "react-router-dom";
import { Cite } from "../components/article/References";
import { IhpRichText } from "../components/human-practices/IhpRichText";
import { ihpReviewedSection3 } from "./ihp-reviewed-section-3";
import { ihpReviewedSection4 } from "./ihp-reviewed-section-4";
import { ihpReviewedSection5 } from "./ihp-reviewed-section-5";
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
        impact: "1. PMA as a product target; 2. Metabolic precursor strategy",
        why: "Before selecting a chassis, we needed to determine what the carbon released from straw should ultimately become.",
        heard:
          "Feedstock characteristics, target product properties, existing biological production foundations, and future applications should be considered together before choosing a chassis.",
        changed:
          "We prioritized PMA/A08 initially and later revisited precursor-supply pathways after further discussion.",
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
        impact:
          "1. Real hydrolysate → Mixed-sugar tests; 2. Upstream process → Cost inquiry",
        why: "Our early understanding of A08 was based largely on simplified carbon-source conditions. We needed a system that better reflected real agricultural feedstock.",
        heard:
          "Straw hydrolysate mainly contained glucose and xylose; our experiments showed efficient glucose utilization but limited xylose utilization.",
        changed:
          "We tested real straw-derived mixed sugars and later considered upstream hydrolysate processing costs.",
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
        impact:
          "1. Carbon uptake → Carbon allocation; 2. Allocation → Precursor questions",
        why: "Improving xylose utilization could allow more carbon to enter A08, but that did not necessarily mean more carbon would reach PMA.",
        heard:
          "Assimilated carbon can be distributed among biomass formation, cellular maintenance, competing pathways, and product formation.",
        changed:
          "We reconsidered carbon allocation and examined precursor supply as a possible next target.",
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
        name: "Qingdao Institute of Bioenergy and Bioprocess Technology, Chinese Academy of Sciences (QIBEBT)",
        portrait: "https://static.igem.wiki/teams/6147/wiki/card/20-qibebt.svg",
        identity: "Research Institute · Renewable Carbon · Biomanufacturing",
        question: "What does a complete biomanufacturing system depend on?",
        impact:
          "1. Production route → Manufacturing ecosystem; 2. Renewable carbon → Public outreach",
        why: "We wanted to understand how Carbotex's feedstock, fermentation, downstream processing, and material-development stages relate in real manufacturing.",
        heard:
          "Different stages may depend on different technologies and specialized partners rather than one organization reproducing the entire pathway.",
        changed:
          "We considered the wider biomanufacturing ecosystem and joined renewable-carbon science outreach.",
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
        impact:
          "1. Containment → HGT considerations; 2. Production cells → Material responsibility",
        why: "As Carbotex moved toward real-world implementation, we needed to consider biosafety beyond routine laboratory procedures.",
        heard:
          "Limited environmental proliferation does not eliminate other questions, particularly the possibility and consequences of horizontal gene transfer (HGT).",
        changed:
          "We examined HGT concerns and extended the questions to material purification and future use.",
        led: "Containment → HGT → Risk-Based Assessment",
        storyHref: "#ihp-grand-apic",
      },
    ],
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
      {
        kind: "anchor",
        id: "section-1",
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
            caption: "TRACE and the DBTL cycle.",
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
            caption: "Brainstorming the stakeholder matrix.",
            figureNumber: 2,
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  <em>
                    <strong>{"Stakeholder Ecosystem Map:"}</strong>
                  </em>
                  {
                    " Building on our Stakeholder Matrix, we visualized interconnected stakeholder perspectives surrounding Carbotex: "
                  }
                  <strong>
                    {
                      "Feedstock & Agriculture, Biomanufacturing & Research, Materials & Applications, Industry & Scale-up, Sustainability, Policy & Governance, and Society, Communication & Peer Community"
                    }
                  </strong>
                  {"."}
                </p>
                <p>
                  {"By placing "}
                  <strong>{"TRACE at the center"}</strong>
                  {
                    ", the map illustrates how our framework connects these different perspectives with the project's development. Rather than treating stakeholder engagement as a series of isolated activities, we used TRACE to guide how external insights could be analyzed, translated into project decisions, and subsequently evaluated."
                  }
                </p>
              </>
            ),
          },
          {
            kind: "figure",
            src: "https://static.igem.wiki/teams/6147/wiki/mapmap.svg",
            alt: "Carbotex stakeholder ecosystem map showing stakeholder perspectives surrounding the TRACE framework.",
            ratio: "1482 / 1024",
            caption: "Carbotex stakeholder ecosystem centered on TRACE.",
            figureNumber: 3,
          },
          {
            kind: "content",
            inline: false,
            content: (
              <>
                <p>
                  {"The map provides an overview of "}
                  <strong>
                    {"whose perspectives were relevant to Carbotex"}
                  </strong>
                  {", while our subsequent IHP Journey illustrates "}
                  <strong>
                    {
                      "how specific stakeholder interactions informed our research and development"
                    }
                  </strong>
                  {"."}
                </p>
                <p>
                  {
                    "Together, they connect stakeholder identification with the practical application of TRACE, providing a foundation for the engagement stories and project decisions presented in the following sections."
                  }
                </p>
              </>
            ),
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
            caption: "The Carbotex IHP journey.",
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
        kind: "anchor",
        id: "section-2",
      },
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
            kind: "anchor",
            id: "section-2-0",
          },
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
            kind: "anchor",
            id: "section-2-1",
          },
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
                    caption: "Visit to the local agricultural authority.",
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
                    caption: "Farmer and cooperative exchange on straw supply.",
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
                    caption: "Straw conditions observed at the planting base.",
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
          {
            kind: "label",
            text: "Closing the Feedstock Exploration Loop",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <IhpRichText>{`Through these engagements, Carbotex's understanding of agricultural straw evolved from a broadly available resource into a potential feedstock whose practical value depends on real agricultural conditions.

The local agricultural authority helped us understand existing straw-utilization pathways. Farmers and cooperative representatives highlighted the importance of collection, storage, transportation, and seasonal supply, while the agricultural expert and planting-base visit drew our attention to feedstock characteristics such as moisture content, impurities, and storage stability.

Together, these perspectives reshaped our starting point. Rather than treating agricultural straw simply as an abundant waste resource, we began considering how suitable straw-derived carbon could be utilized for biomanufacturing while respecting existing agricultural uses and practical supply conditions.

**This first stage connected our initial observation of agricultural straw with a more grounded understanding of feedstock availability and suitability, providing the foundation for Carbotex's subsequent biological engineering work.**

With this understanding, our next question became: **How could we convert straw-derived carbon into a valuable product through biological engineering?**`}</IhpRichText>
            ),
          },
        ],
      },
      {
        id: "ihp-biological-system",
        title: "2.2 Building the Biological System",
        parts: [
          {
            kind: "anchor",
            id: "section-2-2",
          },
          {
            kind: "content",
            inline: false,
            content: (
              <IhpRichText>{`Our exploration of agricultural resource utilization helped us understand the potential value of further developing straw-derived carbon resources.

We then shifted our attention from agricultural resources to biological conversion, asking how microbial production could transform this renewable carbon into a product with potential for downstream applications.`}</IhpRichText>
            ),
          },
          {
            kind: "label",
            text: "2.2.1 Defining the Carbon Destination",
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
                      <IhpRichText>{`Having examined the agricultural context of straw, we needed to identify a biologically feasible conversion route that could connect straw-derived carbon with a value-added product and potential material applications.

**Which target product and microbial production system could provide a reliable starting point for valorizing sugars derived from straw?**`}</IhpRichText>
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
                      <IhpRichText inline>**Prof. Guanglei Liu**</IhpRichText>
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
                      "Discussing PMA production with Prof. Guanglei Liu.",
                    figureNumber: 8,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <IhpRichText>{`To clarify the direction of biological carbon conversion, we consulted Prof. Guanglei Liu.

Prof. Liu advised us to consider the characteristics of the carbon source, the properties and value of the target product, the existing foundation for biological production, and potential applications together, rather than evaluating the production capacity of a microbial strain in isolation.

As we explored products that could give agricultural carbon additional value, **poly(malic acid) (PMA)** attracted our attention.

PMA is a bio-based polymer with pendant carboxyl groups that offer opportunities for further chemical functionalization and material development. Meanwhile, previous research on PMA production by *Aureobasidium* species provided a relevant biological foundation.

An important starting point was ***Aureobasidium melanogenum* A08**, provided by **Prof. Guanglei Liu's laboratory**.

The strain had previously been isolated and screened by his research group for PMA production, providing Carbotex with an existing microbial production resource. Building on this foundation, we began investigating how PMA biosynthesis in A08 could be connected to the utilization of straw-derived carbon.`}</IhpRichText>
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
                      <IhpRichText>{`Drawing on Prof. Liu's perspective, we considered three connected factors: **the potential of PMA as a functionalizable polymer, the existing PMA-production background of A08, and the feasibility of using agricultural sugars as fermentation substrates**.

Literature research also supported the biological production of PMA by *Aureobasidium* species.{{cite:Chi2016PMLA}}

To establish the identity of the supplied strain, we examined its colony and microscopic morphology and analyzed its internal transcribed spacer (ITS) sequence.

Phylogenetic analysis placed A08 in a cluster with the reference strain *A. melanogenum* CBS 105.22, supporting its identification as *Aureobasidium melanogenum* and providing a defined chassis for subsequent engineering.

Together, the literature, available strain resource, and Prof. Liu's perspective on biological production supported **A08 as our production chassis and PMA as the target product**.`}</IhpRichText>
                    ),
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <p>
                        <strong>
                          <Link to={"/design#design-chassis-selection-why-a08"}>
                            {
                              "Explore A08 Chassis Background and Identification →"
                            }
                          </Link>
                        </strong>
                      </p>
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
                      <IhpRichText inline>
                        Based on these considerations, we established an initial
                        biological engineering route for Carbotex:
                      </IhpRichText>
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
                      <IhpRichText>{`This direction connected agricultural carbon resources, a microbial production chassis, and downstream material development.

It also helped us identify the key experimental questions for the next stage: understanding how A08 responds to different carbon sources, examining how sugar composition affects PMA production, and ultimately evaluating the feasibility of using sugars derived from actual straw feedstocks for fermentation.`}</IhpRichText>
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
                      <IhpRichText>{`By this point, we had selected A08 as our candidate PMA-production chassis, supported by its existing PMA-production background and our strain-identification results. However, whether this production system could effectively utilize carbon derived from agricultural straw remained to be investigated.

In our proposed process, the structural carbohydrates in straw must first undergo upstream saccharification to release fermentable sugars. Cellulose primarily yields glucose, while xylan in hemicellulose can release xylose. As a result, straw-derived hydrolysates may contain both sugars in varying proportions.

This introduced an important consideration for our next experiments. Demonstrating A08's potential for PMA production was not sufficient to establish its suitability for a straw-based process. We also needed to understand how the composition of these available sugars might influence its production performance.

Could our selected A08–PMA production system effectively utilize carbon derived from agricultural straw?`}</IhpRichText>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "2.2.2 Revealing the Mixed-Sugar Challenge",
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
                      <IhpRichText>{`Lignocellulosic hydrolysates commonly contain different sugars, including glucose and xylose.{{cite:Francois2020}} Since these sugars originate from different components of straw, their relative proportions can vary depending on the feedstock and saccharification process.

Although A08 had an established background in PMA production, we could not assume that it would perform equally well under different sugar compositions. This raised an important question for our straw-based production route: whether changes in the balance between glucose and xylose would influence A08's PMA production performance.

**How would different glucose–xylose ratios affect PMA production by A08?**`}</IhpRichText>
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
                      <IhpRichText inline>**Prof. Yajun Liu**</IhpRichText>
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
                    caption: "Consulting Prof. Yajun Liu on straw hydrolysate.",
                    figureNumber: 9,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <IhpRichText>{`To evaluate whether our A08–PMA production system could utilize sugars derived from agricultural residues, we obtained corn-stover hydrolysate prepared and provided by **Prof. Yajun Liu's laboratory team** using a consolidated bio-saccharification (CBS) system.

This provided us with a real straw-derived substrate for subsequent sugar-composition analysis and fermentation experiments.

Our analysis of the hydrolysate showed that, **within the measured sugar fraction, glucose accounted for approximately 80.33% and xylose for 19.67%**.

Thus, glucose was the predominant sugar, but xylose represented a substantial component of the fermentation feedstock.`}</IhpRichText>
                    ),
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <p>
                        <strong>
                          <Link to={"/design#design-saccharification-module"}>
                            {"Explore the CBS System →"}
                          </Link>
                        </strong>
                      </p>
                    ),
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <IhpRichText>{`We then examined A08 growth under different carbon-source conditions.

The experiments showed that A08 could grow in the presence of glucose, xylose, and arabinose. However, subsequent fermentation comparisons revealed differences in PMA production: as the proportion of xylose increased in glucose–xylose mixtures, PMA titers generally decreased.

These results drew our attention to the distinction between being able to grow on a carbon source and achieving favorable PMA production under that condition.`}</IhpRichText>
                    ),
                  },
                  {
                    kind: "anchor",
                    id: "ihp-le-yu",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: <IhpRichText inline>**Dr. Le Yu**</IhpRichText>,
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
                    caption: "Discussing xylose utilization with Dr. Le Yu.",
                    figureNumber: 10,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <IhpRichText>{`We discussed this experimental observation with Dr. Le Yu.

**If A08 could grow under xylose-containing conditions, why did its PMA production decline as the xylose proportion increased? What did this mean for the utilization of straw-derived hydrolysate?**

Dr. Yu encouraged us to look beyond the glucose fraction, which had supported more favorable PMA production in our experiments, and also consider the xylose released during straw saccharification.

Since xylose forms part of the sugars available in straw-derived hydrolysate, its potential contribution to PMA production should not be overlooked simply because A08 performed less favorably under xylose-rich conditions.

This discussion helped us recognize an important distinction: **the ability to grow in a xylose-containing medium does not necessarily mean that PMA can be produced efficiently under the same conditions.**

Rather than focusing only on the sugar conditions that favored PMA production, we began to consider how production could be improved in the presence of xylose, with the broader aim of making better use of the carbon available in straw-derived hydrolysate.`}</IhpRichText>
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
                      <IhpRichText>{`Combining the experimental findings with Dr. Yu's perspective, we examined the relationship between microbial growth and PMA production under different carbon-source conditions.

A08 grew under glucose, xylose, and arabinose conditions, but its PMA-production performance varied.

In our initial glucose–xylose composition comparison, the PMA titer was approximately **19.00 g/L under glucose-only conditions**, compared with **11.61 g/L under xylose-only conditions**. PMA titers generally declined as the xylose proportion increased in the mixed-sugar formulations.

We also examined PMA production at different initial xylose concentrations. Increasing the supplied xylose concentration did not lead to a continuous increase in PMA titer, indicating that greater substrate loading alone was insufficient to resolve the production challenge.

Together with the mixed-sugar composition of the actual corn-stover hydrolysate, these findings identified **improving PMA production by A08 under xylose-containing conditions** as an important direction for subsequent engineering.`}</IhpRichText>
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
                      <IhpRichText>{`Based on the experimental results and Dr. Yu's perspective, we focused our subsequent engineering efforts on improving PMA production by A08 under glucose–xylose conditions.

We emphasized PMA titers across different glucose–xylose formulations and included treated corn-stover hydrolysate in the fermentation evaluation framework to examine whether engineering could improve product accumulation under conditions relevant to our feedstock.`}</IhpRichText>
                    ),
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <p>
                        <strong>
                          <Link to={"/design#design-xylose-module"}>
                            {"Explore the Mixed-Sugar Fermentation Results →"}
                          </Link>
                        </strong>
                      </p>
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
                      <IhpRichText>{`This stage established a production challenge for A08 under xylose-containing conditions.

Although the strain could grow on xylose, PMA titers were relatively low when xylose made up a greater proportion of the carbon source. Increasing xylose loading also failed to produce a sustained improvement in PMA accumulation.

Together with Dr. Yu's emphasis on the value of the available feedstock carbon, these findings shifted our attention beyond substrate composition and cultivation conditions toward biological processes that might influence product formation.

**Which biological mechanisms might affect PMA production by A08 under xylose-containing conditions?**

This led us to investigate regulatory processes associated with pentose metabolism.`}</IhpRichText>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "2.2.3 From Metabolic Limitation to Regulatory Engineering",
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
                      <IhpRichText>{`Having identified the PMA-production challenge under xylose-containing conditions, we needed to explore engineering strategies that could be tested in A08.

**Should we modify individual metabolic reactions, or focus on upstream regulators capable of coordinating several metabolic processes?**`}</IhpRichText>
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
                    content: <IhpRichText inline>**Dr. Nan Hao**</IhpRichText>,
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-nan-hao-01-discussion.avif",
                    alt: "Discussion with Dr. Nan Hao on A08 xylose utilization.",
                    ratio: "540 / 380",
                    caption: "Regulatory discussion with Dr. Nan Hao.",
                    figureNumber: 11,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <IhpRichText>{`To better understand the biological mechanisms that might contribute to A08's PMA-production performance under xylose-containing conditions, we discussed the problem with Dr. Nan Hao.

Dr. Hao drew our attention to the fact that microbial responses to different carbon sources involve not only metabolic enzymes, but also carbon-source sensing and gene-expression regulation.

Under pentose conditions in particular, several metabolic processes may be influenced by interconnected regulatory mechanisms rather than by a single metabolic reaction.

This perspective broadened our initial focus on individual metabolic steps and encouraged us to consider **whether transcriptional regulation might also influence carbon-source responses and PMA production in A08**.`}</IhpRichText>
                    ),
                  },
                  {
                    kind: "anchor",
                    id: "ihp-tao-ma",
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: <IhpRichText inline>**Dr. Tao Ma**</IhpRichText>,
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
                    caption: "Consulting Dr. Tao Ma on xylose regulation.",
                    figureNumber: 12,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <IhpRichText>{`Building on this regulatory perspective, we further discussed potential engineering strategies with Dr. Tao Ma.

Because pentose metabolism involves several interconnected processes, modifying downstream metabolic enzymes one by one could increase engineering complexity without necessarily improving the cell's overall response to a carbon source.

In contrast, upstream transcriptional regulators may influence the expression of multiple related genes, making them promising candidates for further investigation.

At the same time, the involvement of a regulator in pentose responses does not necessarily mean that increasing its expression will improve PMA production. Its effects on microbial growth and target-product formation must be evaluated experimentally.

These discussions encouraged us to examine the biological functions and potential engineering value of pentose-associated transcriptional regulators, providing a useful perspective for subsequent target investigation.`}</IhpRichText>
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
                      <IhpRichText>{`Drawing on these discussions, we used literature research and the gene-annotation records of A08 to identify two candidate transcriptional regulators associated with fungal pentose responses: **XlnR and AraR**, corresponding to *xlnR* (g3332.t1) and *araR* (g13480.t1), respectively.

Previous research has implicated these regulators in fungal responses to pentose carbon sources.{{cite:deSouza2013AraRXlnR}}

After identifying the candidates, we used published XlnR-recognition motifs to examine promoter sequences of selected PMA-associated and central-carbon-metabolism genes.

The analysis included *PMA-1*, *PMA-2*, and glycolysis-associated targets *HK*, *PFK*, *GAPDH*, and *PGK*.

The predicted motif matches suggested possible links among pentose-responsive regulation, central carbon metabolism, and PMA production, providing a rationale for subsequent experimental testing.

Together, the literature and sequence analyses supported the selection of XlnR and AraR as engineering targets requiring further functional validation.`}</IhpRichText>
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
                      <IhpRichText>{`We established two complementary series of engineered strains centered on XlnR and AraR.

The first series used single- and double-regulator deletions to investigate how these factors affected A08 growth under xylose and arabinose conditions.

The second series used individual and combined overexpression of XlnR and AraR to evaluate whether these modifications could improve PMA production under different glucose–xylose compositions.

Together, these experiments allowed us to examine the biological roles of the regulators and their potential engineering value, informing the subsequent selection of strains with favorable production performance.`}</IhpRichText>
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
                      <IhpRichText>{`The regulator-deletion experiments suggested that XlnR and AraR contributed to A08's growth under pentose conditions, although their effects varied with the carbon source.

Under xylose conditions, the double-deletion strain showed a marked reduction in growth, with an endpoint OD₆₀₀ of approximately **1.27**, compared with **3.90** for the parental A08 strain. Under arabinose conditions, deleting AraR alone had a greater effect on growth than deleting XlnR alone.

These findings led us to hypothesize that, since the loss of XlnR and AraR impaired growth under xylose conditions, increasing their expression might improve A08's growth performance in xylose-containing media and potentially support PMA production under glucose–xylose conditions.

However, improved growth would not necessarily translate into higher PMA production. **We therefore proceeded to fermentation experiments to test whether overexpression of XlnR and/or AraR could improve PMA titers under glucose–xylose conditions.**`}</IhpRichText>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "2.2.4 Turning Regulatory Engineering into Fermentation Evidence",
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
                      <IhpRichText>{`The deletion experiments suggested that XlnR and AraR influenced A08's growth under pentose conditions, leading us to hypothesize that their overexpression might improve its performance in xylose-containing media.

However, changes in growth performance could not establish whether regulatory engineering would actually improve PMA production.

**How could we test whether this hypothesis was valid and evaluate its practical feasibility?**`}</IhpRichText>
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
                      <IhpRichText inline>**Prof. Qilin Yu**</IhpRichText>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-qilin-yu-01-experimental-framework.avif",
                    alt: "Discussion with Prof. Qilin Yu on functional validation of the regulatory strategy.",
                    ratio: "540 / 380",
                    caption:
                      "Reviewing functional validation with Prof. Qilin Yu.",
                    figureNumber: 13,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <IhpRichText>{`To seek advice on validating our regulatory engineering strategy, we met with Prof. Qilin Yu and first introduced the overall objectives of Carbotex and our previous experimental work.

We explained that PMA production had declined as the xylose proportion increased in our glucose–xylose experiments. We also shared the results of our XlnR/AraR deletion experiments, which suggested that these regulators influenced A08's growth under pentose conditions. Based on these observations, we had proposed that overexpressing XlnR and AraR might improve A08's performance in xylose-containing media.

We presented this hypothesis to Prof. Yu and asked for his advice on how to verify its validity and evaluate its practical feasibility.

After learning about our experimental findings and proposed strategy, Prof. Yu emphasized that successful genetic modification, changes in microbial growth, and improved product formation represented different levels of evidence.

He pointed out that confirming a genetic modification alone would not demonstrate improved production performance. Even if an engineered strain showed better growth under xylose-containing conditions, this would not necessarily mean that more PMA was produced.

His advice helped us clarify the need to evaluate our engineering strategy at three levels: confirming the genetic modification, examining strain growth under relevant carbon-source conditions, and directly comparing PMA production between engineered strains and the parental A08 strain.

**Genetic Confirmation → Carbon-Source Growth Response → PMA Production Evaluation**`}</IhpRichText>
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
                      <IhpRichText>{`Following Prof. Yu's advice, we organized our evaluation around three levels: confirming the intended genetic modifications, examining strain growth under different carbon-source conditions, and determining whether these changes were accompanied by improvements in PMA production.

To assess the effects of regulatory engineering, we compared the parental A08 strain with OE-XlnR, OE-AraR, and OE-XlnR+AraR under different glucose–xylose ratios. This comparison allowed us to investigate whether overexpressing either regulator individually or both regulators together could improve PMA production, rather than merely affecting microbial growth.

We also included corn-stover hydrolysate in the fermentation evaluation to examine the relevance of our engineering strategy to the project's intended feedstock. Unlike defined glucose–xylose mixtures, actual hydrolysate presents a more complex substrate environment.

By combining these evaluations, we aimed to determine not only whether the regulatory modifications affected strain performance, but also whether they could support improved PMA production under conditions relevant to agricultural straw utilization.`}</IhpRichText>
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
                      <IhpRichText>{`We extended strain evaluation beyond genetic construct verification to functional production performance.

We compared the growth and PMA production of the four strains across different glucose–xylose formulations and conducted further fermentation experiments using treated corn-stover hydrolysate.

In addition, to explore molecular responses associated with the observed production phenotype, we compared the relative transcript levels of selected xylose-metabolism-related and PMA-associated genes between A08 and OE-XlnR+AraR.

Together, these comparisons connected regulatory engineering, carbon-source conditions, and target-product formation.`}</IhpRichText>
                    ),
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <p>
                        <strong>
                          <Link
                            to={
                              "/design#design-xylose-module-experimental-design"
                            }
                          >
                            {"Explore AraR/XlnR Fermentation and PMA Results →"}
                          </Link>
                        </strong>
                      </p>
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
                      <IhpRichText>{`Our fermentation results showed that **co-overexpression of XlnR and AraR improved PMA production under xylose-containing conditions**.

Under xylose-only conditions, OE-XlnR+AraR achieved a PMA titer of **13.86 g/L**, compared with **10.04 g/L** for the parental A08 strain, an increase of approximately **38.0%**.

The improvement was also observed in corn-stover hydrolysate: the dual-overexpression strain reached **18.63 g/L**, compared with **15.87 g/L** for A08, an increase of approximately **17.4%**.

These results demonstrated an improved production phenotype under conditions relevant to the project's agricultural feedstock, supporting our regulatory engineering strategy.

Furthermore, the relative expression levels of selected xylose-metabolism-related and PMA-associated genes were higher in the dual-overexpression strain than in A08, consistent with its improved PMA production.

Together, these findings showed that XlnR/AraR co-overexpression improved PMA production under the conditions tested.

However, our team hoped to further increase PMA production beyond the improvements achieved through regulatory engineering. We therefore began to explore whether additional optimization of the PMA biosynthetic pathway could provide another opportunity for enhancing production.

During PMA biosynthesis, carbon from utilized sugars enters central carbon metabolism, contributing to the formation of intermediates such as oxaloacetate, which can subsequently be converted into L-malic acid, the building block of PMA.

This led us to consider whether strengthening the upstream supply of metabolic precursors could provide more substrates for PMA biosynthesis and potentially support further production improvements.

**Could we further increase PMA production by enhancing the upstream supply of its biosynthetic precursors?**

To pursue further improvements in PMA production, we therefore extended our engineering strategy beyond carbon-source-responsive regulation and began exploring metabolic precursor-supply engineering.`}</IhpRichText>
                    ),
                  },
                ],
              },
            ],
          },
          {
            kind: "label",
            text: "2.2.5 Following Carbon Flow Toward PMA",
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
                      <IhpRichText>{`XlnR/AraR co-overexpression improved PMA production under xylose-containing conditions.

However, improved production performance did not necessarily mean that the metabolic precursor supply for PMA synthesis had been fully optimized.

**How could we further support the conversion of carbon entering central metabolism into PMA?**`}</IhpRichText>
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
                      <IhpRichText inline>**Prof. Weihui Wu**</IhpRichText>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-weihui-wu-01-carbon-allocation-discussion.avif",
                    alt: "Discussion with Prof. Weihui Wu on intracellular carbon allocation.",
                    ratio: "540 / 380",
                    caption:
                      "Discussing carbon allocation with Prof. Weihui Wu.",
                    figureNumber: 14,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <IhpRichText>{`To explore this question, we discussed intracellular carbon allocation and its relationship with product formation with Prof. Weihui Wu.

Prof. Wu encouraged us to distinguish carbon entering cellular metabolism from carbon ultimately contributing to the synthesis of the target product.

Carbon entering central metabolism may support biomass formation, cellular maintenance, competing metabolic processes, or target-product synthesis. Therefore, improved production under a particular carbon-source condition does not imply that all available carbon is directed toward PMA biosynthesis.

This perspective drew our attention to the metabolic processes supporting PMA synthesis, especially the supply of relevant precursor molecules.`}</IhpRichText>
                    ),
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <IhpRichText inline>
                        **Follow-up with Prof. Guanglei Liu**
                      </IhpRichText>
                    ),
                  },
                  {
                    kind: "figure",
                    src: "https://static.igem.wiki/teams/6147/wiki/ihp-follow-up-prof-guanglei-liu-01-metabolic-route-discussion.avif",
                    alt: "Follow-up discussion with Prof. Guanglei Liu on the metabolic route toward PMA.",
                    ratio: "540 / 380",
                    caption: "Follow-up discussion on PMA precursor supply.",
                    figureNumber: 15,
                  },
                  {
                    kind: "content",
                    inline: false,
                    content: (
                      <IhpRichText>{`To explore the possibility of further increasing PMA production, we returned to Prof. Guanglei Liu for additional guidance.

During this follow-up discussion, we first shared our recent experimental progress, including the improvement in PMA production achieved through XlnR/AraR co-overexpression. We also introduced our new idea of enhancing PMA production by strengthening the upstream supply of metabolic precursors.

Prof. Liu suggested that, beyond improving the regulatory response to different carbon sources, we should also examine the metabolic pathways responsible for supplying the building blocks of PMA.

He encouraged us to pay particular attention to the formation of L-malic acid, the monomer of PMA, and to investigate the upstream metabolic reactions that contribute to its synthesis. Strengthening these pathways might provide another opportunity to improve PMA production, although the effectiveness of such an approach would require experimental verification.

His advice gave us a clearer direction for further investigation: identifying the upstream metabolic reactions that could influence the availability of L-malic acid for PMA biosynthesis.`}</IhpRichText>
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
                      <IhpRichText>{`Following our discussions with **Prof. Liu**, we gained a clearer understanding of the importance of metabolic precursor supply in PMA biosynthesis. His suggestions not only inspired our Wet Lab engineering strategy but also provided valuable direction for our Model team, encouraging us to explore how intracellular carbon flux could be directed toward PMA production.

Our pathway analysis highlighted a potential precursor-supply route in which pyruvate is converted into oxaloacetate by pyruvate carboxylase (PYC), followed by reduction to L-malic acid through malate dehydrogenase (MDH). L-malic acid subsequently serves as the building block for PMA biosynthesis.

**Pyruvate → Oxaloacetate → L-Malic Acid → PMA**

This pathway suggested that strengthening PYC-related precursor supply might support downstream PMA production.{{cite:Jitrapakdee2008PYC}}`}</IhpRichText>
                    ),
                  },
                  {
                    kind: "related",
                    title: "A08 Genome-Scale Metabolic Modeling",
                    parts: [
                      {
                        kind: "content",
                        inline: false,
                        content: (
                          <IhpRichText>{`Inspired by this exchange, our **Model team** further investigated A08 metabolism through genome-scale metabolic modeling. Starting from the A08 genomic sequence, the team reconstructed a genome-scale metabolic model (GEM), incorporating enzyme annotation, subcellular localization, and metabolic network analysis.

Using flux-based approaches, including FBA/pFBA, FSEOF, and gene-family knockout simulations, the team identified **PYC as a promising engineering target** associated with malate precursor supply. These computational findings complemented Prof. Liu's suggestions and strengthened our rationale for investigating PYC in the Wet Lab.

Together, the expert feedback, pathway analysis, and modeling work helped us develop a more systematic approach to metabolic engineering. We therefore investigated PYC genes from four candidate sources, including endogenous A08 PYC, to explore their potential effects on PMA production.`}</IhpRichText>
                        ),
                      },
                      {
                        kind: "content",
                        inline: true,
                        content: (
                          <p>
                            <strong>
                              <Link to={"/model#model-overview"}>
                                {"Explore the Modeling Analysis →"}
                              </Link>
                            </strong>
                          </p>
                        ),
                      },
                    ],
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
                      <IhpRichText>{`Building on the improvements achieved through XlnR/AraR co-overexpression, we decided to explore whether strengthening upstream metabolic precursor supply could further enhance PMA production.

Following Prof. Liu's suggestions and our pathway analysis, we selected pyruvate carboxylase (PYC) as a potential engineering target. Considering that PYC genes from different organisms might perform differently in A08, we investigated four candidate sources, including endogenous A08 PYC.

Although we were unable to successfully establish the endogenous PYC overexpression strain, we obtained three combined-engineering strains by introducing heterologous PYC genes into the existing **OE-XlnR+AraR** background.

We then compared their PMA production in corn-stover hydrolysate to evaluate whether this additional engineering strategy could support further improvements under conditions relevant to our intended feedstock.`}</IhpRichText>
                    ),
                  },
                  {
                    kind: "content",
                    inline: true,
                    content: (
                      <p>
                        <strong>
                          <Link
                            to={"/design#design-pyc-module-experimental-design"}
                          >
                            {"Explore PYC Engineering and PMA Results →"}
                          </Link>
                        </strong>
                      </p>
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
                            "The fermentation results showed differences in PMA production among the tested PYC-engineered strains."
                          }
                        </p>
                        <p>
                          {"Among them, the "}
                          <strong>{"SC group"}</strong>
                          {", which expressed "}
                          <strong>
                            {"PYC1 from "}
                            <em>{"Saccharomyces cerevisiae"}</em>
                          </strong>
                          {" in the "}
                          <strong>{"OE-XlnR+AraR"}</strong>
                          {
                            " background, achieved the highest PMA titer of approximately "
                          }
                          <strong>{"26 g/L"}</strong>
                          {
                            " in corn-stover hydrolysate, representing an improvement of approximately "
                          }
                          <strong>{"36.8%"}</strong>
                          {
                            " over the wild-type A08 control in this comparison."
                          }
                        </p>
                        <p>
                          {
                            "These findings supported the potential of combining regulatory engineering with PYC engineering to improve PMA production. However, the experiments did not directly confirm increased intracellular precursor availability or independently quantify the additional contribution of PYC1 overexpression."
                          }
                        </p>
                        <p>
                          {
                            "For Carbotex, this stage extended our engineering approach from improving responses to mixed carbon sources toward exploring upstream metabolic precursor supply, providing another direction for further PMA production optimization."
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
              <IhpRichText>{`Through these successive investigations, Carbotex progressed from an existing PMA-producing microbial chassis to an engineered system capable of producing PMA from sugars derived from corn stover.

We first connected the PMA-production background of A08 with the potential of PMA for subsequent material development, establishing the biological conversion route.

Mixed-sugar experiments then revealed a PMA-production challenge under xylose-containing conditions. Stakeholder perspectives and literature research helped direct our attention to transcriptional regulation, and XlnR/AraR engineering improved PMA production under the conditions tested.

Further evaluation led us to investigate precursor supply, where PYC engineering provided another route for improving production.

**Across these iterations, we connected straw-derived carbon resources, microbial regulatory engineering, metabolic precursor supply, and PMA production into a coherent biological manufacturing strategy for Carbotex.**`}</IhpRichText>
            ),
          },
        ],
      },
      {
        id: "ihp-material",
        title: "2.3 Developing the Material & Application",
        parts: [
          {
            kind: "anchor",
            id: "section-2-3",
          },
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
            text: "2.3.1 From Fermentation Product to Material Platform",
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
                    caption: "Discussing PMA material properties with Liu Ya.",
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
            text: "2.3.2 From an Application Idea to a Molecular Design",
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
                    caption: "Consulting Dr. Haotian Guo on material design.",
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
                    caption: "Visit to Bright Moon Seaweed.",
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
            text: "2.3.3 From Molecular Functionalization to Performance Evidence",
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
                    caption: "Oyster-inspired adhesion discussion.",
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
            outro: [
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
  ihpReviewedSection3,
  ihpReviewedSection4,
  ihpReviewedSection5,
];
