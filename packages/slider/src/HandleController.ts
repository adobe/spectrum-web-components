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
import { html, TemplateResult } from '@spectrum-web-components/base';
import {
    classMap,
    ifDefined,
    styleMap,
} from '@spectrum-web-components/base/src/directives.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import { Slider } from './Slider.js';
import { SliderHandle, SliderNormalization } from './SliderHandle.js';

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

/**
 * Manages the handles of a slider component.
 *
 * @fires change - An alteration to the value of the element has been committed by the user.
 * @fires input - Dispatched when the value of a handle changes.
 * @fires keydown - Trick :focus-visible polyfill into thinking keyboard based focus
 * @fires sp-slider-handle-ready - Dispatched when a handle is upgraded.
 */
export class HandleController {
    /**
     * The host slider element.
     */
    private host!: Slider;

    /**
     * A map of handle IDs to slider handles.
     */
    private handles: Map<string, SliderHandle> = new Map();

    /**
     * The model values of the slider.
     */
    private model: ModelValue[] = [];

    /**
     * The order of the handles.
     */
    private handleOrder: string[] = [];

    /**
     * The handle currently being dragged.
     */
    private draggingHandle?: SliderHandle;

    /**
     * A weak map of slider handles to handle references.
     */
    private handleRefMap?: WeakMap<SliderHandle, HandleReference>;

    constructor(host: Slider) {
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

        this.extractModelFromLightDom();
    }

    /**
     * Gets the values of the handles.
     */
    public get values(): HandleValueDictionary {
        const result: HandleValueDictionary = {};

        for (const model of this.handles.values()) {
            result[model.handleName] = model.value;
        }

        return result;
    }

    /**
     * Gets the number of handles.
     */
    public get size(): number {
        return this.handles.size;
    }

    /**
     * Gets the input element for a given handle.
     * Throws an error if the handle does not exist.
     */
    public inputForHandle(handle: SliderHandle): HTMLInputElement | undefined {
        if (this.handles.has(handle.handleName)) {
            const { input } = this.getHandleElements(handle) || {};

            return input;
        }

        throw new Error(`No input for handle "${handle.name}"`);
    }

    /**
     * Requests an update for the host slider element.
     */
    public requestUpdate(): void {
        if (this.host.hasUpdated) {
            this.host.requestUpdate();
        }
    }

