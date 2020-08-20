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
import { html, action } from '@open-wc/demoing-storybook';

import '../';
import { TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-checkbox',
    title: 'Checkbox',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-checkbox @click="${action('Click')}" @change="${action('Change')}">
            Checkbox
        </sp-checkbox>
    `;
};

export const Checked = (): TemplateResult => {
    return html`
        <sp-checkbox checked>Checkbox</sp-checkbox>
    `;
};

export const Indeterminate = (): TemplateResult => {
    return html`
        <sp-checkbox indeterminate>Checkbox</sp-checkbox>
    `;
};

export const Quiet = (): TemplateResult => {
    return html`
        <sp-checkbox quiet>Checkbox</sp-checkbox>
    `;
};

export const quietChecked = (): TemplateResult => {
    return html`
        <sp-checkbox quiet checked>Checkbox</sp-checkbox>
    `;
};

quietChecked.story = {
    name: 'Quiet checked',
};

export const quietIndeterminate = (): TemplateResult => {
    return html`
        <sp-checkbox quiet indeterminate>Checkbox</sp-checkbox>
    `;
};

quietIndeterminate.story = {
    name: 'Quiet indeterminate',
};

export const Autofocus = (): TemplateResult => {
    return html`
        <sp-checkbox autofocus>Checkbox</sp-checkbox>
    `;
};

export const Invalid = (): TemplateResult => {
    return html`
        <sp-checkbox invalid>Checkbox</sp-checkbox>
    `;
};

export const invalidChecked = (): TemplateResult => {
    return html`
        <sp-checkbox invalid checked>Checkbox</sp-checkbox>
    `;
};

invalidChecked.story = {
    name: 'Invalid checked',
};

export const invalidIndeterminate = (): TemplateResult => {
    return html`
        <sp-checkbox invalid indeterminate>Checkbox</sp-checkbox>
    `;
};

invalidIndeterminate.story = {
    name: 'Invalid indeterminate',
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

disabledChecked.story = {
    name: 'Disabled checked',
};

export const disabledIndeterminate = (): TemplateResult => {
    return html`
        <sp-checkbox disabled indeterminate>Checkbox</sp-checkbox>
    `;
};

disabledIndeterminate.story = {
    name: 'Disabled indeterminate',
};

export const tabIndexExample = (): TemplateResult => {
    return html`
        <sp-checkbox tabindex="0">Checkbox 0</sp-checkbox>
        <sp-checkbox disabled tabindex="3">Checkbox 3</sp-checkbox>
        <sp-checkbox tabindex="4">Checkbox 4</sp-checkbox>
        <sp-checkbox tabindex="2" autofocus>Checkbox 2</sp-checkbox>
        <sp-checkbox tabindex="1">Checkbox 1</sp-checkbox>
    `;
};

tabIndexExample.story = {
    name: 'Tab index example',
};
