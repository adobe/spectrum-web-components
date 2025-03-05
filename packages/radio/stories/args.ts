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
    checked?: boolean;
    disabled?: boolean;
    emphasized?: boolean;
    invalid?: boolean;
    readonly?: boolean;
    size?: ElementSize;
    [prop: string]: unknown;
};

export const argTypes: ArgTypes = {
    checked: {
        name: 'checked',
        type: { name: 'boolean', required: false },
        description: 'Represents when the input is checked',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: 'boolean',
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
    emphasized: {
        name: 'emphasized',
        type: { name: 'boolean', required: false },
        description: "Set the button's state to emphasized.",
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
    size: {
        name: 'size',
        type: { name: 'string', required: false },
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
};

export const args: Properties = {
    checked: false,
    disabled: false,
    emphasized: false,
    invalid: false,
    size: 'm',
};
