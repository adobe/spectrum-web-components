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

import { html } from '@spectrum-web-components/base';
import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { spy } from 'sinon';

import { Accordion, AccordionItem } from '@spectrum-web-components/accordion';
import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';

describe('Accordion - declarative', () => {
    it('does not accept focus when empty', async () => {
        const el = await fixture<Accordion>(html`
            <sp-accordion></sp-accordion>
        `);

        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;
    });
    it('does not accept focus when all children [disabled]', async () => {
        const el = await fixture<Accordion>(html`
            <sp-accordion>
                <sp-accordion-item disabled label="Heading 1">
                    <div>Item 1</div>
                </sp-accordion-item>
                <sp-accordion-item disabled label="Heading 2">
                    <div>Item 2</div>
                </sp-accordion-item>
            </sp-accordion>
        `);

        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;
    });
});

describe('Accordion Item - declarative', () => {
    it('can be `[disabled]`', async () => {
        const toggleSpy = spy();
        const handleToggle = (): void => toggleSpy();
        const el = await fixture<AccordionItem>(html`
            <sp-accordion-item
                disabled
                @sp-accordion-item-toggle=${handleToggle}
            >
                <div>Item 1</div>
            </sp-accordion-item>
        `);

        const root = el.shadowRoot as ShadowRoot;
        const button = root.querySelector('#header') as HTMLElement;

        await elementUpdated(el);

        expect(toggleSpy.callCount).to.equal(0);

        button.click();

        await elementUpdated(el);

        expect(toggleSpy.callCount).to.equal(0);

        el.disabled = false;
        await elementUpdated(el);

        button.click();

        await elementUpdated(el);

        expect(toggleSpy.callCount).to.equal(1);
    });
});