    /**
     * It is possible for value attributes to be set programmatically. The `<input>`
     * for a particular slider needs to have an opportunity to validate any such
     * values
     *
     * @param handle - Handle who's value needs validation
     */
    public setValueFromHandle(handle: SliderHandle): void {
        const elements = this.getHandleElements(handle);

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

    /**
     * Handles changes to a slider handle.
     * Requests an update for the host slider element if the handle has changed.
     */
    public handleHasChanged(handle: SliderHandle): void {
        if (handle !== this.host) {
            this.requestUpdate();
        }
    }

    /**
     * Gets the formatted value for a given handle.
     * Formats the value using the handle's number format or the host's number format.
     * Appends the forced unit to the formatted value.
     */
    public formattedValueForHandle(model: ModelValue): string {
        const { handle } = model;
        const numberFormat = handle.numberFormat ?? this.host.numberFormat;
        const _forcedUnit =
            handle._forcedUnit === ''
                ? this.host._forcedUnit
                : handle._forcedUnit;

        return (
            handle.getAriaHandleText(model.value, numberFormat) + _forcedUnit
        );
    }

    /**
     * Gets the formatted values for all handles.
     */
    public get formattedValues(): Map<string, string> {
        const result = new Map<string, string>();

        for (const model of this.model) {
            result.set(model.name, this.formattedValueForHandle(model));
        }

        return result;
    }

    /**
     * Gets the focus element for the slider.
     * Returns the input element for the active handle or the number field if the input is not available.
     */
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

    /**
     * Handles orientation changes.
     * Updates the bounding rectangle of the slider.
     */
    protected handleOrientation = (): void => {
        this.updateBoundingRect();
    };

    /**
     * Called when the host slider element is connected to the DOM.
     * Adds event listeners for orientation changes.
     */
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

    /**
     * Called when the host slider element is disconnected from the DOM.
     * Removes event listeners for orientation changes.
     */
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

    /**
     * Called when the host slider element is updated.
     * Updates the model and requests an update.
     */
    public hostUpdate(): void {
        this.updateModel();
    }

    /**
     * Waits for a handle to be upgraded.
     * Adds an event listener for the 'sp-slider-handle-ready' event if the handle is not upgraded.
     *
     * Since extractModelFromLightDom bails on the first un-upgraded handle,
     * a maximum of one listener will be set up per extraction attempt.
     */
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

    /**
     * Extracts the model from the light DOM.
     * Updates the handles and handle order based on the slotted handles.
     */
    private extractModelFromLightDom = (): void => {
        let handles = [
            ...this.host.querySelectorAll('[slot="handle"]'),
        ] as SliderHandle[];

        if (handles.length === 0) {
            handles = [this.host as SliderHandle];
        }

        // extractModelFromLightDom depends on slotted handles already having been upgraded
        if (handles.some((h) => this.waitForUpgrade(h))) {
            return;
        }

        this.handles = new Map();

        this.handleOrder = [];

        handles.forEach((handle, index) => {
            if (!handle.handleName?.length) {
                handle.name = `handle${index + 1}`;
            }

            this.handles.set(handle.handleName, handle);
            this.handleOrder.push(handle.handleName);
            handle.handleController = this;
        });

        this.requestUpdate();
    };

    /**
     * Gets the name of the active handle.
     */
    public get activeHandle(): string {
        return this.handleOrder[this.handleOrder.length - 1];
    }

    /**
     * Gets the ID of the input element for the active handle.
     */
    public get activeHandleInputId(): string {
        const active = this.activeHandle;
        const index = this.model.findIndex((model) => model.name === active);

        return `input-${index}`;
    }

    /**
     * Activates the specified handle.
     * Moves the handle to the end of the handle order.
     */
    public activateHandle(name: string): void {
        const index = this.handleOrder.findIndex((item) => item === name);

        if (index >= 0) {
            this.handleOrder.splice(index, 1);
        }

        this.handleOrder.push(name);
    }

    /**
     * Gets the model value for the active handle.
     */
    public get activeHandleModel(): ModelValue {
        const active = this.activeHandle;

        return this.model.find((model) => model.name === active)!;
    }

    /**
     * Gets the elements associated with the active handle.
     */
    private getActiveHandleElements(): HandleComponents {
        const name = this.activeHandle;
        const handleSlider = this.handles.get(name) as SliderHandle;
        const elements = this.getHandleElements(
            handleSlider
        ) as HandleReference;

        return { model: handleSlider, ...elements };
    }

    /**
     * Gets the elements associated with a given handle.
     */
    private getHandleElements(sliderHandle: SliderHandle): HandleReference {
        if (!this.handleRefMap) {
            this.handleRefMap = new WeakMap();

            const inputNodes =
                this.host.shadowRoot.querySelectorAll('.handle > input');

            for (const inputNode of inputNodes) {
                const input = inputNode as HTMLInputElement;
                const handle = input.parentElement as HTMLElement;
                const model = this.handles.get(
                    handle.getAttribute('name') as string
                );

                if (model) {
                    this.handleRefMap.set(model, { input, handle });
                }
            }
        }

        const components = this.handleRefMap.get(
            sliderHandle
        ) as HandleReference;

        return components;
    }

    /**
     * Clears the cache of handle components.
     */
    private clearHandleComponentCache(): void {
        delete this.handleRefMap;
    }

    /**
     * The bounding client rectangle of the slider track.
     */
    private _boundingClientRect?: DOMRect;

    /**
     * Gets the bounding client rectangle of the slider track.
     */
    private get boundingClientRect(): DOMRect {
        if (!this._boundingClientRect) {
            this._boundingClientRect = this.host.track.getBoundingClientRect();
        }

        return this._boundingClientRect;
    }

    /**
     * Updates the bounding client rectangle of the slider track.
     */
    private updateBoundingRect(): void {
        delete this._boundingClientRect;
    }

    /**
     * Extracts data from a pointer event.
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
                : this.model.find((item) => item.name === this.activeHandle);

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

    /**
     * The active pointer event data.
     */
    private _activePointerEventData!: DataFromPointerEvent | undefined;

    /**
     * Handles double-click events on the slider handle.
     * Resets the handle value to its default value if defined.
     */
    public handleDoubleClick(event: PointerEvent): void {
        const input = (event.target as Element).querySelector(
            '.input'
        ) as InputWithModel;

        if (input.model?.handle.defaultValue !== undefined) {
            input.model.handle.value = input.model.handle.defaultValue;
            this.dispatchChangeEvent(input, input.model.handle);
            input.model.handle.dispatchInputEvent();
            this.requestUpdate();
        }
    }

    /**
     * Handles pointerdown events on the slider handle.
     * Initiates dragging and updates the handle value based on the pointer position.
     */
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
        model.handle.dragging = true;
        this.activateHandle(model.name);

        if (resolvedInput) {
            // When the input is resolved forward the pointer event to
            // `handlePointermove` in order to update the value/UI becuase
            // the pointer event was on the track not a handle
            this.handlePointermove(event);
        }

        this.requestUpdate();
    }

