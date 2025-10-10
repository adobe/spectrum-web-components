/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    waitUntil,
} from '@open-wc/testing';
import { LitElement, TemplateResult } from '@spectrum-web-components/base';
import { isChrome } from '@spectrum-web-components/shared';
import { SideNav, SideNavItem } from '@spectrum-web-components/sidenav';
import '@spectrum-web-components/sidenav/sp-sidenav-heading.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import { spy } from 'sinon';
import {
    arrowDownEvent,
    arrowUpEvent,
    mouseClickOn,
    shiftTabEvent,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';
import { manageTabIndex } from '../stories/sidenav.stories.js';

describe('Sidenav', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<SideNav>(html`
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
            `)
    );
    it('loads', async () => {
        const el = await fixture<SideNav>(html`
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
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('does not accept focus/click/blur when empty', async () => {
        const el = await fixture<SideNav>(html`
            <sp-sidenav></sp-sidenav>
        `);

        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;

        el.blur();
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;

        el.click();
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;
    });
    it('does not accept keyboard events when items are not present', async () => {
        const errorSpy = spy();
        const el = await fixture<SideNav>(html`
            <sp-sidenav>
                <sp-sidenav-item
                    value="Section 1"
                    label="Section 1"
                ></sp-sidenav-item>
            </sp-sidenav>
        `);

        await elementUpdated(el);
        const item = el.querySelector('sp-sidenav-item') as SideNavItem;
        window.addEventListener('error', () => errorSpy());

        el.dispatchEvent(new FocusEvent('focusin'));
        item.remove();

        await elementUpdated(el);
        el.dispatchEvent(
            new KeyboardEvent('keydown', {
                code: 'ArrowDown',
            })
        );

        expect(errorSpy.callCount).to.equal(0);
    });
    it('does not accept focus when all children [disabled]', async () => {
        const el = await fixture<SideNav>(html`
            <sp-sidenav>
                <sp-sidenav-item
                    disabled
                    value="Section 1"
                    label="Section 1"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    disabled
                    value="Section 2"
                    label="Section 2"
                ></sp-sidenav-item>
            </sp-sidenav>
        `);

        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;
        expect(el.matches(':focus-within')).to.be.false;
    });
    it('sets manageTabIndex on new children', async () => {
        const el = await fixture<SideNav>(html`
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
        `);

        await elementUpdated(el);
        expect(el.manageTabIndex).to.be.false;

        const item1 = el.querySelector('sp-sidenav-item') as SideNavItem;
        expect(item1.tabIndex).to.equal(0);

        const newItem = document.createElement('sp-sidenav-item');
        newItem.value = 'Section 3';
        newItem.label = 'Section 3';
        el.appendChild(newItem);

        await elementUpdated(newItem);

        expect(newItem.tabIndex).to.equal(0);

        el.focus();
        const focused = document.activeElement as SideNavItem;
        focused.click();
        expect(focused.selected).to.be.true;

        el.dispatchEvent(shiftTabEvent());
        const outsideFocused = document.activeElement as HTMLElement;

        expect(typeof outsideFocused).not.to.equal(SideNavItem);
    });
    it('handles select', async () => {
        const changeSpy = spy();
        const el = await fixture<SideNav>(html`
            <sp-sidenav @change=${() => changeSpy()}>
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
        `);

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
        expect(changeSpy.callCount).to.equal(1);

        sidenavItem.click();

        await elementUpdated(sidenavItem);

        const sidenavItemChild = el.querySelector(
            '[value="Section 2a"]'
        ) as SideNavItem;
        sidenavItemChild.click();

        await elementUpdated(el);

        expect(el.value).to.equal('Section 2a');
        expect(changeSpy.callCount).to.equal(2);
    });
    it('prevents selection', async () => {
        const changeSpy = spy();
        const el = await fixture<SideNav>(html`
            <sp-sidenav
                @change=${(event: Event) => {
                    event.preventDefault();
                    changeSpy();
                }}
            >
                <sp-sidenav-heading label="CATEGORY 1">
                    <sp-sidenav-item
                        value="Section 1"
                        label="Section 1"
                    ></sp-sidenav-item>
                    <sp-sidenav-item value="Section 2" label="Section 2" opened>
                        <sp-sidenav-item
                            value="Section 2a"
                            label="Section 2a"
                        ></sp-sidenav-item>
                    </sp-sidenav-item>
                </sp-sidenav-heading>
            </sp-sidenav>
        `);

        await elementUpdated(el);

        expect(el.value).to.be.undefined;

        el.click();

        await elementUpdated(el);

        expect(el.value).to.be.undefined;
        expect(changeSpy.callCount).to.equal(1);
    });
    it('prevents [tabindex=0] while `focusin`', async () => {
        // @TODO: skipping this test because it's flaky in Chrome in CI. Will review in the migration to Spectrum 2.
        if (isChrome()) {
            return;
        }
        const el = await fixture<SideNav>(manageTabIndex());
        const selected = el.querySelector('[value="Section 1"]') as SideNavItem;
        const toBeSelected = el.querySelector(
            '[value="Section 0"]'
        ) as SideNavItem;

        await elementUpdated(el);
        await waitUntil(() => el.value === 'Section 1', 'wait for selection');

        expect(el.value).to.equal('Section 1');
        expect(selected.tabIndex, 'initially 0').to.equal(0);
        expect(toBeSelected.tabIndex, 'initially -1').to.equal(-1);

        el.focus();

        await elementUpdated(el);

        expect(el.value).to.equal('Section 1');
        expect(selected.tabIndex, '0 when focusin').to.equal(0);

        el.blur();

        await elementUpdated(el);

        expect(el.value).to.equal('Section 1');
        expect(selected.tabIndex, '0 when blur').to.equal(0);

        await mouseClickOn(toBeSelected);
        toBeSelected.dispatchEvent(
            new CustomEvent('sidenav-select', {
                bubbles: true,
                detail: {
                    value: 'Section 0',
                },
            })
        );
        await elementUpdated(el);

        expect(el.value).to.equal('Section 0');
        expect(toBeSelected.tabIndex, 'will be new focusable child').to.equal(
            0
        );
        expect(selected.tabIndex, 'no longer selected').to.equal(-1);
    });
    it('manage tab index', async () => {
        // @TODO: skipping this test because it's flaky in Chrome in CI. Will review in the migration to Spectrum 2.
        if (isChrome()) {
            return;
        }
        const el = await fixture<SideNav>(manageTabIndex());

        await elementUpdated(el);
        expect(el.value).to.equal('Section 1');

        el.focus();
        el.dispatchEvent(arrowUpEvent());
        let focused = document.activeElement as SideNavItem;
        focused.click();

        await elementUpdated(el);

        expect(el.value).to.equal('Section 0');

        el.focus();
        el.dispatchEvent(arrowDownEvent());
        el.dispatchEvent(arrowDownEvent());
        focused = document.activeElement as SideNavItem;
        expect(focused.expanded, 'not expanded').to.be.false;
        focused.click();

        await elementUpdated(el);

        expect(focused.expanded, 'expanded').to.be.true;

        el.dispatchEvent(arrowDownEvent());
        await elementUpdated(el);
        focused = document.activeElement as SideNavItem;
        focused.click();

        await elementUpdated(el);

        expect(el.value).to.equal('Section 3a');

        document.body.focus();

        el.focus();
        focused = document.activeElement as SideNavItem;
        expect(focused.selected, 'selected').to.be.true;

        el.dispatchEvent(shiftTabEvent());
        const outsideFocused = document.activeElement as HTMLElement;

        expect(typeof outsideFocused).not.to.equal(SideNavItem);
    });
    it('focuses the child anchor not the root when [tabindex=-1]', async () => {
        const el = await fixture<SideNav>(manageTabIndex());

        await nextFrame();
        await nextFrame();
        await nextFrame();
        await nextFrame();

        await elementUpdated(el);
        const firstItem = el.querySelector(
            '[value="Section 0"]'
        ) as SideNavItem;
        const selected = el.querySelector('[selected]') as SideNavItem;
        expect(selected.tabIndex).to.equal(0);
        expect(firstItem.tabIndex).to.equal(-1);

        await mouseClickOn(firstItem);
        await elementUpdated(el);

        expect(firstItem.matches(':focus'), 'root has focus').to.be.true;
        expect(
            firstItem.focusElement.matches(':focus'),
            'child has more precise focus'
        ).to.be.true;
    });
    it('manage tab index through shadow DOM', async () => {
        class SideNavTestEl extends LitElement {
            protected override render(): TemplateResult {
                return manageTabIndex();
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
        expect(sidenavEl.value).to.equal('Section 1');

        sidenavEl.focus();
        sidenavEl.dispatchEvent(arrowUpEvent());
        let focused = rootNode.activeElement as SideNavItem;
        focused.focusElement.click();

        await elementUpdated(sidenavEl);

        expect(sidenavEl.value).to.equal('Section 0');

        sidenavEl.focus();
        sidenavEl.dispatchEvent(arrowDownEvent());
        sidenavEl.dispatchEvent(arrowDownEvent());
        focused = rootNode.activeElement as SideNavItem;
        expect(focused.expanded).to.be.false;
        focused.focusElement.click();

        await elementUpdated(sidenavEl);

        expect(focused.expanded).to.be.true;

        sidenavEl.dispatchEvent(arrowDownEvent());
        await elementUpdated(sidenavEl);
        focused = rootNode.activeElement as SideNavItem;
        focused.focusElement.click();

        await elementUpdated(sidenavEl);

        expect(sidenavEl.value).to.equal('Section 3a');

        document.body.focus();

        sidenavEl.focus();
        focused = rootNode.activeElement as SideNavItem;
        expect(focused.selected).to.be.true;

        sidenavEl.dispatchEvent(shiftTabEvent());
        const outsideFocused = rootNode.activeElement as HTMLElement;

        expect(typeof outsideFocused).not.to.equal(SideNavItem);
    });
    it('manage tab index for late added items', async () => {
        const el = await fixture<SideNav>(html`
            <sp-sidenav manage-tab-index>
                <sp-sidenav-item
                    value="Section 0"
                    label="Section 0"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 1"
                    label="Section 1"
                ></sp-sidenav-item>
            </sp-sidenav>
        `);

        await elementUpdated(el);
        expect(el.manageTabIndex).to.be.true;

        const item1 = el.querySelector('sp-sidenav-item') as SideNavItem;
        const item2 = el.querySelector(
            'sp-sidenav-item:nth-child(2)'
        ) as SideNavItem;

        await elementUpdated(item1);
        await elementUpdated(item2);
        expect(item1.tabIndex, 'first item tabindex').to.equal(0);
        expect(item2.tabIndex, 'second item tabindex').to.equal(-1);

        const item3 = document.createElement('sp-sidenav-item');
        item3.value = 'Section 2';
        item3.label = 'Section 2';

        await elementUpdated(el);

        el.appendChild(item3);

        await elementUpdated(item3);
        await elementUpdated(el);

        await waitUntil(() => item3.tabIndex === -1, 'after');
    });
});
