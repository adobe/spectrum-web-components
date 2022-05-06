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

import '../sp-accordion.js';
import { Default } from '../stories/accordion.stories.js';
import { Accordion, AccordionItem } from '@spectrum-web-components/accordion';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';

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
    it('does not accept keyboard events when items are not present', async () => {
        const errorSpy = spy();
        const el = await fixture<Accordion>(
            html`
                <sp-accordion>
                    <sp-accordion-item disabled label="Heading 2">
                        <div>Item 2</div>
                    </sp-accordion-item>
                </sp-accordion>
            `
        );

        await elementUpdated(el);
        const item = el.querySelector('sp-accordion-item') as AccordionItem;
        window.addEventListener('error', () => errorSpy());

        el.focus();
        item.remove();
        await elementUpdated(el);
        el.dispatchEvent(
            new KeyboardEvent('keydown', {
                code: 'ArrowDown',
            })
        );

        expect(errorSpy.callCount).to.equal(0);
    });
    it('does not accept focus when all children [disabled]', async () => {
        const el = await fixture<Accordion>(
            html`
                <sp-accordion>
                    <sp-accordion-item disabled label="Heading 1">
                        <div>Item 1</div>
                    </sp-accordion-item>
                    <sp-accordion-item disabled label="Heading 2">
                        <div>Item 2</div>
                    </sp-accordion-item>
                </sp-accordion>
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
    it('can have `toggle` events canceled', async () => {
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

        el.addEventListener('sp-accordion-item-toggle', (event: Event) =>
            event.preventDefault()
        );

        secondButton.click();
        await elementUpdated(el);
        expect(firstItem.open).to.be.true;
        expect(secondItem.open).to.be.false;
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
        const thirdItem = el.querySelector(
            'sp-accordion-item:nth-of-type(3)'
        ) as AccordionItem;
        const fourthItem = el.querySelector(
            'sp-accordion-item:nth-of-type(4)'
        ) as AccordionItem;
        const isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
        );
        const tab = isSafari ? 'Alt+Tab' : 'Tab';
        const shiftTab = isSafari ? 'Alt+Shift+Tab' : 'Shift+Tab';

        el.focus();

        await elementUpdated(el);
        expect(document.activeElement === secondItem).to.be.true;

        await sendKeys({
            press: tab,
        });

        expect(document.activeElement === thirdItem).to.be.true;

        await sendKeys({
            press: tab,
        });

        expect(document.activeElement === fourthItem).to.be.true;

        await sendKeys({
            press: shiftTab,
        });
        await sendKeys({
            press: shiftTab,
        });

        expect(document.activeElement === secondItem).to.be.true;

        document.body.focus();

        el.focus();
        expect(document.activeElement === secondItem).to.be.true;

        await sendKeys({
            press: shiftTab,
        });
        await elementUpdated(el);

        const outsideFocused = document.activeElement as HTMLElement;

        expect(typeof outsideFocused).not.to.equal(AccordionItem);
        expect(typeof outsideFocused).not.to.equal(Accordion);
    });
});
