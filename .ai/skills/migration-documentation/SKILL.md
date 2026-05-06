---
name: migration-documentation
description: Phase 7 of 1st-gen to 2nd-gen component migration. Use to write JSDoc, Storybook stories, and usage docs so the component is usable and understandable by others.
---

# Migration documentation ([Phase 7](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 7](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is JSDoc on the public API, Storybook stories covering the main use cases, and migration notes where the API diverges from 1st-gen.

See also: [`documentation`](../documentation/SKILL.md) for Adobe content writing standards to follow when writing usage docs and migration notes.

## Mindset

You are writing for the next contributor, not for yourself. Every story, JSDoc line, and migration note should answer the question a new engineer would ask six months from now. Avoid restating the implementation. Explain the intent, the constraints, and why the decisions were made. Be sure to follow the `documentation` skill for writing style and content expectations.

Read the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` when available before documenting the component. Use it as the source for migration notes, consumer-facing breaking-change explanations, rationale behind naming or behavior differences, and the main scenarios the stories should emphasize. If it is missing, stale, or intentionally incomplete, derive the needed context from the implemented component and source material and call out the missing plan as a risk. See also [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

## When to use this skill

- Phase 6 (migration-testing) is complete
- The user asks to "document [component]" or "add stories for [component]"
- The user asks to write JSDoc, add Storybook stories, or document migration notes
- The user refers to "Phase 7" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 6 is not complete — tests should pass before documentation is finalized
- You are updating docs for an existing component unrelated to migration

## How to invoke

- "Document [component]"
- "Add stories for [component]"
- "Phase 7 for [component] migration"

---

## Workflow

**Check for a Phase 4 stories scaffold first.** If Phase 4 (migration-styling) was completed, `2nd-gen/packages/swc/components/[component]/stories/[component].stories.ts` likely already exists with Playground, Overview, Anatomy, Options, States, and Behaviors stories — all structurally correct but without JSDoc prose. Phase 7's job is to:

1. Add JSDoc comments to every story (except Playground and Overview, which have none by convention).
2. Complete the Accessibility story body — it was left as a `// TODO` comment in Phase 4.
3. Add any stories that were deferred or were not CSS-visible enough to include in Phase 4.

If the stories document already exists, do **not** recreate the file from scratch. Augment what is already there.

Follow **[Phase 7: Documentation](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-7-documentation)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.

If the docs need to describe behavior or migration guidance that differs from the approved migration plan, follow [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).
