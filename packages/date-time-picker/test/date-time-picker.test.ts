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

import '../sp-date-time-picker.js';
import { DateTimePicker } from '..';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('DateTimePicker', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<DateTimePicker>(
                html`
                    <sp-date-time-picker></sp-date-time-picker>
                `
            )
    );
    it('loads default date-time-picker accessibly', async () => {
        const el = await fixture<DateTimePicker>(
            html`
                <sp-date-time-picker></sp-date-time-picker>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
});
