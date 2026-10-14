import type { Metadata } from "next";
import { ProfileLayout } from "@/components/profile-layout";

export const metadata: Metadata = {
  title: "Niobium nitride bachelor’s project | Charles Rotich",
  description: "Charles Rotich’s undergraduate study of temperature and nitrogen-vacancy effects on the mechanical properties of NbN, with a project overview, calculation workflow and reported results.",
};

export default function NiobiumNitride() {
  return <ProfileLayout active="/projects">
    <p><a href="/projects">← All projects</a></p>
    <h1>Temperature and defects in niobium nitride</h1>
    <p className="profile-status">Bachelor of Technology final-year project · The Technical University of Kenya · Report dated September 2021</p>
    <p><strong>Effects of Temperature and Intrinsic Structural Defects on Mechanical Properties of Niobium Nitride</strong></p>
    <p>My undergraduate project examined the mechanical properties of rock-salt niobium nitride (NbN), focusing on its bulk modulus: a measure of resistance to a change in volume under compression. I combined density functional theory and molecular dynamics to compare a pristine crystal with a nitrogen-vacancy supercell and structures relaxed at different temperatures.</p>

    <h2>Research question</h2>
    <p>How do temperature and an intrinsic vacancy defect affect the equilibrium structure and bulk modulus of NbN?</p>

    <h2>Calculation workflow in the report</h2>
    <ol>
      <li><strong>Converge the numerical settings.</strong> Test the k-point mesh and plane-wave cutoff in Quantum ESPRESSO. The report selected an 8 × 8 × 8 mesh and a 35 Ry cutoff for the initial lattice calculation.</li>
      <li><strong>Optimise the lattice.</strong> Scan the lattice parameter and identify the energy minimum. The initial optimisation reported a lattice parameter of 4.42026 Å.</li>
      <li><strong>Introduce a nitrogen vacancy.</strong> Construct a 64-atom supercell containing 32 Nb and 32 N atoms, then remove one N atom to obtain a 63-atom defective structure. AiiDA and the Atomic Simulation Environment (ASE) were used for workflow and structure handling.</li>
      <li><strong>Relax the atomic positions.</strong> Use Quantum ESPRESSO’s BFGS relaxation to allow the atoms around the vacancy to adjust.</li>
      <li><strong>Examine structures at different temperatures.</strong> Run molecular dynamics and compare the structures obtained at target temperatures including 400, 500, 700 and 850 K.</li>
      <li><strong>Estimate the bulk modulus.</strong> Calculate energies over a range of volumes and fit the Birch–Murnaghan equation of state to compare the mechanical response of the structures.</li>
    </ol>

    <h2>Results reported in the project</h2>
    <table className="profile-table">
      <caption>Bulk moduli from Tables 1 and 2 of the bachelor’s report.</caption>
      <thead><tr><th scope="col">Calculation condition</th><th scope="col">Bulk modulus (GPa)</th></tr></thead>
      <tbody>
        <tr><th scope="row">Pristine NbN, 0 K</th><td>290.5</td></tr>
        <tr><th scope="row">After molecular dynamics at 400 K</th><td>270.3</td></tr>
        <tr><th scope="row">After molecular dynamics at 500 K</th><td>272.9</td></tr>
        <tr><th scope="row">After molecular dynamics at 700 K</th><td>275.6</td></tr>
        <tr><th scope="row">After molecular dynamics at 850 K</th><td>275.2</td></tr>
      </tbody>
    </table>
    <p>The finite-temperature values range from 270.3 to 275.6 GPa, below the 290.5 GPa value reported for the pristine 0 K reference. The project compares the combined effects of the vacancy and temperature on the modelled structures.</p>
    <p className="profile-small-note">These values are from Tables 1 and 2 on printed pages 37–38 of my bachelor’s report. The vacancy construction and molecular-dynamics workflow are described in Sections 3.5–3.7.</p>

    <h2>Tools and methods</h2>
    <p>Quantum ESPRESSO, density functional theory, molecular dynamics, AiiDA, ASE, structural relaxation and Birch–Murnaghan equation-of-state fitting.</p>
    <p>For an introductory electronic-structure workflow with downloadable inputs, visit <a href="/learn/siesta">Learn SIESTA with silicon</a>.</p>
  </ProfileLayout>;
}
