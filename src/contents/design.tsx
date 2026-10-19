import {
  Inspirations,
  InspirationLink,
} from "../components/article/Inspirations";

export function Design() {
  const links: InspirationLink[] = [
    { year: 2025, teamName: "HiZJU-China", pageName: "design" },
    { year: 2025, teamName: "NYU-Abu-Dhabi", pageName: "design" },
    { year: 2025, teamName: "Ioannina", pageName: "design" },
    { year: 2025, teamName: "SMU-Union-China", pageName: "design" },
    { year: 2025, teamName: "OUC-Haide", pageName: "design" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <div className="bd-callout bd-callout-info">
            <h4>Design</h4>
            <p>
              Document the rationale behind your biological system: which
              chassis, parts, and architecture you chose, and why each decision
              serves your project's goals. A well-documented design lets judges
              and future teams follow your reasoning from idea to
              implementation.
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
              Explain the overall architecture of your system and how its
              modules work together.
            </li>
            <li>Justify your choice of chassis organism.</li>
            <li>
              Describe each part you selected or designed, and the role it plays
              in the system.
            </li>
            <li>
              Address safety considerations built into the design itself, such
              as kill switches or containment strategies.
            </li>
            <li>
              Use diagrams and schematics to make the design easy to follow.
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
              Lead the reader through your decisions in the order you made them,
              so the design reads as a story rather than a parts list.
            </li>
            <li>
              Show the alternatives you considered and explain why you rejected
              them.
            </li>
            <li>
              Connect every design choice back to the problem defined on your
              Description page.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
