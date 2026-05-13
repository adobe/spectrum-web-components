---
name: migration-testing
description: Phase 6 of 1st-gen to 2nd-gen component migration. Use to write unit tests, accessibility tests, and Storybook play functions for a migrated component.
---

# Migration testing ([Phase 6](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 6](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is automated test coverage for behavior and accessibility — unit tests via Vitest, a11y tests via Playwright, and Storybook play functions.

## Mindset

You are a skeptic. Tests that always pass are not tests — they are documentation. Use the `test-driven-development` skill to ensure that each test would be able to catch a real regression. Write the failure case before writing the assertion. If you cannot imagine how a test could fail, it is not testing enough and should use `ask-questions` to flag the concern with the user.

Read the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` when available before writing tests. Use it to derive the must-ship test matrix, breaking-change coverage, accessibility and behavior regressions, and any high-risk open questions that need regression protection. If it is missing, stale, or intentionally incomplete, derive the needed context from the implemented behavior and source material and call out the missing plan as a risk. See also [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

## When to use this skill

- Phases 4 (migration-a11y) and 5 (migration-styling) are complete
- The user asks to "add tests" or "write tests" for a migrated component
- The user asks to add play functions, a11y specs, or unit tests
- The user refers to "Phase 6" of the 2nd-gen component migration workstream

## When NOT to use

- Phases 4 and 5 are not complete — accessibility behavior and styling must be implemented before they can be tested
- You are fixing an existing test failure unrelated to migration

## How to invoke

- "Add tests for [component]"
- "Write tests for [component]"
- "Phase 6 for [component] migration"

---

## Workflow

Follow **[Phase 6: Testing](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-6-testing)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.

If the implementation or the needed test coverage has drifted from the migration plan, follow [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).
