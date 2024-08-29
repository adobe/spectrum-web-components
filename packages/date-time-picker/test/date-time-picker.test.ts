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
import { spreadProps } from '../../../test/lit-helpers.js';

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

    beforeEach(async () => {
        element = await fixtureElement();
        await elementUpdated(element);
    });

    testForLitDevWarnings(
        async () =>
            await fixture<DateTimePicker>(
                html`
                    <sp-date-time-picker></sp-date-time-picker>
                `
            )
    );

    it('loads default sp-date-time-picker accessibly', async () => {
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
        describe('using the up arrow key', () => {
            // TODO: check that the other segments stay in place

            it("defining the year segment's value", async () => {});
            it("incrementing the year segment's value", async () => {});
            it("resetting the year segment's value when max is reached", async () => {});

            it("defining the month segment's value", async () => {});
            it("incrementing the month segment's value", async () => {});
            it("resetting the month segment's value when max is reached", async () => {});

            it("defining the day segment's value", async () => {});
            it("incrementing the day segment's value", async () => {});
            it("resetting the day segment's value when max is reached", async () => {});

            describe('updating the day', () => {
                it('when the month changes to February with no year selected', async () => {});
                it('when the month changes to February in a common year', async () => {});
                it('when the month changes to February in a leap year', async () => {});
            });

            it("defining the hour segment's value", async () => {});
            it("incrementing the hour segment's value", async () => {});
            it("resetting the hour segment's value when max is reached on a 24h format", async () => {});
            it("resetting the hour segment's value when max is reached on a 12h format", async () => {});

            it("defining the minute segment's value", async () => {});
            it("incrementing the minute segment's value", async () => {});
            it("resetting the minute segment's value when max is reached", async () => {});

            it("defining the second segment's value", async () => {});
            it("incrementing the second segment's value", async () => {});
            it("resetting the second segment's value when max is reached", async () => {});

            it("defining the AM/PM segment's value", async () => {});
            it("defining the AM/PM segment's value when the hour is set", async () => {});
            it("toggling the AM/PM segment's value", async () => {});
        });

        describe('using the down arrow key', () => {
            // TODO: repeat the tests from the up arrow key
        });

        describe('using typed in values', () => {
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

            it("defining the AM/PM segment's value", async () => {
                // Only using A/P letters
            });
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
