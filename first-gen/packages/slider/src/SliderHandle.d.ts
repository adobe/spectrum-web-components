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
import { PropertyValues } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { NumberFormatOptions, NumberFormatter } from '@internationalized/number';
import { HandleController } from './HandleController.js';
export type HandleMin = number | 'previous';
export type HandleMax = number | 'next';
export type HandleValues = {
    name: string;
    value: number;
}[];
export type SliderNormalization = {
    toNormalized: (value: number, min: number, max: number) => number;
    fromNormalized: (value: number, min: number, max: number) => number;
};
export declare const defaultNormalization: SliderNormalization;
/**
 * @element sp-slider-handle
 *
 * @fires input - The value of the element has changed.
 * @fires change - An alteration to the value of the element has been committed by the user.
 */
export declare class SliderHandle extends Focusable {
    handleController?: HandleController;
    get handleName(): string;
    get focusElement(): HTMLElement;
    _forcedUnit: string;
    /**
     * By default, the value of a Slider Handle will be halfway between its
     * `min` and `max` values, or the `min` value when `max` is less than `min`.
     */
    value: number;
    /**
     * Set the default value of the handle. Setting this property will cause the
     * handle to reset to the default value on double click or pressing the `escape` key.
     */
    defaultValue: number;
    dragging: boolean;
    highlight: boolean;
    name: string;
    min?: number | 'previous';
    max?: number | 'next';
    step?: number;
    formatOptions?: NumberFormatOptions;
    label: string;
    getAriaHandleText: (value: number, numberFormat: NumberFormatter) => string;
    private languageResolver;
    protected update(changes: PropertyValues): void;
    protected firstUpdated(changedProperties: PropertyValues<this>): void;
    normalization: SliderNormalization;
    dispatchInputEvent(): void;
    protected _numberFormatCache: {
        numberFormat: NumberFormatter;
        language: string;
    } | undefined;
    protected getNumberFormat(): NumberFormatter;
    get numberFormat(): NumberFormatter | undefined;
}
