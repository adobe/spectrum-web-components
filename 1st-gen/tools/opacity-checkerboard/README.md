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
    aria-hidden="true"
></div>
```

#### With overlaid content

The opacity checkerboard works well as a background for elements with partial transparency:

```html-live
<div
    class="opacity-checkerboard"
    style="inline-size: 200px; block-size: 200px; position: relative;"
    aria-hidden="true"
>
    <div
        style="
            position: absolute;
            inset: 0;
            background-color: rgba(255, 0, 0, 0.5);
        "
    ></div>
</div>
```

### Accessibility

When implementing the opacity checkerboard pattern, ensure proper accessibility by:

- **Hiding from screen readers**: Use `aria-hidden="true"` on the checkerboard element since it's purely visual
- **Providing semantic information**: Use separate text nodes or live regions to convey opacity information
- **Using live regions**: Implement `aria-live` regions to announce opacity changes dynamically
- **Descriptive context**: Provide meaningful descriptions of the actual color and opacity values, not the visual pattern

#### Screen reader support

The opacity checkerboard is a purely visual indicator and should remain hidden from screen readers. Instead, provide semantic information through separate text nodes or live regions that update as opacity changes:

```html-live
<div class="color-container">
    <div
        class="opacity-checkerboard"
        style="inline-size: 100px; block-size: 100px;"
        aria-hidden="true"
    ></div>
    <div class="visually-hidden" aria-live="polite" id="opacity-status">
        Current opacity: 75%
    </div>
</div>
```

For components that change opacity dynamically, use a live region to announce changes:

```html-live
<div class="dynamic-opacity-example">
    <div
        class="opacity-checkerboard"
        style="inline-size: 100px; block-size: 100px; position: relative;"
        aria-hidden="true"
    >
        <div
            style="
                position: absolute;
                inset: 0;
                background-color: rgba(255, 0, 0, 0.6);
            "
        ></div>
    </div>
    <div aria-live="assertive" class="visually-hidden">
        Opacity changed to 60%
    </div>
</div>
```

#### Keyboard navigation

When the opacity checkerboard is part of an interactive component, ensure it doesn't interfere with keyboard navigation:

```html-live
<button
    class="color-button"
    aria-label="Select red color with 50% opacity"
    aria-describedby="opacity-description"
>
    <span
        class="opacity-checkerboard"
        style="inline-size: 40px; block-size: 40px; display: block;"
        aria-hidden="true"
    ></span>
    <span id="opacity-description" class="visually-hidden">
        Red color with 50% transparency
    </span>
</button>
```
