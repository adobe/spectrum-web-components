"use strict";
import {
  html
} from "@spectrum-web-components/base";
import "@spectrum-web-components/tags/sp-tag.js";
import "@spectrum-web-components/tags/sp-tags.js";
import "@spectrum-web-components/avatar/sp-avatar.js";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js";
export default {
  title: "Tags/Sizes",
  component: "sp-tags"
};
const template = ({ size }) => html`
    <sp-tags>
        <sp-tag deletable size=${size}>
            Tag 1
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-tag>
        <sp-tag invalid deletable size=${size}>
            Tag 2
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-tag>
        <sp-tag disabled deletable size=${size}>
            Tag 3
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-tag>
    </sp-tags>
`;
export const s = () => template({ size: "s" });
export const m = () => template({ size: "m" });
export const l = () => template({ size: "l" });
//# sourceMappingURL=tags-sizes.stories.js.map
