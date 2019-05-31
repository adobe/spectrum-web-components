/*
Copyright 2018 Adobe. All rights reserved.
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
    LitElement,
    property,
    CSSResultArray,
    TemplateResult,
    query,
} from 'lit-element';

// import sliderSkinStyles from './slider-skin.css';
import sliderStyles from './spectrum-slider.css';
import { strictCustomEvent } from '../events';

export type SliderEventDetail = number;

export class Slider extends LitElement {
    public static is = 'sp-slider';

    public static get styles(): CSSResultArray {
        return [sliderStyles];
    }

    @property()
    public type = '';

    @property({ type: Number, reflect: true })
    public value = 10;

    @property()
    public label = '';

    @property({ reflect: true, attribute: 'aria-label' })
    public ariaLabel = this.label;

    @property({ type: Number })
    public max = 20;

    @property({ type: Number })
    public min = 0;

    @property({ type: Number })
    public step = 1;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public dragging = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @query('#handle')
    private handle!: HTMLDivElement;

    @query('#input')
    private input!: HTMLInputElement;

    // TODO: Remove once focus mixin is implemented
    public connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('focus', this.focusListener);
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('focus', this.focusListener);
    }

    protected render(): TemplateResult {
        return html`
            <div id="labelContainer">
                <label id="label" for="input">${this.label}</label>
                <div id="value" role="textbox" aria-readonly="true" aria-labelledby="label">
                    ${this.value}
                </div>
            </div>
            <div id="controls" @pointerdown=${this.onTrackPointerDown}>
                <div class="track" 
                    id="track-left"
                    style=${this.trackLeftStyle} 
                    role="presentation"
                >
                </div>
                <div id="handle" 
                    class=${this.handleClasses}
                    style=${this.handleStyle} 
                    @pointermove=${this.onPointerMove}
                    @pointerdown=${this.onPointerDown}
                    @pointerup=${this.onPointerUp}
                    @pointercancel=${this.onPointerCancel}
                    role="presentation"
                >
                    <input type="range"
                        id="input"
                        value="${this.value}"
                        step="${this.step}"
                        min="${this.min}"
                        max="${this.max}"
                        aria-disabled=${this.disabled}
                        aria-label=${this.ariaLabel || null}
                        aria-valuemin=${this.min}
                        aria-valuemax=${this.max}
                        aria-valuetext=${this.value}
                        @change=${this.onInputElementChange}
                        @focus=${this.onInputFocus}
                        @blur=${this.onInputElementBlur}
                    />
                </div>
                <div class="track"
                    id="track-right"
                    style=${this.trackRightStyle}
                    role="presentation"
                >
                </div>
                </div>
            </div>
        `;
    }

    private get handleClasses(): string {
        let classes = '';
        if (this.dragging) {
            classes += 'is-dragged';
        }
        if (this.focused) {
            classes += ' is-focused';
        }
        return classes;
    }

    private focusListener(): void {
        if (this.input) {
            this.focused = true;
            this.input.focus();
        }
    }

    private onPointerDown(ev: PointerEvent): void {
        this.input.focus();
        this.dragging = true;
        this.handle.setPointerCapture(ev.pointerId);
    }

    private onPointerUp(ev: PointerEvent): void {
        // Retain focus after mouse up to enable keyboard interactions
        this.input.focus();
        this.dragging = false;
        this.handle.releasePointerCapture(ev.pointerId);
        this.dispatchChangeEvent();
    }

    private onPointerMove(ev: PointerEvent): void {
        if (!this.dragging) {
            return;
        }
        this.value = this.calculateHandlePosition(ev);
        this.dispatchInputEvent();
    }

    private onPointerCancel(ev: PointerEvent): void {
        this.dragging = false;
        this.handle.releasePointerCapture(ev.pointerId);
    }

    /**
     * Move the handle under the cursor and begin start a pointer capture when the track
     * is moused down
     */
    private onTrackPointerDown(ev: PointerEvent): void {
        if (ev.target === this.handle) {
            return;
        }
        this.dragging = true;
        this.handle.setPointerCapture(ev.pointerId);

        this.value = this.calculateHandlePosition(ev);
        this.dispatchInputEvent();
    }

    /**
     * Keep the slider value property in sync with the input element's value
     */
    private onInputElementChange(ev: Event): void {
        this.value = parseFloat(this.input.value);
        this.dispatchInputEvent();
        this.dispatchChangeEvent();
    }

    private onInputElementBlur(): void {
        this.focused = false;
        this.input.blur();
        console.log('blur');
    }

    private onInputFocus() {
        console.log('focus');
    }

    /**
     * param: PointerEvent on slider
     * returns: Slider value that correlates to the position under the pointer
     */
    private calculateHandlePosition(ev: PointerEvent): number {
        const rect = this.getBoundingClientRect();
        const minOffset = rect.left;
        const offset = ev.clientX;
        const size = rect.width;

        const percent = (offset - minOffset) / size;
        let value = this.min + (this.max - this.min) * percent;

        value = Math.min(value, this.max);
        value = Math.max(value, this.min);

        if (this.step) {
            value = Math.round(value / this.step) * this.step;
        }

        return value;
    }

    private dispatchInputEvent(): void {
        const inputEvent = strictCustomEvent('sp-slider:input', {
            bubbles: true,
            composed: true,
            detail: this.value,
        });

        this.dispatchEvent(inputEvent);
    }

    private dispatchChangeEvent(): void {
        this.input.value = this.value.toString();

        const changeEvent = strictCustomEvent('sp-slider:change', {
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
