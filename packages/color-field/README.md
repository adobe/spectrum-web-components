## Overview

`<sp-color-field>` elements are textfields that allow users to input custom color values. They support multiple color formats including `HEX`, `RGB`, `HSL`, `HSV`, and shorthand `HEX` formats, providing a flexible interface for color selection in applications.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-field?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-field)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-field?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-field)

```bash
yarn add @spectrum-web-components/color-field
```

Import the side effectful registration of `<sp-color-field>` via:

```javascript
import '@spectrum-web-components/color-field/sp-color-field.js';
```

When looking to leverage the `ColorField` base class as a type and/or for extension purposes, do so via:

```javascript
import { ColorField } from '@spectrum-web-components/color-field';
```

### Anatomy

The color field consists of several key parts:

- **Input field**: The main text input area where users can type color values
- **Color handle**: An optional visual indicator showing the current color (when `view-color` attribute is enabled)
- **Validation feedback**: Visual indicators for valid and invalid color inputs
- **Size variations**: Different size options to match your design requirements

```html
<sp-color-field value="#ffff00"></sp-color-field>
```

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-color-field size="s" value="#ffff00"></sp-color-field>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-color-field size="m" value="#ffff00"></sp-color-field>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>

<sp-tab-panel value="l">

```html
<sp-color-field size="l" value="#ffff00"></sp-color-field>
```

</sp-tab-panel>
<sp-tab value="xl">Xtra Large</sp-tab>

<sp-tab-panel value="xl">

```html
<sp-color-field size="xl" value="#ffff00"></sp-color-field>
```

</sp-tab-panel>
</sp-tabs>

#### View Color

When `view-color` is true, the color handle will be rendered. This is useful for development and debugging purposes.

```html
<sp-color-field view-color value="#f00"></sp-color-field>
```

#### Quiet

A quiet color field provides a more subtle appearance:

```html
<sp-color-field quiet value="#e6e600"></sp-color-field>
```

### States

#### Standard

The default state of the color field, ready for user input:

```html
<sp-color-field value="#ffff00"></sp-color-field>
```

#### Read Only

A readonly color field that displays the color value but prevents user modification:

```html
<sp-color-field readonly value="#ffff00"></sp-color-field>
```

#### Invalid Input

If the input value is not a valid color, `<sp-color-field>` will not accept it and may show validation feedback:

```html
<sp-color-field value="not a color"></sp-color-field>
```

### Behaviors

#### Color Format Support

The `<sp-color-field>` component accepts color values in various formats: `HEX`, `RGB`, `HSL`, `HSV`, and shorthand `HEX`

For a complete list of supported color formats, see the [ColorController documentation](/tools/color-controller#supported-color-formats).

<sp-tabs selected="hex" auto label="Color format examples">
<sp-tab value="hex">HEX</sp-tab>
<sp-tab-panel value="hex">

A hexadecimal color is specified with: `#RRGGBB`. `RR` (red), `GG` (green) and `BB` (blue) are hexadecimal integers between `00` and `FF` specifying the intensity of the color.

```html
<sp-color-field view-color value="#ff0000"></sp-color-field>
```

</sp-tab-panel>
<sp-tab value="short-hex">Shorthand HEX</sp-tab>
<sp-tab-panel value="short-hex">

Shorthand hexadecimal color values are also supported. `#RGB` is a shorthand for `#RRGGBB`. In the shorthand form, `R` (red), `G` (green), and `B` (blue) are hexadecimal characters between `0` and `F`. Each character is repeated to create the full 6-digit color code. For example, `#123` would expand to `#112233`.

```html
<sp-color-field view-color value="#f00"></sp-color-field>
```

</sp-tab-panel>
<sp-tab value="rgb">RGB</sp-tab>
<sp-tab-panel value="rgb">

An RGB color value is specified with: rgb(red, green, blue). Each parameter defines the intensity of the color with a value between 0 and 255.

```html
<sp-color-field view-color value="rgb(255,0,0)"></sp-color-field>
```

</sp-tab-panel>
<sp-tab value="rgba">RGBA</sp-tab>
<sp-tab-panel value="rgba">

An RGBA color value is specified with: `rgba(red, green, blue, alpha)`. The `alpha` parameter is a number between 0.0 (fully transparent) and 1.0 (fully opaque).

```html
<sp-color-field view-color value="rgba(0,255,0,0.3)"></sp-color-field>
```

</sp-tab-panel>
<sp-tab value="hsl">HSL</sp-tab>
<sp-tab-panel value="hsl">

An HSL color value is specified with: hsl(hue, saturation, lightness). Hue is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, and 240 is blue. Saturation and lightness are percentages.

```html
<sp-color-field view-color value="hsl(234, 70%, 50%)"></sp-color-field>
```

</sp-tab-panel>
<sp-tab value="hsv">HSV</sp-tab>
<sp-tab-panel value="hsv">

An HSV color value is specified with: hsv(hue, saturation, value). Hue is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, and 240 is blue. Saturation and value are percentages.

```html
<sp-color-field view-color value="hsv(0, 70%, 50%)"></sp-color-field>
```

</sp-tab-panel>
</sp-tabs>

#### Events

The `<sp-color-field>` component fires two types of events for color value changes:

- **`input` event**: Fired when the value of the color-field has changed (fires on every keystroke)
- **`change` event**: Fired when an alteration to the value of the color-field has been committed by the user (fires when the user finishes editing)

You can listen for these events to react to changes in the color value:

```javascript
const colorField = document.querySelector('sp-color-field');

// Listen for real-time changes
colorField.addEventListener('input', (event) => {
    console.log('Color value changed:', event.target.value);
});

// Listen for committed changes
colorField.addEventListener('change', (event) => {
    console.log('Color value committed:', event.target.value);
});
```

### Accessibility

The `<sp-color-field>` component provides comprehensive accessibility support:

#### Keyboard Navigation

- **Tab Navigation**: The color field is keyboard accessible and can be navigated to using the <kbd>Tab</kbd> key
- **Input Validation**: Invalid color values are clearly indicated to assistive technologies
- **Focus Management**: Proper focus indicators are provided for keyboard users

#### Focus Management

The `<sp-color-field>` inherits comprehensive focus management capabilities from the `TextfieldBase` class:

- **Focus Element**: The component automatically delegates focus to the underlying input element, ensuring proper keyboard navigation
- **Focus State Tracking**: The component tracks focus state with the `focused` property, which is reflected as an attribute for styling
- **Focus Event Handling**: Proper focus and blur event handling ensures accessibility compliance
- **Tab Index Management**: Automatic tab index management ensures the component is properly included in the tab order
- **Focus Delegation**: The component properly delegates focus to the underlying input element for keyboard navigation

#### Screen Reader Support

- **ARIA Labels**: The component uses appropriate ARIA attributes to describe its purpose and state
- **Value Announcements**: Changes to the color value are announced to screen readers
- **Validation Feedback**: Invalid input states are communicated to assistive technologies

#### Color Accessibility

- **Color Contrast**: The component ensures sufficient contrast for text and visual elements
- **Color Independence**: The component works effectively for users with color vision deficiencies
- **Alternative Input**: Multiple color format support provides flexibility for different user needs

#### Best Practices

- **Provide Labels**: Always include a descriptive label for the color field to provide context
- **Use View Color**: Enable the `view-color` attribute to provide visual feedback alongside text input
- **Validate Input**: Handle invalid color inputs gracefully and provide clear feedback to users
