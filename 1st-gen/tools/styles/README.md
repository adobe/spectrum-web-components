## Overview

Spectrum Web Components are a [`LitElement`](https://lit-element.polymer-project.org)-powered web component library implementing Adobe's Spectrum design system. This package defines the CSS custom properties that implement design tokens from [Spectrum Tokens](https://github.com/adobe/spectrum-tokens). Spectrum Web Components consume these properties in their styles. These include colors, spacing, typography, and sizing values like `--spectrum-gray-100`, `--spectrum-component-height-200`, and `--spectrum-font-size-100`. In this package, you will find the CSS custom properties that Spectrum Web Components reference in their stylesheets, with values that vary across different system variants, color options, and scales.

### Relationship to `<sp-theme>`

The `<sp-theme>` element is built on top of this styles package. It consumes the CSS custom properties provided here and wraps them in a Web Component that manages theme switching, directionality, and other runtime behaviors.

**For most applications**, we recommend using `<sp-theme>` rather than directly importing these CSS files. The theme element provides a more flexible and maintainable way to manage systems, colors, and scales using attributes like `system="spectrum"`, `color="dark"`, and `scale="medium"` (e.g., `<sp-theme system="spectrum" color="dark" scale="medium">`).

**Use this styles package directly** when you need:

- Fine-grained control over which CSS files are loaded
- To integrate Spectrum styles into non-web component contexts
- To build custom components outside the `<sp-theme>` wrapper
- Direct access to unthemed design tokens for advanced use cases

See the `@spectrum-web-components/theme` [documentation](../theme) for more information about using the theme element.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/styles?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/styles)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/styles?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/styles)

```zsh
yarn add @spectrum-web-components/styles
```

### Design tokens

This package provides design token CSS custom properties for three Adobe design system variants (referred to as "systems").

**Color options:** Each system has different available color options, but in the future, each will have only `dark` and `light` available.

**Scales:** Each system has two scale sizes available: `medium` (default) and `large`. The `medium` scale is designed for desktop environments with slightly smaller components and spacing, while the `large` scale is optimized for mobile and touch devices with larger touch targets and spacing.

**Available systems:**

- **Spectrum** (system: `spectrum`) - The original Spectrum design system
    - **Colors:** `dark`, `light`, and deprecated `darkest` and `lightest`
    - **Scales:** `medium`, `large`
- **Express** (system: `express`) - The Adobe Express design system
    - **Colors:** `dark`, `light`
    - **Scales:** `medium`, `large`
- **Spectrum 2** (system: `spectrum-two`) - The next generation Spectrum design system
    - **Colors:** `dark`, `light`
    - **Scales:** `medium`, `large`

#### Spectrum 2 tokens

Spectrum 2 uses standalone token files. Pick one color option and one scale option:

```css
/* pick a color option */
@import '@spectrum-web-components/styles/tokens-v2/light-vars.css';
/* pick a scale option */
@import '@spectrum-web-components/styles/tokens-v2/medium-vars.css';
/* import global custom properties last */
@import '@spectrum-web-components/styles/tokens-v2/global-vars.css';
```

#### Spectrum tokens

Spectrum uses a base + override pattern. Import base tokens first, then system-specific overrides:

```css
/* import base tokens */
@import '@spectrum-web-components/styles/tokens/light-vars.css';
@import '@spectrum-web-components/styles/tokens/medium-vars.css';
@import '@spectrum-web-components/styles/tokens/global-vars.css';

/* import spectrum-specific overrides */
@import '@spectrum-web-components/styles/tokens/spectrum/light-vars.css';
@import '@spectrum-web-components/styles/tokens/spectrum/medium-vars.css';
@import '@spectrum-web-components/styles/tokens/spectrum/global-vars.css';
```

#### Express tokens

Express also uses a base + override pattern (same as Spectrum above, but with `express/` paths):

