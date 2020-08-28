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

import { ObserveSlotPresence } from '../src/observe-slot-presence.js';
import { LitElement, html, TemplateResult } from 'lit-element';
import { fixture, elementUpdated, expect } from '@open-wc/testing';

class ObserverTest extends ObserveSlotPresence(
    LitElement,
    '[slot="test-slot"]'
) {
    protected render(): TemplateResult {
        return html`
            Test Element
        `;
    }
}

customElements.define('observe-presence-test', ObserverTest);

describe('ObserveSlotPresence', () => {
    it('does no management when slot unavailable', async () => {
        const el = await fixture<ObserverTest>(
            html`
                <observe-presence-test></observe-presence-test>
            `
        );
        await elementUpdated(el);

        expect(el.slotContentIsPresent).to.be.false;

        el.innerHTML = '<div slot="test-slot"></div>';
        await elementUpdated(el);

        expect(el.slotContentIsPresent).to.be.true;
    });
});
