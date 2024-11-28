/*
Copyright 2024 Adobe. All rights reserved.
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
    DateFormatter,
    getLocalTimeZone,
    now,
    Time,
    toCalendarDate,
    toCalendarDateTime,
    toZoned,
    ZonedDateTime,
} from '@internationalized/date';
import { NumberParser } from '@internationalized/number';
import {
    CSSResultArray,
    html,
    nothing,
    PropertyValues,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import {
    ClassInfo,
    classMap,
    ifDefined,
    StyleInfo,
    styleMap,
    when,
} from '@spectrum-web-components/base/src/directives.js';
import { Calendar, type DateValue } from '@spectrum-web-components/calendar';
import { ManageHelpText } from '@spectrum-web-components/help-text/src/manage-help-text.js';
import {
    LanguageResolutionController,
    languageResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';

import styles from './date-time-picker.css.js';
import {
    DateTimePickerValue,
    EditableSegmentType,
    Precision,
    Precisions,
    SegmentTypes,
} from './types.js';

// TODO: Load dependencies lazily when possible
import '@spectrum-web-components/calendar/sp-calendar.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-calendar.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/picker-button/sp-picker-button.js';
import '@spectrum-web-components/popover/sp-popover.js';
import {
    equalSegmentValues,
    isCalendarDate,
    isCalendarDateTime,
    isZonedDateTime,
} from './helpers.js';
import { DateTimeSegments } from './segments/DateTimeSegments.js';
import { EditableSegment } from './segments/EditableSegment.js';
import { LiteralSegment } from './segments/LiteralSegment.js';
import { SegmentsFactory } from './segments/SegmentsFactory.js';
import { ClearModifier } from './segments/modifiers/ClearModifier.js';
import { DecrementModifier } from './segments/modifiers/DecrementModifier.js';
import { IncrementModifier } from './segments/modifiers/IncrementModifier.js';
import { InputModifier } from './segments/modifiers/InputModifier.js';
import { type SegmentsModifierParams } from './segments/modifiers/SegmentsModifier.js';

/**
 * @element sp-date-time-picker
 *
 * @event change - Announces when a new date/time is committed by the user
 * @event input - Announces when the user's input changes the component's segments
 *
 * @slot calendar-icon - The icon used in the calendar button
 * @slot help-text - Default or non-negative help text to associate to your form element
 * @slot negative-help-text - Negative help text to associate to your form element when `invalid`
 */
