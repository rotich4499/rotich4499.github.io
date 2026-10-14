import type { Metadata } from "next";
import { ProfileLayout } from "@/components/profile-layout";

export const metadata: Metadata = { title: "Projects | Charles Rotich", description: "Reproducible computational materials projects with inputs, scripts, output files and step-by-step explanations." };

export default function Projects() {
  return <ProfileLayout active="/projects"><h1>Projects</h1><p>Worked examples from my computational materials research, with the files and explanations needed to follow the workflow.</p>
    <article className="profile-project"><p className="profile-status">SIESTA · PBEsol · Silicon</p><h2>Silicon in the diamond structure</h2><p>A two-atom silicon example covering SCF calculations, mesh-cutoff and k-point convergence, a lattice-constant scan and variable-cell relaxation.</p>
      <ul><li>Complete SCF and relaxation inputs and reference outputs.</li><li>Convergence data, plotting scripts and original figures.</li><li>A matching PBEsol pseudopotential and documented launchers.</li></ul>
      <dl className="profile-project-results"><div><dt>Reference SCF energy</dt><dd>−230.042602 eV per two-atom cell</dd></div><div><dt>Fitted cubic lattice parameter</dt><dd>5.4421 Å</dd></div></dl>
      <p className="profile-small-note">These are author-supplied results. The course records the numerical settings, build identity and limits of the convergence tests.</p>
      <div className="profile-social"><a href="/learn/siesta">Follow the step-by-step course</a><a href="/learn/siesta/downloads">Inputs, scripts and results</a></div>
    </article>
    <article className="profile-project"><p className="profile-status">Bachelor’s final-year project · Quantum ESPRESSO and molecular dynamics · Report dated September 2021</p><h2>Temperature and defects in niobium nitride</h2><p>My undergraduate study of how temperature and a nitrogen vacancy affect the bulk modulus of rock-salt NbN. The project combines convergence tests, structural relaxation, molecular dynamics and Birch–Murnaghan equation-of-state fitting.</p><a href="/projects/niobium-nitride">Project overview, workflow and results</a></article>
    <article className="profile-project"><p className="profile-status">Electronic-structure studies</p><h2>Band structures, DOS/PDOS and molecular gaps</h2><p>Electronic-structure analysis of silicon in the diamond structure and benzene, including atomic and orbital contributions to the density of states and comparisons of molecular gap definitions.</p><a href="/research">Read the research interests</a></article>
    <article className="profile-project"><p className="profile-status">Ongoing investigation · Perovskite oxides</p><h2>Understanding the origin of band gaps</h2><p>Investigating why an oversimplified DFT model can predict a metallic state for an insulating perovskite, and how structural and magnetic symmetry affect the electronic states.</p><a href="/research">Read the research question and background</a></article>
    <article className="profile-project"><p className="profile-status">MSc thesis · Research in progress</p><h2>Spinel oxides for photocatalytic water splitting</h2><p>A first-principles comparison of CoMn₂O₄ and CuCo₂O₄, examining bulk properties, optical response, surface energetics and oxygen-evolution pathways.</p><a href="/research">Read the research overview</a></article>
    <p className="profile-small-note">Additional project material will be added as the inputs, methods and results are prepared for sharing.</p>
  </ProfileLayout>;
}
