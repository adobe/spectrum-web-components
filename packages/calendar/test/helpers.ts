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
import { DateValue, isSameDay } from '@internationalized/date';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { Calendar } from '@spectrum-web-components/calendar';
import '@spectrum-web-components/date-time-picker/sp-date-time-picker.js';
import '@spectrum-web-components/theme/sp-theme.js';
import { sendKeys } from '@web/test-runner-commands';
import { spreadProps } from '../../../test/lit-helpers.js';

export async function fixtureElement({
    locale = 'en-US',
    props = {},
}: {
    locale?: string;
    props?: { [prop: string]: unknown };
} = {}): Promise<Calendar> {
    const wrapped = await fixture<HTMLElement>(html`
        <sp-theme
            system=${'spectrum'}
            lang=${locale}
            color="light"
            scale="medium"
        >
            <sp-calendar ...=${spreadProps(props)}></sp-calendar>
        </sp-theme>
    `);
    const el = wrapped.querySelector('sp-calendar') as Calendar;
    await elementUpdated(el);
    return el;
}

/**
 * Computes the x and y coordinates of the center of the given element, rounded to the nearest integer.
 * @param element - The element to get the center of
 * @returns - The x and y coordinates of the center of the element
 */
export function getElementCenter(element: HTMLElement): [number, number] {
    const rect = element.getBoundingClientRect();
    return [
        Math.round(rect.left + rect.width / 2),
        Math.round(rect.top + rect.height / 2),
    ];
}

/**
 * Sends the specified key the given number of times.
 * @param key - The key to send
 * @param times - The number of times to send the key
 */
export function sendKeyMultipleTimes(
    key: string,
    times: number
): Promise<void[]> {
    return Promise.all(
        Array.from({ length: times }).map(() => sendKeys({ press: key }))
    );
}

/**
 * Asserts that the given date values are the same day.
 * @param a - The first date value
 * @param b - The second date value
 * @param message - The message to display if the assertion fails
 */
export function expectSameDates(
    a: DateValue,
    b: DateValue,
    message?: string
): void {
    expect(isSameDay(a, b), message).to.be.true;
}

/**
 * Queries the calendar for the focusable day element.
 */
export function getFocusableDay(calendar: Calendar): HTMLElement {
    return calendar.shadowRoot.querySelector(
        'td.table-cell span[tabindex="0"]'
    ) as HTMLElement;
}