    /**
     * Handles pointerup events on the slider handle.
     * Ends dragging and updates the handle value based on the pointer position.
     */
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
     * Handles pointermove events on the slider handle.
     * Updates the handle value based on the pointer position.
     */
    public handlePointermove(event: PointerEvent): void {
        const { input, model } = this.extractDataFromEvent(event);

        if (!model) return;

        if (!this.draggingHandle) {
            return;
        }

        input.value = this.calculateHandlePosition(event, model).toString();
        model.handle.value = parseFloat(input.value);
        this.host.indeterminate = false;
        this.requestUpdate();
    }

    /**
     * Cancels dragging for the specified handle model.
     */
    public cancelDrag(model?: ModelValue): void {
        model =
            model || this.model.find((item) => item.name === this.activeHandle);

        if (!model) return;

        model.handle.highlight = false;
        delete this.draggingHandle;
        model.handle.dragging = false;
    }

    /**
     * Keep the slider value property in sync with the input element's value
     */
    private onInputChange = (event: Event): void => {
        const input = event.target as InputWithModel;

        input.model.handle.value = input.valueAsNumber;

        this.requestUpdate();
        this.dispatchChangeEvent(input, input.model.handle);
    };

    private onInputFocus = (event: Event): void => {
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

        input.model.handle.highlight = isFocusVisible;
        this.requestUpdate();
    };

    private onInputBlur = (event: Event): void => {
        const input = event.target as InputWithModel;

        input.model.handle.highlight = false;
        this.requestUpdate();
    };

    /**
     *
     *
     * @memberof HandleController
     *
     * @param event - KeyboardEvent on input
     *
     * @private
     */
    private onInputKeydown = (event: KeyboardEvent): void => {
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

        input.model.handle.highlight = true;
        this.requestUpdate();
    };

    /**
     * Dispatches a change event for the slider handle.
     */
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
     *
     * @param event - PointerEvent on slider
     * @returns Slider value that correlates to the position under the pointer
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

    public renderHandle(
        model: ModelValue,
        index: number,
        zIndex: number,
        isMultiHandle: boolean
    ): TemplateResult {
        const classes = {
            handle: true,
            dragging: this.draggingHandle?.handleName === model.name,
            'handle-highlight': model.highlight,
        };
        const style = {
            [this.host.isLTR ? 'left' : 'right']: `${
                model.normalizedValue * 100
            }%`,
            'z-index': zIndex.toString(),
            ...(isMultiHandle && {
                'background-color': `var(--spectrum-slider-handle-background-color-${index}, var(--spectrum-slider-handle-background-color))`,
                'border-color': `var(--spectrum-slider-handle-border-color-${index}, var(--spectrum-slider-handle-border-color))`,
            }),
        };
        const ariaLabelledBy = isMultiHandle ? `label input-${index}` : 'label';

        return html`
            <div
                class=${classMap(classes)}
                name=${model.name}
                style=${styleMap(style)}
                role="presentation"
            >
                <input
                    type="range"
                    class="input"
                    id="input-${index}"
                    min=${model.clamp.min}
                    max=${model.clamp.max}
                    step=${model.step}
                    value=${model.value}
                    aria-disabled=${ifDefined(
                        this.host.disabled ? 'true' : undefined
                    )}
                    tabindex=${ifDefined(this.host.editable ? -1 : undefined)}
                    aria-label=${ifDefined(model.ariaLabel)}
                    aria-labelledby=${ariaLabelledBy}
                    aria-valuetext=${this.formattedValueForHandle(model)}
                    aria-describedby="slider-description"
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                    @keydown=${this.onInputKeydown}
                    .model=${model}
                />
                <span id="slider-description">
                    Press escape or double click to reset the slider to its
                    default value.
                </span>
            </div>
        `;
    }

    public render(): TemplateResult[] {
        this.clearHandleComponentCache();

        return this.model.map((model, index) => {
            const zIndex = this.handleOrder.indexOf(model.name) + 2;

            return this.renderHandle(
                model,
                index,
                zIndex,
                this.model.length > 1
            );
        });
    }

    /**
     * Returns a list of track segment [start, end] tuples where the values are
     * normalized to be between 0 and 1.
     *
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

    private updateModel(): void {
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
                highlight: handle.highlight,
                step: handle.step ?? this.host.step,
                normalization: handle.normalization,
                handle,
                ariaLabel:
                    handle !== this.host && handle?.label.length > 0
                        ? handle.label
                        : undefined,
                ...rangeAndClamp,
            };

            return model;
        });

        this.model = modelValues;
    }

    public async handleUpdatesComplete(): Promise<void> {
        const updates = [...this.handles.values()]
            .filter((handle) => handle !== this.host)
            .map((handle) => handle.updateComplete);

        await Promise.all(updates);
    }
}
