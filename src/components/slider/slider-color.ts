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

// @ts-ignore - css generated at build time
import sliderColorStyles from './slider-color.css.js';
// @ts-ignore - css generated at build time
import sliderSkinStyles from './slider-skin.css.js';
// @ts-ignore - css generated at build time
import sliderStyles from './slider.css.js';

export class SpectrumSliderColor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        if (!this.shadowRoot) {
            throw new Error('Failed to attach ShadowRoot!');
        }
        this.shadowRoot!.innerHTML = this.render();

        this.updateView();

        this.shadowRoot!.getElementById('input')!.oninput = (event) => {
            const inputValue = (this.shadowRoot!.getElementById(
                'input'
            ) as HTMLInputElement).value;

            this.value = parseFloat(inputValue);
            this.updateView();
        };

        this.shadowRoot!.getElementById('input')!.onmousedown = (event) => {
            this.shadowRoot!.getElementById('handle')!.classList.add(
                'is-dragged'
            );
        };
        this.shadowRoot!.getElementById('input')!.onmouseup = (event) => {
            this.shadowRoot!.getElementById('handle')!.classList.remove(
                'is-dragged'
            );
        };
    }

    private updateView() {
        const handle = this.shadowRoot!.getElementById('handle');
        const valueLabel = this.shadowRoot!.getElementById('value');
        const handleOffset = `${this.trackProgress * 100}%`;

        handle!.style.left = handleOffset;
        valueLabel!.innerHTML = this.value.toString();
    }

    /**
     * Getter for type attribute
     */
    public get type(): string | null {
        return this.getAttribute('type');
    }

    /**
     * Setter for type attribute
     */
    public set type(value: string | null) {
        if (value) {
            this.setAttribute('type', value);
        } else {
            this.removeAttribute('type');
        }
    }

    /**
     * Getter for max attribute
     */
    public get value(): number {
        return parseFloat(this.getAttribute('value') || '10');
    }

    /**
     * Getter for max attribute
     */
    public set value(value: number) {
        if (value !== null) {
            this.setAttribute('value', value.toString());
        } else {
            this.removeAttribute('value');
        }
    }

    /**
     * Getter for type attribute
     */
    public get label(): string {
        return this.getAttribute('label') || '';
    }

    /**
     * Setter for type attribute
     */
    public set label(value: string) {
        if (value) {
            this.setAttribute('label', value);
        } else {
            this.removeAttribute('label');
        }
    }

    /**
     * Getter for max attribute
     */
    public get max(): number {
        return parseFloat(this.getAttribute('max') || '10');
    }

    /**
     * Getter for max attribute
     */
    public set max(value: number) {
        if (value) {
            this.setAttribute('max', value.toString());
        } else {
            this.removeAttribute('max');
        }
    }

    /**
     * Getter for min attribute
     */
    public get min(): number {
        return parseFloat(this.getAttribute('min') || '0');
    }

    /**
     * Getter for max attribute
     */
    public set min(value: number) {
        if (value) {
            this.setAttribute('min', value.toString());
        } else {
            this.removeAttribute('min');
        }
    }

    /**
     * Getter for max attribute
     */
    public get step(): number {
        return parseFloat(this.getAttribute('step') || '1');
    }

    /**
     * Getter for max attribute
     */
    public set step(value: number) {
        if (value) {
            this.setAttribute('step', value.toString());
        } else {
            this.removeAttribute('step');
        }
    }

    /**
     * Getter for max attribute
     */
    public get disabled(): boolean {
        return this.getAttribute('isDisabled') ? true : false;
    }

    /**
     * Getter for max attribute
     */
    public set disabled(value: boolean) {
        if (value) {
            this.setAttribute('isDisabled', value.toString());
        } else {
            this.removeAttribute('isDisabled');
        }
    }

    /**
     * Ratio representing the slider's position on the track
     */
    private get trackProgress(): number {
        return this.value / this.max;
    }

    private render() {
        return `
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
                  />
                <div class="track"></div>
                <div id="handle"></div>
                </div>
            </div>
        `;
    }
}

if (!customElements.get('spectrum-slider-color')) {
    customElements.define('spectrum-slider-color', SpectrumSliderColor);
}
