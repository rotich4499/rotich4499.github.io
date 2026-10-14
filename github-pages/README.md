# Building the GitHub Pages website

This project generates static HTML, CSS and JavaScript for the academic website. The output folder is `../docs/`, which GitHub Pages can publish directly.

## Requirements

- Node.js 22.13 or newer and npm.
- Python 3, using only its standard library for ZIP creation and validation.

```bash
npm install
npm run build
npm run check
```

`npm run build` compiles the Markdown lessons and download package, renders all personal and learning pages, and writes the static assets, custom error page, sitemap and `.nojekyll` marker.

`npm run check` checks every page and local link, lesson section links, file and ZIP checksums, the CV download, the code-copy interaction, and exclusion of the full bachelor’s report.

## Editing

- Personal pages: `src/app/`.
- Shared navigation and layout: `src/components/profile-layout.tsx`.
- Learning layout and styles: `src/app/learn/`.
- Lesson Markdown and calculation files: `learning-source/`.
- Photo, favicon and CV: `src/public/`.
- Static browser interactions: `scripts/browser.js`.

The canonical learning repository is [computational-materials-learning](https://github.com/rotich4499/computational-materials-learning). Keep this project’s `learning-source/` copy aligned with it when lessons or scientific files change. Generated lesson JSON and download folders are rebuilt from that source.

Build and check after editing, then commit the source and `../docs/` output together. Keep the bachelor’s report excluded from both source assets and published files.
