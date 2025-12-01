# Utkarsh Rawat — Personal Site

Next.js (App Router) + Tailwind, built for static export and hosted on GitHub Pages.

## Getting started
1. Install deps: `npm install`
2. Run dev server: `npm run dev` (localhost:3000)
3. Static export: `npm run build` (outputs to `out/` because `output: "export"` is set)

## Deploying to GitHub Pages
- This repo keeps source on `main` and serves `out/` from `gh-pages`.
- The `CNAME` file lives in `public/` so it is included in the export.

### One-line deploy (recommended)
```bash
bash scripts/deploy-gh-pages.sh
```
- Optional commit message: `bash scripts/deploy-gh-pages.sh "Deploy message"`
- Script does: `npm run build` (static export via `output: "export"`), ensures an `out/` worktree on `gh-pages`, commits, and pushes. Remove the worktree later with `git worktree remove out`.


## Tech
- Next.js 14 (App Router) with `output: "export"` and `images.unoptimized` for static builds.
- Tailwind CSS with Space Grotesk (headings) and Inter (body) plus a tech-minimal palette.
