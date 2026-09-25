---
name: 'spectrum-wc'
description: 'Build UIs with Spectrum 2 Web Components (swc-* elements, @adobe/spectrum-wc). Use when developers are working with the @adobe/spectrum-wc package or swc-* custom elements. Includes component and pattern API references (properties, slots, events, CSS custom properties, CSS parts) plus usage guidance.'
license: 'Apache-2.0'
metadata:
  author: 'Adobe'
  website: 'https://spectrum-web-components.adobe.com'
---

# Spectrum Web Components (Spectrum 2)

Spectrum 2 Web Components (`swc-*`) is Adobe's Spectrum 2 design system implemented
as framework-agnostic web components. All components ship from a single package,
`@adobe/spectrum-wc`.

> **Migrating from Spectrum 1?** Use the `migrate-swc-gen1-to-gen2` skill instead,
> which includes per-component migration guides and a full coexistence walkthrough.

## Quick start

```bash
yarn add @adobe/spectrum-wc
```

```ts
// App entry (once): global styles and design tokens
import '@adobe/spectrum-wc/swc.css';
```

```ts
// Where a component is used: import its entry to register the custom element
import '@adobe/spectrum-wc/components/button/swc-button.js';
```

```html
<html class="swc-theme swc-theme--light">
  <body>
    <swc-button variant="accent">Save</swc-button>
  </body>
</html>
```

> The `swc-theme` and `swc-theme--light` classes set the theme and scale for
> their subtree; apply them once on an ancestor high in the tree (e.g. `<html>`
> or your app root), not per component.

## Key concepts

- **Single package, subpath imports**: `@adobe/spectrum-wc` is a monolithic
  package; import each component from its own subpath so bundlers only include
  what is used, e.g.: `@adobe/spectrum-wc/components/badge/swc-badge.js`.

- **Theme classes, not a theme element**: unlike Spectrum 1's `<sp-theme>`
  wrapper, Spectrum 2 applies theme and scale via CSS classes on an ancestor
  element: `swc-theme--light`, `swc-theme--dark`, `swc-theme--adaptive`.

- **Side-effectful import**: importing a component's `.js` entry registers its
  custom element (e.g. `@adobe/spectrum-wc/components/button/swc-button.js`).
  Prefer this registering import; import the class directly (e.g.
  `@adobe/spectrum-wc/components/button/Button.js`) only for extension or typing.

- **Accessibility**: components handle their own roles, state, and keyboard
  interaction, but some require attributes you must supply. Read the
  accessibility section of each component's reference before using it.

## Documentation structure

The `references/` directory contains one Markdown file per component and pattern.
Each reference ends with an **API** section (properties, slots, events, CSS custom
properties, CSS parts) generated from the component's source. Multi-element
components (e.g. accordion, tabs) document each sibling custom element under its
own subheading within that section.

### Components

One file per component in `references/components/` (e.g. `references/components/badge.md`).

Available components: {{GEN2_COMPONENT_NAMES}}.

{{GEN2_COMPONENT_LIST}}

### Patterns

Higher-level compositions of multiple components, one file per pattern in `references/patterns/`.

Available patterns: {{GEN2_PATTERN_NAMES}}.

{{GEN2_PATTERN_LIST}}
