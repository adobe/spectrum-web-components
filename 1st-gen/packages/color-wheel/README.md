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

### Custom Gradient

**⚠️ Deprecated Feature**

The custom gradient functionality has been deprecated and is no longer supported. While the `gradient` slot may still be present in the component's code, it is broken and will not work as intended.

If you previously relied on custom gradients for the color wheel, you should:

- Use the default color wheel appearance
- Consider alternative approaches for custom styling
- Remove any existing custom gradient implementations

**Note**: Even if you find the `gradient` slot in the component's source code, this feature is non-functional and should not be used in new implementations.

### Options

#### Properties

The color wheel supports several properties for configuration:

##### Value (Hue)

The `value` property controls the hue angle of the color wheel (0-360 degrees). This represents the position of the handle on the circular track and determines the hue component of the displayed color.

```html
<sp-color-wheel value="180"></sp-color-wheel>
```

##### Color Values

The color wheel supports a wide variety of color formats for setting and getting color values:

```html
<div style="display: flex; gap: 16px;">
    <sp-color-wheel color="#7277b5"></sp-color-wheel>
    <sp-color-wheel color="hsl(96, 84.00%, 49.00%)"></sp-color-wheel>
    <sp-color-wheel color="red"></sp-color-wheel>
</div>
```

<sp-table>
    <sp-table-head>
        <sp-table-head-cell>Format</sp-table-head-cell>
        <sp-table-head-cell>Example Values</sp-table-head-cell>
        <sp-table-head-cell>Description</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Hex3</sp-table-cell>
            <sp-table-cell><code>#f00</code>, <code>#0a5</code></sp-table-cell>
            <sp-table-cell>3-digit hexadecimal</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Hex4</sp-table-cell>
            <sp-table-cell><code>#f00f</code>, <code>#0a58</code></sp-table-cell>
            <sp-table-cell>3-digit hexadecimal + alpha</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Hex6</sp-table-cell>
            <sp-table-cell><code>#ff0000</code>, <code>#00aa55</code></sp-table-cell>
            <sp-table-cell>6-digit hexadecimal</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Hex8</sp-table-cell>
            <sp-table-cell><code>#ff0000ff</code>, <code>#00aa5580</code></sp-table-cell>
            <sp-table-cell>6-digit hexadecimal + alpha</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>RGB</sp-table-cell>
            <sp-table-cell><code>rgb(255, 0, 0)</code>, <code>rgb(0, 170, 85)</code></sp-table-cell>
            <sp-table-cell>Red, Green, Blue values (0-255)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>RGBA</sp-table-cell>
            <sp-table-cell><code>rgba(255, 0, 0, 1)</code>, <code>rgba(0, 170, 85, 0.5)</code></sp-table-cell>
            <sp-table-cell>RGB + Alpha channel (0-1)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>HSL</sp-table-cell>
            <sp-table-cell><code>hsl(0, 100%, 50%)</code>, <code>hsl(150, 100%, 33%)</code></sp-table-cell>
            <sp-table-cell>Hue (0-360°), Saturation, Lightness</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>HSLA</sp-table-cell>
            <sp-table-cell><code>hsla(0, 100%, 50%, 1)</code>, <code>hsla(150, 100%, 33%, 0.5)</code></sp-table-cell>
            <sp-table-cell>HSL + Alpha channel (0-1)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>HSV</sp-table-cell>
            <sp-table-cell><code>hsv(0, 100%, 100%)</code>, <code>hsv(150, 100%, 67%)</code></sp-table-cell>
            <sp-table-cell>Hue (0-360°), Saturation, Value</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>HSVA</sp-table-cell>
            <sp-table-cell><code>hsva(0, 100%, 100%, 1)</code>, <code>hsva(150, 100%, 67%, 0.5)</code></sp-table-cell>
            <sp-table-cell>HSV + Alpha channel (0-1)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Named Colors</sp-table-cell>
            <sp-table-cell><code>red</code>, <code>rebeccapurple</code>, <code>darkseagreen</code></sp-table-cell>
            <sp-table-cell>CSS color keywords (<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/named-color">full list</a>)</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>
</br>

##### Step Size

The `step` attribute controls the increment of hue adjustment when using keyboard navigation. It defines how many degrees the hue changes with each arrow key press:

```html
<div style="display: flex; gap: 16px;">
    <sp-color-wheel step="1" label="Fine Control (1° per key)"></sp-color-wheel>
    <sp-color-wheel
        step="10"
        label="Medium Control (10° per key)"
    ></sp-color-wheel>
    <sp-color-wheel
        step="45"
        label="Coarse Control (45° per key)"
    ></sp-color-wheel>
</div>
```

The step size affects keyboard navigation:

- Regular arrow keys move by the step value
- <kbd>Shift</kbd> + arrow keys move by 10× the step value
- Choose your step size based on your use case:
    - **step="1"**: Precise color selection, best for professional design tools
    - **step="10"**: Balanced control, good for general use
    - **step="45"**: Quick selection between major hues, ideal for simple color pickers

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

##### Tab Index

The `tabIndex` property controls the tab order of the color wheel within the page. This follows the standard HTML `tabindex` attribute behavior:

```html
<div style="display: flex; gap: 16px;">
    <div style="text-align: center;">
        <div style="font-weight: bold; margin-bottom: 8px;">
            Default Tab Order
        </div>
        <sp-color-wheel></sp-color-wheel>
    </div>
    <div style="text-align: center;">
        <div style="font-weight: bold; margin-bottom: 8px;">
            Skip in Tab Order
        </div>
        <sp-color-wheel tabindex="-1"></sp-color-wheel>
    </div>
    <div style="text-align: center;">
        <div style="font-weight: bold; margin-bottom: 8px;">
            Custom Tab Order
        </div>
        <sp-color-wheel tabindex="5"></sp-color-wheel>
    </div>
</div>
```

**Note**: See the general documentation about the [HTML tabindex property](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) for detailed information about tab order behavior.

#### Custom Sizing

An `<sp-color-wheel>`'s size can be customized appropriately for its context. By default, the size is 192 px.

##### Using Inline Styles

You can set custom dimensions using inline styles. For a perfect circle, ensure width and height are the same:

```html
<sp-color-wheel style="width: 300px; height: 300px;"></sp-color-wheel>
```

##### Using Mod Tokens

The component exposes CSS custom properties for consistent theming. Both `--mod-colorwheel-width` and `--mod-colorwheel-height` should be set to the same value to maintain a perfect circle:

```html
<sp-color-wheel
    style="--mod-colorwheel-width: 250px; --mod-colorwheel-height: 250px;"
></sp-color-wheel>
```

**Note**: The CSS internally reuses the width value for both dimensions, but both mod tokens are exposed for flexibility in custom implementations.

### States

#### Disabled

A color wheel in a disabled state shows that an input exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that the wheel may become available later.

```html
<sp-color-wheel disabled></sp-color-wheel>
```

#### Focused

The color wheel manages its focused state automatically, providing visual feedback during keyboard navigation:

```html
<sp-color-wheel focused></sp-color-wheel>
```

### Behaviors

#### Color Formatting

When using the color elements, use `el.color` to access the `color` property, which should manage itself in the color format supplied. If you supply a color in `rgb()` format, `el.color` should return the color in `rgb()` format, as well.

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
