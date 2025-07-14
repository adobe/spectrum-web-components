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
import '@spectrum-web-components/switch/sp-switch.js';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { spreadProps } from '../../../test/lit-helpers.js';

export default {
    component: 'sp-switch',
    title: 'Switch',

    argTypes: {
        size: {
            name: 'size',
            type: { name: 'string', required: false },
            description: 'The size at which to display the Switch element',
            table: {
                type: { summary: '"s" | "m" | "l" | "xl"' },
                defaultValue: { summary: 'm' },
            },
            control: {
                type: 'text',
            },
        },
    },
    args: {
        size: 'm',
    },
};

export interface StoryArgs {
    Autofocus?: boolean;
    checked?: boolean;
    Disabled?: boolean;
    disabledChecked?: boolean;
    emphasized?: boolean;
    readonly?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    [prop: string]: unknown;
}

function renderSwitch(args: StoryArgs): TemplateResult {
    return html`
        <sp-switch ${spreadProps(args)}>Switch</sp-switch>
    `;
}

export const Default = (args: StoryArgs): TemplateResult => renderSwitch(args);

export const Checked = (): TemplateResult => {
    return html`
        <sp-switch checked>Switch</sp-switch>
    `;
};

export const Sizes = (): TemplateResult => {
    return html`
        <div style="display: flex; align-items: center; gap: 8px;">
            <sp-switch size="s">Small</sp-switch>
            <sp-switch size="m">Medium</sp-switch>
            <sp-switch size="l">Large</sp-switch>
            <sp-switch size="xl">Extra-Large</sp-switch>
        </div>
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
