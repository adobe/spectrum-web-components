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

import '../';
import { MenuItem } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

describe('Menu item', () => {
    it('renders', async () => {
        const el = await fixture<MenuItem>(
            html`
                <sp-menu-item selected>
                    Selected
                </sp-menu-item>
            `
        );

        await elementUpdated(el);

        expect(el).shadowDom.to.equalSnapshot();
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
                <sp-menu-item selected>
                    Selected Text
                </sp-menu-item>
            `
        );
        expect(el.itemText).to.equal('Selected Text');
        expect(el.value).to.equal('Selected Text');
    });
});
