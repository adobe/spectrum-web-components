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
import { html, render, TemplateResult } from '@spectrum-web-components/base';
import { defaultLocale } from '@spectrum-web-components/story-decorator/src/StoryDecorator.js';

import { spreadProps } from '../../../test/lit-helpers.js';

import '@spectrum-web-components/calendar/sp-calendar.js';
import '@spectrum-web-components/theme/sp-theme.js';

export default {
    title: 'Calendar',
    component: 'sp-calendar',
    parameters: {
        actions: {
            handles: ['onChange'],
        },
    },
};

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

interface SpreadStoryArgs {
    [prop: string]: unknown;
}

const renderCalendar = (
    title: string,
    args: StoryArgs = {}
): TemplateResult => {
    const story = html`
        <h1>${title}</h1>
        <hr />
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

        if (container) {
            render(story, container as HTMLElement);
        }
    });

    return html`
        <div class="story-container-${randomId}"></div>
    `;
};

export const Default = (args: StoryArgs = {}): TemplateResult => {
    return renderCalendar('Default', args);
};

export const selectedDate = (args: StoryArgs = {}): TemplateResult => {
    const date = new Date(2019, 0, 30);
    const formatted = Intl.DateTimeFormat(defaultLocale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);

    args = {
        ...args,
        selectedDate: date,
    };

    return renderCalendar(`Selected Date: ${formatted}`, args);
};

export const minimumDate = (args: StoryArgs = {}): TemplateResult => {
    const today = new Date();
    const lastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
    );

    const formatted = Intl.DateTimeFormat(defaultLocale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(lastMonth);

    args = {
        ...args,
        min: lastMonth,
    };

    return renderCalendar(`Minimum Date: ${formatted}`, args);
};

export const maximumDate = (args: StoryArgs = {}): TemplateResult => {
    const today = new Date();
    const nextMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
    );

    const formatted = Intl.DateTimeFormat(defaultLocale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(nextMonth);

    args = {
        ...args,
        max: nextMonth,
    };

    return renderCalendar(`Maximum Date: ${formatted}`, args);
};

export const disabled = (args: StoryArgs = {}): TemplateResult => {
    return renderCalendar(`Disabled? ${args.disabled}`, args);
};

disabled.argTypes = {
    disabled: {
        control: 'boolean',
        table: {
            defaultValue: {
                summary: true,
            },
        },
    },
};

disabled.args = {
    disabled: true,
};

export const padded = (args: StoryArgs = {}): TemplateResult => {
    return renderCalendar(`Padded? ${args.padded}`, args);
};

padded.argTypes = {
    padded: {
        control: 'boolean',
        table: {
            defaultValue: {
                summary: true,
            },
        },
    },
};

padded.args = {
    padded: true,
};
