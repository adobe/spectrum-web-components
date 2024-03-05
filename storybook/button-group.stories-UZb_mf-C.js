import './sp-button-group-0qUjMOW-.js';
import './sp-button-St5-WM_S.js';
import './sp-icon-nbUG1ZO_.js';
import { x } from './lit-html-GmIhAbMP.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-IBQibr2z.js';
import './define-element-z6bXN_P5.js';
import './base-STdhtiz1.js';
import './ButtonBase-xfo9cPrz.js';
import './like-anchor-iRdC2T2x.js';
import './if-defined-pV6JZKXB.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-MDYPopbw.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-qh-rhz36.js';
import './query-JMOstM_r.js';
import './when-kvvOyHr2.js';
import './IconBase-1lzddWrP.js';

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
