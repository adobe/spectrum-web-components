"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/number-field/sp-number-field.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
export default {
  component: "sp-number-field",
  title: "Number Field/Sizes"
};
const template = ({
  size
} = {}) => {
  return html`
        <sp-field-label for="name" size=${ifDefined(size)}>
            Pick a number
        </sp-field-label>
        <sp-number-field
            id="name"
            size=${ifDefined(size)}
            value="100"
        ></sp-number-field>
    `;
};
export const s = () => template({ size: "s" });
export const noSize = () => template();
export const m = () => template({ size: "m" });
export const l = () => template({ size: "l" });
export const XL = () => template({ size: "xl" });
//# sourceMappingURL=number-field-sizes.stories.js.map
