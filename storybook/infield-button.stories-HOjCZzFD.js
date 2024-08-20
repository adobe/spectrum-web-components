import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-CL3aSrws.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-infield-button-Cg47-WJP.js';
import './ButtonBase-D3KeK2NK.js';
import './like-anchor-CXjWBVJG.js';
import './define-element-C5BYKBZP.js';
import './lit-element-BL-po2DW.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BQuZpn6Y.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-C2oNg7p9.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-DyuXUK9p.js';
import './sp-icon-add-t0tBWCDf.js';
import './Add-D-bOAfBi.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-q22s6ZK0.js';
import './sp-icon-chevron75-DTgXPql0.js';
import './Chevron75-hetG6rdn.js';
import './custom-tag-B5IH9PTE.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';

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
