## Overview

An `<sp-color-area>` allows users to visually select two properties of a color simultaneously. It's commonly used together with a color slider or color wheel to create comprehensive color selection interfaces.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-area?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-area)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-area?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-area)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-nqupkmym)

```bash
yarn add @spectrum-web-components/color-area
```

Import the side effectful registration of `<sp-color-area>` via:

```javascript
import '@spectrum-web-components/color-area/sp-color-area.js';
```

When looking to leverage the `ColorArea` base class as a type and/or for extension purposes, do so via:

```javascript
import { ColorArea } from '@spectrum-web-components/color-area';
```

### Anatomy

The color area consists of several key parts:

- A two-dimensional color selection area with visual gradients
- A draggable handle that indicates the current color position
- Accessible labels for the X and Y axes
- Optional custom gradient slot for advanced styling

```html
<sp-color-area></sp-color-area>
```

#### Custom Gradient

You can provide a custom gradient to replace the default color area appearance using the `gradient` slot:

```html
<sp-color-area>
    <div slot="gradient" class="textured-gradient"></div>
</sp-color-area>

<style>
    .textured-gradient {
        width: 100%;
        height: 100%;
        background: 
        /* Subtle texture overlay */
            radial-gradient(
                circle at 20% 80%,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 90%
            ),
            radial-gradient(
                circle at 80% 20%,
                rgba(0, 0, 0, 0.1) 0%,
                transparent 50%
            ),
            /* Standard HSV gradients */
                linear-gradient(to bottom, transparent 0%, black 100%),
            linear-gradient(to right, white 0%, transparent 100%),
            hsl(180, 100%, 50%);
    }
</style>
```

### Options

#### Properties

The color area supports several properties for configuration:

##### Hue

Control the base hue of the color area (0-360 degrees):

```html
<sp-color-area hue="240"></sp-color-area>
```

##### Color Values

The color area supports a wide variety of color formats for setting and getting color values:

```html
<!-- Hex formats (3, 4, 6, or 8 digits) -->
<sp-color-area color="#f00"></sp-color-area>
<sp-color-area color="#f00f"></sp-color-area>
<sp-color-area color="#ff0000"></sp-color-area>
<sp-color-area color="#ff0000ff"></sp-color-area>

<!-- RGB/RGBA formats -->
<sp-color-area color="rgb(255, 0, 0)"></sp-color-area>
<sp-color-area color="rgba(255, 0, 0, 0.5)"></sp-color-area>
<sp-color-area color="rgb(100%, 0%, 0%)"></sp-color-area>
<sp-color-area color="rgb 255 0 0"></sp-color-area>

<!-- HSL/HSLA formats -->
<sp-color-area color="hsl(0, 100%, 50%)"></sp-color-area>
<sp-color-area color="hsla(0, 100%, 50%, 0.5)"></sp-color-area>
<sp-color-area color="hsl 0 100% 50%"></sp-color-area>

<!-- HSV/HSVA formats -->
<sp-color-area color="hsv(0, 100%, 100%)"></sp-color-area>
<sp-color-area color="hsva(0, 100%, 100%, 0.5)"></sp-color-area>
<sp-color-area color="hsv 0 100% 100%"></sp-color-area>

<!-- Named colors -->
<sp-color-area color="red"></sp-color-area>
<sp-color-area color="rebeccapurple"></sp-color-area>
```

When using the color elements, the `color` property will maintain the format you provided. For example, if you supply a color in `rgb()` format, `el.color` will return the color in `rgb()` format as well.

##### Step Size

The `step` attribute controls the granularity of color selection when using keyboard navigation. It defines the increment size (between 0 and 1) for each movement when using arrow keys or other keyboard controls.

```html
<!-- Default step size is 0.01 (1% increments) -->
<sp-color-area></sp-color-area>

<!-- Larger step size for coarser adjustments (5% increments) -->
<sp-color-area step="0.05"></sp-color-area>

<!-- Smaller step size for finer precision (0.5% increments) -->
<sp-color-area step="0.005"></sp-color-area>
```

The step size affects:

- Regular arrow key movements (moves by 1× step)
- <kbd>Shift</kbd>+arrow key combinations (moves by 5× step)
- <kbd>Page Up</kbd>/<kbd>Page Down</kbd> keys (moves by 10× step vertically)
- <kbd>Home</kbd>/<kbd>End keys</kbd>  (moves by 10× step horizontally)

A smaller step value provides more precise control but requires more key presses to move across the color area, while a larger step value allows for faster movement at the cost of precision. Choose a step size appropriate for your use case:

- **Fine-tuning**: Use smaller values (0.001-0.01) for detailed color work
- **General use**: The default (0.01) works well for most scenarios
- **Quick selection**: Larger values (0.05-0.1) for faster navigation

##### Direction

The color area supports both left-to-right and right-to-left layouts:

```html
<sp-color-area dir="rtl"></sp-color-area>
```

#### Custom Sizing

An `<sp-color-area>`'s height and width can be customized appropriately for its context.

