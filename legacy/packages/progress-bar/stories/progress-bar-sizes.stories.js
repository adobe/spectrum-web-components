"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/progress-bar/sp-progress-bar.js";
export default {
  title: "Progress Bar/Sizes",
  component: "sp-progress-bar"
};
export const s = () => {
  return html`
        <sp-progress-bar
            label="Loading"
            progress="50"
            size="s"
        ></sp-progress-bar>
    `;
};
export const m = () => {
  return html`
        <sp-progress-bar
            label="Loading"
            progress="50"
            size="m"
        ></sp-progress-bar>
    `;
};
export const l = () => {
  return html`
        <sp-progress-bar
            label="Loading"
            progress="50"
            size="l"
        ></sp-progress-bar>
    `;
};
export const XL = () => {
  return html`
        <sp-progress-bar
            label="Loading"
            progress="50"
            size="xl"
        ></sp-progress-bar>
    `;
};
//# sourceMappingURL=progress-bar-sizes.stories.js.map
