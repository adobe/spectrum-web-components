## Overview

An `<sp-color-wheel>` allows users to visually select the hue of a color on a circular track. It's commonly used together with other color components to create comprehensive color selection interfaces.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-wheel?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-wheel)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-wheel?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-wheel)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-cqyqwmbq)

```bash
yarn add @spectrum-web-components/color-wheel
```

Import the side effectful registration of `<sp-color-wheel>` via:

```javascript
import '@spectrum-web-components/color-wheel/sp-color-wheel.js';
```

When looking to leverage the `ColorWheel` base class as a type and/or for extension purposes, do so via:

```javascript
import { ColorWheel } from '@spectrum-web-components/color-wheel';
```

### Anatomy

The color wheel consists of several key parts:

- A circular track displaying the full spectrum of hues
- A draggable handle that indicates the current hue selection
- Accessible labels for screen readers
- Optional custom gradient slot for advanced styling

```html
<sp-color-wheel></sp-color-wheel>
```

#### Custom Gradient

You can provide a custom gradient to replace the default color wheel appearance using the `gradient` slot:

```html
<sp-color-wheel>
    <div slot="gradient" class="custom-gradient">
        <!-- Custom SVG or gradient implementation -->
    </div>
</sp-color-wheel>
```

### Options

#### Properties

The color wheel supports several properties for configuration:

##### Value (Hue)

Control the hue value directly (0-360 degrees):

```html
<sp-color-wheel value="180"></sp-color-wheel>
```

##### Color Values

Set and get color values using various formats:

```html
<!-- Hex formats -->
<sp-color-wheel color="#ff0000"></sp-color-wheel>
<sp-color-wheel color="#f00"></sp-color-wheel>

<!-- RGB format -->
<sp-color-wheel color="rgb(255, 0, 0)"></sp-color-wheel>

<!-- HSL format -->
<sp-color-wheel color="hsl(0, 100%, 50%)"></sp-color-wheel>

<!-- Named colors -->
<sp-color-wheel color="red"></sp-color-wheel>
```

##### Step Size

Customize the precision of keyboard navigation (default: 1):

```html
<sp-color-wheel step="10"></sp-color-wheel>
```

##### Label

Provide a custom aria-label for accessibility:

```html
<sp-color-wheel label="Select color hue"></sp-color-wheel>
```

##### Direction

The color wheel supports both left-to-right and right-to-left layouts:

```html
<sp-color-wheel dir="rtl"></sp-color-wheel>
```

#### Custom Sizing

An `<sp-color-wheel>`'s size can be customized appropriately for its context. By default, the size is size-2400 (192 px on desktop, 240 px on mobile).

```html
<sp-color-wheel style="width: 300px; height: 300px;"></sp-color-wheel>
```

### States

#### Disabled

A color wheel in a disabled state shows that an input exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that the wheel may become available later.

```html
<sp-color-wheel disabled></sp-color-wheel>
```

#### Focused

The color wheel manages its focused state automatically, providing visual feedback during keyboard navigation:

```javascript
const colorWheel = document.querySelector('sp-color-wheel');
console.log(colorWheel.focused); // true or false
```

### Behaviors

#### Color Formatting

When using the color elements, use `el.color` to access the `color` property, which should manage itself in the color format supplied. If you supply a color in `rgb()` format, `el.color` should return the color in `rgb()` format, as well.

The current color formats supported are as follows:

- Hex3, Hex4, Hex6, Hex8
- HSV, HSVA
- HSL, HSLA
- RGB, RGBA
- Named color strings (see [full list](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color))

**Please note for the following formats: HSV, HSVA, HSL, HSLA**
When using the HSL or HSV formats, and a color's value (in HSV) is set to 0, or its luminosity (in HSL) is set to 0 or 1, the hue and saturation values may not be preserved by the element's `color` property. This is detailed in the [colorjs documentation](https://colorjs.io/docs/). Separately, the element's `value` property is directly managed by the hue as represented in the interface.

#### Pointer Interactions

The color wheel supports both mouse and touch interactions:

- **Click**: Jump to a specific hue on the wheel
- **Drag**: Continuously adjust hue while dragging around the wheel
- **Touch**: Full touch support for mobile devices

#### Focus Management

The color wheel automatically manages focus for keyboard accessibility, ensuring proper focus indication and keyboard operability.

### Accessibility

The `<sp-color-wheel>` is rendered with appropriate ARIA attributes to ensure accessibility for screen readers and keyboard navigation.

#### Keyboard Navigation

The color wheel supports comprehensive keyboard interaction:

<sp-table>
    <sp-table-head>
        <sp-table-head-cell>Key</sp-table-head-cell>
        <sp-table-head-cell>Action</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell><kbd>Arrow Left</kbd>/<kbd>Arrow Right</kbd></sp-table-cell>
            <sp-table-cell>Decrease/Increase hue by step value (respects RTL)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>Arrow Up</kbd>/<kbd>Arrow Down</kbd></sp-table-cell>
            <sp-table-cell>Increase/Decrease hue by step value</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>Shift</kbd> + Arrow Keys</sp-table-cell>
            <sp-table-cell>Adjust hue by larger increments (10× step)</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>

#### ARIA Attributes

The component provides comprehensive ARIA support:

- **Role**: Uses native `input[type="range"]` with implicit "slider" role
- **Label**: Customizable via the `label` property (defaults to "hue")
- **Value Text**: Announces the current hue value in degrees with proper internationalization
- **Orientation**: Implicitly circular, supporting both LTR and RTL layouts

#### Screen Reader Support

The component provides meaningful announcements for assistive technologies:

- Current hue value announced in degrees (e.g., "180 degrees")
- Internationalized number formatting based on user's locale
- Clear indication of the control's purpose through proper labeling

#### Mobile Accessibility

The color wheel is fully accessible on mobile devices with:

- Touch-friendly interaction areas
- Proper focus management for mobile screen readers
- Responsive sizing that maintains usability on smaller screens