```css
/* import base tokens */
@import '@spectrum-web-components/styles/tokens/light-vars.css';
@import '@spectrum-web-components/styles/tokens/medium-vars.css';
@import '@spectrum-web-components/styles/tokens/global-vars.css';

/* import express-specific overrides */
@import '@spectrum-web-components/styles/tokens/express/light-vars.css';
@import '@spectrum-web-components/styles/tokens/express/medium-vars.css';
@import '@spectrum-web-components/styles/tokens/express/global-vars.css';
```

#### Tokens usage

Which tokens files you import will depend on which tokens you want to use.

##### V2 tokens

Generally speaking, `light-vars` and `dark-vars` files contain raw color custom property definitions (such as `--spectrum-red-500`), as well as semantic custom property definitions that change depending on which color option you use. For instance, in the v2-tokens, `--spectrum-neutral-subdued-background-color-default` uses different values per theme. It resolves to `--spectrum-gray-700` for light and `--spectrum-gray-500` for dark.

For color, `global-vars` files contain semantic custom property definitions that stay consistent regardless of color option. For instance, `--spectrum-neutral-background-color-default` is always `--spectrum-gray-800`, but `--spectrum-gray-800` is defined differently depending on whether dark or light custom properties have been imported. Component-specific custom properties are split across these files. Some are in `global-vars` (e.g., `--spectrum-swatch-border-color`), while others are in `light-vars`/`dark-vars` (e.g., `--spectrum-assetcard-border-color-selected`).

Similarly, `medium-vars` and `large-vars` files contain custom property definitions for raw spacings and sizes that differ between the two scales, such as `--spectrum-font-size-200` and `--spectrum-component-height-100`. They also contain component-specific custom property definitions that differ between scales, for instance `--spectrum-meter-width`. The `global-vars` file defines custom properties related to sizing or spacing that are consistent regardless of scale (e.g., `--spectrum-corner-radius-100`), or uses custom properties defined in `medium-vars`/`large-vars` (e.g., `--spectrum-meter-default-width: var(--spectrum-meter-width);`).

Here's one example of tokens usage in a non-web-component context, showing how custom properties from each file work together:

```css
/* import appropriate tokens files */
@import '@spectrum-web-components/styles/tokens-v2/light-vars.css';
@import '@spectrum-web-components/styles/tokens-v2/medium-vars.css';
@import '@spectrum-web-components/styles/tokens-v2/global-vars.css';

.my-component {
    /* defined in global-vars.css */
    border-radius: var(--spectrum-corner-radius-medium-size-small);
    border-width: var(--spectrum-border-width-100);
    color: var(
        --spectrum-neutral-content-color-default
    ); /* uses --spectrum-gray-800, which is defined differently depending whether light or dark vars are loaded */

    /* defined in light-vars.css, defined differently in dark-vars.css */
    background-color: var(--spectrum-gray-100);
    border-color: var(--spectrum-gray-800);

    /* defined in medium-vars.css, defined differently in large-vars.css */
    padding-inline: var(--spectrum-component-edge-to-text-75);
    padding-block: var(--spectrum-component-top-to-text-75);
    min-block-size: var(--spectrum-component-height-75);

    border-style: solid;
}
```

##### Tokens (base + system overrides pattern)

These tokens are generally similar to the V2 tokens, but use a base layer plus system-specific overrides that must both be imported.

```css
/* import base tokens files */
@import '@spectrum-web-components/styles/tokens/light-vars.css';
@import '@spectrum-web-components/styles/tokens/global-vars.css';

/* import express-specific tokens files (replace express/ with spectrum/ for Spectrum system) */
@import '@spectrum-web-components/styles/tokens/express/medium-vars.css';
@import '@spectrum-web-components/styles/tokens/express/global-vars.css';

.my-component {
    /* defined in express medium-vars.css */
    border-radius: var(--spectrum-corner-radius-100);

    /* defined in base global-vars.css */
    border-width: var(--spectrum-border-width-100);
    color: var(
        --spectrum-neutral-subdued-content-color-default
    ); /* uses --spectrum-gray-700, which is defined differently depending whether light or dark vars are loaded */

    /* defined in base light-vars.css, defined differently in dark-vars.css */
    background-color: var(--spectrum-gray-50);
    border-color: var(--spectrum-gray-700);

    /* defined in base medium-vars.css, defined differently in large-vars.css */
    padding-inline: var(--spectrum-component-edge-to-text-75);
    padding-block: var(--spectrum-component-top-to-text-75);
    min-block-size: var(--spectrum-component-height-75);

    border-style: solid;
}
```

