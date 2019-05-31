/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { CSSResultArray, TemplateResult, html, property } from 'lit-element';
import CheckboxBase from './checkbox-base';
import checkboxStyles from './checkbox.css';
import '../icon';

export class Checkbox extends CheckboxBase {
    public static is = 'sp-checkbox';

    @property({ type: Boolean, reflect: true })
    protected indeterminate: boolean = false;

    public static get styles(): CSSResultArray {
        return [checkboxStyles];
    }

    protected render(): TemplateResult {
        return html`
            <label id="root">
                <input
                    tabindex="${this.shadowTabIndex}"
                    type="checkbox"
                    id="input"
                    .indeterminate="${this.indeterminate}"
                />
                <span id="box">
                    <sp-icon
                        id="checkmark"
                        size="s"
                        name="ui:CheckmarkSmall"
                        focusable="false"
                        aria-hidden="true"
                    ></sp-icon>
                    <sp-icon
                        id="partialCheckmark"
                        size="s"
                        name="ui:DashSmall"
                        focusable="false"
                        aria-hidden="true"
                    ></sp-icon>
                </span>
                <span id="label"><slot></slot></span>
            </label>
        `;
    }

    public static register(): void {
        customElements.define('sp-checkbox', Checkbox);
    }
}
