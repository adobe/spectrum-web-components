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
import { ElementSize } from '@spectrum-web-components/base';
import type {
    SwatchBorder,
    SwatchRounding,
    SwatchShape,
} from '../src/Swatch.js';

export interface Properties {
    size?: ElementSize;
    color?: string;
    border: SwatchBorder | 'normal';
    rounding: SwatchRounding | 'normal';
    shape: SwatchShape | 'normal';
    mixedValue?: boolean;
    nothing?: boolean;
    [prop: string]: unknown;
};

export const argTypes: ArgTypes = {
    border: {
        name: 'border',
        type: { name: 'string', required: false },
        description: 'The border to apply to the Swatch children.',
        table: {
            defaultValue: { summary: '' },
        },
        control: {
            type: 'inline-radio',
            options: ['normal', 'light', 'none'],
        },
    },
    density: {
        name: 'density',
        type: { name: 'string', required: false },
        description: 'The density at which to display the Swatch children.',
        table: {
            defaultValue: { summary: '' },
        },
        control: {
            type: 'inline-radio',
            options: ['normal', 'compact', 'spacious'],
        },
    },
    rounding: {
        name: 'rounding',
        type: { name: 'string', required: false },
        description: 'The rounding to apply to the Swatch children.',
        table: {
            defaultValue: { summary: '' },
        },
        control: {
            type: 'inline-radio',
            options: ['normal', 'none', 'full'],
        },
    },
    selects: {
        name: 'selects',
        type: { name: 'string', required: false },
        description:
            'Whether the Swatch Group manages a selection, and whether it is a sinlge or multiple selection.',
        table: {
            defaultValue: { summary: '' },
        },
        control: {
            type: 'inline-radio',
            options: ['none', 'single', 'multiple'],
        },
    },
    shape: {
        name: 'shape',
        type: { name: 'string', required: false },
        description: 'The shape to apply to the Swatch children.',
        table: {
            defaultValue: { summary: '' },
        },
        control: {
            type: 'inline-radio',
            options: ['normal', 'rectangle'],
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
    size: 'm',
    color: '#ff0000',
};
