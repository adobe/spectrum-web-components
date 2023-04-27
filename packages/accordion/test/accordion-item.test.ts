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

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';

import '@spectrum-web-components/accordion/sp-accordion-item.js';
import { AccordionItem } from '@spectrum-web-components/accordion/src/AccordionItem.js';
import { sendKeys } from '@web/test-runner-commands';

describe('Accordion Item', () => {
    it('can exist with no parent accessibly', async () => {
        const el = await fixture<AccordionItem>(
            html`
                <sp-accordion-item label="item">
                    <div>Item 1</div>
                </sp-accordion-item>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('can be `[disabled]`', async () => {
        const toggleSpy = spy();
        const handleToggle = (): void => toggleSpy();
        const el = await fixture<AccordionItem>(
            html`
                <sp-accordion-item
                    disabled
                    @sp-accordion-item-toggle=${handleToggle}
                >
                    <div>Item 1</div>
                </sp-accordion-item>
            `
        );

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

    it('dispatches toggle event on enter key', async () => {
        let open = false;
        const onAccordionToggle = (): void => {
            open = true;
        };
        const el = await fixture<AccordionItem>(
            html`
                <sp-accordion-item
                    disabled
                    @sp-accordion-item-toggle=${onAccordionToggle}
                >
                    <div>Item 1</div>
                </sp-accordion-item>
            `
        );

        await elementUpdated(el);

        expect(open).to.be.false;

        el.focus();
        await sendKeys({
            press: 'Enter',
        });

        await elementUpdated(el);

        expect(open).to.be.false;

        el.disabled = false;
        await elementUpdated(el);

        el.focus();
        await sendKeys({
            press: 'Enter',
        });

        await elementUpdated(el);

        expect(open).to.be.true;
    });

    it('dispatches toggle event on space key', async () => {
        let open = false;
        const onAccordionToggle = (): void => {
            open = true;
        };
        const el = await fixture<AccordionItem>(
            html`
                <sp-accordion-item
                    disabled
                    @sp-accordion-item-toggle=${onAccordionToggle}
                >
                    <div>Item 1</div>
                </sp-accordion-item>
            `
        );

        await elementUpdated(el);

        expect(open).to.be.false;

        el.focus();
        await sendKeys({
            press: 'Space',
        });

        await elementUpdated(el);

        expect(open).to.be.false;

        el.disabled = false;
        await elementUpdated(el);

        el.focus();
        await sendKeys({
            press: 'Space',
        });

        await elementUpdated(el);

        expect(open).to.be.true;
    });

    it('does not dispatch toggle events on key events in Item content', async () => {
        let closed = false;
        const onAccordionToggle = (): void => {
            closed = true;
        };
        const el = await fixture<AccordionItem>(
            html`
                <sp-accordion-item
                    open
                    @sp-accordion-item-toggle=${onAccordionToggle}
                >
                    <div>
                        <button>Test Button</button>
                    </div>
                </sp-accordion-item>
            `
        );

        const button = el.querySelector('button') as HTMLButtonElement;
        await elementUpdated(el);

        expect(el.open).to.be.true;
        expect(closed).to.be.false;

        button.focus();
        await sendKeys({
            press: 'Space',
        });

        await elementUpdated(el);

        expect(closed).to.be.false;

        await elementUpdated(el);

        await sendKeys({
            press: 'Enter',
        });

        await elementUpdated(el);

        expect(closed).to.be.false;
        expect(el.open).to.be.true;
    });
});
