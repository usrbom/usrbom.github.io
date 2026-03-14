# Repository Guide For Coding Agents

## Project overview
- Personal portfolio site built with Next.js 14 App Router, React 18, TypeScript, and Tailwind CSS.
- The site is configured for static export via `output: "export"` in [`next.config.js`](/Users/utkarshrawat/Documents/code/usrbom.github.io/next.config.js).
- Deployment targets GitHub Pages. Static output is generated into `out/`, and the repo includes a deploy script for pushing that output to `gh-pages`.
- The deploy script publishes from `out/` into a dedicated `.gh-pages-tmp/` worktree. Do not reuse `out/` itself as a git worktree.
- Follow [`WORKFLOWS.md`](/Users/utkarshrawat/Documents/code/usrbom.github.io/WORKFLOWS.md) for the standard feature intake, scratch-branch implementation, validation, and deployment process.

## Important directories
- [`app`](/Users/utkarshrawat/Documents/code/usrbom.github.io/app): App Router entrypoints, page composition, global layout, global CSS.
- [`components`](/Users/utkarshrawat/Documents/code/usrbom.github.io/components): Presentational React components for each homepage section plus analytics.
- [`public`](/Users/utkarshrawat/Documents/code/usrbom.github.io/public): Static assets such as headshot, resume PDF, `CNAME`, and `.nojekyll`.
- [`scripts`](/Users/utkarshrawat/Documents/code/usrbom.github.io/scripts): Deployment automation. Currently only [`deploy-gh-pages.sh`](/Users/utkarshrawat/Documents/code/usrbom.github.io/scripts/deploy-gh-pages.sh).
- [`out`](/Users/utkarshrawat/Documents/code/usrbom.github.io/out): Generated static export. Treat as build output.
- [`.next`](/Users/utkarshrawat/Documents/code/usrbom.github.io/.next): Next.js build cache/output. Treat as generated.
- [`.gh-pages-tmp`](/Users/utkarshrawat/Documents/code/usrbom.github.io/.gh-pages-tmp): Dedicated `gh-pages` git worktree used only during deploys. Treat as generated deployment state.

## Setup and run commands
- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Production build and static export: `npm run build`
- Run lint: `npm run lint`
- Run the GitHub Pages deploy flow: `bash scripts/deploy-gh-pages.sh`
- Deploy with a custom commit message: `bash scripts/deploy-gh-pages.sh "your message"`

## Validation commands
- Required before finishing: `npm run lint`
- Required before finishing: `npm run build`
- Direct standalone typecheck command: verify. `next build` currently performs type validation during build.

## Coding conventions inferred from the repo
- Use TypeScript and function components.
- Prefer the `@/` path alias for repo-root imports.
- Keep the homepage assembled in [`app/page.tsx`](/Users/utkarshrawat/Documents/code/usrbom.github.io/app/page.tsx) from section components in [`components`](/Users/utkarshrawat/Documents/code/usrbom.github.io/components).
- Styling is Tailwind-first, with a small amount of shared CSS in [`app/globals.css`](/Users/utkarshrawat/Documents/code/usrbom.github.io/app/globals.css).
- Reuse the existing visual tokens defined in [`tailwind.config.js`](/Users/utkarshrawat/Documents/code/usrbom.github.io/tailwind.config.js): `charcoal`, `pale-gray`, `accent`, `font-heading`, `font-body`, `shadow-soft`.
- Fonts are loaded in [`app/layout.tsx`](/Users/utkarshrawat/Documents/code/usrbom.github.io/app/layout.tsx) with `next/font/google`.
- Keep components mostly presentational and colocate simple content arrays with the section component unless there is a clear reason to extract shared data.
- Client components should be used only where browser APIs or event handlers are needed. Current example: [`components/Navbar.tsx`](/Users/utkarshrawat/Documents/code/usrbom.github.io/components/Navbar.tsx).
- For normal source commits, prefer concise summary-style commit messages that describe the change directly, for example `Update hosted resume PDF`. Let the user override the message if they want a different wording.
- For GitHub Pages deploy commits, prefer `Deploy: <summary> (<UTC timestamp>)` by default. The deploy script supports overriding this by passing a custom message argument.

