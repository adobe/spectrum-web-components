## Description

An `<sp-color-area>` allows users to visually select two properties of a color simultaneously. It's commonly used together with a color slider or color wheel.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-area?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-area)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-area?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-area)

```
yarn add @spectrum-web-components/color-area
```

Import the side effectful registration of `<sp-color-area>` via:

```
import '@spectrum-web-components/color-area/sp-color-area.js';
```

When looking to leverage the `ColorArea` base class as a type and/or for extension purposes, do so via:

```
import { ColorArea } from '@spectrum-web-components/color-area';
```

## Color Formatting

When using the color elements, use `el.color` to access the `color` property, which should manage itself in the colour format supplied. If you supply a color in `rgb()` format, `el.color` should return the color in `rgb()` format, as well.

The current color formats supported are as follows:

-   Hex3, Hex4, Hex6, Hex8
-   HSV, HSVA
-   HSL, HSLA
-   RGB, RGBA
-   Strings (eg "red", "blue")
-   TinyColor

**Please note for the following formats: HSV, HSVA, HSL, HSLA**
When setting a color's lightness or value to 100%, the hue and saturation value are not preserved. This is detailed in the [TinyColor documentation](https://www.npmjs.com/package/@ctrl/tinycolor). Currently, the Spectrum Web Components has a workaround to support the preservation of the hue.

## Standard

```html
<sp-color-area></sp-color-area>
```

## Variants

### Disabled

An `<sp-color-area>` in a disabled state shows that an input exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that the area may become available later.

```html
<sp-color-area disabled></sp-color-area>
```

### Sized

An `<sp-color-area>`’s height and width can be customized appropriately for its context.

```html
<sp-color-area
    style="
        width: var(--spectrum-global-dimension-size-900); 
        height: var(--spectrum-global-dimension-size-900)"
></sp-color-area>
```
