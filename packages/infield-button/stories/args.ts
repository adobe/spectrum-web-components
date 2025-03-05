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
import type { TemplateResult } from '@spectrum-web-components/base';
import type { ElementSize } from '@spectrum-web-components/theme';

export type Properties = {
    block?: 'start' | 'end';
    content?: () => TemplateResult;
    disabled?: boolean;
    inline?: 'start' | 'end';
    label?: string;
    size?: ElementSize;
    quiet?: boolean;
};

export const argTypes: ArgTypes = {
    block: {
        name: 'block',
        type: { name: 'text', required: false },
        description: 'Where to place the button along the block axis.',
        table: {
            type: { summary: '"start" | "end"' },
            defaultValue: { summary: '' },
        },
        control: 'select',
        options: ['none', 'start', 'end'],
    },
    disabled: {
        name: 'Disabled',
        type: { name: 'boolean', required: false },
        description: 'Whether the button is disabled or not.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    inline: {
        name: 'inline',
        type: { name: 'text', required: false },
        description: 'Where to place the button along the inline axis.',
        table: {
            type: { summary: '"start" | "end"' },
            defaultValue: { summary: '' },
        },
        control: 'select',
        options: ['none', 'start', 'end'],
    },
    size: {
        name: 'size',
        type: { name: 'text', required: false },
        description: 'The t-shit size of the button.',
        table: {
            type: { summary: '"s" | "m" | "l" | "xl"' },
            defaultValue: { summary: '' },
        },
        control: 'select',
        options: ['s', 'm', 'l', 'xl'],
    },
    quiet: {
        name: 'quiet',
        type: { name: 'boolean', required: false },
        description: 'Whether the button is quiet or not.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    label: {
        name: 'Label',
        type: { name: 'string', required: false },
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'Label' },
        },
        control: 'text',
    },
};

export const args: Properties = {
    block: undefined,
    disabled: false,
    inline: undefined,
    label: 'Add',
    size: undefined,
    quiet: false,
};
