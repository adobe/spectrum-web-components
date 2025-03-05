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

import type { TemplateResult } from '@spectrum-web-components/base';
import type { ElementSize } from '@spectrum-web-components/theme';
import type { ArgTypes } from '@storybook/web-components';
import type { Placement } from '@spectrum-web-components/overlay/src/overlay-types.js';

export interface Properties {
    align?: 'start' | 'end';
    visibleLabel?: string;
    disabled?: boolean;
    open?: boolean;
    customIcon?: string | TemplateResult;
    selects?: 'single';
    selected?: boolean;
    quiet?: boolean;
    staticValue?: 'white' | 'black' | undefined;
    tooltipDescription?: string | 'none';
    tooltipPlacement?: Placement;
    forcePopover?: boolean;
    size?: ElementSize;
    [prop: string]: unknown;
}

export const argTypes: ArgTypes = {
    onChange: { action: 'change' },
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
    visibleLabel: {
        name: 'Visible Label',
        description: 'The placeholder content for the picker.',
        type: { name: 'string', required: false },
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: '' },
        },
        control: 'text',
    },
    tooltipDescription: {
        name: 'Tooltip Description',
        type: { name: 'string', required: false },
        description: 'Tooltip description',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: '' },
        },
        control: {
            type: 'text',
        },
    },
    tooltipPlacement: {
        name: 'Tooltip Placement',
        type: { name: 'string', required: false },
        description: 'Tooltip Placement.',
        table: {
            defaultValue: { summary: 'bottom' },
        },
        control: {
            options: [
                'auto',
                'auto-start',
                'auto-end',
                'top',
                'bottom',
                'right',
                'left',
                'top-start',
                'top-end',
                'bottom-start',
                'bottom-end',
                'right-start',
                'right-end',
                'left-start',
                'left-end',
                'none',
            ],
            type: 'select',
        },
    },
    quiet: {
        name: 'quiet',
        type: { name: 'boolean', required: false },
        description: 'Quiet rendering',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    staticColorValue: {
        name: 'static-color',
        type: { name: 'string', required: false },
        description:
            'The visual static color variant to apply to the button.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'none' },
        },
        control: {
            type: 'select',
            labels: {
                white: 'white',
                black: 'black',
                none: undefined,
            },
            options: ['white', 'black', 'none'],
        },
    },
    align: {
        name: 'align',
        type: { name: 'string', required: false },
        description: 'Alignment of the Action Menu',
        table: {
            defaultValue: { summary: 'start' },
        },
        control: {
            type: 'select',
            labels: {
                start: 'start',
                end: 'end',
            },
        },
        options: ['start', 'end'],
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
    },
};

export const args: Properties = {
    align: 'start',
    visibleLabel: 'More Actions',
    disabled: false,
    forcePopover: false,
    open: false,
    quiet: false,
    tooltipDescription: '',
    tooltipPlacement: 'bottom',
    static: undefined,
};
