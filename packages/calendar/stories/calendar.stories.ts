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
import { CalendarDate, DateValue } from '@internationalized/date';
import { html, type TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/calendar/sp-calendar.js';
import '@spectrum-web-components/theme/sp-theme.js';
import { spreadProps } from '../../../test/lit-helpers.js';
import { CalendarValue } from '../src/types.js';

type ComponentArgs = {
    value?: CalendarValue;
    min?: DateValue;
    max?: DateValue;
    padded?: boolean;
    disabled?: boolean;
};

type StoryArgs = ComponentArgs & {
    onChange?: (dateTime: CalendarValue) => void;
};

export default {
    title: 'Calendar',
    component: 'sp-calendar',
    args: {
        disabled: false,
        padded: false,
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
        padded: {
            description: "Component's padded variant",
            type: { required: false },
            control: 'boolean',
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
            handles: ['onChange'],
        },
    },
};

const dateControlsDisabledArgTypes = {
    min: {
        table: {
            disable: true,
        },
    },
    max: {
        table: {
            disable: true,
        },
    },
    value: {
        table: {
            disable: true,
        },
    },
};

const timestampToValue = (timestamp: number): CalendarValue => {
    const date = new Date();
    date.setTime(timestamp);
    return new CalendarDate(
        date.getFullYear(),
        date.getMonth() + 1, // Date months are 0-indexed while CalendarDate months are 1-indexed
        date.getDate()
    );
};

const Template = (args: StoryArgs = {}): TemplateResult => {
    args.value = args.value
        ? timestampToValue(args.value as unknown as number)
        : undefined;
    args.min = args.min
        ? timestampToValue(args.min as unknown as number)
        : undefined;
    args.max = args.max
        ? timestampToValue(args.max as unknown as number)
        : undefined;

    return html`
        <sp-calendar
            ...=${spreadProps(args)}
            @change=${args.onChange}
        ></sp-calendar>
    `;
};

export const Default = (args: StoryArgs): TemplateResult => Template(args);
Default.swc_vrt = {
    // Needed because the style on the current day will cause the snapshot to fail every day it runs
    skip: true,
};

export const disabled = (args: StoryArgs): TemplateResult => Template(args);
disabled.args = {
    disabled: true,
};

export const padded = (args: StoryArgs): TemplateResult => Template(args);
padded.args = {
    padded: true,
};

export const preselectedValue = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-calendar
            ...=${spreadProps(args)}
            .value=${new CalendarDate(2022, 4, 16)}
        ></sp-calendar>
    `;
};
preselectedValue.argTypes = dateControlsDisabledArgTypes;

export const minDate = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-calendar
            ...=${spreadProps(args)}
            .min=${new CalendarDate(2022, 4, 12)}
            .value=${new CalendarDate(2022, 4, 16)}
        ></sp-calendar>
    `;
};
minDate.argTypes = dateControlsDisabledArgTypes;

export const maxDate = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-calendar
            ...=${spreadProps(args)}
            .max=${new CalendarDate(2022, 4, 19)}
            .value=${new CalendarDate(2022, 4, 16)}
        ></sp-calendar>
    `;
};
maxDate.argTypes = dateControlsDisabledArgTypes;

export const minAndMaxDates = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-calendar
            ...=${spreadProps(args)}
            .min=${new CalendarDate(2022, 4, 12)}
            .max=${new CalendarDate(2022, 4, 19)}
            .value=${new CalendarDate(2022, 4, 16)}
        ></sp-calendar>
    `;
};
minAndMaxDates.argTypes = dateControlsDisabledArgTypes;

export const bengaliIndiaLocale = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-theme lang="bn-IN">
            <sp-calendar
                ...=${spreadProps(args)}
                .value=${new CalendarDate(2022, 4, 16)}
            ></sp-calendar>
        </sp-theme>
    `;
};