```html
<sp-color-area
    style="
        width: 72px; 
        height: 72px"
></sp-color-area>
```

### States

#### Disabled

An `<sp-color-area>` in a disabled state shows that an input exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that the area may become available later.

```html
<sp-color-area disabled></sp-color-area>
```

#### Focused

The color area manages its focused state automatically, but you can also check the focused state programmatically:

```javascript
const colorArea = document.querySelector('sp-color-area');
console.log(colorArea.focused); // true or false
```

### Behaviors

#### Color Formatting

When using the color elements, use `el.color` to access the `color` property, which should manage itself in the colour format supplied. For example, If you supply a color in `rgb()` format, `el.color` should return the color in `rgb()` format, as well. In ColorArea, colours are formatted as hex values.

The current color formats supported are as follows:

- Hex3, Hex4, Hex6, Hex8
- HSV, HSVA
- HSL, HSLA
- RGB, RGBA
- Named color strings (see [full list](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color))

#### Pointer Interactions

The color area supports both mouse and touch interactions:

- **Click**: Jump to a specific color position
- **Drag**: Continuously adjust color while dragging
- **Touch**: Full touch support for mobile devices

```html
<sp-color-area @pointerdown="${(event)" =""></sp-color-area>
```

#### Focus Management

The color area automatically manages focus between its internal X and Y axis controls:

### Accessibility

The `<sp-color-area>` is rendered with appropriate ARIA attributes to ensure accessibility for screen readers and keyboard navigation.

#### Accessible Labels

An `<sp-color-area>` renders accessible labels for each axis: _"saturation"_ and _"luminosity"_.
Specify `label-x` and `label-y` attributes to override these defaults.

```html
<sp-color-area
    label-x="Color intensity"
    label-y="Color brightness"
></sp-color-area>
```

#### Keyboard Navigation

The color area supports comprehensive keyboard interaction for precise color selection:

<sp-table>
    <sp-table-head>
        <sp-table-head-cell>Key</sp-table-head-cell>
        <sp-table-head-cell>Action</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell><kbd>Arrow Keys</kbd></sp-table-cell>
            <sp-table-cell>Move the color selection by one step</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>Shift + Arrow Keys</kbd></sp-table-cell>
            <sp-table-cell>Move the color selection by a larger step (5x)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>Page Up</kbd>/<kbd>Page Down</kbd></sp-table-cell>
            <sp-table-cell>Move vertically by a large step (10x)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>Home</kbd>/<kbd>End</kbd></sp-table-cell>
            <sp-table-cell>Move horizontally by a large step (10x)</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>

#### ARIA Attributes

The component provides comprehensive ARIA support with different behavior for mobile and desktop:

- **Role**: Uses native `input[type="range"]` elements with implicit "slider" roles for 2D color selection
- **Role Description**: Announces as "2d slider" on desktop devices (omitted on mobile for better touch screen reader experience)
- **Labels**:
    - Mobile: Simple axis labels (e.g., "saturation", "luminosity")
    - Desktop: Combined labels (e.g., "saturation Color Picker", "luminosity Color Picker")
- **Orientation**: Explicitly set as "horizontal" for X-axis and "vertical" for Y-axis
- **Value Text**: Internationalized percentage values
    - Mobile: Single axis value (e.g., "45%")
    - Desktop: Comprehensive context including both axes (e.g., "45%, saturation, 78%, luminosity")
- **Fieldset**: Contains both sliders with appropriate labeling for mobile screen readers
- **Presentation**: Wrapper divs marked with `role="presentation"` to avoid navigation confusion

#### Screen Reader Support

The component provides comprehensive screen reader support through:

- **Internationalized Values**: Percentage values are formatted according to the user's locale using `Intl.NumberFormat`
- **Context-Aware Announcements**: Different announcement patterns for focus changes vs. value changes
- **Focused State Management**: Special handling to prevent focus traps and ensure proper screen reader navigation
- **Shadow DOM Optimization**: Dynamically creates shadow roots when focused to prevent duplicate tab stops in certain browsers
- **Keyboard Focus Tracking**: Maintains the active axis (X or Y) to ensure consistent focus when navigating with a screen reader
- **Value Change Context**: When values change, announces only the changed value; when focused, announces both axes for context

#### Mobile Accessibility

The component implements specific optimizations for mobile devices (Android and iOS):

- **Platform Detection**: Uses `isAndroid()` and `isIOS()` to apply platform-specific behaviors
- **Simplified ARIA**: Provides more concise labels and values on mobile to improve screen reader experience
- **Touch Pointer Events**: Special handling for touch interactions vs. mouse interactions
- **Mobile Focus States**: Different focus handling for touch vs. mouse input
- **Fieldset Labeling**: Adds an explicit `aria-label="Color Picker"` to the fieldset only on mobile
- **Omitted Role Description**: Removes the "2d slider" role description on mobile for better compatibility with mobile screen readers
- **Simplified Value Text**: Announces only the current axis value without additional context to reduce verbosity on mobile
