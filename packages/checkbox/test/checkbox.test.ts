/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import '@spectrum-web-components/checkbox/sp-checkbox.js';
import { Checkbox } from '../';
import {
    elementUpdated,
    expect,
    fixture,
    html,
    triggerBlurFor,
    waitUntil,
} from '@open-wc/testing';
import '@spectrum-web-components/shared/src/focus-visible.js';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { a11ySnapshot, findAccessibilityNode } from '@web/test-runner-commands';

function inputForCheckbox(checkbox: Checkbox): HTMLInputElement {
    if (!checkbox.shadowRoot) throw new Error('No shadowRoot');
    return checkbox.shadowRoot.querySelector('#input') as HTMLInputElement;
}

function labelForCheckbox(checkbox: Checkbox): HTMLLabelElement {
    if (!checkbox.shadowRoot) throw new Error('No shadowRoot');
    const labelEl = checkbox.shadowRoot.querySelector('label');
    if (!labelEl) {
        throw new Error('Failed to find label in shadowRoot');
    }
    return labelEl;
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
        testFixture = await fixture<HTMLDivElement>(html`
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
        `);
    });

    it('loads', async () => {
        const el = testFixture.querySelector('sp-checkbox') as Checkbox;
        expect(el).to.not.equal(undefined);
        const textNode = labelNodeForCheckbox(el);
        const content = (textNode.textContent || '').trim();
        expect(content).to.equal('Component');
    });
    testForLitDevWarnings(
        async () =>
            await fixture<Checkbox>(html`
                <sp-checkbox>Not Checked</sp-checkbox>
            `)
    );

    it('loads default checkbox accessibly', async () => {
        const el = await fixture<Checkbox>(html`
            <sp-checkbox>Not Checked</sp-checkbox>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();

        const labelEl = labelForCheckbox(el);
        const inputEl = inputForCheckbox(el);

        expect(labelEl.getAttribute('for')).to.equal(inputEl.id);
        expect(inputEl.checked).to.be.false;
        expect(inputEl.indeterminate).to.be.false;

        type NamedRoledAndCheckedNode = {
            name: string;
            role: string;
            checked: boolean;
        };
        const snapshot = (await a11ySnapshot(
            {}
        )) as unknown as NamedRoledAndCheckedNode & {
            children: NamedRoledAndCheckedNode[];
        };
        expect(
            findAccessibilityNode<NamedRoledAndCheckedNode>(
                snapshot,
                (node) =>
                    node.role === 'checkbox' &&
                    !node.checked &&
                    node.name === 'Not Checked'
            ),
            'Has a named and not checked "checkbox" element'
        ).to.not.be.null;
    });

    it('loads `checked` checkbox accessibly', async () => {
        const el = await fixture<Checkbox>(html`
            <sp-checkbox checked>Checked</sp-checkbox>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();

        const labelEl = labelForCheckbox(el);
        const inputEl = inputForCheckbox(el);

        expect(labelEl.getAttribute('for')).to.equal(inputEl.id);
        expect(inputEl.checked).to.be.true;
        expect(inputEl.indeterminate).to.be.false;

        type NamedRoledAndCheckedNode = {
            name: string;
            role: string;
            checked: boolean;
        };
        const snapshot = (await a11ySnapshot(
            {}
        )) as unknown as NamedRoledAndCheckedNode & {
            children: NamedRoledAndCheckedNode[];
        };
        expect(
            findAccessibilityNode<NamedRoledAndCheckedNode>(
                snapshot,
                (node) =>
                    node.role === 'checkbox' &&
                    node.checked &&
                    node.name === 'Checked'
            ),
            'Has a named and checked "checkbox" element'
        ).to.not.be.null;
    });

    it('is `invalid` checkbox accessibly', async () => {
        const el = await fixture<Checkbox>(html`
            <sp-checkbox invalid>Invalid Not Checked</sp-checkbox>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();

        const labelEl = labelForCheckbox(el);
        const inputEl = inputForCheckbox(el);

        expect(labelEl.getAttribute('for')).to.equal(inputEl.id);
        expect(inputEl).to.have.attribute('aria-invalid', 'true');
    });

    it('autofocuses', async () => {
        const autoElement = testFixture.querySelector(
            'sp-checkbox[autofocus]'
        ) as Checkbox;

        expect(autoElement).to.exist;
        await waitUntil(
            () => document.activeElement === autoElement,
            'Autofocused'
        );

        await triggerBlurFor(autoElement);

        expect(document.activeElement).to.not.equal(autoElement);
    });

    it('`click()`ing host clicks `focusElement`', async () => {
        const el = await fixture<Checkbox>(html`
            <sp-checkbox checked autofocus>Checked</sp-checkbox>
        `);

        await elementUpdated(el);

        expect(el.checked, 'checked initially').to.be.true;

        el.click();
        await elementUpdated(el);

        expect(el.checked, 'unchecked').to.be.false;

        el.click();
        await elementUpdated(el);

        expect(el.checked, 'checked again').to.be.true;
    });

    it('respects checked attribute', () => {
        let el = testFixture.querySelector('#checkbox0') as Checkbox;
        expect(el.checked).to.be.false;

        el = testFixture.querySelector('#checkbox1') as Checkbox;
        expect(el.checked).to.be.true;
    });

    it('has name attribute', () => {
        let el = testFixture.querySelector('#checkbox0') as Checkbox;

        el = testFixture.querySelector('#checkbox1') as Checkbox;
        expect(el.hasAttribute('name'));
        expect(el.name).to.be.undefined;
        el.setAttribute('name', 'test');
        expect(el.name).to.be.equal('test');
    });

    it('handles click events', async () => {
        const el = testFixture.querySelector('#checkbox1') as Checkbox;
        expect(el.checked).to.be.true;

        inputForCheckbox(el).click();
        await elementUpdated(el);

        expect(el.checked).to.be.false;
    });

    it('can have `change` events cancelled', async () => {
        const el = testFixture.querySelector('#checkbox0') as Checkbox;
        await elementUpdated(el);
        expect(el.checked).to.be.false;

        inputForCheckbox(el).click();
        await elementUpdated(el);

        expect(el.checked).to.be.true;

        el.addEventListener('change', (event: Event) => event.preventDefault());
        inputForCheckbox(el).click();
        await elementUpdated(el);

        expect(el.checked).to.be.true;
    });
    it('should recognize readonly property', async () => {
        const el: Checkbox = await fixture('<sp-checkbox></sp-checkbox>');
        expect(el.readonly).to.not.throw;
        expect(el.readonly).to.be.a('boolean');
    });
    it('maintains its value when [readonly]', async () => {
        const el = await fixture<Checkbox>(html`
            <sp-checkbox id="checkbox0" checked readonly>Component</sp-checkbox>
        `);
        expect(el.checked).to.be.true;

        inputForCheckbox(el).click();
        await elementUpdated(el);

        expect(el.checked).to.be.true;
    });

    it('`indeterminate, checked` becomes `not checked` on click', async () => {
        const el = await fixture<Checkbox>(html`
            <sp-checkbox checked .indeterminate=${true}>
                indeterminate, checked
            </sp-checkbox>
        `);
        expect(el.checked).to.be.true;
        expect(el.indeterminate).to.be.true;

        const inputEl = inputForCheckbox(el);
        expect(inputEl.checked).to.be.true;
        expect(inputEl.indeterminate).to.be.true;

        el.click();
        await elementUpdated(el);

        expect(el.checked).to.be.false;
        expect(el.indeterminate).to.be.false;
        expect(inputEl.checked).to.be.false;
        expect(inputEl.indeterminate).to.be.false;
    });

    it('`indeterminate, not checked` becomes `checked` on click', async () => {
        const el = await fixture<Checkbox>(html`
            <sp-checkbox .indeterminate=${true}>
                indeterminate, checked
            </sp-checkbox>
        `);
        expect(el.checked).to.be.false;
        expect(el.indeterminate).to.be.true;

        const inputEl = inputForCheckbox(el);
        expect(inputEl.checked).to.be.false;
        expect(inputEl.indeterminate).to.be.true;

        el.click();
        await elementUpdated(el);

        expect(el.checked).to.be.true;
        expect(el.indeterminate).to.be.false;
        expect(inputEl.checked).to.be.true;
        expect(inputEl.indeterminate).to.be.false;
    });

    it('updates checkmark icons in response to size', async function () {
        const el = await fixture<Checkbox>(html`
            <sp-checkbox checked>sizes checkbox</sp-checkbox>
        `);

        const getCheckmarkLocalName = (): string => {
            return (el.shadowRoot.querySelector('#checkmark') as HTMLElement)
                .localName;
        };

        expect(el.size).to.equal('m');
        let checkmarkLocalname = getCheckmarkLocalName();
        el.size = 's';
        await elementUpdated(el);
        expect(getCheckmarkLocalName()).to.not.equal(checkmarkLocalname);

        checkmarkLocalname = getCheckmarkLocalName();
        el.size = 'l';
        await elementUpdated(el);
        expect(getCheckmarkLocalName()).to.not.equal(checkmarkLocalname);

        checkmarkLocalname = getCheckmarkLocalName();
        el.size = 'xl';
        await elementUpdated(el);
        expect(getCheckmarkLocalName()).to.not.equal(checkmarkLocalname);
    });

    it('updates partialCheckmark icons in response to size', async function () {
        const el = await fixture<Checkbox>(html`
            <sp-checkbox indeterminate>sizes checkbox</sp-checkbox>
        `);

        const getPartialCheckmarkLocalName = (): string => {
            return (
                el.shadowRoot.querySelector('#partialCheckmark') as HTMLElement
            ).localName;
        };

        expect(el.size).to.equal('m');
        let partialCheckmarkLocalname = getPartialCheckmarkLocalName();
        el.size = 's';
        await elementUpdated(el);
        expect(getPartialCheckmarkLocalName()).to.not.equal(
            partialCheckmarkLocalname
        );

        partialCheckmarkLocalname = getPartialCheckmarkLocalName();
        el.size = 'l';
        await elementUpdated(el);
        expect(getPartialCheckmarkLocalName()).to.not.equal(
            partialCheckmarkLocalname
        );

        partialCheckmarkLocalname = getPartialCheckmarkLocalName();
        el.size = 'xl';
        await elementUpdated(el);
        expect(getPartialCheckmarkLocalName()).to.not.equal(
            partialCheckmarkLocalname
        );
    });

    it('updates tabindex when no longer disabled', async function () {
        const el = await fixture<Checkbox>(html`
            <sp-checkbox disabled>disabled checkbox</sp-checkbox>
        `);
        el.click();
        await elementUpdated(el);
        expect(el.checked).to.be.false;
        expect(el.tabIndex).to.equal(-1);
        el.removeAttribute('disabled');
        await elementUpdated(el);
        expect(el.tabIndex).to.equal(0);
    });
});
