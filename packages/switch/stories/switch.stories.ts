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

import '../sp-switch.js';
import { TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-switch',
    title: 'Switch',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-switch @click="${action('Click')}" @change="${action('Change')}">
            Switch
        </sp-switch>
    `;
};

export const Checked = (): TemplateResult => {
    return html`
        <sp-switch
            checked
            @click="${action('Click')}"
            @change="${action('Change')}"
        >
            Switch
        </sp-switch>
    `;
};

export const Quiet = (): TemplateResult => {
    return html`
        <sp-switch
            quiet
            @click="${action('Click')}"
            @change="${action('Change')}"
        >
            Switch
        </sp-switch>
    `;
};

export const quietChecked = (): TemplateResult => {
    return html`
        <sp-switch
            quiet
            checked
            @click="${action('Click')}"
            @change="${action('Change')}"
        >
            Switch
        </sp-switch>
    `;
};

quietChecked.story = {
    name: 'Quiet checked',
};

export const Autofocus = (): TemplateResult => {
    return html`
        <sp-switch
            autofocus
            @click="${action('Click')}"
            @change="${action('Change')}"
        >
            Switch
        </sp-switch>
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

disabledChecked.story = {
    name: 'Disabled checked',
};
