import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { metadata as siteMetadata } from "./app/layout";
import LearnLayout, { metadata as learningMetadata } from "./app/learn/layout";
import { ProfileLayout } from "./components/profile-layout";
import * as Home from "./app/page";
import * as About from "./app/about/page";
import * as Research from "./app/research/page";
import * as Projects from "./app/projects/page";
import * as NiobiumNitride from "./app/projects/niobium-nitride/page";
import * as MechanicalWorkflows from "./app/projects/aiida-mechanical-workflows/page";
import * as Silicon from "./app/projects/silicon/page";
import * as Diamond from "./app/projects/diamond/page";
import * as Benzene from "./app/projects/benzene/page";
import * as CV from "./app/cv/page";
import * as Contact from "./app/contact/page";
import * as CourseHome from "./app/learn/siesta/page";
import * as Downloads from "./app/learn/siesta/downloads/page";
import * as Lesson from "./app/learn/siesta/[slug]/page";
import course from "./lib/learning/course.json";

const origin = "https://rotich4499.github.io";
type Assets = { css: string; script: string };

function documentHTML(content: React.ReactNode, route: string, title: string, description: string, assets: Assets, missing = false) {
  const canonical = origin + (route === "/" ? "/" : route + "/");
  return "<!doctype html>\n" + renderToStaticMarkup(<html lang="en"><head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href={assets.css} />
    {missing ? <meta name="robots" content="noindex,follow" /> : <link rel="canonical" href={canonical} />}
  </head><body>{content}<script src={assets.script} defer></script></body></html>) + "\n";
}

export async function renderPages(assets: Assets) {
  const routes = [
    { route: "/", module: Home },
    { route: "/about", module: About },
    { route: "/research", module: Research },
    { route: "/projects", module: Projects },
    { route: "/projects/niobium-nitride", module: NiobiumNitride },
    { route: "/projects/aiida-mechanical-workflows", module: MechanicalWorkflows },
    { route: "/projects/silicon", module: Silicon },
    { route: "/projects/diamond", module: Diamond },
    { route: "/projects/benzene", module: Benzene },
    { route: "/cv", module: CV },
    { route: "/contact", module: Contact },
    { route: "/learn/siesta", module: CourseHome },
    { route: "/learn/siesta/downloads", module: Downloads },
    ...course.lessons.map(lesson => ({ route: "/learn/siesta/" + lesson.slug, module: Lesson, slug: lesson.slug })),
  ];
  const pages = [];
  for (const entry of routes) {
    const module = entry.module as any;
    const props = { params: Promise.resolve({ slug: (entry as any).slug }) };
    const metadata = module.generateMetadata ? await module.generateMetadata(props) : module.metadata ?? {};
    const learning = entry.route.startsWith("/learn/");
    const baseTitle = metadata.title ?? siteMetadata.title;
    const title = learning ? String(baseTitle) + " | Learn SIESTA · Charles Rotich" : String(baseTitle);
    const description = String(metadata.description ?? (learning ? learningMetadata.description : siteMetadata.description));
    const page = await module.default(props);
    const content = learning ? <LearnLayout>{page}</LearnLayout> : page;
    pages.push({ route: entry.route, title, description, html: documentHTML(content, entry.route, title, description, assets) });
  }
  return pages;
}

export function render404(assets: Assets) {
  const content = <ProfileLayout active=""><h1>Page not found</h1><p>The page you requested is unavailable.</p><p><a href="/">Return to the homepage</a> or <a href="/learn/siesta/">open the SIESTA course</a>.</p></ProfileLayout>;
  return documentHTML(content, "/404.html", "Page not found | Charles Rotich", "This page is unavailable.", assets, true);
}
