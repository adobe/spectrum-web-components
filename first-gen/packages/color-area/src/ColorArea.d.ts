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
import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/color-handle/sp-color-handle.js';
import { ColorTypes } from '@spectrum-web-components/reactive-controllers/src/ColorController.js';
/**
 * @element sp-color-area
 * @slot gradient - a custom gradient visually outlining the available color values
 * @fires input - The value of the Color Area has changed.
 * @fires change - An alteration to the value of the Color Area has been committed by the user.
 */
export declare class ColorArea extends SpectrumElement {
    static get styles(): CSSResultArray;
    dir: 'ltr' | 'rtl';
    disabled: boolean;
    focused: boolean;
    labelX: string;
    labelY: string;
    private handle;
    private languageResolver;
    /**
     * A controller for managing color interactions within the ColorArea component.
     *
     * The `ColorController` is instantiated with the `manageAs` option set to `hsv`
     * because the ColorArea component is designed to manipulate the saturation (`s`)
     * and value (`v`) components of the HSV color model along the x and y axes,
     * respectively. In the HSV color model:
     *
     * - The `hue` (h) represents the color type and is typically controlled by a separate input.
     * - The `saturation` (s) represents the intensity of the color, ranging from 0% (gray) to 100% (full color).
     * - The `value` (v) represents the brightness of the color, ranging from 0% (black) to 100% (full brightness).
     *
     * In the ColorArea component:
     *
     * - The x-axis controls the saturation (`s`), allowing users to adjust the intensity of the color.
     * - The y-axis controls the value (`v`), allowing users to adjust the brightness of the color.
     *
     * By managing the color as `hsv`, the ColorController can efficiently handle the changes in saturation and value
     * as the user interacts with the ColorArea component.
     *
     * @private
     * @type {ColorController}
     * @memberof ColorArea
     *
     * @property {ColorArea} this - The instance of the ColorArea component.
     * @property {Object} options - Configuration options for the ColorController.
     * @property {string} options.manageAs - Specifies the color model to manage, in this case 'hsv'.
     */
    private colorController;
    get hue(): number;
    set hue(value: number);
    get value(): ColorTypes;
    get color(): ColorTypes;
    set color(color: ColorTypes);
    private activeAxis;
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    step: number;
    inputX: HTMLInputElement;
    inputY: HTMLInputElement;
    private altered;
    private activeKeys;
    private _valueChanged;
    focus(focusOptions?: FocusOptions): void;
    private forwardFocus;
    private handleFocus;
    handleBlur(): void;
    private handleKeydown;
    private handleKeypress;
    private handleKeyup;
    private handleInput;
    private handleChange;
    private boundingClientRect;
    _pointerDown: boolean;
    private handlePointerdown;
    private handlePointermove;
    private handlePointerup;
    /**
     * Returns the value under the cursor
     * @param: PointerEvent on slider
     * @return: Slider value that correlates to the position under the pointer
     */
    private calculateHandlePosition;
    private handleAreaPointerdown;
    protected render(): TemplateResult;
    protected firstUpdated(changed: PropertyValues): void;
    /**
     * Overrides the `updated` method to handle changes in property values.
     *
     * @param changed - A map of changed properties with their previous values.
     *
     * This method performs the following actions:
     * - Updates the saturation (`s`) of the color if `x` has changed.
     * - Updates the value (`v`) of the color if `y` has changed.
     * - If the `focused` property has changed and is now true, it lazily binds
     *   the `input[type="range"]` elements in shadow roots to prevent multiple
     *   tab stops within the Color Area for certain browser settings (e.g., Webkit).
     */
    protected updated(changed: PropertyValues): void;
    private observer?;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
