## Overview

The `ColorController` is a comprehensive [reactive controller](https://lit.dev/docs/composition/controllers/) for managing and validating color values in various color spaces, including RGB, HSL, HSV, and Hex. It provides robust methods to set, get, and validate colors, as well as convert between different color formats. This controller is designed to be used within web components or other reactive elements to handle color-related interactions efficiently.

### Features

- **Color management**: Manage color values in multiple formats, including RGB, HSL, HSV, and Hex
- **Validation**: Validate color strings and ensure they conform to expected formats
- **Conversion**: Convert colors between different color spaces for versatile applications
- **State management**: Maintain current color state and save/restore previous color values
- **Format preservation**: Automatically preserve the format of the original color input when returning values

### Properties

- **`color`**: Gets or sets the current color value. The color can be provided in various formats, including strings, objects, or instances of the `Color` class.
- **`colorValue`**: Gets the color value in various formats based on the original color input.
- **`hue`**: Gets or sets the hue value of the current color.

### Methods

- **`validateColorString(color: string): ColorValidationResult`**:  
  Validates a color string and returns the validation result, including the color space, coordinates, alpha value, and validity.

    **Returns:** `ColorValidationResult` object with:
    - `spaceId` (string | null): The color space identifier ('srgb', 'hsl', or 'hsv')
    - `coords` (number[]): Array of numeric values representing the color coordinates
    - `alpha` (number): The alpha value of the color (0 to 1)
    - `isValid` (boolean): Whether the color string is valid

- **`getColor(format: string | ColorSpace): ColorObject`**:  
  Converts the current color to the specified format. Throws an error if the format is not valid.

    **Returns:** `ColorObject` - The color object in the specified format

- **`getHslString(): string`**:  
  Returns the current color in HSL string format.

    **Returns:** string - HSL representation of the current color

- **`savePreviousColor(): void`**:  
  Saves the current color as the previous color.

- **`restorePreviousColor(): void`**:  
  Restores the previous color.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```bash
yarn add @spectrum-web-components/reactive-controllers
```

Import the `ColorController` via:

```typescript
import { ColorController } from '@spectrum-web-components/reactive-controllers/src/ColorController.js';
```

### Examples

#### Basic usage

```typescript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ColorController } from '@spectrum-web-components/reactive-controllers/src/ColorController.js';

class ColorPickerElement extends LitElement {
    /**
     * Gets the current color value from the color controller.
     */
    @property({ type: String })
    public get color(): ColorTypes {
        return this.colorController.colorValue;
    }

    /**
     * Sets the color for the color controller.
     */
    public set color(color: ColorTypes) {
        this.colorController.color = color;
    }

    // Initialize the controller to manage colors in HSV color space
    private colorController = new ColorController(this, { manageAs: 'hsv' });

    render() {
        return html`
            <div
                style="background-color: ${this.color}"
                role="img"
                aria-label="Color preview: ${this.color}"
            >
                Current color: ${this.color}
            </div>
        `;
    }
}

customElements.define('color-picker-element', ColorPickerElement);
```

#### Constructor initialization

The color controller can also be initialized in the constructor:

```typescript
import { LitElement } from 'lit';
import { ColorController } from '@spectrum-web-components/reactive-controllers/src/ColorController.js';

class ColorPickerElement extends LitElement {
    @property({ type: String })
    public get color(): ColorTypes {
        return this.colorController.colorValue;
    }

    public set color(color: ColorTypes) {
        this.colorController.color = color;
    }

    private colorController: ColorController;

    constructor() {
        super();
        this.colorController = new ColorController(this, { manageAs: 'hsv' });
    }
}
```

#### Color validation

Validate color strings before using them:

```typescript
import { ColorController } from '@spectrum-web-components/reactive-controllers/src/ColorController.js';

class ColorInputElement extends LitElement {
    private colorController = new ColorController(this);

    handleColorInput(event: InputEvent) {
        const input = event.target as HTMLInputElement;
        const validation = this.colorController.validateColorString(
            input.value
        );

        if (validation.isValid) {
            this.colorController.color = input.value;
            // Announce successful color change for screen readers
            this.setAttribute('aria-live', 'polite');
            this.setAttribute('aria-label', `Color changed to ${input.value}`);
        } else {
            // Provide error feedback
            input.setAttribute('aria-invalid', 'true');
            input.setAttribute('aria-describedby', 'color-error');
        }
    }

    render() {
        return html`
            <label for="color-input">Choose a color</label>
            <input
                id="color-input"
                type="text"
                @input=${this.handleColorInput}
                aria-describedby="color-help"
            />
            <span id="color-help">
                Enter a color in hex, RGB, HSL, or HSV format
            </span>
            <span id="color-error" role="alert"></span>
        `;
    }
}
```

#### Usage with color components

Example of using `ColorController` within a color picker that works with other Spectrum Web Components:

```typescript
import { LitElement, html } from 'lit';
import { ColorController } from '@spectrum-web-components/reactive-controllers/src/ColorController.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/color-area/sp-color-area.js';
import '@spectrum-web-components/color-slider/sp-color-slider.js';

class CompleteColorPicker extends LitElement {
    private colorController = new ColorController(this, { manageAs: 'hsv' });

    @property({ type: String })
    public get color(): ColorTypes {
        return this.colorController.colorValue;
    }

    public set color(color: ColorTypes) {
        const oldColor = this.color;
        this.colorController.color = color;
        this.requestUpdate('color', oldColor);
    }

    handleColorChange(event: Event) {
        const target = event.target as any;
        this.color = target.color;
    }

    render() {
        return html`
            <div role="group" aria-labelledby="picker-label">
                <sp-field-label id="picker-label" for="color-area">
                    Color picker
                </sp-field-label>
                <sp-help-text>
                    Choose a color from the picker or enter a value manually
                </sp-help-text>

                <sp-color-area
                    id="color-area"
                    .color=${this.color}
                    @change=${this.handleColorChange}
                ></sp-color-area>

                <sp-color-slider
                    .color=${this.color}
                    @change=${this.handleColorChange}
                    aria-label="Hue slider"
                ></sp-color-slider>
            </div>
        `;
    }
}
```

#### Saving and restoring colors

Implement undo functionality using `savePreviousColor` and `restorePreviousColor`:

```typescript
import { LitElement, html } from 'lit';
import { ColorController } from '@spectrum-web-components/reactive-controllers/src/ColorController.js';
import '@spectrum-web-components/button/sp-button.js';

class ColorPickerWithUndo extends LitElement {
    private colorController = new ColorController(this, { manageAs: 'hsv' });

    @property({ type: String })
    public get color(): ColorTypes {
        return this.colorController.colorValue;
    }

    public set color(color: ColorTypes) {
        // Save the current color before changing
        this.colorController.savePreviousColor();
        this.colorController.color = color;
    }

    handleUndo() {
        this.colorController.restorePreviousColor();
        this.requestUpdate();
        // Announce undo action for screen readers
        this.dispatchEvent(
            new CustomEvent('color-restored', {
                detail: { color: this.color },
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        return html`
            <div>
                <input
                    type="color"
                    .value=${this.color}
                    @change=${(e: Event) =>
                        (this.color = (e.target as HTMLInputElement).value)}
                    aria-label="Color picker"
                />
                <sp-button
                    @click=${this.handleUndo}
                    aria-label="Undo color change"
                >
                    Undo
                </sp-button>
            </div>
        `;
    }
}
```

### Supported color formats

The `ColorController` supports a wide range of color formats for input and output:

<sp-table>
    <sp-table-head>
        <sp-table-head-cell>Format</sp-table-head-cell>
        <sp-table-head-cell>Example values</sp-table-head-cell>
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

### Accessibility

When implementing color pickers or other color-related UI with the `ColorController`, consider these accessibility best practices:

#### Color perception

- **Never rely on color alone** to convey information. Always provide alternative text descriptions or patterns.
- **Provide text alternatives** for color values (e.g., "red", "dark blue", "#FF0000") that are announced by screen readers.
- Use **ARIA labels** (`aria-label` or `aria-labelledby`) to describe the purpose of color controls.

#### Screen reader support

- Announce color changes with `aria-live` regions when colors update dynamically.
- Provide meaningful labels for all interactive color controls.
- Include instructions in `aria-describedby` for how to use color inputs.

#### Keyboard accessibility

When building color pickers with this controller:

- Ensure all color selection methods are keyboard accessible.
- Provide visible focus indicators for all interactive elements.
- Consider implementing keyboard shortcuts for common actions (e.g., arrow keys for fine-tuning).

#### Error handling

- Use `aria-invalid` and `aria-describedby` to communicate validation errors.
- Provide clear error messages when color values are invalid.

#### Color contrast

When using colors selected via this controller for text or UI elements, ensure they meet [WCAG 2.1 Level AA contrast requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html):

- **Normal text**: 4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt+ bold): 3:1 contrast ratio
- **UI components and graphics**: 3:1 contrast ratio

### Related components

The `ColorController` is used by these Spectrum Web Components:

- [`<sp-color-area>`](../../components/color-area/) - Two-dimensional color picker
- [`<sp-color-field>`](../../components/color-field/) - Text input for color values
- [`<sp-color-slider>`](../../components/color-slider/) - Slider for selecting color channel values
- [`<sp-color-wheel>`](../../components/color-wheel/) - Circular hue selector
- [`<sp-swatch>`](../../components/swatch/) - Color preview display
