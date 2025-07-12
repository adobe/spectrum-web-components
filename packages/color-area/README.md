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

```html
<sp-color-area></sp-color-area>
```

### Options

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

### Behaviors

#### Color Formatting

When using the color elements, use `el.color` to access the `color` property, which should manage itself in the colour format supplied. For example, If you supply a color in `rgb()` format, `el.color` should return the color in `rgb()` format, as well. In ColorArea, colours are formatted as hex values.

The current color formats supported are as follows:

- Hex3, Hex4, Hex6, Hex8
- HSV, HSVA
- HSL, HSLA
- RGB, RGBA
- Named color strings (see [full list](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color))

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

The color area supports keyboard interaction for precise color selection:

- Use arrow keys to adjust the color position
- Hold <kbd>Shift</kbd> while using arrow keys for fine adjustments
- The component maintains focus management for accessibility

#### Screen Reader Support

The component provides meaningful labels and descriptions for assistive technologies, ensuring users can understand the current color selection and how to interact with the control.
