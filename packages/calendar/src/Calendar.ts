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
    getLocalTimeZone,
    getWeeksInMonth,
    isSameDay,
    startOfMonth,
    startOfWeek,
    today,
} from '@internationalized/date';
import {
    CSSResultArray,
    html,
    PropertyValueMap,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';

import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

import { CalendarWeekday, daysInWeek } from './types.js';
import styles from './calendar.css.js';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-left.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-right.js';

/**
 * @element sp-calendar
 */
export class Calendar extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    padded = false;

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ reflect: true, attribute: false })
    selectedDate?: Date;

    @property({ reflect: true, attribute: false })
    min?: Date;

    @property({ reflect: true, attribute: false })
    max?: Date;

    @state()
    private _currentDate!: CalendarDate;

    @state()
    private _minDate!: CalendarDate;

    @state()
    private _maxDate!: CalendarDate;

    private _languageResolver = new LanguageResolutionController(this);
    private _locale!: string;
    private _timeZone: string = getLocalTimeZone();

    public get today(): CalendarDate {
        return today(this._timeZone);
    }

    constructor() {
        super();

        this._setLocale();
        this._setInitialCalendarDate();
    }

    protected override willUpdate(
        changedProperties: PropertyValueMap<this>
    ): void {
        this._setLocale();

        if (changedProperties.has('selectedDate')) {
            this._setCurrentCalendarDate();
        }

        if (changedProperties.has('min')) {
            this._setMinCalendarDate();
        }

        if (changedProperties.has('max')) {
            this._setMaxCalendarDate();
        }
    }

    protected override render(): TemplateResult {
        return when(
            this._currentDate,
            () => html`
                ${this.renderCalendarHeader()}${this.renderCalendarGrid()}
            `
        );
    }

    public renderCalendarHeader(): TemplateResult {
        const monthAndYear = this._capitalFirstLetter(
            this._formatDate(this._currentDate, {
                month: 'long',
                year: 'numeric',
            })
        );

        return html`
            <div class="spectrum-Calendar-header">
                <!--
                 * TODO: Attribute 'role="heading"' removed, due to error 'The "heading" role requires the attribute
                 * "aria-level"'
                -->
                <div
                    class="spectrum-Calendar-title"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    ${monthAndYear}
                </div>

                <!-- TODO: Translate "Previous" -->
                <sp-action-button
                    quiet
                    size="s"
                    aria-label="Previous"
                    title="Previous"
                    class="spectrum-ActionButton spectrum-Calendar-prevMonth"
                    ?disabled=${this.disabled}
                    @click=${this.handlePreviousMonth}
                >
                    <sp-icon-chevron-left slot="icon"></sp-icon-chevron-left>
                </sp-action-button>

                <!-- TODO: Translate "Next" -->
                <sp-action-button
                    quiet
                    size="s"
                    aria-label="Next"
                    title="Next"
                    class="spectrum-ActionButton spectrum-Calendar-nextMonth"
                    ?disabled=${this.disabled}
                    @click=${this.handleNextMonth}
                >
                    <sp-icon-chevron-right slot="icon"></sp-icon-chevron-right>
                </sp-action-button>
            </div>
        `;
    }

    public renderCalendarGrid(): TemplateResult {
        return html`
            <!-- TODO: Implement keyboard navigation -->
            <div
                class="spectrum-Calendar-body"
                role="grid"
                tabindex=${ifDefined(!this.disabled ? '0' : undefined)}
                aria-readonly="true"
                aria-disabled=${this.disabled}
            >
                <table role="presentation" class="spectrum-Calendar-table">
                    ${this.renderCalendarTableHead()}
                    ${this.renderCalendarTableBody()}
                </table>
            </div>
        `;
    }

    public renderCalendarTableHead(): TemplateResult {
        return html`
            <thead role="presentation">
                <tr role="row">
                    ${this._getWeekdays().map((weekday) =>
                        this.renderWeekdayColumn(weekday)
                    )}
                </tr>
            </thead>
        `;
    }

    public renderWeekdayColumn(weekday: CalendarWeekday): TemplateResult {
        return html`
            <th
                role="columnheader"
                scope="col"
                class="spectrum-Calendar-tableCell"
            >
                <abbr class="spectrum-Calendar-dayOfWeek" title=${weekday.long}>
                    ${weekday.narrow}
                </abbr>
            </th>
        `;
    }

    public renderCalendarTableBody(): TemplateResult {
        return html`
            <tbody role="presentation">
                ${[...new Array(this._getWeeksInCurrentMonth()).keys()].map(
                    (weekIndex) => this.renderCalendarTableRow(weekIndex)
                )}
            </tbody>
        `;
    }

    public renderCalendarTableRow(weekIndex: number): TemplateResult {
        return html`
            <tr role="row">
                ${this._getDatesInWeek(weekIndex).map((calendarDate) =>
                    this.renderCalendarTableCell(calendarDate)
                )}
            </tr>
        `;
    }

    public renderCalendarTableCell(calendarDate: CalendarDate): TemplateResult {
        const isOutsideMonth = calendarDate.month !== this._currentDate.month;

        const isSelected = Boolean(
            this.selectedDate &&
                isSameDay(this._toCalendarDate(this.selectedDate), calendarDate)
        );

        const isToday = Boolean(isSameDay(calendarDate, this.today));

        const isDisabled = Boolean(
            this.disabled ||
                (this._minDate && calendarDate.compare(this._minDate) < 0) ||
                (this._maxDate && calendarDate.compare(this._maxDate) > 0)
        );

        const dayClasses = {
            'is-outsideMonth': isOutsideMonth,
            'is-selected': isSelected,
            'is-today': isToday,
            'is-disabled': isDisabled,
        };

        const currentDayTitle = this._formatDate(calendarDate, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        // TODO: Translate "Today" and "selected"
        const todayTitle = isToday ? 'Today, ' : '';
        const selectedTitle = isToday ? ' selected' : '';

        const title: string = this._capitalFirstLetter(
            `${todayTitle}${currentDayTitle}${selectedTitle}`
        );

        return html`
            <td
                role="gridcell"
                class="spectrum-Calendar-tableCell"
                title=${title}
                tabindex=${ifDefined(!isOutsideMonth ? '-1' : undefined)}
                aria-disabled=${isOutsideMonth || this.disabled}
                aria-selected=${isSelected}
            >
                <span
                    role="presentation"
                    class="spectrum-Calendar-date ${classMap(dayClasses)}"
                >
                    ${this._formatNumber(calendarDate.day)}
                </span>
            </td>
        `;
    }

    public handlePreviousMonth(): void {
        this._currentDate = startOfMonth(this._currentDate).subtract({
            months: 1,
        });
    }

    public handleNextMonth(): void {
        this._currentDate = startOfMonth(this._currentDate).add({ months: 1 });
    }

    private _getWeeksInCurrentMonth(): number {
        return getWeeksInMonth(this._currentDate, this._locale);
    }

    /**
     * Returns data for the days of the week, starting with the first day of the week according to the defined locale
     * (Sunday, Monday, etc.)
     */
    private _getWeekdays(): CalendarWeekday[] {
        return [...new Array(daysInWeek).keys()].map((dayIndex) => {
            const weekStart = startOfWeek(this._currentDate, this._locale);
            const date = weekStart.add({ days: dayIndex });

            return {
                narrow: this._formatDate(date, { weekday: 'narrow' }),
                long: this._capitalFirstLetter(
                    this._formatDate(date, { weekday: 'long' })
                ),
            };
        });
    }

    private _setLocale(): void {
        this._locale = this._languageResolver.language;
    }

    private _setInitialCalendarDate(): void {
        this._currentDate = this.today;
    }

    private _setCurrentCalendarDate(): void {
        if (this.selectedDate) {
            this.selectedDate = new Date(this.selectedDate);

            if (!this._isValidDate(this.selectedDate)) {
                this.selectedDate = undefined;
            } else {
                this._currentDate = this._toCalendarDate(this.selectedDate);
            }
        }
    }

    private _setMinCalendarDate(): void {
        if (this.min) {
            this.min = new Date(this.min);

            if (!this._isValidDate(this.min)) {
                this.min = undefined;
            } else {
                this._minDate = this._toCalendarDate(this.min);
            }
        }
    }

    private _setMaxCalendarDate(): void {
        if (this.max) {
            this.max = new Date(this.max);

            if (!this._isValidDate(this.max)) {
                this.max = undefined;
            } else {
                this._maxDate = this._toCalendarDate(this.max);
            }
        }
    }

    private _getDatesInWeek(weekIndex: number): CalendarDate[] {
        const dates: CalendarDate[] = [];

        let date = startOfWeek(
            startOfMonth(this._currentDate).add({ weeks: weekIndex }),
            this._locale
        );

        while (dates.length < daysInWeek) {
            dates.push(date);

            const nextDate = date.add({ days: 1 });

            // If the next day is the same, we have hit the end of the calendar system
            if (isSameDay(date, nextDate)) {
                break;
            }

            date = nextDate;
        }

        return dates;
    }

    private _toCalendarDate(date: Date): CalendarDate {
        return new CalendarDate(
            date.getFullYear(),
            date.getMonth() + 1, // The month to create a new `CalendarDate` cannot be a zero-based index, unlike `Date`
            date.getDate()
        );
    }

    /**
     * Checks if the date is valid by parsing the time. Invalid dates return `NaN` for times of invalid dates
     *
     * @param date - `Date` object to validate
     */
    private _isValidDate(date: Date): boolean {
        return !isNaN(date.getTime());
    }

    private _formatDate(
        calendarDate: CalendarDate,
        options: Intl.DateTimeFormatOptions
    ): string {
        return new Intl.DateTimeFormat(this._locale, options).format(
            calendarDate.toDate(this._timeZone)
        );
    }

    private _formatNumber(number: number): string {
        return new Intl.NumberFormat(this._locale).format(number);
    }

    private _capitalFirstLetter(string: string): string {
        return `${string.charAt(0).toUpperCase()}${string.substring(1)}`;
    }
}
