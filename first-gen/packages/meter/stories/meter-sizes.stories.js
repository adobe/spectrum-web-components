"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/meter/sp-meter.js";
export default {
  title: "Meter/Sizes",
  component: "sp-meter"
};
export const s = () => {
  return html`
        <sp-meter size="s" progress="50">Storage Space</sp-meter>
    `;
};
export const l = () => {
  return html`
        <sp-meter size="l" progress="50">Storage Space</sp-meter>
    `;
};
//# sourceMappingURL=meter-sizes.stories.js.map
