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

````html
<!-- Example 1: Enhanced color wheel with custom CSS gradient -->
<sp-color-wheel>
    <div slot="gradient" class="enhanced-wheel"></div>
</sp-color-wheel>

<style>
    .enhanced-wheel {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: conic-gradient(
            from 0deg,
            hsl(0, 100%, 50%),
            hsl(30, 100%, 50%),
            hsl(60, 100%, 50%),
            hsl(90, 100%, 50%),
            hsl(120, 100%, 50%),
            hsl(150, 100%, 50%),
            hsl(180, 100%, 50%),
            hsl(210, 100%, 50%),
            hsl(240, 100%, 50%),
            hsl(270, 100%, 50%),
            hsl(300, 100%, 50%),
            hsl(330, 100%, 50%),
            hsl(360, 100%, 50%)
        );
        /* Add inner circle for ring effect */
        mask: radial-gradient(circle, transparent 35%, black 35%);
        -webkit-mask: radial-gradient(circle, transparent 35%, black 35%);
    }
</style>

<!-- Example 2: Pastel color wheel using SVG -->
<sp-color-wheel>
    <svg
        slot="gradient"
        viewBox="0 0 200 200"
        style="width: 100%; height: 100%;"
    >
        <defs>
            <linearGradient id="pastel-blend">
                <stop offset="0%" style="stop-color:white;stop-opacity:0.5" />
                <stop offset="100%" style="stop-color:white;stop-opacity:0" />
            </linearGradient>
        </defs>
        <!-- Create pastel wheel with multiple path segments -->
        <g transform="translate(100,100)">
            <path
                d="M 0,-80 A 80,80 0 0,1 69.3,-40 L 34.6,-20 A 40,40 0 0,0 0,-40 Z"
                fill="hsl(0, 70%, 70%)"
            />
            <path
                d="M 69.3,-40 A 80,80 0 0,1 69.3,40 L 34.6,20 A 40,40 0 0,0 34.6,-20 Z"
                fill="hsl(60, 70%, 70%)"
            />
            <path
                d="M 69.3,40 A 80,80 0 0,1 0,80 L 0,40 A 40,40 0 0,0 34.6,20 Z"
                fill="hsl(120, 70%, 70%)"
            />
            <path
                d="M 0,80 A 80,80 0 0,1 -69.3,40 L -34.6,20 A 40,40 0 0,0 0,40 Z"
                fill="hsl(180, 70%, 70%)"
            />
            <path
                d="M -69.3,40 A 80,80 0 0,1 -69.3,-40 L -34.6,-20 A 40,40 0 0,0 -34.6,20 Z"
                fill="hsl(240, 70%, 70%)"
            />
            <path
                d="M -69.3,-40 A 80,80 0 0,1 0,-80 L 0,-40 A 40,40 0 0,0 -34.6,-20 Z"
                fill="hsl(300, 70%, 70%)"
            />
            <!-- Apply gradient overlay for smooth blending -->
            <circle r="80" fill="url(#pastel-blend)" />
        </g>
    </svg>
</sp-color-wheel>

<!-- Example 3: High contrast wheel with markers -->
<sp-color-wheel>
    <div slot="gradient" class="high-contrast-wheel">
        <div class="marker" style="--angle: 0deg;">R</div>
        <div class="marker" style="--angle: 120deg;">G</div>
        <div class="marker" style="--angle: 240deg;">B</div>
    </div>
</sp-color-wheel>

<style>
    .high-contrast-wheel {
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 50%;
        background: conic-gradient(
            from 0deg,
            #ff0000,
            #ffff00,
            #00ff00,
            #00ffff,
            #0000ff,
            #ff00ff,
            #ff0000
        );
        mask: radial-gradient(circle, transparent 40%, black 40%);
        -webkit-mask: radial-gradient(circle, transparent 40%, black 40%);
    }

    .high-contrast-wheel .marker {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-90px);
        font-weight: bold;
        color: white;
        text-shadow: 0 0 3px black;
    }
</style>

### Options #### Properties The color wheel supports several properties for
configuration: ##### Value (Hue) Control the hue value directly (0-360 degrees):
```html
<sp-color-wheel value="180"></sp-color-wheel>
````

##### Color Values

The color wheel supports a wide variety of color formats for setting and getting color values:

```html
<!-- Hex3 format (3-digit) -->
<sp-color-wheel color="#f00"></sp-color-wheel>
<sp-color-wheel color="#0a5"></sp-color-wheel>

<!-- Hex4 format (3-digit + alpha) -->
<sp-color-wheel color="#f00f"></sp-color-wheel>
<sp-color-wheel color="#0a58"></sp-color-wheel>

<!-- Hex6 format (6-digit) -->
<sp-color-wheel color="#ff0000"></sp-color-wheel>
<sp-color-wheel color="#00aa55"></sp-color-wheel>

<!-- Hex8 format (6-digit + alpha) -->
<sp-color-wheel color="#ff0000ff"></sp-color-wheel>
<sp-color-wheel color="#00aa5580"></sp-color-wheel>

<!-- RGB format -->
<sp-color-wheel color="rgb(255, 0, 0)"></sp-color-wheel>
<sp-color-wheel color="rgb(0, 170, 85)"></sp-color-wheel>

<!-- RGBA format -->
<sp-color-wheel color="rgba(255, 0, 0, 1)"></sp-color-wheel>
<sp-color-wheel color="rgba(0, 170, 85, 0.5)"></sp-color-wheel>

<!-- HSL format -->
<sp-color-wheel color="hsl(0, 100%, 50%)"></sp-color-wheel>
<sp-color-wheel color="hsl(150, 100%, 33%)"></sp-color-wheel>

<!-- HSLA format -->
<sp-color-wheel color="hsla(0, 100%, 50%, 1)"></sp-color-wheel>
<sp-color-wheel color="hsla(150, 100%, 33%, 0.5)"></sp-color-wheel>

<!-- HSV format -->
<sp-color-wheel color="hsv(0, 100%, 100%)"></sp-color-wheel>
<sp-color-wheel color="hsv(150, 100%, 67%)"></sp-color-wheel>

<!-- HSVA format -->
<sp-color-wheel color="hsva(0, 100%, 100%, 1)"></sp-color-wheel>
<sp-color-wheel color="hsva(150, 100%, 67%, 0.5)"></sp-color-wheel>

<!-- Named color strings -->
<sp-color-wheel color="red"></sp-color-wheel>
<sp-color-wheel color="rebeccapurple"></sp-color-wheel>
<sp-color-wheel color="darkseagreen"></sp-color-wheel>
<sp-color-wheel color="cornflowerblue"></sp-color-wheel>
```

##### Step Size

The `step` attribute controls the increment of hue adjustment when using keyboard navigation. It defines how many degrees the hue changes with each arrow key press:

```html
<!-- Fine control: 1 degree per key press (default) -->
<sp-color-wheel step="1"></sp-color-wheel>

<!-- Medium control: 10 degrees per key press -->
<sp-color-wheel step="10"></sp-color-wheel>

<!-- Coarse control: 45 degrees per key press (8 stops around the wheel) -->
<sp-color-wheel step="45"></sp-color-wheel>
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
