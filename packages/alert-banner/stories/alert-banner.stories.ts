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
import '@spectrum-web-components/alert-banner/sp-alert-banner.js';
import '@spectrum-web-components/button/sp-button.js';

interface Properties {
    text: string;
    variant: '' | 'info' | 'negative';
    dismissible: boolean;
    open: boolean;
    onClose: (event: Event) => void;
}

export default {
    title: 'Alert Banner',
    component: 'sp-alert-banner',
    args: {
        text: 'Your trial has expired',
        dismissible: true,
        open: true,
    },
    argTypes: {
        text: {
            name: 'text',
            type: { name: 'string', required: false },
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
            control: 'text',
        },
        dismissible: {
            name: 'dismissible',
            type: { name: 'boolean', required: false },
            description:
                'Whether to include an icon-only close button to dismiss it',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        open: {
            name: 'open',
            type: { name: 'boolean', required: false },
            description: 'Whether the alert banner is open',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
    },
};

const alertBanner = ({
    text = '',
    variant = '',
    dismissible = true,
    open = true,
}): TemplateResult => html`
    <sp-alert-banner
        variant=${variant}
        ?dismissible=${dismissible}
        ?open=${open}
    >
        ${text}
        <sp-button treatment="outline" static="white" slot="action">
            Action
        </sp-button>
    </sp-alert-banner>
`;

export const Default = (args: Properties): TemplateResult => alertBanner(args);

export const Info = (args: Properties): TemplateResult =>
    alertBanner({
        ...args,
        variant: 'info',
        text: 'Your trial will expire in 3 days',
    });

export const Negative = (args: Properties): TemplateResult =>
    alertBanner({
        ...args,
        variant: 'negative',
        text: 'Connection interupted. Check your network to continue',
    });

export const TextWrapping = (args: Properties): TemplateResult =>
    html`
        <div style="width:800px;">
            ${alertBanner({
                ...args,
                variant: 'info',
                text: ` Your trial will expire in 3 days. Please purchase to continue.
Your work has been saved and is ready for you to open again once
you have purchased the software.`,
            })}
        </div>
    `;
