"use strict";
import "@spectrum-web-components/tabs/sp-tab.js";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "@spectrum-web-components/tabs/sp-tab-panel.js";
import "@spectrum-web-components/tabs/sp-tabs-overflow.js";
import { html, nothing } from "@spectrum-web-components/base";
import { repeat } from "@spectrum-web-components/base/src/directives.js";
export const renderTabsOverflowExample = ({
  selected = 1,
  count = 20,
  size = "m",
  includeTabPanel,
  compact
}) => {
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
                    ${includeTabPanel ? html`
                              ${repeat(
    new Array(count),
    (item) => item,
    (_item, index) => html`
                                          <sp-tab-panel value=${index + 1}>
                                              Content for Tab Item ${index + 1}
                                          </sp-tab-panel>
                                      `
  )}
                          ` : nothing}
                </sp-tabs>
            </sp-tabs-overflow>
        </div>
    `;
};
//# sourceMappingURL=index.js.map
