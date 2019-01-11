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

import { html, LitElement, property } from '@polymer/lit-element';

// @ts-ignore - css generated at build time
import sliderColorStyles from './slider-color.css.js';
// @ts-ignore - css generated at build time
import sliderSkinStyles from './slider-skin.css.js';
// @ts-ignore - css generated at build time
import sliderStyles from './slider.css.js';

export class SpectrumSliderColor extends LitElement {
    @property({ type: String })
    public type = '';

    @property({ type: Number })
    public value = 10;

    @property({ type: String })
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

    private onInput(value: string) {
        this.value = parseFloat(value);
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

    private get handleStyle(): string {
        return `left: ${this.trackProgress * 100}%`;
    }

    private get handleClass(): string {
        return this.isDragging ? 'is-dragged' : '';
    }

    /**
     * Ratio representing the slider's position on the track
     */
    private get trackProgress(): number {
        return this.value / this.max;
    }

    private render() {
        return html`
            <style>
                ${sliderStyles}
                ${sliderSkinStyles}
                ${sliderColorStyles}
            </style>
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
                      @input=${(event: object) =>
                          this.onInput(this.inputElement!.value)}
                      @mousedown=${(event: object) => this.onMouseDown()}
                      @mouseup=${(event: object) => this.onMouseUp()}
                  />
                <div class="track"></div>
                <div id="handle"
                    class="${this.handleClass}"
                    style="${this.handleStyle}"
                ></div>
                </div>
            </div>
        `;
    }
}

if (!customElements.get('spectrum-slider-color')) {
    customElements.define('spectrum-slider-color', SpectrumSliderColor);
}
