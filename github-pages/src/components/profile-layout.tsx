import type { ReactNode } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV" },
  { href: "/learn/siesta", label: "Learn" },
  { href: "/contact", label: "Contact" },
];

export function ProfileLayout({ active, children }: { active: string; children: ReactNode }) {
  return <div className="profile-site">
    <a className="profile-skip" href="#profile-content">Skip to content</a>
    <header className="profile-header"><div className="profile-header-inner">
      <a className="profile-name" href="/">Charles Rotich</a>
      <nav aria-label="Main navigation">{links.map(link => <a key={link.href} href={link.href} aria-current={active === link.href ? "page" : undefined}>{link.label}</a>)}</nav>
    </div></header>
    <main id="profile-content" className="profile-content">{children}</main>
    <footer className="profile-footer"><div><span>© 2026 Charles Kipchumba Rotich</span><a href="mailto:rotich4499@gmail.com">rotich4499@gmail.com</a></div></footer>
  </div>;
}
