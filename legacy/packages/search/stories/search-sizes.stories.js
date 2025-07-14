"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/search/sp-search.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/help-text/sp-help-text.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
export default {
  component: "sp-search",
  title: "Search/Sizes"
};
const template = ({
  size
} = {}) => {
  return html`
        <sp-field-label for="name" size=${ifDefined(size)}>
            What would you like to find?
        </sp-field-label>
        <sp-search id="name" size=${ifDefined(size)} value="Sized Search">
            <sp-help-text size=${ifDefined(size)} slot="help-text">
                Anything within reason...
            </sp-help-text>
        </sp-search>
    `;
};
export const s = () => template({ size: "s" });
export const noSize = () => template();
export const m = () => template({ size: "m" });
export const l = () => template({ size: "l" });
export const XL = () => template({ size: "xl" });
//# sourceMappingURL=search-sizes.stories.js.map
