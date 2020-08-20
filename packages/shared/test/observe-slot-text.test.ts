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

import { ObserveSlotText } from '../src/observe-slot-text.js';
import { LitElement, TemplateResult } from '@spectrum-web-components/base';
import { fixture, elementUpdated, expect, html } from '@open-wc/testing';

class ObserverTest extends ObserveSlotText(LitElement) {
    protected render(): TemplateResult {
        return html`
            <slot @slotchange=${this.manageTextObservedSlot}></slot>
        `;
    }
}

customElements.define('observe-slot-test', ObserverTest);

describe('ObserveSlotText', () => {
    it('does no management when slot unavailable', async () => {
        const el = await fixture<ObserverTest>(
            html`
                <observe-slot-test></observe-slot-test>
            `
        );
        await elementUpdated(el);

        expect(el.slotHasContent).to.be.false;

        el.textContent = `hi, i'm some text`;

        await elementUpdated(el);

        expect(el.slotHasContent).to.be.true;
    });
});
