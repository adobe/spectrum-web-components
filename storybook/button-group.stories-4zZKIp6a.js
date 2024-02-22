import './sp-button-group-2-SmZQuE.js';
import './sp-button-n-ZLKQ9l.js';
import './sp-icon-Rplr-oxC.js';
import { x } from './lit-html-GmIhAbMP.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-SQxNgkJG.js';
import './define-element-b58XwwBM.js';
import './base-STdhtiz1.js';
import './ButtonBase-8MKa1AnW.js';
import './like-anchor-SzCf8Fo9.js';
import './if-defined-pV6JZKXB.js';
import './focusable-XJQHb8mq.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-sowxnoY7.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-NJVGD18T.js';
import './query-JMOstM_r.js';
import './when-kvvOyHr2.js';
import './IconBase-O-P913zU.js';

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
