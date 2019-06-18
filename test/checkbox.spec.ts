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
import { defineCustomElements } from '../src/define';
import { Checkbox } from '../src/checkbox';
import '../src/checkbox';
import * as MediumIcons from '../src/icons/icons-medium';
import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { html } from 'lit-html';

chai.use(chaiDomDiff);

defineCustomElements(...Object.values(MediumIcons));

function inputForCheckbox(checkbox: Checkbox): HTMLInputElement {
    if (!checkbox.shadowRoot) throw new Error('No shadowRoot');
    return checkbox.shadowRoot.querySelector('#input') as HTMLInputElement;
}

function labelNodeForCheckbox(checkbox: Checkbox): Node {
    if (!checkbox.shadowRoot) throw new Error('No shadowRoot');
    const slotEl = checkbox.shadowRoot.querySelector('slot');
    if (!slotEl) {
        throw new Error('Failed to find slot in shadowRoot');
    }
    return slotEl.assignedNodes()[0];
}
describe('Checkbox', () => {
    let testFixture: HTMLDivElement;

    beforeEach(async () => {
        testFixture = await fixture<HTMLDivElement>(
            html`
                <div>
                    <sp-icons-medium></sp-icons-medium>

                    <div id="test-checkbox">
                        <sp-checkbox id="checkbox0" tabindex="5">
                            Component
                        </sp-checkbox>
                        <sp-checkbox id="checkbox1" tabindex="2" checked>
                            Check 1
                        </sp-checkbox>
                        <sp-checkbox id="checkbox2" tabindex="3" disabled>
                            Check 2
                        </sp-checkbox>
                        <sp-checkbox id="checkbox3" tabindex="1" autofocus>
                            Check 3
                        </sp-checkbox>
                        <sp-checkbox id="checkbox4" tabindex="0">
                            Check 4
                        </sp-checkbox>
                        <sp-checkbox id="checkbox5" tabindex="-1">
                            Check 5
                        </sp-checkbox>
                    </div>
                </div>
            `
        );

        return true;
    });

    it('loads', () => {
        const el = testFixture.querySelector('sp-checkbox') as Checkbox;
        expect(el).to.not.equal(undefined);
        expect(el).dom.to.equal(`
            <sp-checkbox id="checkbox0" tabindex="5">
                Component
            </sp-checkbox>
        `);
        const textNode = labelNodeForCheckbox(el);
        expect(textNode.textContent!.trim()).to.equal('Component');
    });

    it('autofocuses', async () => {
        const autoElement = testFixture.querySelector(
            'sp-checkbox[autofocus]'
        ) as Checkbox;

        expect(autoElement).to.exist;
        expect(document.activeElement).to.equal(autoElement);

        autoElement.blur();
        await elementUpdated(autoElement);

        expect(document.activeElement).to.not.equal(autoElement);

        return true;
    });

    it('respects checked attribute', () => {
        let el = testFixture.querySelector('#checkbox0') as Checkbox;
        expect(el.checked).to.be.false;

        el = testFixture.querySelector('#checkbox1') as Checkbox;
        expect(el.checked).to.be.true;
    });

    it('handles click events', async () => {
        const el = testFixture.querySelector('#checkbox1') as Checkbox;
        expect(el.checked).to.be.true;

        inputForCheckbox(el).click();
        await elementUpdated(el);

        expect(el.checked).to.be.false;

        return true;
    });
});
