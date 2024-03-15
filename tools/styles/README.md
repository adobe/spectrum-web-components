## Description

Spectrum Web Components are a [`LitElement`](https://lit-element.polymer-project.org)-powered web component library of patterns built on top of the [Spectrum CSS](https://opensource.adobe.com/spectrum-css) specification. Styles for these components are made available (and, in some cases, customizable) via CSS Custom Properties, e.g. `var(--spectrum-black)`. In this package, you will find the CSS Custom Properties that power the various color and size themes defined by Spectrum CSS.

The easiest way to consume these values is via the `<sp-theme>` element. However, in some cases, it can be useful to have direct access to the files outlining the CSS Custom Properties, on top of which the rest of the component system is built.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/styles?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/styles)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/styles?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/styles)

```
yarn add @spectrum-web-components/styles
```

## Theme packages

```
@import '@spectrum-web-components/styles/all-medium-darkest.css';
```

This file brings together the global variables and font settings with the "Darkest" color set and "Medium" scale system specification.

```
@import '@spectrum-web-components/styles/all-medium-dark.css';
```

This file brings together the global variables and font settings with the "Dark" color set and "Medium" scale system specification.

```
@import '@spectrum-web-components/styles/all-medium-light.css';
```

This file brings together the global variables and font settings with the "Light" color set and "Medium" scale system specification.

```
@import '@spectrum-web-components/styles/all-medium-lightest.css';
```

This file brings together the global variables and font settings with the "Lightest" color set and "Medium" scale system specification.

```
@import '@spectrum-web-components/styles/all-large-darkest.css';
```

This file brings together the global variables and font settings with the "Darkest" color set and "Large" scale system specification.

```
@import '@spectrum-web-components/styles/all-large-dark.css';
```

This file brings together the global variables and font settings with the "Dark" color set and "Large" scale system specification.

```
@import '@spectrum-web-components/styles/all-large-light.css';
```

This file brings together the global variables and font settings with the "Light" color set and "Large" scale system specification.

```
@import '@spectrum-web-components/styles/all-large-lightest.css';
```

This file brings together the global variables and font settings with the "Lightest" color set and "Large" scale system specification.

## Color sets

### Darkest

```
@import '@spectrum-web-components/styles/theme-darkest.css';
```

This file provides only the variables needed to power a color palette featuring colors found in the "Darkest" theme.

### Dark

```
@import '@spectrum-web-components/styles/theme-dark.css';
```

This file provides only the variables needed to power a color palette featuring colors found in the "Dark" theme.

### Light

```
@import '@spectrum-web-components/styles/theme-light.css';
```

This file provides only the variables needed to power a color palette featuring colors found in the "Light" theme.

### Lightest

```
@import '@spectrum-web-components/styles/theme-lightest.css';
```

This file provides only the variables needed to power a color palette featuring colors found in the "Lightest" theme.

## Scale

### Medium

```
@import '@spectrum-web-components/styles/scale-medium.css';
```

This file provides only the variables needed to power the "Medium" scale system specification.

### Large

```
@import '@spectrum-web-components/styles/scale-large.css';
```

This file provides only the variables needed to power the "Large" scale system specification.

## Typography

```
@import '@spectrum-web-components/styles/typography.css';
```

This file provides a `lit-html` compliant version of the [Spectrum Typography classes](https://opensource.adobe.com/spectrum-css/typography.html).
