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
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { spy, stub } from 'sinon';
import {
    CalendarDate,
    endOfMonth,
    isSameDay,
    parseDate,
    today,
} from '@internationalized/date';
import { Button } from '@spectrum-web-components/button';
import { Calendar, DAYS_PER_WEEK } from '@spectrum-web-components/calendar';
import '@spectrum-web-components/calendar/sp-calendar.js';
import '@spectrum-web-components/theme/sp-theme.js';
import { spreadProps } from '../../../test/lit-helpers.js';

const LOCAL_TIME_ZONE = new Intl.DateTimeFormat().resolvedOptions().timeZone;
const NEXT_BUTTON_SELECTOR = '[data-test-id="next-btn"]';
const PREV_BUTTON_SELECTOR = '[data-test-id="prev-btn"]';

async function fixtureElement({
    locale = 'en-US',
    props = {},
}: {
    locale?: string;
    props?: { [prop: string]: unknown };
} = {}): Promise<Calendar> {
    const wrapped = await fixture<HTMLElement>(html`
        <sp-theme lang=${locale} color="light" scale="medium">
            <sp-calendar ...=${spreadProps(props)}></sp-calendar>
        </sp-theme>
    `);
    const el = wrapped.querySelector('sp-calendar') as Calendar;
    await elementUpdated(el);
    return el;
}

