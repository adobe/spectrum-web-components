/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { CSSResultArray, TemplateResult, html, property } from 'lit-element';
import { CheckboxBase } from './checkbox-base';
import checkboxStyles from './checkbox.css';
import '../icon';

export class Checkbox extends CheckboxBase {
    @property({ type: Boolean, reflect: true })
    public indeterminate: boolean = false;

    @property({ type: Boolean, reflect: true })
    public invalid: boolean = false;

    public static get styles(): CSSResultArray {
        return [checkboxStyles];
    }

    protected render(): TemplateResult {
        return html`
            <label id="root">
                ${super.render()}
                <span id="box">
                    <sp-icon
                        id="checkmark"
                        size="s"
                        name="ui:CheckmarkSmall"
                        aria-hidden="true"
                    ></sp-icon>
                    <sp-icon
                        id="partialCheckmark"
                        size="s"
                        name="ui:DashSmall"
                        aria-hidden="true"
                    ></sp-icon>
                </span>
                <span id="label"><slot></slot></span>
            </label>
        `;
    }
}
