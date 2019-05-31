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

import { CSSResultArray, TemplateResult, html } from 'lit-element';
import CheckboxBase from '../checkbox/checkbox-base';
import switchStyles from './switch.css';

export class Switch extends CheckboxBase {
    public static is = 'sp-switch';

    public static get styles(): CSSResultArray {
        return [switchStyles];
    }

    protected render(): TemplateResult {
        return html`
            <input id="input" type="checkbox" />
            <span id="switch"></span>
            <label id="label" for="input"><slot></slot></label>
        `;
    }
}