describe('Calendar', () => {
    let element: Calendar;
    const originalDateNow = Date.now;
    const fixedYear = 2022;
    const fixedMonth = 5;
    const fixedDay = 15;

    before(async () => {
        const fixedTime = new Date(
            fixedYear,
            fixedMonth - 1, // 0-indexed in Date but 1-indexed in CalendarDate
            fixedDay
        ).getTime();
        Date.now = () => fixedTime;
    });

    beforeEach(async () => {
        element = await fixtureElement();
        await elementUpdated(element);
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
        const el = await fixtureElement();
        await expect(el).to.be.accessible();
    });

    describe('Displays the correct initial month', () => {
        it('with no pre-selected value provided', async () => {
            const localToday = today(LOCAL_TIME_ZONE);
            const isLocalTodayDisplayed = isSameDay(
                element['currentDate'],
                localToday
            );

            expect(isLocalTodayDisplayed).to.be.true;
        });

        it('with a valid pre-selected value', async () => {
            const value = new CalendarDate(2024, 7, 21);
            const element = await fixtureElement({
                props: { value },
            });
            await elementUpdated(element);

            const isSelectedDateDisplayed = isSameDay(
                element['currentDate'],
                value
            );

            expect(isSelectedDateDisplayed).to.be.true;
        });
    });

    describe('Correctly manages the focusable day when changing months', () => {
        let focusableDay: HTMLElement;
        let nextButton: Button;
        let prevButton: Button;

        beforeEach(async () => {
            focusableDay = element.shadowRoot.querySelector(
                "td.tableCell[tabindex='0']"
            ) as HTMLElement;
            nextButton =
                element.shadowRoot.querySelector(NEXT_BUTTON_SELECTOR)!;
            prevButton =
                element.shadowRoot.querySelector(PREV_BUTTON_SELECTOR)!;
        });

        it('after selecting a date', async () => {
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

            expect(isSameDay(focusedCalendarDate, element['currentDate'])).to.be
                .true;
            expect(element['currentDate'].year).to.equal(fixedYear);
            expect(element['currentDate'].month).to.equal(fixedMonth + 2);
            expect(element['currentDate'].day).to.equal(1);
        });

        it('coming back to a selected date', async () => {
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
            expect(isSameDay(focusedCalendarDate, element.value!)).to.be.true;
        });

        it("coming back to today's date", async () => {
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

    describe('Navigates', () => {
        let nextButton: Button;
        let prevButton: Button;

        const resetElementPosition = (): void => {
            element['currentDate'] = today(LOCAL_TIME_ZONE);
        };

        beforeEach(() => {
            prevButton =
                element.shadowRoot.querySelector(PREV_BUTTON_SELECTOR)!;

            nextButton =
                element.shadowRoot.querySelector(NEXT_BUTTON_SELECTOR)!;
        });

        afterEach(async () => {
            resetElementPosition();
        });

        describe('via header buttons', () => {
            it('using pointer on the next month button', async () => {
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

            it('using pointer on the previous month button', async () => {
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

            it('using keyboard action on the next month button', async () => {
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

            it('using keyboard action on the previous month button', async () => {
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
        });

        describe('via days buttons', () => {
            beforeEach(() => {
                const focusableDay = element.shadowRoot.querySelector(
                    "td.tableCell[tabindex='0']"
                ) as HTMLElement;
                focusableDay.focus();
            });

            describe('in the current month', () => {
                it('using the right arrow key', async () => {
                    await sendKeys({ press: 'ArrowRight' });
                    await elementUpdated(element);

                    expect(element['currentDate'].year).to.equal(fixedYear);
                    expect(element['currentDate'].month).to.equal(fixedMonth);
                    expect(element['currentDate'].day).to.equal(fixedDay + 1);
                });

                it('using the left arrow key', async () => {
                    await sendKeys({ press: 'ArrowLeft' });
                    await elementUpdated(element);

                    expect(element['currentDate'].year).to.equal(fixedYear);
                    expect(element['currentDate'].month).to.equal(fixedMonth);
                    expect(element['currentDate'].day).to.equal(fixedDay - 1);
                });

                it('using the up arrow key', async () => {
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(element['currentDate'].year).to.equal(fixedYear);
                    expect(element['currentDate'].month).to.equal(fixedMonth);
                    expect(element['currentDate'].day).to.equal(
                        fixedDay - DAYS_PER_WEEK
                    );
                });

                it('using the down arrow key', async () => {
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(element['currentDate'].year).to.equal(fixedYear);
                    expect(element['currentDate'].month).to.equal(fixedMonth);
                    expect(element['currentDate'].day).to.equal(
                        fixedDay + DAYS_PER_WEEK
                    );
                });
            });

            describe('through different months', () => {
                it('using the right arrow key', async () => {
                    const currentEndOfMonthDay = endOfMonth(
                        element['currentDate']
                    ).day;
                    const nextMonthDay = 4;

                    await Promise.all(
                        Array.from({
                            length:
                                currentEndOfMonthDay -
                                element['currentDate'].day +
                                nextMonthDay,
                        }).map(() => sendKeys({ press: 'ArrowRight' }))
                    );
                    await elementUpdated(element);
                    expect(element['currentDate'].year).to.equal(fixedYear);
                    expect(element['currentDate'].month).to.equal(
                        fixedMonth + 1
                    );
                    expect(element['currentDate'].day).to.equal(nextMonthDay);
                });

                it('using the left arrow key', async () => {
                    const previousEndOfMonthDay = endOfMonth(
                        element['currentDate'].set({ month: fixedMonth - 1 })
                    ).day;
                    const prevMonthDay = 23;

                    await Promise.all(
                        Array.from({
                            length:
                                element['currentDate'].day +
                                previousEndOfMonthDay -
                                prevMonthDay,
                        }).map(() => sendKeys({ press: 'ArrowLeft' }))
                    );
                    await elementUpdated(element);
                    expect(element['currentDate'].year).to.equal(fixedYear);
                    expect(element['currentDate'].month).to.equal(
                        fixedMonth - 1
                    );
                    expect(element['currentDate'].day).to.equal(prevMonthDay);
                });

                it('using the up arrow key', async () => {
                    const previousEndOfMonthDay = endOfMonth(
                        element['currentDate'].set({ month: fixedMonth - 1 })
                    ).day;
                    const initialDay = element['currentDate'].day;
                    const completedWeeks = Math.floor(
                        initialDay / DAYS_PER_WEEK
                    );
                    const daysIntoCurrentWeek = initialDay % DAYS_PER_WEEK;
                    const previousMonthDay =
                        previousEndOfMonthDay +
                        daysIntoCurrentWeek -
                        DAYS_PER_WEEK;

                    await Promise.all(
                        Array.from({
                            length: completedWeeks + 1,
                        }).map(() => sendKeys({ press: 'ArrowUp' }))
                    );
                    await elementUpdated(element);

                    expect(element['currentDate'].year).to.equal(fixedYear);
                    expect(element['currentDate'].month).to.equal(
                        fixedMonth - 1
                    );
                    expect(element['currentDate'].day).to.equal(
                        previousMonthDay
                    );
                });

                it('using the down arrow key', async () => {
                    const currentEndOfMonthDay = endOfMonth(
                        element['currentDate']
                    ).day;
                    const initialDay = element['currentDate'].day;
                    const uncompletedWeeks = Math.floor(
                        (currentEndOfMonthDay - initialDay) / DAYS_PER_WEEK
                    );
                    const nextMonthDay =
                        initialDay +
                        (uncompletedWeeks + 1) * DAYS_PER_WEEK -
                        currentEndOfMonthDay;

                    await Promise.all(
                        Array.from({
                            length: uncompletedWeeks + 1,
                        }).map(() => sendKeys({ press: 'ArrowDown' }))
                    );
                    await elementUpdated(element);

                    expect(element['currentDate'].year).to.equal(fixedYear);
                    expect(element['currentDate'].month).to.equal(
                        fixedMonth + 1
                    );
                    expect(element['currentDate'].day).to.equal(nextMonthDay);
                });
            });
        });
    });

    describe('Manages min and max constraints', () => {
        let min: CalendarDate;
        let max: CalendarDate;
        const dayOffset = 5;

        before(async () => {
            min = new CalendarDate(fixedYear, fixedMonth, fixedDay - dayOffset);
            max = new CalendarDate(fixedYear, fixedMonth, fixedDay + dayOffset);
        });

        it('when min > max date by ignoring them', async () => {
            const min = max.set({ day: max.day + 1 });
            element = await fixtureElement({
                props: { min, max },
            });

            expect(element.min).to.be.undefined;
            expect(element.max).to.be.undefined;
        });

        it("when a pre-selected value doesn't comply by ignoring it", async () => {
            const value = max.set({ day: max.day + 1 });
            element = await fixtureElement({
                props: { min, max, value },
            });

            expect(element.value).to.be.undefined;
            expect(element.min).to.not.be.undefined;
            expect(element.max).to.not.be.undefined;
            expect(isSameDay(element.min!, min)).to.be.true;
            expect(isSameDay(element.max!, max)).to.be.true;
        });

        it("by not selecting a day that doesn't comply", async () => {
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
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            await sendMouse({
                type: 'click',
                position: [centerX, centerY],
            });
            await elementUpdated(element);

            const isInitialCurrentDate = isSameDay(
                element['currentDate'],
                new CalendarDate(fixedYear, fixedMonth, fixedDay)
            );

            expect(isInitialCurrentDate).to.be.true;
            expect(changeSpy.callCount).to.equal(0);
            expect(element.value).to.be.undefined;
        });

        describe('stopping navigation when they are set', () => {
            beforeEach(async () => {
                element = await fixtureElement({
                    props: { min, max },
                });
                const focusableDay = element.shadowRoot.querySelector(
                    "td.tableCell[tabindex='0']"
                ) as HTMLElement;
                focusableDay.focus();
            });

            it('using the right arrow key', async () => {
                await Promise.all(
                    Array.from({ length: dayOffset + 3 }).map(() =>
                        sendKeys({ press: 'ArrowRight' })
                    )
                );
                await elementUpdated(element);

                const isMaxReached = isSameDay(element['currentDate'], max);
                expect(isMaxReached).to.be.true;
            });

            it('using the left arrow key', async () => {
                await Promise.all(
                    Array.from({ length: dayOffset + 3 }).map(() =>
                        sendKeys({ press: 'ArrowLeft' })
                    )
                );
                await elementUpdated(element);

                const isMinReached = isSameDay(element['currentDate'], min);
                expect(isMinReached).to.be.true;
            });

            it('using the up arrow key', async () => {
                await Promise.all(
                    Array.from({ length: dayOffset / DAYS_PER_WEEK + 1 }).map(
                        () => sendKeys({ press: 'ArrowUp' })
                    )
                );
                await elementUpdated(element);

                const isMinReached = isSameDay(element['currentDate'], min);
                expect(isMinReached).to.be.true;
            });

            it('using the down arrow key', async () => {
                await Promise.all(
                    Array.from({ length: dayOffset / DAYS_PER_WEEK + 1 }).map(
                        () => sendKeys({ press: 'ArrowDown' })
                    )
                );
                await elementUpdated(element);

                const isMaxReached = isSameDay(element['currentDate'], max);
                expect(isMaxReached).to.be.true;
            });
        });
    });

    describe('Correctly changes the selected date', () => {
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

        it('when an available day is clicked', async () => {
            const rect = availableDayElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            await sendMouse({
                type: 'click',
                position: [centerX, centerY],
            });
            await elementUpdated(element);
            const isDateSelected =
                element.value &&
                isSameDay(element.value, availableDateToSelect);

            expect(isDateSelected).to.be.true;
        });

        it('when an available day is acted upon using Enter', async () => {
            availableDayElement.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);
            const isDateSelected =
                element.value &&
                isSameDay(element.value, availableDateToSelect);

            expect(isDateSelected).to.be.true;
        });

        it('when an available day is acted upon using Space', async () => {
            availableDayElement.focus();
            await sendKeys({ press: 'Space' });
            await elementUpdated(element);
            const isDateSelected =
                element.value &&
                isSameDay(element.value, availableDateToSelect);

            expect(isDateSelected).to.be.true;
        });
    });

    describe('Correctly dispatches the change event', () => {
        let changeSpy: sinon.SinonSpy;
        let availableDateToSelect: CalendarDate;
        let availableDayElement: HTMLElement;

        before(async () => {
            changeSpy = spy();
        });

        beforeEach(() => {
            element.addEventListener('change', changeSpy);
            availableDateToSelect = new CalendarDate(
                fixedYear,
                fixedMonth,
                fixedDay + 1
            );
            availableDayElement = element.shadowRoot.querySelector(
                `[data-value='${availableDateToSelect.toString()}']`
            ) as HTMLElement;
        });

        afterEach(() => {
            changeSpy.resetHistory();
        });

        it('when an available day is selected by clicking', async () => {
            const rect = availableDayElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

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

        it('when an available day is selected using Enter', async () => {
            availableDayElement.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(1);

            changeSpy.resetHistory();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);
            expect(changeSpy.callCount).to.equal(0);
        });

        it('when an available day is selected using Space', async () => {
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

    describe('Warns in dev mode', () => {
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

        it("when the pre-selected value doesn't comply", async () => {
            const value = max.set({ day: max.day + 1 });
            element = await fixtureElement({
                props: { max, value },
            });

            expect(consoleWarnStub.called).to.be.true;
            const stubCall = consoleWarnStub.getCall(0);
            expect((stubCall.args[0] as string).includes('value to comply')).to
                .be.true;
        });

        it('when min > max', async () => {
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

    describe('Manages the disabled state', () => {
        it('by disabling the next and previous month buttons', async () => {});
        it("by not accepting focus on the calendar's days", async () => {});
        it("by not selecting a day when it's clicked", async () => {});
    });

    it('should render localized dates', async () => {
        // TODO
    });
});
