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
import '../sp-tabs.js';
import '../sp-tab.js';
import { Tabs, Tab } from '../';
import '@spectrum-web-components/icon/sp-icon.js';
import {
    fixture,
    elementUpdated,
    html,
    expect,
    waitUntil,
} from '@open-wc/testing';
import { LitElement } from 'lit-element';
import { TemplateResult } from 'lit-html';
import { waitForPredicate } from '../../../test/testing-helpers.js';
import {
    enterEvent,
    spaceEvent,
    arrowRightEvent,
    arrowLeftEvent,
    arrowUpEvent,
    arrowDownEvent,
} from '../../../test/testing-helpers.js';

const createTabs = async (): Promise<Tabs> =>
    await fixture<Tabs>(
        html`
            <sp-tabs selected="first">
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
                <sp-tab label="Tab 3" value="third"></sp-tab>
            </sp-tabs>
        `
    );

describe('Tabs', () => {
    it('loads accessibly', async () => {
        const tabs = await createTabs();

        const tabList = tabs.querySelectorAll('sp-tab');

        expect(tabList).to.exist;
        expect(tabList.length).to.equal(3);

        await expect(tabs).to.be.accessible();
    });

    it('reflects selected tab with selected property', async () => {
        const tabs = await createTabs();

        const firstTab = tabs.querySelector('sp-tab[value=first]');
        const secondTab = tabs.querySelector('sp-tab[value=second]');
        const thirdTab = tabs.querySelector('sp-tab[value=third]');

        if (!(firstTab instanceof Tab))
            throw new Error('firstTab not of type Tab');
        if (!(secondTab instanceof Tab))
            throw new Error('secondTab not of type Tab');
        if (!(thirdTab instanceof Tab))
            throw new Error('thirdTab not of type Tab');

        expect(firstTab.selected).to.be.true;
        expect(secondTab.selected).to.be.false;
        expect(thirdTab.selected).to.be.false;
        expect(tabs.selected).to.equal(firstTab.value);

        secondTab.click();
        await elementUpdated(tabs);

        expect(firstTab.selected).to.be.false;
        expect(secondTab.selected).to.be.true;
        expect(thirdTab.selected).to.be.false;
        expect(tabs.selected).to.equal(secondTab.value);

        thirdTab.click();
        await elementUpdated(tabs);

        expect(firstTab.selected).to.be.false;
        expect(secondTab.selected).to.be.false;
        expect(thirdTab.selected).to.be.true;
        expect(tabs.selected).to.equal(thirdTab.value);
    });

    it('autofocuses', async () => {
        const tabs = await fixture<Tabs>(
            html`
                <sp-tabs selected="second" autofocus>
                    <sp-tab label="Tab 1" value="first"></sp-tab>
                    <sp-tab label="Tab 2" value="second"></sp-tab>
                    <sp-tab label="Tab 3" value="third"></sp-tab>
                </sp-tabs>
            `
        );

        await elementUpdated(tabs);

        const autoElement = tabs.querySelector('[label="Tab 2"]') as Tab;

        expect(document.activeElement).to.equal(autoElement);
    });

    it('forces only one tab to be selected', async () => {
        const tabs = await createTabs();

        const selectedTabs = tabs.querySelectorAll('sp-tab[selected]');

        expect(tabs.selected).to.equal('first');
        expect(selectedTabs.length).to.equal(1);
    });

    it('de-selects all but first selected tab if multiple selected', async () => {
        const tabs = await createTabs();

        const tab1 = tabs.querySelector('sp-tab[value=first]') as Tab;
        const tab2 = tabs.querySelector('sp-tab[value=second]') as Tab;
        if (!(tab1 instanceof Tab)) throw new Error('tab1 not of type Tab');
        if (!(tab2 instanceof Tab)) throw new Error('tab2 not of type Tab');

        expect(tabs.selected).to.equal('first');
        expect(tab1.selected).to.be.true;
        expect(tab2.selected).to.be.false;
    });

    it('ensures setting selection updates selected tab', async () => {
        const tabs = await createTabs();

        const tab1 = tabs.querySelector('sp-tab[value=first]') as Tab;
        const tab2 = tabs.querySelector('sp-tab[value=second]') as Tab;
        const tab3 = tabs.querySelector('sp-tab[value=third]') as Tab;

        if (!(tab1 instanceof Tab)) throw new Error('tab1 not of type Tab');
        if (!(tab2 instanceof Tab)) throw new Error('tab2 not of type Tab');
        if (!(tab3 instanceof Tab)) throw new Error('tab3 not of type Tab');

        expect(tabs.selected).to.equal('first');
        expect(tab1.selected).to.be.true;
        expect(tab2.selected).to.be.false;
        expect(tab3.selected).to.be.false;

        tabs.selected = 'second';
        await elementUpdated(tabs);

        expect(tabs.selected).to.equal('second');
        expect(tab1.selected).to.be.false;
        expect(tab2.selected).to.be.true;
        expect(tab3.selected).to.be.false;

        tabs.selected = 'third';

        expect(tabs.selected).to.equal('third');
        expect(tab1.selected).to.be.false;
        expect(tab2.selected).to.be.false;
        expect(tab3.selected).to.be.true;
    });

    it('ensures setting selected and clicking on tab both work together', async () => {
        const tabs = await createTabs();

        const tab1 = tabs.querySelector('sp-tab[value=first]') as Tab;
        const tab2 = tabs.querySelector('sp-tab[value=second]') as Tab;
        const tab3 = tabs.querySelector('sp-tab[value=third]') as Tab;

        if (!(tab1 instanceof Tab)) throw new Error('tab1 not of type Tab');
        if (!(tab2 instanceof Tab)) throw new Error('tab2 not of type Tab');
        if (!(tab3 instanceof Tab)) throw new Error('tab3 not of type Tab');

        tab2.click();
        await elementUpdated(tabs);

        expect(tabs.selected).to.equal('second');
        expect(tab1.selected).to.be.false;
        expect(tab2.selected).to.be.true;
        expect(tab3.selected).to.be.false;

        tabs.selected = 'first';
        await elementUpdated(tabs);

        expect(tabs.selected).to.equal('first');
        expect(tab1.selected).to.be.true;
        expect(tab2.selected).to.be.false;
        expect(tab3.selected).to.be.false;
    });
    it('displays `vertical`', async () => {
        const el = await fixture<Tabs>(html`
            <sp-tabs selected="first" direction="vertical">
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
                <sp-tab label="Tab 3" value="third"></sp-tab>
            </sp-tabs>
        `);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');

        el.selected = 'first';
        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');
    });
    it('displays with nothing `selected`', async () => {
        const el = await fixture<Tabs>(html`
            <sp-tabs>
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
                <sp-tab label="Tab 3" value="third"></sp-tab>
            </sp-tabs>
        `);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('');

        el.selected = 'first';
        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');
    });
    it('ignores children with no `value`', async () => {
        const el = await fixture<Tabs>(html`
            <sp-tabs selected="first">
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <div id="other">Other thing</div>
            </sp-tabs>
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
        const el = await fixture<Tabs>(html`
            <sp-tabs selected="first" @change=${cancelSelection}>
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
            </sp-tabs>
        `);

        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');

        const secondTab = el.querySelector('[value="second"]') as Tab;
        secondTab.click();
        await elementUpdated(el);
        expect(el.selected).to.be.equal('first');
    });
    it('prevents [tabindex=0] while `focusin`', async () => {
        const el = await fixture<Tabs>(html`
            <sp-tabs>
                <sp-tab label="Tab 1" value="first" selected>
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
            </sp-tabs>
        `);

        const selected = el.querySelector('[value="first"]') as Tab;
        const toBeSelected = el.querySelector('[value="second"]') as Tab;

        await elementUpdated(el);
        await waitUntil(() => el.selected === 'first', 'wait for selection');

        expect(el.selected).to.equal('first');
        expect(selected.tabIndex).to.equal(0);

        el.dispatchEvent(new Event('focusin'));

        await elementUpdated(el);

        expect(el.selected).to.equal('first');
        expect(selected.tabIndex).to.equal(-1);

        el.dispatchEvent(new Event('focusout'));

        await elementUpdated(el);

        expect(el.selected).to.equal('first');
        expect(selected.tabIndex).to.equal(0);

        toBeSelected.click();

        await elementUpdated(el);

        expect(el.selected).to.equal('second');
        expect(toBeSelected.tabIndex).to.equal(0);
    });
    it('accepts keyboard based selection', async () => {
        const el = await fixture<Tabs>(html`
            <sp-tabs selected="Unknown">
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
            </sp-tabs>
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

    it('manages the focus ring between `click` and tab `focus`', async () => {
        const tabs = await createTabs();
        const otherThing = document.createElement('button');
        document.body.append(otherThing);

        await waitForPredicate(() => !!window.applyFocusVisiblePolyfill);
        await elementUpdated(tabs);
        const tab1 = tabs.querySelector('sp-tab:nth-child(1)') as Tab;
        const tab2 = tabs.querySelector('sp-tab:nth-child(2)') as Tab;
        const tab3 = tabs.querySelector('sp-tab:nth-child(3)') as Tab;
        expect(tab1.classList.contains('focus-visible')).to.be.false;
        expect(tab2.classList.contains('focus-visible')).to.be.false;
        expect(tab3.classList.contains('focus-visible')).to.be.false;

        tab1.dispatchEvent(
            new KeyboardEvent('keydown', {
                code: 'Tab',
            })
        );
        tab1.focus();
        await elementUpdated(tab1);
        expect(document.activeElement, 'first tab is focused').to.equal(tab1);
        expect(
            tab1.classList.contains('focus-visible'),
            '`focus()` sets the ring'
        ).to.be.true;

        tab2.dispatchEvent(
            new MouseEvent('mousedown', {
                bubbles: true,
                composed: true,
            })
        );
        tab2.focus();
        tab2.click();
        await elementUpdated(tab2);
        expect(document.activeElement, 'second tab is focused').to.equal(tab2);
        expect(
            tab2.classList.contains('focus-visible'),
            '`click()` should persist'
        ).to.be.true;

        tab2.dispatchEvent(
            new FocusEvent('focusout', {
                bubbles: true,
                composed: true,
            })
        );
        otherThing.focus();
        await elementUpdated(tab2);
        expect(
            document.activeElement,
            'second tab is not focused'
        ).to.not.equal(tab2);
        expect(
            tab2.classList.contains('focus-visible'),
            '`blur()` clears the ring'
        ).to.be.false;

        tab3.dispatchEvent(
            new MouseEvent('mousedown', {
                bubbles: true,
                composed: true,
            })
        );
        tab3.focus();
        tab3.dispatchEvent(
            new FocusEvent('click', {
                bubbles: true,
                composed: true,
            })
        );
        await elementUpdated(tab3);
        expect(document.activeElement, 'third tab is focused').to.equal(tab3);
        expect(
            tab3.classList.contains('focus-visible'),
            '`click()` does not set the ring'
        ).to.be.false;
        otherThing.remove();
    });

    it('accepts keyboard based selection through shadow DOM', async () => {
        class TabTestEl extends LitElement {
            protected render(): TemplateResult {
                return html`
                    <sp-tabs selected="Unknown">
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
                    </sp-tabs>
                `;
            }
        }
        customElements.define('tab-test-el', TabTestEl);
        const el = await fixture<Tabs>(
            html`
                <tab-test-el></tab-test-el>
            `
        );

        await elementUpdated(el);
        const rootNode = el.shadowRoot as ShadowRoot;
        const tabsEl = rootNode.querySelector('sp-tabs') as Tabs;

        await elementUpdated(tabsEl);
        expect(tabsEl.selected).to.be.equal('');

        const firstTab = tabsEl.querySelector('[value="first"]') as Tab;
        const secondTab = tabsEl.querySelector('[value="second"]') as Tab;
        firstTab.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        firstTab.focus();

        await elementUpdated(el);
        let activeElement = rootNode.activeElement as Tab;
        expect(activeElement === firstTab, 'Focus first tab').to.be.true;

        firstTab.dispatchEvent(arrowLeftEvent);
        firstTab.dispatchEvent(arrowUpEvent);

        await elementUpdated(el);
        activeElement = rootNode.activeElement as Tab;
        expect(activeElement === secondTab, 'Focus second tab').to.be.true;

        secondTab.dispatchEvent(enterEvent);

        await elementUpdated(el);
        expect(tabsEl.selected).to.be.equal('second');

        secondTab.dispatchEvent(arrowRightEvent);

        await elementUpdated(el);
        activeElement = rootNode.activeElement as Tab;
        expect(activeElement === firstTab, 'Focus first tab').to.be.true;

        firstTab.dispatchEvent(spaceEvent);

        await elementUpdated(el);
        expect(tabsEl.selected).to.be.equal('first');
    });
    it('accepts keyboard based selection - [direction="vertical"]', async () => {
        const el = await fixture<Tabs>(html`
            <sp-tabs selected="Unknown" direction="vertical">
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
            </sp-tabs>
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
