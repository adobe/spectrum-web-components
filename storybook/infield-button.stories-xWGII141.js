import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-mUq71ZvY.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-infield-button-W1ZQSTRk.js';
import './ButtonBase-8MKa1AnW.js';
import './like-anchor-SzCf8Fo9.js';
import './define-element-b58XwwBM.js';
import './lit-element-xBOPiTek.js';
import './if-defined-pV6JZKXB.js';
import './focusable-XJQHb8mq.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-sowxnoY7.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-NJVGD18T.js';
import './base-STdhtiz1.js';
import './sizedMixin-SQxNgkJG.js';
import './query-JMOstM_r.js';
import './sp-icon-add-XavHwuno.js';
import './Add-7SikBJL4.js';
import './custom-tag-JXLWq-Sj.js';
import './IconBase-O-P913zU.js';
import './sp-icon-chevron75-uC23rgSE.js';
import './Chevron75-ykt7YsHW.js';
import './custom-tag-z2Xx81l9.js';
import './spectrum-icon-chevron.css-nkKXiUlE.js';

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
