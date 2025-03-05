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
    compact?: boolean;
    direction: 'vertical' | 'vertical-right' | 'horizontal';
    verticalTabs?: boolean;
    verticalTab?: boolean;
    auto?: boolean;
    size?: ElementSize;
    selected?: number;
    count?: number;
    includeTabPanel?: boolean;
};

export const argTypes: ArgTypes = {
    direction: {
        name: 'direction',
        type: { name: 'string', required: false },
        description: 'The direction of the Tabs element',
        table: {
            type: {
                summary: '"vertical" | "vertical-right" | "horizontal"',
            },
            defaultValue: { summary: 'horizontal' },
        },
        control: {
            type: 'text',
        },
    },
    verticalTabs: { control: 'boolean' },
    verticalTab: { control: 'boolean' },
    auto: { control: 'boolean' },
    size: {
        name: 'size',
        type: { name: 'string', required: false },
        description: 'The size at which to display the Tabs element',
        table: {
            type: { summary: '"s" | "m" | "l" | "xl"' },
            defaultValue: { summary: 'm' },
        },
        control: {
            type: 'text',
        },
    },
};

export const args: Properties = {
    size: 'm',
    direction: 'horizontal',
    type: false,
    verticalTab: false,
    auto: false,
};
