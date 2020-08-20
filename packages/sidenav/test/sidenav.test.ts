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

import '../sp-sidenav.js';
import '../sp-sidenav-item.js';
import '../sp-sidenav-heading.js';
import { SideNav, SideNavItem } from '../';
import {
    arrowDownEvent,
    arrowUpEvent,
    shiftTabEvent,
} from '../../../test/testing-helpers.js';
import {
    fixture,
    elementUpdated,
    html,
    expect,
    waitUntil,
} from '@open-wc/testing';
import { TemplateResult, LitElement } from '@spectrum-web-components/base';

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

        await expect(el).to.be.accessible();
    });
    it('does not accept focus when empty', async () => {
        const el = await fixture<SideNav>(
            html`
                <sp-sidenav></sp-sidenav>
            `
        );

        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;
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
    it('prevents [tabindex=0] while `focusin`', async () => {
        const el = await fixture<SideNav>(
            html`
                <sp-sidenav manage-tab-index>
                    <sp-sidenav-heading label="CATEGORY 1">
                        <sp-sidenav-item
                            value="Section 0"
                            label="Section 0"
                        ></sp-sidenav-item>
                        <sp-sidenav-item
                            value="Section 1"
                            label="Section 1"
                            selected
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
        const selected = el.querySelector('[value="Section 1"]') as SideNavItem;
        const toBeSelected = el.querySelector(
            '[value="Section 0"]'
        ) as SideNavItem;

        await elementUpdated(el);
        await waitUntil(() => el.value === 'Section 1', 'wait for selection');

        expect(el.value).to.equal('Section 1');
        expect(selected.tabIndex).to.equal(0);

        el.dispatchEvent(new Event('focusin'));

        await elementUpdated(el);

        expect(el.value).to.equal('Section 1');
        expect(selected.tabIndex).to.equal(-1);

        el.dispatchEvent(new Event('focusout'));

        await elementUpdated(el);

        expect(el.value).to.equal('Section 1');
        expect(selected.tabIndex).to.equal(0);

        toBeSelected.click();

        await elementUpdated(el);

        expect(el.value).to.equal('Section 0');
        expect(toBeSelected.tabIndex).to.equal(0);
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
    it('manage tab index through shadow DOM', async () => {
        class SideNavTestEl extends LitElement {
            protected render(): TemplateResult {
                return html`
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
                            <sp-sidenav-item
                                value="Section 3"
                                label="Section 3"
                            >
                                <sp-sidenav-item
                                    value="Section 3a"
                                    label="Section 3a"
                                ></sp-sidenav-item>
                            </sp-sidenav-item>
                        </sp-sidenav-heading>
                    </sp-sidenav>
                `;
            }
        }
        customElements.define('sidenav-test-el', SideNavTestEl);
        const el = await fixture<SideNav>(html`
            <sidenav-test-el></sidenav-test-el>
        `);

        await elementUpdated(el);
        const rootNode = el.shadowRoot as ShadowRoot;
        const sidenavEl = rootNode.querySelector('sp-sidenav') as SideNav;

        await elementUpdated(sidenavEl);
        expect(sidenavEl.value).to.be.undefined;

        sidenavEl.focus();
        let focused = rootNode.activeElement as SideNavItem;
        const root = focused.shadowRoot ? focused.shadowRoot : focused;
        const clickEl = root.querySelector('a') as HTMLAnchorElement;
        clickEl.click();

        await elementUpdated(el);

        expect(sidenavEl.value).to.equal('Section 1');

        sidenavEl.dispatchEvent(arrowDownEvent);
        sidenavEl.dispatchEvent(arrowDownEvent);
        sidenavEl.dispatchEvent(arrowDownEvent);
        focused = rootNode.activeElement as SideNavItem;
        expect(focused.expanded).to.be.false;
        focused.click();

        await elementUpdated(el);

        expect(focused.expanded).to.be.true;

        sidenavEl.dispatchEvent(arrowUpEvent);
        sidenavEl.dispatchEvent(arrowUpEvent);
        focused = rootNode.activeElement as SideNavItem;
        focused.click();

        await elementUpdated(el);

        expect(sidenavEl.value).to.equal('Section 3a');

        document.body.focus();

        sidenavEl.focus();
        focused = rootNode.activeElement as SideNavItem;
        expect(focused.selected).to.be.true;

        sidenavEl.dispatchEvent(shiftTabEvent);
        const outsideFocused = rootNode.activeElement as HTMLElement;

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
