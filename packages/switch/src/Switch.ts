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
 * This component represents a toggle switch.
 *
 * @slot - text label of the Switch
 * @fires change - Announces a change in the `checked` property of a Switch
 */
export class Switch extends SizedMixin(CheckboxBase) {
    /**
     * Returns the styles to be applied to the component.
     */
    public static override get styles(): CSSResultArray {
        if (window.hasOwnProperty('ShadyDOM')) {
            // Override some styles if we are using the web component polyfill
            return [switchStyles, legacyStyles];
        }
        return [switchStyles];
    }

    /**
     * Indicates whether the switch is emphasized.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public emphasized = false;

    /**
     * Renders the component template.
     */
    protected override render(): TemplateResult {
        return html`
            ${super.render()}
            <span id="switch"></span>
            <label id="label" for="input"><slot></slot></label>
        `;
    }

    /**
     * Called after the element's DOM has been updated the first time.
     * Sets the role attribute of the input element to 'switch'.
     */
    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.inputElement.setAttribute('role', 'switch');
    }

    /**
     * Called when the element is updated.
     * Updates the aria-checked attribute of the input element based on the checked property.
     */
    protected override updated(changes: PropertyValues): void {
        if (changes.has('checked')) {
            this.inputElement.setAttribute(
                'aria-checked',
                this.checked ? 'true' : 'false'
            );
        }
    }
}
