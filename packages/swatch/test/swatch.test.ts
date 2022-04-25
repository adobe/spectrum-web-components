/*
Copyright 2022 Adobe. All rights reserved.
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
import { sendKeys } from '@web/test-runner-commands';

import '../sp-swatch.js';
import { Swatch } from '../src/Swatch.js';
import { ElementSize } from '@spectrum-web-components/base';

describe('Swatch', () => {
    let el: Swatch;
    beforeEach(async () => {
        el = await fixture<Swatch>(
            html`
                <sp-swatch color="red" label="Red"></sp-swatch>
            `
        );

        await elementUpdated(el);
    });
    it(`loads default swatch accessibly`, async () => {
        await expect(el).to.be.accessible();
    });
    it('loads [nothing] swatch accessibly', async () => {
        el.nothing = true;
        el.removeAttribute('color');
        el.label = 'Transparent';

        await expect(el).to.be.accessible();
        expect(el.getAttribute('aria-label')).to.equal('Transparent');
    });
    (['xs', 's', 'm', 'l'] as ElementSize[]).map((size) => {
        it(`loads [mixed-value] swatch accessibly as [size=${size}]`, async () => {
            el.mixedValue = true;
            el.removeAttribute('color');
            el.label = 'Mixed Value';
            el.size = size;

            await expect(el).to.be.accessible();
            expect(el.getAttribute('aria-label')).to.equal('Mixed Value');
        });
    });
    it('toggles on `click`', async () => {
        expect(el.selected).to.be.false;

        el.click();

        expect(el.selected).to.be.true;
        await expect(el).to.be.accessible();
    });
    it('toggles on `click` as [role="checkbox"]', async () => {
        el.role = 'checkbox';
        await elementUpdated(el);

        expect(el.selected).to.be.false;
        await expect(el).to.be.accessible();

        el.click();

        expect(el.selected).to.be.true;
        await expect(el).to.be.accessible();
    });
    it('toggles on `Space`', async () => {
        expect(el.selected).to.be.false;

        el.focus();
        await sendKeys({
            press: 'Space',
        });

        expect(el.selected).to.be.true;
    });
    it('toggles on `Enter`', async () => {
        expect(el.selected).to.be.false;

        el.focus();
        await sendKeys({
            press: 'Enter',
        });

        expect(el.selected).to.be.true;

        await sendKeys({
            press: 'NumpadEnter',
        });

        expect(el.selected).to.be.false;
    });
    it('dispatches `change`', async () => {
        const changeSpy = spy();

        el.addEventListener('change', () => changeSpy());

        el.click();

        expect(changeSpy.calledOnce).to.be.true;
    });
    it('does not dispatch `change` when [disabled]', async () => {
        const changeSpy = spy();

        el.addEventListener('change', () => changeSpy());
        el.disabled = true;
        await elementUpdated(el);

        el.click();

        expect(changeSpy.calledOnce).to.be.false;
    });
    it('does not dispatch `change` when [mixed-value]', async () => {
        const changeSpy = spy();

        el.addEventListener('change', () => changeSpy());
        el.mixedValue = true;
        await elementUpdated(el);

        el.click();

        expect(changeSpy.calledOnce).to.be.false;
    });
    it('can have `change` prevented', async () => {
        el.addEventListener('change', (event: Event) => {
            event.preventDefault();
        });

        expect(el.selected).to.false;

        el.click();

        expect(el.selected).to.false;
    });
    it('is in the tab order', async () => {
        const inputBefore = document.createElement('input');
        const inputAfter = document.createElement('input');
        el.insertAdjacentElement('beforebegin', inputBefore);
        el.insertAdjacentElement('afterend', inputAfter);
        inputBefore.focus();
        expect(document.activeElement === el).to.be.false;
        await sendKeys({
            press: 'Tab',
        });
        expect(document.activeElement === el).to.be.true;
        await sendKeys({
            press: 'Tab',
        });
        expect(document.activeElement === el).to.be.false;
        await sendKeys({
            press: 'Shift+Tab',
        });
        expect(document.activeElement === el).to.be.true;
    });
    it('is not in the tab order when [disabled]', async () => {
        const inputBefore = document.createElement('input');
        const inputAfter = document.createElement('input');
        el.insertAdjacentElement('beforebegin', inputBefore);
        el.insertAdjacentElement('afterend', inputAfter);
        inputBefore.focus();
        el.disabled = true;
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;
        await sendKeys({
            press: 'Tab',
        });
        expect(document.activeElement === el).to.be.false;
        await sendKeys({
            press: 'Shift+Tab',
        });
        expect(document.activeElement === el).to.be.false;
    });
});
