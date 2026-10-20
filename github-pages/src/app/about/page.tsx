import type { Metadata } from "next";
import { ProfileLayout } from "@/components/profile-layout";

export const metadata: Metadata = { title: "About | Charles Rotich", description: "Charles Rotich's background in computational physics, materials science, research computing and materials testing." };

export default function About() {
  return <ProfileLayout active="/about"><h1>About</h1>
    <p>I am Charles Kipchumba Rotich, a Kenyan computational physicist working in materials science. I am pursuing an MSc in Physics at The Technical University of Kenya, where I served as a Graduate Research Assistant from July 2025 to August 2026.</p>
    <p>My current research examines CoMn₂O₄ and CuCo₂O₄ spinel oxides for photocatalytic water splitting. I am undertaking a five-month Erasmus+ KA171 research exchange at the University of Cantabria in Santander, Spain.</p>
    <h2>Background</h2><p>I graduated from The Technical University of Kenya in 2022 with a Bachelor of Technology in Technical and Applied Physics, earning First Class Honours. My specialisation included materials science and computational physics.</p>
    <p>My <a href="/projects/niobium-nitride">bachelor’s final-year project</a> studied the effects of temperature and intrinsic structural defects on the mechanical properties of niobium nitride, using first-principles calculations and molecular dynamics.</p>
    <p>My experience includes computational materials modelling with the TUK Material Modelling Team, research-cloud workflows at KENET, and destructive and non-destructive materials testing at the Materials Testing and Research Division. I have also guided students through electronic-structure simulation workflows.</p>
    <h2>Scientific training</h2><p>I have participated in APhRICA advanced physics training at the University of Rwanda / ICTP-EAIFR over two years, alongside the ICTP Physics Without Frontiers workshop in Nairobi, the CUEA DFT School and Data Science Africa at Dedan Kimathi University of Technology in Nyeri.</p>
    <h2>Tools I use</h2><p>VASP, Quantum ESPRESSO, SIESTA, ABINIT, Python and Linux-based high-performance computing environments. My work also involves MPI, Slurm and scientific data analysis.</p>
    <h2>Sharing the workflow</h2><p>I am developing <a href="/learn/siesta">step-by-step learning resources</a> so students and researchers can understand the methods, inspect the files and reproduce the calculations for themselves.</p><p><a href="/cv">View my CV</a> for the full education, experience and training record.</p>
  </ProfileLayout>;
}
