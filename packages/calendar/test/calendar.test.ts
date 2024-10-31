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
    CalendarDateTime,
    endOfMonth,
    getLocalTimeZone,
    parseDate,
    today,
} from '@internationalized/date';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { ActionButton } from '@spectrum-web-components/action-button';
import { Calendar, DAYS_PER_WEEK } from '@spectrum-web-components/calendar';
import '@spectrum-web-components/calendar/sp-calendar.js';
import '@spectrum-web-components/theme/sp-theme.js';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { spy, stub } from 'sinon';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import {
    expectSameDates,
    fixtureElement,
    sendKeyMultipleTimes,
} from './helpers.js';

const NEXT_BUTTON_SELECTOR = '[data-test-id="next-btn"]';
const PREV_BUTTON_SELECTOR = '[data-test-id="prev-btn"]';

describe('Calendar', () => {
    let element: Calendar;
    const originalDateNow = Date.now;
    const fixedYear = 2022;
    const fixedMonth = 5;
    const fixedDay = 15;

    before(() => {
        const fixedTime = new Date(
            fixedYear,
            fixedMonth - 1, // 0-indexed in Date but 1-indexed in CalendarDate
            fixedDay
        ).getTime();
        Date.now = () => fixedTime;
    });

    beforeEach(async () => {
        element = await fixtureElement();
    });

    after(() => {
        Date.now = originalDateNow;
    });

    testForLitDevWarnings(
        async () =>
            await fixture<Calendar>(html`
                <sp-calendar></sp-calendar>
            `)
    );

    it('loads default calendar accessibly', async () => {
        element = await fixtureElement();
        await expect(element).to.be.accessible();
    });

    describe('Initial month', () => {
        it("should display today's month when the selected value is deleted", async () => {
            const value = new CalendarDate(2, 7, 21);
            element = await fixtureElement({
                props: { value },
            });

            expectSameDates(element['currentDate'], value);

            element.value = undefined;
            await elementUpdated(element);

            expectSameDates(element['currentDate'], today(getLocalTimeZone()));
        });

        it("should display the provided value's month when it is provided", async () => {
            const value = new CalendarDate(2024, 7, 21);
            element = await fixtureElement({
                props: { value },
            });

            expectSameDates(element['currentDate'], value);
        });

        describe('when no pre-selected value is provided', () => {
            it("should display today's month", async () => {
                element = await fixtureElement();
                const localToday = today(getLocalTimeZone());

                expectSameDates(element['currentDate'], localToday);
            });

            it("should display the min value's month when today's value is less than min", async () => {
                const todayDate = today(getLocalTimeZone());
                const min = todayDate.set({ day: todayDate.day + 2 });

                element = await fixtureElement({
                    props: { min },
                });

                expectSameDates(element['currentDate'], min);
            });

            it("should display the min value's month when today's value doesn't comply with the min-max interval", async () => {
                const todayDate = today(getLocalTimeZone());
                let max = todayDate.set({ day: todayDate.day - 2 });
                let min = max.set({ day: max.day - 2 });

                element = await fixtureElement({
                    props: { min, max },
                });

                expectSameDates(element['currentDate'], min);

                min = todayDate.set({ day: todayDate.day + 2 });
                max = min.set({ day: min.day + 2 });

                element = await fixtureElement({
                    props: { min, max },
                });

                expectSameDates(element['currentDate'], min);
            });

            it("should display the max value's month when today's value is greater than max", async () => {
                const todayDate = today(getLocalTimeZone());
                const max = todayDate.set({ day: todayDate.day - 2 });

                element = await fixtureElement({
                    props: { max },
                });

                expectSameDates(element['currentDate'], max);
            });
        });
    });

    describe('Focus', () => {
        let focusableDay: HTMLElement;
        let nextButton: ActionButton;
        let prevButton: ActionButton;

        beforeEach(() => {
            focusableDay = element.shadowRoot.querySelector(
                "td.tableCell[tabindex='0']"
            ) as HTMLElement;
            nextButton =
                element.shadowRoot.querySelector(NEXT_BUTTON_SELECTOR)!;
            prevButton =
                element.shadowRoot.querySelector(PREV_BUTTON_SELECTOR)!;
        });

        it("should focus the first day when the displayed month doesn't have the selected/today's date", async () => {
            focusableDay.focus();
            await sendKeys({ press: 'ArrowRight' });
            await elementUpdated(element);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            nextButton.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            await sendKeys({ press: 'Tab' });
            await elementUpdated(element);

            const focusedDay = element.shadowRoot.activeElement as HTMLElement;
            const focusedCalendarDate = parseDate(focusedDay.dataset.value!);

            expectSameDates(focusedCalendarDate, element['currentDate']);
            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth + 2);
            expect(element['currentDate'].day).to.equal(1);
        });

        it('should focus the selected date when the displayed month includes it', async () => {
            focusableDay.focus();
            await sendKeys({ press: 'ArrowRight' });
            await elementUpdated(element);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            nextButton.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            prevButton.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            await sendKeys({ press: 'Tab' });
            await sendKeys({ press: 'Tab' });
            await elementUpdated(element);

            const focusedDay = element.shadowRoot.activeElement as HTMLElement;
            const focusedCalendarDate = parseDate(focusedDay.dataset.value!);
            expectSameDates(focusedCalendarDate, element.value!);
        });

        it("should focus today's date when the displayed month includes it and it doesn't include the selected date", async () => {
            nextButton.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            prevButton.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            await sendKeys({ press: 'Tab' });
            await sendKeys({ press: 'Tab' });
            await elementUpdated(element);

            const focusedDay = element.shadowRoot.activeElement as HTMLElement;
            expect(focusedDay).to.equal(focusableDay);
        });
    });

    describe('Navigation', () => {
        let nextButton: ActionButton;
        let prevButton: ActionButton;
        let focusableDay: HTMLElement;

        const resetElementPosition = (): void => {
            element['currentDate'] = today(getLocalTimeZone());
        };

        beforeEach(() => {
            prevButton =
                element.shadowRoot.querySelector(PREV_BUTTON_SELECTOR)!;

            nextButton =
                element.shadowRoot.querySelector(NEXT_BUTTON_SELECTOR)!;

            focusableDay = element.shadowRoot.querySelector(
                "td.tableCell[tabindex='0']"
            )!;
        });

        afterEach(async () => {
            resetElementPosition();
        });

        it("should navigate to the next month by clicking on the 'next month' button", async () => {
            nextButton.click();
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth + 1);
            expect(element['currentDate'].day).to.equal(1);

            nextButton.click();
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth + 2);
            expect(element['currentDate'].day).to.equal(1);
        });

        it("should navigate to the previous month by clicking on the 'previous month' button", async () => {
            prevButton.click();
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth - 1);
            expect(element['currentDate'].day).to.equal(1);

            prevButton.click();
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth - 2);
            expect(element['currentDate'].day).to.equal(1);
        });

        it("should navigate to the next month by keyboard action on the 'next month' button", async () => {
            nextButton.focus();
            await sendKeys({ press: 'Space' });
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth + 1);
            expect(element['currentDate'].day).to.equal(1);

            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth + 2);
            expect(element['currentDate'].day).to.equal(1);
        });

        it("should navigate to the previous month by keyboard action on the 'previous month' button", async () => {
            prevButton.focus();
            await sendKeys({ press: 'Space' });
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth - 1);
            expect(element['currentDate'].day).to.equal(1);

            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth - 2);
            expect(element['currentDate'].day).to.equal(1);
        });

        it('should navigate in the current month - ArrowRight', async () => {
            focusableDay.focus();
            await sendKeys({ press: 'ArrowRight' });
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth);
            expect(element['currentDate'].day).to.equal(fixedDay + 1);
        });

        it('should navigate in the current month - ArrowLeft', async () => {
            focusableDay.focus();
            await sendKeys({ press: 'ArrowLeft' });
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth);
            expect(element['currentDate'].day).to.equal(fixedDay - 1);
        });

        it('should navigate in the current month - ArrowUp', async () => {
            focusableDay.focus();
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth);
            expect(element['currentDate'].day).to.equal(
                fixedDay - DAYS_PER_WEEK
            );
        });

        it('should navigate in the current month - ArrowDown', async () => {
            focusableDay.focus();
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth);
            expect(element['currentDate'].day).to.equal(
                fixedDay + DAYS_PER_WEEK
            );
        });

        it('should navigate to the next month - ArrowRight', async () => {
            focusableDay.focus();
            const currentEndOfMonthDay = endOfMonth(element['currentDate']).day;
            const nextMonthDay = 4;

            await sendKeyMultipleTimes(
                'ArrowRight',
                currentEndOfMonthDay - element['currentDate'].day + nextMonthDay
            );
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth + 1);
            expect(element['currentDate'].day).to.equal(nextMonthDay);
        });

        it('should navigate to the next month - ArrowDown', async () => {
            focusableDay.focus();
            const currentEndOfMonthDay = endOfMonth(element['currentDate']).day;
            const initialDay = element['currentDate'].day;
            const uncompletedWeeks = Math.floor(
                (currentEndOfMonthDay - initialDay) / DAYS_PER_WEEK
            );
            const nextMonthDay =
                initialDay +
                (uncompletedWeeks + 1) * DAYS_PER_WEEK -
                currentEndOfMonthDay;

            await sendKeyMultipleTimes('ArrowDown', uncompletedWeeks + 1);
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth + 1);
            expect(element['currentDate'].day).to.equal(nextMonthDay);
        });

        it('should navigate to the previous month - ArrowLeft', async () => {
            focusableDay.focus();
            const previousEndOfMonthDay = endOfMonth(
                element['currentDate'].set({ month: fixedMonth - 1 })
            ).day;
            const prevMonthDay = 23;

            await sendKeyMultipleTimes(
                'ArrowLeft',
                element['currentDate'].day +
                    previousEndOfMonthDay -
                    prevMonthDay
            );
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth - 1);
            expect(element['currentDate'].day).to.equal(prevMonthDay);
        });

        it('should navigate to the previous month - ArrowUp', async () => {
            focusableDay.focus();
            const previousEndOfMonthDay = endOfMonth(
                element['currentDate'].set({ month: fixedMonth - 1 })
            ).day;
            const initialDay = element['currentDate'].day;
            const completedWeeks = Math.floor(initialDay / DAYS_PER_WEEK);
            const daysIntoCurrentWeek = initialDay % DAYS_PER_WEEK;
            const previousMonthDay =
                previousEndOfMonthDay + daysIntoCurrentWeek - DAYS_PER_WEEK;

            await sendKeyMultipleTimes('ArrowUp', completedWeeks + 1);
            await elementUpdated(element);

            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth - 1);
            expect(element['currentDate'].day).to.equal(previousMonthDay);
        });
    });

    describe('Min-max constraints', () => {
        let min: CalendarDate;
        let max: CalendarDate;
        const dayOffset = 5;

        before(() => {
            min = new CalendarDate(fixedYear, fixedMonth, fixedDay - dayOffset);
            max = new CalendarDate(fixedYear, fixedMonth, fixedDay + dayOffset);
        });

        it('should ignore the provided min and max properties when the interval is invalid', async () => {
            const min = max.set({ day: max.day + 1 });
            element = await fixtureElement({
                props: { min, max },
            });

            expect(element.min, 'min not undefined').to.be.undefined;
            expect(element.max, 'max not undefined').to.be.undefined;
        });

        it("should ignore the provided value property when it doesn't comply with the min-max interval", async () => {
            const value = max.set({ day: max.day + 1 });
            element = await fixtureElement({
                props: { min, max, value },
            });

            expect(element.value).to.be.undefined;
            expectSameDates(element.min!, min, 'min value mismatch');
            expectSameDates(element.max!, max, 'max value mismatch');
        });

        it("should not select a day that doesn't comply with the min-max interval", async () => {
            const changeSpy = spy();
            element = await fixtureElement({
                props: { min, max },
            });
            element.addEventListener('change', changeSpy);
            const unavailableDateToSelect = new CalendarDate(
                max.year,
                max.month,
                max.day + 3
            );
            const unavailableDayElement = element.shadowRoot.querySelector(
                `[data-value='${unavailableDateToSelect.toString()}']`
            ) as HTMLElement;

            unavailableDayElement.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            const rect = unavailableDayElement.getBoundingClientRect();
            const centerX = Math.round(rect.left + rect.width / 2);
            const centerY = Math.round(rect.top + rect.height / 2);

            await sendMouse({
                type: 'click',
                position: [centerX, centerY],
            });
            await elementUpdated(element);

            expectSameDates(
                element['currentDate'],
                new CalendarDate(fixedYear, fixedMonth, fixedDay)
            );
            expect(changeSpy.callCount).to.equal(0);
            expect(element.value).to.be.undefined;
        });

        it("should invalidate the current value when it doesn't comply with min changes", async () => {
            element = await fixtureElement({
                props: { min, max, value: min },
            });

            expect(element.value).to.not.be.undefined;
            expect(element.min).to.not.be.undefined;
            expect(element.max).to.not.be.undefined;

            const newMin = min.set({ day: min.day + 1 });
            element.min = newMin;
            await elementUpdated(element);

            expect(element.value).to.be.undefined;
            expectSameDates(element.min!, newMin, 'min value mismatch');
            expectSameDates(element.max!, max, 'max value mismatch');
        });

        it("should invalidate the current value when it doesn't comply with max changes", async () => {
            element = await fixtureElement({
                props: { min, max, value: max },
            });

            expect(element.value).to.not.be.undefined;
            expect(element.min).to.not.be.undefined;
            expect(element.max).to.not.be.undefined;

            const newMax = max.set({ day: max.day - 1 });
            element.max = newMax;
            await elementUpdated(element);

            expect(element.value).to.be.undefined;
            expectSameDates(element.min!, min, 'min value mismatch');
            expectSameDates(element.max!, newMax, 'max value mismatch');
        });

        it("should invalidate the current value when it doesn't comply with min and max changes", async () => {
            element = await fixtureElement({
                props: { min, max, value: min.set({ day: min.day + 1 }) },
            });

            expect(element.value).to.not.be.undefined;
            expect(element.min).to.not.be.undefined;
            expect(element.max).to.not.be.undefined;

            const newMin = min.set({ day: min.day + 2 });
            const newMax = max.set({ day: max.day - 2 });

            element.min = newMin;
            element.max = newMax;
            await elementUpdated(element);

            expect(element.value).to.be.undefined;
            expectSameDates(element.min!, newMin, 'min value mismatch');
            expectSameDates(element.max!, newMax, 'max value mismatch');
        });

        it("should not allow navigation to days that don't comply with the min-max interval - ArrowRight", async () => {
            element = await fixtureElement({
                props: { min, max },
            });
            const focusableDay = element.shadowRoot.querySelector(
                "td.tableCell[tabindex='0']"
            ) as HTMLElement;
            focusableDay.focus();
            await sendKeyMultipleTimes('ArrowRight', dayOffset + 3);
            await elementUpdated(element);

            expectSameDates(element['currentDate'], max);
        });

        it("should not allow navigation to days that don't comply with the min-max interval - ArrowLeft", async () => {
            element = await fixtureElement({
                props: { min, max },
            });
            const focusableDay = element.shadowRoot.querySelector(
                "td.tableCell[tabindex='0']"
            ) as HTMLElement;
            focusableDay.focus();
            await sendKeyMultipleTimes('ArrowLeft', dayOffset + 3);
            await elementUpdated(element);

            expectSameDates(element['currentDate'], min);
        });

        it("should not allow navigation to days that don't comply with the min-max interval - ArrowUp", async () => {
            element = await fixtureElement({
                props: { min, max },
            });
            const focusableDay = element.shadowRoot.querySelector(
                "td.tableCell[tabindex='0']"
            ) as HTMLElement;
            focusableDay.focus();
            await sendKeyMultipleTimes(
                'ArrowUp',
                dayOffset / DAYS_PER_WEEK + 1
            );
            await elementUpdated(element);

            expectSameDates(element['currentDate'], min);
        });

        it("should not allow navigation to days that don't comply with the min-max interval - ArrowDown", async () => {
            element = await fixtureElement({
                props: { min, max },
            });
            const focusableDay = element.shadowRoot.querySelector(
                "td.tableCell[tabindex='0']"
            ) as HTMLElement;
            focusableDay.focus();
            await sendKeyMultipleTimes(
                'ArrowDown',
                dayOffset / DAYS_PER_WEEK + 1
            );
            await elementUpdated(element);

            expectSameDates(element['currentDate'], max);
        });
    });

    describe('Value', () => {
        let availableDateToSelect: CalendarDate;
        let availableDayElement: HTMLElement;

        beforeEach(() => {
            availableDateToSelect = new CalendarDate(
                fixedYear,
                fixedMonth,
                fixedDay + 1
            );
            availableDayElement = element.shadowRoot.querySelector(
                `[data-value='${availableDateToSelect.toString()}']`
            ) as HTMLElement;
        });

        it('should update value when an available day is clicked', async () => {
            const rect = availableDayElement.getBoundingClientRect();
            const centerX = Math.round(rect.left + rect.width / 2);
            const centerY = Math.round(rect.top + rect.height / 2);

            await sendMouse({
                type: 'click',
                position: [centerX, centerY],
            });
            await elementUpdated(element);

            expectSameDates(element.value!, availableDateToSelect);
        });

        it('should update value when an available day is acted upon using Enter', async () => {
            availableDayElement.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            expectSameDates(element.value!, availableDateToSelect);
        });

        it('should update value when an available day is acted upon using Space', async () => {
            availableDayElement.focus();
            await sendKeys({ press: 'Space' });
            await elementUpdated(element);

            expectSameDates(element.value!, availableDateToSelect);
        });
    });

    describe('Dispatched change', () => {
        let changeSpy: sinon.SinonSpy;
        let availableDayElement: HTMLElement;
        const availableDateToSelect = new CalendarDate(
            fixedYear,
            fixedMonth,
            fixedDay + 1
        );

        beforeEach(() => {
            changeSpy = spy();
            element.addEventListener('change', changeSpy);

            availableDayElement = element.shadowRoot.querySelector(
                `[data-value='${availableDateToSelect.toString()}']`
            ) as HTMLElement;
        });

        it("should dispatch 'change' when an available day is selected by clicking", async () => {
            const rect = availableDayElement.getBoundingClientRect();
            const centerX = Math.round(rect.left + rect.width / 2);
            const centerY = Math.round(rect.top + rect.height / 2);

            await sendMouse({
                type: 'click',
                position: [centerX, centerY],
            });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(1);

            changeSpy.resetHistory();
            await sendMouse({
                type: 'click',
                position: [centerX, centerY],
            });
            await elementUpdated(element);
            expect(changeSpy.callCount).to.equal(0);
        });

        it("should dispatch 'change' when an available day is selected using Enter", async () => {
            availableDayElement.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(1);

            changeSpy.resetHistory();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);
            expect(changeSpy.callCount).to.equal(0);
        });

        it("should dispatch 'change' when an available day is selected using Space", async () => {
            availableDayElement.focus();
            await sendKeys({ press: 'Space' });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(1);

            changeSpy.resetHistory();
            await sendKeys({ press: 'Space' });
            await elementUpdated(element);
            expect(changeSpy.callCount).to.equal(0);
        });
    });

    describe('Dev mode', () => {
        let consoleWarnStub: ReturnType<typeof stub>;
        let max: CalendarDate;

        before(() => {
            window.__swc.verbose = true;
            consoleWarnStub = stub(console, 'warn');
            max = new CalendarDate(fixedYear, fixedMonth, fixedDay + 5);
        });

        afterEach(() => {
            consoleWarnStub.resetHistory();
        });

        after(() => {
            window.__swc.verbose = false;
            consoleWarnStub.restore();
        });

        it("should warn when the preselected value doesn't comply with the min-max interval", async () => {
            const value = max.set({ day: max.day + 1 });
            element = await fixtureElement({
                props: { max, value },
            });

            expect(consoleWarnStub.called).to.be.true;
            const stubCall = consoleWarnStub.getCall(0);
            expect((stubCall.args[0] as string).includes('value to comply')).to
                .be.true;
        });

        it('should warn when the min-max interval is invalid', async () => {
            const min = max.set({ day: max.day + 1 });
            element = await fixtureElement({
                props: { min, max },
            });

            expect(consoleWarnStub.called).to.be.true;
            const stubCall = consoleWarnStub.getCall(0);
            expect(
                (stubCall.args[0] as string).includes(
                    "'min' to be less than 'max'"
                )
            ).to.be.true;
        });
    });

    describe('Disabled', () => {
        it('should disable the next and previous month buttons');
        it("should not focus the calendar's days");
        it("should not select a day when it's clicked");
    });

    describe('Gregorian AD era limits', () => {
        let nextButton: ActionButton;
        let prevButton: ActionButton;

        it("should convert provided date properties' era to AD", async () => {
            const value = new CalendarDate('BC', 23, 7, 21);
            const min = new CalendarDateTime('BC', 23, 6, 21);
            element = await fixtureElement({ props: { value, min } });

            expectSameDates(element.min!, min.set({ era: 'AD' }));
            expectSameDates(element.value!, value.set({ era: 'AD' }));
        });

        it('should disable the previous month button when reaching the BC era', async () => {
            const value = new CalendarDate(1, 1, 1);
            element = await fixtureElement({ props: { value } });
            prevButton =
                element.shadowRoot.querySelector(PREV_BUTTON_SELECTOR)!;

            expect(prevButton.disabled).to.be.true;
        });

        it('should not navigate to BC era - ArrowUp', async () => {
            const value = new CalendarDate(1, 1, 5);
            element = await fixtureElement({ props: { value } });
            const focusableDay = element.shadowRoot.querySelector(
                "td.tableCell[tabindex='0']"
            ) as HTMLElement;

            focusableDay.focus();
            await sendKeyMultipleTimes(
                'ArrowUp',
                value.day / DAYS_PER_WEEK + 1
            );
            await elementUpdated(element);

            expectSameDates(element['currentDate'], value.set({ day: 1 }));
        });

        it('should not navigate to BC era - ArrowLeft', async () => {
            const value = new CalendarDate(1, 1, 5);
            element = await fixtureElement({ props: { value } });
            const focusableDay = element.shadowRoot.querySelector(
                "td.tableCell[tabindex='0']"
            ) as HTMLElement;

            focusableDay.focus();
            await sendKeyMultipleTimes('ArrowLeft', value.day + 3);
            await elementUpdated(element);

            expectSameDates(element['currentDate'], value.set({ day: 1 }));
        });

        it('should disable the next month button when reaching the end of the AD era', async () => {
            let value = new CalendarDate(9999, 12, 31);
            value = value.set({ year: value.calendar.getYearsInEra(value) });
            element = await fixtureElement({ props: { value } });
            nextButton =
                element.shadowRoot.querySelector(NEXT_BUTTON_SELECTOR)!;

            expect(nextButton.disabled).to.be.true;
        });

        it('should not navigate beyond the AD era - ArrowDown', async () => {
            let value = new CalendarDate(9999, 12, 20);
            value = value.set({ year: value.calendar.getYearsInEra(value) });
            const lastDate = endOfMonth(value);
            element = await fixtureElement({ props: { value } });
            const focusableDay = element.shadowRoot.querySelector(
                "td.tableCell[tabindex='0']"
            ) as HTMLElement;

            focusableDay.focus();
            await sendKeyMultipleTimes(
                'ArrowDown',
                (lastDate.day - value.day) / DAYS_PER_WEEK + 1
            );
            await elementUpdated(element);

            expectSameDates(element['currentDate'], lastDate);
        });

        it('should not navigate beyond the AD era - ArrowRight', async () => {
            let value = new CalendarDate(9999, 12, 20);
            value = value.set({ year: value.calendar.getYearsInEra(value) });
            const lastDate = endOfMonth(value);
            element = await fixtureElement({ props: { value } });
            const focusableDay = element.shadowRoot.querySelector(
                "td.tableCell[tabindex='0']"
            ) as HTMLElement;

            focusableDay.focus();
            await sendKeyMultipleTimes(
                'ArrowRight',
                lastDate.day - value.day + 3
            );
            await elementUpdated(element);

            expectSameDates(element['currentDate'], lastDate);
        });
    });

    describe('Localized', () => {});
});
