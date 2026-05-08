---
name: migration-review
description: Phase 8 of 1st-gen to 2nd-gen component migration. Use to run final checks, verify lint/tests/build/Storybook, update the workstream status table, and open a PR.
---

# Migration review ([Phase 8](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 8](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is final checks — lint, tests, build, and Storybook — then updating the workstream status table and opening a PR.

## Mindset

You are a gatekeeper, not a rubber stamp. A passing build and green tests are the minimum expectations. Read the diff as if you are a reviewer who did not write this code. Look for missing edge cases, inconsistent conventions, and anything the automated checks cannot catch. Use the style guides in `CONTRIBUTOR-DOCS/02_style-guide` when enforcing code styles.

Read the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` when available before final review. Verify that the implemented API, behavior, breaking changes, docs, and tests still match the plan, and treat undocumented drift as a review issue. If the plan is missing, stale, or intentionally incomplete, review against the best available source material and call out the missing plan as a risk. See also [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

## When to use this skill

- All previous phases are complete
- The user asks to "review [component]", "finalize [component]", or "open a PR for [component]"
- The user refers to "Phase 8" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 7 is not complete — documentation and stories should be finalized before review
- You are resolving a lint, test, or build failure that belongs to an earlier phase (e.g. stylelint errors → Phase 5, failing unit or a11y tests → Phase 6)

## How to invoke

- "Review [component] migration"
- "PR review for [component]"
- "Phase 8 for [component] migration"

---

## Workflow

Follow **[Phase 8: Review](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-8-review)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.

In addition to the workflow doc and [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md), explicitly verify that:

- Implemented API and behavior match the approved migration plan
- Breaking changes in code are documented in the plan and reflected in docs
- Any drift from the plan is either corrected or clearly called out for review
- Unresolved open questions were not silently decided in code without alignment
