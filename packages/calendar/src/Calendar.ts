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
    endOfMonth,
    getLocalTimeZone,
    getWeeksInMonth,
    isSameDay,
    isSameMonth,
    parseDate,
    startOfMonth,
    startOfWeek,
    toCalendarDate,
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

import {
    CalendarValue,
    CalendarWeekday,
    DateCellProperties,
    DateValue,
} from './types.js';

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
    value?: CalendarValue;

    /**
     * The minimum allowed date a user can select
     */
    @property({ attribute: false })
    min?: DateValue;

    /**
     * The maximum allowed date a user can select
     */
    @property({ attribute: false })
    max?: DateValue;

    /**
     * Indicates when the calendar should be disabled entirely
     */
    @property({ type: Boolean, reflect: true })
    public disabled = false;

    /**
     * The date that indicates the current position in the calendar.
     */
    @state()
    private currentDate: CalendarDate = this.today;

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
    private weekdays: CalendarWeekday[] = [];

    @state()
    private currentMonthDates: CalendarDate[][] = [];

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

    /**
     * Resets the component's value
     */
    public clear(): void {
        this.value = undefined;
    }

    constructor() {
        super();
        this.setNumberFormatter();
        this.setWeekdays();
        this.setCurrentMonthDates();
    }

    override willUpdate(changedProperties: PropertyValues): void {
        if (changedProperties.has(languageResolverUpdatedSymbol)) {
            this.setNumberFormatter();
            this.setWeekdays();
            this.setCurrentMonthDates();
        }

        const changesMin = changedProperties.has('min');
        const changesMax = changedProperties.has('max');
        const changesValue = changedProperties.has('value');
        const changesDates = changesMin || changesMax || changesValue;

        if (changesDates) {
            this.convertToCalendarDates();
            this.checkDatePropsCompliance(changesMin || changesMax);
            if (this.value) this.currentDate = this.value as CalendarDate;
            else {
                const isTodayNonCompliant = this.isNonCompliantDate(this.today);

                if (isTodayNonCompliant) {
                    if (this.min) this.currentDate = this.min as CalendarDate;
                    else if (this.max)
                        this.currentDate = this.max as CalendarDate;
                } else this.currentDate = this.today;
            }
        }

        const previousDate = changedProperties.get('currentDate');
        const changesMonth =
            changedProperties.has('currentDate') &&
            (!previousDate || !isSameMonth(previousDate, this.currentDate));

        if (changesMonth) this.setCurrentMonthDates();
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

    private convertToCalendarDates(): void {
        const era = 'AD'; // Force the era to be AD until we support other eras
        this.min = this.min && toCalendarDate(this.min).set({ era });
        this.max = this.max && toCalendarDate(this.max).set({ era });
        this.value = this.value && toCalendarDate(this.value).set({ era });
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
                        'https://opensource.adobe.com/spectrum-web-components/components/calendar' // TODO: update link
                    );
                this.min = undefined;
                this.max = undefined;
            }
        }

        if (this.value && this.isNonCompliantDate(this.value)) {
            if (window.__swc.DEBUG)
                window.__swc.warn(
                    this,
                    `<${this.localName}> expects the preselected value to comply with the min and max constraints. Please ensure that 'value' property's date is in between the dates for the 'min' and 'max' properties.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/calendar' // TODO: update link
                );
            this.value = undefined;
        }
    }

    /**
     * Whether the date is non-compliant with the min and max constraints
     */
    private isNonCompliantDate(date: DateValue): boolean {
        return Boolean(
            (this.min && date.compare(this.min) < 0) ||
                (this.max && date.compare(this.max) > 0)
        );
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
                    ?disabled=${this.isPreviousMonthDisabled}
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
                    ?disabled=${this.isNextMonthDisabled}
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

    private get isPreviousMonthDisabled(): boolean {
        if (this.disabled) return true;

        const currentMonthStart = startOfMonth(this.currentDate);
        const previousMonthStart = currentMonthStart.subtract({ months: 1 });

        return (
            currentMonthStart.era !== previousMonthStart.era ||
            isSameDay(currentMonthStart, previousMonthStart)
        );
    }

    private get isNextMonthDisabled(): boolean {
        if (this.disabled) return true;

        const currentMonthEnd = endOfMonth(this.currentDate);
        const nextMonthEnd = currentMonthEnd.add({ months: 1 });

        return (
            currentMonthEnd.era !== nextMonthEnd.era ||
            isSameDay(currentMonthEnd, nextMonthEnd)
        );
    }

    private handlePreviousMonth(): void {
        let newCurrentDate = startOfMonth(this.currentDate).subtract({
            months: 1,
        });

        if (this.value && isSameMonth(newCurrentDate, this.value))
            newCurrentDate = this.value as CalendarDate;
        else if (isSameMonth(newCurrentDate, this.today))
            newCurrentDate = this.today;

        this.currentDate = newCurrentDate;
    }

    private handleNextMonth(): void {
        let newCurrentDate = startOfMonth(this.currentDate).add({
            months: 1,
        });

        if (this.value && isSameMonth(newCurrentDate, this.value))
            newCurrentDate = this.value as CalendarDate;
        else if (isSameMonth(newCurrentDate, this.today))
            newCurrentDate = this.today;

        this.currentDate = newCurrentDate;
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
                    ${this.weekdays.map(this.renderWeekdayColumn)}
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
                ${this.currentMonthDates.map(
                    (week) => html`
                        <tr role="row">
                            ${week.map((date) =>
                                this.renderCalendarTableCell(date)
                            )}
                        </tr>
                    `
                )}
            </tbody>
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
            this.value && isSameDay(this.value, calendarDate)
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

    private handleKeydown(event: KeyboardEvent): void {
        this.setDateFocusIntent();

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
            this.value && isSameDay(this.value, calendarDateEngaged);

        if (
            isAlreadySelected ||
            this.isMinLimitReached(calendarDateEngaged) ||
            this.isMaxLimitReached(calendarDateEngaged)
        ) {
            event.preventDefault();
            return;
        }

        this.value = calendarDateEngaged;

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

    private focusPreviousDay(): void {
        const previousDay = this.currentDate.subtract({ days: 1 });

        if (this.canNavigateBackToDate(previousDay))
            this.currentDate = previousDay;
    }

    private focusNextDay(): void {
        const nextDay = this.currentDate.add({ days: 1 });

        if (this.canNavigateForwardToDate(nextDay)) this.currentDate = nextDay;
    }

    private focusPreviousWeek(): void {
        const previousWeek = this.currentDate.subtract({ weeks: 1 });

        if (this.canNavigateBackToDate(previousWeek)) {
            this.currentDate = previousWeek;
            return;
        }

        let dayToFocus = previousWeek.add({ days: 1 });
        while (!this.canNavigateBackToDate(dayToFocus)) {
            dayToFocus = dayToFocus.add({ days: 1 });
        }
        this.currentDate = dayToFocus;
    }

    private focusNextWeek(): void {
        const nextWeek = this.currentDate.add({ weeks: 1 });

        if (this.canNavigateForwardToDate(nextWeek)) {
            this.currentDate = nextWeek;
            return;
        }

        let dayToFocus = nextWeek.subtract({ days: 1 });
        while (!this.canNavigateForwardToDate(dayToFocus)) {
            dayToFocus = dayToFocus.subtract({ days: 1 });
        }
        this.currentDate = dayToFocus;
    }

    private canNavigateBackToDate(previousDate: CalendarDate): boolean {
        if (this.isMinLimitReached(previousDate)) return false;

        return (
            isSameMonth(this.currentDate, previousDate) ||
            !this.isPreviousMonthDisabled
        );
    }

    private canNavigateForwardToDate(nextDate: CalendarDate): boolean {
        if (this.isMaxLimitReached(nextDate)) return false;

        return (
            isSameMonth(this.currentDate, nextDate) || !this.isNextMonthDisabled
        );
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
     * Defines the 2D-array with the dates of the current month
     */
    private setCurrentMonthDates(): void {
        const numberOfWeeks = getWeeksInMonth(this.currentDate, this.locale);
        const newCurrentMonthDates = new Array(numberOfWeeks);
        for (const weekIndex of new Array(numberOfWeeks).keys())
            newCurrentMonthDates[weekIndex] = this.getDatesInWeek(
                this.currentDate,
                weekIndex
            );
        this.currentMonthDates = newCurrentMonthDates;
    }

    /**
     * Returns an array with all days of the week in a specific month, corresponding to the given index,
     * starting with the first day of the week according to the locale
     *
     * @param weekIndex - The index of the week
     */
    private getDatesInWeek(
        monthDate: CalendarDate,
        weekIndex: number
    ): CalendarDate[] {
        const dates: CalendarDate[] = [];

        let date = startOfWeek(
            startOfMonth(monthDate).add({
                weeks: weekIndex,
            }),
            this.locale
        );

        while (dates.length < DAYS_PER_WEEK) {
            dates.push(date);
            const nextDate = date.add({ days: 1 });

            // If the next day is the same, we have hit the end of the calendar system
            if (isSameDay(date, nextDate)) break;
            date = nextDate;
        }

        return dates;
    }

    private isMinLimitReached(calendarDate: CalendarDate): boolean {
        return Boolean(this.min && calendarDate.compare(this.min) < 0);
    }

    private isMaxLimitReached(calendarDate: CalendarDate): boolean {
        return Boolean(this.max && calendarDate.compare(this.max) > 0);
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
