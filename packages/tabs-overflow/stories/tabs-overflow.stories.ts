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
import { html, nothing, TemplateResult } from '@spectrum-web-components/base';
import { repeat } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/tabs/sp-tab-panel.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tabs.js';
import '../sp-tabs-overflow.js';

export default {
    title: 'Tabs Overflow',
    component: 'sp-tabs-overflow',
};

const renderTabsOverflowExample = (
    count: number,
    size: string,
    includeTabPanel: boolean
): TemplateResult => {
    return html`
        <style>
            .container {
                width: 100%;
                height: 150px;
                border: 4px solid gray;
                resize: both;
            }
        </style>
        <div class="container">
            <sp-tabs-overflow>
                <sp-tabs size=${size} selected="1">
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
                                              Content for Tab Item ${index + 1}
                                          </sp-tab-panel>
                                      `
                              )}
                          `
                        : nothing}
                </sp-tabs>
            </sp-tabs-overflow>
        </div>
    `;
};

export const SpTabsAndTabPanelSizeS = (): TemplateResult => {
    return renderTabsOverflowExample(20, 's', true);
};
export const SpTabsAndTabPanelSizeM = (): TemplateResult => {
    return renderTabsOverflowExample(20, 'm', true);
};
export const SpTabsAndTabPanelSizeL = (): TemplateResult => {
    return renderTabsOverflowExample(20, 'l', true);
};
export const SpTabsAndTabPanelSizeXL = (): TemplateResult => {
    return renderTabsOverflowExample(20, 'xl', true);
};

export const SpTabsOnlySizeS = (): TemplateResult => {
    return renderTabsOverflowExample(20, 's', false);
};
export const SpTabsOnlySizeM = (): TemplateResult => {
    return renderTabsOverflowExample(20, 'm', false);
};
export const SpTabsOnlySizeL = (): TemplateResult => {
    return renderTabsOverflowExample(20, 'l', false);
};
export const SpTabsOnlySizeXL = (): TemplateResult => {
    return renderTabsOverflowExample(20, 'xl', false);
};
