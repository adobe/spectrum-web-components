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
    html,
    render,
    type TemplateResult,
} from '@spectrum-web-components/base';
import { spreadProps } from '../../../test/lit-helpers.js';
import '@spectrum-web-components/calendar/sp-calendar.js';

type ComponentArgs = {
    selectedDate?: Date;
    min?: Date;
    max?: Date;
    padded?: boolean;
    disabled?: boolean;
};

type StoryArgs = ComponentArgs & {
    onChange?: (dateTime: Date) => void;
};

export default {
    title: 'Calendar',
    component: 'sp-calendar',
    args: {
        disabled: false,
        padded: false,
        min: undefined,
        max: undefined,
        selectedDate: undefined,
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
        selectedDate: {
            description: 'The pre-selected date of the component',
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

interface SpreadStoryArgs {
    [prop: string]: unknown;
}

const Template = (args: StoryArgs = {}): TemplateResult => {
    args.min = args.min ? new Date(args.min) : undefined;
    args.max = args.max ? new Date(args.max) : undefined;
    args.selectedDate = args.selectedDate
        ? new Date(args.selectedDate)
        : undefined;

    const story = html`
        <sp-calendar
            ...=${spreadProps(args as SpreadStoryArgs)}
            @change=${args.onChange}
        ></sp-calendar>
    `;

    const randomId = Math.floor(Math.random() * 99999);

    requestAnimationFrame(() => {
        const container = document.querySelector(
            `.story-container-${randomId}`
        );

        if (container) render(story, container as HTMLElement);
    });

    return html`
        <div class="story-container-${randomId}"></div>
    `;
};

export const Default = (args: StoryArgs): TemplateResult => Template(args);
export const disabled = (args: StoryArgs): TemplateResult => Template(args);
disabled.args = {
    disabled: true,
};

export const selectedDate = (args: StoryArgs): TemplateResult => Template(args);
selectedDate.args = {
    selectedDate: new Date(2022, 4, 16),
};

export const minDate = (args: StoryArgs): TemplateResult => Template(args);
minDate.args = {
    min: new Date(2022, 4, 8),
    selectedDate: new Date(2022, 4, 16),
};

export const maxDate = (args: StoryArgs): TemplateResult => Template(args);
maxDate.args = {
    max: new Date(2022, 4, 22),
    selectedDate: new Date(2022, 4, 16),
};

export const minAndMaxDates = (args: StoryArgs): TemplateResult =>
    Template(args);
minAndMaxDates.args = {
    min: new Date(2022, 4, 8),
    max: new Date(2022, 4, 22),
    selectedDate: new Date(2022, 4, 16),
};
