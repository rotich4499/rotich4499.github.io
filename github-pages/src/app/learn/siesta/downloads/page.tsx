import type { Metadata } from "next";
import { Download, FileText, FolderOpen } from "lucide-react";
import { CourseNav } from "@/components/learning/course-nav";
import course from "@/lib/learning/course.json";

export const metadata: Metadata = { title: "Files & downloads" };
const base="/learning/downloads/files/";
const groups=[
  {title:"Inputs & pseudopotential",items:[
    ["Silicon SCF input","examples/silicon-diamond/scf/si_scf.fdf","FDF"],
    ["Silicon variable-cell relaxation input","examples/silicon-diamond/relaxation/si_relax.fdf","FDF"],
    ["PBEsol Si pseudopotential","examples/silicon-diamond/pseudopotentials/Si.psml","PSML"],
  ]},
  {title:"Complete reference outputs",items:[
    ["Author's completed SCF run","reference/silicon-diamond/scf_si/si_scf.out","OUT"],
    ["Author's completed relaxation run","reference/silicon-diamond/relax_si/si_relax.out","OUT"],
    ["Author's software and pseudopotential note","reference/silicon-diamond/note.md","MD"],
  ]},
  {title:"Convergence data & figures",items:[
    ["Mesh-cutoff data","reference/silicon-diamond/convergence/mesh-cutoff/mesh_convergence.dat","DAT"],
    ["Mesh-cutoff figure","reference/silicon-diamond/convergence/mesh-cutoff/Si_meshcutoff_convergence.png","PNG"],
    ["k-point data","reference/silicon-diamond/convergence/kpoints/kpoint_convergence.dat","DAT"],
    ["k-point figure","reference/silicon-diamond/convergence/kpoints/Si_kpoint_convergence.png","PNG"],
    ["Lattice-scan data","reference/silicon-diamond/convergence/lattice/lattice_scan.dat","DAT"],
    ["Lattice figure","reference/silicon-diamond/convergence/lattice/Si_lattice_optimization.png","PNG"],
  ]},
  {title:"Teaching utilities & documentation",items:[
    ["Fresh-directory calculation launcher","scripts/run_calculation.sh","BASH"],
    ["Convergence launcher","scripts/run_convergence.py","PY"],
    ["Output reader with Doxygen comments","scripts/read_results.py","PY"],
    ["Doxygen configuration","doxygen/Doxyfile","CONFIG"],
    ["Original Ubuntu installation guide","source-guides/SIESTA_5.4.2_UBUNTU26_SYSTEM_LIBS_GUIDE.md","MD"],
    ["Source review & reproducibility notes","SOURCE_AUDIT.md","MD"],
  ]},
];

export default function Downloads() {
  return <main className="course-shell downloads-shell"><CourseNav active="downloads"/><article className="lesson-article" id="lesson-main">
    <div className="course-breadcrumb"><a href="/learn/siesta">Learn SIESTA</a><span>/</span><span>Files & downloads</span></div>
    <header className="lesson-header"><p className="course-small-label">Run it yourself</p><h1>The files behind<br />the lessons.</h1><p>Complete inputs, author-supplied outputs, scan data, plots and portable launchers. Everything is also included in one course package.</p></header>
    <div className="course-download-bundle"><FolderOpen size={34}/><div><h2>Complete silicon course</h2><p>Includes all eight Markdown lessons, original evidence and the Doxygen starting configuration.</p><a className="learning-primary" href="/learning/downloads/computational-materials-learning.zip" download><Download size={17}/> Download course ZIP</a></div></div>
    {groups.map(group=><section className="download-group" key={group.title}><h2>{group.title}</h2>{group.items.map(([label,file,type])=><a className="download-row" href={base+file} download key={file}><FileText size={18}/><span>{label}</span><small>{type}</small><Download size={17}/></a>)}</section>)}
    <section className="download-note"><h2>Provenance before comparison</h2><p>The Si PSML file has SHA-256 <code>fa0e9fa6ca7a97ab07879cd1bc8d858ebb32a90f262535b578d14d4d515bdc95</code>. The recorded executable banner differs from the release label in the author's note. Read the source audit before treating these files as an exact build recipe.</p><a href="/learning/downloads/manifest.json" download>Download the file checksums</a></section>
    <section className="download-note github-note"><h2>Continue on GitHub</h2><p>Browse the editable lessons, clone the calculation files, follow changes or fork the repository for your own study. The course ZIP remains available for offline use.</p><a href={course.repository} target="_blank" rel="noreferrer">Open the course repository on GitHub</a></section>
  </article></main>;
}
