## Description

### ColorController

The `ColorController` class is a comprehensive utility for managing and validating color values in various color spaces, including RGB, HSL, HSV, and Hex. It provides a robust set of methods to set, get, and validate colors, as well as convert between different color formats. This class is designed to be used within web components or other reactive elements to handle color-related interactions efficiently.

### Features

-   **Color Management**: The `ColorController` allows you to manage color values in multiple formats, including RGB, HSL, HSV, and Hex.
-   **Validation**: It provides methods to validate color strings and ensure they conform to the expected formats.
-   **Conversion**: The class can convert colors between different color spaces, making it versatile for various applications.
-   **State Management**: It maintains the current color state and allows saving and restoring previous color values.

### Properties

-   **`color`**: Gets or sets the current color value. The color can be provided in various formats, including strings, objects, or instances of the `Color` class.
-   **`colorValue`**: Gets the color value in various formats based on the original color input.
-   **`hue`**: Gets or sets the hue value of the current color.

### Methods

-   **`validateColorString(color: string): ColorValidationResult`**:  
    Validates a color string and returns the validation result, including the color space, coordinates, alpha value, and validity.

-   **`getColor(format: string | ColorSpace): ColorObject`**:  
    Converts the current color to the specified format. Throws an error if the format is not valid.

-   **`getHslString(): string`**:  
    Returns the current color in HSL string format.

-   **`savePreviousColor(): void`**:  
    Saves the current color as the previous color.

-   **`restorePreviousColor(): void`**:  
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
