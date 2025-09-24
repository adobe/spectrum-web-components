## Overview

The `opacity-checkerboard` class provides a CSS utility that displays a checkerboard pattern background, commonly used to highlight transparent or semi-transparent areas in UI components. This visual indicator helps users distinguish between transparent and opaque regions, making it an essential tool for color pickers, image editors, and other components that work with opacity.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/opacity-checkerboard?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/opacity-checkerboard)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/opacity-checkerboard?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/opacity-checkerboard)

```bash
yarn add @spectrum-web-components/opacity-checkerboard
```

Import the opacity checkerboard styles from:

```javascript
import opacityCheckerBoardStyles from '@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js';
```

### Integration

To integrate the opacity checkerboard styles into your component, add them to your component's styles array. The order of inclusion is important, as selectors within opacity checkerboard may have the same specificity as those within your component:

```javascript
public static override get styles(): CSSResultArray {
    return [opacityCheckerBoardStyles, styles];
}
```

### Examples

#### Basic usage

Apply the `opacity-checkerboard` class to any element that needs to display the checkerboard pattern:

```html-live demo
<div
    class="opacity-checkerboard"
    style="inline-size: 100px; block-size: 100px;"
    aria-label="Transparency indicator showing checkerboard pattern"
></div>
```

#### With overlaid content

The opacity checkerboard works well as a background for elements with partial transparency:

```html-live
<div
    class="opacity-checkerboard"
    style="inline-size: 200px; block-size: 200px; position: relative;"
    role="img"
    aria-label="Color preview with transparency"
>
    <div
        style="
            position: absolute;
            inset: 0;
            background-color: rgba(255, 0, 0, 0.5);
        "
        aria-label="Semi-transparent red color overlay"
    ></div>
</div>
```

### Accessibility

When implementing the opacity checkerboard pattern, ensure proper accessibility by:

- **Providing context**: Add appropriate ARIA labels to describe what the checkerboard pattern represents
- **Role attribution**: Use `role="img"` when the checkerboard serves as a visual indicator
- **Descriptive labels**: Include `aria-label` attributes that explain the purpose of the transparency indicator
- **Alternative text**: When used in color pickers or image editors, provide text alternatives that describe the transparency level

#### Screen reader support

The opacity checkerboard is a purely visual indicator. Always provide alternative text or descriptions for screen reader users:

```html-live
<div
    class="opacity-checkerboard"
    style="inline-size: 100px; block-size: 100px;"
    aria-label="Checkerboard pattern indicating transparent areas"
>
    <span class="visually-hidden">Current opacity: 75%</span>
</div>
```

#### Keyboard navigation

When the opacity checkerboard is part of an interactive component, ensure it doesn't interfere with keyboard navigation:

```html-live
<button
    class="color-button"
    aria-label="Select color with 50% opacity"
    aria-describedby="opacity-description"
>
    <span
        class="opacity-checkerboard"
        style="inline-size: 40px; block-size: 40px; display: block;"
    ></span>
    <span id="opacity-description" class="visually-hidden">
        Color preview shown over checkerboard pattern indicating 50%
        transparency
    </span>
</button>
```
