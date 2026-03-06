# Research: SWC-1420 — TypeScript conventions guide for 2nd-gen

This document captures findings from the SWC-1420 ticket and from the codebase so the new TypeScript style guide can be written accurately and consistently.

---

## 1. Ticket overview

**Goal:** Create a guide that explains how to write TypeScript code in 2nd-gen Spectrum Web Components. The guide should help engineers write code the same way and make code easier to read and maintain. It should be human- and agent-friendly.

**Scope:** The guide will cover component class organization, where to put properties and methods, how to write JSDoc comments, and how to name things. It is based on findings from `CONTRIBUTOR-DOCS/03_project-planning/05_research/SWC-1419_*.md` and uses the **Badge** component as the reference implementation.

**Deliverable:** A style-guide **directory** at `CONTRIBUTOR-DOCS/02_style-guide/02_typescript`, containing multiple markdown files that document the different categories. Navigation links are added to `CONTRIBUTOR-DOCS/02_style-guide/README.md`. The existing `03_component-types.md` should be **migrated** into the new structure (e.g. under `02_typescript/`) and **updated** to include any missing information; the type decisions in that file are correct and must be preserved.

---

## 2. Acceptance criteria (from ticket)

| Criterion | Detail |
|-----------|--------|
| **Location** | Style guide documents in `CONTRIBUTOR-DOCS/02_style-guide/02_typescript` (directory with multiple files) |
| **Coverage** | File structure and organization; class structure (API overrides, shared API, implementation); property/method ordering; **TypeScript modifier keywords** (static, override, public, private, protected); **Lit decorators and modifiers** (@property, @state, @query, @queryAssignedNodes, @eventOptions, etc.); JSDoc requirements and patterns; JSDoc tags (`@internal`, `@attribute`, `@slot`, `@todo`, etc.); type definitions and exports; import organization and grouping; naming conventions; base vs concrete class patterns; **mixin, controller, directive, and interface**—when to use each and **composition/usage docs for all four**; when code goes in core vs SWC |
| **Per-rule content** | Explanation of why the rule exists; code example showing correct usage; code example showing incorrect usage when helpful |
| **Reference** | Guide references Badge as the reference implementation |
| **Readability** | Written at sixth-grade reading level |
| **Navigation** | Organized for easy scanning and searching; navigation links added to `CONTRIBUTOR-DOCS/02_style-guide/README.md` |
| **Format** | Use existing CONTRIBUTOR-DOCS markdown format; code fences with language tags; headers for scanning; table of contents; “good” and “bad” example sections; links to external resources (TypeScript docs, Lit docs) where relevant |

---

## 3. Topics the guide must cover

### 3.1 File organization

- **File header:** Copyright (Apache 2.0) — same pattern as existing 2nd-gen files.
- **Import grouping:** Order enforced by ESLint `simple-import-sort/imports` (see section 5 below for exact groups).
- **Export patterns:** What to export from base, concrete, types, and index files (e.g. `Badge.base.ts`, `Badge.ts`, `Badge.types.ts`, `index.ts`).

### 3.2 Class structure

- **Abstract base class (core):** Lives in `2nd-gen/packages/core/components/<name>/`. Defines API to override, shared API, and implementation (lifecycle, validation). Does not define `render()` or component styles.
- **Concrete class (SWC):** Lives in `2nd-gen/packages/swc/components/<name>/`. Extends base; provides API overrides, API additions, and “Rendering & styling” (styles + `render()`).
- **Section comments:** Badge uses clear block comments:
  - Base: `API TO OVERRIDE`, `SHARED API`, `IMPLEMENTATION`
  - Concrete: `API OVERRIDES`, `API ADDITIONS`, `RENDERING & STYLING`
- **Property declarations vs methods:** Properties grouped by section; methods (including lifecycle) live in IMPLEMENTATION or RENDERING & STYLING as appropriate.

### 3.3 TypeScript modifier keywords (static, override, public, private, protected)

The guide must explain the difference and usage of **TypeScript** modifier keywords:

- **static** — Class-level members (e.g. `VARIANTS`, `VALID_SIZES`); not on instances.
- **override** — Required when a subclass redefines a base class method or property; use for API overrides in concrete classes.
- **public** — Default for class members; part of the component API.
- **protected** — For subclass or mixin use (e.g. lifecycle methods, `hasIcon`); not part of public API.
- **private** — Implementation detail (e.g. backing field `_fixed`); not visible to subclasses.

Include when each is required vs optional, and good/bad examples (e.g. forgetting `override`, using `private` for something subclasses need).

### 3.4 Lit decorators and modifiers

