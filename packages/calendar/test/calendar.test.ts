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
import { defaultLocale } from '@spectrum-web-components/story-decorator/src/StoryDecorator.js';
import sinon, { spy } from 'sinon';

import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { Calendar } from '../src/Calendar.js';

import '@spectrum-web-components/calendar/sp-calendar.js';
import '@spectrum-web-components/theme/sp-theme.js';

const CALENDAR_TITLE_SELECTOR = '[data-test-id="calendar-title"]';
const NEXT_BUTTON_SELECTOR = '[data-test-id="next-btn"]';
const PREV_BUTTON_SELECTOR = '[data-test-id="prev-btn"]';
const FIRST_ACTIVE_DAY_SELECTOR =
    '[data-test-id="calendar-day"]:not(:is(.is-disabled, .is-outsideMonth))';

describe('Calendar', () => {
    const sandbox = sinon.createSandbox();

    testForLitDevWarnings(
        async () =>
            await fixture<Calendar>(
                html`
                    <sp-calendar></sp-calendar>
                `
            )
    );

    async function getCalendar({
        locale = defaultLocale,
        disabled = false,
    } = {}): Promise<Calendar> {
        const wrapped = await fixture<HTMLElement>(html`
            <sp-theme lang=${locale} color="light" scale="medium">
                <sp-calendar ?disabled=${disabled}></sp-calendar>
            </sp-theme>
        `);
        const el = wrapped.querySelector('sp-calendar') as Calendar;
        await elementUpdated(el);
        return el;
    }

    beforeEach(() => {
        // Use this date as the current date for running the tests
        sandbox.stub(Date, 'now').returns(new Date('2022-05-20').valueOf());
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('loads default calendar accessibly', async () => {
        const el = await getCalendar();

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('should render disabled calendar cells', async () => {
        const el = await getCalendar({ disabled: true });

        await elementUpdated(el);

        const items = el.shadowRoot.querySelectorAll<HTMLElement>('td span');

        items.forEach((item) => {
            expect(item.classList.contains('is-disabled')).to.be.true;
        });
    });

    it('should call "@change" event', async () => {
        const changeSpy = spy();
        const el = await getCalendar();

        const dayEl = el.shadowRoot.querySelector<HTMLSpanElement>(
            FIRST_ACTIVE_DAY_SELECTOR
        );

        el.addEventListener('change', changeSpy);
        dayEl?.click();

        await elementUpdated(el);

        expect(changeSpy).to.be.calledOnce;
    });

    const testCases = [
        {
            locale: 'en-US',
            current: 'May 2022',
            next: 'June 2022',
            prev: 'April 2022',
        },
        {
            locale: 'pt-BR',
            current: 'maio de 2022',
            next: 'junho de 2022',
            prev: 'abril de 2022',
        },
        {
            locale: 'ko-KR',
            current: '2022년 5월',
            next: '2022년 6월',
            prev: '2022년 4월',
        },
    ];

    testCases.forEach(({ locale, current, next, prev }) => {
        describe(`given the locale is "${locale}"`, () => {
            let el: Element;
            let titleEl: HTMLElement | null | undefined;

            beforeEach(async () => {
                el = await getCalendar({ locale });

                titleEl = el.shadowRoot?.querySelector<HTMLElement>(
                    CALENDAR_TITLE_SELECTOR
                );
            });

            it('should render calendar with correct month and year', async () => {
                expect(
                    titleEl?.innerHTML,
                    `Title of current month when locale is "${locale}"`
                ).to.contain(current);
            });

            it('should update the title indicating the next month when clicking the "Next" button', async () => {
                const nextBtn =
                    el.shadowRoot?.querySelector<HTMLElement>(
                        NEXT_BUTTON_SELECTOR
                    );

                nextBtn?.click();
                await elementUpdated(el);

                expect(
                    titleEl?.innerHTML,
                    `Title of next month when locale is "${locale}"`
                ).to.contain(next);
            });

            it('should update the title indicating the previous month when clicking the "Previous" button', async () => {
                const prevBtn =
                    el.shadowRoot?.querySelector<HTMLElement>(
                        PREV_BUTTON_SELECTOR
                    );

                prevBtn?.click();
                await elementUpdated(el);

                expect(
                    titleEl?.innerHTML,
                    `Title of previous month when locale is "${locale}"`
                ).to.contain(prev);
            });
        });
    });
});
