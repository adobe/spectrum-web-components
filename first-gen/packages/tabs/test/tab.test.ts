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
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import { Tab, Tabs } from '@spectrum-web-components/tabs';
import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('Tab', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Tabs>(html`
                <sp-tabs>
                    <sp-tab label="Tab 1" value="first"></sp-tab>
                </sp-tabs>
            `)
    );
    it('loads default tab accessibly', async () => {
        const el = await fixture<Tabs>(html`
            <sp-tabs>
                <sp-tab label="Tab 1" value="first"></sp-tab>
            </sp-tabs>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('Updates label', async () => {
        const el = await fixture<Tabs>(html`
            <sp-tabs>
                <sp-tab label="Tab 1" value="first"></sp-tab>
            </sp-tabs>
        `);

        await elementUpdated(el);
        const firstTab = el.querySelector('sp-tab') as Tab;
        const label = firstTab.shadowRoot
            ? (firstTab.shadowRoot.querySelector(
                  '#item-label'
              ) as HTMLLabelElement)
            : (firstTab.querySelector('#itemLabel') as HTMLLabelElement);
        expect(label.textContent).to.include('Tab 1');

        firstTab.label = 'Other Tab';

        await elementUpdated(firstTab);
        expect(label.textContent).to.include('Other Tab');
    });
});
