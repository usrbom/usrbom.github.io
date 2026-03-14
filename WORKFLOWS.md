# Agent Workflows

Use this file as the operating procedure for planned feature work and production deploys.

## Standard branch model
- `main`: source of truth for approved production code.
- `scratch/<feature-name>`: implementation branches for active feature work.
- `gh-pages`: generated static site branch used for GitHub Pages deployment.

## Trigger phrases and expected behavior

### `Plan feature: <summary>`
The agent should not code yet. It should ask the user the feature intake questions below, then produce a concrete plan using the template in [`PLANS.md`](/Users/utkarshrawat/Documents/code/usrbom.github.io/PLANS.md).

Feature intake questions:
- What user-facing outcome do you want?
- Which page, section, or component should change?
- Is this a new section, a content update, a visual refresh, or a behavior change?
- Do you already have copy, assets, links, or screenshots?
- What are the acceptance criteria?
- Are there constraints for mobile, accessibility, SEO, performance, or analytics?
- What is explicitly out of scope?

### `Implement planned feature: <summary>`
The agent should:
1. Confirm there is an agreed feature plan.
2. Create or switch to `scratch/<feature-name>` using `bash scripts/start-feature.sh "<feature name>"`.
3. Implement the work on that scratch branch.
4. Run `npm run lint` and `npm run build`.
5. Use a concise default commit message that summarizes the change if a commit is requested, unless the user supplies their own wording.
6. Summarize what changed, what to test locally, and any open risks.

### `Revise current feature`
The agent should continue on the active `scratch/<feature-name>` branch, preserve the agreed scope unless told otherwise, and rerun validation before handing work back.

### `Deploy main to GitHub Pages`
The agent should:
1. Verify the current branch is `main`.
2. Run `bash scripts/validate-release.sh`.
3. If validation passes, deploy with `bash scripts/deploy-gh-pages.sh`.
4. Use the default deploy message format `Deploy: <summary> (<UTC timestamp>)` unless the user passes a custom deploy message.
5. Report the deploy commit message and any follow-up verification steps.

## Development flow
1. Plan the feature with the intake checklist.
2. Convert the answers into a task-specific execution plan using [`PLANS.md`](/Users/utkarshrawat/Documents/code/usrbom.github.io/PLANS.md).
3. Start or switch to the scratch branch with `bash scripts/start-feature.sh "<feature name>"`.
4. Implement the feature.
5. Validate with `npm run lint` and `npm run build`.
6. Test locally with `npm run dev`.
7. Once approved, merge the scratch branch into `main`.
8. Deploy from `main` only.

## Release rules
- Production deploys should originate from `main`, not from a scratch branch.
- Release validation must run `npm run lint` and `npm run build` every time.
- If the source repo has uncommitted changes during release validation, the workflow should warn and ask whether to continue.
- Do not edit generated output in `out/` manually as part of feature work.
- `out/` is build output only. The deploy script uses `.gh-pages-tmp/` as the dedicated `gh-pages` worktree.
- Use [`scripts/deploy-gh-pages.sh`](/Users/utkarshrawat/Documents/code/usrbom.github.io/scripts/deploy-gh-pages.sh) as the single production deploy path.

## Deploy troubleshooting
- If a deploy seems to stage or commit files on `main`, stop. Check whether `.gh-pages-tmp/.git` exists and whether the deploy script is syncing into `.gh-pages-tmp/`, not `out/`.
- If `npm run lint` or `npm run build` cannot find `next`, reinstall dependencies with `npm install`.
- A normal successful deploy should:
- validate on `main`
- build into `out/`
- commit on `gh-pages`
- push `origin/gh-pages`

## Helper scripts
- Start a feature branch: `bash scripts/start-feature.sh "<feature name>"`
- Validate the production release path: `bash scripts/validate-release.sh`
- Deploy `main` to GitHub Pages: `bash scripts/deploy-gh-pages.sh`
- Deploy `main` with a custom message override: `bash scripts/deploy-gh-pages.sh "Your custom deploy message"`
