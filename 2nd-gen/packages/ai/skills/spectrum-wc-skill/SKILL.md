---
name: 'spectrum-wc'
description: 'Build UIs with Spectrum 2 Web Components (swc-* elements, @adobe/spectrum-wc, @adobe/spectrum-wc-core). Use when developers are working with @adobe/spectrum-wc or @adobe/spectrum-wc-core packages or swc-* custom elements. Includes component, pattern, and controller API references (properties, slots, events, CSS custom properties, CSS parts) plus usage guidance.'
license: 'Apache-2.0'
metadata:
  author: 'Adobe'
  website: 'https://spectrum-web-components.adobe.com'
---

# Spectrum Web Components (Spectrum 2)

Spectrum 2 Web Components (`swc-*`) is Adobe's Spectrum 2 design system implemented
as framework-agnostic web components. All components ship from a single package,
`@adobe/spectrum-wc`, with shared primitives (controllers, mixins, base classes)
in `@adobe/spectrum-wc-core`.

> **Migrating from Spectrum 1?** Use the `migrate-swc-gen1-to-gen2` skill instead,
> which includes per-component migration guides and a full coexistence walkthrough.

## Quick start

```bash
yarn add @adobe/spectrum-wc
```

```ts
// App entry — import once
import '@adobe/spectrum-wc/swc.css';
import '@adobe/spectrum-wc/components/button/swc-button.js';
```

```html
<html class="swc-theme swc-theme--light">
  <body>
    <swc-button variant="accent">Save</swc-button>
  </body>
</html>
```

## Key concepts

- **Single package, subpath imports** — `@adobe/spectrum-wc` is a monolithic
  package; import each component from its own subpath so bundlers only include
  what is used: `@adobe/spectrum-wc/components/badge/swc-badge.js`.

- **Theme classes, not a theme element** — unlike Spectrum 1's `<sp-theme>`
  wrapper, Spectrum 2 applies theme and scale via CSS classes on an ancestor
  element: `swc-theme--light`, `swc-theme--dark`, `swc-theme--adaptive`.

- **Side-effectful import** — importing the `.js` entry registers the custom
  element. Import the class directly (e.g. from `Button.js`) for extension or typing.

- **`@adobe/spectrum-wc-core`** — shared controllers (hover, placement, focus
  group navigation, pending, slot presence, etc.) used to build components.
  Reach for a controller instead of re-implementing common interaction logic.

- **Accessibility** — `swc-*` components expose correct ARIA roles, labels, and
  keyboard navigation. Each component reference documents its accessibility
  features and best practices.

## Documentation structure

The `references/` directory contains guides and one Markdown file per component,
pattern, and controller. Each component/pattern reference ends with an **API**
section (Properties, Slots, Events, CSS Custom Properties, CSS Parts) generated
from the component's source.

### Guides

{{GEN2_GUIDE_LIST}}

### Components

One file per component in `references/components/` (e.g. `references/components/badge.md`).

Available components: {{GEN2_COMPONENT_NAMES}}.

{{GEN2_COMPONENT_LIST}}

### Patterns

Higher-level compositions of multiple components, one file per pattern in `references/patterns/`.

Available patterns: {{GEN2_PATTERN_NAMES}}.

{{GEN2_PATTERN_LIST}}

### Controllers

Shared reactive-controller primitives from `@adobe/spectrum-wc-core`, one file per
controller in `references/controllers/`. Read the file for usage, options, and API.

{{GEN2_CONTROLLER_LIST}}
