// Structured from the supplied IHP Markdown source.
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
        name: "Qingdao Institute of Bioenergy and Bioprocess Technology, Chinese Academy of Sciences (QIBEBT)",
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
            kind: "markdown",
            value:
              "**We did not use Human Practices to justify Carbotex. We used it to modify Carbotex.**\n\n**Carbotex was shaped not only in the laboratory, but through continuous interaction with the world it is intended to enter.** As Carbotex moved beyond the laboratory toward real-world applications, we encountered new questions that experiments alone could not answer.\n\nFor us, **Integrated Human Practices became part of the project’s iterative design process.** Stakeholder perspectives challenged our assumptions, revealed practical constraints, and translated into decisions that were brought back into our Design–Build–Test–Learn (DBTL) cycle.\n\n**Our focus gradually shifted from proving Carbotex in the laboratory to understanding how it could become a practical, responsible, and meaningful solution in the real world.**",
          },
        ],
      },
      {
        id: "ihp-approach",
        title: "1.2 Our Approach",
        parts: [
          {
            kind: "markdown",
            value:
              "***TRACE Framework:*** To make this process systematic, we developed **TRACE (Trigger, Reach Out, Analyze, Change, and Evaluate)**. TRACE allowed us to connect stakeholder engagement directly with project decisions and to keep Human Practices embedded throughout the DBTL cycle, rather than treating it as a collection of separate interviews.",
          },
          {
            kind: "figure",
            src: "https://static.igem.wiki/teams/6147/wiki/ihp.svg",
            alt: "TRACE framework showing Trigger, Reach Out, Analyze, Change, and Evaluate in relation to the Carbotex DBTL process.",
            ratio: "740 / 500",
            caption:
              "TRACE framework connecting stakeholder engagement with the Carbotex DBTL cycle.",
            figureNumber: 1,
          },
          {
            kind: "markdown",
            value:
              "***Stakeholder Matrix:*** We identified potential stakeholders through team **brainstorming** and grouped them within the Carbotex ecosystem. Each group was then assessed by **Affectedness, Influence, and Expertise,** helping us prioritize meaningful engagement throughout the project.",
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
            kind: "markdown",
            value:
              "***Stakeholder Ecosystem Map:*** We further visualized our identified stakeholders in a **Stakeholder Ecosystem Map**, providing an at-a-glance view of how they connect to Carbotex and where their perspectives contribute across the project. The map also served as a guide for navigating our subsequent IHP journey.",
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
            kind: "markdown",
            value:
              "Our Human Practices developed as a continuous process rather than a series of isolated engagements. The roadmap below summarizes how stakeholder mapping and TRACE-guided engagement moved into project decisions, implementation, reflection, unresolved limitations, and finally a reusable TRACE Handbook.",
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
            kind: "markdown",
            value:
              "Human Practices did not simply validate Carbotex. Across the project, it changed several of the questions we asked and the decisions we made. The five shifts below summarize the strongest examples; each is developed through the TRACE cases that follow.",
          },
          {
            kind: "decisions",
          },
          {
            kind: "markdown",
            value:
              "These pivots are not a ranking of our stakeholders. They are a compact view of where engagement most clearly entered the project as a decision, experiment, evaluation criterion, or limitation.",
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
        kind: "markdown",
        value:
          "Carbotex evolved through continuous dialogue with stakeholders across different stages of the project. Each engagement began with a question or challenge emerging from our work, and the perspectives we received often led us to reconsider assumptions, refine our design, or identify new priorities.\n\nTo make this journey easy to explore, we first present a **Stakeholder Navigator**, providing a concise overview of who we engaged with, why we reached out to them, and how they influenced Carbotex. Each card links to the corresponding detailed case below.",
      },
      {
        kind: "label",
        text: "Stakeholder Navigator",
      },
      {
        kind: "markdown",
        value:
          "The six groups below follow Carbotex's main project questions. Stakeholder feedback remains linked to the relevant detailed TRACE story. Community exchanges are listed separately because not every exchange was a formal consultation.",
      },
      {
        kind: "navigator",
      },
      {
        kind: "collaborators",
      },
      {
        kind: "markdown",
        value:
          "In the detailed journey, we use our **TRACE framework — Trigger, Reach Out, Analyze, Change, and Evaluate —** to show how each engagement moved from a project question to a concrete decision or next step.\n\nDuring the early stage of our Human Practices, we also exchanged ideas with **Professor Jinshui Yang** from China Agricultural University. He encouraged us to approach Human Practices at **multiple levels rather than relying on a single type of stakeholder**.\n\nThis prompted us to broaden our engagement beyond scientific experts and consider perspectives from feedstock producers, researchers, materials specialists, industry, governance, and society. His advice therefore helped shape how we approached the IHP journey that followed.",
      },
    ],
    subsections: [
      {
        id: "ihp-beginning",
        title: "2.0 Where It Began",
        parts: [
          {
            kind: "markdown",
            value:
              "Carbotex began with our observation of straw burning. Since crop straw contains substantial amounts of carbon-rich components, we started with a simple question: why was part of this agricultural resource still being directly burned?\n\nWe then investigated straw management from both global and Chinese perspectives. Gradually, we realized that straw was not simply a form of agricultural waste waiting to be utilized. Instead, it already served multiple purposes, including field retention, livestock feed, and other off-field uses, with the trade-offs among these pathways varying across local contexts. In China, official data for 2024 showed that more than 88% of collectable crop straw was comprehensively utilized, while the industrial raw-material utilization rate was only 0.7% [citation](#ref-MARA2025Straw).\n\n**This shifted our focus from simply increasing straw utilization to asking how the carbon contained in straw could be effectively converted through biomanufacturing. Research on lignocellulosic biorefineries suggested a possible route by using straw as a renewable carbon feedstock for microbial production** [citation](#ref-Francois2020).\n\nThis led us to a central question:\n\n**Could we establish a biomanufacturing route that directs straw-derived carbon into the production of bio-based materials?**\n\nBefore designing the biological system, however, we needed to understand how straw was actually produced, collected, stored, and handled in practice. These questions took us beyond the literature and into the agricultural system itself.",
          },
        ],
      },
      {
        id: "ihp-feedstock",
        title: "2.1 Understanding the Problem & Feedstock",
        parts: [
          {
            kind: "markdown",
            value:
              "Our preliminary research showed that crop straw is already widely used for purposes such as field return and animal feed, while raw-material utilization remains a small share of the national utilization structure [citation](#ref-MARA2025Straw). Rather than replacing these existing uses, Carbotex aims to connect suitable agricultural carbon streams with biomanufacturing, offering a renewable feedstock perspective for sustainable production.",
          },
          {
            kind: "trace",
            number: 1,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Abundant resources do not necessarily mean that all straw is readily available or equally suitable for biomanufacturing. Macro-level data helped us understand the overall utilization landscape, but we still needed to understand how straw was handled within the agricultural system:\n\n**How is straw currently used? Can it be obtained reliably in practice? What characteristics might affect its potential for biomanufacturing?**",
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
                    kind: "markdown",
                    value: "*Local Agriculture & Rural Affairs Authority*",
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
                    kind: "markdown",
                    value:
                      "Global and national data could not fully represent local conditions. We therefore reached out to the local Agriculture & Rural Affairs authority to understand how straw is actually utilized locally.\n\nLocal representatives pointed out that straw already enters several established utilization pathways, while only a relatively limited proportion is directed toward industrial applications.\n\n**This led to a more practical question: Can suitable straw be reliably collected and supplied for biomanufacturing?**",
                  },
                  {
                    kind: "anchor",
                    id: "ihp-farmers-cooperative",
                  },
                  {
                    kind: "markdown",
                    value: "*Farmers & Cooperative*",
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
                    kind: "markdown",
                    value:
                      "To understand the practical availability of straw, we spoke with farmers and a cooperative about how straw is collected, stored, and supplied after harvest.\n\nFarmers and cooperative representatives emphasized that statistical abundance does not necessarily translate into reliable supply. Collection methods, storage conditions, transportation, and seasonality can all affect when and in what condition straw becomes available.\n\n**This led us to look beyond availability itself and ask whether these real-world conditions could affect straw as a biomanufacturing feedstock.**",
                  },
                  {
                    kind: "anchor",
                    id: "ihp-agricultural-expert",
                  },
                  {
                    kind: "markdown",
                    value: "*Agricultural Expert & Planting Base*",
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
                    kind: "markdown",
                    value:
                      "We therefore consulted an agricultural expert and visited a planting base to understand differences among straw sources from both feedstock and production perspectives.\n\nThe consultation and field observations highlighted factors including moisture content, impurities, storage stability, and supply characteristics. These properties can vary across straw sources and may affect subsequent storage, processing, and reliable entry into a biomanufacturing system.\n\nAt this point, we had developed a clearer understanding of straw utilization from three complementary perspectives: **regional utilization, practical supply, and feedstock characteristics.**",
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Bringing together these perspectives helped us reconsider how agricultural biomass should be understood within Carbotex.\n\nThe local agricultural authority highlighted the existing utilization structure, farmers and cooperatives emphasized the practical conditions of straw supply, and agricultural experts drew our attention to variations in feedstock characteristics.\n\nTogether, these insights showed us that straw is not simply an abundant agricultural resource, but an important part of an existing agricultural system. Its potential for biomanufacturing needs to be understood alongside established utilization practices and real-world supply conditions.\n\nAt the same time, these perspectives reinforced the value of exploring new pathways for converting agricultural biomass into higher-value products, creating further opportunities for biomass valorization.",
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "These insights reshaped how we understood the significance of Carbotex and clarified our research direction.\n\nWe began to view Carbotex not simply as a way to utilize abundant straw, but as an opportunity to explore how agricultural carbon could be converted into higher-value products through synthetic biology.\n\nThis broader agricultural perspective strengthened our commitment to biomass valorization and provided a meaningful foundation for our subsequent research.\n\n**Our focus therefore moved from understanding the broader challenges of agricultural resource utilization to exploring how biological engineering could enable more effective carbon conversion.**",
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Through these engagements, we gained a more grounded understanding of the agricultural context surrounding straw utilization.\n\nLooking back at our initial questions, the discussions helped us understand how straw is currently used, what conditions influence its practical availability, and which characteristics may matter for its future utilization in biomanufacturing.\n\nMore importantly, these perspectives helped us connect the broader challenge of agricultural biomass utilization with a more focused research direction that we could explore through synthetic biology.\n\n**With a clearer understanding of the agricultural context, our next question became: What should straw-derived carbon ultimately become, and how could a biological system make that conversion possible?**\n\nThis marked our transition from understanding the agricultural system to building the biological system.",
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
            kind: "markdown",
            value:
              "Our exploration of agricultural resource utilization helped us understand the potential value of further developing straw-derived carbon resources.\n\nWe then shifted our attention from agricultural resources to biological conversion, asking how microbial production could transform this renewable carbon into a product with potential for downstream applications.",
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
                    kind: "markdown",
                    value:
                      "Having examined the agricultural context of straw, we needed to identify a biologically feasible conversion route that could connect straw-derived carbon with a value-added product and potential material applications.\n\n**Which target product and microbial production system could provide a reliable starting point for valorizing sugars derived from straw?**",
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
                    kind: "markdown",
                    value: "**Prof. Guanglei Liu**",
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
                    kind: "markdown",
                    value:
                      "To clarify the direction of biological carbon conversion, we consulted Prof. Guanglei Liu.\n\nProf. Liu advised us to consider the characteristics of the carbon source, the properties and value of the target product, the existing foundation for biological production, and potential applications together, rather than evaluating the production capacity of a microbial strain in isolation.\n\nAs we explored products that could give agricultural carbon additional value, **poly(malic acid) (PMA)** attracted our attention.\n\nPMA is a bio-based polymer with pendant carboxyl groups that offer opportunities for further chemical functionalization and material development. Meanwhile, previous research on PMA production by *Aureobasidium* species provided a relevant biological foundation.\n\nAn established laboratory strain collection offered a concrete starting point for this direction: ***Aureobasidium melanogenum* A08**.\n\nThe supplying laboratory had previously isolated and screened this strain and had established its potential for producing high-molecular-weight PMA. This existing strain resource allowed us to investigate how PMA production could be connected with the conversion of agricultural carbon.",
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Drawing on Prof. Liu's perspective, we considered three connected factors: **the potential of PMA as a functionalizable polymer, the existing PMA-production background of A08, and the feasibility of using agricultural sugars as fermentation substrates**.\n\nLiterature research also supported the biological production of PMA by *Aureobasidium* species [citation](#ref-Chi2016PMLA).\n\nTo establish the identity of the supplied strain, we examined its colony and microscopic morphology and analyzed its internal transcribed spacer (ITS) sequence.\n\nPhylogenetic analysis placed A08 in a cluster with the reference strain *A. melanogenum* CBS 105.22, supporting its identification as *Aureobasidium melanogenum* and providing a defined chassis for subsequent engineering.\n\nTogether, the literature, available strain resource, and Prof. Liu's perspective on biological production supported **A08 as our production chassis and PMA as the target product**.\n\n**[Explore A08 Chassis Background and Identification →](/design#design-chassis-selection-why-a08)**",
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Based on these considerations, we established an initial biological engineering route for Carbotex:",
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
                    kind: "markdown",
                    value:
                      "This direction connected agricultural carbon resources, a microbial production chassis, and downstream material development.\n\nIt also helped us identify the key experimental questions for the next stage: examining A08's responses to different carbon sources, comparing PMA production under different sugar compositions, and further evaluating the feasibility of using sugars derived from actual straw feedstocks for fermentation.",
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "This stage established an A08–PMA conversion route supported by an existing PMA-production background and our strain-identification results.\n\nHowever, the structural carbohydrates in straw must first undergo upstream saccharification to release soluble sugars before they can be used as carbon sources in our A08 fermentation system.\n\nCellulose primarily contributes glucose, while xylan in hemicellulose can release xylose. Consequently, straw-derived hydrolysates commonly contain both glucose and xylose.\n\nFor Carbotex, identifying the chassis and target product was only the first step. We also needed to understand A08's production performance in this mixed-sugar environment.\n\n**How would changes in glucose–xylose composition affect PMA production by A08?**",
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
                    kind: "markdown",
                    value:
                      "Lignocellulosic hydrolysates commonly contain different sugars, including glucose and xylose [citation](#ref-Francois2020).\n\nAlthough A08 had an established background in PMA production, this did not mean it would perform equally well across different sugar compositions.\n\n**Could A08 maintain favorable PMA production when glucose and xylose were present together, especially as the proportion of xylose increased?**",
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
                    kind: "markdown",
                    value: "**Prof. Yajun Liu**",
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
                    kind: "markdown",
                    value:
                      "To connect our biological production system with agricultural residues, we received corn-stover hydrolysate provided by Prof. Yajun Liu. The hydrolysate had been prepared by a collaborating laboratory using a consolidated bio-saccharification (CBS) system.\n\nThis provided an agricultural-residue-derived sugar source for investigating A08 fermentation under conditions relevant to Carbotex.\n\nOur analysis of the hydrolysate showed that, **within the measured sugar fraction, glucose accounted for approximately 80.33% and xylose for 19.67%**.",
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
                    kind: "markdown",
                    value:
                      "Thus, glucose was the predominant sugar, but xylose represented a substantial component of the fermentation feedstock.\n\n**[Explore the CBS System →](/design#design-saccharification-module)**\n\nWe then examined A08 growth under different carbon-source conditions.\n\nThe experiments showed that A08 could grow in the presence of glucose, xylose, and arabinose. However, subsequent fermentation comparisons revealed differences in PMA production: as the proportion of xylose increased in glucose–xylose mixtures, PMA titers generally decreased.\n\nThese results drew our attention to the distinction between being able to grow on a carbon source and achieving favorable PMA production under that condition.",
                  },
                  {
                    kind: "anchor",
                    id: "ihp-le-yu",
                  },
                  {
                    kind: "markdown",
                    value: "**Dr. Le Yu**",
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
                    kind: "markdown",
                    value:
                      "We discussed this experimental observation with Dr. Le Yu.\n\n**If A08 could grow under xylose conditions, why did its PMA production decline as the xylose proportion increased? What did this mean for the utilization of straw-derived hydrolysate?**\n\nDr. Yu encouraged us to consider not only the glucose fraction, which supported more favorable PMA production, but also the carbon represented by xylose.\n\nXylose had already been released from straw during upstream saccharification and formed part of the available fermentation substrate. Evaluating the potential of agricultural biomass valorization therefore required considering whether this carbon could contribute to the formation of the final product.\n\nHer perspective helped us clarify an important distinction: **growth on a particular sugar does not necessarily mean efficient production of the target compound under that condition**.\n\nFor Carbotex, the goal was not merely to demonstrate that A08 could grow in a xylose-containing environment. We also wanted to explore how to improve PMA production under such conditions, making better use of the carbon available in straw hydrolysate for downstream biomanufacturing.",
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Combining the experimental findings with Dr. Yu's perspective, we examined the relationship between microbial growth and PMA production under different carbon-source conditions.\n\nA08 grew under glucose, xylose, and arabinose conditions, but its PMA-production performance varied.\n\nIn our initial glucose–xylose composition comparison, the PMA titer was approximately **19.00 g/L under glucose-only conditions**, compared with **11.61 g/L under xylose-only conditions**. PMA titers generally declined as the xylose proportion increased in the mixed-sugar formulations.",
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
                    kind: "markdown",
                    value:
                      "We also examined PMA production at different initial xylose concentrations. Increasing the supplied xylose concentration did not lead to a continuous increase in PMA titer, indicating that greater substrate loading alone was insufficient to resolve the production challenge.\n\nTogether with the mixed-sugar composition of the actual corn-stover hydrolysate, these findings identified **improving PMA production by A08 under xylose-containing conditions** as an important direction for subsequent engineering.",
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Based on the experimental results and Dr. Yu's perspective, we focused our subsequent engineering efforts on improving PMA production by A08 under glucose–xylose conditions.\n\nWe emphasized PMA titers across different glucose–xylose formulations and included treated corn-stover hydrolysate in the fermentation evaluation framework to examine whether engineering could improve product accumulation under conditions relevant to our feedstock.\n\n**[Explore the Mixed-Sugar Fermentation Results →](/design#design-xylose-module)**",
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "This stage established a production challenge for A08 under xylose-containing conditions.\n\nAlthough the strain could grow on xylose, PMA titers were relatively low when xylose made up a greater proportion of the carbon source. Increasing xylose loading also failed to produce a sustained improvement in PMA accumulation.\n\nTogether with Dr. Yu's emphasis on the value of the available feedstock carbon, these findings shifted our attention beyond substrate composition and cultivation conditions toward biological processes that might influence product formation.\n\n**Which biological mechanisms might affect PMA production by A08 under xylose-containing conditions?**\n\nThis led us to investigate regulatory processes associated with pentose metabolism.",
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
                    kind: "markdown",
                    value:
                      "Having identified the PMA-production challenge under xylose-containing conditions, we needed to explore engineering strategies that could be tested in A08.\n\n**Should we modify individual metabolic reactions, or focus on upstream regulators capable of coordinating several metabolic processes?**",
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
                    kind: "markdown",
                    value: "**Dr. Nan Hao**",
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
                    kind: "markdown",
                    value:
                      "To better understand the biological mechanisms that might contribute to A08's PMA-production performance under xylose-containing conditions, we discussed the problem with Dr. Nan Hao.\n\nDr. Hao drew our attention to the fact that microbial responses to different carbon sources involve not only metabolic enzymes, but also carbon-source sensing and gene-expression regulation.\n\nUnder pentose conditions in particular, several metabolic processes may be influenced by interconnected regulatory mechanisms rather than by a single metabolic reaction.\n\nThis perspective broadened our initial focus on individual metabolic steps and encouraged us to consider **whether transcriptional regulation might also influence carbon-source responses and PMA production in A08**.",
                  },
                  {
                    kind: "anchor",
                    id: "ihp-tao-ma",
                  },
                  {
                    kind: "markdown",
                    value: "**Dr. Tao Ma**",
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
                    kind: "markdown",
                    value:
                      "Building on this regulatory perspective, we further discussed potential engineering strategies with Dr. Tao Ma.\n\nBecause pentose metabolism involves several interconnected processes, modifying downstream metabolic enzymes one by one could increase engineering complexity without necessarily improving the cell's overall response to a carbon source.\n\nIn contrast, upstream transcriptional regulators may influence the expression of multiple related genes, making them promising candidates for further investigation.\n\nAt the same time, the involvement of a regulator in pentose responses does not necessarily mean that increasing its expression will improve PMA production. Its effects on microbial growth and target-product formation must be evaluated experimentally.\n\nThese discussions encouraged us to examine the biological functions and potential engineering value of pentose-associated transcriptional regulators, providing a useful perspective for subsequent target investigation.",
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Drawing on these discussions, we used literature research and the gene-annotation records of A08 to identify two candidate transcriptional regulators associated with fungal pentose responses: **XlnR and AraR**, corresponding to *xlnR* (g3332.t1) and *araR* (g13480.t1), respectively.\n\nPrevious research has implicated these regulators in fungal responses to pentose carbon sources [citation](#ref-deSouza2013AraRXlnR).\n\nAfter identifying the candidates, we used published XlnR-recognition motifs to examine promoter sequences of selected PMA-associated and central-carbon-metabolism genes.\n\nThe analysis included *PMA-1*, *PMA-2*, and glycolysis-associated targets *HK*, *PFK*, *GAPDH*, and *PGK*.\n\nThe predicted motif matches suggested possible links among pentose-responsive regulation, central carbon metabolism, and PMA production, providing a rationale for subsequent experimental testing.\n\nTogether, the literature and sequence analyses supported the selection of XlnR and AraR as engineering targets requiring further functional validation.",
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "We established two complementary series of engineered strains centered on XlnR and AraR.\n\nThe first series used single- and double-regulator deletions to investigate how these factors affected A08 growth under xylose and arabinose conditions.\n\nThe second series used individual and combined overexpression of XlnR and AraR to evaluate whether these modifications could improve PMA production under different glucose–xylose compositions.\n\nTogether, these experiments allowed us to examine the biological roles of the regulators and their potential engineering value, informing the subsequent selection of strains with favorable production performance.",
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "The regulator-deletion experiments showed that XlnR and AraR were associated with growth under pentose conditions, although their effects varied with the carbon source.\n\nUnder xylose conditions, the double-deletion strain showed the strongest growth reduction, with an endpoint OD₆₀₀ of approximately **1.27**, compared with **3.90** for the parental A08 strain.",
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
                    kind: "markdown",
                    value:
                      "Under arabinose conditions, deleting AraR alone had a greater effect on growth than deleting XlnR alone.\n\nThese findings supported investigating the two regulators individually and in combination, while also highlighting the importance of regulatory responses under pentose conditions.\n\nHowever, changes in deletion-strain growth did not establish whether overexpression could improve PMA production.\n\n**We therefore turned to fermentation evaluation to determine the actual PMA-production performance of the XlnR/AraR-engineered strains.**",
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
                    kind: "markdown",
                    value:
                      "Identifying XlnR and AraR provided a clear engineering direction, but successful genetic modification alone could not demonstrate an improvement in PMA production.\n\n**Could regulatory engineering improve PMA production under glucose–xylose conditions and in corn-stover hydrolysate?**",
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
                    kind: "markdown",
                    value: "**Prof. Qilin Yu**",
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
                    kind: "markdown",
                    value:
                      "To improve the functional evaluation of our engineered strains, we discussed our experimental approach with Prof. Qilin Yu.\n\nProf. Yu emphasized the importance of distinguishing successful genetic modification from genuine functional improvement.\n\nFor Carbotex, confirming that a genetic construct had been successfully introduced was not enough. We also needed to examine whether the modification affected strain performance under different carbon-source conditions and, ultimately, promoted the formation of the target product.\n\nHis advice reinforced three connected levels of evaluation:",
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
                    kind: "markdown",
                    value:
                      "Following this evaluation framework, we examined genetic engineering outcomes alongside strain growth and PMA production.\n\nUsing our existing strain-comparison system, we focused on the performance of A08, OE-XlnR, OE-AraR, and OE-XlnR+AraR under different glucose–xylose compositions.\n\nBecause Carbotex uses sugars derived from agricultural residues, it was also important to examine PMA production by these strains in actual corn-stover hydrolysate.\n\nBy considering both defined mixed-sugar formulations and straw-derived hydrolysate, we could evaluate the regulatory engineering strategy in relation to the project's intended feedstock.",
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "We extended strain evaluation beyond genetic construct verification to functional production performance.\n\nWe compared the growth and PMA production of the four strains across different glucose–xylose formulations and conducted further fermentation experiments using treated corn-stover hydrolysate.\n\nIn addition, to explore molecular responses associated with the observed production phenotype, we compared the relative transcript levels of selected xylose-metabolism-related and PMA-associated genes between A08 and OE-XlnR+AraR.\n\nTogether, these comparisons connected regulatory engineering, carbon-source conditions, and target-product formation.\n\n**[Explore AraR/XlnR Fermentation and PMA Results →](/design#design-xylose-module-experimental-design)**",
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Our fermentation results showed that **co-overexpression of XlnR and AraR improved PMA production under xylose-containing conditions**.\n\nUnder xylose-only conditions, OE-XlnR+AraR achieved a PMA titer of **13.86 g/L**, compared with **10.04 g/L** for the parental A08 strain, an increase of approximately **38.0%**.",
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
                    kind: "markdown",
                    value:
                      "The improvement was also observed in corn-stover hydrolysate: the dual-overexpression strain reached **18.63 g/L**, compared with **15.87 g/L** for A08, an increase of approximately **17.4%**.",
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
                    kind: "markdown",
                    value:
                      "These results demonstrated an improved production phenotype under conditions relevant to the project's agricultural feedstock, supporting our regulatory engineering strategy.\n\nFurthermore, the relative expression levels of selected xylose-metabolism-related and PMA-associated genes were higher in the dual-overexpression strain than in A08, consistent with its improved PMA production.\n\nTogether, these findings confirmed that XlnR/AraR co-overexpression promoted PMA accumulation under the conditions tested.\n\nThey also raised a further question:\n\n**Having improved PMA production under xylose-containing conditions, could we increase production further by strengthening the supply of metabolic precursors required for PMA synthesis?**\n\nThis extended our investigation from regulatory engineering toward precursor-supply engineering.",
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
                    kind: "markdown",
                    value:
                      "XlnR/AraR co-overexpression improved PMA production under xylose-containing conditions.\n\nHowever, improved production performance did not necessarily mean that the metabolic precursor supply for PMA synthesis had been fully optimized.\n\n**How could we further support the conversion of carbon entering central metabolism into PMA?**",
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
                    kind: "markdown",
                    value: "**Prof. Weihui Wu**",
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
                    kind: "markdown",
                    value:
                      "To explore this question, we discussed intracellular carbon allocation and its relationship with product formation with Prof. Weihui Wu.\n\nProf. Wu encouraged us to distinguish carbon entering cellular metabolism from carbon ultimately contributing to the synthesis of the target product.\n\nCarbon entering central metabolism may support biomass formation, cellular maintenance, competing metabolic processes, or target-product synthesis. Therefore, improved production under a particular carbon-source condition does not imply that all available carbon is directed toward PMA biosynthesis.\n\nThis perspective drew our attention to the metabolic processes supporting PMA synthesis, especially the supply of relevant precursor molecules.\n\n**Follow-up with Prof. Guanglei Liu**",
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
                    kind: "markdown",
                    value:
                      "As we considered the metabolic fate of carbon entering the cell, we returned to Prof. Guanglei Liu to discuss the PMA biosynthetic route.\n\nUnlike our initial discussion about the carbon source, target product, and microbial chassis, this consultation focused on a more specific question:\n\n**How could strengthening metabolic precursor supply support additional PMA synthesis?**\n\nThis follow-up connected the previously established A08–PMA production route with questions emerging from regulatory engineering and fermentation evaluation, providing direction for further pathway analysis.",
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "We examined the relationship between central carbon metabolism and PMA biosynthesis:",
                  },
                  {
                    kind: "flow",
                    steps: ["Pyruvate", "Oxaloacetate", "Malate", "PMA"],
                  },
                  {
                    kind: "markdown",
                    value:
                      "Pyruvate carboxylase (PYC) catalyzes the conversion of pyruvate to oxaloacetate and is one of the enzymes linking central metabolism to malate precursor supply [citation](#ref-Jitrapakdee2008PYC).\n\nBased on the known metabolic role of PYC and our examination of the PMA biosynthetic pathway, we considered PYC a candidate target for investigating precursor supply.\n\n**Related Team Work — A08 Metabolic Modeling.** The Model group also explored a genome-informed research direction for analyzing A08 metabolism, considering proteome prediction, genome-scale metabolic modeling (GEM), and flux variability analysis (FVA) as possible computational steps. This offers a complementary perspective on intracellular carbon allocation. We do not claim that a completed GEM/FVA prediction preceded or directly determined the PYC constructs tested in the wet lab. The engineering work described below is supported by the team's documented strain construction and fermentation measurements.\n\nTo explore whether PYC genes from different sources might influence PMA production, we considered four candidate sources, including endogenous A08 PYC.\n\n**[Explore the Modeling Analysis →](/model#model-overview)**",
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Building on the existing XlnR/AraR co-overexpression background, we investigated whether PYC expression could further support PMA precursor supply.\n\nFour PYC sources were considered during construct development.\n\nAn overexpression strain carrying the endogenous A08 PYC could not be successfully established. We subsequently obtained strains carrying three heterologous PYC candidates and combined the corresponding constructs with the **OE-XlnR+AraR** regulatory-engineering background.\n\nThe three heterologous PYC sources were:\n\n- *Yarrowia lipolytica*\n- *Saccharomyces cerevisiae*\n- *Aureobasidium thailandense* ZW03-4\n\nWe compared PMA production by these combined-engineering strains in corn-stover hydrolysate to evaluate the performance of the different PYC constructs under the tested conditions.\n\n**[Explore PYC Engineering and PMA Results →](/design#design-pyc-module-experimental-design)**",
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Among the obtained and evaluated combined-engineering strains, the **SC group achieved the highest PMA titer**.\n\nThis strain expressed **PYC1 from *Saccharomyces cerevisiae*** in the OE-XlnR+AraR background and achieved a PMA titer of approximately **26 g/L** in corn-stover hydrolysate.",
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
                    kind: "markdown",
                    value:
                      "This result demonstrated the improved production performance attainable by combining regulatory engineering with the PYC engineering strategy under the tested fermentation conditions.\n\nAlthough these experiments did not directly quantify intracellular carbon-flux distribution, the fermentation comparisons among PYC constructs provided experimental evidence relevant to investigating the relationship between precursor supply and PMA production.",
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
            kind: "markdown",
            value:
              "Through these successive investigations, Carbotex progressed from an existing PMA-producing microbial chassis to an engineered system capable of producing PMA from sugars derived from corn stover.\n\nWe first connected the PMA-production background of A08 with the potential of PMA for subsequent material development, establishing the biological conversion route.\n\nMixed-sugar experiments then revealed a PMA-production challenge under xylose-containing conditions. Stakeholder perspectives and literature research helped direct our attention to transcriptional regulation, and XlnR/AraR engineering improved PMA production under the conditions tested.\n\nFurther evaluation led us to investigate precursor supply, where PYC engineering provided another route for improving production.\n\n**Across these iterations, we connected straw-derived carbon resources, microbial regulatory engineering, metabolic precursor supply, and PMA production into a coherent biological manufacturing strategy for Carbotex.**",
          },
        ],
      },
      {
        id: "ihp-material",
        title: "2.3 Developing the Material & Application",
        parts: [
          {
            kind: "markdown",
            value:
              "Our biological engineering work established PMA production from straw-derived sugars as a central part of Carbotex. We then considered how the resulting polymer could contribute to a functional material, connecting fermentation with a tangible application.\n\nThis required us to move beyond PMA titer alone and examine material selection, chemical functionalization, preparation, and performance.",
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
                    kind: "markdown",
                    value:
                      "Producing PMA gave Carbotex a biological product, but its further value depended on how its chemical structure could be used.\n\n**What material function could build on the properties of PMA and connect our fermentation work with a meaningful downstream application?**",
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
                    kind: "markdown",
                    value: "**Prof. Ya Liu**",
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
                    kind: "markdown",
                    value:
                      "To explore the material potential of PMA, we consulted Prof. Ya Liu.\n\nProf. Liu encouraged us to look beyond fermentation titers and consider PMA from a materials-science perspective, including its chemical structure, modifiability, and potential applications.\n\nDuring our discussion, she highlighted **PMA's favorable biocompatibility and biodegradability, as well as the potential of dopamine in the design of biologically relevant materials**. PMA offers a polymer backbone that can be chemically modified, while dopamine contains catechol groups that can introduce functionality associated with interfacial adhesion.\n\nHer advice encouraged us to explore whether suitable chemical functionalization could develop PMA from a microbial fermentation product into a bio-based adhesive material.",
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Drawing on Prof. Liu's advice, we reviewed research on the chemical structure and material potential of PMA.\n\nPMA contains abundant pendant carboxyl groups that provide sites for further chemical modification, making it a promising basis for functional materials [citation](#ref-Qiao2023PMLA).\n\nAmong the potential applications, we became particularly interested in adhesion.\n\nOn the one hand, suitable molecular modification could introduce groups that interact with material surfaces. On the other, adhesive performance could be evaluated experimentally using different substrates, giving our material work a clear research objective.\n\nBio-based adhesive development also aligned with Carbotex's broader goal of creating functional products from renewable carbon resources.\n\nWe therefore identified **PMA-based adhesive development** as a direction worth pursuing.",
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Based on Prof. Liu's advice and our literature research, we selected **PMA-based adhesive development** as Carbotex's downstream material direction.\n\nThis decision extended our work from biological PMA production to functional material development, with a clear objective for subsequent chemical modification and adhesion evaluation.",
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Through this discussion and analysis, we established a direction for PMA material development.\n\nPMA's chemical structure provided a basis for functionalization, while adhesion gave us a specific way to explore the downstream value of this bio-based polymer.\n\n**Our next step was to identify a suitable molecular modification strategy to translate PMA's structural features into adhesive functionality.**",
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
                    kind: "markdown",
                    value:
                      "After selecting PMA-based adhesive development as our direction, we considered how the material could actually be produced.\n\nAlthough our earlier discussion had drawn our attention to functional molecules such as dopamine, using this concept with PMA required a specific chemical design and preparation strategy.\n\n**How could we use PMA's chemical structure to introduce adhesion-related groups and turn our fermentation product into a practical adhesive material?**",
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
                    kind: "markdown",
                    value: "**Dr. Haotian Guo**",
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
                    kind: "markdown",
                    value:
                      "During CCiC, we presented and discussed Carbotex with Dr. Haotian Guo.\n\nDr. Guo recognized the connection between straw-derived carbon, PMA fermentation, and downstream adhesive development. He also encouraged us to develop the adhesive component further by clarifying its **design rationale, preparation approach, and experimental evaluation pathway**, so that material development would become a substantial part of the project.\n\nHis feedback reinforced the importance of connecting molecular design with actual material performance and prompted us to consider a practical preparation process based on the PMA we produced.",
                  },
                  {
                    kind: "anchor",
                    id: "ihp-bright-moon",
                  },
                  {
                    kind: "markdown",
                    value: "**Bright Moon Seaweed**",
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
                    kind: "markdown",
                    value:
                      "While exploring chemical functionalization strategies for PMA, we visited Bright Moon Seaweed to learn from its experience in developing natural-polymer materials.\n\nThe company works with marine-derived natural polymers, including alginate, in material development and applications. Natural polysaccharides such as alginate contain functional groups that can be modified chemically to adjust material structure, properties, and performance.\n\nDuring our visit, company representatives introduced common modification strategies, including **esterification, oxidation, amidation, and grafting**, and discussed choosing suitable reactions according to a polymer's structure and intended function.\n\nTheir experience helped us understand that developing natural-polymer materials depends not only on the properties of the starting polymer, but also on using its reactive functional groups to introduce new functions.\n\nGiven PMA's abundant pendant carboxyl groups, we became increasingly interested in using these reaction sites to attach molecules with specific functions.\n\nThis offered a useful perspective for our subsequent investigation of dopamine functionalization.\n\n**[Explore Natural Polymer Modification →](/design#design-adhesive-module-why-dopamine-and-pma)**",
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Combining Prof. Liu's advice with the design perspectives offered by Dr. Guo and Bright Moon Seaweed, we reviewed research on catechol-mediated adhesion and PMA modification.\n\nStudies of mussel-inspired adhesives have shown that catechol-containing molecules such as dopamine can introduce functionality associated with interfacial adhesion [citation](#ref-Lee2007Mussel).\n\nMore directly, Tang et al. reported coupling dopamine to a PMA backbone and evaluating the adhesive performance of the resulting material, providing a relevant precedent for our design [citation](#ref-Tang2020PMLADA).\n\nFrom a chemical perspective, **PMA provides carboxyl groups suitable for coupling reactions, while dopamine contains an amino group and an adhesion-related catechol group**. This offered a concrete rationale for introducing adhesion-related functionality into PMA.\n\nBased on these discussions and literature, we selected **dopamine functionalization** as our preparation strategy for the PMA-based adhesive.\n\nWe also wanted this material preparation to connect with our existing microbial fermentation process. We therefore explored using **cell-removed, PMA-containing fermentation broth** directly as the starting material for dopamine functionalization.",
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Based on this design, we established a preparation workflow for the PMA–dopamine (PMA-DA) material.\n\nIn the wet lab, we first removed cells from PMA-containing fermentation broth and measured its PMA concentration by HPLC. The documented broth batches used for material preparation contained approximately **18 g/L PMA**, which guided the amount of coupling reagents added.\n\nWe then performed EDC·HCl-assisted dopamine coupling, followed by dialysis, shaping, prefreezing, and freeze-drying. The recovered material could be reconstituted with water for subsequent adhesion tests.\n\nThe material preparation workflow can be summarized as:",
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
                    kind: "markdown",
                    value:
                      "This process directly connected PMA fermentation with material modification, extending Carbotex from microbial polymer production toward functional material development.",
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Through this workflow, we obtained material samples suitable for subsequent mechanical adhesion experiments and established a practical preparation route from PMA-containing fermentation broth to a functionalized formulation.\n\nDopamine functionalization gave our material work a concrete molecular design and enabled further investigation of the material's adhesive behavior.\n\n**We next focused on how PMA-DA performed on different material surfaces and under aqueous conditions.**",
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
                    kind: "markdown",
                    value:
                      "After preparing PMA-DA, we wanted to understand its adhesive performance under different testing conditions.\n\n**How could we choose suitable substrates and environments to evaluate PMA-DA's adhesive properties more comprehensively?**",
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
                    kind: "markdown",
                    value: "**National Oyster Science & Technology Courtyard**",
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
                    kind: "markdown",
                    value:
                      "To learn more about biological adhesion in natural environments, we visited the National Oyster Science & Technology Courtyard and spoke with **Ms. Yanni Yang, Deputy General Manager**.\n\nMs. Yang introduced oyster cultivation conditions, growth, and attachment in marine environments. This gave us a more tangible understanding of how organisms attach to surfaces in wet, water-rich settings.\n\nThe visit also encouraged us to consider adhesive behavior in real environments. Beyond whether a material could adhere to a surface, **the surface characteristics of different substrates and the influence of water on adhesion** were also important considerations.\n\nThese examples of marine biological attachment offered useful inspiration for improving our PMA-DA evaluation and encouraged us to examine the material's behavior at different interfaces and under aqueous conditions.",
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Following our discussion at the National Oyster Science & Technology Courtyard, we considered the importance of substrate properties and environmental conditions in evaluating adhesive performance.\n\nAdhesive materials interact with the surfaces they join, and different substrates have different surface characteristics. Water may also influence interactions at the interface and the resulting adhesive response.\n\n**Comparing adhesion across different substrates and in aqueous conditions** could therefore help us understand PMA-DA's properties from multiple perspectives and guide subsequent material optimization.",
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "For our material evaluation, we selected **glass, stainless steel, and ex vivo porcine skin** as test substrates and used mechanical testing to examine PMA-DA adhesion on these different surfaces.\n\nWe also tested different material formulations and conducted adhesion experiments under aqueous conditions to explore how the material behaved in different settings.\n\nThese experiments extended our work from material preparation to the direct evaluation of adhesive performance.\n\n**[Explore PMA–DA Adhesion and Material Evaluation Results →](/design#design-adhesive-module-experimental-design)**",
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Adhesion tests on glass, stainless steel, and ex vivo porcine skin provided **load–displacement and other mechanical response data** for PMA-DA on different substrates.\n\nTogether with comparisons among material formulations and experiments under aqueous conditions, these results helped us understand the material's adhesive behavior across different testing conditions.\n\nThe findings provided evidence for subsequent formulation optimization and application development, connecting molecular functionalization with experimental evaluation of material performance.",
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
                kind: "markdown",
                value:
                  "Our Model team also explored a molecular question raised by published PMA–dopamine chemistry. In the reference study, increasing the dopamine-to-carboxyl feed ratio from 1.00 to 1.25 was accompanied by a decrease in the reported dopamine content of the recovered product. The team used molecular-dynamics simulations to examine how dopamine approached activated PMA sites under different feeding conditions. Under the stated model assumptions, the high-feed comparison showed fewer near-contacts within the selected approach-angle window, despite similar overall near-contact counts.\n\nThis work offered a **possible molecular interpretation of a published trend** and suggested questions for later formulation studies. It was a retrospective modeling investigation; it did not measure grafting efficiency in our own PMA-DA samples or determine the team's earlier experimental formulation.\n\n**[Explore PMA–DA Molecular Modeling →](/model#model-overview)**",
              },
            ],
          },
          {
            kind: "label",
            text: "Closing the Material Development Loop",
          },
          {
            kind: "markdown",
            value:
              "Carbotex's material development progressed through a series of stakeholder engagements, research decisions, and experimental activities.\n\nProf. Ya Liu's advice on polymer structure, chemical modifiability, and application potential helped us identify **PMA-based adhesive development** as our downstream direction.\n\nDr. Haotian Guo's feedback then reinforced the importance of connecting material design, preparation, and performance evaluation, while Bright Moon Seaweed's experience with natural-polymer modification informed our exploration of PMA functionalization.\n\nBuilding on these discussions and our literature research, we selected dopamine functionalization and prepared materials from PMA-containing fermentation broth for adhesion evaluation.\n\nFinally, the National Oyster Science & Technology Courtyard drew our attention to biological attachment in natural environments and the importance of considering different substrates and water-rich conditions in material testing.\n\n**Through these engagements, research activities, and experiments, Carbotex connected biological PMA production with chemical functionalization and adhesive-performance evaluation, extending the conversion of straw-derived carbon into the development of a functional adhesive material.**",
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
            kind: "markdown",
            value:
              "Our project began with the possibility of transforming straw-derived carbon into a functional bio-based adhesive. As we moved from PMA fermentation to PMA–dopamine (PMA-DA) material preparation, we began to question whether using a renewable feedstock was, by itself, enough to make the overall process sustainable.",
          },
          {
            kind: "trace",
            number: 10,
            stages: [
              {
                stage: "trigger",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Carbotex explores an additional material-use pathway for agricultural carbon through microbial PMA production and subsequent functionalization. Initially, the renewable origin of the feedstock was an important part of how we understood the project's potential environmental relevance.\n\nHowever, our actual workflow extended beyond feedstock selection to fermentation, chemical coupling, dialysis, and freeze-drying. We therefore asked:\n\n**Does renewable carbon automatically make an adhesive-production process sustainable, and what else should we consider?**",
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
                    kind: "markdown",
                    value: "**Eva — Sustainability Expert**",
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
                    kind: "markdown",
                    value:
                      "To examine this question, we spoke with Eva about sustainability and the United Nations Sustainable Development Goals (SDGs).\n\nEva encouraged us to look beyond the renewable origin of our feedstock and consider **resource inputs, energy requirements, processing steps, and downstream treatment** across the production pathway. Her feedback helped us recognize that an environmentally motivated starting material does not, on its own, establish the environmental performance of a final product.\n\nThe discussion also gave us a way to think about the SDGs: not as labels confirming success, but as questions that could help us examine the significance and limitations of Carbotex.",
                  },
                ],
              },
              {
                stage: "analyze",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "**From Renewable Feedstocks to the Whole Process**\n\nWe reconsidered the actual steps linking straw-derived sugars to adhesive material preparation. A collaborating laboratory supplied corn-stover hydrolysate; our team used *Aureobasidium melanogenum* A08 to produce PMA, and then explored dopamine functionalization of PMA-containing fermentation broth.\n\nIn addition to the carbon feedstock, this route includes fermentation-medium inputs, coupling reagents such as dopamine, EDC·HCl and NHS, dialysis water, and energy-intensive steps such as prefreezing and freeze-drying.\n\n**This made us distinguish the renewable origin of a material from the sustainability of its full production process.** It also helped us identify categories of inputs to consider when developing a preliminary material-preparation cost analysis later in the project. Financial cost, however, is not itself a measure of environmental impact.\n\n**From SDG Labels to Practical Questions**\n\nThe SDGs are 17 interconnected goals established under the United Nations 2030 Agenda in 2015 [citation](#ref-UN2015SDGs). Rather than claiming alignment with every goal, we use SDGs 9, 12, and 13 to examine three distinct dimensions of the Carbotex pathway.",
                  },
                  {
                    kind: "sdg-cards",
                  },
                  {
                    kind: "markdown",
                    value:
                      "Taken together, these goals prompted three different reflections: **SDG 9** led us to consider the pathway from laboratory innovation to reliable production; **SDG 12** directed our attention toward process inputs and resource use; and **SDG 13** reminded us that an environmental motivation is not the same as verified environmental benefit.\n\n*SDG reference: [United Nations — The 17 Goals](https://sdgs.un.org/goals). If official UN SDG icons are used, follow the [UN icon guidelines](https://www.un.org/sustainabledevelopment/wp-content/uploads/2023/09/E_SDG_Guidelines_Sep20238.pdf) and include the required attribution statement: “The content of this publication has not been approved by the United Nations and does not reflect the views of the United Nations or its officials or Member States.”*",
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Eva's feedback changed **how we considered sustainability**, rather than immediately changing the wet-lab formulation.\n\nWe stopped treating the renewable origin of straw-derived carbon as sufficient evidence of a sustainable adhesive. Instead, we began considering the additional inputs and downstream steps involved in producing PMA-DA, including chemical modification, dialysis, and freeze-drying.\n\nThis reflection also helped us identify the relevant input categories for subsequent preliminary cost calculations and questions for future process optimization. It did not amount to a completed life-cycle assessment.",
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "This exchange gave us a more grounded understanding of the potential and limitations of Carbotex. We can demonstrate the experimental development of a PMA-derived adhesive formulation, but evaluating its overall environmental performance requires evidence beyond the origin of the feedstock.\n\nWe have **not** completed a full life-cycle assessment or quantified net emissions reductions. Instead, Eva's input helped us identify what would need to be examined as the project develops, including resource consumption, downstream processing, and material recovery. For a future life-cycle assessment, ISO 14040 provides the principles and framework, while ISO 14044 describes the assessment requirements and guidelines [citation](#ref-ISO14040_2006,ISO14044_2006).\n\n**Sustainability became a question to consider across the Carbotex pathway, not a property we could assume from renewable carbon alone.**\n\nThis perspective also leads to our next challenge: **what would the laboratory pathway require to become a reliable manufacturing process?**\n\n**Next: 3.2 From Laboratory Success to Reliable Manufacturing**",
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
                    kind: "markdown",
                    value:
                      "Through our earlier work, Carbotex developed an experimental pathway connecting straw-derived sugars, polymalic acid (PMA) production by engineered *Aureobasidium melanogenum* A08, dopamine functionalization, and preliminary evaluation of adhesive performance.\n\nBut the ability to carry out fermentation and material preparation in the laboratory does not, by itself, establish a reliable manufacturing process. As our project progressed from individual experiments toward a connected production pathway, we began to ask questions that could not be answered by a single PMA titer or adhesive test. Could fermentation performance remain consistent across batches? How might separate processing steps be connected? And how could data gathered by different research groups support future engineering decisions?\n\n**Beyond improving PMA production and material properties, what would Carbotex need to consider before moving toward reliable manufacturing?**",
                  },
                ],
              },
              {
                stage: "reach-out",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "To explore the gap between laboratory feasibility and practical manufacturing, we visited industrial companies, a biotechnology organization, and a synthetic biology research infrastructure. Each exchange offered a different perspective on fermentation reliability, process integration, research evidence, or standardized engineering.",
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
                    kind: "markdown",
                    value:
                      "Our visit to Tsingtao Brewery introduced us to the practical importance of process monitoring, batch consistency, and controlled operating conditions in industrial fermentation.\n\nThese considerations are directly relevant to our PMA-producing system. In the laboratory, we primarily compare engineered A08 strains using growth observations and measured PMA concentrations. Such comparisons are valuable for evaluating strain engineering, but a high titer in one experiment does not demonstrate that equivalent performance can be maintained across batches or at larger scales.\n\nThe exchange therefore changed how we understood scale-up: **it is not simply a matter of increasing culture volume, but of achieving reproducible production under controlled conditions.**\n\nWe consequently began to regard fermentation stability, batch-to-batch consistency, and monitoring as important questions for future assessments of PMA manufacturing feasibility.",
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
                    kind: "markdown",
                    value:
                      "At Kinger Robot, we learned that manufacturing involves more than the successful operation of individual machines. The connections between operations, the recording of process information, and the traceability of each step are also essential considerations.\n\nThis perspective prompted us to look at the Carbotex pathway as a whole. PMA fermentation, cell removal, material coupling, dialysis, and freeze-drying are currently conducted as successive laboratory operations. Although each step can be carried out, further process development would need to consider how these operations could be connected, monitored, and controlled.\n\nThe visit therefore drew our attention to **process integration, operational monitoring, and standardization**.",
                  },
                  {
                    kind: "related",
                    title: "Hardware Design",
                    parts: [
                      {
                        kind: "markdown",
                        value:
                          "This manufacturing perspective also connects with the engineering design explored by our Hardware team.\n\nThe team designed a modular liquid-pretreatment concept to investigate how upstream and downstream operations might be linked. For an upstream liquid stream that may require ammonium management, the proposed system uses a cation-exchange resin adsorption column together with peristaltic pumps and multi-way valves. Its fluidic design considers adsorption, washing, and resin-regeneration pathways.\n\nThe Hardware team also designed an Internet of Things (IoT) monitoring component with pH and temperature sensors for collecting and transmitting process information.\n\nThese designs provided us with a concrete example through which to consider material transfer and process monitoring between manufacturing steps. They are **engineering design explorations**, however, not evidence that an integrated Carbotex manufacturing line has already been validated.",
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
                        kind: "markdown",
                        value: "**[Explore Our Hardware Design →](/hardware)**",
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
                    kind: "markdown",
                    value:
                      "Our exchange with BGI highlighted the importance of data management and analytical infrastructure in complex biotechnology research.\n\nAs Carbotex progressed, our team accumulated fermentation results from engineered strains, PMA concentration measurements, adhesive performance records, literature references, and modeling reports. These materials originated in different research modules. Answering a specific question could therefore require researchers to revisit experimental protocols, published datasets, and computational outputs to check the conditions and evidence underlying each result.\n\nThis raised a broader question for us:\n\n**How can experimental records, literature evidence, and modeling results be connected so that existing research can better inform subsequent analysis and decisions?**",
                  },
                  {
                    kind: "related",
                    title: "WetFlow Research Agent",
                    parts: [
                      {
                        kind: "markdown",
                        value:
                          "This challenge also resonates with **WetFlow**, a research Agent workspace developed by our Model team.\n\nWetFlow brings project context together with local research documents, publicly available literature, and relevant modeling reports. It helps researchers examine the sources behind an answer and discuss different types of evidence within a shared research context.\n\nThe team demonstrated WetFlow using three questions from the PMA–dopamine (PMA–DA) adhesive work: reconstructing the material-preparation procedure, comparing published dopamine feeding conditions, and identifying molecular questions related to existing adhesion tests. In the feeding comparison, the workspace helped distinguish the initial dopamine-to-carboxyl feed ratio, the dopamine content reported for a recovered product, and the separate concept of actual grafting efficiency.\n\nThese examples show how evidence from experiments, publications, and modeling can be organized and revisited together. Importantly, **the demonstrations re-examined completed experimental work**; they should not be interpreted as proof that WetFlow determined the team's earlier material formulation choices.\n\nThe BGI exchange reinforced the relevance of this kind of evidence management, while WetFlow represents a separate, tangible effort by our own team to explore it. We do not claim that BGI developed the tool or directly performed our analyses.\n\n**[Explore Our WetFlow Research Agent →](/model#model-overview)**",
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
                    kind: "markdown",
                    value:
                      "Our visit to the Shenzhen synthetic biology research infrastructure helped us appreciate the roles of automation, standardization, and systematic workflows in synthetic biology.\n\nIn particular, the **Design–Build–Test–Learn (DBTL)** cycle encouraged us to think about the connections between successive experiments. Carbotex has already conducted work involving engineered strains, fermentation, and material preparation. Yet success in one experiment does not guarantee that the result can be reproduced.\n\nFor experiments to support continuous engineering improvement, conditions need to be documented clearly, results need to be comparable across rounds, and the evidence obtained should inform subsequent designs.\n\n**Reliable engineering is not only about obtaining results; it is also about creating a process in which those results can be tested, compared, and improved.**\n\nWe did not build or use an automation platform equivalent to the infrastructure we visited. The value of this exchange was the perspective it provided on reproducibility and systematic iteration.",
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
                    kind: "markdown",
                    value:
                      "The four exchanges addressed different parts of manufacturing, yet they pointed to a common conclusion: **successfully completing a sequence of laboratory operations is not the same as establishing a reliable manufacturing system.**\n\nTsingtao Brewery emphasized fermentation stability; Kinger Robot highlighted process integration and monitoring; BGI brought attention to research evidence and data management; and the Shenzhen infrastructure demonstrated the importance of standardized, iterative engineering.\n\nComparing these perspectives with our current research helped us distinguish what Carbotex has already explored from what future manufacturing development would still require.",
                  },
                  {
                    kind: "capability-matrix",
                  },
                  {
                    kind: "markdown",
                    value:
                      "This comparison made it clear that manufacturing feasibility cannot be judged solely from one PMA titer or one adhesive performance result. It also needs to consider how individual operations and their supporting evidence fit together.\n\nThese concerns connect with our earlier sustainability reflection: downstream processing, material recovery, and resource inputs may affect not only the environmental implications of the pathway, but also its practicality as a manufacturing process.",
                  },
                ],
              },
              {
                stage: "change",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "These exchanges broadened the questions we ask about Carbotex's future development.\n\nPreviously, our attention centered on improving PMA production in A08 and turning PMA into a functional adhesive material. We now recognize that future implementation must also address fermentation consistency, connections between process steps, reliable research records, and reproducible engineering practices.\n\nThe Hardware design and WetFlow work, introduced alongside the relevant stakeholder exchanges above, made two of these challenges more tangible: how a processing interface might be designed and monitored, and how experimental, literature, and modeling evidence might be revisited together.\n\nWe do **not** present these independent technical projects as changes directly caused by the industry visits. Rather, the visits helped us place existing work within a broader understanding of what reliable biomanufacturing would require.\n\nOur change was therefore one of **engineering perspective and future evaluation priorities**: instead of treating isolated laboratory successes as evidence of readiness for manufacturing, we began to examine the stability, integration, documentation, and reproducibility of the pathway as a whole.",
                  },
                ],
              },
              {
                stage: "evaluate",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "The exchanges gave us a clearer view of both Carbotex's current capabilities and the work still needed for responsible implementation.\n\nWe have established a laboratory basis for PMA production and PMA–DA material preparation. WetFlow has been demonstrated through research cases that connect documents and evidence, while the Hardware team has developed a modular pretreatment and monitoring design.\n\nHowever, these achievements do not amount to a validated industrial manufacturing process. We have not established industrial-scale batch consistency or an integrated automated production and quality-control system. WetFlow is a research workspace rather than an industrial quality-management platform. Likewise, the Hardware concept still requires verification against the actual feedstock and process conditions used for A08 fermentation, including whether ammonium removal is necessary and suitable.\n\nThese limitations are important outcomes of our reflection, not reasons to overlook the exchanges. They help us distinguish demonstrated laboratory research from the requirements of future implementation.\n\n**For Carbotex, laboratory success is a starting point for reliable manufacturing—not proof that reliable manufacturing has already been achieved.**\n\nOnce we began to consider what stable production would require, another question followed: **even if PMA–DA could eventually be manufactured consistently, how would we know whether it meets a real application need and is economically feasible?**\n\n*Next: 3.3 From Material Prototype to Commercial Feasibility*",
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
            kind: "markdown",
            value:
              "*Beyond the Laboratory: Balancing Material Value and Manufacturing Feasibility*",
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
                    kind: "markdown",
                    value:
                      "As Carbotex progressed, our research extended from microbial production of polymalic acid (PMA) to the preparation of dopamine-functionalized polymalic acid (PMA-DA), a bio-based material with adhesive properties.\n\nWe explored PMA-DA adhesion on glass, stainless steel, and ex vivo porcine skin. Our underwater-related experiments and preliminary biocompatibility assessments also yielded encouraging observations, suggesting further directions for potential applications.\n\nHowever, our progress raised a more practical question: **What must a new material offer in order to create real value beyond the laboratory?**\n\nTurning agricultural straw into PMA-DA requires lignocellulosic pretreatment and saccharification, microbial fermentation, dopamine functionalization, purification, and freeze-drying. Each stage involves resources, processing time, and equipment. We gradually recognized that **technical feasibility in the laboratory does not automatically establish readiness for practical application or commercialization**.\n\nWe therefore wanted to understand what producing PMA-DA might cost, what makes it worth developing, and how to balance its functional advantages with manufacturing feasibility. These questions became the starting point for our next stage of Human Practices.",
                  },
                ],
              },
              {
                stage: "reach-out",
                label: "Exploring Commercialization Challenges at CCiC",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "During the 2026 Conference of China iGEMer Community (CCiC), we participated in an Unconference organized by DUT-China on project commercialization and startup incubation.\n\nThe discussion extended beyond technical innovation to practical product development, including manufacturing feasibility, production scale-up, market demand, and business models. This perspective was particularly relevant to Carbotex, which connects microbial production with functional-material development.\n\nPreviously, we had largely evaluated the project from a research perspective: Could PMA be produced successfully? Could we functionalize it with dopamine? Would the resulting material adhere to different substrates?\n\nAt CCiC, we began reconsidering these questions from the perspectives of potential users and manufacturers. A promising material must also be produced consistently, meet clearly defined needs, and offer a convincing reason to be selected over existing alternatives.",
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
                    kind: "markdown",
                    value:
                      "[**View our CCiC commercialization discussion notes**](https://static.igem.wiki/teams/6147/wiki/igem-discussion-notes.pdf)",
                  },
                  {
                    kind: "label",
                    text: "What We Learned from the Discussion Notes",
                  },
                  {
                    kind: "markdown",
                    value:
                      "The discussion notes did more than record our participation at CCiC. They helped us organize the questions that must be addressed when moving a technology from laboratory research toward actual use.\n\nFirst, we recognized that **technical feasibility and commercial feasibility are not the same**. Successfully preparing a material demonstrates a promising technical approach, but practical adoption also requires attention to manufacturing scale, production costs, product consistency, and convenience.\n\nSecond, the exchange encouraged us to connect **product value with specific user needs**. Low cost and mature manufacturing can be significant advantages for general-purpose adhesives. A specialized functional material, however, may create value through its performance under particular conditions or by addressing requirements that conventional products do not prioritize.\n\nFinally, we recognized that commercial analysis should not remain speculative. Wherever possible, it should be grounded in actual production steps and available data.\n\nThis led us to two concrete questions:\n\n**What resources are needed to prepare PMA-DA, and where could its material properties provide meaningful value?**\n\nWe translated these insights into follow-up actions: reviewing our production pathway, consulting an upstream technical collaborator for a second time, estimating preliminary costs, and reconsidering the application potential of PMA-DA.",
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
                    kind: "markdown",
                    value:
                      "While beginning our cost analysis, we also reconsidered the value of the material we were developing.\n\n**From agricultural residues to higher-value functional materials**\n\nCarbotex is distinctive in its production pathway.\n\nAgricultural straw is an abundant non-food biomass resource. Through lignocellulosic saccharification, we aim to convert its carbon content into fermentable substrates, use engineered microorganisms to produce PMA, and subsequently functionalize PMA into an adhesive material.\n\nCarbotex is therefore more than an adhesive-development project: it explores a biological manufacturing route that converts agricultural residues into functional materials. Compared with pathways that depend directly on conventional fossil-derived feedstocks, this approach presents another possibility for using renewable carbon and creating higher-value uses for agricultural residues.\n\nOur goal is not simply to consume straw. **We aim to convert an underutilized biomass resource into a functional material through microbial production and chemical functionalization.**\n\nThe overall environmental benefits of this pathway will still require quantitative evaluation, including future life-cycle analysis. Nevertheless, its design connects resource utilization with material development in a meaningful way.\n\n**From polymer chemistry to functional adhesion**\n\nPMA contains abundant carboxyl groups, providing sites for chemical modification. By introducing dopamine, we aim to incorporate catechol groups capable of participating in interfacial interactions and to explore new adhesive properties.\n\nThis design draws inspiration from chemical strategies associated with adhesion in wet environments. Instead of remaining only a fermentation-derived polymer, PMA becomes a functionalized material whose adhesive behavior can be studied across different interfaces.\n\nOur adhesion tests on glass, stainless steel, and ex vivo porcine skin provided initial observations on substrates with different surface characteristics, helping us explore the interfacial behavior of PMA-DA.\n\n**Beyond conventional bonding: opportunities in challenging environments**\n\nIn addition to tests on different substrates, we conducted underwater-related experiments and preliminary biocompatibility assessments involving L929 cells. Their encouraging results drew our attention to potential applications in wet environments and at biological interfaces.\n\nFor certain applications, an adhesive must accomplish much more than joining two surfaces. Water can affect contact and interfacial interactions; materials used near biological surfaces must also satisfy relevant compatibility and safety requirements.\n\nA bio-based adhesive with a chemically modifiable polymer backbone and encouraging preliminary behavior in aqueous-condition and cell-response experiments is therefore worth exploring further.\n\nAt present, these results do not establish that PMA-DA outperforms existing commercial adhesives or that it is safe for medical use. They do, however, suggest more focused directions for future research.\n\n**Carbotex is intended to offer more than another type of glue: a material option for applications with specific requirements concerning material origin, operating environment, or compatibility with biological interfaces.**\n\nThis perspective helped us recognize that the commercial potential of PMA-DA should be evaluated through both production cost and application-specific material value.",
                  },
                  {
                    kind: "label",
                    text: "2. Consulting Professor Yajun Liu Again: Tracing the Upstream Cost of Hydrolysate Production",
                  },
                  {
                    kind: "markdown",
                    value:
                      "Following the commercialization discussion at CCiC, we began evaluating Carbotex's economic feasibility across the entire production pathway. However, while mapping the costs, we realized that our understanding of the resources required to produce the upstream consolidated bio-saccharification (CBS) hydrolysate was still incomplete.\n\nWe had previously established a collaboration with Professor Yajun Liu and her team, who provided CBS hydrolysate for our subsequent PMA fermentation. This support enabled us to connect the biological conversion of agricultural residues with the development of a functional adhesive.\n\n**Inspired by the discussion at CCiC, we decided to consult Professor Liu for a second time. Unlike our first communication, which focused on technical collaboration, this follow-up focused on the actual inputs and cost considerations of upstream processing.**\n\nWe wanted to understand which steps were involved in converting agricultural straw into a fermentable hydrolysate, which reagents and materials were required, what typical input ratios were used, and what additional costs might be overlooked.\n\nDuring this exchange, we focused on the CBS process and the resources required at different stages. We considered the need for biomass pretreatment to improve lignocellulose accessibility, which introduces expenses related to pretreatment reagents, heating, and washing water.\n\nThe pretreated biomass then enters the CBS system. Beyond the biomass substrate itself, culture-medium components are required to support the saccharifying microorganisms. Depending on the needs of downstream fermentation, the hydrolysate may subsequently undergo purification, impurity removal, or concentration.\n\nThese steps helped us recognize that **producing fermentable sugars from straw is not a simple raw-material substitution but a biological manufacturing process requiring multiple resources.**\n\nAs related background, research on consolidated bioprocessing describes the integration of lignocellulose breakdown with microbial conversion [citation](#ref-Akinosho2014CBP). That work concerns *Clostridium thermocellum* and should not be treated as a source for the specific CBS process parameters or costs used in our estimates.\n\nFollowing this consultation, we also examined related research from Professor Liu's team to obtain quantitative reference parameters. In one published corn-stover CBS process, the system used approximately **40 g/L of pretreated substrate** and obtained approximately **24.3 g/L of reducing sugars**. The study also described alkaline pretreatment, culture-medium composition, and downstream hydrolysate treatment, allowing us to estimate selected material requirements [citation](#ref-Liu2023CBS).\n\nThese numerical values come from **published research conditions**, not from measurements of the exact hydrolysate batch supplied to Carbotex or a direct price quotation from Professor Liu.\n\nTogether, this second consultation and the published process data helped us build an initial framework for evaluating upstream costs.\n\n**We learned that although agricultural straw is a relatively inexpensive non-food resource, converting it into fermentable carbon still entails expenses.** Pretreatment, saccharification, water, energy, medium components, and equipment all contribute to the overall production pathway and may affect the feasibility of PMA-DA.\n\nWe do not yet have a complete cost quotation for the hydrolysate supplied by our collaborator. Nevertheless, this second discussion helped us understand the upstream cost structure and identify the additional information needed for a fuller assessment.\n\n**Most importantly, it transformed the commercialization insights gained at CCiC into concrete action: rather than examining only the final adhesive, we began tracing resource consumption back through the biological manufacturing process.**\n\nWe then combined this upstream perspective with laboratory preparation records and reagent purchase prices to conduct a preliminary quantitative cost analysis of PMA-DA.\n\n*Reference for the upstream process: [Liu et al. (2023), “Bioconversion of non-food corn biomass to polyol esters of fatty acid and single-cell oils”](https://doi.org/10.1186/s13068-023-02260-z). This study provides reference CBS process conditions, not the actual supply cost for Carbotex's hydrolysate.*",
                  },
                  {
                    kind: "label",
                    text: "3. Preliminary Material-Cost Analysis of PMA-DA Preparation",
                  },
                  {
                    kind: "markdown",
                    value:
                      "Building on our upstream process analysis, we combined laboratory records, actual reagent purchasing information, and reference supplier quotations to estimate selected material costs associated with PMA-DA preparation.\n\nAccording to our preparation records, the batch used approximately **200 mL of fermentation broth with a PMA concentration of 18 g/L**, corresponding to approximately **3.6 g of PMA before dopamine functionalization**. This is the theoretical PMA input, not the mass of recovered adhesive.\n\nFor a theoretical reagent-consumption scenario, we assumed a dopamine-to-PMA-carboxyl molar ratio of 1:1, with EDC·HCl and NHS each used at two molar equivalents.\n\nUsing available purchase prices and reference quotations, we obtained the following preliminary estimate:",
                  },
                  {
                    kind: "cost-breakdown",
                  },
                  {
                    kind: "markdown",
                    value:
                      "*Notes: The dopamine range represents two alternative calculation scenarios using dopamine free base or dopamine hydrochloride, rather than observed price fluctuations. EDC·HCl and NHS costs use supplier reference quotations. The CBS contribution is based on published process conditions and an assumed PMA yield of 0.5 g per g of reducing sugar. The displayed figures are rounded; consequently, summing the displayed line items may give a difference of RMB 0.01. This subtotal is not the complete production cost or the unit cost of recovered freeze-dried PMA-DA.*\n\nThis preliminary calculation highlighted an important factor that we had not previously considered in sufficient detail:\n\n**Dopamine accounted for approximately 83–86% of the material costs currently included in our model.**\n\nUnder these laboratory-scale assumptions, functionalizing fermentation-derived PMA into PMA-DA represents a significant part of the reagent expenditure.\n\nFrom a technical perspective, dopamine functionalization adds adhesive functionality worth investigating. From an economic perspective, it also introduces additional reagent requirements. This relationship between functional improvement and cost became an important consideration for future process development.\n\nOur attention therefore expanded beyond improving PMA production alone to include functionalization efficiency, appropriate reagent consumption, and recovery of the final usable material.",
                  },
                  {
                    kind: "label",
                    text: "4. Recognizing the Limitations of Laboratory-Scale Cost Estimation",
                  },
                  {
                    kind: "markdown",
                    value:
                      "Beyond the purchase prices of reagents, we reviewed the main operational steps involved in preparing PMA-DA.\n\nAccording to our laboratory procedure, functionalization and recovery involve approximately 1 hour of activation, 24 hours of dopamine coupling, 48 hours of dialysis, 1 hour of prefreezing, and 48 hours of freeze-drying.\n\nTogether, these operations represent approximately **122 hours of elapsed processing time**, excluding upstream hydrolysate preparation and PMA fermentation.",
                  },
                  {
                    kind: "process-timeline",
                  },
                  {
                    kind: "markdown",
                    value:
                      "This review highlighted the potential influence of processing duration, equipment occupation, consumables, and material recovery on practical production.\n\nHowever, **our preliminary calculation does not yet accurately represent the complete cost of PMA-DA production, and it cannot predict the economics of future industrial-scale manufacturing.**\n\nFirst, elapsed processing time is not equivalent to continuous labor. Coupling, dialysis, and freeze-drying have different operational requirements, and their durations cannot simply be counted as working hours.\n\nSecond, complete data on equipment energy consumption, water use, consumables, all upstream input prices, and the actual recovered mass of freeze-dried PMA-DA are not yet available.\n\nThird, laboratory-scale preparation and potential larger-scale processes differ substantially in procurement, equipment utilization, and operating methods.\n\nTherefore, our current cost estimate should be understood as **an initial attempt to identify the cost structure and potential process bottlenecks, rather than a complete techno-economic assessment**.\n\nNevertheless, it gives our subsequent work a clearer direction. We can improve records of actual reagent consumption, material recovery, and resource use across processing steps. We can also explore more efficient coupling conditions, less resource-intensive purification, and better equipment and material utilization.\n\nOnce more complete data are available, we will calculate unit production cost using the actual recovered mass of the freeze-dried adhesive:\n\n**Unit production cost (RMB/g) = Complete batch production cost (RMB) / Recovered freeze-dried PMA-DA mass (g)**\n\nSuch a measure would enable more objective comparisons of preparation conditions and provide a reference for future manufacturing assessment.\n\n**The main contribution of this analysis is not a precise prediction of product price, but a clearer identification of the factors affecting manufacturing feasibility and the opportunities for future improvement.**",
                  },
                  {
                    kind: "label",
                    text: "5. From Price Comparison to Application-Specific Value",
                  },
                  {
                    kind: "markdown",
                    value:
                      "Following the preliminary cost analysis, we reconsidered the position of PMA-DA relative to existing adhesive products.\n\nConventional industrial adhesives often benefit from established manufacturing systems, optimized formulations, and mature supply chains. Long-term industrial development has enabled cost reductions through economies of scale and more efficient processes.\n\nPMA-DA, in contrast, is still at the laboratory research stage. Expecting it to immediately achieve the price level of mature, mass-produced general-purpose adhesives would be unrealistic.\n\nHowever, this discussion also led us to an important realization: **the value of a new material depends not only on whether it is cheaper than existing products, but also on whether it can address different application needs.**\n\nThe bio-based production pathway of Carbotex, the dopamine-functionalization strategy, and the encouraging observations from underwater-related experiments and preliminary biocompatibility assessments all suggest potential directions beyond conventional low-cost bonding.\n\nWet environments and biological interfaces can place additional demands on an adhesive. In these settings, material selection may depend not only on price, but also on adhesion in relevant conditions, stability, and compatibility.\n\nThis does not establish that PMA-DA already performs better than commercial alternatives. Rather, it gives us a reason to investigate the material under more clearly defined application conditions.\n\nWe therefore reached a key conclusion:\n\n**Exploring the commercial potential of Carbotex should not simply mean competing with ordinary glue on price. It should mean identifying applications that genuinely benefit from the distinctive properties of PMA-DA.**",
                  },
                ],
              },
              {
                stage: "change",
                label:
                  "Integrating Commercial Considerations into Technical Development",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "The CCiC commercialization discussion, our second consultation with Professor Liu, and the subsequent material-value and cost analyses gave us a clearer perspective on Carbotex's future development.\n\n**First, we began assessing the entire production pathway rather than focusing solely on final laboratory performance.**\n\nPreviously, we mainly evaluated project progress through PMA production, material preparation, and adhesion tests. After these exchanges, we began reviewing feedstock supply, functionalization reagents, and downstream processing to develop a more comprehensive picture of manufacturing requirements.\n\n**Second, we identified process stages that deserve attention in future optimization.**\n\nOur preliminary cost analysis indicated that dopamine represented the largest share of the currently priced material inputs, while dialysis, freeze-drying, and product recovery may also affect production efficiency.\n\nThis helped us define more specific objectives, including improving functionalization efficiency, avoiding unnecessary reagent consumption, shortening processing where feasible, and increasing material recovery.\n\n**Third, we placed greater emphasis on matching material properties with actual application needs.**\n\nOur experiments under aqueous conditions and preliminary biocompatibility assessments provided a foundation for exploring PMA-DA in specific usage environments.\n\nWe increasingly recognized that future development must answer not only *how to produce the material more economically*, but also *why a particular group of users would need it*.\n\nWe therefore identified more systematic application-oriented testing and future engagement with potential users and adhesive manufacturers as important next steps.\n\nIn this way, Human Practices became more than a discussion alongside the project: it helped us reconsider technical priorities and potential application pathways.",
                  },
                ],
              },
              {
                stage: "evaluate",
                label:
                  "Balancing Material Innovation with Manufacturing Feasibility",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "These Human Practices activities encouraged us to consider Carbotex's material performance and production-resource requirements within the same framework.\n\nThe CCiC discussion helped us understand the challenges of moving from technical validation to practical application. Consulting Professor Liu a second time improved our understanding of upstream saccharification inputs. Our preliminary cost analysis highlighted dopamine functionalization as an important cost consideration. Reexamining our material experiments also helped us recognize the potential value of PMA-DA in specialized environments.\n\nFor a laboratory batch beginning with approximately **3.6 g of PMA**, the selected material inputs currently included in our model were estimated at **approximately RMB 194–232**.\n\nThis figure is not the complete production cost, but it captures the material expenditure included in our current model and clarifies which additional data are still needed for future optimization.\n\nWe also recognized that encouraging laboratory observations do not automatically translate into a mature commercial product. Practical applications will require further evaluation of material performance, production consistency, safety, and genuine user needs.\n\n**The most valuable outcome of this exploration was not proof that Carbotex is already commercially competitive, but the development of a more realistic and purposeful approach to material development.**\n\nBy considering technical feasibility, manufacturing cost, and application requirements together, we established a stronger basis for the future development of Carbotex.",
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
            kind: "markdown",
            value:
              "**At the current stage, PMA-DA is not as inexpensive as conventional adhesives produced through mature large-scale manufacturing.**\n\nHowever, different materials serve different application needs, and price should not be the only measure of their value.\n\nOne of the most promising aspects of Carbotex is how it connects agricultural-residue utilization, microbial synthesis, and functional-material development.\n\nStarting with non-food lignocellulosic carbon, producing PMA using engineered microorganisms, and then introducing dopamine-derived functionality to explore adhesive behavior, this pathway demonstrates the potential of biological manufacturing in functional-material development.\n\nOur results on different substrates, in underwater-related experiments, and in preliminary biocompatibility assessments support further investigation of application-specific uses.\n\nMore systematic evaluation will help identify applications in which wet-environment adhesion and interactions with biological interfaces are especially important.\n\nLooking ahead, we aim to investigate underwater adhesion and long-term stability under wet conditions, expand biocompatibility and material-safety assessments, and optimize our preparation process to reduce production costs.\n\nWe also plan to communicate with potential users and relevant manufacturers to clarify expectations regarding adhesive performance, convenience, durability, safety, and acceptable costs, so that further development aligns with real needs.\n\n**Rather than becoming a cheaper version of ordinary glue, Carbotex should develop into a bio-based adhesive whose distinctive material properties address specific application challenges.**\n\nWe believe the significance of transforming agricultural residues into functional adhesives lies not only in producing a new material, but also in exploring a biological manufacturing pathway connecting resource value, material innovation, and practical needs.\n\nBy continuously improving production, validating material properties, and listening to future users, we can move Carbotex from a laboratory research outcome toward a functional material with clearly defined applications and practical value.\n\nAs our future applications approach more complex environments and biological interfaces, the responsible evaluation of material safety will become increasingly important. We discuss these considerations in the following section, **3.4 From Biosafety to Product Responsibility**.",
          },
        ],
      },
      {
        id: "ihp-biosafety",
        title: "3.4 From Biosafety to Product Responsibility",
        parts: [
          {
            kind: "markdown",
            value:
              "*Embedding Safety Throughout the Journey from Engineered Cells to Functional Materials*",
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
                    kind: "markdown",
                    value:
                      "As Carbotex progressed, we established a production pathway that connects microbial fermentation of polymalic acid (PMA) with the preparation of dopamine-functionalized PMA (PMA-DA), our bio-based adhesive.\n\nSafety had been part of our laboratory work from the beginning. During strain construction and fermentation, we paid attention to the use of engineered microorganisms, genetic manipulation, laboratory procedures, and biological waste management. As the project moved into material preparation and performance testing, our understanding of safety began to broaden.\n\nWe had investigated adhesion on glass, stainless steel, and ex vivo porcine skin, alongside experiments under underwater conditions, mass-change measurements in phosphate-buffered saline (PBS), and preliminary L929 cell-based assessments. These studies encouraged us to explore possible applications of PMA-DA, including those involving wet environments and biological interfaces.\n\nAt the same time, the production of PMA-DA involves several distinct stages: cultivation of engineered microorganisms, cell separation, chemical functionalization, purification, and material recovery. Each creates different questions for safe handling and future product development.\n\n**How could we carry the principles of responsible research from the engineered production strain all the way to the final adhesive?**\n\nThis question guided our next Human Practices activities.",
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
                    kind: "markdown",
                    value:
                      "At Grand APiC, we introduced Carbotex's production strategy, our genetic engineering work, and our plans for developing PMA-DA as an adhesive material.\n\nDuring the discussion, judges raised a question about biosafety, specifically drawing our attention to **horizontal gene transfer (HGT)** and the genetic information carried by engineered microorganisms.\n\nUntil then, our discussions of biosafety had focused mainly on laboratory containment and the possibility of engineered microorganisms entering unintended environments. The feedback encouraged us to think more carefully about genetic elements themselves: which elements were introduced, how they were managed, and what their potential effects might be outside the intended production process.\n\nHorizontal gene transfer is a recognized mechanism of genetic exchange in microbial communities [citation](#ref-Brito2021HGT). This general background highlights a topic for risk assessment; it does not demonstrate that HGT occurs from our engineered A08 strains.",
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
                    kind: "markdown",
                    value:
                      "To address the concern, we revisited the roles of the engineered microorganism and the final adhesive in our production pathway.\n\nCarbotex uses engineered *Aureobasidium melanogenum* A08 to produce PMA during laboratory fermentation. The intended adhesive is a processed polymer material, not an application of living engineered cells. In our material-preparation procedure, the fermentation broth is centrifuged to separate cells before the PMA-containing liquid enters the dopamine-functionalization process.\n\nThis distinction helped us organize our response, but it also led us to look more closely at the steps between microbial production and the final material. Biosafety management should address the engineered culture and biological waste, while the downstream process must consider separation, purification, and final material quality.\n\nThe judges' question also brought our attention back to the strain records. A meaningful assessment of genetic risks requires clarity about the genetic elements present in the strain actually used for production, including the selection systems involved in its construction.\n\n**The exchange changed the scope of our safety review: instead of considering only the behavior of the microorganism, we began examining the links between genetic design, laboratory management, material processing, and product quality.**",
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
                    kind: "markdown",
                    value:
                      "Our team engineered *Aureobasidium melanogenum* A08 to improve PMA production from straw-derived carbon sources, with work addressing xylose-related regulation and metabolic precursor supply.\n\nThe strain-construction records include the use of genetic-expression and selection systems. For example, NAT selection appears in our records, while HPT is associated with certain knockout-donor designs. These details matter because a selection marker used during an experiment is not necessarily equivalent to a marker retained in the final production strain.\n\nAfter Grand APiC, we gave greater attention to documenting the genetic background and construction history of individual A08 strains. This allows questions about introduced elements, their intended function, and their status in the strain used for fermentation to be addressed using actual construct records.\n\nWe also connected this genetic perspective with laboratory management, including the handling of cultures and biological waste. Considering HGT in the context of a specific organism, genetic design, and possible exposure pathways is more useful than drawing conclusions from general assumptions about microbial survival.\n\n**Our priority became making biosafety assessments traceable to the genetic design and practical handling of the strains we use.**",
                  },
                  {
                    kind: "label",
                    text: "2. From Fermentation Broth to Adhesive: Why Purification Matters",
                  },
                  {
                    kind: "markdown",
                    value:
                      "The safety discussion also prompted us to revisit the transition from biological production to material processing.\n\nIn our wet-lab workflow, cells are separated from the fermentation broth by centrifugation. The PMA-containing liquid is then subjected to dopamine functionalization using an EDC·HCl/NHS coupling system. Dialysis, prefreezing, and freeze-drying are used in subsequent material preparation and recovery.\n\nThese steps determine not only whether a usable adhesive sample can be obtained, but also which components may remain in the final material.\n\nThe upstream fermentation process introduces possible microbial components, while the coupling reaction introduces dopamine, activation reagents, and reaction by-products. Understanding the composition of the final material therefore requires attention to both stages.\n\nThis consideration connects directly with our discussion in Section 3.3. There, we identified purification and freeze-drying as resource-intensive parts of laboratory preparation. Here, we recognized their additional importance for material quality.\n\n**Improving production efficiency should go hand in hand with understanding what each separation and purification step contributes to the final product.**\n\nFor future optimization, this means examining process efficiency, product recovery, and purification performance together, rather than evaluating a change only by the time or reagents it saves.",
                  },
                  {
                    kind: "label",
                    text: "3. From Adhesive Performance to Safety in Intended Use",
                  },
                  {
                    kind: "markdown",
                    value:
                      "Our material experiments have provided several perspectives on the potential uses of PMA-DA.\n\nAdhesion tests on glass, stainless steel, and ex vivo porcine skin helped us examine interactions with different surfaces. Experiments under underwater conditions and mass-change measurements in PBS extended our investigation to aqueous environments. We also conducted preliminary assessments involving L929 cells to explore the material's cellular response.\n\nTogether, these investigations helped us think about the requirements of possible applications more concretely.\n\nFor example, bonding industrial surfaces involves questions about adhesion, stability, handling, and exposure during use. Applications involving biological interfaces introduce further considerations, including material composition, substances released from the material, and responses under relevant contact conditions.\n\nOur existing experiments offer a starting point for investigating these questions. They also help us identify which tests would be most useful as we narrow down potential application scenarios.\n\n**Understanding where PMA-DA can adhere is one part of developing the material; understanding how it behaves in its intended environment is what will help guide responsible application.**",
                  },
                  {
                    kind: "label",
                    text: "4. From Safety Awareness to Laboratory Practice",
                  },
                  {
                    kind: "markdown",
                    value:
                      "Alongside the evaluation of microorganisms and materials, we also paid attention to how team members carry out everyday laboratory work.\n\nDuring an on-site laboratory session, a laboratory instructor introduced us to basic experimental procedures, instrument use, and safety precautions. The explanations gave us a clearer understanding of laboratory routines and the risks associated with improper operation, and reinforced the importance of following established procedures.",
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
                    kind: "markdown",
                    value:
                      "China Ocean University's Virtual Simulation Laboratory Management Platform also offers interactive online resources for laboratory safety education. By simulating operations and equipment use, these resources can help students become familiar with procedures and recognize common risks before working with real experimental materials.\n\nWe see value in combining direct guidance from laboratory instructors with virtual simulation resources and established laboratory procedures to strengthen routine safety training.\n\n**This experience brought biosafety into the practical details of our work: understanding procedures, recognizing risks, and carrying out experiments responsibly.**",
                  },
                ],
              },
              {
                stage: "change",
                label: "Bringing Safety into Project Development",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "The feedback at Grand APiC, our review of the wet-lab workflow, and the laboratory safety guidance led us to refine our priorities in three areas.\n\n**First, we placed greater emphasis on the genetic records and management of engineered A08 strains.**\n\nThe judges' concern about HGT encouraged us to consider genetic elements alongside laboratory containment and culture handling. When discussing strain safety, we now focus on the construction history and actual genetic status of the strain used, rather than treating all experimental constructs as identical.\n\n**Second, we connected purification and material quality with process optimization.**\n\nRevisiting the PMA-DA preparation workflow highlighted the importance of cell separation, functionalization reagents, and dialysis. As we consider future improvements to the process, we intend to evaluate both preparation efficiency and the quality of the recovered material.\n\n**Third, we strengthened the place of safety education in our development process.**\n\nThe laboratory instructor's on-site explanations improved our understanding of basic operations and precautions. Virtual simulation resources provide a useful complementary learning approach, and we intend to connect these resources with routine laboratory guidance and operating procedures.\n\nTogether, these considerations gave us a framework that follows Carbotex's actual workflow:",
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
                    kind: "markdown",
                    value:
                      "This framework helps us connect feedback from Human Practices with the practical choices that shape our experimental work.",
                  },
                ],
              },
              {
                stage: "evaluate",
                label: "Extending Responsibility Beyond the Laboratory",
                parts: [
                  {
                    kind: "markdown",
                    value:
                      "Our work in this section changed how we think about safety across Carbotex.\n\nThe discussion at Grand APiC brought genetic elements and HGT into our consideration of engineered-strain management. Revisiting the material-preparation procedure connected safety questions with separation, chemical functionalization, and purification. The laboratory instructor's guidance also made the importance of everyday experimental practice more tangible for our team.\n\nThese experiences complement our material testing. Adhesion experiments, underwater-condition observations, PBS mass-change measurements, and L929 assessments help us explore the material's potential. More detailed characterization and application-specific evaluation will help us decide how that potential can be developed responsibly.\n\n**The central outcome of this Human Practices work was a broader approach to safety: one that follows Carbotex from the production strain to the final adhesive, while keeping laboratory practice and intended use in view.**\n\nThis approach also connects with the manufacturing discussion in Section 3.3. As we improve production efficiency and explore applications that benefit from the distinctive properties of PMA-DA, material quality and safety will remain part of our design decisions.",
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
            kind: "markdown",
            value:
              "We will continue developing Carbotex as a route from agricultural residues to functional bio-based adhesives. Future progress will depend not only on material performance and production efficiency, but also on how well we understand and manage the associated risks.\n\nFor the engineered production strain, our priorities include maintaining clear genetic records and refining biosafety assessment around the strain and laboratory procedures actually used.\n\nFor PMA-DA preparation, we will examine the removal of microbial components and functionalization-related residues, alongside improvements in purification efficiency and material recovery.\n\nFor future applications, we plan to build on our adhesion, underwater-condition, PBS, and L929 experiments with more systematic assessments of stability, material composition, and biological responses under relevant conditions.\n\nWe will also continue to value laboratory safety education, drawing on in-person guidance, virtual simulation resources, and routine operating practices.\n\n**Our goal is to develop not only a promising adhesive, but also a responsible pathway for producing, evaluating, and eventually using it.**\n\nFor Carbotex, responsible innovation means taking each stage of the process seriously—from the genetic design of the production strain to the way the final material may interact with its environment.",
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
        kind: "markdown",
        value:
          "*Sharing Ideas, Building Connections, Creating Together*\n\nCarbotex did not grow within the laboratory alone.\n\nFrom our first project discussions to strain engineering, PMA production, and adhesive development, we kept exchanging ideas with fellow iGEM teams, researchers, and people from different backgrounds. Presenting our work gave us opportunities to hear questions we had not considered, learn how other teams approached their challenges, and build relationships that continued beyond a single event.\n\nThese exchanges served different purposes. Some informed our technical decisions; others introduced new approaches to Human Practices, supported peer learning, or developed into collaborative public engagement. Together, they gave Carbotex a place within a wider community of people exploring what synthetic biology can contribute.",
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
            kind: "markdown",
            value:
              "Our connection with OUC-China began when both teams were newly formed.\n\nAs two iGEM teams from Ocean University of China, OUC-Haide and OUC-China met early in the season to introduce our projects, exchange initial plans, and discuss the challenges of building an iGEM team. Although we had chosen different research topics, we shared a desire to turn what we had learned into meaningful synthetic biology projects.\n\nWe continued that contact as the season progressed.",
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
            kind: "markdown",
            value:
              "Together with OUC-China, we later traveled to Tianjin to exchange ideas with students and researchers from Nankai University and Tianjin University. Through project discussions and laboratory visits, we learned about different research environments, facilities, and approaches to organizing experimental work.\n\nThese meetings extended our conversations beyond our home university. We shared progress and practical experiences while listening to how other teams approached their projects. Communication channels established through the exchange also provided opportunities to stay in touch and continue sharing questions during the season.",
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
            kind: "markdown",
            value:
              "Our connection continued through OUC-China's subsequent recruitment activities, where we exchanged experiences of participating in iGEM with prospective new members.",
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
            kind: "markdown",
            value:
              "From our first conversation to visits and later activities, OUC-China became a valued peer team throughout the season. This experience reminded us that iGEM is not only about completing our own project, but also about supporting one another through a shared scientific journey.",
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
            kind: "markdown",
            value:
              "As Carbotex's technical strategy took shape, we wanted to share it beyond our own team and hear how other researchers and iGEMers understood our work.\n\nIn 2026, we attended the 13th Conference of China iGEMer Community (CCiC), hosted at Dalian University of Technology, together with the Synbiopunk activities held during the event.\n\nThrough poster discussions, project presentations, and informal conversations, we introduced our approach: using straw-derived carbon for microbial PMA production and developing the resulting polymer into a bio-based adhesive.\n\nThe conference brought us into contact with teams studying a wide range of applications of synthetic biology. Talking with people who did not share our immediate research background helped us recognize which parts of Carbotex's story were clear and which needed a stronger connection between modules.",
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
            kind: "markdown",
            value:
              "During project evaluation, judges noted that Carbotex brought together genetic engineering, modeling, fermentation, and material development, but that the relationships among these components could be communicated more clearly. They encouraged us to use the **Design–Build–Test–Learn (DBTL)** framework to show how experimental findings and analysis could inform subsequent design.\n\nThis feedback helped us rethink how to present the project as an interconnected engineering process rather than a collection of separate results. It also drew our attention to the importance of making feedback between design, testing, and learning visible in the Wiki.",
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
            kind: "markdown",
            value:
              "We also spoke with Dr. Haotian Guo about the development of PMA-based adhesives. This exchange helped us consider PMA as a platform for functional material design, rather than simply a fermentation product. Its contribution to our material-development thinking is discussed in the earlier sections of our Integrated Human Practices.",
          },
          {
            kind: "label",
            text: "An Encounter That Became a Collaboration: QingdaoAcademy",
          },
          {
            kind: "markdown",
            value:
              "CCiC was also where we met **QingdaoAcademy**, a high-school iGEM team from Qingdao.\n\nWe introduced our projects to each other and shared our experiences of joining iGEM. That first meeting established a connection between two teams working independently but interested in making synthetic biology accessible to more young people.\n\nAs we stayed in touch, we discovered a shared interest in making science communication more engaging and participatory. **The encounter at CCiC eventually became the starting point for a public-engagement activity that we designed and delivered together.**\n\nWe return to that collaboration in Section 4.5.",
          },
          {
            kind: "label",
            text: "Learning from Team-Led Discussions",
          },
          {
            kind: "markdown",
            value:
              "At CCiC, we also joined Unconference activities hosted by other iGEM teams.",
          },
          {
            kind: "anchor",
            id: "ihp-collab-dut-china",
            label: "DUT-China commercialization discussion",
          },
          {
            kind: "markdown",
            value:
              "DUT-China organized a discussion on commercialization and startup incubation. Our conversations about manufacturing scale, production costs, and real user needs motivated the preliminary PMA-DA cost analysis described in **Section 3.3, Exploring Application and Commercial Potential**.",
          },
          {
            kind: "anchor",
            id: "ihp-collab-jlu-fbh",
            label: "JLU-FBH From Teams, For Teams roundtable",
          },
          {
            kind: "markdown",
            value:
              'We also participated in JLU-FBH\'s **"From Teams, For Teams"** roundtable, where teams exchanged experiences of project development, team organization, and Human Practices.',
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
            kind: "markdown",
            value:
              "[View our commercialization discussion notes](https://static.igem.wiki/teams/6147/wiki/igem-discussion-notes.pdf)\n\nAt the Synbiopunk event, our team also received **second place in the popularity award**. We appreciated this encouragement from the iGEM community, alongside the conversations and new friendships that made the event memorable.",
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
            kind: "markdown",
            value:
              "Looking back, some of the most valuable outcomes of CCiC continued well beyond the conference. Judges' questions sharpened our project narrative, commercialization discussions led to further analysis, and a chance meeting with another team eventually developed into joint outreach.",
          },
          {
            kind: "label",
            text: "Grand APiC: Engaging with Broader Perspectives",
          },
          {
            kind: "markdown",
            value:
              "We also presented Carbotex at Grand APiC, where we met iGEM teams, researchers, and participants from different professional backgrounds.\n\nThrough poster sessions and conversations, we introduced our project and learned how others approached the scientific and practical questions surrounding synthetic biology.",
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
            kind: "markdown",
            value:
              "A discussion with judges raised questions about biosafety and horizontal gene transfer (HGT). This feedback prompted us to revisit the genetic-element management of our engineered A08 strain and the responsibilities involved in preparing a final adhesive material. We examine this response in **Section 3.4, From Biosafety to Product Responsibility**.\n\nOther discussions with industry-related participants gave us further opportunities to consider the relationship between synthetic biology research and practical manufacturing.",
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
            kind: "markdown",
            value:
              "CCiC and Grand APiC gave Carbotex a wider audience and exposed us to questions from people with different priorities. Together, they strengthened our understanding that research must be communicated and evaluated from more than one perspective.",
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
            kind: "markdown",
            value:
              'We participated in **"People in the World of SynBio — 2026 US-China iGEM Human Practices Summit,"** a virtual event hosted by Peking University and Rice University from July to August 2026.\n\nThe summit brought together iGEM teams from China and other countries to introduce their projects, share their Human Practices experiences, and exchange different approaches to connecting synthetic biology with society.\n\nThrough online presentations and discussions, we learned how different teams explored the social dimensions of their projects, engaged with stakeholders, and reflected on the challenges they encountered.',
          },
          {
            kind: "anchor",
            id: "ihp-collab-princeton",
            label: "Princeton University Human Practices case",
          },
          {
            kind: "markdown",
            value:
              "Among the presentations, Princeton University's team shared how expert engagement could help teams reconsider project assumptions and inform design decisions. Nankai University's team introduced its approach to incorporating different stakeholder perspectives into research and communication.\n\nFor Carbotex, the summit provided an opportunity to learn from the experiences of other teams and reflect on our own Human Practices approach. It reminded us that meaningful engagement is not defined simply by the number of activities conducted, but by how carefully teams listen, interpret feedback, and connect what they learn to their projects.",
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
            kind: "markdown",
            value:
              "We also prepared a presentation to organize and share the outcomes of this international learning experience. It serves as a record of the exchange and a resource for revisiting the Human Practices approaches discussed during the summit.\n\n[**View Our International Human Practices Summit Presentation (PDF)**](https://static.igem.wiki/teams/6147/wiki/ouc-haide-1.pdf)\n\nAlthough the participating teams explored different scientific questions, the summit highlighted a shared interest in connecting synthetic biology with people and society. Learning from their experiences encouraged us to reflect more carefully on how we document and communicate our own Human Practices activities.\n\nOther examples emphasized public trust, meaningful participation, and communication with audiences of different backgrounds. Seeing these varied approaches reminded us that there is no single template for Human Practices. Teams need to choose methods suited to their projects and the people they hope to engage.\n\nFor Carbotex, a particularly useful lesson was the importance of connecting what stakeholders say with the decisions and actions that follow. It encouraged us to revisit how we document expert consultations, project feedback, application analysis, and public engagement within our own Human Practices.",
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
            kind: "markdown",
            value:
              "Carbotex began with agricultural straw. As our project developed, we gradually broadened our perspective from a particular feedstock to the renewable carbon it contains and the different ways that carbon may enter useful products.\n\nThrough research visits and exchanges associated with the **Qingdao Institute of Bioenergy and Bioprocess Technology (QIBEBT)**, we encountered work related to lignocellulosic conversion, synthetic biology, and green biomanufacturing. Research themes discussed in the journal *Green Carbon*, including renewable carbon resources and their transformation, also provided a broader context for our project [citation](#ref-KeAi2026GreenCarbon).\n\nThese were opportunities to learn about relevant research directions, rather than claims that the journal itself provided direct technical guidance to Carbotex.",
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
            kind: "markdown",
            value:
              "We had originally approached the project with a simple question: how could we make better use of agricultural straw? These exchanges encouraged us to view straw as part of a wider agricultural and carbon-resource system.\n\nCrop residues already serve several established purposes. Our ambition is not to replace those pathways indiscriminately, but to investigate whether suitable biomass resources could support an additional route toward functional materials.\n\nFrom straw-derived sugars to microbial PMA production and eventually adhesive development, Carbotex explores one possible connection between renewable carbon and biological manufacturing.\n\n**We started with straw, but our conversations helped us understand the project through the broader lens of renewable carbon.**",
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
            kind: "markdown",
            value:
              'After meeting QingdaoAcademy at CCiC, we stayed in contact and began discussing how the two teams could collaborate on synthetic biology outreach.\n\nOur team members came from different educational backgrounds, but we shared an interest in helping younger audiences participate actively in science rather than simply listening to a presentation.\n\nWe began with a question:\n\n**What if participants could become investigators in a scientific story, instead of remaining passive listeners?**\n\nThis idea developed into an immersive synthetic biology activity that we jointly designed and delivered: **"17 C: The Fatal Experiment."**\n\nThe activity integrated scientific concepts into an investigative storyline. Participants followed clues, considered evidence, discussed possibilities, and made decisions as they explored ideas connected with biological technology.\n\nBy inviting participants into the story, we turned synthetic biology into something they could actively question and explore.',
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
            kind: "markdown",
            value:
              "The collaboration also changed our own experience of science communication. Participants' questions, interpretations of clues, and discussions gave us opportunities to see how people with different backgrounds approached the material.\n\nFor the two teams, designing and carrying out the event required continued communication, coordination, and problem-solving. What started as a chance meeting became a shared public-engagement project.\n\n**We met at CCiC as two independent teams, and later came together again as co-creators.**",
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
            kind: "markdown",
            value:
              "As Carbotex's research became more technically detailed, the vocabulary we used to explain it also grew more specialized: lignocellulose, carbon utilization, genetic regulation, fermentation, PMA, and dopamine functionalization.\n\nThese terms matter for scientific accuracy, but they are not always the easiest way to introduce a project to people outside the field.\n\nWe therefore explored a different form of communication: music.\n\nInspired by the ideas behind Carbotex, we created an original song to tell the story of starting with agricultural straw and exploring the possibilities of renewable carbon and biomanufacturing through lyrics and melody.\n\nDuring its development, we sought professional artistic advice from **Professor Ning Yan** at Ocean University of China and used this feedback to refine how the piece was expressed and presented.",
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
            kind: "markdown",
            value:
              "**Original song lyrics (PDF):** [*Amber Dreams in the Wheat Field* — Read the full lyrics](https://static.igem.wiki/teams/6147/wiki/amber-dreams-in-the-wheat-field.pdf)",
          },
          {
            kind: "markdown",
            value:
              "Unlike a scientific presentation, music does not need to explain every pathway or experimental result. It can introduce the motivation and human side of research through rhythm, emotion, and storytelling, encouraging audiences to ask questions and learn more.\n\nThis experience reminded us to choose communication methods that fit different audiences. Technical discussions depend on accurate evidence, while creative forms of expression can make scientific ideas more approachable.\n\n**Our original song did not change the engineered strain or adhesive material. It gave Carbotex another way to connect with the public.**",
          },
        ],
      },
      {
        id: "ihp-what-returned",
        title: "What Returned With Us",
        parts: [
          {
            kind: "markdown",
            value:
              "Looking back over these exchanges, we see that each contributed something different to Carbotex.\n\nOUC-China and other university peers showed us the value of sustained support and cross-university conversation. CCiC and Grand APiC brought our project into contact with questions from different audiences. The international Human Practices summit introduced diverse ways of connecting stakeholder engagement with research and left us with a presentation that we could share and revisit.\n\nResearch exchanges concerning renewable carbon expanded how we understood our feedstock. Working with QingdaoAcademy brought us from discussion into genuine co-creation. Our original song opened another route for communicating science through art.\n\nSome exchanges informed project decisions, others built relationships, and still others helped us find ways to reach the public. We value these different outcomes for what they actually contributed.\n\n**Human Practices is not only about bringing outside perspectives back into a project. It is also about joining a wider community, sharing what we have learned, and creating opportunities to learn and build together.**\n\nCarbotex's experimental research is carried out by our team, but its development has been enriched by the people and communities we have met along the way.",
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
        kind: "markdown",
        value:
          "*What Human Practices Changed — and Where Carbotex Goes Next*\n\nCarbotex began with a question about the carbon stored in agricultural straw. Could this renewable resource become the starting point for a new biological manufacturing pathway?\n\nAs our research developed, the question became more demanding. We needed to understand which straw resources were realistically available, how microorganisms could make better use of the resulting sugars, how that carbon could be directed toward PMA, and what it would take to turn PMA into a material worth using.\n\nThe answers did not come from laboratory experiments alone. They developed through conversations with agricultural stakeholders, researchers, industry professionals, other iGEM teams, and people who approached our project from outside our immediate field.\n\n**Human Practices helped us change not only how we explained Carbotex, but also what we asked of the project itself.**",
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
            kind: "markdown",
            value:
              "Looking back, we can identify five important shifts in our thinking and development.",
          },
          {
            kind: "reflection-cards",
          },
          {
            kind: "markdown",
            value:
              "These were not five isolated decisions. They connected the beginning of our project to its intended outcome: **which carbon we use, how we engineer its conversion, what we make from it, and how we evaluate the consequences of making it.**\n\nOur wider community activities contributed in different ways. Exchanges with OUC-China and other teams created opportunities for continued peer learning; the international Human Practices summit helped us compare approaches to stakeholder engagement; our collaboration with QingdaoAcademy developed into a jointly created science-communication activity; and our original song gave Carbotex a different way to reach audiences beyond the laboratory.\n\nNot every conversation changed an experiment, nor did it need to. Some helped us make a technical decision; others challenged an assumption, built a relationship, or made our research easier for others to engage with. Being clear about those differences is part of what made our Human Practices more meaningful.",
          },
        ],
      },
      {
        id: "ihp-reflection-4",
        title: "5.2 What Remains Unresolved",
        parts: [
          {
            kind: "markdown",
            value:
              "The changes described above have given Carbotex a stronger direction, but moving from a laboratory adhesive to a useful product will require another round of evidence and engagement.",
          },
          {
            kind: "unresolved-cards",
          },
          {
            kind: "markdown",
            value:
              "These priorities are connected. A future user may value wet-environment adhesion, for example, but the appropriate product design will also depend on reliable production, material quality, safety requirements, and acceptable cost. Addressing any one of these factors in isolation would provide only part of the answer.",
          },
        ],
      },
      {
        id: "ihp-reflection-3",
        title: "Carrying TRACE Forward",
        parts: [
          {
            kind: "markdown",
            value:
              "Throughout our work, **TRACE — Trigger, Reach Out, Analyze, Change, and Evaluate** — became more than a structure for documenting activities.\n\nIt helped us ask whether an interaction had actually entered the project. What question prompted us to seek another perspective? What did we hear? How did we interpret it alongside our experimental evidence? What changed in our thinking or work? And what would we need to evaluate next?\n\nThat process was rarely a straight line. New results led to new questions, some discussions called for follow-up, and not every promising idea was ready to become an engineering decision. The value of TRACE was that it encouraged us to make these connections visible.\n\nTo make this approach accessible beyond our own team, we have also made our current [TRACE Handbook (PDF)](https://static.igem.wiki/teams/6147/wiki/trace-20handbook.pdf) available. We will continue refining the handbook as our Human Practices work develops.\n\n**Carbotex started by asking what else agricultural straw could become. Human Practices taught us to ask a second question: what would make that transformation useful, responsible, and worth pursuing?**\n\nAs we continue to develop the material, that question will remain part of our design process — from the carbon source to the engineered microorganism, from PMA to PMA-DA, and from laboratory performance toward real application.",
          },
        ],
      },
    ],
  },
];
