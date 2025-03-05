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

export interface Properties {
    active?: boolean;
    quiet?: boolean;
    disabled?: boolean;
    selected?: boolean;
    toggles?: boolean;
    emphasized?: boolean;
    size?: ElementSize;
    staticColor?: 'white' | 'black';
    holdAffordance?: boolean;
    icon?: TemplateResult;
    label?: string;
    href?: undefined;
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
    label: {
        name: 'Label',
        type: { name: 'string', required: false },
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'Label' },
        },
        control: 'text',
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
    size: 'm',
};
