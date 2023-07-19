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
import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import { spreadProps } from '../../../test/lit-helpers.js';

import '@spectrum-web-components/calendar/sp-calendar.js';
import '@spectrum-web-components/theme/sp-theme.js';

const locales = [
    'cs-CZ',
    'cy-GB',
    'da-DK',
    'de-DE',
    'en-GB',
    'en-US',
    'es-ES',
    'fi-FI',
    'fr-FR',
    'hu-HU',
    'it-IT',
    'ja-JP',
    'ko-KR',
    'nb-NO',
    'nl-NL',
    'pl-PL',
    'pt-BR',
    'ru-RU',
    'sv-SE',
    'tr-TR',
    'uk-UA',
    'zh-Hans-CN',
    'zh-Hans-CN-u-nu-hanidec',
    'zh-Hant-TW',
    'zz-ZY',
    'zz-ZZ',
] as const;

const defaultLocale = 'en-US';

const hiddenProperty = {
    table: {
        disable: true,
    },
};

export default {
    title: 'Calendar',
    component: 'sp-calendar',

    argTypes: {
        lang: {
            options: locales,
            control: {
                type: 'select',
            },
            table: {
                defaultValue: {
                    summary: defaultLocale,
                },
            },
        },

        // Don't render private properties and getters in the Storybook UI
        currentDate: { ...hiddenProperty },
        minDate: { ...hiddenProperty },
        maxDate: { ...hiddenProperty },
        weeksInCurrentMonth: { ...hiddenProperty },
        weekdays: { ...hiddenProperty },
        languageResolver: { ...hiddenProperty },
        timeZone: { ...hiddenProperty },
        locale: { ...hiddenProperty },
        today: { ...hiddenProperty },

        // Inherited
        _dirParent: { ...hiddenProperty },
        shadowRoot: { ...hiddenProperty },
        dir: { ...hiddenProperty },
        isLTR: { ...hiddenProperty },
    },

    args: {
        lang: defaultLocale,
    },

    parameters: {
        controls: {
            // Hide "This story is not configured to handle controls" warning
            hideNoControlsWarning: true,
        },
        actions: {
            handles: ['onChange'],
        },
    },
};

interface StoryArgs {
    lang?: string;

    padded?: boolean;
    disabled?: boolean;
    selectedDate?: Date;
    min?: Date;
    max?: Date;

    onChange?: (date: Date) => void;

    [prop: string]: unknown;
}

const renderCalendar = (
    title: string,
    args: StoryArgs = {}
): TemplateResult => {
    return html`
        <sp-theme lang=${ifDefined(args.lang || undefined)}>
            <h1>${title}</h1>
            <h2>
                Locale:
                <code>${args.lang}</code>
            </h2>

            <hr />

            <sp-calendar
                ...=${spreadProps(args)}
                @change=${args.onChange}
            ></sp-calendar>
        </sp-theme>
    `;
};

export const Default = (args: StoryArgs = {}): TemplateResult => {
    return renderCalendar('Default', args);
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
