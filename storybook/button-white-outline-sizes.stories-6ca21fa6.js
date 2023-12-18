import { m as makeOverBackground, a as args, b as argTypes, r as renderButtonSet } from './index-c5d1d5bf.js';
import './sp-button-f040956b.js';
import './ButtonBase-dba358cb.js';
import './like-anchor-8f97823d.js';
import './define-element-7dc6a572.js';
import './lit-element-9354aa77.js';
import './lit-html-126adc72.js';
import './if-defined-ae83b405.js';
import './focusable-391b57ba.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-769cbc70.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-d63886c3.js';
import './base-511c8c11.js';
import './sizedMixin-3d08a58f.js';
import './query-d0113d5a.js';
import './sp-icon-ec6672fe.js';
import './IconBase-7772fb01.js';
import './sp-icon-help-131883b7.js';
import './Help-10c43472.js';
import './custom-tag-b5526d41.js';

const variant = "white";
const treatment = "outline";
var buttonWhiteOutlineSizes_stories = {
  component: "sp-button",
  title: "Button/White/Outline/Sizes",
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

export { XL, __namedExportsOrder, buttonWhiteOutlineSizes_stories as default, l, m, s };
