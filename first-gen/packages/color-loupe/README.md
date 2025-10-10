## Overview

An `<sp-color-loupe>` shows the output color that would otherwise be covered by a cursor, stylus, or finger during color selection.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-loupe?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-loupe)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-loupe?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-loupe)

```bash
yarn add @spectrum-web-components/color-loupe
```

Import the side effectful registration of `<sp-color-loupe>` via:

```javascript
import '@spectrum-web-components/color-loupe/sp-color-loupe.js';
```

When looking to leverage the `ColorLoupe` base class as a type and/or for extension purposes, do so via:

```javascript
import { ColorLoupe } from '@spectrum-web-components/color-loupe';
```

### Anatomy

The color loupe consists of:

- A floating loupe element positioned above the interaction point
- A color preview that reflects the color currently sampled by its parent color component

```html
<div style="padding: 100px 0 0;">
    <div style="position:relative">
        <sp-color-loupe open="" dir="ltr"></sp-color-loupe>
    </div>
</div>
```

### Options

#### Color

The color property sets the visual color displayed within the loupe. This accepts any valid CSS color format.

For a complete list of supported color formats, see the [ColorController documentation](/tools/color-controller#supported-color-formats).

Transparency Support: When using transparent colors, the handle displays an opacity checkerboard pattern background to clearly show the transparency level.

```html
<div
    style="display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start; width: 100%;;"
>
    <!-- Yellow color loupe -->
    <div style="padding: 100px 0 0; position: relative; min-width: 120px;">
        <div style="position: relative;">
            <sp-color-loupe color="yellow" open dir="ltr"></sp-color-loupe>
        </div>
    </div>

    <!-- Red color loupe -->
    <div style="padding: 100px 0 0; position: relative; min-width: 120px;">
        <div style="position: relative;">
            <sp-color-loupe color="#ff0000" open dir="ltr"></sp-color-loupe>
        </div>
    </div>

    <!-- Blue color loupe -->
    <div style="padding: 100px 0 0; position: relative; min-width: 120px;">
        <div style="position: relative;">
            <sp-color-loupe
                color="rgba(44, 62, 224, 0.81)"
                open
                dir="ltr"
            ></sp-color-loupe>
        </div>
    </div>

    <!-- Green color loupe -->
    <div style="padding: 100px 0 0; position: relative; min-width: 120px;">
        <div style="position: relative;">
            <sp-color-loupe
                color="hsl(111, 82%, 56%)"
                open
                dir="ltr"
            ></sp-color-loupe>
        </div>
    </div>
</div>
```

### States

#### Open

The `open` attribute controls whether the loupe is visible. When `open` is present, the loupe displays the color preview.

```html
<div style="display: flex; flex-direction: row; gap: 20px;">
    <!-- Loupe is visible -->
    <div style="padding: 100px 0 0; margin-left:20%">
        <div style="position:relative">
            <sp-color-loupe open="" dir="ltr"></sp-color-loupe>
            <p id="color-context" style="margin-top: 40px">
                This loupe above this text is visible.
            </p>
        </div>
    </div>

    <!-- Loupe is hidden -->
    <div style="padding: 100px 0 0;">
        <div style="position:relative">
            <sp-color-loupe dir="ltr"></sp-color-loupe>
            <p id="color-context" style="margin-top: 40px">
                This loupe above this text is not visible.
            </p>
        </div>
    </div>
</div>
```

### Behaviors

The color loupe is typically managed by its parent color component (such as `<sp-color-area>`, `<sp-color-slider>`, or `<sp-color-wheel>`). The loupe automatically appears when the user interacts with the parent component and disappears when the interaction ends.

#### Automatic behavior

- **Touch input**: The loupe automatically appears during touch interactions with any color component (`<sp-color-area>`, `<sp-color-slider>`, or `<sp-color-wheel>`) to prevent the finger from obscuring the selected color
- **Mouse/Stylus input**: The loupe remains hidden by default for precision pointing devices
- **Parent control**: The loupe's visibility is managed by the parent color component
- **Accessibility**: The loupe ensures that users can see the selected color even when their finger covers the interaction point

### Accessibility

The `<sp-color-loupe>` is designed to work as part of accessible color selection components. The loupe automatically appears during touch interactions with any of these components to ensure the selected color remains visible:

<sp-tabs selected="color-area" auto label="ColorArea">
<sp-tab value="color-area">Color-Area</sp-tab>
<sp-tab-panel value="color-area">

```html
<div
    style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;"
>
    <sp-color-area
        aria-label="Saturation and brightness selector - adjust color intensity and lightness"
        aria-describedby="color-context"
    ></sp-color-area>
</div>
```

</sp-tab-panel>
<sp-tab value="color-slider">Color-Slider</sp-tab>
<sp-tab-panel value="color-slider">

```html
<div
    style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;"
>
    <sp-color-slider
        aria-label="Hue slider - adjust the base color"
        aria-describedby="color-context"
    ></sp-color-slider>
</div>
```

</sp-tab-panel>
<sp-tab value="color-wheel">Color-Wheel</sp-tab>
<sp-tab-panel value="color-wheel">

```html
<div
    style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;"
>
    <sp-color-wheel
        aria-label="Color wheel - select from the full color spectrum"
        aria-describedby="color-context"
    ></sp-color-wheel>
</div>
```

</sp-tab-panel>
</sp-tabs>

#### Screen reader support

The color loupe is rendered as a visual indicator and does not directly interface with screen readers. Accessibility is provided through the parent color component's ARIA implementation.

#### Focus management

Focus is managed by the parent color component, with the loupe reflecting the focused state visually when its parent component has keyboard focus.

#### Touch accessibility

- **Automatic loupe display**: During touch interactions with any color component, the loupe automatically appears to ensure the selected color remains visible
- **Finger coverage prevention**: The loupe prevents the user's finger from obscuring the color they're selecting
- **Touch interaction support**: Color components support touch interactions with proper pointer event handling
- **Visual feedback**: The loupe provides immediate visual feedback during touch interactions

#### Best practices

- Ensure the parent color component (for example, `sp-color-area`, `sp-color-slider`, or `sp-color-wheel`) provides appropriate labeling via visible text or ARIA
- Avoid conveying meaning through color alone; pair color with text, labels, or other indicators as appropriate
- The loupe is visual-only and should not receive focus. Manage focus on the interactive parent control
- Test touch interactions on mobile devices to ensure the loupe appears correctly and provides adequate visual feedback

#### Accessible example

Provide clear context for what the loupe displays. The loupe itself is presentational and is typically managed by its parent color component. During touch interactions, the loupe automatically appears to ensure the selected color remains visible. The loupe is a visual-only element and doesn't require ARIA attributes since it doesn't provide interactive functionality.

```html
<div
    role="region"
    aria-label="Color selection interface"
    style="padding: 100px 0 0;"
>
    <div
        style="position: relative; display: flex; flex-direction: column; align-items: center;"
    >
        <sp-color-loupe open dir="ltr"></sp-color-loupe>
    </div>
    <p id="color-context" style="margin-top: 8px; text-align: center;">
        The loupe above shows the color currently selected. During touch
        interactions, it automatically appears to prevent your finger from
        covering the selected color.
    </p>
</div>
```
