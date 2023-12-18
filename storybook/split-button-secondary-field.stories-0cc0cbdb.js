import { a as args, b as argTypes, r as renderSplitButtonSet, s as splitbutton } from './index-a443d27f.js';
import { i as isOverlayOpen } from './index-2d4cdb9b.js';
import './sp-menu-item-a8496cf1.js';
import { E as ElementSizes } from './sizedMixin-3d08a58f.js';
import './sp-popover-f437c616.js';
import './lit-element-9354aa77.js';
import './lit-html-126adc72.js';
import './define-element-7dc6a572.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-menu-b9e57a20.js';
import './sp-button-f040956b.js';
import './ButtonBase-dba358cb.js';
import './like-anchor-8f97823d.js';
import './if-defined-ae83b405.js';
import './focusable-391b57ba.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-769cbc70.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-d63886c3.js';
import './sp-icon-chevron100-19c0ec20.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-7772fb01.js';
import './sp-icon-more-e673432e.js';
import './More-78935819.js';
import './custom-tag-b5526d41.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './Picker-50b2dc89.js';
import './sp-icon-alert-f7ff11b9.js';
import './MatchMedia-0123f918.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './style-map-156e3c36.js';
import './state-3927c84f.js';
import './spectrum-icon-checkmark.css-ebf23520.js';
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
open.decorators = [isOverlayOpen];
const __namedExportsOrder = ['s', 'm', 'l', 'XL', 'open'];

export { XL, __namedExportsOrder, splitButtonSecondaryField_stories as default, l, m, open, s };
