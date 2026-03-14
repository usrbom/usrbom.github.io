# Execution Plan Template

Use this for larger features, refactors, or bug fixes before making broad changes.

## Goal
- What should change, for whom, and why?

## Context
- Relevant product or technical background.
- Current behavior and where it lives.
- Existing commands, scripts, or deployment constraints that matter.

## Constraints
- Static export / hosting constraints.
- Scope limits.
- Performance, accessibility, SEO, or content constraints.
- Files or systems that should not be changed.

## Assumptions
- Facts inferred from the repo.
- Any item that is uncertain should be marked `verify`.

## Milestones
1. Inspect the current implementation and affected files.
2. Make the smallest structural changes needed.
3. Update UI/content/logic.
4. Validate with the repo’s real commands.
5. Summarize outcome, risks, and follow-ups.

## Files likely affected
- List expected source files.
- List any config, asset, or deployment files only if truly needed.

## Validation
- `npm run lint`
- `npm run build`
- Manual checks:
- Accessibility or responsive checks:

## Risks
- What could regress?
- What static-export, routing, or deployment behavior could break?

## Open questions
- Unknown requirements.
- Content or copy decisions that need confirmation.
- Any command or workflow ambiguity.

## Definition of done
- Behavior matches the goal.
- Scope stays within the stated constraints.
- Validation passes.
- Any `verify` items are either resolved or clearly called out.

---

## Example Plan: Extract Homepage Content Into Structured Data

### Goal
- Move hard-coded portfolio copy and list data into a small shared data module so future content edits do not require touching component markup.

### Context
- The homepage is assembled in [`app/page.tsx`](/Users/utkarshrawat/Documents/code/usrbom.github.io/app/page.tsx) from section components in [`components`](/Users/utkarshrawat/Documents/code/usrbom.github.io/components).
- Several components currently embed content arrays directly, including projects, timeline entries, and writing placeholders.
- The site is static-exported, so a local data module is sufficient; no CMS or server dependency is needed.

### Constraints
- Preserve the existing layout and visual design.
- Keep static-export compatibility.
- Avoid introducing a heavier content system unless explicitly requested.

### Assumptions
- Content remains authored in-repo rather than fetched remotely.
- A simple TypeScript module under the source tree is enough.
- Dedicated content collection tooling is unnecessary for the current scope.

### Milestones
1. Identify all hard-coded content arrays and strings that should move first.
2. Create a typed data module for shared homepage content.
3. Update components to read from that module without changing rendered structure.
4. Run `npm run lint` and `npm run build`.
5. Document any remaining hard-coded copy left intentionally in place.

### Files likely affected
- [`components/Hero.tsx`](/Users/utkarshrawat/Documents/code/usrbom.github.io/components/Hero.tsx)
- [`components/Projects.tsx`](/Users/utkarshrawat/Documents/code/usrbom.github.io/components/Projects.tsx)
- [`components/Timeline.tsx`](/Users/utkarshrawat/Documents/code/usrbom.github.io/components/Timeline.tsx)
- [`components/WritingTeaser.tsx`](/Users/utkarshrawat/Documents/code/usrbom.github.io/components/WritingTeaser.tsx)
- New data file location: verify

### Validation
- `npm run lint`
- `npm run build`
- Manual checks:
- Confirm the homepage content renders identically after the refactor.
- Confirm resume, contact, and anchor links still work.
- Accessibility or responsive checks:
- Confirm no new client-only code is introduced unnecessarily.

### Risks
- Unintended copy changes during extraction.
- Over-abstracting a small static site and making content updates harder instead of easier.

### Open questions
- Should the data live in `components`, a new `data` folder, or another location? verify
- Should metadata in [`app/layout.tsx`](/Users/utkarshrawat/Documents/code/usrbom.github.io/app/layout.tsx) also move into the shared content module?

### Definition of done
- Components consume typed shared content data.
- Rendered output remains materially unchanged.
- `npm run lint` and `npm run build` pass.
- Any deferred content cleanup is explicitly noted.
