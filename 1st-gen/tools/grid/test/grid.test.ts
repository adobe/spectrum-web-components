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

import {
    elementUpdated,
    expect,
    fixture,
    nextFrame,
    waitUntil,
} from '@open-wc/testing';
import { html } from '@spectrum-web-components/base';
import { Card } from '@spectrum-web-components/card';

import { Grid } from '@spectrum-web-components/grid';
import '@spectrum-web-components/grid/sp-grid.js';
import { isWebKit } from '@spectrum-web-components/shared';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/theme-light.js';
import { emulateMedia, resetMouse, sendKeys } from '@web/test-runner-commands';
import {
    mouseClickOn,
    sendShiftTabKey,
    sendTabKey,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';
import { Default } from '../stories/grid.stories.js';

describe('Grid', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<HTMLDivElement>(html`
                <div>${Default()}</div>
            `)
    );
    beforeEach(() => {
        emulateMedia({ reducedMotion: 'reduce' });
    });
    afterEach(() => {
        emulateMedia({ reducedMotion: 'no-preference' });
    });
    it('loads default grid accessibly', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default()}</div>
        `);
        const el = test.querySelector('sp-grid') as Grid;

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('should accept focus when tabbing into the grid', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default()}</div>
        `);
        const el = test.querySelector('sp-grid') as Grid;

        await elementUpdated(el);

        expect(el.tabIndex).to.equal(0);

        await sendTabKey();
        await sendTabKey();

        await nextFrame();
        await nextFrame();

        if (!isWebKit()) {
            resetMouse();
        }

        expect(
            el.querySelector(el.focusableSelector) === document.activeElement
        ).to.be.true;
    });
    it('should not focus the grid when clicking inside the grid after an item is focused', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default()}</div>
        `);
        const el = test.querySelector('sp-grid') as Grid;

        await elementUpdated(el);

        expect(el.tabIndex).to.equal(0);

        await sendTabKey();
        await sendTabKey();

        await nextFrame();
        await nextFrame();

        const firstItem = el.querySelector(el.focusableSelector) as HTMLElement;

        expect(firstItem === document.activeElement).to.be.true;

        await mouseClickOn(el, 'top-right');

        await elementUpdated(firstItem);

        expect(
            el.querySelector(el.focusableSelector) === document.activeElement
        ).to.be.false;
    });
    // @TODO: skipping this test for all browsers. Will review in the migration to Spectrum 2.
    it.skip('allows to tab in and out', async function () {
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default()}</div>
        `);
        const grid = test.querySelector('sp-grid') as Grid;
        const firstInput = test.querySelector(
            '#first-input'
        ) as HTMLInputElement;
        const lastInput = test.querySelector('#last-input') as HTMLInputElement;
        const firstCard = grid.querySelector(
            grid.focusableSelector
        ) as HTMLElement;
        const actionMenu = firstCard.querySelector(
            'sp-action-menu'
        ) as HTMLElement;

        await elementUpdated(grid);

        // Grid is focusable
        expect(grid.tabIndex, 'Grid initial tabIndex').to.equal(0);

        // First input is focused
        await waitUntil(
            () => sendTabKey(),
            'First input should receive focus after first tab'
        );

        expect(
            document.activeElement,
            'Active element is first input outside grid'
        ).to.equal(firstInput);

        // Tab to card inside grid
        await waitUntil(
            () => sendTabKey(),
            'First card should receive focus after second tab'
        );

        if (document.activeElement !== firstCard) {
            await firstCard.focus(); // Safari fallback
        }

        await elementUpdated(grid);

        expect(
            document.activeElement,
            'Active element is first card inside grid'
        ).to.equal(firstCard);
        expect(
            (document.activeElement as HTMLElement).tabIndex,
            'First card tabIndex after card focus'
        ).to.equal(0);
        expect(grid.tabIndex, 'Grid tabIndex after card focus').to.equal(-1);

        // Tab to action-menu inside grid
        await waitUntil(
            () => sendTabKey(),
            'Action menu should receive focus after third tab'
        );

        if (!firstCard.contains(document.activeElement)) {
            await actionMenu?.focus(); // Safari fallback
        }

        await elementUpdated(grid);

        expect(
            firstCard.contains(document.activeElement),
            'Action menu is inside first card is active element'
        ).to.be.true;
        expect(document.activeElement).to.equal(actionMenu);
        expect(actionMenu.tabIndex, 'action menu tabIndex is 0').to.equal(0);
        expect(grid.tabIndex, 'Grid tabIndex after action menu focus').to.equal(
            -1
        );

        // Tab to second card inside grid
        await waitUntil(
            () => sendTabKey(),
            'First card with checkbox should receive focus after fourth tab'
        );

        if (document.activeElement !== firstCard) {
            firstCard?.focus(); // Safari fallback
        }

        await elementUpdated(grid);

        expect(
            document.activeElement,
            'Active element is first card inside grid'
        ).to.equal(firstCard);

        const shadowCheckbox =
            document.activeElement?.shadowRoot?.activeElement ??
            (document.activeElement?.shadowRoot?.querySelector(
                'sp-checkbox'
            ) as HTMLElement);

        expect(
            shadowCheckbox?.tagName,
            'Shadow checkbox tagName is SP-CHECKBOX'
        ).to.equal('SP-CHECKBOX');
        expect(
            (shadowCheckbox as HTMLElement)?.tabIndex,
            'Shadow checkbox tabIndex is 0'
        ).to.equal(0);
        expect(grid.tabIndex, 'Grid tabIndex after second card focus').to.equal(
            -1
        );

        // Tab to last input outside grid
        await waitUntil(
            () => sendTabKey(),
            'Second card should receive focus after fourth tab'
        );

        if (document.activeElement !== lastInput) {
            await lastInput.focus(); // Safari fallback
        }

        expect(
            document.activeElement,
            'Active element is last input outside grid'
        ).to.equal(lastInput);
        expect(grid.tabIndex, 'Grid tabIndex after last input focus').to.equal(
            0
        );

        // Shift+Tab back inside grid
        await waitUntil(
            () => sendShiftTabKey(),
            'First card should receive focus after shift + tab'
        );

        if (document.activeElement !== firstCard) {
            firstCard.focus(); // Safari fallback
        }

        await elementUpdated(grid);

        expect(
            document.activeElement,
            'Active element is first card inside grid after shift + tab'
        ).to.equal(firstCard);
        expect(grid.tabIndex, 'Grid tabIndex after shift + tab').to.equal(-1);
    });
    it('manages roving tabindex', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default()}</div>
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

        await sendKeys({ press: 'ArrowRight' });

        focused = el.querySelector(
            `${el.focusableSelector}:nth-child(2)`
        ) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({ press: 'ArrowDown' });

        focused = el.querySelector(
            `${el.focusableSelector}:nth-child(5)`
        ) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({ press: 'ArrowLeft' });

        focused = el.querySelector(
            `${el.focusableSelector}:nth-child(4)`
        ) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({ press: 'ArrowUp' });

        focused = el.querySelector(`${el.focusableSelector}`) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;
    });
    it('manages selection', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default()}</div>
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

        await sendKeys({ press: 'ArrowRight' });

        focused = el.querySelector(
            `${el.focusableSelector}:nth-child(2)`
        ) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({ press: 'Space' });

        await elementUpdated(el);

        expect(el.selected).to.deep.equal([{ id: 1 }]);

        await sendKeys({ press: 'ArrowDown' });

        focused = el.querySelector(
            `${el.focusableSelector}:nth-child(5)`
        ) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({ press: 'Space' });

        await elementUpdated(el);

        expect(el.selected).to.deep.equal([{ id: 1 }, { id: 4 }]);

        await sendKeys({ press: 'ArrowUp' });

        focused = el.querySelector(
            `${el.focusableSelector}:nth-child(2)`
        ) as Card;
        await elementUpdated(focused);
        expect(focused === document.activeElement).to.be.true;
        expect(focused.focused).to.be.true;

        await sendKeys({ press: 'Space' });

        await elementUpdated(el);

        expect(el.selected).to.deep.equal([{ id: 4 }]);
    });
    it('does not claim lit-virtualizer on the global registry', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default()}</div>
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
