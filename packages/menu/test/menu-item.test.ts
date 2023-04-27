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

import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { Menu, MenuItem } from '@spectrum-web-components/menu';
import {
    elementUpdated,
    expect,
    fixture,
    html,
    waitUntil,
} from '@open-wc/testing';
import { spy } from 'sinon';
import { sendMouse } from '../../../test/plugins/browser.js';

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
            () => el.childItems.length == 1,
            'expected menu group to manage 1 child'
        );
        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('can be disabled', async () => {
        const el = await fixture<Menu>(
            html`
                <sp-menu selects="single">
                    <sp-menu-item selected label="This is not disabled">
                        Selected
                    </sp-menu-item>
                    <sp-menu-item disabled>Disabled</sp-menu-item>
                </sp-menu>
            `
        );
        await elementUpdated(el);
        expect(el.value).to.equal('Selected');

        const disabled = el.querySelector('[disabled]') as MenuItem;
        const boundingRect = disabled.getBoundingClientRect();
        sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        boundingRect.x + boundingRect.width / 2,
                        boundingRect.y + boundingRect.height / 2,
                    ],
                },
                {
                    type: 'down',
                },
                {
                    type: 'up',
                },
            ],
        });
        await elementUpdated(el);
        expect(el.value).to.equal('Selected');

        disabled.click();
        await elementUpdated(el);
        expect(el.value).to.equal('Selected');

        disabled.dispatchEvent(
            new Event('click', {
                bubbles: true,
                composed: true,
            })
        );
        await elementUpdated(el);
        expect(el.value).to.equal('Selected');
    });
    it('proxies `click()`', async () => {
        const clickTargetSpy = spy();
        const el = await fixture<Menu>(
            html`
                <sp-menu
                    @click=${(event: Event) => {
                        clickTargetSpy(
                            event.composedPath()[0] as HTMLAnchorElement
                        );
                        event.stopPropagation();
                        event.preventDefault();
                    }}
                >
                    <sp-menu-item
                        href="https://opensource.adobe.com/spectrum-web-components"
                    >
                        Selected Text
                    </sp-menu-item>
                </sp-menu>
            `
        );

        await elementUpdated(el);

        const item = el.querySelector('sp-menu-item') as MenuItem;
        const { anchorElement } = item as unknown as {
            anchorElement: HTMLAnchorElement;
        };
        (
            item as unknown as { anchorElement: HTMLAnchorElement }
        ).anchorElement.dispatchEvent(new FocusEvent('focus'));

        await elementUpdated(item);
        expect(el === document.activeElement).to.be.true;
        item.click();

        expect(clickTargetSpy.calledWith(anchorElement)).to.be.true;
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
