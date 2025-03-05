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

import type { Meta } from '@storybook/web-components';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-close.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-down.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help.js';
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tab-panel.js';
import { html, TemplateResult } from '@spectrum-web-components/base';
import type { Properties } from './args.js';
import { args, argTypes } from './args.js';

const meta: Meta<Properties> = {
    component: 'sp-tabs',
    title: 'Tabs/Sizes/Vertical',
    argTypes,
    args: {
        ...args,
        direction: 'vertical',
    },
};

const panels = (): TemplateResult => html`
    <sp-tab-panel value="1">Content for "Really Long Name"</sp-tab-panel>
    <sp-tab-panel value="2">Content for tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for tab 4</sp-tab-panel>
`;

const Template = (args: Properties): TemplateResult => {
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

export const s = Template.bind({});
s.args = {
    size: 's',
};

export const m = Template.bind({});
m.args = {
    size: 'm',
};

export const l = Template.bind({});
l.args = {
    size: 'l',
};

export const XL = Template.bind({});
XL.args = {
    size: 'XL',
};

export default meta;
