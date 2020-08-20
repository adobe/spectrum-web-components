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

import '../sp-accordion.js';
import { Default, AllowMultiple } from '../stories/accordion.stories.js';
import { Accordion, AccordionItem } from '@spectrum-web-components/accordion';
import {
    arrowUpEvent,
    arrowDownEvent,
    shiftTabEvent,
} from '../../../test/testing-helpers.js';

describe('Accordion', () => {
    it('renders with items accessibly', async () => {
        const el = await fixture<Accordion>(Default());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('does not accept focus when empty', async () => {
        const el = await fixture<Accordion>(
            html`
                <sp-accordion></sp-accordion>
            `
        );

        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;
    });
    it('only allows one open item by default', async () => {
        const el = await fixture<Accordion>(Default());
        await elementUpdated(el);
        const firstItem = el.querySelector(
            'sp-accordion-item:nth-of-type(1)'
        ) as AccordionItem;
        const secondItem = el.querySelector(
            'sp-accordion-item:nth-of-type(2)'
        ) as AccordionItem;

        const firstRoot = firstItem.shadowRoot as ShadowRoot;
        const secondRoot = secondItem.shadowRoot as ShadowRoot;

        const firstButton = firstRoot.querySelector('button') as HTMLElement;
        const secondButton = secondRoot.querySelector('button') as HTMLElement;

        firstButton.click();
        await elementUpdated(el);
        let openItems = el.querySelectorAll('sp-accordion-item[open]');
        expect(openItems.length).to.equal(1);

        secondButton.click();
        await elementUpdated(el);
        openItems = el.querySelectorAll('sp-accordion-item[open]');
        expect(openItems.length).to.equal(1);
    });
    it('allows more than one open item when `[allow-multiple]`', async () => {
        const el = await fixture<Accordion>(AllowMultiple());

        await elementUpdated(el);
        const firstItem = el.querySelector(
            'sp-accordion-item:nth-of-type(1)'
        ) as AccordionItem;
        const secondItem = el.querySelector(
            'sp-accordion-item:nth-of-type(2)'
        ) as AccordionItem;

        const firstRoot = firstItem.shadowRoot as ShadowRoot;
        const secondRoot = secondItem.shadowRoot as ShadowRoot;

        const firstButton = firstRoot.querySelector('button') as HTMLElement;
        const secondButton = secondRoot.querySelector('button') as HTMLElement;

        firstButton.click();
        await elementUpdated(el);

        expect(firstItem.open).to.be.true;
        expect(secondItem.open).to.be.false;

        secondButton.click();
        await elementUpdated(el);

        expect(firstItem.open).to.be.true;
        expect(secondItem.open).to.be.true;
    });
    it('ensures that the correct item is open and that items cannot be closed', async () => {
        const el = await fixture<Accordion>(Default());

        await elementUpdated(el);
        const firstItem = el.querySelector(
            'sp-accordion-item:nth-of-type(1)'
        ) as AccordionItem;
        const secondItem = el.querySelector(
            'sp-accordion-item:nth-of-type(2)'
        ) as AccordionItem;

        const firstRoot = firstItem.shadowRoot as ShadowRoot;
        const secondRoot = secondItem.shadowRoot as ShadowRoot;

        const firstButton = firstRoot.querySelector('button') as HTMLElement;
        const secondButton = secondRoot.querySelector('button') as HTMLElement;

        firstButton.click();
        await elementUpdated(el);
        let openItem = el.querySelector('sp-accordion-item[open]');
        expect(openItem).to.equal(firstItem);

        secondButton.click();
        await elementUpdated(el);
        openItem = el.querySelector('sp-accordion-item[open]');
        expect(openItem).to.equal(secondItem);

        secondButton.click();
        await elementUpdated(el);
        openItem = el.querySelector('sp-accordion-item[open]');
        expect(openItem).to.equal(secondItem);
    });
    it('handles focus and keyboard input and ignores disabled items', async () => {
        const el = await fixture<Accordion>(
            html`
                <sp-accordion allow-multiple>
                    <sp-accordion-item disabled label="Heading 1">
                        <div>Item 1</div>
                    </sp-accordion-item>
                    <sp-accordion-item label="Heading 2">
                        <div>Item 2</div>
                    </sp-accordion-item>
                    <sp-accordion-item label="Heading 3">
                        <div>Item 3</div>
                    </sp-accordion-item>
                    <sp-accordion-item label="Heading 4">
                        <div>Item 4</div>
                    </sp-accordion-item>
                    <sp-accordion-item label="Heading 5">
                        <div>Item 5</div>
                    </sp-accordion-item>
                    <sp-accordion-item disabled label="Heading 6">
                        <div>Item 6</div>
                    </sp-accordion-item>
                </sp-accordion>
            `
        );

        await elementUpdated(el);

        const secondItem = el.querySelector(
            'sp-accordion-item:nth-of-type(2)'
        ) as AccordionItem;
        const thirdToLastItem = el.querySelector(
            'sp-accordion-item:nth-last-of-type(3)'
        ) as AccordionItem;
        const secondToLastItem = el.querySelector(
            'sp-accordion-item:nth-last-of-type(2)'
        ) as AccordionItem;

        el.focus();

        await elementUpdated(el);
        expect(document.activeElement === secondItem).to.be.true;

        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpEvent);

        expect(document.activeElement === thirdToLastItem).to.be.true;

        el.dispatchEvent(arrowDownEvent);

        expect(document.activeElement === secondToLastItem).to.be.true;

        el.dispatchEvent(arrowDownEvent);
        expect(document.activeElement === secondItem).to.be.true;

        document.body.focus();

        el.focus();
        const focused = el.focusElement as AccordionItem;
        expect(document.activeElement === focused).to.be.true;

        focused.dispatchEvent(shiftTabEvent);
        await elementUpdated(el);

        const outsideFocused = document.activeElement as HTMLElement;

        expect(typeof outsideFocused).not.to.equal(AccordionItem);
        expect(typeof outsideFocused).not.to.equal(Accordion);
    });
});
