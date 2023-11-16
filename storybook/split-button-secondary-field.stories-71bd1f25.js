import { a as args, b as argTypes, r as renderSplitButtonSet, s as splitbutton } from './index-b45eca58.js';
import { o as openSplitButtonDecorator } from './helpers-4b550ff2.js';
import './sp-menu-item-578cf3df.js';
import { E as ElementSizes } from './sizedMixin-29c62bc2.js';
import './sp-popover-d11a6e7d.js';
import './lit-element-9354aa77.js';
import './lit-html-126adc72.js';
import './define-element-617dba69.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-menu-2e53fd90.js';
import './sp-button-b85e30a6.js';
import './ButtonBase-f782d237.js';
import './like-anchor-86192240.js';
import './if-defined-ae83b405.js';
import './focusable-c7e64029.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8b87639.js';
import './sp-icon-chevron100-b4103ec6.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './sp-icon-more-04da5606.js';
import './More-78935819.js';
import './custom-tag-b5526d41.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './Picker-2a08fe09.js';
import './sp-icon-alert-4033bfea.js';
import './MatchMedia-0123f918.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './style-map-156e3c36.js';
import './state-59f591cf.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './observe-slot-presence-ae37a9bc.js';

const variant = "secondary";
const type = "field";
var splitButtonSecondaryField_stories = {
  title: "Split Button/Secondary/Field",
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

export { XL, __namedExportsOrder, splitButtonSecondaryField_stories as default, l, m, open, s };
