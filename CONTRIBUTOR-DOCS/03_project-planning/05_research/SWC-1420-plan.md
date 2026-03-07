<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Research / Plan: SWC-1420 — TypeScript conventions guide for 2nd-gen

<!-- Document title (editable) -->

# Plan: SWC-1420 — TypeScript conventions guide for 2nd-gen

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Rules for execution](#rules-for-execution)
- [Phase 1 — Scaffolding and README](#phase-1--scaffolding-and-readme)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 2 — File organization](#phase-2--file-organization)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 3 — Class structure](#phase-3--class-structure)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 4 — TypeScript modifier keywords](#phase-4--typescript-modifier-keywords)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 5 — Lit decorators and modifiers](#phase-5--lit-decorators-and-modifiers)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 6 — Property patterns](#phase-6--property-patterns)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 7 — Method patterns](#phase-7--method-patterns)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 8 — JSDoc standards](#phase-8--jsdoc-standards)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 9 — Type definitions and exports (migrate 03_component-types.md)](#phase-9--type-definitions-and-exports-migrate-03component-typesmd)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 10 — Naming conventions](#phase-10--naming-conventions)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 11 — Base class vs concrete class](#phase-11--base-class-vs-concrete-class)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 12 — Mixin, controller, directive, interface (when to use each)](#phase-12--mixin-controller-directive-interface-when-to-use-each)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 13 — Mixin composition](#phase-13--mixin-composition)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 14 — Controller composition](#phase-14--controller-composition)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 15 — Directive composition](#phase-15--directive-composition)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 16 — Interface composition](#phase-16--interface-composition)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 17 — Navigation, cleanup, and reading-level pass](#phase-17--navigation-cleanup-and-reading-level-pass)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Phase 18 — QA](#phase-18--qa)
    - [Goal](#goal)
    - [Deep understanding](#deep-understanding)
    - [Tasks](#tasks)
    - [Deliverable](#deliverable)
- [Summary](#summary)

</details>

<!-- Document content (editable) -->

Based on [SWC-1420-research.md](SWC-1420-research.md).

---

## Rules for execution

1. **Deep understanding required.** Before writing any content in a phase, deeply read all relevant source files, docs, and external references. Do not skim signatures or file names—follow control flow, data flow, decorators, and patterns in full. Surface-level reading is not acceptable.
2. **No assumptions.** If you do not know the answer to something or are unsure about a pattern, convention, or decision, **ask the human**. Do not guess, infer from incomplete information, or make up examples. Every claim in the guide must be verified against the codebase or an authoritative source.
3. **No hallucinations.** Do not document features, tags, methods, or patterns that do not exist in the codebase or in the referenced external docs. If you cannot verify something, flag it as an open question and ask.
4. **Examples from real code.** Good and bad examples must come from actual 2nd-gen component code (Badge, Status Light, Progress Circle, Divider, Asset, Alert Banner, etc.) or be clearly marked as simplified. Do not fabricate code snippets.

---

## Phase 1 — Scaffolding and README

### Goal

Create the directory structure and the entry-point README that ties everything together.

### Deep understanding

- Read `CONTRIBUTOR-DOCS/02_style-guide/README.md` to understand the existing nav format.
- Read `CONTRIBUTOR-DOCS/02_style-guide/01_css/README.md` as the model for a sub-directory README.
- Read the research doc section 7 for the full list of sub-docs.

### Tasks

1. Create directory `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/`.
2. Create `02_typescript/README.md` with:
   - Breadcrumb placeholder and TOC placeholder (generated later by nav script).
   - Purpose and audience (human and agent).
   - Link to Badge as the reference implementation.
   - Numbered list of all sub-docs with one-line descriptions (items 2–18 from research section 7).
   - Link to the migrated component types doc.
   - Links to external references (TypeScript docs, Lit docs, agnostic-ai CODE-STYLE).
3. Add a navigation entry for "2nd-gen TypeScript" to `CONTRIBUTOR-DOCS/02_style-guide/README.md`.

### Deliverable

`02_typescript/README.md` and updated `02_style-guide/README.md`.

---

## Phase 2 — File organization

### Goal

Document copyright headers, import grouping, export patterns, and where types live.

### Deep understanding

- Read `eslint.config.js` for import sort groups (the exact regex patterns and group order).
- Read the copyright header from any 2nd-gen file (e.g. `Badge.base.ts` lines 1–11).
- Read `Badge.base.ts`, `Badge.ts`, `Badge.types.ts`, and both `index.ts` files (core and swc) to understand export patterns.
- Read at least one other component's file set (e.g. Status Light or Progress Circle) to confirm the pattern is consistent.

### Tasks

1. Create `02_typescript/01_file-organization.md`.
2. Cover:
   - Copyright header (Apache 2.0 template).
   - Import grouping and order (reference ESLint `simple-import-sort` groups from research section 5.1).
   - Export patterns for base, concrete, types, and index files.
   - Where types files live (core vs SWC).
3. Include good and bad examples from 2nd-gen components.
4. Write at sixth-grade reading level; validate with Flesch–Kincaid.

### Deliverable

`02_typescript/01_file-organization.md`

---

## Phase 3 — Class structure

### Goal

Document base vs concrete class patterns, section comments, and property/method ordering within sections.

### Deep understanding

- Deeply read `Badge.base.ts` and `Badge.ts` in full (not just excerpts).
- Deeply read at least two other base/concrete pairs (e.g. `StatusLight.base.ts` / `StatusLight.ts`, `ProgressCircle.base.ts` / `ProgressCircle.ts`) to confirm section comment patterns are consistent.
- Read `Divider.base.ts` / `Divider.ts` and `Asset.base.ts` / `Asset.ts` for simpler component variants.
- Note any differences between components in section naming or ordering. If differences exist, ask the human which pattern is canonical.

### Tasks

1. Create `02_typescript/02_class-structure.md`.
2. Cover:
   - Abstract base class (core): location, sections (`API TO OVERRIDE`, `SHARED API`, `IMPLEMENTATION`).
   - Concrete class (SWC): location, sections (`API OVERRIDES`, `API ADDITIONS`, `RENDERING & STYLING`).
   - Section comment format (ASCII separators).
   - Property declarations vs methods: which belong in which section.
3. Use Badge base and concrete classes as primary examples; draw from other 2nd-gen components as needed.
4. Include good and bad examples.

### Deliverable

`02_typescript/02_class-structure.md`

---

## Phase 4 — TypeScript modifier keywords

### Goal

Document `static`, `override`, `public`, `protected`, `private`: what they mean, when they are required, and how to use them correctly.

### Deep understanding

- Read all base classes in `2nd-gen/packages/core/components/` to catalog how `static`, `override`, `public`, `protected`, and `private` are used.
- Read all concrete classes in `2nd-gen/packages/swc/components/` to see how overrides are declared.
- Read mixins (e.g. `sized-mixin.ts`, `observe-slot-presence.ts`, `observe-slot-text.ts`) for protected/public patterns.
- If any usage is ambiguous or inconsistent, ask the human.

### Tasks

1. Create `02_typescript/03_typescript-modifiers.md`.
2. Cover each keyword with:
   - What it does.
   - When it is required vs optional.
   - Good example (from 2nd-gen).
   - Bad example (common mistakes).
3. Emphasize `override` requirement for API overrides.

### Deliverable

`02_typescript/03_typescript-modifiers.md`

---

## Phase 5 — Lit decorators and modifiers

### Goal

Document all Lit decorators used (or usable) in 2nd-gen: `@property`, `@state`, `@query`, `@queryAll`, `@queryAsync`, `@queryAssignedNodes`, `@queryAssignedElements`, `@eventOptions`, and any others found by auditing.

### Deep understanding

- Read the Lit decorators documentation at https://lit.dev/docs/components/decorators/ (or current equivalent).
- Search all `2nd-gen/packages/` TypeScript files for every `lit/decorators` import to catalog which decorators are actually used.
- Read the Lit CEM documentation to understand which decorators/tags feed the Custom Elements Manifest.
- If a decorator is documented by Lit but not used in 2nd-gen, note it and ask the human whether to include it.

### Tasks

1. Audit `lit/decorators` exports and 2nd-gen usage to identify all decorators in play.
2. Create `02_typescript/04_lit-decorators.md`.
3. For each decorator, cover:
   - Purpose.
   - Options and defaults.
   - When to use it.
   - Good and bad examples.
4. Note which decorators feed CEM.

### Deliverable

`02_typescript/04_lit-decorators.md`

---

## Phase 6 — Property patterns

### Goal

Document property ordering, decorator usage, and getter/setter patterns.

### Deep understanding

- Read all properties in `Badge.base.ts` and `Badge.ts` to map public/protected/private/static ordering.
- Read the `fixed` getter/setter in `Badge.base.ts` to understand when a custom getter/setter is used vs Lit's default.
- Read properties in at least two other components to confirm ordering patterns are consistent.
- Read Lit's reactive properties documentation to understand default behavior vs custom accessor behavior.

### Tasks

1. Create `02_typescript/05_property-patterns.md`.
2. Cover:
   - Ordering: public → protected → private; static within section.
   - `@property` usage (cross-reference Lit decorators doc).
   - When to use Lit's default reactive property vs custom getter/setter.
   - Backing fields (e.g. `_fixed`).
3. Good and bad examples.

### Deliverable

`02_typescript/05_property-patterns.md`

---

## Phase 7 — Method patterns

### Goal

Document method ordering, naming conventions, lifecycle methods, and event handlers.

### Deep understanding

- Read all methods in Badge base and concrete classes.
- Read lifecycle method usage across at least three components to identify naming and ordering patterns.
- Read Lit's lifecycle documentation to ensure method names and call order are documented accurately.
- Search 2nd-gen for event handler methods and note the naming pattern used.

### Tasks

1. Create `02_typescript/06_method-patterns.md`.
2. Cover:
   - Ordering: public → protected (lifecycle) → private.
   - Lifecycle method names (`update`, `firstUpdated`, `render`, `connectedCallback`, etc.).
   - Event handler naming.
   - `override` keyword for lifecycle overrides.
3. Good and bad examples.

### Deliverable

`02_typescript/06_method-patterns.md`

---

## Phase 8 — JSDoc standards

### Goal

Document when JSDoc is required, what to include, and how to use each tag. Align with JSDoc spec, Lit docs, and CEM requirements.

### Deep understanding

- Read every JSDoc comment in `2nd-gen/packages/core/components/` and `2nd-gen/packages/swc/components/` to catalog all tags and phrasing patterns used.
- Read Lit's "Documenting components" documentation (https://lit.dev/docs/components/documenting/ or current equivalent).
- Read the JSDoc spec for each tag used: `@internal`, `@attribute`, `@slot`, `@element`, `@example`, `@fires`, `@todo`, `@param`, `@returns`.
- Read the CEM analyzer documentation to understand which JSDoc tags are consumed for manifest generation.
- If unsure whether a tag is required for CEM or merely recommended, ask the human.

### Tasks

1. Audit 2nd-gen JSDoc usage across `core` and `swc` packages.
2. Read Lit "Documenting components" docs and JSDoc spec for tags.
3. Identify which tags are required for CEM generation and which are recommended.
4. Create `02_typescript/07_jsdoc-standards.md`.
5. For each tag, provide:
   - When to use.
   - Format and syntax.
   - Good example from 2nd-gen.
   - Bad example when helpful.
6. Document class-level vs property-level vs method-level JSDoc expectations.

### Deliverable

`02_typescript/07_jsdoc-standards.md`

---

## Phase 9 — Type definitions and exports (migrate 03_component-types.md)

### Goal

Migrate `03_component-types.md` into the TypeScript directory, update it with any missing information, and add general type guidance.

### Deep understanding

- Read `CONTRIBUTOR-DOCS/02_style-guide/03_component-types.md` in full.
- Read every `*.types.ts` file in `2nd-gen/packages/core/components/` to confirm patterns match the doc.
- Read PR 6058 changes (https://github.com/adobe/spectrum-web-components/pull/6058/files) for any patterns that should be added.
- If there are differences between the doc and the code, or between the doc and the PR, ask the human which is correct.

### Tasks

1. Copy `CONTRIBUTOR-DOCS/02_style-guide/03_component-types.md` to `02_typescript/08_component-types.md`.
2. Review and update:
   - Preserve all existing type decisions (they are correct).
   - Add any missing patterns (e.g. event payload types, controller types, shared utility types).
   - Align naming with research section 3.8.
   - Content should be additive, not overriding (per PR 6058 guidance).
3. If general (non-component) type patterns warrant a separate doc, create `02_typescript/09_general-types.md`.
4. Remove or redirect `03_component-types.md` from its old location.

### Deliverable

`02_typescript/08_component-types.md` (and optionally `09_general-types.md`); old `03_component-types.md` removed or redirected.

---

## Phase 10 — Naming conventions

### Goal

Document naming rules for classes, properties, methods, types, and files.

### Deep understanding

- Read class names, property names, method names, type names, and file names across all 2nd-gen components to catalog actual naming patterns.
- Read the constant prefix conventions from `03_component-types.md` (or migrated version).
- If any naming is inconsistent across components, ask the human which pattern is canonical.

### Tasks

1. Create `02_typescript/10_naming-conventions.md` (number may shift if Phase 9 produced two docs).
2. Cover:
   - Class names (PascalCase, `Badge`, `BadgeBase`).
   - Property and method names (camelCase).
   - Type names (PascalCase, no `I`/`T` prefix).
   - Constant names (UPPER_SNAKE_CASE with underscore separators).
   - File names (`Badge.base.ts`, `Badge.types.ts`, etc.).
3. Good and bad examples.

### Deliverable

`02_typescript/10_naming-conventions.md`

---

## Phase 11 — Base class vs concrete class

### Goal

Document what belongs in core (base) vs SWC (concrete) and how to decide.

### Deep understanding

- Read all base classes in `core/components/` and their corresponding concrete classes in `swc/components/` to understand the split.
- Note what is in base but not concrete, and what is in concrete but not base.
- Read research section 3.9 and 3.15 for the documented rules.
- If any component violates the expected split, ask the human whether it is intentional.

### Tasks

1. Create `02_typescript/11_base-vs-concrete.md`.
2. Cover:
   - Core responsibilities (shared behavior, validation, mixins, types; no styles/template/rendering).
   - SWC responsibilities (element registration, styles, `render()`, generation-specific API).
   - Decision guide: when to put code in core vs SWC.
3. Good and bad examples.

### Deliverable

`02_typescript/11_base-vs-concrete.md`

---

## Phase 12 — Mixin, controller, directive, interface (when to use each)

### Goal

Document when to use each composition pattern and how to choose between them.

### Deep understanding

- Read all mixins in `2nd-gen/packages/core/mixins/` to understand the mixin pattern.
- Read all controllers in `2nd-gen/packages/core/controllers/` (or wherever they live) to understand the controller pattern.
- Search 2nd-gen for directive usage (e.g. `classMap`, `when`, `ifDefined`, custom directives).
- Search 2nd-gen for interface definitions and usage.
- Read Lit docs on mixins, controllers, and directives to understand canonical guidance.
- If no controllers, custom directives, or interfaces exist in 2nd-gen yet, ask the human whether to document based on Lit docs alone or wait.

### Tasks

1. Create `02_typescript/12_composition-patterns.md`.
2. Cover:
   - When to use a mixin (shared behavior in the class hierarchy).
   - When to use a controller (optional/attached behavior).
   - When to use a directive (template rendering logic).
   - When to use an interface (structural contracts).
   - Decision flowchart or table.
3. Good and bad examples.

### Deliverable

`02_typescript/12_composition-patterns.md`

---

## Phase 13 — Mixin composition

### Goal

Document how to compose mixins: order, options, and patterns.

### Deep understanding

- Read every mixin in `2nd-gen/packages/core/mixins/` in full (implementation, options, TypeScript signature).
- Read how each base class applies mixins (the `extends SizedMixin(...)` pattern) across all components.
- Note any mixin ordering variations. If inconsistent, ask the human.

### Tasks

1. Create `02_typescript/13_mixin-composition.md`.
2. Cover:
   - Composition pattern (`SizedMixin(ObserveSlotText(ObserveSlotPresence(SpectrumElement, ...)))`)
   - Innermost → outermost order.
   - Options objects (e.g. `noDefaultSize`, `validSizes`).
   - Where to put options.
3. Good and bad examples.

### Deliverable

`02_typescript/13_mixin-composition.md`

---

## Phase 14 — Controller composition

### Goal

Document how to create and use Lit controllers.

### Deep understanding

- Read all files in `2nd-gen/packages/core/controllers/` in full.
- Read how controllers are attached to host components in 2nd-gen.
- Read Lit's controller documentation (https://lit.dev/docs/composition/controllers/).
- If no controllers exist in 2nd-gen, ask the human whether to document based on Lit docs alone or skip.

### Tasks

1. Audit existing controllers in 2nd-gen (e.g. `language-resolution.ts` and others).
2. Create `02_typescript/14_controller-composition.md`.
3. Cover:
   - Creating a controller (implement `ReactiveController`).
   - Attaching to a host (`addController`).
   - Lifecycle (`hostConnected`, `hostDisconnected`, `hostUpdate`, `hostUpdated`).
   - When to use vs mixin.
4. Good and bad examples.

### Deliverable

`02_typescript/14_controller-composition.md`

---

## Phase 15 — Directive composition

### Goal

Document how to use and author Lit directives.

### Deep understanding

- Search all 2nd-gen TypeScript files for `lit/directives` imports to catalog which directives are used.
- Read how those directives are used in `render()` methods across components.
- Read Lit's directive documentation (https://lit.dev/docs/templates/directives/ and https://lit.dev/docs/templates/custom-directives/).
- If no custom directives exist in 2nd-gen, ask the human whether to document custom directive authoring or only built-in usage.

### Tasks

1. Audit directive usage in 2nd-gen (e.g. `classMap`, `when`, custom directives).
2. Create `02_typescript/15_directive-composition.md`.
3. Cover:
   - Using built-in directives (`classMap`, `when`, `ifDefined`, etc.).
   - Authoring custom directives (extend `Directive`, implement `render`/`update`).
   - When to use vs component logic.
4. Good and bad examples.

### Deliverable

`02_typescript/15_directive-composition.md`

---

## Phase 16 — Interface composition

### Goal

Document how to define and consume TypeScript interfaces in SWC.

### Deep understanding

- Search all 2nd-gen TypeScript files for `interface` declarations to catalog usage.
- Read any interface definitions found and how they are consumed.
- If no interfaces exist in 2nd-gen, ask the human whether to document based on TypeScript best practices alone or skip.

### Tasks

1. Audit interface usage in 2nd-gen.
2. Create `02_typescript/16_interface-composition.md`.
3. Cover:
   - When to use `interface` vs `type`.
   - Defining interfaces for callbacks, configs, event payloads.
   - How components consume interfaces.
   - Declaration merging use case.
4. Good and bad examples.

### Deliverable

`02_typescript/16_interface-composition.md`

---

## Phase 17 — Navigation, cleanup, and reading-level pass

### Goal

Wire up all navigation, run the nav script, remove the old `03_component-types.md`, and do a reading-level pass on every doc.

### Deep understanding

- Re-read the contributor-docs-nav skill instructions to ensure the nav script is run correctly.
- Re-read `CONTRIBUTOR-DOCS/02_style-guide/README.md` to confirm what needs updating.
- Read every doc produced in phases 1–16 for reading-level validation.

### Tasks

1. Update `02_typescript/README.md` with final list of sub-docs (now that all exist).
2. Update `CONTRIBUTOR-DOCS/02_style-guide/README.md`:
   - Add "2nd-gen TypeScript" entry pointing to `02_typescript/README.md`.
   - Remove or redirect old `03_component-types.md` entry.
3. Run the contributor-docs nav script to regenerate breadcrumbs and TOC across all new and updated files.
4. Flesch–Kincaid pass: review each doc for sixth-grade reading level; simplify where needed.
5. Verify all internal links (doc-to-doc, doc-to-source, TOC anchors).

### Deliverable

All docs finalized with navigation, breadcrumbs, TOC, and reading-level validation.

---

## Phase 18 — QA

### Goal

Run through the full QA checklist from the ticket.

### Deep understanding

- Re-read the QA checklist from the research doc section 9.
- Re-read the acceptance criteria from the research doc section 2.
- Re-read every doc produced in phases 1–17.

### Tasks

1. Read through the entire guide start to finish.
2. Verify all code examples are accurate and copy-pasteable.
3. Confirm examples reference real code from 2nd-gen components (Badge, Status Light, etc.) or are noted as simplified.
4. Check logical organization and that all sections link to relevant examples.
5. Test all navigation links (README, TOC, in-doc anchors, external links).
6. Validate reading level (Flesch–Kincaid).
7. Flag any issues for revision.

### Deliverable

QA report: list of issues found (if any) or confirmation that all checks pass.

---

## Summary

| Phase | Deliverable |
|-------|-------------|
| 1 | README + style-guide README update |
| 2 | File organization doc |
| 3 | Class structure doc |
| 4 | TypeScript modifiers doc |
| 5 | Lit decorators doc |
| 6 | Property patterns doc |
| 7 | Method patterns doc |
| 8 | JSDoc standards doc |
| 9 | Type definitions doc(s) (migrated) |
| 10 | Naming conventions doc |
| 11 | Base vs concrete doc |
| 12 | Composition patterns doc |
| 13 | Mixin composition doc |
| 14 | Controller composition doc |
| 15 | Directive composition doc |
| 16 | Interface composition doc |
| 17 | Navigation, cleanup, reading-level pass |
| 18 | QA report |
