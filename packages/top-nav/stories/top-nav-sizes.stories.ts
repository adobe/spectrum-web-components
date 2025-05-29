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
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-close.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-down.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help.js';
import '@spectrum-web-components/top-nav/sp-top-nav.js';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
import { html, TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-top-nav',
    title: 'Top Nav/Sizes',
    argTypes: {
        size: {
            name: 'size',
            type: { name: 'string', required: false },
            description: 'The size at which to display the Top Nav element',
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

interface Properties {
    size?: 's' | 'm' | 'l' | 'xl';
}

const template = (args: Properties): TemplateResult => {
    return html`
        <sp-top-nav selected="1" size=${args.size} label="Demo Top Nav">
            <sp-top-nav-item value="1">Item 1</sp-top-nav-item>
            <sp-top-nav-item value="2">Item 2</sp-top-nav-item>
            <sp-top-nav-item value="3">Item 3</sp-top-nav-item>
            <sp-top-nav-item value="4">Item 4</sp-top-nav-item>
        </sp-top-nav>
    `;
};

export const s = (args: Properties): TemplateResult => template(args);
s.args = {
    size: 's',
};

export const m = (args: Properties): TemplateResult => template(args);
m.args = {
    size: 'm',
};

export const l = (args: Properties): TemplateResult => template(args);
l.args = {
    size: 'l',
};

export const XL = (args: Properties): TemplateResult => template(args);
XL.args = {
    size: 'XL',
};
