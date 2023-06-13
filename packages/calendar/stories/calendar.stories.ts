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

import { spreadProps } from '../../../test/lit-helpers.js';

import '../sp-calendar.js';

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
    'zh-Hant-TW',
    'zz-ZY',
    'zz-ZZ',
] as const;
type Locale = typeof locales;

// Don't render private properties and getters in Storybook UI
const hiddenProperty = {
    table: {
        disable: true,
    },
};

export default {
    title: 'Calendar',
    component: 'sp-calendar',

    argTypes: {
        padded: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },

        _languageResolver: { ...hiddenProperty },
        _locale: { ...hiddenProperty },
        _timeZone: { ...hiddenProperty },
        _currentDate: { ...hiddenProperty },
        today: { ...hiddenProperty },

        shadowRoot: { ...hiddenProperty },
        _dirParent: { ...hiddenProperty },
        dir: { ...hiddenProperty },
        isLTR: { ...hiddenProperty },
    },

    args: {
        padded: false,
        disabled: false,
    },

    // Hide "This story is not configured to handle controls" warning
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
};

interface StoryArgs {
    padded?: boolean;
    disabled?: boolean;
    locale?: Locale;

    [prop: string]: unknown;
}

export const Default = (args: StoryArgs = {}): TemplateResult => {
    return html`
        <sp-calendar ...=${spreadProps(args)}></sp-calendar>
    `;
};

export const withSelectedDate = (args: StoryArgs = {}): TemplateResult => {
    return html`
        <sp-calendar
            ...=${spreadProps(args)}
            .selectedDate=${new Date(2019, 9, 7)}
        ></sp-calendar>
    `;
};

export const otherLocales = (args: StoryArgs = {}): TemplateResult => {
    return html`
        <sp-theme lang=${args.locale}>
            <sp-calendar ...=${spreadProps(args)}></sp-calendar>
        </sp-theme>
    `;
};

otherLocales.args = {
    locale: 'en-US',
};
otherLocales.argTypes = {
    locale: {
        name: 'locale',
        description: 'Locale',
        type: { name: 'string', required: true },
        control: {
            type: 'select',
            options: locales,
        },
    },
};
