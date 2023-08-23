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
    DateFormatter,
    getLocalTimeZone,
    getWeeksInMonth,
    isSameDay,
    startOfMonth,
    startOfWeek,
    today,
} from '@internationalized/date';
import { NumberFormatter } from '@internationalized/number';
import {
    CSSResultArray,
    html,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import {
    ClassInfo,
    classMap,
    ifDefined,
} from '@spectrum-web-components/base/src/directives.js';
import { LanguageResolutionController } from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';

import { CalendarWeekday, daysInWeek } from './types.js';

import styles from './calendar.css.js';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-left.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-right.js';

/**
 * @element sp-calendar
 *
 * @slot prev-icon - The icon used in the "Previous Month" button
 * @slot next-icon - The icon used in the "Next Month" button
 *
 * @event change - Announces when a day is selected by emitting a `Date` object
 */
export class Calendar extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * Date used to display the calendar. If no date is given, the current month will be used
     */
    @property({ attribute: false })
    selectedDate?: Date;

    /**
     * The minimum allowed date a user can select
     */
    @property({ attribute: false })
    min?: Date;

    /**
     * The maximum allowed date a user can select
     */
    @property({ attribute: false })
    max?: Date;

    /**
     * Indicates when the calendar should be disabled entirely
     */
    @property({ type: Boolean, reflect: true })
    disabled = false;

    /**
     * Adds a padding around the calendar
     */
    @property({ type: Boolean, reflect: true })
    padded = false;

    @state()
    private currentDate!: CalendarDate;

    @state()
    private minDate!: CalendarDate;

    @state()
    private maxDate!: CalendarDate;

    @state()
    private weeksInCurrentMonth: number[] = [];

    @state()
    private weekdays: CalendarWeekday[] = [];

    private languageResolver = new LanguageResolutionController(this);
    private timeZone: string = getLocalTimeZone();

    private get locale(): string {
        return this.languageResolver.language;
    }

    // TODO: Implement a cache mechanism to store the value of `today` and use this value to initialise `currentDate`
    public get today(): CalendarDate {
        return today(this.timeZone);
    }

    constructor() {
        super();
        this.setInitialCalendarDate();
    }

    protected override willUpdate(changedProperties: PropertyValues): void {
        if (changedProperties.has('selectedDate')) {
            this.setCurrentCalendarDate();
        }

        if (changedProperties.has('min')) {
            this.setMinCalendarDate();
        }

        if (changedProperties.has('max')) {
            this.setMaxCalendarDate();
        }

        this.setWeeksInCurrentMonth();

        // TODO: Include a condition to run the `setWeekdays()` method only when really needed
        this.setWeekdays();
    }

    protected override render(): TemplateResult {
        return html`
            ${this.renderCalendarHeader()}${this.renderCalendarGrid()}
        `;
    }

    public renderCalendarHeader(): TemplateResult {
        const monthAndYear = this.formatDate(this.currentDate, {
            month: 'long',
            year: 'numeric',
        });

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

                <!--
                 * TODO: Translate the "Previous" text used in the "title" and "aria-label" of the button displayed in
                 * the header of the calendar
                -->
                <sp-action-button
                    quiet
                    size="s"
                    aria-label="Previous"
                    title="Previous"
                    class="spectrum-Calendar-prevMonth"
                    ?disabled=${this.disabled}
                    @click=${this.handlePreviousMonth}
                >
                    <div slot="icon">
                        <slot name="prev-icon">
                            <sp-icon-chevron-left></sp-icon-chevron-left>
                        </slot>
                    </div>
                </sp-action-button>

                <!--
                 * TODO: Translate the "Next" text used in the "title" and "aria-label" of the button displayed in the
                 * header of the calendar
                -->
                <sp-action-button
                    quiet
                    size="s"
                    aria-label="Next"
                    title="Next"
                    class="spectrum-Calendar-nextMonth"
                    ?disabled=${this.disabled}
                    @click=${this.handleNextMonth}
                >
                    <div slot="icon">
                        <slot name="prev-icon">
                            <sp-icon-chevron-right></sp-icon-chevron-right>
                        </slot>
                    </div>
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
                    ${this.weekdays.map((weekday) =>
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
                ${this.weeksInCurrentMonth.map((weekIndex) =>
                    this.renderCalendarTableRow(weekIndex)
                )}
            </tbody>
        `;
    }

    public renderCalendarTableRow(weekIndex: number): TemplateResult {
        return html`
            <tr role="row">
                ${this.getDatesInWeek(weekIndex).map((calendarDate) =>
                    this.renderCalendarTableCell(calendarDate)
                )}
            </tr>
        `;
    }

    public renderCalendarTableCell(calendarDate: CalendarDate): TemplateResult {
        const isOutsideMonth = calendarDate.month !== this.currentDate.month;

        const isSelected = Boolean(
            this.selectedDate &&
                isSameDay(this.toCalendarDate(this.selectedDate), calendarDate)
        );

        const isToday = isSameDay(calendarDate, this.today);

        const isDisabled = Boolean(
            this.disabled ||
                (this.minDate && calendarDate.compare(this.minDate) < 0) ||
                (this.maxDate && calendarDate.compare(this.maxDate) > 0)
        );

        const dayClasses: ClassInfo = {
            'spectrum-Calendar-date': true,
            'is-outsideMonth': isOutsideMonth,
            'is-selected': isSelected,
            'is-today': isToday,
            'is-disabled': isDisabled,
        };

        // TODO: The title must include "Today," and " selected" translated to the current language
        const currentDayTitle = this.formatDate(calendarDate, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return html`
            <td
                role="gridcell"
                class="spectrum-Calendar-tableCell"
                title=${currentDayTitle}
                tabindex=${ifDefined(!isOutsideMonth ? '-1' : undefined)}
                aria-disabled=${isOutsideMonth || this.disabled}
                aria-selected=${isSelected}
            >
                <span
                    role="presentation"
                    class=${classMap(dayClasses)}
                    @click=${() => this.handleDayClick(calendarDate)}
                >
                    ${this.formatNumber(calendarDate.day)}
                </span>
            </td>
        `;
    }

    public handlePreviousMonth(): void {
        this.currentDate = startOfMonth(this.currentDate).subtract({
            months: 1,
        });
    }

    public handleNextMonth(): void {
        this.currentDate = startOfMonth(this.currentDate).add({ months: 1 });
    }

    public handleDayClick(calendarDate: CalendarDate): void {
        this.selectedDate = calendarDate.toDate(this.timeZone);

        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: this.selectedDate,
            })
        );
    }

    /**
     * Defines the array with the indexes (starting at zero) of the weeks of the current month
     */
    private setWeeksInCurrentMonth(): void {
        const numberOfWeeks = getWeeksInMonth(this.currentDate, this.locale);

        this.weeksInCurrentMonth = [...new Array(numberOfWeeks).keys()];
    }

    /**
     * Defines the array with data for the days of the week, starting on the first day of the week according to the
     * defined location (Sunday, Monday, etc.)
     */
    private setWeekdays(): void {
        this.weekdays = [...new Array(daysInWeek).keys()].map((dayIndex) => {
            const weekStart = startOfWeek(this.currentDate, this.locale);
            const date = weekStart.add({ days: dayIndex });

            return {
                narrow: this.formatDate(date, { weekday: 'narrow' }),
                long: this.formatDate(date, { weekday: 'long' }),
            };
        });
    }

    /**
     * Defines the initial date that will be used to render the calendar, if no specific date is provided
     */
    private setInitialCalendarDate(): void {
        this.currentDate = this.today;
    }

    /**
     * If a date is received by the component via property, it uses that date as the current date to render the calendar
     */
    private setCurrentCalendarDate(): void {
        if (!this.selectedDate) {
            return;
        }

        this.selectedDate = new Date(this.selectedDate);

        if (!this.isValidDate(this.selectedDate)) {
            this.selectedDate = undefined;
            return;
        }

        this.currentDate = this.toCalendarDate(this.selectedDate);
    }

    /**
     * Sets the minimum allowed date a user can select by converting a `Date` object to `CalendarDate`, which is the
     * type of object used internally by the class
     */
    private setMinCalendarDate(): void {
        if (!this.min) {
            return;
        }

        this.min = new Date(this.min);

        if (!this.isValidDate(this.min)) {
            this.min = undefined;
            return;
        }

        this.minDate = this.toCalendarDate(this.min);
    }

    /**
     * Sets the maximum allowed date a user can select by converting a `Date` object to `CalendarDate`, which is the
     * type of object used internally by the class
     */
    private setMaxCalendarDate(): void {
        if (!this.max) {
            return;
        }

        this.max = new Date(this.max);

        if (!this.isValidDate(this.max)) {
            this.max = undefined;
            return;
        }

        this.maxDate = this.toCalendarDate(this.max);
    }

    /**
     * Returns an array with all days of the week corresponding to the given index, starting with the first day of the
     * week according to the locale
     *
     * @param weekIndex - The index of the week
     */
    private getDatesInWeek(weekIndex: number): CalendarDate[] {
        const dates: CalendarDate[] = [];

        let date = startOfWeek(
            startOfMonth(this.currentDate).add({ weeks: weekIndex }),
            this.locale
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

    /**
     * Converts a `Date` object to a `CalendarDate`
     *
     * @param date - `Date` object to be converted
     */
    private toCalendarDate(date: Date): CalendarDate {
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
    private isValidDate(date: Date): boolean {
        return !isNaN(date.getTime());
    }

    /**
     * Formats a `CalendarDate` object using the current locale and the provided date format options
     *
     * @param calendarDate - The `CalendarDate` object that will be used by the formatter
     * @param options - All date format options that will be used by the formatter
     */
    private formatDate(
        calendarDate: CalendarDate,
        options: Intl.DateTimeFormatOptions
    ): string {
        return new DateFormatter(this.locale, options).format(
            calendarDate.toDate(this.timeZone)
        );
    }

    /**
     * Formats a number using the defined locale
     *
     * @param number - The number to format
     */
    private formatNumber(number: number): string {
        return new NumberFormatter(this.locale).format(number);
    }
}
