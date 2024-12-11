import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-BHvhZWe8.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-infield-button-D7qzlzZf.js';
import './ButtonBase-C-5TBDaE.js';
import './like-anchor-Dgva6KsU.js';
import './define-element-xyi5NDDf.js';
import './lit-element-BulMEkr1.js';
import './if-defined-DDJGFaN4.js';
import './focusable-DcHsG7Zg.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-64cbqGrA.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-CTLIe6if.js';
import './sp-icon-add-QQYMgFIN.js';
import './custom-tag-Diwq7nXX.js';
import './Add-BU-Fkq1o.js';
import './IconBase-5vvO1gxM.js';
import './state-DzluJiIq.js';
import './sp-icon-chevron75-Kjji2Tmx.js';
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
