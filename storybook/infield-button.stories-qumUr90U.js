import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-AIhXu2Gt.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-infield-button-r5jVwXOL.js';
import './ButtonBase-xfo9cPrz.js';
import './like-anchor-iRdC2T2x.js';
import './define-element-z6bXN_P5.js';
import './lit-element-xBOPiTek.js';
import './if-defined-pV6JZKXB.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-MDYPopbw.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-qh-rhz36.js';
import './base-STdhtiz1.js';
import './sizedMixin-IBQibr2z.js';
import './query-JMOstM_r.js';
import './sp-icon-add-U7Pc3LPo.js';
import './Add-7SikBJL4.js';
import './custom-tag-JXLWq-Sj.js';
import './IconBase-1lzddWrP.js';
import './sp-icon-chevron75-HIu8tzhM.js';
import './Chevron75-ykt7YsHW.js';
import './custom-tag-z2Xx81l9.js';
import './spectrum-icon-chevron.css-i0thkS8X.js';

var infieldButton_stories = {
  title: "Infield Button",
  component: "sp-infield-button",
  argTypes,
  args
};
const Default = (args2) => Template(args2);
const disabled = (args2) => Template(args2);
disabled.args = {
  disabled: true
};
const inlineStart = (args2) => Template(args2);
inlineStart.args = {
  inline: "start"
};
const inlineEnd = (args2) => Template(args2);
inlineEnd.args = {
  inline: "end"
};
const stacked = () => x`
    ${Template({
  block: "start",
  content: chevronUp,
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  label: "Decrease"
})}
`;
const quiet = (args2) => Template(args2);
quiet.args = {
  quiet: true
};
const __namedExportsOrder = ['Default', 'disabled', 'inlineStart', 'inlineEnd', 'stacked', 'quiet'];

export { Default, __namedExportsOrder, infieldButton_stories as default, disabled, inlineEnd, inlineStart, quiet, stacked };
