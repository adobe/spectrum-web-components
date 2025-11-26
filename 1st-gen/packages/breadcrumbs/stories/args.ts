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
    compact: {
        name: 'compact',
        type: { name: 'boolean', required: false },
        description:
            'Reduces the size of the Breadcrumbs and the padding around the items.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    label: {
        name: 'label',
        type: { name: 'string', required: false },
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'Breadcrumbs' },
        },
        control: 'text',
    },
    maxVisibleItems: {
        name: 'max-visible-items',
        type: { name: 'number', required: false },
        table: {
            type: { summary: 'number' },
            defaultValue: { summary: '4' },
        },
        control: 'number',
        min: 0,
        max: 4,
    },
    onChange: { action: 'change' },
};
