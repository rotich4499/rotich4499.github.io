# Charles Rotich personal website

This repository contains Charles Kipchumba Rotich’s academic website and SIESTA learning resources.

The new static website is ready in **`docs/`**. It includes separate Home, About, Research, Projects, CV, Learn and Contact pages, eight SIESTA lessons, a downloadable CV and the silicon calculation files. The bachelor’s project is presented as a summary and workflow; its full report is excluded.

## Enable GitHub Pages

In this repository, open **Settings → Pages** and select:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/docs`

Save the setting and wait for GitHub’s Pages deployment to finish. The site address is **https://rotich4499.github.io/**.

The earlier Jekyll files remain in the repository root. Publishing from `/docs` selects the new website.

## Maintain the site

The editable source and static build scripts are in [`github-pages/`](github-pages/README.md). To rebuild the published files, use Node.js 22 or newer and Python 3:

```bash
cd github-pages
npm install
npm run build
npm run check
```

Commit the updated source and generated `docs/` files together. GitHub Pages serves the generated files directly; visitors do not need Node.js, Python or a server.

The companion course repository is [computational-materials-learning](https://github.com/rotich4499/computational-materials-learning). Scientific provenance and the supplied calculation settings are documented in its [source audit](https://github.com/rotich4499/computational-materials-learning/blob/main/SOURCE_AUDIT.md).
