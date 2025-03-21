/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import { SliderBase } from './SliderBase.js';
import { SliderHandle, SliderNormalization } from './SliderHandle.js';
import { NumberFormatter } from '@internationalized/number';

/**
 * Interface for handle reference elements
 */
interface HandleReference {
    handle: HTMLElement;
    input: HTMLInputElement;
}

interface HandleComponents extends HandleReference {
    model: SliderHandle;
}

interface RangeAndClamp {
    range: { min: number; max: number };
    clamp: { min: number; max: number };
}

export interface ModelValue extends RangeAndClamp {
    name: string;
    value: number;
    normalizedValue: number;
    formattedValue: string;
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

/**
 * Controller that manages slider handles and their interactions.
 * Responsible for:
 * - Managing multiple handles
 * - Handling drag operations
 * - Formatting values
 * - Coordinating handle updates
 */
export class HandleController {
    private host: SliderBase;
    private defaultHandle?: SliderHandle;
    private handles: Map<string, SliderHandle> = new Map();
    private model: ModelValue[] = [];
    private handleOrder: string[] = [];
    private draggingHandle?: SliderHandle;
    private handleComponentCache: WeakMap<
        SliderHandle,
        HandleReference
    > | null = null;
    private language = 'en-US';
    private valueFormatterCache: Map<
        SliderHandle | SliderBase,
        {
            numberFormatter: NumberFormatter;
            forcedUnit: string;
        }
    > = new Map();

    constructor(host: SliderBase) {
        this.host = host;

        new MutationController(this.host, {
            config: {
                subtree: true,
                childList: true,
            },
            callback: () => {
                this.extractModelFromLightDom();
            },
        });
    }

    // Public API methods
    public get values(): HandleValueDictionary {
        const result: HandleValueDictionary = {};
        for (const model of this.handles.values()) {
            result[model.handleName] = model.value;
        }
        return result;
    }

    public get size(): number {
        return this.handles.size;
    }

    public inputForHandle(handle: SliderHandle): HTMLInputElement | undefined {
        if (this.handles.has(handle.handleName)) {
            const { input } = this.getHandleElements(handle) || {};
            return input;
        }
        /* c8 ignore next 2 */
        throw new Error(`No input for handle "${handle.name}"`);
    }

    public requestUpdate(): void {
        if (this.host.hasUpdated) {
            this.host.requestUpdate();
        }
    }

    /**
     * It is possible for value attributes to be set programmatically. The <input>
     * for a particular slider needs to have an opportunity to validate any such
     * values
     *
     * @param handle Handle who's value needs validation
     */
    public setValueFromHandle(handle: SliderHandle): void {
        const elements = this.getHandleElements(handle);
        /* c8 ignore next */
        if (!elements) return;

        const { input } = elements;
        if (input.valueAsNumber === handle.value) {
            if (handle.dragging) {
                handle.dispatchInputEvent();
            }
        } else {
            input.valueAsNumber = handle.value;
            this.requestUpdate();
        }
        handle.value = input.valueAsNumber;
    }

    public handleHasChanged(): void {
        this.requestUpdate();
    }

    public get formattedValues(): Map<string, string> {
        const result = new Map<string, string>();
        for (const model of this.model) {
            result.set(model.name, model.formattedValue);
        }
        return result;
    }

    public get focusElement(): HTMLElement {
        const { input } = this.getActiveHandleElements();
        if (
            !input ||
            (this.host.editable &&
                !(input as InputWithModel).model.handle.dragging)
        ) {
            return this.host.numberField;
        }
        return input;
    }

    protected handleOrientation = (): void => {
        this.updateBoundingRect();
    };

    public hostConnected(): void {
        if ('orientation' in screen) {
            screen.orientation.addEventListener(
                'change',
                this.handleOrientation
            );
        } else {
            window.addEventListener(
                'orientationchange',
                this.handleOrientation
            );
        }
    }

    public hostDisconnected(): void {
        if ('orientation' in screen) {
            screen.orientation.removeEventListener(
                'change',
                this.handleOrientation
            );
        } else {
            window.removeEventListener(
                'orientationchange',
                this.handleOrientation
            );
        }
    }

    public hostUpdated(): void {
        this.buildHandleComponentCache();
    }

    // Since extractModelFromLightDom bails on the first un-upgraded handle,
    // a maximum of one listener will be set up per extraction attempt.
    private waitForUpgrade(handle: HTMLElement): boolean {
        if (handle instanceof SliderHandle) {
            return false;
        }
        handle.addEventListener(
            'sp-slider-handle-ready',
            () => this.extractModelFromLightDom(),
            { once: true, passive: true }
        );
        return true;
    }

