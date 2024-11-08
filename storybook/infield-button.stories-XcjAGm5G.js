import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-CEE4IVsI.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-infield-button-C70FpQY9.js';
import './ButtonBase-DjpCcxMx.js';
import './like-anchor-BTdhD6VU.js';
import './define-element-BacrH-dd.js';
import './lit-element-BulMEkr1.js';
import './if-defined-DDJGFaN4.js';
import './focusable-Qk_nX99k.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CG33WdGp.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-D27dvb1g.js';
import './sp-icon-add-DhOkbGg9.js';
import './custom-tag-Diwq7nXX.js';
import './Add-BU-Fkq1o.js';
import './IconBase-lDJoNs5V.js';
import './state-DWB0FQGh.js';
import './sp-icon-chevron75-C-3xaudD.js';
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
