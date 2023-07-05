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
    DateFormatter,
    getLocalTimeZone,
    now,
    Time,
    toTime,
} from '@internationalized/date';
import {
    CSSResultArray,
    html,
    PropertyValueMap,
    TemplateResult,
} from '@spectrum-web-components/base';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
import { TextfieldBase } from '@spectrum-web-components/textfield';

import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';

import {
    AM,
    Granularity,
    PM,
    TimeSegment,
    timeSegmentTypes,
    TimeSegmentValueAndLimits,
} from './types.js';

import styles from './time-field.css.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * @element sp-time-field
 */
export class TimeField extends TextfieldBase {
    public static override get styles(): CSSResultArray {
        return [...super.styles, styles];
    }

    @property({ reflect: true, attribute: false })
    selectedTime?: Date;

    @property({ attribute: false })
    granularity: Granularity = 'minute';

    @state()
    private _locale!: string;

    @state()
    private _previousLocale?: string;

    @state()
    private _currentTime!: Time;

    @state()
    private _newTime?: Time;

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

    constructor() {
        super();

        this._setTimeZone();
        this._setLocale();
        this._setTimeFormatter();
        this._setInitialTime();
    }

    protected override willUpdate(
        changedProperties: PropertyValueMap<this>
    ): void {
        this._setLocale();
        this._setTimeFormatter();

        if (changedProperties.has('selectedTime')) {
            this._setCurrentTime();
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
            <div class="input">
                <div role="presentation" class="input-content">
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
                ${segment.formattedText}
            </span>
        `;
    }

    public renderEditableSegment(segment: TimeSegment): TemplateResult {
        const isActive = !(this.disabled && this.readonly);

        const isPlaceholderVisible = Boolean(
            segment.currentValue === undefined
        );

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
                autocapitalize=${ifDefined(isActive ? 'off' : undefined)}
                spellcheck=${ifDefined(isActive ? 'false' : undefined)}
                inputmode=${ifDefined(isActive ? 'numeric' : undefined)}
                tabindex=${ifDefined(isActive ? '0' : undefined)}
                class="editable-segment ${classMap(segmentClasses)}"
                style=${styleMap(segmentStyles)}
                data-testid=${segment.type}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                @keydown=${($event: KeyboardEvent) =>
                    this.handleKeydown(segment, $event)}
                @input=${this.handleInput}
            >
                ${when(
                    isPlaceholderVisible,
                    () => html`
                        <span aria-hidden="true" class="placeholder">
                            ${segment.placeholder}
                        </span>
                    `,
                    () => this._formatValue(segment)
                )}
            </div>
        `;
    }

    public handleKeydown(segment: TimeSegment, $event: KeyboardEvent): void {
        switch ($event.code) {
            case 'ArrowUp': {
                this._incrementValue(segment, $event);
                break;
            }
            case 'ArrowRight': {
                this._focusNextSegment($event);
                break;
            }
            case 'ArrowDown': {
                this._decrementValue(segment, $event);
                break;
            }
            case 'ArrowLeft': {
                this._focusPreviousSegment($event);
                break;
            }
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

    private _setInitialTime(): void {
        this._currentTime = toTime(now(this._timeZone));
    }

    private _setCurrentTime(): void {
        if (this.selectedTime) {
            this.selectedTime = new Date(this.selectedTime);

            if (!this._isValidTime(this.selectedTime)) {
                this.selectedTime = undefined;
            } else {
                this._currentTime = this._toTime(this.selectedTime);
            }
        }
    }

    private _setNewTime(): void {
        this._newTime = undefined;

        const hasHour = this._hourSegment?.currentValue !== undefined;
        const hasMinute = this._minuteSegment?.currentValue !== undefined;
        const hasSecond = this._secondSegment?.currentValue !== undefined;

        if (
            (this.granularity === 'hour' && hasHour) ||
            (this.granularity === 'minute' && hasHour && hasMinute) ||
            (this.granularity === 'second' && hasHour && hasMinute && hasSecond)
        ) {
            this._newTime = new Time(
                this._hourSegment?.currentValue,
                this._minuteSegment?.currentValue,
                this._secondSegment?.currentValue
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
     * Returns a new `Time` object using the time part of the informed `Date` object
     *
     * @param date - `Date` object to "convert" into `Time`
     */
    private _toTime(date: Date): Time {
        return new Time(date.getHours(), date.getMinutes(), date.getSeconds());
    }

    /**
     * Determines which segments will be used by the input (hour, minute, second, day period for 12-hour clock). The
     * segment referring to the hour will always be displayed, the other segments vary according to the defined locale
     * and granularity
     */
    private _setSegments(): void {
        const { hour, minute, second } = this._currentTime;

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
        const { minValue, maxValue, currentValue } = this._getSegmentDetails(
            part.type
        );

        return {
            type: part.type,
            placeholder: this._getPlaceholder(part.type, part.value),
            formattedText: part.value,
            currentValue,
            minValue,
            maxValue,
        };
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
                    currentValue:
                        (this._newTime?.hour &&
                            this._getAmPmModifier(this._newTime.hour)) ??
                        (this.selectedTime &&
                            this._getAmPmModifier(this._currentTime.hour)) ??
                        undefined,
                };

            case 'hour':
                let min = 0;
                let max = 23;

                if (this._is12HourClock) {
                    const isPM = this._isPM(
                        this._newTime?.hour ?? this._currentTime.hour
                    );

                    min = isPM ? PM : AM;
                    max = isPM ? 23 : 11;
                }

                return {
                    minValue: min,
                    maxValue: max,
                    currentValue:
                        this._newTime?.hour ??
                        (this.selectedTime && this._currentTime.hour) ??
                        undefined,
                };

            case 'minute':
            case 'second':
                const minutes =
                    this._newTime?.minute ??
                    (this.selectedTime && this._currentTime.minute) ??
                    undefined;

                const seconds =
                    this._newTime?.second ??
                    (this.selectedTime && this._currentTime.second) ??
                    undefined;

                return {
                    minValue: 0,
                    maxValue: 59,
                    currentValue: type === 'minute' ? minutes : seconds,
                };

            default:
                return {};
        }
    }

    private _incrementValue(segment: TimeSegment, $event: KeyboardEvent): void {
        const min = segment.minValue;
        const max = segment.maxValue;

        if (min !== undefined && max !== undefined) {
            if (segment.currentValue === undefined) {
                segment.currentValue = min;
            } else if (segment.type === 'dayPeriod') {
                segment.currentValue = segment.currentValue === AM ? PM : AM;
            } else {
                segment.currentValue++;

                if (segment.currentValue > max) {
                    segment.currentValue = min;
                }
            }
        }

        this._updateHourOrDayPeriod(segment);
        this._valueChanged($event);
    }

    private _decrementValue(segment: TimeSegment, $event: KeyboardEvent): void {
        const min = segment.minValue;
        const max = segment.maxValue;

        if (min !== undefined && max !== undefined) {
            if (segment.currentValue === undefined) {
                segment.currentValue = max;
            } else if (segment.type === 'dayPeriod') {
                segment.currentValue = segment.currentValue === AM ? PM : AM;
            } else {
                segment.currentValue--;

                if (segment.currentValue < min) {
                    segment.currentValue = max;
                }
            }
        }

        this._updateHourOrDayPeriod(segment);
        this._valueChanged($event);
    }

    private _updateHourOrDayPeriod(segment: TimeSegment): void {
        if (this._is12HourClock) {
            if (segment.type === 'hour') {
                this._updateDayPeriod();
            }

            if (segment.type === 'dayPeriod') {
                this._updateHour();
            }
        }
    }

    /**
     * When the day period is changed, it automatically adjusts the hour if it has already been informed previously to
     * match the new period (AM or PM)
     */
    private _updateHour(): void {
        if (
            this._dayPeriodSegment &&
            this._hourSegment &&
            this._dayPeriodSegment.currentValue !== undefined &&
            this._hourSegment.currentValue !== undefined
        ) {
            if (
                this._dayPeriodSegment.currentValue === AM &&
                this._isPM(this._hourSegment.currentValue)
            ) {
                this._hourSegment.currentValue -= PM;
            } else if (
                this._dayPeriodSegment.currentValue === PM &&
                !this._isPM(this._hourSegment.currentValue)
            ) {
                this._hourSegment.currentValue += PM;
            }
        }
    }

    /**
     * When the hour is changed, if the day period has not yet been defined, it is automatically defined based on the
     * entered hour
     */
    private _updateDayPeriod(): void {
        if (
            this._hourSegment &&
            this._dayPeriodSegment &&
            this._hourSegment.currentValue !== undefined &&
            this._dayPeriodSegment.currentValue === undefined
        ) {
            this._dayPeriodSegment.currentValue = this._getAmPmModifier(
                this._hourSegment.currentValue
            );
        }
    }

    private _valueChanged($event: KeyboardEvent): void {
        $event.preventDefault();

        this._setNewTime();

        this.dispatchEvent(
            new Event('change', { bubbles: true, composed: true })
        );

        this.requestUpdate();
    }

    private _focusNextSegment($event: KeyboardEvent): void {
        this._focusSegment($event.target as HTMLElement, 'next');
    }

    private _focusPreviousSegment($event: KeyboardEvent): void {
        this._focusSegment($event.target as HTMLElement, 'previous');
    }

    private _focusSegment(
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
            ) as HTMLElement;

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

    private _formatValue(segment: TimeSegment): string | undefined {
        if (segment.currentValue !== undefined) {
            const timeOptions: Intl.DateTimeFormatOptions = {};

            let hour = this._currentTime.hour;
            let minute = this._currentTime.minute;
            let second = this._currentTime.second;
            let padMaxLength = 2;

            switch (segment.type) {
                case 'hour': {
                    if (this._is12HourClock) {
                        padMaxLength = 1;
                    }

                    hour = segment.currentValue;
                    timeOptions.hour = 'numeric';
                    break;
                }

                case 'minute': {
                    minute = segment.currentValue;
                    timeOptions.minute = '2-digit';
                    break;
                }

                case 'second': {
                    second = segment.currentValue;
                    timeOptions.second = '2-digit';
                    break;
                }

                case 'dayPeriod': {
                    hour = (segment.currentValue || 0) + 1;
                    timeOptions.hour = 'numeric';
                    break;
                }
            }

            if (!timeOptions) {
                return segment.formattedText;
            }

            const date = new Date();
            date.setHours(hour, minute, second);

            const value = new DateFormatter(this._locale, timeOptions)
                .formatToParts(date)
                .find((part) => part.type === segment.type)?.value;

            return value?.padStart(padMaxLength, '0');
        } else {
            return segment.formattedText;
        }
    }
}