    private configureDefaultHandle(): void {
        const handle = this.defaultHandle!;
        // Configure basic properties
        handle.min = this.host.min;
        handle.max = this.host.max;
        handle.value = this.host.value;
        handle.step = this.host.step;
        handle.getAriaHandleText = this.host.getAriaHandleText;

        // Configure optional properties
        if (this.host.defaultValue !== undefined) {
            handle.defaultValue = this.host.defaultValue;
        }

        if (this.host.formatOptions) {
            handle.formatOptions = this.host.formatOptions;
        }

        if (this.host.label) {
            handle.label = this.host.label;
        }

        if (this.host.normalization) {
            handle.normalization = this.host.normalization;
        }
    }

    private extractModelFromLightDom(): void {
        this.clearHandleComponentCache();
        let handles = [
            ...this.host.querySelectorAll('[slot="handle"]'),
        ] as SliderHandle[];

        if (handles.length === 0) {
            // Create default handle
            if (!this.defaultHandle) {
                this.defaultHandle = new SliderHandle();
                this.defaultHandle.name = 'value';
                this.defaultHandle.handleController = this;
                this.host.shadowRoot.appendChild(this.defaultHandle);
            }
            this.configureDefaultHandle();
            handles = [this.defaultHandle];
        } else {
            this.defaultHandle?.remove();
            this.defaultHandle = undefined;
        }

        // extractModelFromLightDom depends on slotted handles already having been upgraded
        if (handles.some((h) => this.waitForUpgrade(h))) {
            return;
        }
        this.handles = new Map();
        this.handleOrder = [];
        handles.forEach((handle, index) => {
            /* c8 ignore next */
            if (!handle.handleName?.length) {
                handle.name = `handle${index + 1}`;
            }
            this.handles.set(handle.handleName, handle);
            this.handleOrder.push(handle.handleName);
            handle.handleController = this;
        });
        this.requestUpdate();
    }

    private get activeHandleName(): string {
        return this.handleOrder[this.handleOrder.length - 1];
    }

    public get activeHandleInputId(): string {
        const active = this.activeHandleName;
        const index = this.model.findIndex((model) => model.name === active);
        return `input-${index}`;
    }

    public activateHandle(name: string): void {
        const index = this.handleOrder.findIndex((item) => item === name);
        if (index >= 0) {
            this.handleOrder.splice(index, 1);
        }
        this.handleOrder.push(name);
    }

    public get activeHandleModel(): ModelValue {
        const active = this.activeHandleName;
        return this.model.find((model) => model.name === active)!;
    }

    public get activeHandle(): SliderHandle {
        return this.handles.get(this.activeHandleName) as SliderHandle;
    }

    private getActiveHandleElements(): HandleComponents {
        const name = this.activeHandleName;
        const handleSlider = this.handles.get(name) as SliderHandle;
        const elements = this.getHandleElements(
            handleSlider
        ) as HandleReference;
        return { model: handleSlider, ...elements };
    }

    private getHandleElements(sliderHandle: SliderHandle): HandleReference {
        const components = this.handleComponentCache?.get(
            sliderHandle
        ) as HandleReference;
        return components;
    }

    private buildHandleComponentCache(): void {
        if (this.handleComponentCache === null) {
            const inputNodes =
                this.host.shadowRoot.querySelectorAll('.handle > input');
            if (inputNodes.length > 0) {
                this.handleComponentCache = new WeakMap();
                for (const inputNode of inputNodes) {
                    const input = inputNode as HTMLInputElement;
                    const handle = input.parentElement as HTMLElement;
                    const model = this.handles.get(
                        handle.getAttribute('name') as string
                    );
                    if (model) {
                        this.handleComponentCache.set(model, { input, handle });
                    }
                }
            }
        }
    }

    private clearHandleComponentCache(): void {
        this.handleComponentCache = null;
    }

    private _boundingClientRect?: DOMRect;

    private get boundingClientRect(): DOMRect {
        if (!this._boundingClientRect) {
            this._boundingClientRect = this.host.track.getBoundingClientRect();
        }
        return this._boundingClientRect;
    }

    private updateBoundingRect(): void {
        delete this._boundingClientRect;
    }

    /**
     * Return the `input` and `model` associated with the event and
     * whether the `input` is a `resolvedInput` meaning it was acquired
     * from the `model` rather than the event.
     */
    protected extractDataFromEvent(event: PointerEvent): DataFromPointerEvent {
        if (!this._activePointerEventData) {
            let input = (event.target as Element).querySelector(
                ':scope > .input'
            ) as InputWithModel;
            const resolvedInput = !input;
            const model = input
                ? input.model
                : this.model.find(
                      (item) => item.name === this.activeHandleName
                  );
            if (!input && !!model) {
                input = model.handle.focusElement as InputWithModel;
            }
            this._activePointerEventData = {
                input,
                model,
                resolvedInput,
            };
        }
        return this._activePointerEventData;
    }

