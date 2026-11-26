import {
  ArticleFramework,
  type ArticleSection,
} from "../../components/article/ArticlePage";
import { MathInline } from "../../components/article/Math";
import { Cite } from "../../components/article/References";
import { Caption } from "../../components/media/Caption";
import { Figure } from "../../components/media/Figure";
import tableStyles from "../../components/article/article-table.module.css";

export const sections: ArticleSection[] = [
  {
    id: "md-en-sec-1",
    title: "Overview & Research Question",
    content: (
      <>
        <p>
          Dopamine (DA) functionalization is the key chemical step that turns
          poly(malic acid) (PMA) fermented by <em>Aureobasidium melanogenum</em>{" "}
          A08 into our underwater biomedical bioadhesive. Through
          EDC/NHS-mediated coupling, dopamine's primary amine (
          <MathInline tex={String.raw`-\text{NH}_2`} />) forms a stable covalent
          amide bond with activated PMA carboxyl sites while leaving catechol
          groups available for interfacial adhesion. Our wet-lab team adapted
          the synthesis route of Tang et al. <Cite k="Tang2020PMLADA" />, using
          a{" "}
          <strong>
            1:1 molar feed ratio of dopamine to initial carboxyl groups
            (DA:COOH)
          </strong>{" "}
          across activation, light-protected coupling, dialysis, and
          freeze-drying.
        </p>
        <p>
          However, published experimental data in this reaction system reveal a
          counterintuitive paradox:{" "}
          <strong>
            why does adding more dopamine to the starting reaction mixture
            reduce the dopamine content of the purified polymer product?
          </strong>{" "}
          As shown in Figure 1 (compiled from Table 1 of Tang et al., 2020),
          Tang et al. reported that purified product dopamine weight percentage
          (wt%) rises from 8.9 wt% at 0.25 feed to a peak of{" "}
          <strong>21.3 wt%</strong> at <strong>1.00 equimolar feed</strong>, but
          drops by 2.1 percentage points to <strong>19.2 wt%</strong> when the
          feed ratio is raised further to <strong>1.25</strong>{" "}
          <Cite k="Tang2020PMLADA" />.
        </p>
        <p>
          Bulk composition assays cannot directly resolve how free dopamine
          molecules approach activated PMA sites in solution prior to covalent
          bond formation. To investigate the molecular origin of this high-feed
          decline, we constructed all-atom molecular dynamics (MD) models across
          all five feed ratios (0.25–1.25) to track pre-reactive spatial
          proximity, nucleophilic approach angles, and local noncovalent
          interactions:
        </p>
        <ul>
          <li>
            <strong>Preview of Core Simulation Findings</strong>: Under our
            50%-activation main model,{" "}
            <strong>orientation-compatible contacts</strong> (simultaneously
            satisfying distance <MathInline tex={String.raw`<4\text{ Å}`} /> and
            a Bürgi–Dunitz-motivated approach-angle window of{" "}
            <MathInline tex={String.raw`95^\circ\text{–}125^\circ`} />) rise
            from feed 0.25 to a peak at equimolar feed 1.00 and drop sharply at
            excess feed 1.25. Comparing feeds 1.00 and 1.25, total close-contact
            pair-frames are nearly identical (485 vs. 462), yet{" "}
            <strong>
              the orientation-compatible fraction plunges from 25.2% to 5.2%
            </strong>
            , formulating a testable pre-reaction hypothesis that excess
            dopamine under the 50%-activation baseline favors shallow-angle{" "}
            <strong>side-on association</strong> along the polymer backbone.
          </li>
        </ul>

        <Figure
          src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-1-a.svg"
          alt="Figure 1A: Purified product dopamine content across five feed ratios (wt%)"
          ratio="4 / 3"
          captionPrefix="Figure 1A:"
          caption={
            <>
              {" "}
              Purified product dopamine content across five feed ratios
              (wt%){" "}
            </>
          }
        />

        <Figure
          src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-1-b.svg"
          alt="Figure 1B: Stepwise change in product dopamine content between adjacent feed levels"
          ratio="4 / 3"
          captionPrefix="Figure 1B:"
          caption={
            <>
              {" "}
              Stepwise change in product dopamine content between adjacent feed
              levels (Δwt%){" "}
            </>
          }
        />
      </>
    ),
  },
  {
    id: "md-en-sec-2",
    title: "Part I: All-Atom MD Modeling",
    content: null,
    subsections: [
      {
        id: "md-en-sec-3",
        title: "1.1 Aqueous System Construction",
        content: (
          <>
            <p>
              We built explicit-solvent all-atom models of the aqueous reaction
              mixture after EDC/NHS activation (workflow shown in Figure 2),
              resolving flexible PMA backbone conformations alongside local
              interactions of dopamine's primary amine, aliphatic linker,
              aromatic ring, and catechol hydroxyl groups (Table 1):
            </p>
            <ul>
              <li>
                <strong>
                  Shared Polymer Activation Baseline (50% NHS Esters)
                </strong>
                : Each of the five main-model systems contains a single{" "}
                <MathInline tex={String.raw`\sim 12\text{ kDa}`} />{" "}
                <MathInline tex={String.raw`\beta`} />
                -PMA chain (103 repeat units, 104 initial carboxyl groups) with{" "}
                <strong>
                  50% (52 sites) represented as activated NHS esters
                </strong>
                , ensuring that all feed ratios are compared at an identical
                active-site density; additional 25% and 75% activation systems
                test sensitivity to site density.
              </li>
              <li>
                <strong>Five Stoichiometric Feed Mixtures</strong>: Matching the
                five published DA:initial COOH molar feed ratios (0.25, 0.50,
                0.75, 1.00, and 1.25), we introduced{" "}
                <strong>26, 52, 78, 104, and 130 dopamine molecules</strong>,
                respectively, while setting free EDC, free NHS, and the urea
                byproduct EDU strictly according to reaction stoichiometry.
              </li>
              <li>
                <strong>Protonation &amp; Charge States</strong>: Dopamine is
                modeled with a neutral primary amine capable of nucleophilic
                attack, unactivated carboxyl groups remain protonated, and{" "}
                <MathInline tex={String.raw`\text{Cl}^-`} /> counterions balance
                the positive charges of protonated EDC and EDU, focusing the
                simulation on pre-reactive diffusive approach and orientational
                rearrangement.
              </li>
            </ul>

            <figure className={tableStyles.tableFigure}>
              <div
                className={tableStyles.tableScroller}
                role="region"
                aria-label="Table 1"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th>Model Input Dimension</th>
                      <th>Main-Model Specification</th>
                      <th>Rationale &amp; Verification Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Polymer Backbone</strong>
                      </td>
                      <td>
                        Single <MathInline tex={String.raw`\beta`} />
                        -PMA chain: 103 repeat units, 104 initial carboxyl
                        groups
                      </td>
                      <td>
                        Matches the{" "}
                        <MathInline tex={String.raw`\sim 12\text{ kDa}`} />{" "}
                        polymer molecular weight used in Tang et al.'s
                        synthesis.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Dopamine Molecule Count</strong>
                      </td>
                      <td>26, 52, 78, 104, or 130 dopamine molecules</td>
                      <td>
                        Exactly matches the five published DA:initial COOH feed
                        ratios: 0.25, 0.50, 0.75, 1.00, and 1.25.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Activated NHS Ester Sites</strong>
                      </td>
                      <td>
                        Fixed at 52 NHS ester sites (50% activation) in the main
                        model
                      </td>
                      <td>
                        Provides a common baseline across feeds; 25% and 75%
                        activation runs test site-density sensitivity.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Explicit Aqueous Environment</strong>
                      </td>
                      <td>
                        33,953 TIP3P waters, free EDC/NHS, byproduct EDU, and
                        208 <MathInline tex={String.raw`\text{Cl}^-`} /> ions
                      </td>
                      <td>
                        Preserves post-activation reaction stoichiometry, ionic
                        environment, and overall neutrality.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Production Sampling</strong>
                      </td>
                      <td>
                        Five independent{" "}
                        <MathInline tex={String.raw`5\text{ ns}`} />{" "}
                        trajectories (
                        <MathInline
                          tex={String.raw`298.15\text{ K}, 1\text{ bar}`}
                        />
                        )
                      </td>
                      <td>
                        Matches ambient synthesis conditions and enables{" "}
                        <MathInline tex={String.raw`3\text{–}5\text{ ns}`} />{" "}
                        vs.{" "}
                        <MathInline tex={String.raw`1\text{–}5\text{ ns}`} />{" "}
                        window checks.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Caption prefix="Table 1:">
                Summary of all-atom MD model inputs for the aqueous PMA–dopamine
                reaction mixture
              </Caption>
            </figure>

            <ArticleFramework title="Exact Reaction-Mixture Stoichiometry & Molecular Inventory">
              <ul>
                <li>
                  Starting from 104 initial carboxyl sites and{" "}
                  <MathInline tex={String.raw`2\times`} /> molar equivalents of
                  EDC and NHS (208 molecules each), converting 50% (52 sites)
                  into NHS esters leaves{" "}
                  <strong>
                    156 free EDC molecules, 156 free NHS molecules, and 52 EDU
                    urea byproduct molecules
                  </strong>{" "}
                  in every simulation box, solvated by{" "}
                  <strong>33,953 TIP3P water molecules</strong> and neutralized
                  with{" "}
                  <strong>
                    208 <MathInline tex={String.raw`\text{Cl}^-`} /> ions
                  </strong>
                  .
                </li>
              </ul>
            </ArticleFramework>

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-2-md-workflow.svg"
              alt="Figure 2: Five-feed reaction system setup and pre-reactive approach geometry schematic"
              ratio="16 / 9"
              captionPrefix="Figure 2:"
              caption={
                <>
                  {" "}
                  Five-feed reaction system setup and pre-reactive approach
                  geometry schematic{" "}
                </>
              }
            />
          </>
        ),
      },
      {
        id: "md-en-sec-4",
        title: "1.2 Simulation Protocol & Criteria",
        content: (
          <>
            <ul>
              <li>
                <strong>
                  Force-Field Parameterization &amp; Production Protocol
                </strong>
                : Simulations were run in CUDA-accelerated{" "}
                <strong>OpenMM 8.3.1</strong> <Cite k="Eastman2017OpenMM" />.
                Small molecules and PMA oligomer templates were parameterized
                with <strong>GAFF2</strong> <Cite k="ambergaff2" /> and{" "}
                <strong>AM1-BCC partial charges</strong>{" "}
                <Cite k="Jakalian2002AM1BCC" /> in <strong>TIP3P water</strong>{" "}
                <Cite k="jorgensen1983tip3p" />. After energy minimization, NVT
                equilibration, and NPT equilibration, each of the five
                50%-activation main-model systems underwent a{" "}
                <MathInline tex={String.raw`5\text{ ns}`} /> production run
                saved every <MathInline tex={String.raw`1\text{ ps}`} />, with
                the{" "}
                <strong>
                  <MathInline tex={String.raw`3\text{–}5\text{ ns}`} /> window
                </strong>{" "}
                used for primary analysis.
              </li>
              <li>
                <strong>
                  Three-Criterion Geometric Classification &amp; Pair-Frame
                  Counting
                </strong>
                : Motivated by the classical{" "}
                <strong>Bürgi–Dunitz trajectory</strong> (
                <MathInline tex={String.raw`\sim 107^\circ`} /> nucleophilic
                attack angle at carbonyl carbon){" "}
                <Cite k="Rodriguez2023Approach" />, we evaluated every
                dopamine–NHS ester pair in each frame using three geometric
                criteria:
              </li>
            </ul>
            <ol>
              <li>
                <strong>Close contact</strong>: Distance between dopamine's
                primary amine nitrogen (
                <MathInline tex={String.raw`\text{N}`} />) and the NHS ester
                acyl carbon (<MathInline tex={String.raw`\text{C}`} />)
                satisfies{" "}
                <strong>
                  <MathInline tex={String.raw`d_{\text{N–C}} < 4\text{ Å}`} />
                </strong>
                ;
              </li>
              <li>
                <strong>Orientation-compatible contact</strong>: Among close
                contacts (
                <MathInline tex={String.raw`d_{\text{N–C}} < 4\text{ Å}`} />
                ), the <MathInline tex={String.raw`\text{N–C–O}`} /> approach
                angle falls within our Bürgi–Dunitz-motivated{" "}
                <strong>
                  <MathInline tex={String.raw`95^\circ\text{–}125^\circ`} />
                </strong>{" "}
                analysis window (whereas angles{" "}
                <strong>
                  <MathInline tex={String.raw`< 60^\circ`} />
                </strong>{" "}
                are tallied separately as shallow-angle{" "}
                <strong>side-on contacts</strong>).
              </li>
              <li>
                <strong>Hydrogen-bond candidate contact</strong>: A close
                contact with amine-donor to carbonyl-acceptor distance{" "}
                <MathInline tex={String.raw`<3.5\text{ Å}`} />,{" "}
                <MathInline tex={String.raw`\text{H}\cdots\text{O}`} /> distance{" "}
                <MathInline tex={String.raw`<2.5\text{ Å}`} />, and
                donor–H–acceptor angle{" "}
                <MathInline tex={String.raw`\ge 150^\circ`} /> is recorded as a
                local H-bond candidate. All contacts are accumulated in{" "}
                <strong>pair-frames</strong>, capturing both encounter frequency
                and residence duration.
              </li>
            </ol>

            <ArticleFramework title="Equilibration Protocol, Integration Settings & Sampling Inventory">
              <ul>
                <li>
                  <strong>Equilibration &amp; Integration</strong>: Following
                  energy minimization, each box underwent{" "}
                  <MathInline tex={String.raw`5\text{ ps}`} /> NVT equilibration
                  and <MathInline tex={String.raw`50\text{ ps}`} /> NPT
                  equilibration. Production runs used a{" "}
                  <MathInline tex={String.raw`2\text{ fs}`} /> timestep at{" "}
                  <MathInline tex={String.raw`298.15\text{ K}`} /> and{" "}
                  <MathInline tex={String.raw`1\text{ bar}`} /> with Particle
                  Mesh Ewald (PME) electrostatics and a{" "}
                  <MathInline tex={String.raw`1\text{ nm}`} /> nonbonded cutoff.
                </li>
                <li>
                  <strong>Sampling Design &amp; Archive Scope</strong>: The five
                  50%-activation main-model trajectories (
                  <MathInline tex={String.raw`5\text{ ns}`} /> each,{" "}
                  <MathInline tex={String.raw`25\text{ ns}`} /> total) are
                  archived in the core record bundle; in addition, two high-feed
                  systems at 25% activation (
                  <MathInline tex={String.raw`3\text{ ns}`} /> each) and two
                  high-feed systems at 75% activation (
                  <MathInline tex={String.raw`5\text{ ns}`} /> each) were
                  designed and summarized for a combined{" "}
                  <strong>
                    <MathInline tex={String.raw`41\text{ ns}`} /> sampling plan
                    across 9 systems
                  </strong>{" "}
                  (with raw supplementary trajectories pending separate
                  archival).
                </li>
              </ul>
            </ArticleFramework>
          </>
        ),
      },
    ],
  },
  {
    id: "md-en-sec-5",
    title: "Part II: High-Feed Side-On Association",
    content: null,
    subsections: [
      {
        id: "md-en-sec-6",
        title: "2.1 Five-Feed Contact Statistics",
        content: (
          <>
            <p>
              Within the <MathInline tex={String.raw`3\text{–}5\text{ ns}`} />{" "}
              primary analysis window of the 50%-activation main model,
              separating{" "}
              <strong>
                total close contacts (
                <MathInline tex={String.raw`<4\text{ Å}`} />)
              </strong>{" "}
              from{" "}
              <strong>
                orientation-compatible contacts (
                <MathInline tex={String.raw`95^\circ\text{–}125^\circ`} />)
              </strong>{" "}
              reveals a striking divergence at high feed (Table 2 and Figure 3):
            </p>

            <figure className={tableStyles.tableFigure}>
              <div
                className={tableStyles.tableScroller}
                role="region"
                aria-label="Table 2"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th>DA:Initial COOH Feed Ratio</th>
                      <th>
                        Close Contacts (pair-frames,{" "}
                        <MathInline tex={String.raw`<4\text{ Å}`} />)
                      </th>
                      <th>
                        Orientation-Compatible Contacts (pair-frames,{" "}
                        <MathInline
                          tex={String.raw`95^\circ\text{–}125^\circ`}
                        />
                        )
                      </th>
                      <th>Orientation-Compatible Fraction of Close Contacts</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>0.25</strong>
                      </td>
                      <td>69</td>
                      <td>10</td>
                      <td>14.5%</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>0.50</strong>
                      </td>
                      <td>462</td>
                      <td>42</td>
                      <td>9.1%</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>0.75</strong>
                      </td>
                      <td>198</td>
                      <td>50</td>
                      <td>25.3%</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>1.00 (Equimolar Peak)</strong>
                      </td>
                      <td>
                        <strong>485</strong>
                      </td>
                      <td>
                        <strong>122</strong>
                      </td>
                      <td>
                        <strong>25.2%</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>1.25 (Excess Feed)</strong>
                      </td>
                      <td>
                        <strong>462</strong>
                      </td>
                      <td>
                        <strong>24</strong>
                      </td>
                      <td>
                        <strong>5.2%</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Caption prefix="Table 2:">
                Close and orientation-compatible contacts across five feed
                ratios (3–5 ns)
              </Caption>
            </figure>

            <ul>
              <li>
                <strong>
                  Spatial Proximity Decouples from Favorable Orientation
                </strong>
                : As shown in Table 2 and Figure 3A–B, orientation-compatible
                contacts climb steadily from 10 at feed 0.25 to a peak of{" "}
                <strong>122</strong> at equimolar feed 1.00. Between feeds 1.00
                and 1.25, total close contacts remain nearly unchanged (485 vs.
                462), yet{" "}
                <strong>
                  orientation-compatible contacts plunge from 122 to 24—a drop
                  from 25.2% to 5.2%
                </strong>{" "}
                that mirrors the experimental rise-and-fall in product dopamine
                wt%.
              </li>
              <li>
                <strong>
                  Shallow-Angle Side-On Contacts (
                  <MathInline tex={String.raw`<60^\circ`} />) Dominate at Excess
                  Feed
                </strong>
                : The distance–angle scatter plot and angular breakdown in
                Figure 3C–D show that at feed 1.25, approaching dopamine
                molecules still reach within{" "}
                <MathInline tex={String.raw`4\text{ Å}`} /> of active sites
                frequently, but the vast majority populate the{" "}
                <strong>
                  <MathInline tex={String.raw`<60^\circ`} /> shallow-angle
                  regime
                </strong>{" "}
                outside the nucleophilic attack window.
              </li>
            </ul>

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-3-a.svg"
              alt="Figure 3A: Total close contacts and orientation-compatible contacts across five feeds"
              ratio="4 / 3"
              captionPrefix="Figure 3A:"
              caption={
                <>
                  {" "}
                  Total close contacts (&lt;4 Å) and orientation-compatible
                  contacts (95°–125°) across five feeds{" "}
                </>
              }
            />

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-3-b.svg"
              alt="Figure 3B: Orientation-compatible fraction across five feeds"
              ratio="4 / 3"
              captionPrefix="Figure 3B:"
              caption={
                <>
                  {" "}
                  Orientation-compatible fraction (%) of close contacts across
                  five feeds{" "}
                </>
              }
            />
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-3-c.svg"
              alt="Figure 3C: Distance-angle scatter distribution of individual close-contact pair-frames"
              ratio="4 / 3"
              captionPrefix="Figure 3C:"
              caption={
                <>
                  {" "}
                  Distance–angle scatter distribution of individual
                  close-contact pair-frames at feeds 1.00 and 1.25{" "}
                </>
              }
            />

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-3-d.svg"
              alt="Figure 3D: Distribution of approach-angle regimes across feeds"
              ratio="4 / 3"
              captionPrefix="Figure 3D:"
              caption={
                <>
                  {" "}
                  Distribution of approach-angle regimes (&lt;60°, intermediate,
                  and 95°–125°) across feeds{" "}
                </>
              }
            />
          </>
        ),
      },
      {
        id: "md-en-sec-7",
        title: "2.2 Approach Poses & Torque Projection",
        content: (
          <>
            <p>
              To identify the physical origin of this orientational shift, we
              combined representative 3D conformational snapshots with
              generalized angular projections of Lennard-Jones (LJ) forces
              across four dopamine functional groups (primary amine, aliphatic
              linker, aromatic ring, and catechol hydroxyls):
            </p>
            <ul>
              <li>
                <strong>
                  Representative 3D Approach Poses (Open Attack vs. Side-On
                  Alignment)
                </strong>
                : Figure 4 compares representative snapshots at feed 1.00 (
                <MathInline tex={String.raw`4.06\text{ ns}`} />) and feed 1.25 (
                <MathInline tex={String.raw`4.16\text{ ns}`} />) at comparable{" "}
                <MathInline tex={String.raw`\text{N–C}`} /> distances (
                <MathInline tex={String.raw`\sim 3.8\text{ Å}`} />:{" "}
                <MathInline tex={String.raw`3.82\text{ Å}`} /> vs.{" "}
                <MathInline tex={String.raw`3.75\text{ Å}`} /> from saved
                coordinates). At feed 1.00, dopamine adopts an extended pose
                presenting its primary amine toward the acyl carbon at{" "}
                <strong>
                  <MathInline tex={String.raw`112.1^\circ`} />
                </strong>
                ; at feed 1.25, dopamine lies compactly alongside the polymer
                chain at a shallow{" "}
                <strong>
                  <MathInline tex={String.raw`46.3^\circ`} />
                </strong>{" "}
                angle.
              </li>
              <li>
                <strong>
                  Sign Reversal of the Catechol-OH Angular Torque Projection
                </strong>
                : In shallow-angle contacts (
                <MathInline tex={String.raw`<60^\circ`} />
                ), a positive LJ angular projection indicates forces that open
                the <MathInline tex={String.raw`\text{N–C–O}`} /> angle toward
                the <MathInline tex={String.raw`95^\circ\text{–}125^\circ`} />{" "}
                compatible window, whereas a negative projection opposes
                reorientation and holds dopamine side-on. As shown in Figure 5B,
                between feeds 1.00 and 1.25{" "}
                <strong>
                  the catechol-OH contribution reverses sign from{" "}
                  <MathInline
                    tex={String.raw`+6.54\text{ kJ}\cdot\text{mol}^{-1}\cdot\text{rad}^{-1}`}
                  />{" "}
                  to{" "}
                  <MathInline
                    tex={String.raw`-5.73\text{ kJ}\cdot\text{mol}^{-1}\cdot\text{rad}^{-1}`}
                  />
                </strong>
                , driving the whole-molecule net angular projection negative at
                feed 1.25 and mechanically opposing rotation into a
                bond-compatible geometry.
              </li>
            </ul>

            <ArticleFramework title="Derivation of Functional-Group Lennard-Jones Generalized Angular Projections">
              <ul>
                <li>
                  For every shallow-angle close-contact frame (
                  <MathInline tex={String.raw`<60^\circ`} />
                  ), we hold polymer coordinates fixed, apply an infinitesimal
                  virtual rigid-body rotation of dopamine about the target acyl
                  carbon in the direction that increases the{" "}
                  <MathInline tex={String.raw`\text{N–C–O}`} /> angle, and
                  project the polymer–dopamine Lennard-Jones forces acting on
                  four disjoint dopamine groups (primary amine, aliphatic
                  linker, aromatic ring, and catechol-OH) onto this virtual
                  displacement, yielding additive generalized torque
                  contributions in{" "}
                  <MathInline
                    tex={String.raw`\text{kJ}\cdot\text{mol}^{-1}\cdot\text{rad}^{-1}`}
                  />
                  .
                </li>
              </ul>
            </ArticleFramework>

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-4-a.svg"
              alt="Figure 4A: Representative pre-reactive 3D approach pose at feed 1.00"
              ratio="4 / 3"
              captionPrefix="Figure 4A:"
              caption={
                <>
                  {" "}
                  Representative pre-reactive 3D approach pose at feed 1.00
                  (4.06 ns, d<sub>N–C</sub> ≈ 3.8 Å, 112.1°){" "}
                </>
              }
            />

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-4-b.svg"
              alt="Figure 4B: Representative pre-reactive 3D side-on pose at feed 1.25"
              ratio="4 / 3"
              captionPrefix="Figure 4B:"
              caption={
                <>
                  {" "}
                  Representative pre-reactive 3D side-on pose at feed 1.25 (4.16
                  ns, d<sub>N–C</sub> ≈ 3.8 Å, 46.3°){" "}
                </>
              }
            />
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-5-a.svg"
              alt="Figure 5A: Encounter orientation breakdown at feeds 1.00 and 1.25"
              ratio="4 / 3"
              captionPrefix="Figure 5A:"
              caption={
                <>
                  {" "}
                  Encounter orientation breakdown between shallow side-on
                  (&lt;60°) and compatible (95°–125°) windows{" "}
                </>
              }
            />

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-5-b.svg"
              alt="Figure 5B: Functional-group LJ generalized angular torque projections"
              ratio="4 / 3"
              captionPrefix="Figure 5B:"
              caption={
                <>
                  {" "}
                  Functional-group Lennard-Jones generalized angular torque
                  projections in shallow-angle contacts (&lt;60°){" "}
                </>
              }
            />
          </>
        ),
      },
      {
        id: "md-en-sec-8",
        title: "2.3 Local Noncovalent Anchoring",
        content: (
          <>
            <ul>
              <li>
                <strong>
                  Local Noncovalent Anchoring (Tighter Binding, Poorer
                  Orientation)
                </strong>
                : Figure 5C–D shows that at feed 1.25, aromatic-ring LJ
                dispersion attraction with the polymer strengthens while the
                fraction of close-contact pair-frames satisfying amine–carbonyl
                H-bond candidate geometry nearly doubles from{" "}
                <strong>17.5% to 32.9%</strong>. Stronger aromatic attraction
                and local H-bond candidate interactions tend to retain dopamine
                along the polymer flank, keeping it near the active site while
                biasing the primary amine outside the selected nucleophilic
                attack angle window.
              </li>
              <li>
                <strong>Single-Pair Contact Histories</strong>: Tracking
                individual dopamine–site pairs over time shows that
                high-frequency pairs at feed 1.00 contribute multiple
                orientation-compatible frames, whereas at feed 1.25 the top
                three recurring pairs account for{" "}
                <strong>60.8% (281/462)</strong> of close-contact pair-frames
                but yield <strong>zero orientation-compatible frames</strong>{" "}
                (with a maximum consecutive run of 7 frames), showing that the
                high-feed contact statistics are largely contributed by a few
                pairs repeatedly forming shallow-angle contacts.
              </li>
            </ul>

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-5-c.svg"
              alt="Figure 5C: Dopamine-polymer LJ dispersion attraction across functional groups"
              ratio="4 / 3"
              captionPrefix="Figure 5C:"
              caption={
                <>
                  {" "}
                  Dopamine–polymer Lennard-Jones dispersion attraction across
                  functional groups at feeds 1.00 and 1.25{" "}
                </>
              }
            />

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-5-d.svg"
              alt="Figure 5D: Local H-bond candidate fraction and bulk dopamine self-clustering"
              ratio="4 / 3"
              captionPrefix="Figure 5D:"
              caption={
                <>
                  {" "}
                  Local amine–carbonyl H-bond candidate fraction and bulk
                  dopamine self-clustering at feeds 1.00 and 1.25{" "}
                </>
              }
            />
          </>
        ),
      },
    ],
  },
  {
    id: "md-en-sec-9",
    title: "Part III: Model Sensitivity Analysis",
    content: null,
    subsections: [
      {
        id: "md-en-sec-10",
        title: "3.1 Time-Window & Activation Checks",
        content: (
          <>
            <ul>
              <li>
                <strong>
                  Time-Window Comparison (
                  <MathInline tex={String.raw`1\text{–}5\text{ ns}`} /> vs.{" "}
                  <MathInline tex={String.raw`3\text{–}5\text{ ns}`} />)
                </strong>
                : Across the five archived main-model trajectories, expanding
                the analysis window from{" "}
                <MathInline tex={String.raw`3\text{–}5\text{ ns}`} /> to the
                wider <MathInline tex={String.raw`1\text{–}5\text{ ns}`} />{" "}
                analysis window (4,000 frames) preserves the higher
                compatible-contact count at feed 1.00 relative to feed 1.25
                (Figure 6A). Splitting the trajectory into non-overlapping{" "}
                <MathInline tex={String.raw`1\text{ ns}`} /> blocks shows that
                compatible contacts occur in discrete bursts with noticeable
                within-trajectory temporal fluctuation across sub-windows,
                diverging most strongly during the{" "}
                <MathInline tex={String.raw`3\text{–}5\text{ ns}`} /> window
                (Figure 6B–C).
              </li>
              <li>
                <strong>
                  Low Bulk Dopamine Self-Clustering &amp; Site Occupancy in the
                  50%-Activation Model
                </strong>
                : Across the two highest feeds in the 50%-activation main model,
                bulk dopamine self-clustering remains low and nearly constant at{" "}
                <strong>
                  <MathInline tex={String.raw`\sim 4.5\%`} />
                </strong>{" "}
                (Figure 5D), and mean active-site occupancy within the{" "}
                <MathInline tex={String.raw`3\text{–}5\text{ ns}`} /> primary
                analysis window stays <strong>below 0.5%</strong> (
                <MathInline tex={String.raw`0.47\%`} /> at feed 1.00 and{" "}
                <MathInline tex={String.raw`0.44\%`} /> at feed 1.25; reaching{" "}
                <MathInline tex={String.raw`0.76\%`} /> in the{" "}
                <MathInline tex={String.raw`4\text{–}5\text{ ns}`} /> block at
                feed 1.00 and <MathInline tex={String.raw`0.53\%`} /> across the
                full <MathInline tex={String.raw`0\text{–}5\text{ ns}`} />{" "}
                trajectory at feed 1.25), indicating that within our main-model
                trajectories the drop in compatible contacts accompanies a shift
                toward local side-on geometries rather than bulk aggregation or
                site saturation.
              </li>
              <li>
                <strong>
                  Sensitivity to Assumed Polymer Activation Density
                </strong>
                : In the summarized 75%-activation sensitivity comparison, the
                orientation-compatible fraction shifts from 5.25% at feed 1.00
                to 10.72% at feed 1.25, reversing the two-point ordering of the
                50%-activation main model—underscoring that the high-feed
                orientational response is sensitive to assumed NHS-ester site
                density along the polymer backbone under single-trajectory
                sampling.
              </li>
            </ul>

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-6-a.svg"
              alt="Figure 6A: Orientation-compatible fraction across 1-5 ns and 3-5 ns analysis windows"
              ratio="4 / 3"
              captionPrefix="Figure 6A:"
              caption={
                <>
                  {" "}
                  Orientation-compatible contact fraction across the 1–5 ns and
                  3–5 ns analysis windows{" "}
                </>
              }
            />

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-6-b.svg"
              alt="Figure 6B: Orientation-compatible contacts in each 1 ns trajectory block"
              ratio="4 / 3"
              captionPrefix="Figure 6B:"
              caption={
                <>
                  {" "}
                  Orientation-compatible contacts across consecutive
                  non-overlapping 1 ns trajectory blocks{" "}
                </>
              }
            />

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-6-c.svg"
              alt="Figure 6C: Cumulative orientation-compatible contact accumulation over 0-5 ns"
              ratio="4 / 3"
              captionPrefix="Figure 6C:"
              caption={
                <>
                  {" "}
                  Cumulative orientation-compatible contact accumulation over
                  0–5 ns (5,000 frames){" "}
                </>
              }
            />
          </>
        ),
      },
      {
        id: "md-en-sec-11",
        title: "3.2 Summary & Outlook",
        content: (
          <>
            <ul>
              <li>
                <strong>
                  Mechanistic Perspective for Bioadhesive Synthesis
                </strong>
                : Under the 50%-activation main-model baseline, our pre-reaction
                atomic-scale simulations formulate a conditional molecular
                hypothesis for why raising the dopamine feed ratio does not
                automatically increase favorable nucleophilic approach
                orientations: excess dopamine is more prone to shallow-angle
                side-on association promoted by aromatic dispersion, local
                H-bond candidates, and negative catechol torque components. This
                qualitative rise-and-fall trend aligns with the published
                product dopamine content curve and is consistent with our
                wet-lab team's independent selection of a{" "}
                <strong>1:1 equimolar feed ratio</strong> in mid-September.
              </li>
              <li>
                <strong>
                  Scope Boundaries &amp; Methodological Limitations
                </strong>
                : Classical non-reactive MD keeps covalent bonding fixed and
                characterizes pre-reactive approach geometry rather than
                covalent amide bond formation, competing NHS-ester hydrolysis,
                or transition-state barriers; moreover, each condition currently
                uses a single production trajectory (
                <MathInline tex={String.raw`5\text{ ns}`} /> for the 50%- and
                75%-activation systems;{" "}
                <MathInline tex={String.raw`3\text{ ns}`} /> for the
                25%-activation systems) under fixed protonation states, and LJ
                angular projections isolate van der Waals torque components
                without solvent-shell or long-range electrostatic torques.
              </li>
              <li>
                <strong>
                  Future Experimental &amp; Computational Directions
                </strong>
                : Experimentally, measuring actual NHS-ester conversion,
                solution pH, and purified grafting degree alongside adhesion
                strength on glass, stainless steel, and porcine skin will test
                these predictions across feed ratios; computationally,
                multi-replica long trajectories combined with QM/MM or reactive
                force fields can quantify the covalent bond-formation barrier.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
];
