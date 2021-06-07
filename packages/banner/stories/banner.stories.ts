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
import { spreadProps } from '../../../test/lit-helpers.js';
import { html, TemplateResult } from '@spectrum-web-components/base';

import '../sp-banner.js';

export default {
    component: 'sp-banner',
    title: 'Banner',
    argTypes: {
        header: {
            name: 'header',
            description: 'Primary message of the banner.',
            type: { name: 'string', required: false },
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
            control: 'text',
        },
        content: {
            name: 'content',
            description:
                'Secondary message of the banner. Used to provide a description.',
            type: { name: 'string', required: false },
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
            control: 'text',
        },
        type: {
            name: 'type',
            description: 'Determines the style of the banner.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'info' },
            },
            control: {
                type: 'inline-radio',
                options: ['info', 'warning', 'error'],
            },
        },
        inCorner: {
            name: 'inCorner',
            type: { name: 'boolean', required: false },
            description:
                'Determines if banner sets position at upper right corner or not.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
    },
    args: {
        header: 'Header Text',
        content: 'Content of the banner!',
        inCorner: false,
        type: 'info',
    },
};

interface StoryArgs {
    header?: string;
    content?: string;
    type?: 'info' | 'warning' | 'error';
    inCorner?: boolean;
    [prop: string]: any;
}

const Template = ({
    header = 'Header text',
    content = 'Content of the banner!',
    type = 'info',
    inCorner,
}: StoryArgs = {}): TemplateResult => {
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

export const Default = (args: StoryArgs): TemplateResult => Template(args);

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

export const cornerPlacement = (args: StoryArgs): TemplateResult => {
    return html`
        <div style="margin: -8px 0;">
            <div
                style="width: 300px; height: 200px; background-color: #ccc; position: relative; margin: 20px;"
            >
                <sp-banner ${spreadProps(args)}>
                    <div slot="header">${args.header}</div>
                    <div slot="content">${args.content}</div>
                </sp-banner>
            </div>
        </div>
    `;
};
cornerPlacement.args = {
    inCorner: true,
    header: 'A corner banner!',
    content: 'Content of the banner!',
};

cornerPlacement.storyName = 'Corner Placement';
