/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { expect } from '@bundled-es-modules/chai';
import { fixture, elementUpdated } from '@open-wc/testing';
import { Menu } from '../lib/menu';
import '../lib/menu';
import '../lib/menu-item';
import { html } from 'lit-element';
import { MenuItem } from '../lib/menu-item/menu-item';

const keyboardEvent = (code: string) =>
    new KeyboardEvent('keydown', {
        bubbles: true,
        composed: true,
        cancelable: true,
        code,
    });
const arrowUpEvent = keyboardEvent('ArrowUp');
const arrowDownEvent = keyboardEvent('ArrowDown');
const tabEvent = keyboardEvent('Tab');
const tEvent = keyboardEvent('t');

describe('Menu', () => {
    it('renders empty', async () => {
        const el = await fixture<Menu>(
            html`
                <sp-menu><a href="#">Test</a></sp-menu>
            `
        );

        await elementUpdated(el);

        el.focus();
        expect(document.activeElement === document.body).to.be.true;

        const anchor = el.querySelector('a') as HTMLAnchorElement;
        anchor.focus();
        expect(document.activeElement === anchor).to.be.true;
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

        expect(el).lightDom.to.equalSnapshot();
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
        expect(el).to.not.be.undefined;
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

    it('cleans up when tabbing away', async () => {
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
        expect(document.activeElement === firstItem).to.be.true;
        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownEvent);
        expect(document.activeElement === thirdItem).to.be.true;
        // imitate tabbing away
        el.dispatchEvent(tabEvent);
        el.dispatchEvent(
            new CustomEvent('focusout', {
                composed: true,
                bubbles: true,
            })
        );
        // re-bind keyevents
        el.startListeningToKeyboard();
        // focus management should start again from the first item.
        el.dispatchEvent(arrowDownEvent);
        expect(document.activeElement === secondItem).to.be.true;
    });
});
