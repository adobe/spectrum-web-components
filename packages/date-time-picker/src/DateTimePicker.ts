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
    endOfMonth,
    getLocalTimeZone,
    getMinimumDayInMonth,
    getMinimumMonthInYear,
    now,
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
import { ManageHelpText } from '@spectrum-web-components/help-text/src/manage-help-text.js';
import {
    LanguageResolutionController,
    languageResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { Calendar, type DateValue } from '@spectrum-web-components/calendar';

import styles from './date-time-picker.css.js';
import {
    AM,
    DateSegmentTypes,
    DateTimePickerValue,
    MandatorySegmentTypes,
    MAX_DAYS_PER_MONTH,
    MAX_HOUR_AM,
    MAX_HOUR_PM,
    MIN_HOUR_AM,
    MIN_HOUR_PM,
    PM,
    Precision,
    Segment,
    SegmentDetails,
    SegmentPlaceholders,
    SegmentType,
    SegmentValueAndLimits,
    TimeSegmentTypes,
} from './types.js';

// TODO: Load dependencies lazily when possible
import '@spectrum-web-components/calendar/sp-calendar.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-calendar.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/picker-button/sp-picker-button.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';

/**
 * An utility to check if the given value is a number (not `undefined`)
 *
 * @param value - Number to check
 */
const isNumber = (value: number | undefined): value is number => {
    return typeof value === 'number';
};

/**
 * @element sp-date-time-picker
 *
 * @event change - Announces when a new date/time is defined by emitting a `Date` object
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
    @property()
    precision: Precision = 'minute';

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

    private languageResolver = new LanguageResolutionController(this);
    private get locale(): string {
        return this.languageResolver.language;
    }

    private timeZone = getLocalTimeZone();
    private formatter!: DateFormatter;
    private numberParser!: NumberParser;

    @state()
    protected segments: Segment[] = [];

    @state()
    public isCalendarOpen = false;

    @query('.editable-segment')
    firstEditableSegment!: HTMLDivElement;

    @query('.input')
    private input!: HTMLElement;

    public override get focusElement(): HTMLElement {
        return this.firstEditableSegment;
    }

    public get is12HourClock(): boolean {
        return Boolean(this.formatter.resolvedOptions().hour12);
    }

    private get daySegment(): Segment | undefined {
        return this.editableSegment(SegmentType.Day);
    }

    private get monthSegment(): Segment | undefined {
        return this.editableSegment(SegmentType.Month);
    }

    private get yearSegment(): Segment | undefined {
        return this.editableSegment(SegmentType.Year);
    }

    private get hourSegment(): Segment | undefined {
        return this.editableSegment(SegmentType.Hour);
    }

    private get minuteSegment(): Segment | undefined {
        return this.editableSegment(SegmentType.Minute);
    }

    private get secondSegment(): Segment | undefined {
        return this.editableSegment(SegmentType.Second);
    }

    private get amPmSegment(): Segment | undefined {
        return this.editableSegment(SegmentType.DayPeriod);
    }

    private editableSegment(type: SegmentType): Segment | undefined {
        return this.segments.find((segment) => segment.type === type);
    }

    private get includesTime(): boolean {
        const timePrecisions = ['hour', 'minute', 'second'] as Precision[];
        return Boolean(
            this.precision && timePrecisions.includes(this.precision)
        );
    }

    private isZonedDateTime(date: DateValue): date is ZonedDateTime {
        return date instanceof ZonedDateTime;
    }

    private isCalendarDateTime(date: DateValue): date is CalendarDateTime {
        return date instanceof CalendarDateTime;
    }

    private isCalendarDate(date: DateValue): date is CalendarDate {
        return date instanceof CalendarDate;
    }

    private get mostSpecificDateValue(): DateValue {
        const dateValuesDefined = [this.value, this.min, this.max].filter(
            (date) => date !== undefined
        ) as DateValue[];

        const zonedDateTimes = dateValuesDefined.filter(this.isZonedDateTime);
        if (zonedDateTimes.length > 0) return zonedDateTimes[0];

        const dateTimes = dateValuesDefined.filter(this.isCalendarDateTime);
        if (dateTimes.length > 0) return dateTimes[0];

        const dates = dateValuesDefined.filter(this.isCalendarDate);
        return dates[0];
    }

    private currentDate: ZonedDateTime = now(this.timeZone);

    private convertToMostSpecificDateValue(): void {
        const dateValue = this.mostSpecificDateValue;
        let timeZone = this.timeZone;
        if (this.isZonedDateTime(dateValue)) {
            timeZone = dateValue.timeZone;
            this.value = this.value && toZoned(this.value, timeZone);
            this.min = this.min && toZoned(this.min, timeZone);
            this.max = this.max && toZoned(this.max, timeZone);
            // TODO: check if they comply
        } else if (this.isCalendarDateTime(dateValue)) {
            this.value = this.value && toCalendarDateTime(this.value);
            this.min = this.min && toCalendarDateTime(this.min);
            this.max = this.max && toCalendarDateTime(this.max);
            // TODO: check if they comply
            this.precision = 'minute';
        } else if (this.value) this.precision = 'day';

        if (this.value) this.currentDate = toZoned(this.value, timeZone);
    }

    constructor() {
        super();
        this.setNumberParser();
        this.setFormatter();
        this.setSegments();
    }

    public clear(): void {
        this.value = undefined;
    }

    protected override willUpdate(changedProperties: PropertyValues): void {
        if (changedProperties.has('value') && this.value === undefined) {
            this.segments = [];
            this.setSegments();
        }

        const haveDatesChanged =
            changedProperties.has('value') ||
            changedProperties.has('min') ||
            changedProperties.has('max');
        const hasLocaleChanged = changedProperties.has(
            languageResolverUpdatedSymbol
        );
        const hasPrecisionChanged = changedProperties.has('precision');

        if (hasLocaleChanged) this.setNumberParser();
        if (haveDatesChanged) this.convertToMostSpecificDateValue();
        if (hasLocaleChanged || hasPrecisionChanged) this.setFormatter();
        if (haveDatesChanged || hasLocaleChanged || hasPrecisionChanged)
            this.setSegments();
    }

    protected override render(): TemplateResult {
        return html`
            <div id="textfield">
                ${this.renderStateIcons()} ${this.renderInputContent()}
            </div>
            ${this.renderHelpText(this.invalid)}${this.renderPicker()}
        `;
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
                placement="top"
                offset="0"
                receives-focus="true"
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

        if (this.includesTime) this.value = toCalendarDateTime(calendarValue);
        else this.value = calendarValue;

        // TODO: move this to willUpdate based on value changes
        const { year, month, day } = this.value;

        if (!this.yearSegment || !this.monthSegment || !this.daySegment) {
            return;
        }

        this.yearSegment.value = year;
        this.formatSegmentValue(this.yearSegment);

        this.monthSegment.value = month;
        this.formatSegmentValue(this.monthSegment);

        this.daySegment.value = day;
        this.formatSegmentValue(this.daySegment);

        this.requestUpdate();
    }

    protected renderStateIcons(): TemplateResult | typeof nothing {
        if (this.invalid)
            return html`
                <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
            `;

        return nothing;
    }

    public renderInputContent(): TemplateResult {
        return html`
            <div class="input">
                <span
                    class="input-content"
                    @focusin=${() => (this.focused = !this.readonly)}
                    @focusout=${() => (this.focused = false)}
                >
                    ${this.segments.map((segment) =>
                        when(
                            segment.type === SegmentType.Literal,
                            () => this.renderLiteralSegment(segment),
                            () => this.renderEditableSegment(segment)
                        )
                    )}
                </span>
            </div>
        `;
    }

    public renderLiteralSegment(segment: Segment): TemplateResult {
        /**
         * We need this flag below to prevent Prettier from moving the content of the tag to the next line, which causes
         * problems on rendering because of spaces added before and after the content (indentation)
         */
        // prettier-ignore
        return html`
            <span
                class="literal-segment"
                data-test-id=${segment.type}
            >${segment.formatted ?? ''}</span>
        `;
    }

    public renderEditableSegment(segment: Segment): TemplateResult {
        const isActive = !this.disabled && !this.readonly;
        const usePlaceholder = segment.value === undefined;

        const segmentClasses: ClassInfo = {
            'editable-segment': true,
            'is-placeholder': usePlaceholder,
        };

        const segmentStyles: StyleInfo = {
            'min-width': isNumber(segment.maxValue)
                ? `${String(segment.maxValue).length}ch`
                : undefined,
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
         *
         * TODO: Include/review ARIA attributes for editable segments
         * TODO: Move `handle` functions call to a cache so that it doesn't cycle on the binding in each render pass
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
                @keydown=${(event: KeyboardEvent) => {
                    this.handleKeydown(segment, event);
                }}
                @beforeinput=${(event: InputEvent) => {
                    this.handleBeforeInput(segment, event);
                }}
                @input=${(event: InputEvent) => {
                    this.handleInputEvent(segment, event);
                }}
                .innerText=${this.renderSegmentText(segment)}
            ></div>
        `;
    }

    protected renderSegmentText(segment: Segment): string {
        const usePlaceholder = segment.value === undefined;

        return when(
            usePlaceholder,
            () => segment.placeholder ?? '',
            () => segment.formatted ?? ''
        );
    }

    /**
     * Detects the pressed key and performs the correct action accordingly
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param event - Triggered event details
     */
    protected handleKeydown(segment: Segment, event: KeyboardEvent): void {
        switch (event.code) {
            case 'ArrowUp': {
                this.incrementValue(segment, event);
                break;
            }
            case 'ArrowRight': {
                this.focusNextSegment(event);
                break;
            }
            case 'ArrowDown': {
                this.decrementValue(segment, event);
                break;
            }
            case 'ArrowLeft': {
                this.focusPreviousSegment(event);
                break;
            }
        }

        // The “AM/PM” segment value can be changed by pressing the “A” (for “AM”) or “P” (for “PM”) keys
        if (segment.type === 'dayPeriod') {
            if (event.code === 'KeyA') {
                this.setAmPmSegmentValue(AM);
                this.valueChanged(segment, event);
            }

            if (event.code === 'KeyP') {
                this.setAmPmSegmentValue(PM);
                this.valueChanged(segment, event);
            }
        }
    }

    /**
     * When the `input` event is triggered, we can use the `beforeinput` event to execute some things before
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param event - Triggered event details
     */
    protected handleBeforeInput(segment: Segment, event: InputEvent): void {
        switch (event.inputType) {
            case 'deleteContentBackward':
            case 'deleteContentForward':
                event.preventDefault();
                this.clearContent(segment, event);
                break;

            case 'insertParagraph': // “Enter” key
            case 'insertLineBreak': // Shift + “Enter” keys
                event.preventDefault();
                break;
        }
    }

    /**
     * Sets new segment value after the user types something
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param event - Triggered event details
     */
    protected handleInputEvent(segment: Segment, event: InputEvent): void {
        const details = this.extractDetails(segment);
        const data: string | null = event.data;

        if (details === undefined || data === null) {
            return;
        }

        const typedValue = this.numberParser.parse(data);

        if (
            !this.numberParser.isValidPartialNumber(data) ||
            isNaN(typedValue)
        ) {
            this.updateContent(segment, event);
            return;
        }

        const isDate = segment.type in DateSegmentTypes;
        const isAmPmHour = this.is12HourClock && segment.type === 'hour';

        segment.value = isAmPmHour
            ? this.getNewValueForAmPmHourSegment(details, typedValue)
            : this.getNewValueForOtherSegments(details, typedValue, isDate);

        this.valueChanged(segment, event);
    }

    /**
     * Increments the segment value respecting the minimum and maximum limits
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param event - Triggered event details
     */
    protected incrementValue(segment: Segment, event: KeyboardEvent): void {
        const min = segment.minValue;
        const max = segment.maxValue;

        if (min === undefined || max === undefined) return;

        if (segment.value === undefined) {
            segment.value =
                segment.type === 'year' ? this.currentDate.year : min;
        } else if (segment.type === 'dayPeriod') {
            segment.value = this.toggleAmPm(segment.value);
        } else {
            segment.value += 1;

            if (segment.value > max) {
                segment.value = min;
            }
        }

        this.valueChanged(segment, event);
    }

    /**
     * Decrements the segment value respecting the minimum and maximum limits
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param event - Triggered event details
     */
    protected decrementValue(segment: Segment, event: KeyboardEvent): void {
        const min = segment.minValue;
        const max = segment.maxValue;

        if (min === undefined || max === undefined) {
            return;
        }

        if (segment.value === undefined) {
            segment.value =
                segment.type === 'year' ? this.currentDate.year : max;
        } else if (segment.type === 'dayPeriod') {
            segment.value = this.toggleAmPm(segment.value);
        } else {
            segment.value -= 1;

            if (segment.value < min) {
                segment.value = max;
            }
        }

        this.valueChanged(segment, event);
    }

    /**
     * Sets the new segment value after the user clears the content
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param event - Triggered event details
     */
    protected clearContent(
        segment: Segment,
        event: InputEvent | KeyboardEvent
    ): void {
        const details = this.extractDetails(segment);

        if (details?.value === undefined) {
            return;
        }

        let newValue: string | undefined;
        let previousValue = details.value;

        if (this.is12HourClock && segment.type === 'hour') {
            const isPM = this.isPM(details.minValue);

            if (isPM) {
                previousValue -= PM;
            }

            newValue =
                previousValue === MIN_HOUR_AM
                    ? String(MIN_HOUR_AM + 1)
                    : String(previousValue).slice(0, -1);

            if (isPM && newValue !== '') {
                newValue = String(this.numberParser.parse(newValue) + PM);
            }
        } else {
            newValue =
                segment.type === 'dayPeriod'
                    ? undefined
                    : String(previousValue).slice(0, -1);
        }

        segment.value =
            (newValue !== undefined && this.numberParser.parse(newValue)) ||
            undefined;

        this.valueChanged(segment, event);
    }

    /**
     * After defining the new segment value, it formats the values that will be displayed on the screen and prepares the
     * object that will be emitted by the component, if it is ready/defined
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param event - Triggered event details
     */
    protected valueChanged(
        segment: Segment,
        event: InputEvent | KeyboardEvent
    ): void {
        if (this.is12HourClock) {
            if (segment.type === 'hour') {
                this.updateAmPm();
            } else if (segment.type === 'dayPeriod') {
                this.updateHour();
            }
        }

        const hasDay = isNumber(this.daySegment?.value);
        const hasMonth = isNumber(this.monthSegment?.value);

        if (
            segment.type === 'month' ||
            (segment.type === 'day' && hasMonth) ||
            (segment.type === 'year' && hasDay && hasMonth)
        ) {
            this.updateDay();
        }

        this.formatSegmentValue(segment);
        this.updateContent(segment, event);
        this.updateValue();
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
            })
        );
    }

    /**
     * Sets the new date/time object according to the configuration parameters and if the minimum required values for
     * each type (date only, time only or date and time together) were defined
     */
    protected updateValue(): void {
        let value: DateTimePickerValue;

        const date = this.getDateFromSegments();
        if (date && this.precision === 'day') {
            value = this.dateToCalendarDateTime(date);
            return;
        }

        const time = this.getTimeFromSegments();
        if (time) value = this.dateToCalendarDateTime(time);

        if (date) {
            const dateCalendar = this.dateToCalendarDateTime(date);
            value = value!.set({
                year: dateCalendar.year,
                month: dateCalendar.month,
                day: dateCalendar.day,
            });
        }

        this.value = value!;
    }

    /**
     * Extracts the segment details, validating that the limits have been defined. The value currently assigned to the
     * segment remains optional
     *
     * @param segment - The segment to extract the details
     */
    protected extractDetails(segment: Segment): SegmentDetails | undefined {
        const min = segment.minValue;
        const max = segment.maxValue;

        if (min === undefined || max === undefined) {
            return undefined;
        }

        return {
            value: segment.value,
            minValue: min,
            maxValue: max,
        };
    }

    /**
     * For the hour segment whose clock format is 12 hours, we need to perform some checks before defining what will be
     * the new value associated with the segment. This is necessary because the time the user sees might not match the
     * value we need to store in the segment
     *
     * For example, if “10” is the value displayed in the field, the actual value could be “22” if it's PM, so we need
     * to identify when we have to change the “actual value”
     *
     * @param details - Segment value and limits
     * @param typedValue - The value typed by the user
     */
    protected getNewValueForAmPmHourSegment(
        details: SegmentDetails,
        typedValue: number
    ): number {
        const isAmPmHour = true;

        let newValue = this.mergePreviousValueWithTypedValue(
            details,
            typedValue,
            isAmPmHour
        );

        const min = details.minValue;
        const max = details.maxValue;
        const isPM = this.isPM(min);

        if (isPM && newValue !== min && newValue > MAX_HOUR_AM) {
            newValue = this.numberParser.parse(String(newValue).slice(1));
        } else if (newValue > max) {
            const useMIN_HOUR_AM = !isPM && newValue === PM;

            newValue = useMIN_HOUR_AM
                ? MIN_HOUR_AM
                : this.useTypedValueOrMax(typedValue, max);
        }

        if (isPM && newValue !== min) {
            newValue += PM;
        }

        return newValue;
    }

    /**
     * Defines the new value that will be associated with the segment, with the exception of the hour segment for
     * 12-hour clocks, whose value is defined in another method
     *
     * @param details - Segment value and limits
     * @param typedValue - The value typed by the user
     * @param isDateSegment - Indicates if it is a date segment
     */
    protected getNewValueForOtherSegments(
        details: SegmentDetails,
        typedValue: number,
        isDateSegment: boolean
    ): number | undefined {
        let newValue = this.mergePreviousValueWithTypedValue(
            details,
            typedValue
        );

        if (isDateSegment && newValue === 0) {
            return undefined;
        }

        const min = details.minValue;
        const max = details.maxValue;

        if (String(newValue).length > String(max).length) {
            newValue = this.numberParser.parse(String(newValue).slice(1));
        }

        if (newValue < min) {
            newValue = this.useTypedValueOrMin(typedValue, min);
        } else if (newValue > max) {
            newValue = this.useTypedValueOrMax(typedValue, max);
        }

        return newValue;
    }

    /**
     * Indicates whether the hour entered is PM or not
     *
     * @param hour - The hour to check
     */
    protected isPM(hour: number): boolean {
        return hour >= PM;
    }

    /**
     * Returns the corresponding “modifier” (0 for “AM” and 12 for “PM”) for the given hour
     *
     * @param hour - The hour to identify the modifier
     */
    protected getAmPmModifier(hour: number): typeof AM | typeof PM {
        return this.isPM(hour) ? PM : AM;
    }

    /**
     * Checks if the date is valid by parsing the time. Invalid dates return `NaN` for times of invalid dates
     *
     * @param date - `Date` object to validate
     */
    protected isValidTime(date: Date): boolean {
        return !isNaN(date.getTime());
    }

    /**
     * Checks if the time has been defined according to the granularity type
     */
    protected hasTime(): boolean {
        const hour = this.hourSegment?.value;
        const minute = this.minuteSegment?.value;
        const second = this.secondSegment?.value;

        const isHour = this.precision === 'hour';
        const isMinute = this.precision === 'minute';
        const isSecond = this.precision === 'second';

        return (
            (isHour && isNumber(hour)) ||
            (isMinute && isNumber(hour) && isNumber(minute)) ||
            (isSecond && isNumber(hour) && isNumber(minute) && isNumber(second))
        );
    }

    /**
     * Converts an object of type `Date` to `CalendarDateTime`. The month must be incremented by 1 to create a new
     * `CalendarDateTime`, as it uses months ranging from 1 (January) to 12 (December), as opposed to `Date`, whose
     * months range from 0 (January) to 11 ( December)
     *
     * @param date - `Date` object to “convert”
     */
    protected dateToCalendarDateTime(date: Date): CalendarDateTime {
        return new CalendarDateTime(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        );
    }

    protected dateToCalendarDate(date: Date): CalendarDate {
        return new CalendarDate(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        );
    }

    /**
     * Returns a `Date` type object using information extracted from a `CalendarDateTime` type object. The month must be
     * decremented by 1 because the `Date` object uses months ranging from 0 (January) to 11 (December)
     *
     * @param year - Year that will be used to create the new `Date`
     * @param month - Month (1 to 12) that will be used to create the new `Date`
     * @param day - Day that will be used to create the new `Date`
     */
    protected getDate(
        year: number | undefined,
        month: number | undefined,
        day: number | undefined
    ): Date | undefined {
        return isNumber(year) && isNumber(month) && isNumber(day)
            ? new Date(year, month - 1, day)
            : undefined;
    }

    /**
     * Returns a `Date` object using the current values of the segments that make up the date, if they are filled
     */
    protected getDateFromSegments(): Date | undefined {
        return this.getDate(
            this.yearSegment?.value,
            this.monthSegment?.value,
            this.daySegment?.value
        );
    }

    /**
     * Returns a `Date` object using the current values of the segments that make up the time, if they are filled. As it
     * is not possible to have a `Date` object without an associated date, we use the current date defined internally
     * instead of using the date defined in the date segments
     */
    protected getTimeFromSegments(): Date | undefined {
        if (!this.hasTime()) {
            return undefined;
        }

        const hour = this.hourSegment?.value;
        const minute = this.minuteSegment?.value;
        const second = this.secondSegment?.value;

        const dateTime = this.currentDate.toDate();

        if (isNumber(hour)) {
            dateTime.setHours(hour);
        }

        if (isNumber(minute)) {
            dateTime.setMinutes(minute);
        }

        if (isNumber(second)) {
            dateTime.setSeconds(second);
        }

        return dateTime;
    }

    /**
     * Defines the formatter that will be used in the creation of segments
     */
    private setFormatter(): void {
        const dateOptions: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        let timeOptions: Intl.DateTimeFormatOptions = {};

        if (this.includesTime) {
            const minPrecisions: Precision[] = ['minute', 'second'];
            const includeMinutes = minPrecisions.includes(this.precision!);
            const includeSeconds = this.precision === 'second';

            timeOptions = {
                hour: '2-digit',
                ...(includeMinutes && { minute: '2-digit' }),
                ...(includeSeconds && { second: '2-digit' }),
            };
        }

        this.formatter = new DateFormatter(this.locale, {
            ...dateOptions,
            ...timeOptions,
        });
    }

    /**
     * Defines the number parser using the defined locale
     */
    private setNumberParser(): void {
        this.numberParser = new NumberParser(this.locale, {
            maximumFractionDigits: 0,
        });
    }

    /**
     * Creates the segments that will be used by the input
     */
    private setSegments(): void {
        const dateTime = this.currentDate.toDate();

        this.segments = this.formatter
            .formatToParts(dateTime)
            .filter((part) => {
                if (part.type in MandatorySegmentTypes) return true;
                if (this.includesTime) return part.type in TimeSegmentTypes;
                return false;
            })
            .map(this.partToSegment.bind(this));
    }

    /**
     * Converts the part returned by the `formatToParts()` function of `Intl.DateTimeFormat` to the `Segment` type
     * that has more information about the segment.
     *
     * @param part - Part to be converted to `Segment`
     */
    private partToSegment(part: Intl.DateTimeFormatPart): Segment {
        const type = part.type as SegmentType;
        const formatted = part.value;

        if (type === SegmentType.Literal)
            return {
                type,
                formatted,
            };

        const placeholder = SegmentPlaceholders[type];

        const segment: Segment = {
            type,
            formatted,
            ...(placeholder !== undefined && { placeholder }),
            ...this.getValueAndLimits(type),
        };

        this.formatSegmentValue(segment);

        return segment;
    }

    /**
     * Returns the minimum and maximum values for each segment that will be used, in addition to defining if there is a
     * current value to be used. If segments are being recreated, we try to recover the value that was previously set
     * for each segment, if possible
     *
     * @param type - Type of segment
     */
    private getValueAndLimits(type: SegmentType): SegmentValueAndLimits {
        const value = this.parseSegmentValue(type);

        switch (type) {
            case 'year':
                return {
                    minValue: 1,
                    maxValue: this.currentDate.calendar.getYearsInEra(
                        this.currentDate
                    ),
                    value,
                };
            case 'month':
                return {
                    minValue: getMinimumMonthInYear(this.currentDate),
                    maxValue: this.currentDate.calendar.getMonthsInYear(
                        this.currentDate
                    ),
                    value,
                };
            case 'day': {
                let max = this.currentDate.calendar.getDaysInMonth(
                    this.currentDate
                );

                if (!this.monthSegment?.value) max = MAX_DAYS_PER_MONTH;
                else {
                    const febMaxValue = this.getFebruaryMaxValue();
                    if (isNumber(febMaxValue)) max = febMaxValue;
                }

                return {
                    minValue: getMinimumDayInMonth(this.currentDate),
                    maxValue: max,
                    value,
                };
            }
            case 'hour': {
                let min = 0;
                let max = 23;

                if (this.is12HourClock) {
                    const isPM = this.isPM(this.currentDate.hour);
                    min = isPM ? MIN_HOUR_PM : MIN_HOUR_AM;
                    max = isPM ? MAX_HOUR_PM : MAX_HOUR_AM;
                }

                return {
                    minValue: min,
                    maxValue: max,
                    value,
                };
            }
            case 'minute':
            case 'second':
                return {
                    minValue: 0,
                    maxValue: 59,
                    value,
                };
            case 'dayPeriod':
                return {
                    minValue: AM,
                    maxValue: PM,
                    value,
                };
            default:
                return {};
        }
    }

    private parseSegmentValue(type: SegmentType): number | undefined {
        let previousValue: number | undefined;
        let currentValue: number;

        if (type === SegmentType.Literal) return undefined;
        if (type === SegmentType.DayPeriod) {
            previousValue =
                this.hourSegment?.value &&
                this.getAmPmModifier(this.hourSegment.value);
            currentValue = this.getAmPmModifier(this.currentDate.hour);
        } else {
            previousValue = this.editableSegment(type)?.value;
            currentValue = this.currentDate[type];
        }

        if (this.value && isNumber(currentValue)) return currentValue;
        if (previousValue) return previousValue;

        return;
    }

    /**
     * If the segment has a `value`, it defines the text used in the UI formatted according to the locale. At this
     * moment we are formatting the value of a specific segment, but it is not possible to generate a valid Date object
     * with just one piece of information (day, month, year, etc.), so we need to define a "base date" to be used
     * together with the value of the segment.
     *
     * For example, if the current segment is the day segment, but the month and year segment have not yet been defined,
     * we need to choose a month and a year to be used in composing the date that will be used in formatting, after all,
     * there is no day without a month and a year.
     *
     * @param segment - Segment to format the value
     */
    protected formatSegmentValue(segment: Segment): void {
        if (segment.value === undefined) return;

        let day =
            this.daySegment?.value ?? getMinimumDayInMonth(this.currentDate);

        let month =
            this.monthSegment?.value ?? getMinimumMonthInYear(this.currentDate);

        let year = this.yearSegment?.value ?? this.currentDate.year;
        let hour = this.hourSegment?.value ?? this.currentDate.hour;
        let minute = this.minuteSegment?.value ?? this.currentDate.minute;
        let second = this.secondSegment?.value ?? this.currentDate.second;

        let padMaxLength = 2;

        switch (segment.type) {
            case 'day': {
                day = segment.value;
                break;
            }
            case 'month': {
                month = segment.value;
                break;
            }
            case 'year': {
                year = segment.value;
                break;
            }
            case 'hour': {
                hour = segment.value;
                if (this.is12HourClock) padMaxLength = 1;
                break;
            }
            case 'minute': {
                minute = segment.value;
                break;
            }
            case 'second': {
                second = segment.value;
                break;
            }
            case 'dayPeriod': {
                hour = (segment.value ?? 0) + 1;
                padMaxLength = 0;
                break;
            }
        }

        /**
         * For the year we do not use the value returned by the formatter, to avoid that the typed year is displayed in
         * an unexpected way. For example, when typing “2”, the year would be formatted as “1902”, but we keep it as it
         * is being displayed on the screen. If the user wants to enter the year “1902”, he will enter number by number
         */
        if (segment.type === 'year') {
            segment.formatted = String(year);
            return;
        }

        /**
         * If the day being formatted is February 29th but the year segment has not yet been filled, we need to use a
         * leap year to allow the 29th to remain, otherwise, if we use the current year and it is not a leap year, the
         * day that would be displayed would be March 1st, as February 29th would not exist and JavaScript “moves” the
         * day to the next day. As this year is only used to format the day and month, we use the year 2000 as the "base
         * year" for formatting
         */
        if (
            !this.yearSegment?.value &&
            (segment.type === SegmentType.Day ||
                segment.type === SegmentType.Month)
        ) {
            year = 2000;
        }

        const date = this.getDate(year, month, day);

        if (!date) return;

        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(second);

        const formatted = this.formatter
            .formatToParts(date)
            .find((part) => part.type === segment.type)!.value;

        segment.formatted = formatted?.padStart(padMaxLength, '0');
    }

    /**
     * If the defined month is February but we don't yet have the year defined, we use 29 as the max limit, as we have
     * no way of knowing whether it is a leap year or not until the year segment is filled
     */
    private getFebruaryMaxValue(): number | undefined {
        return this.monthSegment?.value === 2 && !this.yearSegment?.value
            ? 29
            : undefined;
    }

    /**
     * Switches the value of the AM/PM segment from `AM` to `PM` or vice versa
     *
     * @param value - Current value of segment `dayPeriod`
     */
    private toggleAmPm(value: number): typeof AM | typeof PM {
        return value === AM ? PM : AM;
    }

    /**
     * Changes the value of the AM/PM segment to use the new value
     *
     * @param newValue - New value for the segment `dayPeriod`
     */
    private setAmPmSegmentValue(newValue: typeof AM | typeof PM): void {
        if (this.amPmSegment) {
            this.amPmSegment.value = newValue;
        }
    }

    private updateAmPm(): void {
        if (!this.hourSegment || !this.amPmSegment) {
            this.resetHourAndAmPm();
            return;
        }

        // If there is no hour or if AM/PM is already set, there is nothing to do
        if (
            this.hourSegment.value === undefined ||
            this.amPmSegment.value !== undefined
        ) {
            return;
        }

        this.amPmSegment.value = this.getAmPmModifier(this.hourSegment.value);
    }

    /**
     * When the day period is changed, it automatically adjusts the hour if it has already been informed previously to
     * match the new period (AM or PM). In addition, the minimum and maximum values of the hour are also changed
     */
    private updateHour(): void {
        if (!this.hourSegment || !this.amPmSegment) {
            this.resetHourAndAmPm();
            return;
        }

        if (this.amPmSegment.value === undefined) {
            return;
        }

        const isAM = this.amPmSegment.value === AM;
        const isPM = this.amPmSegment.value === PM;

        this.hourSegment.minValue = isPM ? MIN_HOUR_PM : MIN_HOUR_AM;
        this.hourSegment.maxValue = isPM ? MAX_HOUR_PM : MAX_HOUR_AM;

        if (this.hourSegment.value === undefined) {
            return;
        }

        if (isAM && this.isPM(this.hourSegment.value)) {
            this.hourSegment.value -= PM;
        } else if (isPM && !this.isPM(this.hourSegment.value)) {
            this.hourSegment.value += PM;
        }
    }

    /**
     * When the “AM/PM” is cleared, we need to reset the min and max values of the AM/PM and hour segments to their
     * initial values
     */
    private resetHourAndAmPm(): void {
        if (this.amPmSegment) {
            const amPm = this.getValueAndLimits(SegmentType.DayPeriod);

            this.amPmSegment.value = amPm.value;
            this.amPmSegment.minValue = amPm.minValue;
            this.amPmSegment.maxValue = amPm.maxValue;

            if (this.amPmSegment.value === undefined) {
                this.amPmSegment.formatted =
                    this.amPmSegment.placeholder || 'AM';
            }
        }

        if (this.hourSegment) {
            const hour = this.getValueAndLimits(SegmentType.Hour);

            this.hourSegment.minValue = hour.minValue;
            this.hourSegment.maxValue = hour.maxValue;

            if (isNumber(this.hourSegment.value)) {
                this.hourSegment.value += this.getAmPmModifier(
                    this.currentDate.hour
                );
            } else {
                this.hourSegment.value = hour.value;
            }
        }
    }

    /**
     * Updates the value of the day segment to match the last day of the month if it is above the maximum limit and
     * furthermore also updates the maximum limit of the day segment to use the new found limit
     */
    private updateDay(): void {
        if (
            this.monthSegment?.value === undefined ||
            this.daySegment === undefined
        ) {
            return;
        }

        const useThisDate = isNumber(this.yearSegment?.value)
            ? this.currentDate.set({ year: this.yearSegment?.value })
            : this.currentDate.copy();

        const lastDayOfMonth = endOfMonth(
            useThisDate.set({ month: this.monthSegment.value })
        );

        this.daySegment.maxValue = lastDayOfMonth.day;

        // Check whether the maximum possible limit for the month of February should be used
        const febMaxValue = this.getFebruaryMaxValue();

        if (isNumber(febMaxValue)) {
            this.daySegment.maxValue = febMaxValue;
        }

        if (
            isNumber(this.daySegment.value) &&
            this.daySegment.value > this.daySegment.maxValue
        ) {
            this.daySegment.value = this.daySegment.maxValue;
            this.formatSegmentValue(this.daySegment);
        }
    }

    /**
     * Returns the value to be used if the typed value is less than the minimum allowed
     *
     * @param typedValue - The value typed by the user
     * @param min - The minimum value allowed for that segment
     */
    private useTypedValueOrMin(typedValue: number, min: number): number {
        return typedValue < min ? min : typedValue;
    }

    /**
     * Returns the value to be used if the typed value is greater than the maximum allowed
     *
     * @param typedValue - The value typed by the user
     * @param max - The maximum value allowed for that segment
     */
    private useTypedValueOrMax(typedValue: number, max: number): number {
        return typedValue > max ? max : typedValue;
    }

    /**
     * When the user types a value into a segment, we need to temporarily store the current segment's value before it
     * changes to include the value the user has just entered. Also, we need to identify if it is the hour segment and
     * if the clock format is 12 hours, if so, we have to adjust the previous value to perform some calculations
     *
     * @param details - Details of the segment being changed
     * @param typedValue - The value typed by the user
     * @param isAmPmHour - Indicates whether it is the hour segment for 12-hour clocks
     */
    private mergePreviousValueWithTypedValue(
        details: SegmentDetails,
        typedValue: number,
        isAmPmHour = false
    ): number {
        let previousValue = details.value ?? 0;

        if (isAmPmHour && this.isPM(previousValue)) {
            previousValue -= PM;
        }

        let newValue = this.numberParser.parse(`${previousValue}${typedValue}`);

        if (String(newValue).length > String(details.maxValue).length) {
            newValue = isAmPmHour
                ? typedValue
                : this.numberParser.parse(String(newValue).slice(1));
        }

        return newValue;
    }

    /**
     * To define the content of elements with the `contenteditable` attribute with Lit we bind to the `.innerText`
     * property of the element instead of using string interpolation
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param event - Triggered event details
     */
    private updateContent(
        segment: Segment,
        event: InputEvent | KeyboardEvent
    ): void {
        const segmentEl = event.target as HTMLElement;

        if (segmentEl) {
            const content =
                segment.value !== undefined
                    ? segment.formatted
                    : segment.placeholder;

            segmentEl.innerText = content ?? '';

            this.requestUpdate();
        }
    }

    /**
     * Focuses on the next editable segment, if any
     *
     * @param event - Triggered event details
     */
    private focusNextSegment(event: KeyboardEvent): void {
        this.focusSegment(event.target as HTMLDivElement, 'next');
    }

    /**
     * Focuses on the previous editable segment, if any
     *
     * @param event - Triggered event details
     */
    private focusPreviousSegment(event: KeyboardEvent): void {
        this.focusSegment(event.target as HTMLDivElement, 'previous');
    }

    /**
     * Focuses the segment according to the direction, if there is one to focus on
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param elementToFocus - Defines which element will be focused: is it the previous one or the next one?
     */
    private focusSegment(
        segment: HTMLDivElement,
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
}
