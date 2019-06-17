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
import { defineCustomElements } from '../../define';
import { Checkbox } from '..';
import * as MediumIcons from '../../icons/icons-medium';

defineCustomElements(...Object.values(MediumIcons));

function inputForCheckbox(checkbox: Checkbox): HTMLInputElement {
    if (!checkbox.shadowRoot) throw new Error('No shadowRoot');
    return checkbox.shadowRoot.querySelector('#input') as HTMLInputElement;
}

function labelNodeForCheckbox(checkbox: Checkbox): Node {
    if (!checkbox.shadowRoot) throw new Error('No shadowRoot');
    const slotEl = checkbox.shadowRoot.querySelector('slot') as HTMLSlotElement;
    return slotEl.assignedNodes()[0];
}

describe('button', () => {
    it('loads', () => {
        const el = document.querySelector('sp-checkbox') as Checkbox;
        expect(el).to.not.equal(undefined);
        expect(el.innerText).to.equal('Component');
        const textNode = labelNodeForCheckbox(el);
        expect(textNode.textContent).to.equal('Component');
    });

    it('autofocuses', () => {
        const autoElement = document.querySelector('sp-checkbox[autofocus]');
        expect(autoElement).to.exist;
        expect(document.activeElement).to.equal(autoElement);
    });

    it('respects checked attribute', () => {
        let el = document.querySelector('#checkbox0') as Checkbox;
        expect(el.checked).to.be.false;

        el = document.querySelector('#checkbox1') as Checkbox;
        expect(el.checked).to.be.true;
    });

    it('handles click events', () => {
        const el = document.querySelector('#checkbox1') as Checkbox;
        expect(el.checked).to.be.true;
        inputForCheckbox(el).click();
        expect(el.checked).to.be.false;
    });
});
