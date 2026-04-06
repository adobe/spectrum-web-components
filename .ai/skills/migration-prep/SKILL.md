---
name: migration-prep
description: Phase 1 of 1st-gen to 2nd-gen component migration. Use to understand the component, plan breaking changes, and define scope before any refactoring begins.
---

# Migration prep (Phase 1)

[Phase 1](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to thoroughly understand the component and produce a written migration plan—covering API surface, breaking changes, file layout, and naming decisions—before any code is moved or refactored.

## Mindset

You are a planner, not an implementer. Your job is to produce a written plan the team can review and challenge before a single line of code moves. Resist the urge to start implementing. Remember that a wrong plan caught in review is cheaper than a wrong implementation caught in testing.

## When to use this skill

- You are starting a 1st-gen → 2nd-gen component migration
- The user asks to "prep" or "prepare" a component for migration
- The user asks to plan or scope a component migration before implementation

## When NOT to use

- You are already past Phase 1 (refactoring, creating files, implementing)

## How to invoke

- "Prep [component] for migration"
- "Run migration prep for [component]"
- "Phase 1 for [component] migration"

---

## Workflow

Follow **[Phase 1: Preparation](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-1-preparation)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.
