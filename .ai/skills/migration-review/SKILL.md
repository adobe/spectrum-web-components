---
name: migration-review
description: Phase 8 of 1st-gen to 2nd-gen component migration. Use to run final checks, verify lint/tests/build/Storybook, update the workstream status table, and open a PR.
---

# Migration review ([Phase 8](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 8](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is final checks — lint, tests, build, and Storybook — then updating the workstream status table and opening a PR.

## When to use this skill

- All previous phases are complete
- The user asks to "review [component]", "finalize [component]", or "open a PR for [component]"
- The user refers to "Phase 8" of the 2nd-gen component migration workstream

## How to invoke

- "Review [component] migration"
- "PR review for [component]"
- "Phase 8 for [component] migration"

---

## Workflow

### 1. Run the final checklist

Work through the checklist at the bottom of this skill. Each item maps to a completed phase.

### 2. Lint

From the repo root, run:

```sh
yarn lint:2nd-gen
```

This runs:

- **ESLint** — TypeScript, JavaScript, and JSON under `2nd-gen/`
- **Stylelint** — `2nd-gen/**/*.css` (property order, `no-descending-specificity`, declaration empty lines, token usage)
- **Prettier** — check mode

CSS should already be clean from [Phase 4](../migration-styling/SKILL.md). Fix any remaining issues in touched files before proceeding.

### 3. Tests

Run the full test suite for the affected packages:

```sh
yarn test        # Unit tests (Vitest)
yarn test:a11y   # Accessibility tests (Playwright)
```

All tests must pass with no unnecessarily skipped tests.

### 4. Build

```sh
yarn build
```

Confirm the build succeeds for both core and SWC packages.

### 5. Storybook

```sh
yarn storybook
```

Load the component in Storybook. Click through all stories and verify:

- All variants and sizes render correctly
- Controls change the component in the canvas
- No console errors

### 6. Update the workstream status table

In the [workstream status table](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/01_status.md), mark the component's row with checkmarks for each completed step: Analyze, Factor, Move to Core, Data Model, Add 2nd-Gen, Render & Style, Add Stories.

### 7. Open the PR

Create a PR with a clear description including:

- Component name
- Summary of breaking changes (if any)
- Link to the [migration workstream README](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) or the relevant ticket
- At least one reviewer assigned

---

## Final checklist

Copy this checklist into your PR description or tracking doc:

- [ ] **Phase 1** — Migration plan done; API and breaking changes understood
- [ ] **Phase 2** — All files created; build passes; component importable
- [ ] **Phase 3** — API in base/SWC; types in core; JSDoc and `@internal` set
- [ ] **Phase 4** — CSS follows style guide; tokens and variants work; stylelint passes (property order, `no-descending-specificity`, tokens)
- [ ] **Phase 5** — WCAG pattern applied; keyboard and ARIA done; a11y tests pass
- [ ] **Phase 6** — Unit and a11y tests pass; coverage is reasonable
- [ ] **Phase 7** — JSDoc and stories complete; migration notes added if needed
- [ ] **Phase 8** — Lint clean; tests green; Storybook verified; status table updated; PR created

---

## Quality gate

Phase 8 is complete when:

> The checklist is complete; the workstream status table is updated; a PR is open with a clear description of the component, breaking changes, and a link to the migration guide or ticket; at least one reviewer is assigned.
