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
    now,
    toCalendarDateTime,
} from '@internationalized/date';
import {
    CSSResultArray,
    html,
    PropertyValueMap,
    TemplateResult,
} from '@spectrum-web-components/base';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
import { TextfieldBase } from '@spectrum-web-components/textfield';

import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';

import {
    AM,
    Granularity,
    maxHourAM,
    maxHourPM,
    minHourAM,
    minHourPM,
    PM,
    TimeSegment,
    timeSegmentTypes,
    TimeSegmentValueAndLimits,
} from './types.js';

import styles from './time-field.css.js';

/**
 * @element sp-time-field
 *
 * @event change - Announces when a new time is defined by emitting a `Date` object
 */
export class TimeField extends TextfieldBase {
    public static override get styles(): CSSResultArray {
        return [...super.styles, styles];
    }

    @query('.editable-segment')
    firstEditableSegment!: HTMLDivElement;

    @property({ reflect: true, attribute: false })
    selectedDateTime?: Date;

    @property({ attribute: false })
    granularity: Granularity = 'minute';

    @state()
    private _locale!: string;

    @state()
    private _previousLocale?: string;

    @state()
    private _currentDateTime!: CalendarDateTime;

    @state()
    private _newDateTime?: CalendarDateTime;

    @state()
    private _segments: TimeSegment[] = [];

    @state()
    private _createSegments = true;

    private _languageResolver = new LanguageResolutionController(this);
    private _timeZone!: string;
    private _timeFormatter!: DateFormatter;

    private get _is12HourClock(): boolean {
        return Boolean(this._timeFormatter.resolvedOptions().hour12);
    }

    private get _hourSegment(): TimeSegment | undefined {
        return this._segments.find((segment) => segment.type === 'hour');
    }

    private get _minuteSegment(): TimeSegment | undefined {
        return this._segments.find((segment) => segment.type === 'minute');
    }

    private get _secondSegment(): TimeSegment | undefined {
        return this._segments.find((segment) => segment.type === 'second');
    }

    private get _dayPeriodSegment(): TimeSegment | undefined {
        return this._segments.find((segment) => segment.type === 'dayPeriod');
    }

    /**
     * The `TextfieldBase` class requires this getter to return an element of type `HTMLInputElement` or
     * `HTMLTextAreaElement`, but since `TimeField` uses DIVs with the `contenteditable` attribute, we need to convert
     * as an input just to be able to use autofocus.
     *
     * Note that `focusElement` is only used for that, so converting as an input will have no side effect as all
     * functions and attributes used exist in both types, `HTMLInputElement` and `HTMLDivElement`.
     */
    public override get focusElement(): HTMLInputElement {
        return this.firstEditableSegment as HTMLInputElement;
    }

    constructor() {
        super();

        this._setTimeZone();
        this._setLocale();
        this._setTimeFormatter();
        this._setInitialDateTime();
    }

