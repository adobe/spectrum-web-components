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
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import { Menu, MenuGroup, MenuItem } from '@spectrum-web-components/menu';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import { sendKeys } from '@web/test-runner-commands';
import {
    mouseClickOn,
    testForLitDevWarnings,
} from '../../../test/testing-helpers.js';
import { ComplexSlottedGroup, ComplexSlottedMenu } from '../stories/index.js';
import { complexSlotted } from '../stories/menu-group.stories.js';

const managedItems = (menu: Menu | MenuGroup): MenuItem[] => {
    return menu.childItems.filter(
        (item: MenuItem) => item.menuData.selectionRoot === menu
    );
};

const focusableItems = (menu: Menu | MenuGroup): MenuItem[] => {
    return menu.childItems.filter(
        (item: MenuItem) => item.menuData.focusRoot === menu
    );
};

describe('Menu group', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Menu>(html`
                <sp-menu selects="single">
                    <sp-menu-group selects="inherit">
                        <span slot="header">Section Heading</span>
                        <sp-menu-item>Action 1</sp-menu-item>
                        <sp-menu-item>Action 2</sp-menu-item>
                        <sp-menu-item>Action 3</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-group selects="inherit">
                        <span slot="header">Section Heading</span>
                        <sp-menu-item>Save</sp-menu-item>
                        <sp-menu-item disabled>Download</sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            `)
    );
    it('renders', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu selects="single">
                <sp-menu-group selects="inherit">
                    <span slot="header">Section Heading</span>
                    <sp-menu-item>Action 1</sp-menu-item>
                    <sp-menu-item>Action 2</sp-menu-item>
                    <sp-menu-item>Action 3</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group selects="inherit">
                    <span slot="header">Section Heading</span>
                    <sp-menu-item>Save</sp-menu-item>
                    <sp-menu-item disabled>Download</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        `);

        await waitUntil(
            () => {
                return managedItems(el).length === 5;
            },
            `expected menu group to manage 5 children, received ${managedItems(el).length} of ${el.childItems.length}`
        );
        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('manages [slot="header"] content', async () => {
        const el = await fixture<MenuGroup>(html`
            <sp-menu-group></sp-menu-group>
        `);
        await elementUpdated(el);
        const slot = el.shadowRoot.querySelector(
            '[name="header"'
        ) as HTMLSlotElement;
        const header = document.createElement('span');
        header.textContent = 'Header';
        header.slot = 'header';
        expect(header.id).to.equal('');
        let slotchanged = oneEvent(slot, 'slotchange');
        el.append(header);
        await slotchanged;
        expect(header.id).to.equal(
            (el as unknown as { headerId: string }).headerId
        );

        slotchanged = oneEvent(slot, 'slotchange');
        header.remove();
        await slotchanged;
        expect(header.id).to.equal('');
    });
    it('handles selects for nested menu groups', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu selects="single">
                <sp-menu-item selected>First</sp-menu-item>
                <!-- 1 -->
                <sp-menu-item>Second</sp-menu-item>
                <!-- 1 -->
                <sp-menu-group id="mg-multi" selects="multiple">
                    <sp-menu-item selected>Multi1</sp-menu-item>
                    <!-- 2 -->
                    <sp-menu-item>Multi2</sp-menu-item>
                    <!-- 2 -->
                    <sp-menu-group id="mg-sub-inherit" selects="inherit">
                        <sp-menu-item>SubInherit1</sp-menu-item>
                        <!-- 2 -->
                        <sp-menu-item>SubInherit2</sp-menu-item>
                        <!-- 2 -->
                    </sp-menu-group>
                </sp-menu-group>
                <sp-menu-group id="mg-single" selects="single">
                    <sp-menu-item selected>Single1</sp-menu-item>
                    <!-- 3 -->
                    <sp-menu-item>Single2</sp-menu-item>
                    <!-- 3 -->
                </sp-menu-group>
                <sp-menu-group id="mg-none">
                    <sp-menu-item>Inherit1</sp-menu-item>
                    <!-- - -->
                    <sp-menu-item>Inherit2</sp-menu-item>
                    <!-- - -->
                </sp-menu-group>
                <sp-menu-group id="mg-inherit" selects="inherit">
                    <sp-menu-item>Inherit1</sp-menu-item>
                    <!-- 1 -->
                    <sp-menu-item>Inherit2</sp-menu-item>
                    <!-- 1 -->
                </sp-menu-group>
            </sp-menu>
        `);

        // 1 & 3 should be menuitemradio
        // 2 shouwl menuitemcheckbox

        await waitUntil(
            () => managedItems(el).length === 4,
            `expected outer menu to manage 4 items (2 are inherited), got ${
                managedItems(el).length
            }, with ${el.childItems.length} total`
        );
        await waitUntil(
            () => el.selectedItems.length === 1,
            'expected 1 selected item'
        );
        await elementUpdated(el);

        const firstItem = el.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;

        const secondItem = el.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;

        const multiGroup = el.querySelector(
            'sp-menu-group#mg-multi'
        ) as MenuGroup;
        const multiItem1 = multiGroup.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const multiItem2 = multiGroup.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;
        await waitUntil(
            () => managedItems(multiGroup).length === 4,
            `selects="#mg-multi should manage 4 items (2 are inherited), received ${
                managedItems(multiGroup).length
            }`
        );

        const singleGroup = el.querySelector(
            'sp-menu-group#mg-single'
        ) as MenuGroup;

        const singleItem1 = singleGroup.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const singleItem2 = singleGroup.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;
        await waitUntil(
            () => managedItems(singleGroup).length === 2,
            'selects="#mg-none should manage 4 items (2 are inherited)'
        );

        const noneGroup = el.querySelector(
            'sp-menu-group#mg-none'
        ) as MenuGroup;
        const noneItem1 = noneGroup.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const noneItem2 = noneGroup.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;
        await waitUntil(
            () => managedItems(noneGroup).length === 2,
            `selects="#mg-none" should manage 2 items, received ${
                managedItems(noneGroup).length
            }`
        );

        const inheritGroup = el.querySelector(
            'sp-menu-group#mg-inherit'
        ) as MenuGroup;
        const inheritItem1 = inheritGroup.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const inheritItem2 = inheritGroup.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;

        expect(firstItem.getAttribute('role')).to.equal('menuitemradio');
        expect(secondItem.getAttribute('role')).to.equal('menuitemradio');
        expect(multiItem1.getAttribute('role')).to.equal('menuitemcheckbox');
        expect(multiItem2.getAttribute('role')).to.equal('menuitemcheckbox');
        expect(singleItem1.getAttribute('role')).to.equal('menuitemradio');
        expect(singleItem2.getAttribute('role')).to.equal('menuitemradio');
        expect(noneItem1.getAttribute('role')).to.equal('menuitem');
        expect(noneItem2.getAttribute('role')).to.equal('menuitem');
        expect(inheritItem1.getAttribute('role')).to.equal('menuitemradio');
        expect(inheritItem2.getAttribute('role')).to.equal('menuitemradio');

        await elementUpdated(firstItem);
        expect(singleItem1.selected).to.be.true;
        expect(firstItem.selected).to.be.true;
        expect(secondItem.selected, 'second item not selected').to.be.false;
        expect(el.value).to.equal('First');
        expect(el.selectedItems.length).to.equal(1);

        expect(firstItem.getAttribute('aria-checked')).to.equal('true');
        expect(secondItem.getAttribute('aria-checked')).to.equal('false');
        let change = oneEvent(el, 'change');
        secondItem.click();
        await change;
        await elementUpdated(el);
        await elementUpdated(firstItem);
        await elementUpdated(secondItem);
        expect(firstItem.selected, 'first item not selected').to.be.false;
        expect(secondItem.selected).to.be.true;
        expect(firstItem.getAttribute('aria-checked')).to.equal('false');
        expect(secondItem.getAttribute('aria-checked')).to.equal('true');
        expect(el.value).to.equal('Second');
        expect(el.selectedItems.length).to.equal(1);
        change = oneEvent(el, 'change');
        inheritItem1.click();
        await change;
        await elementUpdated(el);
        await elementUpdated(inheritItem1);
        await elementUpdated(secondItem);
        expect(secondItem.selected, 'second item not selected again').to.be
            .false;
        expect(inheritItem1.selected).to.be.true;
        expect(secondItem.getAttribute('aria-checked')).to.equal('false');
        expect(inheritItem1.getAttribute('aria-checked')).to.equal('true');
        expect(el.value).to.equal('Inherit1');
        expect(el.selectedItems.length).to.equal(1);
        change = oneEvent(el, 'change');
        noneItem2.click();
        await change;
        await elementUpdated(el);
        await elementUpdated(noneGroup);
        await elementUpdated(noneItem2);
        expect(inheritItem1.selected).to.be.true;
        expect(noneItem2.selected, 'none item not selected').to.be.false;
        expect(el.value).to.equal('Inherit1');
        expect(el.selectedItems.length).to.equal(1);
        change = oneEvent(el, 'change');
        singleItem2.click();
        await change;
        await elementUpdated(singleGroup);
        await elementUpdated(singleItem1);
        await elementUpdated(singleItem2);
        expect(singleItem2.selected).to.be.true;
        expect(singleItem1.selected, 'first item not selected').to.be.false;
        expect(inheritItem1.selected).to.be.true;
        expect(singleItem1.getAttribute('aria-checked')).to.equal('false');
        expect(singleItem2.getAttribute('aria-checked')).to.equal('true');
        expect(el.value).to.equal('Inherit1');
        expect(el.selectedItems.length).to.equal(1);
        //expect(singleGroup.value).to.equal('Inherit1')
        expect(singleGroup.selectedItems.length).to.equal(1);
        change = oneEvent(el, 'change');
        multiItem2.click();
        await change;
        await elementUpdated(el);
        await elementUpdated(multiItem2);
        expect(multiItem1.selected).to.be.true;
        expect(multiItem2.selected).to.be.true;
        expect(inheritItem1.selected).to.be.true;
        expect(multiItem1.getAttribute('aria-checked')).to.equal('true');
        expect(multiItem2.getAttribute('aria-checked')).to.equal('true');
        //expect(multiGroup.value).to.equal('Inherit1')
        expect(multiGroup.selectedItems.length).to.equal(2);
    });

    it('handles changing managed items for selects changes', async () => {
        const el = await fixture<Menu>(html`
            <sp-menu selects="multiple" value-separator="--">
                <sp-menu-item selected>First</sp-menu-item>
                <sp-menu-item>Second</sp-menu-item>
                <sp-menu-group id="mg-inherit" selects="inherit">
                    <sp-menu-item>Inherit1</sp-menu-item>
                    <sp-menu-item>Inherit2</sp-menu-item>
                    <sp-menu-group id="mg-sub-inherit" selects="inherit">
                        <sp-menu-item>SubInherit1</sp-menu-item>
                        <sp-menu-item selected>SubInherit2</sp-menu-item>
                    </sp-menu-group>
                </sp-menu-group>
            </sp-menu>
        `);

        await waitUntil(
            () => managedItems(el).length == 6,
            `expected outer menu to manage 6 items, manages ${
                managedItems(el).length
            }`
        );
        await waitUntil(
            () => el.selectedItems.length == 2,
            'expected 2 selected item'
        );
        await elementUpdated(el);

        const inheritGroup = el.querySelector(
            'sp-menu-group#mg-inherit'
        ) as MenuGroup;
        const inheritItem1 = inheritGroup.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const inheritItem2 = inheritGroup.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;

        const subInheritGroup = el.querySelector(
            'sp-menu-group#mg-sub-inherit'
        ) as MenuGroup;
        const subInheritItem1 = subInheritGroup.querySelector(
            'sp-menu-item:nth-of-type(1)'
        ) as MenuItem;
        const subInheritItem2 = subInheritGroup.querySelector(
            'sp-menu-item:nth-of-type(2)'
        ) as MenuItem;

        expect(inheritItem1.getAttribute('role')).to.equal('menuitemcheckbox');
        expect(inheritItem2.getAttribute('role')).to.equal('menuitemcheckbox');
        expect(subInheritItem1.getAttribute('role')).to.equal(
            'menuitemcheckbox'
        );
        expect(subInheritItem2.getAttribute('role')).to.equal(
            'menuitemcheckbox'
        );
        expect(el.value).to.equal('First--SubInherit2');
        expect(el.selectedItems.length).to.equal(2);
        inheritGroup.setAttribute('selects', 'single');

        await elementUpdated(inheritGroup);
        await elementUpdated(el);

        await waitUntil(
            () => {
                return managedItems(inheritGroup).length === 4;
            },
            `expected new single sub-group to manage 4 items, received ${managedItems(inheritGroup).length} because "selects === ${inheritGroup.selects}`
        );

        await waitUntil(
            () => managedItems(el).length === 2,
            `expected outer menu to manage 2 items with none inherited, received ${
                managedItems(el).length
            }`
        );
        expect(inheritGroup.value).to.equal('SubInherit2');
        expect(inheritGroup.selectedItems.length).to.equal(1);
        expect(el.value).to.equal('First');
        expect(inheritItem1.getAttribute('role')).to.equal('menuitemradio');
        expect(inheritItem2.getAttribute('role')).to.equal('menuitemradio');
        expect(subInheritItem1.getAttribute('role')).to.equal('menuitemradio');
        expect(subInheritItem2.getAttribute('role')).to.equal('menuitemradio');
    });
    it('manages complex slotted menu items', async function () {
        const el = await fixture<ComplexSlottedMenu>(complexSlotted());

        await waitUntil(
            () => focusableItems(el.menu).length == 12,
            `expected outer menu to manage 12 items, ${
                el.menu.localName
            } manages ${focusableItems(el.menu).length}`
        );

        const menu = el.menu;
        const items: Record<string, MenuItem> = {};
        items.i2 = el.querySelector('#i-2') as MenuItem;
        items.i8 = el.querySelector('#i-8') as MenuItem;
        items.i9 = el.querySelector('#i-9') as MenuItem;
        items.i3 = el.renderRoot.querySelector('#i-3') as MenuItem;
        items.i5 = el.renderRoot.querySelector('#i-5') as MenuItem;
        items.i6 = el.renderRoot.querySelector('#i-6') as MenuItem;
        items.i7 = el.renderRoot.querySelector('#i-7') as MenuItem;
        const group = el.renderRoot.querySelector(
            '#complex-slotted-group'
        ) as ComplexSlottedGroup;
        items.i1 = group?.renderRoot.querySelector('#i-1') as MenuItem;
        items.i4 = group?.renderRoot.querySelector('#i-4') as MenuItem;
        items.i10 = group?.renderRoot.querySelector('#i-10') as MenuItem;
        items.i11 = group?.renderRoot.querySelector('#i-11') as MenuItem;
        items.i12 = group?.renderRoot.querySelector('#i-12') as MenuItem;

        await mouseClickOn(items.i9);
        await elementUpdated(items.i9);

        await sendKeys({ press: 'ArrowDown' });
        await sendKeys({ press: 'ArrowUp' });
        await elementUpdated(items.i9);
        expect(items.i9.focused).to.be.true;
        await sendKeys({ press: 'ArrowDown' });
        let i = 9;
        const count = Object.keys(items).length + 1;
        while (!items.i9.focused) {
            i = Math.max(1, (i + 1 + count) % count);
            await elementUpdated(menu);
            await elementUpdated(items[`i${i}`]);
            expect(items[`i${i}`].focused, `i${i} should be focused`).to.be
                .true;
            await sendKeys({ press: 'ArrowDown' });
            await elementUpdated(menu);
            await elementUpdated(items[`i${i}`]);
        }
    });
});
