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
    parseDate,
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
import {
    LanguageResolutionController,
    languageResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';

import { CalendarWeekday, DateCellProperties } from './types.js';

import styles from './calendar.css.js';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-left.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-right.js';

export const DAYS_PER_WEEK = 7;
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
     * The selected date in the calendar. If defined, this also indicates where the calendar opens.
     * If not, the calendar opens at the current month.
     */
    @property({ attribute: false })
    public set selectedDate(date: Date) {
        if (!this.isValidDate(date)) return;

        this._selectedDate = this.toCalendarDate(date);
        this.currentDate = this._selectedDate;

        this.requestUpdate('selectedDate', this._selectedDate);
    }

    public get selectedDate(): Date {
        if (!this._selectedDate) return new Date('Invalid Date');
        return this._selectedDate?.toDate(this.timeZone);
    }
    private _selectedDate?: CalendarDate;

    /**
     * The date that indicates the current position in the calendar.
     */
    @state()
    private currentDate: CalendarDate = this.today;

    /**
     * The minimum allowed date a user can select
     */
    @property({ attribute: false })
    min?: Date;
    private minDate?: CalendarDate;

    /**
     * The maximum allowed date a user can select
     */
    @property({ attribute: false })
    max?: Date;
    private maxDate?: CalendarDate;

    /**
     * Indicates when the calendar should be disabled entirely
     */
    @property({ type: Boolean, reflect: true })
    public disabled = false;

    /**
     * Adds a padding around the calendar
     */
    @property({ type: Boolean, reflect: true })
    public padded = false;

    private languageResolver = new LanguageResolutionController(this);

    /**
     * The locale used to format the dates and weekdays.
     * The default value is the language of the document or the user's browser.
     */
    private get locale(): string {
        return this.languageResolver.language;
    }

    // TODO: Implement a cache mechanism to store the value of `today`
    private timeZone: string = getLocalTimeZone();
    public get today(): CalendarDate {
        return today(this.timeZone);
    }

    @state()
    private weeksInCurrentMonth: number[] = [];

    @state()
    private weekdays: CalendarWeekday[] = [];

    @state()
    protected set isDateFocusIntent(value: boolean) {
        if (this._isDateFocusIntent === value) return;

        this._isDateFocusIntent = value;
        this.requestUpdate('isDateFocusIntent', !value);
    }

    protected get isDateFocusIntent(): boolean {
        return this._isDateFocusIntent;
    }
    private _isDateFocusIntent: boolean = false;

    private setDateFocusIntent(): void {
        this.isDateFocusIntent = true;
    }

    private resetDateFocusIntent(): void {
        this.isDateFocusIntent = false;
    }

    override connectedCallback(): void {
        super.connectedCallback();
        document.addEventListener('mousedown', this.resetDateFocusIntent);
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        document.removeEventListener('mousedown', this.resetDateFocusIntent);
    }

    override willUpdate(changedProperties: PropertyValues): void {
        if (changedProperties.has('min')) this.setMinCalendarDate();

        if (changedProperties.has('max')) this.setMaxCalendarDate();

        if (changedProperties.has(languageResolverUpdatedSymbol)) {
            this.setNumberFormatter();
            this.setWeekdays();
            this.setWeeksInCurrentMonth();
        }
    }

    override updated(changedProperties: PropertyValues): void {
        /**
         * Keeps the focus on the correct day when navigating through the calendar.
         * Particularly useful when the month changes and the focus is lost.
         */
        if (changedProperties.has('currentDate') && this.isDateFocusIntent) {
            const elementToFocus = this.shadowRoot?.querySelector(
                'td[tabindex="0"]'
            ) as HTMLElement;
            elementToFocus.focus();
        }
    }

    protected override render(): TemplateResult {
        return html`
            ${this.renderCalendarHeader()}${this.renderCalendarGrid()}
        `;
    }

    protected renderCalendarHeader(): TemplateResult {
        const monthAndYear = this.formatDate(this.currentDate, {
            month: 'long',
            year: 'numeric',
        });

        return html`
            <div class="header" @focusin=${this.resetDateFocusIntent}>
                <!--
                 * TODO: Attribute 'role="heading"' removed, due to error 'The "heading" role requires the attribute
                 * "aria-level"'
                -->
                <div
                    class="title"
                    aria-live="assertive"
                    aria-atomic="true"
                    data-test-id="calendar-title"
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
                    class="prevMonth"
                    data-test-id="prev-btn"
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
                    class="nextMonth"
                    data-test-id="next-btn"
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

    protected renderCalendarGrid(): TemplateResult {
        return html`
            <div
                class="body"
                role="grid"
                aria-readonly="true"
                aria-disabled=${this.disabled}
            >
                <table
                    role="presentation"
                    class="table"
                    @keydown=${this.handleKeydown}
                >
                    ${this.renderCalendarTableHead()}
                    ${this.renderCalendarTableBody()}
                </table>
            </div>
        `;
    }

    protected renderCalendarTableHead(): TemplateResult {
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

    protected renderWeekdayColumn(weekday: CalendarWeekday): TemplateResult {
        return html`
            <th role="columnheader" scope="col" class="tableCell">
                <abbr class="dayOfWeek" title=${weekday.long}>
                    ${weekday.narrow}
                </abbr>
            </th>
        `;
    }

    protected renderCalendarTableBody(): TemplateResult {
        return html`
            <tbody role="presentation">
                ${this.weeksInCurrentMonth.map((weekIndex) =>
                    this.renderCalendarTableRow(weekIndex)
                )}
            </tbody>
        `;
    }

    protected renderCalendarTableRow(weekIndex: number): TemplateResult {
        return html`
            <tr role="row">
                ${this.getDatesInWeek(weekIndex).map((calendarDate) =>
                    this.renderCalendarTableCell(calendarDate)
                )}
            </tr>
        `;
    }

    private parseDateCellProperties(
        calendarDate: CalendarDate
    ): DateCellProperties {
        const props = {
            isOutsideMonth: false,
            isSelected: false,
            isToday: false,
            isDisabled: false,
            isTabbable: false,
        };
        props.isOutsideMonth = calendarDate.month !== this.currentDate.month;
        if (props.isOutsideMonth) return props;

        props.isDisabled =
            this.disabled ||
            this.isMinLimitReached(calendarDate) ||
            this.isMaxLimitReached(calendarDate);

        props.isToday = isSameDay(calendarDate, this.today);

        if (props.isDisabled) return props;
        props.isTabbable = isSameDay(calendarDate, this.currentDate);

        props.isSelected = Boolean(
            this._selectedDate && isSameDay(this._selectedDate, calendarDate)
        );

        return props;
    }

    protected renderCalendarTableCell(
        calendarDate: CalendarDate
    ): TemplateResult {
        const { isOutsideMonth, isSelected, isToday, isDisabled, isTabbable } =
            this.parseDateCellProperties(calendarDate);

        const dayClasses: ClassInfo = {
            date: true,
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
                class="tableCell"
                title=${currentDayTitle}
                tabindex=${ifDefined(
                    !isOutsideMonth ? (isTabbable ? '0' : '-1') : undefined
                )}
                aria-disabled=${isOutsideMonth || isDisabled}
                aria-selected=${isSelected}
                data-value=${calendarDate.toString()}
                @mousedown=${this.handleDaySelect}
            >
                <span
                    role="presentation"
                    class=${classMap(dayClasses)}
                    data-test-id="calendar-day"
                >
                    ${this.formatNumber(calendarDate.day)}
                </span>
            </td>
        `;
    }

    private handleDaySelect(event: MouseEvent | KeyboardEvent): void {
        if (this.disabled) {
            event.preventDefault();
            return;
        }

        const dateCell = (event.target as Element).closest(
            'td.tableCell'
        ) as HTMLTableCellElement;

        if (event instanceof MouseEvent) {
            const dateContent = dateCell.querySelector('span')!;
            if (!this.isClickInsideContentRadius(event, dateContent)) {
                event.preventDefault();
                return;
            }
        }

        const dateString = dateCell.dataset.value!;
        const calendarDateEngaged = parseDate(dateString);
        const isAlreadySelected =
            this._selectedDate &&
            isSameDay(this._selectedDate, calendarDateEngaged);

        if (
            isAlreadySelected ||
            this.isMinLimitReached(calendarDateEngaged) ||
            this.isMaxLimitReached(calendarDateEngaged)
        ) {
            event.preventDefault();
            return;
        }

        this.currentDate = calendarDateEngaged;
        this.selectedDate = calendarDateEngaged.toDate(this.timeZone);

        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
            })
        );
    }

    private isClickInsideContentRadius(
        event: MouseEvent,
        element: HTMLElement
    ): boolean {
        const rect = element.getBoundingClientRect();
        const radius = rect.width / 2;
        const centerX = rect.left + radius;
        const centerY = rect.top + radius;
        const clickCenterDistance = Math.sqrt(
            Math.pow(event.clientX - centerX, 2) +
                Math.pow(event.clientY - centerY, 2)
        );

        return clickCenterDistance <= radius;
    }

    private handlePreviousMonth(): void {
        const isSelectedInPreviousMonth =
            this._selectedDate?.month === this.currentDate.month - 1;
        const isTodayInPreviousMonth =
            this.today.month === this.currentDate.month - 1;

        if (isSelectedInPreviousMonth) this.currentDate = this._selectedDate!;
        else if (isTodayInPreviousMonth) this.currentDate = this.today;
        else
            this.currentDate = startOfMonth(this.currentDate).subtract({
                months: 1,
            });

        this.setWeeksInCurrentMonth();
    }

    private handleNextMonth(): void {
        const isSelectedInNextMonth =
            this._selectedDate?.month === this.currentDate.month + 1;
        const isTodayInNextMonth =
            this.today.month === this.currentDate.month + 1;

        if (isSelectedInNextMonth) this.currentDate = this._selectedDate!;
        else if (isTodayInNextMonth) this.currentDate = this.today;
        else
            this.currentDate = startOfMonth(this.currentDate).add({
                months: 1,
            });

        this.setWeeksInCurrentMonth();
    }

    private handleKeydown(event: KeyboardEvent): void {
        this.setDateFocusIntent();

        const initialMonth = this.currentDate.month;

        switch (event.code) {
            case 'ArrowLeft': {
                this.focusPreviousDay();
                break;
            }
            case 'ArrowDown': {
                this.focusNextWeek();
                break;
            }
            case 'ArrowRight': {
                this.focusNextDay();
                break;
            }
            case 'ArrowUp': {
                this.focusPreviousWeek();
                break;
            }
            case 'Space':
            case 'Enter': {
                this.handleDaySelect(event);
                break;
            }
        }

        if (this.currentDate.month !== initialMonth)
            this.setWeeksInCurrentMonth();
    }

    private focusPreviousDay(): void {
        const previousDay = this.currentDate.subtract({ days: 1 });
        if (!this.isMinLimitReached(previousDay))
            this.currentDate = previousDay;
    }

    private focusNextDay(): void {
        const nextDay = this.currentDate.add({ days: 1 });
        if (!this.isMaxLimitReached(nextDay)) this.currentDate = nextDay;
    }

    private focusPreviousWeek(): void {
        const previousWeek = this.currentDate.subtract({ weeks: 1 });
        if (!this.isMinLimitReached(previousWeek)) {
            this.currentDate = previousWeek;
            return;
        }

        let dayToFocus = previousWeek.add({ days: 1 });
        while (this.isMinLimitReached(dayToFocus)) {
            dayToFocus = dayToFocus.add({ days: 1 });
        }
        this.currentDate = dayToFocus;
    }

    private focusNextWeek(): void {
        const nextWeek = this.currentDate.add({ weeks: 1 });

        if (!this.isMaxLimitReached(nextWeek)) {
            this.currentDate = nextWeek;

            return;
        }

        let dayToFocus = nextWeek.subtract({ days: 1 });
        while (this.isMaxLimitReached(dayToFocus)) {
            dayToFocus = dayToFocus.subtract({ days: 1 });
        }
        this.currentDate = dayToFocus;
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
        const weekStart = startOfWeek(this.currentDate, this.locale);

        this.weekdays = [...new Array(DAYS_PER_WEEK).keys()].map((dayIndex) => {
            const date = weekStart.add({ days: dayIndex });

            return {
                narrow: this.formatDate(date, { weekday: 'narrow' }),
                long: this.formatDate(date, { weekday: 'long' }),
            };
        });
    }

    /**
     * Sets the minimum allowed date a user can select by converting a `Date` object to `CalendarDate`, which is the
     * type of object used internally by the class
     */
    private setMinCalendarDate(): void {
        if (!this.min) return;

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
        if (!this.max) return;

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
            startOfMonth(this.currentDate).add({
                weeks: weekIndex,
            }),
            this.locale
        );

        while (dates.length < DAYS_PER_WEEK) {
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
        date = new Date(date);
        return !isNaN(date.getTime());
    }

    private isMinLimitReached(calendarDate: CalendarDate): boolean {
        return Boolean(this.minDate && calendarDate.compare(this.minDate) < 0);
    }

    private isMaxLimitReached(calendarDate: CalendarDate): boolean {
        return Boolean(this.maxDate && calendarDate.compare(this.maxDate) > 0);
    }

    /**
     * Formats a `CalendarDate` object using the current locale and the provided date format options
     *
     * @param calendarDate - The `CalendarDate` object that will be formatted
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

    private numberFormatter = new NumberFormatter(this.locale);
    private setNumberFormatter(): void {
        this.numberFormatter = new NumberFormatter(this.locale);
    }

    private formatNumber(number: number): string {
        return this.numberFormatter.format(number);
    }
}
