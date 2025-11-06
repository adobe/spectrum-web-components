## Overview

An `<sp-color-slider>` lets users visually change an individual channel of a color. The background of the `<sp-color-slider>` is a visual representation of the range of values a user can select from. This can represent color properties such as hues, color channel values (such as RGB or CMYK levels), or opacity. Currently, the slider only supports leveraging the `hue` property.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-slider?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-slider)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-slider?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-slider)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-enye2vau)

```bash
yarn add @spectrum-web-components/color-slider
```

Import the side effectful registration of `<sp-color-slider>` via:

```javascript
import '@spectrum-web-components/color-slider/sp-color-slider.js';
```

When looking to leverage the `ColorSlider` base class as a type and/or for extension purposes, do so via:

```javascript
import { ColorSlider } from '@spectrum-web-components/color-slider';
```

### Anatomy

The color slider consists of several key parts:

- A gradient track showing the range of color values
- A draggable handle that indicates the current color position
- An accessible label for screen readers

```html
<sp-color-slider></sp-color-slider>
```

### Options

#### Orientation

By default, the color slider is displayed horizontally. You can change the orientation to vertical using the `vertical` attribute:

```html
<sp-color-slider vertical></sp-color-slider>
```

### States

#### Standard

The standard color slider allows users to select hue values from 0 to 360 degrees:

```html
<sp-color-slider></sp-color-slider>
```

#### Disabled

A color slider in a disabled state shows that an input exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that the slider may become available later.

```html
<sp-color-slider disabled></sp-color-slider>
```

### Behaviors

#### Color Formatting

When using the color elements, use `el.color` to access the `color` property, which should manage itself in the colour format supplied. If you supply a color in `rgb()` format, `el.color` should return the color in `rgb()` format, as well.

The current color formats supported are as follows:

- Hex3, Hex4, Hex6, Hex8
- HSV, HSVA
- HSL, HSLA
- RGB, RGBA
- Strings (eg "red", "blue")

For a complete list of supported color formats, see the [ColorController documentation](/tools/color-controller#supported-color-formats).

**Please note for the following formats: HSV, HSVA, HSL, HSLA**

When using the HSL or HSV formats, and a color's value (in HSV) is set to 0, or its luminosity (in HSL) is set to 0 or 1, the hue and saturation values may not be preserved by the element's `color` property. This is detailed in the [colorjs documentation](https://colorjs.io/docs/). Seperately, the element's `value` property is directly managed by the hue as represented in the interface.

### Accessibility

The `<sp-color-slider>` is rendered with appropriate ARIA attributes to ensure accessibility:

- Uses native `input[type="range"]` element with implicit "slider" role
- Provides value text announcements for screen readers
- Supports full keyboard navigation

#### Accessible Labels

The color slider includes an accessible label that describes what the slider controls. By default, the label is set to "hue", but you can customize it using the `label` attribute:

```html
<!-- Default label -->
<sp-color-slider></sp-color-slider>

<!-- Custom label -->
<sp-color-slider label="Color hue"></sp-color-slider>
<sp-color-slider label="Saturation level"></sp-color-slider>
```

The label serves several important accessibility purposes:

- **Screen Reader Announcements**: Screen readers announce the label when the slider receives focus, helping users understand what they're adjusting
- **ARIA Labeling**: The label is used as the `aria-label` attribute on the internal range input
- **Context for Value Changes**: When the slider value changes, screen readers announce both the current value and the label for context

For example, when a user focuses on a color slider with `label="Color hue"`, screen readers will announce something like "Color hue slider, 180 degrees" to provide clear context about what the control does and its current value.

#### Keyboard Navigation

<sp-table>
    <sp-table-head>
        <sp-table-head-cell>Key</sp-table-head-cell>
        <sp-table-head-cell>Action</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell><kbd>Arrow Left</kbd>/<kbd>Arrow Down</kbd></sp-table-cell>
            <sp-table-cell>Decreases the hue value</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>Arrow Right</kbd>/<kbd>Arrow Up</kbd></sp-table-cell>
            <sp-table-cell>Increases the hue value</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>Shift + Arrow Left</kbd>/<kbd>Shift + Arrow Down</kbd></sp-table-cell>
            <sp-table-cell>Decreases the hue value by a larger step (10x)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>Shift + Arrow Right</kbd>/<kbd>Shift + Arrow Up</kbd></sp-table-cell>
            <sp-table-cell>Increases the hue value by a larger step (10x)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>Page Down</kbd></sp-table-cell>
            <sp-table-cell>Decreases the hue value by a larger step(10% of total value)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>Page Up</kbd></sp-table-cell>
            <sp-table-cell>Increases the hue value by a larger step(10% of total value)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>Home</kbd></sp-table-cell>
            <sp-table-cell>Sets the hue to minimum value (0)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>End</kbd></sp-table-cell>
            <sp-table-cell>Sets the hue to maximum value (360)</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
