import './sp-button-group-Br9Awtqz.js';
import './sp-button-un1oLDDW.js';
import './sp-icon-DiFmj6GE.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-BYlU5N2O.js';
import './define-element-CuLWp0nJ.js';
import './ButtonBase-DrEDDNGU.js';
import './like-anchor-Cds2yNgE.js';
import './if-defined-DDJGFaN4.js';
import './focusable-B74rwTMw.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-bZJQT55z.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './when-DEJm_QN9.js';
import './IconBase-BoJOjJXT.js';

var buttonGroup_stories = {
  title: "Button Group",
  component: "sp-button-group"
};
const buttons = (args) => {
  return x`
        <sp-button-group size=${args.size || "m"}>
            <sp-button>Button 1</sp-button>
            <sp-button>Longer Button 2</sp-button>
            <sp-button>Short 3</sp-button>
        </sp-button-group>
    `;
};
buttons.args = {
  size: "m"
};
const buttonsVertical = (args) => {
  return x`
        <sp-button-group vertical size=${args.size || "m"}>
            <sp-button>Button 1</sp-button>
            <sp-button>Longer Button 2</sp-button>
            <sp-button>Short 3</sp-button>
        </sp-button-group>
    `;
};
buttonsVertical.args = {
  size: "m"
};
const __namedExportsOrder = ['buttons', 'buttonsVertical'];

export { __namedExportsOrder, buttons, buttonsVertical, buttonGroup_stories as default };
