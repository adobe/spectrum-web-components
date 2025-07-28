"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/textfield/sp-textfield.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/help-text/sp-help-text.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
export default {
  component: "sp-textfield",
  title: "Textarea/Sizes"
};
const template = ({
  size
} = {}) => {
  return html`
        <sp-field-label for="name" size=${ifDefined(size)}>
            Enter your life story
        </sp-field-label>
        <sp-textfield
            id="name"
            multiline
            size=${ifDefined(size)}
            value="Sized Textarea"
        >
            <sp-help-text size=${ifDefined(size)} slot="help-text">
                Spare no expense.
            </sp-help-text>
        </sp-textfield>
    `;
};
export const s = () => template({ size: "s" });
export const noSize = () => template();
export const m = () => template({ size: "m" });
export const l = () => template({ size: "l" });
export const XL = () => template({ size: "xl" });
//# sourceMappingURL=textarea-sizes.stories.js.map
