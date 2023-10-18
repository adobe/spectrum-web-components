import { m as makeOverBackground, a as args, b as argTypes, r as renderButtonSet } from './index-b16ecba2.js';
import './sp-button-6534d7a7.js';
import './ButtonBase-997f7a09.js';
import './like-anchor-72ed571c.js';
import './lit-html-126adc72.js';
import './if-defined-ae83b405.js';
import './define-element-e64f5ea4.js';
import './lit-element-9354aa77.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './base-511c8c11.js';
import './sizedMixin-43fe982f.js';
import './query-d0113d5a.js';
import './sp-icon-38633c83.js';
import './IconBase-d00b1a4e.js';
import './sp-icon-help-d701da7b.js';
import './Help-10c43472.js';
import './custom-tag-b5526d41.js';

const variant = "black";
const treatment = "fill";
var buttonBlackFillSizes_stories = {
  component: "sp-button",
  title: "Button/Black/Fill/Sizes",
  decorators: [makeOverBackground(variant)],
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

export { XL, __namedExportsOrder, buttonBlackFillSizes_stories as default, l, m, s };