Create a dedicated topic for **all Lit decorators/modifiers**. The guide must cover:

- **@property()** — Public reactive properties; attribute reflection; options (type, reflect, attribute, etc.).
- **@state()** — Internal reactive state that does not reflect to attributes; use for UI-only state.
- **@query()** / **@queryAll()** / **@queryAsync()** — Querying shadow root for elements.
- **@queryAssignedNodes()** / **@queryAssignedElements()** — Slot content.
- **@eventOptions()** — Event listener options (capture, passive, etc.).

Document when to use each, options, and good/bad examples. Add any other Lit decorators or modifier keywords used in 2nd-gen (audit `lit/decorators` and 2nd-gen usage).

### 3.5 Property patterns

- **Order:** Public first, protected second, private last. Static properties appear with their section (e.g. static overrides in “API TO OVERRIDE”).
- **Decorators:** `@property` for public reactive state; reflect when they map to attributes. Backing fields (e.g. `_fixed`) when using custom getters/setters.
- **Getters and setters:** Document when to use **Lit’s default reactive property** (no custom getter/setter) vs when to implement a **custom getter/setter** (e.g. side effects, validation, or non-standard attribute handling). Use `@todo` in JSDoc when behavior is non-obvious or may be simplified later (see Badge `fixed` in base). The `@todo` tag itself is documented in the JSDoc standards section.

### 3.6 Method patterns

- **Order:** Public first, protected (e.g. lifecycle) second, private last.
- **Naming:** Conventions for lifecycle (`update`, `firstUpdated`, `render`), event handlers, and private helpers.
- **Override:** Use `override` keyword when overriding base class methods.

### 3.7 JSDoc standards

This section needs substantial detail. When drafting the guide:

