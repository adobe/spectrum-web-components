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
import styles from './meter.css.js';

export const meterVariants = ['positive', 'notice', 'negative'];

export type MeterVariants = (typeof meterVariants)[number];

/**
 * @element sp-meter
 *
 * @slot - text labeling the Meter
 */
export class Meter extends SizedMixin(ObserveSlotText(SpectrumElement, ''), {
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Number })
    public progress = 0;

    /**
     * The variant applies specific styling when set to `negative`, `positive`, `notice`
     * `variant` attribute is removed when not matching one of the above.
     *
     * @param {String} variant
     */
    @property({ type: String })
    public set variant(variant: MeterVariants) {
        if (variant === this.variant) {
            return;
        }
        const oldValue = this.variant;
        if (meterVariants.includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
        } else {
            this.removeAttribute('variant');
            this._variant = '';
        }
        this.requestUpdate('variant', oldValue);
    }

    public get variant(): MeterVariants {
        return this._variant;
    }

    private _variant: MeterVariants = '';

    @property({ type: String, reflect: true })
    public label = '';

    @query('slot')
    private slotEl!: HTMLSlotElement;

    private languageResolver = new LanguageResolutionController(this);

    @property({ type: Boolean, reflect: true, attribute: 'side-label' })
    // called sideLabel
    public sideLabel = false;

    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: 'white';

    protected override render(): TemplateResult {
        return html`
            <sp-field-label size=${this.size} class="label">
                ${this.slotHasContent ? nothing : this.label}
                <slot @slotchange=${this.handleSlotchange}>${this.label}</slot>
            </sp-field-label>
            <sp-field-label size=${this.size} class="percentage">
                ${new Intl.NumberFormat(this.languageResolver.language, {
                    style: 'percent',
                    unitDisplay: 'narrow',
                }).format(this.progress / 100)}
            </sp-field-label>
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
        this.setAttribute('role', 'meter progressbar');
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('progress')) {
            this.setAttribute('aria-valuenow', '' + this.progress);
        }
        if (changes.has('label')) {
            if (this.label.length) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
        }
    }
}
