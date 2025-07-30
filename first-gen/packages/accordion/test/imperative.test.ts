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

import { elementUpdated, expect, fixture } from '@open-wc/testing';

import { Accordion, AccordionItem } from '@spectrum-web-components/accordion';

import { Default } from '../stories/accordion.stories.js';
import { AccordionMarkup } from '../stories/index.js';

describe('Accordion - imperative interactions', () => {
    it('manages item size', async () => {
        const el = await fixture<Accordion>(
            AccordionMarkup({
                size: 'l',
            })
        );
        const item = el.querySelector('sp-accordion-item') as AccordionItem;
        expect(el.size).to.equal('l');
        expect(item.size).to.equal('l');

        el.size = 's';
        await elementUpdated(el);
        await elementUpdated(item);
        expect(el.size).to.equal('s');
        expect(item.size).to.equal('s');
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

        const firstButton = firstItem.focusElement;
        const secondButton = secondItem.focusElement;

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
        const el = await fixture<Accordion>(Default());
        el.allowMultiple = true;
        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-accordion-item:nth-of-type(1)'
        ) as AccordionItem;
        const secondItem = el.querySelector(
            'sp-accordion-item:nth-of-type(2)'
        ) as AccordionItem;

        const firstButton = firstItem.focusElement;
        const secondButton = secondItem.focusElement;

        firstButton.click();
        await elementUpdated(el);

        expect(firstItem.open).to.be.true;
        expect(secondItem.open).to.be.false;

        secondButton.click();
        await elementUpdated(el);

        expect(firstItem.open).to.be.true;
        expect(secondItem.open).to.be.true;
    });
    it('ensures that the correct item is open and that items can be closed', async () => {
        const el = await fixture<Accordion>(Default());

        await elementUpdated(el);
        const firstItem = el.querySelector(
            'sp-accordion-item:nth-of-type(1)'
        ) as AccordionItem;
        const secondItem = el.querySelector(
            'sp-accordion-item:nth-of-type(2)'
        ) as AccordionItem;

        const firstButton = firstItem.focusElement;
        const secondButton = secondItem.focusElement;

        firstButton.click();
        await elementUpdated(el);
        expect(firstItem.open).to.be.true;
        expect(secondItem.open).to.be.false;

        secondButton.click();
        await elementUpdated(el);
        expect(firstItem.open).to.be.false;
        expect(secondItem.open).to.be.true;

        secondButton.click();
        await elementUpdated(el);
        expect(firstItem.open).to.be.false;
        expect(secondItem.open).to.be.false;
    });
    it('ensures that the correct item is open and that items can be closed when [allow-multiple]', async () => {
        const el = await fixture<Accordion>(Default());
        el.allowMultiple = true;
        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-accordion-item:nth-of-type(1)'
        ) as AccordionItem;
        const secondItem = el.querySelector(
            'sp-accordion-item:nth-of-type(2)'
        ) as AccordionItem;

        const firstButton = firstItem.focusElement;
        const secondButton = secondItem.focusElement;

        firstButton.click();
        await elementUpdated(el);

        expect(firstItem.open).to.be.true;
        expect(secondItem.open).to.be.false;

        secondButton.click();
        await elementUpdated(el);

        expect(firstItem.open).to.be.true;
        expect(secondItem.open).to.be.true;

        secondButton.click();
        await elementUpdated(el);

        expect(firstItem.open).to.be.true;
        expect(secondItem.open).to.be.false;
    });
});
