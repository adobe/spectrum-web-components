## Description

An `<sp-color-wheel>` lets users visually change an individual channel of a color on a circular track.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-wheel?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-wheel)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-wheel?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-wheel)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/m5lUgBAAejgIkESwRvEs/src/index.ts)

```
yarn add @spectrum-web-components/color-wheel
```

Import the side effectful registration of `<sp-color-wheel>` via:

```
import '@spectrum-web-components/color-wheel/sp-color-wheel.js';
```

When looking to leverage the `ColorWheel` base class as a type and/or for extension purposes, do so via:

```
import { ColorWheel } from '@spectrum-web-components/color-wheel';
```

## Color Formatting

When using the color elements, use `el.color` to access the `color` property, which should manage itself in the color format supplied. If you supply a color in `rgb()` format, `el.color` should return the color in `rgb()` format, as well.

The current color formats supported are as follows:

-   Hex3, Hex4, Hex6, Hex8
-   HSV, HSVA
-   HSL, HSLA
-   RGB, RGBA
-   Strings (eg "red", "blue")

**Please note for the following formats: HSV, HSVA, HSL, HSLA**
When using the HSL or HSV formats, and a color's value (in HSV) is set to 0, or its luminosity (in HSL) is set to 0 or 1, the hue and saturation values may not be preserved by the element's `color` property. This is detailed in the [TinyColor documentation](https://www.npmjs.com/package/@ctrl/tinycolor). Seperately, the element's `value` property is directly managed by the hue as represented in the interface.

## Example

```html
<sp-color-wheel></sp-color-wheel>
```

### Disabled

A color wheel in a disabled state shows that an input exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that the wheel may become available later.

```html
<sp-color-wheel disabled></sp-color-wheel>
```

## Variants

### Sized

An `<sp-color-wheel>`’s size can be customized appropriately for its context. By default, the size is size-2400 (192 px on desktop, 240 px on mobile).

```html
<sp-color-wheel style="width: 300px; height: 300px;"></sp-color-wheel>
```
