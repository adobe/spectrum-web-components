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

var infieldButtonSizes_stories = {
  title: "Infield Button/Sizes",
  component: "sp-infield-button",
  argTypes,
  args
};
const s = (args2) => Template(args2);
s.args = {
  size: "s"
};
const m = (args2) => Template(args2);
m.args = {
  size: "m"
};
const l = (args2) => Template(args2);
l.args = {
  size: "l"
};
const XL = (args2) => Template(args2);
XL.args = {
  size: "xl"
};
const stackedS = () => x`
    ${Template({
  block: "start",
  content: chevronUp,
  size: "s",
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  size: "s",
  label: "Decrease"
})}
`;
const stackedM = () => x`
    ${Template({
  block: "start",
  content: chevronUp,
  size: "m",
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  size: "m",
  label: "Decrease"
})}
`;
const stackedL = () => x`
    ${Template({
  block: "start",
  content: chevronUp,
  size: "l",
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  size: "l",
  label: "Decrease"
})}
`;
const stackedXL = () => x`
    ${Template({
  block: "start",
  content: chevronUp,
  size: "xl",
  label: "Increase"
})}
    ${Template({
  block: "end",
  content: chevronDown,
  size: "xl",
  label: "Decrease"
})}
`;
const __namedExportsOrder = ['s', 'm', 'l', 'XL', 'stackedS', 'stackedM', 'stackedL', 'stackedXL'];

export { XL, __namedExportsOrder, infieldButtonSizes_stories as default, l, m, s, stackedL, stackedM, stackedS, stackedXL };
