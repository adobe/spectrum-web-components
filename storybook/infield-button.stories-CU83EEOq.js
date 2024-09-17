import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-wgkMlMuF.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-infield-button-D-iltXIG.js';
import './ButtonBase-CGWMAWIx.js';
import './like-anchor-BF2mSMlR.js';
import './define-element-BgsU7oi-.js';
import './lit-element-BulMEkr1.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BVZVIowx.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-vBV0Xc1Q.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-CHWWI7zp.js';
import './sp-icon-add-CZwAR0-E.js';
import './Add-D-bOAfBi.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-B4NmWdYY.js';
import './sp-icon-chevron75-B69UJKgV.js';
import './Chevron75-hetG6rdn.js';
import './custom-tag-B5IH9PTE.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';

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
