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
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';

import { getLabelFromSlot } from '@spectrum-web-components/shared/src/get-label-from-slot.js';
import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import styles from './progress-bar.css.js';

/**
 * @element sp-progress-bar
 */
export class ProgressBar extends SizedMixin(
    ObserveSlotText(SpectrumElement, '')
) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public indeterminate = false;

    @property({ type: String, reflect: true })
    public label = '';

    private languageResolver = new LanguageResolutionController(this);

    @property({ type: Boolean, reflect: true, attribute: 'over-background' })
    public overBackground = false;

    @property({ type: Boolean, reflect: true, attribute: 'side-label' })
    public sideLabel = false;

    @property({ type: Number })
    public progress = 0;

    @property({ type: String, reflect: true })
    public static: 'white' | undefined;

    @query('slot')
    private slotEl!: HTMLSlotElement;

    protected override render(): TemplateResult {
        return html`
            <sp-field-label size=${this.size} class="label">
                <slot
                    @slotchange=${() => {
                        const labelFromSlot = getLabelFromSlot(
                            this.label,
                            this.slotHasContent,
                            this.slotEl
                        );
                        if (labelFromSlot) {
                            this.label = labelFromSlot;
                        }
                    }}
                >
                    ${this.label}
                </slot>
            </sp-field-label>
            ${this.label
                ? html`
                      ${this.indeterminate
                          ? html``
                          : html`
                                <sp-field-label
                                    size=${this.size}
                                    class="percentage"
                                >
                                    ${new Intl.NumberFormat(
                                        this.languageResolver.language,
                                        {
                                            style: 'percent',
                                            unitDisplay: 'narrow',
                                        }
                                    ).format(this.progress / 100)}
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
                this.removeAttribute('aria-valuenow');
            } else {
                this.setAttribute('aria-valuemin', '0');
                this.setAttribute('aria-valuemax', '100');
            }
        }
        if (!this.indeterminate && changes.has('progress')) {
            this.setAttribute('aria-valuenow', '' + this.progress);
        }
        if (this.label && changes.has('label')) {
            this.setAttribute('aria-label', this.label);
        }

        if (window.__swc.DEBUG) {
            if (
                !this.label &&
                !this.getAttribute('aria-label') &&
                !this.getAttribute('aria-labelledby') &&
                !this.slotHasContent
            ) {
                window.__swc.warn(
                    this,
                    '<sp-progress-bar> elements will not be accessible to screen readers in the following situations:',
                    'https://opensource.adobe.com/spectrum-web-components/components/progress-bar/#accessibility',
                    {
                        type: 'accessibility',
                        issues: [
                            'if the value is not supplied to "label" attribute and the "content" is also not set for the component, or',
                            'an element ID reference supplied to the "aria-labelledby" attribute, which will be provided by screen readers and will need to be managed manually by the parent application.',
                        ],
                    }
                );
            }
        }
    }
}
