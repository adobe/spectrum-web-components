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
import { MenuItem } from '../';
import '@spectrum-web-components/menu';
import { Menu } from '@spectrum-web-components/menu';
import {
    fixture,
    elementUpdated,
    html,
    expect,
    waitUntil,
} from '@open-wc/testing';

describe('Menu item', () => {
    it('renders', async () => {
        const el = await fixture<Menu>(
            html`
                <sp-menu>
                    <sp-menu-item selected>Selected</sp-menu-item>
                </sp-menu>
            `
        );

        await waitUntil(
            () => el.menuItems.length == 1,
            'expected menu group to manage 1 child'
        );
        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('value attribute', async () => {
        const el = await fixture<MenuItem>(
            html`
                <sp-menu-item value="selected" selected>
                    Selected Text
                </sp-menu-item>
            `
        );
        expect(el.itemText).to.equal('Selected Text');
        expect(el.value).to.equal('selected');
    });
    it('no value attribute', async () => {
        const el = await fixture<MenuItem>(
            html`
                <sp-menu-item selected>Selected Text</sp-menu-item>
            `
        );
        expect(el.itemText).to.equal('Selected Text');
        expect(el.value).to.equal('Selected Text');
    });
    it('value property', async () => {
        const el = await fixture<MenuItem>(
            html`
                <sp-menu-item selected>Selected Text</sp-menu-item>
            `
        );
        expect(el.itemText).to.equal('Selected Text');
        expect(el.value).to.equal('Selected Text');
        expect(el.hasAttribute('value')).to.be.false;

        el.value = 'Selected Text';
        await elementUpdated(el);

        expect(el.value).to.equal('Selected Text');
        expect(el.getAttribute('value')).to.equal('Selected Text');

        el.value = '';
        await elementUpdated(el);

        expect(el.value).to.equal('Selected Text');
        expect(el.hasAttribute('value')).to.be.false;
    });
});
