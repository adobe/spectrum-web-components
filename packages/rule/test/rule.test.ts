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

import { fixture, elementUpdated, expect, html } from '@open-wc/testing';

import '../sp-rule.js';
import { Rule } from '../';

describe('Rule', () => {
    it('loads default rule accessibly', async () => {
        const el = await fixture<Rule>(
            html`
                <sp-rule></sp-rule>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads [vertical] rule accessibly', async () => {
        const el = await fixture<Rule>(
            html`
                <sp-rule vertical></sp-rule>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
});
