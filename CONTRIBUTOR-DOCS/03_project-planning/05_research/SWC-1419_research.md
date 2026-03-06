<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / [Research](README.md) / 2nd-gen component review: patterns and findings

<!-- Document title (editable) -->

# 2nd-gen component review: patterns and findings

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Executive summary](#executive-summary)
- [Pattern comparison table](#pattern-comparison-table)
- [Detailed findings by category](#detailed-findings-by-category)
    - [1. TypeScript patterns](#1-typescript-patterns)
    - [2. CSS patterns](#2-css-patterns)
    - [3. Testing patterns](#3-testing-patterns)
    - [4. File structure patterns](#4-file-structure-patterns)
    - [5. Accessibility patterns](#5-accessibility-patterns)
    - [6. Stories patterns](#6-stories-patterns)
- [Findings organized by category](#findings-organized-by-category)
    - [Consistent patterns (what we are doing the same)](#consistent-patterns-what-we-are-doing-the-same)
    - [Inconsistent patterns (what varies between components)](#inconsistent-patterns-what-varies-between-components)
    - [Good patterns (what works well)](#good-patterns-what-works-well)
    - [Anti-patterns (what should be avoided)](#anti-patterns-what-should-be-avoided)
    - [Missing patterns (what should be added)](#missing-patterns-what-should-be-added)
- [Recommendations for standardization](#recommendations-for-standardization)
    - [Priority 1: Fix existing bugs](#priority-1-fix-existing-bugs)
    - [Priority 2: Standardize CSS patterns](#priority-2-standardize-css-patterns)
    - [Priority 3: Standardize TypeScript patterns](#priority-3-standardize-typescript-patterns)
    - [Priority 4: Standardize testing patterns](#priority-4-standardize-testing-patterns)
    - [Priority 5: Standardize accessibility patterns](#priority-5-standardize-accessibility-patterns)
    - [Priority 6: Standardize stories patterns](#priority-6-standardize-stories-patterns)
- [Summary: what should go in future style guides](#summary-what-should-go-in-future-style-guides)

</details>

<!-- Document content (editable) -->

## Executive summary

This document reviews all five existing 2nd-gen components — **Badge**, **Status Light**, **Progress Circle**, **Divider**, and **Asset** — to catalog TypeScript, CSS, testing, file structure, and accessibility patterns. The goal is to identify what is consistent, inconsistent, working well, problematic, and missing, so that future style guides and code-quality standards can be grounded in evidence from the existing codebase.

**Key findings:**

- The core/SWC split architecture is well-designed and consistently applied across all five components.
- TypeScript class structure follows a clear abstract-base → concrete-implementation pattern with good use of mixins.
- CSS has the most inconsistency: naming conventions mix (BEM vs Spectrum-legacy), specificity management varies, and some files contain significant bugs.
- Testing patterns are now standardized around five expected section categories, but adoption is uneven across components.
- Accessibility coverage has improved: all five components now include ARIA snapshot specs and are covered by global aXe validation in the Storybook test runner.
- CSS generally aligns with the contributor style guides, with a few implementation-level divergences still worth standardizing.

---

## Pattern comparison table

| Pattern | Badge | Status Light | Progress Circle | Divider | Asset |
|---|---|---|---|---|---|
| **Core: base class** | `BadgeBase` | `StatusLightBase` | `ProgressCircleBase` | `DividerBase` | `AssetBase` |
| **Core: types file** | Yes (86 lines) | Yes (92 lines) | Yes (33 lines) | Yes (25 lines) | Yes (16 lines) |
| **Core: index.ts** | barrel export | barrel export | barrel export | barrel export | barrel export |
| **SWC: class** | `Badge` | `StatusLight` | `ProgressCircle` | `Divider` | `Asset` |
| **SWC: CSS file** | 365 lines | 186 lines | 121 lines | 73 lines | 56 lines |
| **SWC: index.ts** | defineElement | defineElement | defineElement | defineElement | defineElement |
| **SWC: test file** | Yes (309 lines) | Yes (174 lines) | Yes (312 lines) | Yes (110 lines) | Yes (150 lines) |
| **SWC: a11y spec** | Yes (87 lines) | Yes (71 lines) | Yes (103 lines) | Yes (84 lines) | Yes (75 lines) |
| **SWC: stories** | Yes (495 lines) | Yes (343 lines) | Yes (286 lines) | Yes (258 lines) | Yes (195 lines) |
| **Extends** | `SizedMixin(ObserveSlotText(ObserveSlotPresence(...)))` | `SizedMixin(SpectrumElement)` | `SizedMixin(SpectrumElement)` | `SizedMixin(SpectrumElement)` | `SpectrumElement` |
| **Mixins used** | SizedMixin, ObserveSlotText, ObserveSlotPresence | SizedMixin | SizedMixin | SizedMixin | None |
| **Has variants** | Yes (semantic + color) | Yes (semantic + color) | No (has static-color) | No (has static-color) | Yes (file/folder) |
| **Has sizes** | s, m, l, xl | s, m, l, xl | s, m, l | s, m, l | None |
| **S1/S2 split in types** | Yes | Yes | Yes | No | No |
| **Debug warnings** | variant, outline+non-semantic | variant, disabled (S1) | accessible name | None | variant |
| **ARIA handling** | None (non-interactive) | None (non-interactive) | role, aria-label, aria-value* | role=separator, aria-orientation | aria-label on SVGs |
| **Lifecycle hook** | `update()` | `updated()` | `firstUpdated()` + `updated()` | `firstUpdated()` + `updated()` | `updated()` |
| **CSS class prefix** | `swc-Badge` | `swc-StatusLight` | `swc-ProgressCircle` | `swc-Divider` | `spectrum-Asset` |
| **CSS `:where()` used** | Yes (subtle variants) | No | Yes (static colors) | Yes (static + size combos) | No |
| **CSS forced-colors** | No | Yes | Yes | Yes | No |
| **CSS `token()` usage** | Yes | Yes | Yes | Yes | Yes |
| **Styles declaration** | `static get styles()` | `static get styles()` | `static get styles()` | `static styles =` | `static get styles()` |
| **Meta export pattern** | `export const meta` + default | `export const meta` + default | Named const + default | `const meta` + default | `const meta` + default |

---

## Detailed findings by category

### 1. TypeScript patterns

#### 1.1 Class structure

All five components follow the same abstract-base → concrete-implementation pattern:

```
Core: ComponentBase (abstract) → extends SizedMixin(SpectrumElement)
SWC:  Component (concrete)     → extends ComponentBase
```

**Section separators** are used consistently in class bodies with ASCII line patterns:

```typescript
// ─────────────────────────
//     API TO OVERRIDE
// ─────────────────────────

// ──────────────────
//     SHARED API
// ──────────────────

// ──────────────────────
//     IMPLEMENTATION
// ──────────────────────
```

The SWC classes use slightly different section names:

```typescript
// ────────────────────
//     API OVERRIDES
// ────────────────────

// ───────────────────
//     API ADDITIONS
// ───────────────────

// ──────────────────────────────
//     RENDERING & STYLING
// ──────────────────────────────
```

**Inconsistency**: Divider's SWC class only has `RENDERING & STYLING` (no `API OVERRIDES` section). Asset's base class has `API TO OVERRIDE`, `SHARED API`, and `IMPLEMENTATION` sections. Badge's SWC class has `API OVERRIDES`, `API ADDITIONS`, and `RENDERING & STYLING`. This is mostly good — the sections vary by what the component needs.

#### 1.2 Property declaration order

Across base classes, the general order is:

1. Static readonly properties (`VARIANTS`, `VARIANTS_COLOR`, `VARIANTS_SEMANTIC`, etc.)
2. Public properties with `@property` decorators (`variant`, `fixed`, `staticColor`, etc.)
3. Private/protected properties
4. Lifecycle methods (`firstUpdated`, `updated`, `update`)

In SWC classes:

1. Static overrides (`VARIANTS`, `VALID_SIZES`, etc.)
2. Property overrides (`variant`)
3. New properties (`subtle`, `outline`)
4. Static `styles` getter/property
5. `render()` method

**Inconsistency**: The styles declaration varies:

| Component | Pattern |
|---|---|
| Badge | `public static override get styles(): CSSResultArray { return [styles]; }` |
| Status Light | `public static override get styles(): CSSResultArray { return [styles]; }` |
| Progress Circle | `public static override get styles(): CSSResultArray { return [styles]; }` |
| Divider | `public static override styles: CSSResultArray = [styles];` |
| Asset | `public static override get styles(): CSSResultArray { return [styles]; }` |

Divider uses a static property assignment while the others use a getter. Both are valid Lit patterns, but should be standardized.

#### 1.3 Decorator usage

All components use:
- `@property({ type: String, reflect: true })` for variant
- `@property({ type: Boolean, reflect: true })` for booleans (Badge: subtle/outline, Divider: vertical)
- `@property({ reflect: true, attribute: 'static-color' })` for static-color (Progress Circle, Divider)

**Inconsistency**: Property decorator options vary:

| Property | Decorator |
|---|---|
| Badge `variant` | `@property({ type: String, reflect: true })` |
| Status Light `variant` | `@property({ type: String, reflect: true })` |
| Asset `variant` | `@property({ type: String, reflect: true })` |
| Badge `fixed` | `@property({ reflect: true })` — custom getter/setter |
| Progress Circle `label` | `@property({ type: String })` — no reflect |
| Progress Circle `progress` | `@property({ type: Number })` — no reflect |
| Asset `label` | `@property()` — no type, no reflect |

The `label` property on Asset has no `type` specified while Progress Circle specifies `type: String`. These should be consistent.

#### 1.4 JSDoc patterns

**Class-level JSDoc** varies significantly:

| Component | Class JSDoc |
|---|---|
| Badge base | Description + `@attribute` + `@slot` |
| Badge SWC | Description + `@element` + `@example` (2 examples) |
| Status Light base | Description + `@slot` |
| Status Light SWC | Description + `@element` + `@example` (2 examples) |
| Progress Circle base | Description + `@attribute` + `@slot` + `@todo` |
| Progress Circle SWC | Description + `@element` + `@property` + `@example` (2 examples) |
| Divider base | `@element` only (no description) |
| Divider SWC | `@element` only (no description) |
| Asset base | No class-level JSDoc |
| Asset SWC | `@element` + `@slot` + `@example` (4 examples, one is a duplicate) |

**Inconsistencies**:
- `@element` tag is used in some base classes (Divider) but not others (Badge, Status Light, Asset).
- `@attribute` appears in Badge base and Progress Circle base but not Status Light or Asset.
- `@slot` is documented in Badge base, Status Light base, Progress Circle base, and Asset SWC, but not Divider (which has no slots, so this is correct).
- `@example` is only used in SWC classes.
- `@todo` tags appear frequently but inconsistently.
- Duplicate `@example` tag in Asset SWC.

**`@internal` usage** is consistent: all static readonly properties that are internal use `@internal` in their JSDoc.

#### 1.5 Debug warning patterns

Four of five components implement debug-mode validation:

| Component | Lifecycle | What is validated |
|---|---|---|
| Badge | `update()` | Variant validity, outline with non-semantic |
| Status Light | `updated()` | Variant validity, disabled attribute (S1 only) |
| Progress Circle | `updated()` | Accessible name presence |
| Divider | None | No validation |
| Asset | `updated()` | Variant validity |

**Inconsistency**: Badge uses `update()` while the others use `updated()`. Both work, but `updated()` is more standard for post-render validation. Divider has no validation at all — it has a `@todo` note to add it.

The warning pattern is consistent when present:

```typescript
if (window.__swc?.DEBUG) {
  const constructor = this.constructor as typeof ComponentBase;
  if (!constructor.VARIANTS.includes(this.variant)) {
    window.__swc.warn(this, message, url, { issues: [...constructor.VARIANTS] });
  }
}
```

#### 1.6 Type definition patterns

Types files follow a consistent pattern:

```typescript
export const COMPONENT_VALID_SIZES = ['s', 'm', 'l'] as const satisfies ElementSize[];
export const COMPONENT_VARIANTS = ['a', 'b', 'c'] as const;
export type ComponentVariant = (typeof COMPONENT_VARIANTS)[number];
```

**Inconsistency**: Naming prefixes vary:

| Component | Prefix |
|---|---|
| Badge | `BADGE_` |
| Status Light | `STATUSLIGHT_` |
| Progress Circle | `PROGRESS_CIRCLE_` |
| Divider | `DIVIDER_` |
| Asset | `ASSET_` |

Status Light uses `STATUSLIGHT_` (no separator) while Progress Circle uses `PROGRESS_CIRCLE_` (underscore separator). All should follow the same convention.

#### 1.7 Import organization

Imports follow a consistent grouping pattern across all components:

1. Lit core imports (`lit`, `lit/decorators.js`, `lit/directives/*`)
2. Core package imports (`@spectrum-web-components/core/*`)
3. Local imports (`./Component.css`, `./Component.types.js`)

**Inconsistency**: In stories and tests, package-level imports consistently use aliases (for example `@adobe/spectrum-wc/badge`), but several files still import core types via deep relative paths (for example `../../../../core/components/badge/Badge.types.js`). Based on contributor feedback, we should standardize on alias-first imports where possible to reduce path fragility.

---

### 2. CSS patterns

#### 2.1 Re-evaluation against current CSS contributor docs

This section was re-reviewed against the current contributor style guides:

- `CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md`
- `CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md`
- `CONTRIBUTOR-DOCS/02_style-guide/01_css/03_component-css-pr-checklist.md`
- `CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md`

The findings below distinguish between:

1. **Intentional patterns** already documented in the guides, and
2. **Actual divergences** that should be cleaned up.

#### 2.2 Rule order and selector organization

All five components largely follow the documented order:

1. `:host`
2. Universal box-sizing reset
3. Base component class
4. Subcomponent selectors
5. Size variants on `:host([size="..."])`
6. Variant/state selectors
7. `@media (forced-colors: active)` when needed

`StatusLight` uses `*, *::before` instead of just `*`, which is aligned with the style guide guidance to include pseudo-elements when they are used.

#### 2.3 Custom property strategy

The private/public naming model is consistent with the CSS docs:

- Private/internal: `--_swc-*`
- Exposed/public: `--swc-*`

`Asset` is the outlier with no component custom properties, which is acceptable for a simpler component but still coupled to older Spectrum class names (see class naming below).

#### 2.4 Class naming and migration alignment

Four components use the expected SWC class namespace (`.swc-*`).  
`Asset` still uses `.spectrum-Asset*` classes, which diverges from the migration guidance to update class/custom-property prefixes from Spectrum to SWC.

#### 2.5 Variant selector strategy (intentional behavior)

Badge and Status Light use:

- `:host([variant="..."])` for semantic variants
- Internal class selectors for non-semantic color variants

Based on the custom properties guide, this is an intentional API boundary:

- `:host()` selectors preserve exposed custom property overrides
- Internal classes represent implementation-only variants where overrides are intentionally not exposed

So this is not a bug by itself; it is a documented design pattern.

#### 2.6 Specificity and `:where()`

`Badge`, `ProgressCircle`, and `Divider` use `:where()` where class selector compounding would otherwise increase specificity.  
`StatusLight` and `Asset` currently have fewer compounded selectors, so lack of `:where()` there is not inherently incorrect.

One concrete issue remains in this area: `StatusLight` still renders `swc-StatusLight--size*` classes that are not consumed by CSS selectors, matching the anti-pattern of unused variant classes in render output.

#### 2.7 Forced-colors and high-contrast patterns

| Component | Has forced-colors styles | Notes |
|---|---|---|
| Badge | No | No component-specific forced-colors block currently |
| Status Light | Yes | Uses `forced-color-adjust: none` and explicit dot border |
| Progress Circle | Yes | Includes nested scheme handling inside forced-colors |
| Divider | Yes | Uses `CanvasText` override |
| Asset | No | No component-specific forced-colors block currently |

Per the style guide, forced-colors styles are required **only when browser defaults are insufficient**.  
Therefore, absence in Badge/Asset should be treated as an explicit accessibility validation task, not automatically as a bug.

#### 2.8 Current CSS issues still worth tracking

Most previously reported Badge/Status Light CSS typos appear to be fixed in current source.

Remaining issues:

1. **Status Light**: render includes size modifier classes (`swc-StatusLight--size*`) that are not used in CSS.
2. **Asset**: class naming still uses `spectrum-*` instead of the SWC class namespace used elsewhere.
3. **Progress Circle**: forced-colors block sets `--swc-progress-circle-track-color`, while the stylesheet primarily consumes `--swc-progress-circle-track-border-color`; this looks like a likely token/variable mismatch to verify.

---

### 3. Testing patterns

#### 3.1 Test file organization

All tests follow the same Storybook-based pattern:

```typescript
// Imports
import { meta } from '../stories/component.stories.js';
import { Overview, Sizes, ... } from '../stories/component.stories.js';

// Test meta
export default {
  ...meta,
  title: 'Component/Tests',
  parameters: { ...meta.parameters, docs: { disable: true, page: null } },
  tags: ['!autodocs', 'dev'],
} as Meta;

// Test stories with play functions
export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => { ... },
};
```

This is well-structured and consistent.

#### 3.2 Test categories

Tests are organized with visual comment separators:

```typescript
// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────
```

To cover both **base class behavior** (validation, ARIA/property reflection contracts) and **concrete class behavior** (rendering/classMap/template wiring), test sections should be ordered as:

1. **Templatized, cross-component sections** (lowest setup cost):
   - Defaults
   - Properties / Attributes
   - Dev mode warnings
2. **Cross-component sections with more setup** (component-specific fixtures/stories):
   - Slots
   - Variants / States
3. **Component-specific tests**:
   - Cases unique to one component's API or rendering behavior

Current adoption across the five reviewed components:

| Standard section | Badge | Status Light | Progress Circle | Divider | Asset |
|---|---|---|---|---|---|
| Defaults | Yes | Yes | Yes | Yes | Yes |
| Properties/Attributes | Yes | Yes | Yes | Yes | No |
| Slots | Yes | No | Yes | Not implemented | Yes |
| Variants/States | Yes | No | Yes | No | Yes |
| Dev mode warnings | Yes | Yes | Yes | Not implemented | Yes |

Interpretation rules used:

- `Yes` = section exists in the component test file.
- `No` = section is missing, but behavior exists in component code and should be tested.
- `Not implemented` = behavior/category does not exist in that component implementation.

Primary gaps:

- `StatusLight`: missing Slots and Variants/States sections despite both being implemented.
- `Divider`: missing Variants/States section (vertical/static-color behavior exists), while Dev mode warnings are correctly `Not implemented`.
- `Asset`: missing Properties/Attributes section despite `variant`/`label` behavior existing.

#### 3.3 Test utilities used

Test files consistently use shared helpers from `../../../utils/test-utils.js`, with utility choice varying by scenario:

- `getComponent<T>(canvasElement, selector)` — query single component
- `getComponents<T>(canvasElement, selector)` — query multiple components
- `withWarningSpy(callback)` — capture debug warnings (used where dev warnings are implemented)

These are imported from `../../../utils/test-utils.js` and provide a consistent testing interface.

#### 3.4 A11y spec files

All five components now have Playwright-based ARIA snapshot specs, and all Storybook stories are covered by global aXe validation via `.storybook/test-runner.ts` (unless tagged `!test`).

| Component | Has a11y spec | ARIA snapshot coverage | aXe validation path |
|---|---|---|---|
| Badge | Yes | 6 snapshot tests | Global test runner |
| Status Light | Yes | 4 snapshot tests | Global test runner |
| Progress Circle | Yes | 6 snapshot tests | Global test runner |
| Divider | Yes | 5 snapshot tests | Global test runner |
| Asset | Yes | 4 snapshot tests | Global test runner |

**Color contrast inconsistency (intentional carry-forward):**

- `StatusLight` keeps a known contrast TODO for the `neutral` variant (`4.39:1` vs `4.5:1`) and explicitly excludes that selector from color-contrast rule checks in story-level a11y parameters.

#### 3.5 Test bugs found

Previously reported syntax/selector issues in `badge.test.ts` and `status-light.a11y.spec.ts` appear resolved in current source.

Current testing risks are primarily **coverage-shape gaps** (missing sections) rather than immediate syntax failures.

---

### 4. File structure patterns

#### 4.1 Core package structure (consistent)

Every component in core follows this structure:

```
core/components/{component}/
├── Component.base.ts   ← Abstract base class
├── Component.types.ts  ← Constants, types, valid values
└── index.ts            ← Barrel exports
```

This is fully consistent across all five components.

#### 4.2 SWC package structure (consistent)

Every component in SWC follows this structure:

```
swc/components/{component}/
├── Component.ts        ← Concrete implementation
├── component.css       ← Component styles
├── index.ts            ← defineElement + exports + global type augmentation
├── stories/
│   └── component.stories.ts
└── test/
    ├── component.test.ts
    └── component.a11y.spec.ts
```

#### 4.3 What goes in core vs SWC

The split is well-defined:

**Core (framework-agnostic logic):**
- Abstract base classes with property declarations
- Type definitions and valid value constants
- Mixin compositions
- Validation logic (debug warnings)
- ARIA attribute management
- No rendering, no CSS

**SWC (Spectrum Web Components implementation):**
- Concrete classes extending base
- CSS styles
- `render()` method with template
- `classMap` for conditional styling
- Element registration via `defineElement`
- Storybook stories and tests

**Inconsistency**: Progress Circle's base class includes `@query('slot')` to access a slot element for label extraction. This is Lit-specific DOM querying in the base class, which slightly breaks the "no rendering in core" principle.

#### 4.4 Index file pattern

The SWC index.ts pattern is fully consistent:

```typescript
import { defineElement } from '@spectrum-web-components/core/element/index.js';
import { Component } from './Component.js';

export * from './Component.js';
declare global {
  interface HTMLElementTagNameMap {
    'swc-component': Component;
  }
}
defineElement('swc-component', Component);
```

---

### 5. Accessibility patterns

#### 5.1 ARIA attribute management

| Component | Role | ARIA attributes | Set where |
|---|---|---|---|
| Badge | None | None | — |
| Status Light | None | None | — |
| Progress Circle | `progressbar` | `aria-label`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext` | `firstUpdated()` + `updated()` |
| Divider | `separator` | `aria-orientation` | `firstUpdated()` + `updated()` |
| Asset | None (SVGs have `role="img"`) | `aria-label` on SVGs | In `render()` |

**Pattern**: Interactive/semantic components (Progress Circle, Divider) set `role` in `firstUpdated()` and manage dynamic ARIA attributes in `updated()`. Non-interactive display components (Badge, Status Light) don't set roles. Asset handles accessibility within its SVG templates.

**Inconsistency**: Divider always sets `role="separator"` unconditionally, ignoring any user-supplied role. Progress Circle checks for an existing role before setting it. Divider should follow Progress Circle's pattern to allow role overrides.

#### 5.2 Accessible name validation

Only Progress Circle validates for accessible names in debug mode:

```typescript
if (window.__swc?.DEBUG) {
  if (!this.label && !this.getAttribute('aria-label') && 
      !this.getAttribute('aria-labelledby') && !slotLabel) {
    window.__swc.warn(...);
  }
}
```

Badge and Status Light don't validate accessible names, despite Badge having icon-only variants that need `aria-label`.

#### 5.3 Keyboard handling

None of the five reviewed components implement keyboard handling, which is expected — all five are non-interactive presentational components. This is correct behavior.

#### 5.4 High contrast / forced-colors

See CSS section 2.6 above. Three of five components support `@media (forced-colors: active)`.

---

### 6. Stories patterns

#### 6.1 Meta configuration

All stories use `getStorybookHelpers()` and export meta objects, but the export pattern varies:

| Component | Meta export |
|---|---|
| Badge | `export const meta` → separate `export default { ...meta }` |
| Status Light | `export const meta` → separate `export default { ...meta }` |
| Progress Circle | Named `const meta` → `export default meta` (different destructuring) |
| Divider | `const meta` → `export default meta` |
| Asset | `const meta` → `export default meta` |

Badge and Status Light export `meta` as a named export (for test reuse) alongside the default export. The other three only use default export. The test files for Divider and Asset import from `meta` via `import meta from '../stories/...'` (default import), while Badge and Status Light use `import { meta } from '../stories/...'` (named import).

#### 6.2 ArgTypes customization

All stories customize argTypes for select controls:

```typescript
argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: Component.VARIANTS,
};
```

**Inconsistency**: Badge includes `table.defaultValue.summary` in argTypes:

```typescript
argTypes.variant = {
  ...argTypes.variant,
  table: { category: 'attributes', defaultValue: { summary: 'informative' } },
};
```

Other components don't include this. Badge has a `@todo` to carry this pattern to all components.

#### 6.3 Story tags

Tags are consistently applied:

| Story type | Tags |
|---|---|
| Playground | `['autodocs', 'dev']` |
| Overview | `['overview']` |
| Anatomy | `['anatomy']` |
| Options | `['options']` |
| States | `['states']` |
| Behaviors | `['behaviors']` |
| Accessibility | `['a11y']` |
| Meta | `['migrated']` |

This is fully consistent.

#### 6.4 Helpers section

Badge and Status Light define comprehensive helper label mappings:

```typescript
const semanticLabels = {
  positive: 'Approved',
  negative: 'Rejected',
  // ...
} as const satisfies Record<SemanticVariant, string>;
```

Progress Circle, Divider, and Asset don't have helpers sections (they have fewer variants so it's less necessary).

---

## Findings organized by category

### Consistent patterns (what we are doing the same)

1. **Core/SWC split**: Every component has the same three files in core (base, types, index) and the same files in SWC (component, CSS, index, stories, test).
2. **Abstract base class pattern**: All base classes are abstract, extend `SpectrumElement` (with or without mixins), and define abstract/internal static properties for subclass override.
3. **Type definition pattern**: `as const` arrays with `satisfies` for type checking, derived union types via indexed access.
4. **Section separators**: ASCII line comments (`// ────`) in both TypeScript and stories files.
5. **Custom property naming**: `--_swc-{component}-*` for private, `--swc-{component}-*` for public.
6. **`defineElement` registration**: Consistent pattern in every SWC `index.ts`.
7. **Test structure**: Storybook play functions, story reuse, `step()` for organization.
8. **Story organization**: Visual separators, proper tags, JSDoc documentation.
9. **Design token usage**: `token()` function in all CSS files.
10. **Logical CSS properties**: `inline-size`, `block-size`, `padding-block`, etc. used throughout.

### Inconsistent patterns (what varies between components)

1. **CSS class prefix**: `swc-` (4 components) vs `spectrum-` (Asset).
2. **Lifecycle hook for validation**: `update()` (Badge) vs `updated()` (Status Light, Progress Circle, Asset).
3. **Styles declaration**: Static getter (4) vs static property assignment (Divider).
4. **Type prefix naming**: `BADGE_` vs `STATUSLIGHT_` vs `PROGRESS_CIRCLE_` — no consistent separator rule.
5. **`:where()` usage**: Used in 3 of 5 components, absent in 2.
6. **Forced-colors support**: Present in 3 of 5, missing from Badge and Asset.
7. **A11y spec depth**: All 5 components have specs, but ARIA snapshot breadth varies.
8. **Meta export pattern**: Named export (Badge, Status Light) vs default export only (others).
9. **Import style in stories/tests**: Mixed package aliases and deep relative type imports.
10. **Role assignment**: Unconditional (Divider) vs conditional (Progress Circle).
11. **Variant CSS selectors**: Host attribute selectors for semantic, class selectors for non-semantic.
12. **Size class generation**: Status Light generates `--sizeS` classes in render but CSS doesn't use them.
13. **Universal reset**: `*` vs `*, *::before`.
14. **Property decorator completeness**: Asset's `label` has no `type` specified.

### Good patterns (what works well)

1. **Core/SWC separation** cleanly isolates framework-agnostic logic from implementation details, enabling reuse.
2. **Debug-mode warnings** with URLs and issue arrays provide excellent DX for catching misuse.
3. **`SizedMixin`** provides consistent size handling with validation and fallback behavior.
4. **Type-safe const arrays** (`as const satisfies`) prevent typos and enable autocomplete.
5. **`classMap` directive** for conditional styling is clean and readable.
6. **Test story reuse** (spreading story objects into test stories) ensures tests match documentation examples.
7. **`withWarningSpy()` helper** scopes test setup/teardown cleanly with automatic restore.
8. **Section separators** improve readability in larger files.
9. **Progress Circle's ARIA management** is thorough — handles label, value, indeterminate states, and label source validation.
10. **Global Storybook aXe test runner integration** gives every component consistent WCAG validation coverage.
11. **Helper label mappings** in stories use `satisfies Record<>` to ensure completeness.
12. **Picsum.photos with static IDs** for images ensures VRT consistency.

### Anti-patterns (what should be avoided)

1. **Legacy namespace carryover**: Asset still uses `spectrum-*` class names while the rest of 2nd-gen uses `swc-*`.
2. **Dead code in render**: Status Light generates size classes (`swc-StatusLight--sizeS`) that aren't referenced in CSS.
3. **Underdocumented advanced CSS behavior**: Progress Circle forced-colors uses a track variable name (`--swc-progress-circle-track-color`) that appears inconsistent with base variable usage (`--swc-progress-circle-track-border-color`).
4. **Unconditional role assignment**: Divider sets `role="separator"` unconditionally in `firstUpdated()`, overriding any user-supplied role.
5. **Custom getter/setter for `fixed`** in Badge base has a `@todo` noting it may behave identically to a standard Lit reactive property — unnecessary complexity.
6. **Section coverage gaps in tests**: Some components skip standard test categories despite implementing the underlying features.
7. **Duplicate JSDoc tags**: Asset SWC has duplicate `@example` annotations.
8. **Mixed import styles**: Combining package aliases with deep relative imports increases maintenance overhead.

### Missing patterns (what should be added)

1. **Explicit forced-colors decision records** for Badge and Asset (validate browser defaults vs required overrides).
2. **Accessible name validation** for Badge (icon-only variants) and Status Light.
3. **Runtime validation** for Divider's `static-color` property (has a `@todo`).
4. **ArgTypes `defaultValue.summary`** for all components (Badge has a `@todo` for this).
5. **Alias-first import conventions** for stories/tests to avoid deep relative paths.
6. **Event documentation** — none of the five components document or test events (though most don't dispatch any).
7. **Consistent role handling pattern** — check for existing role before setting.
8. **States stories** for components that have them (Divider has no States section in stories).
9. **Behaviors stories** for Divider (no behaviors documented currently).
10. **CJK line-height support** — Badge and Status Light handle this, but the pattern isn't universal.

---

## Recommendations for standardization

### Priority 1: Fix existing bugs

These are current high-confidence implementation issues worth fixing first:

1. Remove unused Status Light size classes from render output, or add matching CSS selectors if they are intended.
2. Align Asset class naming with the SWC namespace strategy used by other 2nd-gen components.
3. Verify and correct Progress Circle forced-colors variable naming (`track-color` vs `track-border-color`) if mismatch is confirmed.
4. Add missing test sections where implemented behavior is currently untested (`StatusLight`, `Divider`, `Asset` gaps identified above).

### Priority 2: Standardize CSS patterns

1. **Adopt `swc-` prefix universally**: Rename Asset's `spectrum-Asset` to `swc-Asset`.
2. **Standardize universal reset**: Use `*, *::before, *::after { box-sizing: border-box; }` everywhere.
3. **Document and enforce the variant selector strategy**: Keep semantic `:host([variant])` vs implementation-class variants as an explicit rule tied to custom-property exposure intent.
4. **Use a forced-colors decision rubric**: Validate necessity first, then require explicit forced-colors rules only when browser defaults are insufficient.
5. **Standardize `:where()` usage**: Require it for compounded class selectors where specificity reduction is needed.

### Priority 3: Standardize TypeScript patterns

1. **Use `updated()` consistently** for post-render validation (not `update()`).
2. **Use `static override get styles()` consistently** (not static property assignment).
3. **Standardize type prefix naming**: Use underscore separators for multi-word names (`BADGE_`, `STATUS_LIGHT_`, `PROGRESS_CIRCLE_`).
4. **Standardize `@property` decorators**: Always specify `type` (don't omit it like Asset's `label`).
5. **Standardize class-level JSDoc**: All base classes should have description + `@slot` (if applicable). All SWC classes should have `@element` + `@example`.

### Priority 4: Standardize testing patterns

1. **Keep a11y coverage mandatory** for all components (ARIA snapshots + global aXe runner integration).
2. **Standardize test category adoption**: all test files should include Defaults, Properties/Attributes, Slots (if applicable), Variants/States (if applicable), and Dev mode warnings (if implemented).
3. **Add a `Not implemented` rubric** in testing guidance so omissions are intentional and auditable.
4. **Standardize import paths**: use alias-first imports in tests and stories where possible.

### Priority 5: Standardize accessibility patterns

1. **Add accessible name validation** to Badge and Status Light base classes.
2. **Use conditional role assignment** (check before set) everywhere, following Progress Circle's pattern.
3. **Document forced-colors decision criteria** clearly (required only when defaults are insufficient, with explicit validation expectations).

### Priority 6: Standardize stories patterns

1. **Use named `meta` export** consistently for test reuse.
2. **Add `defaultValue.summary`** to all argTypes.
3. **Require a Helpers section** for components with label mappings.

---

## Summary: what should go in future style guides

Based on this review, the style guides should cover:

1. **TypeScript style guide**: Property order, decorator conventions, JSDoc requirements, lifecycle hook usage, type definition file structure, debug warning pattern, import organization.
2. **CSS style guide**: Selector ordering, custom property naming (`--_swc-` vs `--swc-`), class naming convention (`swc-ComponentName--modifier`), `:where()` usage rules, forced-colors decision criteria, token usage patterns, universal reset standard.
3. **Testing style guide**: Test file structure, test categories, story reuse pattern, utility function usage, a11y spec requirements (ARIA snapshots + aXe), coverage expectations.
4. **Accessibility style guide**: ARIA attribute management lifecycle, accessible name validation requirements, role assignment patterns, and forced-colors validation expectations.
5. **Stories/documentation style guide**: Meta configuration, argTypes customization, helpers section, tag usage, JSDoc documentation requirements per section.
