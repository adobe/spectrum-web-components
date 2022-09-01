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
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { CheckboxBase } from '@spectrum-web-components/checkbox/src/CheckboxBase.js';
import switchStyles from './switch.css.js';
import legacyStyles from './switch-legacy.css.js';

/**
 * @element sp-switch
 *
 * @slot - text label of the Switch
 */
export class Switch extends SizedMixin(CheckboxBase) {
    public static override get styles(): CSSResultArray {
        /* c8 ignore next 4 */
        if (window.hasOwnProperty('ShadyDOM')) {
            // Override some styles if we are using the web component polyfill
            return [switchStyles, legacyStyles];
        }
        return [switchStyles];
    }

    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    protected override render(): TemplateResult {
        return html`
            ${super.render()}
            <span id="switch"></span>
            <label id="label" for="input"><slot></slot></label>
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.inputElement.setAttribute('role', 'switch');
    }

    protected override updated(changes: PropertyValues): void {
        if (changes.has('checked')) {
            this.inputElement.setAttribute(
                'aria-checked',
                this.checked ? 'true' : 'false'
            );
        }
    }
}
