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
import type { Table } from '@spectrum-web-components/table';

export interface Properties {
    selected?: string[] | undefined;
    selects?: undefined | 'single' | 'multiple';
    onChange?: (
        eventData: Event & {
            target: Table;
            first: number;
            last: number;
            type: string;
        }
    ) => void;
    [prop: string]: unknown;
};

export const argTypes: ArgTypes = {
    selected: {
        name: 'selected',
        description: 'The value of the selected `<sp-table-row>`(s).',
        control: {
            type: 'text',
        },
    },
    selects: {
        name: 'selects',
        description:
            'Whether the elements selects its children and how many it can select at a time.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: '' },
        },
        control: {
            type: 'inline-radio',
            options: ['', 'single', 'multiple'],
        },
    },
    onChange: { action: 'change' },
};

export const args: Properties = {
    selected: [],
    selects: '',
};
