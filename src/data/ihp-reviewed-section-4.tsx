import type { IhpSectionContent } from "../components/human-practices/ihp-types";
import { anchor, figure, gallery, label, rich } from "./ihp-reviewed-helpers";

export const ihpReviewedSection4: IhpSectionContent = {
  id: "ihp-dialogue",
  title: "Carbotex in Conversation",
  parts: [
    anchor("section-4"),
    rich("*Sharing Ideas, Building Connections, Creating Together*", true),
    rich(
      "Carbotex did not grow within the laboratory alone.\n\nFrom our first project discussions to strain engineering, PMA production, and adhesive development, we kept exchanging ideas with fellow iGEM teams, researchers, and people from different backgrounds. Presenting our work gave us opportunities to hear questions we had not considered, learn how other teams approached their challenges, and build relationships that continued beyond a single event.\n\nThese exchanges served different purposes. Some informed our technical decisions; others introduced new approaches to Human Practices, supported peer learning, or developed into collaborative public engagement. Together, they gave Carbotex a place within a wider community of people exploring what synthetic biology can contribute.",
    ),
  ],
  subsections: [
    {
      id: "ihp-peers",
      title: "4.1 Growing Alongside Our Peers",
      parts: [
        anchor("section-4-1"),
        anchor("ihp-collab-ouc-china", "OUC-China"),
        label(
          "4.1.1 OUC-China: From Campus Peers to Cross-University Exchange",
        ),
        rich(
          "Our connection with OUC-China began when both teams were newly formed.\n\nAs two iGEM teams from Ocean University of China, OUC-Haide and OUC-China met early in the season to introduce our projects, exchange initial plans, and discuss the challenges of building an iGEM team. Although we had chosen different research topics, we shared a desire to turn what we had learned into meaningful synthetic biology projects.\n\nWe continued that contact as the season progressed.",
        ),
        figure(
          30,
          "https://static.igem.wiki/teams/6147/wiki/ihp.avif",
          "Early exchange between OUC-Haide and OUC-China",
          "OUC-Haide and OUC-China exchange.",
          "540 / 380",
        ),
        anchor(
          "ihp-collab-tianjin-exchange",
          "Nankai University & Tianjin University",
        ),
        rich(
          "Together with OUC-China, we later traveled to Tianjin to exchange ideas with students and researchers from Nankai University and Tianjin University. Through project discussions, laboratory visits, and a tour of the instrument platform, we gained insights into different research environments, facilities, and approaches to experimental work.\n\nThese exchanges broadened our perspectives beyond our home university, allowing us to share project progress and practical experiences while learning how other teams approached their research challenges.",
        ),
        gallery(
          31,
          [
            {
              src: "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-tianjin-exchange-01-meeting.webp",
              alt: "Cross-university project exchange in Tianjin",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-tianjin-exchange-05-lab-discussion.webp",
              alt: "Discussion during a university laboratory visit",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/pingtai.avif",
              alt: "Visit to the instrument platform during the Tianjin exchange",
            },
          ],
          "Tianjin cross-university and laboratory exchanges.",
          3,
          "300 / 240",
        ),
        rich(
          "To extend these exchanges beyond the visit, we established a three-university communication platform connecting Ocean University of China, Nankai University, and Tianjin University. Supported by a shared WeChat group, the platform provided a space for students to stay connected, exchange project updates, discuss questions, and share practical experiences throughout the season.\n\nIn this way, the Tianjin exchange became more than a one-time visit. It created an opportunity for continued peer learning and mutual support across universities.",
        ),
        gallery(
          32,
          [
            {
              src: "https://static.igem.wiki/teams/6147/wiki/tianjin.avif",
              alt: "Poster for the three-university communication platform connecting Ocean University of China, Nankai University, and Tianjin University",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/fc2c9b46daadd10dde634f09106886cc.avif",
              alt: "WeChat group established for continued communication among students from the three universities",
            },
          ],
          "Tri-university communication platform.",
        ),
        rich(
          "Our connection continued through OUC-China's subsequent recruitment activities, where we exchanged experiences of participating in iGEM with prospective new members.",
        ),
        figure(
          33,
          "https://static.igem.wiki/teams/6147/wiki/ihp-community-ouc-china-recruitment-exchange-01.webp",
          "Exchange during OUC-China recruitment activities",
          "Sharing iGEM experience with OUC-China.",
          "540 / 380",
        ),
        rich(
          "From our first conversation to visits and later activities, OUC-China became a valued peer team throughout the season. This experience reminded us that iGEM is not only about completing our own project, but also about supporting one another through a shared scientific journey.",
        ),
      ],
    },
    {
      id: "ihp-community",
      title: "4.2 Seeing Carbotex Through Other Eyes",
      parts: [
        anchor("section-4-2"),
        anchor("ihp-ccic"),
        label("4.2.1 CCiC: Bringing Our Project into a Wider Community"),
        rich(
          "As Carbotex's technical strategy took shape, we wanted to share it beyond our own team and hear how other researchers and iGEMers understood our work.\n\nIn 2026, we attended the 13th Conference of China iGEMer Community (CCiC), hosted at Dalian University of Technology, together with the Synbiopunk activities held during the event.\n\nThrough poster discussions, project presentations, and informal conversations, we introduced our approach: using straw-derived carbon for microbial PMA production and developing the resulting polymer into a bio-based adhesive.\n\nThe conference brought us into contact with teams studying a wide range of applications of synthetic biology. Talking with people who did not share our immediate research background helped us recognize which parts of Carbotex's story were clear and which needed a stronger connection between modules.",
        ),
        gallery(
          34,
          [
            {
              src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-02-peer-exchange.webp",
              alt: "Peer exchange at CCiC",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-04-poster-discussion.webp",
              alt: "Carbotex poster discussion at CCiC",
            },
          ],
          "Project exchanges at CCiC.",
        ),
        rich(
          "During project evaluation, judges noted that Carbotex brought together genetic engineering, modeling, fermentation, and material development, but that the relationships among these components could be communicated more clearly. They encouraged us to use the **Design–Build–Test–Learn (DBTL)** framework to show how experimental findings and analysis could inform subsequent design.\n\nThis feedback helped us rethink how to present the project as an interconnected engineering process rather than a collection of separate results. It also drew our attention to the importance of making feedback between design, testing, and learning visible in the Wiki.",
        ),
        figure(
          35,
          "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-06-carbotex-stage-presentation-dbtl.webp",
          "Carbotex project presentation and DBTL-related feedback at CCiC",
          "Carbotex presentation at CCiC.",
          "540 / 380",
        ),
        rich(
          "We also spoke with Dr. Haotian Guo about the development of PMA-based adhesives. This exchange helped us consider PMA as a platform for functional material design, rather than simply a fermentation product. Its contribution to our material-development thinking is discussed in [Section 2.3](#section-2-3).",
        ),
        label("4.2.2 An Encounter That Became a Collaboration: QingdaoAcademy"),
        rich(
          'CCiC was also where we met **QingdaoAcademy**, a high-school iGEM team from Qingdao.\n\nWe introduced our projects to each other and shared our experiences of joining iGEM. That first meeting established a connection between two teams working independently but interested in making synthetic biology accessible to more young people.\n\nAs we stayed in touch, we discovered a shared interest in making science communication more engaging and participatory. **The encounter at CCiC eventually became the starting point for a public-engagement activity that we designed and delivered together.**\n\n[Explore the "17 C: The Fatal Experiment" collaboration in Section 4.5 →](#ihp-4-5-17c).',
        ),
        label("4.2.3 Learning from Team-Led Discussions"),
        rich(
          "At CCiC, we also joined Unconference activities hosted by other iGEM teams.",
        ),
        anchor("ihp-collab-dut-china", "DUT-China"),
        rich(
          "DUT-China organized a discussion on commercialization and startup incubation. Our conversations about manufacturing scale, production costs, and real user needs motivated the preliminary PMA-DA cost analysis.",
        ),
        anchor("ihp-collab-jlu-fbh", "JLU-FBH"),
        rich(
          'We also participated in JLU-FBH\'s **"From Teams, For Teams"** roundtable, where teams exchanged experiences of project development, team organization, and Human Practices.',
        ),
        gallery(
          36,
          [
            {
              src: "https://static.igem.wiki/teams/6147/wiki/ihp-peer-community-dut-unconference-01-group-photo.avif",
              alt: "DUT-China commercialization discussion at CCiC",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/ihp-peer-community-jlu-fbh-from-teams-for-teams-01-multiteam-group-photo.avif",
              alt: "JLU-FBH From Teams, For Teams roundtable",
            },
          ],
          "Team-led discussions at CCiC.",
        ),
        rich(
          "**[View our commercialization discussion notes ↗](https://static.igem.wiki/teams/6147/wiki/igem-discussion-notes.pdf)**",
          true,
        ),
        rich(
          "At the Synbiopunk event, our team also received **second place in the popularity award**. We appreciated this encouragement from the iGEM community, alongside the conversations and new friendships that made the event memorable.",
        ),
        gallery(
          37,
          [
            {
              src: "https://static.igem.wiki/teams/6147/wiki/ihp-ccic-2026-09-synbiopunk-challenge-second-place.webp",
              alt: "Carbotex receiving second place in the Synbiopunk popularity award",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/jiang.avif",
              alt: "Prize received by Carbotex at the Synbiopunk event",
            },
          ],
          "Synbiopunk popularity award.",
          2,
          "390 / 340",
        ),
        rich(
          "Looking back, some of the most valuable outcomes of CCiC continued well beyond the conference. Judges' questions sharpened our project narrative, commercialization discussions led to further analysis, and a chance meeting with another team eventually developed into joint outreach.",
        ),
        label("4.2.4 Grand APiC: Engaging with Broader Perspectives"),
        rich(
          "We also presented Carbotex at Grand APiC, where we met iGEM teams, researchers, and participants from different professional backgrounds.\n\nThrough poster sessions and conversations, we introduced our project and learned how others approached the scientific and practical questions surrounding synthetic biology.",
        ),
        gallery(
          38,
          [
            {
              src: "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-01-community-group-photo.webp",
              alt: "Community gathering at Grand APiC",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-02-carbotex-poster-exchange.webp",
              alt: "Carbotex poster exchange at Grand APiC",
            },
          ],
          "Grand APiC community and poster exchanges.",
        ),
        rich(
          "A discussion with judges raised questions about **biosafety and horizontal gene transfer (HGT)**. This feedback prompted us to revisit the genetic-element management of our engineered A08 strain and the responsibilities involved in preparing a final adhesive material. We examine this response in [**Section 3.4 — From Biosafety to Product Responsibility**](#ihp-3-4-hgt-response).\n\nOther discussions with industry-related participants gave us further opportunities to consider the relationship between synthetic biology research and practical manufacturing.",
        ),
        figure(
          39,
          "https://static.igem.wiki/teams/6147/wiki/ihp-grand-apic-2026-04-biotechnology-industry-exchange.webp",
          "Biotechnology industry exchange at Grand APiC",
          "Industry exchanges at Grand APiC.",
          "540 / 380",
        ),
        rich(
          "CCiC and Grand APiC gave Carbotex a wider audience and exposed us to questions from people with different priorities. Together, they strengthened our understanding that research must be communicated and evaluated from more than one perspective.",
        ),
      ],
    },
    {
      id: "ihp-across-borders",
      title: "4.3 Human Practices Across Borders",
      parts: [
        anchor("section-4-3"),
        anchor("ihp-collab-peking-rice", "Peking University × Rice University"),
        label(
          "4.3.1 2026 US-China iGEM Human Practices Summit: Learning Across Teams",
        ),
        rich(
          'We participated in **"People in the World of SynBio — 2026 US-China iGEM Human Practices Summit,"** a virtual event hosted by Peking University and Rice University from July to August 2026.\n\nThe summit brought together iGEM teams from China and other countries to introduce their projects, share their Human Practices experiences, and exchange different approaches to connecting synthetic biology with society.\n\nThrough online presentations and discussions, we learned how different teams explored the social dimensions of their projects, engaged with stakeholders, and reflected on the challenges they encountered.',
        ),
        anchor("ihp-collab-princeton", "Princeton University iGEM Team"),
        rich(
          "Among the presentations, Princeton University's team shared how expert engagement could help teams reconsider project assumptions and inform design decisions. Nankai University's team introduced its approach to incorporating different stakeholder perspectives into research and communication.\n\nFor Carbotex, the summit provided an opportunity to learn from the experiences of other teams and reflect on our own Human Practices approach. It reminded us that meaningful engagement is not defined simply by the number of activities conducted, but by how carefully teams listen, interpret feedback, and connect what they learn to their projects.",
        ),
        gallery(
          40,
          [
            {
              src: "https://static.igem.wiki/teams/6147/wiki/meeting.avif",
              alt: "Online presentations and team exchanges during the 2026 US-China iGEM Human Practices Summit",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/certification.avif",
              alt: "Certificate of participation awarded to OUC-Haide at the 2026 US-China iGEM Human Practices Summit",
            },
          ],
          "US-China IHP Summit exchange and certificate.",
          2,
          "390 / 290",
        ),
        rich(
          "We also prepared a presentation to organize and share the outcomes of this international learning experience. It serves as a record of the exchange and a resource for revisiting the Human Practices approaches discussed during the summit.\n\n**[View Our International Human Practices Summit Presentation (PDF) ↗](https://static.igem.wiki/teams/6147/wiki/ouc-haide-1.pdf)**\n\nAlthough the participating teams explored different scientific questions, the summit highlighted a shared interest in connecting synthetic biology with people and society. Learning from their experiences encouraged us to reflect more carefully on how we document and communicate our own Human Practices activities.\n\nOther examples emphasized public trust, meaningful participation, and communication with audiences of different backgrounds. Seeing these varied approaches reminded us that there is no single template for Human Practices. Teams need to choose methods suited to their projects and the people they hope to engage.\n\nFor Carbotex, a particularly useful lesson was the importance of connecting what stakeholders say with the decisions and actions that follow. It encouraged us to revisit how we document expert consultations, project feedback, application analysis, and public engagement within our own Human Practices.",
        ),
      ],
    },
    {
      id: "ihp-collaboration",
      title: "4.4 From Straw to Renewable Carbon",
      parts: [
        anchor("section-4-4"),
        anchor("ihp-qibebt"),
        label(
          "4.4.1 Green Carbon and QIBEBT: Seeing the Wider Resource Context",
        ),
        rich(
          "Carbotex began with agricultural straw. As our project developed, we gradually broadened our perspective from a particular feedstock to the renewable carbon it contains and the different ways that carbon may be transformed into valuable products. This wider perspective was strengthened through our exchanges and collaboration with **Green Carbon** and the **Qingdao Institute of Bioenergy and Bioprocess Technology (QIBEBT)**.\n\n*Green Carbon* is an international, peer-reviewed, open-access academic journal established by QIBEBT, Chinese Academy of Sciences, and published in cooperation with KeAi. With an international editorial board and inclusion in the Web of Science Emerging Sources Citation Index (ESCI), the journal provides an important platform for research on sustainable carbon utilization. Its scope encompasses renewable carbon resources, green conversion technologies, synthetic biology, biomanufacturing, and carbon management, closely aligning with the broader scientific context of Carbotex. ({{cite:KeAi2026GreenCarbon}})\n\nWe had the opportunity to visit the **Green Carbon editorial office**, where we introduced Carbotex's approach to converting agricultural straw into PMA and exploring its further development into functional materials. Our discussions went beyond scientific research itself, addressing how emerging technologies and sustainability concepts could be communicated to wider audiences.\n\nBuilding on this exchange, **we collaborated with the Green Carbon team on project promotion and joint publicity**, helping communicate Carbotex's ideas and the potential of renewable-carbon utilization beyond our immediate research community. We also carried out science outreach activities at the **Clean Energy and Green Carbon Technology Science Popularization Center**, connecting our project with broader efforts to make clean-energy and green-carbon technologies more accessible to the public.\n\nThese activities gave our collaboration a practical dimension. Rather than limiting our interaction to academic discussions, we participated in efforts to share scientific ideas and promote public engagement with sustainable technologies. Our common aspiration could be expressed through a simple message: **\"Turn to a Greener World.\"**\n\nDuring our related visits and exchanges at QIBEBT, we also encountered research on lignocellulosic conversion, synthetic biology, and green biomanufacturing. These experiences helped us recognize the diversity of technologies involved in renewable-carbon utilization and better understand how our own straw-to-PMA pathway fits within this wider research landscape.",
        ),
        gallery(
          41,
          [
            {
              src: "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-02-project-exchange-meeting.avif",
              alt: "Project exchange with Green Carbon and QIBEBT",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/20261020221919-1398-4.avif",
              alt: "Green Carbon journal-related image",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/20261020223345-1399-4.avif",
              alt: "Science outreach activities at the Clean Energy and Green Carbon Technology Science Popularization Center",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-03-lignocellulose-bioconversion-tour.avif",
              alt: "Visit concerning lignocellulosic bioconversion at QIBEBT",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/ihp-green-carbon-qibebt-04-synthetic-biology-green-biomanufacturing-exhibit.avif",
              alt: "Exhibition on synthetic biology and green biomanufacturing",
            },
          ],
          "Green Carbon and QIBEBT exchange and outreach.",
          3,
          "345 / 280",
        ),
        rich(
          "These experiences encouraged us to reconsider our original question: how could we make better use of agricultural straw? Rather than viewing straw simply as an inexpensive feedstock, we began to recognize it as part of a broader agricultural and carbon-resource system.\n\nCrop residues already serve several established purposes, and their conversion into new products is not automatically environmentally beneficial. Any proposed utilization route must also consider resource availability, competing uses, processing requirements, and potential environmental impacts.\n\nFor Carbotex, converting straw-derived sugars into microbial PMA and subsequently exploring PMA-based adhesives represents one possible pathway for renewable-carbon utilization. Our exchanges with QIBEBT helped us understand the scientific context of this pathway, while our collaboration with Green Carbon highlighted the importance of communicating sustainability research and engaging the wider public.\n\n**We started with straw as a feedstock, but these experiences helped us see it as part of a much larger renewable-carbon story — one that connects scientific exploration, responsible resource use, and public engagement in a shared effort to turn toward a greener world.**",
        ),
      ],
    },
    {
      id: "ihp-co-creation",
      title: "4.5 From Communication to Co-Creation",
      parts: [
        anchor("section-4-5"),
        anchor("ihp-collab-qingdaoacademy", "QingdaoAcademy"),
        anchor("ihp-4-5-17c"),
        label('4.5.1 OUC-Haide × QingdaoAcademy: "17 C: The Fatal Experiment"'),
        rich(
          'After meeting QingdaoAcademy at CCiC, we stayed in contact and began discussing how the two teams could collaborate on synthetic biology outreach.\n\nOur team members came from different educational backgrounds, but we shared an interest in helping younger audiences participate actively in science rather than simply listening to a presentation.\n\nWe began with a question:\n\n**What if participants could become investigators in a scientific story, instead of remaining passive listeners?**\n\nThis idea developed into an immersive synthetic biology activity that we jointly designed and delivered: **"17 C: The Fatal Experiment."**\n\nThe activity integrated scientific concepts into an investigative storyline. Participants followed clues, considered evidence, discussed possibilities, and made decisions as they explored ideas connected with biological technology.\n\nBy inviting participants into the story, we turned synthetic biology into something they could actively question and explore.',
        ),
        gallery(
          42,
          [
            {
              src: "https://static.igem.wiki/teams/6147/wiki/mishi1.webp",
              alt: "Students participating in interactive science communication activities",
            },
            {
              src: "https://static.igem.wiki/teams/6147/wiki/mishi2.webp",
              alt: "Group photographs of students and iGEM team members during the outreach activity",
            },
          ],
          '"17 C" collaborative science outreach.',
          2,
          "420 / 360",
        ),
        rich(
          "The collaboration also changed our own experience of science communication. Participants' questions, interpretations of clues, and discussions gave us opportunities to see how people with different backgrounds approached the material.\n\nFor the two teams, designing and carrying out the event required continued communication, coordination, and problem-solving. What started as a chance meeting became a shared public-engagement project.\n\n**We met at CCiC as two independent teams, and later came together again as co-creators.**",
        ),
      ],
    },
    {
      id: "ihp-beyond-language",
      title: "4.6 Beyond Technical Language",
      parts: [
        anchor("section-4-6"),
        anchor("ihp-collab-ning-yan", "Prof. Ning Yan"),
        label("4.6.1 Ning Yan × Original Song: When Science Meets Art"),
        rich(
          "As Carbotex's research became more technically detailed, the vocabulary we used to explain it also grew more specialized: lignocellulose, carbon utilization, genetic regulation, fermentation, PMA, and dopamine functionalization.\n\nThese terms matter for scientific accuracy, but they are not always the easiest way to introduce a project to people outside the field.\n\nWe therefore explored a different form of communication: music.\n\nInspired by the ideas behind Carbotex, we created an original song to tell the story of starting with agricultural straw and exploring the possibilities of renewable carbon and biomanufacturing through lyrics and melody.\n\nDuring its development, we sought professional artistic advice from **Professor Ning Yan** at Ocean University of China and used this feedback to refine how the piece was expressed and presented.",
        ),
        gallery(
          43,
          [
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
          "Carbotex science communication through music.",
          3,
          "270 / 220",
        ),
        rich(
          "**Original song lyrics (PDF):** **[*Amber Dreams in the Wheat Field* — Read the full lyrics ↗](https://static.igem.wiki/teams/6147/wiki/amber-dreams-in-the-wheat-field.pdf)**",
          true,
        ),
        rich(
          "Unlike a scientific presentation, music does not need to explain every pathway or experimental result. It can introduce the motivation and human side of research through rhythm, emotion, and storytelling, encouraging audiences to ask questions and learn more.\n\nThis experience reminded us to choose communication methods that fit different audiences. Technical discussions depend on accurate evidence, while creative forms of expression can make scientific ideas more approachable.\n\n**Our original song did not change the engineered strain or adhesive material. It gave Carbotex another way to connect with the public.**",
        ),
      ],
    },
    {
      id: "ihp-what-returned",
      title: "4.7 What Returned With Us",
      parts: [
        anchor("section-4-7"),
        rich(
          "Looking back over these exchanges, we see that each contributed something different to Carbotex.\n\nOUC-China and other university peers showed us the value of sustained support and cross-university conversation. CCiC and Grand APiC brought our project into contact with questions from different audiences. The international Human Practices summit introduced diverse ways of connecting stakeholder engagement with research and left us with a presentation that we could share and revisit.\n\nResearch exchanges concerning renewable carbon expanded how we understood our feedstock. Working with QingdaoAcademy brought us from discussion into genuine co-creation. Our original song opened another route for communicating science through art.\n\nSome exchanges informed project decisions, others built relationships, and still others helped us find ways to reach the public. We value these different outcomes for what they actually contributed.\n\n**Human Practices is not only about bringing outside perspectives back into a project. It is also about joining a wider community, sharing what we have learned, and creating opportunities to learn and build together.**\n\nCarbotex's experimental research is carried out by our team, but its development has been enriched by the people and communities we have met along the way.",
        ),
      ],
    },
  ],
};
