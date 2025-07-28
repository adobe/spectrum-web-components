"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/thumbnail/sp-thumbnail.js";
import { thumbnail as image } from "./images.js";
export default {
  title: "Thumbnail/Sizes",
  component: "sp-thumbnail"
};
const thumbnail = ({
  size
}) => {
  return html`
        <sp-thumbnail size=${size}>
            <img src=${image} alt="Woman crouching" />
        </sp-thumbnail>
    `;
};
export const size50 = () => thumbnail({ size: "50" });
export const size75 = () => thumbnail({ size: "75" });
export const size100 = () => thumbnail({ size: "100" });
export const size200 = () => thumbnail({ size: "200" });
export const size300 = () => thumbnail({ size: "300" });
export const size400 = () => thumbnail({ size: "400" });
export const size500 = () => thumbnail({ size: "500" });
export const size600 = () => thumbnail({ size: "600" });
export const size700 = () => thumbnail({ size: "700" });
export const size800 = () => thumbnail({ size: "800" });
export const size900 = () => thumbnail({ size: "900" });
export const size1000 = () => thumbnail({ size: "1000" });
//# sourceMappingURL=thumbnail-sizes.stories.js.map
