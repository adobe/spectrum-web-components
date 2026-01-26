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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/field-group/sp-field-group.js';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/help-text/sp-help-text.js';

export default {
    title: 'Field Group',
    component: 'sp-field-group',
};

export const horizontal = (): TemplateResult => {
    return html`
        <sp-field-group horizontal>
            <sp-checkbox>Checkbox 1</sp-checkbox>
            <sp-checkbox>Checkbox 2</sp-checkbox>
            <sp-checkbox>Checkbox 3</sp-checkbox>
            <sp-checkbox>Checkbox 4</sp-checkbox>
            <sp-checkbox>Checkbox 5</sp-checkbox>
        </sp-field-group>
    `;
};

export const vertical = (): TemplateResult => {
    return html`
        <sp-field-group vertical>
            <sp-checkbox>Checkbox 1</sp-checkbox>
            <sp-checkbox>Checkbox 2</sp-checkbox>
            <sp-checkbox>Checkbox 3</sp-checkbox>
            <sp-checkbox>Checkbox 4</sp-checkbox>
            <sp-checkbox>Checkbox 5</sp-checkbox>
        </sp-field-group>
    `;
};

export const invalid = (): TemplateResult => {
    return html`
        <sp-field-group vertical label="Required selections" invalid>
            <sp-checkbox invalid>Option A</sp-checkbox>
            <sp-checkbox invalid>Option B</sp-checkbox>
            <sp-checkbox invalid>Option C</sp-checkbox>
            <sp-help-text slot="negative-help-text" icon>
                Select at least one option to continue.
            </sp-help-text>
        </sp-field-group>
    `;
};
