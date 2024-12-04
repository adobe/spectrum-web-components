/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import {
    CalendarDate,
    CalendarDateTime,
    DateValue,
    toZoned,
} from '@internationalized/date';

import {
    css,
    html,
    TemplateResult,
    unsafeCSS,
} from '@spectrum-web-components/base';
import {
    DateTimePickerValue,
    Precision,
    Precisions,
} from '@spectrum-web-components/date-time-picker';

import { spreadProps } from '../../../test/lit-helpers.js';

import '@spectrum-web-components/date-time-picker/sp-date-time-picker.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';

type ComponentArgs = {
    invalid?: boolean;
    readonly?: boolean;
    quiet?: boolean;
    disabled?: boolean;
    autofocus?: boolean;
    precision?: Precision;
    min?: DateValue;
    max?: DateValue;
    value?: DateTimePickerValue;
};

type StoryArgs = ComponentArgs & {
    onChange?: () => void;
    onInput?: () => void;
};

const storyMeta = {
    title: 'DateTimePicker',
    component: 'sp-date-time-picker',
    args: {
        precision: undefined,
        disabled: false,
        readonly: false,
        quiet: false,
        invalid: false,
        autoFocus: false,
        min: undefined,
        max: undefined,
        value: undefined,
    },
    argTypes: {
        disabled: {
            description: "Component's disabled state",
            type: { required: false },
            control: 'boolean',
        },
        readonly: {
            description: "Component's readonly state",
            type: { required: false },
            control: 'boolean',
        },
        quiet: {
            description: "Component's quiet state",
            type: { required: false },
            control: 'boolean',
        },
        invalid: {
            description: "Component's invalid state",
            type: { required: false },
            control: 'boolean',
        },
        precision: {
            description:
                "The granularity used to display the segments of the component's value.",
            type: { required: false },
            control: 'select',
            options: Object.values(Precisions),
        },
        min: {
            description: 'Minimum date allowed',
            type: { required: false },
            control: 'date',
        },
        max: {
            description: 'Maximum date allowed',
            type: { required: false },
            control: 'date',
        },
        value: {
            description: 'The selected date of the component',
            type: { required: false },
            control: 'date',
        },
    },
    parameters: {
        actions: {
            handles: ['onChange', 'onInput'],
        },
    },
};

const computeProps = (args: StoryArgs): ComponentArgs => {
    const timestampToValue = (timestamp: number): DateValue => {
        const date = new Date();
        date.setTime(timestamp);
        return new CalendarDateTime(
            date.getFullYear(),
            date.getMonth() + 1, // Date months are 0-indexed while CalendarDate months are 1-indexed
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        );
    };

    return {
        value: args.value
            ? timestampToValue(args.value as unknown as number)
            : undefined,
        min: args.min
            ? timestampToValue(args.min as unknown as number)
            : undefined,
        max: args.max
            ? timestampToValue(args.max as unknown as number)
            : undefined,
        disabled: args.disabled,
        readonly: args.readonly,
        quiet: args.quiet,
        invalid: args.invalid,
        autofocus: args.autofocus,
        precision: args.precision,
    };
};

const Template = (args: StoryArgs = {}): TemplateResult => {
    return html`
        <sp-date-time-picker
            @change=${args.onChange}
            @input=${args.onInput}
            ...=${spreadProps(computeProps(args))}
        ></sp-date-time-picker>
    `;
};

export const Default = (args: StoryArgs): TemplateResult => Template(args);

export const disabled = (args: StoryArgs): TemplateResult => Template(args);
disabled.args = {
    disabled: true,
};

export const readonly = (args: StoryArgs): TemplateResult => Template(args);
readonly.args = {
    readonly: true,
};

export const quiet = (args: StoryArgs): TemplateResult => Template(args);
quiet.args = {
    quiet: true,
};

export const invalid = (args: StoryArgs): TemplateResult => Template(args);
invalid.args = {
    invalid: true,
};

export const autofocus = (args: StoryArgs): TemplateResult => Template(args);
autofocus.args = {
    autofocus: true,
};

export const preselectedValue = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-date-time-picker
            .value=${new CalendarDateTime(2020, 2, 16, 8, 20)}
            ...=${spreadProps(computeProps(args))}
        ></sp-date-time-picker>
    `;
};

export const minDate = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-date-time-picker
            .value=${new CalendarDate(2022, 4, 16)}
            .min=${new CalendarDate(2022, 4, 12)}
            ...=${spreadProps(computeProps(args))}
        ></sp-date-time-picker>
    `;
};

export const maxDate = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-date-time-picker
            .value=${new CalendarDate(2022, 4, 16)}
            .max=${new CalendarDateTime(2022, 4, 19, 20, 30)}
            ...=${spreadProps(computeProps(args))}
        ></sp-date-time-picker>
    `;
};

export const minAndMaxDates = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-date-time-picker
            .value=${new CalendarDate(2022, 4, 16)}
            .min=${toZoned(
                new CalendarDateTime(2022, 4, 12, 9, 15),
                'Europe/Bucharest'
            )}
            .max=${new CalendarDateTime(2022, 4, 19, 20, 30)}
            ...=${spreadProps(computeProps(args))}
        ></sp-date-time-picker>
    `;
};

export const secondPrecision = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-date-time-picker
            .value=${new CalendarDate(2022, 4, 16)}
            precision="second"
            ...=${spreadProps(computeProps(args))}
        ></sp-date-time-picker>
    `;
};

export const helpText = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-date-time-picker
            precision="day"
            ...=${spreadProps(computeProps(args))}
        >
            <sp-help-text slot="help-text">
                Please select your birthday
            </sp-help-text>
        </sp-date-time-picker>
    `;
};

export const negativeHelpText = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-date-time-picker
            .min=${new CalendarDate(2020, 0, 1)}
            .max=${new CalendarDate(2025, 0, 1)}
            ...=${spreadProps(computeProps(args))}
        >
            <sp-help-text slot="help-text">
                Change state to invalid to see the negative help text
            </sp-help-text>
            <sp-help-text slot="negative-help-text">
                Please select a date between 2020 and 2025
            </sp-help-text>
        </sp-date-time-picker>
    `;
};

export const customIcon = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-date-time-picker ...=${spreadProps(computeProps(args))}>
            <sp-icon-alert slot="calendar-icon"></sp-icon-alert>
        </sp-date-time-picker>
    `;
};

export const customWidth = (args: StoryArgs): TemplateResult[] => {
    return ['100%', '50%', '350px', 'auto'].map((width, index) => {
        const id = `date-time-picker--${index}`;
        const styles = css`
            sp-date-time-picker#${unsafeCSS(id)} {
                inline-size: ${unsafeCSS(width)};
            }
        `;

        return html`
            <style>
                ${styles}
            </style>
            <p>Width: ${width}</p>
            <div>
                <sp-date-time-picker
                    id=${id}
                    ...=${spreadProps(computeProps(args))}
                ></sp-date-time-picker>
            </div>
        `;
    });
};

const ignoredArgTypes = {
    focused: {
        table: {
            disable: true,
        },
    },
    autoFocus: {
        table: {
            disable: true,
        },
    },
    autofocus: {
        table: {
            disable: true,
        },
    },
    tabIndex: {
        table: {
            disable: true,
        },
    },
    focusElement: {
        table: {
            disable: true,
        },
    },
};

storyMeta.argTypes = {
    ...storyMeta.argTypes,
    ...ignoredArgTypes,
};

export default storyMeta;
