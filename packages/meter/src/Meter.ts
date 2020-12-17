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
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/field-label/sp-field-label.js';
import styles from './meter.css.js';

/**
 * @element sp-meter
 */
export class Meter extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Number })
    public progress = 0;

    @property({ type: Boolean, reflect: true, attribute: 'over-background' })
    public overBackground = false;

    @property({ type: Boolean, reflect: true })
    public warning = false;

    @property({ type: Boolean, reflect: true })
    public critical = false;

    @property({ type: Boolean, reflect: true })
    public positive = false;

    @property({ type: String, reflect: true })
    public size = 'm';

    @property({ type: String, reflect: true })
    public label = '';

    @property({ type: Boolean, reflect: true, attribute: 'side-label' })
    // called sideLabel
    public sideLabel = false;

    protected render(): TemplateResult {
        return html`
            <sp-field-label size=${this.size} class="label">
                <slot>${this.label}</slot>
            </sp-field-label>
            <sp-field-label size=${this.size} class="percentage">
                ${this.progress}%
            </sp-field-label>
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('role', 'progressbar');
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('progress')) {
            this.setAttribute('aria-valuenow', '' + this.progress);
        }
        if (this.label && changes.has('label')) {
            this.setAttribute('aria-label', this.label);
        }
    }
}
