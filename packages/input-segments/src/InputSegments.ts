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
    CalendarDateTime,
    DateFormatter,
    getLocalTimeZone,
    getMinimumDayInMonth,
    getMinimumMonthInYear,
    now,
    toCalendarDateTime,
} from '@internationalized/date';
import { NumberParser } from '@internationalized/number';
import {
    CSSResultArray,
    html,
    PropertyValueMap,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import {
    classMap,
    ifDefined,
    styleMap,
    when,
} from '@spectrum-web-components/base/src/directives.js';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
import { TextfieldBase } from '@spectrum-web-components/textfield';

import {
    AM,
    dateSegmentTypes,
    maxHourAM,
    maxHourPM,
    minHourAM,
    minHourPM,
    PM,
    Segment,
    SegmentDetails,
    SegmentValueAndLimits,
    TimeGranularity,
    timeSegmentTypes,
} from './types.js';

import styles from './input-segments.css.js';

/**
 * @event change - Announces when a new date/time is defined by emitting a `Date` object
 *
 * @slot help-text - Default or non-negative help text to associate to your form element
 * @slot negative-help-text - Negative help text to associate to your form element when `invalid`
 */
export class InputSegments extends TextfieldBase {
    public static override get styles(): CSSResultArray {
        return [...super.styles, styles];
    }

    @query('.editable-segment')
    firstEditableSegment!: HTMLDivElement;

    /**
     * Indicates when date segments should be included in the field
     */
    @state()
    protected includeDate = false;

    /**
     * Indicates when time segments should be included in the field
     */
    @state()
    protected includeTime = false;

    /**
     * Indicates which segments that are part of time should be used
     */
    @property()
    timeGranularity: TimeGranularity = 'minute';

    /**
     * Defines whether a date/time should be displayed in the field
     */
    @property({ reflect: true, attribute: false })
    selectedDateTime?: Date;

    @state()
    private previousLocale?: string;

    @state()
    private currentDateTime!: CalendarDateTime;

    @state()
    private newDateTime?: CalendarDateTime;

    @state()
    private segments: Segment[] = [];

    @state()
    private createSegments = true;

    private languageResolver = new LanguageResolutionController(this);
    private timeZone = getLocalTimeZone();
    private formatter!: DateFormatter;
    private numberParser!: NumberParser;

    private get locale(): string {
        return this.languageResolver.language;
    }

    private get daySegment(): Segment | undefined {
        return this.segments.find((segment) => segment.type === 'day');
    }

    private get monthSegment(): Segment | undefined {
        return this.segments.find((segment) => segment.type === 'month');
    }

    private get yearSegment(): Segment | undefined {
        return this.segments.find((segment) => segment.type === 'year');
    }

    private get hourSegment(): Segment | undefined {
        return this.segments.find((segment) => segment.type === 'hour');
    }

    private get minuteSegment(): Segment | undefined {
        return this.segments.find((segment) => segment.type === 'minute');
    }

    private get secondSegment(): Segment | undefined {
        return this.segments.find((segment) => segment.type === 'second');
    }

    private get dayPeriodSegment(): Segment | undefined {
        return this.segments.find((segment) => segment.type === 'dayPeriod');
    }

    private get is12HourClock(): boolean {
        return Boolean(this.formatter.resolvedOptions().hour12);
    }

    /**
     * The `TextfieldBase` class requires this getter to return an element of type `HTMLInputElement` or
     * `HTMLTextAreaElement`, but since the segments are DIVs with the `contenteditable` attribute, we need to cast as
     * an input only to be able to use autofocus.
     *
     * Note that `focusElement` is only used for that, so converting as an input will have no side effect as all
     * functions and attributes used exist in both types, `HTMLInputElement` and `HTMLDivElement`.
     */
    public override get focusElement(): HTMLInputElement {
        return this.firstEditableSegment as HTMLInputElement;
    }

    constructor() {
        super();
        this.setInitialDateTime();
    }

    protected override willUpdate(
        changedProperties: PropertyValueMap<this>
    ): void {
        if (this.locale !== this.previousLocale) {
            this.previousLocale = this.locale;
            this.createSegments = true;

            this.setFormatter();
            this.setNumberParser();
        }

        if (changedProperties.has('selectedDateTime')) {
            this.createSegments = true;

            this.setCurrentDateTime();
        }

        if (changedProperties.has('timeGranularity')) {
            this.createSegments = true;
        }

        if (this.createSegments) {
            this.setSegments();
        }
    }

    protected override renderField(): TemplateResult {
        return html`
            ${this.renderStateIcons()}

            <div class="input">
                <div
                    role="presentation"
                    class="input-content"
                    @focusin=${this.handleFocusIn}
                    @focusout=${this.handleFocusOut}
                >
                    ${this.segments.map((segment) =>
                        when(
                            segment.type === 'literal',
                            () => this.renderLiteralSegment(segment),
                            () => this.renderEditableSegment(segment)
                        )
                    )}
                </div>
            </div>
        `;
    }

    public renderLiteralSegment(segment: Segment): TemplateResult {
        return html`
            <span
                class="literal-segment"
                aria-hidden="true"
                data-testid=${segment.type}
            >
                ${segment.formatted}
            </span>
        `;
    }

    public renderEditableSegment(segment: Segment): TemplateResult {
        const isActive = !this.disabled && !this.readonly;

        const isPlaceholderVisible = segment.value === undefined;

        const segmentClasses = {
            'is-placeholder': isPlaceholderVisible,
        };

        const segmentStyles = {
            minWidth:
                segment.maxValue !== undefined
                    ? `${String(segment.maxValue).length}ch`
                    : undefined,
        };

        // TODO: Include ARIA attributes for editable segments
        return html`
            <div
                role="spinbutton"
                contenteditable=${ifDefined(isActive ? true : undefined)}
                inputmode=${ifDefined(isActive ? 'numeric' : undefined)}
                tabindex=${ifDefined(isActive ? '0' : undefined)}
                class="editable-segment ${classMap(segmentClasses)}"
                style=${styleMap(segmentStyles)}
                data-testid=${segment.type}
                @keydown=${(event: KeyboardEvent) => {
                    this.handleKeydown(segment, event);
                }}
            >
                ${when(
                    isPlaceholderVisible,
                    () => html`
                        <span aria-hidden="true" class="placeholder">
                            ${segment.placeholder}
                        </span>
                    `,
                    () => segment.formatted
                )}
            </div>
        `;
    }

    public handleFocusIn(): void {
        super.onFocus();
    }

    public handleFocusOut(): void {
        super.onBlur();
    }

    /**
     * Detects the pressed key and performs the correct action accordingly
     *
     * @param segment - Segment on which the event was fired
     * @param event - Event details
     */
    public handleKeydown(segment: Segment, event: KeyboardEvent): void {
        switch (event.code) {
            case 'ArrowUp': {
                this.incrementValue(segment);
                break;
            }
            case 'ArrowRight': {
                this.focusNextSegment(event);
                break;
            }
            case 'ArrowDown': {
                this.decrementValue(segment);
                break;
            }
            case 'ArrowLeft': {
                this.focusPreviousSegment(event);
                break;
            }
            default: {
                // TODO: Use @input/@beforeinput events to handle data input/content cleanup
                const key = event.key;
                const isNumberKey = this.numberParser.isValidPartialNumber(key);
                const isClearKey = ['Backspace', 'Delete'].includes(key);
                const isAllowedKey = ['Tab'].includes(key);

                if (isNumberKey) {
                    this.handleTypedValue(segment, event);
                }

                if (isClearKey) {
                    this.handleClear(segment);
                }

                if (isNumberKey || isClearKey || !isAllowedKey) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        }
    }

    /**
     * Sets new segment value after user types some number
     *
     * @param segment - The segment being changed
     * @param event - Event details
     */
    public handleTypedValue(segment: Segment, event: KeyboardEvent): void {
        const details = this.extractDetails(segment);

        if (details === undefined) {
            return;
        }

        const typedValue = this.numberParser.parse(event.key);
        const isAmPmHour = this.is12HourClock && segment.type === 'hour';

        segment.value = isAmPmHour
            ? this.getNewValueForAmPmHourSegment(details, typedValue)
            : this.getNewValueForOtherSegments(details, typedValue);

        this.valueChanged(segment);
    }

    /**
     * Sets the new segment value after the user clears the content
     *
     * @param segment - The segment being changed
     * @param event - Event details
     */
    public handleClear(segment: Segment): void {
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
                previousValue === minHourAM
                    ? String(minHourAM + 1)
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

        this.valueChanged(segment);
    }

    private setFormatter(): void {
        let dateOptions: Intl.DateTimeFormatOptions = {};
        let timeOptions: Intl.DateTimeFormatOptions = {};

        if (this.includeDate) {
            dateOptions = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            };
        }

        if (this.includeTime) {
            const useMinutes = (
                ['minute', 'second'] as TimeGranularity[]
            ).includes(this.timeGranularity);

            timeOptions = {
                hour: '2-digit',
                ...(useMinutes && { minute: '2-digit' }),
                ...(this.timeGranularity === 'second' && { second: '2-digit' }),
            };
        }

        this.formatter = new DateFormatter(this.locale, {
            ...dateOptions,
            ...timeOptions,
        });
    }

    private setNumberParser(): void {
        this.numberParser = new NumberParser(this.locale, {
            maximumFractionDigits: 0,
        });
    }

    private setInitialDateTime(): void {
        this.currentDateTime = toCalendarDateTime(now(this.timeZone));
    }

    private setCurrentDateTime(): void {
        if (this.selectedDateTime) {
            this.selectedDateTime = new Date(this.selectedDateTime);

            if (!this.isValidTime(this.selectedDateTime)) {
                this.selectedDateTime = undefined;
            } else {
                this.currentDateTime = this.dateToCalendarDateTime(
                    this.selectedDateTime
                );
            }
        }
    }

    private setNewDateTime(): void {
        this.newDateTime = undefined;

        let year: number | undefined = undefined;
        let month: number | undefined = undefined;
        let day: number | undefined = undefined;

        let hour: number | undefined = undefined;
        let minute: number | undefined = undefined;
        let second: number | undefined = undefined;

        const isHour = this.timeGranularity === 'hour';
        const isMinute = this.timeGranularity === 'minute';
        const isSecond = this.timeGranularity === 'second';

        if (this.includeDate) {
            if (this.yearSegment?.value !== undefined) {
                year = this.yearSegment.value;
            }

            if (this.monthSegment?.value !== undefined) {
                month = this.monthSegment.value;
            }

            if (this.daySegment?.value !== undefined) {
                day = this.daySegment.value;
            }

            if (
                year !== undefined &&
                month !== undefined &&
                day !== undefined &&
                !this.includeTime
            ) {
                this.newDateTime = new CalendarDateTime(year, month, day);
            }
        }

        if (this.includeTime) {
            const hasHourValue = this.hourSegment?.value !== undefined;
            const hasMinuteValue = this.minuteSegment?.value !== undefined;
            const hasSecondValue = this.secondSegment?.value !== undefined;

            if (isHour && hasHourValue) {
                hour = this.hourSegment?.value;
            }

            if (isMinute && hasHourValue && hasMinuteValue) {
                minute = this.minuteSegment?.value;
            }

            if (isSecond && hasHourValue && hasMinuteValue && hasSecondValue) {
                second = this.secondSegment?.value;
            }

            if (!this.includeDate) {
                year = this.currentDateTime.year;
                month = this.currentDateTime.month;
                day = this.currentDateTime.day;
            }

            const hasTime =
                (this.timeGranularity === 'hour' && hasHourValue) ||
                (this.timeGranularity === 'minute' &&
                    hasHourValue &&
                    hasMinuteValue) ||
                (this.timeGranularity === 'second' &&
                    hasHourValue &&
                    hasMinuteValue &&
                    hasSecondValue);

            if (
                year !== undefined &&
                month !== undefined &&
                day !== undefined &&
                hasTime
            ) {
                this.newDateTime = new CalendarDateTime(
                    year,
                    month,
                    day,
                    hour,
                    minute,
                    second
                );
            }
        }
    }

    /**
     * Checks if the date is valid by parsing the time. Invalid dates return `NaN` for times of invalid dates
     *
     * @param date - `Date` object to validate
     */
    private isValidTime(date: Date): boolean {
        return !isNaN(date.getTime());
    }

    /**
     * Converts an object of type `Date` to `Calendar DateTime`
     *
     * @param date - `Date` object to "convert"
     */
    private dateToCalendarDateTime(date: Date): CalendarDateTime {
        return new CalendarDateTime(
            date.getFullYear(),
            date.getMonth() + 1, // The month to create a new `CalendarDate` cannot be a zero-based index, unlike `Date`
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        );
    }

    /**
     * Determines which segments will be used by the input (hour, minute, second, day period for 12-hour clock). The
     * segment referring to the hour will always be displayed, the other segments vary according to the defined locale
     * and granularity
     */
    private setSegments(): void {
        const { hour, minute, second } = this.currentDateTime;

        const dateTime = new Date();
        dateTime.setHours(hour, minute, second);

        const segmentTypes = [
            ...(this.includeDate ? dateSegmentTypes : []),
            ...(this.includeTime ? timeSegmentTypes : []),
        ];

        this.segments = this.formatter
            .formatToParts(dateTime)
            .map((part) => this.mapToTimeSegment(part))
            .filter((part) => segmentTypes.includes(part.type));

        this.createSegments = false;
    }

    /**
     * The parts returned by the `formatToParts()` function have only two properties, `type` and `value`, but we need
     * more information for each segment, so we convert it to the type we need
     *
     * @param part - Part/segment to be "translated" (mapped)
     */
    private mapToTimeSegment(part: Intl.DateTimeFormatPart): Segment {
        const { value, minValue, maxValue } = this.getSegmentDetails(part.type);

        const segment: Segment = {
            type: part.type,
            placeholder: this.getPlaceholder(part.type, part.value),
            formatted: part.value,
            value,
            minValue,
            maxValue,
        };

        this.formatValues(segment);

        return segment;
    }

    /**
     * If the segment has a `value`, it defines the text used in the UI formatted according to the locale
     *
     * @param segment - Segment to be updated
     */
    private formatValues(segment: Segment): void {
        if (segment.value !== undefined) {
            const options: Intl.DateTimeFormatOptions = {};

            let year = this.currentDateTime.year;
            let month = this.currentDateTime.month;
            let day = this.currentDateTime.day;

            let hour = this.currentDateTime.hour;
            let minute = this.currentDateTime.minute;
            let second = this.currentDateTime.second;

            let padMaxLength = 2;

            switch (segment.type) {
                case 'year': {
                    year = segment.value;
                    options.year = 'numeric';
                    break;
                }
                case 'month': {
                    month = segment.value;
                    options.month = '2-digit';
                    break;
                }
                case 'day': {
                    day = segment.value;
                    options.day = '2-digit';
                    break;
                }
                case 'hour': {
                    if (this.is12HourClock) {
                        padMaxLength = 1;
                    }

                    hour = segment.value;
                    options.hour = 'numeric';
                    break;
                }
                case 'minute': {
                    minute = segment.value;
                    options.minute = '2-digit';
                    break;
                }
                case 'second': {
                    second = segment.value;
                    options.second = '2-digit';
                    break;
                }
                case 'dayPeriod': {
                    hour = (segment.value || 0) + 1;
                    options.hour = 'numeric';
                    break;
                }
            }

            const date = new Date(year, month, day, hour, minute, second);
            const formatted = new DateFormatter(this.locale, options)
                .formatToParts(date)
                .find((part) => part.type === segment.type)?.value;

            segment.formatted = formatted?.padStart(padMaxLength, '0');
        }
    }

    /**
     * Returns the placeholder that will be used. If it is the day period segment, use the actual value. For the rest of
     * the segments, use two dashes as a placeholder
     *
     * @param type - Type of segment
     * @param value - The value of the segment
     */
    private getPlaceholder(
        type: Intl.DateTimeFormatPartTypes,
        value: string
    ): string {
        return type === 'dayPeriod' ? value : '––';
    }

    /**
     * Extracts the segment details, validating that the limits have been defined. The value currently assigned to the
     * segment remains optional
     *
     * @param segment - The segment to extract the details
     */
    private extractDetails(segment: Segment): SegmentDetails | undefined {
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
     * Indicates whether the hour entered is PM or not
     *
     * @param hour - The hour to check
     */
    private isPM(hour: number): boolean {
        return hour >= PM;
    }

    /**
     * Returns the corresponding "modifier" (0 for "AM" and 12 for "PM") for the given hour
     *
     * @param hour - The hour to identify the modifier
     */
    private getAmPmModifier(hour: number): typeof AM | typeof PM {
        return this.isPM(hour) ? PM : AM;
    }

    /**
     * Returns the minimum and maximum values for each segment that will be used, in addition to defining if there is a
     * current value to be used. If segments are being recreated, we try to recover the value that was previously set
     * for each segment, if possible
     *
     * @param type - Segment type
     */
    private getSegmentDetails(
        type: Intl.DateTimeFormatPartTypes
    ): SegmentValueAndLimits {
        switch (type) {
            case 'year':
                return {
                    minValue: 1,
                    maxValue: this.currentDateTime.calendar.getYearsInEra(
                        this.currentDateTime
                    ),
                    value:
                        this.newDateTime?.year ??
                        (this.selectedDateTime && this.currentDateTime.year) ??
                        undefined,
                };

            case 'month':
                return {
                    minValue: getMinimumMonthInYear(this.currentDateTime),
                    maxValue: this.currentDateTime.calendar.getMonthsInYear(
                        this.currentDateTime
                    ),
                    value:
                        this.newDateTime?.month ??
                        (this.selectedDateTime && this.currentDateTime.month) ??
                        undefined,
                };

            case 'day':
                return {
                    minValue: getMinimumDayInMonth(this.currentDateTime),
                    maxValue: this.currentDateTime.calendar.getDaysInMonth(
                        this.currentDateTime
                    ),
                    value:
                        this.newDateTime?.day ??
                        (this.selectedDateTime && this.currentDateTime.day) ??
                        undefined,
                };

            case 'hour':
                let min = 0;
                let max = 23;

                if (this.is12HourClock) {
                    const isPM = this.isPM(
                        this.newDateTime?.hour ?? this.currentDateTime.hour
                    );

                    min = isPM ? minHourPM : minHourAM;
                    max = isPM ? maxHourPM : maxHourAM;
                }

                return {
                    minValue: min,
                    maxValue: max,
                    value:
                        this.newDateTime?.hour ??
                        (this.selectedDateTime && this.currentDateTime.hour) ??
                        undefined,
                };

            case 'minute':
            case 'second':
                const minutes =
                    this.newDateTime?.minute ??
                    (this.selectedDateTime && this.currentDateTime.minute) ??
                    undefined;

                const seconds =
                    this.newDateTime?.second ??
                    (this.selectedDateTime && this.currentDateTime.second) ??
                    undefined;

                return {
                    minValue: 0,
                    maxValue: 59,
                    value: type === 'minute' ? minutes : seconds,
                };

            case 'dayPeriod':
                return {
                    minValue: AM,
                    maxValue: PM,
                    value:
                        (this.newDateTime?.hour &&
                            this.getAmPmModifier(this.newDateTime.hour)) ??
                        (this.selectedDateTime &&
                            this.getAmPmModifier(this.currentDateTime.hour)) ??
                        undefined,
                };

            default:
                return {};
        }
    }

    private incrementValue(segment: Segment): void {
        const min = segment.minValue;
        const max = segment.maxValue;

        if (min !== undefined && max !== undefined) {
            if (segment.value === undefined) {
                segment.value = min;
            } else if (segment.type === 'dayPeriod') {
                segment.value = segment.value === AM ? PM : AM;
            } else {
                segment.value++;

                if (segment.value > max) {
                    segment.value = min;
                }
            }
        }

        this.valueChanged(segment);
    }

    private decrementValue(segment: Segment): void {
        const min = segment.minValue;
        const max = segment.maxValue;

        if (min !== undefined && max !== undefined) {
            if (segment.value === undefined) {
                segment.value = max;
            } else if (segment.type === 'dayPeriod') {
                segment.value = segment.value === AM ? PM : AM;
            } else {
                segment.value--;

                if (segment.value < min) {
                    segment.value = max;
                }
            }
        }

        this.valueChanged(segment);
    }

    /**
     * When the day period is changed, it automatically adjusts the hour if it has already been informed previously to
     * match the new period (AM or PM). In addition, the minimum and maximum values of the hour are also changed
     */
    private updateHour(): void {
        if (this.hourSegment && this.dayPeriodSegment) {
            if (this.dayPeriodSegment.value !== undefined) {
                const isAM = this.dayPeriodSegment.value === AM;
                const isPM = this.dayPeriodSegment.value === PM;

                this.hourSegment.minValue = isPM ? minHourPM : minHourAM;
                this.hourSegment.maxValue = isPM ? maxHourPM : maxHourAM;

                if (this.hourSegment.value !== undefined) {
                    if (isAM && this.isPM(this.hourSegment.value)) {
                        this.hourSegment.value -= PM;
                    } else if (isPM && !this.isPM(this.hourSegment.value)) {
                        this.hourSegment.value += PM;
                    }
                }
            } else {
                this.resetHourAndDayPeriod();
            }
        }
    }

    /**
     * When the day period is cleared, we need to reset the min and max values of the day period and hour segments to
     * their initial values
     */
    private resetHourAndDayPeriod(): void {
        const dayPeriod = this.getSegmentDetails('dayPeriod');

        if (this.dayPeriodSegment) {
            this.dayPeriodSegment.value = dayPeriod.value;
            this.dayPeriodSegment.minValue = dayPeriod.minValue;
            this.dayPeriodSegment.maxValue = dayPeriod.maxValue;

            if (this.dayPeriodSegment.value === undefined) {
                this.dayPeriodSegment.formatted =
                    this.dayPeriodSegment.placeholder;
            }
        }

        const hour = this.getSegmentDetails('hour');

        if (this.hourSegment) {
            this.hourSegment.minValue = hour.minValue;
            this.hourSegment.maxValue = hour.maxValue;

            if (this.hourSegment.value !== undefined) {
                this.hourSegment.value += this.getAmPmModifier(
                    this.currentDateTime.hour
                );
            } else {
                this.hourSegment.value = hour.value;
            }
        }
    }

    private valueChanged(segment: Segment): void {
        if (this.is12HourClock && segment.type === 'dayPeriod') {
            this.updateHour();
        }

        this.formatValues(segment);
        this.setNewDateTime();

        this.requestUpdate();

        if (this.newDateTime) {
            this.dispatchEvent(
                new CustomEvent('change', {
                    bubbles: true,
                    composed: true,
                    detail: this.newDateTime.toDate(this.timeZone),
                })
            );
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
     * @param segment - The segment being changed
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
     * For the hour segment whose clock format is 12 hours, we need to perform some checks before defining what will be
     * the new value associated with the segment. This is necessary because the time the user sees might not match the
     * value we need to store in the segment
     *
     * For example, if "10" is the value displayed in the field, the actual value could be "22" if it's PM, so we need
     * to identify when we have to change the "actual value"
     *
     * @param details - Segment value and limits
     * @param typedValue - The value typed by the user
     */
    private getNewValueForAmPmHourSegment(
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

        if (isPM && newValue !== min && newValue > maxHourAM) {
            newValue = this.numberParser.parse(String(newValue).slice(1));
        } else if (newValue > max) {
            const useMinHourAM = !isPM && newValue === PM;

            newValue = useMinHourAM
                ? minHourAM
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
     */
    private getNewValueForOtherSegments(
        details: SegmentDetails,
        typedValue: number
    ): number {
        let newValue = this.mergePreviousValueWithTypedValue(
            details,
            typedValue
        );

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

    private focusNextSegment(event: KeyboardEvent): void {
        this.focusSegment(event.target as HTMLDivElement, 'next');
    }

    private focusPreviousSegment(event: KeyboardEvent): void {
        this.focusSegment(event.target as HTMLDivElement, 'previous');
    }

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
                segmentFound = true;
                siblingSegment.focus();
            } else {
                currentSegment = siblingSegment;
            }
        }
    }
}
