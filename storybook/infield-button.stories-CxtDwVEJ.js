import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-D-agCRy5.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-infield-button-D41y3aQq.js';
import './ButtonBase-S95xo6rZ.js';
import './like-anchor-Du7qlE4L.js';
import './define-element-BcIuQqj7.js';
import './lit-element-BulMEkr1.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CVpJvZMa.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-7-FmzoJl.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-y7jJohI-.js';
import './sp-icon-add-BRHAbH6I.js';
import './custom-tag-Diwq7nXX.js';
import './Add-BU-Fkq1o.js';
import './IconBase-DryES_A6.js';
import './state-mjpVzfMZ.js';
import './sp-icon-chevron75-BkNqb-wG.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron75-pV8sz8oX.js';
import './icon-chevron-overrides.css-Bz8Nk10Z.js';

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
