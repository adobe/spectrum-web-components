import { a as argTypes, b as args, T as Template, c as chevronUp, d as chevronDown } from './index-78748e41.js';
import { x } from './lit-html-126adc72.js';
import './sp-infield-button-e1966484.js';
import './ButtonBase-a71d6ce3.js';
import './like-anchor-0c856f1c.js';
import './define-element-43d4edd5.js';
import './lit-element-9354aa77.js';
import './if-defined-ae83b405.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8aaaadd.js';
import './base-511c8c11.js';
import './sizedMixin-281e4c72.js';
import './query-d0113d5a.js';
import './sp-icon-add-1e91ccde.js';
import './Add-6d65de87.js';
import './custom-tag-b5526d41.js';
import './IconBase-fb970ebf.js';
import './sp-icon-chevron75-3e5b16b7.js';
import './Chevron75-0eaeeeac.js';
import './custom-tag-c228386e.js';
import './spectrum-icon-chevron.css-d3283c08.js';

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
