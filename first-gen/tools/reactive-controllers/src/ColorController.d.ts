/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import type { ReactiveElement } from 'lit';
import Color from 'colorjs.io';
import type { ColorObject, ColorTypes as DefaultColorTypes } from 'colorjs.io/types/src/color';
import type ColorSpace from 'colorjs.io/types/src/space';
/**
 * Represents various color types that can be used in the application.
 *
 * This type can be one of the following:
 * - `DefaultColorTypes`: A predefined set of color types.
 * - An object representing an RGBA color with properties:
 *   - `r`: Red component, can be a number or string.
 *   - `g`: Green component, can be a number or string.
 *   - `b`: Blue component, can be a number or string.
 *   - `a` (optional): Alpha component, can be a number or string.
 * - An object representing an HSLA color with properties:
 *   - `h`: Hue component, can be a number or string.
 *   - `s`: Saturation component, can be a number or string.
 *   - `l`: Lightness component, can be a number or string.
 *   - `a` (optional): Alpha component, can be a number or string.
 * - An object representing an HSVA color with properties:
 *   - `h`: Hue component, can be a number or string.
 *   - `s`: Saturation component, can be a number or string.
 *   - `v`: Value component, can be a number or string.
 *   - `a` (optional): Alpha component, can be a number or string.
 */
type ColorTypes = DefaultColorTypes | {
    r: number | string;
    g: number | string;
    b: number | string;
    a?: number | string;
} | {
    h: number | string;
    s: number | string;
    l: number | string;
    a?: number | string;
} | {
    h: number | string;
    s: number | string;
    v: number | string;
    a?: number | string;
};
export type { Color, ColorTypes };
type ColorValidationResult = {
    spaceId: string | null;
    coords: number[];
    isValid: boolean;
    alpha: number;
};
/**
 * The `ColorController` class is responsible for managing and validating color values
 * in various color spaces (RGB, HSL, HSV, Hex). It provides methods to set, get, and
 * validate colors, as well as convert between different color formats.
 *
 * @class
 * @property {Color} color - Gets or sets the current color value.
 * @property {ColorTypes} colorValue - Gets the color value in various formats based on the original color input.
 * @property {number} hue - Gets or sets the hue value of the current color.
 *
 * @method validateColorString(color: string): ColorValidationResult - Validates a color string and returns the validation result.
 * @method getColor(format: string | ColorSpace): ColorObject - Converts the current color to the specified format.
 * @method getHslString(): string - Returns the current color in HSL string format.
 * @method savePreviousColor(): void - Saves the current color as the previous color.
 * @method restorePreviousColor(): void - Restores the previous color.
 *
 * @constructor
 * @param {ReactiveElement} host - The host element that uses this controller.
 * @param {Object} [options] - Optional configuration options.
 * @param {string} [options.manageAs] - Specifies the color space to manage the color as.
 */
