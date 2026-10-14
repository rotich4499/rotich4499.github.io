import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.resolve(root, "../docs");
const temporary = path.join(root, ".build");
await fs.mkdir(temporary, { recursive: true });
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(path.join(output, "assets"), { recursive: true });

const stylesheet = await postcss([tailwind({ base: path.join(root, "src") })]).process(
  await fs.readFile(path.join(root, "src/app/globals.css"), "utf8"),
  { from: path.join(root, "src/app/globals.css"), to: path.join(output, "assets/site.css") },
);
const css = stylesheet.css + "\n" + await fs.readFile(path.join(root, "src/app/learn/learning.css"), "utf8");
const script = await fs.readFile(path.join(root, "scripts/browser.js"), "utf8");
const hash = value => crypto.createHash("sha256").update(value).digest("hex").slice(0, 12);
const assets = { css: "/assets/site-" + hash(css) + ".css", script: "/assets/site-" + hash(script) + ".js" };
await fs.writeFile(path.join(output, assets.css), css);
await fs.writeFile(path.join(output, assets.script), script);
await fs.cp(path.join(root, "src/public"), output, { recursive: true });

await build({
  absWorkingDir: root,
  entryPoints: ["src/render.tsx"],
  outfile: path.join(temporary, "render.cjs"),
  bundle: true,
  platform: "node",
  format: "cjs",
  jsx: "automatic",
  tsconfig: path.join(root, "tsconfig.json"),
  external: ["react", "react/*", "react-dom", "react-dom/*", "lucide-react", "radix-ui", "class-variance-authority", "clsx", "tailwind-merge"],
  loader: { ".css": "empty" },
  plugins: [{
    name: "static-navigation",
    setup(plugin) {
      plugin.onResolve({ filter: /^next\/navigation$/ }, () => ({ path: "navigation", namespace: "static-navigation" }));
      plugin.onLoad({ filter: /.*/, namespace: "static-navigation" }, () => ({ contents: "export function notFound() { throw new Error('Unknown lesson'); }", loader: "js" }));
    },
  }],
});
const require = createRequire(import.meta.url);
const { renderPages, render404 } = require(path.join(temporary, "render.cjs"));
const pages = await renderPages(assets);
for (const page of pages) {
  const filename = path.join(output, page.route, "index.html");
  await fs.mkdir(path.dirname(filename), { recursive: true });
  await fs.writeFile(filename, page.html);
}
await fs.writeFile(path.join(output, "404.html"), render404(assets));
await fs.writeFile(path.join(output, ".nojekyll"), "");
await fs.writeFile(path.join(output, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://rotich4499.github.io/sitemap.xml\n");
await fs.writeFile(path.join(output, "sitemap.xml"), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + pages.map(page => "  <url><loc>https://rotich4499.github.io" + (page.route === "/" ? "/" : page.route + "/") + "</loc></url>").join("\n") + "\n</urlset>\n");
await fs.writeFile(path.join(output, "build-manifest.json"), JSON.stringify({ origin: "https://rotich4499.github.io", routes: pages.map(({ route, title }) => ({ route, title })), assets }, null, 2) + "\n");
console.log(JSON.stringify({ staticPages: pages.length, output: "docs/", serverRequired: false }));
