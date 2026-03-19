<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Research / Full pattern research: 1st-gen vs 2nd-gen

<!-- Document title (editable) -->

# Full pattern research: 1st-gen vs 2nd-gen

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Executive summary](#executive-summary)
- [Monorepo architecture overview](#monorepo-architecture-overview)
    - [Directory layout](#directory-layout)
    - [Build systems](#build-systems)
    - [Dependency relationship](#dependency-relationship)
- [1st-gen architecture](#1st-gen-architecture)
    - [Component structure](#component-structure)
    - [Inheritance and class hierarchy](#inheritance-and-class-hierarchy)
    - [Mixin catalog](#mixin-catalog)
    - [Reactive controller catalog](#reactive-controller-catalog)
    - [CSS architecture](#css-architecture)
    - [Event patterns](#event-patterns)
    - [Slot patterns](#slot-patterns)
    - [Property and decorator patterns](#property-and-decorator-patterns)
    - [Lifecycle patterns](#lifecycle-patterns)
    - [Component registration](#component-registration)
- [2nd-gen architecture](#2nd-gen-architecture)
    - [Core/SWC split](#coreswc-split)
    - [Component structure](#component-structure)
    - [Type system](#type-system)
    - [CSS architecture](#css-architecture)
    - [Tooling and build pipeline](#tooling-and-build-pipeline)
    - [Storybook and documentation](#storybook-and-documentation)
    - [Testing infrastructure](#testing-infrastructure)
- [CEM and wc-toolkit comparison](#cem-and-wc-toolkit-comparison)
    - [Custom Elements Manifest generation](#custom-elements-manifest-generation)
    - [wc-toolkit storybook helpers](#wc-toolkit-storybook-helpers)
    - [API surface comparison methodology](#api-surface-comparison-methodology)
- [Side-by-side pattern comparison](#side-by-side-pattern-comparison)
    - [Base class patterns](#base-class-patterns)
    - [Property declaration](#property-declaration)
    - [CSS custom property strategy](#css-custom-property-strategy)
    - [Variant and state management](#variant-and-state-management)
    - [ARIA and accessibility](#aria-and-accessibility)
    - [Debug and validation patterns](#debug-and-validation-patterns)
    - [Slot observation patterns](#slot-observation-patterns)
    - [Event dispatching](#event-dispatching)
- [Complex component pattern analysis](#complex-component-pattern-analysis)
    - [Overlay system](#overlay-system)
    - [Picker and combobox](#picker-and-combobox)
    - [Tabs](#tabs)
    - [Dialog](#dialog)
    - [Table](#table)
    - [Textfield and number field](#textfield-and-number-field)
- [Shared infrastructure gap analysis](#shared-infrastructure-gap-analysis)
    - [What has been ported to 2nd-gen core](#what-has-been-ported-to-2nd-gen-core)
    - [What remains 1st-gen only](#what-remains-1st-gen-only)
    - [What has been redesigned](#what-has-been-redesigned)
- [Patterns to establish in 2nd-gen](#patterns-to-establish-in-2nd-gen)
    - [Priority 1: Focus management infrastructure](#priority-1-focus-management-infrastructure)
    - [Priority 2: Overlay and positioning system](#priority-2-overlay-and-positioning-system)
    - [Priority 3: Form participation patterns](#priority-3-form-participation-patterns)
    - [Priority 4: Cross-component communication](#priority-4-cross-component-communication)
    - [Priority 5: Keyboard navigation infrastructure](#priority-5-keyboard-navigation-infrastructure)
    - [Priority 6: Platform detection and adaptive behavior](#priority-6-platform-detection-and-adaptive-behavior)
    - [Priority 7: Internationalization patterns](#priority-7-internationalization-patterns)
- [Patterns to modernize or simplify](#patterns-to-modernize-or-simplify)
    - [Mixin chain simplification](#mixin-chain-simplification)
    - [CSS-in-JS to native CSS migration](#css-in-js-to-native-css-migration)
    - [Overlay architecture modernization](#overlay-architecture-modernization)
    - [Token system modernization](#token-system-modernization)
    - [Controller consolidation](#controller-consolidation)
    - [Testing architecture modernization](#testing-architecture-modernization)
- [Complexity reduction opportunities](#complexity-reduction-opportunities)
    - [Eliminate the mod indirection layer](#eliminate-the-mod-indirection-layer)
    - [Reduce mixin depth](#reduce-mixin-depth)
    - [Simplify device-specific branching](#simplify-device-specific-branching)
    - [Declarative ARIA management](#declarative-aria-management)
    - [Centralized validation](#centralized-validation)
- [Migration risk assessment](#migration-risk-assessment)
    - [Low risk (presentational components)](#low-risk-presentational-components)
    - [Medium risk (interactive components)](#medium-risk-interactive-components)
    - [High risk (system-level components)](#high-risk-system-level-components)
- [Recommendations summary](#recommendations-summary)
    - [Infrastructure to build before migrating interactive components](#infrastructure-to-build-before-migrating-interactive-components)
    - [Infrastructure to build before migrating complex components](#infrastructure-to-build-before-migrating-complex-components)
    - [Standards to formalize](#standards-to-formalize)
    - [Existing patterns to preserve](#existing-patterns-to-preserve)

</details>

<!-- Document content (editable) -->

## Executive summary

This document provides a comprehensive analysis of architectural patterns across the 1st-gen and 2nd-gen Spectrum Web Components codebases. It catalogs every major pattern in 1st-gen (75+ components), maps them against the emerging 2nd-gen architecture (5 migrated components), and identifies the patterns that must be established, modernized, or simplified to support the full migration.

**Key findings:**

1. **The core/SWC split is a significant improvement** — it cleanly separates framework-agnostic logic from rendering, enabling shared improvements across generations.
2. **Simple presentational components migrate cleanly** — Badge, Status Light, Progress Circle, Divider, and Asset demonstrate the pattern well.
3. **Complex interactive components introduce 6 major pattern gaps** — focus management, overlay positioning, form participation, cross-component ARIA linking, keyboard navigation, and platform-adaptive behavior have no 2nd-gen equivalents yet.
4. **The CSS migration is well-documented** — the `token()` system, custom property strategy, and specificity management are mature patterns ready for broader adoption.
5. **1st-gen mixin chains average 3-4 deep for complex components** — 2nd-gen should evaluate whether composition via controllers can replace some mixin usage to reduce inheritance complexity.
6. **The CEM and wc-toolkit integration is a major tooling advancement** — auto-generated controls and documentation reduce boilerplate significantly and can serve as the basis for cross-generation API comparison.

---

## Monorepo architecture overview

### Directory layout

```text
spectrum-web-components/
├── 1st-gen/                    # First generation (~75 components)
│   ├── packages/               # Individual component packages
│   ├── projects/               # Documentation, examples
│   ├── tools/                  # Build tools, shared utilities
│   ├── storybook/              # Storybook configuration (Webpack)
│   ├── test/                   # Test infrastructure
│   └── scripts/                # Build scripts
│
├── 2nd-gen/                    # Second generation (5 migrated components)
│   └── packages/
│       ├── core/               # Abstract base classes (framework-agnostic)
│       │   ├── components/     # Base classes (*.base.ts)
│       │   ├── controllers/    # Reactive controllers
│       │   ├── element/        # SpectrumElement, defineElement
│       │   ├── mixins/         # SizedMixin, ObserveSlot*
│       │   └── utils/          # Shared utilities
│       ├── swc/                # Concrete implementations (Spectrum 2)
│       │   ├── components/     # Component implementations
│       │   ├── stylesheets/    # Global CSS (tokens, typography)
│       │   └── utils/          # Test utilities
│       └── tools/              # Build tools (postcss-token, swc-tokens)
│
├── CONTRIBUTOR-DOCS/           # Documentation
│   ├── 01_contributor-guides/  # How-to guides
│   ├── 02_style-guide/         # Coding standards (CSS, linting)
│   └── 03_project-planning/    # Strategy, workstreams, milestones
│
└── linters/                    # Shared linting packages
```

### Build systems

| Aspect | 1st-gen | 2nd-gen |
|--------|---------|---------|
| Build orchestrator | Wireit | Yarn workspaces |
| Bundler | Custom scripts + TypeScript compiler | Vite |
| CSS processing | PostCSS → CSS-in-JS (`css` template literals) | PostCSS with `token()` plugin → native `.css` files |
| Storybook | Webpack 5 (`@storybook/web-components-webpack5`) | Vite (`@storybook/web-components-vite`) |
| Type generation | `tsc` | `vite-plugin-dts` |
| CEM generation | `@custom-elements-manifest/analyzer` 0.10.6 | `@custom-elements-manifest/analyzer` 0.10.8 |
| Test runner | Playwright (a11y) + Web Test Runner (unit) | Storybook play functions + Vitest + Playwright (a11y) |

### Dependency relationship

1st-gen acts as a compatibility layer that re-exports from 2nd-gen core:

- `1st-gen/tools/base/` wraps `@spectrum-web-components/core/element/`
- `1st-gen/tools/shared/` wraps `@spectrum-web-components/core/mixins/`
- Building 2nd-gen core is a prerequisite for building 1st-gen (`prebuild` step)

This means changes to core immediately benefit both generations.

---

## 1st-gen architecture

### Component structure

Each of the ~75 components follows this file layout:

```text
packages/{component}/
├── src/
│   ├── Component.ts            # Main component class
│   ├── component.css.ts        # CSS-in-JS styles (Lit css``)
│   ├── spectrum-component.css.ts  # Spectrum token overrides
│   ├── component-overrides.css.ts # Additional overrides
│   └── index.ts                # Exports
├── sp-component.ts             # Side-effectful registration
├── package.json                # Package metadata
├── README.md                   # Documentation
├── custom-elements.json        # CEM (generated, gitignored)
└── test/                       # Test files
```

### Inheritance and class hierarchy

All 1st-gen components build on `SpectrumElement` (re-exported from 2nd-gen core), composed with mixins:

```text
LitElement
  └─ SpectrumMixin (adds hasVisibleFocusInTree, dir, __swc debug)
      └─ SpectrumElement
          └─ Focusable (adds tabindex, disabled, autofocus management)
              └─ LikeAnchor (adds href, target, rel, download)
                  └─ ObserveSlotText (adds slotHasContent tracking)
                      └─ SizedMixin (adds size property with validation)
                          └─ Concrete component
```

**Typical inheritance depths by complexity:**

| Complexity | Depth | Example |
|-----------|-------|---------|
| Simple presentational | 1-2 mixins | Badge: `SizedMixin(ObserveSlotText(ObserveSlotPresence(SpectrumElement)))` |
| Interactive basic | 2-3 mixins | Button: `SizedMixin(ButtonBase)` where ButtonBase = `ObserveSlotText(LikeAnchor(Focusable))` |
| Interactive complex | 3-5 mixins | Textfield: `ManageHelpText(SizedMixin(Focusable))` |
| Composite | 4-6 mixins | Dialog: `ObserveSlotPresence(AlertDialog)` where AlertDialog = `FocusVisiblePolyfillMixin(SpectrumElement)` |

### Mixin catalog

| Mixin | Location | Purpose | Used by |
|-------|----------|---------|---------|
| `SizedMixin` | core (shared) | Adds `size` property with validation and reflection | ~40+ components |
| `ObserveSlotPresence` | core (shared) | Watches for presence of slotted elements via `MutationController` | Badge, Dialog, Action Button, and others |
| `ObserveSlotText` | core (shared) | Watches text content in slots for ARIA labeling | Badge, Button, Tab, and others |
| `Focusable` | 1st-gen only | Manages `tabIndex`, `disabled`, `autofocus`, focus delegation | All interactive components |
| `FocusVisiblePolyfillMixin` | 1st-gen only | Coordinates with `:focus-visible` polyfill | Dialog, Tab, and others |
| `LikeAnchor` | 1st-gen only | Adds `href`, `target`, `rel`, `download` for link-like behavior | Button, Action Button, Menu Item |
| `ManageHelpText` | 1st-gen only | Associates help text elements with `aria-describedby` | Textfield, Number Field, Picker, Combobox |
| `CheckboxMixin` | 1st-gen only | Adds `checked`, `name`, `readonly` for checkbox behavior | Checkbox, Switch |

### Reactive controller catalog

| Controller | Location | Purpose | Used by |
|-----------|----------|---------|---------|
| `LanguageResolutionController` | core (shared) | Resolves locale from `<html lang>`, `navigator.language`, or context event | Progress Circle, Number Field |
| `PendingStateController` | 1st-gen only | Renders loading/pending indicator for buttons | Button |
| `PlacementController` | 1st-gen only | Overlay positioning via Floating UI (`@floating-ui/dom`) | Overlay |
| `InteractionController` (base) | 1st-gen only | Base for interaction-type-specific controllers | Overlay |
| `ClickController` | 1st-gen only | Click-to-open overlay behavior | Overlay |
| `HoverController` | 1st-gen only | Hover-to-open overlay behavior | Overlay |
| `LongpressController` | 1st-gen only | Longpress-to-open overlay behavior | Overlay |
| `DesktopController` / `MobileController` | 1st-gen only | Platform-specific picker behavior | Picker |
| `RovingTabindexController` | 1st-gen only | Manages tabindex rotation among sibling elements | Tabs, Action Group, Menu |
| `ColorController` | 1st-gen only | Color validation and format conversion | Color Area, Color Slider, Color Wheel |
| `GridController` | 1st-gen only | Grid layout with virtual scrolling and roving tabindex | Grid |
| `ElementResolutionController` | 1st-gen only | Resolves trigger elements from selectors | Overlay |
| `MatchMediaController` | 1st-gen only | Reactive media query matching (`isMobile`, `isTouchDevice`) | Picker |
| `DependencyManagerController` | 1st-gen only | Lazy-loads overlay dependencies | Picker |

### CSS architecture

1st-gen uses **CSS-in-JS** via Lit's `css` template literals with a three-tier custom property system:

```css
/* Tier 1: Spectrum design tokens (from spectrum-*.css.ts files) */
--spectrum-badge-height: var(--spectrum-component-height-100);

/* Tier 2: Mod override hooks (consumer customization layer) */
--mod-badge-height: 32px;

/* Tier 3: Property consumption with fallback chain */
min-block-size: var(--mod-badge-height, var(--spectrum-badge-height));
```

**Problems with this approach:**
- Long fallback chains (3+ levels) are hard to trace
- `--mod-*` adds an unnecessary indirection layer
- CSS is embedded in TypeScript, preventing native tooling (PostCSS, autoprefixer)
- Spectrum-era class names (`.spectrum-*`) are tightly coupled to external CSS library

### Event patterns

Standard events use `bubbles: true` to allow the event to traverse up the DOM and `composed: true` to cross shadow DOM boundaries:

```typescript
// Standard DOM events
this.dispatchEvent(new Event('change', { bubbles: true, composed: true, cancelable: true }));

// Custom events with typed detail
this.dispatchEvent(new CustomEvent<LongpressEvent>('longpress', {
  bubbles: true, composed: true,
  detail: { source: 'pointer' },
}));

// Context/coordination events
this.dispatchEvent(new CustomEvent('sp-language-context', {
  bubbles: true, composed: true, cancelable: true,
  detail: { callback: (lang, unsubscribe) => { ... } },
}));
```

### Slot patterns

Slots are defined via JSDoc and observed through mixins:

```typescript
/**
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
export class Badge extends SizedMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), '')
) {
  protected get hasIcon(): boolean {
    return this.slotContentIsPresent;
  }
}
```

### Property and decorator patterns

```typescript
// Reflected string with type
@property({ type: String, reflect: true })
public variant: BadgeVariant = 'informative';

// Reflected boolean
@property({ type: Boolean, reflect: true })
public selected = false;

// Custom attribute name
@property({ reflect: true, attribute: 'static-color' })
public staticColor?: 'white' | 'black';

// Custom getter/setter with manual reflection
@property({ reflect: true })
public get fixed(): FixedValues | undefined { return this._fixed; }
public set fixed(value: FixedValues | undefined) {
  const oldValue = this.fixed;
  this._fixed = value;
  if (value) this.setAttribute('fixed', value);
  else this.removeAttribute('fixed');
  this.requestUpdate('fixed', oldValue);
}
```

### Lifecycle patterns

| Hook | Usage pattern | Components |
|------|--------------|------------|
| `constructor()` | Initialize controllers, add event listeners | Button, Picker, Tabs |
| `connectedCallback()` | Register for context events, start observers | Overlay, Tabs |
| `firstUpdated()` | One-time setup: set ARIA role, configure initial state | Progress Circle, Divider |
| `updated()` | React to property changes: update ARIA, dispatch events | Most components |
| `update()` | Pre-render validation (debug warnings) | Badge |
| `shouldUpdate()` | Gate unnecessary renders | Rare usage |
| `disconnectedCallback()` | Cleanup observers, remove listeners | Overlay, Tabs |
| `getUpdateComplete()` | Wait for transition animations to complete | Dialog |

### Component registration

```typescript
// 1st-gen uses defineElement (wrapper around customElements.define)
import { defineElement } from '@spectrum-web-components/base/src/define-element.js';
import { Badge } from './src/Badge.js';

defineElement('sp-badge', Badge);

declare global {
  interface HTMLElementTagNameMap {
    'sp-badge': Badge;
  }
}
```

---

## 2nd-gen architecture

### Core/SWC split

The fundamental architectural change is separating framework-agnostic logic from rendering:

**Core (`@spectrum-web-components/core`):**
- Abstract base classes with property declarations and validation
- Type definitions and valid-value constants
- Mixins (SizedMixin, ObserveSlotPresence, ObserveSlotText)
- Reactive controllers (LanguageResolutionController)
- Utilities
- **No rendering, no CSS, no templates**

**SWC (`@adobe/spectrum-wc`):**
- Concrete classes extending core base classes
- Spectrum 2 CSS styles (native `.css` files)
- `render()` methods with Lit templates
- `classMap` for conditional styling
- Element registration via `defineElement`
- Storybook stories and tests

### Component structure

Every 2nd-gen component follows a three-file pattern:

```text
core/components/{component}/
├── Component.base.ts     # Abstract base class
├── Component.types.ts    # Constants, types, valid values
└── index.ts              # Barrel exports

swc/components/{component}/
├── Component.ts          # Concrete implementation
├── component.css         # Spectrum 2 styles (native CSS)
├── index.ts              # defineElement + exports + HTMLElementTagNameMap
├── stories/
│   └── component.stories.ts
└── test/
    ├── component.test.ts
    └── component.a11y.spec.ts
```

**Base class pattern:**

```typescript
export abstract class BadgeBase extends SizedMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ''),
  { noDefaultSize: true }
) {
  // Abstract static properties for subclass override
  static readonly VARIANTS_COLOR: readonly string[];
  static readonly VARIANTS: readonly string[];

  // Shared API
  @property({ type: String, reflect: true })
  public variant: BadgeVariant = 'informative';

  // Validation in update lifecycle
  protected override update(changedProperties: PropertyValues): void {
    if (window.__swc?.DEBUG) { /* validate variant */ }
    super.update(changedProperties);
  }
}
```

**Concrete implementation pattern:**

```typescript
export class Badge extends BadgeBase {
  // Override with S2-specific values
  static override readonly VARIANTS_COLOR = BADGE_VARIANTS_COLOR_S2;
  static override readonly VARIANTS = BADGE_VARIANTS_S2;

  // Narrow the variant type
  @property({ type: String, reflect: true })
  public override variant: BadgeVariantS2 = 'informative';

  // S2-specific additions
  @property({ type: Boolean, reflect: true })
  public subtle: boolean = false;

  // Styles and rendering
  public static override get styles(): CSSResultArray { return [styles]; }
  protected override render(): TemplateResult {
    return html`
      ${when(this.hasIcon, () => html`<div class="swc-Badge-icon"><slot name="icon"></slot></div>`)}
      <div class="swc-Badge-label"><slot></slot></div>
    `;
  }
}
```

### Type system

<!-- this should reflect the 03_component-types.md style guide -->
Types files define S1/S2 variant arrays and derive union types:

```typescript
export const BADGE_VARIANTS_SEMANTIC = ['accent', 'informative', 'negative', 'neutral', 'notice', 'positive'] as const;
export const BADGE_VARIANTS_COLOR_S1 = ['fuchsia', 'indigo', 'magenta', 'purple', 'seafoam', 'yellow'] as const;
export const BADGE_VARIANTS_COLOR_S2 = [...BADGE_VARIANTS_COLOR_S1, 'pink', 'blue'] as const;

export const BADGE_VARIANTS_S1 = [...BADGE_VARIANTS_SEMANTIC, ...BADGE_VARIANTS_COLOR_S1];
export const BADGE_VARIANTS_S2 = [...BADGE_VARIANTS_SEMANTIC, ...BADGE_VARIANTS_COLOR_S2];

export type BadgeVariantS1 = (typeof BADGE_VARIANTS_S1)[number];
export type BadgeVariantS2 = (typeof BADGE_VARIANTS_S2)[number];
export type BadgeVariant = BadgeVariantS1 | BadgeVariantS2;
```

This pattern allows base classes to work with the broad union type while concrete implementations narrow to generation-specific types.

### CSS architecture

2nd-gen uses **native CSS files** processed by PostCSS at build time:

```css
/* token() function → resolved to var(--swc-*) at build time */
.swc-Badge {
  --_swc-badge-border-width: token("border-width-200");
  --swc-badge-gap: token("text-to-visual-100");
  min-block-size: var(--swc-badge-height, token("component-height-100"));
  display: inline-flex;
  align-items: center;
  gap: var(--swc-badge-gap);
}

/* Size variants via :host() for custom property exposure */
:host([size="s"]) {
  --swc-badge-height: token("component-height-75");
  --swc-badge-font-size: token("font-size-75");
}

/* Non-semantic colors via internal class selectors */
.swc-Badge--chartreuse {
  --swc-badge-background-color: token("chartreuse-background-color-default");
}
```

**Custom property strategy:**

| Prefix | Scope | Overridable | Example |
|--------|-------|-------------|---------|
| `--_swc-{component}-*` | Private, mechanical calculations | No (shadow DOM enforced) | `--_swc-badge-border-width-deduction` |
| `--swc-{component}-*` | Public, consumer customization | Yes | `--swc-badge-height` |
| `token('name')` | Design tokens (build-time resolved) | No (source of truth) | `token("component-height-100")` |

### Tooling and build pipeline

**PostCSS `token()` plugin** (`@adobe/postcss-token`):
- Transforms `token('token-name')` → `var(--swc-token-name)` at build time
- Uses `lookupToken()` from `@adobe/swc-tokens` for resolution
- Fails fast on missing tokens (prevents typos)

**Token generation** (`@adobe/swc-tokens`):
- Ingests Spectrum design token data from `@adobe/spectrum-tokens`
- Generates CSS custom properties and unified stylesheets
- Handles aliases, light/dark sets, composition
- Exports `lookupToken()` for the PostCSS plugin

**Vite build:**
- `litCss()` plugin processes CSS imports into Lit `CSSResult` objects
- `vite-plugin-dts` generates TypeScript declarations
- `preserveModules: true` maintains directory structure in output
- External dependencies: Lit and core package marked external

### Storybook and documentation

**2nd-gen Storybook** uses `@storybook/web-components-vite` with:

- **CEM-driven controls**: `setCustomElementsManifest()` auto-generates controls from the manifest
- **wc-toolkit helpers**: `getStorybookHelpers('swc-component-name')` returns `{ args, argTypes, template, events }`
- **Tag-based documentation**: `DocumentTemplate.mdx` conditionally renders sections (Anatomy, Options, States, Behaviors, Accessibility) based on story tags
- **Automated a11y testing**: Axe-core integration via test runner with WCAG 2.1 AA rules
- **Custom decorators**: `withContext`, `withFlexLayout`, `withStaticColorsDemo`

**Key difference from 1st-gen Storybook:**

| Feature | 1st-gen | 2nd-gen |
|---------|---------|---------|
| Controls generation | Manual argTypes | Auto from CEM |
| Documentation | Static template | Conditional tag-based |
| Story visibility | Opt-out (`autodocs` default) | Opt-in (`!autodocs`, `!dev` default) |
| Test integration | Separate test runner | Vitest + play functions |
| Source formatting | Default | Prettier integration |

### Testing infrastructure

**Coverage targets:**
- 100% for `components/**/*.{ts,js}` (SWC)
- 100% for `packages/core/components/**/*.{ts,js}` (Core)
- 70% for `packages/core/shared/**/*.{ts,js}` (Shared)

**Test structure** (5 standard sections):
1. Defaults — initial property values and rendering
2. Properties / Attributes — mutations, reflection, sizes, ARIA
3. Slots — slotted content, anatomy, label fallbacks
4. Variants / States — semantic/non-semantic variants, state transitions
5. Dev mode warnings — `__swc.DEBUG` validation messages

**Utilities:**
- `getComponent<T>(canvasElement, selector)` — query and await component
- `getComponents<T>(canvasElement, selector)` — query multiple
- `withWarningSpy(callback)` — capture debug warnings

---

## CEM and wc-toolkit comparison

### Custom Elements Manifest generation

Both generations use `@custom-elements-manifest/analyzer` but with different configurations:

**1st-gen CEM config:**
- Globs include `**/sp-*.ts` and references 2nd-gen core component files
- Custom `defineElementPlugin()` resolves `defineElement()` calls
- `moduleFileExtensionsPlugin()` for file extension handling
- Per-package `custom-elements.json` (gitignored)

**2nd-gen CEM config:**
- Globs include `components/**/*.ts` plus core components and shared code
- No custom plugins (standard LitElement analysis)
- Output to `.storybook/custom-elements.json` for Storybook consumption
- Single manifest for all 2nd-gen components

### wc-toolkit storybook helpers

The 2nd-gen Storybook integrates `@wc-toolkit/storybook-helpers` which:

1. Reads the CEM at startup via `setCustomElementsManifest()`
2. Provides `getStorybookHelpers('swc-component-name')` which auto-generates:
   - `args`: Default values derived from CEM property defaults
   - `argTypes`: Controls with correct types, categories, and options
   - `template`: A render function that produces the component HTML
   - `events`: Event names from the CEM for action logging
3. Configures Storybook UI:
   - Category ordering (attributes → properties → slots → CSS props → CSS parts → events → methods)
   - Hides internal arg references
   - Renders default value summaries

This eliminates significant boilerplate compared to 1st-gen's manual approach.

### API surface comparison methodology

The CEM provides structured data for programmatic comparison between generations:

```bash
# Generate 1st-gen manifests
cd 1st-gen && yarn custom-element-json

# Generate 2nd-gen manifest
cd 2nd-gen/packages/swc && yarn analyze

# Compare component APIs
# 1st-gen: 1st-gen/packages/{component}/custom-elements.json
# 2nd-gen: 2nd-gen/packages/swc/.storybook/custom-elements.json
```

For each component, the CEM provides:
- **Properties**: Name, type, default, reflect, attribute name
- **Attributes**: Name, type, field reference
- **Slots**: Name, description
- **Events**: Name, type, description
- **CSS Custom Properties**: Name, description, default
- **CSS Parts**: Name, description
- **Methods**: Name, parameters, return type

Comparing CEM entries between generations reveals:
- New properties added in 2nd-gen (e.g., `subtle`, `outline` on Badge)
- Removed properties dropped from 1st-gen
- Changed types or defaults
- New or removed slots, events, or CSS properties

---

## Side-by-side pattern comparison

### Base class patterns

| Aspect | 1st-gen | 2nd-gen |
|--------|---------|---------|
| Base class | Single class extending `SpectrumElement` + mixins | Abstract base in core, concrete in SWC |
| Rendering | In the single component class | Only in SWC concrete class |
| Styles | In the single component class | Only in SWC concrete class |
| Validation | In the single component class | In core base class (shared) |
| Type narrowing | N/A (single variant set) | Base uses union, concrete narrows to S1/S2 |
| Static constants | Per-component only | Abstract in base, overridden in concrete |

### Property declaration

| Aspect | 1st-gen | 2nd-gen |
|--------|---------|---------|
| Decorator | `@property({ type: String, reflect: true })` | Same, plus `override` keyword in SWC |
| Validation | Custom getter/setter or lifecycle | Static readonly arrays + lifecycle |
| Type safety | Standard TypeScript types | `as const satisfies` arrays → derived union types |
| Default values | In property declaration | In property declaration, can differ per generation |
| Custom accessors | Used for validation (e.g., Badge `fixed`) | Same pattern, with `@todo` notes to simplify |

### CSS custom property strategy

| Aspect | 1st-gen | 2nd-gen |
|--------|---------|---------|
| Token source | `--spectrum-*` custom properties | `token()` function → `var(--swc-*)` |
| Override layer | `--mod-*` (3-tier fallback chain) | Single `--swc-*` exposed property |
| Private properties | Not formalized | `--_swc-*` prefix convention |
| Selector strategy | Mixed `:host()` and internal classes | Intentional: `:host()` = exposed, class = internal |
| Specificity target | Not formally defined | `(0,1,0)` maximum, `:where()` for compounding |
| Forced-colors | Varies per component | Required only when browser defaults insufficient |
| Class prefix | `.spectrum-*` | `.swc-*` |
| CSS format | CSS-in-JS (`css` template literal) | Native `.css` files |

### Variant and state management

| Aspect | 1st-gen | 2nd-gen |
|--------|---------|---------|
| Semantic variants | `:host([variant="..."])` | `:host([variant="..."])` (same, exposed) |
| Non-semantic colors | Various (mixed patterns) | Internal class selectors (`.swc-Badge--magenta`) |
| Size variants | `:host([size="..."])` | `:host([size="..."])` (same, exposed) |
| States | Mixed `:host()` and internal classes | `:host()` for states (exposed surface) |
| Static color | `--static-color` attribute on `:host()` | Same, with `staticColorsDemo` decorator |
| classMap usage | All variant classes in render | Minimal, only for non-attribute variants |

### ARIA and accessibility

| Aspect | 1st-gen | 2nd-gen |
|--------|---------|---------|
| Role assignment | Mixed (some unconditional, some check existing) | Unconditional — components should be opinionated about their semantic role |
| ARIA in lifecycle | `firstUpdated()` + `updated()` | Same pattern |
| Accessible name | Validated in some components | Debug-mode warnings (Progress Circle) |
| Forced-colors | 3 of 5 migrated components | Required per decision rubric |
| a11y testing | Manual + Playwright aXe | Automated Storybook test runner + Playwright ARIA snapshots |
| Screen reader testing | `screen-reader-addon` | Shared addon (same) |

### Debug and validation patterns

| Aspect | 1st-gen | 2nd-gen |
|--------|---------|---------|
| Guard | `window.__swc?.DEBUG` | Same |
| Lifecycle | Mixed (`update`, `updated`) | Standardizing on `updated()` |
| Warning method | `window.__swc.warn(this, message, url, { issues })` | Same |
| Variant validation | Checks `constructor.VARIANTS.includes()` | Same, using abstract static arrays |
| Accessible name | Some components | Expanding coverage |

### Slot observation patterns

| Aspect | 1st-gen | 2nd-gen |
|--------|---------|---------|
| Presence detection | `ObserveSlotPresence` (from core) | Same (shared) |
| Text detection | `ObserveSlotText` (from core) | Same (shared) |
| Label extraction | `getLabelFromSlot()` (from core) | Same (shared) |
| Mutation observation | `MutationController` | Same |
| Multiple slot selectors | Supported | Supported |

### Event dispatching

| Aspect | 1st-gen | 2nd-gen |
|--------|---------|---------|
| Standard events | `new Event('change', { bubbles, composed })` | Same pattern |
| Custom events | `new CustomEvent<T>('name', { detail })` | Same pattern |
| Context events | `sp-language-context`, `overlay-relation-query` | `sp-language-context` (same) |
| Cancelable | Used for close, change events | Same |
| Event types | Documented in JSDoc `@fires` | Should be in CEM |

---

## Complex component pattern analysis

The following sections analyze patterns in complex 1st-gen components that do not yet have 2nd-gen equivalents, identifying the infrastructure requirements for migration.

### Overlay system

**Current 1st-gen architecture:**

```text
AbstractOverlay (base)
  ├─ OverlayPopover (runtime mixin, uses native showPopover API)
  └─ OverlayNoPopover (runtime mixin, fallback positioning)
      └─ Overlay (concrete)
```

**Key patterns:**
- **Runtime mixin selection** based on browser `showPopover` API support
- **PlacementController** uses `@floating-ui/dom` for positioning with arrow handling
- **OverlayStack** singleton manages z-index, closing behavior, body scroll blocking
- **Interaction controllers** (Click, Hover, Longpress) extend base `InteractionController`
- **State machine**: `closed` → `opening` → `opened` → `closing`
- **Focus trap**: Uses `focus-trap` library for modal/page overlay types
- **Warm-up/cool-down timers** for delayed overlays

**2nd-gen migration requirements:**
- Position calculation engine (Floating UI or platform `popover` API)
- Overlay stacking management
- Focus trap implementation
- Interaction controller framework
- Transition/animation coordination

### Picker and combobox

**Current 1st-gen architecture:**

```text
Picker → SizedMixin(ExpandableElement) → SpectrumElement
Combobox → Textfield → ManageHelpText(SizedMixin(Focusable))
```

**Key patterns:**
- **Platform-specific controllers**: `DesktopController` vs `MobileController` swap based on `MatchMediaController`
- **Selection synchronization**: `manageSelection()` syncs `value` ↔ `<sp-menu>` items
- **Lazy overlay rendering**: `hasRenderedOverlay` flag
- **Keyboard cycling**: Arrow keys cycle options without opening (Picker)
- **Combobox filtering**: `MutationObserver` watches slotted items, `aria-activedescendant` tracking
- **IME composition**: `compositionstart/end` events for multi-byte input

**2nd-gen migration requirements:**
- Form participation patterns (value, validation, submit)
- Menu integration contract
- Device-adaptive behavior system
- Lazy rendering infrastructure
- IME and composition event handling

### Tabs

**Current 1st-gen architecture:**

```text
Tabs → SizedMixin(Focusable)
Tab → FocusVisiblePolyfillMixin(ObserveSlotText(ObserveSlotPresence(SpectrumElement)))
TabPanel → SpectrumElement
```

**Key patterns:**
- **RovingTabindexController** manages keyboard navigation across tabs
- **Selection indicator** animation using `ScaledIndicator` transform calculations
- **Panel management**: `managePanels()` syncs `aria-selected`, `aria-controls`, `aria-labelledby`
- **Scroll management**: `enableTabsScroll`, `scrollToSelection()` for overflow
- **ResizeController** and **IntersectionController** from `@lit-labs/observers`

**2nd-gen migration requirements:**
- Roving tabindex controller
- Cross-component ARIA linking (Tab ↔ TabPanel)
- Selection indicator animation system
- Scroll management for overflow
- Resize/intersection observation integration

### Dialog

**Current 1st-gen architecture:**

```text
Dialog → ObserveSlotPresence(AlertDialog) → FocusVisiblePolyfillMixin(SpectrumElement)
DialogWrapper → DialogBase → FocusVisiblePolyfillMixin(SpectrumElement)
```

**Key patterns:**
- **Transition promises**: `transitionPromise` tracks animation completion
- **`getUpdateComplete()`** waits for transitions (critical for overlay focus management)
- **`overlayWillCloseCallback()`**: Called by overlay system before close
- **Mode management**: `fullscreen`, `fullscreenTakeover` affect layout
- **Responsive behavior**: Auto-fullscreen on small screens via media query

**2nd-gen migration requirements:**
- Transition-aware `updateComplete` lifecycle
- Overlay integration contract (open/close callbacks)
- Focus management on open/close
- Responsive layout adaptation

### Table

**Current 1st-gen architecture:**

```text
Table → SizedMixin(SpectrumElement)
TableRow, TableHead, TableBody, TableCell, etc. → SpectrumElement
```

**Key patterns:**
- **Virtualization** via `@lit-labs/virtualizer` with `virtualize()` directive
- **Dual selection tracking**: `selectedSet` (Set) + `selected` (Array)
- **Dynamic checkbox management**: Programmatically creates/removes checkbox cells
- **Function properties**: `renderItem`, `itemValue`, `itemLabel` for customization
- **ARIA grid pattern**: `role="grid"`, `aria-rowindex`, `aria-rowcount`

**2nd-gen migration requirements:**
- Virtualization integration
- ARIA grid pattern implementation
- Selection management (single, multiple, range)
- Dynamic child element management
- Function property pattern

### Textfield and number field

**Current 1st-gen architecture:**

```text
Textfield → TextfieldBase → ManageHelpText(SizedMixin(Focusable))
NumberField → TextfieldBase
```

**Key patterns:**
- **Form validation**: `checkValidity()` with custom pattern matching
- **Auto-growing textarea**: `grows` property with sizer element
- **NumberField internationalization**: `NumberFormatter`/`NumberParser` from `@internationalized/number`
- **Focused/unfocused formatters**: Different display format when editing vs viewing
- **IME composition**: Japanese full-width character remapping
- **Step validation**: Modulo calculations for step compliance
- **Help text association**: `ManageHelpText` mixin manages `aria-describedby`

**2nd-gen migration requirements:**
- Help text mixin or controller
- Number formatting/parsing infrastructure
- IME composition handling
- Form validation patterns
- Auto-growing textarea behavior

---

## Shared infrastructure gap analysis

### What has been ported to 2nd-gen core

| Infrastructure | Core location | Status |
|---------------|---------------|--------|
| `SpectrumElement` base class | `core/element/spectrum-element.ts` | Complete |
| `defineElement` helper | `core/element/define-element.ts` | Complete |
| `SizedMixin` | `core/mixins/sized-mixin.ts` | Complete |
| `ObserveSlotPresence` | `core/mixins/observe-slot-presence.ts` | Complete |
| `ObserveSlotText` | `core/mixins/observe-slot-text.ts` | Complete |
| `LanguageResolutionController` | `core/controllers/language-resolution.ts` | Complete |
| `getLabelFromSlot` utility | `core/utils/get-label-from-slot.ts` | Complete |
| `capitalize` utility | `core/utils/capitalize.ts` | Complete |
| Debug warning system (`window.__swc`) | `core/element/spectrum-element.ts` | Complete |

### What remains 1st-gen only

| Infrastructure | 1st-gen location | Migration impact |
|---------------|-----------------|-----------------|
| `Focusable` base class | `1st-gen/tools/shared/src/focusable.ts` | **Critical** — needed by all interactive components |
| `FocusVisiblePolyfillMixin` | `1st-gen/tools/shared/src/focus-visible.ts` | **Evaluate** — may not be needed with modern browser support |
| `LikeAnchor` mixin | `1st-gen/tools/shared/src/like-anchor.ts` | **Needed** — for Button, Action Button, Menu Item |
| `ManageHelpText` mixin | `1st-gen/packages/shared/src/manage-help-text.ts` | **Needed** — for all form components |
| `CheckboxMixin` | `1st-gen/packages/checkbox/src/CheckboxMixin.ts` | **Needed** — for Checkbox, Switch |
| `PlacementController` | `1st-gen/packages/overlay/` | **Critical** — overlay positioning |
| `InteractionController` family | `1st-gen/packages/overlay/` | **Critical** — overlay trigger behavior |
| `RovingTabindexController` | `1st-gen/packages/shared/` | **Needed** — keyboard navigation |
| `ColorController` | `1st-gen/tools/reactive-controllers/` | **Needed** — color components |
| `GridController` | `1st-gen/tools/grid/` | **Needed** — Grid component |
| `PendingStateController` | `1st-gen/packages/button/` | **Needed** — Button loading states |
| `MatchMediaController` | `1st-gen/packages/picker/` | **Needed** — device-adaptive components |
| Platform detection utilities | `1st-gen/tools/shared/src/platform.ts` | **Needed** — platform-specific behavior |
| `reparentChildren()` | `1st-gen/tools/shared/src/reparent-children.ts` | **Evaluate** — used by overlay system |
| `randomID()` | `1st-gen/tools/shared/src/random-id.ts` | **Needed** — ARIA ID generation |
| `firstFocusableIn()` / `firstFocusableSlottedIn()` | `1st-gen/tools/shared/src/first-focusable-in.ts` | **Needed** — focus management |
| `getActiveElement()` | `1st-gen/tools/shared/src/get-active-element.ts` | **Needed** — shadow DOM focus tracking |
| `getDeepElementFromPoint()` | `1st-gen/tools/shared/src/get-deep-element-from-point.ts` | **Evaluate** — shadow DOM hit testing |
| Focusable element selectors | `1st-gen/tools/shared/src/focusable-selectors.ts` | **Needed** — focus trap implementation |

### What has been redesigned

| Pattern | 1st-gen approach | 2nd-gen approach | Impact |
|---------|-----------------|-----------------|--------|
| CSS tokens | `--spectrum-*` + `--mod-*` fallbacks | `token()` → `--swc-*` single level | Simplified, less indirection |
| CSS format | CSS-in-JS (`css` template literal) | Native `.css` files + PostCSS | Better tooling support |
| Custom properties | 3-tier (spectrum → mod → property) | 2-tier (public `--swc-*` or private `--_swc-*`) | Clearer API boundary |
| Class naming | `.spectrum-*` | `.swc-*` | Clean namespace |
| Storybook | Webpack, manual setup | Vite, CEM-driven, tag-based docs | Significant DX improvement |
| Testing | Separate frameworks | Unified play functions + Vitest | Single test paradigm |
| Documentation | Static template | Conditional tag-based rendering | Richer, more organized |

---

## Patterns to establish in 2nd-gen

### Priority 1: Focus management infrastructure

**What exists in 1st-gen:** `Focusable` base class managing `tabIndex`, `disabled`, `autofocus`, and focus delegation to internal elements.

**What 2nd-gen needs:**
- A `Focusable` mixin or controller in core that handles:
  - `tabIndex` management with disabled state (`-1` when disabled)
  - `focusElement` delegation (focus forwarded to internal input/button)
  - `autofocus` on first connection
  - `getUpdateComplete()` awaiting focusable element readiness
- Decision: Should this be a **mixin** (inheritance) or **controller** (composition)?
  - Mixin advantage: Can override `focus()`, `blur()`, `click()` methods
  - Controller advantage: More flexible composition, avoids deep inheritance
  - Recommendation: **Mixin** for focus delegation (needs method overrides) with an optional **controller** for complex focus patterns (focus trap, roving tabindex)

**Evaluate for removal:** `FocusVisiblePolyfillMixin` — modern browsers support `:focus-visible` natively. If the minimum browser support matrix allows it, this mixin can be dropped entirely, reducing complexity.

### Priority 2: Overlay and positioning system

**What exists in 1st-gen:** Complex overlay system with placement controller, interaction controllers, overlay stack, and focus trapping.

**What 2nd-gen needs:**
- Evaluate native `popover` API as the primary positioning mechanism
  - Browser support: Chromium 114+, Firefox 125+, Safari 17+
  - Benefits: Built-in top-layer positioning, light dismiss, stacking
  - Limitations: No arrow positioning, limited placement control
- `PlacementController` equivalent using Floating UI for precise positioning
- Interaction controller framework (click, hover, longpress triggers)
- Focus trap integration for modal overlays
- Animation/transition coordination

**Modernization opportunity:** The native `popover` API can replace much of `OverlayStack`'s z-index and top-layer management. 1st-gen already has a runtime mixin that branches on `showPopover` support — 2nd-gen can make `popover` the primary path.

### Priority 3: Form participation patterns

**What exists in 1st-gen:** `ManageHelpText` mixin, `Focusable` base, custom validation logic per component.

**What 2nd-gen needs:**
- `ElementInternals` API for native form participation
  - `formAssociated`, `setFormValue()`, `setValidity()`, `reportValidity()`
  - Browser support: Chromium 77+, Firefox 98+, Safari 16.4+
- Help text association pattern (`aria-describedby` management)
- Validation pattern (constraint validation API integration)
- Value management (serialization, form data)

**Modernization opportunity:** `ElementInternals` eliminates the need for hidden `<input>` elements and custom form registration that 1st-gen uses. This is a significant simplification.

### Priority 4: Cross-component communication

**What exists in 1st-gen:** Parent-child coordination (Tabs ↔ TabPanel, Picker ↔ Menu), context events, slot-based composition.

**What 2nd-gen needs:**
- Define a standard pattern for parent-child coordination:
  - Option A: Context events (current 1st-gen approach for theme)
  - Option B: Lit Context protocol (`@lit/context`)
  - Option C: Slot-based observation (current approach for simple cases)
- ARIA relationship management (e.g., `aria-controls`, `aria-labelledby` across shadow boundaries)
- Child registration/deregistration lifecycle

**Recommendation:** Use `@lit/context` for ambient state (theme, language, scale) and slot-based observation with event coordination for parent-child component relationships. This avoids the tight coupling of 1st-gen's custom event approach while leveraging Lit's built-in context protocol.

### Priority 5: Keyboard navigation infrastructure

**What exists in 1st-gen:** `RovingTabindexController` for tab-like navigation, per-component keyboard handling.

**What 2nd-gen needs:**
- Roving tabindex controller in core
- Standard keyboard navigation patterns:
  - Arrow key navigation (linear and grid)
  - Home/End support
  - Type-ahead selection
  - Focus wrapping behavior
- Keyboard event delegation patterns

### Priority 6: Platform detection and adaptive behavior

**What exists in 1st-gen:** `platform.ts` utilities (`isMac()`, `isIOS()`, etc.), `MatchMediaController`.

**What 2nd-gen needs:**
- Platform detection utilities in core
- Media query controller for reactive device detection
- Pattern for device-specific behavior switching (desktop vs mobile picker)

**Simplification opportunity:** The desktop/mobile controller split in Picker is the most complex device-adaptive pattern. Evaluate whether CSS-based responsive behavior (container queries, media queries) can replace some JavaScript branching.

### Priority 7: Internationalization patterns

**What exists in 1st-gen:** `LanguageResolutionController` (already in core), `@internationalized/number` for NumberField.

**What 2nd-gen needs:**
- `LanguageResolutionController` is already in core (complete)
- `@internationalized/number` integration pattern for numeric formatting
- RTL layout support patterns
- IME composition handling for CJK input

---

## Patterns to modernize or simplify

### Mixin chain simplification

**Current problem:** Complex components stack 3-5 mixins deep, creating inheritance chains that are hard to debug:

```typescript
// 1st-gen Textfield chain
ManageHelpText(SizedMixin(Focusable))
// Where Focusable = SpectrumElement + tabindex/disabled/autofocus
// And SpectrumElement = SpectrumMixin(LitElement)
// Total depth: 4 levels
```

**Recommendation:**
- Reserve mixins for patterns that **must override base class methods** (Focus, Size)
- Move cross-cutting concerns to **reactive controllers** where possible:
  - Help text → `HelpTextController`
  - Pending state → `PendingStateController`
  - Roving tabindex → `RovingTabindexController`
  - Platform detection → `PlatformController`
- Target maximum mixin depth of 2 for most components

### CSS-in-JS to native CSS migration

**Already done in 2nd-gen.** The `token()` + PostCSS pipeline is mature and well-documented.

**Additional opportunity:** Evaluate `@property` CSS registered custom properties for type-safe, animatable custom properties. This is a web standards feature that could replace some JavaScript-driven animation patterns.

### Overlay architecture modernization

**Current problem:** `OverlayStack` is a complex global singleton managing z-index and top-layer behavior.

**Recommendation:**
- Use native `popover` API as the primary top-layer mechanism
- Use CSS `anchor()` positioning where browser support allows (Chromium 125+)
- Fall back to Floating UI for positioning only when `anchor()` is unavailable
- Replace `OverlayStack` singleton with platform primitives where possible
- Use `<dialog>` element for modal behavior (built-in focus trap, escape handling)

### Token system modernization

**Already established in 2nd-gen.** The `token()` function and `@adobe/swc-tokens` pipeline is a clean replacement for the `--spectrum-*` + `--mod-*` chain.

**Additional consideration:** As the design token ecosystem evolves, evaluate the W3C Design Tokens specification for potential alignment.

### Controller consolidation

**Current problem:** Controllers are scattered across 1st-gen packages with no shared location.

**Recommendation:** As controllers are ported to 2nd-gen, place them in `core/controllers/` with clear categorization:

```text
core/controllers/
├── focus/
│   ├── focusable.ts
│   └── roving-tabindex.ts
├── form/
│   ├── help-text.ts
│   └── validation.ts
├── interaction/
│   ├── click.ts
│   ├── hover.ts
│   └── longpress.ts
├── layout/
│   ├── resize.ts
│   └── intersection.ts
├── positioning/
│   └── placement.ts
└── platform/
    ├── language-resolution.ts (existing)
    └── media-query.ts
```

### Testing architecture modernization

**Already established in 2nd-gen.** The Storybook play function approach with 5 standard test sections is well-designed.

**Additional opportunities:**
- Formalize component test templates that can be generated for new components
- Expand ARIA snapshot testing coverage
- Add visual regression testing (VRT) integration with the CEM for detecting visual API changes

---

## Complexity reduction opportunities

### Eliminate the mod indirection layer

**1st-gen pattern (to eliminate):**

```css
min-block-size: var(--mod-badge-height, var(--spectrum-badge-height));
```

**2nd-gen pattern (established):**

```css
min-block-size: var(--swc-badge-height, token("component-height-100"));
```

This eliminates the entire `--mod-*` vocabulary and reduces fallback chains from 3+ levels to 1. Already documented in the [anti-patterns guide](../../02_style-guide/01_css/05_anti-patterns.md).

### Reduce mixin depth

**1st-gen pattern:**

```typescript
export class Combobox extends Textfield { }
// Where Textfield = TextfieldBase = ManageHelpText(SizedMixin(Focusable))
// Where Focusable = SpectrumElement chain
```

**2nd-gen opportunity:**

```typescript
export abstract class ComboboxBase extends SizedMixin(FocusableMixin(SpectrumElement)) {
  helpTextController = new HelpTextController(this);
  validationController = new ValidationController(this);
  // Flatten by moving cross-cutting concerns to controllers
}
```

Target: Maximum mixin depth of 2 (e.g., `SizedMixin(FocusableMixin(SpectrumElement))`), with additional behavior via controllers.

### Simplify device-specific branching

**1st-gen pattern:**

```typescript
// Picker creates different controllers at runtime based on device
const ControllerClass = this.isMobile ? MobileController : DesktopController;
this.interactionController = new ControllerClass(this);
```

**2nd-gen opportunity:**
- Use CSS container queries and media queries for layout adaptation
- Use a single controller that adapts behavior via a `PlatformController` flag
- Reserve JavaScript branching for genuinely different interaction models

### Declarative ARIA management

**1st-gen pattern:**

```typescript
protected override firstUpdated(): void {
  if (!this.hasAttribute('role')) this.setAttribute('role', 'progressbar');
}
protected override updated(): void {
  this.setAttribute('aria-valuenow', String(this.progress));
  this.setAttribute('aria-valuemin', '0');
  this.setAttribute('aria-valuemax', '100');
}
```

**2nd-gen opportunity:** Explore a declarative ARIA mixin or base class pattern:

```typescript
// Hypothetical declarative approach
static ariaDefaults = {
  role: 'progressbar',
  'aria-valuemin': '0',
  'aria-valuemax': '100',
};

static ariaBindings = {
  'aria-valuenow': 'progress',
  'aria-label': 'label',
};
```

This would reduce boilerplate for ARIA management across components, though it needs careful evaluation against Lit's existing `ARIAMixin` and `ElementInternals.role`.

### Centralized validation

**1st-gen pattern (inconsistent):**

```typescript
// Badge uses update()
protected override update(changedProperties: PropertyValues): void {
  if (window.__swc?.DEBUG) { /* validate */ }
  super.update(changedProperties);
}

// StatusLight uses updated()
protected override updated(changedProperties: PropertyValues): void {
  super.updated(changedProperties);
  if (window.__swc?.DEBUG) { /* validate */ }
}
```

**2nd-gen recommendation:** Standardize on `updated()` for validation, and consider a base class method:

```typescript
// In SpectrumElement or as a mixin
protected validateProperties(): void {
  // Override in subclasses to add validation
}

protected override updated(changedProperties: PropertyValues): void {
  super.updated(changedProperties);
  if (window.__swc?.DEBUG) this.validateProperties();
}
```

---

## Migration risk assessment

### Low risk (presentational components)

Components with minimal interaction, no form behavior, and straightforward rendering. These follow the established Badge/StatusLight pattern.

| Component | Key patterns | Migration notes |
|-----------|-------------|-----------------|
| Avatar | SizedMixin, image loading | Simple presentational |
| Illustrated Message | Slot composition | No interaction |
| Thumbnail | SizedMixin, image loading | Simple presentational |
| Swatch / Swatch Group | Color display | Minimal interaction |
| Tag / Tags | SizedMixin, variant, dismiss event | Low interaction |
| Meter | SizedMixin, ARIA progressbar | Same as Progress Circle/Bar |
| Field Label | Text display | Very simple |
| Help Text | Text display | Very simple |
| Dropzone | Drag events | Moderate events |

### Medium risk (interactive components)

Components requiring focus management, form participation, or keyboard navigation.

| Component | Key patterns | Migration blockers |
|-----------|-------------|-------------------|
| Button / Button Group | Focusable, LikeAnchor, PendingState | Needs Focusable mixin |
| Action Button / Action Group | Focusable, LikeAnchor, Longpress | Needs Focusable + interaction |
| Link | Focusable, LikeAnchor | Needs Focusable + LikeAnchor |
| Checkbox / Switch | CheckboxMixin, form | Needs form participation |
| Radio | Form group, roving tabindex | Needs keyboard nav |
| Textfield / Search | ManageHelpText, validation | Needs form infrastructure |
| Number Field | i18n, IME, validation | Needs form + i18n |
| Slider | HandleController, drag | Needs drag infrastructure |
| Field Group | Form group coordination | Needs form group pattern |

### High risk (system-level components)

Components requiring overlay, cross-component coordination, or complex state management.

| Component | Key patterns | Migration blockers |
|-----------|-------------|-------------------|
| Overlay / Overlay Trigger | PlacementController, OverlayStack, focus trap | Needs entire overlay system |
| Picker / Combobox | Overlay, menu integration, platform-adaptive | Needs overlay + form + keyboard |
| Dialog / Alert Dialog | Overlay, transitions, focus trap | Needs overlay + transitions |
| Menu / Menu Item | Roving tabindex, typeahead, nested menus | Needs keyboard nav infrastructure |
| Tabs / Tab / Tab Panel | Roving tabindex, cross-component ARIA | Needs keyboard nav + ARIA linking |
| Table | Virtualization, ARIA grid, selection | Needs virtualization + keyboard |
| Popover | Overlay positioning | Needs overlay system |
| Toast | Overlay, auto-dismiss | Needs overlay system |
| Tray | Overlay, responsive | Needs overlay system |
| Sidenav | Roving tabindex, tree navigation | Needs keyboard nav |
| Accordion | Roving tabindex, expand/collapse | Needs keyboard nav |
| Breadcrumbs | Overflow, navigation | Needs overflow handling |
| Color components | ColorController, drag, i18n | Needs color + drag infrastructure |

---

## Recommendations summary

### Infrastructure to build before migrating interactive components

1. **Focusable mixin** — port `Focusable` to `core/mixins/`, evaluate dropping `FocusVisiblePolyfillMixin`
2. **LikeAnchor mixin** — port to `core/mixins/` for link-like components
3. **RovingTabindexController** — port to `core/controllers/` for keyboard navigation
4. **Form participation mixin** — build using `ElementInternals` for modern form integration
5. **Help text controller** — convert `ManageHelpText` mixin to controller pattern
6. **Platform utilities** — port `platform.ts` detection functions to `core/utils/`
7. **Focus utilities** — port `getActiveElement()`, `firstFocusableIn()`, focusable selectors to `core/utils/`
8. **Random ID utility** — port `randomID()` to `core/utils/` for generating unique IDs within shadow roots. Note: IDREFs don't cross shadow boundaries, so this is primarily useful for internal `aria-labelledby`/`aria-describedby` references within the same shadow root, or for non-ARIA purposes like CSS targeting.

### Infrastructure to build before migrating complex components

1. **Overlay positioning controller** — build on `popover` API + Floating UI fallback
2. **Interaction controllers** — click, hover, longpress trigger patterns
3. **Focus trap** — modal overlay focus containment
4. **Cross-component ARIA** — pattern for linking components across shadow boundaries
5. **Virtualization integration** — pattern for `@lit-labs/virtualizer` or equivalent

### Standards to formalize

1. **Mixin depth limit** — maximum 2 mixins, additional behavior via controllers
2. **Lifecycle usage** — `updated()` for validation, `firstUpdated()` for one-time ARIA setup
3. **Styles declaration** — always `static override get styles()` (not property assignment)
4. **Type prefix naming** — always use underscore separators (e.g., `STATUS_LIGHT_`, not `STATUSLIGHT_`)
5. **Property decorator completeness** — always specify `type` in `@property()` options
6. **Class-level JSDoc** — base: description + `@slot`; SWC: `@element` + `@example`
7. **Role assignment** — set role unconditionally; components should be opinionated about their semantic role
8. **Meta export** — use named `export const meta` for test reuse
9. **CSS class prefix** — enforce `swc-*` universally (fix Asset's `spectrum-*`)
10. **CSS universal reset** — standardize `*, *::before, *::after { box-sizing: border-box; }`
11. **Forced-colors decision rubric** — validate browser defaults before adding overrides

### Existing patterns to preserve

These 2nd-gen patterns are well-established and should remain:

- Core/SWC split with abstract base → concrete implementation
- `token()` function for design token resolution
- `--swc-*` / `--_swc-*` custom property naming
- `:host()` for exposed variants, internal classes for implementation-only variants
- Specificity target of `(0,1,0)` with `:where()` for compounding
- Section separators in TypeScript and stories
- CEM-driven Storybook controls via wc-toolkit
- Tag-based documentation rendering via DocumentTemplate
- Play function testing with 5 standard sections
- Debug-mode warnings via `window.__swc`
