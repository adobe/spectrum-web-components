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
import { AvatarSize } from '@spectrum-web-components/avatar';

export interface Properties {
    disabled?: boolean;
    label?: string;
    src?: string;
    size?: AvatarSize;
    [prop: string]: unknown;
};

export const argTypes: ArgTypes = {
    disabled: {
        name: 'Disabled',
        type: { name: 'boolean', required: false },
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
    src: { control: 'text' },
};

export const args: Properties = {
    disabled: false,
    label: 'Place dog',
    src: avatar,
};
