# DEPLOYMENT — GitHub Pages & Cloudflare Pages

The site is fully static: `src/` is committed and needs **no build step** at deploy time. All references are relative, so it works at a domain root, a project subpath, or from `file://`.

## Option A — GitHub Pages (workflow included)

`.github/workflows/deploy-pages.yml` is already in this repository:

1. Push to `main` (or run the workflow manually via *Actions → Deploy site to GitHub Pages → Run workflow*).
2. In the repository settings, set **Settings → Pages → Build and deployment → Source = GitHub Actions** (one-time).
3. The workflow uploads `src/` as the Pages artifact and deploys it. Every subsequent push redeploys automatically.

No other configuration is required. The workflow uses the official `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4` chain with least-privilege permissions (`pages: write`, `id-token: write`).

## Option B — Cloudflare Pages

`wrangler.toml` at the repository root already declares:

```toml
name = "pyp-marble-courses"
pages_build_output_dir = "src"
```

Two ways to connect:

- **Git integration (recommended)**: Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → select this repo. Build command: **leave empty**; build output directory: `src`. Cloudflare reads `wrangler.toml` for the output dir. Every push to `main` redeploys.
- **Direct upload**: `npx wrangler pages deploy src` (after `npx wrangler login`).

## Local preview

```bash
npm run serve:site        # http://localhost:4173
# or simply open src/index.html in a browser — file:// works too
```

## Regenerating after content changes

```bash
# edit tools/lib/mapping.mjs (gameplay content) or templates
npm run build:site        # regenerates src/index.html, src/courses/*, src/data/courses.js
```

Never hand-edit files under `src/courses/` or `src/index.html` — they are generated artifacts.

## Licensing shipped with the site

| Asset | License | Where |
| --- | --- | --- |
| Course data (topics, clusters, research digests) | ODbL-1.0 / CC-BY-SA-4.0 | Footer of every page; `manifest.json` |
| Baloo 2 variable font | SIL OFL 1.1 | `src/assets/fonts/OFL.txt` |
| three.js (bundled locally, 3D pages) | MIT | `src/assets/vendor/LICENSE-three.txt` |
