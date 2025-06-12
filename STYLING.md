# Spectrum web components style guide

This document outlines the styling guidelines for the Spectrum Web Components project. These rules should be followed when creating or migrating CSS files.

## CSS migration process

When migrating CSS files from the spectrum-\* format to the base component format, follow these steps:

1. Consolidate spectrum-\*.css files into the base component CSS file
2. Add proper organization with clear sections
3. Add high contrast mode support
4. Update comments to use sentence case
5. Ensure browser compatibility

## File organization

CSS files should be organized into the following sections:

```css
/* Base variables */
:host {
    /* Typography */
    /* Dimensions */
    /* Spacing */
    /* Animation */
    /* Colors */
    /* Icon colors */
    /* Error states */
    /* Disabled states */
    /* Focus indicator */
    /* Layout */
}

/* Size variants */
:host([size='s']) {
}
:host([size='l']) {
}
:host([size='xl']) {
}

/* States */
:host([quiet]) {
}
:host([disabled]) {
}
:host([readonly]) {
}

/* Component-specific styles */

/* High contrast mode */
@media (forced-colors: active) {
}
```

## Comment style

1. Use sentence case for all comments and headings.

    - Correct: `/* System variables */`
    - Incorrect: `/* SYSTEM VARIABLES */` or `/* System Variables */`

2. Add a space after comment opening and before closing.

    - Correct: `/* Comment */`
    - Incorrect: `/*Comment*/`

3. Use descriptive section comments to organize code.

4. Comments must be separated from code by a preceding blank line unless it appears right before or after a selector.

## Browser compatibility

1. Keep necessary vendor prefixes for browser compatibility

    - Example: `-webkit-appearance: button;` for Safari button styling

2. Document browser-specific rules with comments
    - Example: `/* stylelint-ignore-next-line property-no-vendor-prefix -- required for Safari button styling */`

## High contrast mode support

1. Include high contrast mode section at the bottom of each component's CSS file

2. Use the following format:

```css
@media (forced-colors: active) {
    :host {
        /* Define high contrast variables */
        --highcontrast-component-color: Highlight;
        /* etc... */
    }
}
```

