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

import '@spectrum-web-components/switch/sp-switch.js';
import { Switch } from '@spectrum-web-components/switch';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

function inputForSwitch(checkbox: Switch): HTMLInputElement {
    if (!checkbox.shadowRoot) throw new Error('No shadowRoot');
    return checkbox.shadowRoot.querySelector('#input') as HTMLInputElement;
}

function labelForSwitch(checkbox: Switch): HTMLLabelElement {
    if (!checkbox.shadowRoot) throw new Error('No shadowRoot');
    const labelEl = checkbox.shadowRoot.querySelector('label');
    if (!labelEl) {
        throw new Error('Failed to find label in shadowRoot');
    }
    return labelEl;
}

describe('Switch', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Switch>(html`
                <sp-switch>Not Checked</sp-switch>
            `)
    );
    it('loads default switch accessibly', async () => {
        const el = await fixture<Switch>(html`
            <sp-switch>Not Checked</sp-switch>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();

        const labelEl = labelForSwitch(el);
        const inputEl = inputForSwitch(el);

        expect(labelEl.getAttribute('for')).to.equal(inputEl.id);
    });
    it('has name attribute', async () => {
        const el = await fixture<Switch>(html`
            <sp-switch>Not Checked</sp-switch>
        `);

        await elementUpdated(el);

        await expect(el.hasAttribute('name'));
    });
    it('loads `checked` switch accessibly', async () => {
        const el = await fixture<Switch>(html`
            <sp-switch checked>Checked</sp-switch>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();

        const labelEl = labelForSwitch(el);
        const inputEl = inputForSwitch(el);

        expect(labelEl.getAttribute('for')).to.equal(inputEl.id);
    });

    it('maintains its value when [readonly]', async () => {
        const el = await fixture<Switch>(html`
            <sp-switch checked readonly>Component</sp-switch>
        `);
        expect(el.checked).to.be.true;

        el.click();
        await elementUpdated(el);

        expect(el.checked).to.be.true;
    });
});
