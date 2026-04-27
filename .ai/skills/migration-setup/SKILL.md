---
name: migration-setup
description: Phase 2 of 1st-gen to 2nd-gen component migration. Use to create the 2nd-gen file and folder structure, wire up exports, and confirm the build passes before implementation begins.
---

# Migration setup (Phase 2)

[Phase 2](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to create the core and SWC directory structure, stub out the required files, and confirm the component is importable before any implementation work begins.

## Mindset

You are building a foundation, not a feature. Every file you create here is a contract: the right structure now prevents expensive restructuring later. Stub first, verify the build passes, then stop — implementation comes in later phases.

Read the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` when available and use it as the baseline for **all** structural decisions: component naming, split-vs-single-component decisions, expected core/SWC file layout, and — critically — **what properties, methods, and mixins belong on the base class vs. the concrete SWC class**. If it is missing, stale, or intentionally incomplete, derive those decisions from the best available source material and call out the missing plan as a risk. See also [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

**Migration plan sections override washing-machine defaults.** The washing machine workflow describes the _typical_ Phase 2 file structure; a component's migration plan describes the _specific_ architectural intent for that component. When the two conflict — for example, the plan restricts which properties may live on the base class for shared-reuse reasons — the migration plan takes precedence. Common plan sections that carry these overrides:

- **Architecture: core vs SWC split** — defines exactly what each layer owns; follow this verbatim.
- **Shared semantics reuse** (or equivalent) — may explicitly restrict what the base class owns so that other components can extend it without inheriting this component's visual surface. If this section exists, any properties identified as visual or component-specific belong on the concrete SWC class, not the base.
- **Global alignment contract** — may constrain how the component stylesheet relates to global stylesheets; note this for Phase 4.

If the plan's API checklist and an architectural decision section contradict each other, the architectural decision section governs. Update the checklist to reflect the correct split and note the reason.

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

Before creating any files:

1. **Read the migration plan's architecture sections** — specifically "Architecture: core vs SWC split", "Shared semantics reuse", and any other section that constrains what belongs on the base vs. the concrete class. Write down the decisions before touching files.
2. **Identify any contradiction** between the plan's API checklist items and its architectural decisions. If a checklist item places properties on the base class that an architectural section says belong on the SWC class, the architectural section wins — update the checklist and note the reason before proceeding.

Then follow **[Phase 2: Setup](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-2-setup)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.

If the required file layout or naming in code would drift from the migration plan, follow [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).
