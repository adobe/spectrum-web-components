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
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-close.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-down.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help.js';
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tab-panel.js';
import { html, TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-tabs',
    title: 'Tabs/Sizes/Vertical',
    argTypes: {
        direction: {
            name: 'direction',
            type: { name: 'string', required: false },
            description: 'The direction of the Tabs element',
            table: {
                type: {
                    summary: '"vertical" | "vertical-right" | "horizontal"',
                },
                defaultValue: { summary: 'horizontal' },
            },
            control: {
                type: 'text',
            },
        },
        auto: { control: 'boolean' },
        size: {
            name: 'size',
            type: { name: 'string', required: false },
            description: 'The size at which to display the Tabs element',
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
        direction: 'vertical',
        auto: false,
        size: 'm',
    },
};

interface Properties {
    direction?: 'vertical' | 'vertical-right' | 'horizontal';
    auto?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
}

const panels = (): TemplateResult => html`
    <sp-tab-panel value="1">Content for "Really Long Name"</sp-tab-panel>
    <sp-tab-panel value="2">Content for tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for tab 4</sp-tab-panel>
`;

const template = (args: Properties): TemplateResult => {
    return html`
        <sp-tabs
            selected="1"
            size=${args.size}
            ?auto=${args.auto}
            label="Demo Tabs"
            direction=${args.direction}
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
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
