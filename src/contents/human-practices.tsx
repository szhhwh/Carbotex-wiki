import {
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { Cite } from "../components/article/References";
import { Figure } from "../components/media/Figure";
import { ImageGallery } from "../components/media/ImageGallery";
import { ImageCarousel } from "../components/media/ImageCarousel";
import {
  StakeholderNavigator,
  type StakeholderGroup,
} from "../components/human-practices/StakeholderNavigator";
import { HandbookResource } from "../components/human-practices/HandbookResource";
import styles from "./human-practices.module.css";

// Content and stakeholder summaries supplied in received/IHP初.zip.
const stakeholderGroups: StakeholderGroup[] = [
  {
    title: "FEEDSTOCK",
    description: "Understanding straw in the real agricultural system",
    stakeholders: [
      {
        name: "Local Agriculture & Rural Affairs Authority",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/01-feedstock-local-authority.avif",
        identity:
          "Local Government Authority · Agricultural Resource Management",
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
          "https://static.igem.wiki/teams/6147/wiki/02-feedstock-farmers-cooperative.avif",
        identity: "Straw Producers & Local Supply Stakeholders",
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
          "https://static.igem.wiki/teams/6147/wiki/03-feedstock-agricultural-expert.avif",
        identity: "Agricultural Production & Feedstock Stakeholders",
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
    flow: "Regional Utilization → Practical Supply → Feedstock Characteristics",
  },
  {
    title: "BIOLOGICAL SYSTEM",
    description: "Following carbon from straw to poly(malic acid) (PMA)",
    stakeholders: [
      {
        name: "Prof. Guanglei Liu",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/04-bio-guanglei-liu.avif",
        identity:
          "Professor · Biomanufacturing & Metabolic Pathway Perspective",
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
          "https://static.igem.wiki/teams/6147/wiki/05-bio-yajun-liu.avif",
        identity: "Project Advisor · Straw Hydrolysate & Biomanufacturing",
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
        portrait: "https://static.igem.wiki/teams/6147/wiki/06-bio-le-yu.avif",
        identity: "Researcher · Carbon Utilization & Resource Efficiency",
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
      {
        name: "Dr. Nan Hao",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/07-bio-nan-hao.avif",
        identity: "Researcher · Microbial Carbon Source Regulation",
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
        portrait: "https://static.igem.wiki/teams/6147/wiki/08-bio-tao-ma.avif",
        identity: "Researcher · Regulatory Engineering Strategy",
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
          "https://static.igem.wiki/teams/6147/wiki/09-bio-qilin-yu.avif",
        identity: "Professor · Functional Validation Perspective",
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
          "https://static.igem.wiki/teams/6147/wiki/10-bio-weihui-wu.avif",
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
    flow: "Carbon Destination → Real Hydrolysate → Xylose → Regulation → Regulatory Targets → Functional Validation → Carbon Allocation",
  },
  {
    title: "MATERIAL & APPLICATION",
    description: "Turning PMA from a fermentation product into a material",
    stakeholders: [
      {
        name: "Liu Ya",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/11-material-liu-ya.avif",
        identity:
          "Materials Perspective · Polymer Structure & Material Development",
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
          "https://static.igem.wiki/teams/6147/wiki/12-material-haotian-guo.avif",
        identity:
          "Founder & Chief Executive Officer (CEO), Ailurus Bio · Synthetic Biology Researcher & Entrepreneur",
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
          "https://static.igem.wiki/teams/6147/wiki/13-material-bright-moon-seaweed.avif",
        identity: "Natural Polymer & Marine Biomaterials Company",
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
          "https://static.igem.wiki/teams/6147/wiki/14-material-yanni-yang.avif",
        identity:
          "Deputy General Manager · Marine Biological Attachment Perspective",
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
    flow: "PMA → Material Platform → Material Design → Functionalization → Performance Evidence",
  },
  {
    title: "BEYOND THE LABORATORY",
    description: "Asking what responsible implementation would require",
    stakeholders: [
      {
        name: "Eva",
        portrait: "https://static.igem.wiki/teams/6147/wiki/15-beyond-eva.avif",
        identity:
          "Sustainability Expert · System Level Sustainability Perspective",
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
          "https://static.igem.wiki/teams/6147/wiki/16-tsingtao-brewery.avif",
        identity:
          "Industrial Fermentation Company · Large Scale Production Perspective",
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
          "https://static.igem.wiki/teams/6147/wiki/17-kinger-robot.avif",
        identity: "Automation & Process Equipment Company",
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
        portrait: "https://static.igem.wiki/teams/6147/wiki/18-bgi.avif",
        identity:
          "Biotechnology Organization · Data & Analytical Infrastructure Perspective",
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
          "https://static.igem.wiki/teams/6147/wiki/19-shenzhen-synthetic-biology-infrastructure.avif",
        identity: "Large Scale Synthetic Biology Research Infrastructure",
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
        portrait: "https://static.igem.wiki/teams/6147/wiki/20-qibebt.avif",
        identity:
          "Research Institute · Renewable Carbon & Biomanufacturing Perspective",
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
    title: "CROSS-STAGE FEEDBACK",
    description: "Feedback that changed how we worked",
    stakeholders: [
      {
        name: "Conference of China iGEMer Community (CCiC) Judges",
        portrait:
          "https://static.igem.wiki/teams/6147/wiki/21-ccic-judges.avif",
        identity: "iGEM Community Reviewers · Project Integration Perspective",
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
          "https://static.igem.wiki/teams/6147/wiki/22-grand-apic-judges.avif",
        identity:
          "iGEM Community Reviewers · Biosafety & Responsible Implementation Perspective",
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

const sections: ArticleSection[] = [
  {
    id: "ihp-overview-section",
    title: "Overview",
    content: (
      <>
        <blockquote>
          <p>
            <em>
              {
                "“Studying alone without peers for discussion renders one shallow and ill-informed.”"
              }
            </em>
          </p>
          <p>
            {"— "}
            <em>{"The Book of Rites"}</em>
          </p>
        </blockquote>
      </>
    ),
    subsections: [
      {
        id: "ihp-overview",
        title: "1.1 Integrated Human Practices (IHP) at Carbotex",
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
            <h3>
              <strong>{"Five Decisions Human Practices Changed"}</strong>
            </h3>
            <p>
              {
                "Human Practices did not simply validate Carbotex. Across the project, it changed several of the questions we asked and the decisions we made. The five shifts below summarize the strongest examples; each is developed through the TRACE cases that follow."
              }
            </p>
            <ul className={styles.decisions}>
              <li>
                <p>
                  <strong>
                    {
                      "Feedstock — Abundant straw → practically available feedstock."
                    }
                  </strong>
                  {
                    " Engagement with local agricultural stakeholders made us distinguish regional straw abundance from the fraction that could realistically be collected, stored, transported, and used. "
                  }
                  <a href="#ihp-local-authority">
                    {"Explore the Feedstock TRACE ↓"}
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    {
                      "Carbon utilization — A metabolic bottleneck → a regulatory question."
                    }
                  </strong>
                  {
                    " Researcher feedback shifted our attention from individual metabolic steps toward upstream regulation of mixed-sugar utilization. "
                  }
                  <a href="#ihp-nan-hao">
                    {"Explore the regulatory-engineering TRACE ↓"}
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    {"Carbon flow — More uptake → where the carbon goes."}
                  </strong>
                  {
                    " We stopped treating improved substrate consumption as equivalent to improved PMA production and began considering carbon allocation and precursor supply. "
                  }
                  <a href="#ihp-weihui-wu">
                    {"Explore the carbon-flow TRACE ↓"}
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    {
                      "Material design — A fermentation product → a functionalizable material platform."
                    }
                  </strong>
                  {
                    " Stakeholder input pushed us beyond simply producing PMA toward asking how its chemistry could support downstream material design and independent performance evaluation. "
                  }
                  <a href="#ihp-liu-ya">{"Explore the material TRACE ↓"}</a>
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    {
                      "Responsible implementation — Renewable ≠ automatically sustainable."
                    }
                  </strong>
                  {
                    " Sustainability, scale-up, and biosafety became questions to evaluate rather than benefits to assume. "
                  }
                  <a href="#ihp-eva">{"Explore the sustainability TRACE ↓"}</a>
                </p>
              </li>
            </ul>
            <p>
              {
                "These pivots are not a ranking of our stakeholders. They are a compact view of where engagement most clearly entered the project as a decision, experiment, evaluation criterion, or limitation."
              }
            </p>
          </>
        ),
      },
      {
        id: "ihp-approach",
        title: "1.2 Our Approach",
        content: (
          <>
            <p>
              <strong>
                <em>{"TRACE Framework:"}</em>
              </strong>
              {" To make this process systematic, we developed "}
              <strong>
                {"TRACE (Trigger, Reach Out, Analyze, Change, and Evaluate)"}
              </strong>
              {
                ". TRACE allowed us to connect stakeholder engagement directly with project decisions and to keep Human Practices embedded throughout the DBTL cycle, rather than treating it as a collection of separate interviews."
              }
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/trace.avif"
              alt="TRACE framework showing Trigger, Reach Out, Analyze, Change, and Evaluate in relation to the Carbotex DBTL process."
              intrinsicWidth={796}
              intrinsicHeight={714}
              caption={
                "Figure 1. TRACE framework linking stakeholder engagement with the Carbotex DBTL cycle."
              }
            />
            <p>
              <strong>
                <em>{"Stakeholder Matrix:"}</em>
              </strong>
              {" We identified potential stakeholders through team "}
              <strong>{"brainstorming"}</strong>
              {
                " and grouped them within the Carbotex ecosystem. Each group was then assessed by "
              }
              <strong>{"Affectedness, Influence, and Expertise,"}</strong>
              {
                " helping us prioritize meaningful engagement throughout the project."
              }
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp-2.avif"
              alt="OUC-Haide team members brainstorming and organizing stakeholders for the Carbotex Stakeholder Matrix."
              ratio="4 / 3"
              caption={
                "Figure 2. Team brainstorming for the Carbotex Stakeholder Matrix."
              }
            />
            <p>
              <strong>
                <em>{"Stakeholder Ecosystem Map:"}</em>
              </strong>
              {" We further visualized our identified stakeholders in a "}
              <strong>{"Stakeholder Ecosystem Map"}</strong>
              {
                ", providing an at-a-glance view of how they connect to Carbotex and where their perspectives contribute across the project. The map also served as a guide for navigating our subsequent IHP journey."
              }
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/stakeholder-map.avif"
              alt="Stakeholder Ecosystem Map showing six stages of the Carbotex IHP journey and the stakeholders engaged at each stage."
              intrinsicWidth={4000}
              intrinsicHeight={2331}
              caption={
                "Figure 3. Carbotex Stakeholder Ecosystem Map. Stakeholders are organized across six stages of our IHP journey—from reframing the challenge and building the biological system to carbon-utilization optimization, material and application development, responsible implementation, and communication with the wider community. Repeated stakeholders indicate cross-stage contributions where the corresponding engagement informed more than one part of Carbotex."
              }
            />
            <h3>
              <strong>{"Our Integrated Human Practices Journey"}</strong>
            </h3>
            <p>
              {
                "Our Human Practices developed as a continuous process rather than a series of isolated engagements. The roadmap below summarizes how stakeholder mapping and TRACE-guided engagement moved into project decisions, implementation, reflection, unresolved limitations, and finally a reusable TRACE Handbook."
              }
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/integrated-human-practices-journey.avif"
              alt="Integrated Human Practices Journey"
              intrinsicWidth={2166}
              intrinsicHeight={726}
              captionPrefix="Figure."
              caption={
                <>
                  <strong>Integrated Human Practices Journey.</strong> This is a
                  visual roadmap of the page rather than a second Human
                  Practices framework. TRACE remains the method we used to
                  connect stakeholder engagement with project decisions.
                </>
              }
            />
          </>
        ),
      },
    ],
  },
  {
    id: "ihp-journey",
    title: "Our IHP Journey",
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
        <h3>Stakeholder Navigator</h3>
        <StakeholderNavigator groups={stakeholderGroups} />
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
    subsections: [
      {
        id: "ihp-beginning",
        title: "2.0 Where It Began",
        content: (
          <>
            <p>
              {"Carbotex began with our observation of "}
              <strong>{"straw burning"}</strong>
              {
                ". Since straw contains a substantial amount of usable carbon, we started with a simple question: "
              }
              <strong>
                {
                  "why is part of this agricultural resource still being directly burned?"
                }
              </strong>
            </p>
            <p>
              {
                "We then investigated the issue from both global and Chinese perspectives. Gradually, we realized that straw is not simply a “waste” waiting to be utilized. Instead, it already enters multiple pathways, including field retention, animal feed, and other off-field uses, while the trade-offs among these pathways can vary considerably at the local level. In China, official 2024 data reported that more than 88% of collectable crop straw was comprehensively utilized, while raw-material utilization accounted for only 0.7% "
              }
              <Cite k={["MARA2025Straw"]} />
              {"."}
            </p>
            <p>
              {
                "**This shifted our focus from simply increasing straw utilization to asking how the carbon contained in straw could be effectively converted through biomanufacturing. Research on lignocellulosic biorefineries suggested a possible route by using straw as a renewable carbon feedstock for microbial production "
              }
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
      {
        id: "ihp-feedstock",
        title: "2.1 Understanding the Problem & Feedstock",
        content: (
          <>
            <p>
              {
                "Our preliminary research showed that crop straw is already widely used for purposes such as field return and animal feed, while raw-material utilization remains a small share of the national utilization structure "
              }
              <Cite k={["MARA2025Straw"]} />
              {
                ". Rather than replacing these existing uses, Carbotex aims to connect suitable agricultural carbon streams with biomanufacturing, offering a renewable feedstock perspective for sustainable production."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"T — Trigger"}</strong>
            </h5>
            <p>
              {
                "Abundant resources do not necessarily mean that all straw is suitable as a biomanufacturing feedstock. Macro-level data helped us understand the overall utilization landscape, but identifying appropriate feedstock for Carbotex required us to answer more practical questions:"
              }
            </p>
            <p>
              {
                "How is straw currently used ? Can it be obtained reliably in practice? Are different straw sources equally suitable as feedstock?"
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"R — Reach Out"}</strong>
            </h5>
            <span id="ihp-local-authority" className={styles.storyAnchor} />
            <p>
              <em>{"Local Agriculture & Rural Affairs Authority"}</em>
            </p>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-local-authority-01.avif",
                  alt: "Local stakeholder visit during the feedstock Reach Out stage.",
                  ratio: "3 / 4",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-local-authority-02.avif",
                  alt: "Local stakeholder visit during the feedstock Reach Out stage.",
                  ratio: "3 / 4",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-local-authority-03.avif",
                  alt: "Local stakeholder visit during the feedstock Reach Out stage.",
                  ratio: "3 / 4",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Local authority visit on straw utilization and handling."
              caption={
                "Figure 4. Local authority visit on straw utilization and handling."
              }
              columns={3}
              mobileLayout="swipe"
            />
            <p>
              {
                "Global and national data could not fully represent local conditions. We therefore reached out to the local Agriculture & Rural Affairs authority to understand how straw is actually utilized locally."
              }
            </p>
            <p>
              {
                "We learned that while straw is widely used through established pathways, only a limited proportion enters industrial utilization."
              }
            </p>
            <p>
              <strong>
                {
                  "This led to a more practical question: Can suitable straw be reliably collected and supplied for biomanufacturing?"
                }
              </strong>
            </p>
            <span id="ihp-farmers-cooperative" className={styles.storyAnchor} />
            <p>
              <strong>
                <em>{"Farmers & Cooperative"}</em>
              </strong>
            </p>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-farmers-cooperative-01.avif",
                  alt: "Field engagement with farmers and cooperative stakeholders concerning straw collection, storage, and supply.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-farmers-cooperative-02.avif",
                  alt: "Field engagement with farmers and cooperative stakeholders concerning straw collection, storage, and supply.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-farmers-cooperative-03.avif",
                  alt: "Field engagement with farmers and cooperative stakeholders concerning straw collection, storage, and supply.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Farmer and cooperative engagement on straw collection, storage, and supply."
              caption={
                "Figure 5. Farmer and cooperative engagement on straw collection, storage, and supply."
              }
              columns={3}
              mobileLayout="swipe"
            />
            <p>
              {
                "To understand the practical availability of straw, we spoke with farmers and a cooperative about how straw is collected, stored, and supplied after harvest."
              }
            </p>
            <p>
              {
                "We learned that statistical abundance does not necessarily translate into reliable supply. Collection methods, storage conditions, transportation, and seasonality can all affect when and in what condition straw becomes available."
              }
            </p>
            <p>
              <strong>
                {
                  "This led us to look beyond availability itself and ask whether these real-world conditions could affect straw as a biomanufacturing feedstock."
                }
              </strong>
            </p>
            <span id="ihp-agricultural-expert" className={styles.storyAnchor} />
            <p>
              <strong>
                <em>{"Agricultural Expert & Planting Base"}</em>
              </strong>
            </p>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-agricultural-expert-planting-base-01.avif",
                  alt: "Planting-base and feedstock observations relevant to straw suitability.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-agricultural-expert-planting-base-02.avif",
                  alt: "Planting-base and feedstock observations relevant to straw suitability.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-agricultural-expert-planting-base-03.avif",
                  alt: "Planting-base and feedstock observations relevant to straw suitability.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Planting-base observations on straw sources, storage, and feedstock suitability."
              caption={
                "Figure 6. Planting-base observations on straw sources, storage, and feedstock suitability."
              }
              columns={3}
              mobileLayout="swipe"
            />
            <p>
              {
                "We therefore consulted an agricultural expert and visited a planting base to understand differences among straw sources from both feedstock and production perspectives."
              }
            </p>
            <p>
              {
                "We focused on factors including moisture content, impurities, storage stability, and supply characteristics. Our discussions and field observations showed that these properties can vary across straw sources and may affect subsequent storage, processing, and reliable entry into a biomanufacturing system."
              }
            </p>
            <p>
              {
                "At this point, we had developed a more complete understanding of straw feedstock from three perspectives: regional utilization, practical supply, and feedstock characteristics."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"A — Analyze"}</strong>
            </h5>
            <p>
              {
                "Bringing these perspectives together changed how we understood straw as a feedstock."
              }
            </p>
            <p>
              {
                "Regional abundance does not necessarily mean practical availability. Existing uses, collection, storage, and seasonal supply all influence whether straw can realistically enter a new biomanufacturing pathway."
              }
            </p>
            <p>
              <strong>
                {
                  "This made us realize that straw should not be treated simply as an abundant resource, but as a feedstock embedded in a real agricultural system."
                }
              </strong>
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"C — Change"}</strong>
            </h5>
            <p>
              {
                "We therefore adjusted the way we framed the feedstock side of Carbotex."
              }
            </p>
            <p>
              {
                "Rather than assuming that abundant straw could automatically be redirected to biomanufacturing, we began to distinguish "
              }
              <strong>
                {"resource potential from practical availability"}
              </strong>
              {
                " and avoided treating all straw as equally accessible to our system."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"E — Evaluate"}</strong>
            </h5>
            <p>
              {
                "This stage also revealed a limitation in our work. Although stakeholder engagement helped us identify factors that may affect straw availability, "
              }
              <strong>
                {
                  "we did not systematically quantify these factors or establish a validated method for selecting suitable straw feedstocks."
                }
              </strong>
            </p>
            <p>
              <strong>
                {
                  "These findings gave us a more realistic understanding of straw supply, while also showing that feedstock selection involves factors beyond the scope of our current project. This prompted us to focus on a question we could address through biological design:"
                }
              </strong>
            </p>
            <p>
              <strong>
                {
                  "How can the carbon contained in straw be effectively utilized by our biological system?"
                }
              </strong>
            </p>
          </>
        ),
      },
      {
        id: "ihp-biological-system",
        title: "2.2 Building the Biological System",
        content: (
          <>
            <p>
              {
                "Through the previous stage, we developed a clearer understanding of straw-derived carbon as the starting point of Carbotex. The next question was therefore:"
              }
            </p>
            <p>
              <strong>
                {
                  "How can this carbon actually be converted into a target product through biomanufacturing?"
                }
              </strong>
            </p>
            <p>
              {
                "So we shifted our focus from the feedstock itself to the biological system."
              }
            </p>
            <h4>
              <strong>
                <em>{"Defining the Carbon Destination"}</em>
              </strong>
            </h4>
            <h5 className={styles.traceStage}>
              <strong>{"T — Trigger"}</strong>
            </h5>
            <p>
              {
                "Once straw-derived carbon became a potential feedstock for biomanufacturing, we first needed to decide: "
              }
              <strong>{"What should this carbon ultimately become?"}</strong>
            </p>
            <p>
              {
                "Because the target product would shape chassis selection, pathway design, and subsequent engineering, defining the product became our first biological design decision."
              }
            </p>
            <span id="ihp-guanglei-liu" className={styles.storyAnchor} />
            <p>
              <strong>
                {"R — Reach Out | Prof. Guanglei Liu / 刘光磊老师"}
              </strong>
            </p>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-guanglei-liu-01-project-planning.avif",
                  alt: "Online project-planning consultation with Prof. Guanglei Liu.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-guanglei-liu-02-online-discussion.avif",
                  alt: "Online discussion with Prof. Guanglei Liu and OUC-Haide team members.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Online consultation with Prof. Guanglei Liu on straw-derived carbon conversion."
              caption={
                "Figure 7. Online consultation with Prof. Guanglei Liu on straw-derived carbon conversion."
              }
              columns={2}
              mobileLayout="swipe"
            />
            <p>
              {
                "To determine the direction of straw-derived carbon conversion, we consulted Prof. Guanglei Liu. Prof. Liu encouraged us not to start from “choosing a chassis first and then finding what it can produce.” Instead, he suggested that we should consider the characteristics of agricultural carbon sources, the properties of target products, existing biological production foundations, and future applications before deciding where renewable carbon should ultimately flow."
              }
            </p>
            <p>
              {
                "Based on this perspective, we conducted further research. We found that PMA (poly(malic acid)) biosynthesis using "
              }
              <em>{"Aureobasidium"}</em>
              {" has been extensively studied "}
              <Cite k={["Chi2016PMLA"]} />
              {". Meanwhile, "}
              <em>{"Aureobasidium melanogenum"}</em>
              {
                " A08 was the PMA-producing candidate chassis available to our project , making it an important chassis choice for Carbotex."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"A — Analyze"}</strong>
            </h5>
            <p>
              {
                "Through this process, we gradually defined the initial biological design direction of Carbotex. We selected "
              }
              <strong>
                {"A08 as the candidate chassis and PMA as the target product"}
              </strong>
              {
                ", and further explored engineering strategies based on this direction."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"C — Change"}</strong>
            </h5>
            <p>
              {
                "Based on this understanding, the biological design goal of Carbotex became clearer: using A08 to convert available carbon derived from straw into PMA. However, this design still needed to be evaluated under realistic agricultural substrate conditions."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"E — Evaluate"}</strong>
            </h5>
            <p>
              <strong>
                {
                  "To address whether A08 could effectively utilize carbon from straw under realistic feedstock conditions, we shifted from simplified carbon source conditions to a mixed sugar system representative of straw hydrolysate. This allowed us to further investigate the challenge of mixed sugar utilization."
                }
              </strong>
            </p>
            <h4>
              <strong>
                <em>{"Revealing the Mixed-Sugar Challenge"}</em>
              </strong>
            </h4>
            <h5 className={styles.traceStage}>
              <strong>{"T — Trigger"}</strong>
            </h5>
            <p>
              <strong>
                {
                  "Single carbon sources can provide an initial understanding of microbial metabolism, but lignocellulosic hydrolysates contain mixed sugars that commonly include glucose and pentoses such as xylose "
                }
                <Cite k={["Francois2020"]} />
                {"."}
              </strong>
            </p>
            <p>
              <strong>
                {
                  "Can A08 effectively utilize the available carbon in this mixture and convert it into the target product?"
                }
              </strong>
            </p>
            <p>
              <strong>
                {
                  "Answering this question was essential to connecting agricultural carbon resources with biomanufacturing in Carbotex."
                }
              </strong>
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"R — Reach Out"}</strong>
            </h5>
            <span id="ihp-yajun-liu" className={styles.storyAnchor} />
            <h5>
              <strong>{"| Prof. Yajun Liu / 刘亚君老师"}</strong>
            </h5>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-yajun-liu-01-gallery.avif",
                  alt: "On-site consultation with Prof. Yajun Liu under realistic feedstock conditions.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-yajun-liu-02.avif",
                  alt: "Discussion and experimental context during consultation with Prof. Yajun Liu.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Consultation with Prof. Yajun Liu on realistic agricultural feedstock conditions."
              caption={
                "Figure 8. Consultation with Prof. Yajun Liu on realistic agricultural feedstock conditions."
              }
              columns={2}
              mobileLayout="swipe"
            />
            <p>
              {
                "To establish an experimental system that better reflects real agricultural feedstock conditions, we sought help from our advisor, Prof. Yajun Liu. Prof. Liu provided us with straw hydrolysate prepared by a collaborating laboratory using the CBS system . This allowed us to evaluate the carbon utilization capacity of A08 in a mixed sugar environment derived from real straw, rather than relying solely on idealized single sugar culture conditions."
              }
            </p>
            <p>
              {
                "The hydrolysate mainly contained glucose and xylose. Through subsequent experiments , we found that A08 utilized glucose efficiently, while its ability to utilize xylose was relatively limited."
              }
            </p>
            <p>
              {"This raised a new question: "}
              <strong>
                {
                  "Since glucose is more readily utilized by A08, could we simply accept that some xylose would not enter the downstream production process?"
                }
              </strong>
            </p>
            <span id="ihp-le-yu" className={styles.storyAnchor} />
            <h5>
              <strong>{"| Dr. Le Yu / 余乐"}</strong>
            </h5>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-le-yu-01-discussion.avif",
                  alt: "Discussion with Dr. Le Yu on xylose and substrate utilization.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-le-yu-02-group-photo.avif",
                  alt: "Group photo following consultation with Dr. Le Yu.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Discussion with Dr. Le Yu on xylose utilization and PMA production."
              caption={
                "Figure 9. Discussion with Dr. Le Yu on xylose utilization and PMA production."
              }
              columns={2}
              mobileLayout="swipe"
            />
            <p>
              {
                "We further sought advice from Yu Le. She reminded us that xylose should not be disregarded simply because A08 currently utilizes it less efficiently. We also needed to consider how xylose utilization might affect "
              }
              <strong>
                {"overall substrate utilization and subsequent PMA production"}
              </strong>
              {"."}
            </p>
            <p>
              {
                "Since xylose had already been released from the straw during hydrolysis, it represented an available fraction of the feedstock carbon. Leaving it largely unused would mean that part of the carbon released from the agricultural biomass did not proceed into downstream bioconversion."
              }
            </p>
            <p>
              {"From the perspective of "}
              <strong>
                {"resource efficiency and sustainable biomanufacturing"}
              </strong>
              {
                ", we therefore wanted to make better use of the available carbon already released from the feedstock rather than simply excluding xylose from our design."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"A — Analyze"}</strong>
            </h5>
            <p>
              {
                "Evaluation of the straw hydrolysate provided by Prof. Yajun Liu, together with Dr. Yu’s feedback, revealed an important limitation in our initial design. Although A08 could efficiently utilize glucose, its limited utilization of xylose meant that part of the available carbon in straw hydrolysate could not effectively enter the production process."
              }
            </p>
            <p>
              <strong>
                {
                  "Therefore, we identified improving xylose utilization as an important direction for enhancing the overall carbon utilization of Carbotex."
                }
              </strong>
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"C — Change"}</strong>
            </h5>
            <p>
              {"Therefore, we defined our new engineering goal as "}
              <strong>
                {"improving the xylose utilization capacity of A08"}
              </strong>
              {
                ". Through engineering strategies, we aimed to enhance its ability to utilize mixed sugars and enable as much straw derived carbon as possible to enter the subsequent bioconversion process."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"E — Evaluate"}</strong>
            </h5>
            <p>
              {
                "At this stage, our mixed-sugar experiments established the practical problem — A08 utilized xylose less effectively than glucose — but they did "
              }
              <strong>{"not"}</strong>
              {" identify the mechanism responsible for that limitation."}
            </p>
            <p>
              <strong>{"Evaluation status:"}</strong>
              {
                " the evidence justified xylose utilization as an engineering target, but it did not yet justify a specific intervention."
              }
            </p>
            <p>
              {"This boundary defined our next question: "}
              <strong>
                {
                  "Does the limitation arise mainly from an individual metabolic step, or from a broader regulatory response to xylose?"
                }
              </strong>
            </p>
            <h4>
              <strong>
                <em>{"From Metabolic Limitation to Regulatory Engineering"}</em>
              </strong>
            </h4>
            <h5 className={styles.traceStage}>
              <strong>{"T — Trigger"}</strong>
            </h5>
            <p>
              {
                "We had identified improving xylose utilization in A08 as an important direction for enhancing carbon utilization. However, defining this goal alone was not sufficient to guide our engineering strategy."
              }
            </p>
            <p>
              {
                "We still needed to understand which level of regulation should be targeted to improve xylose utilization in A08."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"R — Reach Out"}</strong>
            </h5>
            <span id="ihp-nan-hao" className={styles.storyAnchor} />
            <p>
              <em>{"Dr. Nan Hao / 郝楠博士"}</em>
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-nan-hao-01-discussion.avif"
              alt="Discussion with Dr. Nan Hao on A08 xylose utilization."
              ratio="4 / 3"
              caption={
                "Figure 10. Discussion with Dr. Nan Hao on regulatory control of xylose utilization."
              }
            />
            <p>
              {
                "To better understand the limited xylose utilization of A08, we discussed this issue with Dr. Nan Hao."
              }
            </p>
            <p>
              {
                "Initially, we approached the problem mainly from a metabolic perspective and hoped to identify a specific reaction that might constrain xylose conversion. Our discussion with Dr. Hao broadened this view. Carbon source utilization depends not only on individual metabolic enzymes, but also on how cells sense a carbon source and coordinate the expression of genes involved in its utilization."
              }
            </p>
            <p>
              {
                "This prompted us to consider whether the limited xylose utilization of A08 might also involve its regulatory response to xylose, rather than only the capacity of individual metabolic reactions."
              }
            </p>
            <span id="ihp-tao-ma" className={styles.storyAnchor} />
            <p>
              <em>{"Dr. Tao Ma / 马涛博士"}</em>
            </p>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-tao-ma-01-lab-discussion.avif",
                  alt: "Laboratory discussion with Dr. Tao Ma on regulatory engineering.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-tao-ma-02-group-photo.avif",
                  alt: "Group photo following discussion with Dr. Tao Ma.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Discussion with Dr. Tao Ma on regulatory engineering for xylose utilization."
              caption={
                "Figure 11. Discussion with Dr. Tao Ma on regulatory engineering for xylose utilization."
              }
              columns={2}
              mobileLayout="swipe"
            />
            <p>
              {
                "With this regulatory perspective in mind, we then discussed how to translate it into a practical engineering strategy with Dr. Tao Ma."
              }
            </p>
            <p>
              {
                "Because xylose utilization involves multiple metabolic and regulatory components, modifying many downstream genes individually would increase the complexity of our engineering design. Our discussion therefore encouraged us to focus on upstream regulatory nodes that could influence a broader set of processes associated with xylose utilization."
              }
            </p>
            <p>
              {
                "This gave us a clearer direction for identifying potential engineering targets."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"A — Analyze"}</strong>
            </h5>
            <p>
              {
                "Following these discussions, we combined literature research with our modeling analysis to evaluate potential regulatory targets."
              }
            </p>
            <p>
              {
                "Specifically, our model explored the relationship between different glucose and xylose ratios and AraR/XlnR overexpression, allowing us to examine how changes in these regulatory nodes might influence mixed sugar utilization before experimental testing."
              }
            </p>
            <p>
              {
                "Together with prior work showing that AraR and XlnR regulate fungal pentose-responsive gene expression, these analyses led us to focus on AraR and XlnR as potential regulatory targets "
              }
              <Cite k={["deSouza2013AraRXlnR"]} />
              {"."}
            </p>
            <p>
              {
                "Rather than modifying individual metabolic reactions separately, targeting these upstream regulators provided a strategy for influencing the broader cellular response associated with xylose utilization."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"C — Change"}</strong>
            </h5>
            <p>
              {
                "Based on this analysis, we incorporated AraR/XlnR overexpression into the engineering design of Carbotex."
              }
            </p>
            <p>
              {
                "Our goal was to strengthen the regulatory response associated with xylose utilization and improve the ability of A08 to utilize xylose under glucose and xylose mixed sugar conditions."
              }
            </p>
            <p>
              {
                "This marked a shift in our engineering strategy from focusing on individual metabolic reactions toward regulatory engineering of carbon utilization."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"E — Evaluate"}</strong>
            </h5>
            <p>
              {"The literature and modeling analysis supported "}
              <strong>{"AraR/XlnR as a testable regulatory strategy"}</strong>
              {
                ", but they did not demonstrate improved xylose utilization in our strain."
              }
            </p>
            <p>
              <strong>{"Evaluation status:"}</strong>
              {
                " target selection was supported at the design stage; functional improvement still required fermentation evidence."
              }
            </p>
            <p>
              {
                "We therefore moved from regulatory design to a direct experimental question: "
              }
              <strong>
                {
                  "Does AraR/XlnR engineering measurably improve xylose utilization under mixed-sugar conditions?"
                }
              </strong>
            </p>
            <h4>
              <strong>
                <em>
                  {"Turning Regulatory Engineering into Fermentation Evidence"}
                </em>
              </strong>
            </h4>
            <h5 className={styles.traceStage}>
              <strong>{"T — Trigger"}</strong>
            </h5>
            <p>
              {
                "Identifying AraR and XlnR gave us a clear engineering direction. However, successful genetic modification alone could not demonstrate that the limited xylose utilization of A08 had been addressed. This led to our next question: Does AraR/XlnR engineering actually improve xylose utilization under mixed sugar conditions?"
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"R — Reach Out"}</strong>
            </h5>
            <span id="ihp-qilin-yu" className={styles.storyAnchor} />
            <h5>
              <strong>{"| Prof. Qilin Yu / 喻其林教授"}</strong>
            </h5>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-qilin-yu-01-experimental-framework.avif"
              alt="Discussion with Prof. Qilin Yu on functional validation of the regulatory strategy."
              ratio="4 / 3"
              caption={
                "Figure 12. Discussion with Prof. Qilin Yu on functional validation of regulatory engineering."
              }
            />
            <p>
              {
                "To determine how this regulatory strategy should be evaluated, we discussed our experimental framework with Prof. Qilin Yu."
              }
            </p>
            <p>
              {
                "Prof. Yu encouraged us to distinguish genetic success from functional improvement. For Carbotex, the relevant question was not simply whether the modification had been introduced, but whether it changed carbon utilization and ultimately affected the production process."
              }
            </p>
            <p>
              {
                "We therefore began to consider validation across three connected levels:"
              }
            </p>
            <p>
              {"Genetic modification → Carbon utilization → Product formation"}
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"A — Analyze"}</strong>
            </h5>
            <p>
              {
                "This perspective helped us establish a clearer validation framework."
              }
            </p>
            <p>
              {
                "Rather than treating construct verification as the endpoint, we needed to follow the effect of AraR/XlnR engineering through the biological system:"
              }
            </p>
            <p>
              <strong>
                {
                  "Construct Verification → Carbon Source Utilization → Mixed Sugar Fermentation → PMA Evaluation"
                }
              </strong>
            </p>
            <p>
              {
                "This allowed us to assess whether a regulatory change could translate into a functional change relevant to Carbotex."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"C — Change"}</strong>
            </h5>
            <p>
              {
                "We therefore compared the engineered strains under glucose, xylose, and mixed sugar conditions, examining their carbon utilization and fermentation performance."
              }
            </p>
            <p>
              {
                "We then extended the evaluation to PMA production, allowing us to connect changes in xylose utilization with their downstream effect on the target product."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"E — Evaluate"}</strong>
            </h5>
            <p>
              {
                "This evaluation raised a further question. Even if more xylose could be utilized, the additional carbon entering metabolism would not necessarily be directed toward PMA synthesis."
              }
            </p>
            <p>
              {
                "We therefore shifted our attention from how much carbon enters metabolism to where that carbon goes once it enters the cell."
              }
            </p>
            <p>
              {
                "How could we direct more carbon toward the precursors required for PMA synthesis?"
              }
            </p>
            <p>
              {
                "This question led us from carbon utilization to carbon allocation."
              }
            </p>
            <h4>
              <em>{"Following Carbon Flow Toward PMA"}</em>
            </h4>
            <h5 className={styles.traceStage}>
              <strong>{"T — Trigger"}</strong>
            </h5>
            <p>
              {
                "Improving xylose utilization could allow more carbon from straw to enter A08 metabolism. However, increased substrate utilization would not necessarily result in increased PMA production."
              }
            </p>
            <p>{"This led us to the next question:"}</p>
            <p>
              <strong>
                {
                  "Once more carbon enters metabolism, how can we direct it toward PMA synthesis?"
                }
              </strong>
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"R — Reach Out"}</strong>
            </h5>
            <span id="ihp-weihui-wu" className={styles.storyAnchor} />
            <h5>
              <strong>{"| Prof. Weihui Wu / 吴卫辉教授"}</strong>
            </h5>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-prof-weihui-wu-01-carbon-allocation-discussion.avif"
              alt="Discussion with Prof. Weihui Wu on intracellular carbon allocation."
              ratio="4 / 3"
              caption={
                "Figure 13. Discussion with Prof. Weihui Wu on intracellular carbon allocation."
              }
            />
            <p>
              {
                "To better understand this problem, we discussed intracellular carbon allocation with Prof. Weihui Wu."
              }
            </p>
            <p>
              {"Our discussion helped us distinguish "}
              <strong>
                {"carbon uptake from productive carbon conversion"}
              </strong>
              {
                ". Once carbon enters the cell, it may be distributed among biomass formation, cellular maintenance, competing pathways, and product synthesis."
              }
            </p>
            <p>
              {
                "This changed the way we evaluated our system. Rather than asking only how much substrate A08 could consume, we began to consider "
              }
              <strong>
                {
                  "where the assimilated carbon was directed after entering metabolism"
                }
              </strong>
              {"."}
            </p>
            <h5>
              <strong>
                {"| Follow up with Prof. Guanglei Liu / 刘光磊教授"}
              </strong>
            </h5>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp-follow-up-prof-guanglei-liu-01-metabolic-route-discussion.avif"
              alt="Follow-up discussion with Prof. Guanglei Liu on the metabolic route toward PMA."
              ratio="4 / 3"
              caption={
                "Figure 14. Follow-up with Prof. Guanglei Liu on the metabolic route toward PMA."
              }
            />
            <p>
              {
                "Following this discussion, we examined the metabolic route leading toward PMA and identified precursor supply as a question worth further investigation."
              }
            </p>
            <p>
              {
                "We therefore revisited this pathway with Prof. Guanglei Liu, focusing on how carbon entering central metabolism could support malate formation and subsequent PMA synthesis."
              }
            </p>
            <h5>
              <strong>{"Closing an iterative loop"}</strong>
            </h5>
            <p>
              {
                "This was a return engagement rather than a new, isolated interview. An earlier question about the biological route had evolved through mixed-sugar utilization and regulatory engineering into a more specific problem: whether additional assimilated carbon could support PMA precursor supply. We brought that refined question back to Prof. Liu, then used the discussion to narrow the next engineering step toward the pyruvate → oxaloacetate route."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"A — Analyze"}</strong>
            </h5>
            <p>{"We summarized the relevant precursor route as:"}</p>
            <p>
              <strong>{"Pyruvate → Oxaloacetate → Malate → PMA"}</strong>
            </p>
            <p>
              {
                "This analysis suggested that improving sugar utilization alone might not be sufficient if the supply of downstream precursors remained limited."
              }
            </p>
            <p>
              {"Our attention therefore turned to "}
              <strong>{"pyruvate carboxylase (PYC)"}</strong>
              {
                ", which catalyzes the ATP-dependent carboxylation of pyruvate to oxaloacetate "
              }
              <Cite k={["Jitrapakdee2008PYC"]} />
              {":"}
            </p>
            <p>
              <strong>{"Pyruvate → Oxaloacetate"}</strong>
            </p>
            <p>
              {"Because malate is a key precursor in PMA biosynthesis by "}
              <em>{"Aureobasidium"}</em> <Cite k={["Chi2016PMLA"]} />
              {
                ", PYC provided a plausible engineering point for investigating whether precursor supply could be strengthened."
              }
            </p>
            <p>{"This led to a more specific question:"}</p>
            <p>
              <strong>
                {
                  "Could strengthening the pyruvate to oxaloacetate step support greater precursor availability for PMA synthesis?"
                }
              </strong>
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"C — Change"}</strong>
            </h5>
            <p>
              {
                "Based on this analysis, we expanded our engineering strategy from improving "
              }
              <strong>{"carbon utilization"}</strong>
              {" to strengthening "}
              <strong>{"precursor supply"}</strong>
              {"."}
            </p>
            <p>
              {
                "Rather than assuming that the endogenous PYC of A08 would be the most suitable option, we compared PYC genes from four different sources and introduced the corresponding constructs into A08."
              }
            </p>
            <p>
              {
                "The resulting strains were then evaluated through fermentation and PMA production , allowing us to compare whether different PYC designs could support carbon flow toward PMA."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"E — Evaluate"}</strong>
            </h5>
            <p>
              {
                "Our PYC comparison allowed us to investigate one possible way of directing more carbon toward PMA synthesis. However, we also recognized an important limitation of this approach."
              }
            </p>
            <p>
              {
                "We did not quantitatively resolve intracellular carbon allocation. Therefore, we could not determine what proportion of the assimilated carbon was directed toward biomass, other metabolic pathways, or PMA production. PYC engineering represented a targeted intervention in one plausible precursor supply route, rather than a complete solution to carbon allocation."
              }
            </p>
            <p>
              {
                "Within this scope, comparing the fermentation performance and PMA production of different PYC-engineered strains allowed us to evaluate whether strengthening the pyruvate → oxaloacetate step could influence product formation."
              }
            </p>
            <p>
              {
                "This also gave us a more careful understanding of our engineering strategy:"
              }
            </p>
            <p>
              {
                "AraR/XlnR helped us address how more carbon could enter metabolism, while PYC allowed us to explore one possible route for directing that carbon toward PMA."
              }
            </p>
            <p>
              <strong>{"Closing the Carbon Flow"}</strong>
            </p>
            <p>
              {
                "Through these successive iterations, our understanding of carbon utilization evolved from simply asking whether A08 could consume carbon from straw to considering how that carbon could support PMA production."
              }
            </p>
            <p>
              {
                "AraR/XlnR addressed carbon utilization, while PYC allowed us to investigate precursor supply toward PMA."
              }
            </p>
            <p>
              {
                "Together, these two engineering stages connected our biological design around a common question: how can carbon from straw be more effectively converted through the Carbotex system?"
              }
            </p>
          </>
        ),
      },
      {
        id: "ihp-material",
        title: "2.3 Developing the Material & Application",
        content: (
          <>
            <p>
              {
                "In the previous stage, we focused on converting carbon from straw into PMA. Once this biological route became established, PMA was no longer simply the endpoint of fermentation. It became the starting point for downstream material development."
              }
            </p>
            <p>
              {
                "We therefore shifted our question from how to produce PMA to what functions its structure could support and how those functions should be engineered and evaluated."
              }
            </p>
            <h4>
              <em>{"From Fermentation Product to Material Platform"}</em>
            </h4>
            <h5 className={styles.traceStage}>
              <strong>{"T — Trigger"}</strong>
            </h5>
            <p>
              {
                "Producing PMA demonstrated a biological production route, but production alone did not establish its downstream value as a material."
              }
            </p>
            <p>{"We therefore asked:"}</p>
            <p>
              <strong>
                {
                  "What properties of PMA could provide a basis for further material development?"
                }
              </strong>
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"R — Reach Out"}</strong>
            </h5>
            <span id="ihp-liu-ya" className={styles.storyAnchor} />
            <h5>
              <strong>{"| Liu Ya / 刘雅老师"}</strong>
            </h5>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-liu-ya-01-materials-perspective.avif"
              alt="Discussion with Liu Ya on PMA material properties and downstream potential."
              ratio="4 / 3"
              caption={
                "Figure 15. Discussion with Liu Ya on PMA structure–property relationships and downstream potential."
              }
            />
            <p>
              {
                "To examine PMA from a materials perspective, we discussed its downstream potential with Liu Ya."
              }
            </p>
            <p>
              {
                "She encouraged us to look beyond production yield and consider the polymer itself, including its molecular characteristics, chemical structure, and the relationship between structure and material properties."
              }
            </p>
            <p>
              {
                "This prompted us to reconsider what we were actually producing."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"A — Analyze"}</strong>
            </h5>
            <p>
              {
                "Following this discussion, we returned to the literature to examine the chemical structure of PMA more closely. Its abundant pendant carboxyl groups provide potential sites for further chemical modification, supporting PMA as a functionalizable material platform "
              }
              <Cite k={["Qiao2023PMLA"]} />
              {"."}
            </p>
            <p>
              <strong>
                {
                  "We then broadened our research to explore what kinds of material functions could be introduced through this structural flexibility. Among the possibilities we encountered, adhesion emerged as one direction worth further investigation."
                }
              </strong>
            </p>
            <p>
              {
                "However, identifying adhesion as a possible application was only a starting point. We still did not know "
              }
              <strong>
                {
                  "how this function should be introduced into PMA or how an adhesive material should be engineered."
                }
              </strong>
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"C — Change"}</strong>
            </h5>
            <p>
              {
                "We therefore expanded Carbotex beyond microbial production and introduced "
              }
              <strong>{"downstream material development"}</strong>
              {" as a new part of the project."}
            </p>
            <p>
              {
                "Rather than immediately committing to a specific material application, we began to evaluate which functions could be introduced through the chemical features of PMA."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"E — Evaluate"}</strong>
            </h5>
            <p>
              {
                "At this point, the material-platform idea was supported by PMA chemistry and literature precedent, but "
              }
              <strong>
                {
                  "no specific downstream function had yet been validated in our project"
                }
              </strong>
              {"."}
            </p>
            <p>
              <strong>{"Evaluation status:"}</strong>
              {
                " PMA was sufficiently functionalizable to justify further material design, while selection of a specific function still required a defined molecular rationale and an independent validation pathway."
              }
            </p>
            <p>
              {"This led to the next question: "}
              <strong>
                {
                  "Which material function should we develop, and what evidence would be required to show that it actually works?"
                }
              </strong>
            </p>
            <h4>
              <em>{"From an Application Idea to a Molecular Design"}</em>
            </h4>
            <h5 className={styles.traceStage}>
              <strong>{"T — Trigger"}</strong>
            </h5>
            <p>
              {
                "At this stage, “adhesive” was still only an application label rather than an engineered material concept. "
              }
              <strong>
                {
                  "How should an adhesion-related function be introduced and experimentally defined?"
                }
              </strong>
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"R — Reach Out"}</strong>
            </h5>
            <h5>
              <strong>{"| Dr. Haotian Guo / 郭昊天博士"}</strong>
            </h5>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-haotian-guo-01-ccic-feedback.avif"
              alt="Discussion with Dr. Haotian Guo during CCiC about Carbotex project integration."
              ratio="4 / 3"
              caption={
                "Figure 16. Discussion with Dr. Haotian Guo on carbon utilization, PMA production, and adhesive development."
              }
            />
            <span id="ihp-haotian-guo" className={styles.storyAnchor} />
            <p>
              {"During CCiC, Dr. Haotian Guo "}
              <strong>
                {
                  "recognized the overall logic of Carbotex, from guiding carbon from straw toward PMA production to exploring its further development as an adhesive material. However, he also pointed out that the adhesive component remained more of an application concept than a fully developed material module."
                }
              </strong>
            </p>
            <p>
              {
                "He therefore encouraged us to develop this part beyond a brief application statement."
              }
            </p>
            <p>
              {
                "His feedback made us recognize that an application should not merely be named. It should have a clear "
              }
              <strong>
                {
                  "design rationale, preparation strategy, and validation pathway"
                }
              </strong>
              {"."}
            </p>
            <span id="ihp-bright-moon" className={styles.storyAnchor} />
            <h5>
              <strong>{"| Bright Moon Seaweed / 明月海藻"}</strong>
            </h5>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-bright-moon-seaweed-01-group-photo.avif",
                  alt: "Group photo during the Bright Moon Seaweed visit.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-bright-moon-seaweed-02-material-discussion.avif",
                  alt: "Material discussion during the Bright Moon Seaweed visit.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Bright Moon Seaweed visit on functional natural polymers and material modification."
              caption={
                "Figure 17. Bright Moon Seaweed visit on functional natural polymers and material modification."
              }
              columns={2}
              mobileLayout="swipe"
            />
            <p>
              {"Our discussion with "}
              <strong>
                {"company representatives from Bright Moon Seaweed"}
              </strong>
              {
                " provided another perspective from the development of functional natural polymers."
              }
            </p>
            <p>
              {"Drawing on their experience with "}
              <strong>{"alginate and other natural polymers"}</strong>
              {", they introduced how strategies such as "}
              <strong>
                {
                  "esterification, oxidation, amidation, and graft copolymerization"
                }
              </strong>
              {
                " can be used to modify functional groups and tune material properties."
              }
            </p>
            <p>
              {
                "This encouraged us to reconsider PMA not only as a biosynthetic product, but as a "
              }
              <strong>
                {
                  "modifiable polymer backbone whose properties could be further engineered through functionalization"
                }
              </strong>
              {"."}
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"A — Analyze"}</strong>
            </h5>
            <p>
              {
                "We then combined these perspectives with literature research to identify a specific functionalization strategy."
              }
            </p>
            <p>
              {"Research on mussel-inspired adhesive materials highlighted "}
              <strong>
                {"catechol-containing molecules such as dopamine"}
              </strong>
              {
                " as a route for introducing adhesion-related interfacial functionality "
              }
              <Cite k={["Lee2007Mussel"]} />
              {
                ". More importantly, Tang et al. directly conjugated dopamine to a PMA backbone and evaluated the adhesive performance of the resulting material "
              }
              <Cite k={["Tang2020PMLADA"]} />
              {"."}
            </p>
            <p>{"This provided a clear precedent for our molecular design:"}</p>
            <p>
              <strong>
                {
                  "PMA structure → chemical functionalization → adhesion-related functionality"
                }
              </strong>
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"C — Change"}</strong>
            </h5>
            <p>
              {"Based on this analysis, we selected "}
              <strong>{"dopamine functionalization"}</strong>
              {
                " as the material engineering strategy and introduced PMA-DA into the Carbotex material module."
              }
            </p>
            <p>{"At the same time, we defined the module more completely:"}</p>
            <p>
              <strong>
                {
                  "PMA → Dopamine Functionalization → Structural Verification → Adhesion Evaluation"
                }
              </strong>
            </p>
            <p>
              {
                "The adhesive was therefore no longer simply an application example. It became a material that required independent design and validation."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"E — Evaluate"}</strong>
            </h5>
            <p>
              {
                "However, confirming dopamine conjugation would only demonstrate "
              }
              <strong>{"successful chemical modification"}</strong>
              {
                ". Literature precedent could support our design rationale, but it could not establish the adhesive performance of "
              }
              <strong>
                {"our own material under our experimental conditions"}
              </strong>
              {"."}
            </p>
            <p>{"This led to the next question:"}</p>
            <p>
              <strong>
                {
                  "How should the adhesive performance of functionalized PMA be evaluated under defined conditions?"
                }
              </strong>
            </p>
            <h4>
              <em>
                {"From Molecular Functionalization to Performance Evidence"}
              </em>
            </h4>
            <h5 className={styles.traceStage}>
              <strong>{"T — Trigger"}</strong>
            </h5>
            <p>
              {
                "Following the establishment of the functionalization strategy, the resulting material required "
              }
              <strong>
                {"independent evaluation of its adhesive performance"}
              </strong>
              {"."}
            </p>
            <p>{"This raised the next question:"}</p>
            <p>
              <strong>
                {
                  "How should the adhesive performance of functionalized PMA be evaluated under defined experimental conditions?"
                }
              </strong>
            </p>
            <h5 className={styles.traceStage}>
              <strong>
                {
                  "R — Reach Out | National Oyster Science & Technology Courtyard"
                }
              </strong>
            </h5>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-national-oyster-science-technology-courtyard-01-site-visit.avif",
                  alt: "Site visit to the National Oyster Science & Technology Courtyard.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-national-oyster-science-technology-courtyard-02-interview.avif",
                  alt: "Interview at the National Oyster Science & Technology Courtyard about biological adhesion.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Oyster Science & Technology Courtyard visit on biological adhesion in marine environments."
              caption={
                "Figure 18. Oyster Science & Technology Courtyard visit on biological adhesion in marine environments."
              }
              columns={2}
              mobileLayout="swipe"
            />
            <p>
              {
                "To gain a broader understanding of biological adhesion in marine environments, we visited the **National Oyster Science & Technology "
              }
              <a id="ihp-yanni-yang" />
            </p>
            <p>
              {"Courtyard** and interviewed "}
              <strong>{"Ms. Yanni Yang, Deputy General Manager"}</strong>
              {"."}
            </p>
            <p>
              {
                "She introduced the practical context of oyster cultivation and biological attachment, helping us understand how adhesion occurs in real marine environments."
              }
            </p>
            <p>
              {
                "Although oyster attachment differs from mussel adhesion in its specific biological mechanism, both involve attachment at "
              }
              <strong>{"wet biological interfaces"}</strong>
              {
                ". This provided a useful biological reference for considering the adhesive behavior of our material."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"A — Analyze"}</strong>
            </h5>
            <p>
              {"We treated oyster attachment as a "}
              <strong>
                {"biological reference rather than direct mechanistic evidence"}
              </strong>
              {" for PMA-DA."}
            </p>
            <p>
              {
                "This comparison reinforced that introducing an adhesion-related functional group does not by itself demonstrate material performance. The adhesive properties of the resulting material still needed to be evaluated experimentally."
              }
            </p>
            <h4>
              <strong>{"What we did not assume"}</strong>
            </h4>
            <p>
              {"We did "}
              <strong>{"not"}</strong>
              {
                " treat a biological analogy as proof of material mechanism or performance. Oyster attachment helped us think about adhesion in a real wet environment, but its mechanism is not equivalent to mussel adhesion and therefore could not validate PMA-DA by itself. We kept biological inspiration separate from material evidence and required independent experimental evaluation of the adhesive system."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"C — Change"}</strong>
            </h5>
            <p>
              {"We therefore extended the PMA-DA material module from "}
              <strong>
                {"structural verification to adhesive performance evaluation"}
              </strong>
              {"."}
            </p>
            <p>
              {
                "This allowed us to examine whether dopamine functionalization translated into observable adhesive properties."
              }
            </p>
            <h5 className={styles.traceStage}>
              <strong>{"E — Evaluate"}</strong>
            </h5>
            <p>
              {
                "Our adhesion tests provided project-specific evidence for evaluating PMA-DA as an adhesive material, while also clarifying the limits of our biomimetic design."
              }
            </p>
            <p>
              <strong>
                {
                  "Oyster attachment is not equivalent to mussel adhesion, and PMA-DA does not reproduce the full complexity of natural mussel attachment."
                }
              </strong>
              {
                " Instead, we regard it as a simplified mussel-inspired material that draws on selected catechol-related adhesion principles."
              }
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "ihp-responsible-implementation",
    title: "Responsible Implementation",
    content: <></>,
    subsections: [
      {
        id: "ihp-sustainability",
        title: "3.1 Rethinking Sustainability",
        content: (
          <>
            <p>
              {
                "Carbotex begins with straw-derived carbon. At first, using an agricultural resource and replacing part of the dependence on fossil based feedstocks seemed naturally connected with sustainability."
              }
            </p>
            <p>
              {"But as the project developed, we realized that "}
              <strong>
                {"renewable does not automatically mean sustainable"}
              </strong>
              {"."}
            </p>
            <span id="ihp-eva" className={styles.storyAnchor} />
            <p>
              {"Through our discussion with "}
              <strong>{"Eva, an expert in sustainability"}</strong>
              {
                ", we learned to look beyond the origin of the feedstock and consider sustainability at the level of the whole system."
              }
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp-sustainability-eva-sdgs-whole-system-perspective.avif"
              alt="Discussion with sustainability expert Eva about the Sustainable Development Goals and whole-system sustainability."
              ratio="3 / 4"
              caption={
                "Figure 19. Discussion with Eva on sustainability and whole-system evaluation."
              }
            />
            <p>
              {"Where carbon comes from is only one part of the picture. "}
              <strong>
                {
                  "Resource use, energy requirements, processing, downstream treatment, and possible trade-offs across different stages"
                }
              </strong>
              {
                " can all affect the sustainability of a biomanufacturing pathway. This whole-life-cycle perspective is consistent with established life-cycle assessment frameworks "
              }
              <Cite k={["ISO14040", "ISO14044"]} />
              {"."}
            </p>
            <p>
              {
                "This perspective made us return to different parts of Carbotex with new questions. Our use of agricultural carbon connected with "
              }
              <strong>{"responsible production"}</strong>
              {", our exploration of biomanufacturing connected with "}
              <strong>{"sustainable industrial innovation"}</strong>
              {
                ", and our original concern about straw burning connected our project with the broader challenge of "
              }
              <strong>{"climate action"}</strong>
              {"."}
            </p>
            <p>
              {
                "But these connections also reminded us to be careful: contributing to a sustainability goal is not the same as proving that the whole project is sustainable."
              }
            </p>
            <p>
              <strong>
                {
                  "Renewable carbon gave Carbotex a starting point. Sustainability asked us to examine everything that came after it."
                }
              </strong>
            </p>
            <p>
              {"After learning more about sustainability, we revisited the "}
              <strong>
                {"United Nations Sustainable Development Goals (SDGs)"}
              </strong>{" "}
              <Cite k={["UN2015SDGs"]} />
              {
                " and identified three goals that were particularly relevant to different parts of Carbotex:"
              }
            </p>

            <h4>
              <strong>
                {"SDG 9 · Industry, Innovation and Infrastructure"}
              </strong>
            </h4>
            <p>
              {
                "Biomanufacturing and the development of new routes for renewable carbon utilization. "
              }
              <strong>
                {"Explore → Biological System / 3.2 Biomanufacturing Ecosystem"}
              </strong>{" "}
              <a href="#ihp-implementation-ecosystem">
                {"Explore this section →"}
              </a>
            </p>

            <h4>
              <strong>
                {"SDG 12 · Responsible Consumption and Production"}
              </strong>
            </h4>
            <p>
              {
                "Exploring how agricultural carbon can enter new material production pathways while encouraging more responsible use of resources. "
              }
              <strong>{"Explore → Feedstock TRACE / Material TRACE"}</strong>{" "}
              <a href="#ihp-feedstock">{"Explore this section →"}</a>
            </p>

            <h4>
              <strong>{"SDG 13 · Climate Action"}</strong>
            </h4>
            <p>
              {
                "Our project began with concern about straw burning and developed toward exploring renewable carbon as an alternative resource for biomanufacturing. "
              }
              <strong>{"Explore → Where It Began"}</strong>{" "}
              <a href="#ihp-beginning">{"Explore this section →"}</a>
            </p>
            <p>
              {
                "These SDGs are not achievements that we claim Carbotex has already fulfilled. Instead, they help us locate the project within broader sustainability questions and connect those questions back to the decisions we made throughout the project."
              }
            </p>
            <h4>
              <strong>{"What Changed for Carbotex?"}</strong>
            </h4>
            <p>
              {
                "We stopped treating sustainability as an assumed advantage of using straw."
              }
            </p>
            <p>
              {"Instead, it became a "}
              <strong>
                {
                  "criterion for examining how Carbotex should continue to develop"
                }
              </strong>
              {
                ". At our current stage, we have not completed a comprehensive environmental assessment or Life Cycle Assessment, so we cannot claim that the complete pathway has already demonstrated overall sustainability."
              }
            </p>
            <p>{"What changed was the way we asked the question."}</p>
            <p>
              <strong>
                {
                  "Sustainability was no longer a label for Carbotex. It became a question that every stage of Carbotex would need to keep answering."
                }
              </strong>
            </p>
            <p>{"And this naturally led us to the next challenge:"}</p>
            <p>
              <strong>
                {
                  "If Carbotex were to move beyond the laboratory, what would a real manufacturing system require?"
                }
              </strong>
            </p>
          </>
        ),
      },
      {
        id: "ihp-implementation-ecosystem",
        title: "3.2 Learning from the Biomanufacturing Ecosystem",
        content: (
          <>
            <p>
              {
                "By this stage, Carbotex had begun to connect its major laboratory modules, from straw-derived carbon and engineered A08 to PMA production and material development. Yet a laboratory route is not necessarily a manufacturing system."
              }
            </p>
            <p>
              {
                "We therefore looked beyond our own experiments and engaged with companies, research institutions, and scientific infrastructure across different parts of the biomanufacturing ecosystem."
              }
            </p>
            <p>{"Our question became:"}</p>
            <p>
              <strong>
                {
                  "What would Carbotex need beyond laboratory feasibility to move toward real manufacturing?"
                }
              </strong>
            </p>
            <h4>
              <strong>{"Seeing the System Behind the Biology"}</strong>
            </h4>
            <span id="ihp-tsingtao" className={styles.storyAnchor} />
            <h4>
              <strong>{"Tsingtao Brewery | Reliable Fermentation"}</strong>
            </h4>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-tsingtao-brewery-production-line-reliable-fermentation.avif",
                  alt: "Tsingtao Brewery production line illustrating industrial fermentation operations.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-tsingtao-brewery-site-fermentation-scale-up.avif",
                  alt: "Tsingtao Brewery site visit focused on fermentation scale-up.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Tsingtao Brewery visit on fermentation scale-up, monitoring, and batch consistency."
              caption={
                "Figure 20. Tsingtao Brewery visit on fermentation scale-up, monitoring, and batch consistency."
              }
              columns={2}
              mobileLayout="swipe"
            />
            <p>
              {"Our visit to "}
              <strong>{"Tsingtao Brewery"}</strong>
              {" shifted our attention from fermenter size toward "}
              <strong>
                {"batch consistency, process monitoring, and control"}
              </strong>
              {
                ". A strain may perform well in the laboratory, but manufacturing requires that this performance can be reproduced under controlled conditions."
              }
            </p>
            <p>
              {
                "For Carbotex, scale-up therefore began to mean more than increasing volume. It also meant building a process that could remain "
              }
              <strong>{"reproducible and controllable"}</strong>
              {"."}
            </p>
            <h4>
              <strong>
                {"Bright Moon Seaweed | From Product to Material"}
              </strong>
            </h4>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-bright-moon-seaweed-stbc-visit.avif",
                  alt: "Visit to Bright Moon Seaweed and its seaweed biotechnology context.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-bright-moon-seaweed-business-design-innovation-lab.avif",
                  alt: "Bright Moon Seaweed business design and innovation laboratory.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-bright-moon-seaweed-material-samples.avif",
                  alt: "Functional material samples observed during the Bright Moon Seaweed visit.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-bright-moon-seaweed-bioindustry-exhibition.avif",
                  alt: "Seaweed bioindustry exhibition during the Bright Moon Seaweed visit.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Bright Moon Seaweed visit on the seaweed bioindustry and functional material applications."
              caption={
                "Figure 21. Bright Moon Seaweed visit on the seaweed bioindustry and functional material applications."
              }
              columns={4}
              mobileLayout="swipe"
            />
            <p>
              {"Our exchange with "}
              <strong>{"Bright Moon Seaweed"}</strong>
              {
                " introduced us to the development of functional natural polymers and strategies for modifying polymer properties. This encouraged us to reconsider PMA not simply as a fermentation product, but as a "
              }
              <strong>{"modifiable polymer platform"}</strong>
              {"."}
            </p>
            <p>
              {
                "This perspective had already entered our Material TRACE, where it contributed to our decision to explore PMA functionalization rather than treating “adhesive” as only an application label."
              }
            </p>
            <h4>
              <strong>{"Kinger Robot | Automation and Integration"}</strong>
            </h4>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-kinger-robot-entrance.avif",
                  alt: "Entrance to Kinger Robot during the site visit.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-kinger-robot-factory-tour.avif",
                  alt: "Factory tour at Kinger Robot.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-kinger-robot-automation-integration.avif",
                  alt: "Automation and process-integration equipment observed at Kinger Robot.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Kinger Robot visit on automation, integration, and traceability."
              caption={
                "Figure 22. Kinger Robot visit on automation, integration, and traceability."
              }
              columns={3}
              mobileLayout="swipe"
            />
            <span id="ihp-kinger" className={styles.storyAnchor} />
            <p>
              <strong>{"Kinger Robot"}</strong>
              {" brought another part of manufacturing into view: "}
              <strong>
                {
                  "automation, process integration, data recording, and traceability"
                }
              </strong>
              {
                ". It encouraged us to ask not only whether individual steps could work, but whether different operations could eventually become part of a connected manufacturing process."
              }
            </p>
            <p>
              {"This added "}
              <strong>
                {"monitoring, standardization, integration, and traceability"}
              </strong>
              {
                " to the criteria we believed future scale-up would need to address."
              }
            </p>
            <span id="ihp-bgi" className={styles.storyAnchor} />
            <h4>
              <strong>{"BGI | Data and Translation"}</strong>
            </h4>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-bgi-data-translation-meeting.avif",
                  alt: "Discussion at BGI about data and biotechnology translation.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-bgi-group-visit.avif",
                  alt: "OUC-Haide group visit to BGI.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="BGI exchange on data and analytical infrastructure for biotechnology development."
              caption={
                "Figure 23. BGI exchange on data and analytical infrastructure for biotechnology development."
              }
              columns={2}
              mobileLayout="swipe"
            />
            <p>
              {"Our exchange with "}
              <strong>{"BGI"}</strong>
              {
                " broadened our perspective from individual experimental outcomes toward the data and analytical infrastructure that can support biotechnology development."
              }
            </p>
            <p>
              {
                "These capabilities were not incorporated into our current experiments. Instead, the exchange gave us a future direction: as Carbotex becomes more complex, stronger data generation and interpretation could help build a more complete evidence chain for engineering decisions."
              }
            </p>
            <span
              id="ihp-shenzhen-infrastructure"
              className={styles.storyAnchor}
            />
            <h4>
              <strong>
                {
                  "Shenzhen Synthetic Biology Infrastructure | Engineering at a Different Scale"
                }
              </strong>
            </h4>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp-shenzhen-synthetic-biology-infrastructure.avif"
              alt="Visit to the Shenzhen synthetic biology infrastructure and its large-scale engineering platform."
              ratio="4 / 3"
              caption={
                "Figure 24. Shenzhen synthetic biology infrastructure visit on automated, standardized DBTL."
              }
            />
            <p>
              {"The "}
              <strong>{"Shenzhen Synthetic Biology Infrastructure"}</strong>
              {
                " showed us another scale of synthetic biology engineering, where automation and systematic DBTL can support more standardized and reproducible workflows."
              }
            </p>
            <p>
              {
                "We cannot reproduce such infrastructure within a student project, nor do we claim to have achieved automated DBTL. What we gained was a different understanding of engineering:"
              }
            </p>
            <p>
              <strong>
                {
                  "A successful experiment produces a result. A systematic workflow makes that result useful for the next iteration."
                }
              </strong>
            </p>
            <span id="ihp-qibebt" className={styles.storyAnchor} />
            <h4>
              <strong>{"QIBEBT | The Wider Biomanufacturing Ecosystem"}</strong>
            </h4>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-qibebt-team-outside.avif",
                  alt: "OUC-Haide team outside QIBEBT.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-qibebt-exhibition-visit.avif",
                  alt: "Exhibition visit at QIBEBT.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-qibebt-team-inside.avif",
                  alt: "OUC-Haide team inside QIBEBT after the visit.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="QIBEBT visit on biomanufacturing research, infrastructure, and translation."
              caption={
                "Figure 25. QIBEBT visit on biomanufacturing research, infrastructure, and translation."
              }
              columns={3}
              mobileLayout="swipe"
            />
            <p>
              {"Our engagement with "}
              <strong>{"QIBEBT"}</strong>
              {
                " widened the perspective once again. Feedstock handling, fermentation, downstream processing, material development, and process control may ultimately depend on different technologies and specialized partners rather than one organization reproducing the entire pathway."
              }
            </p>
            <p>
              {
                "Carbotex therefore began to look less like an isolated technical route and more like one part of a broader "
              }
              <strong>{"renewable carbon biomanufacturing ecosystem"}</strong>
              {"."}
            </p>
            <h4>
              <strong>{"Putting the Perspectives Together"}</strong>
            </h4>
            <p>
              {
                "No single company or institution represented the future of Carbotex. What mattered was the picture that emerged when these perspectives were connected:"
              }
            </p>
            <p>
              <strong>
                {
                  "Reliable Fermentation → Material Development → Automation → Data → Integration → Translation"
                }
              </strong>
            </p>
            <p>{"We began to realize that:"}</p>
            <p>
              <strong>
                {
                  "A collection of successful experiments is not yet a manufacturing system."
                }
              </strong>
            </p>
            <h4>
              <strong>
                {"From Technical Feasibility to Implementation Thinking"}
              </strong>
            </h4>
            <h5>
              <em>{"A Shared Discussion at CCiC"}</em>
            </h5>
            <p>
              {"At "}
              <strong>{"CCiC"}</strong>
              {", we continued this question from another direction."}
            </p>
            <p>
              {"Together with other iGEM participants, we discussed "}
              <strong>
                {
                  "technical innovation, commercialization, and startup incubation"
                }
              </strong>
              {", and organized our reflections into a shared document, "}
              <em>{"iGEM Project Commercialization and Startup Incubation"}</em>
              {
                ". One important idea emerged: technical innovation and implementation cannot be considered independently."
              }
            </p>
            <p>
              {
                "The discussion exposed several gaps between laboratory success and real implementation. "
              }
              <strong>
                {
                  "Reproducibility, downstream processing, waste treatment, scale-up, market demand, safety, and compliance"
                }
              </strong>
              {
                " could all become constraints even when the underlying biology works."
              }
            </p>
            <p className={styles.document}>
              <a
                href="https://static.igem.wiki/teams/6147/wiki/igem-discussion-notes.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {
                  "Supplementary document. CCiC discussion notes on commercialization and startup incubation."
                }
              </a>{" "}
              <span>PDF · Opens in a new tab</span>
            </p>
            <p>
              {
                "For Carbotex, this did not demonstrate commercial viability. Instead, it changed what we believed future feasibility would need to include."
              }
            </p>
            <p>
              {
                "A productive strain is not yet a manufacturing process. A successful fermentation is not yet reliable production. A functional material is not yet a viable product."
              }
            </p>
            <p>
              <strong>
                {"Biomanufacturing does not end when biology works."}
              </strong>
            </p>
            <h4>
              <strong>{"Recognizing Our Limits"}</strong>
            </h4>
            <p>
              {
                "These exchanges also made the limits of our current work clearer."
              }
            </p>
            <p>
              {"As a student team working primarily at the laboratory scale, "}
              <strong>
                {
                  "we are not in a position to demonstrate the industrial or commercial feasibility of Carbotex"
                }
              </strong>
              {
                ". We have not validated large scale production, established a complete downstream process, or demonstrated economic and market feasibility. Industrial engagement cannot replace the engineering, economic, market, and regulatory evidence that real translation would require."
              }
            </p>
            <p>
              {
                "But recognizing this limitation became valuable in itself. Rather than using these exchanges to claim that Carbotex was ready for commercialization, "
              }
              <strong>
                {
                  "we used them to understand what “readiness” would actually require"
                }
              </strong>
              {
                ". What had once been a vague ambition of “future scale up” became a clearer set of questions for future development."
              }
            </p>
            <p>
              <strong>
                {
                  "We did not leave with a roadmap to commercialization. We left with a clearer understanding of what such a roadmap would need to address."
                }
              </strong>
            </p>
            <p>
              {"For Carbotex, industrialization therefore became "}
              <strong>
                {
                  "a direction for continued inquiry, rather than a claim of achievement"
                }
              </strong>
              {"."}
            </p>
          </>
        ),
      },
      {
        id: "ihp-biosafety",
        title: "3.3 Rethinking Biosafety",
        content: (
          <>
            <h4>
              <em>{"From Preventing Escape to Understanding Risk"}</em>
            </h4>
            <p>
              {
                "As we began to consider Carbotex beyond laboratory feasibility, biosafety became part of the question of responsible implementation."
              }
            </p>
            <p>
              {
                "Our wet lab team had already assessed microbial safety and experimental risks throughout the project. In particular, "
              }
              <em>{"Clostridium thermocellum"}</em>
              {
                " is a thermophilic anaerobe with an optimum growth temperature around 60 °C "
              }
              <Cite k={["Akinosho2014Thermocellum"]} />
              {
                ". We therefore treated its restrictive cultivation conditions as one factor that could reduce sustained growth outside the intended environment. Our engineering also focused on carbohydrate utilization rather than introducing known virulence- or toxin-related functions."
              }
            </p>
            <p>
              {
                "The detailed safety design and laboratory practices are presented on our Safety page."
              }
            </p>
            <p>
              {"Explore our biosafety design → Safety "}
              <a href="/ouc-haide/safety-and-security">
                {"Explore this section →"}
              </a>
            </p>
            <h4>
              <strong>{"Grand APiC | Looking Beyond Cell Escape"}</strong>
            </h4>
            <p>
              {
                "At Grand APiC, judges encouraged us to think more carefully about what the relevant biosafety risks actually were. Their broader feedback reminded us that a biological system should be considered not only in terms of whether it works, but also under what conditions it might eventually leave the laboratory."
              }
            </p>
            <p>
              {
                "For C. thermocellum, its restrictive growth conditions already limit the likelihood of sustained proliferation after accidental release. The discussion therefore suggested that viable cell escape did not necessarily need to dominate our risk assessment, and that an additional kill switch was not automatically required."
              }
            </p>
            <p>{"However, this led to another question:"}</p>
            <p>
              {
                "What if the organism cannot persist, but engineered genetic information is transferred?"
              }
            </p>
            <p>
              {
                "This shifted our attention toward HGT. Because horizontal gene transfer can involve chromosomal as well as mobile genetic material, we did not treat chromosomal integration alone as proof that HGT had been eliminated "
              }
              <Cite k={["Brito2021HGT"]} />
              {"."}
            </p>
            <h4>
              <strong>{"Reframing the Risk"}</strong>
            </h4>
            <p>
              {
                "Rather than claiming that HGT could be completely prevented, we began to consider both its possibility and potential consequences."
              }
            </p>
            <p>
              {
                "Our antibiotic resistance selection marker had been removed, while the engineered functions were related primarily to substrate utilization and metabolism rather than virulence, toxicity, or host invasion. The project design itself therefore did not intentionally introduce functions expected to enhance pathogenicity."
              }
            </p>
            <p>
              {
                "We also considered that additional expression could impose a metabolic burden on a recipient organism, while limited availability of relevant substrates in natural environments may reduce the selective advantage of the transferred functions. Together, these considerations suggested that the potential consequences of unintended transfer would likely be limited under the scenarios we considered."
              }
            </p>
            <p>
              {
                "However, we did not experimentally evaluate HGT under environmental conditions. We therefore do not interpret these considerations as evidence of zero risk."
              }
            </p>
            <p>
              {
                "Biosafety is not only about whether an organism can escape, but also about what could happen if biological information moves beyond its intended system."
              }
            </p>
            <h4>
              <strong>{"What Changed for Carbotex?"}</strong>
            </h4>
            <p>
              {
                "Grand APiC did not give us a simple statement that Carbotex was “safe.” Instead, it changed how we evaluated safety."
              }
            </p>
            <p>
              {
                "We moved from focusing primarily on preventing viable cell escape to considering which risks were most relevant, what their consequences might be, and where uncertainty still remained."
              }
            </p>
            <p>
              {
                "The specific containment strategies and experimental safety measures belong to our wet lab work and are discussed in detail on the Safety page. For Human Practices, the more important change was in our understanding:"
              }
            </p>
            <p>
              {
                "Responsible implementation does not require us to claim zero risk. It requires us to identify risk honestly, reduce it where possible, and recognize what still needs to be evaluated."
              }
            </p>
            <p>
              <strong>
                {"Explore our detailed safety assessment → Safety"}
              </strong>{" "}
              <a href="/ouc-haide/safety-and-security">
                {"Explore this section →"}
              </a>
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "ihp-conversation",
    title: "Carbotex in Conversation",
    content: (
      <>
        <h4>
          <em>{"Where Ideas Travel, Return, and Grow"}</em>
        </h4>
        <p>
          <strong>{"Carbotex did not grow within our team alone."}</strong>
        </p>
        <p>
          {
            "Throughout the season, we carried our ideas into conversations with other iGEM teams, researchers, industry, students, and artists. Each time Carbotex entered a new conversation, it encountered another way of being questioned, understood, and imagined."
          }
        </p>
        <p>
          {
            "What returned was not always a change to our experiments. Sometimes it was a question that entered TRACE. Sometimes it was a new collaboration, a different perspective, or another way of communicating what we cared about."
          }
        </p>
        <p>
          <strong>
            {
              "Some conversations changed Carbotex. Others changed how Carbotex connected with the world."
            }
          </strong>
        </p>
      </>
    ),
    subsections: [
      {
        id: "ihp-peers",
        title: "4.1 Growing Alongside Our Peers",
        content: (
          <>
            <h4>
              <em>{"OUC China · From One Campus to a Wider Network"}</em>
            </h4>
            <p>
              <strong>
                {
                  "Some collaborations begin after two projects meet. Ours began before either project had fully taken shape."
                }
              </strong>
            </p>
            <p>
              {
                "OUC China is our sibling iGEM team from Ocean University of China. Soon after our teams were established, we held our first meeting to share early project ideas, discuss our plans for the season, and explore how we could support one another along the way."
              }
            </p>
            <p>
              {"From that first conversation, we made a simple agreement: "}
              <strong>
                {
                  "although we were building different projects, we would grow through the iGEM season together."
                }
              </strong>
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp.avif"
              alt="Early project exchange between OUC-Haide and OUC-China."
              ratio="4 / 3"
              caption={
                "Figure 26. Early exchange between OUC-Haide and OUC-China."
              }
            />
            <p>{"That promise soon travelled beyond our own campus."}</p>
            <p>
              {"Together with OUC China, we journeyed to Tianjin and visited "}
              <strong>{"Nankai University"}</strong>
              {" and "}
              <strong>{"Tianjin University"}</strong>
              {
                ", where our conversations expanded from two sibling teams to a wider exchange among three universities. Different project ideas, technical approaches, and perspectives met in the same room, giving us the opportunity to learn not only from one another, but from teams growing along very different paths."
              }
            </p>
            <p>
              {
                "We did not want those conversations to end when we left Tianjin. A shared communication group was therefore established among "
              }
              <strong>
                {
                  "Ocean University of China, Nankai University, and Tianjin University"
                }
              </strong>
              {
                ", allowing project progress, questions, and ideas to continue travelling between us throughout the season."
              }
            </p>
            <p>
              <strong>
                {
                  "What began as two teams growing side by side gradually became a wider community growing together."
                }
              </strong>
            </p>
            <ImageCarousel
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-tianjin-exchange-01-meeting.avif",
                  alt: "Inter-university exchange and collaboration among iGEM teams.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-tianjin-exchange-02-presentation.avif",
                  alt: "Project sharing across three universities.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-tianjin-exchange-03-peer-interaction.avif",
                  alt: "Hands-on exchange during the Tianjin visit.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-tianjin-exchange-04-university-visit.avif",
                  alt: "Peer conversation during the Tianjin exchange.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-tianjin-exchange-05-lab-discussion.avif",
                  alt: "Conversation continuing beyond the formal meeting room.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-tianjin-exchange-06-facility-conversation.avif",
                  alt: "Visit to Nankai University during the three-university exchange.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Tianjin exchange connecting OUC-Haide, OUC-China, Nankai University, and Tianjin University."
              caption={
                "Figure 27. Tianjin exchange connecting OUC-Haide, OUC-China, Nankai University, and Tianjin University."
              }
              autoPlay={false}
            />
            <p>
              {
                "Our connection continued as both teams began to grow. During OUC China’s recruitment, we joined them again for another exchange, meeting new members and sharing the iGEM experience as their team took shape."
              }
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-recruitment-exchange-01.avif"
              alt="OUC-Haide members exchanging iGEM experiences with OUC-China during an outdoor recruitment activity."
              ratio="4 / 3"
              caption={
                "Figure 28. Continued exchange with OUC-China during team recruitment."
              }
            />
            <p>
              <strong>
                {
                  "From one meeting, to one journey, to a network that continued to grow, OUC China remained one of our closest companions throughout the season. "
                }
              </strong>
            </p>
          </>
        ),
      },
      {
        id: "ihp-community",
        title: "4.2 Seeing Carbotex Through Other Eyes",
        content: (
          <>
            <h4>
              <em>{"CCiC × Grand APiC"}</em>
            </h4>
            <span id="ihp-ccic" className={styles.storyAnchor} />
            <h4>
              <strong>{"CCiC · Taking Carbotex Into the Community"}</strong>
            </h4>
            <p>
              {
                "As Carbotex gradually took shape, we realized that discussing it within our own team was no longer enough. We needed to bring the project in front of people who did not already know our story and allow them to question what we had begun to take for granted."
              }
            </p>
            <p>
              {"The "}
              <strong>{"Conference of China iGEMer Community (CCiC)"}</strong>
              {
                " is a major platform for Chinese iGEM teams to present their projects, exchange ideas, and learn from researchers, judges, and one another. In 2026, the 13th CCiC was held alongside "
              }
              <strong>{"Synbiopunk 2026"}</strong>
              {
                " at Dalian University of Technology, bringing together dozens of teams working across different areas of synthetic biology."
              }
            </p>
            <p>
              {
                "We brought Carbotex onto the CCiC stage not only to show what we had done, but also to discover "
              }
              <strong>{"what we had not yet seen."}</strong>
            </p>
            <ImageCarousel
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-01-team-photo.avif",
                  alt: "OUC-Haide team at CCiC 2026.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-02-peer-exchange.avif",
                  alt: "Peer exchange during CCiC 2026.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-03-bio-manufacturing-platform-exchange.avif",
                  alt: "Exchange around a biomanufacturing platform at CCiC 2026.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-04-poster-discussion.avif",
                  alt: "Project discussion beside a scientific poster during CCiC 2026.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-05-poster-team-photo.avif",
                  alt: "OUC-Haide team beside the Carbotex poster at CCiC 2026.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Carbotex project and peer exchange at CCiC 2026."
              caption={
                "Figure 29. Carbotex project and peer exchange at CCiC 2026."
              }
              autoPlay={false}
            />
            <p>
              {"Their suggestion was clear: "}
              <strong>{"let the project evolve through DBTL."}</strong>
            </p>
            <p>
              {
                "This feedback changed how we organized our engineering. We began to connect our work through "
              }
              <strong>{"Design → Build → Test → Learn"}</strong>
              {", allowing results from one stage to guide what came next."}
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-06-carbotex-stage-presentation-dbtl.avif"
              alt="OUC-Haide presenting Carbotex on stage at CCiC 2026."
              ratio="4 / 3"
              caption={
                "Figure 30. CCiC presentation where feedback prompted a DBTL-based project structure."
              }
            />
            <h4>
              <strong>{"When a Conversation Becomes a Decision"}</strong>
            </h4>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-dr-haotian-guo-01-ccic-feedback.avif"
              alt="Discussion with Dr. Haotian Guo during CCiC about Carbotex project integration."
              ratio="4 / 3"
              caption={
                "Figure 16 (reused). Discussion with Dr. Haotian Guo on the adhesive concept."
              }
            />
            <p>
              {"At CCiC, we also spoke with "}
              <strong>{"Dr. Haotian Guo"}</strong>
              {", Founder and CEO of Ailurus Bio."}
            </p>
            <p>
              {
                "When we introduced our plan to develop PMA into an adhesive, he raised an important question: "
              }
              <strong>
                {
                  "were we truly developing a material, or simply giving PMA an application?"
                }
              </strong>
            </p>
            <p>
              {
                "The question stayed with us. It pushed us to look beyond the idea of “adhesive” and think more carefully about how PMA could be functionally modified and evaluated as a material. We later carried this question into our "
              }
              <strong>{"Material TRACE"}</strong>
              {" cycle. "}
              <a href="#ihp-material">{"Explore this section →"}</a>
            </p>
            <h4>
              <strong>{"From Meeting a Team to Creating Together"}</strong>
            </h4>
            <p>
              {
                "Among teams from across the country, one encounter felt especially unexpected and fortunate: we met QingdaoAcademy, a high school iGEM team from our own city, Qingdao, entering iGEM for the first time."
              }
            </p>
            <p>
              {
                "We began by sharing our projects and experiences, but soon discovered that this chance meeting could become something more. After CCiC, we stayed in contact and decided to create something together. That unexpected encounter later grew into 17 C: The Fatal Experiment, an immersive synthetic biology activity jointly developed by our two teams."
              }
            </p>
            <p>
              {"We met by chance at CCiC. We met again as co creators. "}
              <a href="#ihp-co-creation">{"Explore this section →"}</a>
            </p>
            <p>
              {"Beyond the formal presentations, we joined two "}
              <strong>{"Unconference"}</strong>
              {" sessions hosted by different teams. A session hosted by the "}
              <strong>
                {"Dalian University of Technology iGEM team (DUT-China)"}
              </strong>
              {
                " focused on project commercialization and startup incubation, discussing challenges from technical innovation and scale-up to safety and market needs."
              }
            </p>
            <p>
              {"We also joined the "}
              <strong>
                {"Jilin University First Hospital iGEM team (JLU-FBH)"}
              </strong>{" "}
              <strong>{"“From Teams, For Teams”"}</strong>
              {
                " roundtable, exchanging experiences on project design, team management, Human Practices, and how knowledge could be shared with future iGEMers."
              }
            </p>
            <p>
              {"The "}
              <strong>{"PDF embedded below"}</strong>
              {
                " records the discussion and key takeaways from the DUT Unconference."
              }
            </p>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-peer-community-dut-unconference-01-group-photo.avif",
                  alt: "Group photo from the DUT-hosted Unconference on project commercialization and startup incubation.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="DUT-hosted and JLU-FBH-hosted Unconference sessions at CCiC."
              caption={
                "Figure 31. DUT-hosted and JLU-FBH-hosted Unconference sessions at CCiC."
              }
              columns={2}
              mobileLayout="swipe"
            />
            <div className={styles.missingEvidence}>
              <p>
                Multi-team group photo from JLU-FBH’s “From Teams, For Teams”
                roundtable.
              </p>
              <p>Image not yet available.</p>
            </div>
            <p>
              <a href="https://static.igem.wiki/teams/6147/wiki/igem-discussion-notes.pdf">
                {
                  "Open the shared commercialization/startup-incubation document →"
                }
              </a>
            </p>
            <p>
              {"At the closing ceremony, OUC-Haide received "}
              <strong>{"Second Place in the Most Popular Award"}</strong>
              {", which was a tremendous encouragement to our whole team."}
            </p>
            <p>
              {"More importantly, we returned from CCiC with "}
              <strong>
                {"new questions, new perspectives, and new friends."}
              </strong>
            </p>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-07-synbiopunk-challenge-certificate-and-gift.avif",
                  alt: "Synbiopunk Challenge certificate and gift received by OUC-Haide.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-08-synbiopunk-community-wall.avif",
                  alt: "Synbiopunk community wall at CCiC 2026.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-09-synbiopunk-challenge-second-place.avif",
                  alt: "Second-place award presentation for OUC-Haide in the Synbiopunk Challenge Most Popular Award.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="CCiC community exchange and Synbiopunk Challenge recognition."
              caption={
                "Figure 32. CCiC community exchange and Synbiopunk Challenge recognition."
              }
              columns={3}
              mobileLayout="swipe"
            />
            <h4>
              <strong>{"Grand APiC · Testing the Whole Story"}</strong>
            </h4>
            <p>
              {"Our next stop was "}
              <strong>{"Grand APiC"}</strong>
              {
                ", a platform bringing together iGEM teams, researchers, and industry across the Asia Pacific region. Beyond project presentation, it created opportunities to "
              }
              <strong>
                {
                  "exchange ideas, receive feedback, and build connections across regions and disciplines."
                }
              </strong>
            </p>
            <p>
              {
                "With around 70 teams and 600 participants gathering in Shenzhen and Hong Kong, Grand APiC brought Carbotex into a broader community and allowed us to hear perspectives from both academia and industry."
              }
            </p>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-01-community-group-photo.avif",
                  alt: "Group photo of participants and iGEM teams at Grand APiC.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-02-carbotex-poster-exchange.avif",
                  alt: "Carbotex project poster displayed during the Grand APiC project exchange session.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Carbotex project exchange at Grand APiC."
              caption={"Figure 33. Carbotex project exchange at Grand APiC."}
              columns={2}
              mobileLayout="swipe"
            />
            <span id="ihp-grand-apic" className={styles.storyAnchor} />
            <p>
              {
                "At Grand APiC, judges raised questions about biosafety and responsible implementation. Their feedback reminded us that technical feasibility is only part of responsible engineering. We also needed to consider how Carbotex could be developed and implemented safely."
              }
            </p>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-03-responsible-research-session.avif",
                  alt: "Grand APiC 2026 session on responsible research principles.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-04-biotechnology-industry-exchange.avif",
                  alt: "Exchange during Grand APiC with a participant from the biotechnology sector.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Grand APiC perspectives on responsible implementation and industry translation."
              caption={
                "Figure 34. Grand APiC perspectives on responsible implementation and industry translation."
              }
              columns={2}
              mobileLayout="swipe"
            />
            <p>
              {
                "Grand APiC also brought us into conversation with biotechnology companies and industry representatives. These exchanges broadened our perspective from student project design toward how synthetic biology is developed, evaluated, and translated in real-world settings."
              }
            </p>
          </>
        ),
      },
      {
        id: "ihp-across-borders",
        title: "4.3 Human Practices Across Borders",
        content: (
          <>
            <h4>
              <em>{"Peking × Rice · Learning Beyond Our Own Context"}</em>
            </h4>
            <p>
              {"We participated in "}
              <strong>
                {
                  "“People in the World of SynBio — 2026 US-China iGEM Human Practices Summit,”"
                }
              </strong>
              {" an officially approved iGEM Meetup jointly organized by "}
              <strong>{"Peking University and Rice University"}</strong>
              {"."}
            </p>
            <p>
              {
                "Bringing together teams across different institutional and cultural contexts, the meetup created an international space for sharing Human Practices experiences, receiving peer and expert feedback, and exploring how synthetic biology interacts with society in different settings."
              }
            </p>
            <p>
              {"Discussions extended across "}
              <strong>
                {
                  "Healthcare & Medicine, Nature & Conservation, Entrepreneurship & Industry, and Policy & Education"
                }
              </strong>
              {
                ", giving us a broader view of how Human Practices could take shape beyond our own project and local context."
              }
            </p>
            <p>
              {
                "One of the most valuable parts of the meetup was seeing how other teams practiced Human Practices in different ways."
              }
            </p>
            <p>
              <strong>{"Princeton"}</strong>
              {
                " showed how expert engagement could challenge initial assumptions and lead to concrete project changes, while "
              }
              <strong>{"Nankai"}</strong>
              {
                " demonstrated how feedback from farmers, experts, and the public could be translated into design priorities."
              }
            </p>
            <p>
              {"These examples reminded us that there is "}
              <strong>{"no single template for Human Practices"}</strong>
              {
                ". What matters is listening in context and considering carefully what should happen next."
              }
            </p>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-peer-learning-01-princeton-responsible-public-health.avif",
                  alt: "Presentation example focused on responsible public-health implementation.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-peer-learning-04-nku-china-field-detective.avif",
                  alt: "NKU-China presenting Field Detective, a Human Practices case focused on natural ecological conservation.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-peer-learning-02-inclusivity-community-engagement.avif",
                  alt: "Presentation example focused on inclusivity and community engagement.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-peer-learning-03-low-carbon-outreach-pathway.avif",
                  alt: "Presentation example showing a structured low-carbon outreach pathway.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Peer-learning examples from the Peking × Rice Human Practices Summit."
              caption={
                "Figure 35. Peer-learning examples from the Peking × Rice Human Practices Summit."
              }
              columns={4}
              mobileLayout="swipe"
            />
            <p>
              {"After the meetup, we organized what we had learned into a "}
              <strong>{"Human Practices Exchange Presentation"}</strong>
              {
                ", preserving the ideas and examples that stood out to us as a resource we could revisit and share."
              }
            </p>
            <p>
              <strong>
                {"The meetup ended, but the exchange stayed with us."}
              </strong>
            </p>
            <p>
              {"· "}
              <strong>{"Johns Hopkins | Trust Before Technology"}</strong>
              {
                " They showed that bringing biotechnology into a community begins with "
              }
              <strong>{"relationships and trust"}</strong>
              {
                ", not simply education. Their work reminded us to understand a community before trying to reach it."
              }
            </p>
            <p>
              {"· "}
              <strong>{"Peking HSC | Following the Whole Journey"}</strong>
              {
                " They considered the entire patient journey, from pre diagnosis to treatment, care, and social inclusion. This showed us the value of looking beyond a technology to the broader experience of the people it serves."
              }
            </p>
            <p>
              {"· "}
              <strong>{"Princeton | From Interview to Change"}</strong>
              {
                " Princeton emphasized that stakeholder interviews should lead to concrete changes in targets, validation, or design. Their approach showed us that listening matters most when it can influence what happens next."
              }
            </p>
            <p>
              {"· "}
              <strong>{"SUSTech-BIO | Listening for Disagreement"}</strong>
              {" Instead of only seeking approval, they actively looked for "}
              <strong>
                {"confusion, disagreement, and missing perspectives"}
              </strong>
              {
                ". We were impressed by the idea that Human Practices can challenge assumptions rather than simply confirm them."
              }
            </p>
            <p>
              {"· "}
              <strong>{"Rochester | Learning by Creating"}</strong>
              {
                " Rochester invited young participants to develop their own synthetic biology projects rather than simply listen to science communication. Their work showed how education can become participation and creation."
              }
            </p>
            <p>
              {"· "}
              <strong>{"Nankai | Turning Voices into Decisions"}</strong>
              {
                " Nankai translated feedback from farmers, experts, and the public into different priorities in design, testing, and communication. Their work made the path from "
              }
              <strong>{"stakeholder voice to project decision"}</strong>
              {" especially clear."}
            </p>
            <p>
              {"· "}
              <strong>{"UC Davis | The Courage to Rethink"}</strong>
              {
                " When expert feedback revealed a fundamental problem in their original concept, UC Davis reconsidered the project and changed direction. Their experience showed us that good Human Practices sometimes means having the courage to rethink the question itself."
              }
            </p>
            <p>
              {"· "}
              <strong>{"LZU-Northwest | Designing for Inclusion"}</strong>
              {
                " They adapted language, visuals, and activities for audiences with different needs instead of giving everyone the same material. Their work showed that inclusion means helping different people genuinely understand and participate."
              }
            </p>
            <p>
              {"· "}
              <strong>{"Rice | Thinking Beyond iGEM"}</strong>
              {
                " Rice explored regulation, logistics, policy, and other challenges involved in bringing research toward real world implementation. Their approach reminded us that Human Practices can also ask what happens "
              }
              <strong>{"after the laboratory"}</strong>
              {"."}
            </p>
          </>
        ),
      },
      {
        id: "ihp-collaboration",
        title: "4.4 Collaboration Spotlight",
        content: (
          <>
            <h4>
              <strong>
                <em>{"From a Straw Story to a Carbon Story"}</em>
              </strong>
            </h4>
            <h4>
              <strong>{"Green Carbon · Seeing Beyond Straw"}</strong>
            </h4>
            <p>
              <strong>{"At first, Carbotex was a story about straw."}</strong>{" "}
              <em>{"Green Carbon"}</em>
              {" helped us see that it was also a story about carbon."}
            </p>
            <p>
              <em>{"Green Carbon"}</em>
              {" is an international open-access journal affiliated with the "}
              <strong>
                {
                  "Qingdao Institute of Bioenergy and Bioprocess Technology, Chinese Academy of Sciences"
                }
              </strong>
              {
                ". Its scope includes renewable carbon resources, green conversion, biomanufacturing, synthetic biology, and carbon life-cycle management. The publisher currently lists an "
              }
              <strong>{"Impact Factor of 14.2"}</strong>
              {" and a "}
              <strong>{"CiteScore of 15.7"}</strong>{" "}
              <Cite k={["KeAiGreenCarbon2026"]} />
              {"."}
            </p>
            <p>
              {"Our connection with "}
              <em>{"Green Carbon"}</em>
              {" was especially meaningful through "}
              <strong>
                {
                  "Prof. Yajun Liu, one of our team advisors, who also serves as an editor of the journal"
                }
              </strong>
              {
                ". His perspective connected our project with broader academic discussions around renewable carbon and encouraged us to look again at what our starting material really represented."
              }
            </p>
            <p>
              {
                "Through these exchanges, our understanding of straw gradually deepened. We began to see it not simply as agricultural waste waiting to be used, but as a "
              }
              <strong>{"renewable carbon resource"}</strong>
              {
                " embedded within larger agricultural and environmental systems."
              }
            </p>
            <p>
              {
                "Our question therefore began to change. Instead of asking only "
              }
              <strong>{"“How can we use straw?”"}</strong>
              {", we started asking "}
              <strong>
                {
                  "“How can the carbon within it be transformed and used more responsibly?”"
                }
              </strong>
            </p>
            <p>
              {
                "This shifted our understanding of Carbotex from a simple story of "
              }
              <strong>{"Waste → Product"}</strong>
              {" toward a broader perspective of "}
              <strong>
                {"Renewable Carbon → Biomanufacturing → Material"}
              </strong>
              {"."}
            </p>
            <p>
              <strong>
                {"We began with straw. We learned to think in carbon."}
              </strong>
            </p>
            <ImageCarousel
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-01-green-carbon-sign.avif",
                  alt: "Green Carbon sign at the start of the institutional visit.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-02-project-exchange-meeting.avif",
                  alt: "Project exchange meeting during the Green Carbon and QIBEBT visit.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-03-lignocellulose-bioconversion-tour.avif",
                  alt: "Discussion of lignocellulose bioconversion during the QIBEBT tour.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-04-synthetic-biology-green-biomanufacturing-exhibit.avif",
                  alt: "Synthetic biology and green biomanufacturing exhibition at QIBEBT.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-qibebt-team-inside.avif",
                  alt: "OUC-Haide team group photo during the QIBEBT visit.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-qibebt-exhibition-visit.avif",
                  alt: "Research and development exhibition during the QIBEBT visit.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-07-straw-resource-utilization-interactive.avif",
                  alt: "Interactive exhibit on straw resource utilization.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Green Carbon and QIBEBT exchange on renewable carbon and green biomanufacturing."
              caption={
                "Figure 36. Green Carbon and QIBEBT exchange on renewable carbon and green biomanufacturing."
              }
              autoPlay={false}
            />
          </>
        ),
      },
      {
        id: "ihp-co-creation",
        title: "4.5 From Communication to Co Creation",
        content: (
          <>
            <h4>
              <em>{"OUC-Haide × QingdaoAcademy"}</em>
            </h4>
            <p>
              <strong>
                {
                  "What if students did not listen to synthetic biology, but stepped inside it?"
                }
              </strong>
            </p>
            <p>
              {
                "Our collaboration with QingdaoAcademy began at CCiC, but it did not end with exchanging contact information."
              }
            </p>
            <p>
              {
                "Together, we began reconsidering a familiar model of science communication: scientists explain, students listen, and knowledge moves in only one direction."
              }
            </p>
            <p>{"We wanted something different."}</p>
            <p>
              {"The result was "}
              <strong>{"17 C: The Fatal Experiment"}</strong>
              {
                ", an immersive synthetic biology mystery built around investigation, evidence, biological engineering, and responsibility."
              }
            </p>
            <p>
              {
                "Instead of receiving a lecture, participants entered a story. They had to search, question, connect evidence, understand an engineered biological system, and make decisions for themselves."
              }
            </p>
            <p>
              {
                "The important change was not simply that we made science “more fun.”"
              }
            </p>
            <p>
              <strong>{"We changed the role of the audience."}</strong>
            </p>
            <p>
              {
                "Students were no longer passive recipients of scientific information. Their questions, reactions, and ways of reasoning became part of how the activity itself was experienced and improved."
              }
            </p>
            <p>
              {
                "That is why this collaboration mattered to our Human Practices. Communication became "
              }
              <strong>{"two way"}</strong>
              {
                ", and an encounter between two iGEM teams became something that could be created and shared with a wider community."
              }
            </p>
            <p>
              {
                "The activity received enthusiastic responses and allowed us to bring both "
              }
              <strong>{"iGEM and synthetic biology"}</strong>
              {" into a setting far beyond our own laboratory."}
            </p>
            <p>
              <strong>{"We met at CCiC as two teams."}</strong>{" "}
              <strong>{"We met again as co creators."}</strong>
            </p>
            <ImageCarousel
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-co-creation-01-student-engagement.avif",
                  alt: "Students actively engaging with an OUC-Haide synthetic biology activity.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-co-creation-02-interactive-group-activity.avif",
                  alt: "Students gathered around an interactive group activity.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-co-creation-03-student-discussion-and-feedback.avif",
                  alt: "Students discussing and giving feedback during the activity.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-co-creation-04-activity-station.avif",
                  alt: "Participants at a hands-on activity station.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-co-creation-05-hands-on-biotech-activity.avif",
                  alt: "Student participants carrying out a hands-on biotechnology activity.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-co-creation-06-two-way-communication.avif",
                  alt: "Two-way conversation between an OUC-Haide member and a student participant.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="QingdaoAcademy co-creation through interactive synthetic biology activities."
              caption={
                "Figure 37. QingdaoAcademy co-creation through interactive synthetic biology activities."
              }
              autoPlay={false}
            />
          </>
        ),
      },
      {
        id: "ihp-beyond-language",
        title: "4.6 Beyond Technical Language",
        content: (
          <>
            <h4>
              <em>{"Ning Yan × Original Song"}</em>
            </h4>
            <p>
              {
                "As Carbotex grew, so did the language needed to explain it: carbon utilization, regulatory engineering, fermentation, PMA, functionalization. Each term was precise, but together they could become a wall."
              }
            </p>
            <p>{"So we began to wonder:"}</p>
            <p>
              <strong>
                {
                  "Could art carry a scientific story where technical language could not?"
                }
              </strong>
            </p>
            <p>
              {"Inspired by Carbotex, we created an "}
              <strong>{"original song"}</strong>
              {
                ", translating the project not word for word, but idea for idea: why we began with straw, why the carbon within it mattered, and what possibilities we hoped biomanufacturing could create. We then invited "
              }
              <strong>
                {
                  "Prof. Ning Yan, Deputy Director of the Department of Arts at Ocean University of China"
                }
              </strong>
              {
                ", to provide professional feedback. Her suggestions helped us revise and shape the piece before its final performance."
              }
            </p>
            <p>
              {
                "On the stage, there were no pathway diagrams, fermentation curves, or genetic constructs. "
              }
              <strong>{"But the story remained."}</strong>
              {
                " We realized that science communication does not always need another explanation. Sometimes, it needs "
              }
              <strong>{"another language"}</strong>
              {"."}
            </p>
            <p>
              {"Perhaps that connection felt so natural because "}
              <strong>{"biology itself can also be an art"}</strong>
              {
                ". We observe the patterns of life, learn how they are written, and through synthetic biology, imagine how they might be written differently."
              }
            </p>
            <p>
              <strong>
                {
                  "The song did not change our strain or our material. It changed the distance between Carbotex and the people listening to it"
                }
              </strong>
            </p>
            <ImageGallery
              images={[
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-art-science-01-carbotex-musical-performance.avif",
                  alt: "Musical performance translating the Carbotex story into an artistic form.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-art-science-02-flute-duet-performance.avif",
                  alt: "Flute duet performed as part of the Carbotex art-and-science communication activity.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
                {
                  src: "https://static.igem.wiki/teams/6147/wiki/ihp-art-science-03-professional-feedback.avif",
                  alt: "Professional feedback session used to refine the Carbotex musical piece.",
                  ratio: "4 / 3",
                  fallback: "Image unavailable.",
                },
              ]}
              label="Carbotex art-and-science communication through an original musical performance."
              caption={
                "Figure 38. Carbotex art-and-science communication through an original musical performance."
              }
              columns={3}
              mobileLayout="swipe"
            />
            <h4>
              <strong>{"What Returned With Us"}</strong>
            </h4>
            <p>
              {
                "We began by taking Carbotex outward. What returned mattered just as much."
              }
            </p>
            <p>
              {"Some conversations brought "}
              <strong>{"new questions and perspectives"}</strong>
              {". Some grew into "}
              <strong>{"collaborations and co creation"}</strong>
              {". Others helped us find "}
              <strong>{"new ways to communicate science"}</strong>
              {
                ". Not every conversation changed an experiment, but each meaningful exchange expanded the space in which Carbotex could grow."
              }
            </p>
            <p>
              {
                "Through listening, questioning, reflecting, and creating, we learned that Human Practices is not only about bringing the world into a project. It is also about allowing the project to "
              }
              <strong>{"grow through its relationships with the world"}</strong>
              {"."}
            </p>
            <p>
              <strong>
                {"Carbotex was built by our team. But it grew in conversation."}
              </strong>
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "ihp-reflection",
    title: "Final Reflection",
    content: <></>,
    subsections: [
      {
        id: "ihp-reflection-1",
        title: "What Human Practices Changed",
        content: (
          <>
            <p>
              <em>
                {
                  "We began Human Practices with questions about Carbotex. By the end of the season, it had changed not only our answers, but also the questions we were asking."
                }
              </em>
            </p>
            <p>
              <em>
                {
                  "Through TRACE, conversations did not remain as isolated feedback. They returned to the project through analysis, decisions, experiments, and evaluation. Human Practices changed what we considered a usable feedstock, what we considered a biological bottleneck, what counted as successful carbon utilization, what PMA could become as a material, and what responsible implementation would require."
                }
              </em>
            </p>
            <p>
              <em>
                {
                  "More importantly, we learned that engagement is not the same as integration. Stakeholder perspectives are not conclusions by themselves. They become meaningful when we examine them critically, connect them with evidence, decide whether — and how — the project should change, and evaluate what follows. Sometimes integration meant changing the project; sometimes it meant refusing to overinterpret an analogy or claim more than our evidence supported."
                }
              </em>
            </p>
            <p>
              <em>
                {
                  "TRACE therefore became more than a way to document our Human Practices. It gave us a way to ask whether an interaction actually entered the project: what triggered the question, whom we reached out to, how we analyzed what we heard, what changed, and how that change was evaluated."
                }
              </em>
            </p>
          </>
        ),
      },
      {
        id: "ihp-reflection-2",
        title: "How We Used Different Perspectives",
        content: (
          <>
            <p>
              {
                "We did not treat stakeholder input as interchangeable or as evidence on its own. Different stakeholders helped us examine different parts of the same decision: agricultural authorities helped us understand regional utilization, farmers and cooperatives exposed collection and storage constraints, and agricultural expertise helped us consider feedstock characteristics; researchers, material specialists, industry, infrastructure providers, and judges similarly contributed different forms of technical, practical, and implementation knowledge. We brought these perspectives together with literature and our own experimental evidence before deciding what should change, what should remain a limitation, and what required further evaluation."
              }
            </p>
          </>
        ),
      },
      {
        id: "ihp-reflection-3",
        title: "From Practice to a Reusable Tool: The TRACE Handbook",
        content: (
          <>
            <HandbookResource
              title="TRACE Handbook"
              href="https://static.igem.wiki/teams/6147/wiki/trace-handbook.pdf"
              actionLabel="Open / Download TRACE Handbook"
              headingAs="h4"
            >
              <p>
                {
                  "Across the cases above, TRACE became a practical way for us to connect stakeholder engagement with project decisions. Rather than leaving that approach only within the Carbotex story, we compiled it into the "
                }
                <strong>{"TRACE Handbook"}</strong>
                {
                  " so that other teams can adapt the same five-part structure — "
                }
                <strong>
                  {"Trigger, Reach Out, Analyze, Change, and Evaluate"}
                </strong>
                {" — to their own Human Practices."}
              </p>
              <p>
                {
                  "The handbook is intended as a reusable starting point, not a rule that every stakeholder interaction must produce a project change. In our own work, a meaningful outcome could be a change in direction, a decision retained with stronger justification, a new question to investigate, or a limitation that needed to remain visible. What mattered was making the path from engagement to reflection, decision, and evaluation traceable."
                }
              </p>
            </HandbookResource>
          </>
        ),
      },
      {
        id: "ihp-reflection-4",
        title: "What Remains Unresolved",
        content: (
          <>
            <p>
              {
                "Integrated Human Practices changed how we developed Carbotex, but it did not answer every question required for real-world deployment. Making those limits explicit is part of how we evaluate the project responsibly."
              }
            </p>
            <p>
              <strong>{"End-user validation."}</strong>
              {
                " Our material work establishes a material concept and an experimentally evaluated adhesive system, not a validated end-user product. We have not yet defined and tested a sufficiently specific use context to claim product-level suitability."
              }
            </p>
            <p>
              <strong>{"Regulatory engagement."}</strong>
              {
                " Industrial, research, and community stakeholders helped us think about scale-up, reproducibility, manufacturing infrastructure, sustainability, and biosafety. These perspectives do not substitute for direct engagement with the relevant regulatory stakeholders that a real implementation pathway would require."
              }
            </p>
            <p>
              <strong>{"Scale-up and system-level evidence."}</strong>
              {
                " Visits and discussions changed the criteria by which we think about manufacturing, but they do not demonstrate that Carbotex itself is ready for industrial production. We have not established a complete downstream process, economic or market feasibility, or a comprehensive life-cycle assessment."
              }
            </p>
            <p>
              {"We therefore treat these as "}
              <strong>{"open questions for the next iteration"}</strong>
              {
                ", rather than as achievements already demonstrated by Carbotex."
              }
            </p>
            <p>
              <em>
                {
                  "Not every conversation changed Carbotex, and not every implementation question has been resolved. That is part of the lesson. We did not use Human Practices to prove that our first idea was right. We used it to give Carbotex the chance to become better — and to recognize where more work is still needed."
                }
              </em>
            </p>
            <p>
              <em>
                {
                  "Carbotex was built in the laboratory, but shaped through its relationship with the world."
                }
              </em>
            </p>
          </>
        ),
      },
    ],
  },
];
export function HumanPractices() {
  return (
    <div className={styles.page}>
      <ArticlePage
        chapter="Human Practices"
        title="Integrated Human Practices"
        lead="We did not use Human Practices to justify Carbotex. We used it to modify Carbotex."
        sections={sections}
        references
      />
    </div>
  );
}
