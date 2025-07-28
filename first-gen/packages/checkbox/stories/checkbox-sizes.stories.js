"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/checkbox/sp-checkbox.js";
export default {
  component: "sp-checkbox",
  title: "Checkbox/Sizes",
  argTypes: {
    onClick: { action: "click" },
    onChange: { action: "change" }
  }
};
const checkbox = ({
  size,
  checked,
  indeterminate,
  onClick,
  onChange
}) => {
  return html`
        <sp-checkbox
            size=${size}
            ?checked=${checked}
            ?indeterminate=${indeterminate}
            @click="${onClick}"
            @change="${onChange}"
        >
            Checkbox
        </sp-checkbox>
    `;
};
export const s = (args) => checkbox({ ...args, size: "s" });
export const sChecked = (args) => checkbox({ ...args, size: "s", checked: true });
export const sIndeterminate = (args) => checkbox({ ...args, size: "s", indeterminate: true });
export const m = (args) => checkbox({ ...args, size: "m" });
export const mChecked = (args) => checkbox({ ...args, size: "m", checked: true });
export const mIndeterminate = (args) => checkbox({ ...args, size: "m", indeterminate: true });
export const l = (args) => checkbox({ ...args, size: "l" });
export const lChecked = (args) => checkbox({ ...args, size: "l", checked: true });
export const lIndeterminate = (args) => checkbox({ ...args, size: "l", indeterminate: true });
export const XL = (args) => checkbox({ ...args, size: "xl" });
export const XLChecked = (args) => checkbox({ ...args, size: "xl", checked: true });
export const XLIndeterminate = (args) => checkbox({ ...args, size: "xl", indeterminate: true });
//# sourceMappingURL=checkbox-sizes.stories.js.map
