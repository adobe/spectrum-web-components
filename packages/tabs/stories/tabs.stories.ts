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
import '../sp-tabs.js';
import '../sp-tab.js';
import { html, TemplateResult } from '@spectrum-web-components/base';

export default {
    component: 'sp-tabs',
    title: 'Tabs',
    argTypes: {
        verticalTabs: { control: 'boolean' },
        verticalTab: { control: 'boolean' },
    },
    args: {
        type: false,
        verticalTab: false,
    },
};

interface Properties {
    verticalTabs?: boolean;
    verticalTab?: boolean;
}

export const Default = (): TemplateResult => {
    return html`
        <sp-tabs selected="1">
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            <sp-tab label="Really Long Name" value="1" selected></sp-tab>
        </sp-tabs>
    `;
};

export const Autofocus = (): TemplateResult => {
    return html`
        <sp-tabs selected="1" autofocus>
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tabs>
    `;
};

export const Vertical = (): TemplateResult => {
    return html`
        <sp-tabs selected="1" direction="vertical">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tabs>
    `;
};

export const VerticalSized = (): TemplateResult => {
    return html`
        <style>
            sp-tabs {
                height: 75vh;
                flex-direction: column;
                justify-content: center;
            }
        </style>
        <sp-tabs selected="1" direction="vertical">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tabs>
    `;
};

export const VerticalRight = (): TemplateResult => {
    return html`
        <style>
            sp-tabs {
                height: 75vh;
                flex-direction: column;
                justify-content: center;
            }
        </style>
        <sp-tabs selected="1" direction="vertical-right">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tabs>
    `;
};

export const Icons = ({
    verticalTabs,
    verticalTab,
}: Properties): TemplateResult => {
    return html`
        <sp-tabs
            selected="1"
            direction="${verticalTabs ? 'vertical' : 'horizontal'}"
        >
            <sp-tab label="Tab 1" value="1" ?vertical=${verticalTab}>
                <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
            </sp-tab>
            <sp-tab label="Tab 2" value="2" ?vertical=${verticalTab}>
                <sp-icon-close slot="icon"></sp-icon-close>
            </sp-tab>
            <sp-tab label="Tab 3" value="3" ?vertical=${verticalTab}>
                <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
            </sp-tab>
            <sp-tab label="Tab 4" value="4" ?vertical=${verticalTab}>
                <sp-icon-help slot="icon"></sp-icon-help>
            </sp-tab>
        </sp-tabs>
    `;
};

export const IconsWithSlottedLabel = ({
    verticalTabs,
    verticalTab,
}: Properties): TemplateResult => {
    return html`
        <sp-tabs
            selected="1"
            direction="${verticalTabs ? 'vertical' : 'horizontal'}"
        >
            <sp-tab value="1" ?vertical=${verticalTab}>
                Tab 1
                <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
            </sp-tab>
            <sp-tab value="2" ?vertical=${verticalTab}>
                Tab 2
                <sp-icon-close slot="icon"></sp-icon-close>
            </sp-tab>
            <sp-tab value="3" ?vertical=${verticalTab}>
                Tab 3
                <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
            </sp-tab>
            <sp-tab value="4" ?vertical=${verticalTab}>
                Tab 4
                <sp-icon-help slot="icon"></sp-icon-help>
            </sp-tab>
        </sp-tabs>
    `;
};

export const IconsOnly = ({
    verticalTabs,
    verticalTab,
}: Properties): TemplateResult => {
    return html`
        <sp-tabs
            selected="1"
            direction="${verticalTabs ? 'vertical' : 'horizontal'}"
        >
            <sp-tab aria-label="Tab 1" value="1" ?vertical=${verticalTab}>
                <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
            </sp-tab>
            <sp-tab aria-label="Tab 2" value="2" ?vertical=${verticalTab}>
                <sp-icon-close slot="icon"></sp-icon-close>
            </sp-tab>
            <sp-tab aria-label="Tab 3" value="3" ?vertical=${verticalTab}>
                <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
            </sp-tab>
            <sp-tab aria-label="Tab 4" value="4" ?vertical=${verticalTab}>
                <sp-icon-help slot="icon"></sp-icon-help>
            </sp-tab>
        </sp-tabs>
    `;
};

export const iconsIi = (): TemplateResult => {
    return html`
        <sp-tabs selected="1" direction="vertical">
            <sp-tab label="Tab 1" value="1" vertical>
                <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
            </sp-tab>
            <sp-tab label="Tab 2" value="2" vertical>
                <sp-icon-close slot="icon"></sp-icon-close>
            </sp-tab>
            <sp-tab label="Tab 3" value="3" vertical>
                <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
            </sp-tab>
            <sp-tab label="Tab 4" value="4" vertical>
                <sp-icon-help slot="icon"></sp-icon-help>
            </sp-tab>
        </sp-tabs>
    `;
};

iconsIi.story = {
    name: 'Icons II',
};

export const iconsIii = (): TemplateResult => {
    return html`
        <sp-tabs selected="1" direction="vertical">
            <sp-tab label="Tab 1" value="1">
                <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
            </sp-tab>
            <sp-tab label="Tab 2" value="2">
                <sp-icon-close slot="icon"></sp-icon-close>
            </sp-tab>
            <sp-tab label="Tab 3" value="3">
                <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
            </sp-tab>
            <sp-tab label="Tab 4" value="4">
                <sp-icon-help slot="icon"></sp-icon-help>
            </sp-tab>
        </sp-tabs>
    `;
};

iconsIii.story = {
    name: 'Icons III',
};

export const Quiet = ({ verticalTabs }: Properties): TemplateResult => {
    return html`
        <sp-tabs
            selected="1"
            quiet
            direction="${verticalTabs ? 'vertical' : 'horizontal'}"
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tabs>
    `;
};

export const Compact = ({ verticalTabs }: Properties): TemplateResult => {
    return html`
        <sp-tabs
            selected="1"
            compact
            direction="${verticalTabs ? 'vertical' : 'horizontal'}"
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tabs>
    `;
};

export const quietCompact = ({ verticalTabs }: Properties): TemplateResult => {
    return html`
        <sp-tabs
            selected="1"
            quiet
            compact
            direction="${verticalTabs ? 'vertical' : 'horizontal'}"
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tabs>
    `;
};

quietCompact.story = {
    name: 'Quiet Compact',
};
