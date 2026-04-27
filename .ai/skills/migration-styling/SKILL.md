---
name: migration-styling
description: Phase 4 of 1st-gen to 2nd-gen component migration. Use to migrate CSS to the 2nd-gen structure, apply Spectrum 2 tokens, and ensure stylelint passes.
---

# Migration styling ([Phase 4](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 4](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to migrate CSS to the 2nd-gen structure, replace hard-coded values with tokens, and ensure the component's CSS passes stylelint with no errors.

## Mindset

You are translating, not redesigning. Your job is not to invent new visual decisions.

**Before writing any CSS**, read the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md`. It is the scope authority for this phase. For Phase 4, extract:

- **Visual scope** — what visual changes are approved vs. out of scope
- **Custom-property decisions** — which custom properties to keep, rename, or remove
- **Intentional divergences** — places where 2nd-gen deliberately differs from 1st-gen
- **Planned surface-area reductions or splits** — variants, sizes, or features that are being dropped or deferred

If the plan is missing, stale, or intentionally incomplete, derive the needed context from source material, call out the missing plan as a risk, and proceed only for the fields you can resolve confidently. See [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md) for the full drift rule and when to pause.

With that context established, read [`references/tldr-component-css-guidelines.md`](references/tldr-component-css-guidelines.md) — a TL;DR of the most critical rules from `CONTRIBUTOR-DOCS/02_style-guide/` with correct/incorrect code examples and links to the full docs for each rule. This is the CSS rules authority for this phase; follow it in preference to any conflicting guidance in the rendering analysis doc.

Then use the `rendering-and-styling-migration-analysis.md` file for the component-specific technical detail of what to migrate. When a token you need does not exist, use the `ask-questions` skill to flag it with the user.

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

**Step 0 — Read the migration plan first.** Before touching any CSS, open `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` and extract the four Phase 4 fields listed in the Mindset section above. Note any open questions or intentional divergences so you can surface them proactively rather than discovering drift mid-work.

**Step 1 — Check for drift before committing to an approach.** If your planned CSS changes would exceed the migration plan's approved visual scope or contradict its custom-property decisions, call out the drift explicitly and follow [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md) before writing any code. Do not silently resolve open questions in CSS.

**Step 2 — Execute the phase.** Follow **[Phase 4: Styling](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-4-styling)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.
