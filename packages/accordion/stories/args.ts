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

import type { TemplateResult } from '@spectrum-web-components/base';

export type Properties = {
    content?: {
        label: string;
        content: TemplateResult;
        disabled?: boolean;
        open?: boolean;
    }[];
    allowMultiple?: boolean;
    disabled?: boolean;
    open?: boolean;
    density?: 'compact' | 'spacious';
    size?: 's' | 'm' | 'l' | 'xl';
    isHovered?: boolean;
};

export const argTypes = {
    open: {
        name: 'open',
        type: { name: 'boolean', required: false },
        description: 'True if the second accordion item is open.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: 'boolean',
    },
    allowMultiple: {
        name: 'Allow multiple',
        type: { name: 'boolean', required: false },
        description:
            'True if multiple accordion items can be open at the same time.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: 'boolean',
    },
    density: {
        name: 'Density',
        type: { name: 'string', required: true },
        description: 'The density at which to display accordion items.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'default' },
        },
        options: ['compact', 'default', 'spacious'],
        control: {
            labels: {
                compact: 'Compact',
                undefined: 'Default',
                spacious: 'Spacious',
            },
            type: 'select',
        },
    },
    size: {
        name: 'Size',
        type: { name: 'string', required: true },
        description: 'The size at which to display accordion items.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'm' },
        },
        options: ['s', 'm', 'l', 'xl'],
        control: {
            labels: {
                s: 'Small',
                m: 'Medium',
                l: 'Large',
                xl: 'Extra large',
            },
            type: 'select',
        },
    },
};
