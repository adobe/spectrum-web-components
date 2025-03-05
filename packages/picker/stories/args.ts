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

import type { ArgTypes } from '@storybook/web-components';
import type { ElementSize } from '@spectrum-web-components/theme';

export type Properties = {
    disabled?: boolean;
    invalid?: boolean;
    open?: boolean;
    quiet?: boolean;
    pending?: boolean;
    showText?: boolean;
    [prop: string]: unknown;
    size?: ElementSize;
    onChange: (val: string) => void;
    invalid: boolean;
    pending: boolean;
    open: false;
};

export const argTypes: ArgTypes = {
    size: {
        name: 'size',
        type: { name: 'string', required: false },
        description: 'The size at which to display accordion items.',
        table: {
            defaultValue: { summary: 'm' },
        },
        control: {
            labels: {
                s: 'Small',
                m: 'Medium',
                l: 'Large',
                xl: 'Extra large',
            },
            type: 'select',
        },
        options: ['s', 'm', 'l', 'xl'],
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
    disabled: {
        name: 'Disabled',
        type: { name: 'boolean', required: false },
        description:
            'Disable this control. It will not receive focus or events.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    invalid: {
        name: 'invalid',
        type: { name: 'boolean', required: false },
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    onChange: { action: 'change' },
    open: {
        name: 'open',
        type: { name: 'boolean', required: false },
        description: 'Whether the menu is open or not.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: 'boolean',
    },
    pending: {
        name: 'pending',
        type: { name: 'boolean', required: false },
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
};
