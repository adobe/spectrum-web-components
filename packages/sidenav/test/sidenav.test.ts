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
import { waitForPredicate } from '../../../test/testing-helpers';

const keyboardEvent = (code: string, eventDetails = {}): KeyboardEvent => {
    return new KeyboardEvent('keydown', {
        ...eventDetails,
        bubbles: true,
        composed: true,
        cancelable: true,
        code,
    });
};
const arrowDownEvent = keyboardEvent('ArrowDown');
const arrowUpEvent = keyboardEvent('ArrowUp');
const shiftTabEvent = keyboardEvent('Tab', { shiftKey: true });

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
        await waitForPredicate(() => !!window.applyFocusVisiblePolyfill);

        expect(el).shadowDom.to.equalSnapshot();
        expect(el).lightDom.to.equalSnapshot();
    });
    it('sets manageTabIndex on new children', async () => {
        const el = await fixture<SideNav>(
            html`
                <sp-sidenav>
                    <sp-sidenav-item
                        value="Section 1"
                        label="Section 1"
                    ></sp-sidenav-item>
                    <sp-sidenav-item
                        value="Section 2"
                        label="Section 2"
                    ></sp-sidenav-item>
                </sp-sidenav>
            `
        );

        await elementUpdated(el);
        expect(el.manageTabIndex).to.be.false;

        const item1 = el.querySelector('sp-sidenav-item') as SideNavItem;
        expect(item1.manageTabIndex).to.be.false;
        expect(item1.tabIndex).to.equal(0);

        const newItem = document.createElement('sp-sidenav-item');
        newItem.value = 'Section 3';
        newItem.label = 'Section 3';
        el.appendChild(newItem);

        await elementUpdated(newItem);

        expect(newItem.manageTabIndex).to.be.false;
        expect(newItem.tabIndex).to.equal(0);

        el.focus();
        const focused = document.activeElement as SideNavItem;
        focused.click();
        expect(focused.selected).to.be.true;

        el.dispatchEvent(shiftTabEvent);
        const outsideFocused = document.activeElement as HTMLElement;

        expect(typeof outsideFocused).not.to.equal(SideNavItem);
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

    it('manage tab index', async () => {
        const el = await fixture<SideNav>(
            html`
                <sp-sidenav manage-tab-index>
                    <sp-sidenav-heading label="CATEGORY 1">
                        <sp-sidenav-item
                            value="Section 0"
                            label="Section 0"
                            disabled
                        ></sp-sidenav-item>
                        <sp-sidenav-item
                            value="Section 1"
                            label="Section 1"
                        ></sp-sidenav-item>
                        <sp-sidenav-item
                            value="Section 2"
                            label="Section 2"
                            disabled
                        ></sp-sidenav-item>
                        <sp-sidenav-item value="Section 3" label="Section 3">
                            <sp-sidenav-item
                                value="Section 3a"
                                label="Section 3a"
                            ></sp-sidenav-item>
                        </sp-sidenav-item>
                    </sp-sidenav-heading>
                </sp-sidenav>
            `
        );

        await elementUpdated(el);
        expect(el.value).to.be.undefined;

        el.focus();
        let focused = document.activeElement as SideNavItem;
        const root = focused.shadowRoot ? focused.shadowRoot : focused;
        const clickEl = root.querySelector('a') as HTMLAnchorElement;
        clickEl.click();

        await elementUpdated(el);

        expect(el.value).to.equal('Section 1');

        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownEvent);
        el.dispatchEvent(arrowDownEvent);
        focused = document.activeElement as SideNavItem;
        expect(focused.expanded).to.be.false;
        focused.click();

        await elementUpdated(el);

        expect(focused.expanded).to.be.true;

        el.dispatchEvent(arrowUpEvent);
        el.dispatchEvent(arrowUpEvent);
        focused = document.activeElement as SideNavItem;
        focused.click();

        await elementUpdated(el);

        expect(el.value).to.equal('Section 3a');

        document.body.focus();

        el.focus();
        focused = document.activeElement as SideNavItem;
        expect(focused.selected).to.be.true;

        el.dispatchEvent(shiftTabEvent);
        const outsideFocused = document.activeElement as HTMLElement;

        expect(typeof outsideFocused).not.to.equal(SideNavItem);
    });
    it('manage tab index for late added items', async () => {
        const el = await fixture<SideNav>(
            html`
                <sp-sidenav manage-tab-index>
                    <sp-sidenav-item
                        value="Section 0"
                        label="Section 0"
                    ></sp-sidenav-item>
                </sp-sidenav>
            `
        );

        await elementUpdated(el);
        expect(el.manageTabIndex).to.be.true;

        const item1 = el.querySelector('sp-sidenav-item') as SideNavItem;

        await elementUpdated(item1);
        expect(item1.manageTabIndex).to.be.true;
        expect(item1.tabIndex).to.equal(-1);

        const item2 = document.createElement('sp-sidenav-item');
        item2.value = 'Section 1';
        item2.label = 'Section 1';

        expect(item2.manageTabIndex).to.be.false;
        expect(item2.tabIndex, 'before').to.equal(0);

        await elementUpdated(el);

        el.appendChild(item2);

        await elementUpdated(item2);

        expect(item2.manageTabIndex).to.be.true;
        expect(item2.tabIndex, 'after').to.equal(-1);
    });
});
