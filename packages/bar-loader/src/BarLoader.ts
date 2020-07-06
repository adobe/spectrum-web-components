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
    LitElement,
    CSSResultArray,
    TemplateResult,
    PropertyValues,
    property,
} from 'lit-element';

import styles from './bar-loader.css.js';

/**
 * @element sp-bar-loader
 */
export class BarLoader extends LitElement {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public indeterminate = false;

    @property({ type: String })
    public label = '';

    @property({ type: Boolean, reflect: true, attribute: 'over-background' })
    public overBackground = false;

    @property({ type: Boolean, reflect: true, attribute: 'side-label' })
    public sideLabel = false;

    @property({ type: Boolean, reflect: true })
    public small = false;

    @property({ type: Number })
    public value = 0;

    protected render(): TemplateResult {
        return html`
            ${this.label
                ? html`
                      <div class="label">${this.label}</div>
                      ${this.indeterminate
                          ? html``
                          : html`
                                <div class="percentage">${this.value}%</div>
                            `}
                  `
                : html``}
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.value} / 100));"
                ></div>
            </div>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'progressbar');
        }
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('indeterminate')) {
            if (this.indeterminate) {
                this.removeAttribute('aria-valuemin');
                this.removeAttribute('aria-valuemax');
            } else {
                this.setAttribute('aria-valuemin', '0');
                this.setAttribute('aria-valuemax', '100');
            }
        }
        if (!this.indeterminate && changes.has('value')) {
            this.setAttribute('aria-valuenow', '' + this.value);
        } else if (this.hasAttribute('aria-valuenow')) {
            this.removeAttribute('aria-valuenow');
        }
    }
}
