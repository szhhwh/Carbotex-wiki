import type { IhpSectionContent } from "../components/human-practices/ihp-types";
import { anchor, rich } from "./ihp-reviewed-helpers";

export const ihpReviewedSection5: IhpSectionContent = {
  id: "ihp-reflection",
  title: "Final Reflection",
  parts: [
    anchor("section-5"),
    rich("*What Human Practices Changed — and Where Carbotex Goes Next*", true),
    rich(
      "Carbotex began with a question about the carbon stored in agricultural straw. Could this renewable resource become the starting point for a new biological manufacturing pathway?\n\nAs our research developed, the question became more demanding. We needed to understand which straw resources were realistically available, how microorganisms could make better use of the resulting sugars, how that carbon could be directed toward PMA, and what it would take to turn PMA into a material worth using.\n\nThe answers did not come from laboratory experiments alone. They developed through conversations with agricultural stakeholders, researchers, industry professionals, other iGEM teams, and people who approached our project from outside our immediate field.\n\n**Human Practices helped us change not only how we explained Carbotex, but also what we asked of the project itself.**",
    ),
  ],
  subsections: [
    {
      id: "ihp-reflection-1",
      title: "5.1 What Human Practices Changed",
      parts: [
        anchor("section-5-1"),
        rich(
          "Human Practices changed not only the decisions we made, but also the questions we learned to ask throughout Carbotex.\n\nThrough agricultural exchanges, we began to see straw as more than an abundant carbon source, considering its accessibility, existing uses, and place within agricultural systems. Discussions with researchers helped us explore mixed-sugar regulation, metabolic precursor supply, and modeling, while material-related exchanges encouraged us to look beyond PMA production toward its potential as a functional adhesive.\n\nAs our project developed, conversations about sustainability, manufacturing, commercialization, and biosafety further broadened our understanding of success. We learned to consider resource consumption, production reliability, economic feasibility, and safety alongside laboratory performance. Meanwhile, collaborations and community engagement reminded us that meaningful innovation also depends on communication, shared understanding, and the people it seeks to serve.\n\n**Ultimately, Human Practices helped us move beyond asking what we could make from agricultural straw, toward understanding what would make that transformation useful, responsible, and meaningful.**",
        ),
      ],
    },
    {
      id: "ihp-reflection-4",
      title: "5.2 What Remains Unresolved",
      parts: [
        anchor("section-5-2"),
        anchor("ihp-reflection-2"),
        rich(
          "Although these exchanges helped shape Carbotex, important questions remain.\n\nPMA–DA still requires a clearly defined application, further performance validation, and feedback from potential users. Moving toward practical production will also require more reliable manufacturing processes, realistic cost assessments, environmental evaluation, and application-specific safety considerations.\n\nThese challenges remind us that scientific progress is not measured solely by what we can achieve in the laboratory. It also depends on whether our work can respond to genuine needs, withstand critical evaluation, and create value beyond research itself.\n\n**For Carbotex, transforming straw into a functional material is only part of the journey. The greater goal is to ensure that what we create is not only scientifically possible, but also genuinely valuable to the world around us.**.",
        ),
      ],
    },
    {
      id: "ihp-reflection-3",
      title: "5.3 Carrying TRACE Forward",
      parts: [
        anchor("section-5-3"),
        rich(
          "Throughout Carbotex, **TRACE — Trigger, Reach Out, Analyze, Change, and Evaluate — became more than a framework for documenting Human Practices. It became a way of questioning our decisions and understanding our responsibilities as researchers.**\n\nIt encouraged us to look beyond whom we had consulted and ask what we had truly learned, how different perspectives challenged our assumptions, and whether those insights had meaningfully shaped our project.\n\nThis journey was rarely linear. Some conversations inspired new experiments, others revealed limitations, and many raised questions that could not be answered immediately. We learned that **meaningful engagement is not measured by how many voices we hear, but by how seriously we consider them and how willing we are to change.**\n\nTo share this approach beyond our own team, we have made our **[TRACE Handbook (PDF) ↗](https://static.igem.wiki/teams/6147/wiki/trace-20handbook.pdf)** available as an evolving resource. We hope it can encourage other teams to approach Human Practices not as a task to complete, but as a continuing dialogue between science and society.\n\nCarbotex began with a scientific possibility: transforming agricultural straw into a functional material. Yet along the way, we came to understand that **the transformation of a material is only one part of innovation. Equally important is the transformation of how we think, how we make decisions, and how we understand the impact of our work.**\n\nThe questions of sustainability, safety, scalability, and real-world value do not begin when laboratory research ends. They belong to the process of innovation itself, shaping not only what we create, but also why and for whom we create it.\n\n**We set out to trace a pathway from straw to material. Through TRACE, we learned to trace something deeper: the path from scientific possibility to meaningful, responsible innovation.**",
        ),
      ],
    },
  ],
};
