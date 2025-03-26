import './sp-button-group-CE41M4aF.js';
import './sp-button-7UsB7th2.js';
import './sp-icon-DqRHAie2.js';
import { x } from './lit-html-COgVUehj.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-BPhwmt-S.js';
import './define-element-Bun2ZgR-.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './ButtonBase-CsEYgJMd.js';
import './like-anchor-BaNwPfYf.js';
import './if-defined-DDJGFaN4.js';
import './focusable-y67P8eQI.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-B-N3zGRD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './PendingState-E3cyhDnE.js';
import './get-label-from-slot-Cg6mfN40.js';
import './IconBase-luFyVpTn.js';
import './state-a9qXQZw8.js';

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
