import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-2KOGi2Ti.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-infield-button-ZrY9Y-pj.js';
import './ButtonBase-HA5NNgN2.js';
import './like-anchor-a_wuYSt2.js';
import './define-element-lju0qz2P.js';
import './lit-element-xBOPiTek.js';
import './if-defined-pV6JZKXB.js';
import './focusable-wnRI1QCz.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-HaH5WFZ0.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './base-STdhtiz1.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './query-JMOstM_r.js';
import './sizedMixin-VwrJiqSW.js';
import './sp-icon-add-lt9E90qj.js';
import './Add-7SikBJL4.js';
import './custom-tag-JXLWq-Sj.js';
import './IconBase-YN3-eQCN.js';
import './sp-icon-chevron75-l1_fEg8K.js';
import './Chevron75-ykt7YsHW.js';
import './custom-tag-z2Xx81l9.js';
import './spectrum-icon-chevron.css-hA8DP86t.js';

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
