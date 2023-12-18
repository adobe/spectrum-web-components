import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-7fc6b735.js';
import { x } from './lit-html-126adc72.js';
import './sp-infield-button-3b324763.js';
import './ButtonBase-dba358cb.js';
import './like-anchor-8f97823d.js';
import './define-element-7dc6a572.js';
import './lit-element-9354aa77.js';
import './if-defined-ae83b405.js';
import './focusable-391b57ba.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-769cbc70.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-d63886c3.js';
import './base-511c8c11.js';
import './sizedMixin-3d08a58f.js';
import './query-d0113d5a.js';
import './sp-icon-add-f0d59875.js';
import './Add-6d65de87.js';
import './custom-tag-b5526d41.js';
import './IconBase-7772fb01.js';
import './sp-icon-chevron75-38b5bd8d.js';
import './Chevron75-0eaeeeac.js';
import './custom-tag-c228386e.js';
import './spectrum-icon-chevron.css-d3283c08.js';

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
