import type { Metadata } from "next";
import "./learning.css";

export const metadata: Metadata = {
  title: { default: "Learn computational materials science | Charles Rotich", template: "%s | Learn SIESTA · Charles Rotich" },
  description: "Step-by-step installation, SCF, convergence and relaxation lessons using Charles Rotich's silicon-diamond inputs and results.",
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <div className="learning-site">
    <a className="learning-skip" href="#lesson-main">Skip to learning content</a>
    <header className="learning-header"><a className="brand" href="/"><span className="brand-mark">CR</span><span>Charles Rotich</span></a>
      <nav aria-label="Website navigation"><a href="/">Profile</a><a href="/learn/siesta" aria-current="location">Learn SIESTA</a><a href="/learn/siesta/downloads">Downloads</a></nav>
      <span className="learning-review">Phase 1 · Review edition</span>
    </header>
    {children}
    <footer className="learning-footer"><a href="/">Charles Kipchumba Rotich</a><p>Computational materials science · Learning through reproducible examples</p><a href="mailto:rotich4499@gmail.com">Contact</a></footer>
  </div>;
}
