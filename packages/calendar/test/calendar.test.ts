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
});
