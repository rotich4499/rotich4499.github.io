import type { Metadata } from "next";
import { ProfileLayout } from "@/components/profile-layout";
import { ElectronicProjects, EvidenceTable, GapDefinitions, ResearchFigure } from "@/components/research-evidence";

export const metadata: Metadata = {
  title: "Silicon band gaps and fractional charge | Charles Rotich",
  description: "Silicon band structure, fractional-charge curvature, derivative-gap estimates and supercell-size dependence, with original figures and results from Charles Rotich’s presentation.",
};

export default function Silicon() {
  return <ProfileLayout active="/projects">
    <p><a href="/projects">← All projects</a></p>
    <h1>Silicon: band gaps and fractional charge</h1>
    <p className="profile-status">PBEsol · DZP · Silicon in the diamond structure</p>
    <p>This study compares a band-structure gap with gaps calculated from total-energy changes when electrons are added or removed. Silicon also provides a way to examine how the result changes with the charge step and the size of the simulation cell.</p>
    <p className="profile-small-note">Results and original figures from my <a href="/presentations/silicon-diamond-gaps.pdf" target="_blank" rel="noreferrer">silicon and diamond presentation</a>, 14 October 2026. These are reported calculation results; the calculations have not been rerun for this website.</p>
    <ElectronicProjects active="/projects/silicon" />

    <h2>Calculation setup</h2>
    <EvidenceTable label="Silicon calculation settings"><table className="profile-table"><caption>Primitive-cell settings reported on slide 3.</caption><tbody>
      <tr><th scope="row">Structure</th><td>Diamond structure, 2 Si atoms</td></tr>
      <tr><th scope="row">Neutral valence electrons</th><td>8</td></tr>
      <tr><th scope="row">Exchange–correlation / basis</th><td>PBEsol / DZP</td></tr>
      <tr><th scope="row">k-point mesh</th><td>10 × 10 × 10</td></tr>
      <tr><th scope="row">Mesh cutoff</th><td>200 Ry</td></tr>
      <tr><th scope="row">Cubic lattice parameter</th><td>5.4421 Å</td></tr>
    </tbody></table></EvidenceTable>

    <h2>Band structure</h2>
    <p>The reported Kohn–Sham gap is <strong>0.45602719 eV and indirect</strong>. An indirect gap has its valence-band maximum and conduction-band minimum at different crystal momenta.</p>
    <ResearchFigure name="silicon-band-structure" alt="Silicon PBEsol band structure along high-symmetry points, with an indirect Kohn–Sham gap reported as 0.45602719 eV.">The original silicon band-structure plot. Follow the highest occupied and lowest unoccupied bands to identify the two band edges.</ResearchFigure>

    <GapDefinitions electrons={8} />
    <EvidenceTable label="Silicon gap comparison"><table className="profile-table"><caption>Primitive-cell gap comparison, slides 5, 12 and 14. All gaps are in eV.</caption><thead><tr><th scope="col">Quantity</th><th scope="col">Gap (eV)</th></tr></thead><tbody>
      <tr><th scope="row">Kohn–Sham band gap</th><td>0.45602719</td></tr>
      <tr><th scope="row">Finite-step estimate, δ = 0.001</th><td>0.458000</td></tr>
      <tr><th scope="row">Integer ΔSCF, primitive cell</th><td>2.438585</td></tr>
    </tbody></table></EvidenceTable>

    <h2>Fractional-charge curvature</h2>
    <p>Compare the calculated energy with a straight line joining adjacent integer-electron states. The silicon energies lie below that line; the presentation associates this convex behaviour with a tendency to delocalise fractional charge.</p>
    <ResearchFigure name="silicon-charge-curvature" alt="Silicon fractional-charge total energy plotted against a straight interpolation between integer-electron states.">At 7.5 and 8.5 electrons, the reported deviations from the straight reference are −0.1582 and −0.1140 eV, respectively.</ResearchFigure>

    <h2>Why cell size matters</h2>
    <p>The integer ΔSCF result falls as the simulation cell grows. A value obtained by adding one electron to a two-atom primitive cell therefore needs a cell-size check before it is interpreted as a bulk result.</p>
    <EvidenceTable label="Silicon supercell gap data"><table className="profile-table"><caption>Integer ΔSCF gaps from slide 9, rounded as reported.</caption><thead><tr><th scope="col">Supercell</th><th scope="col">Atoms</th><th scope="col">Gap (eV)</th></tr></thead><tbody>
      <tr><th scope="row">1 × 1 × 1</th><td>2</td><td>2.4386</td></tr>
      <tr><th scope="row">2 × 2 × 2</th><td>16</td><td>1.0785</td></tr>
      <tr><th scope="row">3 × 3 × 3</th><td>54</td><td>0.7396</td></tr>
      <tr><th scope="row">4 × 4 × 4</th><td>128</td><td>0.5792</td></tr>
      <tr><th scope="row">5 × 5 × 5</th><td>250</td><td>0.5099</td></tr>
    </tbody></table></EvidenceTable>
    <ResearchFigure name="silicon-supercell-gap" alt="Silicon integer ΔSCF gap decreases from about 2.44 eV in the primitive cell to about 0.51 eV in a 250-atom supercell.">The calculated gap moves towards the primitive-cell KS reference as the cell grows; the largest reported cell remains about 0.054 eV above that reference.</ResearchFigure>
    <details className="profile-evidence-details"><summary>Energy curvature across different cell sizes</summary>
      <ResearchFigure name="silicon-supercell-curvature" alt="Fractional-charge energy curves for silicon cells containing one, eight and twenty-seven primitive cells.">Spreading the extra charge over more primitive cells makes the energy curve look straighter. As the presentation stresses, that visual change does not establish that PBEsol has become exact.</ResearchFigure>
    </details>

    <h2>Reducing the charge step</h2>
    <p>In the primitive cell, the finite-step estimate changes from 2.438585 eV at δ = 1 to 0.458000 eV at δ = 0.001. The latter is about 2.0 meV above the reported KS gap.</p>
    <ResearchFigure name="silicon-small-charge-gap" alt="Silicon small-charge derivative-gap estimates approach about 0.458 eV as the charge step decreases to 0.001 electrons.">The small-charge scan resolves the approach to the KS-gap scale.</ResearchFigure>
    <details className="profile-evidence-details"><summary>Full charge-step scan and 2 × 2 × 2 supercell check</summary>
      <ResearchFigure name="silicon-derivative-gap" alt="Silicon derivative-gap estimate decreases from 2.438585 eV at a full-electron step to 0.462 eV at a 0.005-electron step.">The wider scan connects the integer ΔSCF result with the small-step estimates.</ResearchFigure>
      <ResearchFigure name="silicon-supercell-derivative-gap" alt="A 16-atom silicon supercell gives a derivative-gap estimate of 0.458000 eV at delta 0.004, close to its same-cell KS gap of 0.45789129 eV.">For the 16-atom cell, N = 64. At δ = 0.004, the estimate is 0.458000 eV, compared with a same-cell KS gap of 0.45789129 eV: a difference of approximately 0.109 meV.</ResearchFigure>
    </details>

    <h2>Following the analysis</h2>
    <ol><li>Build the diamond-structure silicon cell and record the numerical settings.</li><li>Run the neutral calculation and identify the band edges from the band structure.</li><li>Collect total energies at N and at N ± δ, using a consistent geometry and recording the charged-cell treatment.</li><li>Compare the finite-step estimates as δ is reduced.</li><li>Repeat the size comparison with larger cells, comparing each derivative estimate with the corresponding cell’s KS gap.</li></ol>
    <p>These steps explain the analysis shown in the slides. To begin with supplied SIESTA inputs and reference outputs, use the separate <a href="/learn/siesta">silicon SCF, convergence and relaxation course</a>.</p>
    <p className="profile-small-note">Charged periodic-cell energies depend on the simulation setup and size. The primitive-cell integer result is a finite-cell calculation, and the values here are not experimental gaps.</p>
    <p><a href="/presentations/silicon-diamond-gaps.pdf" target="_blank" rel="noreferrer">View the complete silicon and diamond slides (PDF, 14 slides)</a>.</p>
    <p className="profile-small-note">The slide PDF is a compact web copy. The original plots are available through each figure’s full-size link.</p>
  </ProfileLayout>;
}
