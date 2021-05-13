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
import '../sp-switch.js';
import { html, TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-switch',
    title: 'Switch',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-switch>Switch</sp-switch>
    `;
};

export const Checked = (): TemplateResult => {
    return html`
        <sp-switch checked>Switch</sp-switch>
    `;
};

export const readonly = (): TemplateResult => {
    return html`
        <sp-switch checked readonly>Switch</sp-switch>
    `;
};

export const emphasized = (): TemplateResult => {
    return html`
        <sp-switch emphasized>Switch</sp-switch>
    `;
};

export const emphasizedChecked = (): TemplateResult => {
    return html`
        <sp-switch emphasized checked>Switch</sp-switch>
    `;
};

export const Autofocus = (): TemplateResult => {
    return html`
        <sp-switch autofocus>Switch</sp-switch>
    `;
};

export const Disabled = (): TemplateResult => {
    return html`
        <sp-switch disabled>Switch</sp-switch>
    `;
};

export const disabledChecked = (): TemplateResult => {
    return html`
        <sp-switch disabled checked>Switch</sp-switch>
    `;
};
