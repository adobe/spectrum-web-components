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

import '../sp-help-text.js';
import { HelpText } from '..';

describe('HelpText', () => {
    it('loads default help-text accessibly', async () => {
        const el = await fixture<HelpText>(
            html`
                <sp-help-text></sp-help-text>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads negative/icon help-text accessibly', async () => {
        const el = await fixture<HelpText>(
            html`
                <sp-help-text variant="negative" icon></sp-help-text>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
});