1. **Deep-read 2nd-gen JSDoc usage** — Audit `2nd-gen/packages/core` and `2nd-gen/packages/swc` for class, property, and method JSDoc; document the patterns actually used (tags, phrasing, examples).
2. **Align with JSDoc and Lit documentation** — Use [JSDoc](https://jsdoc.app/) and [Lit “Documenting components”](https://lit.dev/docs/components/documenting/) (or current Lit docs) to fill gaps and ensure tag usage is correct. Capture patterns suggested by those sources and adapt them to SWC (e.g. `@attribute`, `@slot`, `@element`, `@fires` for custom elements).

**Content to include:**

- **When required:** All public and protected APIs (classes, properties, methods).
- **What to include:** Short description; when relevant, attribute name, slot name, valid values, and linkage to types.
- **Tags to document with examples:**
  - `@internal` — not for customer use; used in validation, tests, stories.
  - `@attribute` — for reflected attributes (e.g. `@attribute {ElementSize} size`).
  - `@slot` — default slot and named slots (e.g. `@slot - Text label`, `@slot icon - Optional icon...`).
  - `@todo` — future work, tech debt, migration notes.
  - `@element` — custom element name (in concrete class only, e.g. `@element swc-badge`).
  - `@example` — one or more usage snippets (concrete class).
- **Clarity:** Write clear, concise descriptions; avoid jargon where possible (sixth-grade reading level).

### 3.8 Type patterns

- **Relationship to `03_component-types.md`:** The existing `03_component-types.md` will be **migrated** into `02_typescript/` and **updated** to include any missing information; the type decisions in that file are correct and must be preserved. That doc defines patterns for `*.types.ts` in `core/components/*/`: file location, naming, constant prefixes, S1/S2 split, section order, `as const` and `satisfies`, type derivation, S1 removal strategy, anti-patterns. The guide’s type section is that migrated doc (or links to it and summarizes); ensure nothing is missing and no conflicts.
- **Category split:** If “component types” (variant/size/static-color constants and derived types in `*.types.ts`) differ from other type categories (e.g. event payloads, controller types, shared utility types), consider giving each category its own doc under `02_typescript/` (e.g. `component-types.md` that deep-links or mirrors `03_component-types.md`, plus `general-types.md` or similar if needed).
- **Summary of type guidance:** Where types live; unions for variants; `as const` and `satisfies`; type exports; avoiding `any`; and any general TypeScript type patterns (see section 6 for baseline CODE-STYLE).

### 3.9 Base class vs concrete class

- **Base (core):** Shared behavior, validation, slot observation, mixins. Declares abstract or override-only API (e.g. `VARIANTS_COLOR`, `VARIANTS`, `variant`). No styles, template, or rendering.
- **Concrete (SWC):** Element name, styles, `render()`, and any S2-only props (e.g. `subtle`, `outline`). Sets static override values (e.g. `VARIANTS_COLOR`, `VARIANTS`, `VALID_SIZES`). All rendering logic.

### 3.10 Mixin, controller, directive, and interface

Add to the topics the guide must cover:

- **When to use a mixin** — Reusable behavior composed into a base class (e.g. `SizedMixin`, `ObserveSlotPresence`). Use when multiple components share the same behavior and it fits a “wrap the base class” pattern.
- **When to use a controller** — Lit controllers attach to a host component and manage lifecycle/scoped logic (e.g. focus, async). Use when behavior is optional or not part of the core class hierarchy.
- **When to use a directive** — Lit directives affect template rendering (e.g. `classMap`, `when`). Use for reusable template logic, not for component state or API.
- **When to use an interface** — TypeScript interfaces for contracts (e.g. when a component accepts a callback shape or a config object). Use when you need structural typing or declaration merging; otherwise prefer `type` (see baseline CODE-STYLE in section 6).

Include how to reason about choosing among these (e.g. “same behavior on many components” → mixin; “optional attached behavior” → controller).

**Composition docs for all four:** The guide must include composition/usage documentation for **mixin**, **controller**, **directive**, and **interface**—not only mixin. Each topic should cover how to compose or use the pattern, with examples (e.g. mixin composition order and options; controller host connection and lifecycle; directive usage in templates; interface implementation and consumption).

### 3.11 Mixin composition

- **Pattern:** Base class is built by composing mixins with `SpectrumElement`. Example:  
  `SizedMixin(ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ''), { noDefaultSize: true })`.
- **Order:** Innermost = base element + first behavior; outermost = size. Options object passed where the mixin supports it (e.g. `noDefaultSize`, `validSizes`).
- **Documentation:** Guide should explain this pattern and where to put mixin options.

### 3.12 Controller composition

- Document how to create and attach controllers to a host component; lifecycle (host connected, disconnected); when to use vs mixin. Own topic with examples.

### 3.13 Directive composition

- Document how to use existing directives in templates and how to author custom directives when needed; when to use vs component logic. Own topic with examples.

### 3.14 Interface composition

- Document how to define interfaces for callbacks/configs and how components consume them; when to use `interface` vs `type`. Own topic with examples.

### 3.15 When code goes in core vs SWC

- **Core:** Shared logic, types, validation, slot observation, and any behavior that must be the same for 1st-gen and 2nd-gen. No Spectrum-specific styling or template.
- **SWC:** Element registration, styles, template, and 2nd-gen-only API (e.g. `subtle`, `outline`). Imports from core.

---

## 4. Reference implementation: Badge

### 4.1 File layout

| File | Package | Purpose |
|------|---------|---------|
| `Badge.types.ts` | core | Const arrays and types for sizes, variants, fixed values. Exported for base and SWC. |
| `Badge.base.ts` | core | Abstract base: mixins, API to override, shared API, implementation (e.g. `update` validation). |
| `Badge.ts` | swc | Concrete class: overrides, S2-only props, `styles`, `render()`. |
| `badge.css` | swc | Component styles. |
| `index.ts` (core) | core | Re-exports base and types. |
| `index.ts` (swc) | swc | Re-exports component (and may re-export from core as needed). |

### 4.2 Badge base class (excerpts)

- **Copyright:** Lines 1–11, Apache 2.0.
- **Imports:** Lit → internal (`@spectrum-web-components/core`) → local types.
- **Class JSDoc:** Component description + `@attribute` (size) + `@slot` (default and `icon`).
- **Sections:**  
  `API TO OVERRIDE` (static + `variant`),  
  `SHARED API` (static constants, `fixed` getter/setter + `_fixed`),  
  `IMPLEMENTATION` (`hasIcon` getter, `update()` with validation).
- **Tags used:** `@internal`, `@attribute`, `@slot`, `@todo` (on `fixed`).
- **Override pattern:** Subclass sets `static override readonly VARIANTS_COLOR`, `VARIANTS`, and overrides `variant` with narrowed type.

### 4.3 Badge concrete class (excerpts)

- **Imports:** Lit (including directives) → core badge + types → local styles.
- **Class JSDoc:** Same description as base + `@element swc-badge` + two `@example` blocks.
- **Sections:**  
  `API OVERRIDES` (static overrides, `variant` override),  
  `API ADDITIONS` (`subtle`, `outline` with `@todo` for moving to base later),  
  `RENDERING & STYLING` (`styles`, `render()`).
- **Tags used:** `@internal`, `@element`, `@example`, `@todo`.

### 4.4 Badge.types.ts patterns

- Copyright and optional `@todo` for S1 removal.
- `as const` arrays; derived types via `(typeof X)[number]`.
- `satisfies ElementSize[]` for size arrays.
- Export const arrays and types; no default export.
- Full patterns (section order, S1/S2 split, anti-patterns) are in `03_component-types.md`.

---

## 5. Existing conventions (enforced or documented)

### 5.1 Import order (ESLint)

From `eslint.config.js`, `simple-import-sort/imports` groups (in order):

1. Lit and external: `^lit`, `^@lit`, then other external packages (excluding `@adobe/spectrum-wc` and `@spectrum-web-components`).
2. Internal: `^@adobe/spectrum-wc`, `^@spectrum-web-components`.
3. Side-effect: `^\u0000`.
4. Relative: `^\.`.
5. Styles: `^.+\.(css|scss|sass|less|styl)$`.

Extensions: `.js` always for imports; `.ts` never (config: `js: 'always', ts: 'never'`).

### 5.2 CONTRIBUTOR-DOCS style guide format

- **Breadcrumbs:** Generated; do not edit (comment in existing docs).
- **TOC:** Generated; do not edit; `<details open>` with “In this doc” / “Beneath this doc”.
- **Structure:** H1 = document title; H2/H3 for sections; consistent heading hierarchy.
- **Code:** Fenced with language tags (e.g. `ts`, `css`).
- **References:** Links to other style guide docs and to 2nd-gen source (e.g. Badge) as reference implementations.
- **Contributor TL;DR:** Short bullet list at top (see Component CSS doc).
- **Good/bad examples:** Explicit “good” and “bad” (or “avoid”) where helpful.

### 5.3 Linting (02_linting-tools.md)

- Copyright headers, import sorting, and JSDoc are mentioned. The new guide should align with ESLint JSDoc rules (e.g. `jsdoc/check-param-names`, `jsdoc/tag-lines`, etc.) without duplicating the full lint doc.

---

## 6. External references

### 6.1 Baseline TypeScript style (agnostic-ai CODE-STYLE.md)

**Source:** https://github.com/betagouv/agnostic-ai/blob/main/templates/plugins/lang-typescript/context/CODE-STYLE.md

Use this as a baseline for general TypeScript style; append SWC-specific rules in a similar format (good/bad examples, clear headings). Summary of content to align with or reference:

- **tsconfig:** The guide’s tsconfig section must reflect the **tsconfig in this repo**. When drafting, pull correct compiler options and values from the repository (e.g. `2nd-gen/` or root tsconfig); do not copy the agnostic-ai list verbatim. Typical areas: strict, target, module, noUncheckedIndexedAccess, noUnusedLocals/Parameters, noImplicitReturns, noFallthroughCasesInSwitch.
- **Types over interfaces:** Prefer `type` for most cases; use `interface` for declaration merging or extensible public APIs.
- **Naming:** PascalCase for types; no `I` or `T` prefixes; descriptive union names.
- **Avoid enums:** Use `as const` objects or union types.
- **Annotations:** Annotate parameters and public API returns; infer variables when obvious; use `import type` and inline type imports.
- **Utility types:** Partial, Required, Readonly, Omit, Pick; generic patterns.
- **Discriminated unions, template literal types, conditional types:** With examples.
- **Type guards:** Custom type guards, narrowing; optional zod for validation.
- **Avoid `any`:** Use `unknown` and narrow, or generics; type assertions only when necessary.
- **Function types and generics:** Signatures, async, generic constraints, default generic params.
- **Modules:** Organization, barrel re-exports.
- **Strict null checks, type-only imports, const assertions:** With examples.
- **React sections in baseline:** Not applicable to SWC as-is; replace with Lit/component equivalents where applicable (e.g. component props, lifecycle, event typing).

### 6.2 Component types (PR 6058)

https://github.com/adobe/spectrum-web-components/pull/6058 — Staged PR for component types; not full ticket scope but a useful reference for type patterns. Confirm which patterns are final when drafting the guide.

### 6.3 Testing docs split (PR 6059)

https://github.com/adobe/spectrum-web-components/pull/6059 — Adds testing guide at `CONTRIBUTOR-DOCS/02_style-guide/04_testing-conventions.md` and later “broke testing guide into pages” (directory with multiple files, nav in README). Use this as inspiration for the TypeScript docs split:

- Directory `02_typescript/` with multiple markdown files (e.g. `README.md`, `class-structure.md`, `jsdoc.md`, `types.md`, `modifiers.md`) and a generated TOC in README, similar to the testing structure.

Ensure the style guide README lists the TypeScript section and links to the directory or main doc.

---

## 7. Suggested guide structure (directory `02_typescript/`)

Reflects deliverable as a directory and feedback (TypeScript vs Lit modifiers, JSDoc depth, types migration, composition docs for all four patterns, getters/setters).

1. **README.md** — Overview: purpose, audience (human and agent), how to use the guide, link to Badge; list of sub-docs with short descriptions; link to component types doc (migrated from `03_component-types.md`).
2. **File organization** — Copyright header; import grouping and order; export patterns; where types live.
3. **Class structure** — Base vs concrete; section comments (API to override, shared API, implementation, rendering & styling); ordering of properties and methods.
4. **TypeScript modifier keywords** — static, override, public, protected, private; when each is required; good/bad examples.
5. **Lit decorators and modifiers** — Dedicated topic for all Lit decorators: @property, @state, @query / @queryAll / @queryAsync, @queryAssignedNodes / @queryAssignedElements, @eventOptions; when to use each; options; good/bad examples. Audit 2nd-gen for any others.
6. **Property patterns** — Public / protected / private order; use of @property (see Lit topic); getters and setters (when to use Lit default vs custom getter/setter); static placement.
7. **Method patterns** — Order; naming; `override`; lifecycle methods.
8. **JSDoc standards** — When required; what to include; tags (`@internal`, `@attribute`, `@slot`, `@todo`, `@element`, `@example`) with examples; clarity and reading level. Expand by auditing 2nd-gen and aligning with JSDoc/Lit docs.
9. **Type definitions and exports** — Migrate and update `03_component-types.md` into this directory; preserve type decisions; add missing information. Coverage of `*.types.ts`, unions, `as const` and `satisfies`, avoiding `any`. If component types vs other type categories differ, consider separate docs (e.g. `component-types.md` plus optional `general-types.md`).
10. **Naming conventions** — Classes, properties, methods, types, files.
11. **Base class vs concrete class** — Responsibilities; what lives in core vs SWC.
12. **Mixin, controller, directive, interface** — When to use each; how to reason about choosing.
13. **Mixin composition** — Order, options, where to put mixin options; examples.
14. **Controller composition** — Own topic/doc: create and attach; lifecycle; when to use vs mixin; examples.
15. **Directive composition** — Own topic/doc: use in templates; author custom; when to use vs component logic; examples.
16. **Interface composition** — Own topic/doc: define interfaces; how components consume; when to use `interface` vs `type`; examples.
17. **Good and bad examples** — **Include good and bad examples in every doc**, not only in a single section. Examples can come from **any 2nd-gen component** (Badge, Status Light, etc.), not only Badge; use simplified snippets when helpful.
18. **References** — Links to TypeScript docs, Lit docs, Badge source, agnostic-ai CODE-STYLE.

---

## 8. Open questions

- **Single entry vs multiple files:** **Decided:** Use multiple markdown files under `02_typescript/` with a README, following testing-docs inspiration.
- **PR 6058:** Type patterns from the PR should be close to final; guide content should be **additive**, not overriding (extend and align with existing patterns rather than replacing them).
- **Sixth-grade reading level:** Use **Flesch–Kincaid** (or similar) for reading level validation when drafting and reviewing.
- **JSDoc and CEM:** `@attribute`, `@slot`, and related tags **do feed Custom Elements Manifest**. Deeply understand Lit’s documentation and CEM tooling to identify **required or useful tags** and document them in the guide (e.g. which tags are required for CEM, which are recommended for Lit components).

---

## 9. QA checklist (from ticket)

- [ ] Read through guide start to finish.
- [ ] Ensure all code examples are accurate and copy-pasteable.
- [ ] Verify examples reference real code from 2nd-gen components (Badge, Status Light, etc.) or note when simplified.
- [ ] Confirm guide is easy to understand (e.g. review with someone unfamiliar).
- [ ] Check logical organization and that all sections link to relevant examples.
- [ ] Test navigation links (README, TOC, in-doc anchors).
- [ ] Review with at least two engineers for accuracy.

---

## 10. Next steps

1. Create directory `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/` and add markdown files per section 7.
2. **Migrate** `03_component-types.md` into `02_typescript/` (or equivalent); **update** it to include any missing information; **preserve** the type decisions in that file.
3. Populate each file with: rationale, correct examples (from Badge where possible), incorrect examples where helpful.
4. Add navigation to `CONTRIBUTOR-DOCS/02_style-guide/README.md` for the TypeScript section; update or remove the old `03_component-types.md` link as needed.
5. Run the contributor-docs nav script to regenerate breadcrumbs and TOC (see `.cursor/rules/contributor-doc-update.mdc` or contributor-docs-nav skill).
6. Run through the QA checklist and incorporate reviewer feedback.
