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

import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/grid/sp-grid.js';
import { Grid } from '@spectrum-web-components/grid';
import { Default } from '../stories/grid.stories.js';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { isWebKit } from '@spectrum-web-components/shared';

describe('Grid', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<HTMLDivElement>(html`
                <div>${Default.render()}</div>
            `)
    );
    it('loads default grid accessibly', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default.render()}</div>
        `);
        const el = test.querySelector('sp-grid') as Grid;

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('accepts focus', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default.render()}</div>
        `);
        const el = test.querySelector('sp-grid') as Grid;

        await elementUpdated(el);

        expect(el.tabIndex).to.equal(0);

        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });

        await nextFrame();
        await nextFrame();

        if (!isWebKit()) {
            sendMouse({
                type: 'click',
                position: [0, 0],
            });
        }

        expect(
            el.querySelector(el.focusableSelector) === document.activeElement
        ).to.be.true;
    });
    it('does not focus when clicking grid', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <sp-theme color="light" scale="medium">
                ${Default.render()}
            </sp-theme>
        `);
        const el = test.querySelector('sp-grid') as Grid;

        await elementUpdated(el);

        expect(el.tabIndex).to.equal(0);

        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });

        await nextFrame();
        await nextFrame();

        const firstItem = el.querySelector(el.focusableSelector) as HTMLElement;

        expect(firstItem === document.activeElement).to.be.true;

        const firstRect = firstItem?.getBoundingClientRect();
        const position = [
            Math.round(firstRect.x + firstRect.width + 2),
            Math.round(firstRect.y + 2),
        ] as [number, number];
        await sendMouse({
            type: 'click',
            position,
        });

        await nextFrame();
        await nextFrame();

        expect(
            el.querySelector(el.focusableSelector) === document.activeElement
        ).to.be.false;
    });
    it('allows to tab in and out', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default.render()}</div>
        `);
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
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default.render()}</div>
        `);
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
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default.render()}</div>
        `);
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
    it('does not claim lit-virtualizer on the global registry', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default.render()}</div>
        `);
        const el = test.querySelector('sp-grid') as Grid;

        await elementUpdated(el);

        customElements.define('lit-virtualizer', class extends HTMLElement {});

        // make sure we also don't prevent *any* registration of lit-virtualizer
        expect(() => {
            customElements.define(
                'lit-virtualizer',
                class extends HTMLElement {}
            );
        }).to.throw();
    });
});
