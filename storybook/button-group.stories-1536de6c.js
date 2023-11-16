import './sp-button-group-b2190db1.js';
import './sp-button-b85e30a6.js';
import './sp-icon-8061244b.js';
import { x } from './lit-html-126adc72.js';
import './lit-element-9354aa77.js';
import './sizedMixin-29c62bc2.js';
import './define-element-617dba69.js';
import './base-511c8c11.js';
import './ButtonBase-f782d237.js';
import './like-anchor-86192240.js';
import './if-defined-ae83b405.js';
import './focusable-c7e64029.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8b87639.js';
import './query-d0113d5a.js';
import './IconBase-d9572ad8.js';

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
