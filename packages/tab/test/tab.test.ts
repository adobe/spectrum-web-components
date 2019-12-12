/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import '../';
import { Tab } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

describe('Tab', () => {
    it('Updates label', async () => {
        const el = await fixture<Tab>(
            html`
                <sp-tab label="Tab 1" value="first"></sp-tab>
            `
        );

        await elementUpdated(el);
        const label = el.shadowRoot
            ? (el.shadowRoot.querySelector('#itemLabel') as HTMLLabelElement)
            : (el.querySelector('#itemLabel') as HTMLLabelElement);
        expect(label.textContent).to.include('Tab 1');

        el.label = 'Other Tab';

        await elementUpdated(el);
        expect(label.textContent).to.include('Other Tab');
    });
});
