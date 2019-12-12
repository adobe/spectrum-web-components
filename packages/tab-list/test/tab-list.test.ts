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
import { TabList } from '../';
import '../../tab';
import { Tab } from '../../tab';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

const keyboardEvent = (code: string): KeyboardEvent =>
    new KeyboardEvent('keydown', {
        bubbles: true,
        composed: true,
        cancelable: true,
        code,
        key: code,
    });
const enterEvent = keyboardEvent('Enter');
const spaceEvent = keyboardEvent(' ');
const arrowRightEvent = keyboardEvent('ArrowRight');
const arrowLeftEvent = keyboardEvent('ArrowLeft');
const arrowUpEvent = keyboardEvent('ArrowUp');
const arrowDownEvent = keyboardEvent('ArrowDown');

const createTabList = async (): Promise<TabList> =>
    await fixture<TabList>(
        html`
            <sp-tab-list selected="first">
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
                <sp-tab label="Tab 3" value="third"></sp-tab>
            </sp-tab-list>
        `
    );

describe('TabList', () => {
    it('loads', async () => {
        const tabList = await createTabList();

        const tabs = tabList.querySelectorAll('sp-tab');

        expect(tabList).to.exist;
        expect(tabs.length).to.equal(3);
    });

    it('reflects selected tab with selected property', async () => {
        const tabList = await createTabList();

        const firstTab = tabList.querySelector('sp-tab[value=first]');
        const secondTab = tabList.querySelector('sp-tab[value=second]');
        const thirdTab = tabList.querySelector('sp-tab[value=third]');

        if (!(firstTab instanceof Tab))
            throw new Error('firstTab not of type Tab');
        if (!(secondTab instanceof Tab))
            throw new Error('secondTab not of type Tab');
        if (!(thirdTab instanceof Tab))
            throw new Error('thirdTab not of type Tab');

        expect(firstTab.selected).to.be.true;
        expect(secondTab.selected).to.be.false;
        expect(thirdTab.selected).to.be.false;
        expect(tabList.selected).to.equal(firstTab.value);

        secondTab.click();
        await elementUpdated(tabList);

        expect(firstTab.selected).to.be.false;
        expect(secondTab.selected).to.be.true;
        expect(thirdTab.selected).to.be.false;
        expect(tabList.selected).to.equal(secondTab.value);

        thirdTab.click();
        await elementUpdated(tabList);

        expect(firstTab.selected).to.be.false;
        expect(secondTab.selected).to.be.false;
        expect(thirdTab.selected).to.be.true;
        expect(tabList.selected).to.equal(thirdTab.value);
    });

    it('forces only one tab to be selected', async () => {
        const tabList = await createTabList();

        const selectedTabs = tabList.querySelectorAll('sp-tab[selected]');

        expect(tabList.selected).to.equal('first');
        expect(selectedTabs.length).to.equal(1);
    });

    it('de-selects all but first selected tab if multiple selected', async () => {
        const tabList = await createTabList();

        const tab1 = tabList.querySelector('sp-tab[value=first]') as Tab;
        const tab2 = tabList.querySelector('sp-tab[value=second]') as Tab;
        if (!(tab1 instanceof Tab)) throw new Error('tab1 not of type Tab');
        if (!(tab2 instanceof Tab)) throw new Error('tab2 not of type Tab');

        expect(tabList.selected).to.equal('first');
        expect(tab1.selected).to.be.true;
        expect(tab2.selected).to.be.false;
    });

    it('ensures setting selection updates selected tab', async () => {
        const tabList = await createTabList();

        const tab1 = tabList.querySelector('sp-tab[value=first]') as Tab;
        const tab2 = tabList.querySelector('sp-tab[value=second]') as Tab;
        const tab3 = tabList.querySelector('sp-tab[value=third]') as Tab;

        if (!(tab1 instanceof Tab)) throw new Error('tab1 not of type Tab');
        if (!(tab2 instanceof Tab)) throw new Error('tab2 not of type Tab');
        if (!(tab3 instanceof Tab)) throw new Error('tab3 not of type Tab');

        expect(tabList.selected).to.equal('first');
        expect(tab1.selected).to.be.true;
        expect(tab2.selected).to.be.false;
        expect(tab3.selected).to.be.false;

        tabList.selected = 'second';
        await elementUpdated(tabList);

        expect(tabList.selected).to.equal('second');
        expect(tab1.selected).to.be.false;
        expect(tab2.selected).to.be.true;
        expect(tab3.selected).to.be.false;

        tabList.selected = 'third';

        expect(tabList.selected).to.equal('third');
        expect(tab1.selected).to.be.false;
        expect(tab2.selected).to.be.false;
        expect(tab3.selected).to.be.true;
    });

    it('ensures setting selected and clicking on tab both work together', async () => {
        const tabList = await createTabList();

        const tab1 = tabList.querySelector('sp-tab[value=first]') as Tab;
        const tab2 = tabList.querySelector('sp-tab[value=second]') as Tab;
        const tab3 = tabList.querySelector('sp-tab[value=third]') as Tab;

        if (!(tab1 instanceof Tab)) throw new Error('tab1 not of type Tab');
        if (!(tab2 instanceof Tab)) throw new Error('tab2 not of type Tab');
        if (!(tab3 instanceof Tab)) throw new Error('tab3 not of type Tab');

        tab2.click();
        await elementUpdated(tabList);

        expect(tabList.selected).to.equal('second');
        expect(tab1.selected).to.be.false;
        expect(tab2.selected).to.be.true;
        expect(tab3.selected).to.be.false;

        tabList.selected = 'first';
        await elementUpdated(tabList);

        expect(tabList.selected).to.equal('first');
        expect(tab1.selected).to.be.true;
        expect(tab2.selected).to.be.false;
        expect(tab3.selected).to.be.false;
    });
    it('displays `vertical`', async () => {
        const el = await fixture<TabList>(html`
            <sp-tab-list selected="first" direction="vertical">
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
                <sp-tab label="Tab 3" value="third"></sp-tab>
            </sp-tab-list>
        `);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');

        el.selected = 'first';
        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');
    });
    it('displays with nothing `selected`', async () => {
        const el = await fixture<TabList>(html`
            <sp-tab-list>
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
                <sp-tab label="Tab 3" value="third"></sp-tab>
            </sp-tab-list>
        `);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('');

        el.selected = 'first';
        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');
    });
    it('ignores children with no `value`', async () => {
        const el = await fixture<TabList>(html`
            <sp-tab-list selected="first">
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <div id="other">Other thing</div>
            </sp-tab-list>
        `);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');

        const otherThing = el.querySelector('#other') as HTMLDivElement;
        otherThing.click();
        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');
    });
    it('allows selection to be cancellable', async () => {
        const cancelSelection = (event: Event): void => event.preventDefault();
        const el = await fixture<TabList>(html`
            <sp-tab-list selected="first" @change=${cancelSelection}>
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
            </sp-tab-list>
        `);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');

        const secondTab = el.querySelector('[value="second"]') as Tab;
        secondTab.click();
        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');
    });
    it('accepts keyboard based selection', async () => {
        const el = await fixture<TabList>(html`
            <sp-tab-list selected="Unknown">
                <sp-tab label="Tab 1" value="first">
                    <sp-icon
                        slot="icon"
                        size="s"
                        name="ui:CheckmarkSmall"
                    ></sp-icon>
                </sp-tab>
                <sp-tab label="Tab 2" value="second">
                    <sp-icon
                        slot="icon"
                        size="s"
                        name="ui:CheckmarkSmall"
                    ></sp-icon>
                </sp-tab>
            </sp-tab-list>
        `);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('');

        const firstTab = el.querySelector('[value="first"]') as Tab;
        const secondTab = el.querySelector('[value="second"]') as Tab;
        firstTab.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        firstTab.focus();

        await elementUpdated(el);
        expect(document.activeElement === firstTab, 'Focus first tab').to.be
            .true;

        firstTab.dispatchEvent(arrowLeftEvent);
        firstTab.dispatchEvent(arrowUpEvent);

        await elementUpdated(el);
        expect(document.activeElement === secondTab, 'Focus second tab').to.be
            .true;

        secondTab.dispatchEvent(enterEvent);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('second');

        secondTab.dispatchEvent(arrowRightEvent);

        await elementUpdated(el);
        expect(document.activeElement === firstTab, 'Focus first tab').to.be
            .true;

        firstTab.dispatchEvent(spaceEvent);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');
    });
    it('accepts keyboard based selection - [direction="vertical"]', async () => {
        const el = await fixture<TabList>(html`
            <sp-tab-list selected="Unknown" direction="vertical">
                <sp-tab label="Tab 1" value="first">
                    <sp-icon
                        slot="icon"
                        size="s"
                        name="ui:CheckmarkSmall"
                    ></sp-icon>
                </sp-tab>
                <sp-tab label="Tab 2" value="second">
                    <sp-icon
                        slot="icon"
                        size="s"
                        name="ui:CheckmarkSmall"
                    ></sp-icon>
                </sp-tab>
            </sp-tab-list>
        `);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('');

        const firstTab = el.querySelector('[value="first"]') as Tab;
        const secondTab = el.querySelector('[value="second"]') as Tab;
        firstTab.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        firstTab.focus();

        await elementUpdated(el);
        expect(document.activeElement === firstTab, 'Focus first tab').to.be
            .true;

        firstTab.dispatchEvent(arrowLeftEvent);
        firstTab.dispatchEvent(arrowUpEvent);

        await elementUpdated(el);
        expect(document.activeElement === secondTab, 'Focus second tab').to.be
            .true;

        secondTab.dispatchEvent(enterEvent);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('second');

        secondTab.dispatchEvent(arrowDownEvent);

        await elementUpdated(el);
        expect(document.activeElement === firstTab, 'Focus first tab').to.be
            .true;

        firstTab.dispatchEvent(spaceEvent);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');
    });
});
