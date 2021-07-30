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
import { TemplateResult, html } from '@spectrum-web-components/base';

import '../sp-textfield.js';

export default {
    component: 'sp-textfield',
    title: 'Textfield',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-textfield placeholder="Enter your name"></sp-textfield>
        <sp-textfield placeholder="Enter your name" disabled></sp-textfield>
        <sp-textfield
            placeholder="Enter your name"
            pattern="[\\w\\s]*"
            required
            value="A valid input"
        ></sp-textfield>
        <sp-textfield
            placeholder="Enter your name"
            pattern="[\\w\\s]*"
            required
            value="A valid input"
            disabled
        ></sp-textfield>
        <sp-textfield
            placeholder="Enter your name"
            pattern="[\\d]*"
            value="Not a valid input"
        ></sp-textfield>
        <sp-textfield
            placeholder="Enter your name"
            pattern="^[\\d]$"
            required
            value="Not a valid input"
            disabled
        ></sp-textfield>
    `;
};

export const notRequiredWithPattern = (): TemplateResult => {
    return html`
        <sp-textfield
            placeholder="Enter z, x, c, or v"
            pattern="[zxcv]+"
        ></sp-textfield>
    `;
};

export const allowedKeys = (): TemplateResult => {
    return html`
        <sp-textfield
            placeholder="Enter your name"
            allowed-keys="a-z"
        ></sp-textfield>
    `;
};

export const readonly = (): TemplateResult => html`
    <sp-textfield
        label="Enter your life story"
        value="A readonly textfield"
        readonly
        placeholder="Enter your life story"
    ></sp-textfield>
`;
