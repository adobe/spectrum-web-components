/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import type { ArgTypes } from '@storybook/web-components';
import type { ElementSize } from '@spectrum-web-components/theme';

export interface Properties {
    compact?: boolean;
    emphasized?: boolean;
    justified?: boolean;
    quiet?: boolean;
    vertical?: boolean;
    selects?: 'none' | 'single' | 'multiple';
    size?: ElementSize;
    [prop: string]: unknown;
}

export const argTypes: ArgTypes = {
    compact: {
        name: 'compact',
        description: 'Visually joins the buttons together to clarify their relationship to one another.',
        type: { name: 'boolean', required: false },
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    emphasized: {
        name: 'emphasized',
        type: { name: 'boolean', required: false },
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    justified: {
        name: 'justified',
        description:
            'Aligns the action group items to use all the available space on that line.',
        type: { name: 'boolean', required: false },
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    quiet: {
        name: 'quiet',
        type: { name: 'boolean', required: false },
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    vertical: {
        name: 'vertical',
        description: 'Changes the orientation of the action group.',
        type: { name: 'boolean', required: false },
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    selects: {
        name: 'selects',
        description:
            'Whether the elements selects its children and how many it can select at a time.',
        table: {
            defaultValue: { summary: '' },
        },
        control: {
            type: 'inline-radio',
            options: ['none', 'single', 'multiple'],
        },
    },
    size: {
        name: 'size',
        description: 'The size at which to display the action group.',
        type: { name: 'string', required: true },
        table: {
            type: { summary: '"s" | "m" | "l" | "xl"' },
            defaultValue: { summary: 'm' },
        },
        control: {
            type: 'select',
            options: ['s', 'm', 'l', 'xl'],
        },
    },
};

export const args: Properties = {
    compact: false,
    emphasized: false,
    justified: false,
    quiet: false,
    vertical: false,
    selects: 'none',
    size: 'm',
};
