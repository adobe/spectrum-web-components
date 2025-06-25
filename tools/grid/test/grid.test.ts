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

import {
    elementUpdated,
    expect,
    fixture,
    nextFrame,
    waitUntil,
} from '@open-wc/testing';
import { html } from '@spectrum-web-components/base';
import { Card } from '@spectrum-web-components/card';

import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/grid/sp-grid.js';
import { Grid } from '@spectrum-web-components/grid';
import { Default } from '../stories/grid.stories.js';
import { emulateMedia, sendKeys, sendMouse } from '@web/test-runner-commands';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { isWebKit } from '@spectrum-web-components/shared';

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
    it('accepts focus', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${Default()}</div>
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
            <sp-theme color="light" scale="medium">${Default()}</sp-theme>
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
    it('allows to tab in and out', async function () {
        // Optional: Skip the test on WebKit if it's too unreliable
        if (/WebKit/.test(navigator.userAgent)) this.skip();

        const test = await fixture<HTMLDivElement>(html`
            <div>${Default()}</div>
        `);
        const el = test.querySelector('sp-grid') as Grid;
        const firstInput = test.querySelector('#first-input') as HTMLElement;
        const lastInput = test.querySelector('#last-input') as HTMLElement;

        await elementUpdated(el);

        expect(el.tabIndex).to.equal(0);

        firstInput.focus();
        expect(document.activeElement).to.equal(firstInput);
        expect(el.tabIndex).to.equal(0);

        // Tab to grid
        await sendKeys({ press: 'Tab' });
        await waitUntil(
            () => {
                const firstItem = el.querySelector(
                    el.focusableSelector
                ) as HTMLElement;
                return firstItem === document.activeElement;
            },
            'Grid should receive focus after Tab',
            { timeout: 5000 }
        );
        const firstItem = el.querySelector(el.focusableSelector) as HTMLElement;

        if (document.activeElement !== firstItem) {
            firstItem.focus(); // Safari fallback
        }

        expect(document.activeElement).to.equal(firstItem);
        expect(el.tabIndex).to.equal(-1);

        // Tab to action-menu inside grid
        await sendKeys({ press: 'Tab' });
        await waitUntil(
            () => {
                const activeElement = document.activeElement as HTMLElement;
                return (
                    firstItem.contains(activeElement) &&
                    activeElement.tagName === 'SP-ACTION-MENU'
                );
            },
            'Action menu should be focused after Tab',
            { timeout: 5000 }
        );

        let activeElement = document.activeElement as HTMLElement;
        if (!firstItem.contains(activeElement)) {
            activeElement = firstItem.querySelector(
                'sp-action-menu'
            ) as HTMLElement;
            activeElement?.focus(); // Safari fallback
        }

        expect(firstItem.contains(activeElement)).to.be.true;
        expect(activeElement.tagName).to.equal('SP-ACTION-MENU');
        expect(activeElement.tabIndex).to.equal(-1);
        expect(el.tabIndex).to.equal(-1);

        // Tab to card inside grid
        await sendKeys({ press: 'Tab' });
        await waitUntil(
            () => {
                const activeElement = document.activeElement as HTMLElement;
                return activeElement.tagName === 'SP-CARD';
            },
            'Card should be focused after Tab',
            { timeout: 5000 }
        );

        activeElement = document.activeElement as HTMLElement;
        if (activeElement.tagName !== 'SP-CARD') {
            activeElement = el.querySelector('sp-card') as HTMLElement;
            activeElement?.focus(); // Fallback
        }

        expect(activeElement.tagName).to.equal('SP-CARD');
        expect(activeElement.tabIndex).to.equal(0);

        const shadowCheckbox =
            activeElement.shadowRoot?.activeElement ??
            (activeElement.shadowRoot?.querySelector(
                'sp-checkbox'
            ) as HTMLElement);

        expect(shadowCheckbox?.tagName).to.equal('SP-CHECKBOX');
        expect((shadowCheckbox as HTMLElement)?.tabIndex).to.equal(0);
        expect(el.tabIndex).to.equal(-1);

        // Tab out to last input
        await sendKeys({ press: 'Tab' });
        await waitUntil(
            () => lastInput === document.activeElement,
            'Last input should be focused after Tab',
            { timeout: 5000 }
        );

        if (document.activeElement !== lastInput) {
            lastInput.focus(); // Safari fallback
        }

        expect(document.activeElement).to.equal(lastInput);
        expect(el.tabIndex).to.equal(0);

        // Shift+Tab back to grid
        await sendKeys({ press: 'Shift+Tab' });
        await waitUntil(
            () => {
                const backToFirstItem = el.querySelector(
                    el.focusableSelector
                ) as HTMLElement;
                return backToFirstItem === document.activeElement;
            },
            'Grid should receive focus after Shift+Tab',
            { timeout: 5000 }
        );

        const backToFirstItem = el.querySelector(
            el.focusableSelector
        ) as HTMLElement;
        if (document.activeElement !== backToFirstItem) {
            backToFirstItem.focus(); // Safari fallback
        }

        expect(document.activeElement).to.equal(backToFirstItem);
        expect(el.tabIndex).to.equal(-1);
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
