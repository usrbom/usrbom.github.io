# Utkarsh Rawat — Personal Site

Next.js (App Router) + Tailwind, built for static export and hosted on GitHub Pages.

## Getting started
1. Install deps: `npm install`
2. Run dev server: `npm run dev` (localhost:3000)
3. Static export: `npm run build` (outputs to `out/` because `output: "export"` is set)

## Deploying to GitHub Pages
- This repo keeps source on `main` and publishes static output to `gh-pages`.
- `out/` is build output only.
- `.gh-pages-tmp/` is the dedicated local git worktree used for `gh-pages` deploys.
- The `CNAME` file lives in `public/` so it is included in the export.

### Release checklist
1. Finish feature work on a `scratch/<feature-name>` branch.
2. Review locally with `npm run dev`.
3. Merge the approved scratch branch into `main`.
4. Switch to `main`.
5. Run `bash scripts/validate-release.sh`.
6. Deploy with `bash scripts/deploy-gh-pages.sh`.

### One-line deploy (recommended)
```bash
bash scripts/deploy-gh-pages.sh
```
- Optional commit message: `bash scripts/deploy-gh-pages.sh "Deploy message"`
- Script does: runs `bash scripts/validate-release.sh` from `main`, ensures a `.gh-pages-tmp/` worktree on `gh-pages`, syncs the static export from `out/`, commits, and pushes. Remove the worktree later with `git worktree remove .gh-pages-tmp`.

### Deploy notes
- Do not turn `out/` into a git worktree. It must remain plain build output.
- The deploy script must preserve `.gh-pages-tmp/.git` during sync. Deleting that file causes git commands to fall back to the parent `main` repo.
- If `npm run lint` fails with `next: command not found`, reinstall dependencies with `npm install` before deploying.


## Tech
- Next.js 14 (App Router) with `output: "export"` and `images.unoptimized` for static builds.
- Tailwind CSS with Space Grotesk (headings) and Inter (body) plus a tech-minimal palette.
- Google Analytics via the global site tag; override the default property by setting `NEXT_PUBLIC_GA_ID`.
