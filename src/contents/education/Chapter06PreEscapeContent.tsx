import { ChapterMeta } from "./ChapterMeta";
import { media, mediaRoot } from "./EducationAssets";
import { ChapterGallery, ResourceCard, ResourceGrid } from "./EducationMedia";
import { ObjectiveStatement } from "./ObjectiveStatement";
import { ProseList } from "./ProseList";
import { WonderQuestion } from "./WonderQuestion";

export function Chapter06PreEscapeContent() {
  return (
    <>
      <ChapterMeta kind="audience">
        Children within the community, High school students, College students,
        Team members
      </ChapterMeta>
      <h4>6.1 Wonder</h4>
      <WonderQuestion>
        Why did we shift from teaching science to fostering responsible
        innovators?
      </WonderQuestion>
      <p>
        Our project explores a new approach for agricultural waste utilization
        by leveraging biomanufacturing. As this approach moves beyond the
        laboratory, we must consider not only whether it could work, but also
        how it might reshape resource use and affect different communities.
        These questions prompted us to broaden our educational outreach beyond
        wet-lab techniques and synthetic biology knowledge, helping learners
        explore how science and technology interact with society and how to make
        responsible decisions about their use.
      </p>
      <p>
        We therefore{" "}
        <strong>designed three progressively deeper activities</strong>, each
        tailored to <strong>primary school students</strong>,{" "}
        <strong>high school students</strong>, and <strong>our peers</strong>,
        guiding participants from{" "}
        <strong>
          recognizing the positive role technology can play in society (for
          primary school students)
        </strong>
        , to{" "}
        <strong>
          making responsible choices when confronted with its potential risks
          (for high school students)
        </strong>
        , and{" "}
        <strong>
          ultimately to drawing on evidence, analysis, and evaluation to propose
          informed decisions
        </strong>{" "}
        in response to real-world challenges and contribute to sustainable
        development <strong>(for college students and Haide iGEMers).</strong>
      </p>
      <h4 id="chapter-06-2">
        6.2 Activity I: Traditional Paper Craft Workshop
      </h4>
      <p>
        <strong>“Cultural Heritage in Paper, Green Future in Action”</strong>
      </p>
      <ChapterMeta kind="audience">Children in the local community</ChapterMeta>
      <h5>6.2.1 Explore Objective-Driven Design</h5>
      <ObjectiveStatement>
        <strong>Objective</strong>: Recognizing the Positive Role of Technology
        in Society
      </ObjectiveStatement>
      <p>
        Aligned with the cognitive level of children, we aimed to help them
        develop an understanding that using science and technology responsibly
        requires considering their real-world impacts in ways children can
        understand. Thus, we set “recognition” as the objective of this
        activity.
      </p>
      <p>
        <strong>
          Design: Why did we choose papermaking as the central activity?
        </strong>
      </p>
      <ProseList>
        <li>
          <p>
            <strong>Papermaking as a tangible learning experience:</strong>{" "}
            Papermaking, a tangible process where children can directly
            experience how technology transformed waste into something valuable,
            was a suitable choice for the “X” component of the “Lecture + X”
            model developed through our previous educational activities.
          </p>
        </li>
        <li>
          <p>
            <strong>Papermaking from a Familiar Starting Point:</strong>{" "}
            Papermaking starts with a material already familiar to primary
            school students—paper, which they use in everyday life, particularly
            for writing, reading, and communication. Starting from something
            familiar makes it easier for them to explore the technology behind
            it and further understand how that technology relates to and
            contributes to society.
          </p>
        </li>
        <li>
          <p>
            <strong>
              Papermaking as a Window into Multiple Social Values:
            </strong>{" "}
            Papermaking also provides more than a single perspective on the
            social value of technology. It has long supported everyday
            communication, while also enabling the preservation and transmission
            of knowledge, culture, and traditions across generations. Meanwhile,
            using discarded paper as a raw material connects this traditional
            technology with resource reuse and sustainable development. Through
            these different dimensions, students can better recognize that
            technology has real impacts on multiple dimensions of society.
          </p>
        </li>
      </ProseList>
      <ResourceGrid>
        <ResourceCard
          eyebrow="Activity plan · Chinese"
          title="Chinese Version"
          href={`${mediaRoot}/6-2-1-activity-plan-chinese.pdf`}
          actionLabel="View our activity plan!"
        />
        <ResourceCard
          eyebrow="Activity plan · English"
          title="English Version"
          href={`${mediaRoot}/6-2-1-activity-plan-english.pdf`}
          actionLabel="View our activity plan!"
        />
      </ResourceGrid>
      <h5>6.2.2 Action</h5>
      <ChapterGallery
        images={[
          media(
            "chapter-06-paper-1",
            "6-2-2-action-01.avif",
            "Traditional paper craft workshop 1",
          ),
          media(
            "chapter-06-paper-2",
            "6-2-2-action-02.avif",
            "Traditional paper craft workshop 2",
          ),
          media(
            "chapter-06-paper-3",
            "6-2-2-action-03.avif",
            "Traditional paper craft workshop 3",
          ),
          media(
            "chapter-06-paper-4",
            "6-2-2-actoin-04.avif",
            "Traditional paper craft workshop 4",
          ),
          media(
            "chapter-06-paper-5",
            "6-2-2-action-05.avif",
            "Traditional paper craft workshop 5",
          ),
          media(
            "chapter-06-paper-6",
            "6-2-2-action-06.avif",
            "Traditional paper craft workshop 6",
          ),
        ]}
        label="Chapter 06 traditional paper craft workshop photographs"
      />
      <h5>6.2.3 Verify</h5>
      <h6>Children’s Voices on Technology’s Real-World Value</h6>
      <p>
        At the end of the activity, we invited students to share how papermaking
        could help people in everyday life. <strong>One student said</strong>,
        “We used to throw away old paper, but today we made new paper out of
        it!” demonstrating that they had realized that technology can give
        discarded materials a new life. <strong>The other one remarked</strong>,
        “I can write a letter on the paper I made”,{" "}
        <strong>while another added,</strong> “People can also write down
        stories so others in the future can read them”.{" "}
        <strong>
          Their responses suggested that they could connect the technology they
          have experienced with concrete social benefits, demonstrating their
          growing awareness of the diverse roles technology can play in real
          life.
        </strong>
      </p>
    </>
  );
}
