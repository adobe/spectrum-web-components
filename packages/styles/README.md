## Overview

Spectrum Web Components are a [`LitElement`](https://lit-element.polymer-project.org) powered web component library of patterns built ontop of the [Spectrum CSS](https://opensource.adobe.com/spectrum-css) specification. Styles for these components are made available (and in some cases customizable) via CSS Custom Properties, e.g. `var(--spectrum-global-color-static-black)`. In this package you will find the various CSS Custom Properties that power the various color and size themese defined by Spectrum CSS.

The easiest way to consume these values is via the `<sp-theme>` element, however in some case it can be useful to have direct access to the files outlining the CSS Custom Properties ontop of which the rest of the component system is built.

## Theme Packages

```
@import '@spectrum-web-components/styles/all-medium-dark.css';
```

This file brings together the globals variables and font settings with the "Dark" color set and "Medium" scale system specification.

```
@import '@spectrum-web-components/styles/all-medium-light.css';
```

This file brings together the globals variables and font settings with the "Light" color set and "Medium" scale system specification.

```
@import '@spectrum-web-components/styles/all-medium-lightest.css';
```

This file brings together the globals variables and font settings with the "Lightest" color set and "Medium" scale system specification.

## Color Sets

### Dark

```
@import '@spectrum-web-components/styles/theme-drk.css';
```

This file provides only the variables needed to power a color pallet featuring colors found in the "Dark" theme.

### Light

```
@import '@spectrum-web-components/styles/theme-light.css';
```

This file provides only the variables needed to power a color pallet featuring colors found in the "Light" theme.

### Lightest

```
@import '@spectrum-web-components/styles/theme-lightest.css';
```

This file provides only the variables needed to power a color pallet featuring colors found in the "Lightest" theme.

## Scale

### Medium

At current, Spectrum Web Components only provides the "Medium" scale system as available via:

```
@import '@spectrum-web-components/styles/scale-medium.css';
```
