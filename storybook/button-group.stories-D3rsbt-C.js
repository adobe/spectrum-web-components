import './sp-button-group-DnpELqgp.js';
import './sp-button-BhCs1BKF.js';
import './sp-icon-ClvjyMI3.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-By06sgdw.js';
import './define-element-C6mUAqDT.js';
import './ButtonBase-CmrIm7Eg.js';
import './like-anchor-DDdhsGLB.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BcRsQ114.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Bwkw8iOx.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './when-DEJm_QN9.js';
import './IconBase-BYYYVFxE.js';

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
