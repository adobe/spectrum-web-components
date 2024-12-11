import './sp-button-group-Dn5b3bdu.js';
import './sp-button-fZ-frECV.js';
import './sp-icon-3JXCeRZ3.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-CTLIe6if.js';
import './define-element-xyi5NDDf.js';
import './ButtonBase-C-5TBDaE.js';
import './like-anchor-Dgva6KsU.js';
import './if-defined-DDJGFaN4.js';
import './focusable-DcHsG7Zg.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-64cbqGrA.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-C4z4_Svo.js';
import './get-label-from-slot-Cg6mfN40.js';
import './IconBase-5vvO1gxM.js';
import './state-DzluJiIq.js';

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
