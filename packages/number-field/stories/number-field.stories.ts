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

import '../sp-number-field.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import { spreadProps } from '@open-wc/lit-helpers';

export default {
    title: 'Number Field',
    component: 'sp-number-field',
    args: {
        disabled: false,
        readonly: false,
        quiet: false,
        value: undefined,
        placeholder: '100',
        min: undefined,
        max: undefined,
        step: undefined,
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
        readonly: {
            name: 'readonly',
            type: { name: 'boolean', required: false },
            description:
                'When this control is read only, you will not be able to input an updated value.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        quiet: {
            name: 'quiet',
            type: { name: 'boolean', required: false },
            description:
                'An altered delivery with no background and only a bottom border.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        hideStepper: {
            name: 'hide stepper',
            type: { name: 'boolean', required: false },
            description: 'Whether to remove the stepper UI from the control.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        value: {
            name: 'value',
            type: { name: 'number', required: false },
            description: 'Value to apply to the control.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: undefined },
            },
            control: {
                type: 'number',
            },
        },
        step: {
            name: 'step',
            type: { name: 'number', required: false },
            description:
                'Amount to change the value by when using the stepper or arrow key interactions.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: undefined },
            },
            control: {
                type: 'number',
            },
        },
        placeholder: {
            name: 'placeholder',
            type: { name: 'string', required: false },
            description: 'Placeholder to apply to the control.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '100' },
            },
            control: {
                type: 'text',
            },
        },
        min: {
            name: 'min',
            type: { name: 'number', required: false },
            description: 'The minimum value the control can be set to.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: undefined },
            },
            control: {
                type: 'number',
            },
        },
        max: {
            name: 'max',
            type: { name: 'numer', required: false },
            description: 'The maximum value the control can be set to.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: undefined },
            },
            control: {
                type: 'number',
            },
        },
    },
};

interface StoryArgs {
    disabled?: boolean;
    invalid?: boolean;
    value?: number;
    placeholder?: string;
    max?: number;
    min?: number;
    hideStepper?: boolean;
    readonly?: boolean;
    step?: number;
}

export const Default = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="default">Enter a number</sp-field-label>
        <sp-number-field
            id="default"
            ...=${spreadProps(args)}
            style="width: 150px"
        ></sp-number-field>
    `;
};

export const decimals = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="decimals">
            Enter a number with visible decimals
        </sp-field-label>
        <sp-number-field
            id="decimals"
            style="width: 200px"
            ...=${spreadProps(args)}
            .formatOptions=${{
                signDisplay: 'exceptZero',
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
            }}
        ></sp-number-field>
    `;
};

export const percents = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="percents">Enter a percentage</sp-field-label>
        <sp-number-field
            id="percents"
            style="width: 200px"
            ...=${spreadProps(args)}
            .formatOptions=${{ style: 'percent' }}
        ></sp-number-field>
    `;
};

export const currency = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="currency">Enter a value in Euros</sp-field-label>
        <sp-number-field
            style="width: 200px"
            ...=${spreadProps(args)}
            .formatOptions=${{
                style: 'currency',
                currency: 'EUR',
                currencyDisplay: 'code',
                currencySign: 'accounting',
            }}
        ></sp-number-field>
    `;
};

export const units = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="units">Enter a lengths in inches</sp-field-label>
        <sp-number-field
            id="units"
            style="width: 200px"
            ...=${spreadProps(args)}
            .formatOptions=${{
                style: 'unit',
                unit: 'inch',
                unitDisplay: 'long',
            }}
        ></sp-number-field>
    `;
};

export const minMax = (args: StoryArgs): TemplateResult => html`
    <sp-field-label for="min-max">
        Enter a value between 0 and 255
    </sp-field-label>
    <sp-number-field
        id="min-max"
        style="width: 200px"
        ...=${spreadProps(args)}
    ></sp-number-field>
`;

minMax.args = {
    value: 4,
    min: 0,
    max: 255,
};

export const hideStepper = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="hideStepper">
            Enter a number without the stepper UI
        </sp-field-label>
        <sp-number-field
            id="hideStepper"
            ...=${spreadProps(args)}
        ></sp-number-field>
    `;
};
hideStepper.args = {
    hideStepper: true,
};

export const disabled = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="disabled">
            Enter a number without the stepper UI
        </sp-field-label>
        <sp-number-field
            id="disabled"
            ...=${spreadProps(args)}
        ></sp-number-field>
    `;
};
disabled.args = {
    disabled: true,
};

export const readOnly = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="readonly">
            You can only read the following value
        </sp-field-label>
        <sp-number-field
            id="readonly"
            ...=${spreadProps(args)}
        ></sp-number-field>
    `;
};
readOnly.args = {
    readonly: true,
};
