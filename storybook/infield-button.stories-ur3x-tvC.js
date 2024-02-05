import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-RdmFheAq.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-infield-button-lUG5TdIR.js';
import './ButtonBase-H8ie1_xx.js';
import './like-anchor-J4T73PxR.js';
import './define-element-2O4ZhTAw.js';
import './lit-element-xBOPiTek.js';
import './if-defined-pV6JZKXB.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-ybW1xuBS.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-aJM_vOZ4.js';
import './base-STdhtiz1.js';
import './sizedMixin-mnNfh2gr.js';
import './query-JMOstM_r.js';
import './sp-icon-add-APz_Gd_3.js';
import './Add-7SikBJL4.js';
import './custom-tag-JXLWq-Sj.js';
import './IconBase-TDmbHQaH.js';
import './sp-icon-chevron75-ROtKiCht.js';
import './Chevron75-ykt7YsHW.js';
import './custom-tag-z2Xx81l9.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';

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
