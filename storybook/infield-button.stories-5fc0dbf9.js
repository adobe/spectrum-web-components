import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-8c03a007.js';
import { x } from './lit-html-126adc72.js';
import './sp-infield-button-d13b3b67.js';
import './ButtonBase-4ebd5d24.js';
import './like-anchor-79c92c76.js';
import './define-element-467f3dc4.js';
import './lit-element-9354aa77.js';
import './if-defined-ae83b405.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-2a3e6366.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-6218f033.js';
import './base-511c8c11.js';
import './sizedMixin-95b38e3e.js';
import './query-d0113d5a.js';
import './sp-icon-add-6d516caf.js';
import './Add-6d65de87.js';
import './custom-tag-b5526d41.js';
import './IconBase-fdbfb1c1.js';
import './sp-icon-chevron75-af30215c.js';
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
