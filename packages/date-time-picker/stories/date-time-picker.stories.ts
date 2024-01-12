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
    nothing,
    render,
    TemplateResult,
} from '@spectrum-web-components/base';
import { TimeGranularity } from '@spectrum-web-components/input-segments/src/types.js';
import { defaultLocale } from '@spectrum-web-components/story-decorator/src/StoryDecorator.js';

import { spreadProps } from '../../../test/lit-helpers.js';

import '@spectrum-web-components/date-time-picker/sp-date-time-picker.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';

export default {
    title: 'Date∕Time Picker',
    component: 'sp-date-time-picker',
    parameters: {
        actions: {
            handles: ['onChange'],
        },
    },
};

const timeGranularities: TimeGranularity[] = ['hour', 'minute', 'second'];

type ComponentArgs = {
    selectedDateTime?: Date;
    timeGranularity?: TimeGranularity;
    quiet?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    autofocus?: boolean;
    valid?: boolean;
    invalid?: boolean;
};

type StoryArgs = ComponentArgs & {
    onChange?: (dateTime: Date) => void;
};

interface SpreadStoryArgs {
    [prop: string]: unknown;
}

const renderDateTimePicker = (
    title: string,
    args: StoryArgs = {},
    content: TemplateResult | typeof nothing = nothing
): TemplateResult => {
    const story = html`
        <h1>${title}</h1>
        <hr />
        <sp-date-time-picker
            ...=${spreadProps(args as SpreadStoryArgs)}
            @change=${args.onChange}
        >
            ${content}
        </sp-date-time-picker>
    `;

    const randomId = String(Math.floor(Math.random() * 99999));

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
    return renderDateTimePicker('Default', args);
};

export const selectedDateTime = (args: StoryArgs = {}): TemplateResult[] => {
    const formatter = Intl.DateTimeFormat(defaultLocale, {
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

        return renderDateTimePicker(title, args);
    });
};

export const timeGranularity = (args: StoryArgs = {}): TemplateResult => {
    args = {
        ...args,
        timeGranularity: args.timeGranularity,
        selectedDateTime: new Date(2021, 10, 2, 16, 1, 54),
    };

    return renderDateTimePicker(
        `Time Granularity: ${args.timeGranularity}`,
        args
    );
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
    return renderDateTimePicker(`Disabled? ${args.disabled}`, args);
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
    return renderDateTimePicker(`Quiet? ${args.quiet}`, args);
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
    return renderDateTimePicker(`Read only? ${args.readonly}`, args);
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

    return renderDateTimePicker('Auto focus', args);
};

export const valid = (args: StoryArgs = {}): TemplateResult => {
    return renderDateTimePicker(`Is valid? ${args.valid}`, args);
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
    return renderDateTimePicker(`Is invalid? ${args.invalid}`, args);
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

    return renderDateTimePicker(`With help text`, args, content);
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

    return renderDateTimePicker('With negative help text', args, content);
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

export const customIcon = (args: StoryArgs = {}): TemplateResult => {
    const content = html`
        <sp-icon-alert slot="calendar-icon"></sp-icon-alert>
    `;

    return renderDateTimePicker('Custom icon', args, content);
};
