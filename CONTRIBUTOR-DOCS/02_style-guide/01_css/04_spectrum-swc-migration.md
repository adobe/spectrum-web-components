<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-Gen CSS](README.md) / Spectrum CSS to SWC Migration

<!-- Document title (editable) -->

# Spectrum CSS to SWC Migration

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Core Migration Steps](#core-migration-steps)
- [Reference Migration: Badge](#reference-migration-badge)
    - [1. Collapse `--mod-*` Chains into Explicit Component Properties](#1-collapse---mod--chains-into-explicit-component-properties)
    - [2. Separate Customization Surface from Implementation Details](#2-separate-customization-surface-from-implementation-details)
    - [3. Replace Prescriptive Spacing with Layout Primitives](#3-replace-prescriptive-spacing-with-layout-primitives)
    - [4. Use Private Properties for Mechanical Calculations](#4-use-private-properties-for-mechanical-calculations)
    - [5. Validation Step: Removing Legacy Classes](#5-validation-step-removing-legacy-classes)
    - [Summary](#summary)

</details>

<!-- Document content (editable) -->

This guide outlines the high-level mechanical steps for migrating existing Spectrum CSS components from `spectrum-two` into the 2nd-gen SWC styling model. Detailed rules and rationale are covered in the linked style guides.

## Core Migration Steps

For concrete before/after examples of each of these steps, review the [reference migration](#reference-migration-badge) as well as examples for avoiding issues in the [anti-patterns guide](05_anti-patterns.md).

> _The order after #1 & #2 isn’t important, but individual steps must be completed when applicable._

1. Add wrapper element with a class of `.swc-[ComponentName]` around existing html `render()`
   - move the `classMap` onto the new wrapper element and off of the host element
2. Repurpose existing `[component-name].css` to combine copy of `spectrum-two` branch styles with existing SWC overrides. _The goal of this step is to establish a functionally equivalent baseline before applying new styling conventions._
   - copy from the original source CSS in `index.css` , not `/dist`
     - Spectrum CSS may need divided if SWC is currently separate component files (ex. Accordion and AccordionItem)
       - Example: currently `accordion.css` includes styles for the parent accordion & accordion-item so need divided into `accordion.css` and `accordion-item.css` files
   - use original Spectrum CSS stylesheet rule order, and insert SWC additions or apply overrides to existing rules where applicable, or at the end of the stylesheet if new to ensure override of prior styles
   - retain any `::slotted()` styles found in SWC, including within any parent rules if applicable
   - combine media/preference queries
   - update class and custom property prefixes from `.spectrum` to `.swc`
        - you will refine custom properties more in step #4, but this will re-enable the initial visual styles since the prefix for design tokens has changed
3. Update from the base `:host` selector to use the component wrapper class name _unless_ determined to be a critical style best left on `:host`
    - Visual styling should generally move off of `:host` and onto the component wrapper class. Styles left on `:host` should be limited to layout participation or defensive defaults (see `:host` guidance in the [Component CSS Style Guide](01_component-css.md)).
4. Remove `--mod` properties, and migrate behavior using exposed or internal custom properties, plus upgrade to `token()`, as described in the [Custom Properties style guide](02_custom-properties.md)
    - during migration, collapse `--mod-*` fallback chains into a single, intentional component custom property
5. Remove any extra override CSS files after combination is complete
6. After applying custom properties guidance and the additional [Component CSS Style Guide](01_component-css.md) rules, revisit the `render()` and remove any unused classes
   - this often indicates successful consolidation of variant and state logic into CSS

> **Tip:** If a migration feels unusually complex, it often indicates that legacy Spectrum styles encoded behavior that should now be expressed via custom properties or layout primitives. Visit the style guides to help guide refactoring decisions.

## Reference Migration: Badge

Badge is the canonical example of a Spectrum → SWC migration. It demonstrates:

- collapsing `--mod-*` indirection into intentional component custom properties
- reducing long custom property fallback chains
- separating the customization surface from implementation details
- replacing prescriptive spacing rules with CSS layout primitives

This reference complements the **Spectrum CSS to SWC Migration** guide and provides concrete examples that explain _why_ each migration step exists.

### 1. Collapse `--mod-*` Chains into Explicit Component Properties

#### Before (Spectrum CSS)

```css
min-block-size: var(--mod-badge-height, var(--spectrum-badge-height));
border-radius: var(--mod-badge-corner-radius, var(--spectrum-badge-corner-radius));
background: var(--mod-badge-background-color-default, var(--spectrum-badge-background-color-default));
```

#### After (SWC)

```css
min-block-size: var(--swc-badge-height, token('component-height-100'));
border-radius: var(
  --swc-badge-corner-radius,
  token('corner-radius-medium-size-medium')
);
background: var(
  --swc-badge-background-color,
  token('accent-background-color-default')
);
```

**What Changed**

- `--mod-*` acted as an indirection layer on top of Spectrum tokens
- SWC replaces that layer with **explicit, component-level custom properties**
- Fallback chains are intentionally shortened
- Customization intent is visible and deliberate

📖 See: _Custom Properties Style Guide → Component Custom Property Exposure_

### 2. Separate Customization Surface from Implementation Details

Badge clearly distinguishes between **exposed customization** and **internal implementation**.

#### Exposed customization (attribute-based)

```css
:host([size='s']) {
  --swc-badge-height: token('component-height-75');
  --swc-badge-font-size: token('font-size-75');
}
```

```css
:host([variant='negative']) {
  --swc-badge-background-color: token('negative-background-color-default');
}
```

#### Internal implementation (class-based)

```css
.swc-Badge--chartreuse,
.swc-Badge--celery {
  --swc-badge-label-icon-color: token('black');
}
```

**What Changed**

- Attribute selectors define the **public customization surface**
- Class selectors represent **implementation-only variants**
- Selector choice encodes customization intent

📖 See: _Component CSS Style Guide → Shadow DOM Specificity and Custom Property Inheritance_

### 3. Replace Prescriptive Spacing with Layout Primitives

#### Before

- Multiple edge-specific spacing variables
- Separate label and icon padding rules
- Conditional spacing spread across selectors

#### After

```css
.swc-Badge {
  display: inline-flex;
  align-items: center;
  gap: var(--swc-badge-gap, token('text-to-visual-100'));
  padding-inline: var(
    --swc-badge-padding-inline,
    token('component-edge-to-text-100')
  );
  padding-block: var(
    --swc-badge-padding-block,
    token('component-top-to-text-100')
    token('component-bottom-to-text-100')
  );
}
```

```css
.swc-Badge:has(.swc-Badge-icon) {
  --swc-badge-padding-inline: token('component-edge-to-visual-100');
}
```

**What Changed**

- Layout intent is expressed with `flex`, `gap`, and alignment
- Padding becomes defensive rather than structural
- Conditional spacing is centralized and declarative

📖 See: _Component CSS Style Guide → Component Specs vs. Component Styles_

### 4. Use Private Properties for Mechanical Calculations

```css
--_swc-badge-border-width: token('border-width-200');
--_swc-badge-border-width-deduction: calc(
  var(--_swc-badge-border-width) * 2
);
```

**What Changed**

- Private properties are used for derived or mechanical values
- These values are intentionally not overrideable
- The public customization surface remains minimal

📖 See: _Custom Properties Style Guide → Private Properties_

### 5. Validation Step: Removing Legacy Classes

After migration:

- Spectrum-era classes are removed from `render()`
- Variant and state logic is expressed entirely in CSS
- The component no longer depends on legacy styling patterns

This confirms the migration is complete and prevents regression.

📖 See: _Spectrum CSS to SWC Migration → Step 6_

### Summary

Badge demonstrates the core goals of the SWC styling model:

- explicit and intentional customization
- reduced indirection and simpler override paths
- clear separation between public API and implementation
- CSS that works with layout models instead of fighting them

Use this migration as a reference when migrating other components.
