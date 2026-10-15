import type { Metadata } from "next";
import { ProfileLayout } from "@/components/profile-layout";
import { ElectronicProjects, EvidenceTable, GapDefinitions, ResearchFigure } from "@/components/research-evidence";

export const metadata: Metadata = {
  title: "Benzene molecular gaps and fractional charge | Charles Rotich",
  description: "Benzene HOMO–LUMO, integer ΔSCF and fractional-charge gap results in SIESTA, with the original plots, calculation settings and an explanation of the three definitions.",
};

export default function Benzene() {
  return <ProfileLayout active="/projects">
    <p><a href="/projects">← All projects</a></p>
    <h1>Benzene: molecular gaps and fractional charge</h1>
    <p className="profile-status">Gas-phase C₆H₆ · SIESTA · PBE via LibXC · DZP</p>
    <p>This study compares the gap between molecular orbitals with gaps obtained from changes in total energy. Fractional-electron calculations show how the estimate depends on the charge interval used to probe the energy curve.</p>
    <p className="profile-small-note">Results and original figures from my <a href="/presentations/benzene-gaps.pdf" target="_blank" rel="noreferrer">benzene presentation</a>, 28 September 2026. The calculations have not been rerun for this website.</p>
    <ElectronicProjects active="/projects/benzene" />

    <h2>Calculation setup</h2>
    <EvidenceTable label="Benzene calculation settings"><table className="profile-table"><caption>Settings stated on slides 3–4.</caption><tbody>
      <tr><th scope="row">Molecule</th><td>Benzene, C₆H₆</td></tr>
      <tr><th scope="row">Neutral valence electrons</th><td>30 = 6 × 4 + 6 × 1</td></tr>
      <tr><th scope="row">Code / exchange–correlation</th><td>SIESTA / PBE via LibXC</td></tr>
      <tr><th scope="row">Pseudopotentials / basis</th><td>PBE PSML / DZP</td></tr>
      <tr><th scope="row">Neutral-state sampling / spin</th><td>One Γ point / non-spin-polarised</td></tr>
      <tr><th scope="row">Integer ΔSCF geometry</th><td>Fixed geometry</td></tr>
    </tbody></table></EvidenceTable>

    <GapDefinitions molecular electrons={30} />
    <EvidenceTable label="Benzene gap comparison"><table className="profile-table"><caption>Gap comparison from slides 4–8. These are calculated values.</caption><thead><tr><th scope="col">Quantity</th><th scope="col">Gap (eV)</th></tr></thead><tbody>
      <tr><th scope="row">KS HOMO–LUMO gap</th><td>5.05688178</td></tr>
      <tr><th scope="row">Finite-step estimate, δ = 0.001</th><td>5.059000</td></tr>
      <tr><th scope="row">Integer ΔSCF at fixed geometry</th><td>7.524806</td></tr>
    </tbody></table></EvidenceTable>

    <h2>Neutral molecular orbitals</h2>
    <EvidenceTable label="Benzene frontier orbital energies"><table className="profile-table"><caption>Orbital energies from slide 4.</caption><thead><tr><th scope="col">Orbital</th><th scope="col">Band index</th><th scope="col">Energy (eV)</th></tr></thead><tbody>
      <tr><th scope="row">HOMO</th><td>15</td><td>−6.02302210</td></tr>
      <tr><th scope="row">LUMO</th><td>16</td><td>−0.96614033</td></tr>
    </tbody></table></EvidenceTable>
    <p>The presentation reports a neutral-molecule KS gap of 5.05688178 eV from these frontier orbitals.</p>

    <h2>Integer ΔSCF at fixed geometry</h2>
    <EvidenceTable label="Benzene charged-state total energies"><table className="profile-table"><caption>Total energies from slide 5.</caption><thead><tr><th scope="col">State</th><th scope="col">Valence electrons</th><th scope="col">Total energy (eV)</th></tr></thead><tbody>
      <tr><th scope="row">Cation</th><td>29</td><td>−1069.059173</td></tr>
      <tr><th scope="row">Neutral</th><td>30</td><td>−1076.392891</td></tr>
      <tr><th scope="row">Anion</th><td>31</td><td>−1076.201803</td></tr>
    </tbody></table></EvidenceTable>
    <p>The energy differences give I = E(29) − E(30) = 7.333718 eV and A = E(30) − E(31) = −0.191088 eV. The corresponding integer ΔSCF gap is I − A = <strong>7.524806 eV</strong>.</p>

    <h2>Changing the fractional-charge step</h2>
    <p>The finite-step estimate is 5.30405 eV at δ = 0.1 and 5.059000 eV at δ = 0.001. The original plot shows the transition from the integer ΔSCF value to the small-step estimates.</p>
    <ResearchFigure name="benzene-derivative-gap" alt="Benzene finite-step gap decreases from 7.524806 eV at delta 1 to 5.059 eV at delta 0.001, close to the KS reference.">The horizontal axis uses a logarithmic charge scale. Different values of δ sample different intervals of the same total-energy curve.</ResearchFigure>
    <EvidenceTable label="Benzene small-charge gap estimates"><table className="profile-table"><caption>Small-step estimates from slide 7.</caption><thead><tr><th scope="col">Charge step δ</th><th scope="col">G(δ) (eV)</th></tr></thead><tbody>
      <tr><th scope="row">0.001</th><td>5.059000</td></tr>
      <tr><th scope="row">0.002</th><td>5.061500</td></tr>
      <tr><th scope="row">0.004</th><td>5.066500</td></tr>
      <tr><th scope="row">0.008</th><td>5.076500</td></tr>
    </tbody></table></EvidenceTable>
    <ResearchFigure name="benzene-small-charge-gap" alt="Benzene small-charge gap estimates from 5.059000 to 5.076500 eV compared with the KS gap of 5.05688178 eV.">At δ = 0.001, the estimate is approximately 0.002118 eV, or 2.12 meV, above the KS reference.</ResearchFigure>

    <h2>Following the analysis</h2>
    <ol><li>Prepare the neutral molecule, choose the numerical settings and record the geometry.</li><li>Obtain the neutral HOMO and LUMO energies.</li><li>Calculate the 29-, 30- and 31-electron energies at the same geometry for the integer ΔSCF comparison.</li><li>Calculate energies at 30 ± δ for progressively smaller charge steps.</li><li>Evaluate G(δ) and compare it with the neutral KS gap, checking that total energies are sufficiently precise for the small differences.</li></ol>
    <p className="profile-small-note">These steps explain the presentation’s analysis. A complete benzene input/output bundle has not yet been added. The orbital gap, total-energy gap and optical excitation gap describe different quantities; the slides do not provide an experimental benchmark.</p>
    <p><a href="/presentations/benzene-gaps.pdf" target="_blank" rel="noreferrer">View the complete benzene slides (PDF, 8 slides)</a>.</p>
  </ProfileLayout>;
}
