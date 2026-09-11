"use strict";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/help-text/sp-help-text.js";
import { ColorFieldMarkup } from "./template.js";
export default {
  component: "sp-color-field",
  title: "Color Field/Sizes"
};
export const s = () => ColorFieldMarkup({ size: "s" });
export const m = () => ColorFieldMarkup({ size: "m" });
export const l = () => ColorFieldMarkup({ size: "l" });
export const xl = () => ColorFieldMarkup({ size: "xl" });
//# sourceMappingURL=color-field-sizes.stories.js.map
