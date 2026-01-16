/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    CSSResultArray,
    html,
    nothing,
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
    ObserveSlotText(SpectrumElement, ''),
    {
        noDefaultSize: true,
    }
) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public indeterminate = false;

    @property({ type: String, reflect: true })
    public label = '';

    private languageResolver = new LanguageResolutionController(this);

    @property({ type: Boolean, attribute: 'over-background' })
    public get overBackground(): string {
        return this._overBackground ? 'over-background' : '';
    }
    public set overBackground(overBackground: boolean) {
        if (overBackground === true) {
            this.removeAttribute('over-background');
            this.staticColor = 'white';

            if (window.__swc?.DEBUG) {
                window.__swc.warn(
                    this,
                    `The "over-background" attribute on <${this.localName}> has been deprecated and will be removed in a future release. Use "static-color='white'" instead.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/progress-bar/#variants',
                    {
                        level: 'deprecation',
                    }
                );
            }
        }
    }
    private _overBackground: boolean = false;

    @property({ type: Boolean, reflect: true, attribute: 'side-label' })
    public sideLabel = false;

    @property({ type: Number })
    public progress = 0;

    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: 'white';

    @query('slot')
    private slotEl!: HTMLSlotElement;

    protected override render(): TemplateResult {
        return html`
            ${this.slotHasContent || this.label
                ? html`
                      <sp-field-label size=${this.size} class="label">
                          ${this.slotHasContent ? html`` : this.label}

                          <slot @slotchange=${this.handleSlotchange}></slot>
                      </sp-field-label>
                  `
                : html``}
            ${this.label
                ? html`
                      ${this.indeterminate
                          ? nothing
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
                : nothing}
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `;
    }

    protected handleSlotchange(): void {
        const labelFromSlot = getLabelFromSlot(this.label, this.slotEl);
        if (labelFromSlot) {
            this.label = labelFromSlot;
        }
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
        if (changes.has('label')) {
            if (this.label.length) {
                this.setAttribute('aria-label', this.label);
            } else if (
                changes.get('label') === this.getAttribute('aria-label')
            ) {
                this.removeAttribute('aria-label');
            }
        }

        if (window.__swc?.DEBUG) {
            if (
                !this.label &&
                !this.getAttribute('aria-label') &&
                !this.getAttribute('aria-labelledby') &&
                !this.slotHasContent
            ) {
                window.__swc.warn(
                    this,
                    '<sp-progress-bar> elements need one of the following to be accessible:',
                    'https://opensource.adobe.com/spectrum-web-components/components/progress-bar/#accessibility',
                    {
                        type: 'accessibility',
                        issues: [
                            'value supplied to the "label" attribute, which will be displayed visually as part of the element, or',
                            'text content supplied directly to the <sp-progress-circle> element, or',
                            'value supplied to the "aria-label" attribute, which will only be provided to screen readers, or',
                            'an element ID reference supplied to the "aria-labelledby" attribute, which will be provided by screen readers and will need to be managed manually by the parent application.',
                        ],
                    }
                );
            }
        }
    }
}
