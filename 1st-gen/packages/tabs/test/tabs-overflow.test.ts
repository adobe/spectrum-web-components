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
import { ActionButton } from '@spectrum-web-components/action-button';
import {
    isFirefox,
    isWebKit,
} from '@spectrum-web-components/shared/src/platform.js';
import {
    calculateScrollTargetForLeftSide,
    calculateScrollTargetForRightSide,
    Tab,
    Tabs,
    TabsOverflow,
} from '@spectrum-web-components/tabs';
import '@spectrum-web-components/tabs/sp-tab-panel.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tabs-overflow.js';
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/theme-light.js';

import {
    elementUpdated,
    expect,
    fixture,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import {
    ElementSize,
    ElementSizes,
    html,
    nothing,
} from '@spectrum-web-components/base';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';

const RIGHT_BUTTON_SELECTOR = '.right-scroll';
const LEFT_BUTTON_SELECTOR = '.left-scroll';

type OverflowProperties = {
    count: number;
    size: ElementSize;
    includeTabPanel: boolean;
    selected?: number;
    labelPrev?: string;
    labelNext?: string;
    dir?: CSSStyleDeclaration['direction'];
};

const renderTabsOverflow = async ({
    count,
    size,
    includeTabPanel,
    selected = 1,
    labelPrev,
    labelNext,
    dir = 'ltr',
}: OverflowProperties): Promise<{
    tabsContainer: HTMLDivElement;
    tabsOverflow: TabsOverflow;
    tabs: Tabs;
    tabsList: HTMLElement;
    leftButton: ActionButton;
    rightButton: ActionButton;
}> => {
    const theme = await fixture<HTMLDivElement>(html`
        <sp-theme dir=${dir} system="spectrum" scale="medium" color="light">
            <div class="container" style="width: 200px; height: 150px;">
                <sp-tabs-overflow
                    label-previous=${ifDefined(labelPrev)}
                    label-next=${ifDefined(labelNext)}
                >
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
        </sp-theme>
    `);
    await elementUpdated(theme);
    const tabsContainer = theme.querySelector('.container') as HTMLDivElement;
    const tabsOverflow = theme.querySelector(
        'sp-tabs-overflow'
    ) as TabsOverflow;
    const tabs = tabsOverflow.querySelector('sp-tabs') as Tabs;
    const tabsList = tabs.shadowRoot!.querySelector('#list') as HTMLElement;
    const leftButton = tabsOverflow.shadowRoot.querySelector(
        '.left-scroll'
    ) as ActionButton;

    const rightButton = tabsOverflow.shadowRoot.querySelector(
        '.right-scroll'
    ) as ActionButton;

    return {
        tabsContainer,
        tabsOverflow,
        tabs,
        tabsList,
        leftButton,
        rightButton,
    };
};

describe('TabsOverflow', () => {
    it('loads default tabs-overflow accessibly', async () => {
        const { tabsOverflow } = await renderTabsOverflow({
            count: 20,
            size: ElementSizes.L,
            includeTabPanel: true,
        });

        await elementUpdated(tabsOverflow);

        await expect(tabsOverflow).to.be.accessible();
    });

    it('show render left and right buttons in shadowDom', async () => {
        const { leftButton, rightButton } = await renderTabsOverflow({
            count: 20,
            size: ElementSizes.L,
            includeTabPanel: true,
        });

        expect(rightButton).to.exist;
        expect(leftButton).to.exist;
    });

    it('reflect proper sp-tab size', async () => {
        const { tabsOverflow } = await renderTabsOverflow({
            count: 20,
            size: ElementSizes.M,
            includeTabPanel: true,
        });

        expect(tabsOverflow.getAttribute('size')).to.equal('m');
    });

    it('should scroll when the button is clicked', async () => {
        const { tabsOverflow, tabs, leftButton, rightButton } =
            await renderTabsOverflow({
                count: 20,
                size: ElementSizes.L,
                includeTabPanel: true,
            });
        await elementUpdated(tabsOverflow);

        let click = oneEvent(leftButton, 'click');
        leftButton.click();
        await click;

        const tabsEl = tabs.querySelector('sp-tab') as Tab;
        const initialLeft = tabsEl.getBoundingClientRect().left;

        click = oneEvent(rightButton, 'click');
        rightButton.click();
        await click;
        await elementUpdated(tabsOverflow);

        click = oneEvent(rightButton, 'click');
        rightButton.click();
        await click;
        await elementUpdated(tabsOverflow);

        click = oneEvent(rightButton, 'click');
        rightButton.click();
        await click;
        await elementUpdated(tabsOverflow);

        const finalLeft = tabsEl.getBoundingClientRect().left;
        expect(finalLeft).to.be.lessThanOrEqual(initialLeft);
    });

    it('should scroll up to the last item and back in LTR', async () => {
        // @TODO: run on iPhone as per https://github.com/adobe/spectrum-web-components/pull/4722
        // await setUserAgent(
        // 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
        // );

        // @TODO: Skipping on Firefox and Webkit due to timeouts on CI. Will review in the migration to Spectrum 2.
        if (isFirefox() || isWebKit()) return;

        const { tabsContainer, tabsOverflow } = await renderTabsOverflow({
            count: 8,
            size: ElementSizes.L,
            includeTabPanel: true,
            dir: 'ltr',
        });
        await elementUpdated(tabsOverflow);
        await setViewport({ width: 360, height: 640 });
        await nextFrame();

        expect(
            tabsOverflow['overflowState'].canScrollLeft,
            'initial: scroll left'
        ).to.be.false;
        expect(
            tabsOverflow['overflowState'].canScrollRight,
            'initial: scroll right'
        ).to.be.true;

        await scrollToEnd(tabsContainer, RIGHT_BUTTON_SELECTOR, 'ltr');

        expect(
            tabsOverflow['overflowState'].canScrollLeft,
            'after: scroll left'
        ).to.be.true;
        expect(
            tabsOverflow['overflowState'].canScrollRight,
            'after: scroll right'
        ).to.be.false;

        await scrollToEnd(tabsContainer, LEFT_BUTTON_SELECTOR, 'ltr');

        expect(tabsOverflow['overflowState'].canScrollLeft, 'end: scroll left')
            .to.be.false;
        expect(
            tabsOverflow['overflowState'].canScrollRight,
            'end: scroll right'
        ).to.be.true;
    });

    it.skip('should scroll up to the last item and back in RTL', async () => {
        // @TODO: run on iPhone as per https://github.com/adobe/spectrum-web-components/pull/4722
        // await setUserAgent(
        // 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
        // );

        // @TODO: Skipping on Firefox due to timeouts on CI. Will review in the migration to Spectrum 2.
        if (isFirefox()) return;

        const { tabsContainer, tabsOverflow } = await renderTabsOverflow({
            count: 8,
            size: ElementSizes.L,
            includeTabPanel: true,
            dir: 'rtl',
        });
        await elementUpdated(tabsOverflow);
        await setViewport({ width: 360, height: 640 });
        await nextFrame();

        expect(tabsOverflow['overflowState'].canScrollLeft).to.be.true;
        expect(tabsOverflow['overflowState'].canScrollRight).to.be.false;

        await scrollToEnd(tabsContainer, LEFT_BUTTON_SELECTOR, 'rtl');

        expect(tabsOverflow['overflowState'].canScrollLeft).to.be.false;
        expect(tabsOverflow['overflowState'].canScrollRight).to.be.true;

        await scrollToEnd(tabsContainer, RIGHT_BUTTON_SELECTOR, 'rtl');

        expect(tabsOverflow['overflowState'].canScrollLeft).to.be.true;
        expect(tabsOverflow['overflowState'].canScrollRight).to.be.false;
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
        const { tabs } = await renderTabsOverflow({
            count: 20,
            size: ElementSizes.L,
            includeTabPanel: false,
            selected: 10,
        });
        await elementUpdated(tabs);

        // Grab the coordinates of the selected tab.
        let selectedTab = tabs.querySelector(`[role="tab"][value="10"]`) as Tab;
        expect(selectedTab).to.exist;
        let selectedTabPosition = selectedTab.getBoundingClientRect();

        // Selected tab is in the viewport, offset left is greater than 0 and less than the width of the tabs.
        expect(selectedTabPosition.left).to.be.greaterThan(0);
        expect(selectedTabPosition.left).to.be.lessThan(tabs.offsetWidth);

        // First tab is not in the viewport anymore, its offset left is less than 0.
        const firstTab = tabs.querySelector(`[role="tab"][value="1"]`) as Tab;
        const firstTabPosition = firstTab.getBoundingClientRect();
        expect(firstTabPosition.left).to.be.lessThan(0);

        // Make the component automatically scroll left by selecting the first tab.
        tabs.selected = '1';
        await elementUpdated(tabs);

        selectedTab = tabs.querySelector(`[role="tab"][value="1"]`) as Tab;
        expect(selectedTab).to.exist;
        selectedTabPosition = selectedTab.getBoundingClientRect();

        // First tab is in the viewport, offset left is greater than 0 and less than the width of the tabs.
        expect(selectedTabPosition.left).to.be.greaterThan(0);
        expect(selectedTabPosition.left).to.be.lessThan(tabs.offsetWidth);

        // Tab nr. 10 is not in the viewport anymore.
        const previousSelection = tabs.querySelector(
            `[role="tab"][value="10"]`
        ) as Tab;
        const previousSelectionPosition =
            previousSelection.getBoundingClientRect();
        expect(previousSelectionPosition.left).to.be.greaterThan(
            tabs.offsetWidth
        );
    });

    it('prev and next buttons have default labels', async () => {
        const { tabsOverflow, leftButton, rightButton } =
            await renderTabsOverflow({
                count: 20,
                size: ElementSizes.M,
                includeTabPanel: true,
            });
        await elementUpdated(tabsOverflow);

        expect(leftButton?.getAttribute('aria-label')).to.equal(
            'Scroll to previous tabs'
        );
        expect(rightButton?.getAttribute('aria-label')).to.equal(
            'Scroll to next tabs'
        );
    });

    it('prev and next buttons labels overwritten via attributes', async () => {
        const { tabsOverflow, leftButton, rightButton } =
            await renderTabsOverflow({
                count: 20,
                size: ElementSizes.M,
                includeTabPanel: true,
                labelPrev: 'custom label prev',
                labelNext: 'custom label next',
            });

        await elementUpdated(tabsOverflow);

        expect(leftButton?.getAttribute('aria-label')).to.equal(
            'custom label prev'
        );
        expect(rightButton?.getAttribute('aria-label')).to.equal(
            'custom label next'
        );
    });
});

describe('calculateScrollTargetForRightSide', () => {
    const container = { offsetWidth: 100, scrollLeft: 0 } as HTMLDivElement;
    const tabs = [
        { offsetLeft: 0, offsetWidth: 100 }, // currently selected tab
        { offsetLeft: 100, offsetWidth: 100 },
        { offsetLeft: 200, offsetWidth: 100 },
    ] as Tab[];

    it('correctly aligns tab on the right side of the viewport', () => {
        // Where do I need to scroll on the x axis to get the tab at index 2 to be visible?
        expect(
            calculateScrollTargetForRightSide(2, 'ltr', tabs, container)
        ).to.equal(100); // You need to scroll 100px more

        // Repeat for RTL
        expect(
            calculateScrollTargetForRightSide(2, 'rtl', tabs, container)
        ).to.equal(0); // You need to scroll at the beginning of the scrollable area
    });
});

describe('calculateScrollTargetForLeftSide', () => {
    const container = { offsetWidth: 100, scrollLeft: 200 } as HTMLDivElement;
    const tabs = [
        { offsetLeft: -200, offsetWidth: 100 },
        { offsetLeft: -100, offsetWidth: 100 },
        { offsetLeft: 0, offsetWidth: 100 }, // currently selected tab
    ] as Tab[];

    it('correctly aligns tab on the left side of the viewport', () => {
        // Where do I need to scroll on the x axis to get the tab at index 1 to be visible?
        expect(
            calculateScrollTargetForLeftSide(1, 'ltr', tabs, container)
        ).to.equal(-100); // you need to scroll back -100px

        // Where do I need to scroll on the x axis to get the first tab to be visible?
        expect(
            calculateScrollTargetForLeftSide(0, 'ltr', tabs, container)
        ).to.equal(0); // you need to scroll to the begining of the scrollable area

        // Repeat for RTL
        expect(
            calculateScrollTargetForLeftSide(1, 'rtl', tabs, container)
        ).to.equal(100);

        expect(
            calculateScrollTargetForLeftSide(0, 'rtl', tabs, container)
        ).to.equal(0);
    });
});

async function repeatScroll(
    options: {
        times: number;
        elementToUpdate: TabsOverflow;
        elementToScroll: HTMLElement;
        distanceToReachInIteration: (iteration: number) => number;
    },
    iteration = 1
): Promise<void> {
    const {
        times,
        elementToUpdate,
        elementToScroll,
        distanceToReachInIteration,
    } = options;
    if (iteration > times) return;

    const distanceToReach = distanceToReachInIteration(iteration);

    await sendKeys({ press: 'Enter' });
    await elementUpdated(elementToUpdate);
    await waitUntil(
        () =>
            Math.ceil(Math.abs(elementToScroll.scrollLeft)) -
                Math.abs(distanceToReach) ===
            0,
        `scroll to ${distanceToReach}`
    );
    return await repeatScroll(options, iteration + 1);
}

async function scrollToEnd(
    tabsContainer: HTMLDivElement,
    buttonSelector: string,
    direction: CSSStyleDeclaration['direction'] = 'ltr'
): Promise<void> {
    const tabs = tabsContainer.querySelector('sp-tabs') as Tabs;
    const tabsList = tabs.shadowRoot!.querySelector('#list') as HTMLElement;
    const tabsOverflow = tabsContainer.querySelector(
        'sp-tabs-overflow'
    ) as TabsOverflow;
    const button = tabsOverflow.shadowRoot.querySelector(
        buttonSelector
    ) as ActionButton;

    const { scrollWidth, clientWidth } = tabsList;
    const distPerScroll = clientWidth * tabsOverflow['scrollFactor'];
    const totalScrollDist = scrollWidth - clientWidth;
    const scrollsToEnd = Math.ceil(totalScrollDist / distPerScroll);
    let distanceToReachInIteration: (iteration: number) => number;

    if (direction === 'ltr') {
        distanceToReachInIteration =
            buttonSelector === LEFT_BUTTON_SELECTOR
                ? (iteration: number) =>
                      Math.max(totalScrollDist - iteration * distPerScroll, 0)
                : (iteration: number) =>
                      Math.min(iteration * distPerScroll, totalScrollDist);
    } else {
        distanceToReachInIteration =
            buttonSelector === LEFT_BUTTON_SELECTOR
                ? (iteration: number) =>
                      Math.max(-1 * iteration * distPerScroll, -totalScrollDist)
                : (iteration: number) =>
                      -Math.max(totalScrollDist - iteration * distPerScroll, 0);
    }

    button.focus();
    return await repeatScroll({
        times: scrollsToEnd,
        elementToUpdate: tabsOverflow,
        elementToScroll: tabsList,
        distanceToReachInIteration,
    });
}