    private _activePointerEventData!: DataFromPointerEvent | undefined;

    /**
     * @description check for defaultvalue(value) property in sp-slider and reset on double click on sliderHandle
     * @param event
     */
    public handleDoubleClick(event: PointerEvent): void {
        const input = (event.target as Element).querySelector(
            '.input'
        ) as InputWithModel;

        if (input.model?.handle.defaultValue !== undefined) {
            this.setHandleValue(
                input.model.handle,
                input.model.handle.defaultValue
            );
            this.dispatchChangeEvent(input, input.model.handle);
            input.model.handle.dispatchInputEvent();
            this.requestUpdate();
        }
    }

    public handlePointerdown(event: PointerEvent): void {
        const { resolvedInput, model } = this.extractDataFromEvent(event);
        if (!model || this.host.disabled || event.button !== 0) {
            event.preventDefault();
            return;
        }
        this.host.track.setPointerCapture(event.pointerId);
        this.updateBoundingRect();
        if (event.pointerType === 'mouse') {
            this.host.labelEl.click();
        }
        this.draggingHandle = model.handle;
        this.setHandleDragging(model.handle, true);
        this.activateHandle(model.name);
        if (resolvedInput) {
            // When the input is resolved forward the pointer event to
            // `handlePointermove` in order to update the value/UI becuase
            // the pointer event was on the track not a handle
            this.handlePointermove(event);
        }
        this.requestUpdate();
    }

    public handlePointerup(event: PointerEvent): void {
        const { input, model } = this.extractDataFromEvent(event);
        delete this._activePointerEventData;
        if (!model) return;
        if (event.pointerType === 'mouse') {
            this.host.labelEl.click();
        }
        this.cancelDrag(model);
        this.requestUpdate();
        this.host.track.releasePointerCapture(event.pointerId);
        this.dispatchChangeEvent(input, model.handle);
    }

    /**
     * Sets a handle's value and updates the host if it's the default handle
     * @param handle The handle to update
     * @param value The new value
     */
    private setHandleValue(handle: SliderHandle, value: number): void {
        handle.value = value;
        if (handle === this.defaultHandle) {
            this.host.value = value;
        }
    }

    /**
     * Sets a handle's dragging state and updates the host if it's the default handle
     * @param handle The handle to update
     * @param dragging The new dragging state
     */
    private setHandleDragging(handle: SliderHandle, dragging: boolean): void {
        handle.dragging = dragging;
        if (handle === this.defaultHandle) {
            this.host.dragging = dragging;
        }
    }

    /**
     * Sets a handle's highlight state and updates the host if it's the default handle
     * @param handle The handle to update
     * @param highlight The new highlight state
     */
    private setHandleHighlight(handle: SliderHandle, highlight: boolean): void {
        handle.highlight = highlight;
        if (handle === this.defaultHandle) {
            this.host.highlight = highlight;
        }
    }

    public handlePointermove(event: PointerEvent): void {
        const { input, model } = this.extractDataFromEvent(event);
        if (!model) return;
        /* c8 ignore next 3 */
        if (!this.draggingHandle) {
            return;
        }
        input.value = this.calculateHandlePosition(event, model).toString();
        this.setHandleValue(model.handle, parseFloat(input.value));
        this.host.indeterminate = false;
        this.requestUpdate();
    }

    public cancelDrag(model?: ModelValue): void {
        model =
            model ||
            this.model.find((item) => item.name === this.activeHandleName);
        if (!model) return;
        this.setHandleHighlight(model.handle, false);
        delete this.draggingHandle;
        this.setHandleDragging(model.handle, false);
    }

    /**
     * Keep the slider value property in sync with the input element's value
     */
    public onInputChange(event: Event): void {
        const input = event.target as InputWithModel;
        this.setHandleValue(input.model.handle, input.valueAsNumber);

        this.requestUpdate();
        this.dispatchChangeEvent(input, input.model.handle);
    }

    public onInputFocus(event: Event): void {
        const input = event.target as InputWithModel;
        let isFocusVisible;
        try {
            isFocusVisible =
                input.matches(':focus-visible') ||
                this.host.matches('.focus-visible');
            /* c8 ignore next 3 */
        } catch (error) {
            isFocusVisible = this.host.matches('.focus-visible');
        }
        this.setHandleHighlight(input.model.handle, isFocusVisible);
        this.requestUpdate();
    }

