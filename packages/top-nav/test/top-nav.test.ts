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

import { fixture, elementUpdated, expect } from '@open-wc/testing';

import { TopNav, TopNavItem } from '..';
import { Default, Selected } from '../stories/top-nav.stories.js';
import { spy } from 'sinon';

describe('TopNav', () => {
    it('loads default top-nav accessibly', async () => {
        const el = await fixture<TopNav>(Default());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads with a selected item accessible', async () => {
        const el = await fixture<TopNav>(Selected());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
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
});
