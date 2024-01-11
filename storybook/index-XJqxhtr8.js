import './sp-action-menu-1flzWtu8.js';
import './sp-icon-p9w2_5nd.js';
import './sp-menu-divider-BEpJLzyd.js';
import './sp-menu-item-lnTe8cPw.js';
import './sp-tooltip-3ehalFz0.js';
import { x, A } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';

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