    public onInputBlur(event: Event): void {
        const input = event.target as InputWithModel;
        this.setHandleHighlight(input.model.handle, false);
        this.requestUpdate();
    }

    public onInputKeydown(event: KeyboardEvent): void {
        if (event.key == 'Escape') {
            const input = event.target as InputWithModel;
            if (
                input.model.handle?.defaultValue !== undefined &&
                input.model.handle.value !== input.model.handle.defaultValue
            ) {
                input.model.handle.value = input.model.handle.defaultValue;
                input.model.handle.dispatchInputEvent();
                this.dispatchChangeEvent(input, input.model.handle);
                this.requestUpdate();
                event.preventDefault();
                event.stopPropagation();
            }
            return;
        }
        const input = event.target as InputWithModel;
        this.setHandleHighlight(input.model.handle, true);
        this.requestUpdate();
    }

    private dispatchChangeEvent(
        input: HTMLInputElement,
        handle: SliderHandle
    ): void {
        input.valueAsNumber = handle.value;

        const changeEvent = new Event('change', {
            bubbles: true,
            composed: true,
        });

        handle.dispatchEvent(changeEvent);
    }

    /**
     * Returns the value under the cursor
     * @param: PointerEvent on slider
     * @return: Slider value that correlates to the position under the pointer
     */
    private calculateHandlePosition(
        event: PointerEvent | MouseEvent,
        model: ModelValue
    ): number {
        const rect = this.boundingClientRect;
        const minOffset = rect.left;
        const offset = event.clientX;
        const size = rect.width;

        const directionalOffset = this.host.isLTR
            ? offset - minOffset
            : size - (offset - minOffset);
        const normalized = directionalOffset / size;

        return model.normalization.fromNormalized(
            normalized,
            model.range.min,
            model.range.max
        );
    }

    /**
     * Returns a list of track segment [start, end] tuples where the values are
     * normalized to be between 0 and 1.
     * @returns A list of track segment tuples [start, end]
     */
    public trackSegments(): [number, number][] {
        const values = this.model.map((model) => model.normalizedValue);
        values.sort((a, b) => a - b);

        // The first segment always starts at 0
        values.unshift(0);
        return values.map((value, index, array) => [
            value,
            array[index + 1] ?? 1,
        ]);
    }

    /**
     * Updates the model data for all handles
     * This is the core method that synchronizes handle state
     */
    public updateModel(): void {
        const handles = [...this.handles.values()];

        const getRangeAndClamp = (index: number): RangeAndClamp => {
            const handle = handles[index];
            const previous = handles[index - 1];
            const next = handles[index + 1];

            const min =
                typeof handle.min === 'number'
                    ? handle.min
                    : (this.host.min as number);
            const max =
                typeof handle.max === 'number'
                    ? handle.max
                    : (this.host.max as number);

            const result: RangeAndClamp = {
                range: { min: min, max: max },
                clamp: { min: min, max: max },
            };

            if (handle.min === 'previous') {
                if (previous) {
                    for (let j = index - 1; j >= 0; j--) {
                        const item = handles[j];
                        if (typeof item.min === 'number') {
                            result.range.min = item.min;
                            break;
                        }
                    }
                    result.clamp.min = Math.max(
                        previous.value,
                        result.range.min
                    );
                }
                if (window.__swc.DEBUG) {
                    if (!previous) {
                        window.__swc.warn(
                            this.host,
                            '<sp-slider-handle> elements that are the first child of an <sp-slider> element cannot have attribute "min=\'previous\'"`',
                            'https://opensource.adobe.com/spectrum-web-components/components/slider-handle/#multi-handle-slider-with-ordered-handles'
                        );
                    }
                }
            }
            if (handle.max === 'next') {
                if (next) {
                    for (let j = index + 1; j < handles.length; j++) {
                        const item = handles[j];
                        if (typeof item.max === 'number') {
                            result.range.max = item.max;
                            break;
                        }
                    }
                    result.clamp.max = Math.min(next.value, result.range.max);
                }
                if (window.__swc.DEBUG) {
                    if (!next) {
                        window.__swc.warn(
                            this.host,
                            '<sp-slider-handle> elements that are the last child of an <sp-slider> element cannot have attribute "max=\'next\'"',
                            'https://opensource.adobe.com/spectrum-web-components/components/slider-handle/#multi-handle-slider-with-ordered-handles'
                        );
                    }
                }
            }
            return result;
        };

        const modelValues = handles.map((handle, index) => {
            const rangeAndClamp = getRangeAndClamp(index);
            const { toNormalized } = handle.normalization;
            const clampedValue = Math.max(
                Math.min(handle.value, rangeAndClamp.clamp.max),
                rangeAndClamp.clamp.min
            );
            const normalizedValue = toNormalized(
                clampedValue,
                rangeAndClamp.range.min,
                rangeAndClamp.range.max
            );
            const model = {
                name: handle.handleName,
                value: clampedValue,
                normalizedValue,
                // TODO: replace en-US with language from context
                // formattedValue: handle.getAriaHandleText(clampedValue, handle.numberFormat ?? new NumberFormatter('en-US', this.host.formatOptions)),
                formattedValue: this.formatValue(handle, clampedValue),
                highlight: handle.highlight,
                step: handle.step ?? this.host.step,
                normalization: handle.normalization,
                handle,
                ariaLabel: handle?.label.length > 0 ? handle.label : undefined,
                ...rangeAndClamp,
            };
            return model;
        });

        // Sync value if applicable
        if (this.defaultHandle) {
            this.host.value = this.defaultHandle.value;
        }

        this.model = modelValues;
    }

