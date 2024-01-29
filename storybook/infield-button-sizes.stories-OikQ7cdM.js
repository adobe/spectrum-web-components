import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-mZlHO1f9.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-infield-button-Q-JqKcvb.js';
import './ButtonBase-jlLlzNEe.js';
import './like-anchor-Gwp5ooDH.js';
import './define-element-s04w2teA.js';
import './lit-element-xBOPiTek.js';
import './if-defined-pV6JZKXB.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-eZT7feU8.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-u86daeBT.js';
import './base-STdhtiz1.js';
import './sizedMixin-D9_yg9Lr.js';
import './query-JMOstM_r.js';
import './sp-icon-add-iDlSMBom.js';
import './Add-7SikBJL4.js';
import './custom-tag-JXLWq-Sj.js';
import './IconBase-_0RU6XqS.js';
import './sp-icon-chevron75-CWMvoOM7.js';
import './Chevron75-ykt7YsHW.js';
import './custom-tag-z2Xx81l9.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';

var infieldButtonSizes_stories = {
  title: "Infield Button/Sizes",
  component: "sp-infield-button",
  argTypes,
  args
};
const s = (args2) => Template(args2);
s.args = {
  size: "s"
};
const m = (args2) => Template(args2);
m.args = {
  size: "m"
};
const l = (args2) => Template(args2);
l.args = {
  size: "l"
};
const XL = (args2) => Template(args2);
XL.args = {
  size: "xl"
};
const stackedS = () => x`
    ${Template({
  block: "start",
  content: chevronUp,
  size: "s",
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  size: "s",
  label: "Decrease"
})}
`;
const stackedM = () => x`
    ${Template({
  block: "start",
  content: chevronUp,
  size: "m",
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  size: "m",
  label: "Decrease"
})}
`;
const stackedL = () => x`
    ${Template({
  block: "start",
  content: chevronUp,
  size: "l",
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  size: "l",
  label: "Decrease"
})}
`;
const stackedXL = () => x`
    ${Template({
  block: "start",
  content: chevronUp,
  size: "xl",
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  size: "xl",
  label: "Decrease"
})}
`;
const __namedExportsOrder = ['s', 'm', 'l', 'XL', 'stackedS', 'stackedM', 'stackedL', 'stackedXL'];

export { XL, __namedExportsOrder, infieldButtonSizes_stories as default, l, m, s, stackedL, stackedM, stackedS, stackedXL };
