## Description

An `<sp-color-slider>` lets users visually change an individual channel of a color. The background of the `<sp-color-slider>` is a visual representation of the range of values a user can select from. This can represent color properties such as hues, color channel values (such as RGB or CMYK levels), or opacity. Currently, the slider only supports leveraging the `hue` property.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-slider?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-slider)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-slider?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-slider)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/kxW1VIhXBXVSOnyXhF9M/src/index.ts)

```
yarn add @spectrum-web-components/color-slider
```

Import the side effectful registration of `<sp-color-slider>` via:

```
import '@spectrum-web-components/color-slider/sp-color-slider.js';
```

When looking to leverage the `ColorSlider` base class as a type and/or for extension purposes, do so via:

```
import { ColorSlider } from '@spectrum-web-components/color-slider';
```

## Color Formatting

When using the color elements, use `el.color` to access the `color` property, which should manage itself in the colour format supplied. If you supply a color in `rgb()` format, `el.color` should return the color in `rgb()` format, as well.

The current color formats supported are as follows:

-   Hex3, Hex4, Hex6, Hex8
-   HSV, HSVA
-   HSL, HSLA
-   RGB, RGBA
-   Strings (eg "red", "blue")

**Please note for the following formats: HSV, HSVA, HSL, HSLA**
When using the HSL or HSV formats, and a color's value (in HSV) is set to 0, or its luminosity (in HSL) is set to 0 or 1, the hue and saturation values may not be preserved by the element's `color` property. This is detailed in the [TinyColor documentation](https://www.npmjs.com/package/@ctrl/tinycolor). Seperately, the element's `value` property is directly managed by the hue as represented in the interface.

## Default

```html
<sp-color-slider></sp-color-slider>
```

### Vertical

```html
<sp-color-slider vertical></sp-color-slider>
```

### Disabled

```html
<sp-color-slider disabled></sp-color-slider>
```
