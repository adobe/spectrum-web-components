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
import { Radio } from '../';
import {
    fixture,
    elementUpdated,
    triggerBlurFor,
    html,
    expect,
} from '@open-wc/testing';

function inputForRadio(radio: Radio): HTMLInputElement {
    if (!radio.shadowRoot) throw new Error('No shadowRoot');

    return radio.shadowRoot.querySelector('#input') as HTMLInputElement;
}

function labelNodeForRadio(radio: Radio): Node {
    if (!radio.shadowRoot) throw new Error('No shadowRoot');
    const slotEl = radio.shadowRoot.querySelector('slot') as HTMLSlotElement;

    return slotEl.assignedNodes()[0];
}

describe('Radio', () => {
    let testDiv!: HTMLDivElement;

    beforeEach(async () => {
        testDiv = await fixture<HTMLDivElement>(
            html`
                <div id="test-radio">
                    <sp-radio value="first" checked>Option 1</sp-radio>
                    <sp-radio value="second">Option 2</sp-radio>
                    <sp-radio value="third" autofocus>Option 3</sp-radio>
                    <sp-radio value="fourth" disabled>Option 4</sp-radio>
                </div>
            `
        );
    });
    it('loads', async () => {
        const el = testDiv.querySelector('sp-radio[value=first]') as Radio;
        const textNode = labelNodeForRadio(el as Radio);

        expect(el).to.not.equal(undefined);
        expect(el.innerText).to.equal('Option 1');
        expect(textNode.textContent).to.equal('Option 1');
    });

    it('respects checked attribute', () => {
        const el1 = document.querySelector('[value=first]') as Radio;
        const el2 = testDiv.querySelector('[value=second]') as Radio;

        expect(el1.checked).to.be.true;
        expect(el2.checked).to.be.false;
    });

    it('handles click events', async () => {
        const el = testDiv.querySelector('[value=third]') as Radio;

        expect(el.checked).to.be.false;

        inputForRadio(el).click();
        await elementUpdated(el);

        expect(el.checked).to.be.true;
    });

    it('autofocuses', async () => {
        const autoElement = testDiv.querySelector(
            'sp-radio[autofocus]'
        ) as Radio;

        expect(autoElement).to.exist;
        expect(document.activeElement).to.equal(autoElement);

        await triggerBlurFor(autoElement);

        expect(document.activeElement).to.not.equal(autoElement);
    });

    it('ensures clicking disabled does not check them', async () => {
        const el = testDiv.querySelector('sp-radio[disabled]') as Radio;

        expect(el.checked).to.be.false;

        inputForRadio(el).click();
        await elementUpdated(el);

        expect(el.checked).to.be.false;
    });
});
