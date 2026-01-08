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
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab-panel.js';
import '@spectrum-web-components/tabs/sp-tabs-overflow.js';

import { html, nothing, TemplateResult } from '@spectrum-web-components/base';
import { repeat } from '@spectrum-web-components/base/src/directives.js';

export interface OverflowProperties {
    selected?: number;
    count?: number;
    size?: string;
    includeTabPanel?: boolean;
    compact?: boolean;
}

export const renderTabsOverflowExample = ({
    selected = 1,
    count = 20,
    size = 'm',
    includeTabPanel,
    compact,
}: OverflowProperties): TemplateResult => {
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
            <sp-tabs-overflow size=${size} ?compact=${compact}>
                <sp-tabs size=${size} selected=${selected} ?compact=${compact}>
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
    `;
};
