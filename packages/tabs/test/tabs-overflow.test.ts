/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab-panel.js';
import '@spectrum-web-components/tabs/sp-tabs-overflow.js';
import { Tab, Tabs, TabsOverflow } from '@spectrum-web-components/tabs';
import { ActionButton } from '@spectrum-web-components/action-button';

import { elementUpdated, expect, fixture } from '@open-wc/testing';
import {
    ElementSize,
    ElementSizes,
    html,
    nothing,
} from '@spectrum-web-components/base';
import { repeat } from 'lit/directives/repeat.js';

type OverflowProperties = {
    count: number;
    size: ElementSize;
    includeTabPanel: boolean;
    selected?: number;
    labelPrev?: string;
    labelNext?: string;
};

const renderTabsOverflow = async ({
    count,
    size,
    includeTabPanel,
    selected = 1,
}: OverflowProperties): Promise<HTMLDivElement> => {
    const tabsContainer = await fixture<HTMLDivElement>(html`
        <div class="container" style="width: 200px; height: 150px;">
            <sp-tabs-overflow>
                <sp-tabs size=${size} selected=${selected}>
                    ${repeat(
                        new Array(count),
                        (item) => item,
                        (_item, index) => html`
                            <sp-tab
                                label=${`Tab Item ${index + 1}`}
                                value=${index + 1}
                            ></sp-tab>
                        `
                    )}
                    ${includeTabPanel
                        ? html`
                              ${repeat(
                                  new Array(count),
                                  (item) => item,
                                  (_item, index) => html`
                                      <sp-tab-panel value=${index + 1}>
                                          Content for Tab Item ${index + 1}
                                      </sp-tab-panel>
                                  `
                              )}
                          `
                        : nothing}
                </sp-tabs>
            </sp-tabs-overflow>
        </div>
    `);
    await elementUpdated(tabsContainer);
    return tabsContainer;
};

