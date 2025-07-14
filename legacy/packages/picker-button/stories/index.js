"use strict";
import { html, nothing } from "@spectrum-web-components/base";
import {
  ifDefined,
  unsafeHTML
} from "@spectrum-web-components/base/src/directives.js";
export const Template = ({
  active,
  icon,
  invalid,
  label,
  open,
  position,
  quiet,
  rounded,
  size
}) => {
  return html`
        <sp-picker-button
            ?active=${active}
            ?invalid=${invalid}
            ?open=${open}
            position=${ifDefined(position)}
            ?quiet=${quiet}
            ?rounded=${rounded}
            size=${size}
        >
            ${icon ? unsafeHTML(icon) : nothing}
            ${label ? html`
                      <span slot="label">
                          ${typeof label === "string" ? label : "All"}
                      </span>
                  ` : nothing}
        </sp-picker-button>
    `;
};
export const argTypes = {
  argTypes: {
    open: {
      control: {
        type: "boolean"
      }
    },
    position: {
      control: {
        type: "inline-radio",
        options: ["right", "left"]
      }
    },
    quiet: {
      control: {
        type: "boolean"
      }
    },
    size: {
      control: {
        type: "inline-radio",
        options: ["s", "m", "l", "xl"]
      }
    }
  }
};
//# sourceMappingURL=index.js.map
