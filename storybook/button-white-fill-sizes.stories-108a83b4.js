import { m as makeOverBackground, a as args, b as argTypes, r as renderButtonSet } from './index-7d551b28.js';
import './sp-button-92363486.js';
import './ButtonBase-5cb3a7f7.js';
import './like-anchor-86192240.js';
import './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './lit-html-126adc72.js';
import './if-defined-ae83b405.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-94a58958.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-db063b1b.js';
import './base-511c8c11.js';
import './sizedMixin-9a9da45c.js';
import './query-d0113d5a.js';
import './sp-icon-8061244b.js';
import './IconBase-d9572ad8.js';
import './sp-icon-help-038cfed3.js';
import './Help-10c43472.js';
import './custom-tag-b5526d41.js';

const variant = "white";
const treatment = "fill";
var buttonWhiteFillSizes_stories = {
  component: "sp-button",
  title: "Button/White/Fill/Sizes",
  decorators: [makeOverBackground()],
  args: {
    ...args,
    variant,
    treatment
  },
  argTypes
};
const s = (args2) => renderButtonSet(args2);
s.args = {
  size: "s"
};
const m = (args2) => renderButtonSet(args2);
m.args = {
  size: "m"
};
const l = (args2) => renderButtonSet(args2);
l.args = {
  size: "l"
};
const XL = (args2) => renderButtonSet(args2);
XL.args = {
  size: "xl"
};
const __namedExportsOrder = ['s', 'm', 'l', 'XL'];

export { XL, __namedExportsOrder, buttonWhiteFillSizes_stories as default, l, m, s };
