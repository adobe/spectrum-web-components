"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/asset/sp-asset.js";
import { portrait } from "../../card/stories/images";
export default {
  title: "Asset",
  component: "sp-asset"
};
export const Default = () => {
  return html`
        <sp-asset style="height: 128px">
            <img src=${portrait} alt="Demo Graphic" />
        </sp-asset>
    `;
};
export const File = () => {
  return html`
        <sp-asset variant="file"></sp-asset>
    `;
};
export const Folder = () => {
  return html`
        <sp-asset variant="folder"></sp-asset>
    `;
};
//# sourceMappingURL=asset.stories.js.map
