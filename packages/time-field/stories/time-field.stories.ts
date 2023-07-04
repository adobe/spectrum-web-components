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

import { ifDefined } from 'lit/directives/if-defined.js';

import { spreadProps } from '../../../test/lit-helpers.js';

import '@spectrum-web-components/time-field/sp-time-field.js';
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
    title: 'Time Field',
    component: 'sp-time-field',

    argTypes: {
        locale: {
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
        _languageResolver: { ...hiddenProperty },
        _locale: { ...hiddenProperty },
        _timeZone: { ...hiddenProperty },
        _currentTime: { ...hiddenProperty },
        now: { ...hiddenProperty },

        // Inherited
        _dirParent: { ...hiddenProperty },
        shadowRoot: { ...hiddenProperty },
        dir: { ...hiddenProperty },
        isLTR: { ...hiddenProperty },
    },

    args: {
        locale: defaultLocale,
    },

    parameters: {
        controls: {
            // Hide "This story is not configured to handle controls" warning
            hideNoControlsWarning: true,
        },
    },
};

interface StoryArgs {
    locale?: string;

    selectedTime?: Date;

    [prop: string]: unknown;
}

const renderTimeField = (
    title: string,
    args: StoryArgs = {}
): TemplateResult => {
    return html`
        <style>
            .demo-title,
            .demo-subtitle {
                line-height: 1.25;
            }
        </style>

        <sp-theme lang=${ifDefined(args.locale || undefined)}>
            <h1 class="demo-title">${title}</h1>
            <h2 class="demo-subtitle">Locale: ${args.locale}</h2>
            <hr />
            <sp-time-field ...=${spreadProps(args)}></sp-time-field>
        </sp-theme>
    `;
};

export const Default = (args: StoryArgs = {}): TemplateResult => {
    return renderTimeField('Default', args);
};

export const selectedTime = (args: StoryArgs = {}): TemplateResult[] => {
    const formatter = Intl.DateTimeFormat(args.locale || defaultLocale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return [
        { time: new Date(2015, 1, 28, 9, 31, 7), desc: 'morning' },
        { time: new Date(2021, 10, 2, 16, 1, 54), desc: 'afternoon' },
    ].map((info) => {
        const formatted = formatter.format(info.time);
        const title = `Selected Time (${info.desc}): ${formatted}`;

        args = {
            ...args,
            selectedTime: info.time,
        };

        return renderTimeField(title, args);
    });
};
