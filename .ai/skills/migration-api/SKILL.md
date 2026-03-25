---
name: migration-api
description: Phase 3 of 1st-gen to 2nd-gen component migration. Use to move properties, methods, and types from 1st-gen to 2nd-gen while maintaining a clear public API.
---

# Migration API ([Phase 3](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 3](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to migrate properties, methods, and types from 1st-gen to 2nd-gen — keeping the public API clear, types in core, and internal helpers marked appropriately.

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

### 1. List the public API from 1st-gen

- Enumerate all attributes, properties, slots, and events from the 1st-gen component.

### 2. Define types in core

- Create types, enums, and const arrays in `Component.types.ts`.
- Put shared API in the base class (core); SWC-only API goes in the concrete class.

### 3. Migrate each property

Use the table below to decide where each property goes and what action to take:

| Scenario          | Where it goes                        | Action                                                                                                                                 |
| ----------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Same in S1 and S2 | Base (core)                          | Move as-is.                                                                                                                            |
| Renamed in S2     | Base (core) + deprecation in 1st-gen | Map old → new; forward old attribute in 1st-gen (setter that forwards to new prop); emit a console warning when old attribute is used. |
| Removed in S2     | 1st-gen only                         | Do not migrate; mark `@deprecated` in 1st-gen; document removal.                                                                       |
| New in S2         | SWC (temporary)                      | Add in SWC with `@todo` to move to base once 1st-gen is removed.                                                                       |

See [Step 4](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/04_formalize-spectrum-data-model.md) and [Step 5](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/05_implement-2nd-gen-component.md) for types, base vs SWC API, and native input handling (Checkbox).

### 4. Mark internal API

- Mark internal helpers with JSDoc `@internal`.
- Add JSDoc for all public props and slots.

### 5. Implement API patterns

Follow the three patterns below. Use [Badge.base.ts](../../../2nd-gen/packages/core/components/badge/Badge.base.ts) and [Badge.ts](../../../2nd-gen/packages/swc/components/badge/Badge.ts) as the reference implementation, and [1st-gen Badge.ts](../../../1st-gen/packages/badge/src/Badge.ts) for deprecated re-export patterns.

#### Static readonly arrays (`VARIANTS`, `VARIANTS_COLOR`, `VALID_SIZES`, `FIXED_VALUES`, etc.)

- Declare canonical option lists in `Component.types.ts` as `const` arrays.
- Expose them as `static readonly` fields on the base class (override in SWC for S2-specific lists).
- Use them for: runtime validation in `update()` or setters, Storybook `argTypes` options, and tests.

#### `window.__swc.warn()` (debug-only)

- When `window.__swc?.DEBUG` is enabled, warn on invalid API combinations (e.g. incompatible `variant` + `outline`).
- Lets developers catch mistakes without affecting production.
- See `Badge.base.ts` — `update()` and `window.__swc.warn(...)` with structured issue metadata.

#### Deprecating 1st-gen type and const exports

- Prefer statics on the custom element class over package-level exports for variant lists and constants (`Component.VARIANTS`, etc.).
- For types, deprecate standalone exports from 1st-gen packages; document migration to inference from the element (e.g. `typeof Badge.prototype.variant`, `typeof Badge.FIXED_VALUES`) — see `@deprecated` JSDoc in [1st-gen Badge.ts](../../../1st-gen/packages/badge/src/Badge.ts).
- Re-export from core in 1st-gen where needed; mark `@deprecated`; do not duplicate logic.

---

## Checklist

- [ ] All public 1st-gen props have a 2nd-gen home (base or SWC)
- [ ] Types are in core and reused in SWC
- [ ] Internal helpers are marked `@internal`
- [ ] Static readonly arrays match types; used for validation, Storybook, and tests where applicable
- [ ] Invalid prop combinations emit `window.__swc.warn()` when debug is on (where the component has combination rules)
- [ ] Deprecated 1st-gen exports document the constructor/prototype-based replacement pattern

---

## Common problems

| Problem                     | Solution                                                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| S1 vs S2 different options  | Define S1/S2 `const` arrays in types; base uses union; SWC overrides. See [Badge](../../../2nd-gen/packages/swc/components/badge). |
| Complex getter/setter       | Use only for attribute sync or validation; otherwise use `@property`.                                                              |
| Deprecated 1st-gen exports  | Re-export from core, mark `@deprecated`; no duplicate logic.                                                                       |
| Native `<input>` (Checkbox) | See `Checkbox.base.ts` and `Checkbox.ts` for `abstract inputElement`, `handleChange`, `delegatesFocus`.                            |

---

## Decision trees

### What shared utilities can be extracted?

- **Same logic already exists in multiple 2nd-gen components** → Put the utility in `core` (as a mixin, helper, or shared module) so all components can use it.
- **Logic is only needed for this component** → Keep it in `core` or `SWC` as appropriate; don't over-abstract.

### How should variants be implemented?

- **Small fixed set** (e.g. size `s`/`m`/`l`, or variant `positive`/`negative`/`neutral`) → String attribute + `reflect: true` + `static readonly` const array (e.g. `VARIANTS`, `VALID_SIZES`).
- **Boolean toggles** (e.g. `disabled`, `quiet`, `emphasized`) → Boolean attributes + `reflect: true`.
- **Stop and ask** when the 1st-gen component uses a different pattern (e.g. a boolean that maps to a named variant in S2) — confirm the right representation before implementing.

---

## Stop and ask: breaking API changes

If you are renaming or removing a public prop or attribute, confirm with the team and plan deprecation or a migration path for consumers before proceeding.

---

## Quality gate

Phase 3 is complete when:

> The public API is documented; types are in core; the base holds shared logic; SWC holds rendering and S2-only API. The static readonly pattern, debug warnings, and any 1st-gen deprecation notes align with [Badge](../../../2nd-gen/packages/swc/components/badge) (or equivalent) and TypeScript conventions.
