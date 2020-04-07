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
import { html, radios } from '@open-wc/demoing-storybook';
import '../../icon';
import '../../icons';
import '../../tab-list';
import '../';
import { TemplateResult } from 'lit-html';

export default {
    component: 'sp-tab-list',
    title: 'Tabs',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-tab-list selected="1">
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            <sp-tab label="Really Long Name" value="1" selected></sp-tab>
        </sp-tab-list>
    `;
};

export const Autofocus = (): TemplateResult => {
    return html`
        <sp-tab-list selected="1" autofocus>
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `;
};

export const Vertical = (): TemplateResult => {
    return html`
        <sp-tab-list selected="1" direction="vertical">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `;
};

export const VerticalSized = (): TemplateResult => {
    return html`
        <style>
            sp-tab-list {
                height: 75vh;
                flex-direction: column;
                justify-content: center;
            }
        </style>
        <sp-tab-list selected="1" direction="vertical">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `;
};

export const VerticalRight = (): TemplateResult => {
    return html`
        <style>
            sp-tab-list {
                height: 75vh;
                flex-direction: column;
                justify-content: center;
            }
        </style>
        <sp-tab-list selected="1" direction="vertical-right">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `;
};

export const Icons = (): TemplateResult => {
    const directions = {
        horizontal: 'horizontal',
        vertical: 'vertical',
    };
    const type = radios('List Type', directions, directions.horizontal);
    const tabType = radios('Tab Type', directions, directions.horizontal);
    return html`
        <sp-icons-medium></sp-icons-medium>
        <sp-tab-list selected="1" direction="${type}">
            <sp-tab
                label="Tab 1"
                value="1"
                ?vertical=${tabType === directions.vertical}
            >
                <sp-icon
                    slot="icon"
                    size="s"
                    name="ui:CheckmarkSmall"
                ></sp-icon>
            </sp-tab>
            <sp-tab
                label="Tab 2"
                value="2"
                ?vertical=${tabType === directions.vertical}
            >
                <sp-icon slot="icon" size="s" name="ui:CrossSmall"></sp-icon>
            </sp-tab>
            <sp-tab
                label="Tab 3"
                value="3"
                ?vertical=${tabType === directions.vertical}
            >
                <sp-icon
                    slot="icon"
                    size="s"
                    name="ui:ChevronDownSmall"
                ></sp-icon>
            </sp-tab>
            <sp-tab
                label="Tab 4"
                value="4"
                ?vertical=${tabType === directions.vertical}
            >
                <sp-icon slot="icon" size="s" name="ui:HelpSmall"></sp-icon>
            </sp-tab>
        </sp-tab-list>
    `;
};

export const IconsOnly = (): TemplateResult => {
    const directions = {
        horizontal: 'horizontal',
        vertical: 'vertical',
    };
    const type = radios('List Type', directions, directions.horizontal);
    const tabType = radios('Tab Type', directions, directions.horizontal);
    return html`
        <sp-icons-medium></sp-icons-medium>
        <sp-tab-list selected="1" direction="${type}">
            <sp-tab
                aria-label="Tab 1"
                value="1"
                ?vertical=${tabType === directions.vertical}
            >
                <sp-icon
                    slot="icon"
                    size="s"
                    name="ui:CheckmarkSmall"
                ></sp-icon>
            </sp-tab>
            <sp-tab
                aria-label="Tab 2"
                value="2"
                ?vertical=${tabType === directions.vertical}
            >
                <sp-icon slot="icon" size="s" name="ui:CrossSmall"></sp-icon>
            </sp-tab>
            <sp-tab
                aria-label="Tab 3"
                value="3"
                ?vertical=${tabType === directions.vertical}
            >
                <sp-icon
                    slot="icon"
                    size="s"
                    name="ui:ChevronDownSmall"
                ></sp-icon>
            </sp-tab>
            <sp-tab
                aria-label="Tab 4"
                value="4"
                ?vertical=${tabType === directions.vertical}
            >
                <sp-icon slot="icon" size="s" name="ui:HelpSmall"></sp-icon>
            </sp-tab>
        </sp-tab-list>
    `;
};

export const iconsIi = (): TemplateResult => {
    return html`
        <sp-icons-medium></sp-icons-medium>
        <sp-tab-list selected="1" direction="vertical">
            <sp-tab label="Tab 1" value="1" vertical>
                <sp-icon
                    slot="icon"
                    size="s"
                    name="ui:CheckmarkSmall"
                ></sp-icon>
            </sp-tab>
            <sp-tab label="Tab 2" value="2" vertical>
                <sp-icon slot="icon" size="s" name="ui:CrossSmall"></sp-icon>
            </sp-tab>
            <sp-tab label="Tab 3" value="3" vertical>
                <sp-icon
                    slot="icon"
                    size="s"
                    name="ui:ChevronDownSmall"
                ></sp-icon>
            </sp-tab>
            <sp-tab label="Tab 4" value="4" vertical>
                <sp-icon slot="icon" size="s" name="ui:HelpSmall"></sp-icon>
            </sp-tab>
        </sp-tab-list>
    `;
};

iconsIi.story = {
    name: 'Icons II',
};

export const Quiet = (): TemplateResult => {
    const directions = {
        horizontal: 'horizontal',
        vertical: 'vertical',
    };
    const type = radios('Type', directions, directions.horizontal);
    return html`
        <sp-tab-list selected="1" quiet direction="${type}">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `;
};

export const Compact = (): TemplateResult => {
    const directions = {
        horizontal: 'horizontal',
        vertical: 'vertical',
    };
    const type = radios('Type', directions, directions.horizontal);
    return html`
        <sp-tab-list selected="1" compact direction="${type}">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `;
};

export const quietCompact = (): TemplateResult => {
    const directions = {
        horizontal: 'horizontal',
        vertical: 'vertical',
    };
    const type = radios('Type', directions, directions.horizontal) as
        | 'vertical'
        | 'horizontal';
    return html`
        <sp-tab-list selected="1" quiet compact direction="${type}">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `;
};

quietCompact.story = {
    name: 'Quiet Compact',
};
