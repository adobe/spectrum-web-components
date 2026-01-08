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

import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/number-field/sp-number-field.js';
import { spreadProps } from '../../../test/lit-helpers.js';
import { NumberField } from '@spectrum-web-components/number-field/src/NumberField.js';

export default {
    title: 'Number Field',
    component: 'sp-number-field',
    args: {
        disabled: false,
        readonly: false,
        quiet: false,
        value: undefined,
        placeholder: '',
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
        indeterminate: {
            name: 'indeterminate',
            type: { name: 'boolean', required: false },
            description:
                'Whether the value of the Number Field can be determined for display.',
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
        stepModifier: {
            name: 'step modifier',
            type: { name: 'number', required: false },
            description:
                'Amount to scale the step increment/decrement when holding the shift key',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 10 },
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
    indeterminate?: boolean;
    invalid?: boolean;
    value?: number;
    placeholder?: string;
    max?: number;
    min?: number;
    hideStepper?: boolean;
    readonly?: boolean;
    step?: number;
    onChange?: (value: number) => void;
    onInput?: (value: number) => void;
    [prop: string]: unknown;
}

export const Default = (args: StoryArgs = {}): TemplateResult => {
    const onChange =
        (args.onChange as (value: number) => void) ||
        (() => {
            return;
        });
    const onInput =
        (args.onInput as (value: number) => void) ||
        (() => {
            return;
        });
    return html`
        <sp-number-field
            ...=${spreadProps(args)}
            @input=${(event: Event) =>
                onInput((event.target as NumberField).value)}
            @change=${(event: Event) =>
                onChange((event.target as NumberField).value)}
            style=${ifDefined(args.quiet ? undefined : '')}
        >
            Enter a number
        </sp-number-field>
    `;
};

Default.args = {
    value: 100,
};

export const quiet = (args: StoryArgs = {}): TemplateResult => Default(args);

quiet.args = {
    quiet: true,
    value: 100,
};

export const indeterminate = (args: StoryArgs = {}): TemplateResult =>
    Default(args);

indeterminate.args = {
    value: 100,
    indeterminate: true,
};

export const decimals = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-number-field
            ...=${spreadProps(args)}
            @change=${args.onChange}
            @input=${args.onInput}
            .formatOptions=${{
                signDisplay: 'exceptZero',
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
            } as unknown as Intl.NumberFormatOptions}
        >
            Enter a number with visible decimals
        </sp-number-field>
    `;
};

decimals.args = {
    value: 19.274,
};

export const germanDecimals = (args: StoryArgs): TemplateResult => {
    let currentDir: 'ltr' | 'rtl' | '' = 'ltr';
    let currentSystem: 'spectrum' | 'spectrum-two' | 'express' = 'spectrum-two';
    if (window.__swc_hack_knobs__) {
        currentDir = window.__swc_hack_knobs__.defaultDirection;
        currentSystem = window.__swc_hack_knobs__.defaultSystemVariant;
    }
    return html`
        <sp-theme lang="de" dir="${currentDir}" system=${currentSystem}>
            <sp-number-field
                ...=${spreadProps(args)}
                @change=${args.onChange}
                @input=${args.onInput}
                .formatOptions=${{
                    signDisplay: 'exceptZero',
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 2,
                } as unknown as Intl.NumberFormatOptions}
            >
                Enter a number with visible decimals
            </sp-number-field>
        </sp-theme>
    `;
};

germanDecimals.args = {
    value: 19.274,
};

export const percents = (args: StoryArgs = {}): TemplateResult => {
    return html`
        <sp-number-field
            ...=${spreadProps(args)}
            @change=${args.onChange}
            .formatOptions=${{
                style: 'percent',
                unitDisplay: 'narrow',
            } as unknown as Intl.NumberFormatOptions}
        >
            Enter a percentage
        </sp-number-field>
    `;
};

percents.args = {
    value: 0.372,
};

export const currency = (args: StoryArgs = {}): TemplateResult => {
    return html`
        <sp-number-field
            ...=${spreadProps(args)}
            @change=${args.onChange}
            .formatOptions=${{
                style: 'currency',
                currency: 'EUR',
                currencyDisplay: 'code',
                currencySign: 'accounting',
            } as unknown as Intl.NumberFormatOptions}
        >
            Enter a value in Euros
        </sp-number-field>
    `;
};

currency.args = {
    value: 23.19,
};

export const units = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-number-field
            ...=${spreadProps(args)}
            @change=${args.onChange}
            .formatOptions=${{
                style: 'unit',
                unit: 'inch',
                unitDisplay: 'long',
            } as unknown as Intl.NumberFormatOptions}
        >
            Enter a lengths in inches
        </sp-number-field>
    `;
};

units.args = {
    value: 24,
};

export const pixels = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-number-field
            .formatOptions=${{
                style: 'unit',
                unit: 'px',
            }}
            ...=${spreadProps(args)}
            @change=${args.onChange}
        >
            Enter a lengths in pixels
        </sp-number-field>
    `;
};

pixels.args = {
    value: 800,
};

export const minMax = (args: StoryArgs): TemplateResult => html`
    <sp-number-field ...=${spreadProps(args)} @change=${args.onChange}>
        Enter a value between 0 and 255
    </sp-number-field>
`;

minMax.args = {
    value: 4,
    min: 0,
    max: 255,
};

export const hideStepper = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-number-field ...=${spreadProps(args)} @change=${args.onChange}>
            Enter a number without the stepper UI
        </sp-number-field>
    `;
};
hideStepper.args = {
    hideStepper: true,
    value: 67,
};

