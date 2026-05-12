# Spectrum Web Components (2nd-gen)

The second generation of Spectrum Web Components — aligned with [Spectrum 2](https://s2.spectrum.adobe.com/), with improved architecture, performance, and accessibility.

## For app developers using SWC

The published Storybook is the canonical home for consumer docs:

- **[Get started](https://opensource.adobe.com/spectrum-web-components/docs/get-started-welcome--readme)** — install, first component, framework notes
- **[Components](https://opensource.adobe.com/spectrum-web-components/docs/components-badge--readme)** — the full 2nd-gen component library
- **[Customization](https://opensource.adobe.com/spectrum-web-components/docs/learn-customization-cheat-sheet--readme)** — cheatsheet plus long-form guides for theming, tokens, fonts, scales, and global element styles
- **[Accessibility](https://opensource.adobe.com/spectrum-web-components/docs/learn-accessibility-cheat-sheet--readme)** — cheatsheet plus long-form guides for testing, ARIA, screen readers, and WCAG

A minimal install for readers who want a quick reference without leaving GitHub:

```bash
yarn add @adobe/spectrum-wc
```

```js
// In your application entry point:
import '@adobe/spectrum-wc/badge';
```

```html
<link rel="stylesheet" href="node_modules/@adobe/spectrum-wc/dist/swc.css" />
<swc-badge variant="positive">Approved</swc-badge>
```

For the full onboarding flow with live demos, head to [Get started](https://opensource.adobe.com/spectrum-web-components/docs/get-started-welcome--readme) in the published docs.

## For contributors

Contributor guides, the style guide, project planning, and release procedures all live on GitHub in [CONTRIBUTOR-DOCS](../CONTRIBUTOR-DOCS/README.md). The same content is also rendered in local Storybook (`yarn dev`) under `Contribute` for offline reading.

```bash
# From the repository root
yarn install          # install dependencies
yarn build            # build 2nd-gen packages
yarn dev              # local Storybook with the full sidebar (consumer + contributor surfaces)
yarn build-storybook  # production Storybook (consumer surface only)
```

## Packages

- **[@spectrum-web-components/core](./packages/core)** — abstract base classes that provide behavior and API for 2nd-gen components
- **[@adobe/spectrum-wc](./packages/swc)** — concrete component implementations with styling
