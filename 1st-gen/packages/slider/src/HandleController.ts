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
import { html, nothing, TemplateResult } from '@spectrum-web-components/base';
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

export class HandleController {
    private host!: Slider;
    private handles: Map<string, SliderHandle> = new Map();
    private model: ModelValue[] = [];
    private handleOrder: string[] = [];
    private draggingHandle?: SliderHandle;
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

        input.valueAsNumber = handle.value;
        this.requestUpdate();
        // reset to potentially clamped value
        handle.value = input.valueAsNumber;

        if (handle.dragging) {
            handle.dispatchInputEvent();
        }
    }

    public handleHasChanged(handle: SliderHandle): void {
        if (handle !== this.host) {
            this.requestUpdate();
        }
    }

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

    public hostUpdate(): void {
        this.updateModel();
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

    public get activeHandleModel(): ModelValue {
        const active = this.activeHandle;
        return this.model.find((model) => model.name === active)!;
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

    private clearHandleComponentCache(): void {
        delete this.handleRefMap;
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
            input.model.handle.value = input.model.handle.defaultValue;
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

    public handlePointermove(event: PointerEvent): void {
        const { input, model } = this.extractDataFromEvent(event);
        if (!model) return;
        /* c8 ignore next 3 */
        if (!this.draggingHandle) {
            return;
        }
        input.value = this.calculateHandlePosition(event, model).toString();
        model.handle.value = parseFloat(input.value);
        this.host.indeterminate = false;
        this.requestUpdate();
    }

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
        // Stop propagation for arrow keys since slider handles them internally
        if (
            ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(
                event.key
            )
        ) {
            event.stopPropagation();
        }
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
        const formattedValue = this.formattedValueForHandle(model);

        // Show value tooltip for multi-handle sliders when value label is not visible
        // This ensures users can always see the current value of each handle on hover/focus
        // Per WCAG 3.3.2: Multi-handle sliders must have visible labels
        const showValueTooltip =
            isMultiHandle &&
            (this.host.labelVisibility === 'none' ||
                this.host.labelVisibility === 'text');

        const classes = {
            handle: true,
            dragging: this.draggingHandle?.handleName === model.name,
            'handle-highlight': model.highlight,
            'show-value-tooltip': showValueTooltip,
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
                    aria-valuetext=${formattedValue}
                    aria-describedby="slider-description"
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                    @keydown=${this.onInputKeydown}
                    .model=${model}
                />
                ${showValueTooltip
                    ? html`
                          <span
                              class="value-tooltip"
                              role="status"
                              aria-live="polite"
                          >
                              ${formattedValue}
                          </span>
                      `
                    : nothing}
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
                if (window.__swc?.DEBUG) {
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
                if (window.__swc?.DEBUG) {
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

        const isMultiHandle = handles.length > 1;

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

        // Warn if multi-handle slider has handles without labels (accessibility requirement)
        if (window.__swc?.DEBUG && isMultiHandle) {
            const handlesWithoutLabels = handles.filter(
                (handle) => handle !== this.host && !handle.label?.length
            );
            if (handlesWithoutLabels.length > 0) {
                window.__swc.warn(
                    this.host,
                    `Multi-handle sliders require a \`label\` attribute on each <sp-slider-handle> for accessibility. ${handlesWithoutLabels.length} handle(s) are missing labels.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/slider/#multi-handle-slider-labels',
                    { level: 'low' }
                );
            }
        }

        this.model = modelValues;
    }

    public async handleUpdatesComplete(): Promise<void> {
        const updates = [...this.handles.values()]
            .filter((handle) => handle !== this.host)
            .map((handle) => handle.updateComplete);
        await Promise.all(updates);
    }
}
