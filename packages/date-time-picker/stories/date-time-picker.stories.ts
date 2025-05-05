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
    CSSResultArray,
    html,
    SpectrumElement,
    TemplateResult,
    unsafeCSS,
} from '@spectrum-web-components/base';
import {
    DateTimePicker,
    Precision,
    Precisions,
} from '@spectrum-web-components/date-time-picker';

import { spreadProps } from '../../../test/lit-helpers.js';
import { state } from 'lit/decorators.js';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/date-time-picker/sp-date-time-picker.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-delete.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/picker/sp-picker.js';

import { Picker } from '@spectrum-web-components/picker';

type ComponentArgs = {
    invalid?: boolean;
    readonly?: boolean;
    quiet?: boolean;
    disabled?: boolean;
    autofocus?: boolean;
    precision?: Precision;
    min?: DateValue;
    max?: DateValue;
    value?: DateValue;
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
    const idNumber = Math.random().toString(36);
    const id = `date-picker-${idNumber}`;
    return html`
        <sp-field-label for=${id}>Event date</sp-field-label>
        <sp-date-time-picker
            id=${id}
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
        <sp-field-label for="date-picker">Event date</sp-field-label>
        <sp-date-time-picker
            id="date-picker-preselected"
            .value=${new CalendarDateTime(2020, 2, 16, 8, 20)}
            ...=${spreadProps(computeProps(args))}
        ></sp-date-time-picker>
    `;
};

export const minDate = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="date-picker-min">Event date</sp-field-label>
        <sp-date-time-picker
            id="date-picker-min"
            .value=${new CalendarDate(2022, 4, 16)}
            .min=${new CalendarDate(2022, 4, 12)}
            ...=${spreadProps(computeProps(args))}
        ></sp-date-time-picker>
    `;
};

export const maxDate = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="date-picker-max">Event date</sp-field-label>
        <sp-date-time-picker
            id="date-picker-max"
            .value=${new CalendarDate(2022, 4, 16)}
            .max=${new CalendarDateTime(2022, 4, 19, 20, 30)}
            ...=${spreadProps(computeProps(args))}
        ></sp-date-time-picker>
    `;
};

export const minAndMaxDates = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="date-picker-min-max">Event date</sp-field-label>
        <sp-date-time-picker
            id="date-picker-min-max"
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

export const customPrecision = (args: StoryArgs): TemplateResult => {
    const styles = css`
        :host {
            display: flex;
            gap: 12px;
        }

        sp-field-label {
            width: max-content;
        }
    `;

    class CustomPrecisionDateTimePicker extends SpectrumElement {
        public static override get styles(): CSSResultArray {
            return [styles];
        }

        @state()
        private precision: Precision = 'second';

        private handlePrecisionChange(event: Event): void {
            const picker = event.target as Picker;
            this.precision = picker.value as Precision;
        }

        public override render(): TemplateResult {
            return html`
                <div>
                    <sp-field-label for="date-picker-precision">
                        Event date
                    </sp-field-label>
                    <sp-date-time-picker
                        id="date-picker-precision"
                        .value=${new CalendarDate(2022, 4, 16)}
                        ...=${spreadProps(computeProps(args))}
                        precision=${this.precision}
                    ></sp-date-time-picker>
                </div>

                <div>
                    <sp-field-label for="picker-precision">
                        Precision
                    </sp-field-label>
                    <sp-picker
                        @change=${this.handlePrecisionChange}
                        value=${this.precision}
                    >
                        ${Object.values(Precisions).map(
                            (precision) => html`
                                <sp-menu-item>${precision}</sp-menu-item>
                            `
                        )}
                    </sp-picker>
                </div>
            `;
        }
    }

    customElements.define(
        'custom-precision-date-time-picker',
        CustomPrecisionDateTimePicker
    );

    return html`
        <custom-precision-date-time-picker></custom-precision-date-time-picker>
    `;
};

export const helpText = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="date-picker-help">Event date</sp-field-label>
        <sp-date-time-picker
            id="date-picker-help"
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
        <sp-field-label for="date-picker-negative">Event date</sp-field-label>
        <sp-date-time-picker
            id="date-picker-negative"
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
        <sp-field-label for="date-picker-icon">Event date</sp-field-label>
        <sp-date-time-picker
            id="date-picker-icon"
            ...=${spreadProps(computeProps(args))}
        >
            <sp-icon-alert slot="calendar-icon"></sp-icon-alert>
        </sp-date-time-picker>
    `;
};

export const customWidth = (args: StoryArgs): TemplateResult[] => {
    return ['100%', '50%', '350px', 'auto'].map((width, index) => {
        const id = `date-picker--${index}`;
        const styles = css`
            sp-date-time-picker#${unsafeCSS(id)} {
                inline-size: ${unsafeCSS(width)};
            }
        `;

        return html`
            <style>
                ${styles}
            </style>
            <sp-field-label for=${id}>
                Event date - width: ${width}
            </sp-field-label>
            <div>
                <sp-date-time-picker
                    id=${id}
                    ...=${spreadProps(computeProps(args))}
                ></sp-date-time-picker>
            </div>
        `;
    });
};

export const clearSelected = (args: StoryArgs): TemplateResult => {
    const styles = css`
        sp-action-button {
            margin-inline-start: 24px;
        }
    `;

    class ClearableDateTimePicker extends SpectrumElement {
        public static override get styles(): CSSResultArray {
            return [styles];
        }

        private handleClear(): void {
            const picker = this.shadowRoot?.querySelector(
                'sp-date-time-picker'
            ) as DateTimePicker;
            picker.clear();
            picker.invalid = false;
        }

        public override render(): TemplateResult {
            return html`
                <sp-field-label for="clearable-date-time-picker">
                    Event date
                </sp-field-label>
                <sp-date-time-picker
                    id="clearable-date-time-picker"
                    ...=${spreadProps(computeProps(args))}
                ></sp-date-time-picker>
                <sp-action-button @click=${() => this.handleClear()}>
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                    Clear
                </sp-action-button>
            `;
        }
    }

    if (!customElements.get('clearable-date-time-picker'))
        customElements.define(
            'clearable-date-time-picker',
            ClearableDateTimePicker
        );

    return html`
        <clearable-date-time-picker></clearable-date-time-picker>
    `;
};

clearSelected.swc_vrt = {
    skip: true,
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
