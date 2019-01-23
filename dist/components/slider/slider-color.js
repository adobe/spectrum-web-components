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
import sliderColorStyles from './slider-color.css.js';
// @ts-ignore - css generated at build time
import sliderSkinStyles from './slider-skin.css.js';
// @ts-ignore - css generated at build time
import sliderStyles from './slider.css.js';
export class SpectrumSliderColor extends LitElement {
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
        // interface ISliderInputEventDetail {
        //     bubbles: boolean;
        //     composed: boolean;
        //     detail: number;
        // }
        //
        // const inputEventInit: ISliderInputEventDetail = {
        //     bubbles: true,
        //     composed: true,
        //     detail: this.value,
        // };
        const inputEvent = new CustomEvent('slider-input', {
            bubbles: true,
            composed: true,
            detail: this.value,
        });
        //const inputEvent = new CustomEvent('slider-input', inputEventInit);
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
                      @change="${this.onChange}"
                      @input=${this.onInput}
                      @mousedown=${this.onMouseDown}
                      @mouseup=${this.onMouseUp}
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
    get handleStyle() {
        return `left: ${this.trackProgress * 100}%`;
    }
    get handleClass() {
        return this.isDragging ? 'is-dragged' : '';
    }
}
SpectrumSliderColor.is = 'spectrum-slider-color';
__decorate(
    [property({ type: String })],
    SpectrumSliderColor.prototype,
    'type',
    void 0
);
__decorate(
    [property({ type: Number })],
    SpectrumSliderColor.prototype,
    'value',
    void 0
);
__decorate(
    [property({ type: String })],
    SpectrumSliderColor.prototype,
    'label',
    void 0
);
__decorate(
    [property({ type: Number })],
    SpectrumSliderColor.prototype,
    'max',
    void 0
);
__decorate(
    [property({ type: Number })],
    SpectrumSliderColor.prototype,
    'min',
    void 0
);
__decorate(
    [property({ type: Number })],
    SpectrumSliderColor.prototype,
    'step',
    void 0
);
__decorate(
    [property({ type: Boolean })],
    SpectrumSliderColor.prototype,
    'disabled',
    void 0
);
__decorate(
    [property({ type: Boolean })],
    SpectrumSliderColor.prototype,
    'isDragging',
    void 0
);

//# sourceMappingURL=slider-color.js.map