export declare class ColorController {
    get color(): Color;
    /**
     * Validates a color string and returns a result indicating the color space,
     * coordinates, alpha value, and whether the color is valid.
     *
     * @param color - The color string to validate. Supported formats include:
     *  - RGB: `rgb(r, g, b)`, `rgba(r, g, b, a)`, `rgb r g b`, `rgba r g b a`
     *  - HSL: `hsl(h, s, l)`, `hsla(h, s, l, a)`, `hsl h s l`, `hsla h s l a`
     *  - HSV: `hsv(h, s, v)`, `hsva(h, s, v, a)`, `hsv h s v`, `hsva h s v a`
     *  - HEX: `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`
     *
     * @returns An object containing the following properties:
     *  - `spaceId`: The color space identifier (`'srgb'`, `'hsl'`, or `'hsv'`).
     *  - `coords`: An array of numeric values representing the color coordinates.
     *  - `alpha`: The alpha value of the color (0 to 1).
     *  - `isValid`: A boolean indicating whether the color string is valid.
     */
    validateColorString(color: string): ColorValidationResult;
    /**
     * Represents the color state of the component.
     * Initialized with an HSV color model with hue 0, saturation 100, and value 100, and an alpha value of 1.
     *
     * @private
     * @type {Color}
     */
    private _color;
    /**
     * Represents the original color value provided by the user.
     *
     * @private
     * @type {ColorTypes}
     */
    private _colorOrigin;
    /**
     * Gets the original color value provided by the user.
     *
     * @returns {ColorTypes} The original color value.
     */
    get colorOrigin(): ColorTypes;
    /**
     * Sets the original color value provided by the user.
     *
     * @param {ColorTypes} colorOrigin - The original color value to set.
     */
    set colorOrigin(colorOrigin: ColorTypes);
    /**
     * An optional string property that specifies how the color should be managed(its value is the name of color space in which color object will be managed).
     * This property can be used to define a specific management strategy or identifier.
     */
    private manageAs?;
    /**
     * Stores the previous color value.
     * This is used to keep track of the color before any changes are made.
     *
     * @private
     */
    private _previousColor;
    /**
     * Private helper method to convert RGB color to hex format with optional alpha
     *
     * @private
     * @param {boolean} includeHash - Whether to include the # prefix in the returned string
     * @param {boolean} includeAlpha - Whether to include the alpha channel in the returned string
     * @returns {string} The color in hex format
     */
    private _getHexString;
    /**
     * Sets the color value for the controller. The color can be provided in various formats:
     * - A string representing a color name, hex code, or other color format.
     * - An instance of the `Color` class.
     * - An object containing color properties such as `h`, `s`, `l`, `v`, `r`, `g`, `b`, and optionally `a`.
     *
     * The method validates and parses the input color, converting it to a `Color` instance.
     * If the color is invalid, it attempts to parse it as a hex code or returns without setting a new color.
     *
     * @param {ColorTypes} color - The color value to set. It can be a string, an instance of `Color`, or an object with color properties.
     */
    set color(color: ColorTypes);
    /**
     * Gets the color value in various formats based on the original color input.
     *
     * The method determines the color space of the original color input and converts
     * the color to the appropriate format. The supported color spaces are:
     * - HSV (Hue, Saturation, Value)
     * - HSL (Hue, Saturation, Lightness)
     * - Hexadecimal (with or without alpha)
     * - RGB (Red, Green, Blue) with optional alpha
     *
     * @returns {ColorTypes} The color value in the appropriate format.
     *
     * The method handles the following cases:
     * - If the original color input is a string, it checks the prefix to determine the color space.
     * - If the original color input is an object, it checks the properties to determine the color space.
     * - If the original color input is not provided, it defaults to the current color space of the color object.
     *
     * The returned color value can be in one of the following formats:
     * - `hsv(h, s%, v%)` or `hsva(h, s%, v%, a)`
     * - `hsl(h, s%, l%)` or `hsla(h, s%, l%, a)`
     * - `#rrggbb` or `#rrggbbaa`
     * - `rgb(r, g, b)` or `rgba(r, g, b, a)`
     * - `{ h, s, v, a }` for HSV object
     * - `{ h, s, l, a }` for HSL object
     * - `{ r, g, b, a }` for RGB object
     */
    get colorValue(): ColorTypes;
    protected host: ReactiveElement;
    /**
     * Gets the hue value of the current color in HSL format.
     *
     * @returns {number} The hue value as a number.
     */
    get hue(): number;
    /**
     * Sets the hue value of the color and requests an update from the host.
     *
     * @param hue - The hue value to set, represented as a number.
     */
    set hue(hue: number);
    /**
     * Creates an instance of ColorController.
     *
     * @param host - The ReactiveElement that this controller is associated with.
     * @param options - An object containing optional parameters.
     * @param options.manageAs - A string to manage the controller as a specific type.
     */
    constructor(host: ReactiveElement, { manageAs, }?: {
        manageAs?: string;
    });
    /**
     * Converts the current color to the specified format.
     *
     * @param format - The desired color format. It can be a string representing one of the valid formats
     * ('srgb', 'hsva', 'hsv', 'hsl', 'hsla') or a ColorSpace object.
     * @returns The color object in the specified format.
     * @throws Will throw an error if the provided format is not a valid string format.
     */
    getColor(format: string | ColorSpace): ColorObject;
    /**
     * Converts the current color to an HSL string representation.
     *
     * @returns {string} The HSL string representation of the current color.
     */
    getHslString(): string;
    /**
     * Saves the current color state by cloning the current color and storing it
     * as the previous color. This allows for the ability to revert to the previous
     * color state if needed.
     *
     * @returns {void}
     */
    savePreviousColor(): void;
    /**
     * Restores the color to the previously saved color value.
     *
     * This method sets the current color (`_color`) to the previously stored color (`_previousColor`).
     */
    restorePreviousColor(): void;
}
