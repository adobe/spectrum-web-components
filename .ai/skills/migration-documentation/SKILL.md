---
name: migration-documentation
description: Phase 7 of 1st-gen to 2nd-gen component migration. Use to write JSDoc, Storybook stories, and usage docs so the component is usable and understandable by others.
---

# Migration documentation ([Phase 7](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 7](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is JSDoc on the public API, Storybook stories covering the main use cases, and migration notes where the API diverges from 1st-gen.

See also: [`documentation`](../documentation/SKILL.md) for Adobe content writing standards to follow when writing usage docs and migration notes.

## Mindset

You are writing for the next contributor, not for yourself. Every story, JSDoc line, and migration note should answer the question a new engineer would ask six months from now. Avoid restating the implementation. Explain the intent, the constraints, and why the decisions were made. Be sure to follow the `documentation` skill for writing style and content expectations.

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

Follow **[Phase 7: Documentation](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-7-documentation)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.
