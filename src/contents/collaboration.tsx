import {
  Inspirations,
  InspirationLink,
} from "../components/article/Inspirations";

export function Collaboration() {
  const links: InspirationLink[] = [
    {
      year: 2025,
      teamName: "BUCT-China",
      pageName: "communication-and-collaboration",
    },
    { year: 2025, teamName: "NAU-CHINA", pageName: "collaborations" },
    { year: 2025, teamName: "CAU-China", pageName: "collaboration" },
    { year: 2025, teamName: "JLU-CP", pageName: "collaboration" },
    { year: 2025, teamName: "MammothEdu-South", pageName: "collaboration" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Collaboration &amp; Communication</h4>
            <p>
              iGEM is a community as much as a competition. Describe how you
              engaged with other iGEM teams and the wider community through
              collaboration and communication, and how these interactions shaped
              your project.
            </p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-8">
          <h2>What Should this Page Contain?</h2>
          <hr />
          <ul>
            <li>
              Joint projects you carried out with other teams, and what each
              side contributed.
            </li>
            <li>
              Meetings, conferences, and regional events you attended or hosted.
            </li>
            <li>
              Help you gave to or received from other teams, such as sharing
              protocols, parts, or data.
            </li>
            <li>
              What you learned from these exchanges and how they influenced your
              project.
            </li>
          </ul>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>

      <div className="row mt-4">
        <div className="col-lg-8">
          <h2>Tips for Success</h2>
          <hr />
          <ul>
            <li>
              For each collaboration, name the partner teams and describe the
              concrete outcome, not just the intention.
            </li>
            <li>
              Show the two-way nature of the exchange — what you offered, not
              only what you gained.
            </li>
            <li>
              Include photos or materials from joint activities where you have
              them.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
