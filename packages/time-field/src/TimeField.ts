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
    Granularity,
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
    private _currentTime!: Time;

    @state()
    private _segments: TimeSegment[] = [];

    private _languageResolver = new LanguageResolutionController(this);
    private _locale!: string;
    private _timeZone: string = getLocalTimeZone();
    private _timeFormatter!: DateFormatter;

    private get _now(): Time {
        return toTime(now(this._timeZone));
    }

    private get _is12HourClock(): boolean {
        return Boolean(this._timeFormatter.resolvedOptions().hour12);
    }

    constructor() {
        super();

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
        }

        this._setSegments();
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
                tabindex=${ifDefined(isActive ? '0' : undefined)}
                inputmode="numeric"
                class="editable-segment ${classMap(segmentClasses)}"
                style=${styleMap(segmentStyles)}
                data-testid=${segment.type}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                @keydown=${this.handleKeydown}
            >
                ${when(
                    isPlaceholderVisible,
                    () => html`
                        <span aria-hidden="true" class="placeholder">
                            ${segment.placeholder}
                        </span>
                    `,
                    () => segment.formattedText
                )}
            </div>
        `;
    }

    public handleKeydown($event: KeyboardEvent): void {
        switch ($event.code) {
            case 'ArrowUp': {
                this._incrementValue($event);
                break;
            }
            case 'ArrowRight': {
                this._focusNextSegment($event);
                break;
            }
            case 'ArrowDown': {
                this._decrementValue($event);
                break;
            }
            case 'ArrowLeft': {
                this._focusPreviousSegment($event);
                break;
            }
        }
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
        this._currentTime = this._now;
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

    private _setSegments(): void {
        const { hour, minute, second, millisecond } = this._currentTime;
        const dateTime = new Date();
        dateTime.setHours(hour, minute, second, millisecond);

        this._segments = this._timeFormatter
            .formatToParts(dateTime)
            .map((part) => this._mapToTimeSegment(part))
            .filter((part) => timeSegmentTypes.includes(part.type));
    }

    private _mapToTimeSegment(part: Intl.DateTimeFormatPart): TimeSegment {
        const { currentValue, minValue, maxValue } =
            this._getSegmentValueAndLimits(part.type);

        return {
            type: part.type,
            placeholder: this._getPlaceholder(part.type, part.value),
            formattedText: part.value,
            currentValue,
            minValue,
            maxValue,
        };
    }

    private _toTime(date: Date): Time {
        return new Time(date.getHours(), date.getMinutes(), date.getSeconds());
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

    private _getSegmentValueAndLimits(type: string): TimeSegmentValueAndLimits {
        switch (type) {
            case 'dayPeriod':
                return {
                    currentValue:
                        this.selectedTime &&
                        (this._currentTime.hour >= 12 ? 12 : 0),
                    minValue: 0,
                    maxValue: 12,
                };

            case 'hour':
                if (this._is12HourClock) {
                    const isPM = this._currentTime.hour >= 12;

                    return {
                        currentValue:
                            this.selectedTime && this._currentTime.hour,
                        minValue: isPM ? 12 : 0,
                        maxValue: isPM ? 23 : 11,
                    };
                } else {
                    return {
                        currentValue:
                            this.selectedTime && this._currentTime.hour,
                        minValue: 0,
                        maxValue: 23,
                    };
                }

            case 'minute':
                return {
                    currentValue: this.selectedTime && this._currentTime.minute,
                    minValue: 0,
                    maxValue: 59,
                };

            case 'second':
                return {
                    currentValue: this.selectedTime && this._currentTime.second,
                    minValue: 0,
                    maxValue: 59,
                };

            default:
                return {};
        }
    }

    private _incrementValue($event: KeyboardEvent): void {
        this._valueChanged($event);
    }

    private _decrementValue($event: KeyboardEvent): void {
        this._valueChanged($event);
    }

    private _valueChanged($event: KeyboardEvent): void {
        $event.preventDefault();

        this.dispatchEvent(
            new Event('change', { bubbles: true, composed: true })
        );
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
}
