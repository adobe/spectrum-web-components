---
name: migration-styling
description: Phase 4 of 1st-gen to 2nd-gen component migration. Use to migrate CSS to the 2nd-gen structure, apply Spectrum 2 tokens, and ensure stylelint passes.
---

# Migration styling ([Phase 4](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 4](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to migrate CSS to the 2nd-gen structure, replace hard-coded values with tokens, and ensure the component's CSS passes stylelint with no errors.

## Mindset

You are translating, not redesigning. Your job is not to invent new visual decisions. Use the `rendering-and-styling-migration-analysis.md` file that corresponds to the component you are migrating. When the token you need does not exist, use the `ask-questions` skill to flag it with the user. Refer to the CSS styling guides in `CONTRIBUTOR-DOCS/02_style-guide/` when refactoring the CSS (i.e. change `--spectrum` prefixes to `--swc`; `.spectrum*` classes to `.swc*`; `--mod` prefixes should not exist). The CSS style guides are the preferred way to write the CSS, as opposed to any recommendations you find in the rendering analysis doc.

## When to use this skill

- Phase 3 (migration-api) is complete
- The user asks to "migrate styles" or "migrate CSS" for a component
- The user asks to apply Spectrum 2 tokens or fix stylelint errors
- The user refers to "Phase 4" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 3 is not complete — the API must be migrated first
- You are working on `render()` or template structure — check the workflow doc for rendering context

## How to invoke

- "Migrate styles for [component]"
- "Phase 4 for [component] migration"
- "Apply Spectrum 2 tokens for [component]"

---

## Workflow

Follow **[Phase 4: Styling](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-4-styling)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.