A comprehensive list of CSS System colors is available in the [W3C documentation](https://www.w3.org/TR/css-color-3/#css-system). Additional context can be found in this [Adrian Roselli article](https://adrianroselli.com/2021/02/whcm-and-system-colors.html). Find a table of quick reference values below.

### CSS2 system colors

| Color               | Value   | Description                                                                                                                                                                   |
| ------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ActiveBorder        | #000000 | Active window border.                                                                                                                                                         |
| ActiveCaption       | #000000 | Active window caption.                                                                                                                                                        |
| AppWorkspace        | #FFFFFF | Background color of multiple document interface.                                                                                                                              |
| Background          | #FFFFFF | Desktop background.                                                                                                                                                           |
| ButtonFace          | #efefef | The face background color for 3-D elements that appear 3-D due to one layer of surrounding border.                                                                            |
| ButtonHighlight     | #efefef | The color of the border facing the light source for 3-D elements that appear 3-D due to one layer of surrounding border.                                                      |
| ButtonShadow        | #efefef | The color of the border away from the light source for 3-D elements that appear 3-D due to one layer of surrounding border.                                                   |
| ButtonText          | #000000 | Text on push buttons.                                                                                                                                                         |
| Highlight           | #add0f9 | Item(s) selected in a control.                                                                                                                                                |
| HighlightText       | #000000 | Text of item(s) selected in a control.                                                                                                                                        |
| InactiveBorder      | #000000 | Inactive window border.                                                                                                                                                       |
| InactiveCaption     | #FFFFFF | Inactive window caption.                                                                                                                                                      |
| InactiveCaptionText | #808080 | Color of text in an inactive caption.                                                                                                                                         |
| InfoBackground      | #FFFFFF | Background color for tooltip controls.                                                                                                                                        |
| InfoText            | #000000 | Text color for tooltip controls.                                                                                                                                              |
| Menu                | #FFFFFF | Menu background.                                                                                                                                                              |
| ThreeDDarkShadow    | #000000 | The color of the darker (generally outer) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.  |
| ThreeDFace          | #efefef | The face background color for 3-D elements that appear 3-D due to two concentric layers of surrounding border.                                                                |
| ThreeDHighlight     | #000000 | The color of the lighter (generally outer) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.    |
| ThreeDLightShadow   | #000000 | The color of the darker (generally inner) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.     |
| ThreeDShadow        | #000000 | The color of the lighter (generally inner) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border. |
| Window              | #FFFFFF | Window background.                                                                                                                                                            |
| WindowFrame         | #000000 | Window frame.                                                                                                                                                                 |
| WindowText          | #000000 | Text in windows.                                                                                                                                                              |

### CSS4 system color keywords

| Color            | Value   | Description                                                                                                                 |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| Canvas           | #FFFFFF | Background color on a canvas.                                                                                               |
| CanvasText       | #000000 | Text color on a canvas.                                                                                                     |
| LinkText         | #0000ee | Text color of a link.                                                                                                       |
| VisitedText      | #0000ee | Text color of a visited link.                                                                                               |
| ActiveText       | #0000ee | Text color of an active link.                                                                                               |
| ButtonFace       | #efefef | The face background color for 3-D elements that appear 3-D due to one layer of surrounding border.                          |
| ButtonText       | #000000 | The color of the border facing the light source for 3-D elements that appear 3-D due to one layer of surrounding border.    |
| ButtonBorder     | #000000 | The color of the border away from the light source for 3-D elements that appear 3-D due to one layer of surrounding border. |
| Field            | #FFFFFF | The face background color for 3-D elements that appear 3-D due to one layer of surrounding border.                          |
| FieldText        | #000000 | The color of the border facing the light source for 3-D elements that appear 3-D due to one layer of surrounding border.    |
| Highlight        | #add0f9 | Item(s) selected in a control.                                                                                              |
| HighlightText    | #000000 | Text of item(s) selected in a control.                                                                                      |
| Mark             | #ffff00 | Text color of a marked item.                                                                                                |
| MarkText         | #000000 | Text color of a marked item.                                                                                                |
| GrayText         | #808080 | Grayed (disabled) text. This color is set to #000 if the current display driver does not support a solid gray color.        |
| SelectedItem     | #add0f9 | The face background color for 3-D elements that appear 3-D due to one layer of surrounding border.                          |
| SelectedItemText | #000000 | The color of the border facing the light source for 3-D elements that appear 3-D due to one layer of surrounding border.    |
| AccentColor      | #0275ff | The color of the border away from the light source for 3-D elements that appear 3-D due to one layer of surrounding border. |
| AccentColorText  | #FFFFFF | The color of the border away from the light source for 3-D elements that appear 3-D due to one layer of surrounding border. |

### WHCM proprietary feature query color mappings

| Color         | Value   | Description                                                                                                              |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| ButtonFace    | #efefef | The face background color for 3-D elements that appear 3-D due to one layer of surrounding border.                       |
| ButtonText    | #000000 | The color of the border facing the light source for 3-D elements that appear 3-D due to one layer of surrounding border. |
| Highlight     | #add0f9 | Item(s) selected in a control.                                                                                           |
| HighlightText | #000000 | Text of item(s) selected in a control.                                                                                   |
| Window        | #FFFFFF | Inactive window border.                                                                                                  |
| WindowText    | #000000 | Inactive window caption.                                                                                                 |
| GrayText      | #808080 | Color of text in an inactive caption.                                                                                    |
| -ms-hotlight  | #efefef | Background color for tooltip controls.                                                                                   |

## Variable naming

1. Use descriptive, component-specific variable names

    - Pattern: `--spectrum-{component}-{property}-{state}`
    - Example: `--spectrum-picker-background-color-default`

2. Group related variables together under clear comment sections

## CSS properties

1. Use logical properties for better RTL support:

    - Use `inline-size` instead of `width`
    - Use `block-size` instead of `height`
    - Use `margin-inline-start` instead of `margin-left`
    - Use `padding-inline-end` instead of `padding-right`

2. Order properties consistently within rules:
    - Layout properties (display, position)
    - Box model (margin, padding, border)
    - Typography (font, text)
    - Visual (background, color)
    - Animation
    - Misc

## Accessibility

1. Include proper focus states for keyboard navigation

2. Support high contrast mode for accessibility

3. Use visually-hidden class for screen reader content:

```css
.visually-hidden {
    border: 0;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    block-size: 1px;
    margin: 0 -1px -1px 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    inline-size: 1px;
    white-space: nowrap;
}
```

## Best practices

1. Use CSS custom properties for theming and component variations

2. Keep selectors simple and flat when possible

3. Avoid magic numbers - use variables for consistent values

4. Document any non-obvious style rules with comments

5. Use consistent spacing and formatting
