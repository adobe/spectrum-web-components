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

import '../lib/index.js';
import { Dropdown } from '../lib/index.js';
import '../../menu/lib/index.js';
import '../../menu-item/lib/index.js';
import { MenuItem } from '../../menu-item/lib/index.js';
import '@open-wc/testing';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

const keyboardEvent = (code: string): KeyboardEvent =>
    new KeyboardEvent('keydown', {
        bubbles: true,
        composed: true,
        cancelable: true,
        code,
    });
const arrowDownEvent = keyboardEvent('ArrowDown');
const arrowUpEvent = keyboardEvent('ArrowUp');

describe('Dropdown', () => {
    it('loads', async () => {
        const el = await fixture<Dropdown>(
            html`
                <sp-dropdown>
                    Select a Country with a very long label, too long in fact
                    <sp-menu slot="options" role="listbox">
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
                </sp-dropdown>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el).lightDom.to.equalSnapshot();
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('selects', async () => {
        const el = await fixture<Dropdown>(
            html`
                <sp-dropdown>
                    Select a Country with a very long label, too long in fact
                    <sp-menu slot="options" role="listbox">
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
                </sp-dropdown>
            `
        );

        await elementUpdated(el);

        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;
        const button = el.button as HTMLButtonElement;

        button.click();
        await elementUpdated(el);

        const openContent = button.textContent ? button.textContent : '';
        expect(el.open).to.be.true;
        expect(openContent.trim()).to.equal('');

        secondItem.click();
        await elementUpdated(el);

        const closedContent = button.textContent ? button.textContent : '';
        expect(el.open).to.be.false;
        expect(closedContent.trim()).to.equal('Select Inverse');
    });

    it('opens on ArrowDown', async () => {
        const el = await fixture<Dropdown>(
            html`
                <sp-dropdown>
                    Select a Country with a very long label, too long in fact
                    <sp-menu slot="options" role="listbox">
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
                </sp-dropdown>
            `
        );

        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const button = el.button as HTMLButtonElement;

        el.focus();
        await elementUpdated(el);

        expect(el.open).to.be.false;

        button.dispatchEvent(arrowUpEvent);
        await elementUpdated(el);

        expect(el.open).to.be.false;

        button.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);

        const openContent = button.textContent ? button.textContent : '';
        expect(el.open).to.be.true;
        expect(openContent.trim()).to.equal('');

        firstItem.click();
        await elementUpdated(el);

        const closedContent = button.textContent ? button.textContent : '';
        expect(el.open).to.be.false;
        expect(closedContent.trim()).to.equal('Deselect');
    });
});
