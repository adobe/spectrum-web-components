/*
Copyright 2020 Adobe. All rights reserved.
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
    property,
    CSSResultArray,
    TemplateResult,
    query,
    PropertyValues,
    styleMap,
    ifDefined,
} from '@spectrum-web-components/base';
import { streamingListener } from '@spectrum-web-components/base/src/streaming-listener.js';

import sliderStyles from './slider.css.js';
import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { StyleInfo } from 'lit-html/directives/style-map';

export const variants = ['filled', 'ramp', 'range', 'tick'];

export class Slider extends ObserveSlotText(Focusable, '') {
    public static get styles(): CSSResultArray {
        return [sliderStyles];
    }

    @property()
    public type = '';

    @property({ type: Number, reflect: true })
    public value = 10;

    @property({ type: String })
    public set variant(variant: string) {
        const oldVariant = this.variant;
        if (variant === this.variant) {
            return;
        }
        if (variants.includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
        } else {
            this.removeAttribute('variant');
            this._variant = '';
        }
        this.requestUpdate('variant', oldVariant);
    }

    public get variant(): string {
        return this._variant;
    }

    /* Ensure that a '' value for `variant` removes the attribute instead of a blank value */
    private _variant = '';

    @property({ attribute: false })
    public getAriaValueText: (value: number) => string = (value) => `${value}`;

    @property({ attribute: false })
    private get ariaValueText(): string {
        if (!this.getAriaValueText) {
            return `${this.value}`;
        }
        return this.getAriaValueText(this.value);
    }

    @property()
    public label = '';

    @property({ reflect: true, attribute: 'aria-label' })
    public ariaLabel?: string;

    @property({ type: Number })
    public max = 100;

    @property({ type: Number })
    public min = 0;

    @property({ type: Number })
    public step = 1;

    @property({ type: Number, attribute: 'tick-step' })
    public tickStep = 0;

    @property({ type: Boolean, attribute: 'tick-labels' })
    public tickLabels = false;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public dragging = false;

    @property({ type: Boolean, reflect: true, attribute: 'handle-highlight' })
    public handleHighlight = false;

    @query('#handle')
    private handle!: HTMLDivElement;

    @query('#input')
    private input!: HTMLInputElement;

    @query('#label')
    private labelEl!: HTMLLabelElement;

    private boundingClientRect?: DOMRect;

    public get focusElement(): HTMLElement {
        return this.input;
    }

    protected render(): TemplateResult {
        return html`
            ${this.renderLabel()} ${this.renderTrack()}
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        if (changedProperties.has('value')) {
            if (this.value === this.input.valueAsNumber) {
                this.dispatchInputEvent();
            } else {
                this.value = this.input.valueAsNumber;
            }
        }
    }

    private renderLabel(): TemplateResult {
        return html`
            <div id="labelContainer">
                <label id="label" for="input">
                    ${this.slotHasContent ? html`` : this.label}
                    <slot>${this.label}</slot>
                </label>
                <output id="value" aria-live="off" for="input">
                    ${this.ariaValueText}
                </output>
            </div>
        `;
    }

    private renderTrackLeft(): TemplateResult {
        if (this.variant === 'ramp') {
            return html``;
        }
        return html`
            <div
                class="track"
                id="track-left"
                style=${styleMap(this.trackStartStyles)}
                role="presentation"
            ></div>
        `;
    }

    private renderTrackRight(): TemplateResult {
        if (this.variant === 'ramp') {
            return html``;
        }
        return html`
            <div
                class="track"
                id="track-right"
                style=${styleMap(this.trackEndStyles)}
                role="presentation"
            ></div>
        `;
    }

    private renderRamp(): TemplateResult {
        if (this.variant !== 'ramp') {
            return html``;
        }
        return html`
            <div id="ramp">
                <svg
                    viewBox="0 0 240 16"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                        d="M240,4v8c0,2.3-1.9,4.1-4.2,4L1,9C0.4,9,0,8.5,0,8c0-0.5,0.4-1,1-1l234.8-7C238.1-0.1,240,1.7,240,4z"
                    ></path>
                </svg>
            </div>
        `;
    }

    private renderTicks(): TemplateResult {
        if (this.variant !== 'tick') {
            return html``;
        }
        const tickStep = this.tickStep || this.step;
        const tickCount = (this.max - this.min) / tickStep;
        const partialFit = tickCount % 1 !== 0;
        const ticks = new Array(Math.floor(tickCount + 1));
        ticks.fill(0, 0, tickCount + 1);
        return html`
            <div
                class="${partialFit ? 'not-exact ' : ''}ticks"
                style=${ifDefined(
                    partialFit
                        ? `--sp-slider-tick-offset: calc(100% / ${this.max} * ${this.tickStep}`
                        : undefined
                )}
            >
                ${ticks.map(
                    (_tick, i) => html`
                        <div class="tick">
                            ${this.tickLabels
                                ? html`
                                      <div class="tickLabel">
                                          ${i * tickStep}
                                      </div>
                                  `
                                : html``}
                        </div>
                    `
                )}
            </div>
        `;
    }

    private renderHandle(): TemplateResult {
        return html`
            <div
                id="handle"
                style=${this.handleStyle}
                @manage=${streamingListener(
                    { type: 'pointerdown', fn: this.handlePointerdown },
                    { type: 'pointermove', fn: this.handlePointermove },
                    {
                        type: ['pointerup', 'pointercancel'],
                        fn: this.handlePointerup,
                    }
                )}
                role="presentation"
            >
                <input
                    type="range"
                    id="input"
                    min=${this.min}
                    max=${this.max}
                    step=${this.step}
                    .value=${this.value.toString()}
                    aria-disabled=${ifDefined(
                        this.disabled ? 'true' : undefined
                    )}
                    aria-valuetext=${this.ariaValueText}
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                />
            </div>
        `;
    }

    private renderTrack(): TemplateResult {
        return html`
            <div @pointerdown=${this.handleTrackPointerdown}>
                <div id="controls">
                    ${this.renderTrackLeft()} ${this.renderRamp()}
                    ${this.renderTicks()} ${this.renderHandle()}
                    ${this.renderTrackRight()}
                </div>
            </div>
        `;
    }

    private handlePointerdown(event: PointerEvent): void {
        if (this.disabled || event.button !== 0) {
            event.preventDefault();
            return;
        }
        this.boundingClientRect = this.getBoundingClientRect();
        this.labelEl.click();
        this.dragging = true;
        this.handle.setPointerCapture(event.pointerId);
    }

    private handlePointerup(event: PointerEvent): void {
        // Retain focus on input element after mouse up to enable keyboard interactions
        this.labelEl.click();
        this.handleHighlight = false;
        this.dragging = false;
        this.handle.releasePointerCapture(event.pointerId);
        this.dispatchChangeEvent();
    }

    private handlePointermove(event: PointerEvent): void {
        if (!this.dragging) {
            return;
        }
        this.value = this.calculateHandlePosition(event);
    }

    /**
     * Move the handle under the cursor and begin start a pointer capture when the track
     * is moused down
     */
    private handleTrackPointerdown(event: PointerEvent): void {
        if (event.target === this.handle) {
            return;
        }

        event.stopPropagation();
        event.preventDefault();
        const applyDefault = this.handle.dispatchEvent(
            new PointerEvent('pointerdown', event)
        );
        if (applyDefault) {
            this.handlePointermove(event);
        }
    }

    /**
     * Keep the slider value property in sync with the input element's value
     */
    private onInputChange(): void {
        const inputValue = parseFloat(this.input.value);
        this.value = inputValue;

        this.dispatchChangeEvent();
    }

    private onInputFocus(): void {
        let isFocusVisible;
        try {
            isFocusVisible =
                this.input.matches(':focus-visible') ||
                this.matches('.focus-visible');
        } catch (error) {
            isFocusVisible = this.matches('.focus-visible');
        }
        this.handleHighlight = isFocusVisible;
    }

    private onInputBlur(): void {
        this.handleHighlight = false;
    }

    /**
     * Returns the value under the cursor
     * @param: PointerEvent on slider
     * @return: Slider value that correlates to the position under the pointer
     */
    private calculateHandlePosition(event: PointerEvent | MouseEvent): number {
        if (!this.boundingClientRect) {
            return this.value;
        }
        const rect = this.boundingClientRect;
        const minOffset = rect.left;
        const offset = event.clientX;
        const size = rect.width;

        const percent = (offset - minOffset) / size;
        const value = this.min + (this.max - this.min) * percent;

        return this.isLTR ? value : this.max - value;
    }

    private dispatchInputEvent(): void {
        if (!this.dragging) {
            return;
        }
        const inputEvent = new Event('input', {
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(inputEvent);
    }

    private dispatchChangeEvent(): void {
        this.input.value = this.value.toString();

        const changeEvent = new Event('change', {
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(changeEvent);
    }

    /**
     * Ratio representing the slider's position on the track
     */
    private get trackProgress(): number {
        const range = this.max - this.min;
        const progress = this.value - this.min;

        return progress / range;
    }

    private get trackStartStyles(): StyleInfo {
        return {
            width: `${this.trackProgress * 100}%`,
            '--spectrum-slider-track-background-size': `calc(100% / ${this.trackProgress})`,
        };
    }

    private get trackEndStyles(): StyleInfo {
        return {
            width: `${100 - this.trackProgress * 100}%`,
            '--spectrum-slider-track-background-size': `calc(100% / ${
                1 - this.trackProgress
            })`,
        };
    }

    private get handleStyle(): string {
        return `${this.isLTR ? 'left' : 'right'}: ${this.trackProgress * 100}%`;
    }
}
