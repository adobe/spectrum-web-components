"use strict";
import { html } from "@spectrum-web-components/base";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
export const Template = ({
  disabled,
  pending,
  size,
  treatment,
  variant
}) => html`
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
//# sourceMappingURL=template.js.map
