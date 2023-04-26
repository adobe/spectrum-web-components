/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

import '@spectrum-web-components/quick-actions/sp-quick-actions.js';
import { QuickActions } from '@spectrum-web-components/quick-actions';
import {
    testForLitDevWarnings,
    warnsOnDoubleRegister,
} from '../../../test/testing-helpers.js';

describe('QuickActions', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<QuickActions>(
                html`
                    <sp-quick-actions></sp-quick-actions>
                `
            )
    );
    it('loads default quick-actions accessibly', async () => {
        const el = await fixture<QuickActions>(
            html`
                <sp-quick-actions></sp-quick-actions>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    describe(
        'dev mode registration large',
        warnsOnDoubleRegister(() => import('../sp-quick-actions.js'))
    );
});
