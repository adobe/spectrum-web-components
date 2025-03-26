import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-d92WSJHC.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-infield-button-D5oIpMpm.js';
import './ButtonBase-CsEYgJMd.js';
import './like-anchor-BaNwPfYf.js';
import './define-element-Bun2ZgR-.js';
import './lit-element-BulMEkr1.js';
import './if-defined-DDJGFaN4.js';
import './focusable-y67P8eQI.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-B-N3zGRD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-BPhwmt-S.js';
import './sp-icon-add-BvtsSsGi.js';
import './custom-tag-Diwq7nXX.js';
import './Add-BU-Fkq1o.js';
import './IconBase-luFyVpTn.js';
import './state-a9qXQZw8.js';
import './sp-icon-chevron75-DNCaN36e.js';
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
