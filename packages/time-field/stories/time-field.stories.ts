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
import { html, nothing, TemplateResult } from '@spectrum-web-components/base';
import { TimeGranularity } from '@spectrum-web-components/input-segments/src/types.js';

import { spreadProps } from '../../../test/lit-helpers.js';

import '@spectrum-web-components/help-text/sp-help-text.js';
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

const timeGranularities: TimeGranularity[] = ['hour', 'minute', 'second'];

const hiddenProperty = {
    table: {
        disable: true,
    },
};

export default {
    title: 'Time Field',
    component: 'sp-time-field',

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
        firstEditableSegment: { ...hiddenProperty },
        includeDate: { ...hiddenProperty },
        includeTime: { ...hiddenProperty },
        previousLocale: { ...hiddenProperty },
        currentDateTime: { ...hiddenProperty },
        newDateTime: { ...hiddenProperty },
        segments: { ...hiddenProperty },
        createSegments: { ...hiddenProperty },
        languageResolver: { ...hiddenProperty },
        timeZone: { ...hiddenProperty },
        formatter: { ...hiddenProperty },
        locale: { ...hiddenProperty },
        daySegment: { ...hiddenProperty },
        monthSegment: { ...hiddenProperty },
        yearSegment: { ...hiddenProperty },
        hourSegment: { ...hiddenProperty },
        minuteSegment: { ...hiddenProperty },
        secondSegment: { ...hiddenProperty },
        dayPeriodSegment: { ...hiddenProperty },
        is12HourClock: { ...hiddenProperty },

        // Inherited
        _dirParent: { ...hiddenProperty },
        shadowRoot: { ...hiddenProperty },
        dir: { ...hiddenProperty },
        isLTR: { ...hiddenProperty },
        'allowed-keys': { ...hiddenProperty },
        allowedKeys: { ...hiddenProperty },
        autocomplete: { ...hiddenProperty },
        displayValue: { ...hiddenProperty },
        focused: { ...hiddenProperty },
        focusElement: { ...hiddenProperty },
        grows: { ...hiddenProperty },
        inputElement: { ...hiddenProperty },
        label: { ...hiddenProperty },
        maxlength: { ...hiddenProperty },
        minlength: { ...hiddenProperty },
        multiline: { ...hiddenProperty },
        pattern: { ...hiddenProperty },
        placeholder: { ...hiddenProperty },
        renderInput: { ...hiddenProperty },
        renderMultiline: { ...hiddenProperty },
        type: { ...hiddenProperty },
        value: { ...hiddenProperty },
        _type: { ...hiddenProperty },
        _value: { ...hiddenProperty },
        input: { ...hiddenProperty },
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

    selectedDateTime?: Date;
    timeGranularity?: TimeGranularity;
    quiet?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    valid?: boolean;
    invalid?: boolean;

    onChange?: (dateTime: Date) => void;

    [prop: string]: unknown;
}

const renderTimeField = (
    title: string,
    args: StoryArgs = {},
    content: TemplateResult | typeof nothing = nothing
): TemplateResult => {
    return html`
        <style>
            .demo-title,
            .demo-subtitle {
                line-height: 1.25;
            }
        </style>

        <sp-theme lang=${args.lang ?? defaultLocale}>
            <h1 class="demo-title">${title}</h1>
            <h2 class="demo-subtitle">Locale: ${args.lang}</h2>
            <hr />
            <sp-time-field ...=${spreadProps(args)} @change=${args.onChange}>
                ${content}
            </sp-time-field>
        </sp-theme>
    `;
};

export const Default = (args: StoryArgs = {}): TemplateResult => {
    return renderTimeField('Default', args);
};

export const selectedDateTime = (args: StoryArgs = {}): TemplateResult[] => {
    const formatter = Intl.DateTimeFormat(args.lang ?? defaultLocale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return [
        new Date(1995, 1, 28, 9, 31, 7),
        new Date(2021, 10, 2, 16, 1, 54),
    ].map((dateTime) => {
        const formatted = formatter.format(dateTime);
        const title = `Selected Date/Time: ${formatted}`;

        args = {
            ...args,
            selectedDateTime: dateTime,
        };

        return renderTimeField(title, args);
    });
};

export const timeGranularity = (args: StoryArgs = {}): TemplateResult => {
    args = {
        ...args,
        timeGranularity: args.timeGranularity,
    };

    return renderTimeField(`Time Granularity: ${args.timeGranularity}`, args);
};

timeGranularity.argTypes = {
    timeGranularity: {
        options: timeGranularities,
        control: {
            type: 'select',
        },
        table: {
            defaultValue: {
                summary: 'minute',
            },
        },
    },
};

timeGranularity.args = {
    timeGranularity: 'second',
};

export const disabled = (args: StoryArgs = {}): TemplateResult => {
    return renderTimeField(`Disabled? ${args.disabled}`, args);
};

disabled.argTypes = {
    disabled: {
        control: 'boolean',
        table: {
            defaultValue: {
                summary: false,
            },
        },
    },
};

disabled.args = {
    disabled: true,
};

export const quiet = (args: StoryArgs = {}): TemplateResult => {
    return renderTimeField(`Quiet? ${args.quiet}`, args);
};

quiet.argTypes = {
    quiet: {
        control: 'boolean',
        table: {
            defaultValue: {
                summary: false,
            },
        },
    },
};

quiet.args = {
    quiet: true,
};

export const readonly = (args: StoryArgs = {}): TemplateResult => {
    return renderTimeField(`Read only? ${args.readonly}`, args);
};

readonly.argTypes = {
    readonly: {
        control: 'boolean',
        table: {
            defaultValue: {
                summary: false,
            },
        },
    },
};

readonly.args = {
    readonly: true,
};

export const autoFocus = (args: StoryArgs = {}): TemplateResult => {
    args = {
        ...args,
        autofocus: true,
    };

    return renderTimeField('Auto focus', args);
};

export const valid = (args: StoryArgs = {}): TemplateResult => {
    return renderTimeField(`Is valid? ${args.valid}`, args);
};

valid.argTypes = {
    valid: {
        control: 'boolean',
        table: {
            defaultValue: {
                summary: false,
            },
        },
    },
};

valid.args = {
    valid: true,
};

export const invalid = (args: StoryArgs = {}): TemplateResult => {
    return renderTimeField(`Is invalid? ${args.invalid}`, args);
};

invalid.argTypes = {
    invalid: {
        control: 'boolean',
        table: {
            defaultValue: {
                summary: false,
            },
        },
    },
};

invalid.args = {
    invalid: true,
};

export const helpText = (args: StoryArgs = {}): TemplateResult => {
    const content = html`
        <sp-help-text slot="help-text">My default help text</sp-help-text>
    `;

    return renderTimeField(`With help text`, args, content);
};

export const negativeHelpText = (args: StoryArgs = {}): TemplateResult => {
    const content = html`
        <sp-help-text slot="help-text">
            Default help text (displayed only when not invalid)
        </sp-help-text>
        <sp-help-text slot="negative-help-text">
            This field is required!
        </sp-help-text>
    `;

    return renderTimeField(`With negative help text`, args, content);
};

negativeHelpText.argTypes = {
    invalid: {
        control: 'boolean',
        table: {
            defaultValue: {
                summary: false,
            },
        },
    },
};

negativeHelpText.args = {
    invalid: true,
};
