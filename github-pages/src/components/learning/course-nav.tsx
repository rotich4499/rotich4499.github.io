import course from "@/lib/learning/course.json";

export function CourseNav({ active }: { active?: string }) {
  const links = <nav aria-label="SIESTA course lessons">{course.lessons.map((lesson, index) =>
    <a key={lesson.slug} href={`/learn/siesta/${lesson.slug}`} className={active === lesson.slug ? "course-nav-link current" : "course-nav-link"} aria-current={active === lesson.slug ? "page" : undefined}>
      <span>{String(index + 1).padStart(2, "0")}</span><strong>{lesson.title}</strong>
    </a>
  )}<a className={active === "downloads" ? "course-nav-link current" : "course-nav-link"} href="/learn/siesta/downloads" aria-current={active === "downloads" ? "page" : undefined}><span>↓</span><strong>Files & downloads</strong></a><a className="course-nav-link" href={course.repository} target="_blank" rel="noreferrer"><span>↗</span><strong>Course on GitHub</strong></a></nav>;
  return <>
    <aside className="course-sidebar"><p className="course-small-label">In this course</p>{links}<p className="course-sidebar-note">One material. Complete inputs. Results you can inspect.</p></aside>
    <details className="course-mobile-nav"><summary>Browse course lessons</summary>{links}</details>
  </>;
}
