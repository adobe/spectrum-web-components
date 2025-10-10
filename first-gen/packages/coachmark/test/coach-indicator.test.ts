/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
import { CoachIndicator } from '@spectrum-web-components/coachmark';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('CoachIndicator', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<CoachIndicator>(html`
                <sp-coach-indicator></sp-coach-indicator>
            `)
    );
    it('loads default coach-indicator accessibly', async () => {
        const el = await fixture<CoachIndicator>(html`
            <sp-coach-indicator></sp-coach-indicator>
        `);
        await elementUpdated(el);
        await expect(el).to.be.accessible();
    });
});
