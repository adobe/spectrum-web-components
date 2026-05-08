<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-Gen CSS](README.md) / Styling Anti-Patterns (What to Avoid)

<!-- Document title (editable) -->

# Styling Anti-Patterns (What to Avoid)

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [1. Leaving Visual Styles on `:host`](#1-leaving-visual-styles-on-host)
    - [❌ Anti-Pattern](#-anti-pattern)
    - [Why This Happens](#why-this-happens)
    - [Why This Is a Problem](#why-this-is-a-problem)
    - [✅ Correct Approach](#-correct-approach)
- [2. Preserving `--mod-*` as an Extra Indirection Layer](#2-preserving---mod--as-an-extra-indirection-layer)
    - [❌ Anti-Pattern](#-anti-pattern)
    - [Why This Happens](#why-this-happens)
    - [Why This Is a Problem](#why-this-is-a-problem)
    - [✅ Correct Approach](#-correct-approach)
- [3. Excess Variant Classes in `render()`](#3-excess-variant-classes-in-render)
    - [❌ Anti-Pattern](#-anti-pattern)
    - [Why This Happens](#why-this-happens)
    - [Why This Is a Problem](#why-this-is-a-problem)
    - [✅ Correct Approach](#-correct-approach)
- [4. Increasing Selector Specificity to Force Overrides](#4-increasing-selector-specificity-to-force-overrides)
    - [❌ Anti-Pattern](#-anti-pattern)
    - [Why This Happens](#why-this-happens)
    - [Why This Is a Problem](#why-this-is-a-problem)
    - [✅ Correct Approach](#-correct-approach)
- [5. Using `:where()` Inside `:host()` for Custom Property Updates](#5-using-where-inside-host-for-custom-property-updates)
    - [❌ Anti-Pattern](#-anti-pattern)
    - [Why This Happens](#why-this-happens)
    - [Why This Is a Problem](#why-this-is-a-problem)
    - [✅ Correct Approach](#-correct-approach)
- [6. Exposing Too Many Custom Properties “Just in Case”](#6-exposing-too-many-custom-properties-just-in-case)
    - [❌ Anti-Pattern](#-anti-pattern)
    - [Why This Happens](#why-this-happens)
    - [Why This Is a Problem](#why-this-is-a-problem)
    - [✅ Correct Approach](#-correct-approach)
- [7. Treating Forced-Colors as a Variant](#7-treating-forced-colors-as-a-variant)
    - [❌ Anti-Pattern](#-anti-pattern)
    - [Why This Happens](#why-this-happens)
    - [Why This Is a Problem](#why-this-is-a-problem)
    - [✅ Correct Approach](#-correct-approach)
- [8. Leaving Spectrum-Era Classes After Migration](#8-leaving-spectrum-era-classes-after-migration)
    - [❌ Anti-Pattern](#-anti-pattern)
    - [Why This Happens](#why-this-happens)
    - [Why This Is a Problem](#why-this-is-a-problem)
    - [✅ Correct Approach](#-correct-approach)
- [Before/after refactoring examples](#beforeafter-refactoring-examples)
    - [Visual styles on `:host` → base class](#visual-styles-on-host--base-class)
    - [Specificity escalation → `:where()`](#specificity-escalation--where)
    - [Size classes in render → `:host([size])`](#size-classes-in-render--hostsize)
    - [`--mod-*` chain → single property](#--mod--chain--single-property)
- [Final Reminder](#final-reminder)

</details>

<!-- Document content (editable) -->

This appendix lists **common mistakes encountered when adopting the 2nd-gen SWC styling model**, why they happen, and what to do instead.

Each anti-pattern is grounded in real Spectrum source patterns. **Badge** and **Status Light** are reference implementations for correct patterns.

📖 **Reference implementations**: [Badge](../../../2nd-gen/packages/swc/components/badge/badge.css) · [Status Light](../../../2nd-gen/packages/swc/components/status-light/status-light.css) · [Reference Migration: Badge](04_spectrum-swc-migration.md#reference-migration-badge)

## 1. Leaving Visual Styles on `:host`

### ❌ Anti-Pattern

```css
:host {
  padding: 8px;
  background-color: var(--spectrum-badge-background-color-default);
}
```

### Why This Happens

- Spectrum CSS often treated the custom element root as the primary styling surface
- Incremental migrations make it tempting to keep existing rules in place

### Why This Is a Problem

- `:host` is part of the **public styling API**
- Visual styles here are harder to override predictably
- This breaks the SWC model where `:host` defines **layout participation only**

### ✅ Correct Approach

```css
:host {
  display: inline-flex;
}

.swc-Badge {
  background: var(
    --swc-badge-background-color,
    token("neutral-subdued-background-color-default")
  );
}
```

🔎 **Badge reference:**  
See the migrated Badge where `:host` is limited to layout (`display`, `place-self`, `vertical-align`) and all visual styling lives on `.swc-Badge`.

📖 See: *Component CSS Style Guide → [Rule order](01_component-css.md#rule-order)*


## 2. Preserving `--mod-*` as an Extra Indirection Layer

This anti-pattern reflects one of the most common and subtle migration mistakes.

### ❌ Anti-Pattern

Preserving Spectrum-era `--mod-*` fallback chains, or introducing an SWC equivalent:

```css
min-block-size: var(--mod-badge-height, var(--swc-badge-height));
border-radius: var(--mod-badge-corner-radius, var(--swc-badge-corner-radius));
background: var(--mod-badge-background-color-default, var(--swc-badge-background-color-default));
```

or:

```css
min-block-size: var(--swc-mod-badge-height, token("component-height-100"));
```

### Why This Happens

- `--mod-*` functioned as a lightweight override hook in Spectrum CSS
- It allowed customization without modifying base rules
- Preserving the pattern can feel safer during migration

### Why This Is a Problem

- `--mod-*` adds an unnecessary **layer of indirection**
- Long fallback chains are harder to reason about and override
- It obscures which values are **intentionally exposed** by the component
- It conflicts with SWC’s model of **explicit component-level customization**

### ✅ Correct Approach

- Remove `--mod-*` entirely
- Collapse the fallback chain into a single component custom property
- Decide whether the property should be:
  - **exposed** (`--swc-*`)
  - or **internal** (`--_swc-*`)
- Reference design tokens directly via `token()`

```css
.swc-Badge {
  min-block-size: var(--swc-badge-height, token("component-height-100"));
  border-radius: var(
    --swc-badge-corner-radius,
    token("corner-radius-medium-size-medium")
  );
  background: var(
    --swc-badge-background-color,
    token("neutral-subdued-background-color-default")
  );
}
```

🔎 **Badge reference:**  
See the Badge migration where all `--mod-* → spectrum → property` chains are collapsed into intentional `--swc-badge-*` properties.

📖 See: *Custom Properties Style Guide → [Component custom property exposure](02_custom-properties.md#component-custom-property-exposure)*


## 3. Excess Variant Classes in `render()`

### ❌ Anti-Pattern

This is an anti-pattern when the class is _not_ being used in the actual component stylesheet.

```js
classMap({
  [`spectrum-Badge--size${this.size?.toUpperCase()}`]:
    typeof this.size !== 'undefined',
})
```

### Why This Happens

- Legacy Spectrum class-based patterns
- Uncertainty about expressing variants via attributes

### Why This Is a Problem

- Duplicates logic already expressed by attributes
- Extranneous when class not actually being used as a style hook

### ✅ Correct Approach

```css
:host([size="l"]) {
  --swc-badge-height: token("component-height-200");
}
```

🔎 **Badge reference:**  
Badge size, variant, subtle, and outline states are all expressed via `:host()` selectors and custom property updates.

📖 See: *Component CSS Style Guide → [Variant implementation patterns](01_component-css.md#variant-implementation-patterns)*

## 4. Increasing Selector Specificity to Force Overrides

### ❌ Anti-Pattern

```css
/* Multiple compounded classes = (0,3,0) */
.swc-Badge.swc-Badge--large.swc-Badge--primary {
  padding: 16px;
}

/* Or stacking to "win" a conflict */
.swc-StatusLight.swc-StatusLight--yellow.swc-StatusLight--sizeL {
  font-size: 20px;
}
```

### Why This Happens

- Conflicting migrated rules
- Attempting to preserve visual parity through selector escalation
- Copying patterns from other codebases that use high specificity

### Why This Is a Problem

- Breaks the `(0,1,0)` specificity target
- Makes overrides brittle (e.g. disabled state needs even higher specificity)
- Hides ordering or layering issues that should be fixed instead

### ✅ Correct Approach

- Fix rule order first
- Use `:where()` for compounding selectors
- Introduce cascade layers only when necessary

```css
/* Before: (0,2,0) */
.swc-Divider--staticWhite.swc-Divider--sizeL {
  --swc-divider-background-color: token("transparent-white-800");
}

/* After: (0,1,0) - rule order determines winner */
.swc-Divider--staticWhite:where(.swc-Divider--sizeL) {
  --swc-divider-background-color: token("transparent-white-800");
}
```

🔎 **Badge reference:**  
[badge.css](../../../2nd-gen/packages/swc/components/badge/badge.css) uses `.swc-Badge--subtle:where(.swc-Badge--gray)` for compounded variants. [Divider](../../../2nd-gen/packages/swc/components/divider/divider.css) uses the same pattern for static color + size.

📖 See: *Component CSS Style Guide → [Managing Specificity](01_component-css.md#managing-specificity)*

## 5. Using `:where()` Inside `:host()` for Custom Property Updates

### ❌ Anti-Pattern

```css
:host:where([size="l"][variant="primary"]) {
  --swc-badge-height: 40px;
}
```

### Why This Happens

- Over-application of `:where()` as a universal fix
- Assuming specificity controls custom property precedence

### Why This Is a Problem

- Custom properties resolve via **inheritance**, not specificity
- This obscures intent and adds complexity

### ✅ Correct Approach

```css
:host([size="l"][variant="primary"]) {
  --swc-badge-height: token("component-height-200");
}
```

🔎 **Badge reference:**  
Badge safely compounds attributes within `:host()` when updating custom properties only.

📖 See: *Component CSS Style Guide → [Shadow DOM specificity and custom property inheritance](01_component-css.md#shadow-dom-specificity-and-custom-property-inheritance)*

## 6. Exposing Too Many Custom Properties “Just in Case”

### ❌ Anti-Pattern

```css
--swc-badge-border-radius
--swc-badge-gap
--swc-badge-icon-offset
```

### Why This Happens

- Desire to future-proof
- Legacy expectations of deep customization

### Why This Is a Problem

- Bloats the public API
- Makes refactors harder
- Encourages unsupported overrides

### ✅ Correct Approach

- Expose only what the component itself needs
- Keep mechanical and derived values private

🔎 **Badge reference:**  
Badge exposes a minimal, intentional surface and uses `_swc-*` properties for derived calculations.

📖 See: *Custom Properties Style Guide → [Private properties](02_custom-properties.md#private-properties)*

## 7. Treating Forced-Colors as a Variant

### ❌ Anti-Pattern

```css
.swc-Badge {
  border-color: 
    var(--high-contrast-badge-border-color, var(--swc-badge-border-color, token("badge-border-color")));
}
```

### Why This Happens

- Treating accessibility as a customization hook

### Why This Is a Problem

- Forced-colors must override consumer styles
- Accessibility takes precedence over customization

### ✅ Correct Approach

- re-use existing component custom property to apply overrides
- properly order forced-colors at the end of the stylesheet
- attach to internal class-based selectors

```css
@media (forced-colors: active) {
  .swc-Badge {
    --swc-badge-border-color: CanvasText;
  }
}
```

🔎 **Status Light reference:**  
[status-light.css](../../../2nd-gen/packages/swc/components/status-light/status-light.css) overrides `--swc-status-light-content-color` and adds a border to the dot pseudo-element so it stays visible in high-contrast mode.

📖 See: *Component CSS Style Guide → [Forced colors requirements](01_component-css.md#forced-colors-requirements)*


## 8. Leaving Spectrum-Era Classes After Migration

### ❌ Anti-Pattern

```html
<div class="swc-Badge spectrum-Badge spectrum-Badge--sizeL">
```

### Why This Happens

- Incremental migration
- Hesitation to remove legacy code

### Why This Is a Problem

- Leaves dead code in `render()`
- Obscures whether migration is complete
- Encourages regression

### ✅ Correct Approach

- Remove Spectrum-era classes once CSS migration is complete
- Treat this as a **validation step**, not cleanup

🔎 **Badge reference:**  
After migration, Badge relies solely on `.swc-Badge` and attributes.

📖 See: *Spectrum CSS to SWC Migration → [Validation step: removing legacy classes](04_spectrum-swc-migration.md#5-validation-step-removing-legacy-classes)*

## Before/after refactoring examples

### Visual styles on `:host` → base class

| Before                                      | After                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------ |
| `:host { padding: 8px; background: blue; }` | `:host { display: inline-block; }` + `.swc-Badge { padding: ...; background: ...; }` |

### Specificity escalation → `:where()`

| Before                                   | After                                            |
| ---------------------------------------- | ------------------------------------------------ |
| `.swc-Badge--subtle.swc-Badge--gray { }` | `.swc-Badge--subtle:where(.swc-Badge--gray) { }` |

### Size classes in render → `:host([size])`

| Before                                    | After                                                                  |
| ----------------------------------------- | ---------------------------------------------------------------------- |
| `class="swc-Badge spectrum-Badge--sizeL"` | `class="swc-Badge"` + `:host([size="l"]) { --swc-badge-height: ...; }` |

### `--mod-*` chain → single property

| Before                                                  | After                                                    |
| ------------------------------------------------------- | -------------------------------------------------------- |
| `var(--mod-badge-height, var(--spectrum-badge-height))` | `var(--swc-badge-height, token("component-height-100"))` |

## Final Reminder

If you find yourself:

- adding more classes,
- increasing selector specificity,
- or preserving Spectrum-era indirection—

**pause and re-evaluate using the SWC styling model.**

The Badge migration demonstrates the intended end state:  
explicit customization, reduced indirection, and CSS that works with layout models instead of against them.
