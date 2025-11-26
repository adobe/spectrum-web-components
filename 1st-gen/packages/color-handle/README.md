## Overview

The `<sp-color-handle>` is used to select a color on an `<sp-color-area>`, `<sp-color-slider>`, or `<sp-color-wheel>`. It provides a draggable control point for precise color selection within color components.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-handle?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-handle)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-handle?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-handle)

**Note**: `<sp-color-handle>` is a primitive component designed to be used within other color selection components. It's not typically used directly in applications, but rather as part of higher-level color components like `<sp-color-area>`, `<sp-color-slider>`, or `<sp-color-wheel>`.

```bash
yarn add @spectrum-web-components/color-handle
```

Import the side effectful registration of `<sp-color-handle>` via:

```javascript
import '@spectrum-web-components/color-handle/sp-color-handle.js';
```

When looking to leverage the `ColorHandle` base class as a type and/or for extension purposes, do so via:

```javascript
import { ColorHandle } from '@spectrum-web-components/color-handle';
```

### Anatomy

The color handle consists of several key parts:

- A visual handle element that indicates the current position
- Touch-responsive interaction areas
- Color display showing the current selected color
- Opacity checkerboard pattern for transparent colors
- An optional `sp-color-loupe` that appears above the handle when the properties `open = true` and `disabled = false`

```html
<sp-color-handle></sp-color-handle>
```

### Options

#### Color

The `color` property sets the visual color displayed within the handle. This accepts any valid CSS color format. The default color is `rgba(255, 0, 0, 0.5)` (semi-transparent red).

For a complete list of supported color formats, see the [ColorController documentation](/tools/color-controller#supported-color-formats).

**Transparency Support**: When using transparent colors, the handle displays an opacity checkerboard pattern background to clearly show the transparency level.

```html
<div style="display: flex; gap: 16px; align-items: center; margin: 16px 0;">
    <!-- Hex color -->
    <div style="position: relative; height: 20px; margin: 20px;">
        <sp-color-handle color="#ff0000"></sp-color-handle>
    </div>

    <!-- RGB format -->
    <div style="position: relative; height: 20px; margin: 20px;">
        <sp-color-handle color="rgb(255, 0, 0)"></sp-color-handle>
    </div>

    <!-- RGBA format with transparency -->
    <div style="position: relative; height: 20px; margin: 20px;">
        <sp-color-handle color="rgba(255, 0, 0, 0.5)"></sp-color-handle>
    </div>

    <!-- HSL format -->
    <div style="position: relative; height: 20px; margin: 20px;">
        <sp-color-handle color="hsl(0, 100%, 50%)"></sp-color-handle>
    </div>

    <!-- Named colors -->
    <div style="position: relative; height: 20px; margin: 20px;">
        <sp-color-handle color="red"></sp-color-handle>
    </div>
</div>
```

### States

#### Standard

The default state of the color handle, ready for interaction:

```html
<sp-color-handle></sp-color-handle>
```

#### Disabled

A disabled color handle shows that the control exists but is not available for interaction. This maintains layout continuity and communicates that the handle may become available later:

```html
<sp-color-handle disabled></sp-color-handle>
```

#### Open

When the `open` property is set, the `<sp-color-loupe>` component appears above the handle to show the selected color that would otherwise be covered by a mouse, stylus, or finger on the down/touch state. The loupe automatically appears for touch input (`pointerType === 'touch'`).

```html
<div style="height: 72px"></div>
<sp-color-handle open></sp-color-handle>
```

**Automatic Behavior**: The loupe automatically opens when touched and closes when the touch interaction ends. For mouse and stylus input, the loupe remains hidden by default unless explicitly set to `open="true"`.

#### Focused

The color handle can receive keyboard focus when used within interactive color components. The focused state is managed automatically by the parent component and is indicated visually:

```html
<sp-color-handle focused></sp-color-handle>
```

### Behaviors

#### Pointer Interactions

The color handle automatically manages pointer events to provide the optimal user experience:

- **Touch Input**: When touched (`pointerType === 'touch'`), the color loupe automatically appears to prevent the finger from obscuring the selected color
- **Mouse/Stylus Input**: The loupe remains hidden by default for precision pointing devices
- **Pointer Capture**: The handle captures pointer events during interaction to ensure smooth dragging even when the pointer moves outside the handle area
- **Event Handling**: The component listens for `pointerdown`, `pointerup`, and `pointercancel` events to manage the interaction lifecycle

#### Color Display

The handle displays the current color with proper support for transparency:

- Transparent colors are shown with an opacity checkerboard pattern background
- The color updates in real-time as the user interacts with the parent color component
- Supports all standard CSS color formats

For a complete list of supported color formats, see the [ColorController documentation](/tools/color-controller#supported-color-formats).

### Accessibility

The `<sp-color-handle>` is designed to work as part of accessible color selection components:

#### Keyboard Support

While the color handle itself is not directly keyboard accessible, it works in conjunction with its parent components ([`<sp-color-area>`](/components/color-area), [`<sp-color-slider>`](/components/color-slider), [`<sp-color-wheel>`](/components/color-wheel)) which provide comprehensive keyboard navigation.
Example: Keyboard accessibility with `sp-color-area` as parent component

```html
<sp-color-area></sp-color-area>
```

#### Screen Reader Support

The color handle is rendered as a visual indicator and does not directly interface with screen readers. Accessibility is provided through the parent color component's ARIA implementation.

#### Touch Accessibility

- **Color Loupe**: Automatically appears for touch input to ensure the selected color remains visible
- **Large Touch Target**: The handle provides an appropriately sized touch target for mobile interaction
- **Pointer Capture**: Ensures reliable dragging behavior across different touch devices

#### Focus Management

Focus is managed by the parent color component, with the handle reflecting the focused state visually when its parent component has keyboard focus.