export const hideStepperQuiet = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-number-field ...=${spreadProps(args)} @change=${args.onChange}>
            Enter a number without the stepper UI
        </sp-number-field>
    `;
};
hideStepperQuiet.args = {
    hideStepper: true,
    value: 67,
    quiet: true,
};

export const disabled = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-number-field ...=${spreadProps(args)} @change=${args.onChange}>
            This Number Field is disabled
        </sp-number-field>
    `;
};
disabled.args = {
    disabled: true,
    value: 892,
};

export const readOnly = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-number-field ...=${spreadProps(args)} @change=${args.onChange}>
            You can only read the following value
        </sp-number-field>
    `;
};
readOnly.args = {
    readonly: true,
    value: '15',
};

export const validationIcons = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-number-field invalid ...=${spreadProps(args)}>
            Invalid Number Field without Stepper
        </sp-number-field>
        <sp-number-field valid>Valid Number Field with Stepper</sp-number-field>
        <sp-number-field invalid>
            Invalid Number Field with Stepper
        </sp-number-field>
    `;
};
validationIcons.args = {
    invalid: true,
    value: '15',
    hideStepper: true,
};

export const ScrollingContainer = (args: StoryArgs = {}): TemplateResult => {
    const onChange =
        (args.onChange as (value: number) => void) ||
        (() => {
            return;
        });
    const onInput =
        (args.onInput as (value: number) => void) ||
        (() => {
            return;
        });
    return html`
        <style>
            .scroller {
                height: 140px;
                width: 200px;
                overflow-y: scroll;
                padding: 10px;
                background: var(--spectrum-gray-50);
            }

            .scroller > div {
                height: 1000px;
            }
        </style>
        <div class="scroller">
            <div>
                <sp-number-field
                    ...=${spreadProps(args)}
                    @input=${(event: Event) =>
                        onInput((event.target as NumberField).value)}
                    @change=${(event: Event) =>
                        onChange((event.target as NumberField).value)}
                >
                    Enter a number
                </sp-number-field>
                <p>
                    This box should not scroll when the focus is inside the
                    number field and field value is changed by using the mouse
                    wheel.
                </p>
            </div>
        </div>
    `;
};