## Architectural guardrails
- Preserve static-export compatibility. Do not introduce server-only features, runtime image optimization, or behavior that requires a Node server at runtime unless explicitly requested.
- Keep `next.config.js` compatible with GitHub Pages export. `output: "export"` and `images.unoptimized` are intentional.
- Keep `out/` as plain build output. Do not convert it into a git worktree or sync a worktree over it.
- The deploy path depends on `.gh-pages-tmp/.git` surviving the export sync. If you change the deploy script, preserve that file explicitly.
- Preserve static assets needed for Pages hosting, especially [`public/CNAME`](/Users/utkarshrawat/Documents/code/usrbom.github.io/public/CNAME) and [`public/.nojekyll`](/Users/utkarshrawat/Documents/code/usrbom.github.io/public/.nojekyll).
- Analytics is injected globally through [`components/GoogleAnalytics.tsx`](/Users/utkarshrawat/Documents/code/usrbom.github.io/components/GoogleAnalytics.tsx) and `NEXT_PUBLIC_GA_ID`; avoid breaking the env override path.
- Favor simple static content and client-light interactions. This repo is a single-page portfolio, not a full app shell.

## Avoid editing unless explicitly asked
- [`.next`](/Users/utkarshrawat/Documents/code/usrbom.github.io/.next)
- [`out`](/Users/utkarshrawat/Documents/code/usrbom.github.io/out)
- [`node_modules`](/Users/utkarshrawat/Documents/code/usrbom.github.io/node_modules)
- [`.gh-pages-tmp`](/Users/utkarshrawat/Documents/code/usrbom.github.io/.gh-pages-tmp)
- Deployment/domain files in [`public`](/Users/utkarshrawat/Documents/code/usrbom.github.io/public) such as `CNAME` and `.nojekyll`, unless the task is explicitly about hosting or domain setup
- [`scripts/deploy-gh-pages.sh`](/Users/utkarshrawat/Documents/code/usrbom.github.io/scripts/deploy-gh-pages.sh), unless the task is explicitly about deployment

## Common workflows
- Content/layout update: edit the relevant file under [`components`](/Users/utkarshrawat/Documents/code/usrbom.github.io/components) and keep section anchors in sync with [`app/page.tsx`](/Users/utkarshrawat/Documents/code/usrbom.github.io/app/page.tsx) and [`components/Navbar.tsx`](/Users/utkarshrawat/Documents/code/usrbom.github.io/components/Navbar.tsx).
- Visual/theme update: prefer Tailwind token changes in [`tailwind.config.js`](/Users/utkarshrawat/Documents/code/usrbom.github.io/tailwind.config.js) and shared CSS changes in [`app/globals.css`](/Users/utkarshrawat/Documents/code/usrbom.github.io/app/globals.css).
- Asset update: place files in [`public`](/Users/utkarshrawat/Documents/code/usrbom.github.io/public) and reference them with root-relative paths.
- Release/deploy: run `npm run build`, then `bash scripts/deploy-gh-pages.sh`.

## Deploy pitfalls to remember
- If a deploy ever appears to commit on `main` instead of `gh-pages`, stop immediately and inspect whether `.gh-pages-tmp/.git` still exists.
- If `npm run lint` or `npm run build` fails with `next: command not found`, dependencies are not installed in the current checkout. Run `npm install` before continuing.
- A clean successful deploy should create a commit on `gh-pages`, not on `main`.

## Done criteria
- Changes preserve static export behavior.
- `npm run lint` passes.
- `npm run build` passes.
- New UI work remains consistent with the site’s existing typography, palette, spacing, and section-based homepage structure.
- Generated artifacts are not manually edited unless the task explicitly requires deployment output changes.
