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
import { DateTimePicker } from '@spectrum-web-components/date-time-picker';
import {
    EditableSegmentType,
    SegmentPlaceholders,
    SegmentType,
} from '@spectrum-web-components/date-time-picker';
import '@spectrum-web-components/date-time-picker/sp-date-time-picker.js';
import '@spectrum-web-components/theme/sp-theme.js';
import { spreadProps } from '../../../test/lit-helpers.js';
import { sendKeys } from '@web/test-runner-commands';
import { CalendarDateTime } from '@internationalized/date';

function getSegmentByType(
    segments: HTMLElement[],
    type: SegmentType
): HTMLElement | undefined {
    return segments.find((segment) => segment.dataset.type === type);
}

function arePlaceholdersShown(
    segments: HTMLElement[],
    exceptions: HTMLElement[] = []
): boolean {
    let segmentsToHavePlaceholders = segments;
    if (exceptions)
        segmentsToHavePlaceholders = segments.filter(
            (segment) => !exceptions.includes(segment)
        );

    for (const segment of segmentsToHavePlaceholders) {
        const type = segment.dataset.type as EditableSegmentType;
        const placeholder = SegmentPlaceholders[type];
        if (
            segment.innerText !== placeholder ||
            (type === SegmentType.DayPeriod &&
                !segment.classList.contains('is-placeholder'))
        )
            return false;
    }

    return true;
}

function sendKeyMultipleTimes(key: string, times: number): Promise<void[]> {
    return Promise.all(
        Array.from({ length: times }).map(() => sendKeys({ press: key }))
    );
}

