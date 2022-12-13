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
import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { html, nothing } from '@spectrum-web-components/base';
import { repeat } from 'lit/directives/repeat.js';

import { TabsOverflow } from '../src/TabsOverflow';
import { ActionButton } from '@spectrum-web-components/action-button';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/theme-light.js';
import '../sp-tabs-overflow.js';

const renderTabsOverflow = async (
    count: number,
    size: string,
    includeTabPanel: boolean
): Promise<HTMLDivElement> => {
    const tabsContainer = await fixture<HTMLDivElement>(
        html`
            <div class="container" style="width: 200px; height: 150px;">
                <sp-tabs-overflow>
                    <sp-tabs size=${size} selected="1" enableTabsScroll=${true}>
                        ${repeat(
                            new Array(count),
                            (item) => item,
                            (_item, index) =>
                                html`
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
                                      (_item, index) =>
                                          html`
                                              <sp-tab-panel value=${index + 1}>
                                                  Content for Tab Item
                                                  ${index + 1}
                                              </sp-tab-panel>
                                          `
                                  )}
                              `
                            : nothing}
                    </sp-tabs>
                </sp-tabs-overflow>
            </div>
        `
    );
    await elementUpdated(tabsContainer);
    return tabsContainer;
};

describe('TabsOverflow', () => {
    it('loads default tabs-overflow accessibly', async () => {
        const el = await fixture<TabsOverflow>(
            html`
                <sp-tabs-overflow>
                    <sp-tabs size="m" selected="1" enableTabsScroll=${true}>
                        <sp-tab label="Tab Item 1" value="1"></sp-tab>
                        <sp-tab label="Tab Item 2" value="2"></sp-tab>
                        <sp-tab-panel value="1">Tab Content 1</sp-tab-panel>
                        <sp-tab-panel value="2">Tab Content 2</sp-tab-panel>
                    </sp-tabs>
                </sp-tabs-overflow>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    it('show render left and right buttons in shadowDom', async () => {
        const el = await renderTabsOverflow(20, 'l', true);

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
        const el = await renderTabsOverflow(20, 'm', true);

        const spTabsOverflows: TabsOverflow = el.querySelector(
            'sp-tabs-overflow'
        ) as TabsOverflow;
        const overflowContainerEl = spTabsOverflows.shadowRoot.querySelector(
            '.tabs-overflow-container'
        ) as HTMLDivElement;
        expect(overflowContainerEl.classList[1]).to.equal('m');
    });
});