describe('TabsOverflow', () => {
    it('loads default tabs-overflow accessibly', async () => {
        const el = await fixture<TabsOverflow>(html`
            <sp-tabs-overflow>
                <sp-tabs size="m" selected="1">
                    <sp-tab label="Tab Item 1" value="1"></sp-tab>
                    <sp-tab label="Tab Item 2" value="2"></sp-tab>
                    <sp-tab-panel value="1">Tab Content 1</sp-tab-panel>
                    <sp-tab-panel value="2">Tab Content 2</sp-tab-panel>
                </sp-tabs>
            </sp-tabs-overflow>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('show render left and right buttons in shadowDom', async () => {
        const el = await renderTabsOverflow({
            count: 20,
            size: ElementSizes.L,
            includeTabPanel: true,
        });

        const spTabsOverflows: TabsOverflow = el.querySelector(
            'sp-tabs-overflow'
        ) as TabsOverflow;
        const rightButton = spTabsOverflows.shadowRoot.querySelector(
            '.right-scroll'
        ) as ActionButton;
        expect(rightButton).to.exist;
        const leftButton = spTabsOverflows.shadowRoot.querySelector(
            '.left-scroll'
        ) as ActionButton;
        expect(leftButton).to.exist;
    });

    it('reflect proper sp-tab size', async () => {
        const el = await renderTabsOverflow({
            count: 20,
            size: ElementSizes.M,
            includeTabPanel: true,
        });

        const spTabsOverflows: TabsOverflow = el.querySelector(
            'sp-tabs-overflow'
        ) as TabsOverflow;

        expect(spTabsOverflows.getAttribute('size')).to.equal('m');
    });

    it('should scroll when the button is clicked', async () => {
        const el = await renderTabsOverflow({
            count: 20,
            size: ElementSizes.L,
            includeTabPanel: true,
        });
        await elementUpdated(el);

        const spTabsOverflows: TabsOverflow = el.querySelector(
            'sp-tabs-overflow'
        ) as TabsOverflow;
        const leftButton = spTabsOverflows.shadowRoot.querySelector(
            '.left-scroll'
        ) as ActionButton;

        const rightButton = spTabsOverflows.shadowRoot.querySelector(
            '.right-scroll'
        ) as ActionButton;

        leftButton.dispatchEvent(new Event('click', {}));

        const tabsEl = spTabsOverflows.querySelector('sp-tab') as Tab;
        const initialLeft = tabsEl.getBoundingClientRect().left;
        rightButton.dispatchEvent(new Event('click', {}));
        await elementUpdated(el);
        rightButton.dispatchEvent(new Event('click', {}));
        await elementUpdated(el);
        rightButton.dispatchEvent(new Event('click', {}));
        await elementUpdated(el);
        const finalLeft = tabsEl.getBoundingClientRect().left;
        expect(finalLeft).to.be.lessThanOrEqual(initialLeft);
    });

    it('should fail properly if slot is not sp-tabs', async () => {
        const el = await fixture<TabsOverflow>(html`
            <sp-tabs-overflow>
                <div>Some div</div>
            </sp-tabs-overflow>
        `);

        await elementUpdated(el);
        const slot = el.shadowRoot.querySelector('slot');
        const slotContent = slot?.assignedElements() || '';
        expect(slotContent[0].toString()).to.not.contains('Tabs');
    });

    it('should automatically bring the selected tab into view', async () => {
        const el = await renderTabsOverflow({
            count: 20,
            size: ElementSizes.L,
            includeTabPanel: false,
            selected: 10,
        });
        await elementUpdated(el);

        // Grab the list of tabs.
        const tabsEl = el.querySelector('sp-tabs') as Tabs;

        // Grab the coordonates of the selected tab.
        const selectedTab = tabsEl.querySelector(
            `[role="tab"][value="10"]`
        ) as Tab;
        expect(selectedTab).to.exist;
        const selectedTabPosition = selectedTab.getBoundingClientRect();

        // Selected tab is in the viewport, offset left is greater than 0 and less than the width of the tabs.
        expect(selectedTabPosition.left).to.be.greaterThan(0);
        expect(selectedTabPosition.left).to.be.lessThan(tabsEl.clientWidth);

        // First tab is not in the viewport anymore, its offset left is less than 0.
        const firstTab = tabsEl.querySelector(`[role="tab"][value="1"]`) as Tab;
        const firstTabPosition = firstTab.getBoundingClientRect();
        expect(firstTabPosition.left).to.be.lessThan(0);
    });

    it('prev and next buttons have default labels', async () => {
        const el = await renderTabsOverflow({
            count: 20,
            size: ElementSizes.M,
            includeTabPanel: true,
        });
        await elementUpdated(el);

        const spTabsOverflows: TabsOverflow = el.querySelector(
            'sp-tabs-overflow'
        ) as TabsOverflow;
        const leftButton = spTabsOverflows.shadowRoot.querySelector(
            '.left-scroll'
        ) as ActionButton;
        const rightButton = spTabsOverflows.shadowRoot.querySelector(
            '.right-scroll'
        ) as ActionButton;

        expect(leftButton?.getAttribute('aria-label')).to.equal(
            'Scroll to previous tabs'
        );
        expect(rightButton?.getAttribute('aria-label')).to.equal(
            'Scroll to next tabs'
        );
    });

    it('prev and next buttons labels overwritten via attributes', async () => {
        const tabsContainer = await fixture<HTMLDivElement>(html`
            <div class="container" style="width: 200px; height: 150px;">
                <sp-tabs-overflow
                    label-previous="custom label prev"
                    label-next="custom label next"
                >
                    <sp-tabs size=${ElementSizes.M} selected=${1}>
                        ${repeat(
                            new Array(20),
                            (item) => item,
                            (_item, index) => html`
                                <sp-tab
                                    label=${`Tab Item ${index + 1}`}
                                    value=${index + 1}
                                ></sp-tab>
                            `
                        )}
                        ${repeat(
                            new Array(20),
                            (item) => item,
                            (_item, index) => html`
                                <sp-tab-panel value=${index + 1}>
                                    Content for Tab Item ${index + 1}
                                </sp-tab-panel>
                            `
                        )}
                    </sp-tabs>
                </sp-tabs-overflow>
            </div>
        `);
        await elementUpdated(tabsContainer);
        const el = tabsContainer;

        const spTabsOverflows: TabsOverflow = el.querySelector(
            'sp-tabs-overflow'
        ) as TabsOverflow;
        const leftButton = spTabsOverflows.shadowRoot.querySelector(
            '.left-scroll'
        ) as ActionButton;
        const rightButton = spTabsOverflows.shadowRoot.querySelector(
            '.right-scroll'
        ) as ActionButton;

        expect(leftButton?.getAttribute('aria-label')).to.equal(
            'custom label prev'
        );
        expect(rightButton?.getAttribute('aria-label')).to.equal(
            'custom label next'
        );
    });
});
