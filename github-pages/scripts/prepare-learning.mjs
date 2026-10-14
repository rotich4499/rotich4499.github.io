import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import MarkdownIt from "markdown-it";

const root = process.cwd();
const source = path.join(root, "learning-source");
const publicRoot = path.join(root, "src/public/learning/downloads");
const publicFiles = path.join(publicRoot, "files");
const catalogue = JSON.parse(await fs.readFile(path.join(source, "course.json"), "utf8"));
const lessonSlugs = new Set(catalogue.lessons.map(x => x.slug));
const markdown = new MarkdownIt({ html: false, linkify: false });

async function rewriteLinks(tokens, filename) {
  for (const token of tokens) {
    for (const attribute of ["href", "src"]) {
      const value = token.attrGet(attribute);
      if (!value || /^(?:https?:|mailto:|#)/i.test(value)) continue;
      const [urlPath, anchor] = value.split("#");
      const fullPath = path.resolve(path.dirname(filename), urlPath);
      const relative = path.relative(source, fullPath).replaceAll(path.sep, "/");
      if (relative.startsWith("../")) throw new Error("Course link outside source: " + value);
      await fs.access(fullPath);
      const slug = path.basename(relative, ".md");
      const destination = relative.startsWith("docs/") && lessonSlugs.has(slug)
        ? `/learn/siesta/${slug}` : `/learning/downloads/files/${relative}`;
      token.attrSet(attribute, destination + (anchor ? "#" + anchor : ""));
    }
    if (token.children) await rewriteLinks(token.children, filename);
  }
}

const compiled = [];
for (const lesson of catalogue.lessons) {
  const filename = path.join(source, "docs", lesson.slug + ".md");
  const contents = await fs.readFile(filename, "utf8");
  const tokens = markdown.parse(contents, {});
  if (tokens[0]?.type === "heading_open" && tokens[0].tag === "h1") tokens.splice(0, 3);
  const headings = [];
  const usedIds = new Set();
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== "heading_open") continue;
    const title = tokens[i + 1]?.content ?? "Section";
    const base = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    let id = base;
    let number = 2;
    while (usedIds.has(id)) id = base + "-" + number++;
    usedIds.add(id);
    tokens[i].attrSet("id", id);
    if (tokens[i].tag === "h2") headings.push({ title, id });
  }
  await rewriteLinks(tokens, filename);
  const blocks = [];
  let prose = [];
  const flush = () => {
    if (prose.length) blocks.push({ kind: "html", html: markdown.renderer.render(prose, markdown.options, {}) });
    prose = [];
  };
  for (const token of tokens) {
    if (token.type === "fence") {
      flush();
      blocks.push({ kind: "code", code: token.content.trimEnd(), language: token.info.trim() || "text" });
    } else prose.push(token);
  }
  flush();
  compiled.push({ ...lesson, headings, blocks, readingMinutes: Math.max(3, Math.ceil(contents.split(/\s+/).length / 180)) });
}
await fs.mkdir(path.join(root, "src/lib/learning"), { recursive: true });
await fs.writeFile(path.join(root, "src/lib/learning/course.json"), JSON.stringify({ ...catalogue, lessons: compiled }, null, 2) + "\n");
await fs.mkdir(publicRoot, { recursive: true });
await fs.cp(source, publicFiles, { recursive: true, force: true, filter: p => !/[\\/](__pycache__|runs|\.venv)([\\/]|$)/.test(p) });
const entries = [];
async function catalogueFiles(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (["__pycache__", "runs", ".venv"].includes(entry.name) || entry.name.endsWith(".pyc")) continue;
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await catalogueFiles(filename);
    else {
      const bytes = await fs.readFile(filename);
      entries.push({ path: path.relative(source, filename).replaceAll(path.sep, "/"), bytes: bytes.length, sha256: crypto.createHash("sha256").update(bytes).digest("hex") });
    }
  }
}
await catalogueFiles(source);
await fs.writeFile(path.join(publicRoot, "manifest.json"), JSON.stringify({ updated: catalogue.updated, files: entries }, null, 2) + "\n");
execFileSync("python3", ["-c", `import pathlib, zipfile
root=pathlib.Path('learning-source')
with zipfile.ZipFile('src/public/learning/downloads/computational-materials-learning.zip','w',zipfile.ZIP_DEFLATED) as archive:
    for p in sorted(root.rglob('*')):
        if p.is_file() and not any(part in ('__pycache__','runs','.venv') for part in p.relative_to(root).parts):
            archive.write(p,'computational-materials-learning/'+str(p.relative_to(root)))
`], { cwd: root });
console.log(JSON.stringify({ lessons: compiled.length, downloadableFiles: entries.length, archive: "computational-materials-learning.zip" }));
