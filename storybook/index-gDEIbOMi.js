import './sp-action-menu-DfWufdHx.js';
import './sp-icon-DHw3q-p5.js';
import './sp-menu-divider-BwF3zFnf.js';
import './sp-menu-item-sJEZa_5v.js';
import './sp-tooltip-Dfsn9E_X.js';
import { x, T } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';

const ActionMenuMarkup = ({
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
  return x`
        <sp-action-menu
            label=${ariaLabel}
            ?disabled=${disabled}
            ?open=${open}
            ?quiet=${quiet}
            ?forcePopover=${forcePopover}
            static-color=${o(
    staticValue === "none" ? void 0 : staticValue
  )}
            size=${size}
            @change=${(event) => {
    changeHandler(event.target.value);
    onChange(event.target.value);
  }}
            .selects=${selects ? selects : void 0}
            value=${selected ? "Select Inverse" : ""}
            style=${o(
    align === "end" ? "float: inline-end;" : void 0
  )}
        >
            ${customIcon ? customIcon : T}
            ${visibleLabel ? x`
                      <span slot="label">${visibleLabel}</span>
                  ` : T}
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item ?selected=${selected}>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
            ${tooltipDescription ? x`
                      <sp-tooltip
                          slot="tooltip"
                          self-managed
                          placement=${tooltipPlacement}
                      >
                          ${tooltipDescription}
                      </sp-tooltip>
                  ` : x``}
        </sp-action-menu>
    `;
};

export { ActionMenuMarkup as A };
