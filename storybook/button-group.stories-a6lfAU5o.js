import './sp-button-group-dKJojvdw.js';
import './sp-button-RtDTDjdF.js';
import './sp-icon-C0O1UE6w.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-HBGPeo6s.js';
import './define-element-CbLZvyrL.js';
import './ButtonBase-ixFv8y71.js';
import './like-anchor-DD7X4GZI.js';
import './if-defined-DDJGFaN4.js';
import './focusable-8mrYv4ai.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-nvMXakjD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-Ddh3k4V8.js';
import './get-label-from-slot-Cg6mfN40.js';
import './IconBase-Z2IxLljH.js';
import './state-DMEtq-nM.js';

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
