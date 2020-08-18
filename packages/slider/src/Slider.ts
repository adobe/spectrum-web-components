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
} from '@spectrum-web-components/base';

import spectrumSliderStyles from './spectrum-slider.css.js';
import sliderStyles from './slider.css.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';

export const variants = ['color', 'filled', 'ramp', 'range', 'tick'];

export class Slider extends Focusable {
    public static get styles(): CSSResultArray {
        return [...super.styles, sliderStyles, spectrumSliderStyles];
    }

    @property()
    public type = '';

    @property({ reflect: true })
    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        const oldValue = this.value;
        if (this.input) {
            this.input.value = String(value);
        }
        const newValue = this.input ? parseFloat(this.input.value) : value;

        if (newValue === oldValue) {
            return;
        }

        this._value = newValue;
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
    private boundingClientRect?: DOMRect;

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
                    ${this.ariaValueText}
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
                    aria-disabled=${this.disabled ? 'true' : 'false'}
                    aria-labelledby="label"
                    aria-valuenow=${this.value}
                    aria-valuemin=${this.min}
                    aria-valuemax=${this.max}
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

    private onPointerDown(event: PointerEvent): void {
        if (this.disabled) {
            return;
        }
        this.boundingClientRect = this.getBoundingClientRect();
        this.focus();
        this.dragging = true;
        this.handle.setPointerCapture(event.pointerId);
    }

    private onMouseDown(event: MouseEvent): void {
        if (this.supportsPointerEvent) {
            return;
        }
        if (this.disabled) {
            return;
        }
        this.boundingClientRect = this.getBoundingClientRect();
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        this.focus();
        this.dragging = true;
        this.currentMouseEvent = event;
        this._trackMouseEvent();
    }

    private _trackMouseEvent(): void {
        if (!this.currentMouseEvent || !this.dragging) {
            return;
        }
        this.value = this.calculateHandlePosition(this.currentMouseEvent);
        requestAnimationFrame(() => this._trackMouseEvent());
    }

    private onPointerUp(event: PointerEvent): void {
        // Retain focus on input element after mouse up to enable keyboard interactions
        this.focus();
        this.handleHighlight = false;
        this.dragging = false;
        this.handle.releasePointerCapture(event.pointerId);
        this.dispatchChangeEvent();
    }

    private onMouseUp = (event: MouseEvent): void => {
        // Retain focus on input element after mouse up to enable keyboard interactions
        this.focus();
        this.currentMouseEvent = event;
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        requestAnimationFrame(() => {
            this.handleHighlight = false;
            this.dragging = false;
            this.dispatchChangeEvent();
        });
    };

    private onPointerMove(event: PointerEvent): void {
        if (!this.dragging) {
            return;
        }
        this.value = this.calculateHandlePosition(event);
    }

    private onMouseMove = (event: MouseEvent): void => {
        this.currentMouseEvent = event;
    };

    private onPointerCancel(event: PointerEvent): void {
        this.dragging = false;
        this.handle.releasePointerCapture(event.pointerId);
    }

    /**
     * Move the handle under the cursor and begin start a pointer capture when the track
     * is moused down
     */
    private onTrackPointerDown(event: PointerEvent): void {
        if (event.target === this.handle || this.disabled) {
            return;
        }
        this.boundingClientRect = this.getBoundingClientRect();
        this.dragging = true;
        this.handle.setPointerCapture(event.pointerId);

        /**
         * Dispatch a synthetic pointerdown event to ensure that pointerdown
         * handlers attached to the slider are invoked before input handlers
         */
        event.stopPropagation();
        const syntheticPointerEvent = new PointerEvent('pointerdown', event);
        this.dispatchEvent(syntheticPointerEvent);

        this.value = this.calculateHandlePosition(event);
    }

    private onTrackMouseDown(event: MouseEvent): void {
        if (this.supportsPointerEvent) {
            return;
        }
        if (event.target === this.handle || this.disabled) {
            return;
        }
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        this.boundingClientRect = this.getBoundingClientRect();
        this.dragging = true;
        this.currentMouseEvent = event;
        this._trackMouseEvent();
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

        return this.isLTR ? value : 100 - value;
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

    private get trackLeftStyle(): string {
        return `width: ${this.trackProgress * 100}%`;
    }

    private get trackRightStyle(): string {
        const width = `width: ${(1 - this.trackProgress) * 100}%;`;
        const halfHandleWidth = `var(--spectrum-slider-handle-width, var(--spectrum-global-dimension-size-200)) / 2`;
        const offset = `${this.isLTR ? 'left' : 'right'}: calc(${
            this.trackProgress * 100
        }% + ${halfHandleWidth})`;

        return width + offset;
    }

    private get handleStyle(): string {
        return `${this.isLTR ? 'left' : 'right'}: ${this.trackProgress * 100}%`;
    }
}
