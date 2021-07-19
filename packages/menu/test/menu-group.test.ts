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
import '../sp-menu-group.js';
import '../sp-menu.js';
import '../sp-menu-item.js';
import '../sp-menu-divider.js';
import { Menu, MenuItem, MenuGroup, MenuChildItem } from '../';
import {
    fixture,
    elementUpdated,
    html,
    expect,
    waitUntil,
} from '@open-wc/testing';

const managedItems = (menu: Menu | MenuGroup): MenuChildItem[] => {
    return menu.childItems.filter((item: MenuChildItem) => item.managed);
};

describe('Menu group', () => {
    it('renders', async () => {
        const el = await fixture<Menu>(
            html`
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
            `
        );

        await waitUntil(() => {
            return managedItems(el).length === 5;
        }, `expected menu group to manage 5 children, received ${managedItems(el).length}`);
        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('handles selects for nested menu groups', async () => {
        const el = await fixture<Menu>(
            html`
                <sp-menu selects="single">
                    <sp-menu-item selected>First</sp-menu-item>
                    <sp-menu-item>Second</sp-menu-item>
                    <sp-menu-group id="mg-multi" selects="multiple">
                        <sp-menu-item selected>Multi1</sp-menu-item>
                        <sp-menu-item>Multi2</sp-menu-item>
                        <sp-menu-group id="mg-sub-inherit" selects="inherit">
                            <sp-menu-item>SubInherit1</sp-menu-item>
                            <sp-menu-item>SubInherit2</sp-menu-item>
                        </sp-menu-group>
                    </sp-menu-group>
                    <sp-menu-group id="mg-single" selects="single">
                        <sp-menu-item selected>Single1</sp-menu-item>
                        <sp-menu-item>Single2</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="mg-none">
                        <sp-menu-item>Inherit1</sp-menu-item>
                        <sp-menu-item>Inherit2</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="mg-inherit" selects="inherit">
                        <sp-menu-item>Inherit1</sp-menu-item>
                        <sp-menu-item>Inherit2</sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            `
        );

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
        expect(secondItem.selected).to.be.false;
        expect(el.value).to.equal('First');
        expect(el.selectedItems.length).to.equal(1);

        expect(firstItem.getAttribute('aria-checked')).to.equal('true');
        expect(secondItem.getAttribute('aria-checked')).to.equal('false');

        secondItem.click();
        await elementUpdated(el);
        await elementUpdated(firstItem);
        await elementUpdated(secondItem);
        expect(firstItem.selected).to.be.false;
        expect(secondItem.selected).to.be.true;
        expect(firstItem.getAttribute('aria-checked')).to.equal('false');
        expect(secondItem.getAttribute('aria-checked')).to.equal('true');
        expect(el.value).to.equal('Second');
        expect(el.selectedItems.length).to.equal(1);

        inheritItem1.click();
        await elementUpdated(el);
        await elementUpdated(inheritItem1);
        await elementUpdated(secondItem);
        expect(secondItem.selected).to.be.false;
        expect(inheritItem1.selected).to.be.true;
        expect(secondItem.getAttribute('aria-checked')).to.equal('false');
        expect(inheritItem1.getAttribute('aria-checked')).to.equal('true');
        expect(el.value).to.equal('Inherit1');
        expect(el.selectedItems.length).to.equal(1);

        noneItem2.click();
        await elementUpdated(el);
        await elementUpdated(noneItem2);
        expect(inheritItem1.selected).to.be.true;
        expect(noneItem2.selected).to.be.false;
        expect(el.value).to.equal('Inherit1');
        expect(el.selectedItems.length).to.equal(1);

        singleItem2.click();
        await elementUpdated(el);
        await elementUpdated(singleItem1);
        await elementUpdated(singleItem2);
        expect(singleItem1.selected).to.be.false;
        expect(singleItem2.selected).to.be.true;
        expect(inheritItem1.selected).to.be.true;
        expect(singleItem1.getAttribute('aria-checked')).to.equal('false');
        expect(singleItem2.getAttribute('aria-checked')).to.equal('true');
        expect(el.value).to.equal('Inherit1');
        expect(el.selectedItems.length).to.equal(1);
        //expect(singleGroup.value).to.equal('Inherit1')
        expect(singleGroup.selectedItems.length).to.equal(1);

        multiItem2.click();
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
        const el = await fixture<Menu>(
            html`
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
            `
        );

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

        await waitUntil(() => {
            return managedItems(inheritGroup).length === 4;
        }, `expected new single sub-group to manage 4 items, received ${managedItems(inheritGroup).length} because "selects === ${inheritGroup.selects}`);

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
});
