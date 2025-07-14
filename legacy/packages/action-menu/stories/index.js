"use strict";
import { html, nothing } from "@spectrum-web-components/base";
import {
  ifDefined,
  unsafeHTML
} from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/action-menu/sp-action-menu.js";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/menu/sp-menu-divider.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
export const ActionMenuMarkup = ({
  align = "start",
  ariaLabel = "More Actions",
  onChange = () => void 0,
  changeHandler = () => void 0,
  disabled = false,
  forcePopover = false,
  open = false,
  quiet = false,
  staticValue = "",
  visibleLabel = "",
  customIcon = "",
  size = "m",
  selects = "",
  selected = false,
  tooltipDescription = "",
  tooltipPlacement = "bottom"
} = {}) => {
  return html`
        <sp-action-menu
            label=${ariaLabel}
            ?disabled=${disabled}
            ?open=${open}
            ?quiet=${quiet}
            ?force-popover=${forcePopover}
            static-color=${ifDefined(
    staticValue === "none" ? void 0 : staticValue
  )}
            size=${size}
            @change=${(event) => {
    changeHandler(event.target.value);
    onChange(event.target.value);
  }}
            .selects=${selects ? selects : void 0}
            value=${selected ? "Select Inverse" : ""}
            style=${ifDefined(
    align === "end" ? "float: inline-end;" : void 0
  )}
        >
            ${customIcon ? unsafeHTML(customIcon) : nothing}
            ${visibleLabel ? html`
                      <span slot="label">${visibleLabel}</span>
                  ` : nothing}
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item ?selected=${selected}>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
            ${tooltipDescription ? html`
                      <sp-tooltip
                          slot="tooltip"
                          self-managed
                          placement=${tooltipPlacement}
                      >
                          ${tooltipDescription}
                      </sp-tooltip>
                  ` : html``}
        </sp-action-menu>
    `;
};
//# sourceMappingURL=index.js.map
