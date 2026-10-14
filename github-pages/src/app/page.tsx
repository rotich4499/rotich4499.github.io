import { ProfileLayout } from "@/components/profile-layout";

export default function Home() {
  return <ProfileLayout active="/">
    <section className="profile-intro">
      <img className="profile-photo" src="/images/charles-rotich-profile.jpg" alt="Charles Kipchumba Rotich" width={600} height={600} decoding="async" fetchPriority="high" />
      <div><h1>Charles Kipchumba Rotich</h1>
        <p className="profile-role">Computational physicist · Materials science researcher</p>
        <p>I use first-principles calculations to study the electronic, optical and surface properties of materials, with a focus on oxides for photocatalytic water splitting.</p>
        <p>I am an MSc Physics student and Graduate Research Assistant at <span className="profile-institution">The Technical University of Kenya</span>, currently undertaking Erasmus+ research mobility at the University of Cantabria in Santander, Spain.</p>
        <div className="profile-social"><a href="mailto:rotich4499@gmail.com">Email</a><a href="https://www.linkedin.com/in/charles-rotich-a2694422b" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/rotich4499" target="_blank" rel="noreferrer">GitHub</a><a href="/Charles_Rotich_Academic_CV.pdf" download>Download CV</a></div>
      </div>
    </section>
    <section><h2>Research interests</h2><ul><li>First-principles modelling and density functional theory.</li><li>Electronic structure of silicon in the diamond structure and benzene: band structures, density of states (DOS) and projected density of states (PDOS).</li><li>Origins of band gaps in perovskite oxides, including the roles of structural and magnetic symmetry.</li><li>Electronic and optical properties of oxides, surface science and photocatalytic water splitting.</li><li>Mechanical properties of niobium nitride and the effects of temperature and vacancy defects.</li></ul><p><a href="/research">Read about my research</a> or <a href="/projects">explore the project files</a>.</p></section>
    <section className="profile-learning-note"><h2>Learning resources</h2><p>I share the inputs, scripts and calculation steps behind my work. The first course covers SIESTA installation, silicon SCF calculations, convergence and relaxation.</p><a href="/learn/siesta">Learn SIESTA with silicon</a></section>
  </ProfileLayout>;
}
