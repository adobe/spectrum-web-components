"use strict";
import { html } from "@spectrum-web-components/base";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/slider/sp-slider.js";
export default {
  component: "sp-slider",
  title: "Slider/Sizes"
};
const template = ({
  editable,
  size
} = {}) => {
  return html`
        <div style="width: 500px; margin-inline: 20px;">
            <sp-slider
                ?editable=${editable}
                max="1"
                min="0"
                value=".5"
                step="0.01"
                size=${ifDefined(size)}
            >
                Opacity
            </sp-slider>
        </div>
    `;
};
export const s = () => template({ size: "s" });
export const sEditable = () => template({ size: "s", editable: true });
export const m = () => template();
export const mEditable = () => template({ editable: true });
export const l = () => template({ size: "l" });
export const lEditable = () => template({ size: "l", editable: true });
export const XL = () => template({ size: "xl" });
export const XLEditable = () => template({ size: "xl", editable: true });
//# sourceMappingURL=slider-sizes.stories.js.map
