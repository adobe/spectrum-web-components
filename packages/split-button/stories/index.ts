/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, TemplateResult } from '@spectrum-web-components/base';
import type { ElementSize } from '@spectrum-web-components/base';

import '@spectrum-web-components/split-button/sp-split-button.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import type { ButtonVariants } from '@spectrum-web-components/button';
import type { SplitButtonTypes } from '@spectrum-web-components/split-button/src/SplitButton.js';

export interface SplitButtonMenuOptions {
    firstItemHandler?: (event?: Event) => void;
    secondItemHandler?: (event?: Event) => void;
    thirdItemHandler?: (event?: Event) => void;
}

const menu = ({
    firstItemHandler = function () {
        return;
    },
    secondItemHandler = function () {
        return;
    },
    thirdItemHandler = function () {
        return;
    },
}: SplitButtonMenuOptions): TemplateResult => html`
    <sp-menu-item @click=${firstItemHandler}>Option 1</sp-menu-item>
    <sp-menu-item @click=${secondItemHandler}>
        Option Really Extended
    </sp-menu-item>
    <sp-menu-item @click=${thirdItemHandler}>Short</sp-menu-item>
`;

export interface Properties extends SplitButtonMenuOptions {
    disabled?: boolean;
    invalid?: boolean;
    left?: boolean;
    open?: boolean;
    size?: ElementSize;
    type?: SplitButtonTypes;
    variant?: ButtonVariants;
}

export const args = {
    disabled: false,
    invalid: false,
    left: false,
    open: false,
    type: 'field' as SplitButtonTypes,
    variant: 'accent' as ButtonVariants,
};

export const argTypes = {
    disabled: {
        name: 'disabled',
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
    invalid: {
        name: 'invalid',
        type: { name: 'boolean', required: false },
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    left: {
        name: 'left',
        type: { name: 'boolean', required: false },
        description: 'Whether the split begins on the left.',
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
        description: 'Whether the picker menu is open.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    type: {
        name: 'type',
        type: { name: 'string', required: false },
        description:
            'Whether the split button shows the chosen action from the overlay menu. The `more` type maintains its original value.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'field' },
        },
        control: {
            type: 'inline-radio',
            options: ['field', 'more'],
        },
    },
    variant: {
        name: 'variant',
        type: { name: 'string', required: false },
        description: 'The visual variant to apply to the button.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'cta' },
        },
        control: {
            type: 'inline-radio',
            options: [
                'accent',
                'primary',
                'secondary',
                'negative',
                'black',
                'white',
            ],
        },
    },
};

export const splitbutton = (
    properties: Properties = {}
): TemplateResult => html`
    <sp-split-button
        ?left=${!!properties.left}
        size=${properties.size || 'm'}
        variant=${properties.variant || 'cta'}
        type=${properties.type || 'field'}
        ?open=${!!properties.open}
        ?disabled=${properties.disabled}
    >
        ${menu(properties)}
    </sp-split-button>
`;

const left = true;

export const renderSplitButtonSet = (
    properties: Properties = {}
): TemplateResult => html`
    ${splitbutton(properties)}
    ${splitbutton({
        ...properties,
        left,
    })}
`;
