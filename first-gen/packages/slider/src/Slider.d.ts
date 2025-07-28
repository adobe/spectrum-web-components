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
import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/field-label/sp-field-label.js';
import type { NumberField } from '@spectrum-web-components/number-field';
import { HandleController, HandleValueDictionary } from './HandleController.js';
import { SliderHandle } from './SliderHandle.js';
import type { NumberFormatter } from '@internationalized/number';
export declare const variants: string[];
declare const Slider_base: typeof SliderHandle & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-slider
 *
 * @slot - @deprecated Text label for the Slider. Use the `label` property instead.
 * @slot handle - optionally accepts two or more sp-slider-handle elements
 */
export declare class Slider extends Slider_base {
    static get styles(): CSSResultArray;
    handleController: HandleController;
    /**
     * Whether to display a Number Field along side the slider UI
     */
    get editable(): boolean;
    set editable(editable: boolean);
    private _editable;
    /**
     * Whether the stepper UI of the Number Field is hidden or not
     */
    hideStepper: boolean;
    type: string;
    dir: 'ltr' | 'rtl';
    set variant(variant: string);
    get variant(): string;
    get values(): HandleValueDictionary;
    get handleName(): string;
    private _variant;
    getAriaValueText: (values: Map<string, string>) => string;
    get ariaValueText(): string;
    labelVisibility?: 'text' | 'value' | 'none';
    min: number;
    max: number;
    step: number;
    tickStep: number;
    tickLabels: boolean;
    disabled: boolean;
    fillStart?: number | boolean;
    /**
     * Applies `quiet` to the underlying `sp-number-field` when `editable === true`.
     */
    quiet: boolean;
    /**
     * Applies `indeterminate` to the underlying `sp-number-field` when `editable === true`. Is removed on the next `change` event.
     */
    indeterminate: boolean;
    labelEl: HTMLLabelElement;
    numberField: NumberField;
    track: HTMLDivElement;
    get numberFormat(): NumberFormatter;
    get focusElement(): HTMLElement;
    protected handleLabelClick(event: Event): void;
    protected render(): TemplateResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    update(changedProperties: Map<string, boolean>): void;
    private renderLabel;
    private renderRamp;
    private renderTicks;
    private renderTrackSegment;
    private _cachedValue;
    private centerPoint;
    /**
     * @description calculates the fill width
     * @param fillStartValue
     * @param currentValue
     * @returns
     */
    private getOffsetWidth;
    private fillStyles;
    private renderFillOffset;
    private renderHandle;
    private renderTrack;
    protected handleDoubleClick(event: PointerEvent): void;
    protected handlePointerdown(event: PointerEvent): void;
    protected handlePointermove(event: PointerEvent): void;
    protected handlePointerup(event: PointerEvent): void;
    private handleNumberInput;
    private handleNumberChange;
    private trackSegmentStyles;
    private _numberFieldInput;
    protected getUpdateComplete(): Promise<boolean>;
    protected willUpdate(changed: PropertyValues): void;
}
export {};
