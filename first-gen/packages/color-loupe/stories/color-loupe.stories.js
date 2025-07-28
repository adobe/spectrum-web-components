"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/color-loupe/sp-color-loupe.js";
export default {
  title: "Color/Loupe",
  component: "sp-color-loupe"
};
export const open = () => {
  return html`
        <sp-color-loupe open style="inset-block-start:25%;"></sp-color-loupe>
    `;
};
//# sourceMappingURL=color-loupe.stories.js.map
