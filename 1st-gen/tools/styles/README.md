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

This package provides design token CSS custom properties for three Adobe design system variants (referred to as "systems"). These tokens are organized by system, as well as color option and scale. There is also a set of global tokens for each system that do not vary with color option or scale.

#### Global tokens

Global token files (`global-vars.css`) define design values that remain constant across color options and scales, as well as semantic tokens that reference color- or scale-specific values:

- **Fixed constants** - Values that never change regardless of color or scale:
    - Opacity values (e.g., `--spectrum-opacity-disabled: 0.3`)
    - Font families (Adobe Clean, for instance)
    - Font weights (300, 400, 500, 700, 800, 900)
    - Line heights and font styles
    - Transparent white and black color definitions
    - Base spacing scale (`--spectrum-spacing-50` through `--spectrum-spacing-1000`)
    - Semantically-named component constants (e.g., `--spectrum-swatch-border-color`, `--spectrum-button-minimum-width-multiplier`)

- **Semantic color aliases** - Named by purpose, referencing values that change depending on the color option:
    - `--spectrum-disabled-background-color` (in tokens-v2, references `--spectrum-gray-100`, which has different values for light and dark)
    - `--spectrum-focus-indicator-color`
    - `--spectrum-neutral-content-color-default`

- **Semantic component tokens** - Named by purpose, referencing scale-specific values:
    - `--spectrum-breadcrumbs-height: var(--spectrum-component-height-300)` (where `component-height-300` is 48px in medium, 60px in large)
    - `--spectrum-meter-default-width: var(--spectrum-meter-width)` (where `meter-width` is 192px in medium, 240px in large)

#### Color options

Each system makes a `dark` and `light` color option available. Currently, the Spectrum system also offers `darkest` and `lightest` color options, but these will be deprecated in the future.

Color option files (`light-vars.css` and `dark-vars.css`) contain raw color definitions that differ between themes, as well as semantic color mappings that reference different colors based on the selected theme:

- **Raw color definitions** - Color scale values that differ between light and dark themes:
    - `--spectrum-gray-50` is white (`255, 255, 255`) in light theme, but dark gray (`29, 29, 29`) in dark theme
    - `--spectrum-gray-900` is black (`0, 0, 0`) in light theme, but white (`255, 255, 255`) in dark theme
    - Full color scales for gray, blue, red, orange, yellow, green, and other semantic color families

- **Semantic color mappings** - Named by purpose, referencing different raw colors based on theme:
    - `--spectrum-background-base-color` references `--spectrum-gray-200` in light, but `--spectrum-gray-50` in dark
    - `--spectrum-neutral-subdued-background-color-default` references `--spectrum-gray-600` in light, but `--spectrum-gray-400` in dark
    - Component-specific colors like `--spectrum-neutral-visual-color`, background colors, and visual indicators

#### Scales

Each system has two scale sizes available: `medium` (default) and `large`. The `medium` scale is designed for desktop environments, while `large` is optimized for mobile and touch devices with larger touch targets. Scale files (`medium-vars.css` and `large-vars.css`) contain raw size and spacing definitions that differ between scales, as well as component-specific sizing values:

- **Raw size and spacing definitions** - Values that differ between medium and large scales:
    - `--spectrum-font-size-200` is `16px` in medium, but `19px` in large
    - `--spectrum-component-height-100` is `32px` in medium, but `40px` in large
    - Icon sizes, spacing values, and other dimensional tokens that scale up for larger/touch interfaces

- **Component-specific sizing** - Tokens for component dimensions that vary by scale:
    - `--spectrum-meter-width` is `192px` in medium, but `240px` in large
    - `--spectrum-breadcrumbs-height-multiline` is `72px` in medium, but `84px` in large
    - Component-specific measurements like button heights, field widths, and icon positioning

#### Available systems

Here is a summary of each system and the options available on each:

<sp-table>
    <sp-table-head>
        <sp-table-head-cell>System</sp-table-head-cell>
        <sp-table-head-cell>Scales</sp-table-head-cell>
        <sp-table-head-cell>Color options</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Spectrum</sp-table-cell>
            <sp-table-cell>medium, large</sp-table-cell>
            <sp-table-cell>light, dark, lightest, darkest</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Express</sp-table-cell>
            <sp-table-cell>medium, large</sp-table-cell>
            <sp-table-cell>light, dark</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Spectrum 2</sp-table-cell>
            <sp-table-cell>medium, large</sp-table-cell>
            <sp-table-cell>light, dark</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>

#### Tokens imports

Here are some examples of CSS token imports for each of the three systems:

<sp-tabs selected="spectrum-2-tokens" auto label="Tokens usage examples">
<sp-tab value="spectrum-2-tokens">Spectrum 2 tokens (tokens-v2)</sp-tab>
<sp-tab-panel value="spectrum-2-tokens">