    public async updateComplete(): Promise<void> {
        const updates = [...this.handles.values()].map(
            (handle) => handle.updateComplete
        );
        await Promise.all(updates);
    }

    public get handleElements(): ModelValue[] {
        return this.model;
    }

    // Add a public method to check if a handle is being dragged
    public isHandleDragging(handleName: string): boolean {
        return this.draggingHandle?.handleName === handleName;
    }

    // Add a public method to get z-index for a handle
    public getZIndexForHandle(handleName: string): number {
        return this.handleOrder.indexOf(handleName) + 2;
    }

    /**
     * Syncs properties from the slider to the default handle
     * Called when slider properties change and need to be reflected in the handle
     */
    public syncHandleProps(): void {
        if (!this.defaultHandle) {
            window.__swc.warn(
                this.host,
                'Setting handle properties on sp-slider has no effect when handles are explicitly defined',
                // TODO: add docs, link to specific section
                'https://opensource.adobe.com/spectrum-web-components/components/slider'
            );
            return;
        }

        this.configureDefaultHandle();
    }

    /**
     * Sets a default value for a handle or slider if none is provided
     * @param handleOrSlider The handle or slider to set the default value for
     */
    public setDefaultValue(handleOrSlider: SliderHandle | SliderBase): void {
        const { max, min } = handleOrSlider as { max: number; min: number };
        if ((handleOrSlider.value ?? null) === null) {
            if (!isNaN(max) && !isNaN(min)) {
                handleOrSlider.value = max < min ? min : min + (max - min) / 2;
                this.updateModel();
            }
        }
    }

    private buildValueFormatter(handleOrSlider: SliderHandle | SliderBase): {
        numberFormatter: NumberFormatter;
        forcedUnit: string;
    } {
        let numberFormatter: NumberFormatter;
        let forcedUnit = '';

        try {
            numberFormatter = new NumberFormatter(
                this.language,
                handleOrSlider.formatOptions
            );
        } catch (error) {
            const {
                style,
                unit,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                unitDisplay,
                ...formatOptionsNoUnit
            } = handleOrSlider.formatOptions || {};
            if (style === 'unit') {
                forcedUnit = unit as string;
            }
            numberFormatter = new NumberFormatter(
                this.language,
                formatOptionsNoUnit
            );
            this.valueFormatterCache.set(handleOrSlider, {
                numberFormatter,
                forcedUnit,
            });
        }

        return { numberFormatter, forcedUnit };
    }

    /**
     * Formats a value for display using the appropriate number formatter
     * @param handle The handle to use for formatting context
     * @param value Optional value to format (defaults to handle's value)
     * @returns Formatted value string
     */
    public formatValue(handle: SliderHandle, value?: number): string {
        const formatterSource = handle.formatOptions ? handle : this.host;

        let { numberFormatter, forcedUnit } =
            this.valueFormatterCache.get(formatterSource) ?? {};

        if (numberFormatter === undefined || forcedUnit === undefined) {
            ({ numberFormatter, forcedUnit } =
                this.buildValueFormatter(formatterSource));
        }
        return (
            handle.getAriaHandleText(value ?? handle.value, numberFormatter!) +
            forcedUnit
        );
    }

    public languageChanged(language: string): void {
        this.language = language;
        this.valueFormatterCache.clear();
    }

    public formatOptionsChanged(
        handleOrSlider: SliderHandle | SliderBase
    ): void {
        this.valueFormatterCache.delete(handleOrSlider);
    }
}
