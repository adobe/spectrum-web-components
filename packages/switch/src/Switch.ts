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
    TemplateResult,
    html,
    PropertyValues,
} from '@spectrum-web-components/base';
import { CheckboxBase } from '@spectrum-web-components/checkbox/src/CheckboxBase.js';
import switchStyles from './switch.css.js';
import legacyStyles from './switch-legacy.css.js';

export class Switch extends CheckboxBase {
    public static get styles(): CSSResultArray {
        /* istanbul ignore if */
        if (window.hasOwnProperty('ShadyDOM')) {
            // Override some styles if we are using the web component polyfill
            return [...super.styles, switchStyles, legacyStyles];
        }
        return [...super.styles, switchStyles];
    }

    protected render(): TemplateResult {
        return html`
            ${super.render()}
            <span id="switch"></span>
            <label id="label" for="input"><slot></slot></label>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.inputElement.setAttribute('role', 'switch');
    }

    protected updated(changes: PropertyValues): void {
        if (changes.has('checked')) {
            this.inputElement.setAttribute(
                'aria-checked',
                this.checked ? 'true' : 'false'
            );
        }
    }
}
