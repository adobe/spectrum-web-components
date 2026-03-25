---
name: migration-setup
description: Phase 2 of 1st-gen to 2nd-gen component migration. Use to create the 2nd-gen file and folder structure, wire up exports, and confirm the build passes before implementation begins.
---

# Migration setup (Phase 2)

[Phase 2](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to create the core and SWC directory structure, stub out the required files, and confirm the component is importable before any implementation work begins.

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

## Refactor path (1st-gen required)

This workflow assumes a 1st-gen package (`1st-gen/packages/<component>/` or equivalent) exists and is what you are migrating. Complete these steps as part of Phase 2 before creating the 2nd-gen SWC structure:

1. **[Factor rendering out of 1st-gen](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/02_factor-rendering-out-of-1st-gen-component.md)** — Rename to `[Component].base.ts`, create a new `[Component].ts` that extends the base, move `render()` and styles to the concrete class. Confirm tests still pass.
2. **[Move base class to 2nd-gen core](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/03_move-base-class-to-2nd-gen-core.md)** — Create `core/components/<name>/`, move the base and types there, update 1st-gen to import from core. Confirm tests still pass.

---

## Workflow

### 1. Create the core package

Create `2nd-gen/packages/core/components/<name>/` with:

- `Component.base.ts` — base class with properties, getters/setters, lifecycle, and validation; no rendering
- `Component.types.ts` — shared types, enums, and interfaces (importable by both 1st-gen and 2nd-gen)
- `index.ts` — exports for the base class and types

### 2. Create the SWC package

Create `2nd-gen/packages/swc/components/<name>/` with:

- `Component.ts` — concrete class extending the core base; adds `render()`, CSS, and any SWC-only props
- `component.css` — component styles
- `index.ts` — exports and element registration
- `stories/` — Storybook stories directory (can be stubbed)
- `test/` — test directory (can be stubbed)

### 3. Wire up exports

- Add the component to package exports (e.g. `@adobe/spectrum-wc/<name>`) in `package.json` / `index` files so it is importable.
- See [Step 2](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/02_factor-rendering-out-of-1st-gen-component.md) and [Step 3](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/03_move-base-class-to-2nd-gen-core.md) for directory layout, code structure, and reference implementations ([Badge](../../../2nd-gen/packages/swc/components/badge)).

---

## Decision trees

### What shared utilities can be extracted?

- **Same logic already exists in multiple 2nd-gen components** → Put the utility in `core` (as a mixin, helper, or shared module) so all components can use it.
- **Logic is only needed for this component** → Keep it in `core` or `SWC` as appropriate; don't over-abstract.

---

## Checklist

- [ ] Core base class extends the right mixins (e.g. `SizedMixin`, `SpectrumElement`)
- [ ] SWC class extends the core base (e.g. `extends BadgeBase`)
- [ ] Imports resolve; build passes with a minimal or stub implementation
- [ ] Component is importable in Storybook

---

## Common problems

| Problem               | Solution                                                                                                                                                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wrong base or mixin   | See [Badge](../../../2nd-gen/packages/swc/components/badge) and [Step 2](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/02_factor-rendering-out-of-1st-gen-component.md). |
| CSS not applied       | Add `static override get styles()` and import the CSS module. See [Badge](../../../2nd-gen/packages/swc/components/badge) for reference.                                                                                               |
| Package not exporting | Add to package exports (e.g. `@adobe/spectrum-wc/<name>`).                                                                                                                                                                             |

---

## Quality gate

Phase 2 is complete when:

> All files exist; `yarn build` (or equivalent) for the affected packages succeeds; the component is importable in Storybook.
