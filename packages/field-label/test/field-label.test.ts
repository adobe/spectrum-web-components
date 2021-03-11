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

import { fixture, elementUpdated, expect, html } from '@open-wc/testing';
import { stub } from 'sinon';

import '@spectrum-web-components/textfield/sp-textfield.js';
import { Textfield } from '@spectrum-web-components/textfield';
import '@spectrum-web-components/picker/sp-picker.js';
import { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

import '../sp-field-label.js';
import { FieldLabel } from '..';

describe('FieldLabel', () => {
    it('loads default field-label accessibly', async () => {
        const el = await fixture<FieldLabel>(
            html`
                <div>
                    <sp-field-label for="test">Input label</sp-field-label>
                    <input id="test" />
                </div>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads [required] field-label accessibly', async () => {
        const el = await fixture<FieldLabel>(
            html`
                <div>
                    <sp-field-label required for="test">
                        Required input label
                    </sp-field-label>
                    <input id="test" />
                </div>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads with no "for"', async () => {
        const el = await fixture<FieldLabel>(
            html`
                <sp-field-label>Input label</sp-field-label>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('allows unfulfilled "for"', async () => {
        const el = await fixture<FieldLabel>(
            html`
                <sp-field-label>Input label</sp-field-label>
            `
        );
        await elementUpdated(el);
        const manageSpy = stub(
            (el as unknown) as { manageFor(): Promise<string> },
            'manageFor'
        );
        manageSpy.callsFake(
            async (...args): Promise<string> => {
                try {
                    await ((FieldLabel.prototype as unknown) as {
                        manageFor(): Promise<void>;
                    }).manageFor.apply(el, ...args);
                } catch (error) {
                    return 'Error was thrown.';
                }
                return 'No error was thrown.';
            }
        );

        el.for = 'not-available';
        await elementUpdated(el);
        const result = await manageSpy.returnValues[0];
        expect(result).to.equal('No error was thrown.');
    });
    it('associates itself to an element whose "id" matches its "for" attribute', async () => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>
                    <sp-field-label required for="test"></sp-field-label>
                    <input id="test" />
                </div>
            `
        );
        const el = test.querySelector('sp-field-label') as FieldLabel;
        const input = test.querySelector('input') as HTMLInputElement;

        await elementUpdated(el);

        expect(input.hasAttribute('aria-labelledby'));
        expect(input.getAttribute('aria-labelledby')).to.equal(el.id);
    });
    it('passed clicks to assiciated form element as focus', async () => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>
                    <sp-field-label required for="test"></sp-field-label>
                    <input id="test" />
                </div>
            `
        );
        const el = test.querySelector('sp-field-label') as FieldLabel;
        const input = test.querySelector('input') as HTMLInputElement;

        await elementUpdated(el);

        el.click();
        await elementUpdated(el);

        expect(document.activeElement === input);
    });
    it('associates itself to an element with a focueElement whose "id" matches its "for" attribute', async () => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>
                    <sp-field-label required for="test"></sp-field-label>
                    <sp-textfield id="test"></sp-textfield>
                </div>
            `
        );
        const el = test.querySelector('sp-field-label') as FieldLabel;
        const input = (test.querySelector('sp-textfield') as Textfield)
            .focusElement as HTMLInputElement;

        await elementUpdated(el);

        expect(input.hasAttribute('aria-label'));
        expect(input.getAttribute('aria-label')).to.equal(
            (el.textContent || '').trim()
        );
    });
    it('passed clicks to assiciated form element with a focueElement as focus', async () => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>
                    <sp-field-label required for="test"></sp-field-label>
                    <sp-textfield id="test"></sp-textfield>
                </div>
            `
        );
        const el = test.querySelector('sp-field-label') as FieldLabel;
        const input = test.querySelector('sp-textfield') as Textfield;

        await elementUpdated(el);

        el.click();
        await elementUpdated(el);

        expect(document.activeElement === input);
    });
    it('forces focus visible when available', async () => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>
                    <sp-field-label required for="test"></sp-field-label>
                    <sp-picker id="test">
                        <sp-menu-item>Test</sp-menu-item>
                    </sp-picker>
                </div>
            `
        );
        const el = test.querySelector('sp-field-label') as FieldLabel;
        const picker = test.querySelector('sp-picker') as Picker;

        await elementUpdated(el);
        expect(!picker.focused);

        el.click();
        await elementUpdated(el);

        expect(document.activeElement === picker);
        expect(picker.focused);
    });
});
