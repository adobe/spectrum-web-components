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

import '../sp-calendar.js';
import { Calendar } from '..';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { CalendarDate } from '@internationalized/date';

describe('Calendar', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Calendar>(
                html`
                    <sp-calendar></sp-calendar>
                `
            )
    );
    it('loads default calendar accessibly', async () => {
        const el = await fixture<Calendar>(
            html`
                <sp-calendar></sp-calendar>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('should render calendar with correct month and year', async () => {
        const el = await fixture<Calendar>(
            html`
                <sp-calendar
                    .currentDate=${new CalendarDate(2022, 5, 20)}
                ></sp-calendar>
            `
        );

        await elementUpdated(el);

        const monthYear = el.shadowRoot.querySelector(
            '[data-test-id="calendar-title"]'
        );

        expect(monthYear?.innerHTML).contain('May 2022');
    });

    it('should render disabled calendar cells', async () => {
        const el = await fixture<Calendar>(
            html`
                <sp-calendar disabled></sp-calendar>
            `
        );

        await elementUpdated(el);

        const items = el.shadowRoot.querySelectorAll<HTMLElement>('td span');

        items.forEach((item) => {
            expect(item.classList.contains('is-disabled')).to.be.true;
        });
    });

    it('should go to next month after "Next" button click', async () => {
        const currentMonth = new CalendarDate(2022, 2, 20); // 20 Feb 2022
        const el = await fixture<Calendar>(
            html`
                <sp-calendar .currentDate=${currentMonth}></sp-calendar>
            `
        );

        await elementUpdated(el);

        const nextBtn = el.shadowRoot.querySelector<HTMLElement>(
            '[data-test-id="next-btn"]'
        );

        const monthYear = el.shadowRoot.querySelector(
            '[data-test-id="calendar-title"]'
        );

        nextBtn?.click();
        await elementUpdated(el);

        expect(monthYear?.innerHTML).to.contain('March 2022');
    });

    it('should go to previous month after "Prev" button click', async () => {
        const currentMonth = new CalendarDate(2022, 2, 20); // 20 Feb 2022
        const el = await fixture<Calendar>(
            html`
                <sp-calendar .currentDate=${currentMonth}></sp-calendar>
            `
        );

        await elementUpdated(el);

        const nextBtn = el.shadowRoot.querySelector<HTMLElement>(
            '[data-test-id="prev-btn"]'
        );

        const monthYear = el.shadowRoot.querySelector(
            '[data-test-id="calendar-title"]'
        );

        nextBtn?.click();
        await elementUpdated(el);

        expect(monthYear?.innerHTML).to.contain('January 2022');
    });
});
