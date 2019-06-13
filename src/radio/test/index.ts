/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { Radio } from '..';
import '..';

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
    it('loads', () => {
        const el = document.querySelector('sp-radio[value=first]') as Radio;
        const textNode = labelNodeForRadio(el as Radio);

        expect(el).to.not.equal(undefined);
        expect(el.innerText).to.equal('Option 1');
        expect(textNode.textContent).to.equal('Option 1');
    });

    it('respects checked attribute', () => {
        const el1 = document.querySelector('[value=first]') as Radio;
        const el2 = document.querySelector('[value=second]') as Radio;

        expect(el1.checked).to.be.true;
        expect(el2.checked).to.be.false;
    });

    it('handles click events', () => {
        const el = document.querySelector('[value=second]') as Radio;

        expect(el.checked).to.be.false;
        inputForRadio(el).click();
        expect(el.checked).to.be.true;
    });

    // @TODO unit tests for autofocus on multiple components (radio and checkbox) are
    // interfering with one another. Need to refactor how karma loads tests to make sure
    // the DOM of each test are isolated.
    it.skip('autofocuses', () => {
        const autoElement = document.querySelector(
            'sp-radio[autofocus]'
        ) as Radio;

        expect(autoElement).to.exist;
        expect(document.activeElement).to.equal(autoElement);

        autoElement.blur();
        expect(document.activeElement).to.not.equal(autoElement);
    });

    it('ensures clicking disabled does not check them', () => {
        const el = document.querySelector('sp-radio[disabled]') as Radio;

        expect(el.checked).to.be.false;
        inputForRadio(el).click();
        expect(el.checked).to.be.false;
    });
});
