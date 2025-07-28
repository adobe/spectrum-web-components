"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/color-field/sp-color-field.js";
export const ColorFieldMarkup = ({
  label = "Color Field",
  quiet = false,
  size = "m",
  readonly = false,
  disabled = false,
  viewColor = false,
  value = ""
} = {}) => {
  return html`
        <sp-color-field
            label=${label}
            size=${size}
            value=${value}
            ?view-color=${viewColor}
            ?quiet=${quiet}
            ?readonly=${readonly}
            ?disabled=${disabled}
        ></sp-color-field>
    `;
};
export const Template = ColorFieldMarkup;
//# sourceMappingURL=template.js.map
