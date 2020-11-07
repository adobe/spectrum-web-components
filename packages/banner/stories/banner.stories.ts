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
import { html } from 'lit-html';
import { TemplateResult } from '@spectrum-web-components/base';

import '../sp-banner.js';
import { Story } from '../../../.storybook/types';

export default {
    component: 'sp-banner',
    title: 'Banner',
    argTypes: {
        header: { control: 'text' },
        content: { control: 'text' },
        type: {
            control: {
                type: 'inline-radio',
                options: ['info', 'warning', 'error'],
            },
        },
        inCorner: { control: 'boolean' },
    },
    args: {
        header: 'Header text',
        content: 'Content of the banner!',
        type: 'info',
    },
};

interface StoryArgs {
    header: string;
    content: string;
    type: 'info' | 'warning' | 'error';
    inCorner: boolean;
}

const Template: Story<StoryArgs> = ({ header, content, type, inCorner }) => {
    return html`
        <div style="margin: -8px 0;">
            <div
                style="width: 300px; height: 200px; background-color: #ccc; position: relative; margin: 20px;"
            >
                <sp-banner type="${type}" ?corner=${inCorner}>
                    <div slot="header">${header}</div>
                    <div slot="content">${content}</div>
                </sp-banner>
            </div>
        </div>
    `;
};

export const Default = Template.bind({});

export const bannerTypes = (): TemplateResult => {
    return html`
        <sp-banner type="info">
            <div slot="header">Header Text</div>
            <div slot="content">Content of the banner!</div>
        </sp-banner>
        <sp-banner type="warning">
            <div slot="header">Header Text</div>
            <div slot="content">Content of the banner!</div>
        </sp-banner>
        <sp-banner type="error">
            <div slot="header">Header Text</div>
            <div slot="content">Content of the banner!</div>
        </sp-banner>
    `;
};

bannerTypes.storyName = 'Banner Types';

export const cornerPlacement = (): TemplateResult => {
    return html`
        <div style="margin: -8px 0;">
            <div
                style="width: 300px; height: 200px; background-color: #ccc; position: relative; margin: 20px;"
            >
                <sp-banner corner>
                    <div slot="header">A corner banner!</div>
                    <div slot="content">Content of the banner!</div>
                </sp-banner>
            </div>
        </div>
    `;
};

cornerPlacement.storyName = 'Corner Placement';