    protected override willUpdate(
        changedProperties: PropertyValueMap<this>
    ): void {
        this._setLocale();
        this._setTimeFormatter();

        if (changedProperties.has('selectedDateTime')) {
            this._setCurrentDateTime();
            this._createSegments = true;
        }

        if (changedProperties.has('granularity')) {
            this._createSegments = true;
        }

        if (this._locale !== this._previousLocale) {
            this._previousLocale = this._locale;
            this._createSegments = true;
        }

        if (this._createSegments) {
            this._setSegments();
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
                    ${this._segments.map((segment) =>
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

    public renderLiteralSegment(segment: TimeSegment): TemplateResult {
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

    public renderEditableSegment(segment: TimeSegment): TemplateResult {
        const isActive = !this.disabled && !this.readonly;

        const isPlaceholderVisible = Boolean(segment.value === undefined);

        const segmentClasses = {
            'is-placeholder': isPlaceholderVisible,
        };

        const segmentStyles = {
            minWidth:
                segment.maxValue !== undefined
                    ? `${String(segment.maxValue).length}ch`
                    : undefined,
        };

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
    public handleKeydown(segment: TimeSegment, event: KeyboardEvent): void {
        switch (event.code) {
            case 'ArrowUp': {
                this._incrementValue(segment);
                break;
            }
            case 'ArrowRight': {
                this._focusNextSegment(event);
                break;
            }
            case 'ArrowDown': {
                this._decrementValue(segment);
                break;
            }
            case 'ArrowLeft': {
                this._focusPreviousSegment(event);
                break;
            }
            default: {
                // TODO: Use @input/@beforeinput events to handle data input/content cleanup
                const key = event.key;
                const numberKey = /^[0-9]+$/.test(key);
                const clearKey = ['Backspace', 'Delete'].includes(key);
                const allowedKey = ['Tab'].includes(key);

                if (numberKey) {
                    this.handleTypedValue(segment, event);
                }

                if (clearKey) {
                    this.handleClear(segment);
                }

                if (numberKey || clearKey || !allowedKey) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        }
    }

    public handleTypedValue(segment: TimeSegment, event: KeyboardEvent): void {
        const min = segment.minValue;
        const max = segment.maxValue;

        if (min !== undefined && max !== undefined) {
            const typedValue = Number(event.key);
            const isHourAmPm = this._is12HourClock && segment.type === 'hour';
            const maxLength = String(max).length;

            let previousValue = segment.value;
            let newValue: number;

            if (
                isHourAmPm &&
                previousValue !== undefined &&
                this._isPM(previousValue)
            ) {
                previousValue -= PM;
            }

            newValue =
                previousValue !== undefined
                    ? Number(`${previousValue}${typedValue}`)
                    : typedValue;

            if (String(newValue).length > maxLength) {
                newValue = isHourAmPm
                    ? typedValue
                    : Number(String(newValue).slice(1));
            }

            // Defines the value that should be used if the new defined value is less than the minimum allowed
            const useTypedValueOrMin = typedValue >= min ? typedValue : min;

            // Defines the value that should be used if the new defined value is greater than the maximum allowed
            const useTypedValueOrMax = typedValue <= max ? typedValue : max;

            if (isHourAmPm) {
                const isPM = this._isPM(min);

                if (isPM && newValue !== min && newValue > maxHourAM) {
                    newValue = Number(String(newValue).slice(1));
                } else if (newValue > max) {
                    const useMinHourAM = !isPM && newValue === PM;
                    newValue = useMinHourAM ? minHourAM : useTypedValueOrMax;
                }

                if (isPM && newValue !== min) {
                    newValue += PM;
                }
            } else {
                if (String(newValue).length > maxLength) {
                    newValue = Number(String(newValue).slice(1));
                }

                if (newValue < min) {
                    newValue = useTypedValueOrMin;
                } else if (newValue > max) {
                    newValue = useTypedValueOrMax;
                }
            }

            segment.value = newValue;

            this._valueChanged(segment);
        }
    }

    public handleClear(segment: TimeSegment): void {
        let newValue: string | undefined;
        let previousValue = segment.value;

        if (previousValue !== undefined) {
            if (this._is12HourClock && segment.type === 'hour') {
                const isPM =
                    segment.minValue !== undefined &&
                    this._isPM(segment.minValue);

                if (isPM) {
                    previousValue -= PM;
                }

                newValue =
                    previousValue === minHourAM
                        ? String(minHourAM + 1)
                        : String(previousValue).slice(0, -1);

                if (isPM && newValue !== '') {
                    newValue = String(Number(newValue) + PM);
                }
            } else {
                newValue =
                    segment.type === 'dayPeriod'
                        ? undefined
                        : String(previousValue).slice(0, -1);
            }

            segment.value = (newValue && Number(newValue)) || undefined;

            this._valueChanged(segment);
        }
    }

    private _setTimeZone(): void {
        this._timeZone = getLocalTimeZone();
    }

    private _setLocale(): void {
        this._locale = this._languageResolver.language;
    }

    private _setTimeFormatter(): void {
        const useMinutes = (['minute', 'second'] as Granularity[]).includes(
            this.granularity
        );

        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            ...(useMinutes && { minute: '2-digit' }),
            ...(this.granularity === 'second' && { second: '2-digit' }),
        };

        this._timeFormatter = new DateFormatter(this._locale, timeOptions);
    }

    private _setInitialDateTime(): void {
        this._currentDateTime = toCalendarDateTime(now(this._timeZone));
    }

    private _setCurrentDateTime(): void {
        if (this.selectedDateTime) {
            this.selectedDateTime = new Date(this.selectedDateTime);

            if (!this._isValidTime(this.selectedDateTime)) {
                this.selectedDateTime = undefined;
            } else {
                this._currentDateTime = this._dateToCalendarDateTime(
                    this.selectedDateTime
                );
            }
        }
    }

    private _setNewTime(): void {
        this._newDateTime = undefined;

        const hasHour = this._hourSegment?.value !== undefined;
        const hasMinute = this._minuteSegment?.value !== undefined;
        const hasSecond = this._secondSegment?.value !== undefined;

        if (
            (this.granularity === 'hour' && hasHour) ||
            (this.granularity === 'minute' && hasHour && hasMinute) ||
            (this.granularity === 'second' && hasHour && hasMinute && hasSecond)
        ) {
            this._newDateTime = new CalendarDateTime(
                this._currentDateTime.year,
                this._currentDateTime.month,
                this._currentDateTime.day,

                this._hourSegment?.value,
                this._minuteSegment?.value,
                this._secondSegment?.value
            );
        }
    }

    /**
     * Checks if the date is valid by parsing the time. Invalid dates return `NaN` for times of invalid dates
     *
     * @param date - `Date` object to validate
     */
    private _isValidTime(date: Date): boolean {
        return !isNaN(date.getTime());
    }

    /**
     * Converts an object of type `Date` to `Calendar DateTime`
     *
     * @param date - `Date` object to "convert"
     */
    private _dateToCalendarDateTime(date: Date): CalendarDateTime {
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
    private _setSegments(): void {
        const { hour, minute, second } = this._currentDateTime;

        const dateTime = new Date();
        dateTime.setHours(hour, minute, second);

        this._segments = this._timeFormatter
            .formatToParts(dateTime)
            .map((part) => this._mapToTimeSegment(part))
            .filter((part) => timeSegmentTypes.includes(part.type));

        this._createSegments = false;
    }

    /**
     * The parts returned by the `formatToParts()` function have only two properties, `type` and `value`, but we need
     * more information for each segment, so we convert it to the type we need
     *
     * @param part - Part/segment to be "translated" (mapped)
     */
    private _mapToTimeSegment(part: Intl.DateTimeFormatPart): TimeSegment {
        const { value, minValue, maxValue } = this._getSegmentDetails(
            part.type
        );

        const segment: TimeSegment = {
            type: part.type,
            placeholder: this._getPlaceholder(part.type, part.value),
            formatted: part.value,
            value,
            minValue,
            maxValue,
        };

        this._formatValues(segment);

        return segment;
    }

    /**
     * If the segment has a `currentValue`, it defines the text used in the UI formatted according to the locale
     *
     * @param segment - Segment to be updated
     */
    private _formatValues(segment: TimeSegment): void {
        if (segment.value !== undefined) {
            const timeOptions: Intl.DateTimeFormatOptions = {};

            let hour = this._currentDateTime.hour;
            let minute = this._currentDateTime.minute;
            let second = this._currentDateTime.second;
            let padMaxLength = 2;

            switch (segment.type) {
                case 'hour': {
                    if (this._is12HourClock) {
                        padMaxLength = 1;
                    }

                    hour = segment.value;
                    timeOptions.hour = 'numeric';
                    break;
                }

                case 'minute': {
                    minute = segment.value;
                    timeOptions.minute = '2-digit';
                    break;
                }

                case 'second': {
                    second = segment.value;
                    timeOptions.second = '2-digit';
                    break;
                }

                case 'dayPeriod': {
                    hour = (segment.value || 0) + 1;
                    timeOptions.hour = 'numeric';
                    break;
                }
            }

            const date = new Date();
            date.setHours(hour, minute, second);

            const formatted = new DateFormatter(this._locale, timeOptions)
                .formatToParts(date)
                .find((part) => part.type === segment.type)?.value;

            segment.formatted = formatted?.padStart(padMaxLength, '0');
        }
    }

    /**
     * Returns the placeholder that will be used. If it is day period field, use the actual value. For time fields
     * (hour, minute, second), use two dashes as a placeholder
     *
     * @param type - Type of segment
     * @param value - The value of the segment
     */
    private _getPlaceholder(
        type: Intl.DateTimeFormatPartTypes,
        value: string
    ): string {
        return type === 'dayPeriod' ? value : '––';
    }

    /**
     * Indicates whether the hour entered is PM or not
     *
     * @param hour - The hour to check
     */
    private _isPM(hour: number): boolean {
        return hour >= PM;
    }

    /**
     * Returns the corresponding "modifier" (0 for "AM" and 12 for "PM") for the given hour
     *
     * @param hour - The hour to identify the modifier
     */
    private _getAmPmModifier(hour: number): typeof AM | typeof PM {
        return this._isPM(hour) ? PM : AM;
    }

    /**
     * Returns the minimum and maximum values for each segment that will be used, in addition to defining if there is a
     * current value to be used. If segments are being recreated, we try to recover the value that was previously set
     * for each segment, if possible
     *
     * @param type - Segment type
     */
    private _getSegmentDetails(
        type: Intl.DateTimeFormatPartTypes
    ): TimeSegmentValueAndLimits {
        switch (type) {
            case 'dayPeriod':
                return {
                    minValue: AM,
                    maxValue: PM,
                    value:
                        (this._newDateTime?.hour &&
                            this._getAmPmModifier(this._newDateTime.hour)) ??
                        (this.selectedDateTime &&
                            this._getAmPmModifier(
                                this._currentDateTime.hour
                            )) ??
                        undefined,
                };

            case 'hour':
                let min = 0;
                let max = 23;

                if (this._is12HourClock) {
                    const isPM = this._isPM(
                        this._newDateTime?.hour ?? this._currentDateTime.hour
                    );

                    min = isPM ? minHourPM : minHourAM;
                    max = isPM ? maxHourPM : maxHourAM;
                }

                return {
                    minValue: min,
                    maxValue: max,
                    value:
                        this._newDateTime?.hour ??
                        (this.selectedDateTime && this._currentDateTime.hour) ??
                        undefined,
                };

            case 'minute':
            case 'second':
                const minutes =
                    this._newDateTime?.minute ??
                    (this.selectedDateTime && this._currentDateTime.minute) ??
                    undefined;

                const seconds =
                    this._newDateTime?.second ??
                    (this.selectedDateTime && this._currentDateTime.second) ??
                    undefined;

                return {
                    minValue: 0,
                    maxValue: 59,
                    value: type === 'minute' ? minutes : seconds,
                };

            default:
                return {};
        }
    }

    private _incrementValue(segment: TimeSegment): void {
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

        this._valueChanged(segment);
    }

    private _decrementValue(segment: TimeSegment): void {
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

        this._valueChanged(segment);
    }

    /**
     * When the day period is changed, it automatically adjusts the hour if it has already been informed previously to
     * match the new period (AM or PM). In addition, the minimum and maximum values of the hour are also changed
     */
    private _updateHour(): void {
        if (this._hourSegment && this._dayPeriodSegment) {
            if (this._dayPeriodSegment.value !== undefined) {
                const isAM = this._dayPeriodSegment.value === AM;
                const isPM = this._dayPeriodSegment.value === PM;

                this._hourSegment.minValue = isPM ? minHourPM : minHourAM;
                this._hourSegment.maxValue = isPM ? maxHourPM : maxHourAM;

                if (this._hourSegment.value !== undefined) {
                    if (isAM && this._isPM(this._hourSegment.value)) {
                        this._hourSegment.value -= PM;
                    } else if (isPM && !this._isPM(this._hourSegment.value)) {
                        this._hourSegment.value += PM;
                    }
                }
            } else {
                this._resetHourAndDayPeriod();
            }
        }
    }

    /**
     * When the day period is cleared, we need to reset the min and max values of the day period and hour segments to
     * their initial values
     */
    private _resetHourAndDayPeriod(): void {
        const dayPeriod = this._getSegmentDetails('dayPeriod');

        if (this._dayPeriodSegment) {
            this._dayPeriodSegment.value = dayPeriod.value;
            this._dayPeriodSegment.minValue = dayPeriod.minValue;
            this._dayPeriodSegment.maxValue = dayPeriod.maxValue;

            if (this._dayPeriodSegment.value === undefined) {
                this._dayPeriodSegment.formatted =
                    this._dayPeriodSegment.placeholder;
            }
        }

        const hour = this._getSegmentDetails('hour');

        if (this._hourSegment) {
            this._hourSegment.minValue = hour.minValue;
            this._hourSegment.maxValue = hour.maxValue;

            if (this._hourSegment.value !== undefined) {
                this._hourSegment.value += this._getAmPmModifier(
                    this._currentDateTime.hour
                );
            } else {
                this._hourSegment.value = hour.value;
            }
        }
    }

    private _valueChanged(segment: TimeSegment): void {
        if (this._is12HourClock && segment.type === 'dayPeriod') {
            this._updateHour();
        }

        this._formatValues(segment);
        this._setNewTime();

        this.requestUpdate();

        if (this._newDateTime) {
            this.dispatchEvent(
                new CustomEvent('change', {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                    detail: this._newDateTime.toDate(this._timeZone),
                })
            );
        }
    }

    private _focusNextSegment(event: KeyboardEvent): void {
        this._focusSegment(event.target as HTMLDivElement, 'next');
    }

    private _focusPreviousSegment(event: KeyboardEvent): void {
        this._focusSegment(event.target as HTMLDivElement, 'previous');
    }

    private _focusSegment(
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
