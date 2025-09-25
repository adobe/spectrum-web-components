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

import { elementUpdated, expect, fixture, nextFrame } from '@open-wc/testing';

import { TopNav, TopNavItem } from '@spectrum-web-components/top-nav';
import { spy } from 'sinon';
import {
    mouseClickOn,
    testForLitDevWarnings,
} from '../../../test/testing-helpers';
import { Default, Selected } from '../stories/top-nav.stories.js';

describe('TopNav', () => {
    testForLitDevWarnings(async () => await fixture<TopNav>(Default()));
    it('loads default top-nav accessibly', async () => {
        const el = await fixture<TopNav>(Default());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('accepts and removes `label` accessibly', async () => {
        const el = await fixture<TopNav>(Default());

        await elementUpdated(el);

        el.label = 'Page';
        await elementUpdated(el);
        await expect(el).to.be.accessible();

        el.label = '';
        await elementUpdated(el);
        await expect(el).to.be.accessible();
    });
    it('loads with a selected item accessible', async () => {
        const el = await fixture<TopNav>(Selected());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('updates indicator size when Nav Item content changes', async () => {
        const el = await fixture<TopNav>(Selected());

        await elementUpdated(el);

        const items = [...el.querySelectorAll('sp-top-nav-item')];
        await Promise.all(items.map((item) => elementUpdated(item)));

        const indicator = el.shadowRoot.querySelector(
            '#selection-indicator'
        ) as HTMLDivElement;
        const { width: widthStart } = indicator.getBoundingClientRect();

        const selectedItem = el.querySelector(
            `[href="${el.selected}"]`
        ) as TopNavItem;
        selectedItem.innerHTML = '0';

        // Wait for slotchange time before continuing the test.
        await nextFrame();
        await nextFrame();

        const { width: widthEnd } = indicator.getBoundingClientRect();

        expect(
            widthStart,
            `${widthStart} is not greater than ${widthEnd}`
        ).to.be.greaterThan(widthEnd);
    });
    it('can have an item removed', async () => {
        const el = await fixture<TopNav>(Selected());
        const item = el.querySelector('.selected') as TopNavItem;

        await elementUpdated(el);
        await elementUpdated(item);

        expect(el.selected).to.equal(item.value);

        item.remove();
        await elementUpdated(el);

        expect(el.selected).to.not.equal(item.value);
    });
});

describe('TopNavItem', () => {
    it('passes click to `<a>`', async () => {
        const clickSpy = spy();
        const test = await fixture<TopNav>(Selected());
        const el = test.querySelector(
            'sp-top-nav-item:nth-of-type(4)'
        ) as TopNavItem;
        const anchor = el.focusElement;
        test.addEventListener('click', (event: Event) => {
            event.preventDefault();
            const target = event.composedPath()[0];
            clickSpy(target);
        });
        await elementUpdated(el);

        el.click();

        expect(clickSpy.called).to.be.true;
        expect(clickSpy.calledWith(anchor)).to.be.true;
    });
    it('`<a>` accepts click across full item area', async () => {
        const clickSpy = spy();
        const test = await fixture<TopNav>(Selected());
        const el = test.querySelector(
            'sp-top-nav-item:nth-of-type(4)'
        ) as TopNavItem;
        const anchor = el.focusElement;
        test.addEventListener('click', (event: Event) => {
            event.preventDefault();
            const target = event.composedPath()[0];
            clickSpy(target);
        });
        await elementUpdated(el);

        await mouseClickOn(el);
        await elementUpdated(test);

        expect(clickSpy.called).to.be.true;
        expect(clickSpy.calledWith(anchor)).to.be.true;
    });
});
