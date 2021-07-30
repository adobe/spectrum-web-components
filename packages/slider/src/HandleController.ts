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
import {
    html,
    TemplateResult,
    ifDefined,
    classMap,
    styleMap,
} from '@spectrum-web-components/base';
import { streamingListener } from '@spectrum-web-components/base/src/streaming-listener.js';
import { Slider } from './Slider.js';
import {
    SliderHandle,
    SliderNormalization,
    Controller,
} from './SliderHandle.js';

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

export interface HandleValueDictionary {
    [key: string]: number;
}

export class HandleController implements Controller {
    private observer!: MutationObserver;
    private host!: Slider;
    private handles: Map<string, SliderHandle> = new Map();
    private model: ModelValue[] = [];
    private handleOrder: string[] = [];
    private draggingHandle?: SliderHandle;
    private handleRefMap?: WeakMap<SliderHandle, HandleReference>;

    constructor(host: Slider) {
        this.host = host;
    }

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
            const { input } = this.getHandleElements(handle);
            return input;
        }
        /* c8 ignore next 2 */
        throw new Error(`No input for handle "${handle.name}"`);
    }

    public requestUpdate(): void {
        this.host.requestUpdate();
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
            handle.value = input.valueAsNumber;
            this.requestUpdate();
        }
        handle.value = input.valueAsNumber;
    }

    public handleHasChanged(handle: SliderHandle): void {
        if (handle !== this.host) {
            this.requestUpdate();
        }
    }

    public formattedValueForHandle(model: ModelValue): string {
        const { handle } = model;
        const numberFormat = handle.numberFormat ?? this.host.numberFormat;
        return handle.getAriaHandleText(model.value, numberFormat);
    }

    public get formattedValues(): Map<string, string> {
        const result = new Map<string, string>();
        for (const model of this.model) {
            result.set(model.name, this.formattedValueForHandle(model));
        }
        return result;
    }

    public get focusElement(): HTMLElement {
        const { input } = this.getActiveHandleElements();
        if (
            this.host.editable &&
            !(input as InputWithModel).model.handle.dragging
        ) {
            return this.host.numberField;
        }
        return input;
    }

    public hostConnected(): void {
        if (!this.observer) {
            this.observer = new MutationObserver(this.extractModelFromLightDom);
        }
        this.observer.observe(this.host, { subtree: true, childList: true });
        this.extractModelFromLightDom();
    }

    public hostDisconnected(): void {
        this.observer.disconnect();
    }

    public hostUpdate(): void {
        this.updateModel();
    }

    private extractModelFromLightDom = (): void => {
        let handles = [
            ...this.host.querySelectorAll('[slot="handle"]'),
        ] as SliderHandle[];
        if (handles.length === 0) {
            handles = [this.host as SliderHandle];
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
    };

    public get activeHandle(): string {
        return this.handleOrder[this.handleOrder.length - 1];
    }

    public get activeHandleInputId(): string {
        const active = this.activeHandle;
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

    private getActiveHandleElements(): HandleComponents {
        const name = this.activeHandle;
        const handleSlider = this.handles.get(name) as SliderHandle;
        const elements = this.getHandleElements(
            handleSlider
        ) as HandleReference;
        return { model: handleSlider, ...elements };
    }

    private getHandleElements(sliderHandle: SliderHandle): HandleReference {
        if (!this.handleRefMap) {
            this.handleRefMap = new WeakMap();

            const inputNodes = this.host.shadowRoot.querySelectorAll(
                '.handle > input'
            );
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

    private clearHandleComponentCache(): void {
        delete this.handleRefMap;
    }

    private get boundingClientRect(): DOMRect {
        if (!this._boundingClientRect) {
            this._boundingClientRect = this.host.track.getBoundingClientRect();
        }
        return this._boundingClientRect;
    }

    private updateBoundingRect(): void {
        delete this._boundingClientRect;
    }

    private _boundingClientRect?: DOMRect;

    /**
     * Receives an event from a track click and turns it into a drag
     * of the active handle
     * @param event Track click event
     */
    public beginTrackDrag(event: PointerEvent): void {
        const { handle } = this.getActiveHandleElements();
        const model = this.model.find(
            (item) => item.name === this.activeHandle
        );
        /* c8 ignore next */
        if (!model) return;

        event.stopPropagation();
        event.preventDefault();
        const applyDefault = handle.dispatchEvent(
            new PointerEvent('pointerdown', event)
        );
        if (applyDefault) {
            const model = this.model.find(
                (model) => model.name === this.activeHandle
            );
            if (model) {
                this.handlePointermove(event, model);
            }
        }
    }

    private handlePointerdown(event: PointerEvent, model: ModelValue): void {
        const handle = event.target as HTMLDivElement;
        if (this.host.disabled || event.button !== 0) {
            event.preventDefault();
            return;
        }
        this.updateBoundingRect();
        this.host.labelEl.click();
        this.draggingHandle = model.handle;
        model.handle.dragging = true;
        this.activateHandle(model.name);
        handle.setPointerCapture(event.pointerId);
        this.host.requestUpdate();
    }

    private handlePointerup(event: PointerEvent, model: ModelValue): void {
        // Retain focus on input element after mouse up to enable keyboard interactions
        const handle = event.target as HTMLDivElement;
        const input = handle.querySelector('input') as HTMLInputElement;
        this.host.labelEl.click();
        model.handle.highlight = false;
        delete this.draggingHandle;
        model.handle.dragging = false;
        this.requestUpdate();
        handle.releasePointerCapture(event.pointerId);
        this.dispatchChangeEvent(input, model.handle);
    }

    private handlePointermove(event: PointerEvent, model: ModelValue): void {
        /* c8 ignore next 3 */
        if (!this.draggingHandle) {
            return;
        }
        event.stopPropagation();
        const { input } = this.getHandleElements(model.handle);
        input.value = this.calculateHandlePosition(event, model).toString();
        model.handle.value = parseFloat(input.value);
        this.requestUpdate();
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

    private onInputKeydown = (event: Event): void => {
        const input = event.target as InputWithModel;
        input.model.handle.highlight = true;
        this.requestUpdate();
    };

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

        const normalized = (offset - minOffset) / size;
        const value = model.normalization.fromNormalized(
            normalized,
            model.range.min,
            model.range.max
        );

        /* c8 ignore next */
        return this.host.isLTR ? value : model.range.max - value;
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
            // Allow setting background per-handle
            'background-color': `var(--spectrum-slider-handle-background-color-${index}, var(--spectrum-slider-handle-default-background-color))`,
            'border-color': `var(--spectrum-slider-handle-border-color-${index}, var(-spectrum-slider-handle-default-border-color))`,
        };
        const ariaLabelledBy = isMultiHandle ? `label input-${index}` : 'label';
        return html`
            <div
                class=${classMap(classes)}
                name=${model.name}
                style=${styleMap(style)}
                ${streamingListener({
                    start: [
                        'pointerdown',
                        (event: PointerEvent) =>
                            this.handlePointerdown(event, model),
                    ],
                    streamInside: [
                        'pointermove',
                        (event: PointerEvent) =>
                            this.handlePointermove(event, model),
                    ],
                    end: [
                        ['pointerup', 'pointercancel'],
                        (event: PointerEvent) =>
                            this.handlePointerup(event, model),
                    ],
                })}
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
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                    @keydown=${this.onInputKeydown}
                    .model=${model}
                />
            </div>
        `;
    }

    public render(): TemplateResult[] {
        this.clearHandleComponentCache();
        return this.model.map((model, index) => {
            const zIndex = this.handleOrder.indexOf(model.name) + 1;
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
                    /* c8 ignore next 5 */
                } else {
                    console.warn(
                        'First slider handle cannot have attribute min="previous"'
                    );
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
                    /* c8 ignore next 5 */
                } else {
                    console.warn(
                        'Last slider handle cannot have attribute max="next"'
                    );
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
