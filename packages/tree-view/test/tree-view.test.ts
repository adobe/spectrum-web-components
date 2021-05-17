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

import '../sp-tree-view.js';
import '../sp-tree-view-item.js';
import { TreeView } from '..';
import { fixture, elementUpdated, expect } from '@open-wc/testing';

import {
    Default,
    sections,
    selectsMultiple,
    selectsSingle,
    thumbnailsQuiet,
} from '../stories/tree-view.stories.js';
import { TreeViewItem } from '../src';
import { html } from '@spectrum-web-components/base';
import {
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    arrowUpEvent,
    enterEvent,
    spaceEvent,
    shiftSpaceEvent,
} from '../../../test/testing-helpers';

describe('TreeView', () => {
    describe('Accessibility', () => {
        it('loads a standard tree-view', async () => {
            const el = await fixture<TreeView>(Default());

            await elementUpdated(el);

            await expect(el).to.be.accessible();
            expect(el.getAttribute('role')).to.equal('tree');
            expect(el.hasAttribute('aria-multiselectable')).to.be.false;

            const firstItem = el.querySelector(
                'sp-tree-view-item:nth-of-type(1)'
            ) as TreeViewItem;
            const secondItem = el.querySelector(
                'sp-tree-view-item:nth-of-type(2)'
            ) as TreeViewItem;

            expect(firstItem.getAttribute('role')).to.equal('treeitem');
            expect(
                secondItem.querySelector('sp-tree-view')?.getAttribute('role')
            ).to.equal('group');
        });

        it('loads a tree-view with sections', async () => {
            const el = await fixture<TreeView>(sections());

            await elementUpdated(el);

            await expect(el).to.be.accessible();
        });

        it('loads a tree-view with quiet thumbnails', async () => {
            const el = await fixture<TreeView>(thumbnailsQuiet());

            await elementUpdated(el);

            await expect(el).to.be.accessible();
        });

        it('loads a [selects="single"] tree-view', async () => {
            const el = await fixture<TreeView>(selectsSingle());

            await elementUpdated(el);

            await expect(el).to.be.accessible();

            expect(el.hasAttribute('aria-multiselectable')).to.be.false;
        });

        it('loads a [selects="multiple"] tree-view', async () => {
            const el = await fixture<TreeView>(selectsMultiple());

            await elementUpdated(el);

            await expect(el).to.be.accessible();

            expect(el.hasAttribute('aria-multiselectable')).to.be.true;
            expect(el.getAttribute('aria-multiselectable')).to.equal('true');
        });

        it('loads a flat tree-view', async () => {
            const el = await fixture<TreeView>(
                html`
                    <sp-tree-view>
                        <sp-tree-view-item class="first">
                            Layer 1
                        </sp-tree-view-item>
                        <sp-tree-view-item open can-open class="second">
                            Group
                        </sp-tree-view-item>
                        <sp-tree-view-item indent="1" class="third">
                            Layer 2
                        </sp-tree-view-item>
                    </sp-tree-view>
                `
            );

            await elementUpdated(el);

            await expect(el).to.be.accessible();

            const firstItem = el.querySelector('.first') as TreeViewItem;
            const secondItem = el.querySelector('.second') as TreeViewItem;
            const thirdItem = el.querySelector('.third') as TreeViewItem;

            expect(firstItem.getAttribute('role')).to.equal('treeitem');
            expect(firstItem.getAttribute('aria-level')).to.equal('1');
            expect(secondItem.getAttribute('role')).to.equal('treeitem');
            expect(secondItem.getAttribute('aria-level')).to.equal('1');
            expect(thirdItem.getAttribute('role')).to.equal('treeitem');
            expect(thirdItem.getAttribute('aria-level')).to.equal('2');
        });
    });

    it('does not accept focus/click/blur when empty', async () => {
        const el = await fixture<TreeView>(
            html`
                <sp-tree-view></sp-tree-view>
            `
        );

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

    it('does not accept focus when all children [disabled]', async () => {
        const el = await fixture<TreeView>(
            html`
                <sp-tree-view>
                    <sp-tree-view-item>Item 1</sp-tree-view-item>
                    <sp-tree-view-item open>
                        Group
                        <sp-tree-view slot="children">
                            <sp-tree-view-item>Item 2</sp-tree-view-item>
                            <sp-tree-view-item>Item 3</sp-tree-view-item>
                        </sp-tree-view>
                    </sp-tree-view-item>
                </sp-tree-view>
            `
        );

        await elementUpdated(el);
        expect(document.activeElement === el).to.be.false;

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement === el).to.be.false;
        expect(el.matches(':focus-within')).to.be.false;
    });

    it('sets tab stop when [manage-tab-index]', async () => {
        const el = await fixture<TreeView>(
            html`
                <sp-tree-view manage-tab-index>
                    <sp-tree-view-item class="first">Item 1</sp-tree-view-item>
                    <sp-tree-view-item class="second">Item 2</sp-tree-view-item>
                </sp-tree-view>
            `
        );
        const firstItem = el.querySelector('.first') as TreeViewItem;
        const secondItem = el.querySelector('.second') as TreeViewItem;

        await elementUpdated(el);

        expect(firstItem.hasAttribute('tabindex'));
        expect(firstItem.tabIndex).to.equal(0);
        expect(secondItem.hasAttribute('tabindex'));
        expect(secondItem.tabIndex).to.equal(-1);
    });

    it('sets tab stop when [manage-tab-index] and the initial item is [disabled]', async () => {
        const el = await fixture<TreeView>(
            html`
                <sp-tree-view manage-tab-index>
                    <sp-tree-view-item disabled>Item 1</sp-tree-view-item>
                    <sp-tree-view-item class="second">Item 2</sp-tree-view-item>
                    <sp-tree-view-item open>
                        Group
                        <sp-tree-view slot="children">
                            <sp-tree-view-item>Item 3</sp-tree-view-item>
                            <sp-tree-view-item>Item 4</sp-tree-view-item>
                        </sp-tree-view>
                    </sp-tree-view-item>
                </sp-tree-view>
            `
        );
        const secondItem = el.querySelector('.second') as TreeViewItem;

        await elementUpdated(el);

        expect(secondItem.hasAttribute('tabindex'));
        expect(secondItem.tabIndex).to.equal(0);
    });

    it('sets tab stop when [manage-tab-index] and an item is [selected]', async () => {
        const el = await fixture<TreeView>(
            html`
                <sp-tree-view selects="single" manage-tab-index>
                    <sp-tree-view-item>Item 1</sp-tree-view-item>
                    <sp-tree-view-item selected class="second">
                        Item 2
                    </sp-tree-view-item>
                    <sp-tree-view-item open>
                        Group
                        <sp-tree-view slot="children">
                            <sp-tree-view-item>Item 3</sp-tree-view-item>
                            <sp-tree-view-item>Item 4</sp-tree-view-item>
                        </sp-tree-view>
                    </sp-tree-view-item>
                </sp-tree-view>
            `
        );
        const secondItem = el.querySelector('.second') as TreeViewItem;

        await elementUpdated(el);

        expect(secondItem.hasAttribute('tabindex'));
        expect(secondItem.tabIndex).to.equal(0);
    });

    it('sets multiple tab stops when [manage-tab-index] and multiple items are [selected]', async () => {
        const el = await fixture<TreeView>(
            html`
                <sp-tree-view selects="multiple" manage-tab-index>
                    <sp-tree-view-item class="first">Item 1</sp-tree-view-item>
                    <sp-tree-view-item selected class="second">
                        Item 2
                    </sp-tree-view-item>
                    <sp-tree-view-item open>
                        Group
                        <sp-tree-view slot="children">
                            <sp-tree-view-item selected class="third">
                                Item 3
                            </sp-tree-view-item>
                            <sp-tree-view-item class="fourth">
                                Item 4
                            </sp-tree-view-item>
                        </sp-tree-view>
                    </sp-tree-view-item>
                </sp-tree-view>
            `
        );
        const firstItem = el.querySelector('.first') as TreeViewItem;
        const secondItem = el.querySelector('.second') as TreeViewItem;
        const thirdItem = el.querySelector('.third') as TreeViewItem;
        const fourthItem = el.querySelector('.fourth') as TreeViewItem;

        await elementUpdated(el);

        expect(firstItem.hasAttribute('tabindex'));
        expect(firstItem.tabIndex).to.equal(-1);
        expect(secondItem.hasAttribute('tabindex'));
        expect(secondItem.tabIndex).to.equal(0);
        expect(thirdItem.hasAttribute('tabindex'));
        expect(thirdItem.tabIndex).to.equal(0);
        expect(fourthItem.hasAttribute('tabindex'));
        expect(fourthItem.tabIndex).to.equal(-1);
    });

    it('prevents selection without [selects]', async () => {
        const el = await fixture<TreeView>(Default());

        const firstItem = el.querySelector(
            'sp-tree-view-item:nth-of-type(1)'
        ) as TreeViewItem;

        const firstButton = firstItem.focusElement;
        firstButton.click();
        await elementUpdated(firstItem);

        expect(firstItem.selected).to.be.false;
    });

    it('only allows one item to be selected at a time when `[selects="single"]`', async () => {
        const el = await fixture<TreeView>(Default());
        el.selects = 'single';
        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-tree-view-item:nth-of-type(1)'
        ) as TreeViewItem;
        const secondItem = el.querySelector(
            'sp-tree-view-item:nth-of-type(2)'
        ) as TreeViewItem;

        const firstButton = firstItem.focusElement;
        const secondButton = secondItem.focusElement;

        firstButton.click();
        await elementUpdated(firstItem);

        expect(firstItem.selected).to.be.true;
        expect(secondItem.selected).to.be.false;

        secondButton.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                composed: true,
                cancelable: true,
                metaKey: true,
            })
        );
        await elementUpdated(secondItem);

        expect(firstItem.selected).to.be.false;
        expect(secondItem.selected).to.be.true;
    });

    it('allows more than one selected item when `[selects="multiple"]`', async () => {
        const el = await fixture<TreeView>(Default());
        el.selects = 'multiple';
        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-tree-view-item:nth-of-type(1)'
        ) as TreeViewItem;
        const secondItem = el.querySelector(
            'sp-tree-view-item:nth-of-type(2)'
        ) as TreeViewItem;

        const firstButton = firstItem.focusElement;
        const secondButton = secondItem.focusElement;

        firstButton.click();
        await elementUpdated(firstItem);

        expect(firstItem.selected).to.be.true;
        expect(secondItem.selected).to.be.false;

        secondButton.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                composed: true,
                cancelable: true,
                metaKey: true,
            })
        );
        await elementUpdated(secondItem);

        expect(firstItem.selected).to.be.true;
        expect(secondItem.selected).to.be.true;

        secondButton.click();
        await elementUpdated(secondItem);

        expect(firstItem.selected).to.be.false;
        expect(secondItem.selected).to.be.false;
    });

    it('selects contiguous items when `[selects="multiple"]` and shiftKey used on select', async () => {
        const el = await fixture<TreeView>(
            html`
                <sp-tree-view selects="multiple">
                    <sp-tree-view-item class="first">Item 1</sp-tree-view-item>
                    <sp-tree-view-item class="second">Item 2</sp-tree-view-item>
                    <sp-tree-view-item open class="third">
                        Item 3
                        <sp-tree-view slot="children">
                            <sp-tree-view-item class="fourth">
                                Item 4
                            </sp-tree-view-item>
                        </sp-tree-view>
                    </sp-tree-view-item>
                </sp-tree-view>
            `
        );
        await elementUpdated(el);

        const firstItem = el.querySelector('.first') as TreeViewItem;
        const secondItem = el.querySelector('.second') as TreeViewItem;
        const thirdItem = el.querySelector('.third') as TreeViewItem;
        const fourthItem = el.querySelector('.fourth') as TreeViewItem;

        const firstButton = firstItem.focusElement;
        const thirdButton = thirdItem.focusElement;
        const fourthButton = fourthItem.focusElement;

        firstButton.click();
        await elementUpdated(firstItem);

        expect(firstItem.selected).to.be.true;

        fourthButton.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                composed: true,
                cancelable: true,
                shiftKey: true,
            })
        );
        await elementUpdated(fourthItem);

        expect(firstItem.selected).to.be.true;
        expect(secondItem.selected).to.be.true;
        expect(thirdItem.selected).to.be.true;
        expect(fourthItem.selected).to.be.true;

        thirdButton.click();
        await elementUpdated(thirdItem);

        expect(thirdItem.selected).to.be.false;

        firstButton.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                composed: true,
                cancelable: true,
                shiftKey: true,
            })
        );
        await elementUpdated(firstItem);

        expect(firstItem.selected).to.be.true;
        expect(secondItem.selected).to.be.true;
        expect(thirdItem.selected).to.be.true;
    });

    it('dispatches a change event when selected items change', async () => {
        let eventSource = null as TreeView | null;
        const onChange = (event: Event): void => {
            eventSource = event.target as TreeView;
        };
        const el = await fixture<TreeView>(
            html`
                <sp-tree-view selects="single" @change="${onChange}">
                    <sp-tree-view-item class="first">Item 1</sp-tree-view-item>
                    <sp-tree-view-item class="second">Item 2</sp-tree-view-item>
                </sp-tree-view>
            `
        );
        await elementUpdated(el);

        expect(el.selected.length).to.eq(0);

        const firstItem = el.querySelector('.first') as TreeViewItem;
        firstItem.focusElement.click();
        await elementUpdated(el);

        const testSource = eventSource as TreeView;
        expect(testSource).to.equal(el);
        expect(testSource.selected.length).to.eq(1);
    });

    it('accepts keyboard input', async () => {
        const el = await fixture<TreeView>(
            html`
                <sp-tree-view selects="multiple">
                    <sp-tree-view-item class="first">Item 1</sp-tree-view-item>
                    <sp-tree-view-item class="second">Item 2</sp-tree-view-item>
                    <sp-tree-view-item open class="third">
                        Item 3
                        <sp-tree-view slot="children">
                            <sp-tree-view-item class="fourth">
                                Item 4
                            </sp-tree-view-item>
                        </sp-tree-view>
                    </sp-tree-view-item>
                </sp-tree-view>
            `
        );
        const secondItem = el.querySelector('.second') as TreeViewItem;
        const thirdItem = el.querySelector('.third') as TreeViewItem;
        const fourthItem = el.querySelector('.fourth') as TreeViewItem;

        await elementUpdated(el);
        expect(el.selected.length === 0);

        thirdItem.focusElement.click();
        await elementUpdated(el);

        expect(thirdItem.selected, 'third child selected');
        expect(el.selected.length === 1);

        el.dispatchEvent(arrowDownEvent);
        let activeElement = document.activeElement as TreeViewItem;
        activeElement.dispatchEvent(enterEvent);
        await elementUpdated(activeElement);

        expect(el.selected.length === 1);
        expect(fourthItem.selected, 'fourth child selected');

        activeElement.dispatchEvent(arrowLeftEvent);
        activeElement = document.activeElement as TreeViewItem;
        activeElement.dispatchEvent(spaceEvent);
        await elementUpdated(activeElement);

        expect(el.selected.length === 1);
        expect(thirdItem.selected, 'third child selected');
        expect(thirdItem.open, 'third child opened');

        activeElement.dispatchEvent(arrowLeftEvent);
        await elementUpdated(activeElement);

        expect(el.selected.length === 1);
        expect(thirdItem.selected, 'third child selected');
        expect(thirdItem.open).to.be.false;

        el.dispatchEvent(arrowUpEvent);
        activeElement = document.activeElement as TreeViewItem;
        activeElement.dispatchEvent(enterEvent);
        await elementUpdated(activeElement);

        expect(activeElement === secondItem);
        expect(el.selected.length === 1);
        expect(secondItem.selected, 'second child selected');

        el.dispatchEvent(arrowDownEvent);
        activeElement = document.activeElement as TreeViewItem;

        expect(activeElement === thirdItem);

        activeElement.dispatchEvent(arrowRightEvent);
        activeElement = document.activeElement as TreeViewItem;
        await elementUpdated(activeElement);

        expect(activeElement === thirdItem);
        expect(thirdItem.open, 'third child opened');

        activeElement.dispatchEvent(arrowRightEvent);
        activeElement = document.activeElement as TreeViewItem;

        expect(activeElement === fourthItem);

        activeElement.dispatchEvent(shiftSpaceEvent);
        await elementUpdated(activeElement);

        expect(el.selected.length === 3);
        expect(secondItem.selected, 'second child selected');
        expect(thirdItem.selected, 'third child selected');
        expect(fourthItem.selected, 'fourth child selected');
    });

    it('handles flat items that are nested with `[indented]`', async () => {
        const el = await fixture<TreeView>(
            html`
                <sp-tree-view>
                    <sp-tree-view-item can-open open class="first">
                        Item 1
                    </sp-tree-view-item>
                    <sp-tree-view-item can-open open indent="1" class="second">
                        Item 2
                    </sp-tree-view-item>
                    <sp-tree-view-item indent="2" class="third">
                        Item 3
                    </sp-tree-view-item>
                </sp-tree-view>
            `
        );
        const firstItem = el.querySelector('.first') as TreeViewItem;
        const secondItem = el.querySelector('.second') as TreeViewItem;
        const thirdItem = el.querySelector('.third') as TreeViewItem;

        // All items start opened
        expect(
            el.querySelectorAll('sp-tree-view-item:not([hidden])').length === 3
        );

        // Close the first item
        firstItem.focus();
        firstItem.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);

        // Everything but the top-level item is hidden. Second item hidden but still marked open.
        expect(firstItem.hasAttribute('hidden')).to.be.false;
        expect(secondItem.hasAttribute('hidden')).to.be.true;
        expect(secondItem.open, 'second child opened');
        expect(thirdItem.hasAttribute('hidden')).to.be.true;

        // Open the first-level.
        firstItem.dispatchEvent(arrowRightEvent);
        await elementUpdated(el);

        // Everything shown again.
        expect(
            el.querySelectorAll('sp-tree-view-item:not([hidden])').length === 3
        );

        // Navigate into the second layer. Close the second layer.
        firstItem.dispatchEvent(arrowRightEvent);
        let activeElement = document.activeElement as TreeViewItem;
        expect(activeElement === secondItem);
        activeElement.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);

        // First item is open. Second item is closed but shown.
        expect(firstItem.open, 'first child opened');
        expect(secondItem.open).to.be.false;
        expect(firstItem.hasAttribute('hidden')).to.be.false;
        expect(secondItem.hasAttribute('hidden')).to.be.false;
        expect(thirdItem.hasAttribute('hidden')).to.be.true;

        // Navigate back to first layer and close the first item.
        activeElement.dispatchEvent(arrowLeftEvent);
        activeElement = document.activeElement as TreeViewItem;
        activeElement.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);

        // Everything but the first item is hidden again.
        expect(firstItem.hasAttribute('hidden')).to.be.false;
        expect(secondItem.hasAttribute('hidden')).to.be.true;
        expect(thirdItem.hasAttribute('hidden')).to.be.true;

        // Open the first item.
        activeElement = document.activeElement as TreeViewItem;
        activeElement.dispatchEvent(arrowRightEvent);
        await elementUpdated(el);

        // First item is still in focus. Only the first and second item are shown.
        expect(activeElement === firstItem);
        expect(firstItem.hasAttribute('hidden')).to.be.false;
        expect(secondItem.hasAttribute('hidden')).to.be.false;
        expect(thirdItem.hasAttribute('hidden')).to.be.true;
    });
});
