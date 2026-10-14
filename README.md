# Charles Rotich personal website

This repository contains Charles Kipchumba Rotich’s academic website and SIESTA learning resources.

The static website is published from the **repository root**, with a matching copy in **`docs/`**. It includes separate Home, About, Research, Projects, CV, Learn and Contact pages, eight SIESTA lessons, a downloadable CV and the silicon calculation files. The bachelor’s project is presented as a summary and workflow; its full report is excluded.

## GitHub Pages hosting

The existing GitHub Pages configuration publishes from `main` and the repository root. If hosting needs to be configured again, open **Settings → Pages** and select:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/(root)`

Save the setting and wait for GitHub’s Pages deployment to finish. The site address is **https://rotich4499.github.io/**.

The `.nojekyll` marker selects the prebuilt static website. Earlier Jekyll source files remain in the repository; the previous error page and README are also retained under `github-pages/legacy/`.

## Maintain the site

The editable source and static build scripts are in [`github-pages/`](github-pages/README.md). To rebuild the published files, use Node.js 22 or newer and Python 3:

```bash
cd github-pages
npm install
npm run build
npm run check
```

Commit the updated source, generated root files and matching `docs/` files together. The build records the generated root files in `github-pages/published-files.json` so later builds can remove obsolete generated pages without deleting earlier source files. GitHub Pages serves the generated files directly; visitors do not need Node.js, Python or a server.

The companion course repository is [computational-materials-learning](https://github.com/rotich4499/computational-materials-learning). Scientific provenance and the supplied calculation settings are documented in its [source audit](https://github.com/rotich4499/computational-materials-learning/blob/main/SOURCE_AUDIT.md).
