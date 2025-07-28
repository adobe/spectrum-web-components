"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/color-handle/sp-color-handle.js";
export default {
  title: "Color/Handle",
  component: "sp-color-handle"
};
export const Default = () => {
  return html`
        <sp-color-handle
            style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
        ></sp-color-handle>
    `;
};
export const disabled = () => {
  return html`
        <sp-color-handle
            disabled
            style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
        ></sp-color-handle>
    `;
};
export const open = () => {
  return html`
        <sp-color-handle
            open
            style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
        ></sp-color-handle>
    `;
};
//# sourceMappingURL=color-handle.stories.js.map
