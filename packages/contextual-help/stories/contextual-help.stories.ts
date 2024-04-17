/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, TemplateResult } from '@spectrum-web-components/base';

import '../sp-contextual-help.js';
import '@spectrum-web-components/link/sp-link.js';
import { spreadProps } from '../../../test/lit-helpers.js';
import type { Placement } from '@spectrum-web-components/overlay/src/overlay-types.js';

interface StoryArgs {
    label: string;
    variant: 'info' | 'help';
    headlint: string;
    placement: Placement;
    [key: string]: unknown;
}

export default {
    title: 'Contextual Help',
    component: 'sp-contextual-help',
    args: {
        label: false,
        variant: 'info',
        headline: undefined,
        placement: undefined,
    },
    argTypes: {
        variant: {
            name: 'variant',
            type: { name: 'string', required: false },
            description: '',
            table: {
                defaultValue: { summary: 'info' },
            },
            options: ['info', 'help'],
            control: {
                type: 'radio',
            },
        },
        label: {
            name: 'label',
            type: { name: 'string', required: false },
            table: {
                type: { summary: 'label' },
                defaultValue: { summary: `'Help' | 'Info'` },
            },
            control: 'text',
        },
        headline: {
            name: 'headline',
            type: { name: 'string', required: false },
            table: {
                type: { summary: 'headline' },
                defaultValue: { summary: '' },
            },
            control: 'text',
        },
        placement: {
            name: 'placement',
            type: { name: 'string', required: false },
            description:
                'The placement of the popover content in relation to the button',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'bottom-start' },
            },
            control: {
                type: 'select',
                labels: {
                    top: 'top',
                    'top-start': 'top-start',
                    'top-end': 'top-end',
                    right: 'right',
                    'right-start': 'right-start',
                    'right-end': 'right-end',
                    bottom: 'bottom',
                    'bottom-start': 'bottom-start',
                    'bottom-end': 'bottom-end',
                    left: 'left',
                    'left-start': 'left-start',
                    'left-end': 'left-end',
                },
            },
            options: [
                'top',
                'top-start',
                'top-end',
                'right',
                'right-start',
                'right-end',
                'bottom',
                'bottom-start',
                'bottom-end',
                'left',
                'left-start',
                'left-end',
            ],
        },
    },
};

export const Default = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-contextual-help headline="Test" ${spreadProps(args)}>
            <div>
                Unless required by applicable law or agreed to in writing,
                software distributed under the License is distributed on an "AS
                IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS OF
                <b>ANY KIND</b>
                , either express or implied.
            </div>
            <sp-link
                slot="link"
                href="https://opensource.adobe.com/spectrum-web-components/"
            >
                Learn more
            </sp-link>
        </sp-contextual-help>
    `;
};

export const Help = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-contextual-help headline="Test" ${spreadProps(args)}>
            <div>
                Unless required by applicable law or agreed to in writing,
                software distributed under the License is distributed on an "AS
                IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS OF
                <b>ANY KIND</b>
                , either express or implied.
            </div>
            <sp-link
                slot="link"
                href="https://opensource.adobe.com/spectrum-web-components/"
            >
                Learn more
            </sp-link>
        </sp-contextual-help>
    `;
};

Help.args = {
    variant: 'help',
};

export const CustomPlacement = (args: StoryArgs): TemplateResult => {
    return html`
        <div
            style="width: 100%; height: 500px; display: flex; align-items: center; justify-content: center"
        >
            <sp-contextual-help headline="Test" ${spreadProps(args)}>
                <div>
                    Unless required by applicable law or agreed to in writing,
                    software distributed under the License is distributed on an
                    "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS OF
                    <b>ANY KIND</b>
                    , either express or implied.
                </div>
                <sp-link
                    slot="link"
                    href="https://opensource.adobe.com/spectrum-web-components/"
                >
                    Learn more
                </sp-link>
            </sp-contextual-help>
        </div>
    `;
};

CustomPlacement.args = {
    placement: 'top',
};
