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

import '../';
import { SideNav, SideNavItem } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

describe('Sidenav', () => {
    it('loads', async () => {
        const el = await fixture<SideNav>(
            html`
                <sp-sidenav>
                    <sp-sidenav-heading label="CATEGORY 1">
                        <sp-sidenav-item
                            value="Section 1"
                            label="Section 1"
                        ></sp-sidenav-item>
                        <sp-sidenav-item
                            value="Section 2"
                            label="Section 2"
                        ></sp-sidenav-item>
                    </sp-sidenav-heading>
                </sp-sidenav>
            `
        );

        await elementUpdated(el);

        expect(el).shadowDom.to.equalSnapshot();
        expect(el).lightDom.to.equalSnapshot();
    });
    it('handles select', async () => {
        const el = await fixture<SideNav>(
            html`
                <sp-sidenav>
                    <sp-sidenav-heading label="CATEGORY 1">
                        <sp-sidenav-item
                            value="Section 1"
                            label="Section 1"
                        ></sp-sidenav-item>
                        <sp-sidenav-item value="Section 2" label="Section 2">
                            <sp-sidenav-item
                                value="Section 2a"
                                label="Section 2a"
                            ></sp-sidenav-item>
                        </sp-sidenav-item>
                    </sp-sidenav-heading>
                </sp-sidenav>
            `
        );

        await elementUpdated(el);

        expect(el.value).to.be.undefined;

        const sidenavItem = el.querySelector(
            '[value="Section 2"]'
        ) as SideNavItem;
        sidenavItem.dispatchEvent(
            new CustomEvent('sidenav-select', {
                bubbles: true,
                detail: {
                    value: 'Section 2',
                },
            })
        );

        await elementUpdated(el);

        expect(el.value).to.equal('Section 2');

        sidenavItem.click();

        await elementUpdated(sidenavItem);

        const sidenavItemChild = el.querySelector(
            '[value="Section 2a"]'
        ) as SideNavItem;
        sidenavItemChild.click();

        await elementUpdated(el);

        expect(el.value).to.equal('Section 2a');
    });
});
