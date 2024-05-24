import './sp-button-group-BKcWm19P.js';
import './sp-button-DlJDQ0HP.js';
import './sp-icon-D0SR2cox.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-Gf9Y2JDv.js';
import './define-element-BgSxDJnI.js';
import './ButtonBase-CGZcb8D1.js';
import './like-anchor-jgQaL5Z3.js';
import './if-defined-DDJGFaN4.js';
import './focusable-oYNn1hNO.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DhKFT2ma.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './when-DEJm_QN9.js';
import './IconBase-BDjZkcAb.js';

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