Spectrum 2 uses standalone token files (in contrast to Spectrum and Express's base + override pattern). Pick one color option and one scale option:

```css
/* pick a color option */
@import '@spectrum-web-components/styles/tokens-v2/light-vars.css';
/* pick a scale option */
@import '@spectrum-web-components/styles/tokens-v2/medium-vars.css';
/* import global custom properties last */
@import '@spectrum-web-components/styles/tokens-v2/global-vars.css';
```

</sp-tab-panel>
<sp-tab value="spectrum-tokens">Spectrum tokens</sp-tab>
<sp-tab-panel value="spectrum-tokens">

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

</sp-tab-panel>
<sp-tab value="express-tokens">Express tokens</sp-tab>
<sp-tab-panel value="express-tokens">

Express also uses a base + override pattern (same as Spectrum, but with `express/` paths):

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

</sp-tab-panel>
</sp-tabs>

#### Tokens usage

Which tokens files you import will depend on which tokens you want to use.

<sp-tabs selected="spectrum-2-tokens" auto label="Tokens usage examples">
<sp-tab value="spectrum-2-tokens">Spectrum 2 tokens (tokens-v2)</sp-tab>
<sp-tab-panel value="spectrum-2-tokens">

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

</sp-tab-panel>
<sp-tab value="base-system-overrides-tokens">Tokens (base + system overrides pattern)</sp-tab>
<sp-tab-panel value="base-system-overrides-tokens">

These tokens are generally similar to the Spectrum 2 tokens, but use a base layer plus system-specific overrides that must both be imported.

```css
/* import base tokens files */
@import '@spectrum-web-components/styles/tokens/light-vars.css';
@import '@spectrum-web-components/styles/tokens/medium-vars.css';
@import '@spectrum-web-components/styles/tokens/global-vars.css';

/* import express-specific tokens files (replace express/ with spectrum/ for Spectrum system) */
@import '@spectrum-web-components/styles/tokens/express/medium-vars.css';
@import '@spectrum-web-components/styles/tokens/express/global-vars.css';

.my-component {
    /* defined in express medium-vars.css */
    border-radius: var(--spectrum-corner-radius-100);

    /* defined in express global-vars.css */
    border-width: var(--spectrum-border-width-100);

    /* defined in base global-vars.css */
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

</sp-tab-panel>
</sp-tabs>

### Typography

The [Spectrum Typography system](https://opensource.adobe.com/spectrum-css/?path=/docs/components-typography--docs) provides a complete set of text styles. The typography system is shared across all design systems (Spectrum, Express, and Spectrum 2).

#### What's included

- **Typography wrapper** (`.spectrum-Typography`) - Wrap your content with this class to apply proper spacing, margins, and base font settings to typography elements
- **Heading** styles (`.spectrum-Heading`) - Multiple sizes from XXS to XXXL with weight variants (light, regular, heavy) and serif options
- **Body** styles (`.spectrum-Body`) - Multiple sizes from XS to XXXL with serif options for body copy and longer text
- **Detail** styles (`.spectrum-Detail`) - Uppercase labels and metadata text in sizes S through XL with light weight option
- **Code** styles (`.spectrum-Code`) - Monospace inline code snippets in sizes XS through XL
- **Language support** - Automatic font family selection for Arabic (`:lang(ar)`), Hebrew (`:lang(he)`), and CJK languages (Chinese, Japanese, Korean)
- **Emphasis and strong** - Proper italic and bold styling for `<em>` and `<strong>` elements within each typography class
- **High contrast mode support** - Ensures text remains readable when Windows High Contrast Mode is enabled

#### CSS imports

For stylesheet use, the recommended approach is to import the complete typography system, with tokens. This ensures that all required files are included.

```css
@import '@spectrum-web-components/styles/tokens-v2/dark-vars.css'; /* import color tokens */
@import '@spectrum-web-components/styles/tokens-v2/large-vars.css'; /* import scale tokens */
@import '@spectrum-web-components/styles/tokens-v2/global-vars.css'; /* import global tokens */
@import '@spectrum-web-components/styles/typography.css';
```

#### TypeScript/JavaScript imports for Lit components

For use in Lit-based components, you can import typography styles as JavaScript modules.

Available JavaScript exports include:

- **`typography.js`** - Complete typography system with all styles (heading, body, detail, code)
- **`body.js`** - Body text styles only (includes base + lang + body)
- **`heading.js`** - Heading styles only (includes base + lang + heading)
- **`detail.js`** - Detail/label styles only (includes base + lang + detail)
- **`code.js`** - Code styles only (includes base + lang + code)

Each individual export (`body.js`, `heading.js`, etc.) includes the necessary base and language support styles, so you don't need to import them separately. Import `typography.js` for the complete system, or import individual exports to reduce bundle size.

Import the complete system or individual components depending on your needs:

<sp-tabs selected="import-all-typography-js" auto label="Import options">
<sp-tab value="import-all-typography-js">Import everything</sp-tab>
<sp-tab-panel value="import-all-typography-js">

To import the full typography system:

```js
// tokens also need to be imported to define CSS custom properties
import typographyStyles from '@spectrum-web-components/styles/typography.js';

static styles = [typographyStyles];
```

</sp-tab-panel>
<sp-tab value="import-selectively-js">Import only what you need</sp-tab>
<sp-tab-panel value="import-selectively-js">

For smaller bundle sizes, import individual components:

```js
// tokens also need to be imported to define CSS custom properties
import headingStyles from '@spectrum-web-components/styles/heading.js';

static styles = [headingStyles];
```

</sp-tab-panel>
</sp-tabs>

### Spectrum Vars tokens (deprecated)

This package includes some deprecated files that use the older Spectrum Vars token naming convention, including combined theme files (e.g., `all-medium-dark.css`) and individual theme/scale files (e.g., `theme-light.css`, `scale-medium.css`).

**Recommended alternatives:**

- Use `<sp-theme>` for automatic theme management (recommended)
- Import Spectrum Core tokens directly for granular control (see "Design tokens" section above)
- See the [Spectrum Core tokens migration guide](../core-tokens) for help migrating from Spectrum Vars to Spectrum Core tokens

### Migrating to Spectrum 2

If you're migrating to Spectrum 2, see the [Spectrum 2 migration guide](../../migrating-to-spectrum2/) for detailed instructions.
