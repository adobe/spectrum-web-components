/*
Copyright 2019 Adobe. All rights reserved.
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
} from 'lit-element';

import spectrumSliderStyles from './spectrum-slider.css.js';
import sliderStyles from './slider.css.js';
import { Focusable } from '@spectrum-web-components/shared/lib/focusable.js';

export type SliderEventDetail = number;

export const variants = ['color', 'filled', 'ramp', 'range', 'tick'];

export class Slider extends Focusable {
    public static get styles(): CSSResultArray {
        return [sliderStyles, spectrumSliderStyles];
    }

    @property()
    public type = '';

    @property({ reflect: true })
    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        const oldValue = this.value;

        if (value === oldValue) {
            return;
        }

        this._value = value;
        this.requestUpdate('value', oldValue);
    }

    private _value = 10;

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

    @property()
    public label = '';

    @property({ reflect: true, attribute: 'aria-label' })
    public ariaLabel?: string;

    @property({ type: Number })
    public max = 20;

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

    private supportsPointerEvent = 'setPointerCapture' in this;
    private currentMouseEvent?: MouseEvent;

    public get focusElement(): HTMLElement {
        return this.input ? this.input : this;
    }

    protected render(): TemplateResult {
        return html`
            ${this.renderLabel()}
            ${this.variant === 'color'
                ? this.renderColorTrack()
                : this.renderTrack()}
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        if (changedProperties.has('value')) {
            this.value = this.clampValue(this.value);
            this.dispatchInputEvent();
        }
    }

    private renderLabel(): TemplateResult {
        return html`
            <div id="labelContainer">
                <label id="label" for="input">${this.label}</label>
                <div
                    id="value"
                    role="textbox"
                    aria-readonly="true"
                    aria-labelledby="label"
                >
                    ${this.value}
                </div>
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
                style=${this.trackLeftStyle}
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
                style=${this.trackRightStyle}
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
        const ticks = new Array(tickCount + 1);
        ticks.fill(0, 0, tickCount + 1);
        return html`
            <div class="ticks">
                ${ticks.map(
                    (tick, i) => html`
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
                @pointermove=${this.onPointerMove}
                @pointerdown=${this.onPointerDown}
                @mousedown=${this.onMouseDown}
                @pointerup=${this.onPointerUp}
                @pointercancel=${this.onPointerCancel}
                role="presentation"
            >
                <input
                    type="range"
                    id="input"
                    value="${this.value}"
                    step="${this.step}"
                    min="${this.min}"
                    max="${this.max}"
                    aria-disabled=${this.disabled}
                    aria-label=${this.ariaLabel || this.label}
                    aria-valuemin=${this.min}
                    aria-valuemax=${this.max}
                    aria-valuetext=${this.value}
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                />
            </div>
        `;
    }

    private renderTrack(): TemplateResult {
        return html`
            <div id="controls"
                @pointerdown=${this.onTrackPointerDown}
                @mousedown=${this.onTrackMouseDown}
            >
                ${this.renderTrackLeft()}
                ${this.renderRamp()}
                ${this.renderTicks()}
                ${this.renderHandle()}
                ${this.renderTrackRight()}
                </div>
            </div>
        `;
    }

    private renderColorTrack(): TemplateResult {
        return html`
            <div id="controls" @pointerdown=${this.onTrackPointerDown}>
                <div class="track"></div>
                ${this.renderHandle()}
            </div>
        `;
    }

    private onPointerDown(ev: PointerEvent): void {
        if (this.disabled) {
            return;
        }
        this.input.focus();
        this.dragging = true;
        this.handle.setPointerCapture(ev.pointerId);
    }

    private onMouseDown(ev: MouseEvent): void {
        if (this.supportsPointerEvent) {
            return;
        }
        if (this.disabled) {
            return;
        }
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        this.input.focus();
        this.dragging = true;
        this.currentMouseEvent = ev;
        this._trackMouseEvent();
    }

    private _trackMouseEvent(): void {
        if (!this.currentMouseEvent || !this.dragging) {
            return;
        }
        this.value = this.calculateHandlePosition(this.currentMouseEvent);
        requestAnimationFrame(() => this._trackMouseEvent());
    }

    private onPointerUp(ev: PointerEvent): void {
        // Retain focus on input element after mouse up to enable keyboard interactions
        this.input.focus();
        this.handleHighlight = false;
        this.dragging = false;
        this.handle.releasePointerCapture(ev.pointerId);
        this.dispatchChangeEvent();
    }

    private onMouseUp = (ev: MouseEvent): void => {
        // Retain focus on input element after mouse up to enable keyboard interactions
        this.input.focus();
        this.currentMouseEvent = ev;
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        requestAnimationFrame(() => {
            this.handleHighlight = false;
            this.dragging = false;
            this.dispatchChangeEvent();
        });
    };

    private onPointerMove(ev: PointerEvent): void {
        if (!this.dragging) {
            return;
        }
        this.value = this.calculateHandlePosition(ev);
    }

    private onMouseMove = (ev: MouseEvent): void => {
        this.currentMouseEvent = ev;
    };

    private onPointerCancel(ev: PointerEvent): void {
        this.dragging = false;
        this.handle.releasePointerCapture(ev.pointerId);
    }

    /**
     * Move the handle under the cursor and begin start a pointer capture when the track
     * is moused down
     */
    private onTrackPointerDown(ev: PointerEvent): void {
        if (ev.target === this.handle || this.disabled) {
            return;
        }
        this.dragging = true;
        this.handle.setPointerCapture(ev.pointerId);

        this.value = this.calculateHandlePosition(ev);
    }

    private onTrackMouseDown(ev: MouseEvent): void {
        if (this.supportsPointerEvent) {
            return;
        }
        if (ev.target === this.handle || this.disabled) {
            return;
        }
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        this.dragging = true;
        this.currentMouseEvent = ev;
        this._trackMouseEvent();
    }

    /**
     * Keep the slider value property in sync with the input element's value
     */
    private onInputChange(): void {
        const inputValue = parseFloat(this.input.value);
        this.value = this.clampValue(inputValue);
        this.input.value = this.value.toString();

        this.dispatchChangeEvent();
    }

    private onInputFocus(): void {
        this.handleHighlight = true;
    }

    private onInputBlur(): void {
        this.handleHighlight = false;
    }

    /**
     * Returns the value under the cursor
     * @param: PointerEvent on slider
     * @return: Slider value that correlates to the position under the pointer
     */
    private calculateHandlePosition(ev: PointerEvent | MouseEvent): number {
        const rect = this.getBoundingClientRect();
        const minOffset = rect.left;
        const offset = ev.clientX;
        const size = rect.width;

        const percent = (offset - minOffset) / size;
        let value = this.min + (this.max - this.min) * percent;

        value = this.clampValue(value);

        if (this.step) {
            value = Math.round(value / this.step) * this.step;
        }

        return value;
    }

    /**
     * @param: value to be clamped
     * @return: the original value if in range, this.max if over, and this.min if under
     */
    private clampValue(value: number): number {
        const reducedValue = Math.min(value, this.max);
        return Math.max(reducedValue, this.min);
    }

    private dispatchInputEvent(): void {
        const inputEvent = new CustomEvent('sp-slider:input', {
            bubbles: true,
            composed: true,
            detail: this.value,
        });

        this.dispatchEvent(inputEvent);
    }

    private dispatchChangeEvent(): void {
        this.input.value = this.value.toString();

        const changeEvent = new CustomEvent('sp-slider:change', {
            bubbles: true,
            composed: true,
            detail: this.value,
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

    private get trackLeftStyle(): string {
        return `width: ${this.trackProgress * 100}%`;
    }

    private get trackRightStyle(): string {
        const width = `width: ${(1 - this.trackProgress) * 100}%; `;
        const offset = `left: calc(${this.trackProgress * 100}% + 8px)`;

        return width + offset;
    }

    private get handleStyle(): string {
        return `left: ${this.trackProgress * 100}%`;
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-slider:input': CustomEvent<SliderEventDetail>;
        'sp-slider:change': CustomEvent<SliderEventDetail>;
    }
}
