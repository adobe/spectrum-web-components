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

import { variants } from '@spectrum-web-components/slider';
import type { ElementSize } from '@spectrum-web-components/theme';
import type { ArgTypes } from '@storybook/web-components';

export interface Properties {
    variant?: string;
    tickStep?: number;
    labelVisibility?: string;
    onInput?: (val: string) => void;
    onChange?: (val: string) => void;
    min?: number;
    max?: number;
    value?: number;
    step?: number;
    editable?: boolean;
    size?: ElementSize;
    [prop: string]: unknown;
};

export const argTypes: ArgTypes = {
    onInput: { action: 'input' },
    onChange: { action: 'change' },
    variant: {
        name: 'Variant',
        description: 'Determines the style of slider.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: undefined },
        },
        control: {
            type: 'inline-radio',
            options: [undefined, ...variants],
        },
    },
    tickStep: {
        name: 'Tick Step',
        description: 'Tick spacing on slider.',
        table: {
            type: { summary: 'number' },
            defaultValue: { summary: 0.1 },
        },
        control: {
            type: 'number',
        },
    },
    labelVisibility: {
        name: 'Label Visibility',
        description: 'The labels visibily available in the UI',
        table: {
            type: { summary: '"text" | "value" | "none" | undefined' },
            defaultValue: { summary: undefined },
        },
        control: {
            type: 'text',
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
    variant: undefined,
    tickStep: 0.1,
    labelVisibility: undefined,
    min: undefined,
    max: undefined,
    value: undefined,
    step: undefined,
    size: 'm',
};
