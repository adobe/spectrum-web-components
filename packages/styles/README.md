## Description

Spectrum Web Components are a [`LitElement`](https://lit-element.polymer-project.org) powered web component library of patterns built ontop of the [Spectrum CSS](https://opensource.adobe.com/spectrum-css) specification. Styles for these components are made available (and in some cases customizable) via CSS Custom Properties, e.g. `var(--spectrum-global-color-static-black)`. In this package you will find the various CSS Custom Properties that power the various color and size themese defined by Spectrum CSS.

The easiest way to consume these values is via the `<sp-theme>` element, however in some case it can be useful to have direct access to the files outlining the CSS Custom Properties ontop of which the rest of the component system is built.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@lliad-ui/styles?style=for-the-badge)](https://www.npmjs.com/package/@lliad-ui/styles)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@lliad-ui/styles?style=for-the-badge)](https://bundlephobia.com/result?p=@lliad-ui/styles)

```
npm install @lliad-ui/styles
```

## Theme packages

```
@import '@lliad-ui/styles/all-medium-darkest.css';
```

This file brings together the globals variables and font settings with the "Darkest" color set and "Medium" scale system specification.

```
@import '@lliad-ui/styles/all-medium-dark.css';
```

This file brings together the globals variables and font settings with the "Dark" color set and "Medium" scale system specification.

```
@import '@lliad-ui/styles/all-medium-light.css';
```

This file brings together the globals variables and font settings with the "Light" color set and "Medium" scale system specification.

```
@import '@lliad-ui/styles/all-medium-lightest.css';
```

This file brings together the globals variables and font settings with the "Lightest" color set and "Medium" scale system specification.

```
@import '@lliad-ui/styles/all-large-darkest.css';
```

This file brings together the globals variables and font settings with the "Darkest" color set and "Large" scale system specification.

```
@import '@lliad-ui/styles/all-large-dark.css';
```

This file brings together the globals variables and font settings with the "Dark" color set and "Large" scale system specification.

```
@import '@lliad-ui/styles/all-large-light.css';
```

This file brings together the globals variables and font settings with the "Light" color set and "Large" scale system specification.

```
@import '@lliad-ui/styles/all-large-lightest.css';
```

This file brings together the globals variables and font settings with the "Lightest" color set and "Large" scale system specification.

## Color sets

### Darkest

```
@import '@lliad-ui/styles/theme-darkest.css';
```

This file provides only the variables needed to power a color pallet featuring colors found in the "Darkest" theme.

### Dark

```
@import '@lliad-ui/styles/theme-dark.css';
```

This file provides only the variables needed to power a color pallet featuring colors found in the "Dark" theme.

### Light

```
@import '@lliad-ui/styles/theme-light.css';
```

This file provides only the variables needed to power a color pallet featuring colors found in the "Light" theme.

### Lightest

```
@import '@lliad-ui/styles/theme-lightest.css';
```

This file provides only the variables needed to power a color pallet featuring colors found in the "Lightest" theme.

## Scale

### Medium

```
@import '@lliad-ui/styles/scale-medium.css';
```

This file provides only the variables needed to power the "Medium" scale system specification.

### Large

```
@import '@lliad-ui/styles/scale-large.css';
```

This file provides only the variables needed to power the "Large" scale system specification.

## Typography

```
@import '@lliad-ui/styles/typography.css';
```

This file provides a `lit-html` compliant version of the [Spectrum Typography classes](https://opensource.adobe.com/spectrum-css/components/typography/).
