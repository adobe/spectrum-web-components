---
name: migration-setup
description: Phase 2 of 1st-gen to 2nd-gen component migration. Use to create the 2nd-gen file and folder structure, wire up exports, and confirm the build passes before implementation begins.
---

# Migration setup (Phase 2)

[Phase 2](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to create the core and SWC directory structure, stub out the required files, and confirm the component is importable before any implementation work begins.

## Mindset

You are building a foundation, not a feature. Every file you create here is a contract: the right structure now prevents expensive restructuring later. Stub first, verify the build passes, then stop — implementation comes in later phases.

## When to use this skill

- Phase 1 (migration-prep) is complete and the migration plan is approved
- The user asks to "set up" or "scaffold" a component for 2nd-gen migration
- The user asks to create the core/SWC file structure for a component
- The user refers to "Phase 2" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 1 is not complete — write and get team review on the migration plan first
- You are implementing data model, rendering, or styles — those are later phases

## How to invoke

- "Set up [component] for migration"
- "Scaffold [component] for 2nd-gen"
- "Phase 2 for [component] migration"
- "Create the core and SWC structure for [component]"

---

## Workflow

Follow **[Phase 2: Setup](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-2-setup)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.
