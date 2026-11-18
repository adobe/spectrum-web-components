---
name: 'spectrum-web-components'
description: "Build UIs with Spectrum Web Components (SWC), Adobe's Spectrum 1 web component library. Use when developers are working with @spectrum-web-components/* packages or sp-* custom elements. Includes component API references, usage examples, accessibility guidance, and integration guides."
license: 'Apache-2.0'
metadata:
  author: 'Adobe'
  website: 'https://spectrum-web-components.adobe.com'
---

# Spectrum Web Components (Spectrum 1)

Spectrum Web Components (SWC) is Adobe's Spectrum 1 design system implemented as
framework-agnostic web components. Elements are prefixed with `sp-` and each ships
as an independent npm package under `@spectrum-web-components`.

> **Upgrading to Spectrum 2?** Use the `migrate-swc-gen1-to-gen2` skill instead,
> which includes per-component migration guides and a full coexistence walkthrough.

## Quick start

Install the components you need (each component is its own package):

```bash
yarn add @spectrum-web-components/theme \
         @spectrum-web-components/button \
         @spectrum-web-components/badge
```

All `sp-*` components must be wrapped in `<sp-theme>` to receive Spectrum CSS tokens:

```html
<script type="module">
  import '@spectrum-web-components/theme/sp-theme.js';
  import '@spectrum-web-components/theme/scale-medium.js';
  import '@spectrum-web-components/theme/theme-light.js';
  import '@spectrum-web-components/button/sp-button.js';
</script>

<sp-theme system="spectrum" scale="medium" color="light">
  <sp-button variant="accent">Save</sp-button>
</sp-theme>
```

## Key concepts

- **`<sp-theme>`** is required — it provides all design tokens (color, scale, spacing,
  typography) to descendant `sp-*` elements via CSS custom properties. See
  [What is a theme?](references/guides/what-is-a-theme.md) for a full explanation of
  `system`, `color`, `scale`, `direction`, and `language` attributes.

- **Per-package install** — each component (`@spectrum-web-components/button`,
  `@spectrum-web-components/badge`, etc.) is imported separately so your bundle only
  includes what you use.

- **Side-effectful import** — importing the `.js` entry registers the custom element:

  ```ts
  import '@spectrum-web-components/button/sp-button.js';
  ```

  Import the class directly for extension or typing:

  ```ts
  import { Button } from '@spectrum-web-components/button';
  ```

- **Spectrum 2 theme bridge** — apply `system="spectrum-two"` to `<sp-theme>` to
  adopt Spectrum 2 visual tokens on Gen 1 components. This is useful when running
  Gen 1 and Gen 2 side-by-side during a gradual migration.

- **React** — use `@swc-react/*` wrapper packages for first-class React event
  handling. See [Using SWC with React](references/guides/using-swc-react.md).

- **Accessibility** — `sp-*` components expose correct ARIA roles, labels, and
  keyboard navigation. Labels are typically provided via the `label` attribute or
  the default slot; see each component's API reference for specifics.

## Documentation structure

The `references/` directory contains guides and one Markdown file per component.
Read the component file for its API, slots, events, CSS custom properties, and usage examples.

### Guides

{{GUIDE_LIST}}

### Components

One file per component in `references/components/` (e.g. `references/components/sp-badge.md`).
Read the file for props, slots, events, CSS custom properties, and usage examples.

Available components: {{COMPONENT_NAMES}}.

{{COMPONENT_LIST}}
