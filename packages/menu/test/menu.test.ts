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
import '../sp-menu.js';
import '../sp-menu-item.js';
import '../sp-menu-group.js';
import { Menu, MenuItem } from '../';
import {
    fixture,
    elementUpdated,
    nextFrame,
    html,
    expect,
    waitUntil,
} from '@open-wc/testing';
import {
    arrowUpEvent,
    arrowDownEvent,
    tabEvent,
    tEvent,
} from '../../../test/testing-helpers.js';

describe('Menu', () => {
    it('renders empty', async () => {
        const el = await fixture<Menu>(
            html`
                <sp-menu tabindex="0"><a href="#">Test</a></sp-menu>
            `
        );

        const anchor = el.querySelector('a') as HTMLAnchorElement;
        await waitUntil(
            () => !!window.applyFocusVisiblePolyfill,
            'loaded polyfill'
        );
        await elementUpdated(el);
        expect(document.activeElement === el, 'self not focused, 1').to.be
            .false;
        expect(document.activeElement === anchor, 'child not focused, 1').to.be
            .false;

        el.focus();
        await elementUpdated(el);
        expect(document.activeElement === el, 'self not focused, 2').to.be
            .false;
        expect(document.activeElement === anchor, 'child not focused, 2').to.be
            .false;

        anchor.focus();
        expect(document.activeElement === el, 'self not focused, 3').to.be
            .false;
        expect(document.activeElement === anchor, 'anchor').to.be.true;
    });
    it('renders w/ menu items', async () => {
        const el = await fixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-item>
                        Deselect
                    </sp-menu-item>
                    <sp-menu-item>
                        Select Inverse
                    </sp-menu-item>
                    <sp-menu-item>
                        Feather...
                    </sp-menu-item>
                    <sp-menu-item>
                        Select and Mask...
                    </sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>
                        Save Selection
                    </sp-menu-item>
                    <sp-menu-item disabled>
                        Make Work Path
                    </sp-menu-item>
                </sp-menu>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('renders w/ selected', async () => {
        const el = await fixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-item>
                        Not Selected
                    </sp-menu-item>
                    <sp-menu-item selected>
                        Selected
                    </sp-menu-item>
                    <sp-menu-item>
                        Other
                    </sp-menu-item>
                </sp-menu>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('handle focus and keyboard input', async () => {
        const el = await fixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-item>
                        Deselect
                    </sp-menu-item>
                    <sp-menu-item>
                        Select Inverse
                    </sp-menu-item>
                    <sp-menu-item>
                        Feather...
                    </sp-menu-item>
                    <sp-menu-item>
                        Select and Mask...
                    </sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>
                        Save Selection
                    </sp-menu-item>
                    <sp-menu-item disabled>
                        Make Work Path
                    </sp-menu-item>
                </sp-menu>
            `
        );

        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const thirdToLastItem = el.querySelector(
            'sp-menu-item:nth-last-of-type(3)'
        ) as MenuItem;
        const secondToLastItem = el.querySelector(
            'sp-menu-item:nth-last-of-type(2)'
        ) as MenuItem;

        el.focus();

        expect(document.activeElement === firstItem).to.be.true;

        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(tEvent);

        expect(document.activeElement === thirdToLastItem).to.be.true;

        el.dispatchEvent(arrowDownEvent);

        expect(document.activeElement === secondToLastItem).to.be.true;
    });

    it('handle focus and late descendent additions', async () => {
        const el = await fixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-group>
                        <span slot="header">Options</span>
                        <sp-menu-item>
                            Deselect
                        </sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            `
        );

        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;

        el.focus();

        expect(document.activeElement === firstItem).to.be.true;

        firstItem.blur();

        const group = el.querySelector('sp-menu-group') as HTMLElement;
        const prependedItem = document.createElement('sp-menu-item');
        prependedItem.innerHTML = 'Prepended Item';
        const appendedItem = document.createElement('sp-menu-item');
        prependedItem.innerHTML = 'Appended Item';
        group.prepend(prependedItem);
        group.append(appendedItem);

        await elementUpdated(el);

        expect(document.activeElement === firstItem).to.be.false;
        expect(document.activeElement === prependedItem).to.be.false;

        el.focus();

        expect(document.activeElement === prependedItem).to.be.true;

        el.dispatchEvent(arrowUpEvent);

        expect(document.activeElement === appendedItem).to.be.true;
    });

    it('cleans up when tabbing away', async () => {
        const el = await fixture<Menu>(
            html`
                <sp-menu tabindex="0">
                    <sp-menu-item>
                        Deselect
                    </sp-menu-item>
                    <sp-menu-item>
                        Select Inverse
                    </sp-menu-item>
                    <sp-menu-item>
                        Third Item
                    </sp-menu-item>
                </sp-menu>
            `
        );

        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;
        const thirdItem = el.querySelector(
            'sp-menu-item:nth-of-type(3)'
        ) as MenuItem;

        el.focus();
        expect(document.activeElement === firstItem, 'first').to.be.true;
        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownEvent);
        expect(document.activeElement === thirdItem, 'third').to.be.true;
        // imitate tabbing away
        el.dispatchEvent(tabEvent);
        el.dispatchEvent(
            new CustomEvent('focusout', {
                composed: true,
                bubbles: true,
            })
        );
        await nextFrame();
        // re-bind keyevents
        el.startListeningToKeyboard();
        // focus management should start again from the first item.
        el.dispatchEvent(arrowDownEvent);
        expect(document.activeElement === secondItem, 'second').to.be.true;
    });
});
