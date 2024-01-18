/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, TemplateResult } from '@spectrum-web-components/base';

import '../sp-color-field.js';

export default {
    component: 'sp-color-field',
    title: 'Color Field',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-color-field></sp-color-field>
    `;
};

export const Quiet = (): TemplateResult => {
    return html`
        <sp-color-field quiet value="#ff0000"></sp-color-field>
    `;
};

export const ReadOnly = (): TemplateResult => {
    return html`
        <sp-color-field readonly value="#ff0000"></sp-color-field>
    `;
};

export const Disabled = (): TemplateResult => {
    return html`
        <sp-color-field disabled value="#ff0000"></sp-color-field>
    `;
};

export const viewColor = (): TemplateResult => {
    return html`
        <sp-color-field viewColor="true"></sp-color-field>
    `;
};

export const WrongInput = (): TemplateResult => {
    return html`
        <sp-color-field value="not a color"></sp-color-field>
    `;
};

export const RightInput = (): TemplateResult => {
    return html`
        <sp-color-field value="#ff0000"></sp-color-field>
    `;
};
