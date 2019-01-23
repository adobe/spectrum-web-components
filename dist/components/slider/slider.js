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
var __decorate =
    (this && this.__decorate) ||
    function(decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d;
        if (
            typeof Reflect === 'object' &&
            typeof Reflect.decorate === 'function'
        )
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r =
                        (c < 3
                            ? d(r)
                            : c > 3
                            ? d(target, key, r)
                            : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
import { html, LitElement, property } from '@polymer/lit-element';
// @ts-ignore - css generated at build time
import sliderSkinStyles from './slider-skin.css.js';
// @ts-ignore - css generated at build time
import sliderStyles from './slider.css.js';
export class SpectrumSlider extends LitElement {
    constructor() {
        super(...arguments);
        this.type = '';
        this.value = 10;
        this.label = '';
        this.max = 20;
        this.min = 0;
        this.step = 1;
        this.disabled = false;
        this.isDragging = false;
    }
    onInput(ev) {
        if (!this.inputElement) {
            return;
        }
        const inputValue = this.inputElement.value;
        this.value = parseFloat(inputValue);
        const inputEventInit = {
            bubbles: true,
            composed: true,
            detail: this.value,
        };
        const inputEvent = new CustomEvent('slider-input', inputEventInit);
        this.dispatchEvent(inputEvent);
    }
    onChange(ev) {
        const changeEventInit = {
            bubbles: true,
            composed: true,
            detail: this.value,
        };
        const changeEvent = new CustomEvent('slider-change', changeEventInit);
        this.dispatchEvent(changeEvent);
    }
    render() {
        return html`
            <style>
                ${sliderStyles}
                ${sliderSkinStyles}
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
    onMouseDown() {
        this.isDragging = true;
    }
    onMouseUp() {
        this.isDragging = false;
    }
    get inputElement() {
        return this.shadowRoot.getElementById('input');
    }
    /**
     * Ratio representing the slider's position on the track
     */
    get trackProgress() {
        return this.value / this.max;
    }
    get trackLeftStyle() {
        return `width: ${this.trackProgress * 100}%`;
    }
    get trackRightStyle() {
        const width = `width: ${(1 - this.trackProgress) * 100}%; `;
        const offset = `left: calc(${this.trackProgress * 100}% + 8px)`;
        return width + offset;
    }
    get handleStyle() {
        return `left: ${this.trackProgress * 100}%`;
    }
    get handleClass() {
        return this.isDragging ? 'is-dragged' : '';
    }
}
SpectrumSlider.is = 'spectrum-slider';
__decorate(
    [property({ type: String })],
    SpectrumSlider.prototype,
    'type',
    void 0
);
__decorate(
    [property({ type: Number })],
    SpectrumSlider.prototype,
    'value',
    void 0
);
__decorate(
    [property({ type: String })],
    SpectrumSlider.prototype,
    'label',
    void 0
);
__decorate(
    [property({ type: Number })],
    SpectrumSlider.prototype,
    'max',
    void 0
);
__decorate(
    [property({ type: Number })],
    SpectrumSlider.prototype,
    'min',
    void 0
);
__decorate(
    [property({ type: Number })],
    SpectrumSlider.prototype,
    'step',
    void 0
);
__decorate(
    [property({ type: Boolean })],
    SpectrumSlider.prototype,
    'disabled',
    void 0
);
__decorate(
    [property({ type: Boolean })],
    SpectrumSlider.prototype,
    'isDragging',
    void 0
);

//# sourceMappingURL=slider.js.map
