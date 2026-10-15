import type { Metadata } from "next";
import { ProfileLayout } from "@/components/profile-layout";
import { ElectronicProjects, EvidenceTable, GapDefinitions, ResearchFigure } from "@/components/research-evidence";

export const metadata: Metadata = {
  title: "Diamond electronic structure and fractional charge | Charles Rotich",
  description: "Elemental carbon diamond: PBEsol band structure, integer ΔSCF and fractional-charge gap estimates, with original plots and calculation settings from Charles Rotich’s slides.",
};

export default function Diamond() {
  return <ProfileLayout active="/projects">
    <p><a href="/projects">← All projects</a></p>
    <h1>Diamond: electronic structure and fractional charge</h1>
    <p className="profile-status">Elemental carbon · PBEsol · DZP</p>
    <p>Diamond provides the carbon comparison in my study of electronic gaps and fractional-charge curvature. Silicon and diamond share the same structural family, while the calculations give very different gap scales.</p>
    <p className="profile-small-note">Results and original figures from my <a href="/presentations/silicon-diamond-gaps.pdf" target="_blank" rel="noreferrer">silicon and diamond presentation</a>, 14 October 2026. The values are reported presentation results; the calculations have not been rerun for this website.</p>
    <ElectronicProjects active="/projects/diamond" />

    <h2>Calculation setup</h2>
    <EvidenceTable label="Diamond calculation settings"><table className="profile-table"><caption>Diamond settings reported on slide 3.</caption><tbody>
      <tr><th scope="row">Material / structure</th><td>Carbon / diamond structure</td></tr>
      <tr><th scope="row">Primitive cell / valence electrons</th><td>2 C atoms / 8 electrons</td></tr>
      <tr><th scope="row">Exchange–correlation / basis</th><td>PBEsol / DZP</td></tr>
      <tr><th scope="row">k-point mesh</th><td>8 × 8 × 8</td></tr>
      <tr><th scope="row">Mesh cutoff</th><td>400 Ry</td></tr>
      <tr><th scope="row">Cubic lattice parameter</th><td>3.5781 Å</td></tr>
    </tbody></table></EvidenceTable>

    <h2>Band structure</h2>
    <p>The reported PBEsol Kohn–Sham gap is <strong>4.0854 eV and indirect</strong>. This is the neutral-cell band-edge difference used as the reference in the charge-step comparison.</p>
    <ResearchFigure name="diamond-band-structure" alt="Carbon diamond band structure along Γ, X, W, L, Γ, K and U, with a reported indirect PBEsol gap of 4.0854 eV.">The original diamond band structure from the comparison slides.</ResearchFigure>

    <GapDefinitions electrons={8} />
    <EvidenceTable label="Diamond gap comparison"><table className="profile-table"><caption>Diamond gap comparison from slides 6, 12 and 14.</caption><thead><tr><th scope="col">Quantity</th><th scope="col">Gap (eV)</th></tr></thead><tbody>
      <tr><th scope="row">Kohn–Sham band gap</th><td>4.0854</td></tr>
      <tr><th scope="row">Finite-step estimate, δ = 0.001</th><td>≈4.0880</td></tr>
      <tr><th scope="row">Integer ΔSCF, primitive cell</th><td>8.197374</td></tr>
    </tbody></table></EvidenceTable>

    <h2>Integer-electron calculation</h2>
    <EvidenceTable label="Diamond charged-state total energies"><table className="profile-table"><caption>Total energies reported on slide 6, for the two-atom cell.</caption><thead><tr><th scope="col">State</th><th scope="col">Valence electrons</th><th scope="col">Total energy (eV)</th></tr></thead><tbody>
      <tr><th scope="row">N − 1</th><td>7</td><td>−318.806581</td></tr>
      <tr><th scope="row">Neutral, N</th><td>8</td><td>−326.444217</td></tr>
      <tr><th scope="row">N + 1</th><td>9</td><td>−325.884479</td></tr>
    </tbody></table></EvidenceTable>
    <p>These energies give G(1) = 8.197374 eV. The N + 1 energy is higher than the neutral energy, so the corresponding E(N) − E(N + 1) difference is −0.559738 eV in this finite-cell calculation.</p>

    <h2>Fractional charge and curvature</h2>
    <p>The calculated fractional-charge energies lie below the straight interpolation between adjacent integer-electron states. The presentation interprets this convex curvature in terms of a delocalisation tendency.</p>
    <ResearchFigure name="diamond-charge-curvature" alt="Diamond fractional-charge energies lie below a straight interpolation between integer-electron states.">The energy curve shows why a full-electron interval and a small charge interval can give different gap estimates.</ResearchFigure>
    <ResearchFigure name="diamond-derivative-gap" alt="Diamond finite-step gap estimates decrease from about 8.1974 eV at delta 1 towards about 4.088 eV for small charge steps.">Reducing δ moves the finite-step estimate towards the neutral-cell KS-gap scale.</ResearchFigure>
    <details className="profile-evidence-details"><summary>Resolve the small-charge range</summary>
      <ResearchFigure name="diamond-small-charge-gap" alt="Diamond small-charge estimates range around 4.0880 to 4.0885 eV, above a KS reference of 4.0854 eV.">At δ = 0.001, the reported estimate is approximately 4.0880 eV, about 2.6 meV above the KS reference. The small residual variation is visible in the original plot.</ResearchFigure>
    </details>

    <h2>Comparison with silicon</h2>
    <EvidenceTable label="Silicon and diamond setup comparison"><table className="profile-table"><caption>Both calculations use PBEsol, DZP and two-atom primitive cells.</caption><thead><tr><th scope="col">Quantity</th><th scope="col">Silicon</th><th scope="col">Diamond</th></tr></thead><tbody>
      <tr><th scope="row">Cubic lattice parameter (Å)</th><td>5.4421</td><td>3.5781</td></tr>
      <tr><th scope="row">Mesh cutoff (Ry)</th><td>200</td><td>400</td></tr>
      <tr><th scope="row">k-point mesh</th><td>10 × 10 × 10</td><td>8 × 8 × 8</td></tr>
      <tr><th scope="row">KS gap (eV)</th><td>0.45602719</td><td>4.0854</td></tr>
    </tbody></table></EvidenceTable>
    <p>Read the <a href="/projects/silicon">silicon study</a> for the reported supercell-size comparison. The diamond slides shown here provide primitive-cell results and a charge-step scan.</p>

    <h2>Following the analysis</h2>
    <ol><li>Set up the two-atom carbon diamond cell using the reported lattice and numerical settings.</li><li>Obtain the neutral band structure and identify its valence and conduction edges.</li><li>Compare total energies at N = 8 and at N ± δ, keeping the geometry consistent and recording the treatment of a charged periodic cell.</li><li>Calculate G(δ), reduce the charge step and compare the estimates with the neutral-cell KS gap.</li></ol>
    <p className="profile-small-note">These steps describe the slide analysis. The slides do not include a complete diamond input/output bundle. Charged-cell and size effects need to be assessed before interpreting an integer ΔSCF value as a bulk gap; the reported numbers are not experimental measurements.</p>
    <p><a href="/presentations/silicon-diamond-gaps.pdf" target="_blank" rel="noreferrer">View the complete silicon and diamond slides (PDF, 14 slides)</a>.</p>
    <p className="profile-small-note">The slide PDF is a compact web copy. The original plots are available through each figure’s full-size link.</p>
  </ProfileLayout>;
}
