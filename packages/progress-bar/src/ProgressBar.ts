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
    CSSResultArray,
    html,
    PropertyValues,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import '@spectrum-web-components/field-label/sp-field-label.js';
import styles from './progress-bar.css.js';

/**
 * @element sp-progress-bar
 */
export class ProgressBar extends SizedMixin(SpectrumElement) {
    public static override get styles(): CSSResultArray {
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

    @property({ type: Number })
    public progress = 0;

    protected override render(): TemplateResult {
        return html`
            ${this.label
                ? html`
                      <sp-field-label size=${this.size} class="label">
                          ${this.label}
                      </sp-field-label>
                      ${this.indeterminate
                          ? html``
                          : html`
                                <sp-field-label
                                    size=${this.size}
                                    class="percentage"
                                >
                                    ${this.progress}%
                                </sp-field-label>
                            `}
                  `
                : html``}
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'progressbar');
        }
    }

    protected override updated(changes: PropertyValues): void {
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
        if (!this.indeterminate && changes.has('progress')) {
            this.setAttribute('aria-valuenow', '' + this.progress);
        } else if (this.hasAttribute('aria-valuenow')) {
            this.removeAttribute('aria-valuenow');
        }
        if (this.label && changes.has('label')) {
            this.setAttribute('aria-label', this.label);
        }
    }
}
