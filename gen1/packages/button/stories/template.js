"use strict";
import { html } from "@spectrum-web-components/base";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/button/sp-clear-button.js";
import "@spectrum-web-components/button/sp-close-button.js";
export const Template = ({
  disabled,
  pending,
  size,
  treatment,
  variant,
  label = "Clear",
  quiet,
  staticColor,
  componentName
}) => {
  if (componentName === "clear-button") {
    return html`
      <sp-clear-button
        label=${label}
        ?disabled=${!!disabled}
        ?quiet=${!!quiet}
        size=${ifDefined(size)}
        static-color=${ifDefined(staticColor)}
      ></sp-clear-button>
    `;
  }
  if (componentName === "close-button") {
    return html`
      <sp-close-button
        label=${label}
        ?disabled=${!!disabled}
        ?quiet=${!!quiet}
        size=${ifDefined(size)}
        static-color=${ifDefined(staticColor)}
      ></sp-close-button>
    `;
  }
  return html`
    <sp-button
      ?disabled=${disabled}
      ?pending=${pending}
      size=${ifDefined(size)}
      treatment=${ifDefined(treatment)}
      variant=${ifDefined(variant)}
    >
      Test Button
    </sp-button>
  `;
};
//# sourceMappingURL=template.js.map
