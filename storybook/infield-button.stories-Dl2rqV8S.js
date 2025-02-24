import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-Ba0ihAr5.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-infield-button-DK1cG8NW.js';
import './ButtonBase-CVCDQq4P.js';
import './like-anchor-BQR4wmj8.js';
import './define-element-B7NoFsQI.js';
import './lit-element-BulMEkr1.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CtU8nZTr.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DVS1yx82.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-SWvQmBKY.js';
import './sp-icon-add-Dc1eiyAZ.js';
import './custom-tag-Diwq7nXX.js';
import './Add-BU-Fkq1o.js';
import './IconBase-DXeaJSV5.js';
import './state-CG9Kyp94.js';
import './sp-icon-chevron75-CMKobdOz.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron75-pV8sz8oX.js';
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