export class DateTimePicker extends ManageHelpText(
    SizedMixin(Focusable, {
        noDefaultSize: true,
    })
) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * The selected date of the component. If defined, this also indicates where the calendar opens.
     * If not, the calendar opens at the current month, and placeholder values are shown.
     */
    @property({ attribute: false })
    value?: DateTimePickerValue;

    /**
     * The minimum valid date a user can select
     */
    @property({ attribute: false })
    min?: DateValue;

    /**
     * The maximum valid date a user can select
     */
    @property({ attribute: false })
    max?: DateValue;

    /**
     * The granularity used to display the segments of the component's value
     */
    @property({ type: String, reflect: true })
    public get precision(): Precision {
        return this._precision;
    }

    public set precision(value: Precision) {
        this.isUserSetPrecision = true;
        const oldValue = this._precision;
        if (value === oldValue) return;
        this._precision = value;
        this.requestUpdate('precision', oldValue);
    }
    private _precision: Precision = Precisions.Minute;
    private isUserSetPrecision = false;

    /**
     * Whether the `value` held by the form control is invalid.
     */
    @property({ type: Boolean, reflect: true })
    public invalid = false;

    /**
     * Whether a user can interact with the value of the form control
     */
    @property({ type: Boolean, reflect: true })
    public readonly = false;

    /**
     * Whether to display the form control with no visible background
     */
    @property({ type: Boolean, reflect: true })
    public quiet = false;

    /**
     * @private
     */
    @property({ type: Boolean, reflect: true })
    public focused = false;

    @state()
    private segments: DateTimeSegments = new DateTimeSegments([]);

    @state()
    private isCalendarOpen = false;

    @query('.editable-segment')
    firstEditableSegment!: HTMLDivElement;

    @query('.input')
    private input!: HTMLElement;

    private languageResolver = new LanguageResolutionController(this);
    private get locale(): string {
        return this.languageResolver.language;
    }

    private timeZone = getLocalTimeZone();
    private cachedLocalTime: ZonedDateTime = now(this.timeZone);
    private dateFormatter!: DateFormatter;
    private numberParser!: NumberParser;

    public override get focusElement(): HTMLElement {
        return this.firstEditableSegment;
    }

    private get currentDate(): ZonedDateTime {
        if (this.value) return toZoned(this.value, this.timeZone);
        return this.cachedLocalTime;
    }

    /**
     * Returns whether the component's precision includes time segments (hour, minute, second)
     */
    private get includesTime(): boolean {
        const timePrecisions = [
            Precisions.Hour,
            Precisions.Minute,
            Precisions.Second,
        ] as Precision[];
        return timePrecisions.includes(this.precision);
    }

    /**
     * Resets the component's value and segments
     */
    public clear(): void {
        this.value = undefined;
        this.setSegments();
    }

    constructor() {
        super();
        this.setNumberParser();
        this.setDateFormatter();
        this.addEventListener(
            'focusin',
            () => (this.previousCommitedValue = this.value)
        );
        this.addEventListener('focusout', () => this.commitValue());
    }

    protected override willUpdate(changedProperties: PropertyValues): void {
        const changesValue = changedProperties.has('value');
        const changesMin = changedProperties.has('min');
        const changesMax = changedProperties.has('max');
        const changesLocale = changedProperties.has(
            languageResolverUpdatedSymbol
        );
        const changesPrecision = changedProperties.has('precision');
        const changesSegments = changedProperties.has('segments');
        const changesDisabled = changedProperties.has('disabled');

        if (changesLocale) this.setNumberParser();
        if (changesLocale || changesPrecision) this.setDateFormatter();

        if (changesValue || changesMin || changesMax) {
            const mostSpecificDateValue = this.mostSpecificDateValue;
            if (mostSpecificDateValue) {
                this.convertDatePropsToMatch(mostSpecificDateValue);
                this.checkDatePropsCompliance(changesMin || changesMax);
                this.updateDateProps();
                this.updateDefaultPrecision();
            }
        }

        if (changesValue || changesLocale || changesPrecision)
            this.setSegments();

        if (changesSegments) this.setValueFromSegments();

        if (changesDisabled && this.isCalendarOpen) this.isCalendarOpen = false;
    }

    /**
     * Returns the component's most precise date property (min, max or value) or undefined if none is defined.
     * The order of precedence is: ZonedDateTime, CalendarDateTime, CalendarDate.
     */
    private get mostSpecificDateValue(): DateValue | undefined {
        const dateValuesDefined = [this.value, this.min, this.max].filter(
            (date) => date !== undefined
        ) as DateValue[];

        if (dateValuesDefined.length === 0) return;

        const zonedDateTimes = dateValuesDefined.filter(isZonedDateTime);
        if (zonedDateTimes.length > 0) return zonedDateTimes[0];

        const dateTimes = dateValuesDefined.filter(isCalendarDateTime);
        if (dateTimes.length > 0) return dateTimes[0];

        const dates = dateValuesDefined.filter(isCalendarDate);
        return dates[0];
    }

    /**
     * Converts the DateTimePicker's date properties (min, max and value) to match the provided date's type.
     *
     * @param dateValue - The date value to be used as a reference for the conversion
     */
    private convertDatePropsToMatch(
        dateValue: CalendarDate | CalendarDateTime | ZonedDateTime
    ): void {
        if (isZonedDateTime(dateValue)) {
            this.timeZone = dateValue.timeZone;
            this.value = this.value && toZoned(this.value, this.timeZone);
            this.min = this.min && toZoned(this.min, this.timeZone);
            this.max = this.max && toZoned(this.max, this.timeZone);
            return;
        }

        this.timeZone = getLocalTimeZone();

        if (isCalendarDateTime(dateValue)) {
            this.value = this.value && toCalendarDateTime(this.value);
            this.min = this.min && toCalendarDateTime(this.min);
            this.max = this.max && toCalendarDateTime(this.max);
            return;
        }

        this.value = this.value && toCalendarDate(this.value);
        this.min = this.min && toCalendarDate(this.min);
        this.max = this.max && toCalendarDate(this.max);
    }

    /**
     * Validates the component's date properties (min, max and value) compliance with one another.
     * If the [min, max] constraint interval is invalid, both properties are reset.
     * If the value is not within the [min, max] (valid) interval, it is reset.
     *
     * @param checkInterval - Whether to check the [min, max] interval
     */
    private checkDatePropsCompliance(checkInterval: boolean): void {
        if (checkInterval && this.min && this.max) {
            const isValidInterval = this.min.compare(this.max) < 0;
            if (!isValidInterval) {
                if (window.__swc.DEBUG)
                    window.__swc.warn(
                        this,
                        `<${this.localName}> expects the 'min' to be less than 'max'. Please ensure that 'min' property's date is earlier than 'max' property's date.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/date-time-picker' // TODO: update link
                    );
                this.min = undefined;
                this.max = undefined;
            }
        }

        if (this.isNonCompliantValue()) {
            if (window.__swc.DEBUG)
                window.__swc.warn(
                    this,
                    `<${this.localName}> expects the preselected value to comply with the min and max constraints. Please ensure that 'value' property's date is in between the dates for the 'min' and 'max' properties.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/date-time-picker' // TODO: update link
                );
            this.value = undefined;
        }

        if (!this.min && !this.max && !this.value)
            this.timeZone = getLocalTimeZone();
    }

    private isNonCompliantValue(): boolean {
        if (this.value === undefined) return false;

        return Boolean(
            (this.min && this.value.compare(this.min) < 0) ||
                (this.max && this.value.compare(this.max) > 0)
        );
    }

    /**
     * Update the component's date properties' types to include the provided precision.
     */
    private updateDateProps(): void {
        const mostSpecificDateValue = this.mostSpecificDateValue;
        if (!mostSpecificDateValue || !this.isUserSetPrecision) return;

        const shouldConvertToDateTime =
            this.includesTime && isCalendarDate(mostSpecificDateValue);

        if (shouldConvertToDateTime)
            this.convertDatePropsToMatch(
                toCalendarDateTime(mostSpecificDateValue)
            );
    }

    /**
     * Changes the component's default precision according to the most specific date property (min, max or value).
     */
    private updateDefaultPrecision(): void {
        if (this.isUserSetPrecision) return;

        const mostSpecificDateValue = this.mostSpecificDateValue;
        if (!mostSpecificDateValue) return;

        if (isCalendarDate(mostSpecificDateValue))
            this._precision = Precisions.Day;
        else this._precision = Precisions.Minute;
    }

    override render(): TemplateResult {
        return html`
            <div id="textfield">
                ${this.renderStateIcons()} ${this.renderInputContent()}
            </div>
            ${this.renderHelpText(this.invalid)}${this.renderPicker()}
        `;
    }

    private renderStateIcons(): TemplateResult | typeof nothing {
        if (this.invalid)
            return html`
                <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
            `;

        return nothing;
    }

    public renderPicker(): TemplateResult | typeof nothing {
        if (this.readonly) return nothing;

        return html`
            <sp-picker-button
                ?open=${this.isCalendarOpen}
                ?quiet=${this.quiet}
                ?invalid=${this.invalid}
                ?disabled=${this.disabled}
                @click=${() => (this.isCalendarOpen = true)}
            >
                <slot name="calendar-icon" slot="icon">
                    <sp-icon-calendar></sp-icon-calendar>
                </slot>
            </sp-picker-button>

            <sp-overlay
                .triggerElement=${this.input}
                type="modal"
                placement="top"
                offset="0"
                ?open=${this.isCalendarOpen}
                @sp-closed=${() => (this.isCalendarOpen = false)}
            >
                <sp-popover>
                    <div class="popover-content">
                        <sp-calendar
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            @change=${this.handleChange}
                        ></sp-calendar>
                    </div>
                </sp-popover>
            </sp-overlay>
        `;
    }

    private handleChange(event: Event): void {
        event.stopPropagation();
        this.isCalendarOpen = false;
        const calendarValue = (event.target as Calendar).value as CalendarDate;

        if (!this.includesTime) this.value = calendarValue;
        else {
            const hour = this.segments.hour?.value ?? 0;
            const minute = this.segments.minute?.value ?? 0;
            const second = this.segments.second?.value ?? 0;
            const time = new Time(hour, minute, second);

            const mostSpecificDateValue = this.mostSpecificDateValue;
            this.value = toCalendarDateTime(calendarValue, time);

            if (mostSpecificDateValue && isZonedDateTime(mostSpecificDateValue))
                this.value = toZoned(this.value, this.timeZone);
        }
        this.commitValue();
    }

    public renderInputContent(): TemplateResult {
        return html`
            <div class="input">
                <span
                    class="input-content"
                    @focusin=${() => (this.focused = !this.readonly)}
                    @focusout=${() => (this.focused = false)}
                    @keydown=${this.handleKeydown}
                    @input=${this.handleInput}
                >
                    ${this.segments.all.map((segment) =>
                        when(
                            segment.type === SegmentTypes.Literal,
                            () => this.renderLiteralSegment(segment),
                            () =>
                                this.renderEditableSegment(
                                    segment as EditableSegment
                                )
                        )
                    )}
                </span>
            </div>
        `;
    }

    public renderLiteralSegment(segment: LiteralSegment): TemplateResult {
        /**
         * We need this flag below to prevent Prettier from moving the content of the tag to the next line, which causes
         * problems on rendering because of spaces added before and after the content (indentation)
         */
        // prettier-ignore
        return html`
            <span
                class="literal-segment"
                data-test-id=${segment.type}
            >${segment.formatted}</span>
        `;
    }

    public renderEditableSegment(segment: EditableSegment): TemplateResult {
        const isActive = !this.disabled && !this.readonly;
        const usePlaceholder = segment.value === undefined;

        const segmentClasses: ClassInfo = {
            'editable-segment': true,
            'is-placeholder': usePlaceholder,
        };

        const minWidth =
            segment.type !== SegmentTypes.Year &&
            String(segment.maxValue).length;

        const segmentStyles: StyleInfo = {
            minWidth: minWidth ? `${minWidth}ch` : undefined,
        };

        /**
         * When dealing with tags that have the `contenteditable` attribute, it is recommended that the tag content be
         * inserted using the `.innerText` property instead of using string interpolation:
         *
         * https://lit.dev/docs/templates/expressions/#invalid-locations:~:text=bind%20to%20the%20.innerText
         *
         * Although this is just a Lit recommendation (as described in the documentation itself, "beware"), we have
         * identified that the use of `.innerText` here is mandatory.
         *
         * We use the `input` event to define the content of the segment, and there are moments when we want to cancel
         * the default action of a key typed by the user (for example, when the user types a letter in which only
         * numbers are accepted), however, the `input` event action cannot be cancelled with `event.preventDefault()`,
         * and because of this, if we try to use string interpolation, it will break the references to the DOM that Lit
         * uses to dynamically update the content, but this problem does not occur when we bind to the `.innerText`
         * property.
         */
        return html`
            <div
                role="spinbutton"
                contenteditable=${ifDefined(isActive ? true : undefined)}
                inputmode=${ifDefined(isActive ? 'numeric' : undefined)}
                tabindex=${ifDefined(isActive ? '0' : undefined)}
                aria-hidden=${ifDefined(usePlaceholder ? 'true' : undefined)}
                class=${classMap(segmentClasses)}
                style=${styleMap(segmentStyles)}
                data-type=${segment.type}
                .innerText=${this.renderSegmentText(segment)}
            ></div>
        `;
    }

    private renderSegmentText(segment: EditableSegment): string {
        const usePlaceholder = segment.value === undefined;

        return when(
            usePlaceholder,
            () => segment.placeholder ?? '',
            () => segment.formatted ?? ''
        );
    }

    private handleKeydown(event: KeyboardEvent): void {
        const segmentElement = event.target as HTMLElement;
        const segmentType = segmentElement.dataset.type as EditableSegmentType;
        if (!segmentType) return;

        switch (event.code) {
            case 'ArrowUp': {
                this.incrementValue(segmentType);
                break;
            }
            case 'ArrowDown': {
                this.decrementValue(segmentType);
                break;
            }
            case 'ArrowRight': {
                this.focusSegment(segmentElement, 'next');
                break;
            }
            case 'ArrowLeft': {
                this.focusSegment(segmentElement, 'previous');
                break;
            }
            case 'Enter':
            case 'Space': {
                this.commitValue();
                break;
            }
            case 'Backspace':
            case 'Delete': {
                event.preventDefault();
                if (this.segments.getByType(segmentType)?.value === undefined)
                    this.focusSegment(segmentElement, 'previous');
                else this.clearSegmentContent(segmentType);
                break;
            }
        }
    }

    private get modifierParams(): SegmentsModifierParams {
        return {
            dateFormatter: this.dateFormatter,
            segments: this.segments,
            currentDate: this.currentDate,
        };
    }

    private incrementValue(segmentType: EditableSegmentType): void {
        const incrementModifier = new IncrementModifier(this.modifierParams);
        this.segments = incrementModifier.modify(segmentType);
        this.dispatchInput();
    }

    private decrementValue(segmentType: EditableSegmentType): void {
        const decrementModifier = new DecrementModifier(this.modifierParams);
        this.segments = decrementModifier.modify(segmentType);
        this.dispatchInput();
    }

    /**
     * Focuses the segment according to the direction, if there is one to focus on
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param elementToFocus - Defines which element will be focused: is it the previous one or the next one?
     */
    private focusSegment(
        segment: HTMLElement,
        elementToFocus: 'previous' | 'next'
    ): void {
        let segmentFound = false;
        let currentSegment = segment;

        while (!segmentFound) {
            const siblingSegment = (
                elementToFocus === 'previous'
                    ? currentSegment.previousElementSibling
                    : currentSegment.nextElementSibling
            ) as HTMLDivElement;

            // No more segments to focus on
            if (!siblingSegment) {
                break;
            }

            if (siblingSegment.getAttribute('contenteditable')) {
                siblingSegment.focus();
                segmentFound = true;
            }

            currentSegment = siblingSegment;
        }
    }

    private previousCommitedValue: DateTimePickerValue | undefined;
    /**
     * Mark the user intent to commit the selected value. If the current value
     * is different from the previous commited value, dispatch a change event.
     */
    private commitValue(): void {
        if (
            this.value &&
            this.previousCommitedValue &&
            this.value.compare(this.previousCommitedValue) === 0
        )
            return;

        if (
            this.value === undefined &&
            this.previousCommitedValue === undefined
        ) {
            const allSegmentsEmpty = this.segments.editableValues.every(
                (value) => value === undefined
            );
            if (allSegmentsEmpty) this.invalid = false;
            else this.invalid = true;

            return;
        }

        if (this.value === undefined || this.isNonCompliantValue())
            this.invalid = true;
        else this.invalid = false;

        this.previousCommitedValue = this.value;
        this.dispatchChange();
    }

    private clearSegmentContent(segmentType: EditableSegmentType): void {
        const valuesBefore = this.segments.editableValues;

        const clearModifier = new ClearModifier(this.modifierParams);
        this.segments = clearModifier.modify(segmentType);

        const valuesAfter = this.segments.editableValues;
        if (!equalSegmentValues(valuesBefore, valuesAfter))
            this.dispatchInput();
    }

    private handleInput(event: InputEvent): void {
        event.stopPropagation();
        const segmentType = (event.target as HTMLElement).dataset
            .type as EditableSegmentType;
        const valuesBefore = this.segments.editableValues;

        const inputModifier = new InputModifier({
            ...this.modifierParams,
            eventData: event.data,
            numberParser: this.numberParser,
        });

        this.segments = inputModifier.modify(segmentType);
        this.updateSegmentContent(
            this.segments.getByType(segmentType)!,
            event.target as HTMLElement
        );

        const valuesAfter = this.segments.editableValues;
        if (!equalSegmentValues(valuesBefore, valuesAfter))
            this.dispatchInput();
    }

    /**
     * Updates the content of the segments by binding it to the `.innerText` property of the element,
     * instead of using string interpolation. This allows to not show user typed characters, but
     * only the formatted content of the segment, needed for the 'contenteditable' elements.
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param event - Triggered event details
     */
    private updateSegmentContent(
        segment: EditableSegment,
        segmentElement: HTMLElement
    ): void {
        segmentElement.innerText =
            segment.value !== undefined
                ? segment.formatted
                : segment.placeholder;
    }

    private dispatchChange(): void {
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
            })
        );
    }

    private dispatchInput(): void {
        this.dispatchEvent(
            new CustomEvent('input', {
                bubbles: true,
                composed: true,
            })
        );
    }

    private setValueFromSegments(): void {
        const formattedDate = this.segments.getFormattedDate(this.precision);
        if (!formattedDate) {
            if (this.value) this.dispatchChange();
            this.value = undefined;
            return;
        }
        if (this.value === undefined) this.dispatchChange();

        const mostSpecificDateValue = this.mostSpecificDateValue;
        if (!mostSpecificDateValue) this.value = formattedDate;
        else {
            if (isZonedDateTime(mostSpecificDateValue))
                this.value = toZoned(formattedDate, this.timeZone);
            else if (isCalendarDateTime(mostSpecificDateValue))
                this.value = toCalendarDateTime(formattedDate);
            else this.value = toCalendarDate(formattedDate);
        }
    }

    private setDateFormatter(): void {
        const dateOptions: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        let timeOptions: Intl.DateTimeFormatOptions = {};

        if (this.includesTime) {
            const minPrecisions: Precision[] = [
                SegmentTypes.Minute,
                SegmentTypes.Second,
            ];
            const includeMinutes = minPrecisions.includes(this.precision!);
            const includeSeconds = this.precision === SegmentTypes.Second;

            timeOptions = {
                hour: '2-digit',
                ...(includeMinutes && { minute: '2-digit' }),
                ...(includeSeconds && { second: '2-digit' }),
            };
        }

        this.dateFormatter = new DateFormatter(this.locale, {
            ...dateOptions,
            ...timeOptions,
        });
    }

    private setNumberParser(): void {
        this.numberParser = new NumberParser(this.locale, {
            maximumFractionDigits: 0,
        });
    }

    private setSegments(): void {
        const segmentsFactory = new SegmentsFactory(this.dateFormatter);
        const segments = segmentsFactory.createSegments(
            this.currentDate,
            this.value !== undefined
        );

        this.segments = segments;
    }
}
