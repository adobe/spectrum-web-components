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

import { TemplateResult } from '@spectrum-web-components/base';
import { renderSplitButtonSet } from './index.js';

import '../sp-split-button.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

type SplitButtonType = 'field' | 'more';
type SplitButtonVariants =
    | 'cta'
    | 'overBackground'
    | 'primary'
    | 'secondary'
    | 'negative';

export default {
    title: 'Split Button/CTA',
    component: 'sp-split-button',
    args: {
        disabled: false,
        invalid: false,
        left: false,
        open: false,
        type: 'field' as SplitButtonType,
        variant: 'cta' as SplitButtonVariants,
    },
    argTypes: {
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
                    'cta',
                    'primary',
                    'secondary',
                    'negative',
                    'overBackground',
                ],
            },
        },
    },
};

interface Properties {
    disabled?: boolean;
    invalid?: boolean;
    left?: boolean;
    open?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    type: SplitButtonType;
    variant?: SplitButtonVariants;
}

export const field = (props: Properties, options = {}): TemplateResult =>
    renderSplitButtonSet(props, options);

export const more = (props: Properties, options = {}): TemplateResult =>
    renderSplitButtonSet(props, options);
more.args = {
    type: 'more' as SplitButtonType,
};
