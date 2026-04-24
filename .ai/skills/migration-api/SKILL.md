---
name: migration-api
description: Phase 3 of 1st-gen to 2nd-gen component migration. Use to move properties, methods, and types from 1st-gen to 2nd-gen while maintaining a clear public API.
---

# Migration API ([Phase 3](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 3](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to migrate properties, methods, and types from 1st-gen to 2nd-gen — keeping the public API clear, types in core, and internal helpers marked appropriately.

## Mindset

You are defining a contract, not writing logic. Every property and type you place here is a public commitment. Put shared things in core, generation-specific things in SWC, and mark anything temporary with a `@todo`. If you are unsure where something belongs, ask the user, and/or use the `ask-questions` skill.

Read the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` when available and use it as the planning baseline for names, deprecations, breaking changes, and consumer migration paths. If it is missing, stale, or intentionally incomplete, derive the needed context from source material and call out the missing plan as a risk. See also [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

## When to use this skill

- Phase 2 (migration-setup) is complete and the file structure exists
- The user asks to "migrate the API" or "move properties/types" for a component
- The user asks to implement static arrays, debug warnings, or 1st-gen deprecations
- The user refers to "Phase 3" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 2 is not complete — the core/SWC file structure must exist first
- You are implementing `render()` or styles — those are later phases

## How to invoke

- "Migrate the API for [component]"
- "Move properties and types for [component]"
- "Phase 3 for [component] migration"

---

## Workflow

Follow **[Phase 3: API Migration](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-3-api-migration)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.

If implementation needs to deviate from the migration plan, follow [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).
