import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-53a95395.js';
import { x } from './lit-html-126adc72.js';
import './sp-infield-button-2f0981a3.js';
import './ButtonBase-5cb3a7f7.js';
import './like-anchor-86192240.js';
import './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './if-defined-ae83b405.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-94a58958.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-db063b1b.js';
import './base-511c8c11.js';
import './sizedMixin-9a9da45c.js';
import './query-d0113d5a.js';
import './sp-icon-add-744b5dd0.js';
import './Add-6d65de87.js';
import './custom-tag-b5526d41.js';
import './IconBase-d9572ad8.js';
import './sp-icon-chevron75-1f90ff13.js';
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
