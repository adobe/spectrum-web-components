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
    size?: ElementSize;
    disabled?: boolean;
    indeterminate?: boolean;
    invalid?: boolean;
    value?: number;
    placeholder?: string;
    max?: number;
    min?: number;
    hideStepper?: boolean;
    readonly?: boolean;
    step?: number;
    onChange?: (value: number) => void;
    onInput?: (value: number) => void;
    [prop: string]: unknown;
};

export const argTypes: ArgTypes = {
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
    indeterminate: {
        name: 'indeterminate',
        type: { name: 'boolean', required: false },
        description:
            'Whether the value of the Number Field can be determined for display.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    readonly: {
        name: 'readonly',
        type: { name: 'boolean', required: false },
        description:
            'When this control is read only, you will not be able to input an updated value.',
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
        description:
            'An altered delivery with no background and only a bottom border.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    hideStepper: {
        name: 'hide stepper',
        type: { name: 'boolean', required: false },
        description: 'Whether to remove the stepper UI from the control.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    value: {
        name: 'value',
        type: { name: 'number', required: false },
        description: 'Value to apply to the control.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: undefined },
        },
        control: {
            type: 'number',
        },
    },
    step: {
        name: 'step',
        type: { name: 'number', required: false },
        description:
            'Amount to change the value by when using the stepper or arrow key interactions.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: undefined },
        },
        control: {
            type: 'number',
        },
    },
    stepModifier: {
        name: 'step modifier',
        type: { name: 'number', required: false },
        description:
            'Amount to scale the step increment/decrement when holding the shift key',
        table: {
            type: { summary: 'number' },
            defaultValue: { summary: 10 },
        },
        control: {
            type: 'number',
        },
    },
    placeholder: {
        name: 'placeholder',
        type: { name: 'string', required: false },
        description: 'Placeholder to apply to the control.',
        table: {
            type: { summary: 'string' },
        },
        control: {
            type: 'text',
        },
    },
    min: {
        name: 'min',
        type: { name: 'number', required: false },
        description: 'The minimum value the control can be set to.',
        table: {
            type: { summary: 'number' },
            defaultValue: { summary: undefined },
        },
        control: {
            type: 'number',
        },
    },
    max: {
        name: 'max',
        type: { name: 'numer', required: false },
        description: 'The maximum value the control can be set to.',
        table: {
            type: { summary: 'number' },
            defaultValue: { summary: undefined },
        },
        control: {
            type: 'number',
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
    disabled: false,
    readonly: false,
    quiet: false,
    value: undefined,
    placeholder: '',
    min: undefined,
    max: undefined,
    step: undefined,
    size: 'm',
};
