import { a as args, b as argTypes, r as renderSplitButtonSet, s as splitbutton } from './index-ee1de96d.js';
import { o as openSplitButtonDecorator } from './helpers-4b550ff2.js';
import './sp-menu-item-78994077.js';
import { E as ElementSizes } from './sizedMixin-43fe982f.js';
import './sp-popover-a3c74c2f.js';
import './lit-element-9354aa77.js';
import './lit-html-126adc72.js';
import './define-element-e64f5ea4.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-menu-6cab5582.js';
import './sp-button-6534d7a7.js';
import './ButtonBase-997f7a09.js';
import './like-anchor-72ed571c.js';
import './if-defined-ae83b405.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './sp-icon-chevron100-232e7a83.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-d00b1a4e.js';
import './sp-icon-more-55069177.js';
import './More-78935819.js';
import './custom-tag-b5526d41.js';
import './spectrum-icon-chevron.css-6d5a7762.js';
import './Picker-3f54f663.js';
import './sp-icon-alert-248f0d52.js';
import './MatchMedia-0123f918.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './style-map-156e3c36.js';
import './state-5175507d.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './observe-slot-presence-ae37a9bc.js';

const variant = "primary";
const type = "more";
var splitButtonPrimaryMore_stories = {
  title: "Split Button/Primary/More",
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

export { XL, __namedExportsOrder, splitButtonPrimaryMore_stories as default, l, m, open, s };
