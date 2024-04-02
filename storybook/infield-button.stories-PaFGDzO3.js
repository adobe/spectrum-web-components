import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-qOhS-Ggl.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-infield-button-J1tc9FoG.js';
import './ButtonBase--K-lWDuL.js';
import './like-anchor-A-VxslPW.js';
import './define-element-tO8-r1bu.js';
import './lit-element-xBOPiTek.js';
import './if-defined-pV6JZKXB.js';
import './focusable-GZ06kf6F.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-RiUvi5fT.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './base-STdhtiz1.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './query-JMOstM_r.js';
import './sizedMixin-JAQz02f5.js';
import './sp-icon-add-L4KEH0Gg.js';
import './Add-7SikBJL4.js';
import './custom-tag-JXLWq-Sj.js';
import './IconBase-EFa3DHxz.js';
import './sp-icon-chevron75-HpwXQK2K.js';
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
