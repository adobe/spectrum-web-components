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

import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import { SideNavItem } from '@spectrum-web-components/sidenav';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

describe('Sidenav Item', () => {
    it('can exist disabled and with no parent', async () => {
        let selected = false;
        const onSidenavSelect = (): void => {
            selected = true;
        };
        const el = await fixture<SideNavItem>(
            html`
                <sp-sidenav-item
                    disabled
                    value="Section 2"
                    label="Section 2"
                    @sidenav-select=${onSidenavSelect}
                ></sp-sidenav-item>
            `
        );

        await elementUpdated(el);

        expect(selected).to.be.false;

        el.click();

        await elementUpdated(el);

        expect(selected).to.be.false;

        el.disabled = false;

        el.click();

        await elementUpdated(el);

        expect(selected).to.be.true;
    });

    it('clicking expands a sidenav item with children', async () => {
        const el = await fixture<SideNavItem>(
            html`
                <sp-sidenav-item>
                    <sp-sidenav-item
                        value="Section 1"
                        label="Section 1"
                    ></sp-sidenav-item>
                    <sp-sidenav-item
                        value="Section 2"
                        label="Section 2"
                    ></sp-sidenav-item>
                </sp-sidenav-item>
            `
        );

        await elementUpdated(el);

        expect(el.shadowRoot).to.exist;
        if (!el.shadowRoot) return;

        let slot: HTMLSlotElement | null = el.shadowRoot.querySelector(
            'slot[name="descendant"]'
        );
        expect(slot).not.to.exist;

        expect(el.expanded).to.be.false;

        el.click();

        await elementUpdated(el);

        expect(el.expanded).to.be.true;

        slot = el.shadowRoot.querySelector(
            'slot[name="descendant"]'
        ) as HTMLSlotElement;
        expect(slot).to.exist;
        if (!slot) return;

        expect(slot.assignedElements().length).to.equal(2);
    });

    it('populated `aria-current`', async () => {
        const el = await fixture<SideNavItem>(
            html`
                <sp-sidenav value="Section 2">
                    <sp-sidenav-item
                        href="https://opensource.adobe.com/spectrum-web-components/"
                        label="Section 1"
                        value="Section 1"
                    ></sp-sidenav-item>
                    <sp-sidenav-item
                        href=${window.location.href}
                        label="Section 2"
                        value="Section 2"
                        selected
                    ></sp-sidenav-item>
                </sp-sidenav>
            `
        );

        await elementUpdated(el);

        const currentItem = el.querySelector(
            'sp-sidenav-item:nth-child(2)'
        ) as SideNavItem;
        const otherItem = el.querySelector(
            'sp-sidenav-item:nth-child(1)'
        ) as SideNavItem;

        await elementUpdated(currentItem);
        await elementUpdated(otherItem);

        expect(currentItem.focusElement.hasAttribute('aria-current'), 'current')
            .to.be.true;
        expect(otherItem.focusElement.hasAttribute('aria-current'), 'other').to
            .be.false;
    });
});
