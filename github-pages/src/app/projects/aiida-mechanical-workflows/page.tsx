import type { Metadata } from "next";
import { ProfileLayout } from "@/components/profile-layout";

export const metadata: Metadata = {
  title: "AiiDA mechanical-property workflows | Charles Rotich",
  description: "Research software for equation-of-state and elastic-response calculations using AiiDA, Quantum ESPRESSO, ASE and Python, with a guide to the public elastic prototype.",
};

export default function MechanicalWorkflows() {
  return <ProfileLayout active="/projects">
    <p><a href="/projects">← All projects</a></p>
    <h1>AiiDA workflows for mechanical properties</h1>
    <p className="profile-status">Research software · AiiDA · Quantum ESPRESSO · ASE · Python</p>
    <p>This work explores how to automate families of first-principles calculations for mechanical properties. AiiDA coordinates the calculations, Quantum ESPRESSO supplies the SCF energies, and Python tools collect and fit the results.</p>

    <h2>Equation-of-state workflow</h2>
    <p>The equation-of-state workflow organises an energy–volume scan to estimate the equilibrium energy, equilibrium volume and bulk modulus. It combines structure rescaling through ASE with Quantum ESPRESSO calculations managed by an AiiDA WorkChain.</p>
    <ol>
      <li><strong>Start from a reference structure.</strong> Choose the structure and the calculation settings to use throughout the scan.</li>
      <li><strong>Generate a family of cells.</strong> Scale the lattice while preserving fractional atomic coordinates, and record each resulting cell volume.</li>
      <li><strong>Submit the SCF calculations.</strong> Use AiiDA to launch the related Quantum ESPRESSO jobs and retain their calculation records.</li>
      <li><strong>Collect volumes and energies.</strong> Gather the outputs into an energy–volume dataset with its energy units.</li>
      <li><strong>Fit the equation of state.</strong> Analyse the dataset with ASE and Birch–Murnaghan fitting routines to estimate the equilibrium properties.</li>
    </ol>
    <p className="profile-small-note">This section describes the workflow design. A standalone tutorial and reference dataset are still to be prepared.</p>

    <h2>Elastic-constant workflow prototype</h2>
    <p>The public <a href="https://github.com/rotich4499/elastic" target="_blank" rel="noreferrer">elastic repository</a> explores a related idea: apply small strains, calculate the resulting energies and fit the elastic response. The code targets the C₃₃ elastic component.</p>
    <p className="profile-status">Early prototype · Strain application and fitting need correction and validation</p>
    <p>The current implementation needs the requested strain values to be passed through to the deformation and the energy collection and fit to be corrected before it can produce a reliable elastic constant. The source is useful for studying the workflow structure; a validated calculation example is still needed.</p>

    <h3>Reading the public source</h3>
    <table className="profile-table">
      <caption>Main files in the elastic workflow repository.</caption>
      <thead><tr><th scope="col">File</th><th scope="col">Role in the prototype</th></tr></thead>
      <tbody>
        <tr><th scope="row"><a href="https://github.com/rotich4499/elastic/blob/main/deform.py" target="_blank" rel="noreferrer"><code>deform.py</code></a></th><td>Defines a strain matrix and applies a deformation to an ASE cell before returning an AiiDA structure.</td></tr>
        <tr><th scope="row"><a href="https://github.com/rotich4499/elastic/blob/main/common_wf.py" target="_blank" rel="noreferrer"><code>common_wf.py</code></a></th><td>Contains the Quantum ESPRESSO builder helper and equation-of-state fitting utilities. Its fitting helper credits the Delta Project code.</td></tr>
        <tr><th scope="row"><a href="https://github.com/rotich4499/elastic/blob/main/elastic_fit.py" target="_blank" rel="noreferrer"><code>elastic_fit.py</code></a></th><td>Defines the AiiDA WorkChain for submitting calculations and collecting results, with an intended C₃₃ fitting stage.</td></tr>
        <tr><th scope="row"><a href="https://github.com/rotich4499/elastic/blob/main/sub.py" target="_blank" rel="noreferrer"><code>sub.py</code></a></th><td>Shows an example submission with calculation settings and scheduler resources that need adapting to the user's AiiDA environment.</td></tr>
      </tbody>
    </table>
    <p>Start with the deformation routine, then follow the SCF builder, the WorkChain and the submission example. The scripts use AiiDA, aiida-quantumespresso, ASE, NumPy and SciPy; the repository does not yet specify a tested installation environment.</p>

    <h2>Related projects and learning</h2>
    <p>For the materials context, read my <a href="/projects/niobium-nitride">niobium nitride project</a>, which examines temperature, vacancy defects and bulk modulus. For a complete introductory course with supplied calculation files and reference outputs, follow <a href="/learn/siesta">Learn SIESTA with silicon</a>.</p>
    <div className="profile-social"><a href="https://github.com/rotich4499/elastic" target="_blank" rel="noreferrer">Browse the public elastic prototype</a><a href="/projects">All projects</a></div>
  </ProfileLayout>;
}
