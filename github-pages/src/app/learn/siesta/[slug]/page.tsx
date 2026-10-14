import type { Metadata } from "next";
import { notFound } from "next/navigation";
import course from "@/lib/learning/course.json";
import { CourseNav } from "@/components/learning/course-nav";
import { LessonBody } from "@/components/learning/lesson-body";

export function generateStaticParams() { return course.lessons.map(lesson=>({ slug:lesson.slug })); }

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const {slug}=await params;
  const lesson=course.lessons.find(x=>x.slug===slug);
  return { title: lesson?.title ?? "Lesson not found", description: lesson?.summary };
}

export default async function LessonPage({ params }: { params: Promise<{slug:string}> }) {
  const {slug}=await params;
  const index=course.lessons.findIndex(x=>x.slug===slug);
  if(index<0) notFound();
  const lesson=course.lessons[index];
  const previous=course.lessons[index-1], next=course.lessons[index+1];
  return <main className="course-shell">
    <CourseNav active={slug}/>
    <article id="lesson-main" className="lesson-article">
      <div className="course-breadcrumb"><a href="/learn/siesta">Learn SIESTA</a><span>/</span><span>Lesson {index+1} of {course.lessons.length}</span></div>
      <header className="lesson-header"><p className="course-small-label">{lesson.category} · {lesson.readingMinutes} min read</p><h1>{lesson.title}</h1><p>{lesson.summary}</p><a href={`/learning/downloads/files/docs/${slug}.md`} download>Download this lesson as Markdown</a></header>
      <LessonBody blocks={lesson.blocks}/>
      <nav className="lesson-pager" aria-label="Adjacent lessons">{previous ? <a href={`/learn/siesta/${previous.slug}`}><span>Previous lesson</span><strong>{previous.title}</strong></a> : <a href="/learn/siesta"><span>Course overview</span><strong>Return to the learning path</strong></a>}{next ? <a href={`/learn/siesta/${next.slug}`}><span>Next lesson</span><strong>{next.title}</strong></a> : <a href="/learn/siesta/downloads"><span>Keep exploring</span><strong>Files & downloads</strong></a>}</nav>
    </article>
    <aside className="lesson-toc"><p className="course-small-label">On this page</p><nav aria-label="Sections in this lesson">{lesson.headings.map(heading=><a key={heading.id} href={`#${heading.id}`}>{heading.title}</a>)}</nav></aside>
  </main>;
}
