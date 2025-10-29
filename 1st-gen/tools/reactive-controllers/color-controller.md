## Description

### ColorController

The `ColorController` class is a comprehensive utility for managing and validating color values in various color spaces, including RGB, HSL, HSV, and Hex. It provides a robust set of methods to set, get, and validate colors, as well as convert between different color formats. This class is designed to be used within web components or other reactive elements to handle color-related interactions efficiently.

### Features

- **Color Management**: The `ColorController` allows you to manage color values in multiple formats, including RGB, HSL, HSV, and Hex.
- **Validation**: It provides methods to validate color strings and ensure they conform to the expected formats.
- **Conversion**: The class can convert colors between different color spaces, making it versatile for various applications.
- **State Management**: It maintains the current color state and allows saving and restoring previous color values.

### Properties

- **`color`**: Gets or sets the current color value. The color can be provided in various formats, including strings, objects, or instances of the `Color` class.
- **`colorValue`**: Gets the color value in various formats based on the original color input.
- **`hue`**: Gets or sets the hue value of the current color.

### Methods

- **`validateColorString(color: string): ColorValidationResult`**:  
  Validates a color string and returns the validation result, including the color space, coordinates, alpha value, and validity.

- **`getColor(format: string | ColorSpace): ColorObject`**:  
  Converts the current color to the specified format. Throws an error if the format is not valid.

- **`getHslString(): string`**:  
  Returns the current color in HSL string format.

- **`savePreviousColor(): void`**:  
  Saves the current color as the previous color.

- **`restorePreviousColor(): void`**:  
  Restores the previous color.

## Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```
yarn add @spectrum-web-components/reactive-controllers
```

Import the `ColorController` via:

```
import {ColorController,} from '@spectrum-web-components/reactive-controllers/src/ColorController.js';
```

## Example

```js
import { LitElement } from 'lit';
import {ColorController} from '@spectrum-web-components/reactive-controllers/src/ColorController.js';

class Host extends LitElement {

    /**
     * Gets the current color value from the color controller.
     *
     * @returns {ColorTypes} The current color value.
     */
    @property({ type: String })
    public get color(): ColorTypes {
        return this.colorController.colorValue;
    }

    /**
     * Sets the color for the color controller.
     *
     * @param {ColorTypes} color - The color to be set.
     */
    public set color(color: ColorTypes) {
        this.colorController.color = color;
    }

    private colorController = new ColorController(this, { manageAs: 'hsv' });


}

```

The color Controller could also be initialised in the constructor as shown below

```js
import { LitElement } from 'lit';
import {ColorController} from '@spectrum-web-components/reactive-controllers/src/ColorController.js';

class Host extends LitElement {

    /**
     * Gets the current color value from the color controller.
     *
     * @returns {ColorTypes} The current color value.
     */
    @property({ type: String })
    public get color(): ColorTypes {
        return this.colorController.colorValue;
    }

    /**
     * Sets the color for the color controller.
     *
     * @param {ColorTypes} color - The color to be set.
     */
    public set color(color: ColorTypes) {
        this.colorController.color = color;
    }

    private colorController: ColorController; ;

    constructor() {
        super();
        this.colorController = new ColorController(this, { manageAs: 'hsv' });
    }

}
```

## Supported Color Formats

The `ColorController` supports a wide range of color formats for input and output:

<sp-table>
    <sp-table-head>
        <sp-table-head-cell>Format</sp-table-head-cell>
        <sp-table-head-cell>Example Values</sp-table-head-cell>
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
```
