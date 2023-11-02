import { a as args, b as argTypes, r as renderSplitButtonSet, s as splitbutton } from './index-3c99ba03.js';
import { o as openSplitButtonDecorator } from './helpers-4b550ff2.js';
import './sp-menu-item-8cb92ce2.js';
import { E as ElementSizes } from './sizedMixin-281e4c72.js';
import './sp-popover-45f01f5b.js';
import './lit-element-9354aa77.js';
import './lit-html-126adc72.js';
import './define-element-43d4edd5.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-menu-9cba47df.js';
import './sp-button-d4cd36d2.js';
import './ButtonBase-a71d6ce3.js';
import './like-anchor-0c856f1c.js';
import './if-defined-ae83b405.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8aaaadd.js';
import './sp-icon-chevron100-cbc6bc68.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
import './sp-icon-more-6b0074ad.js';
import './More-78935819.js';
import './custom-tag-b5526d41.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './Picker-e79148ca.js';
import './sp-icon-alert-d34893d7.js';
import './MatchMedia-0123f918.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './style-map-156e3c36.js';
import './state-0afa7555.js';
import './spectrum-icon-checkmark.css-c19acd0f.js';
import './observe-slot-presence-ae37a9bc.js';

const variant = "primary";
const type = "field";
var splitButtonPrimaryField_stories = {
  title: "Split Button/Primary/Field",
  component: "sp-split-button",
  args: {
    ...args,
    variant,
    type
  },
  argTypes
};
const s = (args2) => renderSplitButtonSet(args2);
s.args = { size: ElementSizes.s };
const m = (args2) => renderSplitButtonSet(args2);
m.args = { size: ElementSizes.m };
const l = (args2) => renderSplitButtonSet(args2);
l.args = { size: ElementSizes.l };
const XL = (args2) => renderSplitButtonSet(args2);
XL.args = { size: ElementSizes.xl };
const open = (args2) => splitbutton(args2);
open.args = { open: true };
open.decorators = [openSplitButtonDecorator];
const __namedExportsOrder = ['s', 'm', 'l', 'XL', 'open'];

export { XL, __namedExportsOrder, splitButtonPrimaryField_stories as default, l, m, open, s };
