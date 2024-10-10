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
    isSameDay,
    ZonedDateTime,
} from '@internationalized/date';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import {
    DateTimePicker,
    EditableSegmentType,
    Precisions,
    SegmentTypes,
} from '@spectrum-web-components/date-time-picker';
import { sendKeys } from '@web/test-runner-commands';
import { stub } from 'sinon';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import {
    type EditableSegments,
    expectPlaceholder,
    expectPlaceholders,
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
            await fixture<DateTimePicker>(html`
                <sp-date-time-picker></sp-date-time-picker>
            `)
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
            // and that segments are set
        });
    });

    describe('Correctly creates segments according to precision', () => {
        it("when precision is 'day'", async () => {});
        it("when precision is 'hour'", async () => {});
        it("when precision is 'minute'", async () => {});
        it("when precision is 'second'", async () => {});

        // TODO: and locale (12h vs 24h format)
    });

    it('shows the correct value in the segments', async () => {});

    it('clears the value', async () => {});

    describe("Correctly manages subcomponents' focus", () => {
        describe('focusing segments', () => {
            it('by pointer', async () => {});
            it('by keyboard using the right arrow key', async () => {});
            it('by keyboard using the left arrow key', async () => {});
            it('by keyboard using the delete/backspace key on a placeholder', async () => {});
            it('when a date is selected using the calendar', async () => {});
        });

        it("focusing the calendar's button", async () => {
            // TODO: one TAB press should focus the calendar button, not the next segment
        });
    });

    describe('Changes the values of the segments', () => {
        let editableSegments: EditableSegments;

        beforeEach(async () => {
            element = await fixtureElement({
                props: { precision: Precisions.Second },
            });
            await elementUpdated(element);

            editableSegments = getEditableSegments(element);
        });

        describe('using the up arrow key', () => {
            it("defining the year segment's value", async () => {
                const segment = editableSegments.getByType(SegmentTypes.Year);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`${fixedYear}`);
                expectPlaceholders(editableSegments, [segment]);
            });

            it("incrementing the year segment's value", async () => {
                const segment = editableSegments.getByType(SegmentTypes.Year);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await sendKeys({ press: 'ArrowUp' });
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`${fixedYear + 2}`);
                expectPlaceholders(editableSegments, [segment]);
            });

            [SegmentTypes.Month, SegmentTypes.Day].forEach((segmentType) => {
                it(`defining the ${segmentType} segment's value`, async () => {
                    const segment = editableSegments.getByType(
                        segmentType as EditableSegmentType
                    );

                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`01`);
                    expectPlaceholders(editableSegments, [segment]);
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
                    expectPlaceholders(editableSegments, [segment]);
                });
            });

            [SegmentTypes.Minute, SegmentTypes.Second].forEach(
                (segmentType) => {
                    it(`defining the ${segmentType} segment's value`, async () => {
                        const segment = editableSegments.getByType(
                            segmentType as EditableSegmentType
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowUp' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal(`00`);
                        expectPlaceholders(editableSegments, [segment]);
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
                        expectPlaceholders(editableSegments, [segment]);
                    });
                }
            );

            describe('on a 12h format', () => {
                it("defining the hour segment's value", async () => {
                    const hourSegment = editableSegments.getByType(
                        SegmentTypes.Hour
                    );

                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`12`); // as 12AM is 00:00
                    expectPlaceholders(editableSegments, [hourSegment]);
                });

                it("incrementing the hour segment's value", async () => {
                    const hourSegment = editableSegments.getByType(
                        SegmentTypes.Hour
                    );

                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`02`);
                    expectPlaceholders(editableSegments, [hourSegment]);
                });

                it('resetting the hour when the max is reached', async () => {
                    const hourSegment = editableSegments.getByType(
                        SegmentTypes.Hour
                    );

                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowUp', 13);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`12`);
                    expectPlaceholders(editableSegments, [hourSegment]);
                });

                it("defining the dayPeriod segment's value", async () => {
                    const dayPeriodSegment = editableSegments.getByType(
                        SegmentTypes.DayPeriod
                    );

                    dayPeriodSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(dayPeriodSegment.innerText).to.equal(`AM`);
                    expectPlaceholders(editableSegments, [dayPeriodSegment]);
                });

                it("toggling the dayPeriod segment's value", async () => {
                    const dayPeriodSegment = editableSegments.getByType(
                        SegmentTypes.DayPeriod
                    );

                    dayPeriodSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(dayPeriodSegment.innerText).to.equal(`PM`);
                    expectPlaceholders(editableSegments, [dayPeriodSegment]);
                });
            });

            describe('on a 24h format', () => {
                let hourSegment: HTMLElement;

                beforeEach(async () => {
                    element = await fixtureElement({ locale: 'en-GB' });
                    await elementUpdated(element);

                    editableSegments = getEditableSegments(element);
                    hourSegment = editableSegments.getByType(SegmentTypes.Hour);
                });

                it("defining the hour segment's value ", async () => {
                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`00`);
                    expectPlaceholders(editableSegments, [hourSegment]);
                });

                it("incrementing the hour segment's value ", async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowUp', 14);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`13`);
                    expectPlaceholders(editableSegments, [hourSegment]);
                });

                it('resetting the hour when the max is reached', async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowUp', 25);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`00`);
                    expectPlaceholders(editableSegments, [hourSegment]);
                });
            });

            describe('updating the day', () => {
                let daySegment: HTMLElement;
                let monthSegment: HTMLElement;
                let yearSegment: HTMLElement;

                beforeEach(async () => {
                    daySegment = editableSegments.getByType(SegmentTypes.Day);
                    monthSegment = editableSegments.getByType(
                        SegmentTypes.Month
                    );
                    yearSegment = editableSegments.getByType(SegmentTypes.Year);

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
                    expectPlaceholders(editableSegments, [
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
                    expect(daySegment.innerText).to.equal(`28`);
                    expectPlaceholders(editableSegments, [
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
                    expect(daySegment.innerText).to.equal(`29`);
                    expectPlaceholders(editableSegments, [
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
                    expectPlaceholders(editableSegments, [
                        daySegment,
                        monthSegment,
                        yearSegment,
                    ]);
                });
            });

            describe("resetting segment's value to minimum", () => {
                describe('with a defined date value', () => {
                    let value = new CalendarDateTime(
                        fixedYear,
                        fixedMonth,
                        fixedDay,
                        15,
                        15,
                        15
                    );

                    it('when the max year is reached', async () => {
                        element = await fixtureElement({
                            props: {
                                value,
                            },
                        });
                        await elementUpdated(element);
                        editableSegments = getEditableSegments(element);

                        const max = value.calendar.getYearsInEra(value);
                        element.value = value.set({ year: max });
                        await elementUpdated(element);
                        const segment = editableSegments.getByType(
                            SegmentTypes.Year
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowUp' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal('1');
                    });

                    it('when the max month is reached', async () => {
                        element = await fixtureElement({
                            props: {
                                value,
                            },
                        });
                        await elementUpdated(element);
                        editableSegments = getEditableSegments(element);

                        const max = value.calendar.getMonthsInYear(value);
                        element.value = value.set({ month: max });
                        await elementUpdated(element);
                        const segment = editableSegments.getByType(
                            SegmentTypes.Month
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowUp' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal('01');
                    });

                    it('when the max day is reached in a month with 31 days', async () => {
                        value = new CalendarDateTime(2024, 3, 15, 15, 15, 15);
                        element = await fixtureElement({
                            props: {
                                value,
                            },
                        });
                        await elementUpdated(element);
                        editableSegments = getEditableSegments(element);

                        element.value = value.set({ day: 31 });
                        await elementUpdated(element);
                        const segment = editableSegments.getByType(
                            SegmentTypes.Day
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowUp' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal('01');
                    });

                    it('when the max day is reached in February of a common year', async () => {
                        const commonYear = 2022;
                        value = new CalendarDateTime(
                            commonYear,
                            2,
                            15,
                            15,
                            15,
                            15
                        );
                        element = await fixtureElement({
                            props: {
                                value,
                            },
                        });
                        await elementUpdated(element);
                        editableSegments = getEditableSegments(element);

                        element.value = value.set({ day: 28 });
                        await elementUpdated(element);
                        const segment = editableSegments.getByType(
                            SegmentTypes.Day
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowUp' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal('01');
                    });

                    it('when the max day is reached in February of a leap year', async () => {
                        const leapYear = 2024;
                        value = new CalendarDateTime(
                            leapYear,
                            2,
                            15,
                            15,
                            15,
                            15
                        );
                        element = await fixtureElement({
                            props: {
                                value,
                            },
                        });
                        await elementUpdated(element);
                        editableSegments = getEditableSegments(element);

                        element.value = value.set({ day: 29 });
                        await elementUpdated(element);
                        const segment = editableSegments.getByType(
                            SegmentTypes.Day
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowUp' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal('01');
                    });

                    [SegmentTypes.Minute, SegmentTypes.Second].forEach(
                        (segmentType) => {
                            it(`when the max ${segmentType} is reached`, async () => {
                                element = await fixtureElement({
                                    props: {
                                        value,
                                        precision: Precisions.Second,
                                    },
                                });
                                await elementUpdated(element);
                                editableSegments = getEditableSegments(element);

                                const currentValue = element.value!;
                                element.value = currentValue.set({
                                    [segmentType]: 59,
                                });
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

                describe('with no fully defined date value', () => {
                    it('when the max month is reached', async () => {
                        const segment = editableSegments.getByType(
                            SegmentTypes.Month
                        );

                        segment.focus();
                        await sendKeyMultipleTimes('ArrowUp', 12 + 1);
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal(`01`);
                        expectPlaceholders(editableSegments, [segment]);
                    });

                    it('when the max day is reached as a single segment', async () => {
                        const segment = editableSegments.getByType(
                            SegmentTypes.Day
                        );

                        segment.focus();
                        await sendKeyMultipleTimes('ArrowUp', 31 + 1);
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal(`01`);
                        expectPlaceholders(editableSegments, [segment]);
                    });

                    it('when the max day is reached in February', async () => {
                        const daySegment = editableSegments.getByType(
                            SegmentTypes.Day
                        );
                        const monthSegment = editableSegments.getByType(
                            SegmentTypes.Month
                        );
                        monthSegment.focus();
                        await sendKeyMultipleTimes('ArrowUp', 2);

                        daySegment.focus();
                        await sendKeyMultipleTimes('ArrowUp', 29 + 1);
                        await elementUpdated(element);

                        expect(daySegment.innerText).to.equal(`01`);
                        expectPlaceholders(editableSegments, [
                            daySegment,
                            monthSegment,
                        ]);
                    });
                });
            });
        });

        describe('using the down arrow key', () => {
            it("defining the year segment's value", async () => {
                const yearSegment = editableSegments.getByType(
                    SegmentTypes.Year
                );

                yearSegment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(yearSegment.innerText).to.equal(`${fixedYear}`);
                expectPlaceholders(editableSegments, [yearSegment]);
            });

            it("decrementing the year segment's value", async () => {
                const yearSegment = editableSegments.getByType(
                    SegmentTypes.Year
                );

                yearSegment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(yearSegment.innerText).to.equal(`${fixedYear - 2}`);
                expectPlaceholders(editableSegments, [yearSegment]);
            });

            it(`defining the month segment's value`, async () => {
                const segment = editableSegments.getByType(SegmentTypes.Month);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`12`);
                expectPlaceholders(editableSegments, [segment]);
            });

            it(`decrementing the month segment's value`, async () => {
                const segment = editableSegments.getByType(SegmentTypes.Month);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`10`);
                expectPlaceholders(editableSegments, [segment]);
            });

            it(`defining the day segment's value`, async () => {
                const segment = editableSegments.getByType(SegmentTypes.Day);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`31`);
                expectPlaceholders(editableSegments, [segment]);
            });

            it(`decrementing the day segment's value`, async () => {
                const segment = editableSegments.getByType(SegmentTypes.Day);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`29`);
                expectPlaceholders(editableSegments, [segment]);
            });

            [SegmentTypes.Minute, SegmentTypes.Second].forEach(
                (segmentType) => {
                    it(`defining the ${segmentType} segment's value`, async () => {
                        const segment = editableSegments.getByType(
                            segmentType as EditableSegmentType
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowDown' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal(`59`);
                        expectPlaceholders(editableSegments, [segment]);
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
                        expectPlaceholders(editableSegments, [segment]);
                    });
                }
            );

            describe('on a 12h format', () => {
                let hourSegment: HTMLElement;
                let dayPeriodSegment: HTMLElement;

                beforeEach(async () => {
                    hourSegment = editableSegments.getByType(SegmentTypes.Hour);
                    dayPeriodSegment = editableSegments.getByType(
                        SegmentTypes.DayPeriod
                    );
                });

                it("defining the hour segment's value", async () => {
                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`11`);
                    expectPlaceholders(editableSegments, [hourSegment]);
                });

                it("decrementing the hour segment's value", async () => {
                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await sendKeys({ press: 'ArrowDown' });
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`09`);
                    expectPlaceholders(editableSegments, [hourSegment]);
                });

                it('resetting the hour when the min is reached', async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowDown', 13);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`11`);
                    expectPlaceholders(editableSegments, [hourSegment]);
                });

                it("defining the dayPeriod segment's value", async () => {
                    dayPeriodSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(dayPeriodSegment.innerText).to.equal(`PM`);
                    expectPlaceholders(editableSegments, [dayPeriodSegment]);
                });

                it("toggling the dayPeriod segment's value", async () => {
                    dayPeriodSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(dayPeriodSegment.innerText).to.equal(`AM`);
                    expectPlaceholders(editableSegments, [dayPeriodSegment]);
                });
            });

            describe('on a 24h format', () => {
                let hourSegment: HTMLElement;

                beforeEach(async () => {
                    element = await fixtureElement({ locale: 'en-GB' });
                    await elementUpdated(element);

                    editableSegments = getEditableSegments(element);
                    hourSegment = editableSegments.getByType(SegmentTypes.Hour);
                });

                it("defining the hour segment's value", async () => {
                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`23`);
                    expectPlaceholders(editableSegments, [hourSegment]);
                });

                it("decrementing the hour segment's value", async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowDown', 15);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`09`);
                    expectPlaceholders(editableSegments, [hourSegment]);
                });

                it('resetting the hour when the min is reached', async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowDown', 25);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`23`);
                    expectPlaceholders(editableSegments, [hourSegment]);
                });
            });

            describe('updating the day', () => {
                let daySegment: HTMLElement;
                let monthSegment: HTMLElement;
                let yearSegment: HTMLElement;

                beforeEach(async () => {
                    daySegment = editableSegments.getByType(SegmentTypes.Day);
                    monthSegment = editableSegments.getByType(
                        SegmentTypes.Month
                    );
                    yearSegment = editableSegments.getByType(SegmentTypes.Year);

                    daySegment.focus();
                    await sendKeys({ press: 'ArrowDown' });
                });

                it('when the month changes to February with no year selected', async () => {
                    monthSegment.focus();
                    await sendKeyMultipleTimes('ArrowDown', 11);
                    await elementUpdated(element);

                    expect(monthSegment.innerText).to.equal(`02`);
                    expect(daySegment.innerText).to.equal(`29`);
                    expectPlaceholders(editableSegments, [
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
                    expect(daySegment.innerText).to.equal(`28`);
                    expectPlaceholders(editableSegments, [
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
                    await sendKeyMultipleTimes('ArrowDown', 11);
                    await elementUpdated(element);

                    expect(yearSegment.innerText).to.equal(`2024`); // Leap year in the Gregorian calendar
                    expect(monthSegment.innerText).to.equal(`02`);
                    expect(daySegment.innerText).to.equal(`29`);
                    expectPlaceholders(editableSegments, [
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
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(yearSegment.innerText).to.equal(`2024`); // Leap year in the Gregorian calendar
                    expect(monthSegment.innerText).to.equal(`02`);
                    expect(daySegment.innerText).to.equal(`28`);
                    expectPlaceholders(editableSegments, [
                        daySegment,
                        monthSegment,
                        yearSegment,
                    ]);
                });
            });

            describe("resetting segment's value to maximum", () => {
                describe('with a defined date value', () => {
                    let value = new CalendarDateTime(
                        fixedYear,
                        fixedMonth,
                        fixedDay,
                        15,
                        15,
                        15
                    );

                    it('when the min year is reached', async () => {
                        element = await fixtureElement({
                            props: {
                                value,
                            },
                        });
                        await elementUpdated(element);
                        editableSegments = getEditableSegments(element);

                        const max = value.calendar.getYearsInEra(value);
                        element.value = value.set({ year: 1 });
                        await elementUpdated(element);
                        const segment = editableSegments.getByType(
                            SegmentTypes.Year
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowDown' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal(`${max}`);
                    });

                    it('when the min month is reached', async () => {
                        element = await fixtureElement({
                            props: {
                                value,
                            },
                        });
                        await elementUpdated(element);
                        editableSegments = getEditableSegments(element);

                        const max = value.calendar.getMonthsInYear(value);
                        element.value = value.set({ month: 1 });
                        await elementUpdated(element);
                        const segment = editableSegments.getByType(
                            SegmentTypes.Month
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowDown' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal(`${max}`);
                    });

                    it('when the min day is reached in a month with 31 days', async () => {
                        value = new CalendarDateTime(2024, 3, 15, 15, 15, 15);
                        element = await fixtureElement({
                            props: {
                                value,
                            },
                        });
                        await elementUpdated(element);
                        editableSegments = getEditableSegments(element);

                        element.value = value.set({ day: 1 });
                        await elementUpdated(element);
                        const segment = editableSegments.getByType(
                            SegmentTypes.Day
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowDown' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal('31');
                    });

                    it('when the min day is reached in February of a common year', async () => {
                        const commonYear = 2022;
                        value = new CalendarDateTime(
                            commonYear,
                            2,
                            15,
                            15,
                            15,
                            15
                        );
                        element = await fixtureElement({
                            props: {
                                value,
                            },
                        });
                        await elementUpdated(element);
                        editableSegments = getEditableSegments(element);

                        element.value = value.set({ day: 1 });
                        await elementUpdated(element);
                        const segment = editableSegments.getByType(
                            SegmentTypes.Day
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowDown' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal('28');
                    });

                    it('when the min day is reached in February of a leap year', async () => {
                        const leapYear = 2024;
                        value = new CalendarDateTime(
                            leapYear,
                            2,
                            15,
                            15,
                            15,
                            15
                        );
                        element = await fixtureElement({
                            props: {
                                value,
                            },
                        });
                        await elementUpdated(element);
                        editableSegments = getEditableSegments(element);

                        element.value = value.set({ day: 1 });
                        await elementUpdated(element);
                        const segment = editableSegments.getByType(
                            SegmentTypes.Day
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowDown' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal('29');
                    });

                    [SegmentTypes.Minute, SegmentTypes.Second].forEach(
                        (segmentType) => {
                            it(`when the min ${segmentType} is reached`, async () => {
                                element = await fixtureElement({
                                    props: {
                                        value,
                                        precision: Precisions.Second,
                                    },
                                });
                                await elementUpdated(element);
                                editableSegments = getEditableSegments(element);

                                const currentValue = element.value!;
                                element.value = currentValue.set({
                                    [segmentType]: 0,
                                });
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

                describe('with no fully defined date value', () => {
                    it('when the min month is reached', async () => {
                        const segment = editableSegments.getByType(
                            SegmentTypes.Month
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowUp' });
                        await elementUpdated(element);
                        await sendKeys({ press: 'ArrowDown' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal(`12`);
                        expectPlaceholders(editableSegments, [segment]);
                    });

                    it('when the min day is reached as a single segment', async () => {
                        const segment = editableSegments.getByType(
                            SegmentTypes.Day
                        );

                        segment.focus();
                        await sendKeys({ press: 'ArrowUp' });
                        await elementUpdated(element);
                        await sendKeys({ press: 'ArrowDown' });
                        await elementUpdated(element);

                        expect(segment.innerText).to.equal(`31`);
                        expectPlaceholders(editableSegments, [segment]);
                    });

                    it('when the min day is reached in February', async () => {
                        const daySegment = editableSegments.getByType(
                            SegmentTypes.Day
                        );
                        const monthSegment = editableSegments.getByType(
                            SegmentTypes.Month
                        );
                        monthSegment.focus();
                        await sendKeyMultipleTimes('ArrowUp', 2);

                        daySegment.focus();
                        await sendKeys({ press: 'ArrowUp' });
                        await elementUpdated(element);
                        await sendKeys({ press: 'ArrowDown' });
                        await elementUpdated(element);

                        expect(daySegment.innerText).to.equal(`29`);
                        expectPlaceholders(editableSegments, [
                            daySegment,
                            monthSegment,
                        ]);
                    });
                });
            });
        });

        describe('using typed in values', () => {
            [SegmentTypes.Year, SegmentTypes.Month, SegmentTypes.Day].forEach(
                (segmentType) => {
                    it(`the ${segmentType} segment should ignore initial zeros`, async () => {
                        const segment = editableSegments.getByType(
                            segmentType as EditableSegmentType
                        );

                        segment.focus();
                        await sendKeys({ type: '0' });
                        await elementUpdated(element);

                        expectPlaceholders(editableSegments);
                    });
                }
            );

            it("on the year segment's value", async () => {
                const segment = editableSegments.getByType(SegmentTypes.Year);

                segment.focus();
                await sendKeys({ type: '2' });
                await elementUpdated(element);
                expect(segment.innerText).to.equal('2');
                await sendKeys({ type: '03' });
                await elementUpdated(element);
                expect(segment.innerText).to.equal('203');
                await sendKeys({ type: '0' });
                expect(segment.innerText).to.equal('2030');
                await sendKeys({ type: '5' });
                expect(segment.innerText).to.equal('305');

                expectPlaceholders(editableSegments, [segment]);
            });

            it("on the month segment's value", async () => {
                const segment = editableSegments.getByType(SegmentTypes.Month);

                segment.focus();
                await sendKeys({ type: '2' });
                await elementUpdated(element);
                expect(segment.innerText).to.equal('02');
                await sendKeys({ type: '4' });
                expect(segment.innerText).to.equal('04');
                await sendKeys({ type: '1' });
                expect(segment.innerText).to.equal('01');
                await sendKeys({ type: '2' });
                expect(segment.innerText).to.equal('12');
                await sendKeys({ type: '9' });
                expect(segment.innerText).to.equal('09');
                await sendKeys({ type: '0' });
                expect(segment.innerText).to.equal('09');

                expectPlaceholders(editableSegments, [segment]);
            });

            describe("on the day segment's value", async () => {
                let yearSegment: HTMLElement;
                let monthSegment: HTMLElement;
                let daySegment: HTMLElement;

                beforeEach(async () => {
                    yearSegment = editableSegments.getByType(SegmentTypes.Year);
                    monthSegment = editableSegments.getByType(
                        SegmentTypes.Month
                    );
                    daySegment = editableSegments.getByType(SegmentTypes.Day);
                });

                it('when no month/year is defined', async () => {
                    daySegment.focus();
                    await sendKeys({ type: '5' });
                    await elementUpdated(element);
                    expect(daySegment.innerText).to.equal('05');
                    await sendKeys({ type: '4' });
                    await elementUpdated(element);
                    expect(daySegment.innerText).to.equal('04');
                    await sendKeys({ type: '0' });
                    await elementUpdated(element);
                    expect(daySegment.innerText).to.equal('04');

                    expectPlaceholders(editableSegments, [daySegment]);
                });

                describe('when the month is February in a common year', async () => {
                    beforeEach(async () => {
                        yearSegment.focus();
                        await sendKeys({ type: '2022' }); // Common year in the Gregorian calendar
                        await elementUpdated(element);
                        monthSegment.focus();
                        await sendKeys({ type: '2' });
                        await elementUpdated(element);
                        daySegment.focus();
                    });

                    it('should not set the day to 31, 30 or 29', async () => {
                        // Tries to set the day to 31
                        await sendKeys({ type: '3' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('03');
                        await sendKeys({ type: '1' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('01');

                        // Tries to set the day to 30
                        await sendKeys({ type: '3' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('13');
                        await sendKeys({ type: '0' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('13');

                        // Tries to set the day to 29
                        await sendKeys({ type: '2' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('02');
                        await sendKeys({ type: '9' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('09');

                        expectPlaceholders(editableSegments, [
                            daySegment,
                            monthSegment,
                            yearSegment,
                        ]);
                    });

                    it('should set the day to 28', async () => {
                        await sendKeys({ type: '2' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('02');
                        await sendKeys({ type: '8' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('28');

                        expectPlaceholders(editableSegments, [
                            daySegment,
                            monthSegment,
                            yearSegment,
                        ]);
                    });
                });

                describe('when the month is February in a leap year', async () => {
                    beforeEach(async () => {
                        yearSegment.focus();
                        await sendKeys({ type: '2024' }); // Leap year in the Gregorian calendar
                        await elementUpdated(element);
                        monthSegment.focus();
                        await sendKeys({ type: '2' });
                        await elementUpdated(element);
                        daySegment.focus();
                    });

                    it('should not set the day to 31 or 30', async () => {
                        await sendKeys({ type: '3' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('03');
                        await sendKeys({ type: '1' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('01');

                        await sendKeys({ type: '3' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('13');
                        await sendKeys({ type: '0' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('13');

                        expectPlaceholders(editableSegments, [
                            daySegment,
                            monthSegment,
                            yearSegment,
                        ]);
                    });

                    it('should set the day to 29 or 28', async () => {
                        await sendKeys({ type: '2' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('02');
                        await sendKeys({ type: '9' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('29');

                        await sendKeys({ type: '2' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('02');
                        await sendKeys({ type: '8' });
                        await elementUpdated(element);
                        expect(daySegment.innerText).to.equal('28');

                        expectPlaceholders(editableSegments, [
                            daySegment,
                            monthSegment,
                            yearSegment,
                        ]);
                    });
                });
            });

            describe('in a 12h format', () => {
                it("on the hour segment's value", async () => {
                    const segment = editableSegments.getByType(
                        SegmentTypes.Hour
                    );

                    segment.focus();
                    await sendKeys({ type: '1' });
                    await elementUpdated(element);
                    expect(segment.innerText).to.equal('01');
                    await sendKeys({ type: '2' });
                    await elementUpdated(element);
                    expect(segment.innerText).to.equal('12');
                    await sendKeys({ type: '3' });
                    await elementUpdated(element);
                    expect(segment.innerText).to.equal('03');
                    await sendKeys({ type: '0' });
                    await elementUpdated(element);
                    expect(segment.innerText).to.equal('03');

                    expectPlaceholders(editableSegments, [segment]);
                });

                it("on the dayPeriod segment's value using A/P keys", async () => {
                    const dayPeriodSegment = editableSegments.getByType(
                        SegmentTypes.DayPeriod
                    );

                    dayPeriodSegment.focus();
                    await sendKeys({ type: 'A' });
                    await elementUpdated(element);

                    expect(dayPeriodSegment.innerText).to.equal(`AM`);
                    expectPlaceholders(editableSegments, [dayPeriodSegment]);
                    await sendKeys({ type: 'P' });
                    await elementUpdated(element);

                    expect(dayPeriodSegment.innerText).to.equal(`PM`);
                    expectPlaceholders(editableSegments, [dayPeriodSegment]);
                });
            });

            it("in a 24h format on the hour segment's value", async () => {
                element = await fixtureElement({ locale: 'en-GB' });
                await elementUpdated(element);
                editableSegments = getEditableSegments(element);
                const segment = editableSegments.getByType(SegmentTypes.Hour);

                segment.focus();
                await sendKeys({ type: '0' });
                await elementUpdated(element);
                expect(segment.innerText).to.equal('00');
                await sendKeys({ type: '1' });
                await elementUpdated(element);
                expect(segment.innerText).to.equal('01');
                await sendKeys({ type: '2' });
                await elementUpdated(element);
                expect(segment.innerText).to.equal('12');
                await sendKeys({ type: '3' });
                await elementUpdated(element);
                expect(segment.innerText).to.equal('23');
                await sendKeys({ type: '5' });
                await elementUpdated(element);
                expect(segment.innerText).to.equal('05');
                await sendKeys({ type: '0' });
                await elementUpdated(element);
                expect(segment.innerText).to.equal('00');

                expectPlaceholders(editableSegments, [segment]);
            });

            [SegmentTypes.Minute, SegmentTypes.Second].forEach(
                (segmentType) => {
                    it(`on the ${segmentType} segment's value`, async () => {
                        const segment = editableSegments.getByType(
                            segmentType as EditableSegmentType
                        );

                        segment.focus();
                        await sendKeys({ type: '5' });
                        await elementUpdated(element);
                        expect(segment.innerText).to.equal('05');
                        await sendKeys({ type: '8' });
                        await elementUpdated(element);
                        expect(segment.innerText).to.equal('58');
                        await sendKeys({ type: '0' });
                        await elementUpdated(element);
                        expect(segment.innerText).to.equal('00');

                        expectPlaceholders(editableSegments, [segment]);
                    });
                }
            );

            describe('updating the day', () => {
                let yearSegment: HTMLElement;
                let monthSegment: HTMLElement;
                let daySegment: HTMLElement;

                beforeEach(async () => {
                    yearSegment = editableSegments.getByType(SegmentTypes.Year);
                    monthSegment = editableSegments.getByType(
                        SegmentTypes.Month
                    );
                    daySegment = editableSegments.getByType(SegmentTypes.Day);

                    daySegment.focus();
                    await sendKeys({ type: '31' });
                    await elementUpdated(element);
                });

                it('when the month changes to February with no year selected', async () => {
                    monthSegment.focus();
                    await sendKeys({ type: '2' });
                    await elementUpdated(element);

                    expect(monthSegment.innerText).to.equal('02');
                    expect(daySegment.innerText).to.equal('29');

                    expectPlaceholders(editableSegments, [
                        daySegment,
                        monthSegment,
                    ]);
                });

                it('when the month changes to February in a common year', async () => {
                    yearSegment.focus();
                    await sendKeys({ type: '2022' }); // Common year in the Gregorian calendar
                    await elementUpdated(element);
                    monthSegment.focus();
                    await sendKeys({ type: '2' });
                    await elementUpdated(element);

                    expect(yearSegment.innerText).to.equal('2022');
                    expect(monthSegment.innerText).to.equal('02');
                    expect(daySegment.innerText).to.equal('28');

                    expectPlaceholders(editableSegments, [
                        daySegment,
                        monthSegment,
                        yearSegment,
                    ]);
                });

                it('when the month changes to February in a leap year', async () => {
                    yearSegment.focus();
                    await sendKeys({ type: '2024' }); // Leap year in the Gregorian calendar
                    await elementUpdated(element);
                    monthSegment.focus();
                    await sendKeys({ type: '2' });
                    await elementUpdated(element);

                    expect(yearSegment.innerText).to.equal('2024');
                    expect(monthSegment.innerText).to.equal('02');
                    expect(daySegment.innerText).to.equal('29');

                    expectPlaceholders(editableSegments, [
                        daySegment,
                        monthSegment,
                        yearSegment,
                    ]);
                });

                it('when the year changes to a leap year and the month is February', async () => {
                    monthSegment.focus();
                    await sendKeys({ type: '2' });
                    await elementUpdated(element);
                    yearSegment.focus();
                    await sendKeys({ type: '4' }); // Leap year in the Gregorian calendar
                    await elementUpdated(element);

                    expect(yearSegment.innerText).to.equal('4');
                    expect(monthSegment.innerText).to.equal('02');
                    expect(daySegment.innerText).to.equal('29');

                    expectPlaceholders(editableSegments, [
                        daySegment,
                        monthSegment,
                        yearSegment,
                    ]);
                });
            });
        });

        describe('deleting values', () => {
            beforeEach(async () => {
                const value = new CalendarDateTime(2022, 11, 15, 15, 15, 15);
                element = await fixtureElement({
                    props: {
                        value,
                        precision: Precisions.Second,
                    },
                });
                await elementUpdated(element);
                editableSegments = getEditableSegments(element);
            });

            it('from the year segment using incremental deletion', async () => {
                const segment = editableSegments.getByType(SegmentTypes.Year);

                segment.focus();
                await sendKeys({ press: 'Delete' });
                await elementUpdated(element);
                expect(segment.innerText).to.equal(`202`);

                await sendKeys({ press: 'Delete' });
                await elementUpdated(element);
                expect(segment.innerText).to.equal(`20`);

                await sendKeys({ press: 'Delete' });
                await elementUpdated(element);
                expect(segment.innerText).to.equal(`2`);

                await sendKeys({ press: 'Delete' });
                await elementUpdated(element);

                expectPlaceholder(segment);
            });

            [
                SegmentTypes.Month,
                SegmentTypes.Day,
                SegmentTypes.Hour,
                SegmentTypes.Minute,
                SegmentTypes.Second,
                SegmentTypes.DayPeriod,
            ].forEach((segmentType) => {
                it(`from the ${segmentType} segment using mass deletion`, async () => {
                    const segment = editableSegments.getByType(
                        segmentType as EditableSegmentType
                    );

                    segment.focus();
                    await sendKeys({ press: 'Delete' });
                    await elementUpdated(element);

                    expectPlaceholder(segment);
                });
            });
        });
    });

    describe('Correctly dispatches the change event', () => {
        describe('the change event', () => {
            it('when all segments have a value for the first time', async () => {});
            it("when segments' value changes and user commits", async () => {});
            it("when a segment's value is deleted", async () => {
                // As per React Spectrum it should send one change event when the change that made the
                // date incomplete is made and none after that until the date is complete again
            });
        });

        describe('the input event', () => {
            it("when a segment's value changes through typing on an existing value", async () => {});

            it("when a segment's value changes through typing on an empty value", async () => {});

            it("when a segment's value changes through incrementing/decrementing on an existing value", async () => {});

            it("when a segment's value changes through incrementing/decrementing on an empty value", async () => {});
        });
    });

    describe('Manages min and max constraints', () => {
        let min: CalendarDateTime;
        let max: CalendarDateTime;
        const dayOffset = 5;

        before(async () => {
            min = new CalendarDateTime(
                fixedYear,
                fixedMonth,
                fixedDay - dayOffset,
                15,
                15,
                15
            );
            max = new CalendarDateTime(
                fixedYear,
                fixedMonth,
                fixedDay + dayOffset,
                15,
                15,
                15
            );
        });

        it('when min > max date by ignoring them', async () => {
            const min = max.set({ day: max.day + 1 });
            element = await fixtureElement({
                props: { min, max },
            });

            expect(element.min).to.be.undefined;
            expect(element.max).to.be.undefined;
        });

        it("when a preselected value date doesn't comply by ignoring it", async () => {
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

        it("by triggering the 'invalid' state when a value that doesn't comply is commited", async () => {
            // TODO: with the Space/Enter/Blur value commit PR
        });
    });

    describe('Manages multiple types', () => {
        it("updating precision to 'day' when no time information is given", async () => {
            // TODO: with the precision update PR
        });

        it('by not overriding the precision if it was provided by the consumer', async () => {
            // TODO: with the precision update PR
        });

        describe('keeping the type when all types for given properties match', () => {
            it('when the type is CalendarDate', async () => {
                const value = new CalendarDate(fixedYear, fixedMonth, fixedDay);
                const min = value.set({ day: value.day - 5 });
                const max = value.set({ day: value.day + 5 });

                element = await fixtureElement({
                    props: { min, max, value },
                });
                await elementUpdated(element);

                expect(element.value).to.be.instanceOf(CalendarDate);
                expect(element.min).to.be.instanceOf(CalendarDate);
                expect(element.max).to.be.instanceOf(CalendarDate);
            });

            it('when the type is CalendarDateTime', async () => {
                const value = new CalendarDateTime(
                    fixedYear,
                    fixedMonth,
                    fixedDay - 5,
                    9,
                    15,
                    30
                );
                const min = value.set({ day: value.day - 5 });
                const max = value.set({ day: value.day + 5 });

                element = await fixtureElement({
                    props: { min, max, value },
                });

                expect(element.value).to.be.instanceOf(CalendarDateTime);
                expect(element.min).to.be.instanceOf(CalendarDateTime);
                expect(element.max).to.be.instanceOf(CalendarDateTime);
            });

            it('when the type is ZonedDateTime', async () => {
                const value = new ZonedDateTime(
                    fixedYear,
                    fixedMonth,
                    fixedDay,
                    'America/Los_Angeles',
                    -28800000,
                    9,
                    15,
                    30
                );
                const min = value.set({ day: value.day - 5 });
                const max = value.set({ day: value.day + 5 });

                element = await fixtureElement({
                    props: { min, max, value },
                });

                expect(element.value).to.be.instanceOf(ZonedDateTime);
                expect(element.min).to.be.instanceOf(ZonedDateTime);
                expect(element.max).to.be.instanceOf(ZonedDateTime);
            });
        });

        describe('converting to the most specific type', () => {
            it('when value and min are provided', async () => {
                const value = new CalendarDate(fixedYear, fixedMonth, fixedDay);
                const min = new CalendarDateTime(
                    fixedYear,
                    fixedMonth,
                    fixedDay - 5,
                    9,
                    15
                );

                element = await fixtureElement({
                    props: { min, value },
                });

                expect(element.value).to.be.instanceOf(CalendarDateTime);
                expect(isSameDay(element.value!, value)).to.be.true;
                expect(element.min).to.be.instanceOf(CalendarDateTime);
                expect(element.max).to.be.undefined;
            });

            it('when value and max are provided', async () => {
                const value = new ZonedDateTime(
                    fixedYear,
                    fixedMonth,
                    fixedDay,
                    'America/Los_Angeles',
                    -28800000
                );
                const max = new CalendarDateTime(
                    fixedYear,
                    fixedMonth,
                    fixedDay + 5,
                    9,
                    15
                );

                element = await fixtureElement({
                    props: { max, value },
                });

                expect(element.value).to.be.instanceOf(ZonedDateTime);
                expect(element.max).to.be.instanceOf(ZonedDateTime);
                expect(isSameDay(element.max!, max)).to.be.true;
                expect(element.min).to.be.undefined;
            });

            it('when min and max are provided', async () => {
                const min = new ZonedDateTime(
                    fixedYear,
                    fixedMonth,
                    fixedDay,
                    'America/Los_Angeles',
                    -28800000
                );
                const max = new CalendarDate(
                    fixedYear,
                    fixedMonth,
                    fixedDay + 5
                );

                element = await fixtureElement({
                    props: { max, min },
                });

                expect(element.min).to.be.instanceOf(ZonedDateTime);
                expect(element.max).to.be.instanceOf(ZonedDateTime);
                expect(isSameDay(element.max!, max)).to.be.true;
                expect(element.value).to.be.undefined;
            });

            it('when value, min and max are provided', async () => {
                const value = new ZonedDateTime(
                    fixedYear,
                    fixedMonth,
                    fixedDay,
                    'America/Los_Angeles',
                    -28800000
                );
                const min = new CalendarDate(
                    fixedYear,
                    fixedMonth,
                    fixedDay - 5
                );
                const max = new CalendarDateTime(
                    fixedYear,
                    fixedMonth,
                    fixedDay + 5,
                    9,
                    15
                );

                element = await fixtureElement({
                    props: { min, max, value },
                });

                expect(element.value).to.be.instanceOf(ZonedDateTime);
                expect(element.min).to.be.instanceOf(ZonedDateTime);
                expect(element.max).to.be.instanceOf(ZonedDateTime);
                expect(isSameDay(element.min!, min)).to.be.true;
                expect(isSameDay(element.max!, max)).to.be.true;
            });
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

        it("when the preselected value doesn't comply", async () => {
            const value = max.set({ day: max.day + 1 });
            element = await fixtureElement({
                props: { max, value },
            });

            expect(consoleWarnStub.called).to.be.true;
            const stubCall = consoleWarnStub.getCall(0);
            expect((stubCall.args[0] as string).includes('value to comply')).to
                .be.true;
        });

        it('when min > max date', async () => {
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
        it('by not accepting focus', async () => {});
        it('by not accepting typed in values', async () => {});
        it('by not accepting arrow key inputs', async () => {});
        it('by not opening the calendar', async () => {});
    });

    describe("Manages different locales' formats", () => {
        // TODO
    });
});
