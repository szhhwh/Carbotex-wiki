import type { IhpSectionContent } from "../components/human-practices/ihp-types";
import { anchor, figure, gallery, label, rich } from "./ihp-reviewed-helpers";

export const ihpReviewedSection3: IhpSectionContent = {
  id: "ihp-responsible-implementation",
  title: "Responsible Implementation",
  parts: [anchor("section-3")],
  subsections: [
    {
      id: "ihp-sustainability",
      title: "3.1 Rethinking Sustainability",
      parts: [
        anchor("section-3-1"),
        rich(
          "Our project began with the possibility of transforming straw-derived carbon into a functional bio-based adhesive. As we moved from PMA fermentation to PMA–dopamine (PMA-DA) material preparation, we began to question whether using a renewable feedstock was, by itself, enough to make the overall process sustainable.",
        ),
        {
          kind: "trace",
          number: 10,
          stages: [
            {
              stage: "trigger",
              parts: [
                rich(
                  "Carbotex explores an additional material-use pathway for agricultural carbon through microbial PMA production and subsequent functionalization. Initially, the renewable origin of the feedstock was an important part of how we understood the project's potential environmental relevance.\n\nHowever, our actual workflow extended beyond feedstock selection to fermentation, chemical coupling, dialysis, and freeze-drying. We therefore asked:\n\n**Does renewable carbon automatically make an adhesive-production process sustainable, and what else should we consider?**",
                ),
              ],
            },
            {
              stage: "reach-out",
              parts: [
                anchor("ihp-eva"),
                rich("**Eva — Sustainability Expert**", true),
                figure(
                  20,
                  "https://static.igem.wiki/teams/6147/wiki/ihp-sustainability-eva-sdgs-whole-system-perspective.avif",
                  "Discussion with sustainability expert Eva about the Sustainable Development Goals and whole-system sustainability.",
                  "Sustainability discussion with Eva.",
                  "310 / 410",
                ),
                rich(
                  "To examine this question, we spoke with Eva about sustainability and the United Nations Sustainable Development Goals (SDGs).\n\nEva encouraged us to look beyond the renewable origin of our feedstock and consider **resource inputs, energy requirements, processing steps, and downstream treatment** across the production pathway. Her feedback helped us recognize that an environmentally motivated starting material does not, on its own, establish the environmental performance of a final product.\n\nThe discussion also gave us a way to think about the SDGs: not as labels confirming success, but as questions that could help us examine the significance and limitations of Carbotex.",
                ),
              ],
            },
            {
              stage: "analyze",
              parts: [
                rich(
                  "**From Renewable Feedstocks to the Whole Process**\n\nWe reconsidered the actual steps linking straw-derived sugars to adhesive material preparation. A collaborating laboratory supplied corn-stover hydrolysate; our team used *Aureobasidium melanogenum* A08 to produce PMA, and then explored dopamine functionalization of PMA-containing fermentation broth.\n\nIn addition to the carbon feedstock, this route includes fermentation-medium inputs, coupling reagents such as dopamine, EDC·HCl and NHS, dialysis water, and energy-intensive steps such as prefreezing and freeze-drying.\n\n**This made us distinguish the renewable origin of a material from the sustainability of its full production process.** It also helped us identify categories of inputs to consider when developing a preliminary material-preparation cost analysis later in the project. Financial cost, however, is not itself a measure of environmental impact.\n\n**From SDG Labels to Practical Questions**\n\nThe SDGs are 17 interconnected goals established under the United Nations 2030 Agenda in 2015 {{cite:UN2015SDGs}}. Rather than claiming alignment with every goal, we use SDGs 9, 12, and 13 to examine three distinct dimensions of the Carbotex pathway.\n\n*Click each SDG icon to flip the card and explore its connection to Carbotex. Click again to return.*",
                ),
                { kind: "sdg-cards" },
                rich(
                  "Taken together, these goals prompted three different reflections: **SDG 9** led us to consider the pathway from laboratory innovation to reliable production; **SDG 12** directed our attention toward process inputs and resource use; and **SDG 13** reminded us that an environmental motivation is not the same as verified environmental benefit.",
                ),
              ],
            },
            {
              stage: "change",
              parts: [
                rich(
                  "Eva's feedback encouraged us to reconsider sustainability beyond the renewable origin of our feedstock. We began examining the broader PMA–DA production pathway, including chemical modification, dialysis, and freeze-drying, and the resources these processes might require.\n\nThis broader perspective helped us identify relevant inputs for preliminary cost estimation and priorities for future process optimization, shifting our attention from the material's origin toward the environmental implications of its production.",
                ),
              ],
            },
            {
              stage: "evaluate",
              parts: [
                rich(
                  "This exchange helped us distinguish between the environmental motivation behind Carbotex and its demonstrated environmental performance. Although we have developed a PMA-derived adhesive formulation at the laboratory scale, we have not yet conducted a full life-cycle assessment or quantified its net environmental benefits.\n\nFuture evaluation would require a more systematic assessment of material and energy inputs, processing requirements, and environmental impacts, following established frameworks such as ISO 14040 and ISO 14044 {{cite:ISO14040_2006,ISO14044_2006}}.\n\n**Eva's feedback helped us understand that sustainability must be evaluated across the entire production pathway, rather than assumed from the renewable origin of its materials.**\n\nThis understanding also raised another important question: **what would be required to translate our laboratory pathway into a reliable manufacturing process?**",
                ),
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
        anchor("section-3-2"),
        {
          kind: "trace",
          number: 11,
          stages: [
            {
              stage: "trigger",
              parts: [
                rich(
                  "Through our earlier work, Carbotex developed an experimental pathway connecting straw-derived sugars, polymalic acid (PMA) production by engineered *Aureobasidium melanogenum* A08, dopamine functionalization, and preliminary evaluation of adhesive performance.\n\nBut the ability to carry out fermentation and material preparation in the laboratory does not, by itself, establish a reliable manufacturing process. As our project progressed from individual experiments toward a connected production pathway, we began to ask questions that could not be answered by a single PMA titer or adhesive test. Could fermentation performance remain consistent across batches? How might separate processing steps be connected? And how could data gathered by different research groups support future engineering decisions?\n\n**Beyond improving PMA production and material properties, what would Carbotex need to consider before moving toward reliable manufacturing?**",
                ),
              ],
            },
            {
              stage: "reach-out",
              parts: [
                rich(
                  "To explore the gap between laboratory feasibility and practical manufacturing, we visited industrial companies, a biotechnology organization, and a synthetic biology research infrastructure. Each exchange offered a different perspective on fermentation reliability, process integration, research evidence, or standardized engineering.",
                  true,
                ),
                anchor("ihp-tsingtao"),
                label(
                  "3.2.1 Tsingtao Brewery — From Fermentation Yield to Process Reliability",
                ),
                gallery(
                  21,
                  [
                    {
                      src: "https://static.igem.wiki/teams/6147/wiki/ihp-tsingtao-brewery-production-line-reliable-fermentation.avif",
                      alt: "Industrial fermentation production line observed during the Tsingtao Brewery visit",
                    },
                    {
                      src: "https://static.igem.wiki/teams/6147/wiki/ihp-tsingtao-brewery-site-fermentation-scale-up.avif",
                      alt: "Carbotex team visit to Tsingtao Brewery to learn about fermentation scale-up",
                    },
                  ],
                  "Industrial fermentation exchange at Tsingtao Brewery.",
                ),
                rich(
                  "Our visit to Tsingtao Brewery introduced us to the practical importance of process monitoring, batch consistency, and controlled operating conditions in industrial fermentation.\n\nOur discussions with fermentation experts at **Tsingtao Brewery** helped us better understand the gap between laboratory research and real-world industrial production. We realized that achieving higher PMA titers in the laboratory is only an initial step, and that moving Carbotex toward practical application and eventual commercialization would require further efforts in process optimization, production stability, scale-up validation, and economic feasibility.\n\nThis exchange gave us a clearer understanding of the challenges ahead and the work needed to translate our laboratory achievements into a commercially viable process.\n\nThe exchange therefore changed how we understood scale-up: **it is not simply a matter of increasing culture volume, but of achieving reproducible production under controlled conditions.**\n\nWe consequently began to regard fermentation stability, batch-to-batch consistency, and monitoring as important questions for future assessments of PMA manufacturing feasibility.",
                ),
                anchor("ihp-kinger"),
                label(
                  "3.2.2 Kinger Robot — From Industrial Insights to Hardware Improvement",
                ),
                rich(
                  "Kinger Robot is a company specializing in industrial robotics and automated manufacturing. To better understand how automation technologies are applied in real production environments, our team visited the company and learned about its manufacturing facilities, equipment integration, and approaches to automated operations.\n\nDuring the factory tour, we observed how industrial manufacturing depends not only on the performance of individual machines, but also on the coordination of different operations, reliable system control, and continuous process monitoring. These practical considerations were particularly relevant to the engineering challenges faced by Carbotex.",
                ),
                gallery(
                  22,
                  [
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
                  "Automation discussion at Kinger Robot.",
                  3,
                  "270 / 220",
                ),
                rich(
                  "Members of our **Hardware team** also took this opportunity to discuss practical challenges encountered during the development of our automated liquid-pretreatment system. In particular, we were interested in how multiple pumps, valves, and treatment stages could be coordinated to improve operational efficiency and reduce manual intervention.\n\nDrawing on their experience in industrial automation, the engineers at Kinger Robot offered valuable perspectives on equipment coordination, operational reliability, and process integration. These discussions encouraged us to pay greater attention to how different hardware components could work together as a complete system, rather than focusing only on the performance of individual devices.\n\n**One specific area we focused on was the coordination of peristaltic pumps and multi-way valves for automated fluid-path switching.** Our Hardware design organizes adsorption, washing, and resin regeneration into automatically switchable fluid paths, allowing the resin to be reused without manual replacement. This provided a concrete example of how the process-integration principles discussed during the visit could be reflected in our engineering work.\n\nThe exchange also reinforced the importance of operational monitoring, complementing our development of an IoT-based system for tracking treatment conditions.",
                ),
                {
                  kind: "related",
                  title: "Hardware Development and Testing",
                  parts: [
                    rich(
                      "Our Hardware team developed an **automated liquid-pretreatment platform** combining a cation-exchange resin column, peristaltic pumps, and multi-way valves to coordinate adsorption, washing, and resin regeneration. The system also incorporated **IoT-based monitoring** of key operating conditions.\n\nTests using real anaerobic fermentation effluent showed that the platform could reduce ammonia nitrogen to levels compatible with downstream aerobic fermentation under the tested conditions. This work provided a practical example of process integration, while further optimization and scale-up validation remain necessary.\n\nFor Carbotex, the visit to Kinger Robot connected industrial engineering experience with our own technical challenges. **It helped us recognize that successful automation requires not only functional individual components, but also reliable coordination, monitoring, and integration across the entire process.** These insights provided valuable direction for the continued improvement of our Hardware system and our broader consideration of future manufacturing applications.",
                    ),
                    rich(
                      "**[Explore Our Hardware Design →](/hardware)**",
                      true,
                    ),
                    figure(
                      23,
                      "https://static.igem.wiki/teams/6147/wiki/ion-exchange-transparent-1.webp",
                      "Carbotex Hardware design for modular liquid pretreatment and process integration",
                      "Carbotex hardware-system schematic.",
                      "740 / 500",
                    ),
                  ],
                },
                anchor("ihp-bgi"),
                label(
                  "3.2.3 BGI — From Data Management to Traceable Research Evidence",
                ),
                gallery(
                  24,
                  [
                    {
                      src: "https://static.igem.wiki/teams/6147/wiki/ihp-bgi-data-translation-meeting.avif",
                      alt: "Exchange at BGI about data management and biotechnology research",
                    },
                    {
                      src: "https://static.igem.wiki/teams/6147/wiki/ihp-bgi-group-visit.avif",
                      alt: "Carbotex team during the BGI visit",
                    },
                  ],
                  "Research data discussions at BGI.",
                ),
                rich(
                  "BGI is a leading life-science organization known for its work in genomics, bioinformatics, and large-scale biological data analysis. To better understand how complex biological research projects manage and interpret data, our team visited BGI and exchanged ideas on data management, analytical methods, and the practical application of biotechnology research.\n\nDuring the visit, we learned about the importance of organizing large amounts of research information, maintaining data traceability, and connecting analytical results with their original sources. These considerations were particularly relevant to the challenges faced by Carbotex as our experimental and modeling work progressed.\n\nMembers of our **Model team** also used this opportunity to discuss challenges related to organizing and interpreting research evidence. As Carbotex progressed, experimental records, literature references, and molecular modeling results accumulated across different modules, making it increasingly important to connect conclusions with their supporting evidence.\n\nOur discussions at BGI highlighted the value of systematic data organization and transparent evidence tracking. In particular, we recognized that a useful research tool should not simply provide answers, but also allow researchers to identify and examine the original information supporting those answers.\n\n**One specific area we focused on was improving evidence traceability across different research sources.** This perspective reinforced our approach to WetFlow, encouraging us to emphasize source-linked evidence retrieval and clearer distinctions between experimental measurements, published findings, and modeling interpretations.",
                ),
                {
                  kind: "related",
                  title: "WetFlow Research Agent",
                  parts: [
                    rich(
                      "Our Model team developed **WetFlow**, a research Agent workspace that brings together local research documents, publicly available literature, and relevant modeling results. Its evidence-retrieval functions allow researchers to revisit original sources and examine the information supporting research conclusions.\n\nIn demonstrations based on our PMA–dopamine adhesive research, WetFlow helped reconstruct experimental procedures and compare reported dopamine feeding conditions. It also helped distinguish between initial feeding ratios, reported product composition, and actual grafting efficiency, illustrating the importance of interpreting research data within its original context.\n\nThese demonstrations revisited existing research rather than determining our earlier experimental choices. Nevertheless, they provided a practical example of how improved evidence organization could support future scientific analysis and decision-making.\n\nFor Carbotex, the BGI exchange helped us recognize that **reliable research depends not only on generating data, but also on organizing, interpreting, and tracing that data back to their sources.** These insights provided valuable direction for the continued development of WetFlow and our approach to managing evidence across different research modules.",
                    ),
                    rich(
                      "**[Explore Our WetFlow Research Agent →](/model#model-overview)**",
                      true,
                    ),
                  ],
                },
                anchor("ihp-shenzhen-infrastructure"),
                label(
                  "3.2.4 Shenzhen Synthetic Biology Infrastructure — Toward Standardized Engineering",
                ),
                rich(
                  "Our visit to the Shenzhen synthetic biology research infrastructure introduced us to automated and standardized **Design–Build–Test–Learn (DBTL)** workflows.\n\nThe exchange highlighted the importance of reproducibility, systematic experimental records, and continuous improvement in synthetic biology. It encouraged us to consider how successive rounds of Carbotex's biological and material engineering could be better connected through standardized evaluation and feedback.",
                ),
                figure(
                  25,
                  "https://static.igem.wiki/teams/6147/wiki/ihp-shenzhen-synthetic-biology-infrastructure.avif",
                  "Carbotex visit to the Shenzhen synthetic biology research infrastructure",
                  "Exploring standardized DBTL workflows in Shenzhen.",
                  "540 / 380",
                ),
              ],
            },
            {
              stage: "analyze",
              parts: [
                label(
                  "3.2.5 From Laboratory Success to Manufacturing Readiness",
                ),
                rich(
                  "Although the four exchanges addressed different aspects of biotechnology development, they revealed a common challenge: **laboratory success does not automatically translate into reliable industrial production.**\n\nTsingtao Brewery emphasized fermentation stability, Kinger Robot highlighted automation and process integration, BGI drew attention to data traceability, and the Shenzhen infrastructure demonstrated the value of standardized engineering workflows.\n\nTogether, these perspectives helped us recognize the broader requirements for translating Carbotex from laboratory research toward practical manufacturing.",
                ),
              ],
            },
            {
              stage: "change",
              parts: [
                rich(
                  "These exchanges broadened our engineering perspective beyond PMA production and adhesive performance. We began to consider **production consistency, process integration, evidence traceability, and reproducibility** as important priorities for future development.\n\nOur Hardware team's automated pretreatment system and the Model team's WetFlow research Agent provided practical examples of how process automation and research evidence management could be explored. Although these projects were not directly initiated by the visits, the exchanges helped us better understand their relevance to future manufacturing challenges.",
                ),
              ],
            },
            {
              stage: "evaluate",
              parts: [
                rich(
                  "Carbotex has demonstrated laboratory-scale PMA production and PMA–DA material preparation, alongside progress in hardware automation and research data management. However, further validation of production stability, process integration, and scalability is still needed before industrial implementation can be considered.\n\nThese exchanges helped us identify the gap between our current achievements and the requirements of real-world manufacturing, providing clearer priorities for future development.\n\n**For Carbotex, laboratory success is the beginning of the journey toward reliable manufacturing, rather than its final destination.**\n\nThis understanding also led us to consider another important question: **beyond technical feasibility, how could Carbotex meet real application needs and move toward economic and commercial viability?**",
                ),
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
        anchor("section-3-3"),
        rich("*From Laboratory Innovation to Practical Value*", true),
        {
          kind: "trace",
          number: 12,
          stages: [
            {
              stage: "trigger",
              parts: [
                rich(
                  "As Carbotex progressed from microbial PMA production to dopamine-functionalized PMA (PMA-DA), we began exploring the material's adhesive properties on glass, stainless steel, and ex vivo porcine skin, alongside its behavior in aqueous environments and preliminary biological responses.\n\nThese experiments suggested promising directions for further material development. However, they also raised a question beyond laboratory performance:\n\n**What would make PMA-DA valuable in a real application, and what would be required to produce it economically and reliably?**\n\nAddressing this question required us to consider production costs, potential users, and the distinctive properties that might justify further development.",
                ),
              ],
            },
            {
              stage: "reach-out",
              parts: [
                rich(
                  "During the 2026 Conference of China iGEMer Community (CCiC), we participated in an Unconference organized by DUT-China on project commercialization and startup incubation.\n\nThe discussion introduced us to considerations beyond technical innovation, including manufacturing feasibility, production costs, market demand, and business models.\n\nIt encouraged us to approach Carbotex not only as a scientific project, but also from the perspective of potential users and manufacturers. We realized that a promising material must address a clearly defined need while offering a feasible route toward production.",
                ),
                figure(
                  26,
                  "https://static.igem.wiki/teams/6147/wiki/ihp-peer-community-dut-unconference-01-group-photo.avif",
                  "Carbotex team at the CCiC Unconference on commercialization and startup incubation",
                  "CCiC discussion on commercialization.",
                  "540 / 380",
                ),
                rich(
                  "**[View Our CCiC Commercialization Discussion Notes →](https://static.igem.wiki/teams/6147/wiki/igem-discussion-notes.pdf)**",
                  true,
                ),
                rich(
                  "Following this exchange, we decided to examine **the costs associated with our production pathway** and reconsider where PMA-DA could offer meaningful application value.",
                ),
              ],
            },
            {
              stage: "analyze",
              parts: [
                label("3.3.1 Understanding Upstream Production Costs"),
                rich(
                  "To better understand the economic requirements of producing PMA-DA, we first revisited the upstream production of straw-derived fermentable sugars.\n\nWe consulted **Professor Yajun Liu** for a second time. Her team had previously supported our project by providing consolidated bio-saccharification (CBS) hydrolysate for PMA fermentation. This follow-up discussion shifted our attention from technical collaboration toward the resources and processing steps involved in producing the hydrolysate.\n\nWe examined the requirements of biomass pretreatment, saccharification, culture-medium preparation, and possible downstream treatment.\n\nRelated research from Professor Liu's team provided quantitative reference conditions, including approximately **40 g/L of pretreated corn stover** and **24.3 g/L of reducing sugars** in a published CBS process {{cite:Liu2023CBS}}.\n\nThese values provided a reference for preliminary estimation rather than the actual cost of the hydrolysate supplied to Carbotex.\n\nThis second consultation helped us recognize that although agricultural straw provides renewable carbon, converting it into a usable fermentation substrate still requires materials, energy, and processing resources.",
                ),
                label("3.3.2 Preliminary Material-Cost Analysis"),
                rich(
                  "Combining our laboratory preparation records with available reagent prices and upstream reference data, we conducted a preliminary calculation of selected material costs for PMA-DA preparation.\n\nFor a scenario beginning with **200 mL of fermentation broth at 18 g/L PMA**, the theoretical PMA input was approximately **3.6 g**.\n\nAssuming a dopamine-to-PMA-carboxyl molar ratio of 1:1 and two molar equivalents each of EDC·HCl and NHS, we obtained the following estimate:",
                ),
                { kind: "cost-breakdown" },
                rich(
                  "*Notes: The dopamine range represents alternative reagent calculation scenarios rather than measured price fluctuations. The CBS estimate uses published process conditions and an assumed PMA yield of 0.5 g per g of reducing sugar. The subtotal covers only selected priced inputs and does not represent the complete production cost or the unit cost of recovered PMA-DA.*\n\nThe calculation showed that **dopamine accounted for approximately 83–86% of the material costs included in our current model**.\n\nThis highlighted dopamine consumption as an important consideration for future optimization. We also recognized that dialysis, freeze-drying, material recovery, equipment operation, and other resource inputs could substantially affect production feasibility.\n\nAlthough the calculation remains preliminary, it helped us identify which additional data would be needed for a more complete economic assessment.",
                ),
                label("3.3.3 Identifying Application-Specific Value"),
                rich(
                  "Alongside production costs, we reconsidered the potential value of PMA-DA itself.\n\nPMA provides carboxyl groups for chemical modification, while dopamine functionalization introduces catechol groups that may contribute to interfacial adhesion.\n\nOur preliminary experiments on different substrates, including underwater-related tests and biological-response assessments, suggested directions for further investigation in **moisture-exposed bonding and specialized material interfaces**.\n\nPotential biological-interface applications would require much more extensive safety and performance validation.\n\nThese observations encouraged us to shift the discussion from the price of the material alone toward a more important question:\n\n**Which specific application needs could benefit from the properties of PMA-DA?**",
                ),
              ],
            },
            {
              stage: "change",
              parts: [
                rich(
                  "The CCiC exchange changed how we approached the future development of Carbotex.\n\nRather than evaluating progress solely through PMA production and adhesive performance, we began considering **production resources, functionalization efficiency, downstream processing, and application requirements** together.\n\nThis shift led us to consult Professor Liu again, examine the upstream production pathway, and conduct our preliminary material-cost calculation.\n\nThe results also helped us identify priorities for future optimization, particularly dopamine consumption, purification efficiency, and final material recovery.\n\nAt the same time, we began placing greater emphasis on defining suitable applications and understanding the expectations of potential users.",
                ),
              ],
            },
            {
              stage: "evaluate",
              parts: [
                rich(
                  "These activities helped us develop a more realistic understanding of Carbotex's commercial potential.\n\nOur preliminary cost analysis identified important material inputs, but it cannot yet establish the complete unit production cost. Further work will require actual PMA-DA recovery data, more comprehensive process records, and evaluation under conditions relevant to larger-scale manufacturing.\n\nSimilarly, our material experiments provide a starting point for identifying potential applications, rather than evidence of established commercial performance.\n\n**The most important outcome was a change in perspective: we began evaluating Carbotex not only by what our material could achieve in the laboratory, but also by what it would take to create practical value beyond it.**",
                ),
              ],
            },
          ],
          outro: [
            label(
              "3.3.4 Commercialization Outlook — Toward Practical Applications",
            ),
            rich(
              "Building on our material experiments and exchanges with researchers, industry representatives, and the iGEM community, we developed a preliminary commercialization outlook for Carbotex.\n\nRather than assuming a single application, we identified several directions worth investigating, including moisture-exposed bonding, functional surface interfaces, and longer-term biological-interface research.\n\nOur proposed development pathway focuses on **identifying specific user needs, validating reproducible material performance, and assessing manufacturing, economic, environmental, and safety requirements**.\n\nThese directions remain opportunities for future research rather than established commercial applications.\n\nWe have summarized the potential application scenarios, their necessary validation steps, and our proposed development roadmap in a separate document.\n\n**[Explore Our Carbotex Commercialization Outlook (PDF) →](https://static.igem.wiki/teams/6147/wiki/carbotex-commercialization-outlook-final.pdf)**\n\n**For Carbotex, the goal is not simply to transform agricultural straw into an adhesive, but to explore how that material could eventually meet real needs through responsible and practical innovation.**\n\nAs these potential applications develop, ensuring the safety of both the production process and the resulting material will become increasingly important. We address these responsibilities in [Section 3.4 — From Biosafety to Product Responsibility](#section-3-4).",
            ),
          ],
        },
      ],
    },
    {
      id: "ihp-biosafety",
      title: "3.4 From Biosafety to Product Responsibility",
      parts: [
        anchor("section-3-4"),
        rich(
          "*Embedding Safety Throughout the Journey from Engineered Cells to Functional Materials*",
          true,
        ),
        {
          kind: "trace",
          number: 13,
          stages: [
            {
              stage: "trigger",
              parts: [
                rich(
                  "As Carbotex progressed from microbial PMA production toward dopamine-functionalized PMA (PMA-DA), our understanding of safety began to extend beyond the laboratory.\n\nSafety had been part of our work from the beginning, particularly in strain construction, genetic manipulation, fermentation, and biological waste management. However, developing a functional adhesive introduced additional considerations related to material preparation, purification, and potential applications.\n\nOur experiments on glass, stainless steel, and ex vivo porcine skin, together with underwater adhesion tests, PBS mass-change measurements, and preliminary L929 cell assessments, encouraged us to explore the material's potential in different environments.\n\nThis raised an important question:\n\n**How could we extend responsible research practices from the engineered production strain to the final adhesive and its intended applications?**",
                ),
              ],
            },
            {
              stage: "reach-out",
              parts: [
                anchor("ihp-grand-apic"),
                rich(
                  "At Grand APiC, we introduced Carbotex's genetic engineering strategy, PMA production pathway, and plans for developing PMA-DA as a functional adhesive.\n\nDuring the discussion, the judges raised an important biosafety question concerning **horizontal gene transfer (HGT)** and the genetic elements carried by engineered microorganisms.\n\nTheir feedback encouraged us to look beyond laboratory containment and consider the genetic information introduced into our production strains, how these elements were managed, and their potential implications outside the intended production environment.\n\nHorizontal gene transfer is a recognized mechanism of genetic exchange among microorganisms {{cite:Brito2021HGT}}. However, this does not demonstrate that HGT has occurred in our engineered A08 strains. Rather, it highlights a potential consideration for responsible genetic engineering and biosafety assessment.",
                ),
                figure(
                  27,
                  "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-02-carbotex-poster-exchange.webp",
                  "Carbotex presenting the project at Grand APiC",
                  "Carbotex poster presentation at Grand APiC.",
                  "540 / 380",
                ),
                figure(
                  28,
                  "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-03-responsible-research-session.webp",
                  "Discussion on responsible research at Grand APiC",
                  "Grand APiC discussion on responsible research.",
                  "540 / 380",
                ),
              ],
            },
            {
              stage: "analyze",
              parts: [
                anchor("ihp-3-4-hgt-response"),
                label("3.4.1 Responding to the Judges' Question"),
                rich(
                  "In response to the judges' concerns about HGT, we clarified the distinction between our engineered production microorganism and the intended final product.\n\nCarbotex uses engineered *Aureobasidium melanogenum* A08 strains to produce PMA under laboratory containment. Our intended final product is a processed PMA-DA adhesive rather than a material designed to contain living engineered microorganisms.\n\nIn our preparation workflow, microbial cells are separated from the fermentation broth by centrifugation before the PMA-containing liquid undergoes dopamine functionalization and subsequent purification.\n\nNevertheless, **cell separation alone does not guarantee the complete removal of residual microorganisms or genetic material**. We therefore recognized the importance of reviewing the genetic elements present in our production strains, maintaining appropriate laboratory containment and biological waste management, and evaluating microbial residue removal during downstream processing.\n\nAlthough we have not directly assessed HGT in our engineered strains, the judges' question helped us identify important considerations for future biosafety evaluation.\n\n**This exchange encouraged us to approach genetic safety throughout the production pathway, rather than assuming that laboratory containment or cell separation alone could address every potential risk.**",
                ),
                label("3.4.2 Managing Engineered A08 and Its Genetic Elements"),
                rich(
                  "Following the Grand APiC discussion, we revisited the genetic background and construction records of our engineered A08 strains.\n\nOur engineering work involved genetic-expression and selection systems. For example, NAT selection appears in our construction records, while HPT is associated with certain knockout-donor designs. These records must be distinguished from the actual genetic composition of the strains used for PMA production.\n\nThe feedback reminded us that meaningful biosafety assessment requires an understanding of the specific genetic elements involved, their functions, and their status in the final production strain.\n\nWe also considered how genetic-element management connects with laboratory containment, microbial culture handling, and biological waste treatment.\n\n**This helped us recognize that biosafety decisions should be grounded in the actual genetic design and operating conditions of our production system.**",
                ),
                label(
                  "3.4.3 From Fermentation Broth to Adhesive: Why Purification Matters",
                ),
                rich(
                  "We also reconsidered the transition from microbial production to material preparation.\n\nIn our Wet Lab workflow, microbial cells are separated by centrifugation, followed by dopamine functionalization using an EDC·HCl/NHS coupling system. Dialysis, prefreezing, and freeze-drying are subsequently used for material preparation and recovery.\n\nThese processes are important not only for obtaining usable adhesive samples, but also for controlling the composition and quality of the resulting material.\n\nFermentation may introduce microbial components, while chemical functionalization involves dopamine, coupling reagents, and reaction by-products. Therefore, future material evaluation should consider whether relevant residual components are adequately removed.\n\nThis understanding also connected with our cost analysis in [Section 3.3](#section-3-3). While purification and freeze-drying contribute to processing requirements and resource consumption, they also have important implications for material quality.\n\n**Future process optimization should therefore consider production efficiency and purification performance together.**",
                ),
                label("3.4.4 From Adhesive Performance to Application Safety"),
                rich(
                  "Our experiments on glass, stainless steel, and ex vivo porcine skin provided preliminary information about PMA-DA adhesion on different surfaces.\n\nUnderwater-condition tests, PBS mass-change measurements, and L929 cell-based assessments further contributed to our understanding of the material's behavior in aqueous and biological testing environments.\n\nHowever, different applications require different safety considerations.\n\nFor industrial bonding, relevant questions may include material stability, handling, and potential exposure during use. Biological-interface applications would require more extensive assessment of material composition, possible released substances, and biological responses under relevant conditions.\n\nOur current experiments provide a starting point for these investigations, but they do not establish the safety of PMA-DA for any particular commercial or medical application.\n\n**Understanding where a material can adhere is only one part of development; understanding how it behaves in its intended environment is equally important.**",
                ),
                label("3.4.5 From Safety Awareness to Laboratory Practice"),
                rich(
                  "Alongside these material and genetic considerations, we also strengthened our understanding of everyday laboratory safety.\n\nDuring an on-site laboratory session, an instructor explained experimental procedures, instrument operation, and essential safety precautions. This guidance reinforced the importance of recognizing risks and following appropriate operating procedures.",
                ),
                figure(
                  29,
                  "https://static.igem.wiki/teams/6147/wiki/ihp-3-4-lab-safety-training.avif",
                  "Laboratory instruction on experimental procedures and safety precautions",
                  "Laboratory safety instruction.",
                  "540 / 380",
                ),
                rich(
                  "The Virtual Simulation Laboratory Management Platform of **Ocean University of China** also provides educational resources for laboratory safety. These virtual exercises offer opportunities to become familiar with experimental procedures and identify potential risks before working with actual equipment and materials.\n\nTogether, practical instruction and virtual learning resources highlighted the importance of maintaining safety awareness throughout daily experimental work.",
                ),
              ],
            },
            {
              stage: "change",
              parts: [
                rich(
                  "The feedback from Grand APiC and our subsequent reflections helped us refine our approach to safety across three areas.\n\n**First, we placed greater emphasis on genetic-element management.** The judges' questions encouraged us to review strain-construction records and consider the actual genetic composition of our production microorganisms when discussing biosafety.\n\n**Second, we incorporated material purification and quality into our safety considerations.** We recognized that improving production efficiency should also involve evaluating the removal of microbial components and functionalization-related residues.\n\n**Third, we reinforced the importance of laboratory safety education.** The instructor's guidance and available virtual simulation resources helped us connect biosafety awareness with everyday experimental practice.\n\nTogether, these considerations provided a clearer framework for our work:",
                ),
                {
                  kind: "flow",
                  steps: [
                    "Engineered Strain Management",
                    "Laboratory Safety",
                    "Material Preparation and Purification",
                    "Application-Specific Safety Evaluation",
                  ],
                },
                rich(
                  "More importantly, **the feedback from Grand APiC provided valuable guidance for our team's broader Safety work**. It encouraged us to consider safety throughout the entire Carbotex pathway, connecting genetic engineering, laboratory operations, downstream processing, and the responsibilities associated with future material applications.",
                  true,
                ),
              ],
            },
            {
              stage: "evaluate",
              parts: [
                rich(
                  "These exchanges helped us develop a more comprehensive understanding of safety and responsibility in Carbotex.\n\nWe recognized the importance of genetic-element management, appropriate laboratory procedures, and careful evaluation of material purification and intended use.\n\nAt the same time, important questions remain. We have not directly evaluated HGT in our production strains, established complete removal of microbial or chemical residues, or completed application-specific safety validation of PMA-DA.\n\nRather than treating these uncertainties as evidence of safety, we now see them as important questions for future research and development.\n\n**Through this exchange, safety became more than a set of laboratory precautions. It became a guiding principle for how we design, develop, and evaluate Carbotex — ensuring that responsibility remains part of innovation from the engineered microorganism to the final material.**\n\nThis perspective also complements our commercialization exploration in [Section 3.3](#section-3-3). As we consider how PMA-DA might meet real application needs, product quality and safety must remain central to future development.",
                ),
              ],
            },
          ],
          outro: [
            label(
              "3.4.6 Future Outlook — Making Safety Part of Practical Application",
            ),
            rich(
              "Moving forward, we aim to strengthen safety considerations throughout the Carbotex production pathway.\n\nFor our engineered strains, this includes improving genetic records and developing more targeted biosafety assessments. For material preparation, we plan to further examine purification performance and potential residual components. For future applications, we hope to conduct more systematic material characterization and safety evaluations according to specific use requirements.\n\nWe will also continue emphasizing laboratory safety education and responsible experimental practices across the team.\n\n**Ultimately, our goal is not only to develop a promising bio-based adhesive, but also to establish a responsible pathway from biological production to practical application.**\n\nFor Carbotex, responsible innovation means considering not only what our technology can achieve, but also how safely and thoughtfully it can be developed and used.",
            ),
          ],
        },
      ],
    },
  ],
};
