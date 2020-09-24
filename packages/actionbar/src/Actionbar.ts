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
} from '@spectrum-web-components/base';
import '@spectrum-web-components/popover/sp-popover.js';

import actionbarStyles from './actionbar.css.js';

export const actionbarVariants = ['sticky', 'fixed'];

/**
 * Actionbar component
 */
export class Actionbar extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [actionbarStyles];
    }

    /**
     * When `flexible` the actionbar sizes itself to its content
     * rather than a specific width.
     *
     * @param {Boolean} flexible
     */
    @property({ type: Boolean, reflect: true })
    public flexible = false;

    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * The variant applies specific styling when set to `sticky` or `fixed`.
     * `variant` attribute is removed when not matching one of the above.
     *
     * @param {String} variant
     */
    @property({ type: String, reflect: true })
    public set variant(variant: string) {
        if (variant === this.variant) {
            return;
        }
        if (actionbarVariants.includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
            return;
        }
        this.removeAttribute('variant');
        this._variant = '';
    }

    public get variant(): string {
        return this._variant;
    }

    private _variant = '';

    public render(): TemplateResult {
        return html`
            <sp-popover open id="popover">
                <slot></slot>
            </sp-popover>
        `;
    }
}