async function fixtureElement({
    locale = 'en-US',
    props = {},
}: {
    locale?: string;
    props?: { [prop: string]: unknown };
} = {}): Promise<DateTimePicker> {
    const wrapped = await fixture<HTMLElement>(html`
        <sp-theme lang=${locale} color="light" scale="medium">
            <sp-date-time-picker
                ...=${spreadProps(props)}
            ></sp-date-time-picker>
        </sp-theme>
    `);
    const el = wrapped.querySelector('sp-date-time-picker') as DateTimePicker;
    await elementUpdated(el);
    return el;
}

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
        let editableSegments: HTMLElement[];

        beforeEach(async () => {
            element = await fixtureElement({ props: { precision: 'second' } });
            await elementUpdated(element);

            editableSegments = Array.from(
                element.shadowRoot.querySelectorAll('.editable-segment')
            );
        });

        describe('using the up arrow key', () => {
            it("defining the year segment's value", async () => {
                const yearSegment = getSegmentByType(
                    editableSegments,
                    SegmentType.Year
                )!;
                yearSegment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(yearSegment.innerText).to.equal(`${fixedYear}`);

                const isOnlyYearSegmentSet = arePlaceholdersShown(
                    editableSegments,
                    [yearSegment]
                );
                expect(isOnlyYearSegmentSet).to.be.true;
            });

            it("incrementing the year segment's value", async () => {
                const yearSegment = getSegmentByType(
                    editableSegments,
                    SegmentType.Year
                )!;
                yearSegment.focus();
                await sendKeys({ press: 'ArrowUp' });
                await sendKeys({ press: 'ArrowUp' });
                await sendKeys({ press: 'ArrowUp' });
                await elementUpdated(element);

                expect(yearSegment.innerText).to.equal(`${fixedYear + 2}`);

                const isOnlyYearSegmentSet = arePlaceholdersShown(
                    editableSegments,
                    [yearSegment]
                );
                expect(isOnlyYearSegmentSet).to.be.true;
            });

            [SegmentType.Month, SegmentType.Day].forEach((segmentType) => {
                it(`defining the ${segmentType} segment's value`, async () => {
                    const segment = getSegmentByType(
                        editableSegments,
                        segmentType
                    )!;
                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`01`);

                    const isOnlySegmentSet = arePlaceholdersShown(
                        editableSegments,
                        [segment]
                    );
                    expect(isOnlySegmentSet).to.be.true;
                });

                it(`incrementing the ${segmentType} segment's value`, async () => {
                    const segment = getSegmentByType(
                        editableSegments,
                        segmentType
                    )!;
                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`03`);

                    const isOnlySegmentSet = arePlaceholdersShown(
                        editableSegments,
                        [segment]
                    );
                    expect(isOnlySegmentSet).to.be.true;
                });
            });

            [SegmentType.Minute, SegmentType.Second].forEach((segmentType) => {
                it(`defining the ${segmentType} segment's value`, async () => {
                    const segment = getSegmentByType(
                        editableSegments,
                        segmentType
                    )!;
                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`00`);

                    const isOnlySegmentSet = arePlaceholdersShown(
                        editableSegments,
                        [segment]
                    );
                    expect(isOnlySegmentSet).to.be.true;
                });

                it(`incrementing the ${segmentType} segment's value`, async () => {
                    const segment = getSegmentByType(
                        editableSegments,
                        segmentType
                    )!;
                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal(`02`);

                    const isOnlySegmentSet = arePlaceholdersShown(
                        editableSegments,
                        [segment]
                    );
                    expect(isOnlySegmentSet).to.be.true;
                });
            });

            describe('on a 12h format', () => {
                let hourSegment: HTMLElement;
                let dayPeriodSegment: HTMLElement;

                beforeEach(async () => {
                    hourSegment = getSegmentByType(
                        editableSegments,
                        SegmentType.Hour
                    )!;
                    dayPeriodSegment = getSegmentByType(
                        editableSegments,
                        SegmentType.DayPeriod
                    )!;
                });

                it("defining the hour segment's value", async () => {
                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`12`);
                    expect(dayPeriodSegment.innerText).to.equal(`AM`);

                    const areOnlySegmentsSet = arePlaceholdersShown(
                        editableSegments,
                        [hourSegment, dayPeriodSegment]
                    );
                    expect(areOnlySegmentsSet).to.be.true;
                });

                it("incrementing the hour segment's value", async () => {
                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`02`);
                    expect(dayPeriodSegment.innerText).to.equal(`AM`);

                    const isOnlySegmentSet = arePlaceholdersShown(
                        editableSegments,
                        [hourSegment, dayPeriodSegment]
                    );
                    expect(isOnlySegmentSet).to.be.true;
                });

                it('resetting the hour when the max is reached', async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowUp', 13);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`12`);
                    expect(dayPeriodSegment.innerText).to.equal(`AM`);

                    const isOnlySegmentSet = arePlaceholdersShown(
                        editableSegments,
                        [hourSegment, dayPeriodSegment]
                    );
                    expect(isOnlySegmentSet).to.be.true;
                });

                it("defining the AM/PM segment's value", async () => {
                    dayPeriodSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(dayPeriodSegment.innerText).to.equal(`AM`);

                    const isOnlySegmentSet = arePlaceholdersShown(
                        editableSegments,
                        [dayPeriodSegment]
                    );
                    expect(isOnlySegmentSet).to.be.true;
                });

                it("toggling the AM/PM segment's value", async () => {
                    dayPeriodSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(dayPeriodSegment.innerText).to.equal(`PM`);

                    const isOnlySegmentSet = arePlaceholdersShown(
                        editableSegments,
                        [dayPeriodSegment]
                    );
                    expect(isOnlySegmentSet).to.be.true;
                });
            });

            describe('on a 24h format', () => {
                let hourSegment: HTMLElement;

                beforeEach(async () => {
                    element = await fixtureElement({ locale: 'en-GB' });
                    await elementUpdated(element);

                    editableSegments = Array.from(
                        element.shadowRoot.querySelectorAll('.editable-segment')
                    );

                    hourSegment = getSegmentByType(
                        editableSegments,
                        SegmentType.Hour
                    )!;
                });

                it("defining the hour segment's value ", async () => {
                    hourSegment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`00`);

                    const areOnlySegmentsSet = arePlaceholdersShown(
                        editableSegments,
                        [hourSegment]
                    );
                    expect(areOnlySegmentsSet).to.be.true;
                });

                it("incrementing the hour segment's value ", async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowUp', 14);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`13`);

                    const isOnlySegmentSet = arePlaceholdersShown(
                        editableSegments,
                        [hourSegment]
                    );
                    expect(isOnlySegmentSet).to.be.true;
                });

                it('resetting the hour when the max is reached', async () => {
                    hourSegment.focus();
                    await sendKeyMultipleTimes('ArrowUp', 25);
                    await elementUpdated(element);

                    expect(hourSegment.innerText).to.equal(`00`);

                    const isOnlySegmentSet = arePlaceholdersShown(
                        editableSegments,
                        [hourSegment]
                    );
                    expect(isOnlySegmentSet).to.be.true;
                });
            });

            describe('updating the day', () => {
                let daySegment: HTMLElement;
                let monthSegment: HTMLElement;
                let yearSegment: HTMLElement;

                beforeEach(async () => {
                    daySegment = getSegmentByType(
                        editableSegments,
                        SegmentType.Day
                    )!;
                    monthSegment = getSegmentByType(
                        editableSegments,
                        SegmentType.Month
                    )!;
                    yearSegment = getSegmentByType(
                        editableSegments,
                        SegmentType.Year
                    )!;

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

                    const areOnlySegmentsSet = arePlaceholdersShown(
                        editableSegments,
                        [daySegment, monthSegment]
                    );
                    expect(areOnlySegmentsSet).to.be.true;
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

                    const areOnlySegmentsSet = arePlaceholdersShown(
                        editableSegments,
                        [daySegment, monthSegment, yearSegment]
                    );
                    expect(areOnlySegmentsSet).to.be.true;
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

                    const areOnlySegmentsSet = arePlaceholdersShown(
                        editableSegments,
                        [daySegment, monthSegment, yearSegment]
                    );
                    expect(areOnlySegmentsSet).to.be.true;
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

                    const areOnlySegmentsSet = arePlaceholdersShown(
                        editableSegments,
                        [daySegment, monthSegment, yearSegment]
                    );
                    expect(areOnlySegmentsSet).to.be.true;
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
                            precision: 'second',
                        },
                    });
                    await elementUpdated(element);
                    editableSegments = Array.from(
                        element.shadowRoot.querySelectorAll('.editable-segment')
                    );
                });

                it('when the max year is reached', async () => {
                    const currentValue = element.value!;
                    const max =
                        currentValue.calendar.getYearsInEra(currentValue);
                    element.value = currentValue.set({ year: max });
                    await elementUpdated(element);

                    const segment = getSegmentByType(
                        editableSegments,
                        SegmentType.Year
                    )!;
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

                    const segment = getSegmentByType(
                        editableSegments,
                        SegmentType.Month
                    )!;
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

                    const segment = getSegmentByType(
                        editableSegments,
                        SegmentType.Day
                    )!;
                    segment.focus();
                    await sendKeys({ press: 'ArrowUp' });
                    await elementUpdated(element);

                    expect(segment.innerText).to.equal('01');
                });

                [SegmentType.Minute, SegmentType.Second].forEach(
                    (segmentType) => {
                        it(`when the max ${segmentType} is reached`, async () => {
                            const currentValue = element.value!;
                            element.value = currentValue.set({ minute: 60 });
                            await elementUpdated(element);

                            const segment = getSegmentByType(
                                editableSegments,
                                SegmentType.Minute
                            )!;
                            segment.focus();
                            await sendKeys({ press: 'ArrowUp' });
                            await elementUpdated(element);

                            expect(segment.innerText).to.equal('00');
                        });
                    }
                );
            });
        });

        describe('using the down arrow key', () => {
            // TODO: repeat the tests from the up arrow key
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
