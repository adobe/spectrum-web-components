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

import {
    css,
    CSSResultArray,
    html,
    SpectrumElement,
    type TemplateResult,
} from '@spectrum-web-components/base';
import { spreadProps } from '../../../test/lit-helpers.js';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/calendar/sp-calendar.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-delete.js';
import '@spectrum-web-components/theme/sp-theme.js';

type ComponentArgs = {
    value?: DateValue;
    min?: DateValue;
    max?: DateValue;
    padded?: boolean;
    disabled?: boolean;
};

type StoryArgs = ComponentArgs & {
    onChange?: (dateTime: DateValue) => void;
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

const computeProps = (args: StoryArgs): ComponentArgs => {
    const timestampToValue = (timestamp: number): DateValue => {
        const date = new Date();
        date.setTime(timestamp);
        return new CalendarDate(
            date.getFullYear(),
            date.getMonth() + 1, // Date months are 0-indexed while CalendarDate months are 1-indexed
            date.getDate()
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
        padded: args.padded,
        disabled: args.disabled,
    };
};

const Template = (args: StoryArgs = {}): TemplateResult => {
    return html`
        <sp-calendar
            ...=${spreadProps(computeProps(args))}
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
            .value=${new CalendarDate(2022, 4, 16)}
            ...=${spreadProps(computeProps(args))}
        ></sp-calendar>
    `;
};

export const minDate = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-calendar
            .min=${new CalendarDate(2022, 4, 12)}
            .value=${new CalendarDate(2022, 4, 16)}
            ...=${spreadProps(computeProps(args))}
        ></sp-calendar>
    `;
};

export const maxDate = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-calendar
            .max=${new CalendarDate(2022, 4, 19)}
            .value=${new CalendarDate(2022, 4, 16)}
            ...=${spreadProps(computeProps(args))}
        ></sp-calendar>
    `;
};

export const minAndMaxDates = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-calendar
            .min=${new CalendarDate(2022, 4, 12)}
            .max=${new CalendarDate(2022, 4, 19)}
            .value=${new CalendarDate(2022, 4, 16)}
            ...=${spreadProps(computeProps(args))}
        ></sp-calendar>
    `;
};

export const bengaliIndiaLocale = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-theme lang="bn-IN">
            <sp-calendar
                .value=${new CalendarDate(2022, 4, 16)}
                ...=${spreadProps(computeProps(args))}
            ></sp-calendar>
        </sp-theme>
    `;
};

export const clearSelected = (args: StoryArgs): TemplateResult => {
    const styles = css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            max-width: max-content;
        }
    `;

    class ClearableCalendar extends SpectrumElement {
        public static override get styles(): CSSResultArray {
            return [styles];
        }

        private handleClear(): void {
            this.shadowRoot?.querySelector('sp-calendar')?.clear();
        }

        public override render(): TemplateResult {
            return html`
                <sp-calendar
                    ...=${spreadProps(computeProps(args))}
                ></sp-calendar>
                <sp-action-button @click=${() => this.handleClear()}>
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                    Clear
                </sp-action-button>
            `;
        }
    }

    if (!customElements.get('clearable-calendar'))
        customElements.define('clearable-calendar', ClearableCalendar);

    return html`
        <clearable-calendar></clearable-calendar>
    `;
};

clearSelected.swc_vrt = {
    skip: true,
};
