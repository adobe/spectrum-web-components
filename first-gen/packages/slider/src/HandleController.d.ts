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
import { TemplateResult } from '@spectrum-web-components/base';
import { Slider } from './Slider.js';
import { SliderHandle, SliderNormalization } from './SliderHandle.js';
interface RangeAndClamp {
    range: {
        min: number;
        max: number;
    };
    clamp: {
        min: number;
        max: number;
    };
}
interface ModelValue extends RangeAndClamp {
    name: string;
    value: number;
    normalizedValue: number;
    step: number;
    highlight: boolean;
    ariaLabel?: string;
    normalization: SliderNormalization;
    handle: SliderHandle;
}
interface InputWithModel extends HTMLInputElement {
    model: ModelValue;
}
interface DataFromPointerEvent {
    resolvedInput: boolean;
    input: InputWithModel;
    model?: ModelValue;
}
export interface HandleValueDictionary {
    [key: string]: number;
}
export declare class HandleController {
    private host;
    private handles;
    private model;
    private handleOrder;
    private draggingHandle?;
    private handleRefMap?;
    constructor(host: Slider);
    get values(): HandleValueDictionary;
    get size(): number;
    inputForHandle(handle: SliderHandle): HTMLInputElement | undefined;
    requestUpdate(): void;
    /**
     * It is possible for value attributes to be set programmatically. The <input>
     * for a particular slider needs to have an opportunity to validate any such
     * values
     *
     * @param handle Handle who's value needs validation
     */
    setValueFromHandle(handle: SliderHandle): void;
    handleHasChanged(handle: SliderHandle): void;
    formattedValueForHandle(model: ModelValue): string;
    get formattedValues(): Map<string, string>;
    get focusElement(): HTMLElement;
    protected handleOrientation: () => void;
    hostConnected(): void;
    hostDisconnected(): void;
    hostUpdate(): void;
    private waitForUpgrade;
    private extractModelFromLightDom;
    get activeHandle(): string;
    get activeHandleInputId(): string;
    activateHandle(name: string): void;
    get activeHandleModel(): ModelValue;
    private getActiveHandleElements;
    private getHandleElements;
    private clearHandleComponentCache;
    private _boundingClientRect?;
    private get boundingClientRect();
    private updateBoundingRect;
    /**
     * Return the `input` and `model` associated with the event and
     * whether the `input` is a `resolvedInput` meaning it was acquired
     * from the `model` rather than the event.
     */
    protected extractDataFromEvent(event: PointerEvent): DataFromPointerEvent;
    private _activePointerEventData;
    /**
     * @description check for defaultvalue(value) property in sp-slider and reset on double click on sliderHandle
     * @param event
     */
    handleDoubleClick(event: PointerEvent): void;
    handlePointerdown(event: PointerEvent): void;
    handlePointerup(event: PointerEvent): void;
    handlePointermove(event: PointerEvent): void;
    cancelDrag(model?: ModelValue): void;
    /**
     * Keep the slider value property in sync with the input element's value
     */
    private onInputChange;
    private onInputFocus;
    private onInputBlur;
    private onInputKeydown;
    private dispatchChangeEvent;
    /**
     * Returns the value under the cursor
     * @param: PointerEvent on slider
     * @return: Slider value that correlates to the position under the pointer
     */
    private calculateHandlePosition;
    renderHandle(model: ModelValue, index: number, zIndex: number, isMultiHandle: boolean): TemplateResult;
    render(): TemplateResult[];
    /**
     * Returns a list of track segment [start, end] tuples where the values are
     * normalized to be between 0 and 1.
     * @returns A list of track segment tuples [start, end]
     */
    trackSegments(): [number, number][];
    private updateModel;
    handleUpdatesComplete(): Promise<void>;
}
export {};
