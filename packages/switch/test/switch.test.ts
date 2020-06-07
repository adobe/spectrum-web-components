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

import '../';
import { Switch } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

describe('Switch', () => {
    it('loads default switch accessibly', async () => {
        const el = await fixture<Switch>(
            html`
                <sp-switch>Not Checked</sp-switch>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads `checked` switch accessibly', async () => {
        const el = await fixture<Switch>(
            html`
                <sp-switch checked>Checked</sp-switch>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
});
