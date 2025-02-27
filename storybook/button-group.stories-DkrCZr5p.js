import './sp-button-group-BL2_DFr_.js';
import './sp-button-Jx9C1QJR.js';
import './sp-icon-CThFoDUE.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-Bh0Au8rG.js';
import './define-element-B3-QvDZd.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './ButtonBase-DFBdS0ya.js';
import './like-anchor-YCQdykQc.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CRwO5NCP.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-BVY5OzXy.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './PendingState-BeXRKpss.js';
import './get-label-from-slot-Cg6mfN40.js';
import './IconBase-CmREmoFq.js';
import './state-DrGS5Kkk.js';

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
