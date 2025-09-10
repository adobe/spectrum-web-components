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

import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import '@swc/components/alert-banner';

const meta: Meta = {
    title: 'Components/AlertBanner',
    component: 'swc-alert-banner',
    args: {
        text: 'Your trial has expired',
        dismissible: true,
        open: true,
        variant: 'neutral',
    },
    argTypes: {
        text: {
            name: 'text',
            type: { name: 'string', required: false },
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Your trial has expired' },
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
                defaultValue: { summary: true },
            },
            control: { type: 'boolean' },
        },
        open: {
            name: 'open',
            type: { name: 'boolean', required: false },
            description: 'Whether the alert banner is open',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
            control: { type: 'boolean' },
        },
        variant: {
            name: 'variant',
            type: { name: 'string', required: false },
            description: 'The visual variant of the alert banner',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'neutral' },
            },
            control: {
                labels: {
                    neutral: 'Neutral',
                    info: 'Info',
                    negative: 'Negative',
                },
                type: 'select',
            },
            options: ['neutral', 'info', 'negative'],
        },
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => html`
        <sp-alert-banner dismissible open>
            All documents in this folder have been archived
        </sp-alert-banner>
    `,
};
