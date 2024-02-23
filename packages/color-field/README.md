## Description

`<sp-color-field>` elements are textfields that allow users to input custom color values.
Color formats supported are `HEX, RGB, HSL, HSV, and shorthand HEX`

## Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-field?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-field)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-field?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-field)

```
yarn add @spectrum-web-components/color-field
```

Import the side effectful registration of `<sp-color-field>` via:

```
import '@spectrum-web-components/color-field/sp-color-field.js';
```

When looking to leverage the `ColorField` base class as a type and/or for extension purposes, do so via:

```
import { ColorField } from '@spectrum-web-components/color-field';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-color-field size="s" value="#ffff00"></sp-color-field>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-color-field size="m" value="#ffff00"></sp-color-field>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>

<sp-tab-panel value="l">

```html
<sp-color-field size="l" value="#ffff00"></sp-color-field>
```

</sp-tab-panel>
<sp-tab value="xl">Xtra Large</sp-tab>

<sp-tab-panel value="xl">

```html
<sp-color-field size="xl" value="#ffff00"></sp-color-field>
```

</sp-tab-panel>
</sp-tabs>

## View Color

When `view-color` is true, the color handle will be rendered. This is useful for development and debugging purposes.

```html
<sp-color-field view-color value="#f00"></sp-color-field>
```

## Read Only

A readonly color field

```html
<sp-color-field readonly value="#ffff00"></sp-color-field>
```

## Quiet

A Quiet color field

```html
<sp-color-field quiet value="#e6e600"></sp-color-field>
```

## Invalid Input

If the input value is not a valid color, `<sp-color-field>` will not accept it.

```html
<sp-color-field value="not a color"></sp-color-field>
```

## Valid Input

If the input value is a valid color, the `<sp-color-field>` will accept it and the color handle will be updated to reflect the new color.

`<sp-color-field>` component accepts color values in various formats: `HEX, RGB, HSL, HSV, and shorthand HEX`

-   **HEX**: A hexadecimal color is specified with: `#RRGGBB`. `RR` (red), `GG` (green) and `BB` (blue) are hexadecimal integers between `00` and `FF` specifying the intensity of the color.

```html
<sp-color-field value="#ff0000"></sp-color-field>
```

-   **Shorthand HEX**: Shorthand hexadecimal color values are also supported. `#RGB` is a shorthand for `#RRGGBB`. In the shorthand form, `R` (red), `G` (green), and `B` (blue) are hexadecimal characters between `0` and `F`. Each character is repeated to create the full 6-digit color code. For example, `#123` would expand to `#112233`.

```html
<sp-color-field view-color value="#f00"></sp-color-field>
```

-   **RGB**: An RGB color value is specified with: rgb(red, green, blue). Each parameter defines the intensity of the color with a value between 0 and 255.

```html
<sp-color-field view-color value="rgb(0,2555,0)"></sp-color-field>
```

-   **RGBA**: An RGBA color value is specified with: `rgba(red, green, blue, alpha)`. The `alpha` parameter is a number between 0.0 (fully transparent) and 1.0 (fully opaque).

```html
<sp-color-field view-color value="rgba(0,255,0,0.3)"></sp-color-field>
```

-   **HSL**: An HSL color value is specified with: hsl(hue, saturation, lightness). Hue is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, and 240 is blue. Saturation and lightness are percentages.

```html
<sp-color-field view-color value="hsl(234, 70%, 50%)"></sp-color-field>
```

-   **HSV**: An HSV color value is specified with: hsv(hue, saturation, value). Hue is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, and 240 is blue. Saturation and value are percentages.

```html
<sp-color-field view-color value="hsv(0, 70%, 50%)"></sp-color-field>
```

## Events

The sp-color-field component fires a change event when the color value is changed. You can listen for this event to react to changes in the color value.
