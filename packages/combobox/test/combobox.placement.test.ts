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
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import { executeServerCommand } from '@web/test-runner-commands';

import '../sp-combobox.js';
import '../sp-combobox-item.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import type { Theme } from '@spectrum-web-components/theme';
import { ComboboxOption } from '..';
import { arrowUpEvent } from '../../../test/testing-helpers.js';
import { TestableCombobox, testActiveElement } from './combobox.test.js';

const comboboxFixture = async (): Promise<TestableCombobox> => {
    const options: ComboboxOption[] = [
        { id: 'thing1', value: 'Abc Thing 1' },
        { id: 'thing1a', value: 'Bde Thing 2' },
        { id: 'thing1b', value: 'Bef Thing 3' },
        { id: 'thing4', value: 'Efg Thing 4' },
    ];

    const test = await fixture<Theme>(
        html`
            <sp-theme theme="spectrum" color="light" scale="medium">
                <sp-combobox .options=${options}>Combobox</sp-combobox>
            </sp-theme>
        `
    );

    const el = test.querySelector('sp-combobox') as unknown as TestableCombobox;

    return el;
};

describe('Combobox Placement', () => {
    let el!: TestableCombobox;
    let listbox!: HTMLElement;
    let overlay!: HTMLElement;
    let listboxRect!: DOMRect;
    let overlayRect!: DOMRect;
    afterEach(async () => {
        const overlays = document.querySelectorAll('active-overlay');
        overlays.forEach((overlay) => overlay.remove());
        await executeServerCommand('set-viewport', { width: 800, height: 600 });
    });
    beforeEach(async () => {
        el = await comboboxFixture();
        await elementUpdated(el);
        const { offsetHeight } = el;
        el.style.marginTop = `calc(100vh - ${offsetHeight}px)`;
        el.style.marginBottom = `100vh`;

        listbox = el.shadowRoot.querySelector('#listbox') as HTMLElement;
        overlay = el.shadowRoot.querySelector('#overlay') as HTMLElement;
        const opened = oneEvent(el, 'sp-opened');
        el.click();
        await opened;

        await elementUpdated(el);
        expect(el.open).to.be.true;

        await nextFrame();

        listboxRect = listbox.getBoundingClientRect();
        overlayRect = overlay.getBoundingClientRect();
    });
    it.only('opens with visible and accessible content in same place', async () => {
        await waitUntil(() => {
            listboxRect = listbox.getBoundingClientRect();
            overlayRect = overlay.getBoundingClientRect();
            return listboxRect.y === overlayRect.y;
        }, `does the list box start y: 1, ${listboxRect.y} and ${overlayRect.y}`);
        expect(listboxRect.x, 'does the list box start x').to.equal(
            overlayRect.x
        );

        const firstPosition = [overlayRect.x, overlayRect.y];

        window.scroll(0, overlayRect.height * 2);

        await oneEvent(overlay, 'transitionend');

        listboxRect = listbox.getBoundingClientRect();
        overlayRect = overlay.getBoundingClientRect();
        const secondPosition = [overlayRect.x, overlayRect.y];

        expect(firstPosition, 'does the overlay move').to.not.deep.equal(
            secondPosition
        );
        await waitUntil(() => {
            listboxRect = listbox.getBoundingClientRect();
            overlayRect = overlay.getBoundingClientRect();
            return listboxRect.y === overlayRect.y;
        }, `does the list box start y: 2, ${listboxRect.y} and ${overlayRect.y}`);
        expect(listboxRect.x, 'does the list box follow x').to.equal(
            overlayRect.x
        );
    });
    describe('Resized/repositioned placement', () => {
        let height!: number;
        let lastOverlayItem!: HTMLElement;
        let lastListboxItem!: HTMLElement;
        let lastOverlayItemRect!: DOMRect;
        let lastListboxItemRect!: DOMRect;
        let lastListboxItemInitialPosition!: [number, number];
        let lastOverlayItemInitialPosition!: [number, number];
        const baseline = async (): Promise<void> => {
            await waitUntil(() => {
                lastOverlayItemRect = lastOverlayItem.getBoundingClientRect();
                lastListboxItemRect = lastListboxItem.getBoundingClientRect();
                return lastListboxItemRect.y === lastOverlayItemRect.y;
            }, 'same y listbox/overlay');
            expect(lastListboxItemRect.x, 'same x listbox/overlay').to.equal(
                lastOverlayItemRect.x
            );
            // These not being the same means that the listbox and overlay elements
            // will need to scroll when interacting with items outside of their height.
            expect(
                overlay.scrollHeight,
                'different times heights'
            ).to.not.equal(height);
            const precision = 0.001;
            expect(
                Math.abs(listboxRect.height - overlayRect.height) <= precision,
                'different things heights almost the same'
            ).to.equal(true);
        };
        beforeEach(async () => {
            lastOverlayItem = overlay.querySelector('#thing4') as HTMLElement;
            lastListboxItem = listbox.querySelector(
                '#thing4-sr'
            ) as HTMLElement;

            // Ensure the last item is in the same place in both listbox and overlay
            // this also means that the listbox and the overlay are the same height.
            lastOverlayItemRect = lastOverlayItem.getBoundingClientRect();
            lastListboxItemRect = lastListboxItem.getBoundingClientRect();

            lastListboxItemInitialPosition = [
                lastListboxItemRect.x,
                lastListboxItemRect.y,
            ];
            lastOverlayItemInitialPosition = [
                lastOverlayItemRect.x,
                lastOverlayItemRect.y,
            ];

            ({ height } = overlayRect);
            // Resize the window to require scrolling of the overlay
            await executeServerCommand('set-viewport', {
                width: 800,
                height: Math.ceil(height),
            });

            await nextFrame();
            const { offsetHeight } = el.focusElement;
            window.scroll(0, window.innerHeight - offsetHeight);

            await nextFrame();

            overlayRect = overlay.getBoundingClientRect();
            listboxRect = listbox.getBoundingClientRect();
        });
        it('positions the last item the same on open', async () => {
            await baseline();
            overlay.scroll(0, height * 2);

            await nextFrame();

            lastOverlayItemRect = lastOverlayItem.getBoundingClientRect();
            lastListboxItemRect = lastListboxItem.getBoundingClientRect();

            const lastOverlayItemPosition = [
                lastOverlayItemRect.x,
                lastOverlayItemRect.y,
            ];
            const lastListboxItemPosition = [
                lastListboxItemRect.x,
                lastListboxItemRect.y,
            ];

            expect(
                lastListboxItemPosition,
                'last items same place'
            ).to.deep.equal(lastOverlayItemPosition);
        });
        it('matches the listbox scroll position to the overlay scroll position on key press', async () => {
            await baseline();
            el.focusElement.focus();
            el.focusElement.dispatchEvent(arrowUpEvent());

            await elementUpdated(el);
            await nextFrame();

            testActiveElement(el, 'thing4');

            lastOverlayItemRect = lastOverlayItem.getBoundingClientRect();
            lastListboxItemRect = lastListboxItem.getBoundingClientRect();

            const lastOverlayItemFinalPosition = [
                lastOverlayItemRect.x,
                lastOverlayItemRect.y,
            ];
            const lastListboxItemFinalPosition = [
                lastListboxItemRect.x,
                lastListboxItemRect.y,
            ];
            expect(
                lastOverlayItemFinalPosition,
                'same place item'
            ).to.deep.equal(lastListboxItemFinalPosition);
            expect(lastOverlayItemFinalPosition).to.not.deep.equal(
                lastOverlayItemInitialPosition
            );
            expect(lastListboxItemFinalPosition).to.not.deep.equal(
                lastListboxItemInitialPosition
            );
        });
    });
});
