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

### System variants

This package provides styles for three Adobe design system variants (referred to as "systems"). Each system has different available color options:

- **Spectrum** (system: `spectrum`) - The original Spectrum design system with four color options: `dark`, `light`, and deprecated `darkest` and `lightest`
- **Express** (system: `express`) - The Adobe Express design system with two color options: `dark` and `light`
- **Spectrum 2** (system: `spectrum-two`) - The next generation Spectrum design system with two color options: `dark` and `light`

### Combined theme packages (Spectrum)

If you're not using `<sp-theme>`, the styles package provides convenient bundles for Spectrum that combine everything you need in a single import. Each `all-*` file combines core global styles, typography, a color option, and a scale specification. Express and Spectrum 2 do not have equivalent combined packages; use manual theme composition instead (see below).

> **Note:** The `darkest` and `lightest` colors are deprecated and will be removed in a future release. Use `dark` or `light` instead.

```css
@import '@spectrum-web-components/styles/all-medium-dark.css';
```

This file brings together the global variables and font settings with the "Dark" color set and "Medium" scale system specification.

```css
@import '@spectrum-web-components/styles/all-medium-light.css';
```

This file brings together the global variables and font settings with the "Light" color set and "Medium" scale system specification.

Other available combinations: `all-large-dark.css`, `all-large-light.css`, and the deprecated `all-medium-darkest.css`, `all-medium-lightest.css`, `all-large-darkest.css`, `all-large-lightest.css`.

### Manual theme composition (Express and Spectrum 2)

If you're not using `<sp-theme>`, you can manually compose a complete theme for Express or Spectrum 2 (equivalent to the `all-*` convenience packages for Spectrum) by importing four files: core global styles, typography, a color option, and a scale.

#### Express example (large, dark)

```css
@import '@spectrum-web-components/styles/express/core-global.css';
@import '@spectrum-web-components/styles/typography.css';
@import '@spectrum-web-components/styles/express/theme-dark.css';
@import '@spectrum-web-components/styles/express/scale-large.css';
```

#### Spectrum 2 example (medium, light)

```css
@import '@spectrum-web-components/styles/spectrum-two/core-global.css';
@import '@spectrum-web-components/styles/typography.css';
@import '@spectrum-web-components/styles/spectrum-two/theme-light.css';
@import '@spectrum-web-components/styles/spectrum-two/scale-medium.css';
```

> **Note:** For most use cases, we recommend using `<sp-theme>` instead of manually managing these imports. The theme element handles composition and switching automatically.

### Individual theme and scale files

For more control over bundle size or to manually compose themes, you can import color and scale files individually. These provide only the CSS custom properties specific to color or scale, without the combined overhead of the `all-*` packages.

#### Color

Import a single color option to set color values:

```css
/* Spectrum */
@import '@spectrum-web-components/styles/theme-light.css';

/* Express */
@import '@spectrum-web-components/styles/express/theme-dark.css';

/* Spectrum 2 */
@import '@spectrum-web-components/styles/spectrum-two/theme-light.css';
```

##### Available color options

<sp-table>
    <sp-table-head>
        <sp-table-head-cell>System</sp-table-head-cell>
        <sp-table-head-cell>Available colors</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell><strong>Spectrum</strong></sp-table-cell>
            <sp-table-cell><code>theme-dark.css</code>, <code>theme-light.css</code>, <code>theme-darkest.css</code> (deprecated), <code>theme-lightest.css</code> (deprecated)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><strong>Express</strong></sp-table-cell>
            <sp-table-cell><code>express/theme-dark.css</code>, <code>express/theme-light.css</code></sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><strong>Spectrum 2</strong></sp-table-cell>
            <sp-table-cell><code>spectrum-two/theme-dark.css</code>, <code>spectrum-two/theme-light.css</code></sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>

> **Note:** All color theme files automatically set the CSS `color-scheme` property (`light` or `dark`) for accessibility. This helps browsers render native form controls appropriately, adjusts scrollbar colors to match the theme, and improves compatibility with system UI elements.

#### Scale

Import a single scale to set sizing values:

```css
/* Spectrum */
@import '@spectrum-web-components/styles/scale-medium.css';

/* Express */
@import '@spectrum-web-components/styles/express/scale-medium.css';

/* Spectrum 2 */
@import '@spectrum-web-components/styles/spectrum-two/scale-large.css';
```

##### Available scales

<sp-table>
    <sp-table-head>
        <sp-table-head-cell>System</sp-table-head-cell>
        <sp-table-head-cell>Available scales</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell><strong>Spectrum</strong></sp-table-cell>
            <sp-table-cell><code>scale-medium.css</code>, <code>scale-large.css</code></sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><strong>Express</strong></sp-table-cell>
            <sp-table-cell><code>express/scale-medium.css</code>, <code>express/scale-large.css</code></sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><strong>Spectrum 2</strong></sp-table-cell>
            <sp-table-cell><code>spectrum-two/scale-medium.css</code>, <code>spectrum-two/scale-large.css</code></sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>

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

For stylesheet use, import the complete typography system:

```css
@import '@spectrum-web-components/styles/typography.css';
```

#### TypeScript/JavaScript exports for Lit components

For use in Lit-based components, you can import typography styles as JavaScript modules. Import the complete system or individual components depending on your needs:

##### Import everything

```js
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

### Design tokens

For advanced use cases where you need direct access to design token CSS custom properties, this package exposes token files:

#### Spectrum tokens

```css
@import '@spectrum-web-components/styles/tokens/global-vars.css';
@import '@spectrum-web-components/styles/tokens/light-vars.css';
@import '@spectrum-web-components/styles/tokens/dark-vars.css';
@import '@spectrum-web-components/styles/tokens/medium-vars.css';
@import '@spectrum-web-components/styles/tokens/large-vars.css';
```

#### Express tokens

```css
@import '@spectrum-web-components/styles/tokens/express/global-vars.css';
@import '@spectrum-web-components/styles/tokens/express/light-vars.css';
@import '@spectrum-web-components/styles/tokens/express/dark-vars.css';
@import '@spectrum-web-components/styles/tokens/express/medium-vars.css';
@import '@spectrum-web-components/styles/tokens/express/large-vars.css';
```

#### Spectrum 2 tokens

```css
@import '@spectrum-web-components/styles/tokens-v2/global-vars.css';
@import '@spectrum-web-components/styles/tokens-v2/light-vars.css';
@import '@spectrum-web-components/styles/tokens-v2/dark-vars.css';
@import '@spectrum-web-components/styles/tokens-v2/medium-vars.css';
@import '@spectrum-web-components/styles/tokens-v2/large-vars.css';
```

### Migrating to Spectrum 2

If you're migrating to Spectrum 2, see the [Spectrum 2 migration guide](../../migrating-to-spectrum2/) for detailed instructions.
