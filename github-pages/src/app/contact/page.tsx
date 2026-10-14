import type { Metadata } from "next";
import { ProfileLayout } from "@/components/profile-layout";

export const metadata: Metadata = { title: "Contact | Charles Rotich", description: "Contact Charles Rotich about computational materials science, scientific computing and research collaboration." };

export default function Contact() {
  return <ProfileLayout active="/contact"><h1>Contact</h1><p>I welcome conversations about computational materials science, photocatalysis, scientific computing and learning resources.</p>
    <dl className="profile-description-list"><div><dt>Email</dt><dd><a href="mailto:rotich4499@gmail.com">rotich4499@gmail.com</a></dd></div><div><dt>LinkedIn</dt><dd><a href="https://www.linkedin.com/in/charles-rotich-a2694422b" target="_blank" rel="noreferrer">Charles Rotich</a></dd></div><div><dt>GitHub</dt><dd><a href="https://github.com/rotich4499" target="_blank" rel="noreferrer">rotich4499</a></dd></div><div><dt>Affiliation</dt><dd>The Technical University of Kenya<br />Erasmus+ research mobility at the University of Cantabria</dd></div></dl>
    <p>Currently based in Santander, Spain.</p>
  </ProfileLayout>;
}
