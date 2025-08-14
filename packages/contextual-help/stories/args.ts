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
import type { Placement } from '@spectrum-web-components/overlay/src/overlay-types.js';

export interface StoryArgs {
    label?: string;
    variant?: 'info' | 'help';
    placement?: Placement;
    open?: boolean;
    [key: string]: unknown;
}

export const argTypes = {
    open: {
        name: 'open',
        type: { name: 'boolean', required: false },
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    variant: {
        name: 'variant',
        type: { name: 'string', required: false },
        table: {
            defaultValue: { summary: 'info' },
        },
        control: {
            labels: {
                info: 'Info',
                help: 'Help',
            },
            type: 'select',
        },
        options: ['info', 'help'],
    },
    label: {
        name: 'label',
        type: { name: 'string', required: false },
        table: {
            type: { summary: 'label' },
            defaultValue: { summary: 'Information' },
        },
        control: 'text',
    },
    offset: {
        name: 'offset',
        type: { name: 'number', required: false },
        table: {
            type: { summary: 'offset' },
            defaultValue: { summary: 0 },
        },
        control: 'number',
    },
    placement: {
        name: 'placement',
        type: { name: 'string', required: false },
        description:
            'The placement of the popover content in relation to the button',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'bottom-start' },
        },
        control: {
            type: 'select',
            labels: {
                top: 'top',
                'top-start': 'top-start',
                'top-end': 'top-end',
                right: 'right',
                'right-start': 'right-start',
                'right-end': 'right-end',
                bottom: 'bottom',
                'bottom-start': 'bottom-start',
                'bottom-end': 'bottom-end',
                left: 'left',
                'left-start': 'left-start',
                'left-end': 'left-end',
            },
        },
        options: [
            'top',
            'top-start',
            'top-end',
            'right',
            'right-start',
            'right-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left',
            'left-start',
            'left-end',
        ],
    },
};
