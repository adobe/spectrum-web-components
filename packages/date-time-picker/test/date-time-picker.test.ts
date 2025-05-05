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
    DateValue,
    getLocalTimeZone,
    toZoned,
    ZonedDateTime,
} from '@internationalized/date';
import { NumberFormatter } from '@internationalized/number';

import { Calendar } from '@spectrum-web-components/calendar';
import {
    DateTimePicker,
    EditableSegmentType,
    Precisions,
    SegmentTypes,
} from '@spectrum-web-components/date-time-picker';
import { PickerButton } from '@spectrum-web-components/picker-button';

import {
    elementUpdated,
    expect,
    fixture,
    html,
    oneEvent,
} from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { spy, stub } from 'sinon';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import {
    dispatchCalendarChange,
    type EditableSegments,
    expectFocused,
    expectPlaceholder,
    expectPlaceholders,
    expectSameDates,
    fixtureElement,
    getEditableSegments,
    getElementCenter,
    isCalendarOpen,
    openCalendar,
    sendKeyMultipleTimes,
} from './helpers.js';

describe('DateTimePicker', () => {
    let element: DateTimePicker;
    let editableSegments: EditableSegments;
    const originalDateNow = Date.now;
    const fixedYear = 20;
    const fixedMonth = 5;
    const fixedDay = 15;
    let valueDateTime: CalendarDateTime;
    let valueZoned: ZonedDateTime;
    let valueDate: CalendarDate;

    before(() => {
        const fixedDate = new Date(
            fixedYear,
            fixedMonth - 1, // 0-indexed in Date but 1-indexed in CalendarDate
            fixedDay,
            15
        );
        // Force the year to be fixedYear when it has 2-digits (instead of a year in the 1900s)
        fixedDate.setFullYear(fixedYear);
        Date.now = () => fixedDate.getTime();
        valueDate = new CalendarDate(fixedYear, fixedMonth, fixedDay);
        valueDateTime = new CalendarDateTime(
            fixedYear,
            fixedMonth,
            fixedDay,
            15,
            15,
            15
        );
        valueZoned = new ZonedDateTime(
            fixedYear,
            fixedMonth,
            fixedDay,
            'America/Los_Angeles',
            -28800000,
            9,
            15,
            30
        );
    });

    beforeEach(async () => {
        element = await fixtureElement();
        editableSegments = getEditableSegments(element);
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

    it('loads default sp-date-time-picker accessibly', async () => {
        await expect(element).to.be.accessible();
    });

    describe('Value property', () => {
        Object.values(Precisions).forEach((precision) => {
            it(`should define value only when all segments are defined - '${precision}' precision`, async () => {
                element = await fixtureElement({
                    props: { precision },
                });
                editableSegments = getEditableSegments(element);

                expect(element.value).to.be.undefined;

                while (editableSegments.length > 0) {
                    const segment = editableSegments.shift()!;
                    segment.focus();

                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    if (editableSegments.length > 0)
                        expect(element.value).to.be.undefined;
                }

                expect(element.value).to.not.be.undefined;
            });
        });

        it('should define the value as CalendarDate when it is the most specific date value', async () => {
            element = await fixtureElement({ props: { min: valueDate } });
            editableSegments = getEditableSegments(element);

            while (editableSegments.length > 0) {
                const segment = editableSegments.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
            }

            expectSameDates(element.value!, new CalendarDate(fixedYear, 1, 1));
            expect(
                element.value,
                'value not an instance of CalendarDate'
            ).to.be.instanceOf(CalendarDate);
        });

        it('should update the value as CalendarDate when it is the most specific date value', async () => {
            element = await fixtureElement({
                props: { value: valueDate.set({ year: 2222 }) },
            });
            editableSegments = getEditableSegments(element);

            const year = editableSegments.getByType(SegmentTypes.Year);
            year.focus();
            await sendKeys({ type: '1032' });
            await elementUpdated(element);

            expectSameDates(
                element.value!,
                new CalendarDate(1032, valueDate.month, valueDate.day)
            );
            expect(
                element.value!,
                'value not an instance of CalendarDate'
            ).to.be.instanceOf(CalendarDate);
        });

        it('should define the value as CalendarDateTime when it is the most specific date value', async () => {
            element = await fixtureElement({ props: { min: valueDateTime } });
            editableSegments = getEditableSegments(element);

            while (editableSegments.length > 0) {
                const segment = editableSegments.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
            }

            expectSameDates(element.value!, new CalendarDate(fixedYear, 1, 1));
            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
        });

        it('should update the value as CalendarDateTime when it is the most specific date value', async () => {
            element = await fixtureElement({
                props: { value: valueDateTime.set({ year: 2222 }) },
            });
            editableSegments = getEditableSegments(element);

            const year = editableSegments.getByType(SegmentTypes.Year);
            year.focus();
            await sendKeys({ type: '1032' });
            await elementUpdated(element);

            expectSameDates(
                element.value!,
                new CalendarDate(1032, valueDateTime.month, valueDateTime.day)
            );
            expect(
                element.value!,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
        });

        it('should define the value as ZonedDateTime when it is the most specific date value', async () => {
            element = await fixtureElement({ props: { min: valueZoned } });
            editableSegments = getEditableSegments(element);

            while (editableSegments.length > 0) {
                const segment = editableSegments.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
            }

            expectSameDates(element.value!, new CalendarDate(fixedYear, 1, 1));
            expect(
                element.value,
                'value not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expect((element.value as ZonedDateTime).timeZone).to.equal(
                valueZoned.timeZone,
                'timeZone mismatch'
            );
        });

        it('should update the value as ZonedDateTime when it is the most specific date value', async () => {
            element = await fixtureElement({
                props: { value: valueZoned.set({ year: 2222 }) },
            });
            editableSegments = getEditableSegments(element);

            const year = editableSegments.getByType(SegmentTypes.Year);
            year.focus();
            await sendKeys({ type: '1032' });
            await elementUpdated(element);

            expectSameDates(
                element.value!,
                new CalendarDate(1032, valueZoned.month, valueZoned.day)
            );
            expect(
                element.value,
                'value not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expect((element.value as ZonedDateTime).timeZone).to.equal(
                valueZoned.timeZone,
                'timeZone mismatch'
            );
        });

        it("should define the value as CalendarDate when no date property is provided and precision is 'day'", async () => {
            element = await fixtureElement({
                props: { precision: Precisions.Day },
            });
            editableSegments = getEditableSegments(element);

            const year = editableSegments.getByType(SegmentTypes.Year);
            const month = editableSegments.getByType(SegmentTypes.Month);
            const day = editableSegments.getByType(SegmentTypes.Day);

            year.focus();
            await sendKeys({ type: '2022' });
            month.focus();
            await sendKeys({ type: '5' });
            day.focus();
            await sendKeys({ type: '4' });
            await elementUpdated(element);

            expectSameDates(element.value!, new CalendarDate(2022, 5, 4));
            expect(
                element.value,
                'value not an instance of CalendarDate'
            ).to.be.instanceOf(CalendarDate);

            month.focus();
            await sendKeys({ type: '6' });
            await elementUpdated(element);

            expectSameDates(element.value!, new CalendarDate(2022, 6, 4));
            expect(
                element.value,
                'value not an instance of CalendarDate'
            ).to.be.instanceOf(CalendarDate);
        });

        it('should update the value as CalendarDate when no date property is provided and precision is Day', async () => {
            element = await fixtureElement({
                props: { precision: Precisions.Day },
            });
            editableSegments = getEditableSegments(element);
            const month = editableSegments.getByType(SegmentTypes.Month);

            // set the value
            while (editableSegments.length > 0) {
                const segment = editableSegments.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
            }

            // update the value
            month.focus();
            await sendKeys({ type: '5' });
            await elementUpdated(element);

            expectSameDates(element.value!, new CalendarDate(fixedYear, 5, 1));
            expect(
                element.value,
                'value not an instance of CalendarDate'
            ).to.be.instanceOf(CalendarDate);
        });

        it('should define the value as CalendarDateTime when CalendarDate is provided and precision includes time', async () => {
            element = await fixtureElement({
                props: { precision: Precisions.Second, min: valueDate },
            });
            editableSegments = getEditableSegments(element);

            // set the value
            while (editableSegments.length > 0) {
                const segment = editableSegments.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
            }

            expectSameDates(
                element.value!,
                new CalendarDateTime(fixedYear, 1, 1)
            );
            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
        });

        it('should update the value as CalendarDateTime when CalendarDate is provided and precision includes time', async () => {
            element = await fixtureElement({
                props: { precision: Precisions.Second, min: valueDate },
            });
            editableSegments = getEditableSegments(element);
            const month = editableSegments.getByType(SegmentTypes.Month);

            // set the value
            while (editableSegments.length > 0) {
                const segment = editableSegments.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
            }

            // update the value
            month.focus();
            await sendKeys({ type: '5' });
            await elementUpdated(element);

            expectSameDates(
                element.value!,
                new CalendarDateTime(fixedYear, 5, 1, 0, 0, 0)
            );
            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
        });

        it('should define the value as CalendarDateTime when no date property nor precision is provided', async () => {
            element = await fixtureElement();
            editableSegments = getEditableSegments(element);

            while (editableSegments.length > 0) {
                const segment = editableSegments.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
            }

            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
        });

        it('should update the value as CalendarDateTime when no date property nor precision is provided', async () => {
            element = await fixtureElement();
            editableSegments = getEditableSegments(element);
            const month = editableSegments.getByType(SegmentTypes.Month);

            // set the value
            while (editableSegments.length > 0) {
                const segment = editableSegments.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
            }

            // update the value
            month.focus();
            await sendKeys({ type: '5' });
            await elementUpdated(element);

            expectSameDates(
                element.value!,
                new CalendarDateTime(fixedYear, 5, 1, 0, 0, 0)
            );
            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
        });

        [Precisions.Hour, Precisions.Minute, Precisions.Second].forEach(
            (precision) => {
                it(`should define and update the value as CalendarDateTime when no date property is provided and precision is ${precision}`, async () => {
                    element = await fixtureElement({ props: { precision } });
                    editableSegments = getEditableSegments(element);
                    const month = editableSegments.getByType(
                        SegmentTypes.Month
                    );

                    while (editableSegments.length > 0) {
                        const segment = editableSegments.shift()!;
                        segment.focus();

                        await sendKeys({ press: 'ArrowUp' });
                        await elementUpdated(element);
                    }

                    expectSameDates(
                        element.value!,
                        new CalendarDateTime(fixedYear, 1, 1, 0, 0, 0)
                    );
                    expect(
                        element.value,
                        'value not an instance of CalendarDateTime'
                    ).to.be.instanceOf(CalendarDateTime);

                    month.focus();
                    await sendKeys({ type: '5' });
                    await elementUpdated(element);
                    expectSameDates(
                        element.value!,
                        new CalendarDateTime(fixedYear, 5, 1, 0, 0, 0)
                    );
                    expect(
                        element.value,
                        'value not an instance of CalendarDateTime'
                    ).to.be.instanceOf(CalendarDateTime);
                });
            }
        );

        [
            SegmentTypes.Year,
            SegmentTypes.Month,
            SegmentTypes.Day,
            SegmentTypes.Hour,
            SegmentTypes.Minute,
            SegmentTypes.Second,
        ].forEach((segmentType) => {
            it(`should update the value when the ${segmentType} segment is changed on a 24h format`, async () => {
                element = await fixtureElement({
                    locale: 'en-GB',
                    props: {
                        precision: Precisions.Second,
                        value: valueDateTime,
                    },
                });
                editableSegments = getEditableSegments(element);
                const segment = editableSegments.getByType(segmentType);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expectSameDates(
                    element.value!,
                    valueDateTime.set({
                        [segmentType]: valueDateTime[segmentType] + 1,
                    })
                );
            });

            it(`should update the value when the ${segmentType} segment is changed on a 12h format`, async () => {
                element = await fixtureElement({
                    props: {
                        precision: Precisions.Second,
                        value: valueDateTime,
                    },
                });
                editableSegments = getEditableSegments(element);
                const segment = editableSegments.getByType(segmentType);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expectSameDates(
                    element.value!,
                    valueDateTime.set({
                        [segmentType]: valueDateTime[segmentType] + 1,
                    })
                );
            });
        });

        it('should update the value when the dayPeriod segment is changed', async () => {
            element = await fixtureElement({
                props: {
                    precision: Precisions.Second,
                    value: valueDateTime,
                },
            });
            editableSegments = getEditableSegments(element);
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            dayPeriodSegment.focus();
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(element);

            expectSameDates(
                element.value!,
                valueDateTime.set({
                    hour: (valueDateTime.hour! + 12) % 24,
                })
            );
        });

        it('should clear the value and the segments when the clear method is called with a fully defined value', async () => {
            element = await fixtureElement({
                props: {
                    value: valueDateTime,
                },
            });

            element.clear();
            await elementUpdated(element);

            expect(element.value).to.be.undefined;
            expectPlaceholders(getEditableSegments(element));
        });

        it('should clear the value and the segments when the clear method is called with a partially defined value', async () => {
            const year = editableSegments.getByType(SegmentTypes.Year);
            const minute = editableSegments.getByType(SegmentTypes.Minute);

            year.focus();
            await sendKeys({ press: 'ArrowUp' });
            minute.focus();
            await sendKeys({ press: 'ArrowUp' });

            expect(element.value).to.be.undefined;
            expectPlaceholders(editableSegments, [year, minute]);

            element.clear();
            await elementUpdated(element);

            expect(element.value).to.be.undefined;
            expectPlaceholders(editableSegments);
        });
    });

    describe('Calendar', () => {
        it('should have the calendar closed by default', () => {
            expect(isCalendarOpen(element)).to.be.false;
        });

        it('should open and close the calendar using the keyboard', async () => {
            const calendarButton = element.shadowRoot!.querySelector(
                'sp-picker-button'
            ) as PickerButton;

            const opened = oneEvent(element, 'sp-opened');
            calendarButton.focus();
            await sendKeys({ press: 'Enter' });
            await opened;

            expect(isCalendarOpen(element)).to.be.true;

            const closed = oneEvent(element, 'sp-closed');
            await sendKeys({ press: 'Escape' });
            await closed;

            expect(isCalendarOpen(element)).to.be.false;
        });

        it('should open and close the calendar using the pointer', async () => {
            const calendarButton = element.shadowRoot!.querySelector(
                'sp-picker-button'
            ) as PickerButton;

            const opened = oneEvent(element, 'sp-opened');
            await sendMouse({
                type: 'click',
                position: getElementCenter(calendarButton),
            });
            await opened;

            expect(isCalendarOpen(element)).to.be.true;

            const closed = oneEvent(element, 'sp-closed');
            await sendMouse({
                type: 'click',
                position: [0, 0], // click outside the calendar
            });
            await closed;

            expect(isCalendarOpen(element)).to.be.false;
        });

        it('should pass the value and min/max constraints to the calendar', async () => {
            const min = new CalendarDateTime(2022, 5, 1, 15, 30, 20);
            const max = new CalendarDate(2022, 5, 31);
            const value = new CalendarDate(2022, 5, 15);

            element = await fixtureElement({
                props: {
                    min,
                    max,
                    value,
                },
            });

            const calendarEl = element.shadowRoot!.querySelector(
                'sp-calendar'
            ) as Calendar;

            expectSameDates(calendarEl.min!, element.min!, 'min mismatch');
            expectSameDates(calendarEl.max!, element.max!, 'max mismatch');
            expectSameDates(
                calendarEl.value!,
                element.value!,
                'value mismatch'
            );
        });

        it("should close the calendar when the component gets disabled and it's open", async () => {
            await openCalendar(element);
            expect(isCalendarOpen(element)).to.be.true;

            element.disabled = true;
            await elementUpdated(element);

            expect(isCalendarOpen(element)).to.be.false;
        });

        describe('change event', () => {
            it('should close the calendar when handling its change event', async () => {
                await openCalendar(element);
                expect(isCalendarOpen(element)).to.be.true;

                const closed = oneEvent(element, 'sp-closed');
                await dispatchCalendarChange(
                    element,
                    new CalendarDate(2022, 5, 15)
                );
                await closed;

                expect(isCalendarOpen(element)).to.be.false;
            });

            it('should update the value as CalendarDate when its the most specific date value', async () => {
                element = await fixtureElement({
                    props: { min: new CalendarDate(1000, 3, 10) },
                });
                editableSegments = getEditableSegments(element);
                const year = editableSegments.getByType(SegmentTypes.Year);
                const month = editableSegments.getByType(SegmentTypes.Month);
                const day = editableSegments.getByType(SegmentTypes.Day);
                await openCalendar(element);

                const calendarValue = new CalendarDate(2022, 5, 15);
                await dispatchCalendarChange(element, calendarValue);

                expectSameDates(element.value!, calendarValue);
                expect(
                    element.value!,
                    'value not an instance of CalendarDate'
                ).to.be.instanceOf(CalendarDate);

                expect(year.innerText).to.equal('2022');
                expect(month.innerText).to.equal('05');
                expect(day.innerText).to.equal('15');
            });

            it('should update the value as CalendarDateTime when its the most specific date value', async () => {
                element = await fixtureElement({
                    props: { min: new CalendarDateTime(1000, 3, 10) },
                });
                editableSegments = getEditableSegments(element);

                const year = editableSegments.getByType(SegmentTypes.Year);
                const month = editableSegments.getByType(SegmentTypes.Month);
                const day = editableSegments.getByType(SegmentTypes.Day);
                const hour = editableSegments.getByType(SegmentTypes.Hour);
                const minute = editableSegments.getByType(SegmentTypes.Minute);
                hour.focus();
                await sendKeys({ type: '5' });
                await openCalendar(element);

                const calendarValue = new CalendarDate(2022, 5, 15);
                await dispatchCalendarChange(element, calendarValue);

                expectSameDates(element.value!, calendarValue);
                expect(
                    element.value!,
                    'value not an instance of CalendarDateTime'
                ).to.be.instanceOf(CalendarDateTime);

                expect(year.innerText).to.equal('2022');
                expect(month.innerText).to.equal('05');
                expect(day.innerText).to.equal('15');
                expect(hour.innerText).to.equal('05');
                expect(minute.innerText).to.equal('00');
                expect((element.value! as CalendarDateTime).hour).to.equal(5);
                expect((element.value! as CalendarDateTime).minute).to.equal(0);
                expect((element.value! as CalendarDateTime).second).to.equal(0);
            });

            it('should update the value as ZonedDateTime when its the most specific date value', async () => {
                element = await fixtureElement({
                    props: {
                        min: new ZonedDateTime(
                            1000,
                            3,
                            10,
                            valueZoned.timeZone,
                            valueZoned.offset
                        ),
                    },
                });
                editableSegments = getEditableSegments(element);
                const year = editableSegments.getByType(SegmentTypes.Year);
                const month = editableSegments.getByType(SegmentTypes.Month);
                const day = editableSegments.getByType(SegmentTypes.Day);
                const hour = editableSegments.getByType(SegmentTypes.Hour);
                const minute = editableSegments.getByType(SegmentTypes.Minute);
                hour.focus();
                await sendKeys({ type: '5' });
                await openCalendar(element);

                const calendarValue = new CalendarDate(2022, 5, 15);
                await dispatchCalendarChange(element, calendarValue);

                expectSameDates(element.value!, calendarValue);
                expect(
                    element.value!,
                    'value not an instance of ZonedDateTime'
                ).to.be.instanceOf(ZonedDateTime);
                expect(
                    (element.value as ZonedDateTime).timeZone,
                    'timeZone mismatch'
                ).to.equal(valueZoned.timeZone);
                expect(year.innerText).to.equal('2022');
                expect(month.innerText).to.equal('05');
                expect(day.innerText).to.equal('15');
                expect(hour.innerText).to.equal('05');
                expect(minute.innerText).to.equal('00');
                expect((element.value! as ZonedDateTime).hour).to.equal(5);
                expect((element.value! as ZonedDateTime).minute).to.equal(0);
                expect((element.value! as ZonedDateTime).second).to.equal(0);
            });

            it("should update the value as CalendarDate when no date property is provided and precision is 'day'", async () => {
                element = await fixtureElement({
                    props: { precision: Precisions.Day },
                });
                editableSegments = getEditableSegments(element);
                const year = editableSegments.getByType(SegmentTypes.Year);
                const month = editableSegments.getByType(SegmentTypes.Month);
                const day = editableSegments.getByType(SegmentTypes.Day);
                await openCalendar(element);

                const calendarValue = new CalendarDate(2022, 5, 15);
                await dispatchCalendarChange(element, calendarValue);

                expectSameDates(element.value!, calendarValue);
                expect(
                    element.value!,
                    'value not an instance of CalendarDate'
                ).to.be.instanceOf(CalendarDate);

                expect(year.innerText).to.equal('2022');
                expect(month.innerText).to.equal('05');
                expect(day.innerText).to.equal('15');
            });

            it('should update the value as CalendarDateTime when CalendarDate is provided and precision includes time', async () => {
                element = await fixtureElement({
                    props: { min: valueDate, precision: Precisions.Second },
                });
                editableSegments = getEditableSegments(element);
                const year = editableSegments.getByType(SegmentTypes.Year);
                const month = editableSegments.getByType(SegmentTypes.Month);
                const day = editableSegments.getByType(SegmentTypes.Day);
                const hour = editableSegments.getByType(SegmentTypes.Hour);
                const minute = editableSegments.getByType(SegmentTypes.Minute);
                hour.focus();
                await sendKeys({ type: '5' });
                await openCalendar(element);

                const calendarValue = new CalendarDate(2022, 5, 15);
                await dispatchCalendarChange(element, calendarValue);

                expectSameDates(element.value!, calendarValue);
                expect(
                    element.value!,
                    'value not an instance of CalendarDateTime'
                ).to.be.instanceOf(CalendarDateTime);

                expect(year.innerText).to.equal('2022');
                expect(month.innerText).to.equal('05');
                expect(day.innerText).to.equal('15');
                expect(hour.innerText).to.equal('05');
                expect(minute.innerText).to.equal('00');
                expect((element.value! as CalendarDateTime).hour).to.equal(5);
                expect((element.value! as CalendarDateTime).minute).to.equal(0);
                expect((element.value! as CalendarDateTime).second).to.equal(0);
            });

            it('should update the value as CalendarDateTime when no date property nor precision is provided', async () => {
                element = await fixtureElement();
                editableSegments = getEditableSegments(element);
                const year = editableSegments.getByType(SegmentTypes.Year);
                const month = editableSegments.getByType(SegmentTypes.Month);
                const day = editableSegments.getByType(SegmentTypes.Day);
                const hour = editableSegments.getByType(SegmentTypes.Hour);
                const minute = editableSegments.getByType(SegmentTypes.Minute);
                hour.focus();
                await sendKeys({ type: '3' });
                await openCalendar(element);

                const calendarValue = new CalendarDate(2022, 5, 15);
                await dispatchCalendarChange(element, calendarValue);

                expectSameDates(element.value!, calendarValue);
                expect(
                    element.value!,
                    'value not an instance of CalendarDateTime'
                ).to.be.instanceOf(CalendarDateTime);

                expect(year.innerText).to.equal('2022');
                expect(month.innerText).to.equal('05');
                expect(day.innerText).to.equal('15');
                expect(hour.innerText).to.equal('03');
                expect(minute.innerText).to.equal('00');
                expect((element.value! as CalendarDateTime).hour).to.equal(3);
                expect((element.value! as CalendarDateTime).minute).to.equal(0);
                expect((element.value! as CalendarDateTime).second).to.equal(0);
            });

            it('should update the value as CalendarDateTime when no date property is provided and precision includes time', async () => {
                element = await fixtureElement({
                    props: { precision: Precisions.Second },
                });
                editableSegments = getEditableSegments(element);
                const year = editableSegments.getByType(SegmentTypes.Year);
                const month = editableSegments.getByType(SegmentTypes.Month);
                const day = editableSegments.getByType(SegmentTypes.Day);
                const hour = editableSegments.getByType(SegmentTypes.Hour);
                const minute = editableSegments.getByType(SegmentTypes.Minute);
                hour.focus();
                await sendKeys({ type: '5' });
                await openCalendar(element);

                const calendarValue = new CalendarDate(2022, 5, 15);
                await dispatchCalendarChange(element, calendarValue);

                expectSameDates(element.value!, calendarValue);
                expect(
                    element.value!,
                    'value not an instance of CalendarDateTime'
                ).to.be.instanceOf(CalendarDateTime);

                expect(year.innerText).to.equal('2022');
                expect(month.innerText).to.equal('05');
                expect(day.innerText).to.equal('15');
                expect(hour.innerText).to.equal('05');
                expect(minute.innerText).to.equal('00');
                expect((element.value! as CalendarDateTime).hour).to.equal(5);
                expect((element.value! as CalendarDateTime).minute).to.equal(0);
                expect((element.value! as CalendarDateTime).second).to.equal(0);
            });
        });
    });

    describe('Focus', () => {
        it('should focus segments by clicking on them', async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);

            await sendMouse({
                type: 'click',
                position: getElementCenter(yearSegment),
            });
            await sendKeys({ press: 'ArrowUp' });

            expectFocused(document, element, 'element not focused');
            expectFocused(element.shadowRoot, yearSegment, 'year not focused');
            expect(yearSegment.innerText).to.equal(`${fixedYear}`);

            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            await sendMouse({
                type: 'click',
                position: getElementCenter(daySegment),
            });
            await sendKeys({ press: 'ArrowUp' });

            expectFocused(document, element, 'element not focused');
            expectFocused(element.shadowRoot, daySegment, 'day not focused');
            expect(daySegment.innerText).to.equal('01');
        });

        it('should focus the first editable segment when the focus method is called', async () => {
            element.focus();
            await elementUpdated(element);

            expectFocused(document, element, 'element not focused');
            expectFocused(element.shadowRoot, element.firstEditableSegment);
        });

        it("should change segment focus to right by using the 'Right Arrow' key", async () => {
            element = await fixtureElement({
                props: { precision: Precisions.Second },
            });
            editableSegments = getEditableSegments(element);
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            element.focus();
            await elementUpdated(element);
            await sendKeyMultipleTimes(
                'ArrowRight',
                editableSegments.length - 1
            );

            expectFocused(element.shadowRoot, dayPeriodSegment);

            await sendKeys({ press: 'ArrowRight' });

            expectFocused(
                element.shadowRoot,
                dayPeriodSegment,
                'dayPeriod no longer focused'
            );
        });

        it("should change segment focus to left by using the 'Left Arrow' key", async () => {
            element = await fixtureElement({
                props: { precision: Precisions.Second },
            });
            editableSegments = getEditableSegments(element);
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            element.focus();
            await elementUpdated(element);
            await sendKeyMultipleTimes(
                'ArrowRight',
                editableSegments.length - 1
            );

            expectFocused(
                element.shadowRoot,
                dayPeriodSegment,
                'dayPeriod not focused'
            );

            await sendKeyMultipleTimes(
                'ArrowLeft',
                editableSegments.length - 1
            );

            expectFocused(
                element.shadowRoot,
                element.firstEditableSegment,
                'first segment not focused'
            );

            await sendKeys({ press: 'ArrowLeft' });

            expectFocused(
                element.shadowRoot,
                element.firstEditableSegment,
                'firstEditableSegment no longer focused'
            );
        });

        it('should change segment focus to left by using the Backspace/Delete key on a placeholder', async () => {
            element = await fixtureElement({
                props: {
                    precision: Precisions.Hour,
                },
            });

            editableSegments = getEditableSegments(element);
            expectPlaceholders(editableSegments);

            const dayPeriod = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );
            await sendMouse({
                type: 'click',
                position: getElementCenter(dayPeriod),
            });

            expectFocused(document, element, 'element not focused');
            expectFocused(
                element.shadowRoot,
                dayPeriod,
                'dayPeriod not focused'
            );

            await sendKeys({ press: 'Backspace' });

            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            expectFocused(element.shadowRoot, hourSegment, 'hour not focused');

            await sendKeys({ press: 'Backspace' });

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            expectFocused(element.shadowRoot, yearSegment, 'year not focused');

            await sendKeys({ press: 'Delete' });

            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            expectFocused(element.shadowRoot, daySegment, 'day not focused');

            await sendKeys({ press: 'Delete' });

            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            expectFocused(
                element.shadowRoot,
                monthSegment,
                'month not focused'
            );

            await sendKeys({ press: 'Delete' });
            expectFocused(
                element.shadowRoot,
                monthSegment,
                'month not focused'
            );
        });

        it("should change focus up to the calendar button by using the 'Tab' key", async () => {
            element.focus();
            await elementUpdated(element);
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );
            const calendarButton = element.shadowRoot!.querySelector(
                'sp-picker-button'
            ) as PickerButton;

            await sendKeyMultipleTimes('Tab', editableSegments.length - 1);

            expectFocused(
                element.shadowRoot,
                dayPeriodSegment,
                'dayPeriod not focused'
            );

            await sendKeys({ press: 'Tab' });

            expectFocused(
                element.shadowRoot,
                calendarButton,
                'calendarButton not focused'
            );
        });
    });

    describe('ArrowUp key', () => {
        beforeEach(async () => {
            element = await fixtureElement({
                props: { precision: Precisions.Second },
            });
            editableSegments = getEditableSegments(element);
        });

        it("should define the year segment's value on ArrowUp key", async () => {
            const segment = editableSegments.getByType(SegmentTypes.Year);

            segment.focus();
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(element);

            expect(segment.innerText).to.equal(`${fixedYear}`);
            expectPlaceholders(editableSegments, [segment]);
            expect(element.value).to.be.undefined;
        });

        it("should increment the year segment's value on ArrowUp key", async () => {
            const segment = editableSegments.getByType(SegmentTypes.Year);

            segment.focus();
            await sendKeys({ press: 'ArrowUp' });
            await sendKeys({ press: 'ArrowUp' });
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(element);

            expect(segment.innerText).to.equal(`${fixedYear + 2}`);
            expectPlaceholders(editableSegments, [segment]);
            expect(element.value).to.be.undefined;
        });

        [SegmentTypes.Month, SegmentTypes.Day].forEach((segmentType) => {
            it(`should define the ${segmentType} segment's value on ArrowUp key`, async () => {
                const segment = editableSegments.getByType(
                    segmentType as EditableSegmentType
                );

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`01`);
                expectPlaceholders(editableSegments, [segment]);
                expect(element.value).to.be.undefined;
            });

            it(`should increment the ${segmentType} segment's value on ArrowUp key`, async () => {
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
                expect(element.value).to.be.undefined;
            });
        });

        [SegmentTypes.Minute, SegmentTypes.Second].forEach((segmentType) => {
            it(`should define the ${segmentType} segment's value on ArrowUp key`, async () => {
                const segment = editableSegments.getByType(
                    segmentType as EditableSegmentType
                );

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`00`);
                expectPlaceholders(editableSegments, [segment]);
                expect(element.value).to.be.undefined;
            });

            it(`should increment the ${segmentType} segment's value on ArrowUp key`, async () => {
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
                expect(element.value).to.be.undefined;
            });
        });

        describe('12h format', () => {
            it("should define the hour segment's value on ArrowUp key", async () => {
                const hourSegment = editableSegments.getByType(
                    SegmentTypes.Hour
                );

                hourSegment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(hourSegment.innerText).to.equal(`12`); // as 12AM is 00:00
                expectPlaceholders(editableSegments, [hourSegment]);
                expect(element.value).to.be.undefined;
            });

            it("should increment the hour segment's value on ArrowUp key", async () => {
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
                expect(element.value).to.be.undefined;
            });

            it('should reset the hour when the max is reached on ArrowUp key', async () => {
                const hourSegment = editableSegments.getByType(
                    SegmentTypes.Hour
                );

                hourSegment.focus();
                await sendKeyMultipleTimes('ArrowUp', 13);
                await elementUpdated(element);

                expect(hourSegment.innerText).to.equal(`12`);
                expectPlaceholders(editableSegments, [hourSegment]);
                expect(element.value).to.be.undefined;
            });

            it("should define the dayPeriod segment's value on ArrowUp key", async () => {
                const dayPeriodSegment = editableSegments.getByType(
                    SegmentTypes.DayPeriod
                );

                dayPeriodSegment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(dayPeriodSegment.innerText).to.equal(`AM`);
                expectPlaceholders(editableSegments, [dayPeriodSegment]);
                expect(element.value).to.be.undefined;
            });

            it("should toggle the dayPeriod segment's value on ArrowUp key", async () => {
                const dayPeriodSegment = editableSegments.getByType(
                    SegmentTypes.DayPeriod
                );

                dayPeriodSegment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(dayPeriodSegment.innerText).to.equal(`PM`);
                expectPlaceholders(editableSegments, [dayPeriodSegment]);
                expect(element.value).to.be.undefined;
            });
        });

        describe('24h format', () => {
            let hourSegment: HTMLElement;

            beforeEach(async () => {
                element = await fixtureElement({ locale: 'en-GB' });
                await elementUpdated(element);

                editableSegments = getEditableSegments(element);
                hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            });

            it("should define the hour segment's value on ArrowUp key", async () => {
                hourSegment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(hourSegment.innerText).to.equal(`00`);
                expectPlaceholders(editableSegments, [hourSegment]);
                expect(element.value).to.be.undefined;
            });

            it("should increment the hour segment's value on ArrowUp key", async () => {
                hourSegment.focus();
                await sendKeyMultipleTimes('ArrowUp', 14);
                await elementUpdated(element);

                expect(hourSegment.innerText).to.equal(`13`);
                expectPlaceholders(editableSegments, [hourSegment]);
                expect(element.value).to.be.undefined;
            });

            it('should reset the hour when the max is reached on ArrowUp key', async () => {
                hourSegment.focus();
                await sendKeyMultipleTimes('ArrowUp', 25);
                await elementUpdated(element);

                expect(hourSegment.innerText).to.equal(`00`);
                expectPlaceholders(editableSegments, [hourSegment]);
                expect(element.value).to.be.undefined;
            });
        });

        describe('day segment updates', () => {
            let daySegment: HTMLElement;
            let monthSegment: HTMLElement;
            let yearSegment: HTMLElement;
            let initialDateNow: () => number;

            before(() => {
                initialDateNow = Date.now;
                const today = new Date();
                today.setFullYear(2022);
                Date.now = () => today.getTime();
            });

            beforeEach(async () => {
                element = await fixtureElement({
                    props: { precision: Precisions.Day },
                });
                editableSegments = getEditableSegments(element);

                daySegment = editableSegments.getByType(SegmentTypes.Day);
                monthSegment = editableSegments.getByType(SegmentTypes.Month);
                yearSegment = editableSegments.getByType(SegmentTypes.Year);

                daySegment.focus();
                await sendKeys({ press: 'ArrowDown' });
            });

            after(() => {
                Date.now = initialDateNow;
            });

            it('when the month changes to February on ArrowUp key, with no year selected', async () => {
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
                expect(element.value).to.be.undefined;
            });

            it('when the month changes to February on ArrowUp key, in a common year', async () => {
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
                expectSameDates(element.value!, new CalendarDate(2022, 2, 28));
            });

            it('when the month changes to February on ArrowUp key, in a leap year', async () => {
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
                expectSameDates(element.value!, new CalendarDate(2024, 2, 29));
            });

            it('when the year changes to a leap year on ArrowUp key, and the month is February', async () => {
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
                expectSameDates(element.value!, new CalendarDate(2024, 2, 28));
            });
        });

        describe("segment's value resets to minimum", () => {
            let value: CalendarDateTime;

            before(() => {
                value = valueDateTime;
            });

            it('when the max year is reached on a defined date value', async () => {
                element = await fixtureElement({
                    props: {
                        value,
                    },
                });
                editableSegments = getEditableSegments(element);

                const max = value.calendar.getYearsInEra(value);
                element.value = value.set({ year: max });
                await elementUpdated(element);
                const segment = editableSegments.getByType(SegmentTypes.Year);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal('1');
                expectSameDates(element.value!, value.set({ year: 1 }));
            });

            it('when the max month is reached', async () => {
                const segment = editableSegments.getByType(SegmentTypes.Month);

                segment.focus();
                await sendKeyMultipleTimes('ArrowUp', 12 + 1);
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`01`);
                expectPlaceholders(editableSegments, [segment]);
                expect(element.value).to.be.undefined;
            });

            it('when the max month is reached on a defined date value', async () => {
                element = await fixtureElement({
                    props: {
                        value,
                    },
                });
                editableSegments = getEditableSegments(element);

                const max = value.calendar.getMonthsInYear(value);
                element.value = value.set({ month: max });
                await elementUpdated(element);
                const segment = editableSegments.getByType(SegmentTypes.Month);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal('01');
                expectSameDates(element.value!, value.set({ month: 1 }));
            });

            it('when the max day is reached with no month/year defined', async () => {
                const segment = editableSegments.getByType(SegmentTypes.Day);

                segment.focus();
                await sendKeyMultipleTimes('ArrowUp', 31 + 1);
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`01`);
                expectPlaceholders(editableSegments, [segment]);
                expect(element.value).to.be.undefined;
            });

            it('when the max day is reached in February with no year defined', async () => {
                const daySegment = editableSegments.getByType(SegmentTypes.Day);
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
                expect(element.value).to.be.undefined;
            });

            it('when the max day is reached on a defined date value - month with 31 days', async () => {
                value = new CalendarDateTime(2024, 3, 15, 15, 15, 15);
                element = await fixtureElement({
                    props: {
                        value,
                    },
                });
                editableSegments = getEditableSegments(element);

                element.value = value.set({ day: 31 });
                await elementUpdated(element);
                const segment = editableSegments.getByType(SegmentTypes.Day);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal('01');
                expectSameDates(element.value!, value.set({ day: 1 }));
            });

            it('when the max day is reached on a defined date value - common year February', async () => {
                const commonYear = 2022;
                value = new CalendarDateTime(commonYear, 2, 15, 15, 15, 15);
                element = await fixtureElement({
                    props: {
                        value,
                    },
                });
                editableSegments = getEditableSegments(element);

                element.value = value.set({ day: 28 });
                await elementUpdated(element);
                const segment = editableSegments.getByType(SegmentTypes.Day);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal('01');
                expectSameDates(element.value!, value.set({ day: 1 }));
            });

            it('when the max day is reached on a defined date value - leap year February', async () => {
                const leapYear = 2024;
                value = new CalendarDateTime(leapYear, 2, 15, 15, 15, 15);
                element = await fixtureElement({
                    props: {
                        value,
                    },
                });
                editableSegments = getEditableSegments(element);

                element.value = value.set({ day: 29 });
                await elementUpdated(element);
                const segment = editableSegments.getByType(SegmentTypes.Day);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal('01');
                expectSameDates(element.value!, value.set({ day: 1 }));
            });

            [SegmentTypes.Minute, SegmentTypes.Second].forEach(
                (segmentType) => {
                    it(`when the max ${segmentType} is reached on a defined date value`, async () => {
                        element = await fixtureElement({
                            props: {
                                value,
                                precision: Precisions.Second,
                            },
                        });
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
                        expectSameDates(
                            element.value!,
                            value.set({ [segmentType]: 1 })
                        );
                    });
                }
            );
        });
    });

    describe('ArrowDown key', () => {
        beforeEach(async () => {
            element = await fixtureElement({
                props: { precision: Precisions.Second },
            });
            editableSegments = getEditableSegments(element);
        });

        it("should define the year segment's value on ArrowDown key", async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);

            yearSegment.focus();
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(element);

            expect(yearSegment.innerText).to.equal(`${fixedYear}`);
            expectPlaceholders(editableSegments, [yearSegment]);
            expect(element.value).to.be.undefined;
        });

        it("should decrement the year segment's value on ArrowDown key", async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);

            yearSegment.focus();
            await sendKeys({ press: 'ArrowDown' });
            await sendKeys({ press: 'ArrowDown' });
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(element);

            expect(yearSegment.innerText).to.equal(`${fixedYear - 2}`);
            expectPlaceholders(editableSegments, [yearSegment]);
            expect(element.value).to.be.undefined;
        });

        it(`should define the month segment's value on ArrowDown key`, async () => {
            const segment = editableSegments.getByType(SegmentTypes.Month);

            segment.focus();
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(element);

            expect(segment.innerText).to.equal(`12`);
            expectPlaceholders(editableSegments, [segment]);
            expect(element.value).to.be.undefined;
        });

        it(`should decrement the month segment's value on ArrowDown key`, async () => {
            const segment = editableSegments.getByType(SegmentTypes.Month);

            segment.focus();
            await sendKeys({ press: 'ArrowDown' });
            await sendKeys({ press: 'ArrowDown' });
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(element);

            expect(segment.innerText).to.equal(`10`);
            expectPlaceholders(editableSegments, [segment]);
            expect(element.value).to.be.undefined;
        });

        it(`should define the day segment's value on ArrowDown key`, async () => {
            const segment = editableSegments.getByType(SegmentTypes.Day);

            segment.focus();
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(element);

            expect(segment.innerText).to.equal(`31`);
            expectPlaceholders(editableSegments, [segment]);
            expect(element.value).to.be.undefined;
        });

        it(`should decrement the day segment's value on ArrowDown key`, async () => {
            const segment = editableSegments.getByType(SegmentTypes.Day);

            segment.focus();
            await sendKeys({ press: 'ArrowDown' });
            await sendKeys({ press: 'ArrowDown' });
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(element);

            expect(segment.innerText).to.equal(`29`);
            expectPlaceholders(editableSegments, [segment]);
            expect(element.value).to.be.undefined;
        });

        [SegmentTypes.Minute, SegmentTypes.Second].forEach((segmentType) => {
            it(`should define the ${segmentType} segment's value on ArrowDown key`, async () => {
                const segment = editableSegments.getByType(
                    segmentType as EditableSegmentType
                );

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`59`);
                expectPlaceholders(editableSegments, [segment]);
                expect(element.value).to.be.undefined;
            });

            it(`should decrement the ${segmentType} segment's value on ArrowDown key`, async () => {
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
                expect(element.value).to.be.undefined;
            });
        });

        describe('12h format', () => {
            let hourSegment: HTMLElement;
            let dayPeriodSegment: HTMLElement;

            beforeEach(async () => {
                hourSegment = editableSegments.getByType(SegmentTypes.Hour);
                dayPeriodSegment = editableSegments.getByType(
                    SegmentTypes.DayPeriod
                );
            });

            it("should define the hour segment's value on ArrowDown key", async () => {
                hourSegment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(hourSegment.innerText).to.equal(`11`);
                expectPlaceholders(editableSegments, [hourSegment]);
                expect(element.value).to.be.undefined;
            });

            it("should decrement the hour segment's value on ArrowDown key", async () => {
                hourSegment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(hourSegment.innerText).to.equal(`09`);
                expectPlaceholders(editableSegments, [hourSegment]);
                expect(element.value).to.be.undefined;
            });

            it('should reset the hour when the min is reached on ArrowDown key', async () => {
                hourSegment.focus();
                await sendKeyMultipleTimes('ArrowDown', 13);
                await elementUpdated(element);

                expect(hourSegment.innerText).to.equal(`11`);
                expectPlaceholders(editableSegments, [hourSegment]);
                expect(element.value).to.be.undefined;
            });

            it("should define the dayPeriod segment's value on ArrowDown key", async () => {
                dayPeriodSegment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(dayPeriodSegment.innerText).to.equal(`PM`);
                expectPlaceholders(editableSegments, [dayPeriodSegment]);
                expect(element.value).to.be.undefined;
            });

            it("toggling the dayPeriod segment's value on ArrowDown key", async () => {
                dayPeriodSegment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(dayPeriodSegment.innerText).to.equal(`AM`);
                expectPlaceholders(editableSegments, [dayPeriodSegment]);
                expect(element.value).to.be.undefined;
            });
        });

        describe('24h format', () => {
            let hourSegment: HTMLElement;

            beforeEach(async () => {
                element = await fixtureElement({ locale: 'en-GB' });
                editableSegments = getEditableSegments(element);
                hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            });

            it("should define the hour segment's value", async () => {
                hourSegment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(hourSegment.innerText).to.equal(`23`);
                expectPlaceholders(editableSegments, [hourSegment]);
                expect(element.value).to.be.undefined;
            });

            it("should decrement the hour segment's value", async () => {
                hourSegment.focus();
                await sendKeyMultipleTimes('ArrowDown', 15);
                await elementUpdated(element);

                expect(hourSegment.innerText).to.equal(`09`);
                expectPlaceholders(editableSegments, [hourSegment]);
                expect(element.value).to.be.undefined;
            });

            it('should reset the hour when the min is reached', async () => {
                hourSegment.focus();
                await sendKeyMultipleTimes('ArrowDown', 25);
                await elementUpdated(element);

                expect(hourSegment.innerText).to.equal(`23`);
                expectPlaceholders(editableSegments, [hourSegment]);
                expect(element.value).to.be.undefined;
            });
        });

        describe('day segment updates', () => {
            let daySegment: HTMLElement;
            let monthSegment: HTMLElement;
            let yearSegment: HTMLElement;
            let initialDateNow: () => number;

            before(() => {
                initialDateNow = Date.now;
                const today = new Date();
                today.setFullYear(2022);
                Date.now = () => today.getTime();
            });

            beforeEach(async () => {
                element = await fixtureElement({
                    props: { precision: Precisions.Day },
                });
                editableSegments = getEditableSegments(element);
                daySegment = editableSegments.getByType(SegmentTypes.Day);
                monthSegment = editableSegments.getByType(SegmentTypes.Month);
                yearSegment = editableSegments.getByType(SegmentTypes.Year);

                daySegment.focus();
                await sendKeys({ press: 'ArrowDown' });
            });

            after(() => {
                Date.now = initialDateNow;
            });

            it('when the month changes to February on ArrowDown key, with no year selected', async () => {
                monthSegment.focus();
                await sendKeyMultipleTimes('ArrowDown', 11);
                await elementUpdated(element);

                expect(monthSegment.innerText).to.equal(`02`);
                expect(daySegment.innerText).to.equal(`29`);
                expectPlaceholders(editableSegments, [
                    daySegment,
                    monthSegment,
                ]);
                expect(element.value).to.be.undefined;
            });

            it('when the month changes to February on ArrowDown key, in a common year', async () => {
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
                expectSameDates(element.value!, new CalendarDate(2022, 2, 28));
            });

            it('when the month changes to February on ArrowDown key, in a leap year', async () => {
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
                expectSameDates(element.value!, new CalendarDate(2024, 2, 29));
            });

            it('when the year changes to a leap year on ArrowDown key, and the month is February', async () => {
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
                expectSameDates(element.value!, new CalendarDate(2024, 2, 28));
            });
        });

        describe("segment's value resets to maximum ", () => {
            let value: CalendarDateTime;

            before(() => {
                value = valueDateTime;
            });

            it('when the min year is reached on a defined date value', async () => {
                element = await fixtureElement({
                    props: {
                        value,
                    },
                });
                editableSegments = getEditableSegments(element);

                const max = value.calendar.getYearsInEra(value);
                element.value = value.set({ year: 1 });
                await elementUpdated(element);
                const segment = editableSegments.getByType(SegmentTypes.Year);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`${max}`);
                expectSameDates(element.value!, value.set({ year: max }));
            });

            it('when the min month is reached', async () => {
                const segment = editableSegments.getByType(SegmentTypes.Month);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`12`);
                expectPlaceholders(editableSegments, [segment]);
                expect(element.value).to.be.undefined;
            });

            it('when the min month is reached on a defined date value', async () => {
                element = await fixtureElement({
                    props: {
                        value,
                    },
                });
                editableSegments = getEditableSegments(element);

                const max = value.calendar.getMonthsInYear(value);
                element.value = value.set({ month: 1 });
                await elementUpdated(element);
                const segment = editableSegments.getByType(SegmentTypes.Month);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`${max}`);
                expectSameDates(element.value!, value.set({ month: max }));
            });

            it('when the min day is reached with no month/year defined', async () => {
                const segment = editableSegments.getByType(SegmentTypes.Day);

                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal(`31`);
                expectPlaceholders(editableSegments, [segment]);
                expect(element.value).to.be.undefined;
            });

            it('when the min day is reached in February with no year defined', async () => {
                const daySegment = editableSegments.getByType(SegmentTypes.Day);
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
                expect(element.value).to.be.undefined;
            });

            it('when the min day is reached on a defined date value - month with 31 days', async () => {
                value = new CalendarDateTime(2024, 3, 15, 15, 15, 15);
                element = await fixtureElement({
                    props: {
                        value,
                    },
                });
                editableSegments = getEditableSegments(element);

                element.value = value.set({ day: 1 });
                await elementUpdated(element);
                const segment = editableSegments.getByType(SegmentTypes.Day);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal('31');
                expectSameDates(element.value!, value.set({ day: 31 }));
            });

            it('when the min day is reached on a defined date value - common year February', async () => {
                const commonYear = 2022;
                value = new CalendarDateTime(commonYear, 2, 15, 15, 15, 15);
                element = await fixtureElement({
                    props: {
                        value,
                    },
                });
                editableSegments = getEditableSegments(element);

                element.value = value.set({ day: 1 });
                await elementUpdated(element);
                const segment = editableSegments.getByType(SegmentTypes.Day);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal('28');
                expectSameDates(element.value!, value.set({ day: 28 }));
            });

            it('when the min day is reached on a defined date value - leap year February', async () => {
                const leapYear = 2024;
                value = new CalendarDateTime(leapYear, 2, 15, 15, 15, 15);
                element = await fixtureElement({
                    props: {
                        value,
                    },
                });
                editableSegments = getEditableSegments(element);

                element.value = value.set({ day: 1 });
                await elementUpdated(element);
                const segment = editableSegments.getByType(SegmentTypes.Day);

                segment.focus();
                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);

                expect(segment.innerText).to.equal('29');
                expectSameDates(element.value!, value.set({ day: 29 }));
            });

            [SegmentTypes.Minute, SegmentTypes.Second].forEach(
                (segmentType) => {
                    it(`when the min ${segmentType} is reached on a defined date value`, async () => {
                        element = await fixtureElement({
                            props: {
                                value,
                                precision: Precisions.Second,
                            },
                        });
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
                        expectSameDates(
                            element.value!,
                            value.set({ [segmentType]: 59 })
                        );
                    });
                }
            );
        });
    });

    describe('Typed-in values', () => {
        beforeEach(async () => {
            element = await fixtureElement({
                props: { precision: Precisions.Second },
            });
            editableSegments = getEditableSegments(element);
        });

        [SegmentTypes.Year, SegmentTypes.Month, SegmentTypes.Day].forEach(
            (segmentType) => {
                it(`should ignore initial zeros typed in the ${segmentType} segment`, async () => {
                    const segment = editableSegments.getByType(
                        segmentType as EditableSegmentType
                    );

                    segment.focus();
                    await sendKeys({ type: '0' });
                    await elementUpdated(element);

                    expectPlaceholders(editableSegments);
                    expect(element.value).to.be.undefined;
                });
            }
        );

        it('should update the year segment on type-in', async () => {
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
            expect(segment.innerText).to.equal('5');

            expectPlaceholders(editableSegments, [segment]);
            expect(element.value).to.be.undefined;
        });

        it('should update the month segment on type-in', async () => {
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
            expect(element.value).to.be.undefined;
        });

        it('should update the day segment on type-in when no month/year is defined', async () => {
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
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
            expect(element.value).to.be.undefined;
        });

        it('should not update the day segment when the typed in value is 31, 30 or 29 - common year February', async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            yearSegment.focus();
            await sendKeys({ type: '2022' }); // Common year in the Gregorian calendar
            await elementUpdated(element);
            monthSegment.focus();
            await sendKeys({ type: '2' });
            await elementUpdated(element);
            daySegment.focus();

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
            expect(element.value).to.be.undefined;
        });

        it('should update the day segment when the typed in value is 28 - common year February', async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            yearSegment.focus();
            await sendKeys({ type: '2022' }); // Common year in the Gregorian calendar
            await elementUpdated(element);
            monthSegment.focus();
            await sendKeys({ type: '2' });
            await elementUpdated(element);
            daySegment.focus();

            // Tries to set the day to 28
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
            expect(element.value).to.be.undefined;
        });

        it('should not update the day segment when the typed in value is 31 or 30 - leap year February', async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            yearSegment.focus();
            await sendKeys({ type: '2024' }); // Leap year in the Gregorian calendar
            await elementUpdated(element);
            monthSegment.focus();
            await sendKeys({ type: '2' });
            await elementUpdated(element);
            daySegment.focus();

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

            expectPlaceholders(editableSegments, [
                daySegment,
                monthSegment,
                yearSegment,
            ]);
            expect(element.value).to.be.undefined;
        });

        it('should update the day segment when the typed in value is 29 or 28 - leap year February', async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            yearSegment.focus();
            await sendKeys({ type: '2024' }); // Leap year in the Gregorian calendar
            await elementUpdated(element);
            monthSegment.focus();
            await sendKeys({ type: '2' });
            await elementUpdated(element);
            daySegment.focus();

            // Tries to set the day to 29
            await sendKeys({ type: '2' });
            await elementUpdated(element);
            expect(daySegment.innerText).to.equal('02');
            await sendKeys({ type: '9' });
            await elementUpdated(element);
            expect(daySegment.innerText).to.equal('29');

            // Tries to set the day to 28
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
            expect(element.value).to.be.undefined;
        });

        it('should update the hour segment on type-in on a 12h format', async () => {
            const segment = editableSegments.getByType(SegmentTypes.Hour);

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
            expect(element.value).to.be.undefined;
        });

        it('should update the dayPeriod segment on type-in on a 12h format', async () => {
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            dayPeriodSegment.focus();
            await sendKeys({ type: 'A' });
            await elementUpdated(element);

            expect(dayPeriodSegment.innerText).to.equal(`AM`);
            expectPlaceholders(editableSegments, [dayPeriodSegment]);
            expect(element.value).to.be.undefined;

            await sendKeys({ type: 'P' });
            await elementUpdated(element);

            expect(dayPeriodSegment.innerText).to.equal(`PM`);
            expectPlaceholders(editableSegments, [dayPeriodSegment]);
            expect(element.value).to.be.undefined;
        });

        it('should update the hour segment on type-in on a 24h format', async () => {
            element = await fixtureElement({ locale: 'en-GB' });
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
            expect(segment.innerText).to.equal('03');
            await sendKeys({ type: '5' });
            await elementUpdated(element);
            expect(segment.innerText).to.equal('05');
            await sendKeys({ type: '0' });
            await elementUpdated(element);
            expect(segment.innerText).to.equal('00');

            expectPlaceholders(editableSegments, [segment]);
            expect(element.value).to.be.undefined;
        });

        [SegmentTypes.Minute, SegmentTypes.Second].forEach((segmentType) => {
            it(`should update the ${segmentType} segment on type-in`, async () => {
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
                expect(element.value).to.be.undefined;
            });
        });

        describe('day segment updates', () => {
            let yearSegment: HTMLElement;
            let monthSegment: HTMLElement;
            let daySegment: HTMLElement;

            beforeEach(async () => {
                element = await fixtureElement({
                    props: { precision: Precisions.Day },
                });
                editableSegments = getEditableSegments(element);

                yearSegment = editableSegments.getByType(SegmentTypes.Year);
                monthSegment = editableSegments.getByType(SegmentTypes.Month);
                daySegment = editableSegments.getByType(SegmentTypes.Day);

                daySegment.focus();
                await sendKeys({ type: '31' });
                await elementUpdated(element);
            });

            it('when the month changes to February on type-in, with no year selected', async () => {
                monthSegment.focus();
                await sendKeys({ type: '2' });
                await elementUpdated(element);

                expect(monthSegment.innerText).to.equal('02');
                expect(daySegment.innerText).to.equal('29');

                expectPlaceholders(editableSegments, [
                    daySegment,
                    monthSegment,
                ]);
                expect(element.value).to.be.undefined;
            });

            it('when the month changes to February on type-in, in a common year', async () => {
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
                expectSameDates(element.value!, new CalendarDate(2022, 2, 28));
            });

            it('when the month changes to February on type-in, in a leap year', async () => {
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
                expectSameDates(element.value!, new CalendarDate(2024, 2, 29));
            });

            it('when the year changes to a leap year on type-in, and the month is February', async () => {
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
                expectSameDates(element.value!, new CalendarDate(4, 2, 29));
            });
        });
    });

    describe("Segments' value deletion", () => {
        const day = 15;
        const month = 11;
        const hour = 15;
        const minute = 15;
        const second = 15;

        beforeEach(async () => {
            const value = new CalendarDateTime(
                2022,
                month,
                day,
                hour,
                minute,
                second
            );
            element = await fixtureElement({
                props: {
                    value,
                    precision: Precisions.Second,
                },
            });
            editableSegments = getEditableSegments(element);
        });

        it("should delete the year segment's value using incremental deletion", async () => {
            const segment = editableSegments.getByType(SegmentTypes.Year);

            segment.focus();
            await sendKeys({ press: 'Delete' });
            await elementUpdated(element);
            expect(segment.innerText).to.equal(`202`);
            expectSameDates(
                element.value!,
                new CalendarDateTime(202, month, day, hour, minute, second)
            );

            await sendKeys({ press: 'Delete' });
            await elementUpdated(element);
            expect(segment.innerText).to.equal(`20`);
            expectSameDates(
                element.value!,
                new CalendarDateTime(20, month, day, hour, minute, second)
            );

            await sendKeys({ press: 'Backspace' });
            await elementUpdated(element);
            expect(segment.innerText).to.equal(`2`);
            expectSameDates(
                element.value!,
                new CalendarDateTime(2, month, day, hour, minute, second)
            );

            await sendKeys({ press: 'Backspace' });
            await elementUpdated(element);

            expectPlaceholder(segment);
            expect(element.value).to.be.undefined;
        });

        [
            SegmentTypes.Month,
            SegmentTypes.Day,
            SegmentTypes.Hour,
            SegmentTypes.Minute,
            SegmentTypes.Second,
            SegmentTypes.DayPeriod,
        ].forEach((segmentType) => {
            it(`should delete the ${segmentType} segment's value using mass deletion`, async () => {
                const segment = editableSegments.getByType(
                    segmentType as EditableSegmentType
                );

                segment.focus();
                await sendKeys({ press: 'Delete' });
                await elementUpdated(element);

                expectPlaceholder(segment);
                expect(element.value).to.be.undefined;
            });
        });
    });

    describe('Dispatched events', () => {
        let changeSpy: sinon.SinonSpy;
        let inputSpy: sinon.SinonSpy;

        beforeEach(() => {
            changeSpy = spy();
            inputSpy = spy();
        });

        it("should dispatch 'change' when all segments have a value for the first time", async () => {
            element = await fixtureElement({
                props: { precision: Precisions.Second },
            });
            element.addEventListener('change', changeSpy);
            editableSegments = getEditableSegments(element);

            expect(element.value).to.be.undefined;

            while (editableSegments.length > 0) {
                const segment = editableSegments.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
            }

            expect(changeSpy.callCount).to.equal(1);
        });

        it("should dispatch 'change' when the value changes are committed using Space", async () => {
            element = await fixtureElement({ props: { value: valueDateTime } });
            element.addEventListener('change', changeSpy);
            editableSegments = getEditableSegments(element);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            monthSegment.focus();
            await sendKeys({ press: 'ArrowUp' });
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(element);
            daySegment.focus();
            await sendKeys({ type: '21' });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(0);

            await sendKeys({ press: 'Space' });
            await elementUpdated(element);
            expect(changeSpy.callCount).to.equal(1);
        });

        it("should dispatch 'change' when the value changes are committed using Enter", async () => {
            element = await fixtureElement({ props: { value: valueDateTime } });
            element.addEventListener('change', changeSpy);
            editableSegments = getEditableSegments(element);
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            yearSegment.focus();
            await sendKeys({ press: 'ArrowUp' });
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(element);
            daySegment.focus();
            await sendKeys({ type: '21' });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(0);

            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);
            expect(changeSpy.callCount).to.equal(1);
        });

        it("should dispatch 'change' when the value changes are committed on blur", async () => {
            element = await fixtureElement({ props: { value: valueDateTime } });
            element.addEventListener('change', changeSpy);
            editableSegments = getEditableSegments(element);
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const month = editableSegments.getByType(SegmentTypes.Month);

            yearSegment.focus();
            await sendKeys({ press: 'ArrowUp' });
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(element);
            month.focus();
            await sendKeys({ type: '11' });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(0);

            await sendMouse({
                type: 'click',
                position: [0, 0],
            });

            expect(changeSpy.callCount).to.equal(1);
        });

        it("should dispatch 'change' when the value changes to undefined due to a segment deletion", async () => {
            element = await fixtureElement({ props: { value: valueDate } });
            element.addEventListener('change', changeSpy);
            editableSegments = getEditableSegments(element);
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            yearSegment.focus();
            await sendKeyMultipleTimes('Delete', yearSegment.innerText.length);
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(1);
            changeSpy.resetHistory();

            monthSegment.focus();
            await sendKeys({ press: 'Delete' });
            await elementUpdated(element);

            daySegment.focus();
            await sendKeys({ press: 'Delete' });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(0);
        });

        it('should dispatch change when the value is changed using the calendar', async () => {
            element = await fixtureElement({
                props: { value: valueDateTime },
            });
            element.addEventListener('change', changeSpy);
            editableSegments = getEditableSegments(element);
            await openCalendar(element);

            const calendarValue = valueDateTime.set({
                day: valueDateTime.day + 1,
            });
            await dispatchCalendarChange(element, calendarValue);

            expect(changeSpy.callCount).to.equal(1);
        });

        it("should not dispatch 'change' if the committed value is the same", async () => {
            element = await fixtureElement({ props: { value: valueDateTime } });
            element.addEventListener('change', changeSpy);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            yearSegment.focus();
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(0);

            await sendKeys({ press: 'Space' });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(0);

            await sendMouse({
                type: 'click',
                position: [0, 0],
            });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(0);
        });

        it("should not dispatch 'change' if not all segments have a value defined", async () => {
            element.addEventListener('change', changeSpy);
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            yearSegment.focus();
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(element);
            daySegment.focus();
            await sendKeys({ type: '1' });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(0);

            await sendKeys({ press: 'Space' });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(0);

            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(0);

            await sendMouse({
                type: 'click',
                position: [0, 0],
            });
            await elementUpdated(element);

            expect(changeSpy.callCount).to.equal(0);
        });

        it(`should dispatch 'input' when the segments change through typing on an existing value`, async () => {
            element = await fixtureElement({
                props: {
                    precision: Precisions.Second,
                    value: new CalendarDateTime(1010, 10, 15, 12, 10, 10),
                },
            });
            element.addEventListener('input', inputSpy);
            editableSegments = getEditableSegments(element);
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            const secondSegment = editableSegments.getByType(
                SegmentTypes.Second
            );
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            yearSegment.focus();
            await sendKeys({ type: '2021' });
            await elementUpdated(element);
            expect(inputSpy.callCount).to.equal(4);

            inputSpy.resetHistory();
            monthSegment.focus();
            await sendKeys({ type: '2' });
            await elementUpdated(element);

            expect(inputSpy.callCount).to.equal(1);

            inputSpy.resetHistory();
            hourSegment.focus();
            await sendKeys({ type: '10' });
            await elementUpdated(element);
            expect(inputSpy.callCount).to.equal(2);

            inputSpy.resetHistory();
            secondSegment.focus();
            await sendKeys({ type: '323' });
            await elementUpdated(element);
            expect(inputSpy.callCount).to.equal(3);

            inputSpy.resetHistory();
            dayPeriodSegment.focus();
            await sendKeys({ type: 'A' });
            await elementUpdated(element);
            await sendKeys({ type: 'P' });
            await elementUpdated(element);

            expect(inputSpy.callCount).to.equal(2);
        });

        [
            SegmentTypes.Year,
            SegmentTypes.Month,
            SegmentTypes.Day,
            SegmentTypes.Hour,
            SegmentTypes.Minute,
            SegmentTypes.Second,
        ].forEach((segmentType) =>
            it(`should dispatch 'input' when the ${segmentType} segment changes through typing on an empty value`, async () => {
                element = await fixtureElement({
                    props: { precision: Precisions.Second },
                });
                element.addEventListener('input', inputSpy);
                editableSegments = getEditableSegments(element);
                const segment = editableSegments.getByType(segmentType);

                segment.focus();
                await sendKeys({ type: '1012' });
                await elementUpdated(element);

                expect(inputSpy.callCount).to.equal(4);

                inputSpy.resetHistory();
                await sendKeys({ type: '3' });
                await elementUpdated(element);

                expect(inputSpy.callCount).to.equal(1);
            })
        );

        it(`should dispatch 'input' when the dayPeriod segment changes through typing on an empty value`, async () => {
            element = await fixtureElement({
                props: { precision: Precisions.Second },
            });
            element.addEventListener('input', inputSpy);
            editableSegments = getEditableSegments(element);
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            dayPeriodSegment.focus();
            await sendKeys({ type: 'A' });
            await elementUpdated(element);

            expect(inputSpy.callCount).to.equal(1);

            inputSpy.resetHistory();
            await sendKeys({ type: 'P' });
            await elementUpdated(element);

            expect(inputSpy.callCount).to.equal(1);
        });

        it("should dispatch 'input' when a segment changes through incrementing/decrementing on an existing value", async () => {
            element = await fixtureElement({
                props: {
                    precision: Precisions.Second,
                    valueDate: valueDateTime,
                },
            });
            element.addEventListener('input', inputSpy);
            editableSegments = getEditableSegments(element);

            expect(element.value).to.be.undefined;

            let editableSegmentsCopy = [...editableSegments];
            while (editableSegmentsCopy.length > 0) {
                const segment = editableSegmentsCopy.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
                expect(inputSpy.callCount).to.equal(1);
                inputSpy.resetHistory();
            }

            editableSegmentsCopy = [...editableSegments];
            while (editableSegmentsCopy.length > 0) {
                const segment = editableSegmentsCopy.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);
                expect(inputSpy.callCount).to.equal(1);
                inputSpy.resetHistory();
            }
        });

        it("should dispatch 'input' when a segment changes through incrementing/decrementing on an empty value", async () => {
            element = await fixtureElement({
                props: {
                    precision: Precisions.Second,
                },
            });
            element.addEventListener('input', inputSpy);
            editableSegments = getEditableSegments(element);

            expect(element.value).to.be.undefined;

            let editableSegmentsCopy = [...editableSegments];
            while (editableSegmentsCopy.length > 0) {
                const segment = editableSegmentsCopy.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
                expect(inputSpy.callCount).to.equal(1);
                inputSpy.resetHistory();
            }

            editableSegmentsCopy = [...editableSegments];
            while (editableSegmentsCopy.length > 0) {
                const segment = editableSegmentsCopy.shift()!;
                segment.focus();

                await sendKeys({ press: 'ArrowDown' });
                await elementUpdated(element);
                expect(inputSpy.callCount).to.equal(1);
                inputSpy.resetHistory();
            }
        });

        it("should dispatch 'input' when the year segment is being deleted", async () => {
            element = await fixtureElement({
                props: { value: valueDateTime },
            });
            element.addEventListener('input', inputSpy);
            editableSegments = getEditableSegments(element);
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const digits = Math.floor(Math.log10(valueDateTime.year)) + 1;

            yearSegment.focus();
            await sendKeyMultipleTimes('Delete', digits);
            await elementUpdated(element);

            expect(inputSpy.callCount).to.equal(digits);

            inputSpy.resetHistory();
            await sendKeys({ press: 'Delete' });
            await elementUpdated(element);

            expect(inputSpy.callCount).to.equal(0);
        });

        [
            SegmentTypes.Month,
            SegmentTypes.Day,
            SegmentTypes.Hour,
            SegmentTypes.Minute,
            SegmentTypes.Second,
            SegmentTypes.DayPeriod,
        ].forEach((segmentType) =>
            it(`should dispatch 'input' when the ${segmentType} segment is deleted`, async () => {
                element = await fixtureElement({
                    props: {
                        value: valueDateTime,
                        precision: Precisions.Second,
                    },
                });
                element.addEventListener('input', inputSpy);
                editableSegments = getEditableSegments(element);
                const segment = editableSegments.getByType(segmentType);

                segment.focus();
                await sendKeys({ press: 'Delete' });
                await elementUpdated(element);

                expect(inputSpy.callCount).to.equal(1);

                inputSpy.resetHistory();
                await sendKeys({ press: 'Delete' });
                await elementUpdated(element);

                expect(inputSpy.callCount).to.equal(0);
            })
        );

        it("should not dispatch 'input' when the value doesn't change on type in", async () => {
            element = await fixtureElement({
                props: {
                    precision: Precisions.Second,
                    value: new CalendarDateTime(2222, 5, 4, 4, 10),
                },
            });
            element.addEventListener('input', inputSpy);
            editableSegments = getEditableSegments(element);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            const secondSegment = editableSegments.getByType(
                SegmentTypes.Second
            );
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            monthSegment.focus();
            await sendKeys({ type: '5' });
            await elementUpdated(element);

            hourSegment.focus();
            await sendKeys({ type: '4' });
            await elementUpdated(element);

            secondSegment.focus();
            await sendKeys({ type: '0' });
            await elementUpdated(element);

            dayPeriodSegment.focus();
            await sendKeys({ type: 'A' });
            await elementUpdated(element);

            expect(inputSpy.callCount).to.equal(0);
        });

        it('should not dispatch input nor change when the value is changed programmatically', async () => {
            element = await fixtureElement({
                props: { value: valueDateTime },
            });
            element.addEventListener('change', changeSpy);
            element.addEventListener('input', inputSpy);

            element.value = valueDateTime.set({ year: valueDateTime.year + 1 });
            await elementUpdated(element);

            expect(inputSpy.callCount).to.equal(0);
            expect(changeSpy.callCount).to.equal(0);
        });
    });

    describe('Min-max constraints', () => {
        const dayOffset = 5;
        let min: CalendarDateTime;
        let max: CalendarDateTime;

        before(() => {
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

        it('should ignore the provided min and max properties when the interval is invalid', async () => {
            const min = max.set({ day: max.day + 1 });
            element = await fixtureElement({
                props: { min, max },
            });

            expect(element.min).to.be.undefined;
            expect(element.max).to.be.undefined;
        });

        it("should ignore the provided value property when it doesn't comply with the min-max interval", async () => {
            const value = max.set({ day: max.day + 1 });
            element = await fixtureElement({
                props: { min, max, value },
            });

            expect(element.value).to.be.undefined;
            expectSameDates(element.min!, min, 'min mismatch');
            expectSameDates(element.max!, max, 'max mismatch');
        });

        it("should invalidate the current value when it doesn't comply with min changes", async () => {
            const value = min.set({ day: min.day + 1 });
            element = await fixtureElement({
                props: { min, max, value },
            });

            expect(element.value, 'value not undefined').to.not.be.undefined;
            expect(element.min, 'min not undefined').to.not.be.undefined;
            expect(element.max, 'max not undefined').to.not.be.undefined;

            const newMin = value.set({ day: value.day + 1 });
            element.min = newMin;
            await elementUpdated(element);

            expect(element.value).to.be.undefined;
            expectSameDates(element.min!, newMin, 'min mismatch');
            expectSameDates(element.max!, max, 'max mismatch');
        });

        it("should invalidate the current value when it doesn't comply with max changes", async () => {
            const value = min.set({ day: min.day + 5 });

            element = await fixtureElement({
                props: { min, max, value },
            });

            const newMax = value.set({ day: value.day - 1 });
            element.max = newMax;
            await elementUpdated(element);

            expect(element.value).to.be.undefined;
            expectSameDates(element.min!, min, 'min mismatch');
            expectSameDates(element.max!, newMax, 'max mismatch');
        });

        it("should invalidate the current value when it doesn't comply with min and max changes", async () => {
            const value = min.set({ day: min.day + 1 });
            element = await fixtureElement({
                props: { min, max, value },
            });

            const newMin = value.set({ day: value.day + 1 });
            const newMax = max.set({ day: max.day + 1 });
            element.min = newMin;
            element.max = newMax;
            await elementUpdated(element);

            expect(element.value).to.be.undefined;
            expectSameDates(element.min!, newMin, 'min mismatch');
            expectSameDates(element.max!, newMax, 'max mismatch');
        });
    });

    describe('Invalid', () => {
        const dayOffset = 5;
        let min: CalendarDateTime;
        let max: CalendarDateTime;

        before(() => {
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

        it("should trigger the 'invalid' state when a date not completed is commited using Enter", async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            yearSegment.focus();
            await sendKeys({ type: '202' });
            await elementUpdated(element);

            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            expect(element.invalid).to.be.true;
            expectPlaceholders(editableSegments, [yearSegment]);
        });

        it("should stop the 'invalid' state when a fully defined date is commited using Enter", async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            yearSegment.focus();
            await sendKeys({ type: '202' });
            await elementUpdated(element);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            while (editableSegments.length > 0) {
                const segment = editableSegments.shift()!;
                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
            }

            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            expect(element.invalid).to.be.false;
        });

        it("should trigger the 'invalid' state when a date not completed is commited using Space", async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            yearSegment.focus();
            await sendKeys({ type: '202' });
            await elementUpdated(element);

            await sendKeys({ press: 'Space' });
            await elementUpdated(element);

            expect(element.invalid).to.be.true;
            expectPlaceholders(editableSegments, [yearSegment]);
        });

        it("should stop the 'invalid' state when a fully defined date is commited using Space", async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            yearSegment.focus();
            await sendKeys({ type: '202' });
            await elementUpdated(element);
            await sendKeys({ press: 'Space' });
            await elementUpdated(element);

            while (editableSegments.length > 0) {
                const segment = editableSegments.shift()!;
                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
            }

            await sendKeys({ press: 'Space' });
            await elementUpdated(element);

            expect(element.invalid).to.be.false;
        });

        it("should trigger the 'invalid' state when a date not completed is commited on blur", async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            yearSegment.focus();
            await sendKeys({ type: '202' });
            await elementUpdated(element);

            await sendMouse({
                type: 'click',
                position: [0, 0],
            });

            expect(element.invalid).to.be.true;
            expectPlaceholders(editableSegments, [yearSegment]);
        });

        it("should stop the 'invalid' state when a fully defined date is commited on blur", async () => {
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            yearSegment.focus();
            await sendKeys({ type: '202' });
            await elementUpdated(element);
            await sendMouse({
                type: 'click',
                position: [0, 0],
            });
            await elementUpdated(element);

            while (editableSegments.length > 0) {
                const segment = editableSegments.shift()!;
                segment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);
            }

            await sendMouse({
                type: 'click',
                position: [0, 0],
            });
            await elementUpdated(element);

            expect(element.invalid).to.be.false;
        });

        it("should trigger the 'invalid' state when a value that doesn't comply is commited using Enter", async () => {
            element = await fixtureElement({
                props: { min, max, value: min },
            });
            editableSegments = getEditableSegments(element);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            daySegment.focus();
            await sendKeys({ type: (min.day - 1).toString() });
            await elementUpdated(element);

            expect(element.invalid).to.be.false;

            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            expect(element.invalid).to.be.true;
        });

        it("should stop the 'invalid' state when a value that does comply is commited using Enter", async () => {
            element = await fixtureElement({
                props: { min, max, value: min },
            });
            editableSegments = getEditableSegments(element);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            daySegment.focus();
            await sendKeys({ type: (min.day - 1).toString() });
            await elementUpdated(element);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            await sendKeys({ type: (min.day + 1).toString() });
            await elementUpdated(element);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            expect(element.invalid).to.be.false;
        });

        it("should trigger the 'invalid' state when a value that doesn't comply is commited using Space", async () => {
            element = await fixtureElement({
                props: { min, max, value: min },
            });
            editableSegments = getEditableSegments(element);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            daySegment.focus();
            await sendKeys({ type: (min.day - 1).toString() });
            await elementUpdated(element);
            expect(element.invalid).to.be.false;

            await sendKeys({ press: 'Space' });
            await elementUpdated(element);

            expect(element.invalid).to.be.true;
        });

        it("should stop the 'invalid' state when a value that does comply is commited using Space", async () => {
            element = await fixtureElement({
                props: { min, max, value: min },
            });
            editableSegments = getEditableSegments(element);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            daySegment.focus();
            await sendKeys({ type: (min.day - 1).toString() });
            await elementUpdated(element);
            await sendKeys({ press: 'Space' });
            await elementUpdated(element);

            await sendKeys({ type: (min.day + 1).toString() });
            await elementUpdated(element);
            await sendKeys({ press: 'Space' });
            await elementUpdated(element);

            expect(element.invalid).to.be.false;
        });

        it("should trigger the 'invalid' state when a value that doesn't comply is commited on blur", async () => {
            element = await fixtureElement({
                props: { min, max, value: min },
            });
            editableSegments = getEditableSegments(element);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            daySegment.focus();
            await sendKeys({ type: (min.day - 1).toString() });
            await elementUpdated(element);
            expect(element.invalid).to.be.false;

            await sendMouse({
                type: 'click',
                position: [0, 0],
            });

            expect(element.invalid).to.be.true;
        });

        it("should stop the 'invalid' state when a value that does comply is commited on blur", async () => {
            element = await fixtureElement({
                props: { min, max, value: min },
            });
            editableSegments = getEditableSegments(element);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            daySegment.focus();
            await sendKeys({ type: (min.day - 1).toString() });
            await elementUpdated(element);
            await sendMouse({
                type: 'click',
                position: [0, 0],
            });
            await elementUpdated(element);

            daySegment.focus();
            await sendKeys({ type: (min.day + 1).toString() });
            await elementUpdated(element);
            await sendMouse({
                type: 'click',
                position: [0, 0],
            });
            await elementUpdated(element);

            expect(element.invalid).to.be.false;
        });

        it('should not be invalid when all segments are placeholders', async () => {
            expect(element.invalid).to.be.false;

            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            monthSegment.focus();
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(element);
            await sendKeys({ press: 'Enter' });
            await elementUpdated(element);

            expect(element.invalid).to.be.true;

            await sendKeys({ press: 'Delete' });
            await elementUpdated(element);
            await sendMouse({
                type: 'click',
                position: [0, 0],
            });
            await elementUpdated(element);

            expect(element.invalid).to.be.false;
        });
    });

    describe('Multiple types for min, max and value properties', () => {
        it('should keep the type when all types are CalendarDates', async () => {
            const value = valueDate;
            const min = value.set({ day: value.day - 5 });
            const max = value.set({ day: value.day + 5 });

            element = await fixtureElement({
                props: { min, max, value },
            });

            expect(
                element.value,
                'value not an instance of CalendarDate'
            ).to.be.instanceOf(CalendarDate);
            expectSameDates(element.value!, value, 'value mismatch');
            expect(
                element.min,
                'min not an instance of CalendarDate'
            ).to.be.instanceOf(CalendarDate);
            expectSameDates(element.min!, min, 'min mismatch');
            expect(
                element.max,
                'max not an instance of CalendarDate'
            ).to.be.instanceOf(CalendarDate);
            expectSameDates(element.max!, max, 'max mismatch');
        });

        it('should keep the type when all types are CalendarDateTimes', async () => {
            const value = valueDateTime;
            const min = value.set({ day: value.day - 5 });
            const max = value.set({ day: value.day + 5 });

            element = await fixtureElement({
                props: { min, max, value },
            });

            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
            expectSameDates(element.value!, value, 'value mismatch');
            expect(
                element.min,
                'min not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
            expectSameDates(element.min!, min, 'min mismatch');
            expect(
                element.max,
                'max not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
            expectSameDates(element.max!, max, 'max mismatch');
        });

        it('should keep the type when all types are ZonedDateTimes', async () => {
            const value = valueZoned;
            const min = value.set({ day: value.day - 5 });
            const max = value.set({ day: value.day + 5 });

            element = await fixtureElement({
                props: { min, max, value },
            });

            expect(
                element.value,
                'value not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.value!, value, 'value mismatch');
            expect(
                element.min,
                'min not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.min!, min, 'min mismatch');
            expect(
                element.max,
                'max not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.max!, max, 'max mismatch');
        });

        it('should keep the CalendarDate type when precision is Day', async () => {
            element = await fixtureElement({
                props: { value: valueDate, precision: Precisions.Day },
            });

            expect(
                element.value,
                'value not an instance of CalendarDate'
            ).to.be.instanceOf(CalendarDate);
            expectSameDates(element.value!, valueDate);
        });

        it('should keep the CalendarDateTime type when precision is Day', async () => {
            element = await fixtureElement({
                props: { value: valueDateTime, precision: Precisions.Day },
            });

            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
            expectSameDates(element.value!, valueDateTime);
        });

        it('should keep the ZonedDateTime type when precision is Day', async () => {
            element = await fixtureElement({
                props: { value: valueZoned, precision: Precisions.Day },
            });

            expect(
                element.value,
                'value not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.value!, valueZoned);
        });

        it('should convert CalendarDate to CalendarDateTime when precision includes time', async () => {
            const value = valueDate;
            element = await fixtureElement({
                props: { value, precision: Precisions.Hour },
            });

            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
            expectSameDates(element.value!, value);

            element.value = value;
            element.precision = Precisions.Minute;
            await elementUpdated(element);

            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
            expectSameDates(element.value!, value);

            element.value = value;
            element.precision = Precisions.Second;
            await elementUpdated(element);

            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
            expectSameDates(element.value!, value);
        });

        it('should keep the CalendarDateTime type when precision includes time', async () => {
            const value = valueDateTime;
            element = await fixtureElement({
                props: { value, precision: Precisions.Hour },
            });

            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
            expectSameDates(element.value!, value);

            element.precision = Precisions.Minute;
            await elementUpdated(element);

            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
            expectSameDates(element.value!, value);

            element.precision = Precisions.Second;
            await elementUpdated(element);

            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
            expectSameDates(element.value!, value);
        });

        it('should keep the ZonedDateTime type when the precision includes time', async () => {
            const value = valueZoned;
            element = await fixtureElement({
                props: { value, precision: Precisions.Hour },
            });

            expect(
                element.value,
                'value not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.value!, value);

            element.precision = Precisions.Minute;
            await elementUpdated(element);

            expect(
                element.value,
                'value not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.value!, value);

            element.precision = Precisions.Second;
            await elementUpdated(element);

            expect(
                element.value,
                'value not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.value!, value);
        });

        it("should convert the types to the most specific type when they're mixed - CalendarDate and CalendarDateTime", async () => {
            const minDateTime = valueDateTime.set({
                day: valueDateTime.day - 5,
            });
            element = await fixtureElement({
                props: {
                    value: valueDate,
                    min: minDateTime,
                },
            });

            expect(
                element.value,
                'value not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
            expectSameDates(element.value!, valueDate, 'value mismatch');
            expect(
                element.min,
                'min not an instance of CalendarDateTime'
            ).to.be.instanceOf(CalendarDateTime);
            expectSameDates(element.min!, minDateTime, 'min mismatch');
            expect(element.max).to.be.undefined;
        });

        it("should convert the types to the most specific type when they're mixed - CalendarDateTime and ZonedDateTime", async () => {
            const maxDateTime = valueDateTime.set({
                year: valueDateTime.year + 5,
            });
            element = await fixtureElement({
                props: { max: maxDateTime, value: valueZoned },
            });

            expect(
                element.value,
                'value not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.value!, valueZoned, 'value mismatch');
            expect(
                element.max,
                'max not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.max!, maxDateTime, 'max mismatch');
            expect(element.min).to.be.undefined;
        });

        it("should convert the types to the most specific type when they're mixed - CalendarDate and ZonedDateTime", async () => {
            const minDate = valueDate.set({ day: valueDate.day - 5 });
            element = await fixtureElement({
                props: {
                    value: valueZoned,
                    min: minDate,
                },
            });

            expect(
                element.value,
                'value not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.value!, valueZoned, 'value mismatch');
            expect(
                element.min,
                'min not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.min!, minDate, 'min mismatch');
            expect(element.max).to.be.undefined;
        });

        it("should convert the types to the most specific type when they're mixed - CalendarDate, CalendarDateTime and ZonedDateTime", async () => {
            const minDate = valueDate.set({ day: valueDate.day - 5 });
            const maxDateTime = valueDateTime.set({
                year: valueDateTime.year + 5,
            });
            element = await fixtureElement({
                props: {
                    value: valueZoned,
                    min: minDate,
                    max: maxDateTime,
                },
            });

            expect(
                element.value,
                'value not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.value!, valueZoned, 'value mismatch');
            expect(
                element.min,
                'min not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.min!, minDate, 'min mismatch');
            expect(
                element.max,
                'max not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.max!, maxDateTime, 'max mismatch');
        });

        it("should reset currentDate's timeZone to local when type changes to no timeZone", async () => {
            element = await fixtureElement({
                props: { value: valueZoned },
            });

            expect(
                element.value,
                'value not an instance of ZonedDateTime'
            ).to.be.instanceOf(ZonedDateTime);
            expectSameDates(element.value!, valueZoned, 'value mismatch');
            expectSameDates(element['currentDate'], valueZoned);
            expect(element['currentDate'].timeZone).to.equal(
                valueZoned.timeZone,
                'timeZone mismatch'
            );

            element.value = valueDate;
            await elementUpdated(element);

            expect(
                element.value,
                'value not an instance of CalendarDate'
            ).to.be.instanceOf(CalendarDate);
            expectSameDates(element.value!, valueDate, 'value mismatch');
            expect(element['currentDate'].timeZone).to.equal(
                getLocalTimeZone()
            );
        });
    });

    describe('Precision', () => {
        it("should default precision to 'minute' when no props are provided", async () => {
            element = await fixtureElement();

            expect(element.precision).to.equal(Precisions.Minute);
        });

        it("should default precision to 'minute' when CalendarDateTime type is provided", async () => {
            const min = new CalendarDateTime(
                fixedYear,
                fixedMonth,
                fixedDay,
                15,
                15
            );
            element = await fixtureElement({
                props: { min },
            });

            expect(element.precision).to.equal(Precisions.Minute);
        });

        it("should default precision to 'minute' when ZonedDateTime type is provided", async () => {
            const max = new ZonedDateTime(
                fixedYear,
                fixedMonth,
                fixedDay,
                'America/Los_Angeles',
                -28800000
            );
            element = await fixtureElement({
                props: { max },
            });

            expect(element.precision).to.equal(Precisions.Minute);
        });

        it("should default precision to 'day' when CalendarDate type is provided", async () => {
            const value = new CalendarDate(fixedYear, fixedMonth, fixedDay);
            element = await fixtureElement({
                props: { value },
            });

            expect(element.precision).to.equal(Precisions.Day);
        });

        it('should default precision to the provided one when no date is provided', async () => {
            const precisions = Object.values(Precisions);

            for (const precision of precisions) {
                element = await fixtureElement({
                    props: { precision },
                });

                expect(element.precision).to.equal(precision);
            }
        });

        it('should default precision to the provided one when a date value type is provided', async () => {
            const precisions = Object.values(Precisions);

            // CalendarDate
            const min = new CalendarDate(fixedYear, fixedMonth, fixedDay);
            for (const precision of precisions) {
                element = await fixtureElement({
                    props: { min, precision },
                });

                expect(element.precision).to.equal(precision);
            }

            // CalendarDateTime
            const max = new CalendarDateTime(
                fixedYear,
                fixedMonth,
                fixedDay,
                15,
                15
            );
            for (const precision of precisions) {
                element = await fixtureElement({
                    props: { max, precision },
                });

                expect(element.precision).to.equal(precision);
            }

            // ZonedDateTime
            const value = toZoned(max, 'America/Los_Angeles');
            for (const precision of precisions) {
                element = await fixtureElement({
                    props: { value, precision },
                });

                expect(element.precision).to.equal(precision);
            }
        });
    });

    describe('Segments creation on a 12h format', () => {
        const locale = 'en-US';
        const fixedYear = 20;
        const value: DateValue = new ZonedDateTime(
            fixedYear,
            fixedMonth,
            fixedDay,
            'America/Los_Angeles',
            -28800000,
            15,
            45,
            23
        );
        const unpaddedYear = String(fixedYear);
        const paddedMonth = String(fixedMonth).padStart(2, '0');
        const paddedDay = String(fixedDay).padStart(2, '0');
        const paddedHour = '03';
        const paddedMinute = '45';
        const paddedSecond = '23';

        it("should create placeholder segments up to 'day' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Day },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            expect(editableSegments.length).to.equal(3);
            expectPlaceholders(editableSegments);
            expect(yearSegment).to.not.be.undefined;
            expect(monthSegment).to.not.be.undefined;
            expect(daySegment).to.not.be.undefined;
        });

        it("should create placeholder segments up to 'hour' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Hour },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            expect(editableSegments.length).to.equal(5);
            expectPlaceholders(editableSegments);
            expect(yearSegment).to.not.be.undefined;
            expect(monthSegment).to.not.be.undefined;
            expect(daySegment).to.not.be.undefined;
            expect(hourSegment).to.not.be.undefined;
            expect(dayPeriodSegment).to.not.be.undefined;
        });

        it("should create placeholder segments up to 'minute' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Minute },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            const minuteSegment = editableSegments.getByType(
                SegmentTypes.Minute
            );
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            expect(editableSegments.length).to.equal(6);
            expectPlaceholders(editableSegments);
            expect(yearSegment).to.not.be.undefined;
            expect(monthSegment).to.not.be.undefined;
            expect(daySegment).to.not.be.undefined;
            expect(hourSegment).to.not.be.undefined;
            expect(minuteSegment).to.not.be.undefined;
            expect(dayPeriodSegment).to.not.be.undefined;
        });

        it("should create placeholder segments up to 'second' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Second },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            const minuteSegment = editableSegments.getByType(
                SegmentTypes.Minute
            );
            const secondSegment = editableSegments.getByType(
                SegmentTypes.Second
            );
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            expect(editableSegments.length).to.equal(7);
            expectPlaceholders(editableSegments);
            expect(yearSegment).to.not.be.undefined;
            expect(monthSegment).to.not.be.undefined;
            expect(daySegment).to.not.be.undefined;
            expect(hourSegment).to.not.be.undefined;
            expect(minuteSegment).to.not.be.undefined;
            expect(secondSegment).to.not.be.undefined;
            expect(dayPeriodSegment).to.not.be.undefined;
        });

        it("should format segments up to 'day' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Day, value },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            expect(editableSegments.length).to.equal(3);
            expect(yearSegment.innerText).to.equal(unpaddedYear);
            expect(monthSegment.innerText).to.equal(paddedMonth);
            expect(daySegment.innerText).to.equal(paddedDay);
        });

        it("should format segments up to 'hour' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Hour, value },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            expect(editableSegments.length).to.equal(5);
            expect(yearSegment.innerText).to.equal(unpaddedYear);
            expect(monthSegment.innerText).to.equal(paddedMonth);
            expect(daySegment.innerText).to.equal(paddedDay);
            expect(hourSegment.innerText).to.equal(paddedHour);
            expect(dayPeriodSegment.innerText).to.equal('PM');
        });

        it("should format segments up to 'minute' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Minute, value },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            const minuteSegment = editableSegments.getByType(
                SegmentTypes.Minute
            );
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            expect(editableSegments.length).to.equal(6);
            expect(yearSegment.innerText).to.equal(unpaddedYear);
            expect(monthSegment.innerText).to.equal(paddedMonth);
            expect(daySegment.innerText).to.equal(paddedDay);
            expect(hourSegment.innerText).to.equal(paddedHour);
            expect(minuteSegment.innerText).to.equal(paddedMinute);
            expect(dayPeriodSegment.innerText).to.equal('PM');
        });

        it("should format segments up to 'second' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Second, value },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            const minuteSegment = editableSegments.getByType(
                SegmentTypes.Minute
            );
            const secondSegment = editableSegments.getByType(
                SegmentTypes.Second
            );
            const dayPeriodSegment = editableSegments.getByType(
                SegmentTypes.DayPeriod
            );

            expect(editableSegments.length).to.equal(7);
            expect(yearSegment.innerText).to.equal(unpaddedYear);
            expect(monthSegment.innerText).to.equal(paddedMonth);
            expect(daySegment.innerText).to.equal(paddedDay);
            expect(hourSegment.innerText).to.equal(paddedHour);
            expect(minuteSegment.innerText).to.equal(paddedMinute);
            expect(secondSegment.innerText).to.equal(paddedSecond);
            expect(dayPeriodSegment.innerText).to.equal('PM');
        });
    });

    describe('Segments creation on a 24h format', () => {
        const locale = 'en-GB';
        const fixedYear = 20;
        const value: DateValue = new ZonedDateTime(
            fixedYear,
            fixedMonth,
            fixedDay,
            'America/Los_Angeles',
            -28800000,
            15,
            45,
            23
        );
        const unpaddedYear = String(fixedYear);
        const paddedMonth = String(fixedMonth).padStart(2, '0');
        const paddedDay = String(fixedDay).padStart(2, '0');
        const paddedHour = '15';
        const paddedMinute = '45';
        const paddedSecond = '23';

        it("should create placeholder segments up to 'day' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Day },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            expect(editableSegments.length).to.equal(3);
            expectPlaceholders(editableSegments);
            expect(yearSegment).to.not.be.undefined;
            expect(monthSegment).to.not.be.undefined;
            expect(daySegment).to.not.be.undefined;
        });

        it("should create placeholder segments up to 'hour' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Hour },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);

            expect(editableSegments.length).to.equal(4);
            expectPlaceholders(editableSegments);
            expect(yearSegment).to.not.be.undefined;
            expect(monthSegment).to.not.be.undefined;
            expect(daySegment).to.not.be.undefined;
            expect(hourSegment).to.not.be.undefined;
        });

        it("should create placeholder segments up to 'minute' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Minute },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            const minuteSegment = editableSegments.getByType(
                SegmentTypes.Minute
            );

            expect(editableSegments.length).to.equal(5);
            expectPlaceholders(editableSegments);
            expect(yearSegment).to.not.be.undefined;
            expect(monthSegment).to.not.be.undefined;
            expect(daySegment).to.not.be.undefined;
            expect(hourSegment).to.not.be.undefined;
            expect(minuteSegment).to.not.be.undefined;
        });

        it("should create placeholder segments up to 'second' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Second },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            const minuteSegment = editableSegments.getByType(
                SegmentTypes.Minute
            );
            const secondSegment = editableSegments.getByType(
                SegmentTypes.Second
            );

            expect(editableSegments.length).to.equal(6);
            expectPlaceholders(editableSegments);
            expect(yearSegment).to.not.be.undefined;
            expect(monthSegment).to.not.be.undefined;
            expect(daySegment).to.not.be.undefined;
            expect(hourSegment).to.not.be.undefined;
            expect(minuteSegment).to.not.be.undefined;
            expect(secondSegment).to.not.be.undefined;
        });

        it("should format segments up to 'day' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Day, value },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            expect(editableSegments.length).to.equal(3);
            expect(yearSegment.innerText).to.equal(unpaddedYear);
            expect(monthSegment.innerText).to.equal(paddedMonth);
            expect(daySegment.innerText).to.equal(paddedDay);
        });

        it("should format segments up to 'hour' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Hour, value },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);

            expect(editableSegments.length).to.equal(4);
            expect(yearSegment.innerText).to.equal(unpaddedYear);
            expect(monthSegment.innerText).to.equal(paddedMonth);
            expect(daySegment.innerText).to.equal(paddedDay);
            expect(hourSegment.innerText).to.equal(paddedHour);
        });

        it("should format segments up to 'minute' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Minute, value },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            const minuteSegment = editableSegments.getByType(
                SegmentTypes.Minute
            );

            expect(editableSegments.length).to.equal(5);
            expect(yearSegment.innerText).to.equal(unpaddedYear);
            expect(monthSegment.innerText).to.equal(paddedMonth);
            expect(daySegment.innerText).to.equal(paddedDay);
            expect(hourSegment.innerText).to.equal(paddedHour);
            expect(minuteSegment.innerText).to.equal(paddedMinute);
        });

        it("should format segments up to 'second' precision", async () => {
            element = await fixtureElement({
                locale,
                props: { precision: Precisions.Second, value },
            });
            editableSegments = getEditableSegments(element);

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const hourSegment = editableSegments.getByType(SegmentTypes.Hour);
            const minuteSegment = editableSegments.getByType(
                SegmentTypes.Minute
            );
            const secondSegment = editableSegments.getByType(
                SegmentTypes.Second
            );

            expect(editableSegments.length).to.equal(6);
            expect(yearSegment.innerText).to.equal(unpaddedYear);
            expect(monthSegment.innerText).to.equal(paddedMonth);
            expect(daySegment.innerText).to.equal(paddedDay);
            expect(hourSegment.innerText).to.equal(paddedHour);
            expect(minuteSegment.innerText).to.equal(paddedMinute);
            expect(secondSegment.innerText).to.equal(paddedSecond);
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
        beforeEach(async () => {
            element = await fixtureElement({ props: { disabled: true } });
            editableSegments = getEditableSegments(element);
        });

        it('should not accept focus', async () => {
            element.focus();
            await elementUpdated(element);
            expect(document.activeElement === element).to.be.false;

            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            yearSegment.focus();

            expect(document.activeElement === element).to.be.false;

            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            await sendMouse({
                type: 'click',
                position: getElementCenter(monthSegment),
            });
            await sendKeys({ press: 'Tab' });
            await sendKeys({ press: 'Shift+Tab' });

            expect(document.activeElement === element).to.be.false;
        });

        it('should not open the calendar', async () => {
            const calendarButton = element.shadowRoot!.querySelector(
                'sp-picker-button'
            ) as PickerButton;

            await sendMouse({
                type: 'click',
                position: getElementCenter(calendarButton),
            });

            expect(isCalendarOpen(element)).to.be.false;
        });
    });

    describe('Localization', () => {
        let numberFormatter: NumberFormatter;
        const locale = 'bn-IN';
        let zeroFormatted: string;

        beforeEach(() => {
            numberFormatter = new NumberFormatter(locale, {
                useGrouping: false,
            });
            zeroFormatted = numberFormatter.format(0);
        });

        it('should format the editable segments according to the locale when a value is provided', async () => {
            element = await fixtureElement({
                locale,
                props: { value: valueDate },
            });
            editableSegments = getEditableSegments(element);
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const unpaddedYear = numberFormatter.format(valueDate.year);
            const monthPadded = numberFormatter
                .format(valueDate.month)
                .padStart(2, zeroFormatted);
            const dayPadded = numberFormatter
                .format(valueDate.day)
                .padStart(2, zeroFormatted);

            expect(yearSegment.innerText).to.equal(unpaddedYear);
            expect(monthSegment.innerText).to.equal(monthPadded);
            expect(daySegment.innerText).to.equal(dayPadded);
        });

        it('should format the segments when incrementing/decrementing on an empty value', async () => {
            element = await fixtureElement({ locale });
            editableSegments = getEditableSegments(element);
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const unpaddedYear = numberFormatter.format(fixedYear);
            const monthPadded = numberFormatter
                .format(1)
                .padStart(2, zeroFormatted);
            const dayPadded = numberFormatter
                .format(1)
                .padStart(2, zeroFormatted);

            yearSegment.focus();
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(element);
            expect(yearSegment.innerText).to.equal(unpaddedYear);

            monthSegment.focus();
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(element);
            expect(monthSegment.innerText).to.equal(monthPadded);

            daySegment.focus();
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(element);
            expect(daySegment.innerText).to.equal(dayPadded);
        });

        it('should format the segments when incrementing/decrementing on a defined value', async () => {
            element = await fixtureElement({
                locale,
                props: { value: valueDate },
            });
            editableSegments = getEditableSegments(element);
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);
            const unpaddedYear = numberFormatter.format(valueDate.year + 1);
            const monthPadded = numberFormatter
                .format(valueDate.month - 1)
                .padStart(2, zeroFormatted);
            const dayPadded = numberFormatter
                .format(valueDate.day - 1)
                .padStart(2, zeroFormatted);

            yearSegment.focus();
            await sendKeys({ press: 'ArrowUp' });
            await elementUpdated(element);
            expect(yearSegment.innerText).to.equal(unpaddedYear);

            monthSegment.focus();
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(element);
            expect(monthSegment.innerText).to.equal(monthPadded);

            daySegment.focus();
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(element);
            expect(daySegment.innerText).to.equal(dayPadded);
        });

        it('should format the segments when typing', async () => {
            element = await fixtureElement({ locale });
            editableSegments = getEditableSegments(element);
            const yearSegment = editableSegments.getByType(SegmentTypes.Year);
            const monthSegment = editableSegments.getByType(SegmentTypes.Month);
            const daySegment = editableSegments.getByType(SegmentTypes.Day);

            yearSegment.focus();
            await sendKeys({ type: '১২৩৪' });
            await elementUpdated(element);
            expect(yearSegment.innerText).to.equal('১২৩৪');

            monthSegment.focus();
            await sendKeys({ type: '০২' });
            await elementUpdated(element);
            expect(monthSegment.innerText).to.equal('০২');

            daySegment.focus();
            await sendKeys({ type: '২৭' });
            await elementUpdated(element);
            expect(daySegment.innerText).to.equal('২৭');

            daySegment.focus();
            await sendKeys({ type: '১৯' });
            await elementUpdated(element);
            expect(daySegment.innerText).to.equal('১৯');
        });
    });
});
