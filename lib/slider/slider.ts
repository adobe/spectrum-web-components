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

import { html, LitElement, property } from 'lit-element';

// @ts-ignore - css generated at build time
import sliderColorStyles from './slider-color.css.js';
// @ts-ignore - css generated at build time
import sliderRangeStyles from './slider-range.css.js';
// @ts-ignore - css generated at build time
import sliderSkinStyles from './slider-skin.css.js';
// @ts-ignore - css generated at build time
import sliderStyles from './slider.css.js';

export class SpectrumSlider extends LitElement {
    public static is = 'spectrum-slider';

    public static get styles() {
        return [sliderStyles, sliderSkinStyles];
    }

    @property()
    public type = '';

    @property({ type: Number })
    public value = 10;

    @property()
    public label = '';

    @property({ type: Number })
    public max = 20;

    @property({ type: Number })
    public min = 0;

    @property({ type: Number })
    public step = 1;

    @property({ type: Boolean })
    public disabled = false;

    @property({ type: Boolean })
    public isDragging = false;

    public onInput(ev: Event) {
        if (!this.inputElement) {
            return;
        }
        const inputValue = this.inputElement.value;

        this.value = parseFloat(inputValue);

        interface ISliderInputEventDetail {
            bubbles: boolean;
            composed: boolean;
            detail: number;
        }

        const inputEventInit: ISliderInputEventDetail = {
            bubbles: true,
            composed: true,
            detail: this.value,
        };

        const inputEvent = new CustomEvent('slider-input', inputEventInit);

        this.dispatchEvent(inputEvent);
    }

    public onChange(ev: Event) {
        interface ISliderChangeEventDetail {
            bubbles: boolean;
            composed: boolean;
            detail: number;
        }

        const changeEventInit: ISliderChangeEventDetail = {
            bubbles: true,
            composed: true,
            detail: this.value,
        };

        const changeEvent = new CustomEvent('slider-change', changeEventInit);
        this.dispatchEvent(changeEvent);
    }

    protected render() {
        return html`
            <div id="labelContainer">
                <label id="label" for="input">${this.label}</label>
                <div id="value" role="textbox" aria-readonly="true" aria-labelledby="label">
                    ${this.value}
                </div>
            </div>
            <div id="controls">
                <input type="range"
                      id="input"
                      value="${this.value}"
                      step="${this.step}"
                      min="${this.min}"
                      max="${this.max}"
                      @change="${this.onChange}"
                      @input=${this.onInput}
                      @mousedown=${this.onMouseDown}
                      @mouseup=${this.onMouseUp}
                  />
                <div class="track" id="track-left" style="${
                    this.trackLeftStyle
                }">
                </div>
                <div id="handle"
                    class="${this.handleClass}"
                    style="${this.handleStyle}"
                >
                </div>
                <div class="track"
                    id="track-right"
                    style="${this.trackRightStyle}"
                >
                </div>
                </div>
            </div>
        `;
    }

    private onMouseDown() {
        this.isDragging = true;
    }

    private onMouseUp() {
        this.isDragging = false;
    }

    private get inputElement() {
        return this.shadowRoot!.getElementById('input') as HTMLInputElement;
    }

    /**
     * Ratio representing the slider's position on the track
     */
    private get trackProgress(): number {
        return this.value / this.max;
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

    private get handleClass(): string {
        return this.isDragging ? 'is-dragged' : '';
    }
}