### Typography

The [Spectrum Typography system](https://opensource.adobe.com/spectrum-css/?path=/docs/components-typography--docs) provides a complete set of text styles. The typography system is shared across all design systems (Spectrum, Express, and Spectrum 2).

#### What's included

- **Heading** styles (`.spectrum-Heading`) - Multiple sizes from XXS to XXXL with weight variants (light, regular, heavy) and serif options
- **Body** styles (`.spectrum-Body`) - Multiple sizes from XS to XXXL with serif options for body copy and longer text
- **Detail** styles (`.spectrum-Detail`) - Uppercase labels and metadata text in sizes S through XL with light weight option
- **Code** styles (`.spectrum-Code`) - Monospace inline code snippets in sizes XS through XL
- **Language support** - Automatic font family selection for Arabic (`:lang(ar)`), Hebrew (`:lang(he)`), and CJK languages (Chinese, Japanese, Korean)
- **Emphasis and strong** - Proper italic and bold styling for `<em>` and `<strong>` elements within each typography class
- **High contrast mode support** - Ensures text remains readable when Windows High Contrast Mode is enabled

#### CSS imports

For stylesheet use, import the complete typography system, with tokens:

```css
@import '@spectrum-web-components/styles/tokens-v2/dark-vars.css'; /* import color tokens */
@import '@spectrum-web-components/styles/tokens-v2/large-vars.css'; /* import scale tokens */
@import '@spectrum-web-components/styles/tokens-v2/global-vars.css'; /* import global tokens */
@import '@spectrum-web-components/styles/typography.css';
```

#### TypeScript/JavaScript exports for Lit components

For use in Lit-based components, you can import typography styles as JavaScript modules. Import the complete system or individual components depending on your needs:

##### Import everything

```js
// tokens also need to be imported to define CSS custom properties
import typographyStyles from '@spectrum-web-components/styles/typography.js';

static styles = [typographyStyles];
```

##### Import only what you need

For smaller bundle sizes, import individual components:

```js
import headingStyles from '@spectrum-web-components/styles/heading.js';

static styles = [headingStyles];
```

##### Available JavaScript exports

- **`typography.js`** - Complete typography system with all styles (heading, body, detail, code)
- **`body.js`** - Body text styles only (includes base + lang + body)
- **`heading.js`** - Heading styles only (includes base + lang + heading)
- **`detail.js`** - Detail/label styles only (includes base + lang + detail)
- **`code.js`** - Code styles only (includes base + lang + code)

Each individual export (`body.js`, `heading.js`, etc.) includes the necessary base and language support styles, so you don't need to import them separately. Import `typography.js` for the complete system, or import individual exports to reduce bundle size.

### Spectrum Vars tokens (deprecated)

This package includes some deprecated files that use the older Spectrum Vars token naming convention, including combined theme files (e.g., `all-medium-dark.css`) and individual theme/scale files (e.g., `theme-light.css`, `scale-medium.css`).

**Recommended alternatives:**

- Use `<sp-theme>` for automatic theme management (recommended)
- Import Spectrum Core tokens directly for granular control (see "Design tokens" section above)
- See the [Spectrum Core tokens migration guide](../theme/core-tokens.md) for help migrating from Spectrum Vars to Spectrum Core tokens

### Migrating to Spectrum 2

If you're migrating to Spectrum 2, see the [Spectrum 2 migration guide](../../migrating-to-spectrum2/) for detailed instructions.
