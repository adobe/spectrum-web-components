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
import '@spectrum-web-components/status-light/sp-status-light.js';
import { StatusLight } from '@spectrum-web-components/status-light';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

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
    it('[disabled] manages [aria-disabled]', async () => {
        const el = await fixture<StatusLight>(
            html`
                <sp-status-light variant="positive"></sp-status-light>
            `
        );

        await elementUpdated(el);

        expect(el.hasAttribute('aria-disabled')).to.be.false;

        el.disabled = true;
        await elementUpdated(el);

        expect(el.hasAttribute('aria-disabled')).to.be.true;
        expect(el.getAttribute('aria-disabled')).to.equal('true');
    });
});
