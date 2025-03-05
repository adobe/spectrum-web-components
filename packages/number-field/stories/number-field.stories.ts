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

import type { Meta } from '@storybook/web-components';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/number-field/sp-number-field.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import { spreadProps } from '../../../test/lit-helpers.js';
import { NumberField } from '@spectrum-web-components/number-field/src/NumberField.js';
import type { Properties } from './args.js';
import { args, argTypes } from './args.js';

const meta: Meta<Properties> = {
    title: 'Number Field',
    component: 'sp-number-field',
    args,
    argTypes,
};

export const Default = (args: Properties = {}): TemplateResult => {
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
        <sp-field-label for="default">Enter a number</sp-field-label>
        <sp-number-field
            id="default"
            ...=${spreadProps(args)}
            @input=${(event: Event) =>
                onInput((event.target as NumberField).value)}
            @change=${(event: Event) =>
                onChange((event.target as NumberField).value)}
            style=${ifDefined(args.quiet ? undefined : 'width: 150px')}
        ></sp-number-field>
    `;
};

Default.args = {
    value: 100,
};

export const quiet = (args: Properties = {}): TemplateResult => Default(args);

quiet.args = {
    quiet: true,
    value: 100,
};

export const indeterminate = (args: Properties = {}): TemplateResult =>
    Default(args);

indeterminate.args = {
    value: 100,
    indeterminate: true,
};

export const decimals = (args: Properties): TemplateResult => {
    return html`
        <sp-field-label for="decimals">
            Enter a number with visible decimals
        </sp-field-label>
        <sp-number-field
            id="decimals"
            style="width: 200px"
            ...=${spreadProps(args)}
            @change=${args.onChange}
            @input=${args.onInput}
            .formatOptions=${{
                signDisplay: 'exceptZero',
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
            } as unknown as Intl.NumberFormatOptions}
        ></sp-number-field>
    `;
};

decimals.args = {
    value: 19.274,
};

export const germanDecimals = (args: Properties): TemplateResult => {
    return html`
        <sp-field-label for="decimals">
            Enter a number with visible decimals
        </sp-field-label>
        <sp-theme lang="de">
            <sp-number-field
                id="decimals"
                style="width: 200px"
                ...=${spreadProps(args)}
                @change=${args.onChange}
                .formatOptions=${{
                    signDisplay: 'exceptZero',
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 2,
                } as unknown as Intl.NumberFormatOptions}
            ></sp-number-field>
        </sp-theme>
    `;
};

germanDecimals.args = {
    value: 19.274,
};

export const percents = (args: Properties = {}): TemplateResult => {
    return html`
        <sp-field-label for="percents">Enter a percentage</sp-field-label>
        <sp-number-field
            id="percents"
            style="width: 200px"
            ...=${spreadProps(args)}
            @change=${args.onChange}
            .formatOptions=${{
                style: 'percent',
                unitDisplay: 'narrow',
            } as unknown as Intl.NumberFormatOptions}
        ></sp-number-field>
    `;
};

percents.args = {
    value: 0.372,
};

export const currency = (args: Properties = {}): TemplateResult => {
    return html`
        <sp-field-label for="currency">Enter a value in Euros</sp-field-label>
        <sp-number-field
            style="width: 200px"
            ...=${spreadProps(args)}
            @change=${args.onChange}
            .formatOptions=${{
                style: 'currency',
                currency: 'EUR',
                currencyDisplay: 'code',
                currencySign: 'accounting',
            } as unknown as Intl.NumberFormatOptions}
        ></sp-number-field>
    `;
};

currency.args = {
    value: 23.19,
};

export const units = (args: Properties): TemplateResult => {
    return html`
        <sp-field-label for="units">Enter a lengths in inches</sp-field-label>
        <sp-number-field
            id="units"
            style="width: 200px"
            ...=${spreadProps(args)}
            @change=${args.onChange}
            .formatOptions=${{
                style: 'unit',
                unit: 'inch',
                unitDisplay: 'long',
            } as unknown as Intl.NumberFormatOptions}
        ></sp-number-field>
    `;
};

units.args = {
    value: 24,
};

export const pixels = (args: Properties): TemplateResult => {
    return html`
        <sp-field-label for="units">Enter a lengths in pixels</sp-field-label>
        <sp-number-field
            id="units"
            style="width: 200px"
            .formatOptions=${{
                style: 'unit',
                unit: 'px',
            }}
            ...=${spreadProps(args)}
            @change=${args.onChange}
        ></sp-number-field>
    `;
};

pixels.args = {
    value: 800,
};

export const minMax = (args: Properties): TemplateResult => html`
    <sp-field-label for="min-max">
        Enter a value between 0 and 255
    </sp-field-label>
    <sp-number-field
        id="min-max"
        style="width: 200px"
        ...=${spreadProps(args)}
        @change=${args.onChange}
    ></sp-number-field>
`;

minMax.args = {
    value: 4,
    min: 0,
    max: 255,
};

export const hideStepper = (args: Properties): TemplateResult => {
    return html`
        <sp-field-label for="hideStepper">
            Enter a number without the stepper UI
        </sp-field-label>
        <sp-number-field
            id="hideStepper"
            ...=${spreadProps(args)}
            @change=${args.onChange}
        ></sp-number-field>
    `;
};
hideStepper.args = {
    hideStepper: true,
    value: 67,
};

export const hideStepperQuiet = (args: Properties): TemplateResult => {
    return html`
        <sp-field-label for="hideStepper">
            Enter a number without the stepper UI
        </sp-field-label>
        <sp-number-field
            id="hideStepper"
            ...=${spreadProps(args)}
            @change=${args.onChange}
        ></sp-number-field>
    `;
};
hideStepperQuiet.args = {
    hideStepper: true,
    value: 67,
    quiet: true,
};

export const disabled = (args: Properties): TemplateResult => {
    return html`
        <sp-field-label for="disabled">
            This Number Field is disabled
        </sp-field-label>
        <sp-number-field
            id="disabled"
            ...=${spreadProps(args)}
            @change=${args.onChange}
        ></sp-number-field>
    `;
};
disabled.args = {
    disabled: true,
    value: 892,
};

export const readOnly = (args: Properties): TemplateResult => {
    return html`
        <sp-field-label for="readonly">
            You can only read the following value
        </sp-field-label>
        <sp-number-field
            id="readonly"
            ...=${spreadProps(args)}
            @change=${args.onChange}
        ></sp-number-field>
    `;
};
readOnly.args = {
    readonly: true,
    value: '15',
};

export const ScrollingContainer = (args: Properties = {}): TemplateResult => {
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
                <sp-field-label for="default">Enter a number</sp-field-label>
                <sp-number-field
                    id="default"
                    ...=${spreadProps(args)}
                    @input=${(event: Event) =>
                        onInput((event.target as NumberField).value)}
                    @change=${(event: Event) =>
                        onChange((event.target as NumberField).value)}
                    style="width: 150px"
                ></sp-number-field>
                <p>
                    This box should not scroll when the focus is inside the
                    number field and field value is changed by using the mouse
                    wheel.
                </p>
            </div>
        </div>
    `;
};

export default meta;
