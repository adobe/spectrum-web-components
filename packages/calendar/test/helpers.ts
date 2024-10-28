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
import { isSameDay } from '@internationalized/date';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { Calendar, DateValue } from '@spectrum-web-components/calendar';
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

export function sendKeyMultipleTimes(
    key: string,
    times: number
): Promise<void[]> {
    return Promise.all(
        Array.from({ length: times }).map(() => sendKeys({ press: key }))
    );
}

export function expectSameDates(
    a: DateValue,
    b: DateValue,
    message?: string
): void {
    expect(isSameDay(a, b), message).to.be.true;
}
