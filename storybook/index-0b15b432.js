import './sp-action-menu-760d2f36.js';
import './sp-icon-38633c83.js';
import './sp-menu-divider-e02a5ff2.js';
import './sp-menu-item-78994077.js';
import './sp-tooltip-fb4d59cd.js';
import { x, A } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';

const ActionMenuMarkup = ({
  ariaLabel = "More Actions",
  changeHandler = () => void 0,
  disabled = false,
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
            static=${l(
    staticValue === "none" ? void 0 : staticValue
  )}
            size=${size}
            @change="${changeHandler}"
            .selects=${selects ? selects : void 0}
            value=${selected ? "Select Inverse" : ""}
        >
            ${customIcon ? customIcon : A}
            ${visibleLabel ? x`
                      <span slot="label">${visibleLabel}</span>
                  ` : A}
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
