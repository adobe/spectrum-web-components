---
description: Keeps multi-phase migration obligations in context during a session. Emits Migration Checkpoint blocks at phase completion for cross-session continuity. Apply whenever any migration-* skill is active or migration files are being edited.
alwaysApply: false
---

# Migration phase awareness

When working on any part of a 1st-gen to 2nd-gen component migration, maintain explicit awareness of which phase is active, which phases are complete, and what obligations remain — even when the conversation drifts to other topics.

## When this rule applies

Apply any time:

- A migration-\* skill has been invoked in the current session
- You are editing files that are part of a 2nd-gen component migration
- The user references a migration phase or a component being migrated

## Before declaring a phase complete

Before ending a response that declares a migration phase complete, verify against two sources and perform one update:

1. **Phase skill quality gate** — every checklist item in the active skill's quality gate section
2. **Migration plan** — read `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` and verify that the work done in this phase matches what the plan specifies for it. If the plan is missing, note that as a risk. If the implementation drifted from the plan, call it out explicitly — do not silently accept drift.
3. **Consistency pass** — the checks described in `.ai/rules/consistency-pass.md` have been run on files changed in this phase, or are explicitly deferred and noted in the checkpoint
4. **Status table** — update `CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/01_status.md` to reflect the completed phase for this component

Do not silently skip incomplete items. If something cannot be completed, say so and record it in the checkpoint.

## Emit a Migration Checkpoint at phase completion

When you complete a migration phase, end your response with a Migration Checkpoint block using this exact format:

```markdown
---
**Migration Checkpoint: [Component Name]**
Phase completed: [N] — [Phase Name]
Next phase: [N+1] — [Phase Name] (invoke `migration-[skill]`)
Consistency pass: [done | not yet run | deferred — reason]
Phase blockers: [items from this phase that are incomplete or at risk; "none" if clean — do not include future-phase concerns]
---
```

**On phase blockers:** Only include items that are genuinely unresolved within the scope of the phase just completed — known failures, skipped checklist items, plan divergence. Do not populate this field with work that belongs to future phases; those will surface when those phases run.

This block is the cross-session handoff artifact. Because this is an open-source project with multiple engineers and concurrent migrations, no shared tracking file is used. Any engineer resuming this migration in a new session should paste the most recent checkpoint as context.

## When work drifts from the migration

If you are asked to make changes or complete tasks outside the immediate migration phase — for example, fixing a bug, adjusting a story, or updating configuration — complete the requested work, then end your response with a single-line resume prompt:

> Migration paused: to continue [Component Name], invoke `migration-[active-phase-skill]`.

Use the name of the skill that was active when the drift occurred. This gives the engineer an exact phrase to resume without needing to reconstruct context.

## The phase sequence for reference

| Phase | Skill                   |
| ----- | ----------------------- |
| 1     | migration-prep          |
| 2     | migration-setup         |
| 3     | migration-api           |
| 4     | migration-a11y          |
| 5     | migration-styling       |
| 6     | migration-testing       |
| —     | migration-conformance   |
| 7     | migration-documentation |
| 8     | migration-review        |

The conformance sub-task runs after Phase 6 and before Phase 7. It is not optional — if it was skipped, note it in the checkpoint.
