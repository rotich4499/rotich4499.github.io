import type { ReactNode } from "react";
import sources from "@/public/presentations/source-manifest.json";

export function ResearchFigure({ name, alt, children }: { name: string; alt: string; children: ReactNode }) {
  const figure = sources.figures.find(figure => figure.path.endsWith("/" + name + ".png"));
  if (!figure) throw new Error("Unknown research figure: " + name);
  return <figure className="profile-research-figure">
    <a href={figure.path} target="_blank" rel="noreferrer"><img src={figure.path} alt={alt} width={figure.width} height={figure.height} loading="lazy" decoding="async" /></a>
    <figcaption>{children}<span className="profile-figure-source">Source: <a href={figure.presentation + "#page=" + figure.page} target="_blank" rel="noreferrer">presentation, slide {figure.page}</a>. <a href={figure.path} target="_blank" rel="noreferrer">Open full-size figure</a>.</span></figcaption>
  </figure>;
}

export function EvidenceTable({ label, children }: { label: string; children: ReactNode }) {
  return <div className="profile-table-scroll" role="region" aria-label={label} tabIndex={0}>{children}</div>;
}

export function GapDefinitions({ molecular = false, electrons }: { molecular?: boolean; electrons: number }) {
  return <section aria-labelledby="gap-definitions">
    <h2 id="gap-definitions">What the three gaps measure</h2>
    <dl className="profile-gap-definitions">
      <div><dt>Kohn–Sham gap</dt><dd>{molecular ? "The difference between the neutral molecule’s lowest unoccupied and highest occupied orbital energies." : "The difference between the conduction-band minimum and valence-band maximum of the neutral cell."}<p className="profile-equation">E<sub>g</sub><sup>KS</sup> = {molecular ? <>ε<sub>LUMO</sub> − ε<sub>HOMO</sub></> : <>E<sub>CBM</sub> − E<sub>VBM</sub></>}</p></dd></div>
      <div><dt>Finite-step derivative estimate</dt><dd>The difference between average energy slopes on either side of the neutral electron count. Reducing δ probes a smaller charge interval.<p className="profile-equation">G(δ) = [E(N + δ) − 2E(N) + E(N − δ)] / δ</p></dd></div>
      <div><dt>Integer ΔSCF gap</dt><dd>The total-energy difference for adding and removing a whole electron. It is the δ = 1 case of the finite-step expression.<p className="profile-equation">G(1) = E(N − 1) − 2E(N) + E(N + 1)</p></dd></div>
    </dl>
    <p className="profile-small-note">Here N = {electrons} is the neutral valence-electron count in the reference {molecular ? "molecule" : "primitive cell"}, and δ is a charge step in electrons. The derivative gap in the zero-step limit and an estimate at a finite δ are distinct quantities.</p>
  </section>;
}

export function ElectronicProjects({ active }: { active: string }) {
  const links = [{ href: "/projects/silicon", label: "Silicon" }, { href: "/projects/diamond", label: "Diamond" }, { href: "/projects/benzene", label: "Benzene" }];
  return <nav className="profile-social" aria-label="Electronic-structure projects">{links.filter(link => link.href !== active).map(link => <a key={link.href} href={link.href}>{link.label} study</a>)}</nav>;
}
