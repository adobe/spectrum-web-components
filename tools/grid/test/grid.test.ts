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

import { elementUpdated, expect, fixture, nextFrame } from '@open-wc/testing';
import { html } from '@spectrum-web-components/base';
import { Card } from '@spectrum-web-components/card';

import '../sp-grid.js';
import { Grid } from '..';
import { Default } from '../stories/grid.stories.js';
import { sendKeys } from '@web/test-runner-commands';

describe('Grid', () => {
    it('loads default grid accessibly', async () => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>${Default()}</div>
            `
        );
        const el = test.querySelector('sp-grid') as Grid;

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('accepts focus', async () => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>${Default()}</div>
            `
        );
        const el = test.querySelector('sp-grid') as Grid;

        await elementUpdated(el);

        expect(el.tabIndex).to.equal(0);

        el.focus();

        await nextFrame();
        await nextFrame();

        expect(
            el.querySelector(el.focusableSelector) === document.activeElement
        ).to.be.true;
    });
    it('allows to tab in and out', async () => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>${Default()}</div>
            `
        );
        const el = test.querySelector('sp-grid') as Grid;
        const firstInput = test.querySelector('#first-input') as HTMLElement;
        const lastInput = test.querySelector('#last-input') as HTMLElement;

        await elementUpdated(el);

        expect(el.tabIndex).to.equal(0);

        firstInput.focus();
        expect(firstInput === document.activeElement).to.be.true;
        expect(el.tabIndex).to.equal(0);

        await sendKeys({
            press: 'Tab',
        });

        await nextFrame();
        await nextFrame();

        expect(
            el.querySelector(el.focusableSelector) === document.activeElement
        ).to.be.true;
        expect(el.tabIndex).to.equal(-1);

        await sendKeys({
            press: 'Tab',
        });

        await nextFrame();
        await nextFrame();

        await elementUpdated(el);
        expect(lastInput === document.activeElement).to.be.true;
        expect(el.tabIndex).to.equal(0);

        await sendKeys({
            press: 'Shift+Tab',
        });

        await nextFrame();
        await nextFrame();
        await nextFrame();
        await nextFrame();

        expect(
            el.querySelector(el.focusableSelector) === document.activeElement
        ).to.be.true;
        expect(el.tabIndex).to.equal(-1);
    });
    it('manages roving tabindex', async () => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>${Default()}</div>
            `
        );
        const el = test.querySelector('sp-grid') as Grid;

        await elementUpdated(el);

        expect(el.tabIndex).to.equal(0);

        el.focus();

        await nextFrame();
        await nextFrame();

        let focused = el.querySelector(el.focusableSelector) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({
            press: 'ArrowRight',
        });

        focused = el.querySelector(
            `${el.focusableSelector}:nth-child(2)`
        ) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({
            press: 'ArrowDown',
        });

        focused = el.querySelector(
            `${el.focusableSelector}:nth-child(5)`
        ) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({
            press: 'ArrowLeft',
        });

        focused = el.querySelector(
            `${el.focusableSelector}:nth-child(4)`
        ) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({
            press: 'ArrowUp',
        });

        focused = el.querySelector(`${el.focusableSelector}`) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;
    });
    it('manages selection', async () => {
        const test = await fixture<HTMLDivElement>(
            html`
                <div>${Default()}</div>
            `
        );
        const el = test.querySelector('sp-grid') as Grid;

        await elementUpdated(el);

        expect(el.tabIndex).to.equal(0);

        el.focus();

        await nextFrame();
        await nextFrame();

        let focused = el.querySelector(el.focusableSelector) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({
            press: 'ArrowRight',
        });

        focused = el.querySelector(
            `${el.focusableSelector}:nth-child(2)`
        ) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({
            press: 'Space',
        });

        await elementUpdated(el);

        expect(el.selected).to.deep.equal([{ id: 1 }]);

        await sendKeys({
            press: 'ArrowDown',
        });

        focused = el.querySelector(
            `${el.focusableSelector}:nth-child(5)`
        ) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({
            press: 'Space',
        });

        await elementUpdated(el);

        expect(el.selected).to.deep.equal([{ id: 1 }, { id: 4 }]);

        await sendKeys({
            press: 'ArrowUp',
        });

        focused = el.querySelector(
            `${el.focusableSelector}:nth-child(2)`
        ) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({
            press: 'Space',
        });

        await elementUpdated(el);

        expect(el.selected).to.deep.equal([{ id: 4 }]);
    });
});
