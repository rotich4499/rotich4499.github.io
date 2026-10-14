import type { Metadata } from "next";
import { BookOpen, Terminal, Download, Atom } from "lucide-react";
import course from "@/lib/learning/course.json";

export const metadata: Metadata = { title: "Learn SIESTA with silicon" };

export default function CourseHome() {
  return <main id="lesson-main" className="course-home">
    <div className="course-breadcrumb"><a href="/">Charles Rotich</a><span>/</span><span>Learning lab</span></div>
    <section className="course-intro">
      <div className="course-intro-copy"><p className="course-small-label">An open computational materials course</p>
        <h1>From installation<br />to your <em>first calculation.</em></h1>
        <p>Learn SIESTA through silicon diamond: build the code, understand an input, run SCF, test convergence, and check a relaxed structure.</p>
        <div className="course-actions"><a className="learning-primary" href="/learn/siesta/start-here"><BookOpen size={18} /> Start the course</a><a className="learning-secondary" href="/learn/siesta/downloads"><Download size={18} /> Get the files</a><a className="learning-secondary" href={course.repository} target="_blank" rel="noreferrer">View on GitHub</a></div>
        <p className="course-author">By Charles Kipchumba Rotich · Updated {course.updated}</p>
      </div>
      <div className="course-sample"><div className="course-sample-bar"><Terminal size={17} /><span>Silicon · PBEsol · DZP</span></div>
        <div className="course-sample-input"><p><span>NumberOfAtoms</span> 2</p><p><span>MeshCutoff</span> 200 Ry</p><p><span>k-grid</span> 10 × 10 × 10</p><p><span>LatticeConstant</span> 2.72105 Ang</p></div>
        <div className="course-sample-result"><p>Author-supplied SCF result</p><strong>−230.042602 <small>eV / cell</small></strong><span>18 SCF iterations · Two-atom primitive cell</span></div>
        <a href="/learn/siesta/first-scf">Learn what this output means</a>
      </div>
    </section>
    <div className="course-facts"><span><BookOpen size={17} /> 8 connected lessons</span><span><Atom size={17} /> Silicon diamond</span><span><Terminal size={17} /> Linux & MPI</span><span><Download size={17} /> Inputs, data & scripts</span></div>
    <section className="course-lessons"><div className="course-section-heading"><div><p className="course-small-label">Your learning path</p><h2>Build. Calculate. Understand.</h2></div><p>Follow the sequence, or open the step you need.</p></div>
      <div className="course-lesson-grid">{course.lessons.map((lesson,index)=>
        <a href={`/learn/siesta/${lesson.slug}`} className="course-lesson-card" key={lesson.slug}><div><span className="course-lesson-number">{String(index+1).padStart(2,"0")}</span><span>{lesson.category} · {lesson.readingMinutes} min read</span></div><h3>{lesson.title}</h3><p>{lesson.summary}</p><span className="course-open-label">Open lesson</span></a>
      )}</div>
    </section>
    <section className="course-evidence"><div><p className="course-small-label">Learn from real evidence</p><h2>Every result has<br />a file behind it.</h2><p>Inspect the original runs, follow the calculation choices, and download the complete course for your own workstation.</p></div>
      <div><h3>What the archive contains</h3><ul><li>Complete SCF and variable-cell relaxation outputs</li><li>Mesh, k-point and lattice scan data with figures</li><li>Matching PBEsol Si pseudopotential</li><li>Original scripts and portable teaching utilities</li></ul><a href="/learn/siesta/downloads">Browse the reference files</a></div>
    </section>
    <p className="course-provenance">The author's note identifies SIESTA 5.4.2. The supplied outputs report “unreleased e486d1206 (2025-12-16)”. Reference data were inspected; numerical runs and the installation have not been repeated here. <a href="/learning/downloads/files/SOURCE_AUDIT.md">Read the source audit.</a></p>
  </main>;
}
