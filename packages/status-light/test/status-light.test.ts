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
import { StatusLight } from '../';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

describe('Status Light', () => {
    it('loads correctly', async () => {
        const el = await fixture<StatusLight>(
            html`
                <sp-status-light variant="positive"></sp-status-light>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        const rootEl = el.shadowRoot
            ? (el.shadowRoot.querySelector('#root') as HTMLImageElement)
            : (el.querySelector('#root') as HTMLImageElement);
        expect(rootEl).to.not.be.undefined;
    });
});
