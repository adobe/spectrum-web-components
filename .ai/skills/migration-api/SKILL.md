---
name: migration-api
description: Phase 3 of 1st-gen to 2nd-gen component migration. Use to move properties, methods, and types from 1st-gen to 2nd-gen while maintaining a clear public API.
---

# Migration API ([Phase 3](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 3](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to migrate properties, methods, and types from 1st-gen to 2nd-gen — keeping the public API clear, types in core, and internal helpers marked appropriately.

## Mindset

You are defining a contract, not writing logic. Every property and type you place here is a public commitment. Put shared things in core, generation-specific things in SWC, and mark anything temporary with a `@todo`. If you are unsure where something belongs, ask the user, and/or use the `ask-questions` skill.

Read the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` when available and use it as the planning baseline for names, deprecations, breaking changes, and consumer migration paths. If it is missing, stale, or intentionally incomplete, derive the needed context from source material and call out the missing plan as a risk. See also [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

The plan's architectural sections also govern **where each property and type lands**. If Phase 2 established that certain properties belong on the SWC class rather than the base (e.g. for shared-reuse reasons), that decision holds in Phase 3 — do not move those properties to the base class during API migration even if a checklist item implies otherwise. If a checklist item and an architectural section conflict, the architectural section governs; update the checklist and note the reason.

**Deferred items are out of scope.** The plan may explicitly defer features to follow-up tickets (e.g. form-associated behavior, cross-root ARIA). Do not implement deferred items in Phase 3 even if they appear in the API section of the plan — mark them as skipped and note the tracking ticket.

**For each breaking change in the migration plan, you must add both `@deprecated` JSDoc and a `window.__swc.warn()` call to the 1st-gen file.** JSDoc alone is not enough — types and IDE tooling pick it up, but consumers building against compiled output won't see it. Restrict 1st-gen changes to these two things only: do not add new backing types, do not convert plain properties to getter/setter patterns, do not add new private fields.

For where the warn goes — inside an existing setter, or in the `updated()` lifecycle method with a `changes.has()` guard and a non-default value check for a setter-less `@property` — follow the [Where to place the warning](../../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/17_debug-validation.md#where-to-place-the-warning) section of the debug and validation guide. The setter-less pattern matters here because Phase 3 does not allow converting a plain `@property` into a getter/setter just to host the warn, so `updated()` is its only home.

After writing the deprecation notices, scan every `@deprecated` tag in the 1st-gen file and confirm a `__swc.warn()` call exists for each one before closing Phase 3. TypeScript TS6385 hints that arise from deprecated types referencing each other internally are an accepted side effect and do not require structural fixes.

**`@deprecated` JSDoc message format** — the washing machine workflow Phase 3 section on "Deprecating 1st-gen type and const exports" says to document migration to class-level inference (e.g. `typeof Badge.prototype.variant`, `typeof Badge.FIXED_VALUES`) when a class static already exists in 1st-gen. Apply this as follows:

- If the 1st-gen class **already** exposes a corresponding static (e.g. `Button.VARIANTS`), use: "The `X` export is deprecated... If needed, you can access the internal `Button.X` property from the constructor."
- If **no** such static exists, omit the "if needed" clause entirely: "The `X` export is deprecated and will be removed in a future release."
- Do not add new class statics to 1st-gen just to provide this alternative — that is a refactor and out of scope.
- For **renames**, note the new name in the JSDoc: "...will be replaced by `newName` in a future release."

For the `window.__swc.warn()` call format, the `{ level: 'deprecation' }` option, and the rules on referencing a replacement in the message, follow the **[Deprecation warnings](../../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/17_debug-validation.md#deprecation-warnings)** section of the debug and validation guide. Applying its replacement-reference rule to migration: reference the 1st-gen replacement if one exists, otherwise omit the "Use" clause — and never point a 1st-gen runtime warn at a 2nd-gen API, since consumers on the 1st-gen build cannot use it.

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

Before implementing anything:

1. **Re-read the plan's architectural sections** established in Phase 2 — "Architecture: core vs SWC split", "Shared semantics reuse", and any equivalent section. These decisions are binding: they determine which file each property, method, and type goes into.
2. **Identify deferred items** in the plan (look for a "Deferred" or "Blockers and open questions" section, or checklist items that reference follow-up tickets). Exclude these from Phase 3 scope entirely.
3. **Identify contradictions** between the API checklist and architectural decisions. Architectural decisions govern; update the checklist before writing code.

Then follow **[Phase 3: API Migration](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-3-api-migration)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.

If implementation needs to deviate from the migration plan, follow [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).
