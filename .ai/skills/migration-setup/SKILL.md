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
- **Global alignment contract** — may constrain how the component stylesheet relates to global stylesheets; note this for Phase 5.

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

Then generate the skeleton instead of hand-authoring it:

3. **Run the scaffolder** — from the repo root, run `yarn plop component "<name>"` (or `yarn plop component "<name>" --force` headlessly). This produces the deterministic 2nd-gen skeleton in one step: the `core` base/types/index, the `swc` concrete class, registration, css, per-unit `.mdx`, stories, and test files — all matching the `badge` reference layout. It also wires the `@spectrum-web-components/core` `exports` map (the `swc` package uses wildcard exports and needs no edit) and runs Prettier on the new files. See [`2nd-gen/scaffolding/README.md`](../../../2nd-gen/scaffolding/README.md). Do **not** re-create these files by hand; the generator is the source of truth for the skeleton.
4. **Apply the plan-specific architecture on top of the skeleton.** The generated files are intentionally generic — every file carries `TODO`/placeholder markers. Your job in this phase is the part the generator cannot know: move properties, methods, and mixins onto the base vs. concrete class exactly as the migration plan dictates, adjust `validSizes`/`defaultSize`, and remove or rename placeholders. Do not leave generic scaffolding in place where the plan specifies otherwise.

Then follow **[Phase 2: Setup](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-2-setup)** in the washing machine workflow doc — it covers what to check, common problems, and the quality gate for this phase. The workflow's manual file-creation steps are now handled by the scaffolder in step 3; use them as a checklist to confirm the generated structure is complete, not as authoring instructions.

**Key file split (SWC package):**

- `index.ts` — class re-export only (`export * from './Component.js'`). No `defineElement`, no `HTMLElementTagNameMap` augmentation.
- `swc-<tag>.ts` — side-effect entry point. Contains `defineElement('swc-<tag>', Component)` and the `HTMLElementTagNameMap` augmentation. Use `2nd-gen/packages/swc/components/badge/swc-badge.ts` as the reference.
- `package.json` — must export `./components/<name>/swc-<tag>.js` so consumers can import `@adobe/spectrum-wc/components/<name>/swc-<tag>.js` to register the element without pulling in a class re-export.

If the required file layout or naming in code would drift from the migration plan, follow [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).
