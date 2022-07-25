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
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/field-group/sp-field-group.js';
import { html, TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-checkbox',
    title: 'Checkbox',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-checkbox>Checkbox</sp-checkbox>
    `;
};

export const readonly = (): TemplateResult => {
    return html`
        <sp-checkbox checked readonly>Checkbox</sp-checkbox>
    `;
};

export const Indeterminate = (): TemplateResult => {
    return html`
        <sp-checkbox indeterminate>Checkbox</sp-checkbox>
    `;
};

export const Checked = (): TemplateResult => {
    return html`
        <sp-checkbox checked>Checkbox</sp-checkbox>
    `;
};

export const emphasized = (): TemplateResult => {
    return html`
        <sp-checkbox emphasized>Checkbox</sp-checkbox>
    `;
};

export const emphasizedIndeterminate = (): TemplateResult => {
    return html`
        <sp-checkbox emphasized indeterminate>Checkbox</sp-checkbox>
    `;
};

export const emphasizedChecked = (): TemplateResult => {
    return html`
        <sp-checkbox emphasized checked>Checkbox</sp-checkbox>
    `;
};

export const emphasizedInvalid = (): TemplateResult => {
    return html`
        <sp-checkbox emphasized invalid>Checkbox</sp-checkbox>
    `;
};

export const emphasizedInvalidIndeterminate = (): TemplateResult => {
    return html`
        <sp-checkbox emphasized invalid indeterminate>Checkbox</sp-checkbox>
    `;
};

export const emphasizedInvalidChecked = (): TemplateResult => {
    return html`
        <sp-checkbox emphasized invalid checked>Checkbox</sp-checkbox>
    `;
};

export const Invalid = (): TemplateResult => {
    return html`
        <sp-checkbox invalid>Checkbox</sp-checkbox>
    `;
};

export const invalidIndeterminate = (): TemplateResult => {
    return html`
        <sp-checkbox invalid indeterminate>Checkbox</sp-checkbox>
    `;
};

export const invalidChecked = (): TemplateResult => {
    return html`
        <sp-checkbox invalid checked>Checkbox</sp-checkbox>
    `;
};

export const Autofocus = (): TemplateResult => {
    return html`
        <sp-checkbox autofocus>Checkbox</sp-checkbox>
    `;
};

export const Disabled = (): TemplateResult => {
    return html`
        <sp-checkbox disabled>Checkbox</sp-checkbox>
    `;
};

export const disabledChecked = (): TemplateResult => {
    return html`
        <sp-checkbox disabled checked>Checkbox</sp-checkbox>
    `;
};

export const disabledIndeterminate = (): TemplateResult => {
    return html`
        <sp-checkbox disabled indeterminate>Checkbox</sp-checkbox>
    `;
};

export const emphasizedDisabled = (): TemplateResult => {
    return html`
        <sp-checkbox emphasized disabled>Checkbox</sp-checkbox>
    `;
};

export const emphasizedDisabledIndeterminate = (): TemplateResult => {
    return html`
        <sp-checkbox emphasized disabled indeterminate>Checkbox</sp-checkbox>
    `;
};

export const emphasizedDisabledChecked = (): TemplateResult => {
    return html`
        <sp-checkbox emphasized checked>Checkbox</sp-checkbox>
    `;
};

export const tabIndexExample = (): TemplateResult => {
    return html`
        <sp-field-group horizontal>
            <sp-checkbox tabindex="0">Checkbox 0</sp-checkbox>
            <sp-checkbox disabled tabindex="3">Checkbox 3</sp-checkbox>
            <sp-checkbox tabindex="4">Checkbox 4</sp-checkbox>
            <sp-checkbox tabindex="2" autofocus>Checkbox 2</sp-checkbox>
            <sp-checkbox tabindex="1">Checkbox 1</sp-checkbox>
        </sp-field-group>
    `;
};

export const verticalTabIndexExample = (): TemplateResult => {
    return html`
        <sp-field-group vertical>
            <sp-checkbox tabindex="0">Checkbox 0</sp-checkbox>
            <sp-checkbox disabled tabindex="3">Checkbox 3</sp-checkbox>
            <sp-checkbox tabindex="4">Checkbox 4</sp-checkbox>
            <sp-checkbox tabindex="2" autofocus>Checkbox 2</sp-checkbox>
            <sp-checkbox tabindex="1">Checkbox 1</sp-checkbox>
        </sp-field-group>
    `;
};
