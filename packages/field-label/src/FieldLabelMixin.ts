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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-asterisk100.js';

import styles from './field-label.css.js';
import asteriskIconStyles from '@spectrum-web-components/icon/src/spectrum-icon-asterisk.css.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { ObserveSlotText } from '@spectrum-web-components/shared';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

export declare class FieldLabelMixinInterface {
    disabled: boolean;
    required: boolean;
    sideAligned?: 'start' | 'end';
    slotHasContent: boolean;
    manageTextObservedSlot(): void;
    public renderFieldLabel(fieldId: string): TemplateResult;
}

/**
 * @mixin FieldLabelMixin
 *
 * provides a consistent way to render accessible, visually integrated labels
 * for form controls within custom elements. It handles label visibility,
 * required field indicators, disabled states, and label positioning.
 *
 * Spectrum Web Components leverages the `FieldLabelMixin` to power elements
 * like `sp-textfield`, `sp-combobox`, `sp-number-field`, and `sp-color-field`.
 *
 * @param superClass - The base class to mixin.
 * @param slotName - The name of the slot to observe for label content.
 * @param excludedSelectors - An array of selectors to exclude when observing slot content.
 * @returns A constructor for the mixin.
 *
 * @slot field-label - Text content of the label.
 */
export const FieldLabelMixin = <T extends Constructor<SpectrumElement>>(
    superClass: T,
    slotName?: string,
    excludedSelectors: string[] = []
): Constructor<FieldLabelMixinInterface> & T => {
    class FieldLabelMixinClass extends ObserveSlotText(
        superClass,
        slotName,
        excludedSelectors
    ) {
        public static get styles(): CSSResultArray {
            return [styles, asteriskIconStyles];
        }

        @property({ type: Boolean, reflect: true })
        public disabled = false;

        @property({ type: Boolean, reflect: true })
        public required = false;

        @property({ type: String, reflect: true, attribute: 'side-aligned' })
        public sideAligned?: 'start' | 'end';

        public renderFieldLabel(fieldId: string): TemplateResult {
            return html`
                <label
                    id="${fieldId}-label}"
                    for="${fieldId}"
                    ?hidden="${!this.slotHasContent}"
                >
                    <slot
                        id="field-label-slot"
                        name="${ifDefined(slotName)}"
                        @slotchange=${this.manageTextObservedSlot}
                    ></slot>
                    ${this.required
                        ? html`
                              <sp-icon-asterisk100
                                  class="required-icon spectrum-UIIcon-Asterisk100"
                              ></sp-icon-asterisk100>
                          `
                        : nothing}
                </label>
            `;
        }
    }
    return FieldLabelMixinClass as Constructor<FieldLabelMixinInterface> & T;
};
