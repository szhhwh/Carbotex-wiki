import { type ArticleSection } from "../../components/article/ArticlePage";
import { Cite } from "../../components/article/References";
import { Figure } from "../../components/media/Figure";
import { FigurePair } from "../../components/media/FigurePair";

// ArticlePage owns the visual sequence numbers for top-level sections. Keep
// source heading prefixes out of titles so the outline stays consistent.
export const sections: ArticleSection[] = [
  {
    id: "safety-introduction",
    title: "Introduction",
    content: (
      <>
        <p>
          Safety is a core principle of our experimental project and a
          prerequisite for its success. To ensure that our work proceeds
          smoothly and to protect the health and safety of team members, we
          follow safety requirements throughout every stage of the project. In
          synthetic biology, safety is not merely a project requirement; it is
          also a responsibility to society and the environment. Accordingly, we
          apply rigorous safety measures from chassis selection and project
          design through experimental implementation.
        </p>
        <p>
          Before starting the project, we assessed potential biological and
          chemical hazards to ensure that the materials and procedures used met
          applicable safety requirements. In addition to following laboratory
          safety procedures, we emphasize safety awareness and practical
          competence. All team members completed safety training and passed the
          laboratory access qualification examination before undertaking
          laboratory work.
        </p>
        <p>
          These measures help ensure that our experiments are conducted safely
          and provide a sound basis for project implementation. We aim to carry
          out rigorous research and to develop practices that may inform safety
          management in future synthetic biology projects.
        </p>
      </>
    ),
  },
  {
    id: "microbial-safety",
    title: "Microbial Safety",
    content: (
      <>
        <p>
          The corn stover hydrolysate used in the saccharification module was
          prepared and supplied by the collaborating laboratory of our
          supervisor, Yajun Liu. Our team did not handle the microorganism used
          in the saccharification step, namely the engineered{" "}
          <em>Clostridium thermocellum</em> ΔpyrF::P2638-BGL used for
          consolidated bio-saccharification (CBS){" "}
          <Cite k={["liu2023cornbioconversion", "qi2021cellulosomebgl"]} />.{" "}
          <em>Clostridium thermocellum</em> ΔpyrF::P2638-BGL is a thermophilic,
          anaerobic bacterium that is not generally recognized as a common human
          pathogen and is considered to pose a low pathogenic risk to healthy
          individuals. It requires anaerobic cultivation at 55–60 °C and is
          therefore unlikely to grow persistently or establish itself in
          ambient, aerobic conditions outside the fermenter, resulting in a low
          risk of biological dissemination <Cite k="wang2026cthermocellum" />.
          The material brought into our laboratory was the hydrolysate produced
          by this bacterium, a mixed glucose–xylose solution. The viable
          engineered microorganisms handled by our team were limited to{" "}
          <em>Aureobasidium melanogenum</em> A08 and <em>Escherichia coli</em>{" "}
          DH5α, which was used as the plasmid-cloning host.
        </p>
        <p>
          The chassis organism, <em>Aureobasidium melanogenum</em> A08, is
          classified as a biosafety level 1 (BSL-1) microorganism. The strain
          was isolated from a mangrove ecosystem and is a marine-derived,
          yeast-like fungus. Our team confirmed its taxonomic identity by
          morphological examination and ITS sequencing. Members of the genus{" "}
          Aureobasidium have been widely studied and applied in biotechnology{" "}
          <Cite k="wang2022aureobasidiumreview" />. Previous studies have also
          reported the production of various biopolymers using{" "}
          <em>A. melanogenum</em>{" "}
          <Cite k={["zhou2024melanin", "dailin2023pullulan"]} />. However,
          opportunistic infections caused by this species have been reported in
          humans, including catheter-related bloodstream infection{" "}
          <Cite k="yamamoto2022catheter" /> and skin and soft-tissue infection
          in an immunocompetent host. Patel et al. noted that the species is
          more commonly an opportunistic fungus in immunocompromised hosts{" "}
          <Cite k="patel2025skin" />. In our experiments,{" "}
          <em>Escherichia coli</em> DH5α was used as a cloning host. DH5α is a
          commonly used competent strain for molecular cloning and is included
          on the approved-organism whitelist. During experimental work and
          management, our team will follow BSL-1 laboratory procedures to
          control potential risks.
        </p>
      </>
    ),
  },
  {
    id: "project-design-safety",
    title: "Project Design Safety",
    content: (
      <>
        <p>
          During the project design phase, we prioritized genetic targets
          involved in central carbon metabolism and the regulation of sugar
          utilization. In the PYC module, the gene encoding pyruvate carboxylase
          is overexpressed to increase the supply of malate precursors for
          poly(malic acid) (PMA) production. The xylose-utilization module
          targets the endogenous transcription factors XlnR (g3332.t1) and AraR
          (g13480.t1); both regulators were targeted by knockout and by
          overexpression constructs, to improve xylose and mixed-sugar
          utilization <Cite k="zhao2026amxlnr" />. The intended functions of
          these modifications primarily involve substrate assimilation and
          metabolite synthesis. Pyruvate carboxylase catalyzes the ATP-dependent
          carboxylation of pyruvate to oxaloacetate and is a widely distributed
          metabolic enzyme. The two transcription factors regulate sugar
          catabolism; neither was engineered to promote toxin production,
          antimicrobial resistance, or host infectivity. Thus, the design does
          not intentionally introduce functions that could enhance
          pathogenicity. These modifications involve two types of construct:
          target-gene expression uses the pNAT-LoxP-rDNA backbone, which carries
          a nourseothricin (NAT) selection marker, whereas transcription-factor
          knockout uses the fl4a-hpt-loxp backbone, which carries a hygromycin B
          (HPT) selection marker. In both backbones the selection cassette is
          flanked by directly oriented lox71 and lox66 sites and can be excised
          by Cre-mediated recombination.
        </p>
        <p>
          Following the genetic-modification experiments targeting the
          regulatory factors and the pyruvate carboxylase gene, we did not
          retain antibiotic-resistance genes. Instead, we used the plasmid
          pNAT-LoxP-rDNA, into which the Cre recombinase gene can be inserted so
          that Cre is expressed in the combinatorially engineered chassis
          strain, knocking out the resistance gene inserted into the genome.
          After screening for strains in which PYC had been successfully
          introduced, we introduced this plasmid for counterselection, thereby
          removing the nourseothricin (NAT)-resistance gene.
        </p>
        <p>
          In addition, the project uses a closed, staged biomanufacturing
          process. All Aureobasidium melanogenum A08 fermentations are conducted
          in controlled equipment, with no environmental release of the
          engineered microorganism. Cultures and spent fermentation broth are
          inactivated before disposal, and waste is transferred through
          university-authorized channels <Cite k="ouchazardouswaste" />. Table 1
          summarizes the biosafety control strategies applied in this project.
        </p>
        <Figure
          src="https://static.igem.wiki/teams/6147/wiki/wet-safety/safety-table1-strategies.avif"
          alt="Table 1. Biosafety control strategies applied in this project"
          intrinsicWidth={2480}
          intrinsicHeight={2000}
          captionPrefix="Table 1."
          caption="Biosafety control strategies applied in this project"
          fallback={<p>Image unavailable.</p>}
        />
        <p>
          Each strategy is described in the Project Design Safety and Laboratory
          Safety sections.
        </p>
        <p>
          Safety is a prerequisite for the practical application of
          bioadhesives, and our PMA–DA adhesive has potential safety advantages.
          First, PMA has good biocompatibility and is non-immunogenic;
          biosynthetically produced PMA has been reported to exhibit
          biocompatibility comparable to, or better than, chemically synthesized
          PMA{" "}
          <Cite k={["zhang2021pmananoplatform", "qi2022highmwpolymalate"]} />
          , supporting its potential as a biocompatible and environmentally
          favorable material. Dopamine is also an endogenous compound in the
          human body, and chemically synthesized PMLA functionalized with
          dopamine through amide bonds showed no significant cytotoxicity in
          L929 fibroblast MTT assays up to 2 mg/mL <Cite k="Tang2020PMLADA" />.
          Second, the adhesive uses biodegradable PMA as its polymer backbone,
          allowing gradual degradation and metabolism in vivo and potentially
          reducing the risks of persistent residues and inflammation associated
          with long-term implantation. Taken together, the reported
          biocompatibility, biodegradability, and lack of cytotoxicity provide a
          basis for further investigating PMA–DA in underwater applications and
          biomedical uses such as tissue adhesion.
        </p>
      </>
    ),
  },
  {
    id: "laboratory-safety",
    title: "Laboratory Safety",
    content: (
      <>
        <p>
          Laboratory safety is an essential component of iGEM projects. We have
          implemented safety measures to protect everyone involved. We regard
          laboratory safety as a continuous process that begins when experiments
          start and continues until all samples, cultures, chemicals, and waste
          have been properly stored or disposed of. Accordingly, this project's
          laboratory safety practices are organized within the framework of
          Ocean University of China's Laboratory Safety Classification and
          Grading Management Measures and are divided into four areas: access
          and training, experimental procedures, waste management, and emergency
          response <Cite k="ouc2024safetyclassification" />.
        </p>
      </>
    ),
    subsections: [
      {
        id: "access-and-training",
        title: "Access and Training",
        content: (
          <>
            <p>
              Laboratory access is limited to personnel with a current access
              qualification <Cite k="ouc2024safetyaccess" />. Before entering
              the laboratory, team members complete the university's
              safety-access training and examination. They also undertake online
              virtual-simulation training, which allows them to practice
              procedures and instrument use without handling biological
              materials. Before an unfamiliar procedure, the responsible
              supervisor provides task- and instrument-specific instruction;
              members work under supervision when warranted.
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/wet-safety/biosafety-test-of-the-virtual-simulation-laboratory-management-platform-of-ocean-university-of-china.avif"
              alt="Figure 1. Biosafety assessment on the Ocean University of China virtual simulation laboratory management platform"
              intrinsicWidth={1104}
              intrinsicHeight={553}
              captionPrefix="Figure 1."
              caption="Biosafety assessment on the Ocean University of China virtual simulation laboratory management platform"
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "experimental-work",
        title: "Before and During Experimental Work",
        content: (
          <>
            <p>
              Before each activity, the operator identifies hazards associated
              with the materials, equipment, energy sources, and anticipated
              waste streams; reviews the applicable procedures and safety data
              sheets (SDSs) <Cite k="oucchemicalsds" />; and confirms the
              locations of emergency equipment and exits. Personal protective
              equipment is selected for the specific task rather than applied as
              a fixed checklist. A lab coat and closed-toe footwear are the
              baseline; eye, hand, and other protection is matched to splash,
              contact, thermal, chemical, and sharps hazards. Food and drink are
              prohibited in laboratory work areas.
            </p>
            <p>
              Three groups of materials used in this project require particular
              attention. The selection antibiotics nourseothricin and hygromycin
              B are cytotoxic; gloves are worn and powder dispersal is avoided
              when stock solutions are prepared. EDC·HCl, used for adhesive
              coupling, is a skin and eye irritant and a potential sensitizer,
              so appropriate precautions are taken during weighing and handling.
              Ex vivo porcine skin used as an adhesion substrate is handled as
              biological material and disposed of through the biological-waste
              route.
            </p>
            <p>
              During work, reagent containers are clearly labeled and kept
              closed, and only the amount needed is brought to the bench.
              Storage, segregation, and ventilation follow the SDS and
              institutional requirements <Cite k="oucchemicalsds" />. Equipment
              is operated by trained personnel within its specified operating
              limits. Before use, protective devices, cables, vessels, and
              connections are checked. Work is stopped if a fault, leak,
              overheating, or other abnormal condition occurs; equipment is
              isolated where safe, labeled, and reported. Needles, blades, and
              broken glass are placed directly into designated
              puncture-resistant containers and are never left on benches or
              discarded as ordinary waste.
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/wet-safety/laboratory-gas-pressure-regulating-device-and-safe-operating-procedure.avif"
              alt="Figure 2. Laboratory gas pressure regulating device and its safe operating procedure"
              intrinsicWidth={1108}
              intrinsicHeight={831}
              captionPrefix="Figure 2."
              caption="Laboratory gas pressure regulating device and its safe operating procedure"
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "waste-management",
        title: "Waste Management and Post-Experiment Procedures",
        content: (
          <p>
            Biological waste is segregated at the point of generation and
            inactivated before disposal. Hazardous waste is collected in
            suitable, undamaged containers, kept separate from domestic waste,
            and segregated when waste streams are incompatible{" "}
            <Cite k="ouchazardouswaste" />. Labels identify the waste and its
            principal components and properties. Disposal records include the
            waste name, principal components, quantity, properties, originating
            experiment, time, and depositor; transfers are also documented and
            managed through the university's Laboratory and Equipment Management
            Office <Cite k="ouchazardouswaste" />. At the end of an activity,
            the work area is checked and containers are returned to designated
            storage. The status and residual hazards of unfinished work are made
            clear to the next user.
          </p>
        ),
      },
      {
        id: "incident-response",
        title: "Incident and Near-Miss Response",
        content: (
          <>
            <p>
              Team members know how to raise an alarm, evacuate, contact the
              laboratory supervisor, and obtain medical or professional
              emergency support. In an incident, near miss, or unsafe condition,
              the immediate priorities are to stop work, protect people, warn
              those nearby, isolate the hazard only when it is safe to do so,
              and report promptly. Medical assessment or professional response
              must not be delayed to finish an experiment or attempt a response
              beyond one's training. The university requires laboratories to
              establish accident-prevention measures and emergency plans
              appropriate to the waste they generate{" "}
              <Cite k="ouchazardouswaste" />.
            </p>
            <FigurePair>
              <Figure
                src="https://static.igem.wiki/teams/6147/wiki/wet-safety/laboratory-fire-evacuation-diagram.avif"
                alt="Figure 3. Laboratory fire evacuation diagram"
                intrinsicWidth={1107}
                intrinsicHeight={1476}
                captionPrefix="Figure 3."
                caption="Laboratory fire evacuation diagram"
                fallback={<p>Image unavailable.</p>}
              />
              <Figure
                src="https://static.igem.wiki/teams/6147/wiki/wet-safety/national-laws-for-project-compliance.avif"
                alt="Figure 4. National laws relevant to the compliance of this project"
                intrinsicWidth={1012}
                intrinsicHeight={1373}
                captionPrefix="Figure 4."
                caption="National laws relevant to the compliance of this project"
                fallback={<p>Image unavailable.</p>}
              />
            </FigurePair>
          </>
        ),
      },
    ],
  },
  {
    id: "responsible-research",
    title: "Responsible Research and Environmental Responsibility",
    content: (
      <>
        <p>
          Before acquiring, using, transferring, or publicly describing
          biological materials, we consider whether the activity could create
          avoidable risks of misuse or unauthorized access. This approach is
          consistent with the guidance in iGEM's Working Safely{" "}
          <Cite k="igemworkingsafely" />.
        </p>
        <p>
          Environmental responsibility begins at the source: we purchase only
          items that are demonstrably necessary, select lower-hazard
          alternatives when scientifically appropriate, use the smallest
          feasible scale, and take measures to prevent releases. These practices
          can reduce material use and uncertainty in waste handling.
        </p>
        <p>
          Ocean University of China implements the relevant requirements of the
          Biosecurity Law of the People's Republic of China concerning risk
          prevention and classified management in biotechnology research,
          development, and application <Cite k="chinabiosecuritylaw2024" />. We
          fulfill our biosecurity responsibilities to ensure that our activities
          are safe, compliant, and controlled.
        </p>
      </>
    ),
  },
];
