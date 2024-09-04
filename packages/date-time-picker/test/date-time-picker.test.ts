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
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import {
    DateTimePicker,
    EditableSegmentType,
    SegmentType,
} from '@spectrum-web-components/date-time-picker';
import { sendKeys } from '@web/test-runner-commands';
import { CalendarDateTime } from '@internationalized/date';
import {
    type EditableSegments,
    expectOnlySegmentsSet,
    fixtureElement,
    getEditableSegments,
    sendKeyMultipleTimes,
} from './helpers.js';

describe('DateTimePicker', () => {
    let element: DateTimePicker;
    const originalDateNow = Date.now;
    const fixedYear = 2022;
    const fixedMonth = 5;
    const fixedDay = 15;

    before(async () => {
        const fixedTime = new Date(
            fixedYear,
            fixedMonth - 1, // 0-indexed in Date but 1-indexed in CalendarDate
            fixedDay,
            15
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
            await fixture<DateTimePicker>(
                html`
                    <sp-date-time-picker></sp-date-time-picker>
                `
            )
    );

    // TODO: will fix in screen-reader accessibility PR
    it.skip('loads default sp-date-time-picker accessibly', async () => {
        await expect(element).to.be.accessible();
    });

    it("shows placeholders when there's no preselected value", async () => {
        expect(element.value).to.be.undefined;
        // TODO check for placeholders
    });

    describe('Manages the calendar', () => {
        it('opening it using the keyboard', async () => {});
        it('opening it using the pointer', async () => {});
        it("closing it using the 'esc' key", async () => {});
        it('closing it when a date is selected', async () => {});
        it('passing the value and min/max constraints', async () => {});
        it("handling the 'change' event", async () => {
            // TODO: test that DTP's value is updated
        });
    });

    describe('Correctly creates segments according to precision', () => {
        it("when precision is 'day'", async () => {});
        it("when precision is 'hour'", async () => {});
        it("when precision is 'minute'", async () => {});
        it("when precision is 'second'", async () => {});

        // TODO: and locale (12h vs 24h format)
    });

    describe("Correctly manages subcomponents' focus", () => {
        describe('focusing segments', () => {
            it('by pointer', async () => {});
            it('by keyboard using the right arrow key', async () => {});
            it('by keyboard using the left arrow key', async () => {});
            it('when a date is selected using the calendar', async () => {});
        });

        it("focusing the calendar's button", async () => {
            // TODO: one TAB press should focus the calendar button, not the next segment
        });
    });

    describe('Changes the values of the segments', () => {
        let editableSegments: EditableSegments;

        beforeEach(async () => {
            element = await fixtureElement({ props: { precision: 'second' } });
            await elementUpdated(element);

            editableSegments = getEditableSegments(element);
        });

        describe('using the up arrow key', () => {
            it("defining the year segment's value", async () => {
                const segment = editableSegments.getByType(SegmentType.Year);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`${fixedYear}`);
                expectOnlySegmentsSet(editableSegments, [segment]);
            });

            it("incrementing the year segment's value", async () => {
                const segment = editableSegments.getByType(SegmentType.Year);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await sendKeys({ press: 'ArrowUp' });
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`${fixedYear + 2}`);
                expectOnlySegmentsSet(editableSegments, [segment]);
            });

            [SegmentType.Month, SegmentType.Day].forEach((segmentType) => {
                it(`defining the ${segmentType} segment's value`, async () => {
                    const segment = editableSegments.getByType(
                        segmentType as EditableSegmentType
                    );

                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`01`);
                    expectOnlySegmentsSet(editableSegments, [segment]);
                });

                it(`incrementing the ${segmentType} segment's value`, async () => {
                    const segment = editableSegments.getByType(
                        segmentType as EditableSegmentType
                    );

                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`03`);
                    expectOnlySegmentsSet(editableSegments, [segment]);
                });
            });

            [SegmentType.Minute, SegmentType.Second].forEach((segmentType) => {
                it(`defining the ${segmentType} segment's value`, async () => {
                    const segment = editableSegments.getByType(
                        segmentType as EditableSegmentType
                    );

                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`00`);
                    expectOnlySegmentsSet(editableSegments, [segment]);
                });

                it(`incrementing the ${segmentType} segment's value`, async () => {
                    const segment = editableSegments.getByType(
                        segmentType as EditableSegmentType
                    );

                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`02`);
                    expectOnlySegmentsSet(editableSegments, [segment]);
                });
            });

            describe('on a 12h format', () => {
                it("defining the hour segment's value", async () => {
                    const hourSegment = editableSegments.getByType(
                        SegmentType.Hour
                    );

                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`01`);
                    expectOnlySegmentsSet(editableSegments, [hourSegment]);
                });

                it("incrementing the hour segment's value", async () => {
                    const hourSegment = editableSegments.getByType(
                        SegmentType.Hour
                    );

                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`03`);
                    expectOnlySegmentsSet(editableSegments, [hourSegment]);
                });

                it('resetting the hour when the max is reached', async () => {
                    const hourSegment = editableSegments.getByType(
                        SegmentType.Hour
                    );

                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowUp', 13);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`01`);
                    expectOnlySegmentsSet(editableSegments, [hourSegment]);
                });

                it("defining the AM/PM segment's value", async () => {
                    const dayPeriodSegment = editableSegments.getByType(
                        SegmentType.DayPeriod
                    );

                    dayPeriodSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(dayPeriodSegment.innerText).to.equal(`AM`);
                    expectOnlySegmentsSet(editableSegments, [dayPeriodSegment]);
                });

                it("toggling the AM/PM segment's value", async () => {
                    const dayPeriodSegment = editableSegments.getByType(
                        SegmentType.DayPeriod
                    );

                    dayPeriodSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(dayPeriodSegment.innerText).to.equal(`PM`);
                    expectOnlySegmentsSet(editableSegments, [dayPeriodSegment]);
                });
            });

            describe('on a 24h format', () => {
                let hourSegment: HTMLElement;

                beforeEach(async () => {
                    element = await fixtureElement({ locale: 'en-GB' });
                    await elementUpdated(element);

                    editableSegments = getEditableSegments(element);
                    hourSegment = editableSegments.getByType(SegmentType.Hour);
                });

                it("defining the hour segment's value ", async () => {
                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`00`);
                    expectOnlySegmentsSet(editableSegments, [hourSegment]);
                });

                it("incrementing the hour segment's value ", async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowUp', 14);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`13`);
                    expectOnlySegmentsSet(editableSegments, [hourSegment]);
                });

                it('resetting the hour when the max is reached', async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowUp', 25);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`00`);
                    expectOnlySegmentsSet(editableSegments, [hourSegment]);
                });
            });

            describe('updating the day', () => {
                let daySegment: HTMLElement;
                let monthSegment: HTMLElement;
                let yearSegment: HTMLElement;

                beforeEach(async () => {
                    daySegment = editableSegments.getByType(SegmentType.Day);
                    monthSegment = editableSegments.getByType(
                        SegmentType.Month
                    );
                    yearSegment = editableSegments.getByType(SegmentType.Year);

                    daySegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                });

                it('when the month changes to February with no year selected', async () => {
                    monthSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(monthSegment.innerText).to.equal(`02`);
                    expect(daySegment.innerText).to.equal(`29`);
                    expectOnlySegmentsSet(editableSegments, [
                        daySegment,
                        monthSegment,
                    ]);
                });

                it('when the month changes to February in a common year', async () => {
                    yearSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);
                    monthSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(yearSegment.innerText).to.equal(`2022`); // Common year in the Gregorian calendar
                    expect(monthSegment.innerText).to.equal(`02`);
                    expect(daySegment.innerText).to.equal(`29`);
                    expectOnlySegmentsSet(editableSegments, [
                        daySegment,
                        monthSegment,
                        yearSegment,
                    ]);
                });

                it('when the month changes to February in a leap year', async () => {
                    yearSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);
                    monthSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(yearSegment.innerText).to.equal(`2024`); // Leap year in the Gregorian calendar
                    expect(monthSegment.innerText).to.equal(`02`);
                    expect(daySegment.innerText).to.equal(`28`);
                    expectOnlySegmentsSet(editableSegments, [
                        daySegment,
                        monthSegment,
                        yearSegment,
                    ]);
                });

                it('when the year changes to a leap year and the month is February', async () => {
                    monthSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);
                    yearSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(yearSegment.innerText).to.equal(`2024`); // Leap year in the Gregorian calendar
                    expect(monthSegment.innerText).to.equal(`02`);
                    expect(daySegment.innerText).to.equal(`28`);
                    expectOnlySegmentsSet(editableSegments, [
                        daySegment,
                        monthSegment,
                        yearSegment,
                    ]);
                });
            });

            describe("resetting segment's value to minimum", () => {
                beforeEach(async () => {
                    const value = new CalendarDateTime(
                        fixedYear,
                        fixedMonth,
                        fixedDay,
                        15,
                        15,
                        15
                    );
                    element = await fixtureElement({
                        props: {
                            value,
                            precision: 'day', // TODO: looks like it's not working
                        },
                    });
                    await elementUpdated(element);
                    editableSegments = getEditableSegments(element);
                });

                it('when the max year is reached', async () => {
                    const currentValue = element.value!;
                    const max =
                        currentValue.calendar.getYearsInEra(currentValue);
                    element.value = currentValue.set({ year: max });
                    await elementUpdated(element);
                    const segment = editableSegments.getByType(
                        SegmentType.Year
                    );

                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal('1');
                });

                it('when the max month is reached', async () => {
                    const currentValue = element.value!;
                    const max =
                        currentValue.calendar.getMonthsInYear(currentValue);
                    element.value = currentValue.set({ month: max });
                    await elementUpdated(element);
                    const segment = editableSegments.getByType(
                        SegmentType.Month
                    );

                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal('01');
                });

                it('when the max day is reached', async () => {
                    const currentValue = element.value!;
                    const max =
                        currentValue.calendar.getDaysInMonth(currentValue);
                    element.value = currentValue.set({ day: max });
                    await elementUpdated(element);
                    const segment = editableSegments.getByType(SegmentType.Day);

                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal('01');
                });

                [SegmentType.Minute, SegmentType.Second].forEach(
                    (segmentType) => {
                        it(`when the max ${segmentType} is reached`, async () => {
                            // TODO: fix for 'second' because value of given type overrides precision to 'second'.
                            const currentValue = element.value!;
                            element.value = currentValue.set({ minute: 59 });
                            await elementUpdated(element);
                            const segment = editableSegments.getByType(
                                segmentType as EditableSegmentType
                            );

                            segment.focus();
                            await sendKeys({ press: 'ArrowUp' });
                            await elementUpdated(element);

                            expect(segment.innerText).to.equal('00');
                        });
                    }
                );
            });
        });

        describe.only('using the down arrow key', () => {
            it("defining the year segment's value", async () => {
                const yearSegment = editableSegments.getByType(
                    SegmentType.Year
                );

                yearSegment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(yearSegment.innerText).to.equal(`${fixedYear}`);
                expectOnlySegmentsSet(editableSegments, [yearSegment]);
            });

            it("decrementing the year segment's value", async () => {
                const yearSegment = editableSegments.getByType(
                    SegmentType.Year
                );

                yearSegment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(yearSegment.innerText).to.equal(`${fixedYear - 2}`);
                expectOnlySegmentsSet(editableSegments, [yearSegment]);
            });

            it(`defining the month segment's value`, async () => {
                const segment = editableSegments.getByType(SegmentType.Month);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`12`);
                expectOnlySegmentsSet(editableSegments, [segment]);
            });

            it(`decrementing the month segment's value`, async () => {
                const segment = editableSegments.getByType(SegmentType.Month);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`10`);
                expectOnlySegmentsSet(editableSegments, [segment]);
            });

            it(`defining the day segment's value`, async () => {
                const segment = editableSegments.getByType(SegmentType.Day);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`31`);
                expectOnlySegmentsSet(editableSegments, [segment]);
            });

            it(`decrementing the day segment's value`, async () => {
                const segment = editableSegments.getByType(SegmentType.Day);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`29`);
                expectOnlySegmentsSet(editableSegments, [segment]);
            });

            [SegmentType.Minute, SegmentType.Second].forEach((segmentType) => {
                it(`defining the ${segmentType} segment's value`, async () => {
                    const segment = editableSegments.getByType(
                        segmentType as EditableSegmentType
                    );

                    segment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`59`);
                    expectOnlySegmentsSet(editableSegments, [segment]);
                });

                it(`decrementing the ${segmentType} segment's value`, async () => {
                    const segment = editableSegments.getByType(
                        segmentType as EditableSegmentType
                    );

                    segment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await sendKeys({ press: 'ArrowDown' });
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`57`);
                    expectOnlySegmentsSet(editableSegments, [segment]);
                });
            });

            describe('on a 12h format', () => {
                let hourSegment: HTMLElement;
                let dayPeriodSegment: HTMLElement;

                beforeEach(async () => {
                    hourSegment = editableSegments.getByType(SegmentType.Hour);
                    dayPeriodSegment = editableSegments.getByType(
                        SegmentType.DayPeriod
                    );
                });

                it("defining the hour segment's value", async () => {
                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`12`);
                    expectOnlySegmentsSet(editableSegments, [hourSegment]);
                });

                it("incrementing the hour segment's value", async () => {
                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await sendKeys({ press: 'ArrowDown' });
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`10`);
                    expectOnlySegmentsSet(editableSegments, [hourSegment]);
                });

                it('resetting the hour when the min is reached', async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowDown', 13);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`12`);
                    expectOnlySegmentsSet(editableSegments, [hourSegment]);
                });

                it("defining the AM/PM segment's value", async () => {
                    dayPeriodSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(dayPeriodSegment.innerText).to.equal(`PM`);
                    expectOnlySegmentsSet(editableSegments, [dayPeriodSegment]);
                });

                it("toggling the AM/PM segment's value", async () => {
                    dayPeriodSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(dayPeriodSegment.innerText).to.equal(`AM`);
                    expectOnlySegmentsSet(editableSegments, [dayPeriodSegment]);
                });
            });

            describe('on a 24h format', () => {
                let hourSegment: HTMLElement;

                beforeEach(async () => {
                    element = await fixtureElement({ locale: 'en-GB' });
                    await elementUpdated(element);

                    editableSegments = getEditableSegments(element);
                    hourSegment = editableSegments.getByType(SegmentType.Hour);
                });

                it("defining the hour segment's value", async () => {
                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`23`);
                    expectOnlySegmentsSet(editableSegments, [hourSegment]);
                });

                it("decrementing the hour segment's value", async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowDown', 14);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`09`);
                    expectOnlySegmentsSet(editableSegments, [hourSegment]);
                });

                it('resetting the hour when the min is reached', async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowDown', 25);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`23`);
                    expectOnlySegmentsSet(editableSegments, [hourSegment]);
                });
            });

            describe('updating the day', () => {
                let daySegment: HTMLElement;
                let monthSegment: HTMLElement;
                let yearSegment: HTMLElement;

                beforeEach(async () => {
                    daySegment = editableSegments.getByType(SegmentType.Day);
                    monthSegment = editableSegments.getByType(
                        SegmentType.Month
                    );
                    yearSegment = editableSegments.getByType(SegmentType.Year);

                    daySegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                });

                it('when the month changes to February with no year selected', async () => {
                    monthSegment.focus();
                    await sendKeyMultipleTimes('ArrowDown', 11);
                    await elementUpdated(element);

                    expect(monthSegment.innerText).to.equal(`02`);
                    expect(daySegment.innerText).to.equal(`29`);
                    expectOnlySegmentsSet(editableSegments, [
                        daySegment,
                        monthSegment,
                    ]);
                });

                it('when the month changes to February in a common year', async () => {
                    yearSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);
                    monthSegment.focus();
                    await sendKeyMultipleTimes('ArrowDown', 11);
                    await elementUpdated(element);

                    expect(yearSegment.innerText).to.equal(`2022`); // Common year in the Gregorian calendar
                    expect(monthSegment.innerText).to.equal(`02`);
                    expect(daySegment.innerText).to.equal(`29`);
                    expectOnlySegmentsSet(editableSegments, [
                        daySegment,
                        monthSegment,
                        yearSegment,
                    ]);
                });

                it('when the month changes to February in a leap year', async () => {
                    yearSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await sendKeys({ press: 'ArrowDown' });
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);
                    monthSegment.focus();
                    await sendKeyMultipleTimes('ArrowDown', 11);
                    await elementUpdated(element);

                    expect(yearSegment.innerText).to.equal(`2024`); // Leap year in the Gregorian calendar
                    expect(monthSegment.innerText).to.equal(`02`);
                    expect(daySegment.innerText).to.equal(`28`);
                    expectOnlySegmentsSet(editableSegments, [
                        daySegment,
                        monthSegment,
                        yearSegment,
                    ]);
                });

                it('when the year changes to a leap year and the month is February', async () => {
                    monthSegment.focus();
                    await sendKeyMultipleTimes('ArrowDown', 11);
                    await elementUpdated(element);
                    yearSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await sendKeys({ press: 'ArrowDown' });
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(yearSegment.innerText).to.equal(`2024`); // Leap year in the Gregorian calendar
                    expect(monthSegment.innerText).to.equal(`02`);
                    expect(daySegment.innerText).to.equal(`28`);
                    expectOnlySegmentsSet(editableSegments, [
                        daySegment,
                        monthSegment,
                        yearSegment,
                    ]);
                });
            });

            describe("resetting segment's value to maximum", () => {
                beforeEach(async () => {
                    const value = new CalendarDateTime(
                        fixedYear,
                        fixedMonth,
                        fixedDay,
                        15,
                        15,
                        15
                    );
                    element = await fixtureElement({
                        props: {
                            value,
                            precision: 'second',
                        },
                    });
                    await elementUpdated(element);
                    editableSegments = getEditableSegments(element);
                });

                it('when the min year is reached', async () => {
                    const currentValue = element.value!;
                    const max =
                        currentValue.calendar.getYearsInEra(currentValue);
                    element.value = currentValue.set({ year: 1 });
                    await elementUpdated(element);
                    const segment = editableSegments.getByType(
                        SegmentType.Year
                    )!;

                    segment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`${max}`);
                });

                it('when the min month is reached', async () => {
                    const currentValue = element.value!;
                    const max =
                        currentValue.calendar.getMonthsInYear(currentValue);
                    element.value = currentValue.set({ month: 1 });
                    await elementUpdated(element);
                    const segment = editableSegments.getByType(
                        SegmentType.Month
                    )!;

                    segment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`${max}`);
                });

                it('when the min day is reached', async () => {
                    const currentValue = element.value!;
                    const max =
                        currentValue.calendar.getDaysInMonth(currentValue);
                    element.value = currentValue.set({ day: 1 });
                    await elementUpdated(element);
                    const segment = editableSegments.getByType(
                        SegmentType.Day
                    )!;

                    segment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`${max}`);
                });

                [SegmentType.Minute, SegmentType.Second].forEach(
                    (segmentType) => {
                        it(`when the min ${segmentType} is reached`, async () => {
                            const currentValue = element.value!;
                            element.value = currentValue.set({ minute: 0 });
                            await elementUpdated(element);
                            const segment = editableSegments.getByType(
                                segmentType as EditableSegmentType
                            );

                            segment.focus();
                            await sendKeys({ press: 'ArrowDown' });
                            await elementUpdated(element);

                            expect(segment.innerText).to.equal('59');
                        });
                    }
                );
            });
        });

        describe('using typed in values', () => {
            // TODO: should the year be padded as well?

            it("defining the year segment's value", async () => {});
            it("capping the year segment's value", async () => {});

            it("defining the month segment's value", async () => {});
            it("capping the month segment's value", async () => {});

            it("defining the day segment's value", async () => {});
            it("capping the day segment's value", async () => {});

            it("defining the hour segment's value", async () => {});
            it("capping the hour segment's value", async () => {});

            it("defining the minute segment's value", async () => {});
            it("capping the minute segment's value", async () => {});

            it("defining the second segment's value", async () => {});
            it("capping the second segment's value", async () => {});

            it("defining the AM/PM segment's value using A/P keys", async () => {});
            it("defining the AM/PM segment's value when the hour is set", async () => {});

            describe('updating the day', () => {
                it('when the month changes to February with no year selected', async () => {});
                it('when the month changes to February in a common year', async () => {});
                it('when the month changes to February in a leap year', async () => {});
                it('when the year changes to a leap year and the month is February', async () => {});
            });

            // TODO: month from '05' pressing '0' should stay '05'
        });

        describe('deleting values', () => {
            // TODO
        });
    });

    describe('Correctly dispatches the change event', () => {
        it('when all segments have a value', async () => {});
        it("when segments' value changes", async () => {});
        it("when a segment's value is deleted", async () => {
            // As per React Spectrum it should send one change event when the change that made the
            // date incomplete is made and none after that until the date is complete again
        });
    });

    describe('Manages min and max constraints', () => {
        it('when min > max date', async () => {});
        it("when a preselected value doesn't comply", async () => {});
        it("by triggering the 'invalid' state when a value that doesn't comply is selected", async () => {});
    });

    describe('Manages multiple types', () => {
        it("updating precision to 'day' when no time information is given", async () => {});
        it('by not overriding the precision if it was provided by the consumer', async () => {});
        it('keeping the type when all types for given properties match', async () => {});

        describe('converting to the most specific type', () => {
            it('when value and min are provided', async () => {});
            it('when value and max are provided', async () => {});
            it('when min and max are provided', async () => {});
            it('when value, min and max are provided', async () => {});
        });
    });

    describe('Warns in dev mode', () => {
        it("when the preselected value doesn't comply", async () => {});
        it('when min > max date', async () => {});
    });

    describe('Manages the disabled state', () => {
        it('by not accepting focus', async () => {});
        it('by not accepting typed in values', async () => {});
        it('by not accepting arrow key inputs', async () => {});
        it('by not opening the calendar', async () => {});
    });

    describe("Manages different locales' formats", () => {
        // TODO
    });
});
