"use strict";
import { html } from "@spectrum-web-components/base";
import { renderTabsOverflowExample } from "./index.js";
export default {
  title: "Tabs Overflow",
  component: "sp-tabs-overflow"
};
export const compact = (args) => {
  return renderTabsOverflowExample(args);
};
compact.args = {
  compact: true
};
export const autoscroll = (args) => {
  return renderTabsOverflowExample(args);
};
autoscroll.args = {
  selected: 15
};
export const autoscrollOnlyHorizontally = (args) => {
  return html`
        <style>
            .container {
                height: 500px;
                overflow-y: scroll;
            }
        </style>
        <div class="container">
            <div style="height: 500px">There are some tabs down here!</div>
            ${renderTabsOverflowExample(args)}
        </div>
    `;
};
autoscrollOnlyHorizontally.args = {
  selected: 15
};
//# sourceMappingURL=tabs-overflow.stories.js.map
