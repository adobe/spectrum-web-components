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

import '../sp-checkbox.js';
import { Checkbox } from '../';
import {
    fixture,
    elementUpdated,
    triggerBlurFor,
    html,
    expect,
    nextFrame,
} from '@open-wc/testing';
import { waitForPredicate } from '../../../test/testing-helpers.js';
import '@spectrum-web-components/shared/src/focus-visible.js';

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
    });

    it('loads', async () => {
        const el = testFixture.querySelector('sp-checkbox') as Checkbox;

        await waitForPredicate(() => !!window.applyFocusVisiblePolyfill);

        expect(el).to.not.equal(undefined);
        expect(el).dom.to.equal(`
            <sp-checkbox data-js-focus-visible="" id="checkbox0" tabindex="5">
                Component
            </sp-checkbox>
        `);
        const textNode = labelNodeForCheckbox(el);
        const content = (textNode.textContent || '').trim();
        expect(content).to.equal('Component');
    });

    it('loads default checkbox accessibly', async () => {
        const el = await fixture<Checkbox>(
            html`
                <sp-checkbox>Not Checked</sp-checkbox>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('loads `checked` checkbox accessibly', async () => {
        const el = await fixture<Checkbox>(
            html`
                <sp-checkbox checked>Checked</sp-checkbox>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('is `invalid` checkbox accessibly', async () => {
        const el = await fixture<Checkbox>(
            html`
                <sp-checkbox invalid>Invalid Checked</sp-checkbox>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('autofocuses', async () => {
        const autoElement = testFixture.querySelector(
            'sp-checkbox[autofocus]'
        ) as Checkbox;

        expect(autoElement).to.exist;
        expect(document.activeElement).to.equal(autoElement);

        await triggerBlurFor(autoElement);

        expect(document.activeElement).to.not.equal(autoElement);
    });

    it('`click()`ing host clicks `focusElement`', async () => {
        const el = await fixture<Checkbox>(
            html`
                <sp-checkbox checked autofocus>Checked</sp-checkbox>
            `
        );

        await elementUpdated(el);

        expect(el.checked, 'checked initially').to.be.true;

        el.click();
        await elementUpdated(el);

        expect(el.checked, 'unchecked').to.be.false;

        el.click();
        await elementUpdated(el);

        expect(el.checked, 'checked again').to.be.true;
    });

    it('focus is not relenquished to host on second click', async () => {
        const el = await fixture<Checkbox>(
            html`
                <sp-checkbox checked>Checked</sp-checkbox>
            `
        );

        await elementUpdated(el);

        const root = el.shadowRoot ? el.shadowRoot : document;
        expect(
            document.activeElement,
            'based on autofocus external'
        ).to.not.equal(el);
        expect(root.activeElement, 'based on autofocus internal').to.not.equal(
            el.focusElement
        );

        // emulate the events that occur during a "second click" on the `:host()`
        el.dispatchEvent(new CustomEvent('focusin'));
        HTMLElement.prototype.focus.apply(el);
        el.focusElement.dispatchEvent(new CustomEvent('focusout'));
        await nextFrame();
        await nextFrame();
        expect(
            document.activeElement,
            'based on repeated click external'
        ).to.equal(el);
        expect(root.activeElement, 'based on repeated click internal').to.equal(
            el.focusElement
        );
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
    });
});
