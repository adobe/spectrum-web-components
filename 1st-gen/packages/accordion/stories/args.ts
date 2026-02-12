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

export const argTypes = {
    open: {
        name: 'open',
        type: { name: 'boolean', required: false },
        description: 'Whether the second accordion item is open.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    allowMultiple: {
        name: 'allowMultiple',
        type: { name: 'boolean', required: false },
        description:
            'Whether multipel Accordion Items can be open at the same time.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    density: {
        name: 'density',
        type: { name: 'string', required: false },
        description: 'The density at which to display accordion items.',
        table: {
            defaultValue: { summary: 'default' },
        },
        control: {
            labels: {
                compact: 'Compact',
                spacious: 'Spacious',
                default: 'Default',
            },
            type: 'select',
        },
    },
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
    },
    level: {
        name: 'level',
        type: { name: 'number', required: false },
        description:
            'The heading level (2-6) to use for all accordion item titles.',
        table: {
            type: { summary: 'number' },
            defaultValue: { summary: 3 },
        },
        control: {
            type: 'number',
            min: 2,
            max: 6,
            step: 1,
        },
    },
};
