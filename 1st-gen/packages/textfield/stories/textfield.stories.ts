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

import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';

export default {
    component: 'sp-textfield',
    title: 'Textfield',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-textfield label="Name" placeholder="Enter your name"></sp-textfield>
        <sp-textfield
            label="Name"
            placeholder="Enter your name"
            disabled
        ></sp-textfield>
        <sp-textfield
            label="Name"
            placeholder="Enter your name"
            pattern="[\\w\\s]*"
            required
            value="A valid input"
        ></sp-textfield>
        <sp-textfield
            label="Name"
            placeholder="Enter your name"
            pattern="[\\w\\s]*"
            required
            value="A valid input"
            disabled
        ></sp-textfield>
        <sp-textfield
            label="Name"
            placeholder="Enter your name"
            pattern="[\\d]*"
            value="Not a valid input"
        ></sp-textfield>
        <sp-textfield
            label="Name"
            placeholder="Enter your name"
            pattern="^[\\d]$"
            required
            value="Not a valid input"
            disabled
        ></sp-textfield>
    `;
};

export const growsOnly = (): TemplateResult => {
    return html`
        <sp-textfield
            grows
            id="grows-only"
            placeholder="Does not grow or display incorrectly"
            style="--mod-field-label-width: 400px;"
        >
            This Textfield has the "grows" attribute without the "multiline"
            attribute
        </sp-textfield>
    `;
};

export const quiet = (): TemplateResult => {
    return html`
        <sp-textfield
            id="name"
            placeholder="This Text Field doesn't make much noise"
            quiet
        >
            Enter your name
        </sp-textfield>
    `;
};

export const defaultAutofocus = (): TemplateResult => {
    return html`
        <sp-textfield
            id="name"
            placeholder="Include your first and last name"
            autofocus
        >
            Enter your name
        </sp-textfield>
    `;
};

export const quietAutofocus = (): TemplateResult => {
    return html`
        <sp-textfield
            id="name"
            placeholder="Include your first and last name"
            autofocus
            quiet
        >
            Enter your name
        </sp-textfield>
    `;
};

export const notRequiredWithPattern = (): TemplateResult => {
    return html`
        <sp-textfield
            label="Letter z, x, c, or v"
            placeholder="Enter z, x, c, or v"
            pattern="[zxcv]+"
        ></sp-textfield>
    `;
};

export const allowedKeys = (): TemplateResult => {
    return html`
        <sp-textfield
            label="Name"
            placeholder="Enter your name"
            allowed-keys="a-z"
        ></sp-textfield>
    `;
};

export const withNameAttribute = (): TemplateResult => {
    return html`
        <sp-textfield
            name="name"
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

export const types = (): TemplateResult => html`
    <sp-textfield label="Default" placeholder="default (text)"></sp-textfield>
    <sp-textfield label="Text" type="text" placeholder="text"></sp-textfield>
    <sp-textfield label="URL" type="url" placeholder="url"></sp-textfield>
    <sp-textfield label="Tel" type="tel" placeholder="tel"></sp-textfield>
    <sp-textfield
        label="E-Mail"
        type="email"
        placeholder="email"
    ></sp-textfield>
    <sp-textfield
        label="Password"
        type="password"
        placeholder="password"
    ></sp-textfield>
`;

export const empty = (): TemplateResult => html`
    <sp-textfield id="empty" placeholder="You can type here">
        This textfield hasn't been used yet
        <sp-help-text slot="help-text">
            Even empty Textfield display correctly while waiting for content.
        </sp-help-text>
    </sp-textfield>
`;

export const sized = (): TemplateResult => html`
    <sp-textfield
        id="sized"
        placeholder="You can type here"
        style="width: 400px"
    >
        This textfield hasn't been used yet
        <sp-help-text slot="help-text">
            Even empty Textfield display correctly while waiting for content.
        </sp-help-text>
    </sp-textfield>
`;
